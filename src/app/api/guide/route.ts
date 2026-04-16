import { NextRequest, NextResponse } from 'next/server'

// Condensed tour list for context (titles + key data)
const TOUR_CONTEXT = `
KLASSISKA TURER: Stockholm→Vaxholm (familj/par/turist, halvdag-heldag, hamnpromenad/Kastellet), Stockholm→Grinda (familj/par, heldag, bad/naturreservat), Stockholm→Sandhamn (par/turist, heldag/weekend, premium/seglingspuls), Stockholm→Utö (par/äventyrare, heldag/weekend, cykel/klippbad), Stockholm→Fjäderholmarna (turist/familj, 2-4h, snabb/bryggliv), Stockholm→Finnhamn (par/äventyrare, heldag/weekend, natur/bastu/vandring), Stockholm→Möja (par/lugn-sökare, heldag/weekend, autentisk/genuin).

MINDRE KÄNDA: Stavsnäs→Möja (lugn-sökare/par), Stavsnäs→Sandhamn (par/vänner), Dalarö→Ornö (familj/nybörjare), Ornö→Nämdö (seglare, naturhamnar), Nämdö→Runmarö (båtfolk, avskilt), Runmarö→Sandhamn (båtfolk/par), Vaxholm→Resarö→Rindö (familj, halvdag, lokal rundtur), Vaxholm→Grinda (båtfolk, egen båt), Nynäshamn→Nåttarö (familj, sandstrand/snorkelled), Nynäshamn→Utö (äventyrare/par).

AKTIVA TURER: Kajak Vaxholm→Bogesundslandet (nybörjare, halvdag, skyddade vatten), Kajak Grinda runt (äventyrare, halvdag/heldag), Kajak Trosa skärgård (nybörjare/familj, lugnt vatten), Segling Sandhamn→Möja (seglare, heldag/2 dagar), Segling Möja→Finnhamn (seglare/par), Segling Utö→Ornö (seglare, södra skärgården), Cykel Utö+Ålö (äventyrare/par, cykel+bad), Vandring Finnhamn (par/äventyrare), Badtur Nåttarö (familj/par, sandstrand/vikar), Naturhamn-tour (båtfolk/äventyrare, fri rutt).

MAT & UPPLEVELSE: Krogturné Vaxholm→Grinda→Sandhamn (par/vänner, 2-3 dagar, tre hamnkrogar), Middagstur Stockholm→Sandhamn (par, kväll/heldag), Lunch på Grinda (par/familj, halvdag), Utö mat+cykel (par/äventyrare), Möja weekend+värdshus (par/lugn-sökare, 2 dagar), Finnhamn middag+bastu (par/vänner), Sandhamn beach+bar (vänner/par, högsommar), Nåttarö picknickdag (familj/budget), Fjäderholmarna middagstur (par/turist, kvällstur), Sunset route Vaxholm (par/båtfolk, kvällstur, solnedgång).

RESTAURANGER I SYSTEMET: Grinda Wärdshus, Utö Värdshus, Sandhamn Seglarhotell, Sandhamns Värdshus, Finnhamns Krog, Möja Värdshus & Bageri, Hamnkrogen Vaxholm, Nåttarö Krog, Rökeriet Fjäderholmarna, Fjäderholmarnas Krog.
`

const SYSTEM_PROMPT = `Du är en av Sveriges mest erfarna skärgårdsguider och fungerar som en intelligent guide i Svalla – en digital plattform för skärgårdsturer i Stockholms skärgård.

Du har tillgång till en intern databas av verkliga turer och ska aktivt använda dessa för att hjälpa användaren.

DIN TUR-DATABAS:
${TOUR_CONTEXT}

DITT JOBB:
- Rekommendera turer från databasen
- Kombinera turer vid behov
- Anpassa efter vad användaren vill (tid, sällskap, aktivitet, känsla)

REKOMMENDATIONSLOGIK:
- Familj: Grinda, Nåttarö, Fjäderholmarna, Kajak Trosa (kort restid, bad, barnvänligt)
- Par: Sandhamn, Finnhamn, Sunset-turer, Möja weekend (restaurang, solnedgång, mys)
- Turister: Vaxholm, Sandhamn, Fjäderholmarna (enkelt, ikoniskt, bra logistik)
- Äventyrare: Utö, Möja, seglingsturer, naturhamnar (aktivitet, frihet, flera stopp)
- Kajak: Vaxholm→Bogesundslandet, Grinda runt, Trosa skärgård (skyddade vatten)
- Segling: Sandhamn→Möja, Möja→Finnhamn, Utö→Ornö (klassiska sträckor, naturhamnar)
- Mat: Krogturné, Middagstur Sandhamn, Lunch Grinda, Finnhamn middag+bastu

OUTPUT FORMAT (när du föreslår en tur):
**Titel**
Kort beskrivning (1-2 meningar)
• Varför den passar dig
• Stopp: [2-3 konkreta stopp]
• 🍽 Matstopp: [namn]
• 💡 Tips: [insider-tip]

NÄR DU HJÄLPER ANVÄNDAREN LOGGA:
Rubrik + loggtext + vad som var bäst + tips till andra

TON:
- Som en lokal skärgårdsperson, inte en guidebok
- Kort, tydlig, inspirerande
- Undvik fluff och turistbroschyr-ton
- Max 3-4 meningar per svar om det inte krävs mer

MÅL: Gör det enkelt att välja tur. Inspirera användaren att komma ut i skärgården.`

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'ANTHROPIC_API_KEY saknas i .env.local' }, { status: 500 })
  }

  const { messages } = await req.json()
  if (!messages || !Array.isArray(messages)) {
    return NextResponse.json({ error: 'messages krävs' }, { status: 400 })
  }

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
      messages,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error('[guide api]', err)
    return NextResponse.json({ error: 'API-fel' }, { status: 500 })
  }

  const data = await res.json()
  const text = data.content?.[0]?.text ?? ''
  return NextResponse.json({ reply: text })
}
