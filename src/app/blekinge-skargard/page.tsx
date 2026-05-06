import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
 title: 'Blekinges skärgård — Logga turer, hitta platser | Svalla',
 description: 'Segling i Blekinges skärgård: Karlskrona gästhamn, Hanö, Östersjöleden. Logga båtturer, ankringsplatser och naturhamnar på Svalla.',
 keywords: [
 'blekinge skärgård',
 'segla blekinge',
 'karlskrona skärgård',
 'blekinge båt',
 'naturhamn blekinge',
 'sölvesborg',
 'hanö',
 'sölvesborgs skärgård',
 'karlskrona hamn',
 'utskärgård blekinge',
 'blekinge sommar',
 'karlskrona gästhamn',
 'hanö segling',
 'östersjöleden',
 'blekinge segling guide',
 'karlskrona unesco',
 ],
 openGraph: {
 title: 'Blekinges skärgård — Logga turer | Svalla',
 description: 'Logga dina båtturer i Blekinges skärgård med Svalla.',
 url: 'https://svalla.se/blekinge-skargard',
 },
 alternates: { canonical: 'https://svalla.se/blekinge-skargard' },
}

const ITEMS: LandingItem[] = [
 {
 icon: '️',
 title: 'Karta över Blekinge',
 description: 'Verifierade platser längs Blekinges kust — naturhamnar, bryggor, krogar och sjömackar.',
 href: '/upptack',
 meta: 'Gratis',
 },
 {
 icon: '',
 title: 'Karlskrona — marinstad',
 description: 'Världsarvsstad och Östersjöns stolthet. Gästhamnen i Stumholmen är en naturlig mötesplats för seglare.',
 href: '/upptack',
 },
 {
 icon: '🏕️',
 title: 'Hanö och ytterskärgården',
 description: 'Blekinges utpostar mot öppet hav — råa öar med unik fågelrik natur och lugna ankringsplatser.',
 href: '/platser?kategori=naturhamn',
 },
 {
 icon: '️',
 title: 'Krogar längs kusten',
 description: 'Från fiskrökerier i Ronneby skärgård till vällagad mat i Karlskronas restauranger.',
 href: '/krogar-och-mat',
 },
 {
 icon: '',
 title: 'Etapp på Östersjöleden',
 description: 'Blekinge är en naturlig etapp om du seglar längs kusten mot Gotland eller Danmark. Logga varje dag.',
 href: '/logga-in',
 },
 {
 icon: '📱',
 title: 'Logga dina turer',
 description: 'GPS-spårning, foton och anteckningar — spara minnen från Blekinges skärgård.',
 href: '/logga-in',
 },
]

export default function BlekingeSkargardPage() {
 const faqJsonLd = {
 '@context': 'https://schema.org',
 '@type': 'FAQPage',
 mainEntity: [
 {
 '@type': 'Question',
 name: 'Är Blekinges skärgård bra för nybörjarseglare?',
 acceptedAnswer: { '@type': 'Answer', text: 'Ja, absolut. Innerskärgården kring Karlskrona har väl märkta farleder och lugna, skyddade vatten — perfekt för att bygga självförtroende. Undvik öppet hav mot Hanö utan seglererfarenhet, men annars är Blekinge mycket nybörjarvänligt.' },
 },
 {
 '@type': 'Question',
 name: 'Hur nära är Blekinge till Danmark och Tyskland?',
 acceptedAnswer: { '@type': 'Answer', text: 'Rügen i Tyskland ligger ungefär 80 sjömil söder om Karlskrona. Bornholm, Danmark, ligger omkring 50 sjömil västerut. Blekinge fungerar som ett naturligt utgångsläge för större Östersjöseglaturer.' },
 },
 {
 '@type': 'Question',
 name: 'Vad är Östersjöleden?',
 acceptedAnswer: { '@type': 'Answer', text: 'Östersjöleden är en märkt segelrutt som sträcker sig längs hela svenska Östersjökusten från Stockholm i norr till Malmö i söder. Blekinge utgör en av de vackraste etapperna, med ungefär två dagars segling från Karlskrona.' },
 },
 {
 '@type': 'Question',
 name: 'Vad är speciellt med Karlskronas skärgård jämfört med Stockholm?',
 acceptedAnswer: { '@type': 'Answer', text: 'Stockholms skärgård är spektakulär men väletablerad — Karlskronas är mjukare, grönare och markant lugnare. Inga storstadsinfrastruktur eller överbefolkning, men all charm. Blekinge är perfekt för den seglare som söker äventyr utan att vilja stöta på hundra andra båtar.' },
 },
 ],
 }
 const breadcrumbJsonLd = {
 '@context': 'https://schema.org',
 '@type': 'BreadcrumbList',
 itemListElement: [
 { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://svalla.se' },
 { '@type': 'ListItem', position: 2, name: 'Blekinges skärgård', item: 'https://svalla.se/blekinge-skargard' },
 ],
 }
 return (
 <>
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
 <CategoryLanding
 heroGradient={['#4a3728', '#6b5040']}
 eyebrow="Blekinges skärgård"
 title="Östersjöns gröna kust"
 tagline="Välbevarad och underskattad — Svalla hjälper dig utforska Blekinges skärgård och logga varje tur längs Sveriges sydligaste kust."
 heroIcon={
 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
 <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
 <polyline points="9 22 9 12 15 12 15 22" />
 </svg>
 }
 intro={
 <>
 <p>
 Blekinges skärgård är Sveriges bäst bevarade hemlighet. <strong>Frodig vegetation, lugna vatten och Karlskrona som maritimt världsarv</strong> — en region som belönar den seglare som tar sig dit. Från Karlskronas färgglada trähus till Hanös ödsliga naturhamnar ligger några av Östersjöns mest autentiska ankringsplatser bara vänta.
 </p>
 <p>
 Till skillnad från Stockholms arkaipelags väletablerade infrastruktur behåller Blekinge sin skärgårdsromantik — grönare, mjukare och lugnare, men fullt tillräckligt utrustad för moderna seglare. Området är idealt för både nybörjare som vill slippa öppet hav och erfarna seglare som söker atmosfär.
 </p>
 <p>
 Svalla låter dig logga alla turer längs kusten, hitta naturhamnar och krogar på kartan och spara minnen från en skärgård som fortfarande känns oprövad. Planera din tur längs Östersjöleden, kartlägga ankringsplatser och spåra dina vägar genom Blekinges gröna övärldar.
 </p>
 <p>
 Segla från världshärvsstaden Karlskrona till Hanös ödsliga fågelskyddsområde på en dag. Eller ta det långsamt och utforska Ronneby skärgård, Aspö, Tjurkö och de mindre kända öarna som gör Blekinge speciellt för den seglare som vet vad hen letar efter.
 </p>
 </>
 }
 itemsTitle="Blekinge med Svalla"
 itemsDescription="Utforska Blekinges kust och skärgård."
 items={ITEMS}
 deeperContent={
 <>
 <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
 Karlskrona — marinstadens gästhamn
 </h2>
 <p>
 <strong>Karlskrona</strong> är en av Europas bäst bevarade marinstäder och UNESCO Världsarv sedan 1998. Staden ligger på en skärgårdsgrupp mitt i sydöstra Sverige och bjuder på något av det vackraste segelmål längs Östersjön. Gästhamnen vid Stumholmen är centralt belägen, välutrustad med både dugger och bryggplatser, och en naturlig mötesplats för seglare från hela världen.
 </p>
 <p>
 Stöta in över Karlskronas mjukt öppnande farleder och ankra vid Stumholmen medan du njuter av utsikten över <strong>Örlogsvarvet</strong> (dagens Marinmuseum), den gotiska <strong>Amiralitetskyrkan</strong> och Stortorgets vita hus och träd. Logga ankomsten med GPS för ett minne för livet. Under juli kan hamnen bli fylld av seglare — boka bryggplats i förväg via Svalla eller direkt med hamnstyrelsen.
 </p>

 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Skärgården kring Karlskrona
 </h3>
 <p>
 Omkring Karlskrona sprider sig en härlig skärgård med både välkända och dolda pärlor. <strong>Aspö</strong> och <strong>Tjurkö</strong> är två större öar med gästbryggor och idyllisk skärgårdsstämning, perfekta för ett fritidsbesök eller att ankra över natten. <strong>Hästö</strong> väcker ofta intresse för sin populära kafébrygga där du kan få fika och god mat utan att lämna båten.
 </p>
 <p>
 För seglare som föredrar naturhamnar ligger <strong>Senoren</strong> lite inåt och erbjuder lugna ankringsförhållanden omgiven av skog och natur. De inre fahrlederna runt Karlskrona är väl märkta med röda och vita märken, men grundare partier förekommer — Svalla-kartan visar verifierade ankringsplatser och djupinformation som hjälper dig navigera säkert.
 </p>

 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Hanö — Blekinges utpost
 </h3>
 <p>
 <strong>Hanö</strong> ligger cirka 15 kilometer ut i öppet Östersjö-hav och representerar Blekinges radikalaste utpost. Ön är klassificerad som <strong>fågelskyddsområde</strong> och är känd för sin rika fågelliv — säsongsvis ankommer miljontals fåglar på vägen mellan Afrika och norden. På Hanö hittar du också <strong>en unik engelsk kyrkogård från Napoleonkrigen</strong>, den enda av sitt slag i Sverige, en märklig minnesmärke över sjömän från andra länder.
 </p>
 <p>
 Ankring runt Hanö kräver erfaret öga och lokal kunskap — naturhamnen är en av Östersjökustens råaste med exponerad botten och vindkapell. <strong>Endast dagsbesök rekommenderas</strong> vid instabilt väder. Om du seglar ut till Hanö, logga ankomsten i Svalla tillsammans med dina iakttagelser — varje logg bidrar till kunskapen om denna magiska men krävande destination.
 </p>

 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Ronneby och norra Blekinge
 </h3>
 <p>
 Väster och norr om Karlskrona öppnar sig ytterligare ett klassiska skärgårdslandskap. <strong>Ronneby skärgård</strong> är geologiskt unik för sina <strong>serpentinsklippor</strong> — en rödbrun stenart som skapar dramatiska färgkontraster mot havet och skogarna. Denna område är perfekt för både kajakpaddling och kortare dagsutflykter med större båt, ett annat sätt att logga och utforska skärgårdslivet i Svalla.
 </p>
 <p>
 Mindre kända platser som <strong>Bräkne-Hoby</strong> och <strong>Tromtö</strong> erbjuder lugnare fahrvatten och en känsla av avskildhet. Längre västerut hittar du <strong>Sölvesborg</strong> med sin egen lilla skärgård — en bra startpunkt om du planerar att segla längs Östersjöleden mot Gotland eller vidare söder ut mot Danmark och Tyskland. Från Sölvesborg är det bara några få sjömil innan du dyker in i det stora äventyret längs den svenska kusten.
 </p>

 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Vanliga frågor
 </h3>
 <p>
 <strong>Är Blekinge bra för nybörjarseglare?</strong><br />
 Ja, absolut. Innerskärgården kring Karlskrona har väl märkta farleder och lugna, skyddade vatten — perfekt för att bygga självförtroende. Undvik öppet hav mot Hanö utan seglererfarenhet, men annars är Blekinge mycket nybörjarvänligt.
 </p>
 <p>
 <strong>Hur nära är Blekinge till Danmark och Tyskland?</strong><br />
 Rügen i Tyskland ligger ungefär 80 sjömil söder om Karlskrona. Bornholm, Danmark, ligger omkring 50 sjömil västerut. Blekinge fungerar som ett naturligt utgångsläge för större Östersjöseglaturer — många seglare tar sig hit före längre kryss.
 </p>
 <p>
 <strong>Vad är Östersjöleden?</strong><br />
 Östersjöleden är en märkt segelrutt som sträcker sig längs hela svenska Östersjökusten från Stockholm i norr till Malmö i söder. Blekinge utgör en av de vackraste etapperna, med ungefär två dagars segling från Karlskrona. Svalla hjälper dig logga varje dag och planera dina etapper.
 </p>
 <p>
 <strong>Vad är speciellt med Karlskronas skärgård jämfört med Stockholm?</strong><br />
 Stockholms skärgård är spektakulär men väletablerad — Karlskronas är mjukare, grönare och markant lugnare. Ingen storstadsinfrastruktur eller överbefolkning, men all charm som sitter i just det: öar som fortfarande känns lika utforskade och okända. Det gör Blekinge perfekt för den seglare som söker äventyr utan att vilja stöta på hundra andra båtar i samma hamn.
 </p>
 </>
 }
 cta={{ label: 'Skapa gratis konto', href: '/logga-in' }}
 related={[
 { label: 'Segelrutter', href: '/segelrutter' },
 { label: 'Hamnar & bryggor', href: '/hamnar-och-bryggor' },
 { label: 'Aktiviteter', href: '/aktiviteter' },
 { label: 'Gotland', href: '/gotland' },
 ]}
 />
 </>
 )
}
