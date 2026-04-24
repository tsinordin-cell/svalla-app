import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
  title: 'Populära turer i Stockholms skärgård — Svalla',
  description: 'Kurerade dagsturer, helgturer och fleradagsrutter i Stockholms skärgård. Från Strömkajen, Dalarö, Stavsnäs och Vaxholm.',
  keywords: [
    'skärgårdstur stockholm',
    'dagstur skärgården',
    'helgtur båt skärgård',
    'skärgårdsrundor',
    'båtturer stockholm',
  ],
  openGraph: {
    title: 'Populära turer — Svalla',
    description: 'Kurerade rutter i Stockholms skärgård.',
    url: 'https://svalla.se/populara-turer',
  },
  alternates: { canonical: 'https://svalla.se/populara-turer' },
}

const ITEMS: LandingItem[] = [
  {
    icon: '🌅',
    title: 'Dagstur: Vaxholm–Grinda',
    description: 'Lunch på Grinda Wärdshus, bad och åter samma dag. Klassisk förstatur för nya seglare.',
    href: '/tur/vaxholm-grinda',
    meta: '6–8 timmar',
  },
  {
    icon: '🌇',
    title: 'Helgtur: Stockholm–Sandhamn',
    description: 'Två dagar, en övernattning, full skärgårdsupplevelse. Perfekt för lördag-söndag.',
    href: '/tur/stockholm-sandhamn',
    meta: '2 dagar',
  },
  {
    icon: '🧭',
    title: 'Mellanskärgården-rundan',
    description: 'Finnhamn, Möja, Svartsö — 3–4 dagar genom mellanskärgårdens vackraste vatten.',
    href: '/tur/mellanskargarden',
    meta: '3–4 dagar',
  },
  {
    icon: '🌊',
    title: 'Ytterskärgården (vindröst)',
    description: 'Huvudskär, Sandhamn, Rödlöga — kräver erfarenhet, ger evighetsminnen.',
    href: '/tur/ytterskargarden',
    meta: '5–7 dagar',
  },
  {
    icon: '🛶',
    title: 'Kajaktur: Möja runt',
    description: 'En dag i kajak runt Möja med bryggstopp för fika och bad. Paddelbart året runt.',
    href: '/tur/moja-kajak',
    meta: '1 dag',
  },
  {
    icon: '🚤',
    title: 'Dalarö–Utö–Dalarö',
    description: 'Snabb motorbåtstur söderöver — lunch på Utö, hem innan solnedgång.',
    href: '/tur/dalaro-uto',
    meta: '5–7 timmar',
  },
]

export default function PopularaTurerPage() {
  return (
    <CategoryLanding
      heroGradient={['#1e5c82', '#2d7d8a']}
      eyebrow="Populära turer"
      title="Kurerade rutter att kopiera"
      tagline="Dagsturer, helgturer och fleradagsrutter — testade av Svalla-användare, med tider, stopp och praktisk info."
      heroIcon={
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      }
      intro={
        <>
          <p>
            Den bästa skärgårdsturen är ofta den någon annan redan testat. Här samlar vi Svalla-användares mest delade rutter — allt från klassiska halvdags-rundor till ambitiösa flerdagsseglatser ut i ytterskärgården.
          </p>
          <p>
            Varje tur har <strong>karta, tid, stopp, boendetips och säsongsnoteringar</strong>. Många är loggade med GPS i Svalla och visar faktisk hastighet, distans och väder vid tillfället. Klicka dig in för att se varianter och kopiera rutten till din egen planering.
          </p>
        </>
      }
      itemsTitle="Klassiska rutter"
      itemsDescription="Svårighetsnivå är markerad på varje tursida."
      items={ITEMS}
      deeperContent={
        <>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
            Planera med Svalla
          </h2>
          <p>
            Den som skapar konto kan <strong>spara turer som favoriter</strong>, exportera GPX för kartplotter och få påminnelser när vädret är rätt. Pro-användare får offline-karta, vindprognoser och fler rutter än de listade.
          </p>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
            Saknar din favorittur?
          </h2>
          <p>
            Logga den i Svalla-appen och tagga den som "delningsbar" — den hamnar automatiskt i sökningen och kan bli utvald här. Populära turer är kurerade av redaktionen men bygger helt på användar-data.
          </p>
        </>
      }
      related={[
        { label: 'Segelrutter', href: '/segelrutter' },
        { label: 'Snabbaste vägen', href: '/snabbaste-vagen' },
        { label: 'Planera min tur', href: '/planera-tur' },
        { label: 'Alla turer', href: '/rutter' },
      ]}
    />
  )
}
