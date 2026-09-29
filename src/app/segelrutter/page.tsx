import type { Metadata } from 'next'
import Link from 'next/link'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

// OMSKRIVEN 2026-09-21 (topp-30 i GSC). Den gamla sidan länkade till sju ruttsidor
// under /segelrutter/… som inte finns (404, mätt i produktion 2026-09-21), lovade
// att "rutterna är testade av erfarna seglare och uppdateras löpande", kallade
// Mälaren "Europas tredje största insjö", placerade Birka i västra Mälaren och
// listade sjökortsnummer utan källa. Kvar är det som går att belägga, och korten
// pekar nu på sidor som finns.
//
// KÄLLOR (lästa i webbläsare 2026-09-21):
// - KSSS, Gotland Runt, https://www.ksss.se/en/gotlandrunt — "first sailed in 1937"; "since 2024 it starts at Gråskärsfjärden south of Sandön … north along the outer archipelago to the Svenska Högarna … before the boats sail south on open water to round Gotland with the finish at Sandhamn"; "The race course is about 350 NM long and the Visby Course is 245 NM long"
// - Sveriges nationalparker, Kosterhavet, https://www.sverigesnationalparker.se/park/kosterhavets-nationalpark/ — "Sveriges första marina nationalpark"; 2009
// - Transportstyrelsen, Kompetens och utbildning, https://www.transportstyrelsen.se/sv/sjofart/fritidsbatar/Kunskap-och-kompetens/ — "inga krav på körkort om du har … en fritidsbåt som är kortare än tolv meter och smalare än fyra meter"; vattenskoter kräver förarbevis; över 12 m och 4 m krävs skepparexamen, kustskepparexamen eller högre
// - Sjöfartsverket, När olyckan är framme, https://www.sjofartsverket.se/sv/tjanster/sakert-batliv/nar-olyckan-ar-framme/ — "ring 112 och begär sjöräddning"; "VHF kanal 16 … Anropet är SWEDEN RESCUE"; "JRCC är bemannat dygnet runt"
// - Sjöfartsverket, Navigationsvarningar, https://navvarn.sjofartsverket.se/Index — gällande svenska navigationsvarningar
// UPPMÄTT (Svalla, fågelvägen, 2026-08-23 och 2026-09-13): Strömkajen–Sandhamn 31,8 NM; Sandhamn–Visby 101 NM; Visby–Hoburgen–Karlskrona 140 NM; Karlskrona–Falsterbo–Malmö 120 NM. Sjövägen längs kusten är längre.

export const metadata: Metadata = {
 title: 'Segelrutter – skärgården, Gotland och Bohuslän',
 description: 'Segla Stockholms skärgård, ostkusten, Gotland Runt och Bohuslän – distanser, kappseglingens bana och regler för förarintyg och sjöräddning, med källa.',
 keywords: [
 'segelrutter sverige',
 'segla ostkusten',
 'gotland runt',
 'segelrutter stockholms skärgård',
 'segla bohuslän',
 'mälaren segling',
 'segla stockholm visby',
 'kappsegling sandhamn',
 ],
 openGraph: {
 title: 'Segelrutter – skärgården, Gotland och Bohuslän',
 description: 'Distanser, Gotland Runt-banan och vad som gäller för förarintyg och sjöräddning.',
 url: 'https://svalla.se/segelrutter',
 },
 alternates: { canonical: 'https://svalla.se/segelrutter' },
}

const ITEMS: LandingItem[] = [
 {
 icon: 'anchor',
 title: 'Naturhamnar i Stockholms skärgård',
 description: 'Ankringsplatser för natten – var du ligger skyddat och vad som gäller i reservaten.',
 href: '/naturhamnar',
 meta: 'Stockholms skärgård',
 },
 {
 icon: 'sailboat',
 title: 'Börja segla',
 description: 'För dig som ska ut för första gången – båt, besättning och vad du behöver kunna.',
 href: '/nyborjare-segling',
 meta: 'Nybörjare',
 },
 {
 icon: 'compass',
 title: 'Segelkurs',
 description: 'Kurser för olika nivåer, från första seglingen till kustskepparintyg.',
 href: '/segelkurs',
 meta: 'Utbildning',
 },
 {
 icon: 'map',
 title: 'Gotland',
 description: 'Stockholm–Visby är ungefär 100 sjömil fågelvägen från Sandhamn. Kappseglingen Gotland Runt är omkring 350.',
 href: '/gotland',
 meta: 'Östersjön',
 },
 {
 icon: 'waves',
 title: 'Bohuslän',
 description: 'Granitkust, fiskelägen och Kosterhavet – Sveriges första marina nationalpark.',
 href: '/bohuslan',
 meta: 'Västkusten',
 },
 {
 icon: 'wind',
 title: 'Västerhavet',
 description: 'Kattegatt och Skagerrak – seglingen utanför Bohuslän och Halland.',
 href: '/vasterhav',
 meta: 'Västkusten',
 },
 {
 icon: 'map',
 title: 'Blekinge skärgård',
 description: 'Sydostkustens skärgård – en naturlig etapp på väg söderut längs ostkusten.',
 href: '/blekinge-skargard',
 meta: 'Sydost',
 },
 {
 icon: 'building',
 title: 'Mälaren',
 description: 'Insjösegling in från Stockholm – skyddade vatten och slott längs stränderna.',
 href: '/malaren',
 meta: 'Insjö',
 },
 {
 icon: 'navigation',
 title: 'Turer och rutter',
 description: 'Dagsturer och längre turer med båt, filtrerade efter tid och typ – segling ingår.',
 href: '/rutter',
 meta: 'Alla',
 },
]

export default function SegelrutterPage() {
 const faqJsonLd = {
 '@context': 'https://schema.org',
 '@type': 'FAQPage',
 mainEntity: [
 {
 '@type': 'Question',
 name: 'Behöver man körkort för att segla i Sverige?',
 acceptedAnswer: { '@type': 'Answer', text: 'Nej, inte för en fritidsbåt som är kortare än tolv meter och smalare än fyra meter, enligt Transportstyrelsen. För större fritidsbåtar krävs skepparexamen, kustskepparexamen eller högre, och för vattenskoter krävs förarbevis.' },
 },
 {
 '@type': 'Question',
 name: 'Hur långt är det att segla Stockholm–Malmö längs ostkusten?',
 acceptedAnswer: { '@type': 'Answer', text: 'Fågelvägen via Sandhamn, Visby, Hoburgen, Karlskrona och Falsterbo är det omkring 390 sjömil, uppmätt av Svalla. Sjövägen längs kusten är längre. Det finns ingen officiellt märkt segelled hela vägen.' },
 },
 {
 '@type': 'Question',
 name: 'Hur lång är Gotland Runt?',
 acceptedAnswer: { '@type': 'Answer', text: 'Omkring 350 sjömil enligt KSSS, som arrangerar kappseglingen. Sedan 2024 startar den på Gråskärsfjärden söder om Sandön, går norrut till Svenska Högarna, runt Gotland och i mål vid Sandhamn. Den kortare Visbybanan är 245 sjömil.' },
 },
 {
 '@type': 'Question',
 name: 'Vart ringer man om något händer på sjön?',
 acceptedAnswer: { '@type': 'Answer', text: 'Ring 112 och begär sjöräddning, eller anropa SWEDEN RESCUE på VHF kanal 16. Sjöfartsverkets räddningscentral JRCC är bemannad dygnet runt.' },
 },
 ],
 }
 const breadcrumbJsonLd = {
 '@context': 'https://schema.org',
 '@type': 'BreadcrumbList',
 itemListElement: [
 { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://svalla.se' },
 { '@type': 'ListItem', position: 2, name: 'Segelrutter', item: 'https://svalla.se/segelrutter' },
 ],
 }
 return (
 <>
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
 <CategoryLanding
 heroGradient={['#1e5c82', '#2d7d8a']}
 eyebrow="Segelrutter"
 title="Segelrutter i Sverige"
 tagline="Stockholms skärgård, ostkusten ner till Malmö, Gotland Runt och Bohuslän – distanser och regler med källa."
 heroIcon={
 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
 <path d="M2 20h20" />
 <path d="M12 2v18" />
 <path d="M12 2 3 18" />
 <path d="M12 6l7 12" />
 </svg>
 }
 intro={
 <>
 <p>
 Det finns ingen officiellt märkt segelled längs den svenska kusten. Det som finns är farleder, sjökort och vägar som seglare tagit i generationer: ut genom Stockholms skärgård till Sandhamn, över till Gotland, söderut längs ostkusten – eller norrut längs Bohuslän på västkusten.
 </p>
 <p>
 Här är distanserna vi kunnat mäta, banan för kappseglingen Gotland Runt och det du måste veta om förarintyg och sjöräddning. För ankringsplatser, gästhamnar och enskilda öar går du vidare till sidorna nedan.
 </p>
 </>
 }
 itemsTitle="Segla vidare"
 itemsDescription="Regioner, naturhamnar och kurser – sidor med mer om varje område."
 items={ITEMS}
 deeperContent={
 <>
 <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
 Ostkusten Stockholm–Malmö
 </h2>
 <p>
 Den klassiska långfärden går ut till Sandhamn, över Östersjön till Visby, runt Gotlands sydspets vid Hoburgen och vidare till Karlskrona, och sedan längs Skånes kust runt Falsterbo till Malmö. Fågelvägen, uppmätt av Svalla, är etapperna ungefär:
 </p>
 <ul style={{ margin: '8px 0 12px', paddingLeft: '20px' }}>
 <li>Strömkajen–Sandhamn: 32 sjömil</li>
 <li>Sandhamn–Visby: 101 sjömil över öppet hav</li>
 <li>Visby–Hoburgen–Karlskrona: 140 sjömil</li>
 <li>Karlskrona–Falsterbo–Malmö: 120 sjömil</li>
 </ul>
 <p>
 Totalt omkring 390 sjömil – sjövägen längs kusten blir längre. Många delar upp sträckan över flera somrar.
 </p>

 <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
 Gotland Runt
 </h2>
 <p>
 KSSS kappsegling seglades första gången 1937. Sedan 2024 går starten på Gråskärsfjärden söder om Sandön. Banan går norrut längs ytterskärgården till Svenska Högarna, Stockholms skärgårds östligaste utpost, och sedan söderut över öppet hav runt Gotland, med mål vid Sandhamn – omkring 350 sjömil. Den kortare Visbybanan är 245 sjömil.
 </p>

 <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
 Bohuslän
 </h2>
 <p>
 På västkusten går seglingen längs Bohusläns granitkust mellan Göteborg och Strömstad, med fiskelägen och naturhamnar hela vägen. Längst i norr ligger Kosterhavets nationalpark, Sveriges första marina nationalpark, från 2009. Läs mer på <Link href="/bohuslan" style={{ color: 'var(--sea)' }}>Bohuslänsidan</Link>.
 </p>

 <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
 Innan du kastar loss
 </h2>
 <ul style={{ margin: '8px 0 12px', paddingLeft: '20px' }}>
 <li><strong>Förarintyg</strong> – krävs inte för fritidsbåt under tolv meter och smalare än fyra meter, enligt Transportstyrelsen. Över det krävs skepparexamen, kustskepparexamen eller högre, och vattenskoter kräver förarbevis. Du som för båten ansvarar alltid för att den är sjövärdig.</li>
 <li><strong>Navigationsvarningar</strong> – Sjöfartsverket publicerar gällande varningar för svenska farvatten. Kolla dem innan en längre segling.</li>
 <li><strong>Sjökort</strong> – Sjöfartsverket ger ut Sveriges officiella sjökort, i papper och digitalt.</li>
 </ul>

 <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
 Om något händer
 </h2>
 <p>
 Ring 112 och begär sjöräddning, eller anropa <strong>SWEDEN RESCUE</strong> på VHF kanal 16. Sjöfartsverkets räddningscentral är bemannad dygnet runt. Slå på platstjänsterna i telefonen så att din position kan skickas med, och var beredd att svara på vad som hänt, hur många ni är ombord och var ni är. Ser du någon annan i sjönöd är du skyldig att hjälpa till om det går utan allvarlig fara för din egen båt.
 </p>
 </>
 }
 related={[
 { label: 'Naturhamnar', href: '/naturhamnar' },
 { label: 'Börja segla', href: '/nyborjare-segling' },
 { label: 'Stockholms skärgård', href: '/stockholms-skargard' },
 { label: 'Bohuslän', href: '/bohuslan' },
 ]}
 />
 </>
 )
}
