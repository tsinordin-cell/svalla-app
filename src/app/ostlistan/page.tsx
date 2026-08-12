import type { Metadata } from 'next'
import Link from 'next/link'
import EmailSignup from '@/components/EmailSignup'
import ShareButton from '@/components/ShareButton'
import PublicFooter from '@/components/PublicFooter'

export const metadata: Metadata = {
  title: 'Bästa öarna i Stockholms skärgård 2026 – listor per tema | Svalla',
  description: 'Kuraterade ö-listor för barnfamiljer, dagsturister, seglare och romantiska par. Hitta rätt ö i Stockholms skärgård – 2026.',
  alternates: { canonical: 'https://svalla.se/ostlistan' },
  openGraph: {
    title: 'Bästa öarna i Stockholms skärgård – listor per tema',
    description: 'Barnfamiljer, dagsturister, seglare, romantik och hundvänliga öar. Hitta rätt ö i Stockholms skärgård 2026.',
    url: 'https://svalla.se/ostlistan',
    type: 'website',
  },
}

// ── Datadefinitioner ─────────────────────────────────────────────────────────

type IslandEntry = {
  slug: string
  name: string
  emoji: string
  tagline: string
  why: string          // Varför passar ön just detta tema
  travel: string       // Hur man tar sig dit (kort)
  badge?: string       // Litet badge, t ex "Bäst för familjer"
}

type OList = {
  id: string
  title: string
  subtitle: string
  seoKeyword: string
  emoji: string
  color: string        // Gradient-startfärg
  islands: IslandEntry[]
}

const OLISTS: OList[] = [
  {
    id: 'barnfamilj',
    title: 'Bästa öarna för barnfamiljer',
    subtitle: 'Tryggt vatten, lättillgängliga och med något att göra för alla åldrar.',
    seoKeyword: 'öar barnfamilj stockholm skärgård',
    emoji: '👨‍👩‍👧‍👦',
    color: '#1a6b52',
    islands: [
      {
        slug: 'fjaderholmarna',
        name: 'Fjäderholmarna',
        emoji: '⛵',
        tagline: '25 minuter från Stockholm',
        why: 'Korta båtturen gör den perfekt för de minsta. Lugn hamn, kaféer och en liten naturslinga — inga bilar, inga faror.',
        travel: 'Waxholmsbåt från Strömkajen, 25 min',
        badge: 'Kortaste turen',
      },
      {
        slug: 'grinda',
        name: 'Grinda',
        emoji: '🌿',
        tagline: 'Naturreservat med tryggt vatten',
        why: 'Lugna vikar med grunt och varmt vatten, plana gångvägar och ett barnvänligt värdshus. En av skärgårdens bästa familjeöar.',
        travel: 'Waxholmsbåt från Strömkajen, 1 h 20 min',
        badge: 'Bäst för familjer',
      },
      {
        slug: 'vaxholm',
        name: 'Vaxholm',
        emoji: '🏰',
        tagline: 'Stad och fästning',
        why: 'Fästningsmuseet är ett barnfavorit. Plana gångvägar, glasskiosker vid hamnen och enkel pendelbåt gör det till ett enkelt utflyktsmål.',
        travel: 'Waxholmsbåt från Strömkajen, 55 min',
      },
      {
        slug: 'uto',
        name: 'Utö',
        emoji: '🏖️',
        tagline: 'Sandstrand och cykeltur',
        why: 'Skärgårdens enda riktiga sandstrand vid Alsvik. Cykeluthyrning på ön, lugnt badvatten och ett värdshus för middagen.',
        travel: 'Pendeltåg till Nynäshamn + båt, ca 2,5 h',
      },
      {
        slug: 'moja',
        name: 'Möja',
        emoji: '🌾',
        tagline: 'Bilfri med genuint skärgårdsliv',
        why: 'Bilfri ö med cykelvänliga byvägar. Bra för barn som kan cykla och vill uppleva en äkta skärgårdsö utan turistmyller.',
        travel: 'Waxholmsbåt från Strömkajen, 1 h 45 min',
      },
    ],
  },
  {
    id: 'dagstur',
    title: 'Bästa dagsturer från Stockholm',
    subtitle: 'Åk på morgonen, hem på kvällen — hela skärgårdsupplevelsen på en dag.',
    seoKeyword: 'dagstur skärgård stockholm 2026',
    emoji: '☀️',
    color: '#1a4a6b',
    islands: [
      {
        slug: 'fjaderholmarna',
        name: 'Fjäderholmarna',
        emoji: '⛵',
        tagline: 'Halv dag räcker',
        why: '25-minuters båttur + 3 timmar på ön. Hinner äta lunch, gå naturstigen och ta hem souvenirer — och vara hemma till middag.',
        travel: 'Waxholmsbåt från Strömkajen, 25 min',
        badge: 'Snabbaste',
      },
      {
        slug: 'vaxholm',
        name: 'Vaxholm',
        emoji: '🏰',
        tagline: 'Stad med skärgårdsstämning',
        why: 'En komplett dag: fästning, räksmörgås, promenad längs stenhuskajen och hemresa på kvällen. Enklaste dagsturen med mest att göra.',
        travel: 'Waxholmsbåt, 55 min',
        badge: 'Mest att göra',
      },
      {
        slug: 'grinda',
        name: 'Grinda',
        emoji: '🌿',
        tagline: 'Natur och värdshus',
        why: 'Direktbåt (1h 20 min), lunch på Grinda Wärdshus, runt-öpromenad (4 km) och bad. Perfekt dagsutflykt för den som vill ha natur.',
        travel: 'Waxholmsbåt från Strömkajen, 1 h 20 min',
      },
      {
        slug: 'sandhamn',
        name: 'Sandhamn',
        emoji: '⛵',
        tagline: 'Seglingsklassiker',
        why: 'Snabbåten från Stavsnäs tar 40 min. En dag på Sandhamn hinner du: strand, restaurang och bypromenad. Boka returen i förväg.',
        travel: 'Bil till Stavsnäs + snabbåt, ca 40 min',
      },
      {
        slug: 'moja',
        name: 'Möja',
        emoji: '🌾',
        tagline: 'Äkta skärgårdsö',
        why: 'Längre båtresa (1h 45 min) men ger en hel dag på en bilfri ö med äkta karaktär. Ta cykel eller hyra på plats.',
        travel: 'Waxholmsbåt från Strömkajen, 1 h 45 min',
        badge: 'Bästa upplevelssen',
      },
    ],
  },
  {
    id: 'seglare',
    title: 'Bästa öarna för seglare',
    subtitle: 'Gästhamnar, naturhamnar och en skärgård som lönnar den som seglar sin dit.',
    seoKeyword: 'bästa öar seglare stockholms skärgård',
    emoji: '⚓',
    color: '#2d5986',
    islands: [
      {
        slug: 'sandhamn',
        name: 'Sandhamn',
        emoji: '⛵',
        tagline: 'Seglarsverige centrum',
        why: 'KSSS-bas, Match Cup Sweden, välskött gästhamn och restauranger som förstår seglare. Det självklara målet för alla som seglar i Stockholms skärgård.',
        travel: 'Segla ut — ca 50 nm från Stockholm',
        badge: 'Seglarhotellet',
      },
      {
        slug: 'grinda',
        name: 'Grinda',
        emoji: '🌿',
        tagline: 'Välskött gästhamn i naturreservat',
        why: 'Plats för 200 båtar, dusch och el, Grinda Wärdshus för middagen. Ett av skärgårdens bästa mellanstopp.',
        travel: 'Segla ca 25 nm från Stockholm',
      },
      {
        slug: 'moja',
        name: 'Möja',
        emoji: '🌾',
        tagline: 'Bilfri ö med gästbrygga',
        why: 'Karaktärsfull ö med gästbrygga i Möja by. Lugna ankringsvikar på östsidan. Perfekt för de som vill undvika de stora gästhamnarna.',
        travel: 'Ca 35 nm från Stockholm',
      },
      {
        slug: 'uto',
        name: 'Utö',
        emoji: '🏖️',
        tagline: 'Södra skärgårdens pärla',
        why: 'Gästhamn, Utö Värdshus och sandstrand. Populärt stopp på sydliga rutter. Bra vindskydd i hamnen.',
        travel: 'Ca 40 nm söderifrån, nås från Nynäshamn',
      },
      {
        slug: 'bullero',
        name: 'Bullerö',
        emoji: '🏝️',
        tagline: 'Naturhavn för fri ankring',
        why: 'Naturreservat utan service — ankar fritt bland klipporna. En av skärgårdens vackraste anchorages för den som vill ha total stillhet.',
        travel: 'Segla ut mot yttre skärgården',
        badge: 'Bästa ankring',
      },
    ],
  },
  {
    id: 'romantik',
    title: 'Bästa öarna för romantik',
    subtitle: 'Solnedgångar, värdshus med sjöutsikt och öar lagom långt från vardagen.',
    seoKeyword: 'romantiska öar stockholms skärgård',
    emoji: '🌅',
    color: '#6b2d5e',
    islands: [
      {
        slug: 'grinda',
        name: 'Grinda',
        emoji: '🌿',
        tagline: 'Värdshus i naturreservat',
        why: 'En natt på Grinda Wärdshus med middag på restaurangen och solnedgången från bryggan är svårslagen. Book one av de bättre rummen med sjöutsikt.',
        travel: 'Waxholmsbåt från Strömkajen, 1 h 20 min',
        badge: 'Bäst totalt',
      },
      {
        slug: 'sandhamn',
        name: 'Sandhamn',
        emoji: '⛵',
        tagline: 'Seglarhotell och Trouville-strand',
        why: 'Seglarhotellets restaurang, promenad längs Trouville-stranden i solnedgången och havsluft. Passar par som gillar lite mer liv och rörelse.',
        travel: 'Snabbåt via Stavsnäs, 40 min',
      },
      {
        slug: 'uto',
        name: 'Utö',
        emoji: '🏖️',
        tagline: 'Sandstrand och ljus skärgårdsnatt',
        why: 'Utö Värdshus, sandstranden vid Alsvik och cykelturen i skymningen. Passar par som vill ha natur och lite aktivitet.',
        travel: 'Pendeltåg till Nynäshamn + båt',
      },
      {
        slug: 'finnhamn',
        name: 'Finnhamn',
        emoji: '🌲',
        tagline: 'Stilla ö i yttre skärgården',
        why: 'Litet vandrarhem, gästhamn och en ö som nästan inte förändrats på 50 år. Minimal turism, maximal stillhet.',
        travel: 'Waxholmsbåt, ca 2 h',
      },
      {
        slug: 'moja',
        name: 'Möja',
        emoji: '🌾',
        tagline: 'Bilfri, kuperad och genuint vacker',
        why: 'Kvällspromenader längs byvägarna, kaféfrukost på morgonen och en ö som inte stressar upp någon. Perfekt för det lugnare paret.',
        travel: 'Waxholmsbåt från Strömkajen, 1 h 45 min',
      },
    ],
  },
  {
    id: 'hund',
    title: 'Bästa hundvänliga öarna',
    subtitle: 'Öar med plats för hunden — och regler du behöver känna till.',
    seoKeyword: 'hundvänliga öar stockholms skärgård',
    emoji: '🐕',
    color: '#5a4a2b',
    islands: [
      {
        slug: 'grinda',
        name: 'Grinda',
        emoji: '🌿',
        tagline: 'Stora gräsytor, hundvänlig servering',
        why: 'Naturreservat med gott om plats. Grinda Wärdshus tillåter hundar i uteserveringen. Välj leden längs östra sidan för mest utrymme.',
        travel: 'Waxholmsbåt, 1 h 20 min',
        badge: 'Bäst för hund',
      },
      {
        slug: 'moja',
        name: 'Möja',
        emoji: '🌾',
        tagline: 'Bilfri med lugna byvägar',
        why: 'Få bilar, lugnt tempo och byvägar att promenera längs. Hunden kan röra sig fritt utanför kopplingstvångstiden (20 aug–1 mars).',
        travel: 'Waxholmsbåt, 1 h 45 min',
      },
      {
        slug: 'vaxholm',
        name: 'Vaxholm',
        emoji: '🏰',
        tagline: 'Stadsrunda med hunden',
        why: 'Promenaden längs kajen och upp mot fästningsparken passar perfekt för hund. Många uteserveringar välkomnar hundar.',
        travel: 'Waxholmsbåt, 55 min',
      },
      {
        slug: 'orno',
        name: 'Ornö',
        emoji: '🌲',
        tagline: 'Stor ö med riktig natur',
        why: 'En av de större öarna med skogar och stigar. Bra för hunden att verkligen röra på sig. Nås med vägfärja från Nynäshamn.',
        travel: 'Bil till Nynäshamn + vägfärja',
      },
      {
        slug: 'ljustero',
        name: 'Ljusterö',
        emoji: '🏞️',
        tagline: 'Skogspromenader nära Stockholm',
        why: 'Norra skärgården, nås med bil och bro. Stora skogsområden och lite turism. Utmärkt för hundpromenader utan trängseln.',
        travel: 'Bil via Norrtälje-hållet + bro',
      },
    ],
  },
  {
    id: 'sandstrand',
    title: 'Öarna med bäst sandstränder',
    subtitle: 'Stockholms skärgård är klippor — men det finns undantag.',
    seoKeyword: 'öar sandstrand stockholm skärgård',
    emoji: '🏖️',
    color: '#8a6a1a',
    islands: [
      {
        slug: 'uto',
        name: 'Utö',
        emoji: '🏖️',
        tagline: 'Skärgårdens enda riktiga sandstrand',
        why: 'Alsviksbadet är en 300 meter lång sandstrand med grunt och varmt vatten. Unik i Stockholms skärgård. Cykla hit från bryggan på 15 minuter.',
        travel: 'Pendeltåg till Nynäshamn + Waxholmsbåt, ca 2,5 h',
        badge: 'Bästa sandstranden',
      },
      {
        slug: 'galo',
        name: 'Gålö',
        emoji: '🏖️',
        tagline: 'Lättillgänglig sandstrand med bil',
        why: 'Gålö Havsbad — en av regionens mest populära sandstränder, nåbar med bil på 40 minuter. Full service, parkering och camping.',
        travel: 'Bil från Stockholm, 40 min',
        badge: 'Enklast att nå',
      },
      {
        slug: 'toro',
        name: 'Torö',
        emoji: '🌊',
        tagline: 'Klapperstensstrand i naturreservat',
        why: 'Dramatisk klapperstensstrand längs sydkusten — geologiskt unik. Inte klassisk sandstrand men ett av länets vackraste klippstrandlandskap.',
        travel: 'Bil från Stockholm, 60 min',
      },
      {
        slug: 'bjorko',
        name: 'Björkö (Birka)',
        emoji: '⚔️',
        tagline: 'Sandstrand + vikingatida historia',
        why: 'Björkö har en liten sandstrand och ett av Nordens mest fascinerande arkeologiska platser på samma ö. Unik kombination.',
        travel: 'M/S Birka från Stadshuskajen, 3 h',
      },
      {
        slug: 'finnhamn',
        name: 'Finnhamn',
        emoji: '🌲',
        tagline: 'Liten sandstrand i naturhamn',
        why: 'En dold sandstrand på öns norra sida. Lugnt badvatten och inga tullar. Bäst på en vardag i juni.',
        travel: 'Waxholmsbåt, ca 2 h',
      },
    ],
  },
  {
    id: 'september',
    title: 'Bästa öarna i september',
    subtitle: 'Havet är 17–19°C, köerna är borta och restaurangerna tar emot dig.',
    seoKeyword: 'skärgård september bästa öar',
    emoji: '🍂',
    color: '#7a3a1a',
    islands: [
      {
        slug: 'moja',
        name: 'Möja',
        emoji: '🌾',
        tagline: 'Bilfri höstö med öppna krogar',
        why: 'Möja Krog håller öppet till mitten av september. Bilfritt, stilla och med ett ljus som juli aldrig kan matcha. Vattnet är fortfarande 17°C.',
        travel: 'Waxholmsbåt, 1 h 45 min',
        badge: 'Bäst i september',
      },
      {
        slug: 'uto',
        name: 'Utö',
        emoji: '🏖️',
        tagline: 'Värdshuset öppet, stranden tom',
        why: 'Utö Värdshus tar emot gäster till och med 5 oktober. Alsviksstranden är din i september — havstemperaturen håller kvar till slutet av månaden.',
        travel: 'Pendeltåg + båt, ca 2,5 h',
      },
      {
        slug: 'sandhamn',
        name: 'Sandhamn',
        emoji: '⛵',
        tagline: 'Hamnliv utan sommarmyller',
        why: 'Seglarhotellet och ett par restauranger håller öppet till mitten av september. Hamnen är lättare att anlöpa och byborna har ön tillbaka.',
        travel: 'Snabbåt via Stavsnäs, 40 min',
      },
      {
        slug: 'vaxholm',
        name: 'Vaxholm',
        emoji: '🏰',
        tagline: 'Skärgårdsstad med helårsliv',
        why: 'Vaxholm är öppet hela året. September är lugnt och vackert — fästningen öppen, restaurangerna tillgängliga och kajpromenaden ensam din.',
        travel: 'Waxholmsbåt, 55 min',
      },
      {
        slug: 'finnhamn',
        name: 'Finnhamn',
        emoji: '🌲',
        tagline: 'Stilla ytterskärgård i sensommar',
        why: 'Vandrarhem och gästhamn öppna i september. Nästan inga andra besökare. En av de bästa öarna att besöka när säsongen är förbi.',
        travel: 'Waxholmsbåt, ca 2 h',
        badge: 'Mest stillhet',
      },
    ],
  },
  {
    id: 'budget',
    title: 'Bästa öarna på budget',
    subtitle: 'Skärgård behöver inte kosta skjortan — om du väljer rätt.',
    seoKeyword: 'billig skärgård stockholm budget ö',
    emoji: '💰',
    color: '#1a5a3a',
    islands: [
      {
        slug: 'fjaderholmarna',
        name: 'Fjäderholmarna',
        emoji: '⛵',
        tagline: 'Billigast att nå',
        // UPPSKATTNING: ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör (2026-08)
        why: 'Waxholmsbåt tur-retur kostar runt 150 kr med SL-kort. Ta med picknick, vandra runt naturstigen och bad gratis från klipporna.',
        travel: 'SL-kort gäller med tilläggsbiljett, 25 min',
        badge: 'Lägst kostnad',
      },
      {
        slug: 'vaxholm',
        name: 'Vaxholm',
        emoji: '🏰',
        tagline: 'Dag ut för lite pengar',
        // UPPSKATTNING: ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör (2026-08)
        why: 'Fästningen kostar runt 80 kr. Räksmörgåsen är skärgårdens bästa köp. Allt annat är gratis — promenaden, fästningsparken och hamnluften.',
        travel: 'Waxholmsbåt, 55 min',
      },
      {
        slug: 'ljustero',
        name: 'Ljusterö',
        emoji: '🏞️',
        tagline: 'Norra skärgården med bil och bro — gratis',
        why: 'Broförbunden utan färjakostnad. Ta med mat, parkera gratis och vandra längs kusten. En hel dag i norra skärgården utan att spendera en krona om du vill.',
        travel: 'Bil via bro, ingen färjakostnad',
        badge: 'Billigast med bil',
      },
      {
        slug: 'finnhamn',
        name: 'Finnhamn',
        emoji: '🌲',
        // UPPSKATTNING: ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör (2026-08)
        tagline: 'Vandrarhem från 300 kr/natt',
        why: 'Ett av skärgårdens billigaste boendealternativ. Vandrarhem med bra standard, naturskön hamn och inget krav på restaurangmiddag.',
        travel: 'Waxholmsbåt, ca 2 h',
      },
      {
        slug: 'galo',
        name: 'Gålö',
        emoji: '🏖️',
        tagline: 'Gratis sandstrand med bil',
        why: 'Gålö Havsbad kostar ingenting att besöka (parkering tillkommer). Ta med picknick och tillbringa hela dagen på en av länets bästa sandstränder för bara bensinkostnaden.',
        travel: 'Bil, 40 min',
      },
    ],
  },
]

// ── Schema.org ItemList per lista ─────────────────────────────────────────────

function buildItemListSchema(list: OList) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: list.title,
    description: list.subtitle,
    url: `https://svalla.se/ostlistan#${list.id}`,
    numberOfItems: list.islands.length,
    itemListElement: list.islands.map((island, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: island.name,
      url: `https://svalla.se/o/${island.slug}`,
      description: island.why,
    })),
  }
}

// ── Komponent ─────────────────────────────────────────────────────────────────

export default function OstlistanPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg, #f8f7f4)', fontFamily: "'Inter','Helvetica Neue',sans-serif" }}>

      {/* Schema.org ItemLists */}
      {OLISTS.map(list => (
        <script
          key={list.id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildItemListSchema(list)) }}
        />
      ))}

      {/* BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Svalla', item: 'https://svalla.se' },
            { '@type': 'ListItem', position: 2, name: 'Ölistorna', item: 'https://svalla.se/ostlistan' },
          ],
        })}}
      />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(160deg, #0e3a5c 0%, #1a6b7a 100%)',
        paddingTop: 'calc(env(safe-area-inset-top,0px) + 16px)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -80, right: -80,
          width: 320, height: 320, borderRadius: '50%',
          background: 'rgba(255,255,255,0.04)', pointerEvents: 'none',
        }} />
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 20px 52px', position: 'relative' }}>
          <div style={{ padding: '12px 0 28px' }}>
            <Link href="/oar" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              color: 'rgba(255,255,255,0.85)', textDecoration: 'none',
              fontSize: 13, fontWeight: 700,
              background: 'rgba(255,255,255,0.12)',
              borderRadius: 20, padding: '6px 14px 6px 10px',
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ width: 14, height: 14 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Alla öar
            </Link>
          </div>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.15)', borderRadius: 20,
            padding: '5px 14px', marginBottom: 18,
          }}>
            <span style={{ fontSize: 14 }}>🗺️</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.9)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Kuraterade listor 2026
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display,"Playfair Display",Georgia,serif)',
            fontSize: 'clamp(28px, 5vw, 48px)',
            fontWeight: 800, color: '#fff',
            margin: '0 0 16px', lineHeight: 1.15,
          }}>
            Hitta rätt ö — för just din resa
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: 16, lineHeight: 1.65, margin: '0 0 28px', maxWidth: 580 }}>
            Vi har sorterat Stockholms skärgårds bästa öar efter vad du söker — barnfamilj, dagstur, segling, romantik eller hundvänlighet. Välj din lista nedan.
          </p>

          {/* Snabbnavigering */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {OLISTS.map(list => (
              <a
                key={list.id}
                href={`#${list.id}`}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  background: 'rgba(255,255,255,0.14)',
                  border: '1px solid rgba(255,255,255,0.22)',
                  borderRadius: 999, padding: '7px 16px',
                  color: '#fff', textDecoration: 'none',
                  fontSize: 13, fontWeight: 600,
                  backdropFilter: 'blur(4px)',
                }}
              >
                <span>{list.emoji}</span>
                {list.title.replace('Bästa öarna för ', '').replace('Bästa öarna för ', '').replace('Bästa ', '')}
              </a>
            ))}
          </div>
        </div>

        <svg viewBox="0 0 1440 40" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 40, marginBottom: -1 }}>
          <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" fill="var(--bg,#f8f7f4)" />
        </svg>
      </div>

      {/* ── LISTOR ────────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '16px 20px 80px' }}>

        {OLISTS.map((list, listIdx) => (
          <section key={list.id} id={list.id} style={{ marginBottom: 72, scrollMarginTop: 80 }}>

            {/* Lista-header */}
            <div style={{
              background: `linear-gradient(135deg, ${list.color}18 0%, ${list.color}08 100%)`,
              border: `1px solid ${list.color}22`,
              borderRadius: 18, padding: '24px 28px 20px',
              marginBottom: 24,
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: 28 }}>{list.emoji}</span>
                    <h2 style={{
                      fontFamily: 'var(--font-display,"Playfair Display",Georgia,serif)',
                      fontSize: 'clamp(20px,3vw,26px)',
                      fontWeight: 800, color: 'var(--txt,#1a2b3c)',
                      margin: 0,
                    }}>
                      {list.title}
                    </h2>
                  </div>
                  <p style={{ fontSize: 14, color: 'var(--txt2,#4a5568)', margin: 0, lineHeight: 1.55 }}>
                    {list.subtitle}
                  </p>
                </div>
                <ShareButton
                  title={list.title}
                  description={list.subtitle}
                  url={`https://svalla.se/ostlistan#${list.id}`}
                  surface="ostlistan"
                  entityId={list.id}
                />
              </div>
            </div>

            {/* Ö-kort */}
            <div style={{ display: 'grid', gap: 14 }}>
              {list.islands.map((island, idx) => (
                <Link
                  key={island.slug}
                  href={`/o/${island.slug}`}
                  style={{ textDecoration: 'none', display: 'block' }}
                >
                  <div style={{
                    background: 'var(--white,#fff)',
                    borderRadius: 16,
                    padding: '18px 22px',
                    boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
                    border: '1px solid rgba(10,123,140,0.08)',
                    display: 'flex', gap: 16, alignItems: 'flex-start',
                    transition: 'box-shadow 0.15s, transform 0.15s',
                  }}>
                    {/* Nummer */}
                    <div style={{
                      flexShrink: 0,
                      width: 36, height: 36,
                      borderRadius: '50%',
                      background: `${list.color}18`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 13, fontWeight: 800,
                      color: list.color,
                    }}>
                      {idx + 1}
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 16 }}>{island.emoji}</span>
                        <span style={{
                          fontSize: 16, fontWeight: 700,
                          color: 'var(--txt,#1a2b3c)',
                        }}>
                          {island.name}
                        </span>
                        {island.badge && (
                          <span style={{
                            fontSize: 11, fontWeight: 700,
                            background: `${list.color}18`,
                            color: list.color,
                            padding: '3px 10px', borderRadius: 999,
                            letterSpacing: '0.04em',
                          }}>
                            {island.badge}
                          </span>
                        )}
                      </div>
                      <p style={{
                        fontSize: 12, color: 'var(--txt3,#718096)',
                        margin: '0 0 6px', fontWeight: 600,
                      }}>
                        {island.tagline}
                      </p>
                      <p style={{
                        fontSize: 13.5, color: 'var(--txt2,#4a5568)',
                        margin: '0 0 8px', lineHeight: 1.55,
                      }}>
                        {island.why}
                      </p>
                      <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        fontSize: 12, color: 'var(--sea,#0a7b8c)', fontWeight: 600,
                      }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 13, height: 13 }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {island.travel}
                      </div>
                    </div>

                    {/* Pil */}
                    <div style={{
                      flexShrink: 0, alignSelf: 'center',
                      color: 'var(--sea,#0a7b8c)', opacity: 0.6,
                    }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ width: 18, height: 18 }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Email capture varannan lista */}
            {(listIdx === 1 || listIdx === 3) && (
              <div style={{
                marginTop: 28,
                background: 'linear-gradient(135deg, rgba(30,92,130,0.07) 0%, rgba(10,123,140,0.05) 100%)',
                borderRadius: 16, padding: '22px 24px',
                border: '1px solid rgba(30,92,130,0.12)',
              }}>
                <EmailSignup
                  variant="inline"
                  source={`ostlistan-${list.id}`}
                  title="Vill du ha fler tips som dessa?"
                  description="Varannan tisdag — öppna öar, insider-tips och det vi inte publicerar annars. Gratis."
                  buttonLabel="Prenumerera gratis →"
                />
              </div>
            )}
          </section>
        ))}

        {/* ── BOTTOM CTA ────────────────────────────────────────────────── */}
        <div style={{
          background: 'linear-gradient(135deg, #0e3a5c 0%, #1a6b7a 100%)',
          borderRadius: 20, padding: '36px 32px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>✉️</div>
          <h2 style={{
            fontFamily: 'var(--font-display,"Playfair Display",Georgia,serif)',
            fontSize: 24, fontWeight: 800, color: '#fff',
            margin: '0 0 10px',
          }}>
            Håll dig uppdaterad om skärgården
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15, margin: '0 0 24px', lineHeight: 1.6 }}>
            Nyhetsbrevet skickas varannan tisdag — öppna öar, säsongsuppdateringar och tips du inte hittar på TripAdvisor.
          </p>
          <EmailSignup
            variant="inline"
            source="ostlistan-bottom"
            buttonLabel="Skriv upp mig gratis →"
          />
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, marginTop: 12 }}>
            Avregistrera dig när du vill.{' '}
            <Link href="/nyhetsbrev" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'underline' }}>
              Se ett smakprov →
            </Link>
          </p>
        </div>

        {/* Relaterade sidor */}
        <div style={{ marginTop: 40, display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
          {[
            { href: '/oar', label: '🗺️ Alla öar' },
            { href: '/guider', label: '📖 Guider' },
            { href: '/blogg', label: '✍️ Blogg' },
            { href: '/utflykt', label: '⛵ Utflyktsplanerare' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} style={{
              display: 'inline-block',
              padding: '9px 18px', borderRadius: 999,
              background: 'var(--white,#fff)',
              color: 'var(--sea,#0a7b8c)',
              textDecoration: 'none', fontSize: 13, fontWeight: 600,
              border: '1px solid rgba(10,123,140,0.15)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            }}>
              {label}
            </Link>
          ))}
        </div>
      </div>

      <PublicFooter />
    </div>
  )
}
