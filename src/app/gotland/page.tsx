import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
 title: 'Gotland — Segla dit, logga turen',
 description: 'Segla till Gotland med Svalla. Visby gästhamn, fårö guide, naturhamnar och segelrutter runt Östersjön. Planera och logga din tur.',
 keywords: [
 'segla gotland',
 'gotland båt',
 'visby hamn',
 'gotland segling',
 'naturhamn gotland',
 'restaurang visby',
 'fårö gotland',
 'gotland sommar',
 'östersjön segling',
 'gotland krog',
 'lummelunda',
 'hoburgen',
 'visby gästhamn',
 'segla gotland guide',
 'östersjön segling',
 'fårö guide',
 'gotland segelrutt',
 ],
 openGraph: {
 title: 'Gotland — Segla dit, logga turen | Svalla',
 description: 'Planera din seglingstur till Gotland och logga varje etapp med Svalla.',
 url: 'https://svalla.se/gotland',
 },
 alternates: { canonical: 'https://svalla.se/gotland' },
}

const ITEMS: LandingItem[] = [
 {
 icon: '',
 title: 'Segla till Gotland',
 description: 'En av Östersjöns klassiska segelresor. Logga hela passagen med GPS — varje timme, varje vindskift, varje soluppgång.',
 href: '/logga-in',
 meta: 'Klassiker',
 },
 {
 icon: '',
 title: 'Visby innerstad',
 description: 'Världsarv med medeltida ringmur, krogar och uteliv. Gästhamnen ligger direkt nedanför staden.',
 href: '/upptack',
 },
 {
 icon: 'utensils',
 title: 'Krogar & restauranger',
 description: 'Gotland har blommat ut matmässigt — från saffranspannkaka på krogen till mat gjord på gotländska råvaror.',
 href: '/krogar-och-mat',
 },
 {
 icon: '🏕️',
 title: 'Naturhamnar runt ön',
 description: 'Fårösund, Slite, Herrvik, Klintehamn — naturliga ankringsplatser runt hela Gotland med detaljinfo.',
 href: '/platser?kategori=naturhamn',
 },
 {
 icon: '',
 title: 'Fårö',
 description: 'Ingmar Bergmans ö. Avsides natur, raukar och lugna vatten. Nå hit från Fårösund.',
 href: '/upptack',
 },
 {
 icon: '📱',
 title: 'Logga hela säsongen',
 description: 'Resan dit, veckorna på ön, resan hem. Se din totala Gotlandssäsong i ett flöde.',
 href: '/logga-in',
 },
]

export default function GotlandPage() {
 const faqJsonLd = {
 '@context': 'https://schema.org',
 '@type': 'FAQPage',
 mainEntity: [
 {
 '@type': 'Question',
 name: 'Hur lång tid tar seglingen till Gotland?',
 acceptedAnswer: { '@type': 'Answer', text: 'Från Sandhamn tar det normalt 24–36 timmar beroende på vind och väg. Från Nynäshamn räknar du med 20–28 timmar. Du bör planera för minst en övernattning till sjöss. Många båtar gör passagen under två dagar med skift.' },
 },
 {
 '@type': 'Question',
 name: 'Måste man boka gästhamn i Visby i förväg?',
 acceptedAnswer: { '@type': 'Answer', text: 'I juli är det starkt rekommenderat. Visby gästhamn kan vara fullbelagd under högsäsong och framför allt under Almedalen. Ha Herrvik eller Klintehamn som backup. Ring gästhamnen på VHF dagen innan för att höra om det finns plats.' },
 },
 {
 '@type': 'Question',
 name: 'Vad är bästa sättet att nå Fårö?',
 acceptedAnswer: { '@type': 'Answer', text: 'Segla till Fårösund och ta den kostnadsfria bilfärjan över sundet. Färjan går ofta men kan ha köer i högsäsong. Själva seglingen till Fårösund är relativt kort och en mysig dag-och-övernattning för många.' },
 },
 {
 '@type': 'Question',
 name: 'Är det möjligt att segla runt hela Gotland?',
 // UPPSKATTNING: konvex minimibana Visby–Fårö–Östergarn–Hoburgen–Visby är 161 nm (storcirkelberäknad 2026-08-16); realistisk rutt med marginal ~180 (2026-08)
 acceptedAnswer: { '@type': 'Answer', text: 'Ja, det är en klassisk tur på cirka 180 sjömil. Planera 7–10 dagar för en avslappnad tur med stopp på intressanta hamnar. Nordkusten kan vara utsatt vid nordanvind, så välj väder och timing noggrant.' },
 },
 ],
 }
 const breadcrumbJsonLd = {
 '@context': 'https://schema.org',
 '@type': 'BreadcrumbList',
 itemListElement: [
 { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://svalla.se' },
 { '@type': 'ListItem', position: 2, name: 'Gotland', item: 'https://svalla.se/gotland' },
 ],
 }
 return (
 <>
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
 <CategoryLanding
 heroGradient={['#8b5e3c', '#b07d52']}
 eyebrow="Gotland"
 title="Östersjöns pärla"
 tagline="Drömresan för svenska seglare — Svalla hjälper dig planera, logga och minnas varje tur till och runt Gotland."
 heroIcon={
 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
 <polygon points="3 11 22 2 13 21 11 13 3 11" />
 </svg>
 }
 intro={
 <>
 <p>
 Gotland är seglardrömmen. <strong>En passage tvärs över Östersjön</strong>, ankomsten till Visby ringmur vid gryning, veckor av sol och gotländsk mat — och sedan resan hem. Det är upplevelser värda att spara.
 </p>
 <p>
 Från Stockholms skärgård tar passagen typiskt 24–36 timmar beroende på vind och väg. Det är en klassisk segelresa — långt nog för att kännas äventyrlig, kort nog för att planeras på en veckoslut. Många seglare gör denna resa flera gånger under livet och upptäcker nya hamnar, nya krogar och nya vägar runt ön för varje tur.
 </p>
 <p>
 Visby är målet för många — den medeltida ringmuren, gästhamnen direkt under stadsmuren, och de legendariska krogarna längs Strandgatan. Men Gotland är mycket mer än huvudstaden. Fårö i norr, naturhamnar som Herrvik och Klintehamn, och den vilda sydspetsen vid Hoburgen erbjuder allt från lugna ankarrättigheter till dramatiska bergväggningar och fyr.
 </p>
 <p>
 Svalla låter dig logga hela resan med GPS, hitta de bästa platserna runt ön på kartan och dela turen med andra som gjort samma passage. Se exakt vilken väg du seglades, var du ankrade och vilka hamnar som blev dina favoriter — år efter år.
 </p>
 </>
 }
 itemsTitle="Gotland med Svalla"
 itemsDescription="Planera, logga och utforska Gotland."
 items={ITEMS}
 deeperContent={
 <>
 {/* Äventyrsbanner */}
 <a href="/gotland/aventyr" style={{ textDecoration: 'none', display: 'block', marginBottom: 32 }}>
   <div style={{
     background: 'linear-gradient(135deg, #1a3a5c 0%, #0d6e6e 100%)',
     borderRadius: 20,
     padding: '22px 24px',
     display: 'flex',
     alignItems: 'center',
     gap: 18,
     position: 'relative',
     overflow: 'hidden',
     boxShadow: '0 6px 28px rgba(13,110,110,0.25)',
     border: '1px solid rgba(255,255,255,0.08)',
   }}>
     <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
     <div style={{
       width: 48, height: 48, flexShrink: 0, borderRadius: 14,
       background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.2)',
       display: 'flex', alignItems: 'center', justifyContent: 'center',
     }}>
       <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
         <circle cx="12" cy="12" r="10" /><polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88 16.24,7.76" />
       </svg>
     </div>
     <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
       <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>Utforska mer</div>
       <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 3, fontFamily: "'Playfair Display', Georgia, serif" }}>Äventyr på Gotland</div>
       <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.72)' }}>10 utvalda rundor – bil, cykel och kollektivt</div>
     </div>
     <div style={{ width: 34, height: 34, flexShrink: 0, borderRadius: 10, background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
       <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
     </div>
   </div>
 </a>

 <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
 Ta dig till Gotland — utan eller med egen båt
 </h2>
 <p>
 Gotland nås på tre sätt: med <strong>Destination Gotland</strong> (färja), med <strong>flyg</strong>, eller med <strong>segelbåt</strong>. Väljer du din egen båt hänvisar vi till passageguiden längre ner — men för dig som åker utan stäv är det här du börjar.
 </p>

 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Destination Gotland — färjan
 </h3>
 <p>
 <strong>Destination Gotland</strong> kör färja året runt. Nynäshamn–Visby tar ca 3h15min. Oskarshamnslinjen trafikeras också hela året — med lägre frekvens vintertid. Boka tidigt — sommartid är populära avgångar slutsålda veckor i förväg.
 </p>
 <p>
 Ta pendeltåg (linje 43) till <strong>Nynäshamn</strong> från Stockholm City, ca 1 h. Därifrån är det gång till färjeterminalen. Biljetter bokas på <a href="https://www.destinationgotland.se" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--teal, #1e5c82)' }}>destinationgotland.se</a>.
 </p>

 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Flyg till Visby
 </h3>
 <p>
 Flera flygbolag flyger Stockholm Arlanda–Visby flygplats, med ca 45 min flygtid. Visby flygplats ligger 3 km norr om Visby centrum — taxi eller lokal buss tar dig in. Flyg kan vara ett alternativ under lågsäsong eller om du vill spara tid, men är generellt dyrare och ger en annan upplevelse än färjan. Jämför priser på <a href="https://www.google.com/flights" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--teal, #1e5c82)' }}>Google Flights</a>.
 </p>

 <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
 Passagen till Gotland — med egen båt
 </h2>
 <p>
 Från Sandhamn eller Landsort tar passagen typiskt <strong>24–36 timmar</strong> och är cirka <strong>120 sjömil</strong>. Från Öland är vägen kortare. Vädern i Östersjön kan vara opålitligt — ofta svag och variabel vind, ibland helt lugnt. Planera med MeteoGroup eller SMHI någon dag innan du går ut. Många erfarna seglare bygger in en marginal på passagen och räknar med att det kan dra längre än optimistiska beräkningar antyder.
 </p>
 <p>
 <strong>GPS-loggning i Svalla är ovärderlig.</strong> Du ser exakt vilken väg du seglades, varje vindskift och kursbyte, och du kan titta tillbaka på turen för alltid. Det hjälper också nästa gång du planerar samma passage — du vet exakt hur många timmar det tog för din båt under liknande förhållanden.
 </p>

 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Visby — medeltidens pärla
 </h3>
 <p>
 Visby är Gotlands hjärta och en av Nordens viktigaste medeltida städer. <strong>Hansestaden Visby</strong> är UNESCO-världsarv sedan 1995, och <strong>ringmuren</strong> från ~1250 är dess mest ikoniska element — den går runt gamla stan och är nästan helt bevarad. Gästhamnen ligger direkt innanför muren — en spektakulär ankomst när du seglar in från Östersjön och ser de gotiska spirorna stiga upp över hamnen.
 </p>
 <p>
 Restaurang- och krogscenen i Visby har blommat ut under de senaste åren. <strong>Strandgatan är krogstråket</strong> — här finns allt från klassiska gotländska krogar till moderna restauranger. I juli är hamnen oftast fullbelagd under Almedalen (högsummarfestivalen), så boka gästhamn i god tid — eller ring via VHF innan du ankommer för att höra om plats finns.
 </p>
 <p>
 <strong>Wisby Strand</strong> är en ny badstrand nära hamnen, perfekt för att ta ett dopp efter seglingstid. Om Visby gästhamn är fullsatt kan du ankra i närliggande naturhamnar eller försöka nå Herrvik eller Klintehamn med backup.
 </p>

 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Runt Gotland — hamnar och naturhamnar
 </h3>
 <p>
 <strong>Fårösund och Fårö</strong> ligger i norr. Fårösund är själva satsningsplatsen för Fårö — det är här den kostnadsfria bilfärjan går över sundet. Fårö själv är Ingmar Bergmans ö, känd för avsides natur, dramatiska <strong>raukar vid Langhammar</strong> och det berömda Bergmanccentrum. Lugn och avskild — långt från turismen.
 </p>
 <p>
 <strong>Herrvik</strong> på sydöstra kusten är en lugn naturhamn, perfekt om du behöver pausa innan eller efter Visby. Relativt skydd och få turister. <strong>Klintehamn</strong> på västra kusten är också en väletablerad gästhamn med goda faciliteter.
 </p>
 <p>
 <strong>Hoburgen</strong> är Gotlands sydspets — dramatisk, utsatt och spektakulär. En historisk fyr står på klippan, och raukarna stiger upp från havet. Seglande här kräver respekt för vädern; nordanvind kan göra området opåväg. <strong>Slite</strong> på nordöstra kusten är en större hamn med industriella inslag men ofta bra väder och bra skydd. <strong>Nordkusten är generellt mycket exponerad</strong> — välj väder noga innan du seglar här.
 </p>

 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Mat och dryck på Gotland
 </h3>
 <p>
 Gotland är känt för sin matkultur. <strong>Saffranspannkaka</strong> är en lokal specialitet — en tunn, safransfärgad pannkaka som serveras på nästan varje krog. <strong>Gotlands lamm</strong> är anrättad på många restauranger och är ett måste för köttälskare. Gotland är också <strong>Sveriges vinregion</strong> — lokala viner från lokala drickors planteras och föds på ön. <strong>Roma bryggeri</strong> brygger lokalt öl med gotländsk karaktär.
 </p>
 <p>
 <strong>Strandgatan i Visby är krogstråket</strong> — här äter du middag vid havet med utsikt över ringmuren. Men du behöver inte stanna i huvudstaden. <strong>Ljugarn</strong>, <strong>Klintehamn</strong> och <strong>Fårö</strong> har alla egna krogar och matupplevelser. Många båtlag stannar flera nätter på en hamn bara för att smaka sig genom det lokala köket.
 </p>

 <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
 Vanliga frågor om segling till Gotland
 </h2>
 <p>
 <strong>Hur lång tid tar seglingen till Gotland?</strong><br />
 Från Sandhamn tar det normalt 24–36 timmar beroende på vind och väg. Från Nynäshamn räknar du med 20–28 timmar. Du bör planera för minst en övernattning till sjöss. Många båtar gör passagen under två dagar med skift.
 </p>
 <p>
 <strong>Måste man boka gästhamn i Visby i förväg?</strong><br />
 I juli är det <strong>starkt rekommenderat</strong>. Visby gästhamn kan vara fullbelagd under högsäsong och framför allt under Almedalen. Ha Herrvik eller Klintehamn som backup. Ring gästhamnen på VHF dagen innan eller dagen samma för att höra om det finns plats.
 </p>
 <p>
 <strong>Vad är bästa sättet att nå Fårö?</strong><br />
 Segla till Fårösund och ta den kostnadsfria bilfärjan över sundet. Färjan går ofta men kan ha köer i högsäsong, så ha tålamod. Själva seglingen till Fårösund är relativt kort och en mysig dagen-och-övernattning för många.
 </p>
 <p>
 <strong>Är det möjligt att segla runt hela Gotland?</strong><br />
 {/* UPPSKATTNING: konvex minimibana 161 nm storcirkelberäknad, realistisk rutt ~180 (2026-08) */}
 Ja, det är en klassisk tur på cirka 180 sjömil. Planera 7–10 dagar för en avslappnad tur med stopp på intressanta hamnar. Nordkusten kan vara utsatt vid nordanvind, så välj väder och timing noggrant. Många seglare gör denna rundtur under sommaren och det är en fantastisk upplevelse.
 </p>
 </>
 }
 cta={{ label: 'Skapa gratis konto', href: '/logga-in' }}
 related={[
 { label: 'Segelrutter', href: '/segelrutter' },
 { label: 'Hamnar & bryggor', href: '/hamnar-och-bryggor' },
 { label: 'Aktiviteter', href: '/aktiviteter' },
 { label: 'Stockholms skärgård', href: '/stockholms-skargard' },
 ]}
 />
 </>
 )
}
