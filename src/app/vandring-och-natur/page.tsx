import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
  title: 'Vandring & natur i Stockholms skärgård — Svalla',
  description: 'Naturreservat, vandringsleder och ödemarksupplevelser i Stockholms skärgård. Dagsturer, flerdagsvandringar och orörda öar.',
  keywords: [
    'vandring stockholms skärgård',
    'naturreservat skärgård',
    'vandringsleder stockholm',
    'skärgårdsled',
    'roslagsleden',
    'sörmlandsleden',
  ],
  openGraph: {
    title: 'Vandring & natur i Stockholms skärgård — Svalla',
    description: 'Naturreservat och vandringsleder i skärgården.',
    url: 'https://svalla.se/vandring-och-natur',
  },
  alternates: { canonical: 'https://svalla.se/vandring-och-natur' },
}

const ITEMS: LandingItem[] = [
  {
    icon: '🥾',
    title: 'Roslagsleden',
    description: '19 etapper mellan Danderyd och Grisslehamn — skärgårdsnära hela vägen. Tält, vandrarhem, buss hem.',
    href: '/platser?kategori=roslagsleden',
  },
  {
    icon: '🌲',
    title: 'Sörmlandsleden (skärgårdsdelar)',
    description: 'Tyresta nationalpark och kuststräckorna söderut — vildmark 40 minuter från city.',
    href: '/platser?kategori=sormlandsleden',
  },
  {
    icon: '🏞️',
    title: 'Naturreservat',
    description: 'Björnö, Finnhamn, Ängsö, Nåttarö, Huvudskär — öar där du får gå nästan var du vill.',
    href: '/platser?kategori=naturreservat',
  },
  {
    icon: '🐦',
    title: 'Fågelskyddsområden',
    description: 'Platser med landstigningsförbud 1 apr–15 jul — och hur du respekterar dem från vattnet.',
    href: '/platser?kategori=fagelskydd',
  },
  {
    icon: '⛺',
    title: 'Tältning & vindskydd',
    description: 'Anvisade tältplatser och vindskydd på öarna — allemansrätt gäller men inte överallt.',
    href: '/platser?kategori=taltning',
  },
  {
    icon: '🌅',
    title: 'Utsiktspunkter',
    description: 'Höjder, fyrar och klippor med bäst sikt — perfekt för soluppgång, solnedgång och vinddygd.',
    href: '/platser?kategori=utsikt',
  },
]

export default function VandringOchNaturPage() {
  return (
    <CategoryLanding
      heroGradient={['#2d7d8a', '#1e5c82']}
      eyebrow="Vandring & natur"
      title="Ta skärgården till fots"
      tagline="Naturreservat, vandringsleder och orörda öar — från lätta dagsturer till fleradagsvandringar med tält."
      heroIcon={
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M4 20h16" />
          <path d="M8 20 14 6l6 14" />
          <path d="m11 13 3-3 3 3" />
        </svg>
      }
      intro={
        <>
          <p>
            Stockholms skärgård är inte bara vatten — många öar har riktig vildmarkskänsla med hällmarker, barrskog och klippor som stupar rakt ner i havet. <strong>Roslagsleden</strong> tar dig från Danderyds tunnelbana till Grisslehamn på 19 etapper, och <strong>Sörmlandsleden</strong> börjar mitt i Tyresta nationalpark — allt inom buss- eller båtavstånd från Slussen.
          </p>
          <p>
            Här listar vi leder, naturreservat och bra stopp-punkter — med tält- och vindskyddstips, vattenpåfyllning och väderindikatorer. Allemansrätten är grunden, men några platser har egna regler du ska känna till.
          </p>
        </>
      }
      itemsTitle="Naturens olika uttryck"
      items={ITEMS}
      deeperContent={
        <>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
            Fågelskyddet under våren
          </h2>
          <p>
            Från <strong>1 april till 15 juli</strong> är många öar, kobbar och vikar skyddade för häckande fåglar. Du får inte landstiga, ankra för nära eller paddla in i skyddszonen. Svalla markerar alla fågelskyddsområden på kartan och varje platssida har aktuell status.
          </p>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
            Packa smart för skärgård
          </h2>
          <p>
            Skärgårdsvädret ändras snabbt. Lager-på-lager, vindtätt ytterplagg, vattentät inslagning av elektronik och <strong>extra dag med mat</strong> om en färja skulle ställas in. Eld upp och vatten finns sällan där du tror — planera långt innan.
          </p>
        </>
      }
      related={[
        { label: 'Alla öar', href: '/rutter?vy=oar' },
        { label: 'Aktiviteter', href: '/aktiviteter' },
        { label: 'Tips & artiklar', href: '/tips' },
        { label: 'Kartan', href: '/platser' },
      ]}
    />
  )
}
