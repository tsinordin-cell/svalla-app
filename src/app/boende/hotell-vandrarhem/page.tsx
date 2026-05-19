import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
  title: 'Hotell och vandrarhem i skärgården | Bo nära havet | Svalla',
  description: 'Hitta hotell, värdshus och vandrarhem i skärgården för weekend, kortsemester och övernattning nära havet.',
  keywords: ['hotell skärgård', 'vandrarhem skärgård', 'värdshus skärgården', 'bo skärgård weekend', 'hotell sandhamn', 'hotell utö'],
  alternates: { canonical: 'https://svalla.se/boende/hotell-vandrarhem' },
  openGraph: {
    title: 'Hotell och vandrarhem i skärgården | Svalla',
    description: 'Hitta hotell, värdshus och vandrarhem i skärgården för weekend, kortsemester och övernattning nära havet.',
    url: 'https://svalla.se/boende/hotell-vandrarhem',
  },
}

const CHIPS = [
  'Hotell', 'Vandrarhem', 'Värdshus', 'Weekend',
  'Nära restaurang', 'Havsutsikt', 'Nära färja',
]

const ITEMS: LandingItem[] = [
  {
    icon: '🏨',
    title: 'Bästa öarna för hotellweekend',
    description: 'Sandhamn Seglarhotell, Utö Värdshus och Grinda Wärdshus är klassikerna. Alla nås med reguljär Waxholmsbåt utan bil.',
    href: '/o/sandhamn/boende',
  },
  {
    icon: '🍽',
    title: 'Bo nära skärgårdskrog',
    description: 'Välj ett värdshus som kombinerar boende och restaurang. Utö Värdshus och Sandhamns Värdshus räknas till de bästa matupplevelserna i hela skärgården.',
    href: '/o/uto/boende',
  },
  {
    icon: '🏡',
    title: 'Enkla boenden för första skärgårdsresan',
    description: 'Finnhamn STF-vandrarhem är ett av de bäst tillgängliga — prisvärt, välhållet och lätt att nå med båt från Stockholm.',
    href: '/o/finnhamn/boende',
  },
  {
    icon: '🗺',
    title: 'Kombinera boende med dagsplan',
    description: 'Boka övernattning och lägg sedan upp dagen kring aktiviteter, mat och utflykter. Thorkel hjälper dig sätta ihop helheten.',
    href: '/thorkel',
  },
]

export default function HotellPage() {
  return (
    <CategoryLanding
      heroGradient={['#1e4e7a', '#1e6e8a']}
      eyebrow="BOENDE · HOTELL & VANDRARHEM"
      title="Hotell och vandrarhem i skärgården"
      tagline="Bo bekvämt nära havet, hamnen och skärgårdens bästa restauranger."
      heroIcon={
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M2 20h20" />
          <path d="M4 20V10l8-6 8 6v10" />
          <path d="M9 20v-6h6v6" />
        </svg>
      }
      intro={
        <>
          <p>
            Hotell, värdshus och vandrarhem passar dig som vill göra skärgården enkel. Kom ut med båt eller färja, checka in nära vattnet och ha restauranger, badplatser och promenader inom räckhåll. Här hittar du boenden för weekend, kortsemester och spontana övernattningar.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 20 }}>
            {CHIPS.map(chip => (
              <span key={chip} style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '5px 12px', borderRadius: 999,
                background: 'rgba(30,78,122,0.08)', border: '1px solid rgba(30,78,122,0.18)',
                fontSize: 13, color: '#1e4e7a', fontWeight: 500,
              }}>
                {chip}
              </span>
            ))}
          </div>
        </>
      }
      itemsTitle="Välj typ av boende"
      items={ITEMS}
      deeperContent={
        <>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
            Klassiska värdshus i skärgården
          </h2>
          <p>
            Skärgårdens värdshus är en kategori för sig — historiska byggnader i gamla lotsstationer och fiskelägen som kombiner restaurang, bar och boende. <strong>Utö Värdshus</strong> och <strong>Sandhamns Värdshus</strong> rankas år efter år bland Sveriges bästa, och Grinda Wärdshus är känt för sin mat och naturnära läge. Boka restaurang och rum separat — de bokar ut i olika takt.
          </p>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
            Vandrarhem — det billigaste sättet att sova ute
          </h2>
          <p>
            STF driver vandrarhem på Finnhamn, Möja och Arholma. Priserna börjar kring 300–450 kr/natt i sovsal, 700–1 000 kr för eget rum. Självhushåll med gemensamt kök. Perfekt för den som vill ha ett basläger och spendera dagarna ute på ön. Boka i förväg — speciellt Finnhamn och Arholma är populära.
          </p>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
            Tips för spontan övernattning
          </h2>
          <p>
            September och maj är de bästa månaderna för spontana hotellbokningar — säsongen är lång nog för bra upplevelser men kortsäsongspriserna gäller fortfarande. Vaxholm och Sandhamn har boenden som tar emot gäster med kort varsel, medan de mer avlägsna öarna kräver bokning.
          </p>
        </>
      }
      cta={{
        label: 'Hitta en helgplan med Thorkel',
        href: '/thorkel',
        secondaryLabel: 'Alla öar',
        secondaryHref: '/resmal',
      }}
      related={[
        { label: 'Stugor & stugbyar', href: '/boende/stugor-stugbyar' },
        { label: 'Camping & tält', href: '/boende/camping-talt' },
        { label: 'B&B', href: '/boende/bb' },
        { label: 'Allt boende', href: '/boende' },
        { label: 'Krogar & mat', href: '/krogar-och-mat' },
      ]}
    />
  )
}
