import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
  title: 'Aktiviteter i Stockholms skärgård — Svalla',
  description: 'Segling, paddling, fiske, SUP, kajak, dykning och guidade turer i Stockholms skärgård. Allt du kan göra på och vid vattnet.',
  keywords: [
    'aktiviteter stockholms skärgård',
    'segling stockholm',
    'kajak skärgården',
    'paddling skärgård',
    'fiske stockholms skärgård',
    'sup skärgården',
  ],
  openGraph: {
    title: 'Aktiviteter i Stockholms skärgård — Svalla',
    description: 'Segling, paddling, fiske, SUP och guidade turer i skärgården.',
    url: 'https://svalla.se/aktiviteter',
  },
  alternates: { canonical: 'https://svalla.se/aktiviteter' },
}

const ITEMS: LandingItem[] = [
  {
    icon: '⛵',
    title: 'Segling',
    description: 'Från nybörjarkurser i Saltsjön till kappseglingar runt Sandhamn — och charter om du inte har egen båt.',
    href: '/segelrutter',
    meta: 'Hela säsongen',
  },
  {
    icon: '🛶',
    title: 'Paddling & kajak',
    description: 'Havskajak i ytterskärgården eller stillsam SUP i en naturhamn — skärgården är Europas bästa paddelrevir.',
    href: '/platser?kategori=paddling',
  },
  {
    icon: '🎣',
    title: 'Fiske',
    description: 'Gädda i vassbrynen, havsöring längs kusten, strömming från bryggan. Regler, fiskekort och fiskeplatser.',
    href: '/platser?kategori=fiske',
  },
  {
    icon: '🏊',
    title: 'Bad & simning',
    description: 'Klassiska klippbad, barnvänliga sandstränder och iskalla morgondopp — varje månad har sin plats.',
    href: '/bastu-och-bad',
  },
  {
    icon: '🥾',
    title: 'Vandring',
    description: 'Sörmlandsleden, Roslagsleden och kustnära naturreservat — lätta dagsturer eller flera dagar med tält.',
    href: '/vandring-och-natur',
  },
  {
    icon: '🚤',
    title: 'Motorbåt & RIB',
    description: 'Dagsturer med egen båt, hyrbåt eller guide. Rekommenderade rutter och tankställen.',
    href: '/populara-turer',
  },
  {
    icon: '🤿',
    title: 'Dykning & snorkling',
    description: 'Vrakdykning i Dalarö, snorkling i Möjas grunda vikar — skärgården är ett undervattensmuseum.',
    href: '/platser?kategori=dyk',
  },
  {
    icon: '🧊',
    title: 'Vinteraktiviteter',
    description: 'Långfärdsskridsko, isfiske och vedeldade bastur — skärgården är magisk även i januari.',
    href: '/platser?kategori=vinter',
  },
]

export default function AktiviteterPage() {
  return (
    <CategoryLanding
      heroGradient={['#1e5c82', '#2d7d8a']}
      eyebrow="Aktiviteter"
      title="Gör skärgården till ditt äventyr"
      tagline="Segling, paddling, fiske, bad, vandring och dykning — välj aktivitet efter säsong, nivå och tid."
      heroIcon={
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M22 8 12 2 2 8l10 6 10-6Z" />
          <path d="m2 16 10 6 10-6" />
          <path d="m2 12 10 6 10-6" />
        </svg>
      }
      intro={
        <>
          <p>
            Stockholms skärgård är Sveriges mest mångsidiga uteplats. Den som bara ser den från färjedäcket missar hälften — den riktiga skärgården upplevs med paddel, segel, spö eller vandringskänga.
          </p>
          <p>
            Här hittar du aktiviteter sorterade efter säsong och nivå. Nybörjarvänligt är tydligt märkt, liksom vilka aktiviteter som kräver licens (fiskekort, seglarbevis) eller bokning. Alla rekommendationer är från användare som faktiskt gjort det.
          </p>
        </>
      }
      itemsTitle="Aktiviteter efter intresse"
      itemsDescription="Säsong, nivå och praktisk info finns på varje aktivitetssida."
      items={ITEMS}
      deeperContent={
        <>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
            När är bästa säsongen?
          </h2>
          <p>
            <strong>Maj–juni</strong> är peak för segling, paddling och första baden — då är vattnet kallt men dagarna långa. <strong>Juli–augusti</strong> har varmast vatten och flest evenemang, men också trängsel i populära hamnar. <strong>September</strong> ger klart vatten, tystare hamnar och bäst fiske. <strong>Oktober–april</strong> är för de som gillar tom skärgård, vedeldade bastur och långfärdsskridsko.
          </p>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
            Allemansrätten i skärgården
          </h2>
          <p>
            Allemansrätten gäller men med lokala variationer — vissa öar har landstigningsförbud under fågelskyddsperioden (1 april–15 juli) och naturreservat kan ha egna regler. På varje plats- och aktivitetssida listar vi restriktioner i klartext.
          </p>
        </>
      }
      related={[
        { label: 'Populära turer', href: '/populara-turer' },
        { label: 'Segelrutter', href: '/segelrutter' },
        { label: 'Vandring & natur', href: '/vandring-och-natur' },
        { label: 'Bastu & bad', href: '/bastu-och-bad' },
        { label: 'Kartan', href: '/platser' },
      ]}
    />
  )
}
