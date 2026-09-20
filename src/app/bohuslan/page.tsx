import type { Metadata } from 'next'
import Link from 'next/link'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'
import { BOHUSLAN_ISLANDS } from '@/app/o/bohuslan-data'
import Icon from '@/components/Icon'
import { emojiToIcon } from '@/lib/iconMap'

export const metadata: Metadata = {
 title: 'Bohuslän — Segla västkusten, logga turer',
 description: 'Bohuslän segling: hummerkrogar, Marstrand, Smögen, naturhamnar & gästhamnar. Logga turer med Svalla från Göteborg till norska gränsen.',
 keywords: [
 'bohuslän segla',
 'västkusten båt',
 'bohuslän skärgård',
 'segla bohuslän',
 'hummer bohuslän',
 'marstrand',
 'marstrand guide',
 'smögen',
 'smögen segling',
 'fjällbacka',
 'kungshamn',
 'strömstad',
 'hamburgsund',
 'grebbestad',
 'naturhamn bohuslän',
 'hummer västkusten',
 'bohuslän naturhamnar',
 ],
 openGraph: {
 title: 'Bohuslän — Segla västkusten | Svalla',
 description: 'Logga dina båtturer och hitta de bästa platserna längs Bohusläns kust.',
 url: 'https://svalla.se/bohuslan',
 },
 alternates: { canonical: 'https://svalla.se/bohuslan' },
}

/*
 * 2026-09-20: fyra av sex kort ledde fel. "Karta över Bohuslän" lovade "alla
 * verifierade platser längs västkusten" — MÄTT: utforskaren har 0 platser i
 * Bohuslän. "Naturhamnar & ankring" gick till /platser?kategori=naturhamn som
 * redirectar till samma utforskare (0 naturhamnar). "Marstrand & Bohus Fästning"
 * gick till /logga-in — och Bohus fästning ligger i Kungälv; Marstrands är
 * Carlstens. Nu pekar korten på det som finns: 19 ö-sidor med hamnar.
 */
const ITEMS: LandingItem[] = [
 {
 icon: 'map',
 title: 'Öarna — 19 sidor med hamnar',
 description: 'Marstrand, Smögen, Koster, Käringön, Gullholmen, Åstol … varje ö med gästhamn, service och källa. Listan finns längre ner på sidan.',
 href: '/bohuslan#oar',
 },
 {
 icon: '🦞',
 title: 'Hummerkrogar',
 description: 'Säsong i september–oktober. Smögen, Fjällbacka, Grebbestad och Kungshamn är klassiska stoppunkter.',
 href: '/krogar-och-mat',
 },
 {
 icon: '',
 title: 'Segelrutter längs kusten',
 description: 'Från Göteborgs skärgård norrut — de klassiska lederna etapp för etapp.',
 href: '/segelrutter',
 },
 {
 icon: '',
 title: 'Naturhamnar och allemansrätten',
 description: 'Vad som gäller när du ankrar i en vik eller lånar en brygga — och var du inte får gå i land under häckningstiden.',
 href: '/hamnar-och-bryggor#naturhamnar',
 },
 {
 icon: '',
 title: 'Logga dina turer',
 description: 'Spara din färd längs kusten med bilder och dela med vänner som också seglar Bohuslän. Kräver gratis konto.',
 href: '/logga-in',
 },
 {
 icon: '',
 title: 'Marstrand & Carlstens fästning',
 description: 'Sommarens seglarmötesplats — Sveriges största gästhamn enligt Turistrådet Västsverige, och fästningen från 1660 ovanför.',
 href: '/o/marstrand',
 },
]

export default function BohuslanPage() {
 const faqJsonLd = {
 '@context': 'https://schema.org',
 '@type': 'FAQPage',
 mainEntity: [
 {
 '@type': 'Question',
 name: 'Hur seglar man från Stockholm till Bohuslän?',
 acceptedAnswer: { '@type': 'Answer', text: 'Du har två klassiska vägar: Göta kanal eller segling runt Skåne. Göta kanal går genom Sverige och tar 2–3 dagar — ett historiskt äventyr. Segling runt Skåne tar 5–7 dagar men är mer seglarvänligt med stopp längs hela östkusten.' },
 },
 {
 '@type': 'Question',
 name: 'Vad är bästa basporten för att utforska Bohuslän?',
 acceptedAnswer: { '@type': 'Answer', text: 'Göteborg är bäst för södra Bohuslän och Marstrand. Lysekil ligger perfekt i mitten och är en älskad ankringsbas. Strömstad är nordligaste basen och perfekt om du vill fokusera på Grebbestad, Fjällbacka och norrgränsen mot Norge.' },
 },
 {
 '@type': 'Question',
 name: 'Är Bohuslän svårt att navigera med båt?',
 acceptedAnswer: { '@type': 'Answer', text: 'Ja, det är relativt svårt. Rikliga klippor, grunt vatten och ett invecklat ölandskap gör Bohuslän till en navigeringskurs för entusiaster. Håll alltid ett öga på sjökortet. Vid dåligt väder är det bättre att stanna på en naturhamn och vänta.' },
 },
 {
 '@type': 'Question',
 name: 'Vilka är de mest kända öarna i Bohuslän?',
 acceptedAnswer: { '@type': 'Answer', text: 'Marstrand och dess fästning är utan tvekan mest kända. Tjörn och Orust är stora och historiska öar. Käringön och Gullholmen är mindre men älskade ankringsplatser. Norrut ligger Kosteröarna — Sveriges första marina nationalpark.' },
 },
 ],
 }
 const breadcrumbJsonLd = {
 '@context': 'https://schema.org',
 '@type': 'BreadcrumbList',
 itemListElement: [
 { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://svalla.se' },
 { '@type': 'ListItem', position: 2, name: 'Bohuslän', item: 'https://svalla.se/bohuslan' },
 ],
 }
 return (
 <>
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
 <CategoryLanding
 heroGradient={['#2d6a4f', '#3a8a65']}
 eyebrow="Bohuslän"
 title="Västkustens råa skärgård"
 tagline="Granitklippor, hummer och friska västanvindar — Svalla hjälper dig logga varje tur längs Bohusläns unika kust."
 heroIcon={
 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
 <circle cx="12" cy="12" r="10" />
 <path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z" />
 <path d="M2 12h20" />
 </svg>
 }
 intro={
 <>
 <p>
 Bohuslän är Skandinaviens mest besökta kustregion — och med god anledning. <strong>Öppen ocean, vass granit och ikoniska fisklägen</strong> ger en seglarmiljö som inte liknar något annat i Sverige. Från Göteborg skärgård i söder till norska gränsen vid Strömstad, stretchas hundra mil av klassisk svensk västkust över ett territorium fyllt av bergsgrund, djupt vatten och världskända ankringsplatser.
 </p>
 <p>
 Bohuslän är legendariskt bland seglare världen över. Här finns Marstrand med Carlstens fästning, där svenska seglare har mötts sedan 1700-talet. Här ligger Smögen och Fjällbacka med sina traditionella bryggor, och här öppnas världens bästa hummerkrogar varje september. Tidvattnet och vinden är förutsägbara, och naturhamnarna räcker till för både en veckas äventyr och tioåriga återkommande.
 </p>
 <p>
 Med Svalla loggar du dina etapper från Göteborg till norska gränsen, läser ö-sidorna med hamnar och källor, och delar dina turer med andra som seglar samma kust. Svalla visar inga tidvatten- eller djupuppgifter — det gör sjökortet.
 </p>
 <p>
 Oavsett om du seglar en helg eller en hel månad, är Bohuslän destinationen som aldrig blir gammal.
 </p>
 </>
 }
 itemsTitle="Bohuslän med Svalla"
 itemsDescription="Allt du behöver för en tur längs västkusten."
 items={ITEMS}
 deeperContent={
 <>
 {/* Öarna med hamnar — renderas ur BOHUSLAN_ISLANDS så listan följer datan. */}
 <h2 id="oar" style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
 Öar och hamnar i Bohuslän
 </h2>
 <p>
 {BOHUSLAN_ISLANDS.length} sidor, var och en med hamnar, service och källor. Antalet gästhamnar per ö är det vi hittills lagt in — inte allt som finns.
 </p>
 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10, margin: '12px 0 28px' }}>
 {BOHUSLAN_ISLANDS.map(o => (
 <Link key={o.slug} href={`/o/${o.slug}`} style={{
 display: 'flex', alignItems: 'center', gap: 12,
 padding: '12px 14px', borderRadius: 12,
 background: 'var(--white)', border: '1px solid var(--surface-3)',
 textDecoration: 'none', boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
 }}>
 <span style={{ flexShrink: 0, color: 'var(--sea)' }} aria-hidden><Icon name={emojiToIcon(o.emoji)} size={20} /></span>
 <div style={{ flex: 1, minWidth: 0 }}>
 <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)' }}>{o.name}</div>
 <div style={{ fontSize: 12, color: 'var(--txt3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
 {o.harbors.length > 0 ? o.harbors.map(h => h.name).join(' · ') : 'Ingen hamn inlagd ännu'}
 </div>
 </div>
 <span style={{ color: 'var(--sea)', fontWeight: 700, flexShrink: 0 }}>→</span>
 </Link>
 ))}
 </div>

 <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
 Ta dig dit — kollektivtrafik
 </h2>
 <p>
 <strong>Till Marstrand</strong>: Västtrafik buss 302 eller 312 från Göteborgs centralstation till Koön (~1h), sedan Marstrandsfärjan (ingår i Västtrafik-biljetten) till ön. Bil är förbjuden på Marstrandsön.
 </p>
 <p>
 <strong>Till Smögen/Kungshamn</strong>: Västtrafik buss 870 eller 871 från Uddevalla. <strong>Till Fjällbacka och Hamburgsund</strong>: Västtrafik buss 875. <strong>Till Grebbestad</strong>: buss 875 eller 878 från Tanumshede. <strong>Till Strömstad</strong>: tåg från Göteborg ca 1,5h (SJ/Västtrafik), sedan lokalbuss till skärgården.
 </p>

 <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
 Södra Bohuslän — från Göteborg norrut
 </h2>
 <p>
 Göteborg är utgångspunkten för många. Från staden seglar du in i ett klassiskt skärgårdslandskap med hundra små öar, klippor och hemliga vikar. Men redan efter några sjömil blir bilden ännu vackrare.
 </p>
 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Marstrand och Carlstens fästning
 </h3>
 <p>
 Marstrand är Sveriges seglarvärld i miniatyr. Ön, känd sedan 1600-talet som befäst position, lockar tiotusentals seglare varje sommar. <strong>Carlstens fästning</strong> dominerar öns bergiga västra strand och är idag en populär besöksmål och foto-spot.
 </p>
 <p>
 Juli är Mastrands högsäsong — så högsta säsong att du måste boka gästhamns plats flera veckor i förväg för att få ett ställe. Framboende båtar ligger nästan kant i kant. Detta är ofta Sveriges tätaste seglartrafik. Alternativ: ankar på naturhamnarna runt ön eller använd en av de mindre privata bryggorna.
 </p>
 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Tjörn och Orust
 </h3>
 <p>
 Här ligger två av västkustens viktigaste öar. Tjörn är känt för sin <strong>varvskultur</strong> — dessa små båtbyggerier är bevarade som museer och minnesmärken över 200 års båttillverkning. Orust är större och har bättre infrastruktur för seglare.
 </p>
 <p>
 Missa inte <strong>Nordiska Akvarellmuseet</strong> på Tjörn — en institution för västerländsk akvarellkonst och perfekt regndagsbesök när väder inte låter dig segla vidare.
 </p>

 <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '32px 0 12px' }}>
 Norra Bohuslän — Smögen och Fjällbacka
 </h2>
 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Smögen och Smögenbryggan
 </h3>
 <p>
 Smögen är Bohusläns mest fotograferade fiskeläge — med god anledning. En smal, långsträckt brygga, <strong>Smögenbryggan</strong>, löper utmed kanten och fylls på sommaren av turister, konsthandlare och restauranger. På ena sidan open ocean, på andra sidan små båtar och hummerlådor.
 </p>
 <p>
 Hummerlådan är det klassiska transportmedlet för levande hummer på västkusten. Du möter den här överallt i september och oktober — både i restaurants och som dekorativ föremål för turistfotografier.
 </p>
 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Fjällbacka och Ingrid Bergmans ö
 </h3>
 <p>
 Fjällbacka är födelseorten för kriminalförfattaren <strong>Camilla Läckberg</strong>. Hennes böcker har gjort denna lilla stad världskänd bland skandinaviska kriminalläsare. Men Fjällbacka är också känt för något annat — <strong>Ingrid Bergmans ö</strong>, där den svenska filmstjärnan tillbringade somrar.
 </p>
 <p>
 En kort segeltur från Fjällbacka ligger den lilla privata ön som Bergman älskade. Det är en vacker dag-segling och en vacker anledning att stanna här några dagar.
 </p>
 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Grebbestad, Hamburgsund och Strömstad
 </h3>
 <p>
 Fortsätt norrut och du kommer till Grebbestad — hemmet för <strong>ostron från västkusten</strong>. Här odlas både musslor och ostron i stora mängder, och restauranger längs stranden serverar färska räkor och ostron direkt från vattnet.
 </p>
 <p>
 Hamburgsund och slutligen <strong>Strömstad</strong> vid norska gränsen markerar norddelen av Bohuslän. Strömstad är en välbyggd seglarbas med moderna gästhamnar och många restauranger.
 </p>

 <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '32px 0 12px' }}>
 Hummersäsongen — september och oktober
 </h2>
 <p>
 Hummersäsongen öppnar andra onsdagen i september — ett datum som många seglare antecknar röd i kalendern. Då släpps tiotusentals färska humrar från fiskare runt västkusten, och restauranterna börjar sina klassiska hummerkokningar.
 </p>
 <p>
 De bästa krogarna för hummerupplevelse ligger i <strong>Kungshamn, Smögen, Lysekil och Grebbestad</strong>. Här får du autentisk västkustkvalitet — malen hummar med smör, mänad från källan samma morgon. Mängden gäster är stor — <strong>boka bord i god tid</strong> om du vill sitta någonstans populärt.
 </p>
 <p>
 September är även Bohusläns mest stabila väderperiod för segling. Vädret är oftast stadigt med nordväst eller sydväst vind, temperaturen är behaglig (15–20°C i luften, 13–15°C i vattnet), och trycket på gästhamnarna börjar släppa efter semesterkaos.
 </p>

 {/* Sektionen "Tidvatten och navigering" togs bort 2026-09-20 (Toms delegation): 20–40 cm
     tidvatten och råd om att "planera passering mot tidvattnets riktning" saknade källa
     och var resonerat, inte mätt. Kvar: det som inte behöver en siffra. */}
 <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '32px 0 12px' }}>
 Navigering längs Bohuslän
 </h2>
 <p>
 <strong>Navigering är kritisk här.</strong> Bohuslän är fyllt av klippor och grund. Många passager är endast lämpliga för seglare med god sjökortskompetens. Svalla är inget sjökort och visar inga djup. Navigera efter sjökortet och använd GPS som stöd, inte som enda guide.
 </p>

 <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '32px 0 12px' }}>
 Vanliga frågor om segling i Bohuslän
 </h2>
 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Hur seglar man från Stockholm till Bohuslän?
 </h3>
 <p>
 Du har två klassiska vägar: <strong>Göta kanal</strong> eller <strong>segling runt Skåne</strong>.
 </p>
 <p>
 Göta kanal går genom Sverige från Stockholms skärgård till Göteborg och tar 2–3 dagar om du seglingsschemat är strikt. Det är den klassiska sommarrutten och väl värd varje timme — ett historiskt äventyr genom Sveriges hjärta. Slussarna är älskade av seglare och du möter nya båtar längs vägen.
 </p>
 <p>
 Segling runt Skåne tar 5–7 dagar beroende på väder och valen du gör längs vägen. Du seglar norrut genom Östersjön, runt Gotland, ner längs östkusten av Skåne och sedan västerut in i Kattegatt. Det är längre men många tycker att det är mer seglarvänligt.
 </p>
 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Vad är bästa basporten för att utforska Bohuslän?
 </h3>
 <p>
 Det beror på vilken del du vill utforska:
 </p>
 <p>
 <strong>Göteborg</strong> är bäst för södra Bohuslän och Marstrand. <strong>Lysekil</strong> ligger perfekt i mitten och är en älskad ankringsbas. <strong>Strömstad</strong> är nordligaste basen och perfekt om du vill fokusera på Grebbestad, Fjällbacka och norrgränsen mot Norge.
 </p>
 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Är Bohuslän svårt att navigera med båt?
 </h3>
 <p>
 Ja, det är relativt. Rikliga klippor, grund vatten och ett invecklat ölandskap gör Bohuslän till en navigeringskurs för entusiaster. Många seglare älskar denna komplexitet — det tvingar dig att vara uppmärksam och få bättre sjökortskompetens.
 </p>
 <p>
 Håll alltid ett öga på sjökortet. Missa inte grunt vatten genom att titta på djupkort. Vid dåligt väder är det bättre att stanna på en naturhamn och vänta än att försöka navigera genom små sund i dimma eller mörker.
 </p>
 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Vilka är de mest kända öarna i Bohuslän?
 </h3>
 <p>
 <strong>Marstrand</strong> och dess fästning är utan tvekan mest känd. <strong>Tjörn</strong> och <strong>Orust</strong> är stora och historiska öar. <strong>Käringön</strong> och <strong>Gullholmen</strong> är mindre men älskade ankringsplatser.
 </p>
 <p>
 Norrut ligger <strong>Kosteröarna</strong> — en nationalpark och ett måste för alla seglare. Det är Sveriges första marina nationalpark och är känd för sitt rena vatten och överraskande biodiversitet.
 </p>
 </>
 }
 cta={{ label: 'Skapa gratis konto', href: '/logga-in' }}
 related={[
 { label: 'Segelrutter', href: '/segelrutter' },
 { label: 'Hamnar & bryggor', href: '/hamnar-och-bryggor' },
 { label: 'Aktiviteter', href: '/aktiviteter' },
 { label: 'Alla destinationer', href: '/resmal' },
 ]}
 />
 </>
 )
}
