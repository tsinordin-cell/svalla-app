import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
  title: 'Västerhavet — Segla Kattegatt & Skagerrak | Svalla',
  description: 'Utforska Västerhavet med Svalla. Logga båtturer i Kattegatt och Skagerrak med tidvatteninfo, vind och djupdata. Hitta gästhamnar, naturhamnar och kustrestauranger längs svenska västkusten.',
  keywords: [
    'västerhavet segla',
    'kattegatt segling',
    'skagerrak båt',
    'svenska västkusten',
    'segla västerhavet',
    'kustsegling sverige',
    'göteborg segla',
    'halmstad båt',
    'varberg segling',
    'lysekil guide',
    'fiskebäckskil',
    'orust',
    'tjörn',
    'halland kust',
    'västra götaland segling',
    'kosterfjorden',
    'västerhavet guide',
    'tidvatten segling',
  ],
  openGraph: {
    title: 'Västerhavet — Segla Kattegatt & Skagerrak | Svalla',
    description: 'Logga dina båtturer längs svenska västkusten med Svalla.',
    url: 'https://svalla.se/vasterhav',
  },
  alternates: { canonical: 'https://svalla.se/vasterhav' },
}

const ITEMS: LandingItem[] = [
  {
    icon: '🗺️',
    title: 'Karta över Västerhavet',
    description: 'Alla verifierade platser längs Kattegatt och Skagerrak — gästhamnar, naturhamnar, sjömackar och kustrestauranger.',
    href: '/platser',
    meta: 'Gratis',
  },
  {
    icon: '🌊',
    title: 'Kustsegling & passager',
    description: 'Från Hallandskusten upp till norska gränsen — vindinfo, ströminformation och djupdata för varje etapp.',
    href: '/segelrutter',
  },
  {
    icon: '🦞',
    title: 'Hummerkrogar & fisk',
    description: 'Västkustens sjömat är känd i hela världen. Hitta de bästa krogarna i Lysekil, Fiskebäckskil och Hamburgsund.',
    href: '/krogar-och-mat',
  },
  {
    icon: '🏕️',
    title: 'Ankring & naturhamnar',
    description: 'Västerhavet bjuder på dramatiska klippformationer och skyddade vikar. Hitta dolda ankringsplatser på Svallas karta.',
    href: '/platser?kategori=naturhamn',
  },
  {
    icon: '⚓',
    title: 'Logga dina turer',
    description: 'Spåra din färd med GPS, dokumentera väder och vind, och dela turen med seglare som känner Västerhavet.',
    href: '/logga-in',
  },
  {
    icon: '⛵',
    title: 'Orust & Tjörn',
    description: 'Två av Skandinaviens mest seglartäta öar — med service, varv och ett rikt seglarliv hela sommaren.',
    href: '/logga-in',
  },
]

export default function VasterhavetPage() {
  return (
    <CategoryLanding
      heroGradient={['#1a5276', '#2471a3']}
      eyebrow="Västerhavet"
      title="Kattegatt & Skagerrak"
      tagline="Öppet hav, salt vind och dramatiska klippkuster — Svalla hjälper dig logga och dela varje etapp längs svenska västkusten."
      heroIcon={
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      }
      intro={
        <>
          <p>
            Västerhavet — Kattegatt och Skagerrak — är Nordens öppna seglarvatten. <strong>Tidvatten, tydliga strömmar och friska vindar</strong> gör det mer krävande än den lugna skärgården, men också mer belönande. Från Hallands sandstränder och moderna marinaer i söder till Bohusläns dramatiska granitskär och de djupa fjordarna vid norska gränsen erbjuder Västerhavet oslagbar varierad segling.
          </p>
          <p>
            Med Svalla loggar du alla etapper längs kusten, dokumenterar väder och vind, och hittar de bästa hamnarna, ankringsplatserna och sjömatkrogarna på vägen. Oavsett om du seglat i år eller du är erfaren skeppare vet du att planering är nyckeln — tidvatten, strömmar och väderförhållanden kan förändra allt mellan två dagar.
          </p>
          <p>
            Denna guide tar dig genom Västerhavet från söder till norr, med allt du behöver veta om var du seglat, var du bör ankra, och vilka restauranger som är värda att stanna till vid.
          </p>
        </>
      }
      itemsTitle="Västerhavet med Svalla"
      itemsDescription="Allt du behöver för segling i Kattegatt och Skagerrak."
      items={ITEMS}
      deeperContent={
        <>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
            Halland — sandstränder och moderna marinaer
          </h2>
          <p>
            Hallandskusten är perfekt för familjesegling och mindre erfarna seglare. <strong>Långa, fina sandstränder</strong> gör ankringsplatserna lätta att hitta, och vattnets är lugnare här än längre norrut. Många av ankarplatserna är väl skyddade från västvinden.
          </p>
          <p>
            <strong>Varberg</strong> är en klassisk utflyktsdestination med den historiska fästningen, en surfkultur och en välutrustad gästhamn. Marina är helt moderna med alla faciliteter för längre vistelse. <strong>Falkenberg</strong> norra port är Morup fiskehamn — en charmig liten hamn med frisk fisk direkt från båtarna. <strong>Halmstad</strong> har en större gästhamn med shopping nära till, perfekt om du behöver förnödenheter eller bara vill ha en större stad att utforska.
          </p>
          <p>
            Halland är hemmet till många seglarvänliga naturhamnar — använd Svallas karta för att hitta dolda ankringsplatser längs kusten där få andra ankrar.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Bohuslän och Kattegatt — granitskär och varvskultur
          </h3>
          <p>
            Bohuslän är hjärtat av svensk segling. Här möter du <strong>Skandinaviens största öar</strong> — Orust och Tjörn — som båda är legendariska bland seglare. Dessa öar är hemmet till en stark varvskultur och en tradition av båtbygge som går tillbaka århundraden. Besök <strong>Ellös</strong> på Orust för att se båtbyggare vid arbete och för att få en känsla av denna marinära traditionsrika plats.
          </p>
          <p>
            <strong>Lysekil</strong> är ett måste för alla västkustseglare. Här hittar du Bohuslän fiskmarknad — en energisk plats där fiskebåtarna landar sin fångst. Besök även <strong>Havets Hus</strong>, ett akvarium och utbildningscenter dedikerat till Västerhavet och dess ekosystem. <strong>Fiskebäckskil</strong> , några kilometer söder om Lysekil, är arkitektens drömby — en liten fiskehamn där varje byggnad tycks placerad med omtanke. Här finns några av västkustens bästa restauranger, och ankringsplatserna i <strong>Gullmarsfjorden</strong> är lugna och skyddade.
          </p>
          <p>
            För mer djup om denna region, se vår dedikerade sida om <strong>Bohuslän</strong> , där vi går in på historia, segling och lokala hemligheterna.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Skagerrak och norska gränsen — djupet och äventyret
          </h3>
          <p>
            Västerhavet kulminerar i norr vid Skagerrak — där gränsen mellan Sverige och Norge går genom en av världens viktigaste sjöfartsvägar. <strong>Kosterfjorden</strong> är Skandinaviens djupaste fjord och ett spektakulärt segelresmål. <strong>Kosterhavets nationalpark</strong> skyddar dessa vatten och gör dem till ett unikt ekosystem. <strong>Strömstad</strong> är den naturliga utgångspunkten för gränssegling mot Norge.
          </p>
          <p>
            Segling i Skagerrak kräver respekt. <strong>Tidvattnets</strong> kan vara upp till 50 cm här, och <strong>strömmarnas</strong> är mycket märkbara under vissa förhållanden. Planera din passage noga — använd tidvattentabeller och be om råd från lokala seglare innan du går ut. Nordgående segling från Skagerrak mot den norska skärgården (särskilt Hvaler-området) är ett populärt resmål för äventyrsvilliga seglare.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Tidvatten, strömmar och väder på Västerhavet
          </h3>
          <p>
            <strong>Tidvatten</strong> är den största faktorn som skiljer Västerhavet från Östersjön. Längst Hallandskusten är amplituden (skillnaden mellan högvatten och lågvatten) 20–40 cm. Vid norska gränsen kan den nå 50 cm eller mer — enormt jämfört med den nästan tidvattenlösa Östersjön. Detta betyder att dina ankar kan komma loss eller att en grund ankringsplats plötsligt blir oåtkomlig. Alltid planera dina dagsetapper med tidevattnet i åtanke.
          </p>
          <p>
            <strong>Strömmar</strong> följer ofta tidvattnet. Starka strömmar kan förvandla en kort passage till något helt annat på bara några minuter. Platser som Hake fjord och Marstrand är kända för märkbara strömmar. <strong>Använd Svallas passagepristagare</strong> för att planera när du seglar dessa sträckor.
          </p>
          <p>
            <strong>Sydvästvinden dominerar</strong> under seglarsäsongen (maj–september). Det är perfekt för nordgående segling längs Bohuslän men kan ge hårt väder i norr. <strong>Dimma</strong> kan vara ett problem vid Hallandskusten, särskilt tidigt och sent på säsongen. SMHI:s varningsapp är obligatorisk för alla seglarväg — installera den och kontrollera varningarna innan du går ut.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Vanliga frågor om Västerhavet
          </h3>
          <p>
            <strong>Hur skiljer sig Västerhavet från Östersjön att segla?</strong><br />
            Tidvatten och strömmar är mycket märkbara på Västerhavet — något som nästan helt saknas i Östersjön. Vinden är också ofta starkare här. Det kräver mer erfarenhet att segla på Västerhavet, men belöningen är en mycket mer dramatisk och varierad segelupplevelse. Många seglare säger att en vecka på Västerhavet är värd två veckor på Östersjön.
          </p>
          <p>
            <strong>Kan man segla till Norge från Västerhavet?</strong><br />
            Ja, absolut! <strong>Strömstad</strong> är den naturliga gränshamnen. Från här är det bara några timmars segling till den norska skärgården vid <strong>Hvaler</strong> , ett populärt resmål bland svenska seglare. Kosterfjorden ligger också på den svenska sidan men är mycket nära Norge — många seglare kombinerar en tur här med en passage till det norska området. Se till att du har en aktuell karta, pass ombord och att du följer gränsseglingsreglerna.
          </p>
          <p>
            <strong>Vad är de bästa hamnarna längs Västerhavet?</strong><br />
            <strong>I norr:</strong> Strömstad, Grebbestad, Smögen och Lysekil — dessa är klassiska stopps med utmärkt service. <strong>I mitten:</strong> Marstrand (en ikon för segling, men boka långt i förväg under juli), Fiskebäckskil och Orust. <strong>I söder:</strong> Varberg, Falkenberg och Halmstad erbjuder modernt komfort men mindre av det klassiska västkustäventyret. Använd Svallas karta för att upptäcka mindre gästhamnar och naturhamnar — dessa är ofta fattigare på faciliteter men mycket mer autentiska och lugna.
          </p>
          <p>
            <strong>Behöver man specialutrustning för Västerhavet?</strong><br />
            <strong>AIS-transponder</strong> rekommenderas starkt i Kattegatt där fartygstrafiken är tung. <strong>VHF-radio</strong> är obligatorisk — du behöver kunna höra vädervarsels och kommunicera med andra fartyg och hamner. <strong>Tidvattentabeller</strong> eller en app som visar tidvattnet är essentiell för planering. Uppdaterade navigationskort och en GPS med bra sjökort gör livet säkert enklare. Slutligen, installera alltid <strong>SMHI:s varningsapp</strong> och kontrollera väderutsikten innan varje passage.
          </p>
        </>
      }
      cta={{ label: 'Skapa gratis konto', href: '/logga-in' }}
      related={[
        { label: 'Segelrutter', href: '/segelrutter' },
        { label: 'Hamnar & bryggor', href: '/hamnar-och-bryggor' },
        { label: 'Aktiviteter', href: '/aktiviteter' },
        { label: 'Bohuslän', href: '/bohuslan' },
      ]}
    />
  )
}
