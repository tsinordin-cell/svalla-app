import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
 title: 'Stockholms skärgård — Guide till öar, hamnar och segling 2026 | Svalla',
 description: 'Komplett guide till Stockholms skärgård 2026. Sandhamn, Utö, Vaxholm, Grinda, Möja — avstånd, färjetider, naturhamnar och seglingstips. 30 000 öar från innerskärgård till ytterskärgård.',
 keywords: [
 'stockholms skärgård',
 'skärgårdsapp stockholm',
 'båttur stockholms skärgård',
 'segla stockholms skärgård',
 'naturhamnar stockholm',
 'restauranger skärgården',
 'logga båttur',
 'skärgårdsliv',
 'sandhamn guide',
 'utö guide',
 'vaxholm guide',
 'sandhamn',
 'utö',
 'grinda',
 'fjäderholmarna',
 'vaxholm',
 'norra skärgården',
 'södra skärgården',
 ],
 openGraph: {
 title: 'Stockholms skärgård — Logga turer, hitta platser | Svalla',
 description: 'Logga dina båtturer och utforska Stockholms skärgård med Svalla.',
 url: 'https://svalla.se/stockholms-skargard',
 },
 alternates: { canonical: 'https://svalla.se/stockholms-skargard' },
}

const ITEMS: LandingItem[] = [
 {
 icon: '⛵',
 title: 'Sandhamn',
 description: 'KSSS:s hemmahamn och ytterskärgårdens kronjuvel. Ca 35 sjömil (65 km) från Stockholm — 5–8 timmars segling. Sandhamns Värdshus, flera gästhamnar och ett livligt sommarliv. Cinderella trafikerar linjen dagligen under säsong.',
 href: '/sandhamn',
 meta: 'Yttre skärgården · 35 sjömil · Cinderella',
 },
 {
 icon: '🏝️',
 title: 'Utö',
 description: 'Södra skärgårdens unika ö — en före detta järngruva med pittoresk by. Utö Värdshus, cykelleder och naturreservat. Nås med Waxholmsbolaget från Nynäshamn, ca 90 min. Fantastisk höstdestination när trängseln försvunnit.',
 href: '/uto',
 meta: 'Södra skärgården · Via Nynäshamn · 90 min',
 },
 {
 icon: '🏰',
 title: 'Vaxholm',
 description: 'Skärgårdens infartsport — 30 min från Stockholm med Waxholmsbolaget eller 20 sjömil med segelbåt. Vaxholms fästning (1500-tal), charmig trästad, gästhamn och restauranger. Perfekt för en dagsutflykt eller stopphav på väg ut.',
 href: '/vaxholm',
 meta: 'Innerskärgården · 30 min med båt',
 },
 {
 icon: '🌿',
 title: 'Grinda',
 description: 'STF-ö i inre mellanskärgården — enkel att nå, vacker att vara på. Waxholmsbolaget tar dig hit direkt från Stockholm. Välskyddat ankringsvatten, café och restaurang. Perfekt för nybörjare eller en avslappnad weekend.',
 href: '/grinda',
 meta: 'Mellanskärgården · Nybörjarvänlig',
 },
 {
 icon: '🍦',
 title: 'Möja',
 description: 'Mellanskärgårdens klassiska seglarö — känd för Bergs Glass och den lugna atmosfären. Bra naturhamnar vid Berg och Ramsmora. Runt 30 sjömil från Stockholm. Möja passar perfekt som etapp på en längre segeltur norrut.',
 href: '/moja',
 meta: 'Mellanskärgården · 30 sjömil',
 },
 {
 icon: '🌊',
 title: 'Fjäderholmarna',
 description: 'Närmaste skärgårdsupplevelsen — bara 25 min med Cinderella från Slussen. Öppen hela säsongen från vår till sen höst. Restauranger, konsthantverksbutiker och härliga klippbad. Utmärkt dagsutflykt även för icke-båtfolk.',
 href: '/platser?kategori=naturhamn',
 meta: 'Innerskärgården · 25 min · Öppen apr–okt',
 },
]

export default function StockholmsSkargardPage() {
 const faqJsonLd = {
 '@context': 'https://schema.org',
 '@type': 'FAQPage',
 mainEntity: [
 {
 '@type': 'Question',
 name: 'Behöver man båtlicens för att segla i Stockholms skärgård?',
 acceptedAnswer: { '@type': 'Answer', text: 'Nej. I Sverige krävs inget obligatoriskt körkort eller licens för fritidsbåtar under 10 meter. Det finns dock inga ursäkter för att inte vidareutbilda dig — Svalla rekommenderar starkt någon form av segelutbildning eller att åka med en erfaren seglare innan du ger dig ut på egen hand.' },
 },
 {
 '@type': 'Question',
 name: 'Hur långt är det att segla från Stockholm till Sandhamn?',
 acceptedAnswer: { '@type': 'Answer', text: 'Det är ungefär 35 sjömil från Stockholms inlopp till Sandhamn — motsvarar omkring 65 kilometer. Med god vind och rätt segeltrim tar det mellan 5 och 8 timmar. Många seglare delar resan på två dagar och gör ett mellanstop i Vaxholm eller vid en ö i mellanskärgården.' },
 },
 {
 '@type': 'Question',
 name: 'Vilka är de bästa naturhamnarna i Stockholms skärgård?',
 acceptedAnswer: { '@type': 'Answer', text: 'Klasärterna på Ornö, Kyrkogårdsfjärden på Nämdö och de vackra vikarna runt Huvudskär räknas till de absolut vackraste ankringsplatserna. För nybörjare är Nämdö överhuvudtaget en säker miljö — lugnt vatten, fin natur och enkelt att ankra.' },
 },
 {
 '@type': 'Question',
 name: 'När öppnar krogarna i skärgården?',
 acceptedAnswer: { '@type': 'Answer', text: 'Majoriteten av restaurangerna i skärgården öppnar runt midsommar och stänger i slutet av augusti. Fjäderholmarna är ett undantag och håller öppet längre, ofta från våren och långt in på hösten.' },
 },
 ],
 }
 const breadcrumbJsonLd = {
 '@context': 'https://schema.org',
 '@type': 'BreadcrumbList',
 itemListElement: [
 { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://svalla.se' },
 { '@type': 'ListItem', position: 2, name: 'Stockholms skärgård', item: 'https://svalla.se/stockholms-skargard' },
 ],
 }
 return (
 <>
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
 <CategoryLanding
 heroGradient={['#1e5c82', '#2d7aad']}
 eyebrow="Stockholms skärgård"
 title="Guide till Stockholms skärgård"
 tagline="Sandhamn, Utö, Vaxholm, Möja och hundratals öar — avstånd, färjetider, naturhamnar och seglingstips för alla erfarenhetsnivåer."
 heroIcon={
 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
 <path d="M3 17l4-8 4 4 3-6 4 10" />
 <path d="M3 21h18" />
 </svg>
 }
 intro={
 <>
 <p>
 Stockholms skärgård är världsunik — <strong>30 000 öar och skär</strong>, hundratals krogar, naturhamnar och bryggor som öppnar varje sommar. Från Fjäderholmarna bara 15 minuter från Slussen till Landsort i södern finns ett helt universum av möjligheter för den som älskar att segla, ankra och uppleva Sveriges vackraste kustlandskap.
 </p>
 <p>
 Att hålla koll på allt var omöjligt förr. Var ligger den bästa restaurangen? Vilka naturhamnar är egna för en skärgårdsmiddag? Hur gick det för dina vänner på deras senaste segeltur? Svalla samlar allt på ett ställe — en app skapad av seglare för seglare.
 </p>
 <p>
 Logga dina turer med GPS och spara varje minne. Hitta testade restauranger, bryggor och ankringsplatser på en detaljerad karta. Följ andra seglare i realtid och dela dina bästa tips med ett community som förstår skärgårdslivet. Med Svalla blir varje säsong längre, varje tur mer minnesvärd.
 </p>
 <p>
 Oavsett om du är nybörjare som vill utforska Innerskärgården eller erfaren seglare på väg till Utö eller Sandhamn — Svalla är din guide genom Sveriges skönaste vatten.
 </p>
 </>
 }
 itemsTitle="Populära destinationer i Stockholms skärgård"
 itemsDescription="Sex klassiska öar — från Fjäderholmarna 25 minuter från Slussen till Sandhamn 35 sjömil ut i ytterskärgården."
 items={ITEMS}
 deeperContent={
 <>
 <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
 Stockholms skärgård — från innerskärgård till ytterskärgård
 </h2>
 <p>
 Stockholms skärgård är uppdelad i tre distinktiva områden, var och en med sin egen karaktär, framkomliga vägar och typ av äventyr. Oavsett din erfarenhetsnivå finns det perfekta destinationer och ankringsplatser väntar på dig.
 </p>

 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Innerskärgården — perfekt för nybörjare
 </h3>
 <p>
 Innerskärgården är skärgårdens mest lättillgängliga del. Hit tar det bara 15 minuter från Slussen till <strong>Fjäderholmarna</strong>, där du hittar flera restauranger och ett populärt naturhamnsbad. För första gången ute i skärgården? Fjäderholmarna är startpunkten.
 </p>
 <p>
 <strong>Vaxholm</strong> ligger bara drygt 30 minuter ut och erbjuder historia, kultur och gästhamn. Vaxholms fästning, ursprungligen byggd på 1500-talet av Gustav Vasa och ombyggd till sitt nuvarande utseende på 1800-talet, är väl värd ett besök. Restauranger och affärer gör det enkelt att tillbringa en hel dag här. <strong>Nämdö</strong> är nästa naturliga steg — fortfarande väl skyddat vatten men med mer avskildhet än Fjäderholmarna.
 </p>

 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Mellanskärgården — det bästa av två världar
 </h3>
 <p>
 Mellanskärgården är där skärgårdslivet blomstrar. Här hittar du möjligheter till längre segelrutter utan att behöva riskvärdera väder på samma sätt som ytterskärgården. En klassisk veckas segling från Stockholm kan ta dig till <strong>Möja</strong>, <strong>Runmarö</strong>, <strong>Ornö</strong> och <strong>Nämdö</strong> — varje ö med sina egna charm och naturhamnsekvivalent.
 </p>
 <p>
 Möja lockar med vildmark och enkla naturhamnar perfekta för meditation på sjön. Runmarö erbjuder bättre utsikt över öppen hav samtidigt som det fortfarande är väl skyddat. Ornö är känd för sina klassiska vikar — särskilt <strong>Klasärterna</strong> räknas bland de vackraste naturhamnarna i hela skärgården. Nämdö fulländar resan med <strong>Kyrkogårdsfjärden</strong>, en fjärd så fin att många seglare gör den till sitt favorithakningsställe.
 </p>

 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Ytterskärgården — för den erfarne seglaren
 </h3>
 <p>
 Ytterskärgården kräver respekt och planering, men belönar med oförglömliga upplevelser. <strong>Sandhamn</strong> är skärgårdens mest ikoniska destination — hem för Kungliga Svenska Segelällskapet (KSSS) och det legendariska Sandhamns Värdshus. Hit tar det ungefär 35 sjömil från Stockholm (ca 65 km), vilket med god vind tar 5–8 timmar att segl. Det är värt varje minut.
 </p>
 <p>
 <strong>Utö</strong> i söder är unik — en före detta gruva som idag är en pittoresk by med Utö Värdshus, där du kan njuta av middag med havet som doplats. <strong>Landsort</strong> ligger ännu längre söderut och är Sveriges sydligaste punkt till sjöss — en rå och vacker destination för erfarna seglare. <strong>Huvudskär</strong> erbjuder ungefär samma vildmark och känsla av äventyr längre västerut, med små vikar och ankringsplatser som bara finns på kartan för den som vet var de ska titta.
 </p>

 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Bästa säsongen för Stockholms skärgård
 </h3>
 <p>
 Säsongen i Stockholm börjar när vattnet blir isfritt, vanligtvis i april, men sommaren är när skärgården kommer till liv.
 </p>
 <p>
 <strong>Maj och juni</strong> är trevligt — luften är varm, men vattnet är fortfarande fritt från sommartourister. Restaurangerna börjar öppna, och du kan logga turer utan att konkurrera om ankringsplatser. <strong>Juli</strong> är högsäsongen. Alla är ute, vattnet är varmt, men det är viktigt att boka hamnar i god tid. Redan i slutet av juni kan populära platser som Sandhamn och Utö vara fulla.
 </p>
 <p>
 <strong>Augusti och september</strong> är hemligt tips för många seglare. Vattnet är som varmast, skolorna har börjat, och skärgården blir plötsligt lugn igen. Restauranger håller öppet fram till slutet av augusti, ofta med längre öppettider än tidigare på sommaren. Det är den perfekta tiden för en längre skärgårdstur där du kan ankra var du vill utan att stöta på tiotusentals andra båtar.
 </p>

 <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '28px 0 12px' }}>
 Vanliga frågor om Stockholms skärgård
 </h2>

 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Behöver man båtlicens för att segla i Stockholms skärgård?
 </h3>
 <p>
 Nej. I Sverige krävs inget obligatoriskt körkort eller licens för fritidsbåtar under 10 meter. Det finns dock inga ursäkter för att inte vidareutbilda dig — Svalla rekommenderar starkt någon form av segelutbildning eller att åka med en erfaren seglare innan du ger dig ut på egen hand. En grund i sjörätt, väderintolkning och navigation kan spara ditt liv.
 </p>

 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Hur långt är det att segla från Stockholm till Sandhamn?
 </h3>
 <p>
 Det är ungefär 35 sjömil från Stockholms inlopp till Sandhamn — motsvarar omkring 65 kilometer. Med god vind och rätt segeltrim tar det mellan 5 och 8 timmar. Många seglare delar resan på två dagar och gör ett mellanstop i Vaxholm eller vid en ö i mellanskärgården.
 </p>

 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Vilka är de bästa naturhamnarna i Stockholms skärgård?
 </h3>
 <p>
 <strong>Klasärterna på Ornö</strong>, <strong>Kyrkogårdsfjärden på Nämdö</strong> och de vackra vikarna runt <strong>Huvudskär</strong> räknas till de absolut vackraste ankringsplatserna. För nybörjare är Nämdö överhuvudtaget en säker miljö — lugnt vatten, fin natur och enkelt att ankra. Med Svalla kan du boka på många ställen i förväg, vilket gör planeringen enklare.
 </p>

 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 När öppnar krogarna i skärgården?
 </h3>
 <p>
 Majoriteten av restaurangerna i skärgården öppnar runt midsommar och stänger i slutet av augusti — samma årstid då sommarstugor fylls och segellingarna blomstrar. <strong>Fjäderholmarna</strong> är ett undantag och håller öppet längre än de flesta andra, ofta från våren och långt in på hösten. För de senaste öppettiderna och några restaurangers specialöppningar under hösten, kollar du bäst på Svalla eller att ringa i förväg.
 </p>

 <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '28px 0 12px' }}>
 Ta dig dit — kollektivtrafik
 </h2>
 <p>
 <strong>Till Fjäderholmarna</strong> avgår båtar med både Strömma (Cinderella) och <strong>Waxholmsbolaget</strong> från Slussen, ca 25 min. Waxholmsbolagets tur ingår i SL-kortet — ett billigare alternativ för den som redan har månadskort.
 </p>
 <p>
 <strong>Till Utö</strong> tar du Waxholmsbolaget från Nynäshamn, ca 1h15–1h30. Nynäshamn nås med <strong>pendeltåg linje 36</strong> från Stockholm Central, ca 1 timme.
 </p>
 </>
 }
 cta={{ label: 'Skapa gratis konto', href: '/logga-in' }}
 related={[
 { label: 'Cinderellabåten', href: '/cinderella-baaten' },
 { label: 'Dagsturer', href: '/dagsturer' },
 { label: 'Barnvänliga öar', href: '/barnvanliga-oar' },
 { label: 'Naturhamnar', href: '/naturhamnar' },
 { label: 'Segelrutter', href: '/segelrutter' },
 ]}
 />
 </>
 )
}
