/**
 * Daglig cron — skickar:
 *   - Dag-3-mail (day3_newsletter) till email_subscribers som prenumererade för 2–4 dagar sen — Thorkel-introduktion
 *   - Dag-7-mail till users som signades upp för 6–8 dagar sen
 *                 + email_subscribers bekräftade för 6–8 dagar sen
 *   - Säsongsmail (1 april) till alla bekräftade prenumeranter + members
 *   - Säsongsslut-mail (1 oktober) till users med trips i år
 *   - Vädermail (torsdagar maj–sept) till alla bekräftade prenumeranter + members
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

  // ── Hjälp: slå ihop users + prenumeranter, deduplicera på e-post ────────
  // Users-posten vinner om samma e-post finns i båda (har username).
  function mergeEmailLists(
    users: Array<{ email: string | null; username?: string | null }>,
    subs: Array<{ email: string | null }>,
  ): Array<{ email: string; firstName: string }> {
    const map = new Map<string, string>()
    for (const s of subs) {
      if (s.email) map.set(s.email.toLowerCase(), 'där')
    }
    for (const u of users) {
      if (u.email) map.set(u.email.toLowerCase(), u.username || 'där')
    }
    return Array.from(map.entries()).map(([email, firstName]) => ({ email, firstName }))
  }

  // ── 1. Dag-3-mail (nyhetsbrevsprenumeranter) — Thorkel-introduktion ─────
  // Bara email_subscribers (inte app-users) — prenumererade 2–4 dagar sen
  const fourDaysAgo = new Date(today.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString()
  const twoDaysAgo  = new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString()

  const { data: day3Raw } = await service
    .from('email_subscribers')
    .select('email, created_at')
    .eq('confirmed', true)
    .eq('unsubscribed', false)
    .gte('created_at', fourDaysAgo)
    .lte('created_at', twoDaysAgo)
    .limit(500)

  const day3Candidates = (day3Raw ?? []).filter(
    (c): c is { email: string; created_at: string } => typeof c.email === 'string' && c.email.length > 0
  )

  let day3Sent = 0
  let day3Errors = 0
  if (day3Candidates.length > 0) {
    const { data: alreadySentDay3 } = await service
      .from('email_log')
      .select('email')
      .eq('template', 'day3_newsletter')
      .in('email', day3Candidates.map(c => c.email))
    const sentDay3 = new Set((alreadySentDay3 ?? []).map(r => r.email as string))

    for (const candidate of day3Candidates) {
      if (sentDay3.has(candidate.email)) continue
      const result = await sendEmail({ template: 'day3_newsletter', to: candidate.email })
      if (result.ok) {
        day3Sent++
        await service.from('email_log').insert({
          email: candidate.email,
          template: 'day3_newsletter',
          sent_at: new Date().toISOString(),
          resend_id: result.id,
        }).then(() => {}, () => {})
      } else {
        day3Errors++
      }
    }
  }
  results.day3_newsletter = { sent: day3Sent, errors: day3Errors }

  // ── 1b. Dag-14-mail (nyhetsbrevsprenumeranter) — Min Skärgård + 3 öar ──
  // Prenumererade 12–16 dagar sen
  const sixteenDaysAgo = new Date(today.getTime() - 16 * 24 * 60 * 60 * 1000).toISOString()
  const twelveDaysAgo  = new Date(today.getTime() - 12 * 24 * 60 * 60 * 1000).toISOString()

  const { data: day14Raw } = await service
    .from('email_subscribers')
    .select('email, created_at')
    .eq('confirmed', true)
    .eq('unsubscribed', false)
    .gte('created_at', sixteenDaysAgo)
    .lte('created_at', twelveDaysAgo)
    .limit(500)

  const day14Candidates = (day14Raw ?? []).filter(
    (c): c is { email: string; created_at: string } => typeof c.email === 'string' && c.email.length > 0
  )

  let day14Sent = 0
  let day14Errors = 0
  if (day14Candidates.length > 0) {
    const { data: alreadySentDay14 } = await service
      .from('email_log')
      .select('email')
      .eq('template', 'day14_newsletter')
      .in('email', day14Candidates.map(c => c.email))
    const sentDay14 = new Set((alreadySentDay14 ?? []).map(r => r.email as string))

    for (const candidate of day14Candidates) {
      if (sentDay14.has(candidate.email)) continue
      const result = await sendEmail({ template: 'day14_newsletter', to: candidate.email })
      if (result.ok) {
        day14Sent++
        await service.from('email_log').insert({
          email: candidate.email,
          template: 'day14_newsletter',
          sent_at: new Date().toISOString(),
          resend_id: result.id,
        }).then(() => {}, () => {})
      } else {
        day14Errors++
      }
    }
  }
  results.day14_newsletter = { sent: day14Sent, errors: day14Errors }

  // ── 1c. Dag-30-mail (nyhetsbrevsprenumeranter) — återengagemang ─────────
  // Prenumererade 28–32 dagar sen
  const thirtyTwoDaysAgo = new Date(today.getTime() - 32 * 24 * 60 * 60 * 1000).toISOString()
  const twentyEightDaysAgo = new Date(today.getTime() - 28 * 24 * 60 * 60 * 1000).toISOString()

  const { data: day30Raw } = await service
    .from('email_subscribers')
    .select('email, created_at')
    .eq('confirmed', true)
    .eq('unsubscribed', false)
    .gte('created_at', thirtyTwoDaysAgo)
    .lte('created_at', twentyEightDaysAgo)
    .limit(500)

  const day30Candidates = (day30Raw ?? []).filter(
    (c): c is { email: string; created_at: string } => typeof c.email === 'string' && c.email.length > 0
  )

  let day30Sent = 0
  let day30Errors = 0
  if (day30Candidates.length > 0) {
    const { data: alreadySentDay30 } = await service
      .from('email_log')
      .select('email')
      .eq('template', 'day30_newsletter')
      .in('email', day30Candidates.map(c => c.email))
    const sentDay30 = new Set((alreadySentDay30 ?? []).map(r => r.email as string))

    for (const candidate of day30Candidates) {
      if (sentDay30.has(candidate.email)) continue
      const result = await sendEmail({ template: 'day30_newsletter', to: candidate.email })
      if (result.ok) {
        day30Sent++
        await service.from('email_log').insert({
          email: candidate.email,
          template: 'day30_newsletter',
          sent_at: new Date().toISOString(),
          resend_id: result.id,
        }).then(() => {}, () => {})
      } else {
        day30Errors++
      }
    }
  }
  results.day30_newsletter = { sent: day30Sent, errors: day30Errors }

  // ── 2. Dag-7-mail ───────────────────────────────────────────────────────
  // users skapade 6–8 dagar sen + email_subscribers bekräftade 6–8 dagar sen
  const eightDaysAgo = new Date(today.getTime() - 8 * 24 * 60 * 60 * 1000).toISOString()
  const sixDaysAgo   = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString()

  const [{ data: userCandidates }, { data: subCandidates }] = await Promise.all([
    service
      .from('users')
      .select('id, username, email, created_at')
      .gte('created_at', eightDaysAgo)
      .lte('created_at', sixDaysAgo)
      .limit(500),
    service
      .from('email_subscribers')
      .select('email, created_at')
      .eq('confirmed', true)
      .eq('unsubscribed', false)
      .gte('created_at', eightDaysAgo)
      .lte('created_at', sixDaysAgo)
      .limit(500),
  ])

  const day7Candidates = mergeEmailLists(userCandidates ?? [], subCandidates ?? [])

  let day7Sent = 0
  let day7Errors = 0
  if (day7Candidates.length > 0) {
    const { data: alreadySent } = await service
      .from('email_log')
      .select('email')
      .eq('template', 'day7')
      .in('email', day7Candidates.map(c => c.email))
    const sentEmails = new Set((alreadySent ?? []).map(r => r.email as string))

    for (const candidate of day7Candidates) {
      if (sentEmails.has(candidate.email)) continue
      const result = await sendEmail({
        template: 'day7',
        to: candidate.email,
        vars: { first_name: candidate.firstName },
      })
      if (result.ok) {
        day7Sent++
        await service.from('email_log').insert({
          email: candidate.email,
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

  // ── 2. Säsongs-öppning (1 april) ────────────────────────────────────────
  // Alla bekräftade email_subscribers + alla users med e-post (deduplicerat)
  if (month === 4 && day === 1) {
    const [{ data: allSubs }, { data: allUsers }] = await Promise.all([
      service
        .from('email_subscribers')
        .select('email')
        .eq('confirmed', true)
        .eq('unsubscribed', false)
        .limit(10000),
      service
        .from('users')
        .select('email, username')
        .not('email', 'is', null)
        .limit(10000),
    ])

    const recipients = mergeEmailLists(allUsers ?? [], allSubs ?? [])

    let sent = 0, errors = 0
    const CHUNK = 50
    for (let i = 0; i < recipients.length; i += CHUNK) {
      const chunk = recipients.slice(i, i + CHUNK)
      const settled = await Promise.allSettled(
        chunk.map(r => sendEmail({
          template: 'season_open',
          to: r.email,
          vars: { first_name: r.firstName },
        }))
      )
      for (const r of settled) {
        if (r.status === 'fulfilled' && r.value.ok) sent++
        else errors++
      }
    }
    results.season_open = { sent, errors }
  }

  // ── 3. Säsongs-stängning (1 oktober) ────────────────────────────────────
  // Bara users med turer i år — personaliserat med trip_count + visited_count
  if (month === 10 && day === 1) {
    const yearStart = new Date(today.getFullYear(), 0, 1).toISOString()
    const { data: activeUsers } = await service
      .from('users')
      .select('id, username, email')
      .limit(2000)

    let sent = 0, errors = 0
    if (activeUsers) {
      const userIds = activeUsers.map(u => u.id)

      const [{ data: tripRows }, { data: visitRows }, { data: savedRows }] = await Promise.all([
        // distance ligger i distansminuter (NM) — samma enhet som profileTeaser.ts
        service.from('trips').select('user_id, distance').in('user_id', userIds).gte('created_at', yearStart),
        service.from('visited_islands').select('user_id').in('user_id', userIds),
        service.from('saved_islands').select('user_id').in('user_id', userIds),
      ])
      const tripCountByUser = new Map<string, number>()
      for (const r of tripRows ?? []) {
        tripCountByUser.set(r.user_id as string, (tripCountByUser.get(r.user_id as string) ?? 0) + 1)
      }
      const distanceByUser = new Map<string, number>()
      for (const r of (tripRows ?? []) as Array<{ user_id: string; distance?: number }>) {
        distanceByUser.set(r.user_id, (distanceByUser.get(r.user_id) ?? 0) + (r.distance ?? 0))
      }
      const visitCountByUser = new Map<string, number>()
      for (const r of visitRows ?? []) {
        visitCountByUser.set(r.user_id as string, (visitCountByUser.get(r.user_id as string) ?? 0) + 1)
      }
      const savedCountByUser = new Map<string, number>()
      for (const r of savedRows ?? []) {
        savedCountByUser.set(r.user_id as string, (savedCountByUser.get(r.user_id as string) ?? 0) + 1)
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
            saved_count: savedCountByUser.get(u.id) ?? 0,
            distance_nm: Math.round(distanceByUser.get(u.id) ?? 0),
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
  // Alla bekräftade email_subscribers + alla users med e-post (deduplicerat)
  const isThursday = today.getDay() === 4
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

        // Hitta lördag (day=6) och söndag (day=0) robustly via datum
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
      // Hämta båda listorna och slå ihop
      const [{ data: weatherSubs }, { data: weatherUsers }] = await Promise.all([
        service
          .from('email_subscribers')
          .select('email')
          .eq('confirmed', true)
          .eq('unsubscribed', false)
          .limit(10_000),
        service
          .from('users')
          .select('email, username')
          .not('email', 'is', null)
          .limit(10_000),
      ])

      const allRecipients = mergeEmailLists(weatherUsers ?? [], weatherSubs ?? [])

      let weatherSent = 0
      let weatherErrors = 0

      if (allRecipients.length > 0) {
        // Deduplicera: filtrera bort de som fått weather_tip senaste 6 dagarna
        const sixDaysAgoWeather = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString()
        const { data: recentSent } = await service
          .from('email_log')
          .select('email')
          .eq('template', 'weather_tip')
          .gte('sent_at', sixDaysAgoWeather)
        const recentSet = new Set((recentSent ?? []).map(r => r.email as string))

        const eligible = allRecipients.filter(r => !recentSet.has(r.email))

        const CHUNK = 50
        for (let i = 0; i < eligible.length; i += CHUNK) {
          const chunk = eligible.slice(i, i + CHUNK)
          const settled = await Promise.allSettled(
            chunk.map(r => sendEmail({
              template: 'weather_tip',
              to: r.email,
              vars: {
                first_name: r.firstName,
                temp: String(bestTemp),
                wind: String(bestWind),
                best_day: bestDay,
              },
            }))
          )

          const successEmails: string[] = []
          settled.forEach((r, idx) => {
            if (r.status === 'fulfilled' && r.value.ok) {
              weatherSent++
              const email = chunk[idx]?.email
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
      results.weather_tip = {
        sent: 0,
        errors: 0,
        details: { skipped: true, reason: 'väderkriterier ej uppfyllda' },
      }
    }
  }

  return NextResponse.json({ ok: true, today: today.toISOString().slice(0, 10), results })
}
