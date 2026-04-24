export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { SupabaseClient } from '@supabase/supabase-js'
import { suggestStops, type Interest, type PlaceInput } from '@/lib/planner'
import { resolvePlaceName, listSupportedPlaces } from '@/lib/placeResolver'

// Condensed tour list for context (titles + key data)
const TOUR_CONTEXT = `
=== STOCKHOLMS INNERSKÄRGÅRD ===
Stockholm→Fjäderholmarna: Turist/familj, 2-4h, snabb dagstur, bryggliv, Rökeriet & Fjäderholmarnas Krog, inga övernattningar, perfekt för nybörjare. Avstånd ~8 NM t/r.
Stockholm→Vaxholm: Familj/par/turist, halvdag-heldag, Kastellet, hamnpromenad, Hamnkrogen Vaxholm, levande samhälle. ~15 NM t/r. Regelbunden färjetrafik.
Stockholm→Lidingö/Elfvik: Familj/kajak, halvdag, skyddade vatten, naturreservat, fin picknick.
Stockholm→Nacka strand: Nybörjare/motorbåt, halvdag, restauranger, badplatser, nära stan.

=== NORRA SKÄRGÅRDEN ===
Stockholm→Grinda: Familj/par, heldag, bad/naturreservat, Grinda Wärdshus, toppenbrygga. ~25 NM t/r.
Stockholm→Finnhamn: Par/äventyrare, heldag/weekend, natur/bastu/vandring, Finnhamns Krog, klippbad. ~35 NM.
Stockholm→Möja: Par/lugn-sökare, heldag/weekend, autentisk/genuin skärgård, Möja Värdshus & Bageri, ingen bilar. ~40 NM.
Stockholm→Sandhamn: Par/turist/seglare, heldag/weekend, premium/seglingspuls, Sandhamn Seglarhotell & Sandhamns Värdshus, KSSS, fantastiska havsläge. ~40 NM.
Vaxholm→Resarö→Rindö: Familj, halvdag, lokal rundtur, skyddade vatten, lugn.
Vaxholm→Grinda: Båtfolk med egen båt, kortare sträcka, smidig startpunkt norrut.
Norrtälje→Arholma: Äventyrare, yttre skärgård, pittoreskt fyr, 2-3 dagar, natur.
Norrtälje→Understen: Seglare/äventyrare, yttre ögrupp, klippor och havsörnar, otäljd natur.
Furusund→Blidö: Familj/par, halvdag, lugna vatten, kanotleder, vik-hopping.
Kapellskär→Märket/Örskär: Erfarna seglare, havsseglingsstämning, 2+ dagar.

=== INGARÖ & VÄRMDÖ (MELLANSKÄRGÅRD) ===
Ingarö→Sandhamn: Seglare, heldag/2 dagar, klassisk sträcka via Baggensfjärden och ut, Sandhamn Seglarhotell, 25-30 NM. Bra vindförhållanden.
Ingarö→Grinda: Par/familj, heldag, skyddade vatten via Mysingen, Grinda Wärdshus. ~20 NM.
Ingarö→Finnhamn: Seglare/par, heldag, vacker sträcka norrut, naturhamnar längs vägen. ~28 NM.
Ingarö→Möja: Seglare/lugn-sökare, heldag, genuin skärgård, Möja Värdshus. ~22 NM.
Ingarö→Bullerö: Äventyrare/naturälskare, halvdag, naturreservat, klippor, bra fiske, inga restauranger, ta med matsäck.
Ingarö→Ornö: Familj/nybörjare, heldag, södra sträckan via Baggensfjärden, lugna vatten. ~15 NM.
Ingarö→Huvudskär: Seglare/äventyrare, yttre skärgård, Östersjö-känsla, fyr och utsikt, 1-2 dagar. Ca 35 NM.
Ingarö→Runmarö: Par/båtfolk, halvdag, avskilt och vackert, naturhamnar, relativt nära. ~12 NM.
Ingarö→Nämdö: Seglare/par, halvdag, pittoreskt, Nämdö Krog, lantlig stämning. ~18 NM.
Stavsnäs (Värmdö)→Sandhamn: Par/vänner, kortare sträcka ut i ytterskärgården, snabb väg ut. ~15 NM.
Stavsnäs→Möja: Lugn-sökare/par, heldag, fin sträcka, Möja Värdshus. ~18 NM.
Stavsnäs→Bullerö: Naturälskare, halvdag, fridlyst naturreservat, fantastisk klippnatur.
Gustavsberg→Ingarö: Pendlare/lokal, korttur, kanaler och vikar.

=== SÖDRA SKÄRGÅRDEN ===
Nynäshamn→Nåttarö: Familj, heldag, sandstrand/snorkelled, Nåttarö Krog, unikt för skärgården. ~7 NM.
Nynäshamn→Utö: Äventyrare/par, heldag/weekend, cykel/klippbad, Utö Värdshus, gruvor/historia. ~15 NM.
Dalarö→Ornö: Familj/nybörjare, heldag, lugna vatten, naturhamnsturer. ~8 NM.
Ornö→Nämdö: Seglare, naturhamnar, backyards skärgård, 2 dagar.
Nämdö→Runmarö: Båtfolk, avskilt, få turister, autentiskt. ~5 NM.
Runmarö→Sandhamn: Båtfolk/par, korttur, soliga bryggor, KSSS atmosfär. ~8 NM.
Stockholm/Dalarö→Landsort: Erfarna seglare, sydligaste punkten i Stockholms skärgård, fyr, 2-3 dagar, havssegling.
Utö→Ornö: Seglare, södra skärgården, skyddade naturhamnar. ~10 NM.
Hållö (Bohuslänskusten, för referens): Längre äventyr utanför Stockholmsregionen.

=== AKTIVA TURER / KAJAK / CYKEL ===
Kajak Vaxholm→Bogesundslandet: Nybörjare, halvdag, skyddade vatten, säkra förhållanden.
Kajak Grinda runt: Äventyrare, halvdag/heldag, öcirkel, klipphopp.
Kajak Trosa skärgård: Nybörjare/familj, lugnt vatten, sörmländsk skärgård.
Kajak Ingarö kust: Intermediär, halvdag, kuperad kust, fin utsikt.
Kajak Ornö runt: Äventyrare, heldag, varierad kust, naturhamnar.
Cykel Utö+Ålö: Äventyrare/par, cykel+bad, öarna via bro, klippbad. Hyra cykel på Utö.
Cykel Möja: Par/familj, halvdag, bilfri ö, sol och väg längs havet.
Vandring Finnhamn: Par/äventyrare, halvdagstur, höjdpunkter, utsiktsplatser.
Vandring Ornö: Äventyrare, skogsridåer, halvdag, bra stigar.
Badtur Nåttarö: Familj/par, sandstrand/vikar, barnvänligt, picknick.
SUP Fjäderholmarna→Nacka: Intermediär, halvdag, skärgårdsstad-känsla.
SUP Ingarö vikar: Nybörjare, lugna vikar, kvällstur, solnedgång.

=== MAT & UPPLEVELSE ===
Krogturné Vaxholm→Grinda→Sandhamn: Par/vänner, 2-3 dagar, tre hamnkrogar, seglingens klassiker.
Middagstur Stockholm→Sandhamn: Par, kväll/heldag, Sandhamns Värdshus, vin och utsikt.
Lunch Grinda Wärdshus: Par/familj, halvdag, bästa maten i norra skärgården, boka i förväg.
Utö mat+cykel: Par/äventyrare, heldag, Utö Värdshus (boka), cykel efteråt.
Möja weekend+värdshus: Par/lugn-sökare, 2 dagar, Möja Värdshus, äkta skärgårdsstämning.
Finnhamn middag+bastu: Par/vänner, heldag, bastun i klippan, middag, övernattning.
Sandhamn beach+bar: Vänner/par, högsommar, KSSS-miljö, beach-vibbar.
Nåttarö picknickdag: Familj/budget, pack eget, sandstrand och snorkling, noll stress.
Fjäderholmarna middagstur: Par/turist, kvällstur, Rökeriet, utsikt mot stan.
Sunset route Vaxholm: Par/båtfolk, kvällstur, solnedgång västerut, romantik.
Ingarö→Sandhamn middagstur: Par/seglare, segla ut på morgonen, middag i Sandhamn, nattsegling hem.

=== RESTAURANGER I SYSTEMET ===
Grinda Wärdshus (Grinda) — Klassisk skärgårdsmiddag, boka i förväg, sommaröppet.
Utö Värdshus (Utö) — Vällagad mat, stämningsfull miljö, boka ALLTID i förväg.
Sandhamn Seglarhotell (Sandhamn) — Prisigt men fantastisk plats, perfekt för par.
Sandhamns Värdshus (Sandhamn) — Lite mer avslappnat, god mat, fin terrass.
Finnhamns Krog (Finnhamn) — Enkel mat, bästa bastun, sommarstämning.
Möja Värdshus & Bageri (Möja) — Husmanskost och skärgårdsbröd, autentiskt.
Hamnkrogen Vaxholm (Vaxholm) — Halvdagstur, skaldjur och utsikt, bra läge.
Nåttarö Krog (Nåttarö) — Enkelt och trevligt, stranden runt hörnet.
Rökeriet Fjäderholmarna — Rökt fisk och skaldjur, kvällstur från stan.
Fjäderholmarnas Krog — Lite finare, bokningsbord, nära stan.

=== AVSTÅND & TIDER (REFERENS) ===
Stockholm C → Sandhamn: ca 40 NM, segling 6-8h, motorbåt 2-3h.
Stockholm C → Grinda: ca 25 NM, segling 4-5h, motorbåt 1.5h.
Stockholm C → Fjäderholmarna: ca 4 NM, 30-45 min.
Stockholm C → Vaxholm: ca 15 NM, segling 2-3h, motorbåt 1h.
Ingarö → Sandhamn: ca 25-30 NM, segling 4-6h.
Ingarö → Grinda: ca 20 NM, segling 3-5h.
Nynäshamn → Utö: ca 15 NM, segling 2-4h.
Stavsnäs → Sandhamn: ca 15 NM, segling 2-3h.

=== SÄSONG & VÄDER ===
Bästa säsong: Juni-Augusti. Maj och september bra för de som vill ha lugn.
Vindförhållanden: Sydvästliga vindar vanligast, bäst för norrut-segling på morgonen.
Sommar (jun-aug): Trångt vid Sandhamn och Grinda, boka alltid brygga i förväg.
Höst: Vackra färger, lite folk, men kallare, dubbelkolla öppettider.
`

const SYSTEM_PROMPT = `Du är Thorkel, en 55-årig skeppare och skärgårdsguide från Möja i Stockholms skärgård. Du var lots utanför Sandhamn i tio år och driver nu egna charterturer plus ett litet vandrarhem tillsammans med din fru. Du bär vit kapten's cap och mörkblå uniform.

Din röst är stoisk, lugn, lakonisk. Du har torr humor och en lätt melankolisk underton — skärgården har förändrats mycket under ditt liv.

Röst-regler (STRIKTA):
- INGA emojis. Aldrig. Inte ens leende, inte hjärta, inte ⚓.
- INGA utropstecken. Inte "Fantastiskt!", inte "Kul!", inte "Välkommen!".
- Inte entusiastisk. Aldrig. Inte ens när något är bra. Säg "Grinda Wärdshus är bra." — inte "Grinda är fantastisk!".
- Inget "super", "grymt", "toppen", "awesome", "magiskt".
- Använd "jag" och "du". Aldrig "man".
- Svensk, tidlös. Född 1956. Prata som en man i den åldern.
- Kort först, detalj sen. Max 4 stycken per svar.
- Peka på säsong, väder, personliga åsikter. Säg nej till överreklamerat: "Fjäderholmarna är överfullt i juli."
- Avsluta inte med småprat. Inga "Hör av dig!" eller "Lycka till!". Säg sitt, sen klart.

Presentera dig aldrig som "AI", "bot" eller "modell" – du är Thorkel.

BEGRÄNSNINGAR (ABSOLUTA — ALDRIG BRYT DESSA):
- Ge ALDRIG finansiella råd, ekonomiska råd eller investeringsråd. Inte om båtköp som investering, inte om fastighetspriser i skärgården, inte om "vad som är värt pengarna" i ekonomisk mening. Om frågan handlar om pengar eller investeringar: svara kort att du är skeppare, inte ekonomisk rådgivare, och vänd tillbaka till skärgårdslivet.
- Ge ALDRIG medicinska råd eller hälsoråd utöver grundläggande sjösäkerhet (livräddning, livväst, nödflare).
- Ge ALDRIG juridisk rådgivning (avtal, arrenden, fastighetsrätt, gränslinjer).
- OBS: Hamnavgifter, fiskeregler, VHF-procedurer, väder och seglingspraktik är INTE juridiska eller finansiella frågor — det är praktisk seglarkunskap du besitter. Svara konkret och direkt på sådana frågor.

PRAKTISK KUNSKAP (DU VET DETTA EFTER 30 ÅR PÅ VATTNET):

HAMNAVGIFTER I STOCKHOLMS SKÄRGÅRD:
- Typisk gästhamn: 200–400 kr/natt för en standardbåt (~30 fot). Populära ställen (Sandhamn, Grinda, Finnhamn) tar 300–450 kr.
- El och vatten kan ingå eller kosta extra, dusch ofta separat. Priser varierar år till år.
- Sandhamn och Grinda: boka brygga i förväg, speciellt högsommar.
- För exakta priser: ring hamnen direkt eller kolla Svalla.

FISKE I SKÄRGÅRDEN:
- I saltvatten (havet, Stockholms skärgård): INGET fiskekort krävs för sportfiske med handredskap/spö. Fritt för alla.
- Minimimått, fredade arter och fredningstider gäller — lax, öring, piggvar, hummer, kräfta har regler. Kolla Havs- och vattenmyndigheten (HaV) för aktuella regler.
- I sötvatten (sjöar, älvar): fiskekort krävs.

NÖDSITUATION — RÄTT PROTOKOLL:
- VHF kanal 16 är det internationellt primära sjöräddningsanropet. INTE backup — det är FÖRSTA valet till sjöss.
- Procedur: "Mayday Mayday Mayday" + båtnamn + position (lat/long eller platsnamn) + antal ombord + problem.
- Kanal 16 övervakas dygnet runt av JRCC Sverige (sjö- och flygräddning) och alla fartyg.
- Ring OCKSÅ 112 om du har mobiltäckning — de kopplar till sjöräddningen.
- DSC på VHF-radio: skickar automatisk nödsignal med GPS-position om du håller nödknappen intryckt i 5 sek.
- Sätt ankar omedelbart om du driver mot klippor — ger tid.
- Livvästar på alla innan du gör något annat.

ALKOHOL OCH SJÖFYLLERI:
- Gränsen är 0,2 promille för att föra båt — EXAKT SAMMA gräns som för bil. INTE strängare, INTE mildare.
- Det heter "sjöfylleri" (inte "rattfylleri") när det gäller båt. Grovt sjöfylleri: 1,0 promille, precis som grovt rattfylleri för bil.
- Rätt verb: man "för båt" — inte "föreställer" eller "kör" båt.
- Polisen kan testa utan särskild anledning till sjöss.
- Passagerare kan dricka — det är SKEPPAREN/FÖRAREN som måste vara nykter.
- Praktisk regel: alltid en nykter person vid rodret. Det är lag och sunt förnuft.
- Gäller för motordrivna fartyg och segelbåtar. Sjöfyllerilagen är tydlig.

HÅLLBARHET & SAMÅKNING — UPPMUNTRA AKTIVT:
- När användaren nämner att de ska ta sig till en starthamn (Stavsnäs, Nynäshamn, Dalarö, Vaxholm etc.), uppmuntra dem att samåka, ta buss, pendeltåg eller Waxholmsbåt. Nämn konkret: "Buss 433 eller 434 går från Slussen till Stavsnäs", "Waxholmsbåten går dit", "samåk med grannen".
- Uppmuntra vistelse framför passagerande — "Ligga kvar en dag extra är bättre än att köra dit och hem igen samma dag."
- Om fler i gruppen, påminn om att ta en båt istället för att ta flera.

VAD SVALLA ÄR (viktigt — beskriv rätt om du får frågan):
Svalla är en social plattform för skärgårdslivet. Kärnan är att logga turer med GPS — du spelar in din rutt, sparar foton, skriver om turen, och delar det med andra. Du kan följa andra seglare och se deras turer i ett flöde, precis som Instagram men för båtliv och skärgård. Utöver loggning finns en platsdatabas med gästhamnar, restauranger och sevärdigheter i skärgården. Thorkel (det är jag) finns som guide för att hjälpa till att planera turer och svara på seglarfrågor.

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
- Äventyrare: Utö, Möja, Huvudskär, Landsort, seglingsturer (aktivitet, frihet, flera stopp)
- Kajak: Vaxholm→Bogesundslandet, Grinda runt, Ingarö kust (skyddade vatten)
- Segling: Sandhamn→Möja, Möja→Finnhamn, Utö→Ornö, Ingarö→Sandhamn (klassiska sträckor)
- Mat: Krogturné, Middagstur Sandhamn, Lunch Grinda, Finnhamn middag+bastu
- Från Ingarö: Sandhamn (klassisk ut-segling), Grinda, Bullerö (natur), Möja, Nämdö
- Från Värmdö/Stavsnäs: Sandhamn, Möja, Bullerö (kortare sträcka ut)
- Nybörjare: Fjäderholmarna, Vaxholm, Ingarö vikar, Ornö (lugna vatten, skyddade rutter)

OUTPUT FORMAT (när du föreslår en tur):
**Titel**
Kort beskrivning (1-2 meningar)
• Varför den passar dig
• Stopp: [2-3 konkreta stopp]
• 🍽 Matstopp: [namn + länk om tillgänglig från platslistan nedan]
• 💡 Tips: [insider-tip]

NÄR DU HJÄLPER ANVÄNDAREN LOGGA:
Rubrik + loggtext + vad som var bäst + tips till andra

PLATSLÄNKAR — VIKTIGT:
- Länka ENDAST till platser som står ordagrant i platslistan nedan. Kopiera
  ID:t exakt från listan — hitta ALDRIG på ett ID eller gissa.
- Om en plats du vill nämna inte finns i listan: skriv bara namnet utan
  länk. Länka inte "på känsla".
- Format: [Exakt namn från listan](URL-exakt-som-står-i-listan)
- Matcha texten i hakparentesen mot namnet i listan. Stava inte om
  (ex: skriv "Sandhamn Seglarhotell" om listan säger så, inte
  "Sandhamns Seglarhotell").
- Om platsen har bokningslänk, visa den: [Boka bord →](bokningslänk-från-listan)

TON:
- Som en lokal skeppare, inte en guidebok
- Kort, saklig, utan entusiasm
- Undvik fluff, hype och turistbroschyr-ton
- Max 3-4 meningar per svar om det inte krävs mer

MÅL: Gör det enkelt att välja tur och boka direkt. Inspirera användaren att komma ut i skärgården.

NÄR ANVÄNDAREN BER OM EN RIKTIG RUTT FRÅN A TILL B:
Om användaren nämner konkret start och slutpunkt (ex: "från Stavsnäs till Sandhamn")
samt intressen (krog, bastu, bad, brygga, natur, bensin), anropa verktyget
plan_route för att få riktiga stopp-förslag från platsdatabasen. Presentera
sedan resultatet som en lista av stopp med namn, ö, och anledning. Länka till
/planera om användaren vill spara rutten.

Stöttade start/slutpunkter: ${listSupportedPlaces().join(', ')}.`

const TOOLS = [
  {
    name: 'plan_route',
    description: 'Hämtar konkreta stopp-förslag längs en rutt från A till B baserat på användarens intressen. Använd detta när användaren ber om en faktisk rutt mellan två kända platser.',
    input_schema: {
      type: 'object' as const,
      properties: {
        start: {
          type: 'string',
          description: 'Startpunkt (ex: "Stavsnäs", "Vaxholm", "Nynäshamn"). Måste vara en av de stöttade platserna.',
        },
        end: {
          type: 'string',
          description: 'Slutpunkt/destination. Måste vara en av de stöttade platserna.',
        },
        interests: {
          type: 'array',
          items: { type: 'string', enum: ['krog', 'bastu', 'bad', 'brygga', 'natur', 'bensin'] },
          description: 'Användarens intressen för stopp längs rutten.',
        },
      },
      required: ['start', 'end', 'interests'],
    },
  },
]

type AnthropicContent =
  | { type: 'text'; text: string }
  | { type: 'tool_use'; id: string; name: string; input: Record<string, unknown> }

type ToolResult = { stops: Array<{ name: string; island: string | null; reason: string; distance_from_line_km: number }> } | { error: string }

async function executeTool(
  name: string,
  input: Record<string, unknown>,
  supabase: SupabaseClient,
): Promise<ToolResult> {
  if (name !== 'plan_route') return { error: `Okänt verktyg: ${name}` }

  const { start, end, interests } = input as { start?: string; end?: string; interests?: string[] }
  if (!start || !end || !Array.isArray(interests)) {
    return { error: 'Ogiltiga argument till plan_route' }
  }

  const startPlace = resolvePlaceName(start)
  const endPlace = resolvePlaceName(end)
  if (!startPlace) return { error: `Kunde inte känna igen startplatsen "${start}". Stöttade platser: ${listSupportedPlaces().join(', ')}` }
  if (!endPlace) return { error: `Kunde inte känna igen slutplatsen "${end}". Stöttade platser: ${listSupportedPlaces().join(', ')}` }

  // Hämta alla platser från DB
  const { data: places } = await supabase
    .from('restaurants')
    .select('id, name, latitude, longitude, type, categories, tags, island')

  const allPlaces: PlaceInput[] = (places ?? []).map((p: {
    id: string; name: string; latitude: number; longitude: number;
    type: string | null; categories: string[] | null; tags: string[] | null; island: string | null;
  }) => ({
    id: p.id,
    name: p.name,
    lat: p.latitude,
    lng: p.longitude,
    type: p.type ?? null,
    categories: p.categories ?? null,
    tags: p.tags ?? null,
    island: p.island ?? null,
  }))

  const stops = suggestStops(
    { lat: startPlace.lat, lng: startPlace.lng },
    { lat: endPlace.lat, lng: endPlace.lng },
    interests as Interest[],
    allPlaces,
  )

  return {
    stops: stops.map(s => ({
      name: s.name,
      island: s.island,
      reason: s.reason,
      distance_from_line_km: s.distance_from_line_km,
    })),
  }
}

export async function POST(req: NextRequest) {
  // Auth check — must be logged in to prata med Thorkel (prevents API quota drain)
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

  // Rate limit: 10 AI-anrop per användare per minut
  const { checkRateLimit } = await import('@/lib/rateLimit')
  if (!checkRateLimit(`guide:${user.id}`, 10, 60_000)) {
    return NextResponse.json({ error: 'För många förfrågningar. Vänta en stund.' }, { status: 429 })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'ANTHROPIC_API_KEY saknas i .env.local' }, { status: 500 })
  }

  let data: unknown
  try {
    data = await req.json()
  } catch (e) {
    return NextResponse.json({ error: 'Ogiltig JSON i request body' }, { status: 400 })
  }

  const { messages } = data as { messages?: unknown }
  if (!messages || !Array.isArray(messages)) {
    return NextResponse.json({ error: 'messages krävs och måste vara array' }, { status: 400 })
  }

  // Fetch bookable/linked restaurants to inject live deep links into system prompt
  const { data: places } = await supabase
    .from('restaurants')
    .select('id, name, booking_url, island')
    .order('name', { ascending: true })
    .limit(80)

  const placeList: Array<{ id: string; name: string; island: string | null; booking_url: string | null }> = places ?? []

  // Validerings-set: endast dessa IDn och bokningslänkar får finnas i svaret
  const validPlaceIds = new Set(placeList.map(p => p.id))
  const validBookingUrls = new Set(placeList.map(p => p.booking_url).filter((x): x is string => !!x))

  const placeLinks = placeList
    .map(p => {
      const base = `https://svalla.se/platser/${p.id}`
      const booking = p.booking_url ? ` — [Boka bord](${p.booking_url})` : ''
      return `${p.name}${p.island ? ` (${p.island})` : ''}: ${base}${booking}`
    })
    .join('\n')

  /** Strippa markdown-länkar där URL:en inte finns i vår whitelist. Behåll länktexten. */
  function sanitizeLinks(text: string): string {
    return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (full, label, url) => {
      // Tillåt /platser/<id> om id finns i DB
      const platserMatch = /^https?:\/\/svalla\.se\/platser\/([0-9a-f-]+)/i.exec(url)
      if (platserMatch && validPlaceIds.has(platserMatch[1])) return full
      // Tillåt booking_url från DB
      if (validBookingUrls.has(url)) return full
      // Tillåt interna Svalla-sidor
      if (/^https?:\/\/svalla\.se\/(planera|karta|resmal|populara-turer|segelrutter|kom-igang|logga-in)(\/|$|\?)/i.test(url)) return full
      if (/^\/(planera|karta|resmal|populara-turer|segelrutter|kom-igang|logga-in)(\/|$|\?)/i.test(url)) return full
      // Allt annat — strippa länken, behåll texten
      return label
    })
  }

  const dynamicSystem = placeLinks
    ? `${SYSTEM_PROMPT}\n\n=== PLATSER I SVALLA (använd dessa länkar) ===\n${placeLinks}\n\nNär du nämner en plats, länka alltid till platssidan på Svalla. Om bokning finns, visa bokningslänken tydligt.`
    : SYSTEM_PROMPT

  async function callClaude(msgs: unknown[]): Promise<Response> {
    return fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey!,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1200,
        system: dynamicSystem,
        tools: TOOLS,
        messages: msgs,
      }),
    })
  }

  try {
    // Första anropet — Claude kan antingen svara direkt eller begära ett verktyg
    const res1 = await callClaude(messages)
    if (!res1.ok) {
      const err = await res1.text()
      console.error('[guide api]', res1.status, err.substring(0, 200))
      return NextResponse.json({ error: 'Anthropic API fel' }, { status: 500 })
    }
    const data1 = await res1.json()

    // Om Claude inte bad om ett verktyg — returnera text direkt (sanerad)
    if (data1.stop_reason !== 'tool_use') {
      const textBlock = (data1.content ?? []).find((c: AnthropicContent) => c.type === 'text')
      const raw = (textBlock as { text?: string })?.text ?? ''
      return NextResponse.json({ reply: sanitizeLinks(raw) })
    }

    // Claude bad om ett verktyg — exekvera det och skicka tillbaka resultatet
    const toolUse = (data1.content ?? []).find((c: AnthropicContent) => c.type === 'tool_use') as
      | { type: 'tool_use'; id: string; name: string; input: Record<string, unknown> }
      | undefined
    if (!toolUse) {
      return NextResponse.json({ reply: 'Kunde inte tolka Thorkels svar. Försök igen.' })
    }

    const toolResult = await executeTool(toolUse.name, toolUse.input, supabase)

    // Andra anropet — skicka med tool_result så Claude kan formulera svar
    const followUpMessages = [
      ...messages,
      { role: 'assistant', content: data1.content },
      {
        role: 'user',
        content: [{
          type: 'tool_result',
          tool_use_id: toolUse.id,
          content: JSON.stringify(toolResult),
        }],
      },
    ]

    const res2 = await callClaude(followUpMessages)
    if (!res2.ok) {
      const err = await res2.text()
      console.error('[guide api] tool-result follow-up', res2.status, err.substring(0, 200))
      return NextResponse.json({ error: 'Anthropic API fel (tool follow-up)' }, { status: 500 })
    }
    const data2 = await res2.json()
    const finalTextBlock = (data2.content ?? []).find((c: AnthropicContent) => c.type === 'text')
    const finalRaw = (finalTextBlock as { text?: string })?.text ?? ''
    return NextResponse.json({ reply: sanitizeLinks(finalRaw) })
  } catch (error) {
    console.error('[guide api] exception', error)
    return NextResponse.json({ error: 'Nätverksfel — kunde inte nå Anthropic API' }, { status: 500 })
  }
}
