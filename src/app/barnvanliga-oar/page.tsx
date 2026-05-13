import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
 title: 'Barnvänliga öar i Stockholms skärgård — Guide för familjer | Svalla',
 description: 'De bästa barnvänliga öarna i Stockholms skärgård. Sandstränder, lugnt vatten, restauranger för familjer och enkla färjeförbindelser. Grinda, Finnhamn, Möja och fler.',
 keywords: [
 'barnvänliga öar',
 'barnvänlig skärgård',
 'familjer skärgård',
 'barn stockholms skärgård',
 'sandstrand skärgård',
 'öar barn stockholm',
 'familjeresa skärgården',
 'barnfamilj stockholms skärgård',
 'enkla öar familjer',
 'grunt vatten öar',
 ],
 openGraph: {
 title: 'Barnvänliga öar i Stockholms skärgård — Guide för familjer | Svalla',
 description: 'De bästa barnvänliga öarna i Stockholms skärgård. Sandstränder, lugnt vatten, restauranger för familjer och enkla färjeförbindelser.',
 url: 'https://svalla.se/barnvanliga-oar',
 },
 alternates: { canonical: 'https://svalla.se/barnvanliga-oar' },
}

const ITEMS: LandingItem[] = [
  {
    icon: 'waves',
    title: 'Grinda',
    description: 'Populär ö med fin sandstrand, grunt vatten och välbesökt bad. Värdshus, små stugor och enkel färjeförbindelse. Cirka 1h 45 min med Waxholmsbåten.',
    href: '/o/grinda',
    meta: '~1h 45 min från Strömkajen',
  },
  {
    icon: 'leaf',
    title: 'Finnhamn',
    description: 'Lugn och vacker ö med STF-vandrarhem. Bra för familjer som vill kombinera vandring med bad. Mindre kommersiellt än Grinda. Cirka 3 tim med båt.',
    href: '/o/finnhamn',
    meta: 'Lugnt vatten',
  },
  {
    icon: 'navigation',
    title: 'Möja',
    description: 'I princip bilfri seglarö med cyklevänliga grusvägar och pittoreska fiskebyar. Glassbar, bröd från bageri och flera badplatser. Rustikare men gillas av barn.',
    href: '/o/moja',
    meta: 'Cykla runt på ön',
  },
  {
    icon: 'ship',
    title: 'Fjäderholmarna',
    description: 'Närmast Stockholm — cirka 25 min från Strömkajen/Slussen. Flera restauranger och hantverksbutiker. Bra första skärgårdstur med små barn.',
    href: '/o/fjaderholmarna',
    meta: 'Närmast Stockholm',
  },
  {
    icon: 'bed',
    title: 'Utö',
    description: 'Större ö i södra skärgården med Utö Värdshus, sandstrand vid Stora Sand och cykelvänliga vägar. Smidigast via Årsta brygga (~40 min).',
    href: '/o/uto',
    meta: '~40 min från Årsta brygga',
  },
  {
    icon: 'sailboat',
    title: 'Sandhamn',
    description: 'Legendär seglardestination med flera restauranger och badmöjligheter. Längre resa — passar äldre barn och familjer som gillar liv och rörelse.',
    href: '/o/sandhamn',
    meta: 'Klassisk destination',
  },
]

export default function BarnvanligaOarPage() {
 const faqJsonLd = {
 '@context': 'https://schema.org',
 '@type': 'FAQPage',
 mainEntity: [
 {
 '@type': 'Question',
 name: 'Vilka öar i Stockholms skärgård har sandstrand?',
 acceptedAnswer: { '@type': 'Answer', text: 'Grinda har en av skärgårdens finaste sandstränder. Utö har Stora Sand på östra sidan. Fjäderholmarna erbjuder klippbad. Möja har flera mindre badvikar längs kusten.' },
 },
 {
 '@type': 'Question',
 name: 'Vilken ö passar yngre barn (1–5 år) i skärgården?',
 acceptedAnswer: { '@type': 'Answer', text: 'Fjäderholmarna är bra start för små barn — cirka 25 min från Strömkajen/Slussen. Vill du något längre bort är Grinda klassikern: cirka 1h 45 min med Waxholmsbåten, lugnt vatten och barnvänligt värdshus.' },
 },
 {
 '@type': 'Question',
 name: 'Hur reser man med barn till skärgården?',
 acceptedAnswer: { '@type': 'Answer', text: 'Från Stockholm går Waxholmsbåtarna från Strömkajen direkt till Grinda, Möja, Sandhamn och fler öar. Restider: ~25 min till Fjäderholmarna, 1h 45 min till Grinda, 2,5–3 tim till Sandhamn. Åk när barnen är pigga.' },
 },
 {
 '@type': 'Question',
 name: 'Vilka öar i skärgården har restauranger för barnfamiljer?',
 acceptedAnswer: { '@type': 'Answer', text: 'Grinda Wärdshus är legendariskt för familjer. Fjäderholmarna har flera restauranger med barnmeny. Sandhamns Värdshus är en klassiker för längre resor. Utö Värdshus erbjuder mysig middag med havet som bakgrund.' },
 },
 ],
 }
 const breadcrumbJsonLd = {
 '@context': 'https://schema.org',
 '@type': 'BreadcrumbList',
 itemListElement: [
 { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://svalla.se' },
 { '@type': 'ListItem', position: 2, name: 'Barnvänliga öar', item: 'https://svalla.se/barnvanliga-oar' },
 ],
 }
 return (
 <>
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
 <CategoryLanding
 heroGradient={['#1a5c3a', '#2d7d5a']}
 eyebrow="Barnvänliga öar"
 title="Skärgård för hela familjen"
 tagline="Öar med sandstränder, grunt vatten och enkla färjeförbindelser — perfekt med barn."
 heroIcon={
 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
 <path d="M12 2L2 7l10 5 10-5-10-5z" />
 <path d="M2 17l10 5 10-5" />
 <path d="M2 12l10 5 10-5" />
 </svg>
 }
 intro={
 <>
 <p>
 Stockholms skärgård är ett drömäventyr för familjer med barn. Men vilka öar är egentligen bäst lämpade för mindre barn, och hur planerar man en familjeresa utan stress? I denna guide presenterar vi de <strong>mest barnvänliga öarna</strong> i Stockholms skärgård — ställen där grunt vatten, sandstränder och familjevänliga restauranger gör det enkelt att njuta tillsammans.
 </p>
 <p>
 Det viktigaste när man väljer ö för familjer är <strong>grunt vatten för baning</strong>, <strong>sandstränder för leksaker och lekar</strong>, och <strong>nära färjeförbindelser</strong> för att undvika långa båtturer med rastlösa barn. Många öar erbjuder också restauranger där barnmenyer finns — ett stort plus när energinivåerna börjar sjunka. Säsongen för familjäventyr löper från maj till september, med juli som högsäsong.
 </p>
 <p>
 Oavsett om ditt barn är två eller tolv år gammal, Stockholms skärgård erbjuder något speciellt för alla. Några öar passar för första gången på sjön — som Fjäderholmarna bara 15 minuter från Slussen. Andra, som Möja och Finnhamn, passar perfekt för äldre barn som vill kombinera utforskning med äventyr. Och öar som Grinda och Sandhamn är klassiker som hela familjen älskar.
 </p>
 </>
 }
 itemsTitle="De bästa barnvänliga öarna"
 itemsDescription="Testade destinationer där barn trivs och föräldrar kopplar av"
 items={ITEMS}
 deeperContent={
 <>
 <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
 Vanliga frågor om barnfamiljer i skärgården
 </h2>

 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Vilka öar har sandstrand?
 </h3>
 <p>
 <strong>Grinda</strong> har en av skärgårdens finaste sandstränder — perfekt för att bygga slott och leka. <strong>Fjäderholmarna</strong> ligger närmare och har klipp- och småbarnsbad. <strong>Möja</strong> har flera mindre badvikar längs kusten, och <strong>Utö</strong> har den fina sandstranden Stora Sand. <strong>Sandhamn</strong> har också flera fina strandbad om man tar sig hela vägen ut.
 </p>

 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Vilken ö passar yngre barn (1–5 år)?
 </h3>
 <p>
 <strong>Fjäderholmarna</strong> är bra start för små barn — cirka 25 minuter från Strömkajen/Slussen, restauranger och hantverk samlat på liten yta. Vill du längre ut är <strong>Grinda</strong> klassikern: cirka 1h 45 min med Waxholmsbåten, lugnt vatten och barnvänligt värdshus. <strong>Finnhamn</strong> är också barnvänligt med STF-vandrarhem och vacker natur.
 </p>

 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Hur reser man med barn till skärgården?
 </h3>
 <p>
 Från Stockholm går Waxholmsbåtarna från Strömkajen direkt till Grinda, Möja, Sandhamn med flera öar. Restider: cirka 25 min till Fjäderholmarna, drygt 1 tim till Vaxholm, 1h 45 min till Grinda och 2,5–3 tim till Sandhamn (snabbåt från Stavsnäs är betydligt snabbare). Många familjer hyr också mindre båt för flexibilitet. Planera resan så att ni åker när barnen är pigga.
 </p>

 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Vilka öar har restauranger för barnfamiljer?
 </h3>
 <p>
 <strong>Grinda Wärdshus</strong> är legendariskt för familjer — barnen älskar miljön och menyn erbjuder klassiska familjerätter. <strong>Fjäderholmarna</strong> har flera restauranger alla med barnmeny. <strong>Sandhamns Värdshus</strong> är en klassiker om du orkar längre båttur. <strong>Utö Värdshus</strong> erbjuder mysig middag med en helt annan känsla än inre skärgården. De flesta större öar har någon form av kiosk eller enkel matservering under sommaren.
 </p>

 <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '28px 0 12px' }}>
 Tips för framgångsrik familjeresa i skärgården
 </h2>

 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Packa smart
 </h3>
 <p>
 Solskydd, bad- och omklädningskläder, snacks och rikligt med vatten är basics. Glöm inte flytväst för barn — krav på passagerarbåt och alltid sunt förnuft. Ta gärna med ett par badskor eller skor som tål vatten för klippor och stenar.
 </p>

 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Planera för vila
 </h3>
 <p>
 Små barn behöver vilotid. Många familjer tar en sen förmiddagsfärja, anländer, lunchar på restaurangen, vilar på eftermiddagen och tar hemfärjan på kvällen. Detta funkar mycket bättre än en hel dag av aktivitet utan vila.
 </p>

 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Välj rätt tid
 </h3>
 <p>
 Juni är ofta härligt för familjer — vattnet börjar bli badbart men turisttrycket är lägre. Juli är högsäsong — vackert väder men trångt. <strong>Augusti</strong> är ett hett tips: vattnet är som varmast, en del barnfamiljer har börjat förbereda skolstart och det blir lugnare på öarna.
 </p>
 </>
 }
 cta={{ label: 'Utforska barnvänliga platser', href: '/upptack' }}
 related={[
 { label: 'Grinda', href: '/o/grinda' },
 { label: 'Finnhamn', href: '/o/finnhamn' },
 { label: 'Sandhamn', href: '/o/sandhamn' },
 { label: 'Aktiviteter', href: '/aktiviteter' },
 { label: 'Färjor & färjeöverbryggningar', href: '/farjor' },
 ]}
 />
 </>
 )
}
