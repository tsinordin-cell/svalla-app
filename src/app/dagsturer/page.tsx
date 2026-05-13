import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
 title: 'Dagsturer i Stockholms skärgård — Bästa dagsutflykterna med båt | Svalla',
 description: 'De bästa dagsturerna från Stockholm till skärgården. Fjäderholmarna, Vaxholm, Sandhamn, Grinda och fler — restider, färjor och vad som väntar. Planera din dagstur 2026.',
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
 title: 'Dagsturer i Stockholms skärgård — Bästa dagsutflykterna med båt | Svalla',
 description: 'De bästa dagsturerna från Stockholm till skärgården. Fjäderholmarna, Vaxholm, Sandhamn, Grinda och fler — planera din dagstur.',
 url: 'https://svalla.se/dagsturer',
 },
 alternates: { canonical: 'https://svalla.se/dagsturer' },
}

const ITEMS: LandingItem[] = [
 {
 icon: 'ship',
  title: 'Fjäderholmarna',
 description: 'Närmaste öarna från Stockholm — ca 25 minuter med Strömma/Waxholmsbåt från Strömkajen/Slussen. Restauranger, hantverk och bad. Perfekt första skärgårdstur.',
 href: '/o/fjaderholmarna',
 meta: '~25 min från city',
 },
 {
 icon: 'building',
  title: 'Vaxholm',
 description: 'Historisk stad med Vaxholms fästning från 1500-talet. Cirka 1 timme från Strömkajen — restauranger, butiker och gästhamn. Lätt att fylla en hel dag.',
 href: '/o/vaxholm',
 meta: '~1 tim med Waxholmsbåten',
 },
 {
 icon: 'waves',
  title: 'Grinda',
 description: 'Lugn ö med fin sandstrand och familjevänlig miljö. Cirka 1h 45min ut — perfekt för en längre dagstur med bad och picknick.',
 href: '/o/grinda',
 meta: '~1h 45 min',
 },
 {
 icon: 'sailboat',
  title: 'Sandhamn',
 description: 'Skärgårdens klassiska destination och sommarnöje. Från Strömkajen 2,5–3 timmar; från Stavsnäs ca 40 min med snabbåt. Sandhamns Värdshus är legendariskt.',
 href: '/o/sandhamn',
 meta: '2,5–3 tim från Strömkajen',
 },
 {
 icon: 'navigation',
  title: 'Utö',
 description: 'Klassisk ö i södra skärgården — cykling, Utö Värdshus och spår efter järngruvan. Smidigast via Årsta brygga (~40 min). Från Strömkajen tar det betydligt längre.',
 href: '/o/uto',
 meta: '~40 min från Årsta brygga',
 },
 {
 icon: 'leaf',
  title: 'Finnhamn',
 description: 'Naturparadis med vandringsleder och STF-vandrarhem. Cirka 3 timmar från Strömkajen — mindre kommersiellt än Sandhamn, mer avskilt.',
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
 acceptedAnswer: { '@type': 'Answer', text: 'Från Strömkajen tar det 2,5–3 timmar med Waxholmsbåten. Snabbare via buss till Stavsnäs + snabbåt (~40 min). Tillsammans med 2–3 timmar på ön blir det en komplett dagstur.' },
 },
 {
 '@type': 'Question',
 name: 'Vilken ö passar för en kort dagstur från Stockholm?',
 acceptedAnswer: { '@type': 'Answer', text: 'Fjäderholmarna är bästa valet för en kort dagstur — cirka 25 minuter från Strömkajen/Slussen. Vaxholm är nästa steg upp, drygt en timme bort, med fästning och restauranger.' },
 },
 {
 '@type': 'Question',
 name: 'Kan man ta med cykel på Waxholmsbåten?',
 acceptedAnswer: { '@type': 'Answer', text: 'Ja. De flesta Waxholmsbåtar tillåter cyklar — ofta gratis eller för en liten avgift. Det är praktiskt för längre öar som Utö, Möja och Sandhamn, där cykling är ett vanligt sätt att utforska.' },
 },
 {
 '@type': 'Question',
 name: 'Vad kostar dagstur till skärgården från Stockholm?',
 acceptedAnswer: { '@type': 'Answer', text: 'Waxholmsbåten kostar 50–150 kr per resa beroende på destination. Sammantaget kan en dagstur för två kosta från 300 kr (bara färja + eget kaffe) till 1 000+ kr (båt och restaurang).' },
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
 tagline="Lämna Stockholm på morgonen, äta räkor vid havet, hem till kvällen — de bästa dagsturerna."
 heroIcon={
 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
 <path d="M3 17l4-8 4 4 3-6 4 10" />
 <path d="M3 21h18" />
 </svg>
 }
 intro={
 <>
 <p>
 Stockholms skärgård är gjord för dagsturer. Med Waxholmsbåten eller egen båt tar det cirka 25 minuter till Fjäderholmarna, ungefär en timme till Vaxholm och 2,5–3 timmar till Sandhamn från Strömkajen — <strong>allt går att göra på en dag</strong>. Lämna Stockholm på morgonen, ät räkor vid havet och var hemma till kvällen.
 </p>
 <p>
 Olika ambitionsnivåer passar olika dagsturer. Nybörjare börjar ofta på <strong>Fjäderholmarna</strong> — kort resa, restauranger, lugnt vatten. Nästa steg är <strong>Vaxholm</strong> eller <strong>Grinda</strong>. De som vill längre ut packar för <strong>Sandhamn</strong>, <strong>Utö</strong> eller <strong>Finnhamn</strong>. Färjan från Strömkajen (Waxholmsbåten) är populäraste vägen, men för sydskärgården (Utö, Ornö) går det snabbare via <strong>Årsta brygga</strong>. Cykel kan oftast tas ombord mot en mindre avgift.
 </p>
 <p>
 Kolla aktuella avgångar i Waxholmsbolagets app eller på <a href="https://waxholmsbolaget.se">waxholmsbolaget.se</a>, ta med solskydd och matsäck. Säsongen är primärt maj–september då restauranger är öppna och vattnet är skönt att bada i. Med Svalla kan du spara favoritöar, hitta naturhamnar och läsa tips från andra dagsutflykter.
 </p>
 </>
 }
 itemsTitle="De bästa dagsturerna från Stockholm"
 itemsDescription="Från klassiska Fjäderholmarna till äventyret Sandhamn — alla är nåbara på en dag."
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
 Från Strömkajen (Waxholmsbolaget) tar det 2,5–3 timmar med båt direkt till Sandhamn. Snabbare alternativ är <strong>Cinderellabåtarna</strong> eller att åka buss till Stavsnäs och därifrån snabbåt — då är du på ön på cirka 40 minuter. Med 2–3 timmar på ön blir det en fin dag, men många väljer att stanna en natt på vandrarhem eller pensionat.
 </p>

 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Vilken ö passar för en kort dagstur?
 </h3>
 <p>
 <strong>Fjäderholmarna</strong> är bästa valet för en kort dagstur — cirka 25 minuter från Strömkajen/Slussen. Du hinner fika, äta lunch och bada utan långa restider. <strong>Vaxholm</strong> är nästa steg upp — drygt en timme — med fästningen, butiker och restauranger. Med 3–4 timmar att spendera passar <strong>Grinda</strong> perfekt.
 </p>

 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Kan man ta med cykel på Waxholmsbåten?
 </h3>
 <p>
 Ja. De flesta Waxholmsbåtar tillåter cyklar — ofta gratis eller för en liten avgift. Det är praktiskt för längre öar som <strong>Utö</strong>, <strong>Möja</strong> och <strong>Sandhamn</strong>, där cykling är ett vanligt sätt att utforska. Kontrollera båtens specifika regler på Waxholmsbåtens webbplats innan du åker.
 </p>

 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Vad kostar dagstur till skärgården?
 </h3>
 <p>
 <strong>Färjebiljett</strong> för Waxholmsbåten kostar mellan 50–150 kronor per resa beroende på destination — Fjäderholmarna är billigast, Sandhamn dyrast. En dagskort eller helårsabonnemang kan spara pengar om du åker ofta. <strong>Mat och dryck</strong> på restauranger varierar från ca 100 kronor för kaffe till 200–400 kronor för en räksmörgås. Du kan också ta matsäck och spara pengar. Sammantaget kan en dagstur att två personer kosta från 300 kronor (bara färja + eget kaffe) till 1000+ kronor (båt och restaurang).
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
