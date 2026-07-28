import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
  title: 'Höga Kusten — Norrlands dramatiska klippkust',
  description: 'Höga Kusten: Unescos världsarv, Skuleskogens nationalpark, Ulvön, Härnösand och dramatiska klippor. Utforska Norrlandskusten med Svalla.',
  keywords: [
    'höga kusten',
    'höga kusten segla',
    'höga kusten båt',
    'skuleskogen',
    'ulvön',
    'härnösand',
    'kramfors',
    'höga kusten leden',
    'norrlandskusten',
    'höga kusten naturhamnar',
    'höga kusten gästhamn',
    'ångermanland kust',
    'höga kusten unesco',
    'norrland skärgård',
    'höga kusten vandring',
  ],
  openGraph: {
    title: 'Höga Kusten — Norrlands dramatiska klippkust | Svalla',
    description: 'Logga dina båtturer och hitta de bästa platserna längs Höga Kusten.',
    url: 'https://svalla.se/hoga-kusten',
  },
  alternates: { canonical: 'https://svalla.se/hoga-kusten' },
}

const ITEMS: LandingItem[] = [
  {
    icon: '🗺️',
    title: 'Karta över Höga Kusten',
    description: 'Alla verifierade platser längs Norrlandskusten — gästhamnar, naturhamnar, krogar och sjömackar.',
    href: '/upptack',
    meta: 'Gratis',
  },
  {
    icon: '⛵',
    title: 'Segelrutter längs kusten',
    description: 'Klassiska leder från Härnösand norrut — etapper med vindinfo, djupdata och ankringstips.',
    href: '/segelrutter',
  },
  {
    icon: '🏕️',
    title: 'Naturhamnar & ankring',
    description: 'Höga Kustens granitklippor skapar unika ankringsplatser — från djupa fjordar till skyddade vikar med SUP-lugnt vatten.',
    href: '/platser?kategori=naturhamn',
  },
  {
    icon: '🌲',
    title: 'Skuleskogens nationalpark',
    description: 'Världsarvet till havs — kombinera vandring i urskogen med ankring utanför klipporna. En upplevelse utanför det vanliga.',
    href: '/vandring-och-natur',
  },
  {
    icon: '📍',
    title: 'Logga dina turer',
    description: 'Spåra din färd längs Norrlandskusten med GPS, lägg till bilder och dela med vänner.',
    href: '/logga-in',
  },
  {
    icon: '🦅',
    title: 'Ulvön — Höga Kustens pärla',
    description: 'Ulvön är centrum för surströmmingstraditionen och en av Norrlandskustens vackraste öar. Logga din tur hit.',
    href: '/logga-in',
  },
]

export default function HogaKustenPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Vad är Höga Kusten känt för?',
        acceptedAnswer: { '@type': 'Answer', text: 'Höga Kusten är ett Unesco-klassat världsarv känt för sina dramatiska klippor, djupa fjordar och den pågående landhöjningen — en av världens kraftigaste. Skuleskogens nationalpark, Ulvön med surströmmingstraditionen och de unika naturhamnarna gör kusten till ett mål utöver det vanliga för båtfolk och vandrare.' },
      },
      {
        '@type': 'Question',
        name: 'Hur tar man sig till Höga Kusten med båt?',
        acceptedAnswer: { '@type': 'Answer', text: 'Vanligaste utgångspunkten är Härnösand eller Kramfors med båt söder ifrån. Du seglar längs Bottenhavet, ett öppet men vackert farvatten. Det är glesare med gästhamnar än på västkusten, men platserna som finns — som Ulvöhamn och Härnösand — håller hög klass. Planera etapperna noggrant, avstånden är stora.' },
      },
      {
        '@type': 'Question',
        name: 'Vad är bästa säsongen för Höga Kusten?',
        acceptedAnswer: { '@type': 'Answer', text: 'Juni till augusti är högsäsong med långa ljusa nätter och milda temperaturer. Surströmmingspremiären i tredje veckan av augusti lockar extra besökare till Ulvön. September är lugn och vacker med höstfärger i skogen och lite folk.' },
      },
      {
        '@type': 'Question',
        name: 'Vilka är de mest besökta platserna längs Höga Kusten?',
        acceptedAnswer: { '@type': 'Answer', text: 'Ulvöhamn är absolut populärast och fyller snabbt under högsommaren. Bönhamn med sina rödfärgade sjöbodar är ett klassiskt fiskeläge och fotospot. Skuleskogens nationalpark är ett måste för vandrare. Härnösand är regionens nav med utmärkt gästhamn, restauranger och historia.' },
      },
    ],
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://svalla.se' },
      { '@type': 'ListItem', position: 2, name: 'Höga Kusten', item: 'https://svalla.se/hoga-kusten' },
    ],
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <CategoryLanding
        heroGradient={['#0a1828', '#1a3a58']}
        eyebrow="Höga Kusten"
        title="Norrlands dramatiska klippkust"
        tagline="Unesco-klassat världsarv med dramatiska klippor, urskog och Ulvöns surströmmingstradition — Svalla hjälper dig utforska varje vik längs Norrlandskusten."
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
              Höga Kusten är en av Sveriges mest dramatiska kustlinjer — och ett av världens få Unesco-klassade kustlandskapsarv. <strong>Branta klippor, djupa fjordar och urskog ner till vattnet</strong> skapar en miljö som skiljer sig helt från resten av Skandinaviens kuster. Från Härnösand i söder till Örnsköldsvik i norr sträcker sig en kust som fortfarande höjer sig ur havet med upp till åtta millimeter per år — ett av de kraftigaste landhöjningsområdena i världen.
            </p>
            <p>
              Höga Kusten är legendarisk bland naturälskare och äventyrssökare. Skuleskogens nationalpark, med urskog och klippväggar som stupar rakt ner i havet, är ett naturupplevelse av rang. Ulvön är känt världen över som surströmmingstraditionen hemort — varje år i tredje veckan i augusti samlas hundratals båtar i Ulvöhamn för premiären. Bönhamn med sina röda sjöbodar är ett av Norrlands vackraste fiskelägen och ett favoritankringsställe för seglare.
            </p>
            <p>
              Med Svalla loggar du alla etapper längs Bottenhavet, hittar gästhamnar och naturhamnar på kartan och kan följa andra båtfolks turer längs samma unika kust. Oavsett om du kommer med segelbåt, motorbåt eller kajak är Höga Kusten en destination som lämnar bestående intryck.
            </p>
            <p>
              Bottenhavet är öppet och väderförhållandena kan snabbt förändras — planera etapperna noggrant och ta alltid höjd för längre stopp i naturhamnarna.
            </p>
          </>
        }
        itemsTitle="Höga Kusten med Svalla"
        itemsDescription="Allt du behöver för en tur längs Norrlandskusten."
        items={ITEMS}
        deeperContent={
          <>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
              Ta dig dit — kollektivtrafik
            </h2>
            <p>
              <strong>Till Härnösand</strong>: SJ och Norrtåg trafikerar Stockholm–Härnösand, ca 4,5–5 timmar. Till <strong>Kramfors</strong> och <strong>Örnsköldsvik</strong>: Norrtåg. Expressbuss: <strong>Y-buss</strong> kör Stockholm–Härnösand–Kramfors–Örnsköldsvik direkt. Lokaltrafik på land sköts av <strong>Din Tur</strong> (dintur.se).
            </p>
            <p>
              <strong>Till Ulvön utan egen båt</strong>: passagerarbåtar avgår sommartid från Docksta och Kramfors-sidan till Ulvöhamn — du behöver alltså ingen segelbåt för att besöka Höga Kustens pärlö.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
              Ulvön — surströmmingstraditionen och nordens pärla
            </h2>
            <p>
              Ulvön är Höga Kustens mest kända ö och ett obligatoriskt stopp för alla som besöker kusten med båt. Ulvöhamn på öns västra sida är en naturlig hamn med röda sjöbodar, ett gammalt kapell och en välkomnande by med rötter i det traditionella fisket.
            </p>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
              Surströmmingspremiären
            </h3>
            <p>
              Varje år i tredje veckan av augusti öppnas surströmmingssäsongen och Ulvön förvandlas till ett folkliv med hundratals båtar på ankring. <strong>Surströmmingsskivan</strong> är ett kulturellt fenomen som lockar besökare från hela Sverige och utlandet. Boka gästhamnsplats tidigt om du planerar att vara här under premiären.
            </p>
            <p>
              Ulvöns östra sida är vild och orörd — naturhamnar med kristallklart vatten och klippor perfekta för dykning och snorkling. Mellan öarna i Ulvöns skärgård finns skyddade ankringsplatser för alla vindförhållanden.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '32px 0 12px' }}>
              Skuleskogens nationalpark
            </h2>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
              Urskog möter hav
            </h3>
            <p>
              Skuleskogen är en av få nationalparker i Sverige där urskogen sträcker sig ända ner till havsstranden. Höga klippväggar, gamla granar och ett rikt fågelliv skapar en upplevelse som är svår att hitta någon annanstans. <strong>Slåttdalsskrevan</strong> — en lång, smal bergsklyfta — är nationalpaarkens mest ikoniska sevärdhet.
            </p>
            <p>
              Kombinationen båt och vandring fungerar utmärkt här. Ankra utanför parken, ta land med jollen och vandra in i skogen. Planera en heldagstur med packlunch och utforska klipporna och urskogen på egen hand.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '32px 0 12px' }}>
              Härnösand och Bönhamn
            </h2>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
              Härnösand — regionens nav
            </h3>
            <p>
              Härnösand är Höga Kustens naturliga bas med en välutrustad gästhamn i centrala läget. Staden har en rik historia som handelsstad och stiftssäte — domkyrkan och de gamla trästadshusen ger en stämningsfull känsla. Här finns restauranger, handel och allt du behöver för att provisonera inför vidare färd norrut längs kusten.
            </p>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
              Bönhamn — de röda sjöbodarnas fiskeläge
            </h3>
            <p>
              Bönhamn är ett av Norrlands vackraste och mest fotograferade fiskelägen. <strong>Rödfärgade sjöbodar</strong> speglar sig i det lugna vattnet och tillsammans med den omgivande skogen skapar platsen en tidlös stämning. Gästhamnen är liten men väl omhändertagen. Missa inte en promenad längs klipporna norr om hamnen.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '32px 0 12px' }}>
              Navigation och väder längs Bottenhavet
            </h2>
            <p>
              Bottenhavet är ett öppet hav med långa vågor vid blåst — det saknar den vindskyddande skärgårdslabyrint som t.ex. Stockholms skärgård erbjuder. <strong>Planera etapperna för att ha tillgång till naturhamn eller gästhamn vid väderomslag.</strong>
            </p>
            <p>
              Sommarvindar är oftast från sydväst eller nord, och temperaturen i vattnet är lägre än på västkusten — räkna med 15–18°C i ytlagret under juli. Dimma kan uppstå snabbt, särskilt tidigt på morgonen. GPS och radar är viktiga hjälpmedel på Bottenhavet.
            </p>
            <p>
              Landhöjningen gör att sjökort behöver vara uppdaterade — grunda partier som var säkra för 20 år sedan kan ha förändrats. Kontrollera alltid mot aktuella sjökort och sjöfartsverkets uppdateringar.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '32px 0 12px' }}>
              Vanliga frågor om Höga Kusten
            </h2>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
              Vad är Höga Kusten känt för?
            </h3>
            <p>
              Höga Kusten är ett <strong>Unesco-klassat världsarv</strong> känt för dramatiska klippor, djupa fjordar och den pågående landhöjningen. Skuleskogens nationalpark och Ulvöns surströmmingstradition är höjdpunkterna.
            </p>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
              Hur tar man sig till Höga Kusten med båt?
            </h3>
            <p>
              Vanligaste utgångspunkten är <strong>Härnösand</strong> eller Kramfors. Du seglar längs Bottenhavet norrut — ett öppet men vackert farvatten. Planera etapperna noggrant, avstånden är större än på västkusten.
            </p>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
              Vad är bästa säsongen?
            </h3>
            <p>
              <strong>Juni till augusti</strong> med långa ljusa nätter. Surströmmingspremiären i tredje veckan av augusti är extra festlig. September är lugn och vacker med lite folk och höstfärger.
            </p>
          </>
        }
        cta={{ label: 'Skapa gratis konto', href: '/logga-in' }}
        related={[
          { label: 'Segelrutter', href: '/segelrutter' },
          { label: 'Naturhamnar', href: '/naturhamnar' },
          { label: 'Aktiviteter', href: '/aktiviteter' },
          { label: 'Alla destinationer', href: '/resmal' },
        ]}
      />
    </>
  )
}
