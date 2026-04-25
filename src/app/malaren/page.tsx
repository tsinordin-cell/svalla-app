import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
  title: 'Mälaren — Segla Sveriges tredje största sjö | Svalla',
  description: 'Utforska Mälaren med Svalla. 1 140 öar, historiska hamnar, kafébryggor och lugna segelvatten — perfekt för familjer och nybörjare.',
  keywords: [
    'mälaren segla',
    'mälaren båt',
    'segla mälaren',
    'mälarö',
    'ekerö',
    'munsö',
    'björkö birka',
    'strängnäs hamn',
    'västerås segla',
    'mariefred',
    'gripsholm',
    'stockholm mälaren',
    'mälardalen segling',
    'insjösegling sverige',
    'svealand båtliv',
    'mälaren kafébrygga',
    'birka vikingastad',
    'drottningholm segling',
    'mälaren guide',
    'gripsholm mariefred',
  ],
  openGraph: {
    title: 'Mälaren — Segla Sveriges tredje största sjö | Svalla',
    description: 'Logga dina båtturer på Mälaren med Svalla — 1 140 öar, historiska hamnar och kafébryggor.',
    url: 'https://svalla.se/malaren',
  },
  alternates: { canonical: 'https://svalla.se/malaren' },
}

const ITEMS: LandingItem[] = [
  {
    icon: '🗺️',
    title: 'Karta över Mälaren',
    description: 'Alla gästbryggor, kaféer, naturhamnar och sevärdheter runt Mälaren — verifierade och uppdaterade.',
    href: '/platser',
    meta: 'Gratis',
  },
  {
    icon: '⛵',
    title: 'Rutter på Mälaren',
    description: 'Klassiska leder från Stockholm västerut — Drottningholm, Birka, Mariefred och Västerås med etappinfo och djupdata.',
    href: '/segelrutter',
  },
  {
    icon: '☕',
    title: 'Kafébryggor & restauranger',
    description: 'Mälaren är känt för sina charmiga bryggkaféer. Hitta de bästa fikastoppen längs kusten med Svallas karta.',
    href: '/krogar-och-mat',
  },
  {
    icon: '🏛️',
    title: 'Historiska platser',
    description: 'Birka, Gripsholms slott, Strängnäs domkyrka — Mälaren är omgiven av svensk historia. Logga besöken i Svalla.',
    href: '/platser',
  },
  {
    icon: '🌅',
    title: 'Solnedgångsankring',
    description: 'Mälarens lugna vatten och långa sommarkvällar gör det till en av Sveriges bästa sjöar för ankring och övernattning.',
    href: '/platser?kategori=naturhamn',
  },
  {
    icon: '📍',
    title: 'Logga dina turer',
    description: 'Spåra din tur med GPS, dokumentera vindförhållanden och dela med Svallas community av Mälarsseglare.',
    href: '/logga-in',
  },
]

export default function MalarenPage() {
  return (
    <CategoryLanding
      heroGradient={['#1a6b5a', '#22a085']}
      eyebrow="Mälaren"
      title="Insjöns lugn — 1 140 öar"
      tagline="Sveriges tredje största sjö med tusen år av historia. Svalla hjälper dig utforska Mälarens kafébryggor, historiska hamnar och dolda ankringsplatser."
      heroIcon={
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      }
      intro={
        <>
          <p>
            Mälaren sträcker sig 12 mil västerut från Stockholm och är Sveriges tredje största sjö — fylld med <strong>1 140 öar, vikar och sund</strong> att utforska. Eftersom insjövattnet är lugnt, utan havsdyning eller tidvatten, är Mälaren en av landets bästa segelvatten för familjesegling, kajak och behagliga dagsturer året runt.
          </p>
          <p>
            Med Svalla loggar du turer från Riddarfjärden ut till Västerås, hittar hundratals kafébryggor på kartan och kan följa andra seglares favoritrutter längs de historiska Mälarstränderna. Markera ankringsplatser, dokumentera vindförhållanden och dela dina upptäckter med communityn.
          </p>
          <p>
            Mälaren är omgiven av svensk historia — från Birka och Drottningholm i öst till Gripsholms slott och Strängnäs domkyrka i väst. Varje besök blir minnen du sparar i Svalla och kan dela med vänner och familj.
          </p>
          <p>
            Oavsett om du är nybörjare eller erfaren seglare, Mälaren bjuder på något för alla: stilla vatten, vackra öarna, mysiga bryggor och oslagbar närhet till historien.
          </p>
        </>
      }
      itemsTitle="Mälaren med Svalla"
      itemsDescription="Kafébryggor, historiska hamnar och stilla ankringsplatser."
      items={ITEMS}
      deeperContent={
        <>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
            Östra Mälaren — från Stockholm mot Ekerö
          </h2>
          <p>
            Många seglares favoriter börjar här — från Riddarfjärden ut genom Drottningholm och runt Mälaröarna. <strong>Drottningholms slott</strong> är ett Unescos världsarv och ett måste att besöka; slottet ligger vackert mellan vattnet och slottsparken, med en kanalbåtsförbindelse för de som vill utforska vidare. De närliggande öarna — <strong>Ekerö, Munsö och Adelsö</strong> — erbjuder gästbryggor, litet varierande terräng och vackra utsikter.
          </p>
          <p>
            <strong>Björkö</strong> är ett högsta prioritet för alla historieinresserade. Här ligger <strong>Birka</strong>, Sveriges vikingastad och ett världsarv som är över 1000 år gammal. Det är bara en kort segling från Stockholm — perfekt dagstur för den som vill kombinera segling och historia.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Mellersta Mälaren — lugn och historia
          </h3>
          <p>
            Västerut från Stockholm börjar landskapet att förändras. <strong>Strängnäs</strong> är ett klassiskt stopp — det har en vacker domkyrka, välutrustad gästhamn och ett mysigt samhälle att utforska. Det är ungefär 3-4 timmar segling från Stockholm, vilket gör det perfekt för en första längre etapp.
          </p>
          <p>
            <strong>Mariefred</strong> är Mälarens pärla. Här finns <strong>Gripsholms slott</strong>, där du kan ankra upp helt nära slottsmurarna. Många seglare stannar här över helgen för att utforska både slottet och det charmiga samhället. På sommaren går den historiska ångbåten <strong>SS Mariefred</strong> mellan Stockholm och Mariefred — ett klassiskt sätt att komma tillbaka till Stockholm efter en längre tur. Kafébryggor längs stränderna ger möjlighet till fika och ett byte av sceneri.
          </p>
          <p>
            <strong>Stallarholmen</strong> är ett mindre men populärt stopp med kafébryggor och ett lugnt insjöbryggeri. Det ligger strategiskt mellan Strängnäs och Mariefred.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Västra Mälaren — mot Västerås och Köping
          </h3>
          <p>
            Längre västerut öppnas sjön upp och ordet &quot;segling&quot; börjar att betyda än mer. <strong>Västerås</strong> är en større stad med en välutrustad gästhamn, restauranger och sevärdheter som <strong>Aros bryggeri</strong> — perfekt för seglare som vill ha ett större urbant stopp. Västerås har också flera museer och historia väl värd ett besök.
          </p>
          <p>
            Strax väster om Västerås ligger <strong>Ängsö naturreservat</strong> — ett skyddat område med urskog som är tillgängligt med båt. Det är en av Mälarens mest obörjade naturupplevelser. Ängsö är ett måste för den som vill komma bort från tåget helt.
          </p>
          <p>
            <strong>Köping</strong> ligger nästan vid slutet av Mälaren — omkring 12 mil från Stockholm — och många seglare glömmer denna västra del. Det är väl värt en längre tur; det erbjuder samma lugn som resten av Mälaren, men med färre andra båtar och en känsla av att ha nått någonstans särskilt.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Praktisk info — att segla Mälaren
          </h3>
          <p>
            Mälaren är generöst med sitt lugna vatten — det finns <strong>inga svallvågor eller tidvatten</strong> att oroa sig för, vilket gör sjön perfekt för nybörjare. Djupet är generellt <strong>10–20 meter</strong>, men det finns grundare partier — håll dig till märkta farleder för att undvika grund.
          </p>
          <p>
            För de som kommer från Östersjösidan behöver du passera <strong>Karl Johans sluss</strong> i Stockholm — det är den enda större brobegränsningen att tänka på. Slussen har regelbundna öppettider, så planera i förväg. <strong>Söderström</strong> och <strong>Centralbron</strong> i Stockholm har också begränsad höjd — ungefär 12 meter fri höjd — så större segelfartyg bör kontrollera detta innan insegling.
          </p>
          <p>
            Seglingssesongen på Mälaren är <strong>maj till oktober</strong> — sommaren erbjuder lugna, varma dagar och långa kvällar för ankring. Vintern är möjlig för de som kan hantera kallare förhållanden, men huvudsäsongen är absolut sommaren.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Ofta ställda frågor
          </h3>
          <p>
            <strong>Behöver man passera sluss för att segla på Mälaren?</strong><br />
            Ja, om du kommer från österifrån (från Östersjösidan) måste du passera Karl Johans sluss i Stockholm. Slussen har regelbundna öppettider — planera din tur därefter och kontakta slussvakten i god tid innan.
          </p>
          <p>
            <strong>Vilka är de bästa kafébryggorpå Mälaren?</strong><br />
            Mariefred, Kärnbo, Björnö och bryggor längs Ekerö-öarna är kända för sin välkomstkultur och goda fika. Svalla-kartan visar alla verifierade kafébryggor med öppettider, så du kan planera dina stopp i förväg.
          </p>
          <p>
            <strong>Är Mälaren bra för nybörjarseglare?</strong><br />
            Perfekt! Det finns inget tidvatten, inga svallvågor och väl märkta farleder överallt. Vinden kan ibland vara oregelbunden vid stora öar, men generellt är Mälaren mycket begynnarfrendlig — många familjer och nybörjare börjar här.
          </p>
          <p>
            <strong>Hur långt är Mälaren?</strong><br />
            Ungefär 12 mil (120 kilometer) från Stockholms inlopp till Köping i väst. En full genomsegling från öst till väst tar 3–5 dagar i lugnt tempo, beroende på vind och hur många stopp du gör.
          </p>
        </>
      }
      cta={{ label: 'Skapa gratis konto', href: '/logga-in' }}
      related={[
        { label: 'Stockholms skärgård', href: '/stockholms-skargard' },
        { label: 'Krogar & mat', href: '/krogar-och-mat' },
        { label: 'Hamnar & bryggor', href: '/hamnar-och-bryggor' },
        { label: 'Alla destinationer', href: '/resmal' },
      ]}
    />
  )
}
