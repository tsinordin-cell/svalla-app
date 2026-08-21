import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
 title: 'Börja segla — Nybörjarguide',
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
 // UPPSKATTNING: ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör (2026-08)
 meta: 'Nivå 1–3, 3000–8000 kr',
 },
 {
 title: 'Välj din första båt',
 description: 'Folkbåt eller plastklassiker? Vad passar nybörjare och var kan du hyra eller köpa.',
 href: '/nyborjare-segling?avsnitt=bat',
 icon: '',
 meta: 'Albin 25, H-båt, Folkbåt',
 },
 {
 title: 'Börja i rätt vatten',
 description: 'Lugna revir för nybörjare: Mälaren, inre Stockholms skärgård och Bohuslän.',
 href: '/nyborjare-segling?avsnitt=revir',
 icon: 'waves',
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
 const exerciseActionJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ExerciseAction',
  name: 'Lär dig segla — nybörjarguide för segling i Sverige',
  description: 'Allt du behöver veta för att börja segla: kurser, båtval, säkerhet och bästa revir för nybörjare.',
  url: 'https://svalla.se/nyborjare-segling',
  exerciseType: 'Sailing',
  sportActivityLocation: {
   '@type': 'Place',
   name: 'Sverige — Stockholms skärgård, Mälaren och Bohuslän',
  },
  subjectOf: {
   '@type': 'HowTo',
   name: 'Hur börjar man segla som nybörjare?',
   description: 'Steg-för-steg guide: från noll till säker seglare i svenska vatten.',
   step: [
    // UPPSKATTNING: ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör (2026-08)
    { '@type': 'HowToStep', position: 1, name: 'Ta en segelkurs', text: 'Hitta rätt kurs för din nivå — Seglarförbundets körkort, RYA Day Skipper eller kurs hos lokalt segelsällskap. Grundkurs tar 2–3 dagar och kostar 2 000–4 000 kr.' },
    { '@type': 'HowToStep', position: 2, name: 'Välj din första båt', text: 'Börja med en stabil och enkel båt: Nordisk Folkbåt, H-båt eller Albin 25. Charterbåt är ett bra alternativ innan köp — kostar 8 000–40 000 kr/vecka beroende på säsong.' },
    { '@type': 'HowToStep', position: 3, name: 'Börja i rätt vatten', text: 'Lugna revir för nybörjare: Mälaren, inre Stockholms skärgård (Saltsjön) och inre delar av Bohuslän. Undvik öppet hav tills du byggt upp rutin.' },
    { '@type': 'HowToStep', position: 4, name: 'Förbered checklista och säkerhetsutrustning', text: 'Flytväst alltid ombord. VHF-radio på kanal 16 (nödkanal). Färdplan till någon iland. Sjökort och kompass. Första hjälpen-kit.' },
    { '@type': 'HowToStep', position: 5, name: 'Förstå vind och väder', text: 'Lär dig läsa SMHI:s sjöprognos och Beaufort-skalan. Beaufort 0–4 är bra för nybörjare. Respektera stormvarningar — vädret på öppet vatten kan ändras snabbt.' },
    { '@type': 'HowToStep', position: 6, name: 'Logga din första tur', text: 'Spara turen, se statistik och dela med andra seglare. Varje tur bygger erfarenhet — logga rutt, väder och lärdomar för att utvecklas snabbare.' },
   ],
  },
 }
 const faqJsonLd = {
 '@context': 'https://schema.org',
 '@type': 'FAQPage',
 mainEntity: [
 {
 '@type': 'Question',
 name: 'Behöver man körkort för att segla i Sverige?',
 acceptedAnswer: { '@type': 'Answer', text: 'Nej, inte enligt lag i Sverige för privatsegling på kusten. Men många charterbolag kräver ett bevis (RYA Day Skipper eller motsvarande). Och ett bevis ger dig kunskap som kan rädda livet.' },
 },
 {
 '@type': 'Question',
 name: 'Hur lång tid tar en segelkurs?',
 acceptedAnswer: { '@type': 'Answer', text: 'En basnivå (Nivå 1) tar 2–3 dagar och täcker grunder. En komplett RYA Day Skipper tar 5–7 dagar. Du kan ofta ta en kurs på helger (2–3 helger vardera).' },
 },
 {
 '@type': 'Question',
 name: 'Kan man segla på vintern i Sverige?',
 acceptedAnswer: { '@type': 'Answer', text: 'En del seglare är ute året runt, men det är inget för nybörjare. Mälaren och inre skärgårdsvikar kan frysa januari–mars, medan ytterskärgård och västkust sällan fryser helt. Vintersegling kräver bättre väderkunskap och rätt utrustning.' },
 },
 {
 '@type': 'Question',
 name: 'Vad kostar det att köpa sin första segelbåt?',
 // UPPSKATTNING: ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör (2026-08)
 acceptedAnswer: { '@type': 'Answer', text: 'En begagnad H-båt eller Albin 25 kostar typiskt 30 000–100 000 kr. En välhållen Folkbåt eller Maxi 77 kostar ofta 80 000–200 000 kr. Räkna även med försäkring (~500–2 000 kr/år), underhåll (~2 000–8 000 kr/år) och hamnplats (~3 000–10 000 kr/år beroende på ort).' },
 },
 ],
 }
 const breadcrumbJsonLd = {
 '@context': 'https://schema.org',
 '@type': 'BreadcrumbList',
 itemListElement: [
 { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://svalla.se' },
 { '@type': 'ListItem', position: 2, name: 'Nybörjare & segling', item: 'https://svalla.se/nyborjare-segling' },
 ],
 }
 const speakableJsonLd = {
 '@context': 'https://schema.org',
 '@type': 'WebPage',
 name: 'Börja segla — Nybörjarguide för segling i Sverige',
 url: 'https://svalla.se/nyborjare-segling',
 speakable: {
  '@type': 'SpeakableSpecification',
  cssSelector: ['h1', '.category-landing-tagline'],
 },
 }
 return (
 <>
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(exerciseActionJsonLd) }} />
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableJsonLd) }} />
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
 I Sverige är vanliga vägar in i seglingen <strong>Förarintyg och Kustskepparintyg</strong> (utfärdas av NFB / Nämnden för båtlivsutbildning), <strong>SSF-utbildningar</strong> (Svenska Seglarförbundet) och kurser hos lokala segelsällskap. Stegen kan se ut så här:
 </p>
 <ul style={{ margin: '12px 0', paddingLeft: 20 }}>
 // UPPSKATTNING: ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör (2026-08)
 <li><strong>Grundläggande (förarintyg-nivå):</strong> Knopar, sjövägsregler, säkerhet, grundläggande navigation. Cirka 2–3 dagar eller några kvällar. Kostnad cirka 2 000–4 000 kr.</li>
 <li><strong>Kustskepparintyg:</strong> Kustnavigation, terrestrisk navigation, väder, kollisionsregler. Bredare kurs, cirka 4–6 dagar. Kostnad cirka 3 000–6 000 kr.</li>
 <li><strong>RYA Day Skipper:</strong> Internationell standard som ofta krävs av charterbolag. Praktisk del 5 dagar + teoridel. Kostnad cirka 8 000–15 000 kr.</li>
 </ul>
 <p>
 // UPPSKATTNING: ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör (2026-08)
 <strong>Lokala segelsällskap</strong> erbjuder ofta kurser till lägre pris (ibland 1 500–3 000 kr) och är fantastiska för att träffa andra nybörjare och få mentorskap. <strong>KSSS</strong> (Kungliga Svenska Segelsällskapet) är Sveriges största klubb med stor utbildningsverksamhet. Klassiska klubbar finns i hela landet.
 </p>
 <p>
 <em>Tips:</em> Börja med en grundkurs eller en klubbkurs för att se om segling är för dig, innan du investerar i högre nivåer.
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
 <li><strong>Nordisk Folkbåt (7,64 m / ca 25 fot):</strong> Tidlös klassiker, ritad 1942 av Tord Sundén. Stabil, vacker att segla och stort utbud på andrahandsmarknaden.</li>
 <li><strong>H-båt (8,25 m / ca 27 fot):</strong> Treminutsbåt ritad 1967 av Hans Groop, med storsegel, fock och spinnaker. Mycket populär i Sverige och Finland.</li>
 <li><strong>Albin 25:</strong> Klassisk plastbåt från tidigt 1970-tal. Säker, lätt att segla och finns gott om dem i Sverige.</li>
 <li><strong>Maxi 77 / Maxi 87:</strong> Praktiska familjebåtar från Pelle Petterson, hyfsat utrymme och bra prislapp på begagnatmarknaden.</li>
 </ul>
 <p>
 <em>Undvik som första båt:</em> Mycket små båtar under cirka 6 meter kan kännas pillriga i vind, och båtar över 12 meter (40 fot) är ofta dyra i drift och kräver mer rutin för att hantera.
 </p>
 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Charterbåt som övningsväg
 </h3>
 <p>
 // UPPSKATTNING: ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör (2026-08)
 Du behöver inte köpa direkt. Många charterbolag runt Sverige erbjuder båtar för veckosegling från cirka 8 000–15 000 kr/vecka (lågsäsong) till 20 000–40 000 kr/vecka (högsäsong). Perfekt för att prova innan du köper. Kraven är vanligen ett intyg (t.ex. förarintyg/Day Skipper) eller att du bokar med en erfaren skeppare ombord.
 </p>

 <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
 Säkerhet för nybörjare
 </h2>
 <p>
 Säkerhet är aldrig förhandlingsbar på vattnet. Här är det viktigaste:
 </p>
 <ul style={{ margin: '12px 0', paddingLeft: 20 }}>
 <li><strong>Flytväst:</strong> Bär alltid. Det finns inget allmänt lagkrav på flytväst för vuxna privat, men det är sunt förnuft — och för många charterbåtar och kappseglingar är det krav.</li>
 <li><strong>Färdplan:</strong> Berätta för någon iland var du seglar, när du planerar att vara tillbaka och hur de når dig. Uppdatera vid ändringar.</li>
 <li><strong>VHF-radio:</strong> En hållbar VHF-radio är väsentlig för kommunikation och nödsituationer. Lär dig kanalerna — kanal 16 är nödkanal.</li>
 <li><strong>EPIRB eller PLB:</strong> Personlig nödsändare som via satellit larmar sjöräddningen om olyckan är framme.</li>
 <li><strong>Första hjälpen-kit:</strong> En välutrustad förbandsväska ombord.</li>
 <li><strong>Sjövägsreglerna:</strong> Lär dig inte bara segling — lär dig också väjningsreglerna (kollisionsreglerna). De är logiska, men måste sitta.</li>
 </ul>

 <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
 Seglarbevis och certifikat
 </h2>
 <p>
 I Sverige finns <strong>inget allmänt lagkrav på förarbevis</strong> för fritidsbåt under 12 meter (krav finns dock på t.ex. behörighet för båtar över vissa storlekar och hastigheter, och det finns ett förarbevis-krav för vissa vattenskotrar). Du kan lägga ut i din egen båt utan kurs.
 </p>
 <p>
 Men det finns flera viktiga anledningar att ta ett intyg:
 </p>
 <ul style={{ margin: '12px 0', paddingLeft: 20 }}>
 <li><strong>Charterbolag kräver det:</strong> De flesta kräver minst förarintyg/Day Skipper för att hyra båt utan erfaren skeppare ombord.</li>
 <li><strong>Internationell giltighet:</strong> RYA-certifikat och Kustskepparintyg erkänns runt om i världen.</li>
 <li><strong>Säkerhet och kunskap:</strong> En kurs ger dig kunskap du sällan plockar upp på egen hand — från nödhantering till navigation.</li>
 <li><strong>Försäkring:</strong> Vissa försäkringar premierar eller kräver godkänt intyg för fullt skydd.</li>
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
 Från Göteborg och norrut. Marstrand, Tjörn och Lysekil-området är klassiska målpunkter med gott om hamnar och bra service. Notera att Bohuslän blir snabbt mer öppet ju längre ut du kommer — börja innanför öarna.
 </p>
 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Vänern
 </h3>
 <p>
 EU:s största insjö (och Europas tredje största). Stora ytor men relativt skyddat jämfört med Östersjön. Bra för längre närsegling. Vädret kan dock byta snabbt — respektera prognoserna.
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
 Ja, en del seglare är ute året runt — men det är inget för nybörjare. Mälaren och inre skärgårdsvikar kan frysa under vintern (typiskt januari–mars), medan ytterskärgården och västkusten sällan fryser helt. Vintersegling kräver bättre väderkunskap, rätt klädsel och fungerande utrustning som tål kyla. Börja inte med vintersegling som nybörjare.
 </p>

 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Vad kostar det att köpa sin första segelbåt?
 </h3>
 <p>
 // UPPSKATTNING: ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör (2026-08)
 En begagnad klassiker som H-båt eller Albin 25 kostar typiskt 30 000–100 000 kr. En välhållen Folkbåt eller Maxi 77 kostar ofta 80 000–200 000 kr. Billigare båtar finns från 10 000–20 000 kr men kräver att du noggrant kontrollerar skick (köl, skrov, rigg, motor) före köp. Räkna även med försäkring (~500–2 000 kr/år), underhåll (~2 000–8 000 kr/år) och hamnplats (~3 000–10 000 kr/år beroende på ort).
 </p>
 </>
 }
 cta={{ label: 'Skapa gratis konto', href: '/logga-in' }}
 related={[
 { label: 'Dagsturer från Stockholm', href: '/dagsturer' },
 { label: 'Naturhamnar', href: '/naturhamnar' },
 { label: 'Segelrutter', href: '/segelrutter' },
 { label: 'Hamnar & bryggor', href: '/hamnar-och-bryggor' },
 ]}
 />
 </>
 )
}
