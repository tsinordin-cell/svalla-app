import type { Metadata } from 'next'
import Link from 'next/link'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

/*
 * Omskriven 2026-09-20 efter besökargenomgången "seglare med egen båt, naturhamn i
 * Bohuslän i helgen". Sidan påstod bl.a. att Svalla "samlar alla seriösa
 * förtöjningsalternativ i Sverige", att "varje platssida visar restriktioner" och att
 * "Svalla markerar vind- och böljeriktningar på varje plats" — inget av det finns.
 * Den hade gästhamnspriser utan prislista, hänvisade till "Skärgårdshamnar.se" och
 * "Svenska Segelföreningen" (finns inte), sa att Smögenbryggan är 600 m (Turistrådet:
 * 1 km) och kallade Tingstäde träsk en naturhamn i ett stycke och en insjö i nästa.
 * MÄTT: utforskaren hade 0 naturhamnar och 0 platser i Bohuslän.
 *
 * Nu står här bara det vi har källa för. Priser: inga utan prislista.
 */

export const metadata: Metadata = {
  title: 'Svenska gästhamnar och naturhamnar — Hamnar & bryggor',
  description: 'Gästhamnar och naturhamnar i Sverige: vad allemansrätten säger om att ankra och låna brygga, hur VHF-kanal 16 och kustradion fungerar, och fem gästhamnar vi kan stå för — Sandhamn, Marstrand, Smögen, Visby och Karlskrona.',
  keywords: [
    'gästhamnar sverige',
    'naturhamnar sverige',
    'gästhamnar stockholms skärgård',
    'marstrand gästhamn',
    'visby hamn gotland',
    'karlskrona hamn',
    'smögen brygga bohuslän',
    'sandhamn stockholm',
    'vhf kanal 16',
    'allemansrätt ankring',
  ],
  openGraph: {
    title: 'Svenska gästhamnar och naturhamnar — Svalla',
    description: 'Allemansrätten på vatten, VHF och kustradio, och fem gästhamnar med källa.',
    url: 'https://svalla.se/hamnar-och-bryggor',
  },
  alternates: { canonical: 'https://svalla.se/hamnar-och-bryggor' },
}

const ITEMS: LandingItem[] = [
  {
    icon: '',
    title: 'Gästhamnar på öarna',
    description: 'Varje ö-sida har hamnarna med service och, där kommunen publicerar det, djup och antal platser. Bohuslän: 19 öar, 25 namngivna gästhamnar.',
    href: '/bohuslan#oar',
  },
  {
    icon: '',
    title: 'Gästhamnar i kartan',
    description: 'De gästhamnar vi hittills lagt in i utforskaren, som kartvy. I dag mest Stockholms skärgård — Bohuslän saknas ännu.',
    href: '/upptack?typ=hamn',
  },
  {
    icon: '',
    title: 'Naturhamnar och allemansrätten',
    description: 'Vad Naturvårdsverket säger om att ankra, låna brygga och ligga över natten — och var du inte får gå i land.',
    href: '/hamnar-och-bryggor#naturhamnar',
  },
  {
    icon: '',
    title: 'Sjömackar',
    description: 'Bränsle och septiktömning i utforskaren. Öppettider varierar med säsong — ring innan du räknar med dem.',
    href: '/upptack?typ=bensin',
  },
  {
    icon: '',
    title: 'Fågelskyddsområden',
    description: 'Öar och vikar med tillträdesförbud under häckningstid. Datumen står på skyltarna och i länsstyrelsens föreskrifter — de varierar mellan områden.',
    href: '/vandring-och-natur',
  },
]

export default function HamnarOchBryggorPage() {
  // Samma fyra svar som i den synliga FAQ:n nedan. KÄLLA: se kommentarerna där.
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Måste man boka gästhamn i förväg?',
        acceptedAnswer: { '@type': 'Answer', text: 'Det beror på hamnen. Många kommunala gästhamnar tar inte emot bokningar alls utan fyller på i ankomstordning, andra bokas via hamnens egen sida. Kontrollera hamnens webbplats — vi länkar till den där ö-sidan har en källa.' },
      },
      {
        '@type': 'Question',
        name: 'Vad innebär VHF-kanal 16?',
        acceptedAnswer: { '@type': 'Answer', text: 'Kanal 16 är den internationella nödkanalen. Sjöfartsverkets sjö- och flygräddningscentral JRCC passar den dygnet runt. Kustradions basstationer sänder också väder och navigationsvarningar; vilka kanaler som används står i Sjöfartsverkets Ufs A.' },
      },
      {
        '@type': 'Question',
        name: 'Är naturhamnar gratis?',
        acceptedAnswer: { '@type': 'Answer', text: 'Att ankra i en vik eller låna en brygga ett tag ingår i allemansrätten, utanför hemfridszon och för kortare tid — Naturvårdsverkets tumregel för att stanna på samma plats är något enstaka dygn. I fågelskyddsområden får du inte gå i land eller vistas under den tid skyddet gäller.' },
      },
      {
        '@type': 'Question',
        name: 'Vad kostar en gästhamn?',
        acceptedAnswer: { '@type': 'Answer', text: 'Priset sätts av varje hamn och beror oftast på båtens längd. Vi publicerar inga hamnpriser utan prislista — där en ö-sida har kommunens eller hamnens prislista som källa står priset där.' },
      },
    ],
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://svalla.se' },
      { '@type': 'ListItem', position: 2, name: 'Hamnar & bryggor', item: 'https://svalla.se/hamnar-och-bryggor' },
    ],
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <CategoryLanding
      heroGradient={['#1e5c82', '#2d7d8a']}
      eyebrow="Hamnar & bryggor"
      title="Hitta rätt förtöjningsplats i Sverige"
      tagline="Gästhamnar och naturhamnar i Sverige — vad allemansrätten säger, hur VHF och kustradion fungerar, och fem hamnar vi kan stå för."
      heroIcon={
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="5" r="3" />
          <path d="M12 8v13" />
          <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
        </svg>
      }
      intro={
        <>
          <p>
            Att välja rätt hamn är halva resan. Storm från väst? Sök lä i öst. Fullt i Sandhamn? Det finns oftast en vik i närheten. Här samlar vi det vi faktiskt kan belägga: vad <strong>allemansrätten</strong> säger om att ankra och låna brygga, hur <strong>VHF-kanal 16</strong> och kustradion fungerar, och fem gästhamnar där uppgifterna kommer från hamnen, kommunen eller destinationsbolaget.
          </p>
          <p>
            <strong>Gästhamnar</strong> har serviceplatser med el, vatten, dusch och toalett och ofta krog eller butik. <strong>Naturhamnar</strong> är vikar där du ankrar eller lägger tamp i berget — utan service, men också utan avgift. Hamnarna på varje ö hittar du på ö-sidorna; Bohusläns öar är samlade på <Link href="/bohuslan#oar">Bohuslän-sidan</Link>.
          </p>
          <p>
            Vi skriver inga hamnpriser utan prislista och inga öppettider utan källa. Saknas något — säg till, vi lägger till det med källa.
          </p>
        </>
      }
      itemsTitle="Hitta rätt"
      items={ITEMS}
      deeperContent={
        <>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
            Fem gästhamnar vi kan stå för
          </h2>
          <p>
            Uppgifterna nedan kommer från hamnens ägare, kommunen, Statens fastighetsverk, Riksantikvarieämbetet eller destinationsbolaget. Inga priser — de står, där vi har prislista, på respektive ö-sida.
          </p>

          {/* KÄLLA: ksss.se/KSSS/historia/ ("KSSS grundades i Stockholm 1830 under namnet Svenska Segel Sällskapet"); stockholmslansmuseum.se/besoksmal/sandhamn/ ("Det pampiga gula tullhuset av sten som dominerar hamnen ritades av slottsarkitekten Carl Hårleman och byggdes 1752"); ksss.se/en/gotlandrunt/ (målgång Sandhamn). Lästa 2026-09-19. Tidigare stod här "Sandö skans 1623" och "bottendjup 3–4 m" utan källa — borttaget. */}
          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            <Link href="/o/sandhamn">Sandhamn, Stockholms skärgård</Link>
          </h3>
          <p>
            Sandhamn ligger på Sandön i Stockholms ytterskärgård och är hemmahamn för KSSS, grundat 1830 som Svenska Segel Sällskapet. Gotland Runt går i mål här. Det gula tullhuset som dominerar hamnen ritades av slottsarkitekten Carl Hårleman och byggdes 1752.
          </p>

          {/* KÄLLA: sfv.se/vara-fastigheter/sverige/vastra-gotalands-lan/carlstens-fastning-marstrand (stenfästning från 1660, statligt byggnadsminne); vastsverige.com/en/kungalv/products/marstrand/ ("Sveriges största gästhamn", Match Cup Sweden första veckan i juli); kungalv.se (färjan Koön–Marstrand drivs av kommunen). Lästa 2026-09-19. Tidigare stod "Karl X Gustav" och "sedan 1994" utan källa — borttaget. */}
          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            <Link href="/o/marstrand">Marstrand, Bohuslän</Link>
          </h3>
          <p>
            Marstrandsön är bilfri och nås med kommunens färja från Koön. Carlstens fästning på öns högsta punkt har anor från en stenfästning 1660 och är statligt byggnadsminne. Turistrådet Västsverige kallar gästhamnen Sveriges största, och Match Cup Sweden avgörs första veckan i juli.
          </p>

          {/* KÄLLA: vastsverige.com/sotenas/produkter/smogenbryggan/ ("1 km långt", "Sveriges mest besökta brygga"); sotenas.se, Smögens gästhamn (kommunal drift, ca 120 gästplatser, vattendjup 3–5 m, WC, färskvatten, el, wifi, tvätt, dusch). Lästa 2026-09-19. Tidigare stod "drygt 600 meter" — fel. */}
          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            <Link href="/o/smogen">Smögen, Bohuslän</Link>
          </h3>
          <p>
            Smögenbryggan är omkring en kilometer lång och enligt Turistrådet Västsverige Sveriges mest besökta brygga. Gästhamnen drivs av Sotenäs kommun med ungefär 120 gästplatser, vattendjup 3–5 meter och el, vatten, dusch, WC, tvätt och wifi.
          </p>

          {/* KÄLLA: raa.se, Hansestaden Visby — världsarv 1995; "En stadsmur av kalksten, Visby ringmur ... Den är 3,6 kilometer lång och utgör Nordeuropas bäst bevarade stadsmur", byggd under 1200-talet. Läst 2026-09-20. */}
          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            <Link href="/gotland">Visby, Gotland</Link>
          </h3>
          <p>
            Hansestaden Visby är världsarv sedan 1995. Ringmuren av kalksten byggdes under 1200-talet, är 3,6 kilometer lång och enligt Riksantikvarieämbetet Nordeuropas bäst bevarade stadsmur — gästhamnen ligger direkt nedanför.
          </p>

          {/* KÄLLA: raa.se, Örlogsstaden Karlskrona — världsarv 1998, grundad 1680, Erik Dahlbergh ledde anläggandet; kommitténs motivering "ett utomordentligt väl bevarat exempel på en europeiskt planerad örlogsstad". Läst 2026-09-20. */}
          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            <Link href="/blekinge-skargard">Karlskrona, Blekinge</Link>
          </h3>
          <p>
            Örlogsstaden Karlskrona grundades 1680, med Erik Dahlbergh som ledare för anläggandet, och är världsarv sedan 1998 som ett utomordentligt väl bevarat exempel på en europeiskt planerad örlogsstad. Härifrån är Blekinges skärgård och Östersjön nära.
          </p>

          {/* KÄLLA: Naturvårdsverket, "Det är lätt att göra allemansrätt — din handbok i naturen" (naturvardsverket.se, pdf): "Lägg till med kajaken, bada vid en strand och låna en brygga ett tag"; "På bryggor och stränder inom hemfridszonen får du inte vara utan lov"; "I ett fågelskyddsområde får du inte gå i land eller vistas under den tid skyddet gäller"; tumregel "något enstaka dygn". Samt naturvardsverket.se/.../pa-vatten/: "Lämna bryggan om ägaren vill använda den", "Håll koll på fågel- och sälskyddsområden". Lästa 2026-09-20. */}
          <h2 id="naturhamnar" style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
            Naturhamnar och allemansrätten
          </h2>
          <p>
            En naturhamn är en skyddad vik utan service. Att ankra där, eller låna en brygga ett tag, ingår i allemansrätten så länge du är utanför någons hemfridszon — på bryggor och stränder inom hemfridszonen får du inte vara utan lov, och du lämnar bryggan om ägaren vill använda den. Naturvårdsverkets tumregel för hur länge du får stanna på samma plats är något enstaka dygn.
          </p>
          <p>
            Håll koll på fågel- och sälskyddsområden: i ett fågelskyddsområde får du inte gå i land eller vistas under den tid skyddet gäller. Datumen står på skyltarna och i länsstyrelsens föreskrifter och varierar mellan områden. Saknar båten toalett med tank: använd hink med tättslutande lock, och ta med skräpet hem.
          </p>
          <p>
            Vi har ännu ingen egen förteckning över naturhamnar. Ö-sidorna beskriver vikar och bryggor där vi har källa; resten hittar du i sjökortet.
          </p>

          {/* KÄLLA: sjofartsverket.se, Svensk kustradio — "Sjöfartsverkets nationella Sjö- och flygräddningscentral JRCC" passar "den internationella nödkanalen CH16 dygnet runt"; basstationerna sänder "väder och navigationsvarningar"; kanalförteckning i Ufs A. Läst 2026-09-20. Tidigare stod "arbetskanal oftast 9–12" och "SMHI väderradio 00–23 var tredje timme" utan källa — borttaget. */}
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
            VHF och kustradio
          </h2>
          <p>
            <strong>Kanal 16 är den internationella nödkanalen.</strong> Sjöfartsverkets sjö- och flygräddningscentral JRCC passar den dygnet runt. Använd den för nödanrop och för att få kontakt — inte för samtal. Kustradions basstationer längs kusten sänder också väder och navigationsvarningar; vilka kanaler som gäller var står i Sjöfartsverkets Ufs A.
          </p>
          <p>
            Många gästhamnar vill att du anropar på VHF eller ringer innan du går in, och en del tar inte emot bokning alls utan fyller på i ankomstordning. Vilket som gäller står på hamnens egen sida — vi länkar dit från ö-sidorna.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
            Pris och bokning
          </h2>
          <p>
            Hamnavgiften sätts av varje hamn och beror oftast på båtens längd. Vi publicerar inga priser utan prislista. Där en ö-sida har kommunens eller hamnens prislista som källa står priset där — annars står det inget, hellre än en gissning.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
            Vanliga frågor om gästhamnar och naturhamnar
          </h2>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Måste man boka gästhamn i förväg?
          </h3>
          <p>
            Det beror på hamnen. Många kommunala gästhamnar tar inte emot bokningar utan fyller på i ankomstordning; andra bokas via hamnens egen sida. Kontrollera hamnens webbplats.
          </p>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Vad innebär VHF-kanal 16?
          </h3>
          <p>
            Den internationella nödkanalen, passad dygnet runt av JRCC. Nödanrop och kontakt — inte samtal.
          </p>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Är naturhamnar gratis?
          </h3>
          <p>
            Att ankra i en vik eller låna en brygga ett tag ingår i allemansrätten, utanför hemfridszon och för kortare tid — tumregeln är något enstaka dygn. I fågelskyddsområden får du inte gå i land under skyddstiden.
          </p>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Vad kostar en gästhamn?
          </h3>
          <p>
            Det bestämmer hamnen, oftast efter båtlängd. Vi skriver bara ut priser som kommer från en prislista.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
            Regionerna
          </h2>
          <p>
            <Link href="/stockholms-skargard">Stockholms skärgård</Link> — närmast för flest, med gästhamnar på de flesta större öarna. <Link href="/bohuslan">Bohuslän</Link> — Marstrand, Smögen och Koster, 19 öar med hamnar på Svalla. <Link href="/gotland">Gotland</Link> — Visby som nav. <Link href="/blekinge-skargard">Blekinge</Link> — Karlskrona och skärgården utanför.
          </p>

          {/* KÄLLA: sjofartsverket.se, Svensk kustradio (väder och navigationsvarningar via kustradion). SMHI:s sjörapport är SMHI:s egen tjänst. */}
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
            Säkerhet och väder
          </h2>
          <p>
            Ankra aldrig utan prognos. SMHI ger sjöväder för kustområdena, och kustradion sänder väder och navigationsvarningar över VHF. En väl vald vik med bra ankarbotten och lä för den vind som väntas är ofta lugnare än en full gästhamn där båtarna ligger tätt.
          </p>
        </>
      }
      related={[
        { label: 'Stockholms skärgård', href: '/stockholms-skargard' },
        { label: 'Bohuslän', href: '/bohuslan' },
        { label: 'Gotland', href: '/gotland' },
        { label: 'Segelrutter', href: '/segelrutter' },
      ]}
    />
    </>
  )
}
