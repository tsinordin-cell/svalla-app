import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import Script from 'next/script'
import SvallaLogo from '@/components/SvallaLogo'
import EmailSignup from '@/components/EmailSignup'
import { REGIONS, hikesForRegion, type Hike } from './hike-data'
import Icon, { type IconName } from '@/components/Icon'

export const metadata: Metadata = {
  title: 'Vandring i skärgården — kustleder, öar och tips | Svalla',
  description: 'Hitta de bästa vandringarna längs Sveriges kust och skärgård. Topp 10 per region, filtrera på svårighet, transport och bad. Från Stockholms skärgård till Höga kusten.',
  keywords: [
    'vandring skärgård',
    'vandring stockholms skärgård',
    'kustleder sverige',
    'vandring utan bil',
    'vandring bohuslän',
    'vandring gotland',
    'vandring höga kusten',
    'kustnära vandring',
  ],
  alternates: { canonical: 'https://svalla.se/aktivitet/vandring' },
  openGraph: {
    title: 'Vandring i skärgården och längs Sveriges kust',
    description: 'Kuststigar, naturreservat, öleder och klippor med havet som sällskap. Hitta rätt vandring för en timme, en dag eller en hel helg.',
    url: 'https://svalla.se/aktivitet/vandring',
  },
}

// ─── Data ────────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    q: 'Var kan man vandra i Stockholms skärgård?',
    a: 'De bästa öarna för vandring i Stockholms skärgård är Utö (8 km led), Finnhamn (4 km STF-ö), Grinda, Sandhamn, Nåttarö, Möja och Arholma. Alla nås med Waxholmsbolaget eller pendelbåt från Nynäshamn. Utö och Nåttarö är söder om Nynäshamn; de övriga i mellersta eller norra skärgården.',
  },
  {
    q: 'Vilken skärgårdsö är bäst för vandring?',
    a: 'Det beror på vad du letar efter. Utö är bäst om du vill ha en lång heldag med naturreservat, gruvor och badmöjligheter. Finnhamn är bäst för klassisk STF-stämning och en kortare vandring. Nåttarö passar den som söker orörd natur utan caféer och kiosker.',
  },
  {
    q: 'Kan man vandra i skärgården utan bil?',
    a: 'Ja — de flesta välkända vandringsöarna i Stockholms skärgård nås med Waxholmsbolaget (ingår i SL-zonerna) eller pendelbåt från Nynäshamn. Det är en av de stora fördelarna med Stockholms skärgård jämfört med t.ex. Bohuslän och Höga kusten.',
  },
  {
    q: 'Vilka skärgårdsöar har markerade vandringsleder?',
    a: 'Utö, Finnhamn, Grinda, Sandhamn, Nåttarö, Möja, Arholma, Ingmarsö och Gällnö har markerade eller delvis markerade leder. Styrsö, Vrångö och Marstrand i Bohuslän har korta markerade leder. Gotland (Fårö) och Höga kusten (Skuleskogen) har de mest välmarkerade lederna utanför Stockholmsregionen.',
  },
  {
    q: 'Vilka vandringar passar barn?',
    a: 'Grinda, Sandhamn och Finnhamn är de mest barnvänliga i Stockholms skärgård — korta leder, tydliga stigar och café i närheten. På Gotland är Lummelunda (grottor) ett givet barn-stopp. I Bohuslän passar Marstrand med Carlstens fästning utmärkt.',
  },
  {
    q: 'Kan man ta med hund på skärgårdsvandring?',
    a: 'Generellt ja, men med viktiga undantag. Hundar är förbjudna i fågelskyddsområden under häckningstid (vanligtvis 1 april–15 juli). Naturreservat med strikta regler kan ha hundförbud året runt. Kontrollera alltid lokala föreskrifter. Waxholmsbolaget tillåter hundar ombord.',
  },
  {
    q: 'Vilka vandringar har badplatser längs vägen?',
    a: 'Utö (Bönsäckan-stranden), Grinda (sandstrand), Finnhamn (klippbad), Sandhamn (Trouvillestranden), Nåttarö (naturliga badplatser i reservatet) och Vrångö (klippbad). På Gotland: Tofta strand och Sudersand nära populära vandringsrutter.',
  },
  {
    q: 'När är bästa tiden att vandra i skärgården?',
    a: 'Maj–juni och september är de bästa månaderna. Du undviker myggperioden (juli–tidigt augusti), midsommarrusningen och sommarhettan. Höstfärgerna i september och oktober är spektakulära.',
  },
  {
    q: 'Behöver man boka färja för att vandra i skärgården?',
    a: 'För Stockholms skärgård behöver du normalt inte boka Waxholmsbolaget. Gotland är undantaget — Destination Gotlands färjor måste bokas, gärna månader i förväg för juli. Kolla alltid aktuella tidtabeller på waxholmsbolaget.se och sl.se.',
  },
  {
    q: 'Kan man tälta i skärgården?',
    a: 'Allemansrätten tillåter tältning i naturen, men naturreservat har ofta egna regler som begränsar eller förbjuder övernattning. Skärgårdsstiftelsen driver ett antal anläggningar med tältplatser. Kontrollera länsstyrelsens webbplats för regler i specifika reservat.',
  },
  {
    q: 'Finns det vandringsleder nära Stockholm stad?',
    a: 'Närmast Stockholm är Fjäderholmarna (25 min med båt, kortpromenad), Vaxholm (1 h) och Nacka naturreservat (längs kusten, nås med buss). De mer klassiska vandringsöarna — Finnhamn, Grinda, Utö — ligger 2–3 timmar bort med färja.',
  },
  {
    q: 'Vilka kustleder är bäst i Sverige?',
    a: 'Höga kustenleden (130 km, UNESCO), Skåneledens kustdelar (bl.a. Kullaberg), Bohusleden (Göteborg–Strömstad), Sörmlandsleden (delar), Ölandsleden och Gotlandsleden är de mest etablerade. Höga kusten och Kullaberg rankas ofta högst för dramatik.',
  },
  {
    q: 'Vad är skillnaden på lätt, medel och krävande vandring?',
    a: 'Lätt: under 6 km, tydlig bred stig, liten höjdskillnad, passar alla inklusive barn och äldre. Medel: 6–15 km, kan ha ojämn terräng och kortare branter, kräver bekväma skor. Krävande: över 15 km, brantare stigar och klättring, kräver bra skor och erfarenhet.',
  },
  {
    q: 'Hur planerar man en dagsvandring i skärgården?',
    a: 'Börja med att bestämma hur lång restid du accepterar. Räkna med att restid med färja plus vandring tar en hel dag — planera inte för att hinna fler än en ö. Kontrollera sista båttiden hem INNAN du sätter igång. Ta med mer vatten och mat än du tror att du behöver.',
  },
  {
    q: 'Vilka vandringar har restaurang eller café i närheten?',
    a: 'Sandhamn (Seglarhotellet och Sandhamns Värdshus), Grinda (STF-caféet), Finnhamn (STF-vandrarhemsrestaurang), Utö (Utö Värdshus), Marstrand, Smögen och Donsö i Bohuslän. På Gotland: restauranger i Visby och längs Fårö.',
  },
]

const GUIDES = [
  {
    title: 'Vad packar man för en dag i skärgården?',
    body: 'Skärgårdens grundregel: packa för ett scenario varmare och ett scenario kyligare än vad vädret säger. Havsvindar är opålitliga och halvdagsregn kan uppstå en annars solig dag. Absolut nödvändigt: bekväma vandringsskor eller vandringskängor, vatten (minst 1 liter per person), matsäck, regnkläder och solskydd maj–september. Starkt rekommenderat: extra lager (tunn fleece), myggmedel juli–augusti, plåster och kontanter (kiosker på öar tar inte alltid kort). Med barn: extra snacks, badkläder och plan för toaletter — planera kortare etapper än du tror att du klarar.',
  },
  {
    title: 'När är bästa säsongen?',
    body: 'Maj–juni är det bästa valet: naturen vaknar, myggorna är ännu inte besvärliga, löven är ljusgröna och de flesta leder är öppna. Juli–augusti: störst utbud av öppna caféer och restauranger men också flest besökare. För mer stillsam upplevelse — välj en liten ö, inte Sandhamn. September är Svallas favoritmånad: höstfärger, nästan inga myggor, behaglig temperatur och dramatiskt ljus. Oktober–april är möjligt men tuffare — en del destinationer stänger helt. Kontrollera tidtabeller noga.',
  },
  {
    title: 'Hur funkar allemansrätten i skärgården?',
    body: 'Allemansrätten gäller i skärgården som på fastlandet — med viktiga tillägg. Du får röra dig fritt i skog och mark, tälta kortare tid (normalt 1–2 nätter på samma plats) och plocka bär, svamp och blommor som inte är fridlysta. Du får inte tälta, göra upp eld eller beträda naturreservat med strikta tillträdesrestriktioner, eller köra motorbåt för nära land i fågelskyddsområden under häckningstid (1 april–15 juli för många). Hundar: i fågelskyddsområden är hundar förbjudna hela eller delar av året. Kontrollera Länsstyrelsens webbplats för regler i specifika reservat.',
  },
  {
    title: 'Kan man vandra utan bil?',
    body: 'Ja — och för Stockholms skärgård är det faktiskt enklare utan bil. Waxholmsbolaget har linjer till de flesta öar i mellersta och norra skärgården. Till södra öar (Utö, Nåttarö, Landsort) tar du pendeltåg linje 36 till Nynäshamn och sedan pendelbåt. Bohuslän: Västtrafik har båtlinjer till södra skärgårdens öar (Vrångö, Styrsö, Donsö). Till Marstrand tar du buss 302/312 från Göteborg. Gotland: Destination Gotland kör färja Nynäshamn–Visby (~3h15). Höga kusten: SJ/Norrtåg till Härnösand och Kramfors — lokal busstrafik finns men är gles. Till Trysunda och Ulvön krävs sommarbåt.',
  },
  {
    title: 'Vilka vandringar passar barn?',
    body: 'Barn under 10 är generellt lyckligast på öar med: kort vandringsled (max 4–5 km), tydlig badplats längs vägen, café eller kiosk och breda, välmarkerade stigar. Bästa val Stockholm: Grinda (3 km, café, bad), Sandhamn (välmarkerat, café), Finnhamn (STF-stämning, kort). Bästa val Bohuslän: Marstrand (fästning, kort rund), Vrångö (bilfri, badklippor). Undvik med småbarn: Nåttarö (primitiv, ingen service), Arholma (lång restid) och Kullaberg (branter).',
  },
  {
    title: 'Behöver man boka färja?',
    body: 'Stockholms skärgård: Waxholmsbolaget kräver inte bokning — betala ombord med SL-kort, app eller kontant. Under midsommar och den första julihelgen kan båtarna bli fullsatta. Gotland: Destination Gotland kräver ALLTID bokning under sommarsäsongen — boka minst 6–8 veckor i förväg för juli. Bohuslän: Västtrafiks linjer till södra skärgårdens öar kräver inte bokning. Marstrandsfärjan ingår i Västtrafik-biljetten. Höga kusten: Sommarbåtarna till Trysunda och Ulvön körs av lokala aktörer — kontrollera respektive operatör.',
  },
  {
    title: 'Vad ska man tänka på för att inte missa sista båten hem?',
    body: 'Det händer — och det är inte kul. En grundregel: kolla alltid den sista avgångstiden INNAN du börjar vandra, inte när du börjar bli trött. Tips: sätt ett larm 45 minuter före sista avgång, stå vid bryggan minst 10 minuter tidigt (de går på sekunden), ha en backup-plan (gästhamn, vandrarhem eller tältplats finns på många öar). I juli och augusti kan extra avgångar köras — men räkna inte med det.',
  },
]

const TOP_10 = [
  { rank: 1, name: 'Skuleskogen, Höga kusten', region: 'Höga kusten', desc: 'UNESCO-reservat med dramatiska bergssidor och urskogsstämning — Höga kustens hjärta och ett av Sveriges mest dramatiska naturreservat.', slug: '/aktivitet/vandring/skuleskogen' },
  { rank: 2, name: 'Utö, Stockholms skärgård', region: 'Stockholms skärgård', desc: 'Skärgårdens längsta led på ~8 km. Passerar gruvor, gammal kvarn, naturreservat och havsklippor. Nås utan bil.', slug: '/aktivitet/vandring/uto' },
  { rank: 3, name: 'Digerhuvud, Fårö', region: 'Gotland', desc: 'Raukarna är surrealistiska — klippformationer mot öppet hav som ser ut som en annan planet. En halvdag som sitter kvar länge.', slug: '/aktivitet/vandring/digerhuvud-faro' },
  { rank: 4, name: 'Nordkoster, Kosterhavet', region: 'Bohuslän', desc: 'Sveriges första marina nationalpark. Dramatiska klippor och Västerhavet i alla riktningar. Bilfri ö med välmarkerade leder.', slug: '/aktivitet/vandring/nordkoster' },
  { rank: 5, name: 'Kullaberg, Skåne', region: 'Nordvästra Skåne', desc: '70 meter höga klippavsatser, fyrar och sällsynt flora. Naturreservat med Sverige-unik geologi och välskött lednat.', slug: '/aktivitet/vandring/kullaberg' },
  { rank: 6, name: 'Finnhamn, Stockholms skärgård', region: 'Stockholms skärgård', desc: 'Det perfekta skärgårdsintrot: kompakt, vacker, utan bil och med STF-vandrarhem om du vill stanna kvar.', slug: '/aktivitet/vandring/finnhamn' },
  { rank: 7, name: 'Trollskogen, Öland', region: 'Öland', desc: 'Urskog med gamla vridna träd precis vid havsstranden — en av Sveriges märkligaste och mest fotogeniska naturupplevelser.', slug: '/aktivitet/vandring/trollskogen-oland' },
  { rank: 8, name: 'Trysunda, Höga kusten', region: 'Höga kusten', desc: 'Liten fiskehamnsö med Ångermanlandskustens bäst bevarade fiskeläge och kapell från 1600-talet. Kort led men stor känsla. Nås med sommarbåt.', slug: '/aktivitet/vandring/trysunda' },
  { rank: 9, name: 'Grötö / Fjällbacka, Bohuslän', region: 'Bohuslän', desc: 'Bohusläns klipphällar och det dramatiska havsljuset. Tillgängligt med buss, lagom svår vandring för en halv dag.', slug: '/aktivitet/vandring/fjallbacka' },
  { rank: 10, name: 'Hanö, Blekinge', region: 'Blekinge', desc: 'Blekinges utpost i Östersjön: unik engelsk kyrkogård, fågelrika strandängar och råa ankringsplatser. Nås med sommarbåt.', slug: '/aktivitet/vandring/hano-blekinge' },
]

const STARTED_CARDS = [
  {
    situation: 'Bästa första vandringen i skärgården',
    name: 'Grinda',
    desc: '3 km, STF-ö, café, sandstrand. Den öen som gör konverteringen.',
    slug: '/aktivitet/vandring/grinda',
  },
  {
    situation: 'Vandra utan bil från Stockholm',
    name: 'Finnhamn',
    desc: 'Via Waxholmsbolaget. 4 km, välmarkerat, STF-vandrarhem.',
    slug: '/aktivitet/vandring/finnhamn',
  },
  {
    situation: 'Heldag med bad och mat',
    name: 'Utö',
    desc: '8 km, Bönsäckan-stranden, Utö Värdshus. Vår favorit.',
    slug: '/aktivitet/vandring/uto',
  },
  {
    situation: 'Med barn under 10 år',
    name: 'Sandhamn',
    desc: 'Välmarkerat, café, strand. Välbesökt men älskat av familjer.',
    slug: '/aktivitet/vandring/sandhamn',
  },
  {
    situation: 'Vildmark utan turiststråk',
    name: 'Nåttarö',
    desc: 'Naturreservat, gammal barrskog, klippor. Ingen service.',
    slug: '/aktivitet/vandring/nattaro',
  },
  {
    situation: 'Planera din perfekta vandring',
    name: 'Thorkel',
    desc: 'Berätta vad du vill. Thorkel sätter ihop hela dagen.',
    slug: '/thorkel',
  },
]

// ─── Helper components ────────────────────────────────────────────────────────

const difficultyColor: Record<string, string> = {
  'lätt': '#22c55e',
  'medel': '#f59e0b',
  'krävande': '#ef4444',
}

function HikeRow({ hike }: { hike: Hike }) {
  return (
    <Link
      href={`/aktivitet/vandring/${hike.slug}`}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        background: 'var(--white)', border: '1px solid var(--surface-3)',
        borderRadius: 10, padding: '12px 16px', textDecoration: 'none', color: 'inherit',
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--txt)', marginBottom: 2 }}>
          {hike.name}
        </div>
        <div style={{
          fontSize: 12, color: 'var(--txt2)', lineHeight: 1.4,
          overflow: 'hidden', display: '-webkit-box',
          WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
        } as React.CSSProperties}>
          {hike.tagline}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3, flexShrink: 0 }}>
        {hike.distanceKm > 0 && (
          <span style={{ fontSize: 11, color: 'var(--txt3)', fontWeight: 600 }}>
            {hike.distanceKm} km
          </span>
        )}
        <span style={{
          fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.4,
          color: difficultyColor[hike.difficulty] ?? 'var(--txt3)',
        }}>
          {hike.difficulty}
        </span>
        {!hike.carRequired && (
          <span style={{ fontSize: 10, color: 'var(--sea)', display: 'inline-flex', alignItems: 'center', gap: 3 }}>
            <Icon name="ship" size={11} stroke={2} />utan bil
          </span>
        )}
      </div>
      <span style={{ color: 'var(--sea)', fontSize: 16, flexShrink: 0 }}>→</span>
    </Link>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function VandringPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '10 bästa kustvandringar i Sverige',
    url: 'https://svalla.se/aktivitet/vandring',
    numberOfItems: 10,
    itemListElement: TOP_10.map(item => ({
      '@type': 'ListItem',
      position: item.rank,
      name: item.name,
      url: `https://svalla.se${item.slug}`,
    })),
  }

  return (
    <>
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Script
        id="itemlist-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>

        {/* ── Nav ── */}
        <nav style={{
          background: 'linear-gradient(160deg, #1e5c82 0%, #2d7d8a 100%)',
          padding: '18px 24px 16px',
        }}>
          <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <SvallaLogo height={24} color="#ffffff" />
            </Link>
            <Link
              href="/aktivitet"
              style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, textDecoration: 'none' }}
            >
              ← Alla aktiviteter
            </Link>
          </div>
        </nav>

        {/* ── Hero ── */}
        <header style={{
          background: 'linear-gradient(170deg, #1e5c82 0%, #2d7d8a 100%)',
          padding: '40px 24px 56px',
          color: '#fff',
        }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{
              fontSize: 11, opacity: 0.8,
              letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8,
            }}>
              Aktivitet · Vandring
            </div>
            <h1 style={{
              fontSize: 'clamp(28px, 5vw, 40px)',
              fontWeight: 700, margin: '0 0 12px',
              fontFamily: "'Playfair Display', Georgia, serif",
              lineHeight: 1.2,
            }}>
              Vandra i skärgården och längs Sveriges kust
            </h1>
            <p style={{
              fontSize: 16, lineHeight: 1.6,
              maxWidth: 640, opacity: 0.92, margin: 0,
            }}>
              Kuststigar, naturreservat, öleder och klippor med havet som sällskap. Hitta rätt vandring för en timme, en dag eller en hel helg — oavsett om du tar färjan eller har bil.
            </p>
          </div>
        </header>

        <main style={{ maxWidth: 900, margin: '-24px auto 0', padding: '0 16px 80px' }}>

          {/* ── Filter chips ── */}
          <div style={{
            background: 'var(--white)',
            border: '1px solid var(--surface-3)',
            borderRadius: 12, padding: '14px 16px',
            marginBottom: 28, overflowX: 'auto',
          }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'nowrap', minWidth: 'max-content' }}>
              {([
                { icon: 'map',      label: 'Nära Stockholm', href: '#stockholms-skargard' },
                { icon: 'ship',     label: 'Utan bil',       href: '#stockholms-skargard' },
                { icon: 'users',    label: 'Barnvänligt',    href: '#stockholms-skargard' },
                { icon: 'waves',    label: 'Med bad',        href: '#stockholms-skargard' },
                { icon: 'utensils', label: 'Med krog',       href: '#bohuslan' },
                { icon: 'heart',    label: 'Hundvänligt',    href: '#stockholms-skargard' },
                { dot: '#3f9d5a',   label: 'Lätt',           href: '#stockholms-skargard' },
                { dot: '#d6a318',   label: 'Medel',          href: '#hoga-kusten' },
                { dot: '#c4462f',   label: 'Krävande',       href: '#hoga-kusten' },
                { icon: 'sun',      label: 'Heldag',         href: '#stockholms-skargard' },
                { icon: 'leaf',     label: 'Naturreservat',  href: '#stockholms-skargard' },
              ] as { icon?: IconName; dot?: string; label: string; href: string }[]).map(chip => (
                <a
                  key={chip.label}
                  href={chip.href}
                  style={{
                    padding: '6px 13px',
                    borderRadius: 999,
                    background: 'var(--surface-2)',
                    color: 'var(--txt2)',
                    fontSize: 12,
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    border: '1px solid var(--surface-3)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  {chip.icon && <Icon name={chip.icon} size={13} stroke={1.9} />}
                  {chip.dot && (
                    <span aria-hidden="true" style={{
                      width: 8, height: 8, borderRadius: '50%',
                      background: chip.dot, flexShrink: 0,
                    }} />
                  )}
                  {chip.label}
                </a>
              ))}
            </div>
          </div>

          {/* ── Börja här ── */}
          <section style={{ marginBottom: 44 }}>
            <h2 style={{
              fontSize: 24, fontWeight: 700, color: 'var(--txt)',
              fontFamily: "'Playfair Display', Georgia, serif",
              margin: '0 0 4px',
            }}>
              Var ska jag börja?
            </h2>
            <p style={{ fontSize: 13, color: 'var(--txt3)', margin: '0 0 16px' }}>
              Sex situationer — en rekommendation per situation.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
              gap: 12,
            }}>
              {STARTED_CARDS.map(card => (
                <Link
                  key={card.slug}
                  href={card.slug}
                  style={{
                    background: 'var(--white)',
                    border: '1px solid var(--surface-3)',
                    borderRadius: 12,
                    padding: '16px 18px',
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                  }}
                >
                  <div style={{
                    fontSize: 10, color: 'var(--txt3)',
                    textTransform: 'uppercase', letterSpacing: 0.8, fontWeight: 600,
                  }}>
                    {card.situation}
                  </div>
                  <div style={{
                    fontSize: 17, fontWeight: 700, color: 'var(--txt)',
                    fontFamily: "'Playfair Display', Georgia, serif",
                  }}>
                    {card.name}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--txt2)', lineHeight: 1.55, flex: 1 }}>
                    {card.desc}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--sea)', fontWeight: 600, marginTop: 6 }}>
                    Utforska →
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ── Topp 10 Sverige ── */}
          <section style={{ marginBottom: 44 }}>
            <h2 style={{
              fontSize: 24, fontWeight: 700, color: 'var(--txt)',
              fontFamily: "'Playfair Display', Georgia, serif",
              margin: '0 0 4px',
            }}>
              10 kustvandringar som stannar kvar
            </h2>
            <p style={{ fontSize: 13, color: 'var(--txt3)', margin: '0 0 16px', maxWidth: 600, lineHeight: 1.6 }}>
              Sverige har kanske världens bästa förutsättningar för kustnära vandring: allemansrätt,
              välskötta naturreservat och färjor som tar dig ut på morgonen och hem på kvällen.
              Svallas eget urval av kustvandringar som faktiskt sticker ut.
            </p>
            <div style={{ display: 'grid', gap: 10 }}>
              {TOP_10.map(item => (
                <Link
                  key={item.rank}
                  href={item.slug}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: 14,
                    background: 'var(--white)', border: '1px solid var(--surface-3)',
                    borderRadius: 12, padding: '14px 16px',
                    textDecoration: 'none', color: 'inherit',
                  }}
                >
                  <span style={{
                    width: 34, height: 34, borderRadius: 999, flexShrink: 0,
                    background: item.rank <= 3
                      ? 'linear-gradient(135deg, #1e5c82, #2d7d8a)'
                      : 'var(--surface-2)',
                    color: item.rank <= 3 ? '#fff' : 'var(--txt3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: 13,
                  }}>
                    {item.rank}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--txt)', marginBottom: 3 }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--txt2)', lineHeight: 1.55 }}>
                      {item.desc}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
                    <span style={{ fontSize: 10, color: 'var(--txt3)', textAlign: 'right', maxWidth: 80 }}>
                      {item.region}
                    </span>
                    <span style={{ color: 'var(--sea)', fontSize: 16 }}>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ── Region sections ── */}
          {REGIONS.map(region => {
            const hikes = hikesForRegion(region.id)
            if (hikes.length === 0) return null
            return (
              <section key={region.id} id={region.id} style={{ marginBottom: 44 }}>
                <div style={{ marginBottom: 14 }}>
                  <h2 style={{
                    fontSize: 22, fontWeight: 700, color: 'var(--txt)',
                    fontFamily: "'Playfair Display', Georgia, serif",
                    margin: '0 0 6px',
                  }}>
                    {region.name}
                  </h2>
                  <p style={{
                    fontSize: 13, color: 'var(--txt3)',
                    margin: '0 0 8px', maxWidth: 600, lineHeight: 1.6,
                  }}>
                    {region.shortDesc}
                  </p>
                  {region.relatedUrl && (
                    <Link
                      href={region.relatedUrl}
                      style={{ fontSize: 12, color: 'var(--sea)', textDecoration: 'none', fontWeight: 600 }}
                    >
                      Om {region.name} →
                    </Link>
                  )}
                </div>
                <div style={{ display: 'grid', gap: 8 }}>
                  {hikes.map(hike => (
                    <HikeRow key={hike.slug} hike={hike} />
                  ))}
                </div>
              </section>
            )
          })}

          {/* ── Praktiska guider ── */}
          <section style={{ marginBottom: 44 }}>
            <h2 style={{
              fontSize: 24, fontWeight: 700, color: 'var(--txt)',
              fontFamily: "'Playfair Display', Georgia, serif",
              margin: '0 0 4px',
            }}>
              Praktiska guider
            </h2>
            <p style={{ fontSize: 13, color: 'var(--txt3)', margin: '0 0 16px' }}>
              Svar på de vanligaste frågorna om att vandra längs Sveriges kust och skärgård.
            </p>
            <div style={{ display: 'grid', gap: 4 }}>
              {GUIDES.map((guide, idx) => (
                <details
                  key={idx}
                  style={{
                    background: 'var(--white)',
                    border: '1px solid var(--surface-3)',
                    borderRadius: 10,
                    overflow: 'hidden',
                  }}
                >
                  <summary style={{
                    padding: '14px 16px',
                    fontSize: 14,
                    fontWeight: 700,
                    color: 'var(--txt)',
                    cursor: 'pointer',
                    listStyle: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    userSelect: 'none',
                  }}>
                    {guide.title}
                    <span style={{ color: 'var(--sea)', fontSize: 12, flexShrink: 0, marginLeft: 8 }}>
                      ▸
                    </span>
                  </summary>
                  <div style={{
                    padding: '12px 16px 16px',
                    fontSize: 13, color: 'var(--txt2)', lineHeight: 1.75,
                    borderTop: '1px solid var(--surface-3)',
                  }}>
                    {guide.body}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* ── Thorkel CTA ── */}
          <section style={{
            background: 'linear-gradient(135deg, #1e5c82 0%, #2d7d8a 100%)',
            borderRadius: 16, padding: '32px 28px',
            marginBottom: 44, color: '#fff',
          }}>
            <h2 style={{
              fontSize: 22, fontWeight: 700, margin: '0 0 10px',
              fontFamily: "'Playfair Display', Georgia, serif",
            }}>
              Osäker på vilken vandring som passar dig?
            </h2>
            <p style={{
              fontSize: 14, lineHeight: 1.65,
              opacity: 0.92, margin: '0 0 22px', maxWidth: 520,
            }}>
              Berätta om du vill ta färjan eller har bil. Hur lång tid du har. Om du vill bada, äta lunch eller se solnedgången från en klippa. Thorkel sätter ihop ett förslag som passar just din dag.
            </p>
            <Link
              href="/thorkel"
              style={{
                display: 'inline-block', padding: '12px 24px',
                background: '#fff', color: '#1e5c82',
                borderRadius: 8, textDecoration: 'none',
                fontWeight: 700, fontSize: 14,
              }}
            >
              Planera min vandring med Thorkel →
            </Link>
          </section>

          {/* ── FAQ ── */}
          <section style={{ marginBottom: 44 }}>
            <h2 style={{
              fontSize: 24, fontWeight: 700, color: 'var(--txt)',
              fontFamily: "'Playfair Display', Georgia, serif",
              margin: '0 0 16px',
            }}>
              Vanliga frågor om vandring i skärgården
            </h2>
            <div style={{ display: 'grid', gap: 10 }}>
              {FAQ_ITEMS.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--white)',
                    border: '1px solid var(--surface-3)',
                    borderRadius: 12, padding: '16px 18px',
                  }}
                >
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)', margin: '0 0 6px' }}>
                    {item.q}
                  </h3>
                  <p style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.7, margin: 0 }}>
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Internlänkar ── */}
          <div style={{
            background: 'var(--white)', border: '1px solid var(--surface-3)',
            borderRadius: 14, padding: '20px 22px', marginBottom: 24,
          }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
              Utforska mer på Svalla
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {[
                { label: 'Stockholms skärgård', href: '/stockholms-skargard' },
                { label: 'Bohuslän', href: '/bohuslan' },
                { label: 'Gotland', href: '/gotland' },
                { label: 'Höga kusten', href: '/hoga-kusten' },
                { label: 'Öland', href: '/oland' },
                { label: 'Kajakpaddling', href: '/aktivitet/kajak' },
                { label: 'Segling', href: '/aktivitet/segling' },
                { label: 'Dagsutflykter', href: '/upplevelser' },
                { label: 'Planera med Thorkel', href: '/thorkel' },
              ].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    padding: '7px 14px', borderRadius: 999,
                    background: 'var(--surface-2)', color: 'var(--sea)',
                    textDecoration: 'none', fontSize: 13, fontWeight: 500,
                  }}
                >
                  {link.label} →
                </Link>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <EmailSignup
              variant="card"
              source="aktivitet-vandring"
              title="Mer om vandring i skärgården"
              description="Nya guider, säsongstips och insidertips direkt i inkorgen. Varannan tisdag."
            />
          </div>

        </main>
      </div>
    </>
  )
}
