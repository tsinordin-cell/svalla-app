import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
  title: { absolute: 'Halland — Västkustens sandstränder och fästningsstäder | Svalla' },
  description: 'Halland: Varbergs fästning, Tylösand, Falkenberg, Båstad och Laholmsbukten. Utforska Hallands långa kust med Svalla.',
  keywords: [
    'halland kust',
    'halland segla',
    'varberg',
    'varberg fästning',
    'tylösand',
    'falkenberg',
    'båstad',
    'laholmsbukten',
    'halland strand',
    'halland gästhamn',
    'halland naturhamn',
    'halland båt',
    'halland segling',
    'kattegatt',
    'halland sommar',
  ],
  openGraph: {
    title: 'Halland — Västkustens sandstränder och fästningsstäder | Svalla',
    description: 'Logga dina båtturer och hitta de bästa platserna längs Hallands kust.',
    url: 'https://svalla.se/halland',
  },
  alternates: { canonical: 'https://svalla.se/halland' },
}

const ITEMS: LandingItem[] = [
  {
    icon: '🗺️',
    title: 'Karta över Halland',
    description: 'Alla verifierade platser längs Hallands kust — gästhamnar, stränder, krogar och sjömackar.',
    href: '/upptack',
    meta: 'Gratis',
  },
  {
    icon: '🏰',
    title: 'Varberg och fästningen',
    description: 'Varbergs medeltida fästning är ett av Sveriges bäst bevarade fästningskomplex. Gästhamnen ligger i fästningens skugga — ett unikt läge.',
    href: '/platser',
  },
  {
    icon: '🏖️',
    title: 'Tylösand och Skrea strand',
    description: 'Halland har Sveriges finaste sandstränder. Tylösand utanför Halmstad är ett ikoniskt resmål med surf, sol och strandbarer.',
    href: '/platser',
  },
  {
    icon: '⛵',
    title: 'Segelrutter i Kattegatt',
    description: 'Kattegatt erbjuder öppet hav-segling mellan Bohuslän och Öresund. Halland är en perfekt mellanstopp längs den klassiska sydkustturen.',
    href: '/segelrutter',
  },
  {
    icon: '📍',
    title: 'Logga dina turer',
    description: 'Spåra din färd längs Hallands kust med GPS, lägg till bilder och dela med vänner.',
    href: '/logga-in',
  },
  {
    icon: '🎾',
    title: 'Båstad och tennisbyn',
    description: 'Båstad är känt för tennis och en levande sommarscen. Gästhamnen är välbesökt under sommaren och restaurangerna håller hög klass.',
    href: '/logga-in',
  },
]

export default function HallandPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Vad är Halland känt för längs kusten?',
        acceptedAnswer: { '@type': 'Answer', text: 'Halland är känt för sina långa sandstränder, Varbergs medeltida fästning, Tylösand och den levande sommarbyn Båstad. Längs kusten finns välutrustade gästhamnar, en lång tradition av västkustfiske och ett aktivt seglarliv. Kattegatt utanför Halland är ett populärt havsseglingsvatten.' },
      },
      {
        '@type': 'Question',
        name: 'Vilka är de bästa hamnarna i Halland?',
        acceptedAnswer: { '@type': 'Answer', text: 'Varberg gästhamn är regionens nav och har ett fantastiskt läge vid den medeltida fästningen. Falkenbergs gästhamn vid Ätrans mynning är populär bland seglare. Båstad marina i söder är välutrustad och nära stadens restauranger och shoppinggator.' },
      },
      {
        '@type': 'Question',
        name: 'Hur är segling längs Hallands kust?',
        acceptedAnswer: { '@type': 'Answer', text: 'Halland erbjuder relativt öppen kustsegling utmed Kattegatt. Kusten saknar de skyddande öarna som Bohuslän har, men vindförhållandena är stabila och hamnarna är välplacerade med 2–4 timmars segling mellan sig. Sommarvinden från sydväst passar utmärkt för nordgående segling. Var uppmärksam på Kattegattets snabba väderombyte.' },
      },
      {
        '@type': 'Question',
        name: 'Vad bör man inte missa i Halland?',
        acceptedAnswer: { '@type': 'Answer', text: 'Varbergs fästning är ett absolut måste — en av Sveriges bäst bevarade fästningar med fantastisk utsikt. Tylösand utanför Halmstad är Sveriges mest kända strandort. Falkenberg gammelstad med sin välbevarade träbyggnadsarkitektur och Tångabergs naturreservat är också högt rekommenderade stopp.' },
      },
    ],
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://svalla.se' },
      { '@type': 'ListItem', position: 2, name: 'Halland', item: 'https://svalla.se/halland' },
    ],
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <CategoryLanding
        heroGradient={['#0a2818', '#1a5030']}
        eyebrow="Halland"
        title="Västkustens sandstränder och fästningsstäder"
        tagline="Från Varbergs medeltida fästning till Tylösands sandstränder och Båstads tenniskultur — Svalla hjälper dig logga varje tur längs Hallands unika kust."
        heroIcon={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z" />
            <path d="M2 12h20" />
          </svg>
        }
        intro={
          <>
            <p>
              Halland är en av Sveriges mest varierade kustslätt — och en region som alltför ofta förbises till förmån för Bohuslän i norr och Skåne i söder. <strong>Långa sandstränder, en medeltida fästningsstad och levande sommarbyer</strong> ger en kustupplevelse som är annorlunda och genuint vacker. Från Kungsbackafjorden i norr till Båstad och Laholmsbukten i söder sträcker sig nästan 15 mil av kattegattskust.
            </p>
            <p>
              Varberg dominerar med sin välbevarade 1200-talsfästning som reser sig direkt ur klippan vid havet. Gästhamnen ligger i fästningens omedelbara närhet — ett unikt läge som ger en historisk atmosfär utan motstycke längs svenska kusten. Tylösand utanför Halmstad är känt som Sveriges strand-mekka med surfing, beachvolleyboll och ett aktivt nattliv under sommarmånaderna.
            </p>
            <p>
              Med Svalla loggar du alla etapper längs Kattegatt, hittar gästhamnar, stränder och krogar på kartan och kan följa andra båtfolks turer längs samma välbesökta kust. Halland är ett perfekt mellanstopp på väg norrut mot Bohuslän eller söderut mot Öresund och Danmark.
            </p>
            <p>
              Kattegatt är ett öppet farvatten med snabbt väderombyte — planera för alternativa hamnar och håll koll på väderprognosen.
            </p>
          </>
        }
        itemsTitle="Halland med Svalla"
        itemsDescription="Allt du behöver för en tur längs Hallands kust."
        items={ITEMS}
        deeperContent={
          <>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
              Varberg — fästningsstaden vid havet
            </h2>
            <p>
              Varberg är Hallands viktigaste stad för båtfolk. Gästhamnen är välutrustad med god service och ett fantastiskt läge direkt vid fästningen. Staden erbjuder allt från proviantering och utrustningsbutiker till välrenommerade restauranger och det legendariska <strong>Getteröns naturreservat</strong> för fågelskådning.
            </p>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
              Varbergs fästning
            </h3>
            <p>
              Fästningen är en av Sveriges mest välbevarade medeltida anläggningar. Byggd på 1200-talet och förstärkt under 1600-talet dominerar den havet utanför och syns på långt håll från sjösidan. <strong>Varbergsmannen</strong> — ett av världens bäst bevarade medelåldersmänskliga fynd — visas på fästningens museum.
            </p>
            <p>
              En promenad längs fästningsmurarna i solnedgången med utsikt över Kattegatt är en av Hallands absoluta höjdpunkter.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '32px 0 12px' }}>
              Tylösand och Hallands stränder
            </h2>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
              Tylösand — Sveriges strand-mekka
            </h3>
            <p>
              Tylösand utanför Halmstad är en av Sveriges mest kända strandorter — lång vit sandstrand, surfing och ett aktivt sommarliv. <strong>Tylösand Hotel</strong> är ett ikoniskt hotell och restaurang med lång historia. Under juli och tidig augusti är stranden fullpackad, men det finns utrymme för alla längs den långa kusten.
            </p>
            <p>
              Falkenberg söder om Halmstad har en lika vacker strand i <strong>Skrea strand</strong> — med lite lugnare atmosfär och ett genuint fiskeläge i gammelstaden vid Ätrans mynning.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '32px 0 12px' }}>
              Båstad och Laholmsbukten
            </h2>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
              Båstad — tennis och sommarkultur
            </h3>
            <p>
              Båstad i Hallands södra del är känt för tennis, en livlig sommarscen och välrenommerade restauranger. <strong>Swedish Open</strong> lockar tennisstjärnor och publik varje sommar och ger hela byn en festlig stämning under turnerveckorna i juli.
            </p>
            <p>
              Båstads marina är välutrustad och centralt belägen — promenadavståndet till stadens restauranger och butiker är kort. Laholmsbukten norr om Båstad erbjuder bra ankringsplatser vid lämpliga vindförhållanden.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '32px 0 12px' }}>
              Segling längs Hallands kust
            </h2>
            <p>
              Kattegatt utanför Halland är ett öppet hav utan den skyddande skärgård som Bohuslän erbjuder. Sommarvindar från sydväst passar utmärkt för nordgående segling längs kusten. <strong>Hamnarna är placerade med 2–4 timmars segling sinsemellan</strong> — Varberg, Falkenberg och Båstad är de tre viktigaste.
            </p>
            <p>
              Väder kan snabbt förändras i Kattegatt — håll alltid koll på SMHI:s sjöväderprognoser och ha en plan B för närmaste hamn. Vid sydväststormar kan kusten bli otrivsam med lång dyning från Nordsjön.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '32px 0 12px' }}>
              Vanliga frågor om Halland
            </h2>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
              Vad är Halland känt för längs kusten?
            </h3>
            <p>
              <strong>Varbergs medeltida fästning</strong>, Tylösands sandstränder och Båstads tenniskultur. Halland har en lång tradition av västkustfiske och ett aktivt seglarliv längs Kattegatt.
            </p>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
              Vilka är de bästa hamnarna?
            </h3>
            <p>
              <strong>Varberg gästhamn</strong> vid fästningen är regionens nav. Falkenbergs gästhamn vid Ätrans mynning och Båstad marina är de andra naturliga stoppen.
            </p>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
              Hur är segling längs Hallands kust?
            </h3>
            <p>
              Relativt öppen kustsegling i Kattegatt. Stabila sommarvindarna från sydväst passar utmärkt. Var uppmärksam på snabba väderomslag — håll alltid koll på sjöväderprognosen.
            </p>
          </>
        }
        cta={{ label: 'Skapa gratis konto', href: '/logga-in' }}
        related={[
          { label: 'Bohuslän', href: '/bohuslan' },
          { label: 'Segelrutter', href: '/segelrutter' },
          { label: 'Hamnar & bryggor', href: '/hamnar-och-bryggor' },
          { label: 'Alla destinationer', href: '/resmal' },
        ]}
      />
    </>
  )
}
