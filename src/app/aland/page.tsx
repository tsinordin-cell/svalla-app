import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
 title: 'Åland — Segla dit från Sverige, logga turen | Svalla',
 description: 'Seglingsguide till Åland: Mariehamn gästhamn, skärgårdshavets 6500 öar, Kökar & Föglö. Logga din rutt med GPS.',
 keywords: [
 'segla åland',
 'åland båt',
 'mariehamn hamn',
 'mariehamn gästhamn',
 'ålands skärgård',
 'segla åland från stockholm',
 'åland gästhamn',
 'skärgårdshavet segling',
 'skärgårdshavet guide',
 'åland restaurang',
 'eckerö åland',
 'föglö åland',
 'föglö segling',
 'kökar segling',
 'åland segelrutt guide',
 'åland sommar',
 ],
 openGraph: {
 title: 'Åland — Segla dit från Sverige | Svalla',
 description: 'Logga din seglingstur till Åland och utforska skärgårdshavets 6 500 öar med Svalla.',
 url: 'https://svalla.se/aland',
 },
 alternates: { canonical: 'https://svalla.se/aland' },
}

const ITEMS: LandingItem[] = [
 {
 icon: '',
 title: 'Segla från Sverige till Åland',
 description: 'En av Östersjöns klassiska segelpassager. Logga hela turen med GPS — från Stockholms skärgård till Ålands hav.',
 href: '/logga-in',
 meta: 'Klassiker',
 },
 {
 icon: '',
 title: 'Mariehamn',
 description: 'Ålands huvudstad och naturliga mötesplats för seglare. Välutrustad gästhamn, restauranger och tullfri handel.',
 href: '/upptack',
 },
 {
 icon: '🏕️',
 title: 'Skärgårdshavets naturhamnar',
 description: '6 500 öar i skärgårdshavet erbjuder oändliga ankringsplatser — många helt orörda och tillgängliga med allemansrätten.',
 href: '/platser?kategori=naturhamn',
 },
 {
 icon: '️',
 title: 'Åländska krogar',
 description: 'Från Mariehamns restauranger till gamla handelshus ute i skärgården — unikt utbud med finsk-svensk karaktär.',
 href: '/krogar-och-mat',
 },
 {
 icon: '️',
 title: 'Skärgårdshavets karta',
 description: 'Navigera bland öar, grunder och smala sund med Svallas interaktiva karta och inbyggda GPS-spårning.',
 href: '/upptack',
 },
 {
 icon: '📱',
 title: 'Logga hela resan',
 description: 'Avgång från Sverige, Åland-vistelsen och hemresan. Spara alla turer och se din totala statistik.',
 href: '/logga-in',
 },
]

export default function AlandPage() {
 const faqJsonLd = {
 '@context': 'https://schema.org',
 '@type': 'FAQPage',
 mainEntity: [
 {
 '@type': 'Question',
 name: 'Behöver man visum eller pass för att segla till Åland?',
 acceptedAnswer: { '@type': 'Answer', text: 'Nej, du behöver inte visum eller särskilt pass för att segla till Åland från Sverige. Du behöver dock ett giltigt ID-kort eller pass för identifikation. Det viktigaste är att anmäla din båts ankomst till tullmyndigheten vid inresa.' },
 },
 {
 '@type': 'Question',
 name: 'Hur djupt är Ålands hav?',
 acceptedAnswer: { '@type': 'Answer', text: 'Ålands hav varierar från omkring 30–50 meter på grunt vatten till över 200 meter på de djupaste ställena — betydligt djupare än många delar av Stockholms skärgård. Sundet mot Finland i öster är grundare och kräver noggrann navigation.' },
 },
 {
 '@type': 'Question',
 name: 'Kan man segla vidare till Finland från Åland?',
 acceptedAnswer: { '@type': 'Answer', text: 'Ja, absolut. Åbo (Turku) ligger ungefär 6 timmar segling öst om Mariehamn — en populär nästa etapp. Från Mariehamn kan du också välja söder omkring Kökar, väster till svenska vatten, eller öst genom skärgårdshavet mot Brändö.' },
 },
 {
 '@type': 'Question',
 name: 'Vad kostar gästhamn i Mariehamn?',
 acceptedAnswer: { '@type': 'Answer', text: 'Gästhamnarna i Mariehamn kostar normalt 150–250 kronor per natt beroende på båtens längd. De flesta hamnar inkluderar el och dusch i priset. Boka i förväg under juli–augusti för att säkra en bra plats.' },
 },
 ],
 }
 const breadcrumbJsonLd = {
 '@context': 'https://schema.org',
 '@type': 'BreadcrumbList',
 itemListElement: [
 { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://svalla.se' },
 { '@type': 'ListItem', position: 2, name: 'Åland', item: 'https://svalla.se/aland' },
 ],
 }
 return (
 <>
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
 <CategoryLanding
 heroGradient={['#1a4a7a', '#2563a8']}
 eyebrow="Åland"
 title="Skärgårdshavet kallar"
 tagline="Från Stockholms skärgård till Ålands 6 500 öar — logga passagen, utforska havet och hitta de bästa platserna med Svalla."
 heroIcon={
 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
 <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 21 4s-2 0-3.5 1.5L14 9 5.8 7.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 3.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
 </svg>
 }
 intro={
 <>
 <p>
 Åland och skärgårdshavet är Östersjöns bäst bevarade hemlighet. <strong>6 500 öar</strong>, kristallklart vatten och en unik blandning av svensk och finsk kultur — allt tillgängligt med en segletur från Stockholm. Passagen från Kapellskär eller Sandhamn tar 12–15 timmar genom öppet hav, men mötet med skärgårdshavets lugna vatten gör resan värd varje minut.
 </p>
 <p>
 Mariehamn är åländskt seglarliv själv: välutrustad gästhamn i Västra hamnen, klassiska restauranger längs Torggatan, och museer som Pommern och Ålands Sjöfartsmuseum. Men den riktiga skattskistan ligger i öarna själva — från Föglö och Kökar i söder till Brändö och Kumlinge i öst, där allemansrätten låter dig ankra fritt på tusentals öar.
 </p>
 <p>
 Svalla låter dig logga passagen dit, navigera bland skärgårdshavets oändliga öar med exakta positioner, och hitta de bästa gästhamnarna och restaurangerna längs vägen. Planera med sjökort från Finlands sjöfartsverks kartor, logga varje mil och spara en minne av Östersjöns klassiska segelrutt.
 </p>
 </>
 }
 itemsTitle="Åland med Svalla"
 itemsDescription="Planera och logga din resa till Åland."
 items={ITEMS}
 deeperContent={
 <>
 <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
 Passagen från Sverige till Åland
 </h2>
 <p>
 Från Kapellskär räknar du med 12–15 timmar på passagen — ungefär 70 sjömil över öppet hav. Från Sandhamn och Stockholms skärgård blir resan något längre, men många seglare startar därifrån för att samla erfarenhet före de större vattnena. Här börjar det klassiska — först genom Norrström och längs gränsen mellan Sverige och Finland, sedan ut i Ålands hav där vinden kan bli krånglig vid sydlig riktning och strömmen stark omkring Ålands södra spets.
 </p>
 <p>
 Det är här Svalla blir ovärderlig. Logga din exakta position från start till målhamn — GPS-spårningen visar varje minut av resan, och du kan senare granska vägen du tog, möta andra seglare som gjort samma passage och bygga upp en färdbok på alla dina Östersjöresor. Under passagen rekommenderas att ha uppdaterad sjökarta, men väl fram till Ålands hav möter du skärgårdshavets första öar.
 </p>
 <p>
 <strong>Föglö och Kökar</strong> är perfekta första stopp i skärgårdshavet — de ligger på vägen in och erbjuder lugna vatten efter det stundtals oroliga mötet med det öppna havet. Kökar är åländskt sommarparadis med sin historiska kyrka och sydligaste läge. Föglö är känd som cykelön och lockad med sin charmiga gästhamn. Härifrån kan du välja väg vidare: någon fortsätter direkt till Mariehamn och civilisationen, medan andra kryper längre in i skärgårdshavet mot Brändö, Kumlinge och Finnlands närmare vattnar.
 </p>

 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Öppet hav och växlande väder
 </h3>
 <p>
 Ålands hav kan på sina ställen överstiga 200 meter djupt — en helt annan miljö än Stockholms grunda skärgård. Det betyder att väder och sjö utvecklas snabbare här. En sydlig vind som du knappt märker vid Sandhamn kan bli rejäl på vägen över, och strömmen omkring Åland är stark nog att påverka både fart och kurs. Planera alltid med tid över, ha uppdaterade väderrapporter och logga din fart tillsammans med GPS-position så att du kan se efteråt om du höll räkningen.
 </p>

 <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
 Mariehamn — Ålands huvudstad
 </h2>
 <p>
 Mariehamn är åländskt seglarliv själv. Västra hamnen erbjuder en välutrustad gästhamn med el, vatten och dusch — en naturlig rastpunkt både för seglare på väg in och ut. Här ligger museet Pommern, ett imponerande fyrmastigt segelfartyg från 1921 som du kan besöka och gå ombord på. Ålands Sjöfartsmuseum berättar historien om handel, båtbygge och äventyr på Östersjön.
 </p>
 <p>
 Torggatan löper längs vattnet och är fylld av restauranger, kaféer och små butiker — många med ett unikt finsk-svensk utbud. En klassisk åländsk kväll innebär att ankra i hamnen, ta en promenad längs vattnet och välja mellan allt från fisksoppa till moderna menyer. I Västra hamnen finns också varvet där större båtservice och mindre reparationer kan göras om din båt behöver något under resan.
 </p>
 <p>
 Mariehamn är också naturlig utgångspunkt för vidare utforskning: härifrån är det bara några timmars segling till Åbo (Turku) i Finland, många öar att ankra på i närheten, och en helt annan världel väster om staden där Eckerö och gamla postvägen väcker äventyrskänslor.
 </p>

 <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
 Skärgårdshavet — 6 500 öar att utforska
 </h2>
 <p>
 Ålands skärgård är inte bara ett antal — det är ett helt universum av ankringsstäder, många helt orörda och tillgängliga genom allemansrätten. <strong>Kökar</strong> i söder är historiens puls: gamla kyrkan står på höjden, små handelshus återspeglar århundraden av handel, och vattnet omkring är klassiskt åländskt. <strong>Föglö</strong> är cykelöns hjärta, med cykelvägar som binder öns byar samman och en gästhamn där många seglare återkommer år efter år.
 </p>
 <p>
 Väster om Mariehamn ligger <strong>Eckerö</strong> med sin legendariska gamla postväg och fina sandstrand — en helt annan miljö än det östra skärgårdshavet. <strong>Kumlinge och Brändö</strong> i öster pushes segling ännu längre — här möter du Finlands sjöväg, smalare sund och en känsla av att vara verkligen långt borta från civilisationen. Många ankringsstäder ger obeskrivlig ensamhet, bara skärgårdshavets ljud och friheten att välja nästa morgonutsegling helt efter vind och lust.
 </p>
 <p>
 Allemansrätten gäller fullt ut — du kan ankra på praktiskt vilken obebodd ö som helst, och många öar bjuder på naturliga sandstränder, bäckar med dricksvatten och tystnad. Svallas interaktiva karta och djupdata hjälper dig planera vägen mellan öarna, undvika grunder och hitta de bästa naturhamnarna — många seglare använder appen för att logga alla sina ankringsstäder och senare minnas exakt vilka öar de älskade.
 </p>

 <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
 Praktisk info för Ålandsresan
 </h2>
 <p>
 <strong>Tull och regler:</strong> Åland är ett självstyrande landskap med eget juridiskt status, räknat som ett separat tullområde. När du seglar från Sverige måste du anmäla ankomst till tullmyndigheten vid inresa — denna anmälan gäller främst varor ombord men är obligatorisk. Kontrollera aktuella regler hos Ålands tullverk innan du seglar för att undvika problem vid ankomst. Tullfritt handel gäller inte längre, men Åland erbjuder ändå ofta lägre priser än Sverige på många varor.
 </p>
 <p>
 <strong>VHF och sjökort:</strong> Om du planerar att segla i finskt farvatten (vilket många gör på väg vidare till Turku eller längre omkring öarna) krävs en VHF-licens. Denna är relativt enkel att få och rekommenderas för all segling på detta område. Sjökartor från Finlands sjöfartsverks (FPA) kartserie är absolut nödvändiga för skärgårdshavet — Svallas digitala kartbas bygger på dessa officiella data, men många föredrar också papperskartor som backup ombord.
 </p>
 <p>
 <strong>Bunkring och service:</strong> Mariehamn erbjuder fullständig bunkring för både diesel och bensin, liksom dricksvatten och el vid gästhamnen. De flesta större gästhamnar (Föglö, Kökar, Brändö) har också bunkring eller kan ordna det dagen innan. Varsamt planera så att du inte blir utan bränsle långt ute i skärgården — ett par extra liter diesel lönar sig alltid på Åland.
 </p>

 <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
 Vanliga frågor
 </h2>
 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Behöver man visum eller pass för att segla till Åland?
 </h3>
 <p>
 Nej, du behöver inte visum eller särskilt pass för att segla till Åland från Sverige. Du behöver dock ett giltigt ID-kort eller pass för identifikation. Det viktigaste är att anmäla din båts ankomst till tullmyndigheten vid inresa — denna anmälan gäller främst varor ombord men är obligatorisk för alla båtar från utlandet (i detta fall från Sverige).
 </p>

 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Hur djupt är Ålands hav?
 </h3>
 <p>
 Ålands hav varierar från omkring 30–50 meter på grunt vatten till över 200 meter på de djupaste ställena — betydligt djupare än många delen av Stockholms skärgård. Sundet mot Finland i öster är dock grundare och kräver noggrann navigation med sjökart. Svalls kartdata visar djupen för alla områden, men en uppdaterad officiell sjökarta är absolut nödvändig för säker segling.
 </p>

 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Kan man segla vidare till Finland från Åland?
 </h3>
 <p>
 Ja, absolut. Åbo (Turku) ligger ungefär 6 timmar segling öst om Mariehamn — en populär nästa etapp för många seglare. Från Mariehamn kan du också välja många vägar vidare: söder omkring Kökar, väster till svenska vatten, eller öst genom skärgårdshavet mot Brändö och vidare till Finland. Många klassiska Östersjöseglare gör Åland till en etapp på en längre resa genom Östersjön.
 </p>

 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Vad kostar gästhamn i Mariehamn?
 </h3>
 <p>
 Gästhamnarna i Mariehamn kostar normalt 150–250 kronor per natt beroende på båtens längd. De flesta hamnar inkluderar el och dusch i priset. Det är värt att höra av sig dagen innan för att säkra en bra plats under högsäsong (juli-augusti). Mindre gästhamnar ute på öarna som Föglö och Kökar kan vara något billigare och erbjuder ofta en mer intim känsla — perfekt om du vill längre bort från huvudstaden.
 </p>
 </>
 }
 cta={{ label: 'Skapa gratis konto', href: '/logga-in' }}
 related={[
 { label: 'Segelrutter', href: '/segelrutter' },
 { label: 'Hamnar & bryggor', href: '/hamnar-och-bryggor' },
 { label: 'Stockholms skärgård', href: '/stockholms-skargard' },
 { label: 'Nybörjare & segling', href: '/nyborjare-segling' },
 ]}
 />
 </>
 )
}
