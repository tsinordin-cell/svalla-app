import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
  title: { absolute: 'Skärgården på hösten — September & Oktober Guide | Svalla' },
  description: 'Hösten är skärgårdens bästa hemlighet. Varmt vatten, inga köer och öppna krogar. Guide till skärgården i september och oktober 2026.',
  keywords: ['skärgården höst','skärgård september','skärgård oktober','höst stockholm skärgård','skärgården efter sommaren','hösttur skärgård','september skärgård'],
  alternates: { canonical: 'https://svalla.se/host' },
  openGraph: {
    title: 'Skärgården på hösten | Svalla',
    description: 'September och oktober — varmaste vattnet, inga köer, öppna krogar.',
    url: 'https://svalla.se/host',
  },
}

const ITEMS: LandingItem[] = [
  { icon: '🌊', title: 'Varmaste vattnet på året', description: 'Havet når sin högsta temperatur i slutet av augusti och håller sig badbart långt in i september — utan sommarträngseln på bryggorna.', href: '/blogg/basta-badplatserna', meta: 'Aug–Sep' },
  { icon: '🍂', title: 'Höstvandring på Utö', description: 'Röda löv, lugna leder och Utö Värdshus håller öppet i september. En av årets bästa dagsutflykter.', href: '/blogg/vandring-orno-uto', meta: 'September' },
  { icon: '🍽️', title: 'Krogar utan kö', description: 'Grinda Wärdshus, Finnhamns Café och Sandhamns Värdshus håller öppet i september — nu utan att behöva boka veckor i förväg.', href: '/krogar-och-mat', meta: 'Öppet sep' },
  { icon: '⛵', title: 'Höstsegling — bästa vinden', description: 'September ger stabila sydvästvindar — erfarna seglare vet att hösten är årets bästa segelsäsong i Stockholms skärgård.', href: '/blogg/segling-nyborjare-guide', meta: 'Seglarfavorit' },
  { icon: '📸', title: 'Fotografi i höstljus', description: 'Det gyllene ljuset i september och oktober gör skärgårdslandskapet magiskt. Klippor, stugor och vatten i orange höstskrud.', href: '/karta', meta: 'Fotoresor' },
  { icon: '🚢', title: 'Linjebåtar körs hela hösten', description: 'Waxholmsbolaget trafikerar de flesta öar i september och oktober — höstschema med färre avgångar men fortfarande dagsturer möjliga.', href: '/farjor', meta: 'Kollektivt' },
]

export default function HostPage() {
  const breadcrumb = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://svalla.se' },
      { '@type': 'ListItem', position: 2, name: 'Skärgården på hösten', item: 'https://svalla.se/host' },
    ],
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <CategoryLanding
        heroGradient={['#2a1a08', '#8a4a1a']}
        eyebrow="Säsongsguide"
        title="Skärgården på hösten"
        tagline="September och oktober är skärgårdens bäst bevarade hemlighet. Varmaste vattnet, inga köer och ett landskap som glöder i guld och rött."
        heroIcon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19.2 2.96c1.4 9.3-3.8 15.04-8.2 17.04Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></svg>}
        intro={
          <>
            <p>Fråga en erfaren seglare vilken månad de föredrar och svaret är nästan alltid <strong>september</strong>. Vattnet är varmt, vinden stabil, krogarna öppna — och köerna borta. Skärgården på hösten är en helt annan upplevelse än sommarsäsongen.</p>
            <p>Träden börjar skifta färg i slutet av september, och klipplandskapet lyser upp i röda och orange toner. <strong>Ingen båt krävs</strong> — Waxholmsbolaget kör höstschema med dagliga avgångar till de flesta öar.</p>
          </>
        }
        items={ITEMS}
        itemsTitle="Höstens höjdpunkter"
        deeperContent={
          <>
            <h2 style={{ fontSize: 20, fontWeight: 700, margin: '28px 0 12px' }}>September vs Oktober i skärgården</h2>
            <p><strong>September</strong> är den perfekta månaden — de flesta krogar håller öppet, vattnet är badbart, och löven börjar precis skifta. Dagsutflykter fungerar utmärkt.</p>
            <p><strong>Oktober</strong> är vildare och tystare. Många krogar stänger, men naturen är spektakulär. Passar den som vill ha skärgården helt för sig själv — ta med matsäck och njut av höstkortet.</p>
            <h2 style={{ fontSize: 20, fontWeight: 700, margin: '28px 0 12px' }}>Vanliga frågor om hösten i skärgården</h2>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: '16px 0 6px' }}>Vilka krogar håller öppet i september?</h3>
            <p>Grinda Wärdshus, Finnhamns Café, Sandhamns Värdshus och Utö Värdshus håller normalt öppet hela september — ofta med helgöppet i oktober. Kolla alltid aktuella tider på Svalla.</p>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: '16px 0 6px' }}>Går det att bada i september?</h3>
            <p>Absolut. Havstemperaturen i Stockholms skärgård är som högst i slutet av augusti och håller sig på 18–20°C in i september — varmare än vad många tror.</p>
          </>
        }
        cta={{ label: 'Planera hösttur', href: '/planera' }}
        related={[
          { label: 'Sommar i skärgården', href: '/sommar' },
          { label: 'Vinter i skärgården', href: '/vinter' },
          { label: 'Vandring & natur', href: '/blogg/vandring-orno-uto' },
          { label: 'Färjor höstschema', href: '/farjor' },
        ]}
      />
    </>
  )
}
