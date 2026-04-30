import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
  title: 'Göteborgs skärgård — Logga turer, hitta platser | Svalla',
  description: 'Segling i Göteborgs skärgård: Marstrand, Vrångö, Styrsö, Donsö. Logga båtturer, ankringsplatser och naturhamnar på Svalla.',
  keywords: [
    'göteborgs skärgård',
    'segla göteborg',
    'marstrand segling',
    'vrångö',
    'styrsö',
    'donsö',
    'bohuslän skärgård',
    'göteborgs södra skärgård',
    'tjörn',
    'orust',
    'kungsbacka fjord',
    'göteborgs nordhavn',
    'smögen göteborg',
    'göteborgs skärgård båt',
    'segling västkust göteborg',
  ],
  openGraph: {
    title: 'Göteborgs skärgård — Logga turer | Svalla',
    description: 'Logga dina båtturer i Göteborgs skärgård med Svalla.',
    url: 'https://svalla.se/goteborg-skargard',
  },
  alternates: { canonical: 'https://svalla.se/goteborg-skargard' },
}

const ITEMS: LandingItem[] = [
  {
    icon: '️',
    title: 'Karta över Göteborg',
    description: 'Verifierade platser i Göteborgs skärgård — naturhamnar, bryggor, krogar och sjömackar.',
    href: '/platser',
    meta: 'Gratis',
  },
  {
    icon: '',
    title: 'Marstrand — festningön',
    description: 'Carlstens fästning, glada gästhamnen och Bohusläns mest kända seglarmål. Logga ankomsten.',
    href: '/platser',
  },
  {
    icon: '🏝️',
    title: 'Södra skärgården',
    description: 'Vrångö, Styrsö, Donsö och Asperö — bilfria öar med unik karaktär bara en timme från city.',
    href: '/platser?kategori=naturhamn',
  },
  {
    icon: '️',
    title: 'Krogar och kajer',
    description: 'Från fiskrökerier på Donsö till exklusiv sjömat i Marstrand och Smögen.',
    href: '/krogar-och-mat',
  },
  {
    icon: '',
    title: 'Tjörn och Orust',
    description: 'Bohusläns stora öar med hundratals naturhamnar. Perfekt för flerdagars rutt norrut.',
    href: '/logga-in',
  },
  {
    icon: '📱',
    title: 'Logga dina turer',
    description: 'GPS-spårning, foton och anteckningar — spara minnen från Göteborgs skärgård.',
    href: '/logga-in',
  },
]

export default function GoteborgSkargardPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Är Göteborgs skärgård bra för nybörjarseglare?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja. Södra skärgårdens öar (Styrsö, Donsö, Vrångö) har väl märkta farleder och skyddade vikar — perfekt för att bygga självförtroende. Norr om Marstrand kan farvattnen bli mer exponerade och kräver mer erfarenhet, särskilt vid sydvästliga vindar.',
        },
      },
      {
        '@type': 'Question',
        name: 'Hur länge tar det att segla från Göteborg till Marstrand?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Från Lilla Bommen i centrala Göteborg till Marstrand är det ungefär 25 sjömil, vilket tar 4–6 timmar med en genomsnittlig segelbåt. Med god vind och tidig start kan det göras bekvämt på en dag. Via södra skärgården och utanför Hönö är det ett klassiskt dagsutflyktsmål.',
        },
      },
      {
        '@type': 'Question',
        name: 'Vad är bäst med Göteborgs södra skärgård?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'De bilfria öarna Vrångö, Styrsö, Donsö och Asperö erbjuder en unik kombination av tillgänglighet och avskildhet. Öarna nås med Västtrafiks båtar men har ändå kvar sin genuina skärgårdskänsla. Donsö är Bohusläns fiskehamn par excellence medan Vrångö är den vildaste och sydligaste.',
        },
      },
      {
        '@type': 'Question',
        name: 'Kan man segla vidare norrut längs Bohuslän från Göteborg?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolut — Bohuslänsledens inre led går hela vägen från Göteborg till Strömstad vid norska gränsen. Klassiska etapper är Göteborg–Marstrand, Marstrand–Smögen och Smögen–Strömstad. Svalla hjälper dig logga varje etapp och hitta ankringsplatser längs vägen.',
        },
      },
    ],
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://svalla.se' },
      { '@type': 'ListItem', position: 2, name: 'Göteborgs skärgård', item: 'https://svalla.se/goteborg-skargard' },
    ],
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <CategoryLanding
        heroGradient={['#1a3a5c', '#2e6b8a']}
        eyebrow="Göteborgs skärgård"
        title="Västkustens pärla"
        tagline="Från bilfria södra öar till Marstrands fästning — Svalla hjälper dig utforska Göteborgs skärgård och logga varje tur längs Bohusläns kust."
        heroIcon={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        }
        intro={
          <>
            <p>
              Göteborgs skärgård är en av Sveriges mest tillgängliga och samtidigt mest varierade. <strong>Bilfria öar, Carlstens fästning i Marstrand och Bohusläns klassiska grå klipphällar</strong> — det finns något för alla typer av seglare bara en timme från Nordens största hamn.
            </p>
            <p>
              Södra skärgårdens öar — Vrångö, Styrsö, Donsö och Asperö — nås med kollektivtrafik men behåller trots det sin genuina skärgårdskaraktär. Donsö med sina fiskebåtar och rökta räkor, Vrångö med sin vilda natur och Styrsö med det välkända värdshuset. Varje ö har sin egen personlighet.
            </p>
            <p>
              Norrut mot Marstrand öppnar sig ett mer maritimt landskap. Den gamla fästningsstaden är Bohusläns seglarcentrum, med sommartid full gästhamn och levande folkliv. Välj att segla in via inre farleden längs Hönö eller ta den mer äventyrliga yttre rutten.
            </p>
            <p>
              Svalla låter dig logga alla turer i Göteborgs skärgård, hitta naturhamnar och krogar på kartan och planera rutter norrut längs Bohuslänleden mot Smögen och Strömstad. En skärgård som är lika perfekt för en dags utflykt som för veckors kryss.
            </p>
          </>
        }
        itemsTitle="Göteborg med Svalla"
        itemsDescription="Utforska Göteborgs skärgård och Bohusläns kust."
        items={ITEMS}
        deeperContent={
          <>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
              Marstrand — Bohusläns seglarstad
            </h2>
            <p>
              <strong>Marstrand</strong> är en av Sveriges mest kända segeldestinationer och med rätta. Carlstens fästning från 1600-talet dominerar ön och syns från sjön på långt håll. Gästhamnen på öns lä-sida är välutrustad men sommartid tät — boka bryggplats i förväg eller ankra i de lugna vikarna strax norr om ön. Marstrand är en naturlig etapp om du seglar längs Bohuslänleden norrut.
            </p>
            <p>
              Runt Marstrand finns också dolda pärlor — <strong>Koön</strong> med sitt sund, <strong>Tjuvkil</strong> med den enkla gästbryggan och hela arkipelagen av mindre öar och holmar som omger fästningsstaden. Det tar dagar att utforska allt ordentligt, och Svalla hjälper dig dokumentera varje stopp med GPS och foton.
            </p>

            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
              Södra skärgårdens bilfria öar
            </h3>
            <p>
              Söder om Hönö och Öckerö-gruppen börjar det som göteborgare kallar "södra skärgården" — de bilfria öarna <strong>Styrsö, Donsö, Asperö, Brändö</strong> och längst söderut <strong>Vrångö</strong>. Dessa öar nås normalt med Västtrafiks pendelbåtar från Saltholmen, men är förstås ännu bättre att besöka med egen båt.
            </p>
            <p>
              <strong>Donsö</strong> är hemmahamnen för många av Bohusläns yrkesfiskare och luktar räkor och salt hav. Fiskrökeriet på kajen är en klassiker. <strong>Vrångö</strong> i söder är råare och vildare, med naturreservat och fågelrika strandängar — perfekt för en natt på naturhamnen. <strong>Styrsö</strong> har Värdshuset och de välbesökta badklipporna.
            </p>

            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
              Tjörn och Orust — utgångspunkt norrut
            </h3>
            <p>
              Norr om Marstrand blir skärgården mer Bohuslänsk till karaktären — glesare bebyggt, mer exponerat och med tätare ansamling av naturhamnar. <strong>Tjörn</strong> och <strong>Orust</strong> är Bohusläns två stora öar med hundratals öar och kobbar runt sig. Här finns klassiska destinationer som <strong>Rönnäng, Klädesholmen</strong> (silkön) och <strong>Mollösund</strong> — välbevarade fiskebyar längs Bohuslänleden.
            </p>
            <p>
              Rutten norrut längs Bohuslänleden är en av Sveriges vackraste segelrutter. Från Göteborg kan du nå Smögen på 2–3 dagar om du tar det lugnt och Strömstad vid norska gränsen på 4–5 dagar. Svalla låter dig planera hela rutten, logga varje etapp och dela upplevelsen med andra seglare.
            </p>

            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
              Vanliga frågor
            </h3>
            <p>
              <strong>Är Göteborgs skärgård bra för nybörjarseglare?</strong><br />
              Ja. Södra skärgårdens öar har väl märkta farleder och skyddade vikar — perfekt för att bygga självförtroende. Norr om Marstrand kan farvattnen bli mer exponerade och kräver mer erfarenhet.
            </p>
            <p>
              <strong>Hur länge tar det att segla från Göteborg till Marstrand?</strong><br />
              Från Lilla Bommen är det ungefär 25 sjömil, vilket tar 4–6 timmar med en genomsnittlig segelbåt. Med god vind och tidig start är det ett bekvämt dagsutflyktsmål.
            </p>
            <p>
              <strong>Kan man segla vidare norrut längs Bohuslän från Göteborg?</strong><br />
              Absolut — Bohuslänsledens inre led går hela vägen till Strömstad vid norska gränsen. Klassiska etapper: Göteborg–Marstrand, Marstrand–Smögen, Smögen–Strömstad.
            </p>
          </>
        }
        cta={{ label: 'Skapa gratis konto', href: '/logga-in' }}
        related={[
          { label: 'Segelrutter', href: '/segelrutter' },
          { label: 'Hamnar & bryggor', href: '/hamnar-och-bryggor' },
          { label: 'Bohuslän', href: '/bohuslan' },
          { label: 'Aktiviteter', href: '/aktiviteter' },
        ]}
      />
    </>
  )
}
