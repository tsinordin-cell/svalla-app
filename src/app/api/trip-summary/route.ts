export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

interface TripData {
  distanceNM: number
  durationMin: number
  avgSpeed: number
  maxSpeed: number
  boatType: string
  locationName?: string
  stops: Array<{
    name?: string
    durationSeconds: number
    type: string
  }>
  nearbyPlaces: string[]
  startTime?: string
  endTime?: string
  anomalyCount?: number
  routeMatch?: string
}

// ── Thorkels persona ────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `Du är Thorkel — Svallaappens navigatör och berättare. En gammal skärgårdssjöman: kortfattad, poetisk, saltad. Du slösar aldrig ord men fångar alltid känslan.

Du skriver turberättelser i tre distinkta stilar. Varje variant är exakt 1–2 korta meningar, på svenska, utan rubriker, markdown eller listor.

STILAR:
• Poetisk — Sinnesintryck och atmosfär. Ljus, vatten, vind, tystnad. Nästan lyrisk.
• Rakt på — Lakonisk seglartalk. Kärnfullt och ärligt. Inga utfyllnadsord, inga adjektiv av lyx.
• Social — Lättsam, varm och delningsbar. Gärna med en liten krok eller glimt i ögat.

Svara EXAKT i detta format — tre varianter separerade med tre bindestreck på egen rad:
[poetisk variant]
---
[rakt-på variant]
---
[social variant]`

// ── Tonstyrning baserat på turens karaktär ──────────────────────────────────
function tripToneHints(data: TripData): string {
  const hints: string[] = []

  // Distans
  if (data.distanceNM > 25)       hints.push('lång äventyrlig tur')
  else if (data.distanceNM < 1.5) hints.push('kort lokal utflykt')
  else if (data.distanceNM > 12)  hints.push('ordentlig dagstur')

  // Hastighet
  if (data.maxSpeed > 15)                                        hints.push('snabb och sportig körning')
  else if (data.maxSpeed < 2.5 && data.boatType === 'Segelbåt') hints.push('lugn seglats i svag vind')
  else if (data.avgSpeed < 1.5)                                  hints.push('mys-tempo, inga bråttom')

  // Stopp-karaktär
  const realStops = data.stops.filter(s => s.durationSeconds > 300)
  if (realStops.length > 4)   hints.push('utforskande med många stopp')
  else if (realStops.length === 0 && data.distanceNM > 3) hints.push('non-stop direktsträcka')

  // Tid på dagen
  if (data.startTime) {
    const h = new Date(data.startTime).getHours()
    if (h < 6)        hints.push('natten, extremt tidigt')
    else if (h < 8)   hints.push('tidig morgontur i soluppgången')
    else if (h > 20)  hints.push('kvällstur i skymningen')
    else if (h > 16)  hints.push('sen eftermiddag')
  }

  // Årstid
  if (data.startTime) {
    const m = new Date(data.startTime).getMonth() + 1
    if (m >= 6 && m <= 8)        hints.push('högsommar')
    else if (m === 5 || m === 9) hints.push('vår/höst-skärgård')
    else if (m >= 10 || m <= 3)  hints.push('kall årstid, ovanlig tur')
  }

  return hints.length > 0
    ? `\nTonstyrning: ${hints.join(' · ')}`
    : ''
}

// ── Bygg användarmeddelande ─────────────────────────────────────────────────
function buildUserMessage(data: TripData): string {
  const date = data.startTime
    ? new Date(data.startTime).toLocaleDateString('sv-SE', {
        weekday: 'long', month: 'long', day: 'numeric',
      })
    : 'idag'
  const hour = data.startTime ? new Date(data.startTime).getHours() : null

  let msg = `Tur att berättarskriva:

• Datum: ${date}${hour !== null ? `, kl. ${hour}:00` : ''}
• Båt: ${data.boatType}
• Distans: ${data.distanceNM.toFixed(1)} NM
• Tid: ${Math.round(data.durationMin)} min
• Snittfart: ${data.avgSpeed.toFixed(1)} kn · Toppfart: ${data.maxSpeed.toFixed(1)} kn`

  if (data.locationName) {
    msg += `\n• Destination: ${data.locationName}`
  }

  const realStops = data.stops.filter(s => s.durationSeconds > 60)
  if (realStops.length > 0) {
    const named = realStops.flatMap(s => (s.name ? [s.name] : []))
    msg += `\n• Stopp: ${realStops.length} st`
    if (named.length > 0) msg += ` (${named.join(', ')})`
  }

  if (data.nearbyPlaces?.length > 0) {
    msg += `\n• Passerade: ${data.nearbyPlaces.join(', ')}`
  }
  if (data.routeMatch) {
    msg += `\n• Rutt: ${data.routeMatch}`
  }

  msg += tripToneHints(data)
  msg += `\n\nSkriv nu tre varianter (poetisk / rakt på / social) enligt formatet i din instruktion.`

  return msg
}

// ── Route handler ───────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cs: { name: string; value: string; options?: object }[]) =>
          cs.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options ?? {})
          ),
      },
    }
  )
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { checkRateLimit } = await import('@/lib/rateLimit')
  if (!checkRateLimit(`trip-summary:${user.id}`, 5, 60_000)) {
    return NextResponse.json(
      { error: 'För många förfrågningar. Vänta en stund.' },
      { status: 429 }
    )
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'ANTHROPIC_API_KEY saknas' }, { status: 500 })
  }

  let data: TripData
  try {
    data = await req.json()
  } catch {
    return NextResponse.json({ error: 'Ogiltig JSON' }, { status: 400 })
  }

  const userMessage = buildUserMessage(data)

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 600,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: userMessage }],
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('[trip-summary api]', err.substring(0, 120))
      return NextResponse.json({ error: 'API-fel' }, { status: 500 })
    }

    const result = await res.json()
    if (!result.content || !Array.isArray(result.content) || result.content.length === 0) {
      return NextResponse.json({ summary: '', summaries: [] })
    }

    const raw: string = (result.content[0].text ?? '').trim()

    // Parse tre varianter separerade med ---
    const parts = raw
      .split(/\n---\n/)
      .map((s: string) => s.trim())
      .filter(Boolean)

    // Om modellen av någon anledning inte levererar tre varianter — fall back
    const summaries: string[] = parts.length >= 2 ? parts.slice(0, 3) : [raw]
    const summary = summaries[0]

    return NextResponse.json({ summary, summaries })
  } catch {
    return NextResponse.json({ error: 'Server-fel' }, { status: 500 })
  }
}
