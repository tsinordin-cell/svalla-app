import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
  title: 'Börja segla — Nybörjarguide | Svalla',
  description: 'Allt du behöver veta för att börja segla. Kurser, båtval, revir, säkerhet och checklista för nybörjare segling i Sverige.',
  keywords: [
    'nybörjare segling',
    'börja segla',
    'segelkurs Sverige',
    'segla för första gången',
    'segelbevis',
    'RYA kurs',
    'KSSS kurs',
    'köpa segelbåt nybörjare',
    'charterbåt segling',
    'segling utan erfarenhet',
  ],
  openGraph: {
    title: 'Börja segla — Nybörjarguide | Svalla',
    description: 'Allt du behöver veta för att börja segla. Kurser, båtval, revir, säkerhet och checklista.',
    url: 'https://svalla.se/nyborjare-segling',
    type: 'website',
  },
  alternates: {
    canonical: 'https://svalla.se/nyborjare-segling',
  },
}

const ITEMS: LandingItem[] = [
  {
    title: 'Segelkurs',
    description: 'Hitta rätt kurs för din nivå. Seglarförbundets körkort, RYA Day Skipper och lokala seglarsällskap.',
    href: '/nyborjare-segling?avsnitt=kurser',
    icon: '🎓',
    meta: 'Nivå 1–3, 3000–8000 kr',
  },
  {
    title: 'Välj din första båt',
    description: 'Folkbåt eller plastklassiker? Vad passar nybörjare och var kan du hyra eller köpa.',
    href: '/nyborjare-segling?avsnitt=bat',
    icon: '⛵',
    meta: 'Albin 25, H-båt, Folkbåt',
  },
  {
    title: 'Börja i rätt vatten',
    description: 'Lugna revir för nybörjare: Mälaren, inre Stockholms skärgård och Bohuslän.',
    href: '/nyborjare-segling?avsnitt=revir',
    icon: '🗺️',
    meta: 'Saltsjön, Mälaren, fjärdar',
  },
  {
    title: 'Checklista för första seglingen',
    description: 'Vad du behöver ha ombord, säkerhetsutrustning och förberedelser före första turen.',
    href: '/nyborjare-segling?avsnitt=checklista',
    icon: '📋',
    meta: 'Flytväst, VHF, karta, bös',
  },
  {
    title: 'Förstå vind och väder',
    description: 'SMHI sjöprognos, Beaufort-skalan och hur du läser vädret som nybörjare.',
    href: '/nyborjare-segling?avsnitt=vader',
    icon: '🌬️',
    meta: 'Beaufort 0–4 för nybörjare',
  },
  {
    title: 'Logga din första tur',
    description: 'Använd Svalla för att spara din tur, se statistik och dela med andra seglare.',
    href: '/nyborjare-segling?avsnitt=logg',
    icon: '📱',
    meta: 'GPS-logg, delning, stats',
  },
]

export default function NyborjareSeglingPage() {
  return (
    <CategoryLanding
      heroGradient={['#1a5c3a', '#2d7a52']}
      eyebrow="Nybörjarsegling"
      title="Börja segla — allt du behöver veta"
      tagline="En komplett guide för nybörjare: kurser, båtval, säkerhet och dina första revir. Från noll till säker seglare på några veckor."
      heroIcon={
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M2 20h20" />
          <path d="M12 2v18" />
          <path d="M12 2 3 18" />
        </svg>
      }
      intro={
        <>
          <p>
            Att börja segla är en äventyrlig och lärorik process som öppnar upp en helt ny värld. Oavsett om du drömmer om fredliga morgnar i skärgården eller spännande seglingar på öppet hav, finns det en väg för dig. Sverige har perfekta förutsättningar för nybörjare — från lugna inlandsvatten till välkarterade kustrevir.
          </p>
          <p>
            Denna guide tar dig från noll till säker seglare. Du får veta vilken kurs som passar dig, hur du väljer din första båt, vilka revir som är perfekta för att börja, och vad du behöver tänka på för att segla säkert och ansvarsfullt.
          </p>
          <p>
            Det finns inget krav på körkort för att segla i Sverige, men en välplanerad kurs är mycket väl värd pengarna — både för säkerhet och för att du kommer att ha mycket mer roligt. Låt oss börja!
          </p>
        </>
      }
      itemsTitle="Kom igång steg för steg"
      items={ITEMS}
      deeperContent={
        <>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
            Vilken kurs ska man ta?
          </h2>
          <p>
            I Sverige är den vanligaste vägen att börja genom <strong>Seglarförbundets körkort</strong>, som delas in i tre nivåer:
          </p>
          <ul style={{ margin: '12px 0', paddingLeft: 20 }}>
            <li><strong>Nivå 1 (Grunder):</strong> Grundläggande segelkunskap, fyrlingen, säkerhet. Ca 2–3 dagar. Kostnad cirka 2000–3500 kr.</li>
            <li><strong>Nivå 2 (Navigering):</strong> Kartläsning, kompass, väder, längre seglingar. Ca 4–5 dagar. Kostnad cirka 3000–5000 kr.</li>
            <li><strong>Nivå 3 (Expert):</strong> Avancerad navigering, nödsituationer, offshore-grunderna. Ca 5–7 dagar. Kostnad cirka 4000–8000 kr.</li>
          </ul>
          <p>
            <strong>RYA Day Skipper</strong> är en internationell standard som erkänns världen över och krävs ofta av charterbolag. Den motsvarar ungefär Nivå 2–3 och kostar 4000–7000 kr.
          </p>
          <p>
            <strong>Lokala seglarsällskap</strong> erbjuder ofta mer överkomliga kurser (ibland 1000–2000 kr) och är fantastiska för att träffa andra nybörjare och få mentorskap. KSSS (Kungliga Svenska Seglarförbundet) har sällskap över hela Sverige.
          </p>
          <p>
            <em>Tips:</em> Börja med Nivå 1 eller ett sällskapskurs för att se om segling är för dig, innan du investerar i högre nivåer.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
            Vilken båt passar en nybörjare?
          </h2>
          <p>
            Rätt båt gör all skillnad. Du behöver något stabilt, enkelt att hantera och säkert.
          </p>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Klassiska nybörjarbåtar
          </h3>
          <ul style={{ margin: '12px 0', paddingLeft: 20 }}>
            <li><strong>Folkbåten (27 fot):</strong> Kraftig, stabil och väldigt lätt att seglra. Byggd för svenska skärgården. Mycke att välja på på andrahandsmarknaden.</li>
            <li><strong>H-båten (22 fot):</strong> Mindre än folkbåten, men samma stabilitet och elegans. Perfekt för två–fyra personer.</li>
            <li><strong>Albin 25:</strong> En klassisk plastbåt från 1960-talet. Säker, lätt att seglra och finns överallt i Sverige.</li>
            <li><strong>Macwester Silverado:</strong> Praktisk familjebåt med gott fribord och låga underhållskostnader.</li>
          </ul>
          <p>
            <em>Undvik:</em> Mycket små båtar (under 6 meter) — de kan vara knepiga i vind. Mycket stora båtar (över 30 meter) — de är dyra och tar tid att bemästra.
          </p>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Charterbåt som övningsväg
          </h3>
          <p>
            Du behöver inte köpa direkt. Många charterbolag runt Sverige erbjuder båtar för veckosigling från cirka 8000–15000 kr/vecka (låg säsong) till 20000–40000 kr/vecka (högsäsong). Det är perfekt för att prova innan du köper. Kraven är vanligen ett bevis (t.ex. RYA Day Skipper) eller att du bokar med en erfaren skeppare.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
            Säkerhet för nybörjare
          </h2>
          <p>
            Säkerhet är aldrig förhandlingsbar på vattnet. Här är det viktigaste:
          </p>
          <ul style={{ margin: '12px 0', paddingLeft: 20 }}>
            <li><strong>Flytväst:</strong> Aldrig, aldrig utan! För barn är det lagligt krav. För vuxna är det sunt förnuft.</li>
            <li><strong>Föranmäl avreseplan:</strong> Berätta för någon var du seglar och när du förväntas tillbaka. Uppdatera vid ändringar.</li>
            <li><strong>VHF-radio:</strong> En håldbar VHF-radio är helt väsentlig för kommunikation och nödsituationer. Lär dig kanaler (16 är nödskanal).</li>
            <li><strong>EPIRB eller personlig nödbåk:</strong> En möjlig livräddare om något går väldigt fel.</li>
            <li><strong>Första hjälpen-kit:</strong> En väl utrustad förbandsväska ombord.</li>
            <li><strong>Sjövägen regler:</strong> Lär dig inte bara segling — lär dig också mötes- och förbifartsreglerna (inte lika enkelt som det låter).</li>
          </ul>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
            Seglarbevis och certifikat
          </h2>
          <p>
            I Sverige finns <strong>inget lagkrav på körkort</strong> för att seglra privat på kusten. Du kan läggit ut i båt när som helst, givet att det är din egen båt eller du har tillåtelse.
          </p>
          <p>
            Men flera importantes anledningar till att ta ett bevis:
          </p>
          <ul style={{ margin: '12px 0', paddingLeft: 20 }}>
            <li><strong>Charterbolag kräver det:</strong> De flesta kräver minst ett bevis (RYA Day Skipper eller motsvarande) för att hyra en båt utan erfaren skeppare ombord.</li>
            <li><strong>Internationell giltighet:</strong> RYA och KSSS-bevis erkänns världen över.</li>
            <li><strong>Säkerhet och kunskap:</strong> En kurs ger dig kunskap du aldrig skulle ha lärt dig själv — från nödsituationer till navigering.</li>
            <li><strong>Försäkring:</strong> Vissa försäkringar kräver ett godkänt segelbevis för fullt skydd.</li>
          </ul>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
            Bästa reviren för nybörjare
          </h2>
          <p>
            Sverige har fantastiska vatten för nybörjare. Här är de bästa områdena:
          </p>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Mälaren
          </h3>
          <p>
            Ett av Europas finaste inlandsvatten. Stort, skyddat och med många hamnar och boende-alternativ. Perfekt för längre turer utan alltför stor våg.
          </p>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Inre Stockholms skärgård
          </h3>
          <p>
            Tusental öar och skär gör detta område till ett äventyrares paradie. Saltsjön (nedre delen) är skyddad och perfekt för nybörjare; öppna delen är mer utmanande.
          </p>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Lugna delar av Bohuslän
          </h3>
          <p>
            Från Göteborg och norrut. Grotön området och Lysekil-området är klassiska målpunkter med många hamnar och gott mat/dryck.
          </p>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Vänern
          </h3>
          <p>
            Europas största insjö. Lugnt vatten och perfekt för närsegling. Mindre trafikering än Mälaren.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
            Vanliga frågor
          </h2>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Behöver man körkort för att segla?
          </h3>
          <p>
            Nej, inte enligt lag i Sverige för privatsegling på kusten. Men många charterbolag kräver ett bevis (RYA Day Skipper eller motsvarande). Och ett bevis ger dig kunskap som kan rädda livet.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Hur lång tid tar en segelkurs?
          </h3>
          <p>
            En basnivå (Nivå 1) tar 2–3 dagar och täcker grunder. En komplett RYA Day Skipper tar 5–7 dagar. Du kan ofta även ta en kurs på helger (flera veckänder på 2–3 helger vardera).
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Kan man segla på vintern i Sverige?
          </h3>
          <p>
            Ja, många seglare seglar året runt. Mälaren kan frysa helt på sommaren (ofta januari–mars), men kusten fryser sällan helt. Vintersegling kräver extra försiktighet, bättre väderkunskap och rätt utrustning (värmare overaller, bättre grepp om rodret). Börja inte med vintersegling som nybörjare!
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Vad kostar det att köpa sin första segelbåt?
          </h3>
          <p>
            En använd klassiker som H-båt eller Albin 25 kostar typiskt 30000–100000 kr. En bättre folkbåt kostar 80000–200000 kr. Bilare klassiker finns från 10000–20000 kr, men kolla läget noggrant (rostskador, läckage) innan köp. Budget även för försäkring (~500–1500 kr/år), underhåll (~2000–5000 kr/år) och hamnplats (~3000–8000 kr/år).
          </p>
        </>
      }
      cta={{ label: 'Skapa gratis konto', href: '/logga-in' }}
      related={[
        { label: 'Segelrutter', href: '/segelrutter' },
        { label: 'Stockholms skärgård', href: '/stockholms-skargard' },
        { label: 'Hamnar & bryggor', href: '/hamnar-och-bryggor' },
        { label: 'Alla destinationer', href: '/resmal' },
      ]}
    />
  )
}
