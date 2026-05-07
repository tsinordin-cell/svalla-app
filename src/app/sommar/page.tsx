import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
  title: 'Skärgården på sommaren 2026 — Guide & Tips | Svalla',
  description: 'Allt du behöver veta om skärgården på sommaren. Bästa öarna, krogar, badplatser och hur du tar dig dit utan båt. Uppdaterad guide för sommaren 2026.',
  keywords: ['skärgården sommar','sommarsemester skärgård','skärgård juli','skärgård juni','bästa tid skärgården','sommar stockholm skärgård','skärgård utan båt sommar','sandhamn sommar','utö sommar','grinda sommar'],
  alternates: { canonical: 'https://svalla.se/sommar' },
  openGraph: {
    title: 'Skärgården på sommaren 2026 | Svalla',
    description: 'Bästa öarna, krogar och badplatser. Planera din sommar i skärgården.',
    url: 'https://svalla.se/sommar',
  },
}

const ITEMS: LandingItem[] = [
  { icon: '⛴', title: 'Sandhamn — sommarens klassiker', description: 'KSSS-hamnen full av segelbåtar, fantastisk sandstrand och Sandhamns Värdshus. Boka bord tidigt — fullt varje helg i juli.', href: '/o/sandhamn', meta: 'Jun–Aug' },
  { icon: '🏊', title: 'Bästa badplatserna', description: 'De 12 bästa klipp- och sandstränderna i Stockholms skärgård — med GPS-koordinater och kollektivtrafikinfo.', href: '/blogg/basta-badplatserna', meta: 'Sommarguide' },
  { icon: '🚢', title: 'Ingen båt krävs', description: 'Waxholmsbolaget, Pendelbåten och SL tar dig ut till de flesta öarna direkt från Stockholm. Sommartidtabeller gäller jun–aug.', href: '/farjor', meta: 'Gratis med SL' },
  { icon: '🍽️', title: 'Skärgårdskrogar öppna nu', description: 'Grinda Wärdshus, Utö Värdshus, Finnhamns Café — krogar med sommaröppet. Boka bord via Svalla.', href: '/krogar-och-mat', meta: '60+ krogar' },
  { icon: '🏕️', title: 'Övernatta i naturen', description: 'Allemansrätten ger rätt att tälta — Utö camping, Arholma och Finnhamn är populäraste sommarplatserna.', href: '/boende', meta: 'Camping & stugor' },
  { icon: '🚲', title: 'Cykelöar utan bil', description: 'Möja, Gällnö och Utö är bilfria — hyr cykel vid bryggan och utforska hela ön på ett par timmar.', href: '/aktivitet/cykla', meta: 'Familjefavorit' },
]

export default function SommarPage() {
  const breadcrumb = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://svalla.se' },
      { '@type': 'ListItem', position: 2, name: 'Skärgården på sommaren', item: 'https://svalla.se/sommar' },
    ],
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <CategoryLanding
        heroGradient={['#1a4a5e', '#2d9a6e']}
        eyebrow="Säsongsguide"
        title="Skärgården på sommaren"
        tagline="Juni, juli och augusti — när skärgården vaknar till liv. Allt du behöver veta för att planera din sommarsemester 2026."
        heroIcon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>}
        intro={
          <>
            <p>Sommaren är högsäsongen i skärgården — och med rätt planering kan du undvika trängseln och hitta stunderna när allt är perfekt. <strong>Juli är varmast men fullt</strong>, medan juni och sen augusti ger dig sommarkänslan utan köerna.</p>
            <p>Det bästa? <strong>Du behöver ingen egen båt.</strong> Waxholmsbolaget och SL trafikerar skärgårdens öar hela sommaren — köp ett SL-kort och du når Grinda, Finnhamn och Sandhamn direkt från Strömkajen.</p>
          </>
        }
        items={ITEMS}
        itemsTitle="Sommarsäsongens höjdpunkter"
        deeperContent={
          <>
            <h2 style={{ fontSize: 20, fontWeight: 700, margin: '28px 0 12px' }}>Bästa månaderna att besöka skärgården</h2>
            <p><strong>Juni</strong> är underskattat — öppnar kronor, vatten börjar bli badbart, och inga stora folkmassor. Perfekt för dagsturer till Fjäderholmarna eller Vaxholm.</p>
            <p><strong>Juli</strong> är högsäsongen. Allt är öppet, solen skiner och alla är ute. Boka hamnar och bord minst två veckor i förväg om du planerar till populära öar som Sandhamn eller Utö.</p>
            <p><strong>Augusti</strong> är hemliga tipset. Vattnet är som varmast, skolorna har börjat och skärgården andas ut. Restauranger håller öppet, men köerna är borta.</p>
            <h2 style={{ fontSize: 20, fontWeight: 700, margin: '28px 0 12px' }}>Vanliga frågor om sommaren i skärgården</h2>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: '16px 0 6px' }}>Hur tidigt bör man boka färjebiljetter?</h3>
            <p>Vardagar behöver du sällan boka i förväg. Helgerna i juli — boka minst ett par dagar i förväg, särskilt Cinderellabåten till Sandhamn.</p>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: '16px 0 6px' }}>Vilken ö passar barnfamiljer bäst på sommaren?</h3>
            <p><strong>Grinda</strong> och <strong>Finnhamn</strong> är favoriterna — korta båtresor, sandstränder och bra mat. Fjäderholmarna är perfekt för dagsturer med de minsta.</p>
          </>
        }
        cta={{ label: 'Planera din sommartur', href: '/planera' }}
        related={[
          { label: 'Höst i skärgården', href: '/host' },
          { label: 'Dagsplaner', href: '/resetips' },
          { label: 'Badplatser', href: '/blogg/basta-badplatserna' },
          { label: 'Färjor & tider', href: '/farjor' },
        ]}
      />
    </>
  )
}
