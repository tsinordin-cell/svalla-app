import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
  title: 'Camping och tält i skärgården | Naturnära övernattning | Svalla',
  description: 'Hitta campingplatser och tältvänliga platser i skärgården nära bad, vandring, paddling och färjor.',
  keywords: ['camping skärgård', 'tälta skärgård', 'tältplats skärgården', 'camping nära havet', 'tälta ö stockholm'],
  alternates: { canonical: 'https://svalla.se/boende/camping-talt' },
  openGraph: {
    title: 'Camping och tält i skärgården | Svalla',
    description: 'Hitta campingplatser och tältvänliga platser i skärgården nära bad, vandring, paddling och färjor.',
    url: 'https://svalla.se/boende/camping-talt',
  },
}

const CHIPS = [
  'Camping', 'Tältplats', 'Nära bad', 'Paddlingsvänligt',
  'Nära vandring', 'Enkel standard', 'Nära färja',
]

const ITEMS: LandingItem[] = [
  {
    icon: '⛺',
    title: 'Tältvänliga öar',
    description: 'Nåttarö, Arholma och Utö har anvisade tältplatser med tillgång till toaletter och vatten. Allemansrätten gäller men reservat har egna regler.',
    href: '/o/nattaro',
  },
  {
    icon: '🌊',
    title: 'Camping nära bad',
    description: 'Utö Camping ligger direkt vid havet med klippbad inom gångavstånd. Bönsäckan på Utö är en av skärgårdens bäst belägna sandstränder.',
    href: '/o/uto',
  },
  {
    icon: '🛶',
    title: 'Bra platser för paddlare',
    description: 'Tälta och paddla vidare nästa dag. Sörmlands och Stockholms skärgård har ett nätverk av öar som passar kajakpaddlare med tält och drybag.',
    href: '/aktiviteter',
  },
  {
    icon: '🗺',
    title: 'Att tänka på innan du tältar',
    description: 'Regler varierar mellan naturreservat, privat mark och campingplatser. Kontrollera alltid innan du sätter upp tältet — allemansrätten har begränsningar.',
    href: '/vandring-och-natur',
  },
]

export default function CampingPage() {
  return (
    <CategoryLanding
      heroGradient={['#1a5c3a', '#2d7a5c']}
      eyebrow="BOENDE · CAMPING & TÄLT"
      title="Camping och tält i skärgården"
      tagline="Naturnära övernattningar för dig som vill vakna nära klippor, tallar och öppet vatten."
      heroIcon={
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M2 20h20" />
          <path d="M12 3L2 20h20z" />
        </svg>
      }
      intro={
        <>
          <p>
            Camping och tält i skärgården är för dig som vill komma nära naturen. Det kan vara en enkel campingplats, en tältvänlig ö eller en plats som passar extra bra för paddling, vandring och bad. Här samlar vi boenden och platser för dig som vill sova enklare men uppleva mer.
          </p>
          <div style={{
            background: '#fff8e1', border: '1px solid #f59e0b',
            borderRadius: 10, padding: '12px 16px', marginTop: 16,
            fontSize: 13, color: '#92400e', lineHeight: 1.6,
          }}>
            <strong>Viktigt:</strong> Regler kan skilja sig mellan naturreservat, privata marker och campingplatser. Kontrollera alltid lokala regler innan du tältar.
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
            {CHIPS.map(chip => (
              <span key={chip} style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '5px 12px', borderRadius: 999,
                background: 'rgba(26,92,58,0.08)', border: '1px solid rgba(26,92,58,0.18)',
                fontSize: 13, color: '#1a5c3a', fontWeight: 500,
              }}>
                {chip}
              </span>
            ))}
          </div>
        </>
      }
      itemsTitle="Hitta rätt plats"
      items={ITEMS}
      deeperContent={
        <>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
            Allemansrätten och dess gränser
          </h2>
          <p>
            I Sverige får du tälta på mark du inte äger — men inte hur som helst. Du ska välja en plats tillräckligt långt från bostadshus så att de boende inte kan se dig från sitt fönster, och inte ligga kvar mer än ett par nätter på samma plats. I naturreservat gäller reservatets egna föreskrifter, som kan förbjuda tältning helt eller begränsa den till anvisade platser. Fågelskyddsområden med landstigningsförbud 1 april–15 juli gäller på en del öar.
          </p>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
            Campingplatser med service
          </h2>
          <p>
            Vill du ha el, dusch och toaletter finns det etablerade campingplatser på bland annat <strong>Utö</strong>, <strong>Arholma</strong> och <strong>Nåttarö</strong>. Dessa bokas i förväg under sommaren — speciellt midsommar och tredje veckan i juli är fullbokade tidigt.
          </p>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
            Packlista för tältning i skärgård
          </h2>
          <p>
            Ta med alla ärenden: vatten för minst en dag (vattenkällor på öar är begränsade), sopor hem (ingenstans att lämna dem), sovsäck anpassad för 8–12°C nätter även i juli, och vattentät tältduk. En gasbrännare är att föredra framför öppen eld — eldningsförbud gäller ofta under torr sommar.
          </p>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '40px 0 8px' }}>
            Hitta campingplatser
          </h2>
          <p style={{ margin: '0 0 14px' }}>
            Sök efter campingplatser med service i Stockholms skärgård hos dessa sajter:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <a href="https://www.camping.se/campingar/?region=stockholms-lan" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: 10, background: 'rgba(26,92,58,0.06)', border: '1px solid rgba(26,92,58,0.18)', color: '#1a5c3a', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
              <span>camping.se — Stockholms län</span><span style={{ opacity: 0.55 }}>↗</span>
            </a>
            <a href="https://www.naturkartan.se/sv" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: 10, background: 'rgba(26,92,58,0.06)', border: '1px solid rgba(26,92,58,0.18)', color: '#1a5c3a', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
              <span>Naturkartan — friluftsplatser i skärgården</span><span style={{ opacity: 0.55 }}>↗</span>
            </a>
          </div>
        </>
      }
      cta={{
        label: 'Planera en naturnära tur med Thorkel',
        href: '/thorkel',
        secondaryLabel: 'Vandring & natur',
        secondaryHref: '/vandring-och-natur',
      }}
      related={[
        { label: 'Stugor & stugbyar', href: '/boende/stugor-stugbyar' },
        { label: 'Hotell & vandrarhem', href: '/boende/hotell-vandrarhem' },
        { label: 'B&B', href: '/boende/bb' },
        { label: 'Allt boende', href: '/boende' },
        { label: 'Vandring & natur', href: '/vandring-och-natur' },
      ]}
    />
  )
}
