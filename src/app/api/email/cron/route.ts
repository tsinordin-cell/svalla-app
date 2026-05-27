/**
 * Daglig cron — skickar:
 *   - Dag-7-mail till users som signades upp för 6–8 dagar sen
 *   - Säsongsmail (1 april) till alla bekräftade prenumeranter
 *   - Säsongsslut-mail (1 oktober) till users med trips i år
 *
 * Trigger: Vercel cron eller GitHub Actions (en gång om dagen, 09:00 UTC)
 *
 * Authorization: Bearer ${CRON_SECRET}
 */

import { NextResponse } from 'next/server'
import { getAdminClient } from '@/lib/supabase-admin'
import { sendEmail } from '@/lib/email'

export const dynamic = 'force-dynamic'
export const maxDuration = 300

export async function GET(req: Request) {
  return handle(req)
}
export async function POST(req: Request) {
  return handle(req)
}

async function handle(req: Request) {
  // Två autentiserings-vägar:
  //  1. Vercel cron (User-Agent: 'vercel-cron/1.0') — automatiskt godkänd
  //  2. Manuell trigger med Bearer ${CRON_SECRET}
  const ua = req.headers.get('user-agent') || ''
  const isVercelCron = ua.toLowerCase().includes('vercel-cron')
  const auth = req.headers.get('authorization') || ''
  const isBearerAuthed = !!process.env.CRON_SECRET && auth === `Bearer ${process.env.CRON_SECRET}`

  if (!isVercelCron && !isBearerAuthed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const service = getAdminClient()

  const today = new Date()
  const month = today.getMonth() + 1
  const day = today.getDate()

  const results: Record<string, { sent: number; errors: number; details?: unknown }> = {}

  // ── 1. Dag-7-mail ───────────────────────────────────────────
  const eightDaysAgo = new Date(today.getTime() - 8 * 24 * 60 * 60 * 1000).toISOString()
  const sixDaysAgo = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString()

  const { data: dayCandidates } = await service
    .from('users')
    .select('id, username, email, created_at')
    .gte('created_at', eightDaysAgo)
    .lte('created_at', sixDaysAgo)
    .limit(500)

  let day7Sent = 0
  let day7Errors = 0
  if (dayCandidates) {
    // Filtrera bort de som redan fått dag-7
    const { data: alreadySent } = await service
      .from('email_log')
      .select('email')
      .eq('template', 'day7')
      .in('email', dayCandidates.map(u => u.email).filter(Boolean) as string[])
    const sentEmails = new Set((alreadySent ?? []).map(r => r.email))

    for (const user of dayCandidates) {
      if (!user.email || sentEmails.has(user.email)) continue
      const result = await sendEmail({
        template: 'day7',
        to: user.email,
        vars: { first_name: user.username || 'där' },
      })
      if (result.ok) {
        day7Sent++
        await service.from('email_log').insert({
          email: user.email,
          template: 'day7',
          sent_at: new Date().toISOString(),
          resend_id: result.id,
        }).then(() => {}, () => {})
      } else {
        day7Errors++
      }
    }
  }
  results.day7 = { sent: day7Sent, errors: day7Errors }

  // ── 2. Säsongs-öppning (1 april) ────────────────────────────
  if (month === 4 && day === 1) {
    const { data: subs } = await service
      .from('email_subscribers')
      .select('email')
      .eq('confirmed', true)
      .eq('unsubscribed', false)
      .limit(10000)

    let sent = 0, errors = 0
    if (subs) {
      const CHUNK = 50
      for (let i = 0; i < subs.length; i += CHUNK) {
        const chunk = subs.slice(i, i + CHUNK)
        const settled = await Promise.allSettled(
          chunk.map(s => sendEmail({ template: 'season_open', to: s.email, vars: { first_name: 'där' } }))
        )
        for (const r of settled) {
          if (r.status === 'fulfilled' && r.value.ok) sent++
          else errors++
        }
      }
    }
    results.season_open = { sent, errors }
  }

  // ── 3. Säsongs-stängning (1 oktober) ────────────────────────
  if (month === 10 && day === 1) {
    const yearStart = new Date(today.getFullYear(), 0, 1).toISOString()
    const { data: activeUsers } = await service
      .from('users')
      .select('id, username, email')
      .limit(2000)

    let sent = 0, errors = 0
    if (activeUsers) {
      const userIds = activeUsers.map(u => u.id)

      // Batch-hämta trips och visits — eliminerar N+1 (annars 2 queries per user = 4000 queries)
      const [{ data: tripRows }, { data: visitRows }] = await Promise.all([
        service.from('trips').select('user_id').in('user_id', userIds).gte('created_at', yearStart),
        service.from('visited_islands').select('user_id').in('user_id', userIds),
      ])
      const tripCountByUser = new Map<string, number>()
      for (const r of tripRows ?? []) {
        tripCountByUser.set(r.user_id as string, (tripCountByUser.get(r.user_id as string) ?? 0) + 1)
      }
      const visitCountByUser = new Map<string, number>()
      for (const r of visitRows ?? []) {
        visitCountByUser.set(r.user_id as string, (visitCountByUser.get(r.user_id as string) ?? 0) + 1)
      }

      for (const u of activeUsers) {
        if (!u.email) continue
        const tripCount = tripCountByUser.get(u.id) ?? 0
        if (tripCount === 0) continue
        const visitCount = visitCountByUser.get(u.id) ?? 0

        const result = await sendEmail({
          template: 'season_close',
          to: u.email,
          vars: {
            first_name: u.username || 'där',
            trip_count: tripCount,
            visited_count: visitCount,
            username: u.username || '',
          },
        })
        if (result.ok) sent++
        else errors++
      }
    }
    results.season_close = { sent, errors }
  }

  // ── 4. Vädertriggad helgmail (torsdagar, maj–september) ─────────────────
  // Använder samma Open-Meteo forecast-API som IslandWeather.tsx.
  // Skickar till email_subscribers om helgprognosen är ≥18°C, ≤40% regn och ≤9 m/s vind.
  // Dedupliceras mot email_log — ingen prenumerant får mer än ett vädermail i veckan.
  const isThursday = today.getDay() === 4   // 0=söndag … 4=torsdag
  const isWeatherSeason = month >= 5 && month <= 9

  if (isThursday && isWeatherSeason) {
    let weatherOk = false
    let bestTemp = 0
    let bestWind = 99
    let bestDay = 'helgen'

    try {
      // Centralpunkt i Stockholms skärgård (Värmdö/Sandhamn-hållet)
      const forecastUrl =
        'https://api.open-meteo.com/v1/forecast' +
        '?latitude=59.35&longitude=18.9' +
        '&daily=temperature_2m_max,precipitation_probability_max,wind_speed_10m_max' +
        '&wind_speed_unit=ms&timezone=Europe%2FStockholm&forecast_days=7'

      const res = await fetch(forecastUrl, { signal: AbortSignal.timeout(10_000) })
      if (res.ok) {
        const data = await res.json() as {
          daily: {
            time: string[]
            temperature_2m_max: number[]
            precipitation_probability_max: number[]
            wind_speed_10m_max: number[]
          }
        }
        const { time, temperature_2m_max, precipitation_probability_max, wind_speed_10m_max } = data.daily

        // Hitta lördag (day=6) och söndag (day=0) robustly via datum istället för hårdkodade index
        const satIdx = time.findIndex(d => new Date(d).getDay() === 6)
        const sunIdx = time.findIndex(d => new Date(d).getDay() === 0)

        type DayCandidate = { label: string; temp: number; precip: number; wind: number }
        const candidates: DayCandidate[] = []
        if (satIdx >= 0) candidates.push({
          label: 'lördag',
          temp: temperature_2m_max[satIdx] ?? 0,
          precip: precipitation_probability_max[satIdx] ?? 100,
          wind: wind_speed_10m_max[satIdx] ?? 99,
        })
        if (sunIdx >= 0) candidates.push({
          label: 'söndag',
          temp: temperature_2m_max[sunIdx] ?? 0,
          precip: precipitation_probability_max[sunIdx] ?? 100,
          wind: wind_speed_10m_max[sunIdx] ?? 99,
        })

        // Välj den bästa dagen (högst temp bland de som uppfyller kriterierna)
        const goodDays = candidates.filter(c => c.temp >= 18 && c.precip <= 40 && c.wind <= 9)
        if (goodDays.length > 0) {
          const best = goodDays.reduce((a, b) => a.temp >= b.temp ? a : b)
          weatherOk = true
          bestTemp = Math.round(best.temp)
          bestWind = parseFloat(best.wind.toFixed(1))
          bestDay = best.label
        }
      }
    } catch {
      // Tyst degradering — Open-Meteo nere = ingen utsändning
    }

    if (weatherOk) {
      // Hämta prenumeranter
      const { data: weatherSubs } = await service
        .from('email_subscribers')
        .select('email')
        .eq('confirmed', true)
        .eq('unsubscribed', false)
        .limit(10_000)

      let weatherSent = 0
      let weatherErrors = 0

      if (weatherSubs && weatherSubs.length > 0) {
        // Deduplicera: filtrera bort de som fått weather_tip senaste 6 dagarna
        const sixDaysAgo = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString()
        const { data: recentSent } = await service
          .from('email_log')
          .select('email')
          .eq('template', 'weather_tip')
          .gte('sent_at', sixDaysAgo)
        const recentSet = new Set((recentSent ?? []).map(r => r.email as string))

        const eligible = weatherSubs.filter(s => s.email && !recentSet.has(s.email as string))

        // Skicka i chunk om 50 för att undvika rate-limits
        const CHUNK = 50
        for (let i = 0; i < eligible.length; i += CHUNK) {
          const chunk = eligible.slice(i, i + CHUNK)
          const settled = await Promise.allSettled(
            chunk.map(s => sendEmail({
              template: 'weather_tip',
              to: s.email as string,
              vars: {
                first_name: 'där',
                temp: String(bestTemp),
                wind: String(bestWind),
                best_day: bestDay,
              },
            }))
          )

          // Logga lyckade utskick (deduplicering nästa vecka)
          const successEmails: string[] = []
          settled.forEach((r, idx) => {
            if (r.status === 'fulfilled' && r.value.ok) {
              weatherSent++
              const email = chunk[idx]?.email as string | undefined
              if (email) successEmails.push(email)
            } else {
              weatherErrors++
            }
          })
          if (successEmails.length > 0) {
            await service.from('email_log').insert(
              successEmails.map(email => ({
                email,
                template: 'weather_tip',
                sent_at: new Date().toISOString(),
              }))
            ).then(() => {}, () => {})
          }
        }
      }

      results.weather_tip = {
        sent: weatherSent,
        errors: weatherErrors,
        details: { bestTemp, bestWind, bestDay },
      }
    } else {
      // Vädret uppfyller inte kriteriet — ingen utsändning, logga ändå i results
      results.weather_tip = {
        sent: 0,
        errors: 0,
        details: { skipped: true, reason: 'väderkriterier ej uppfyllda' },
      }
    }
  }

  return NextResponse.json({ ok: true, today: today.toISOString().slice(0, 10), results })
}
