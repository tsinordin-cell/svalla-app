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
 icon: '️',
 title: 'Karta över Västerhavet',
 description: 'Alla verifierade platser längs Kattegatt och Skagerrak — gästhamnar, naturhamnar, sjömackar och kustrestauranger.',
 href: '/upptack',
 meta: 'Gratis',
 },
 {
 icon: '',
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
 icon: '',
 title: 'Logga dina turer',
 description: 'Spåra din färd med GPS, dokumentera väder och vind, och dela turen med seglare som känner Västerhavet.',
 href: '/logga-in',
 },
 {
 icon: '',
 title: 'Orust & Tjörn',
 description: 'Två av Skandinaviens mest seglartäta öar — med service, varv och ett rikt seglarliv hela sommaren.',
 href: '/logga-in',
 },
]

export default function VasterhavetPage() {
 const faqJsonLd = {
 '@context': 'https://schema.org',
 '@type': 'FAQPage',
 mainEntity: [
 {
 '@type': 'Question',
 name: 'Hur skiljer sig Västerhavet från Östersjön att segla?',
 acceptedAnswer: { '@type': 'Answer', text: 'Tidvatten och strömmar är mycket märkbara på Västerhavet — något som nästan helt saknas i Östersjön. Vinden är också ofta starkare. Det kräver mer erfarenhet att segla på Västerhavet, men belöningen är en mycket mer dramatisk och varierad segelupplevelse.' },
 },
 {
 '@type': 'Question',
 name: 'Kan man segla till Norge från Västerhavet?',
 acceptedAnswer: { '@type': 'Answer', text: 'Ja, absolut! Strömstad är den naturliga gränshamnen. Från här är det bara några timmars segling till den norska skärgården vid Hvaler, ett populärt resmål bland svenska seglare. Se till att du har aktuell karta och pass ombord.' },
 },
 {
 '@type': 'Question',
 name: 'Vad är de bästa hamnarna längs Västerhavet?',
 acceptedAnswer: { '@type': 'Answer', text: 'I norr: Strömstad, Grebbestad, Smögen och Lysekil. I mitten: Marstrand, Fiskebäckskil och Orust. I söder: Varberg, Falkenberg och Halmstad. Använd Svallas karta för att upptäcka mindre gästhamnar och naturhamnar.' },
 },
 {
 '@type': 'Question',
 name: 'Behöver man specialutrustning för Västerhavet?',
 acceptedAnswer: { '@type': 'Answer', text: 'AIS-transponder rekommenderas starkt i Kattegatt där handelsfartygstrafiken är tät. VHF-radio är inte krav för fritidsbåt under 13 meter men starkt rekommenderad. Uppdaterade sjökort/GPS, tidvattentabell vid Kosteröarna och SMHI-prognos hör till basics.' },
 },
 ],
 }
 const breadcrumbJsonLd = {
 '@context': 'https://schema.org',
 '@type': 'BreadcrumbList',
 itemListElement: [
 { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://svalla.se' },
 { '@type': 'ListItem', position: 2, name: 'Västerhavet', item: 'https://svalla.se/vasterhav' },
 ],
 }
 return (
 <>
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
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
 Bohuslän är hjärtat av svensk segling. Här möter du <strong>Orust</strong> (Sveriges fjärde största ö) och <strong>Tjörn</strong> (sjätte största) — båda legendariska bland seglare och hem för en stark varvskultur och båtbyggartradition. Besök <strong>Ellös</strong> på Orust där bland annat Hallberg-Rassy bygger sina segelbåtar.
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
 Västerhavet kulminerar i norr vid Skagerrak. <strong>Kosterhavets nationalpark</strong> (Sveriges första marina nationalpark, 2009) ligger här och skyddar ett unikt marint ekosystem — bland annat Kosterrännan som är cirka 247 m djup och Sveriges djupaste havsdal. <strong>Strömstad</strong> är naturlig utgångspunkt för segling mot Norge.
 </p>
 <p>
 Segling i Skagerrak kräver respekt för väder och sjö. <strong>Tidvattenamplituden</strong> är liten jämfört med oceaner — normalt cirka 10 cm i Skagerrak och 5 cm i Kattegatt enligt SMHI, men kan tillfälligt nå 30–40 cm i Skagerrak och 20 cm i Kattegatt. Vid Kosteröarna brukar skillnaden mellan hög- och lågvatten ligga på 20–30 cm. Vinden, lufttryck och havsströmmar kan dock ha större effekt på vattenståndet än själva tidvattnet. Hvaler-skärgården på norska sidan är ett populärt resmål för dem som vill kombinera Sverige och Norge.
 </p>

 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Tidvatten, strömmar och väder på Västerhavet
 </h3>
 <p>
 <strong>Tidvatten</strong> är liten på svenska västkusten jämfört med oceaner. Enligt SMHI är amplituden normalt cirka 5 cm i Kattegatt och cirka 10 cm i Skagerrak, men kan tillfälligt nå 20 cm respektive 30–40 cm. Vid Kosteröarna brukar man ligga runt 20–30 cm. Större förändringar i vattenstånd beror oftast på vind och lufttryck snarare än tidvatten — en kraftig nordvästlig vind kan pressa upp vattenståndet betydligt.
 </p>
 <p>
 <strong>Strömmar</strong> kan förekomma vid trånga sund. Hakefjorden mellan Tjörn och fastlandet, och passagen vid Marstrand, är platser där tidigare seglare brukar nämna märkbar ström. Planera passagerna och kolla aktuella strömprognoser i tveksamma fall.
 </p>
 <p>
 <strong>Sydvästvinden dominerar</strong> under seglarsäsongen (maj–september). Det är gynnsamt för nordgående segling längs Bohuslän men kan ge hårt väder i utsatta lägen. <strong>Dimma</strong> kan vara ett problem vid Hallandskusten, särskilt tidigt och sent på säsongen. SMHI:s app och varningar är ett bra komplement till lokala prognoser — kolla dem innan varje passage.
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
 <strong>AIS-transponder</strong> rekommenderas starkt i Kattegatt där handelsfarteget är tätt. <strong>VHF-radio</strong> är inte juridiskt krav för fritidsbåt under 13 meter, men starkt rekommenderad — för att kunna kommunicera med hamnar, lyssna på sjöräddning och anropa nödfrekvens (kanal 16). Sjökort/GPS med uppdaterade kort är väsentligt. Tidvattentabell är nyttig vid Kosteröarna och in mot trängre fjordar. Slutligen, kontrollera SMHI:s prognos och varningar inför varje passage.
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
 </>
 )
}
