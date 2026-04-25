import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
  title: 'Segelrutter i Stockholms skärgård — Svalla',
  description: 'Kurerade segelrutter för Stockholms skärgård. Dagseglingar, helgseglatser och långa ytterskärgårdsturer — med vindriktning, djup och naturhamnar.',
  keywords: [
    'segelrutter stockholms skärgård',
    'seglatser stockholm',
    'segelturer skärgård',
    'kappsegling sandhamn',
    'segla stockholms skärgård',
  ],
  openGraph: {
    title: 'Segelrutter — Svalla',
    description: 'Kurerade segelrutter i Stockholms skärgård.',
    url: 'https://svalla.se/segelrutter',
  },
  alternates: { canonical: 'https://svalla.se/segelrutter' },
}

const ITEMS: LandingItem[] = [
  {
    icon: '⛵',
    title: 'Nybörjarsegling: Saltsjön',
    description: 'Inga öppna hav, god vind och många naturhamnar — perfekt första-seglingen med familj eller segelskola.',
    href: '/segelrutter/saltsjon',
    meta: 'Nivå 1',
  },
  {
    icon: '🌬️',
    title: 'Mellanskärgården (västanvind)',
    description: 'Grinda, Finnhamn, Möja — en vecka med oftast gynnsam vind. Klassisk svensk seglarsommar.',
    href: '/segelrutter/mellanskargarden',
    meta: 'Nivå 2',
  },
  {
    icon: '🌊',
    title: 'Ytterskärgården',
    description: 'Sandhamn, Huvudskär, Rödlöga — öppna vatten, tidvattenströmmar, stora upplevelser.',
    href: '/segelrutter/ytterskargarden',
    meta: 'Nivå 3',
  },
  {
    icon: '🏁',
    title: 'Regattor 2026',
    description: 'Gotland Runt, Midsommarseglingen, Sandhamn Race Week — kappseglingskalendern.',
    href: '/evenemang?kategori=regatta',
  },
  {
    icon: '🗺️',
    title: 'Segelkort',
    description: 'Rekommenderade sjökort (papper + plotter), aktuella farledsnoteringar och faror.',
    href: '/tips?kategori=segelkort',
  },
  {
    icon: '🧭',
    title: 'Vind & väder',
    description: 'Så läser du SMHI:s sjöprognos och när du ska vänta på en dags-avbrott.',
    href: '/tips?kategori=vader',
  },
]

export default function SegelrutterPage() {
  return (
    <CategoryLanding
      heroGradient={['#1e5c82', '#2d7d8a']}
      eyebrow="Segelrutter"
      title="Segla Stockholms skärgård"
      tagline="Kurerade segelrutter sorterade efter nivå och tid. Vindriktning, djup och naturhamnar — allt på ett ställe."
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
            Stockholms skärgård är ett av Europas bästa seglingsrevir — 30 000 öar, skyddade farleder, pålitlig vind och sommarkvällar som aldrig tar slut. Här samlar vi rutter för alla nivåer, från din första helgsegling ut ur Saltsjön till veckolånga äventyr i ytterskärgården.
          </p>
          <p>
            Varje rutt listar <strong>distans, tid vid normal vind, stopp, naturhamnar, vindanpassningar och vilka sjökort du behöver</strong>. Rutterna är testade av Svalla-seglare och uppdateras löpande med säsongsnoteringar (farled stängd, brygga borta, ny restaurang).
          </p>
        </>
      }
      itemsTitle="Rutter efter svårighetsnivå"
      itemsDescription="Nivå 1–3 är vår egen skala. Se varje ruttsida för exakta krav."
      items={ITEMS}
      deeperContent={
        <>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
            Förberedelser
          </h2>
          <p>
            Innan du ger dig iväg: kontrollera <strong>SMHI:s sjöprognos</strong>, <strong>Sjöfartsverkets farledsmeddelanden</strong> och se till att ha <strong>reservgas, nödhandradio och papperssjökort</strong>. Mobiltäckning är dålig i ytterskärgården — Svalla-appen fungerar offline för GPS-logg och kartor.
          </p>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
            Säkerhet
          </h2>
          <p>
            Anmäl alltid avreseplan till någon på land. Flytväst på däck. Håll koll på trötthet — även goda seglare gör misstag efter 14 timmar. Om något går fel, ring <strong>112</strong> och begär Sjöräddningen (SSRS).
          </p>
        </>
      }
      related={[
        { label: 'Populära turer', href: '/populara-turer' },
        { label: 'Hamnar & bryggor', href: '/hamnar-och-bryggor' },
        { label: 'Snabbaste vägen', href: '/snabbaste-vagen' },
        { label: 'Planera min tur', href: '/planera-tur' },
      ]}
    />
  )
}
