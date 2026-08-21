/**
 * update-tasks.mjs — synkar team_tasks mot verkligheten (2026-08-21).
 *
 * Bakgrund: dashboarden hade 69 öppna tasks, varav flera var byggda för länge
 * sedan men aldrig flyttade. Tre av dem finns bevisligen som kod i repot.
 * Samtidigt saknades allt arbete från 18–21 augusti helt.
 *
 * Kör: node scripts/update-tasks.mjs
 * Kör: node scripts/update-tasks.mjs --torrkor    (visar utan att ändra något)
 */

/**
 * Nyckeln läses ur miljön — ALDRIG hårdkodad. GitHub push protection stoppade
 * en tidigare version av den här filen 2026-08-21 eftersom service-nyckeln låg
 * i klartext på rad 13. Den spärren gjorde rätt.
 *
 * Kör så här:
 *   SUPABASE_SERVICE_KEY=sb_secret_... node scripts/update-tasks.mjs --torrkor
 *
 * Eller lägg nyckeln i .env.local (som är gitignorerad) och kör:
 *   set -a && source .env.local && set +a && node scripts/update-tasks.mjs
 */
const SB = process.env.SUPABASE_URL ?? 'https://oiklttwylndesewauytj.supabase.co'
const KEY = process.env.SUPABASE_SERVICE_KEY
if (!KEY) {
  console.error('✗ SUPABASE_SERVICE_KEY saknas i miljön.')
  console.error('  Kör: SUPABASE_SERVICE_KEY=sb_secret_... node scripts/update-tasks.mjs')
  process.exit(1)
}
const HDRS = { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' }
const TORRKOR = process.argv.includes('--torrkor')

/** Titlar som ska stängas som klara. Matchas på att titeln BÖRJAR med strängen. */
const STANG_SOM_KLARA = [
  // Byggda — koden finns i repot, verifierat 2026-08-21
  ['Bygg dynamisk jämförelsesida',        'Byggd: src/app/jamfor finns i repot.'],
  ['Lägg till väderintegration',           'Byggd: WeatherPillServer.tsx + weather.ts/weatherGrid.ts/weatherServer.ts.'],
  ['Lägg till PWA-manifest',               'Byggd: public/manifest.json finns.'],
  // Klara genom arbete 18–21 augusti
  ['Competitive gap-analys',               'Klar: rapport competitive-gap-analys-2026-08-18.md i Drive.'],
  ['Skriv long-tail guider',               'Klar: long-tail-guider publicerade.'],
  ['Skriv säsongsguider för höst/vinter',  'Klar: höst-, vinter- och vårguider publicerade.'],
  ['Kom med förslag på bättre text',       'Klar: taglinen är nu "Sveriges samlade skärgårdssida".'],
  ['Ta bort emojis',                       'Klar: se emoji-slutrapport-20260818.md i Drive.'],
  // 2026-08-21
  ['Rätta: Kosterhavet',
   'Klar: rättat på 8 ställen i 5 filer. Kosterhavet är Sveriges FÖRSTA marina ' +
   'nationalpark (2009), inte den enda — Nämdöskärgården blev den andra 2025. ' +
   'Källkommentar tillagd i bohuslan-data.ts. Hittades av den nya ' +
   'skyddsstatus-kontrollen i verify-claims.'],
  ['Restaurangdata: open_hours',
   'Klar 2026-08-21. Buggen bekräftad: datan fanns (23 open_hours, 23 open_season, ' +
   '18 price_example) men ö-sidan renderade bara namn, typ, beskrivning och länkar.\n\n' +
   'ÅTGÄRD: open_season och phone renderas nu — trögrörliga, låg risk. ' +
   'open_hours och price_example renderas MEDVETET INTE eftersom alla 23 saknar ' +
   'källa och ändras varje säsong. Besökaren skickas i stället till verksamhetens ' +
   'egen sida, som alltid är aktuell. Kommentar i koden förklarar varför.\n\n' +
   'Att göra senare: källmärk fälten, då kan de renderas.'],
  ['Bygg Slumpa en ö',
   'Klar 2026-08-21. /oar/slumpa är en route handler som omdirigerar till en ' +
   'slumpmässig ö — fungerar utan JavaScript, går att länka och dela. Undviker ' +
   'att skicka besökaren tillbaka till ön hen just kom ifrån. force-dynamic + ' +
   'no-store så Vercel inte cachar den första slumpen. Knapp tillagd på /oar.'],
  ['Bygg besöksräknare per ö',
   'Klar 2026-08-21: /admin/oar-trafik. Möjlig först nu — page_viewed-eventet ' +
   'som lades till samma dag speglar sidbyten till analytics_events, så trafik ' +
   'per ö går att räkna utan PostHogs API.\n\n' +
   'Visar sidvisningar och unika sessioner per ö senaste 30 dygnen, plus vilka ' +
   'öar som inte fått besök alls. Flaggar slugs som får trafik men saknas i ' +
   'ö-datan.\n\n' +
   'SYFTE: underlag till anspråksmejlen i tillväxtplanen — "er sida fick X besök ' +
   'förra månaden, ta över den gratis". Obs att siffrorna kräver cookie-consent ' +
   'och därför är ett golv, inte facit.'],
  ['Skriv riktad outreach-text per bransch',
   'Klar 2026-08-21: OUTREACH-mallar-per-bransch.md i Drive. Fyra mallar — ' +
   'krogar, boende, båt/charter, konferens/teambuilding — plus en uppföljning ' +
   'och en mätmall.\n\n' +
   'Bygger på tre principer från dagens arbete: triggerbaserat (vi har redan en ' +
   'sida om dem, konverterar ~4x bättre än kallt), gratis första steg (ta över ' +
   'sidan), och vi säljer ALDRIG placering — rekommendationer går inte att köpa. ' +
   'Besökssiffran per ö hämtas från /admin/oar-trafik och är det som gör mejlet.\n\n' +
   'BÖRJA MED FEM, inte tvåhundra. Hela tillväxtplanen vilar på att detta ' +
   'fungerar, och det är oprövat.'],
  ['Granska knop-varden',
   'Klar 2026-08-21. dagPlanner.travelTimeMin räknade på hårdkodade 33 km/h ' +
   '(= 18 knop) utan att antagandet syntes någonstans. 18 knop är en planande ' +
   'motorbåt; en segelbåt går 5–6 knop och tar då nästan dubbelt så lång tid ' +
   '(10 km = 59 min mot 33 min).\n\n' +
   'ÅTGÄRD: farten är nu en exporterad konstant ANTAGEN_FART_KNOP och en valfri ' +
   'parameter till travelTimeMin, så gränssnittet kan redovisa antagandet och en ' +
   'framtida fartväljare bara behöver skicka ett annat värde. Räkningen ger ' +
   'identiskt resultat som förut.\n\n' +
   'KVAR ATT GÖRA: gränssnittet visar fortfarande restiden utan att säga vad den ' +
   'bygger på. Hellre "ca 30 min i 18 knop" än "30 min".'],
  ['Lägg till FAQ-sektioner på alla öprofiler',
   'Klar 2026-08-21. Buggen var inte att FAQ saknades — den fanns och ' +
   'publicerades till Google via FAQPage-schemat. Den renderades bara aldrig ' +
   'för människor. 18 öar hade handskrivna svar som enbart sökmotorn kunde läsa.\n\n' +
   'ÅTGÄRD: synlig FAQ-sektion på /o/[slug], hopfällbar med <details> så den ' +
   'fungerar utan JavaScript. Alla öar får innehåll — 18 unika, resten via ' +
   'regionmallar. Ingen ny faktarisk: exakt samma text som redan låg i JSON-LD.'],
]

/** Stängs som BESLUTAD — ska inte göras. */
const STANG_SOM_BESLUTAD = [
  ['Ta bort branch protection',
   'BESLUT 2026-08-20: skyddet BEHÅLLS. CLAUDE.md dokumenterar att det infördes ' +
   'efter att direkta pushar raderade canonical-taggar och revarterade 24 av 113 ' +
   'filer i juli. Alternativet till friktionen är auto-merge på repot, inte att ' +
   'ta bort spärren.'],
]

/** Nya tasks från arbetet 19–21 augusti. */
const NYA = [
  {
    title: 'BRÅDSKANDE: sätt kvotgräns på Google Places API',
    description:
      'Google Cloud gick från 0 kr i juni och juli till 4 124 kr 1–19 augusti. ' +
      'Trolig orsak: landingPhotos.ts bytte 2026-08-05 ut Next datacache mot en ' +
      '5-minuters minnescache som inte överlever serverless cold starts — och som ' +
      'inte cachar misslyckanden alls. Varje kallstart gör om 19 Places Text ' +
      'Search-anrop.\n\nÅTGÄRD NU: Console → APIs & Services → Places API → Quotas, ' +
      'sätt dagsgräns ~500. Sätt även budgetlarm under Billing → Budgets & alerts.',
    priority: 'high',
  },
  {
    title: 'Fixa landingPhotos-cachen — spara fotokartan i Supabase',
    description:
      'Grundorsaken till Places-räkningen. Minnescachen i src/lib/landingPhotos.ts ' +
      'överlever inte serverless, och vid tomt svar sätts memCache aldrig — det ger ' +
      'en loop som accelererar. Lös genom att persistera fotokartan i Supabase med ' +
      'lång livslängd: 19 anrop i veckan i stället för tusentals.',
    priority: 'high',
  },
  {
    title: 'Kontrollera skyddsstatus på 29 öar mot myndighet',
    description:
      'Bullerö visade att skyddsstatus ändras utan att vår data följer med — ' +
      'naturreservatet upphörde 2025 och uppgick i Nämdöskärgårdens nationalpark. ' +
      'Beläggsrevisionen hittade 29 öar som hänvisar till naturreservat utan att ' +
      'nämna nationalpark. Kontrollera mot naturvardsverket.se, ' +
      'sverigesnationalparker.se och lansstyrelsen.se. Se ' +
      'BELAGGSREVISION-odata-20260819.md i Drive.',
    priority: 'high',
  },
  {
    title: 'Bohuslän-data: 19 öar utan en enda källhänvisning',
    description:
      'bohuslan-data.ts har noll KÄLLA-kommentarer på 19 öar. Behöver samma ' +
      'genomgång som Stockholm-datan fått. Se BELAGGSREVISION-odata-20260819.md.',
    priority: 'normal',
  },
  {
    title: 'Verifiera: Långskär eller Långviksskär?',
    description:
      'Officiella källan (sverigesnationalparker.se) skriver "Långviksskärs ' +
      'naturreservat" — vår data säger "Långskärs". Kan vara samma plats eller två ' +
      'olika. Texten i island-data.ts är medvetet öppet formulerad tills det är ' +
      'bekräftat. Fråga Länsstyrelsen eller nationalparken.',
    priority: 'normal',
  },
  {
    title: 'Rätta: Kosterhavet är inte längre Sveriges enda marina nationalpark',
    description:
      'hike-data.ts:273 påstår "Sveriges enda marina nationalpark" om Kosterhavet. ' +
      'Nämdöskärgården blev den andra marina nationalparken 2025. Hittades av den ' +
      'nya skyddsstatus-kontrollen i verify-claims.',
    priority: 'normal',
  },
  {
    title: 'Beta av 162 skyddsstatus-varningar i verify-claims',
    description:
      'Nya kategorin skyddsstatus varnar men fäller inte bygget. 162 påståenden ' +
      'saknar källa. När de är genomgångna kan kategorin göras build-failing, ' +
      'på samma sätt som klockslag och priser är i dag.',
    priority: 'normal',
  },
]

// ── Körning ────────────────────────────────────────────────────────────────
const res = await fetch(`${SB}/rest/v1/team_tasks?select=id,title,status`, { headers: HDRS })
const tasks = await res.json()
if (!Array.isArray(tasks)) {
  console.error('✗ Supabase svarade inte med en lista. Trolig orsak: fel eller utgången nyckel.')
  console.error('  Svar:', JSON.stringify(tasks).slice(0, 300))
  process.exit(1)
}
console.log(`Hämtade ${tasks.length} tasks.\n`)

async function stang(prefix, notering, status = 'done') {
  const träff = tasks.filter(t => t.title?.startsWith(prefix) && t.status !== 'done')
  if (!träff.length) { console.log(`  – ingen öppen träff: "${prefix}"`); return 0 }
  for (const t of träff) {
    console.log(`  ✓ ${status}: ${t.title}`)
    if (!TORRKOR) {
      await fetch(`${SB}/rest/v1/team_tasks?id=eq.${t.id}`, {
        method: 'PATCH', headers: { ...HDRS, Prefer: 'return=minimal' },
        body: JSON.stringify({ status, description: notering }),
      })
    }
  }
  return träff.length
}

let n = 0
console.log('── Stänger som KLARA ──')
for (const [p, notering] of STANG_SOM_KLARA) n += await stang(p, notering)

console.log('\n── Stänger som BESLUTAD ──')
for (const [p, notering] of STANG_SOM_BESLUTAD) n += await stang(p, notering)

console.log('\n── Lägger till NYA ──')
for (const t of NYA) {
  const finns = tasks.some(x => x.title === t.title)
  if (finns) { console.log(`  – finns redan: ${t.title}`); continue }
  console.log(`  + ${t.priority.padEnd(6)} ${t.title}`)
  if (!TORRKOR) {
    await fetch(`${SB}/rest/v1/team_tasks`, {
      method: 'POST', headers: { ...HDRS, Prefer: 'return=minimal' },
      body: JSON.stringify([{ ...t, status: 'todo' }]),
    })
  }
}

console.log(TORRKOR
  ? '\nTORRKÖRNING — ingenting ändrat. Kör utan --torrkor för att spara.'
  : `\nKlart. ${n} tasks stängda, ${NYA.length} nya tillagda (om de inte redan fanns).`)
