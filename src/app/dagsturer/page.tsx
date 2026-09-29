import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

// KÄLLOR för restider och priser på den här sidan (alla lästa 2026-09-21 om inget annat anges):
// - Strömma, Båt till Fjäderholmarna, https://www.stromma.com/sv-se/stockholm/utflykter/dagsutflykter/fjaderholmarna/ — 30 min från Strandvägen kajplats 13 / Nacka Strand, 170 kr enkel, 205 kr t/r, "ÅTER MAJ 2027"
// - Waxholmsbolaget linje 2, https://kund.printhuset-sthlm.se/wa/h2.pdf — Fjäderholmarna angörs på vissa turer utan fast tid, 2 april–18 juni och 17 augusti–12 december 2026
// - Waxholmsbolaget, Vaxholm, https://waxholmsbolaget.se/reseplanering/resmal/vaxholm — "Båtresan från Strömkajen tar bara en timme"; SL-bussar från Vaxholm till Tekniska högskolan
// - Waxholmsbolaget, Grinda, https://waxholmsbolaget.se/reseplanering/resmal/grinda — "Resan från Strömkajen tar ungefär en och en halv timme"; "Grinda har trafik året om"
// - Waxholmsbolaget linje 15 (sommar), https://kund.printhuset-sthlm.se/wa/s15.pdf — "GÄLLER 19 JUNI 2026 – 16 AUGUSTI 2026"; Strömkajen 10.00 → Sandhamn 13.45 (3 h 45), 08.30 → 13.25 (4 h 55); Strömkajen 08.30 → Finnhamn 11.35 (3 h 05)
// - Strömma, Cinderellabåtarna Stockholm–Sandhamn 2026, https://www.stromma.com/globalassets/sweden/stockholm/product_timetables/02_excursions/cinderella/2026/cinderella_stockholm_sandhamn_2026.pdf — 30/4–27/9, Strandvägen kajplats 14 10:00 → Sandhamn 12:30; Södra Grinda 11:30. Priser "från SEK 190/235/255" till Vaxholm/Grinda/Sandhamn, https://www.stromma.com/en-se/stockholm/cinderella-boats/timetables/
// - Waxholmsbolaget linje 16, https://kund.printhuset-sthlm.se/wa/h16.pdf — Stavsnäs–Sandhamn 40–65 min; Stavsnäs Båttaxi, https://battaxi.se/sandhamnslinjen-2/ — 30 min; Sandhamn Seglarhotell, https://www.sandhamn.com/en/hitta-hit — "Take bus 433 from Slussen … Approx. 1 hour by bus"
// - Waxholmsbolaget linje 21, https://kund.printhuset-sthlm.se/wa/h21.pdf — Årsta brygga → Gruvbryggan (Utö) 35–75 min
// - Waxholmsbolaget enkelbiljett (läst 2026-09-19, se o/[slug]/komma-dit) — 61–186 kr vuxen, 39–114 kr 7–19 år, barn under 7 gratis
// - Waxholmsbolaget, Vad du får ta med (läst 2026-09-19) — "Att ta med cykeln kostar inget extra", i mån av plats; cykelkärra/lådcykel 120 kr

export const metadata: Metadata = {
 title: 'Dagstur i Stockholms skärgård – sex öar med båt',
 description: 'Sex öar du hinner fram och tillbaka till på en dag från Stockholm – restid, båt och biljettpris från Waxholmsbolagets och Strömmas tidtabeller.',
 keywords: [
 'dagsturer stockholm skärgård',
 'dagsutflykt skärgård',
 'dagstur båt stockholm',
 'skärgårdsutflykt dagstur',
 'bästa dagstur stockholm',
 'dagstur från stockholm',
 'dagsturer från stockholm båt',
 'dagsutflykter skärgård',
 'fjäderholmarna dagstur',
 'vaxholm dagstur',
 'sandhamn dagstur',
 'grinda dagstur',
 'dagsturer stockholms skärgård',
 ],
 openGraph: {
 title: 'Dagstur i Stockholms skärgård – sex öar med båt',
 description: 'Fjäderholmarna, Vaxholm, Grinda, Sandhamn, Utö och Finnhamn – restid, båt och biljett för en dagstur från Stockholm.',
 url: 'https://svalla.se/dagsturer',
 },
 alternates: { canonical: 'https://svalla.se/dagsturer' },
}

const ITEMS: LandingItem[] = [
 {
 icon: 'ship',
  title: 'Fjäderholmarna',
 description: 'Närmast city. Strömmas båt från Strandvägen tar 30 minuter maj–september; vår och höst lägger Waxholmsbolagets linje 2 till här på vissa turer. Restauranger, hantverk och bad.',
 href: '/o/fjaderholmarna',
 meta: '30 min från Strandvägen',
 },
 {
 icon: 'building',
  title: 'Vaxholm',
 description: 'Historisk stad med Vaxholms kastell — platsen befästes redan i början av 1500-talet, Gustav Vasas kraftigare fästning kom 1548 och nuvarande byggnad 1833–1863. En timme med Waxholmsbåt från Strömkajen, turer året runt – och SL-buss hem om båten inte passar.',
 href: '/o/vaxholm',
 meta: '~1 tim med Waxholmsbåten',
 },
 {
 icon: 'waves',
  title: 'Grinda',
 description: 'Ungefär en och en halv timme från Strömkajen med Waxholmsbolaget, trafik året om. Sommartid stannar även Cinderellabåten vid Södra Grinda.',
 href: '/o/grinda',
 meta: '~1,5 tim från Strömkajen',
 },
 {
 icon: 'sailboat',
  title: 'Sandhamn',
 description: 'Längst ut av de sex. Året runt: buss 433 från Slussen till Stavsnäs, ungefär en timme, sedan båt på 30–65 minuter. Sommartid direkt från city: Cinderellabåten från Strandvägen på 2 tim 30 min (30 april–27 september) eller Waxholmsbåten från Strömkajen på 3 tim 45 min eller mer (19 juni–16 augusti).',
 href: '/o/sandhamn',
 meta: '1,5 tim via Stavsnäs',
 },
 {
 icon: 'navigation',
  title: 'Utö',
 description: 'Södra skärgården — cykling, Utö Värdshus och spår efter järngruvan. Pendeltåg till Västerhaninge, buss till Årsta brygga och Waxholmsbåt på 35–75 minuter till Gruvbryggan, året runt.',
 href: '/o/uto',
 meta: '35–75 min från Årsta brygga',
 },
 {
 icon: 'leaf',
  title: 'Finnhamn',
 description: 'Vandringsleder och STF-vandrarhem. Drygt tre timmar med Waxholmsbåten från Strömkajen sommartid – en lång dag, eller en natt.',
 href: '/o/finnhamn',
 meta: '~3 tim från Strömkajen',
 },
]

export default function DagsturerPage() {
 const faqJsonLd = {
 '@context': 'https://schema.org',
 '@type': 'FAQPage',
 mainEntity: [
 {
 '@type': 'Question',
 name: 'Hur länge tar dagstur till Sandhamn från Stockholm?',
 acceptedAnswer: { '@type': 'Answer', text: 'Året runt: buss 433 från Slussen till Stavsnäs vinterhamn, ungefär en timme, och sedan båt – Sandhamnslinjen på 30 minuter eller Waxholmsbolagets linje 16 på 40–65. Sommartid direkt från city: Cinderellabåten från Strandvägen på 2 tim 30 min (30 april–27 september) eller Waxholmsbåten från Strömkajen på 3 tim 45 min till knappt 5 timmar (19 juni–16 augusti).' },
 },
 {
 '@type': 'Question',
 name: 'Vilken ö passar för en kort dagstur från Stockholm?',
 acceptedAnswer: { '@type': 'Answer', text: 'Fjäderholmarna – 30 minuter med Strömmas båt från Strandvägen maj–september. Vaxholm tar en timme med Waxholmsbåt från Strömkajen och har turer året runt.' },
 },
 {
 '@type': 'Question',
 name: 'Kan man ta med cykel på Waxholmsbåten?',
 acceptedAnswer: { '@type': 'Answer', text: 'Ja. En vanlig cykel följer med Waxholmsbolaget utan extra kostnad, i mån av plats — personalen ombord avgör. Det är praktiskt för längre öar som Utö, Möja och Sandhamn, där cykling är ett vanligt sätt att utforska.' },
 },
 {
 '@type': 'Question',
 name: 'Vad kostar dagstur till skärgården från Stockholm?',
 acceptedAnswer: { '@type': 'Answer', text: 'En enkelbiljett med Waxholmsbolaget kostar 61–186 kr för vuxen beroende på sträcka, 39–114 kr för 7–19 år, och barn under 7 åker gratis med betalande vuxen. Strömmas båt till Fjäderholmarna kostar 170 kr enkel och 205 kr tur och retur; Cinderellabåten från 190 kr till Vaxholm och 255 kr till Sandhamn.' },
 },
 ],
 }
 const breadcrumbJsonLd = {
 '@context': 'https://schema.org',
 '@type': 'BreadcrumbList',
 itemListElement: [
 { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://svalla.se' },
 { '@type': 'ListItem', position: 2, name: 'Dagsturer', item: 'https://svalla.se/dagsturer' },
 ],
 }
 return (
 <>
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
 <CategoryLanding
 heroGradient={['#1e3a5f', '#1e5c82']}
 eyebrow="Dagsturer"
 title="Dagstur till skärgården"
 tagline="Lämna Stockholm på morgonen och var hemma till kvällen – sex öar med båt, restid och biljett."
 heroIcon={
 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
 <path d="M3 17l4-8 4 4 3-6 4 10" />
 <path d="M3 21h18" />
 </svg>
 }
 intro={
 <>
 <p>
 Stockholms skärgård är gjord för dagsturer. Fjäderholmarna ligger 30 minuter från Strandvägen, Vaxholm en timme från Strömkajen och Grinda ungefär en och en halv. Till Sandhamn tar du dig året runt på ungefär en och en halv timme via Stavsnäs, eller sommartid direkt från city med Cinderellabåten. Lämna stan på morgonen och var hemma till kvällen.
 </p>
 <p>
 Välj efter hur lång dag du vill ha. <strong>Fjäderholmarna</strong> och <strong>Vaxholm</strong> passar en halvdag. <strong>Grinda</strong> ger en hel dag med bad. <strong>Sandhamn</strong>, <strong>Utö</strong> och <strong>Finnhamn</strong> ligger längre ut – till Utö åker du snabbast via <strong>Årsta brygga</strong>, inte från Strömkajen. Cykeln följer med Waxholmsbåten utan extra kostnad, i mån av plats.
 </p>
 <p>
 Kolla avgångarna i SL-appen eller på <a href="https://waxholmsbolaget.se">waxholmsbolaget.se</a> samma dag – flera bryggor är beställningstrafik utanför sommaren. Ta med matsäck till öar utan restaurang.
 </p>
 </>
 }
 itemsTitle="Sex dagsturer från Stockholm"
 itemsDescription="Från Fjäderholmarna, 30 minuter bort, till Sandhamn längst ut – alla går att göra fram och tillbaka på en dag."
 items={ITEMS}
 deeperContent={
 <>
 <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
 Vanliga frågor om dagsturer i skärgården
 </h2>

 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Hur länge tar dagstur till Sandhamn?
 </h3>
 <p>
 Året runt tar du buss 433 från Slussen till Stavsnäs vinterhamn, ungefär en timme, och sedan båt: <strong>Sandhamnslinjen</strong> på 30 minuter eller Waxholmsbolagets <strong>linje 16</strong> på 40–65 minuter beroende på antal bryggor. Sommartid går det direkt från city: <strong>Cinderellabåten</strong> från Strandvägen kajplats 14 på 2 tim 30 min, 30 april–27 september, eller Waxholmsbåtens <strong>linje 15</strong> från Strömkajen på 3 tim 45 min till knappt 5 timmar, 19 juni–16 augusti. Med två–tre timmar på ön blir det en hel dag; många stannar en natt.
 </p>

 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Vilken ö passar för en kort dagstur?
 </h3>
 <p>
 <strong>Fjäderholmarna</strong> – 30 minuter med Strömmas båt från Strandvägen, maj–september. <strong>Vaxholm</strong> är en timme bort med Waxholmsbåt och har turer året runt, med fästningen, butiker och restauranger. Vill du bada och ha en hel dag passar <strong>Grinda</strong>, ungefär en och en halv timme från Strömkajen.
 </p>

 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Kan man ta med cykel på Waxholmsbåten?
 </h3>
 <p>
 {/* KÄLLA: waxholmsbolaget.se/att-resa-med-oss/vad-du-far-ta-med, läst 2026-09-19: "Att ta med cykeln kostar inget extra", i mån av plats, personalen avgör; cykelkärra/lådcykel 120 kr; barnvagn gratis med barn under 7, annars 65 kr; hund gratis */}
 Ja. En vanlig cykel följer med Waxholmsbolaget utan extra kostnad, i mån av plats — personalen ombord avgör och kan neka när det är fullt. Det är praktiskt för längre öar som <strong>Utö</strong>, <strong>Möja</strong> och <strong>Sandhamn</strong>, där cykling är ett vanligt sätt att utforska. Cykelkärra och lådcykel räknas som gods och kostar 120 kr.
 </p>

 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Vad kostar dagstur till skärgården?
 </h3>
 <p>
 En <strong>enkelbiljett</strong> med Waxholmsbolaget kostar 61–186 kr för vuxen beroende på sträcka och 39–114 kr för 7–19 år; barn under 7 åker gratis med betalande vuxen. Mellan Strömkajen och Vaxholm med omnejd gäller alla SL-biljetter. Strömmas båt till Fjäderholmarna kostar 170 kr enkel och 205 kr tur och retur, och Cinderellabåten från 190 kr till Vaxholm och 255 kr till Sandhamn. Maten på ön kommer ovanpå – eller ta med matsäck.
 </p>
 </>
 }
 cta={{
 label: 'Planera din dagstur',
 href: '/utflykt',
 secondaryLabel: 'Se färjor',
 secondaryHref: '/farjor',
 }}
 related={[
 { label: 'Alla färjor', href: '/farjor' },
 { label: 'Alla öar', href: '/o' },
 { label: 'Barnvänliga öar', href: '/barnvanliga-oar' },
 { label: 'Cinderellabåten', href: '/cinderella-baaten' },
 { label: 'Stockholms skärgård', href: '/stockholms-skargard' },
 ]}
 />
 </>
 )
}
