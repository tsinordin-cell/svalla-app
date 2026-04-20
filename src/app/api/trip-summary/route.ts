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
  anomalyCount?: number   // antal filtrerade GPS-anomalier
  routeMatch?: string     // matchad känd rutt (om rutigenkänning hittat match)
}

const SYSTEM_PROMPT = `Du är en personlig loggsassistent för Svalla – appen för skärgårdslivet i Sverige. Du skriver korta, personliga, levande turberättelser som känns som om de skrivs av en erfaren seglare med passion för skärgården.

Skriv på svenska. Max 2-3 meningar. Inga rubriker. Ingen markdown. Naturlig, varm ton som fångar känslan och stämningen av just den här turen.

Fokusera på:
- Det unika med just denna tur (distans, väder, miljö, stoppens karaktär)
- En känsla av äventyr och glädje
- Naturliga detaljer (vatten, ljus, vindar)
- Korta, lättlästa meningar

Exempel:
"En perfekt höstdag på vägen till Finnhamn – lugna vatten och både fisk och bastu. Vindarna var på vår sida hela vägen."
"Sandhamn tur med ungdomskompaniet – sol, segel och godis på bryggan. Precis sådan här dag tänker vi på vintern."`

function buildUserMessage(data: TripData): string {
  const date = data.startTime ? new Date(data.startTime).toLocaleDateString('sv-SE', { weekday: 'long', month: 'long', day: 'numeric' }) : 'idag'
  const hour = data.startTime ? new Date(data.startTime).getHours() : 'okänd tid'

  let msg = `Här är min tur på Svalla:
  
• Datum: ${date}, start ${hour}h
• Båt: ${data.boatType}
• Distans: ${data.distanceNM.toFixed(1)} NM
• Tid: ${Math.round(data.durationMin)} minuter
• Medelhastighet: ${data.avgSpeed.toFixed(1)} knop
• Toppfart: ${data.maxSpeed.toFixed(1)} knop`

  if (data.locationName) {
    msg += `\n• Plats/destination: ${data.locationName}`
  }

  if (data.stops.length > 0) {
    const stopCount = data.stops.length
    const totalStopTime = data.stops.reduce((sum, s) => sum + s.durationSeconds, 0)
    msg += `\n• Stopp: ${stopCount} st, totalt ${Math.round(totalStopTime / 60)} min`
  }

  if (data.nearbyPlaces && data.nearbyPlaces.length > 0) {
    msg += `\n• Passerade: ${data.nearbyPlaces.join(', ')}`
  }
  if (data.routeMatch) {
    msg += `\n• Rutten matchar känd sträcka: ${data.routeMatch}`
  }
  if (data.anomalyCount && data.anomalyCount > 0) {
    msg += `\n• GPS-kvalitet: ${data.anomalyCount} anomala punkter filtrerades bort`
  }

  msg += `\n\nSkriv en kort, varm turberättelse baserat på denna data. Fånga känslan, inte bara fakta.`

  return msg
}

export async function POST(req: NextRequest) {
  // Auth check — must be logged in to generate AI trip summary
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cs: { name: string; value: string; options?: object }[]) =>
          cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options ?? {})),
      },
    }
  )
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
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
        max_tokens: 350,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: 'user',
            content: userMessage,
          },
        ],
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('[trip-summary api]', err.substring(0, 100))
      return NextResponse.json({ error: 'API-fel' }, { status: 500 })
    }

    const result = await res.json()
    if (!result.content || !Array.isArray(result.content) || result.content.length === 0) {
      return NextResponse.json({ summary: '' })
    }
    const summary = result.content[0].text ?? ''

    return NextResponse.json({ summary })
  } catch (error) {
    return NextResponse.json({ error: 'Server-fel' }, { status: 500 })
  }
}
