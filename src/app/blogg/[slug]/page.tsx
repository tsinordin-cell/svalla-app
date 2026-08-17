import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import SvallaLogo from '@/components/SvallaLogo'
import RelatedPosts from '@/components/RelatedPosts'
import { getRelatedPosts } from '@/lib/postRelated'
import Icon from '@/components/Icon'
import EmailSignup from '@/components/EmailSignup'
import CopyLinkButton from '@/components/CopyLinkButton'

// ─── Post content ───────────────────────────────────────────────────────────

type Post = {
 title: string
 excerpt: string
 category: string
 date: string
 readTime: string
 emoji: string
 content: string
 tags: string[]
 faqs?: Array<{ q: string; a: string }>
 updatedAt?: string
}

const POSTS: Record<string, Post> = {

 'basta-restaurangerna-sandhamn': {
 title: 'De 5 bästa restaurangerna på Sandhamn 2026',
 excerpt: 'Sandhamn är seglingscentrum och skärgårdsklassiker. Men vilka ställen är verkligen värda ett besök?',
 category: 'Mat & dryck',
 date: '2026-04-10',
 readTime: '5 min',
 emoji: '',
 tags: ['Sandhamn', 'Restauranger', 'Sommar'],
 content: `
Sandhamn är ett av Stockholms skärgårds mest välkända namn. Segelbåtar i hamnen, vita trävillor och ett restaurangutbud som håller oväntat hög nivå för att vara ute i skären. Men med flera alternativ att välja mellan – var ska du äta?

## Seglarhotellets Restaurang

Seglarhotellet har legat på Sandhamn sedan 1897 och restaurangen lever upp till historien. Kök med fokus på svenska råvaror – färsk fisk från lokala fiskare, handplockade kantareller och en ostbricka som är värd besöket i sig. Boka bord i förväg under högsäsong, den är fullbokad de flesta kvällar i juli.

**Tips:** Be om ett bord mot hamnen. Utsikten mot inkommande segelbåtar i solnedgången är svårslagen.

## Sandhamns Värdshus

Det klassiska värdshuset vid färjebryggan är det första du möter när du kliver av båten. Enkel, ärlig husmanskost – fisksoppa, räkor och smörgåsar. Perfekt för lunch efter en lång seglingsdag. Priserna är rimliga, servicen snabb.

## Dykarbaren

Lite mer avslappnad stämning nere vid dykarna. Bryggserveringen med hamburgare, öl och havsutsikt är sommarens bästa kombination. Öppnar tidigt och stänger sent – populär för sundowner efter seglingen.

## Sandhamns Krog

Inne i byn hittar du den lilla krogens som är lite av en insider-favorit. Inte fullt så turistigt, mer lokalt. Menyn varierar med säsongen – fråga alltid vad som är färskast in den dagen.

## Bryggcafé 7an

För frukost eller fika är Bryggcafé 7an oöverträffat. Nybakat bröd, smör och skärgårdsmarmelad med utsikt mot Sandhamnsfjärden. Öppnar tidigt – passa på innan lunch-turisterna anländer.

## Praktisk info

Sandhamn nås med Waxholmsbåten från Strömkajen (ca 2,5 timmar) eller med snabbgående båt från Stavsnäs (ca 40 min). Under sommarsäsongen är det kö vid populäraste restaurangerna – boka i förväg när det går.
 `,
 },

 'kajak-stockholms-skargard-nyborjare': {
 title: 'Kajak i skärgården – guide för nybörjaren',
 excerpt: 'Aldrig paddlat men vill prova? Här är allt du behöver veta: utrustning, säkerhet, bra startsträckor och vad du inte får missa.',
 category: 'Aktiviteter',
 date: '2026-03-28',
 readTime: '8 min',
 emoji: '',
 tags: ['Kajak', 'Nybörjare', 'Paddling'],
 content: `
Stockholms skärgård är ett av världens bästa paddlingslandskap. 30 000 öar, skyddade vikar och ett unikt allemansrätt som låter dig paddla nästan var du vill och övernatta i naturen. Som nybörjare är det lätt att komma igång – men det finns saker du behöver veta innan du sätter dig i båten.

## Utrustning

<!-- UPPSKATTNING: ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör (2026-08) -->
Du behöver inte köpa kajak direkt. I skärgården finns det uthyrning vid de flesta större hamnar och startpunkter. Räkna med 400–600 kr per dag för en havskajak.

**Grundutrustning du behöver:**
- Flytväst (obligatorisk, aldrig kompromiss)
- Paddeljacka eller våtdräkt vid kall väderlek
- Vattentäta påsar för kläder och telefon
- Sjökort eller sjökortsapp (Navionics är bra)
- Vatten och mat för minst en dag extra

## Säkerhet

Havet kan vara opålitligt, även i skärgården. Några grundregler:

**Kontrollera vädret** innan du ger dig ut. Vindstyrka 5+ (ca 8 m/s) är krävande för nybörjare. Titta alltid på SMHI:s väderprognos och var uppmärksam på hur vädret förändras under dagen.

**Paddla inte ensam** de första gångerna. Ta med ett sällskap eller gå på en guidad tur.

**Håll kusten nära.** Det ser lugnt ut att paddla tvärs över en fjärd, men det kan snabbt ändras. Håll dig längs kusterna och ta skyddade rutter.

**Meddela någon** vart du ska och när du beräknas vara tillbaka.

## Bästa startsträckor för nybörjare

### Fjäderholmarna – Nacka
En av de enklaste och kortaste turerna. Paddla ut från Nacka strand och ha Fjäderholmarna som mål. Skyddad vattenväg, fin ö att ta lunchrast på.

### Furusund – Blidö
Norra Stockholms skärgård (Roslagen) runt Blidö är idealt för nybörjare. Lugnt vatten, korta sträckor och vackra naturhamnar. Furusund nås enkelt med bil eller buss från Norrtälje.

### Dalarö – Ornö
Söder om Stockholm, med paddling längs Ornös västra sida. Kuperat, naturskönt och med möjlighet att övernatta i naturhamnarna.

## Vad du inte får missa längs vägen

- **Sälarna** – de gillar att titta på kajakpaddlare. Håll avstånd men njut av mötet.
- **Naturhamnarna** – ta rast i en skyddad vik, laga mat och bada. Det är det allra bästa med kajak.
- **Soluppgången** – paddla ut tidigt en klar morgon. Det finns inget bättre.

## Guideturer och kurser

Rekommendation för nybörjare: boka en halvdagstur med en certifierad guideverksamhet första gången. Du lär dig grunderna på ett säkert sätt och får tipsen om de bästa ruttoma. Efteråt kan du med god marginal ge dig ut på egna äventyr.
 `,
 },

 'dolda-parlor-moja': {
 title: 'Möjas dolda pärlor – bilfri ö med äkta skärgårdsstämning',
 excerpt: 'Möja är en av skärgårdens bäst bevarade hemligheter. Bilfri, lugn och genuint vacker.',
 category: 'Öguide',
 date: '2026-03-15',
 readTime: '6 min',
 emoji: '',
 tags: ['Möja', 'Bilfri ö', 'Skärgård'],
 content: `
Det finns öar i Stockholms skärgård som alla vet om – Sandhamn, Fjäderholmarna, Vaxholm. Och sedan finns det Möja. Bilfri, lagom svårtillgänglig och med en genuinitet som turistifierade öar saknar. Det är precis det som gör Möja till en av skärgårdens finaste hemligheter.

## Varför Möja?

Möja är Stockholms skärgårds näst folkrikaste ö, men stämningen är allt annat än stadsmässig. Inga bilar, inga köer, inga hotellkedjor. Istället: cyklar, roddbåtar och ett tempo som påminner dig om vad sommaren egentligen är till för.

Ön är stor nog att utforska – drygt 12 km lång – men liten nog att inte kännas anonym. Här vet folk vem du är när du kommit tillbaka andra gången.

## Komma dit

Waxholmsbåten från Strömkajen tar ca 2,5 timmar. Alternativet är att ta bilen till Stavsnäs och ta Waxholmsbåten därifrån – då tar det ca 1 timme. Under högsäsong går det fler avgångar, men kolla tidtabellen noga på waxholmsbolaget.se.

## Vad du ska göra

**Hyr cykel vid bryggan.** Det är det självklara sättet att ta sig runt ön. Cykelvägarna är platta och fina längs kusterna, lite kuperade inne i skogen.

**Bada vid Möja Hälludden.** En av öns finaste badplatser med klippor och klart vatten. Lite promenad från huvudbryggan men väl värt det.

**Fika hos Möja Bageri.** Genuint lokalt bageri med kanelbullar som smakar som de ska smaka.

**Naturhamnen i söder.** Ta dig till den skyddade naturhamnen i södra delen av ön. Sälar och storskarvar håller ofta till här.

## Äta på Möja

Möja Wärdshus är det självklara valet – klassisk husmanskost med skärgårdsinfluenser. Räkor, fisk och en kall öl i sommarkvällen vid vattnet. Boka bord om du kommer en lördagskväll.

Det finns också ett litet sommarcafé vid norra bryggan som serverar smörgåsar och glass.

## Övernatta

Flera stuguthyrningar och ett mindre vandrarhem finns på ön. Det populäraste alternativet är att hyra en av de gamla fiskarstugorna nära vattnet – boka tidigt, de är fullbokade från mars.

## Rätt tid att åka

Möja är vackert hela sommaren, men allra bäst är det i juni (innan massornas ankomst) och i september när turister försvunnit och lugnet återvänder. Höst på Möja är en underskattad upplevelse.
 `,
 },

 'bransle-ankring-skargard': {
 title: 'Bränsle och ankringsplatser i ytterskärgården',
 excerpt: 'Planerar du en längre tur mot Landsort eller Sandhamn? Komplett genomgång av bränslehamnar och naturhamnar.',
 category: 'Praktiskt',
 date: '2026-03-01',
 readTime: '7 min',
 emoji: '⛽',
 tags: ['Bränsle', 'Ankring', 'Planering'],
 content: `
En längre båttur i ytterskärgården kräver planering. Framförallt kring bränsle – det finns platser att köpa diesel och bensin, men de är inte tätt placerade och har ofta begränsade öppettider. Planerar du fel kan det bli dyrt eller besvärligt.

## Bränslehamnar längs Stockholmsleder

### Vaxholm
Vaxholms hamn har bränslestationer med diesel och bensin. Öppet nästan dygnet runt under sommarsäsongen med kortautomater. Bra startpunkt att toppa tanken innan du ger dig ut i skärgården.

### Furusund
Furusund är en viktig knutpunkt på Furusundsleder. Bränsle finns vid gästhamnen. Populärt stopp för båtar på väg norrut mot Grisslehamn eller söderut mot Stockholm.

### Sandhamn
Sandhamn har en välutrustad hamn med bränsle, el och vattenförsörjning. Dyrt i förhållande till fastlandet – tanka hellre i Stavsnäs eller Dalarö om du passerar dem.

### Dalarö
Söder om Stockholm och ett naturligt stopp för båtar på väg mot Landsort. Välutrustad hamn med bränsle, dusch och restaurang.

### Nynäshamn
Längst söderut på Stockholmssidan – Nynäshamns gästhamn är välutrustad och prisvärd. Bra sista stopp innan Landsort.

## Naturhamnar att ankra i

Naturhamnar är platser utan fast installation – du ankrar fritt eller förtöjer vid klipporna med egna förtöjningsringar.

**Fejan** – en av skärgårdens vackraste naturhamnar. Skyddad vik norr om Furusund, grön ö, klart vatten.

**Rödlöga** – lite längre ut men väl värt resan. Skyddad inre hamn med plats för ett tiotal båtar.

**Gillöga** – yttre skärgårdens pärlor. Klippor, hav och solnedgångar utan like. Inte skyddad vid hård vind.

**Huvudskär** – det yttersta lotshuset, nu naturreservat. Enkel ankring på läsidan, stämningsfull övernattning.

## Allemansrätten till sjöss

Du får ankra fritt i naturhamnar upp till ett par nätter. Allemansrätten gäller men med respekt: lämna inget skräp, ta inte ved från levande träd och respektera fågelskyddsområden.

## Praktiska tips

- Svalla-kartan visar bränsleplatser markerade med ⛽ — filtrera på kategorin för att hitta närmaste station längs din rutt.
- Kontrollera alltid öppettider online innan – öppettider varierar kraftigt med säsong.
- Ha alltid en reservdunk ombord för de sista milen.
- Vattenbryggor är gratis de första 12 timmarna på de flesta platser – kolla lokala skyltar.
 `,
 },

 'sommar-skargard-tips': {
 title: '10 saker du måste göra i skärgården i sommar',
 excerpt: 'Från gryningsfika vid en klippa till kvällsseglingen med solnedgång. Vår lista över årets bästa skärgårdsupplevelser.',
 category: 'Inspiration',
 date: '2026-02-14',
 readTime: '4 min',
 emoji: '☀️',
 tags: ['Sommar', 'Tips', 'Inspiration'],
 content: `
Det är lätt att ta skärgården för given om man bor i Stockholm. Men det finns upplevelser som aldrig blir gamla – som alltid levererar, oavsett hur många somrar du haft i skären. Här är tio sådana.

## 1. Se soluppgången från en klippa

<!-- UPPSKATTNING: ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör (2026-08) -->
Ställ klockan på 4:30. Ta med termos och en filt. Sitt på en klippa och se hur skärgården vaknar. Det är tyst på ett sätt som inte existerar resten av dagen. En upplevelse du inte glömmer.

## 2. Käka räkor direkt från båten

Räkor inköpta från en fiskebåt ute i skären, ätna med fingrarna på däck med havet runt om. Det finns ingenting enklare och ingenting bättre.

## 3. Bada naket i en naturhamn

Hitta en liten vik utan grannar. Kasta kläderna och hoppa i. Befrielse i ordets allra enklaste mening.

## 4. Paddla kajak i gryningen

Vattnet är stilla, dimman lyfter och du är ensam med dina tankar och havsfåglarna. Kajak i gryningen är skärgårdens bäst bevarade hemlighet.

## 5. Grilla på en skär

Hitta en liten klippa ute i ytterskärgården. Grilla hamburgare eller fisk. Sommar distillerat till ett enda ögonblick.

## 6. Övernatta i en naturhamn

Förtöj vid en klippa, sov ombord eller tälta. Vakna till ljudet av vatten mot skrovet och ett morgonkaffe med havsutsikt.

## 7. Ta en gammal ångbåt

Waxholmsbolagets äldre båtar är en del av skärgårdshistorien. Ta en tur bara för resan skull – inte destinationen.

## 8. Besök en fyr

Landsort, Söderarm, Svenska Björn. Fyrarnas historia är skärgårdens historia. Flera är möjliga att besöka och ha picknick vid.

## 9. Hitta ett ställe som inte finns på Google Maps

Fråga en lokal. Använd Svalla. Hitta restaurangen, badplatsen eller naturhamnen som inte är med i reseguiden. Det är alltid den bästa platsen.

## 10. Titta på stjärnorna

Ute i ytterskärgården, långt från Stockholms ljusföroreningar, är natthimlen ett skådespel. Ta med en filt och ligg på klippan. Sommaren är kortvarig – det är värt varje stjärna.
 `,
 },

 'fjaderholmarna-dagstur': {
 title: 'Fjäderholmarna – perfekt dagstur från Stockholm',
 excerpt: 'Bara 25 minuter från Strandvägen och du är i skärgården. Fjäderholmarna är den perfekta introduktionen.',
 category: 'Öguide',
 date: '2026-01-30',
 readTime: '5 min',
 emoji: '',
 tags: ['Fjäderholmarna', 'Dagstur', 'Stockholm'],
 content: `
Om du aldrig sett Stockholms skärgård men vill starta försiktigt – Fjäderholmarna är din ö. 25 minuters båtresa från Strandvägen, öppen sommarsäsong och ett litet ösamhälle med restauranger, hantverk och promenadstråk.

## Ta sig dit

<!-- UPPSKATTNING: ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör (2026-08) -->
Båt från Strandvägen, Nybroplan eller Allmänna Gränd. Sommarsäsong med täta avgångar (var 30:e minut under högtrafik). Pris ca 125 kr tur och retur. Inga förkunskaper behövs – det är en riktig båt som Waxholmsbolaget kör.

## Vad du gör på Fjäderholmarna

Öarna är fyra till antalet – bara Stora Fjäderholmen är tillgänglig för besökare. Det räcker gott.

**Promenera runt ön.** Det tar ca 45 minuter att gå runt hela Stora Fjäderholmen längs strandstigen. Fantastisk utsikt, historiska byggnader och fågellivet som strömmar in från havet.

**Hantverksgallerierna.** Unika butiker med lokalt hantverk – keramik, smycken, textil. Inte turistfällan du kanske tror utan genuint gott hantverk.

**Akvariet.** Litet men välgjort akvarium med Östersjöns fisk och havsliv. Bra för barn, intressant för vuxna.

## Äta och dricka

**Fjäderholmarnas Krog** – det självklara alternativet för en riktigt lunch eller middag. Havsutsikt, fisk och skaldjur och en av Stockholms bästa sommarterrasser. Boka bord.

**Rökeriet** – lite mer avslappnat, fokus på rökt fisk och skaldjur. Perfekt för en enkel lunch.

**Båthuset Bar & Grill** – drinkar och snabbmat nere vid bryggan. Bra sundowner-plats.

## Bästa tid att åka

Morgon eller sen eftermiddag – undvik mitt på dagen i juli när dagstursturister är som flest. En kvällstur med middag på Fjäderholmarnas Krog och sista båten hem är en av Stockholms bästa sommarupplevelser.

**Tips:** Köp returbiljett ombord eller via appen. Kontrollera avgångstider noga – sista båten tillbaka kan vara tidigare än du tror.
 `,
 },

 'vaxholm-guide': {
 title: 'Vaxholm – skärgårdsstadens kompletta guide',
 excerpt: 'Vaxholm är porten till skärgården. En stad med fästning, historia, fantastiska restauranger och direktbåt från Strömkajen.',
 category: 'Öguide',
 date: '2026-04-05',
 readTime: '6 min',
 emoji: '',
 tags: ['Vaxholm', 'Fästning', 'Dag- eller weekendtur'],
 content: `
Vaxholm kallas för porten till skärgården – och det är en rättvis beskrivning. Staden är startpunkten för Waxholmsbåtarna ut i Stockholms skärgård, men förtjänar att besökas i sig. Fästningen på holmen mitt i sundet, trähusen längs kanalen, restaurangerna vid vattnet. En dag i Vaxholm räcker inte.

## Ta sig dit

**Båt:** Waxholmsbåten från Strömkajen, ca 1,5 timmar. En av de trevligaste turerna i sig.

**Buss:** 670 från Tekniska Högskolan, ca 1 timme. Billigare men missar skärgårdsupplevelsen.

**Bil:** E18 norrut mot Norrtälje, avfart mot Vaxholm. Ca 45 min från centrala Stockholm.

## Vaxholms fästning

Fästningen på Vaxholmen är Stockholms skärgårds bäst bevarade historiska monument. Ursprungligen byggd under 1500-talet av Gustav Vasa och ombyggd till sitt nuvarande utseende 1833–63. Idag museum – ta färjan ut till fästningen (5 minuters tur) och vandra runt i historien.

<!-- UPPSKATTNING: ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör (2026-08) -->
Militärmuseet på fästningen berättar om skärgårdens försvar under 400 år. Öppet sommarsäsong, biljett ca 120 kr.

## Stadsvandring

Vaxholm är liten nog att gå på en timme. Gå längs Hamngatan, titta in i antikhandlarna och de gamla trädgårdarna. Hamnen med sina träbryggor och vita trävillor är fotogenisk på ett sätt som känns äkta snarare än arrangerat.

**Rådhuset** från 1925 är en vacker byggnad värd att stanna vid. **Hembygdsgården** visar hur livet i skärgården sett ut historiskt.

## Äta i Vaxholm

**Waxholms Hotell** – anrika och välkomnande. Klassisk skärgårdsmeny med fokus på lokala råvaror. Utsiktsservering mot sundet.

**Hamnkrogen** – brasserieformat vid hamnen. Räkor, fisk och bra viner. En av stadens bästa terrasser.

**Söderby Gårdsbutik & Café** – lite utanför centrum men väl värd resan. Lokala produkter och hembakt i en gammal ladugård.

## Praktisk info

Vaxholm är bra som dagstur men ännu bättre som övernattning. Waxholms Hotell och ett par bed & breakfast tar emot gäster. På sommaren är det levande in på kvällen – ta en promenad efter middagen när turister åkt hem och staden är sig igen.
 `,
 },

 'uto-guide': {
 title: 'Utö – södra skärgårdens kronjuvel',
 excerpt: 'Utö har allt: cykelleder, gruvhistoria, havsbastu, topprestaurang och fantastiska naturhamnar.',
 category: 'Öguide',
 date: '2026-03-22',
 readTime: '7 min',
 emoji: '🚲',
 tags: ['Utö', 'Cykling', 'Havsbastu'],
 content: `
I södra Stockholms skärgård (Haninge kommun, cirka 16 km nordost om Nynäshamn) ligger Utö. Det är en av skärgårdens mest kompletta öar – historia, natur, mat, aktiviteter och infrastruktur som gör ett längre besök möjligt utan att sakna fastlandets bekvämligheter.

## Historien under marken

Utö har gruvor. Järnmalmsbrytning pågick här från 1100-talet till 1879 – en av Sveriges äldsta kända gruvdrifter. Gruvmuseet berättar historien och det går faktiskt att gå ner i de gamla schakten. En unik upplevelse som sätter ön i ett helt annat perspektiv.

## Cykla runt Utö

<!-- UPPSKATTNING: ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör (2026-08) -->
Utö är bilfri för genomfartstrafik. Det gör ön perfekt för cykling. Hyr cykel vid bryggan (ca 150 kr/dag) och följ de markerade lederna som täcker hela ön.

**Södra ruten** – längs kusten söderut mot Utö fyr. Ca 10 km, fin utsikt och lämplig för lite kondition.

**Norra ruten** – mot Gruvbyn och upp mot norra udden. Mer kuperad, fint skogslandskap.

## Utö Värdshus

Värdshusets restaurang är ett av skärgårdens bästa – utan tvekan. Kocken Henrik Norström har arbetat med svenska råvaror på ett seriöst sätt och menyn speglar vad skärgården producerar varje säsong. Priser i premiumsegmentet men väl motiverade.

Boka bord minst en vecka i förväg under högsäsong.

## Havsbastu

Utö har en av skärgårdens bäst belägna havsbastun – direkt vid vattnet med klockren utsikt mot öppet hav. Öppen för gäster på värdshuset och för dagsgäster mot en avgift. Perfekt kombination med ett nattvak i naturhamnen.

## Naturhamnarna

Öster om Utö, mot ytterskärgården, öppnar sig en rad fantastiska naturhamnar. Örnhaken, Lövholmen och Hässelbyholme är favoritplatser för segelbåtar och motorbåtar. Ankra fritt, bada och grilla.

## Ta sig dit

**Pendelfartyg** från Nynäshamn, ca 1,5 timmar. Nynäshamn når du med pendeltåget från Stockholm.

**Direkt båt** från Strömkajen sommarsäsong – ca 3 timmar men en fin tur i sig.

Rekommendation: res dit på fredag kväll, stanna lördag-söndag. Det är inte rimligt att se Utö ordentligt på en dagstur.
 `,
 },

 'segling-nyborjare-guide': {
 title: 'Segla för första gången – allt du behöver veta',
 excerpt: 'Drömmer du om att ta ut en segelbåt i skärgården? Ärlig guide för den som aldrig seglat.',
 category: 'Aktiviteter',
 date: '2026-03-18',
 readTime: '9 min',
 emoji: '',
 tags: ['Segling', 'Nybörjare', 'Hyrbåt'],
 content: `
Segling ser svårt ut utifrån. Det är det inte – men det kräver lite grundkunskap och respekt för havet innan du ger dig ut. Den goda nyheten: med rätt förberedelse kan du segla en enklare båt i skyddad skärgård redan efter en helgkurs.

## Börja med en kurs

<!-- UPPSKATTNING: ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör (2026-08) -->
Seglingen rätt: börja med en SXK (Segel sällskapet för att lära sig), KSSS eller liknande klubbs nybörjarkurs. En tvådagars grundkurs kostar ca 2 000–3 500 kr och lär dig det du behöver för att ta ut en hyrbåt i lugn skärgård.

Du lär dig: kryssa (segla mot vinden), falla (segla med vinden), revning (minska segel i vind), förtöja och lägga till.

## Hyra segelbåt

Det finns flera hyrbåtsföretag runt Stockholm. Vanligast är att hyra en 28–32 fots segelbåt – tillräckligt stor för 4 personer och tillräckligt liten för att hanteras av en nybörjare.

<!-- UPPSKATTNING: ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör (2026-08) -->
Räkna med 5 000–10 000 kr per vecka beroende på säsong och båtstorlek. De flesta hyrbåtsföretag kräver ett enklare certifikat eller intygad segelerfarenhet.

## Rätt väder att börja med

Som nybörjare, sikta på:
- Vind: 3–5 m/s (lätt bris). Tillräckligt för att segla, hanterbart om något går fel.
- Undvik: Vindbyar, kustvädervarningar, dimmigt väder.
- Bästa tid: Tidiga morgontimmar är oftast lugna. Vinden ökar typiskt på eftermiddagen.

## Skärgårdsregler du måste kunna

**Trafikregler:** En segelbåt under segel har generellt rätt till väg gentemot motorbåtar. Men den praktiska regeln är: ett stort fartyg kan inte manövrera – ge alltid väg för stora fartyg och färjor.

**Sjövägsregler:** Lär dig de 6 viktigaste – de räcker för nybörjarsegling i skärgård.

**Svalla-kartan** visar gästhamnar, bränsleplatser och ankringsplatser längs din rutt.

## Klassiska nybörjarrutter

**Vaxholm – Sandhamn tur och retur.** Ca 25 NM enkel väg. Stockholmsleden som guide, gästhamnar i Sandhamn, bra väderlekar för nybörjare.

**Dalarö – Utö.** Södra skärgården, mer öppet vatten, fin seglingsled med tydliga naturhamnar längs vägen.

## De vanligaste misstagen

1. **För lite mat och vatten ombord.** Ta alltid dubbelt mot vad du tror.
2. **Inte reservera gästhamn i förväg.** Sandhamn är fullbokad i juli – boka i god tid.
3. **Underskatta vindriktningsändringen.** Vinden ändrar sig – ha alltid en plan B.
4. **Segling utan sjökort.** GPS-appen på telefonen är bra. Fysiskt sjökort ombord är obligatoriskt.

Segla varsamt och njut. Skärgården från en segelbåt är en helt annan upplevelse än från däck på en färja.
 `,
 },

 'basta-badplatserna': {
 title: 'De 12 bästa badplatserna i Stockholms skärgård',
 excerpt: 'Klippbad, sandstrand eller bastu vid vattnet? Vi har listat de absolut bästa badplatserna.',
 category: 'Aktiviteter',
 date: '2026-04-08',
 updatedAt: '2026-07-14',
 readTime: '6 min',
 emoji: '',
 tags: ['Bad', 'Badplatser', 'Sommar'],
 faqs: [
   { q: 'Vilka är de bästa badplatserna i Stockholms skärgård?', a: 'Trouville på Sandhamn är den mest kända sandstranden. Stora Sand på Utö är bäst för barnfamiljer med grunt vatten. Fejan naturreservat norr om Furusund har kristallklart vatten och vita klipphällar. Kymmendö (Strindbergs ö) är en av de mest stämningsfulla platserna att bada på i hela skärgården.' },
   { q: 'Kan man bada gratis i Stockholms skärgård?', a: 'Ja — alla badplatser i Stockholms skärgård är gratis tack vare Allemansrätten. Du har rätt att bada och vistas på land som inte är privattomt, vilket täcker de allra flesta klippor och stränder i skärgårdslandskapet.' },
   { q: 'Vilken badplats i skärgården är bäst för barn?', a: 'Stora Sand på Utö har grunt, sandigt vatten och är ett av de säkraste badfamiljealternativen. Dalarö klapperstensstrand nås med bil och passar för barn. Fjäderholmarna (25 min från Stockholm) har klippbad som är tryggt och lättillgängligt utan lång resväg.' },
   { q: 'Hur tar man sig till badplatser i skärgården utan båt?', a: 'Waxholmsbolaget kör till Sandhamn, Utö, Möja, Ingmarsö och många fler. Dalarö nås med buss 834/840 från Handen. Fjäderholmarna nås med båt från Strandvägen på 25 minuter. Västerudd på Värmdö nås med buss och promenad från Gustavsberg.' },
 ],
 content: `
Stockholms skärgård har hundratals badplatser. De flesta är dolda klippor nåbara bara med båt. Några är klassiker. Alla är gratis tack vare allemansrätten. Här är våra tolv favoriter.

## 1. Trouville, Sandön (Sandhamn)
Sandhamns mest kända badstrand på södra sidan av Sandön — vit sandstrand med fin sand, cirka 15–20 min promenad från hamnen genom skogen. Klassisk skärgårdsbadplats.

## 2. Möja Hälludden
Klippbad på Möjas östra sida. Lite promenad från bryggan men med en av öns bästa utsikter. Solsäker plats från tidig morgon.

## 3. Stora Sand, Utö
Stora Sand är Utös största sandstrand — lång och bred, väl lämpad för barn med gradvis djupare vatten. Ligger inom skjutfältet, så kontrollera tillgänglighet hos Utö Turistbyrå innan du åker (öppen för allmänheten främst i juli).

## 4. Storskär, Möja-området
Klippbad ute i ytterskärgården öster om Möja. Klart, öppet vatten — bäst med egen båt.

## 5. Fejan, naturreservat
En av skärgårdens finaste klippöar norr om Furusund. Klart vatten, vita klippor och en naturhamn som är lika fin att bada i som att ankra i.

## 6. Ingmarsö, norra sidan
Norra Ingmarsös klippbad är ostört och otouristifierat. Ta cykel från södra bryggan upp till norra sidan.

## 7. Västerudd, Värmdö
Lättillgängligt klippbad med buss och promenad från Gustavsberg. Bra för Stockholmsbor utan båt.

## 8. Björkvik, Gällnö
Gällnö är bilfri och rofylld. Björkvik på öns västra sida har klippor och fin vik. Perfekt kombination med en cykeltur på ön.

## 9. Norrpada
Ögrupp i ytterskärgården nordost om Möja, kända för rent vatten och dramatiska klippor. Bäst nådd med fritidsbåt — inga reguljära färjor går dit.

## 10. Huvudskär
Ytterst i ytterskärgården. Mer äventyr än bekvämt bad – men att bada här med öppen Östersjö runtomkring är något alldeles speciellt.

## 11. Dalarö klapperstensstrand
Söder om Stockholm, nåbar med bil. Gammal fiskeby och fin klapperstensstrand. Bra för familjer.

## 12. Kymmendö (Strindbergs ö)
August Strindberg bodde här och inspirerades. Ön är numera naturreservat – besök med respekt och njut av en av Stockholms skärgårds mest stämningsfulla bad.

---

**Tips:** Svalla-kartan visar badplatser med GPS-koordinater. Filtrera på "Bad" i kategorierna för att hitta närmaste plats längs din rutt.
 `,
 },

 'vandring-orno-uto': {
 title: 'Vandring i skärgården – bästa lederna på Ornö och Utö',
 excerpt: 'Ornö och Utö har markerade leder genom urbergslandskap och gammal skog som är värda varje steg.',
 category: 'Aktiviteter',
 date: '2026-02-28',
 readTime: '7 min',
 emoji: '',
 tags: ['Vandring', 'Ornö', 'Utö', 'Natur'],
 content: `
De flesta tänker på Stockholms skärgård som ett vattenlandskap. Det är det – men öarna bjuder på vandring som håller klass med vad som helst Sverige kan erbjuda. Urbergsklippor, blandskog, gammal bebyggelse och havsutsikter som belönar varje steg uppåt.

## Ornö – skärgårdens naturreservat

Ornö är en stor ö söder om Stockholm med naturreservat, markerade vandringsleder och en äkthet som gör den till favoritern bland naturintresserade skärgårdsbesökare.

**Ornöleden** – ca 20 km lång markerad led som sträcker sig tvärs över ön från norr till söder. Splittras i kortare dagturer om du vill ta det lugnt.

**Norra leden** (ca 7 km) – Från Ornö brygga norrut längs kusten och upp på höjderna. Fantastisk utsikt mot Dalarö och öarna västerut.

**Södra leden** (ca 10 km) – Ner mot södra udden med gamla fiskarstugorna och ut på klipporna mot öppet hav. Mer krävande terräng.

Bästa tid: september och oktober när lövskogen slår på och myggen försvunnit.

## Utö – gruvbergets vandringar

Utö är inte lika känd för vandring som för cykling, men bergsryggen längs öns centrala del bjuder på riktigt bra leder.

**Gruvstigen** (3 km) – Runt de gamla gruvschakten och upp på Gruvbergets topp (53 m – högt för att vara skärgårdsö). Utsikt åt alla håll.

**Kustslingan** (12 km) – Längs Utös östra kust mot naturhamnarna och ner mot södra udden. Lång dagstur men ett av de finaste naturstigarna i Stockholms skärgård.

**Kortslingan** (5 km) – Perfekt för en kortare förmiddagstur med tid för lunch på värdshuset efteråt.

## Utrustning för skärgårdsvandring

Terrängen är generellt lättframkomlig men kan vara hal på klipporna. Ta med:
- Vandringsskor med grepp (inte vanliga gymnastikskor)
- Regnkläder – vädret kan ändra sig snabbt
- Myggmedel (maj–juli)
- Vatten – inga källor längs lederna
- Karta eller offline-GPS (mottagningen kan vara svag)

## Kombinera vandring med båt

Det bästa sättet att vandra i skärgården: ta båten till en ö, vandra tvärs över, ta båten tillbaka från den andra sidan. Ornö och Utö har bryggor på båda sidor – perfekt för genomvandring.
 `,
 },

 'cykling-moja-gallno': {
 title: 'Cykla i skärgården – guide för Möja och Gällnö',
 excerpt: 'Bilfria öar är perfekta för cykling. Hyr en cykel vid bryggan och utforska hela ön på ett par timmar.',
 category: 'Aktiviteter',
 date: '2026-02-20',
 readTime: '5 min',
 emoji: '🚴',
 tags: ['Cykling', 'Möja', 'Gällnö', 'Bilfri ö'],
 content: `
Bilfria öar och cykel är en kombination som inte kan slå fel. Inga bilar att ta hänsyn till, byvägar med grus och gräs, och ett tempo som gör att du hinner se allt som de som kör igenom missar.

## Möja – den längsta cykelturen

Möja är ca 12 km lång och skansen för den som vill cykla ordentligt. Öns vägnät täcker de flesta delar och kombinerar kustlinjer, skog och by i ett och samma svep.

**Norra rundan** (ca 8 km) – Från Möja brygga norrut och in mot bykärnan. Grusvägar, gammal bebyggelse och en naturhamn vid norra udden som är perfekt för en paus.

**Södra rundan** (ca 12 km) – Ner längs östra kusten mot södra udden. Mer kuperat, bättre utsikt mot ytterskärgården. Ta med matsäck.

**Uthyrning:** Möja Cykeluthyrning vid bryggan, ca 100–150 kr/dag. Elektriska cyklar finns för den som vill ha lite hjälp i backarna.

**Äta:** Möja Wärdshus är klart bästa alternativet för middag. Möja Bageri för fika. Vänta inte för länge – Möja Bageri stänger ofta tidigt.

## Gällnö – den lilla ön med stort välbefinnande

Gällnö är mindre än Möja och mer lättcyklad. Ön är bilfri och lite mer undanskymd – färre turister, mer ro.

**Rundan runt ön** (ca 6 km) – En lagom dagstur. Ön är platt längs kusterna men lite backig inne i mitten. Fina klippbad på västra sidan.

**Björkvik** är den finaste badplatsen på Gällnö. Ta cykeln dit och hoppa i från klipporna.

**Stationärens restaurang** vid bryggan – öppen sommarsäsong, enkel mat och en av skärgårdens bästa korvar.

## Tips för cykeldagen

- Kom med tidig båt – ön vaknar kring nio, du kan cykla ostört
- Boka inte cykel på lördag i juli utan förbokning – de tar slut
- Ta med picknick – det är det bästa sättet att uppleva de fina utsiktsplatserna
- Kolla vädret noga – regn på grusväg är trist, sol är fantastisk
 `,
 },

 'fiske-skargard-guide': {
 title: 'Fiske i skärgården – leder, arter och bästa säsonger',
 excerpt: 'Abborre, gädda och havsöring väntar i skären. En komplett guide till sportfiske i Stockholms skärgård.',
 category: 'Aktiviteter',
 date: '2026-02-10',
 readTime: '8 min',
 emoji: '',
 tags: ['Fiske', 'Sportfiske', 'Skärgård'],
 content: `
Stockholms skärgård är ett av Sveriges bästa fiskevatten för sportfiske. Arterna är många, säsongerna tydliga och möjligheterna att nå fiskevatten enorma – oavsett om du fiskar från klippa, kajak eller båt.

## Vilka arter finns?

**Abborre** – den vanligaste sportfisken i skärgården. Aktiv hela säsongen, biter på flest agn och är utmärkt mat.

**Gädda** – springer längs grunda vikar och vass under vår och sen höst. Kräver lite mer teknik men ger en av fiskesportens bästa upplevelser.

**Havsöring** – kommer in längs kusten under höst och vår. Kräver mer kunskap att hitta men är eftertraktad av hängivna sportfiskare.

**Torsk** – mer ute i ytterskärgården och Östersjön. Kraftigt minskade bestånd – kontrollera regler kring fångstbegränsningar.

**Sik** – djupfiskas under sensäsong. Delikatess om du kan hitta det.

## Säsonger

| Art | Bästa tid |
|-----|-----------|
| Abborre | Maj–juni, september |
| Gädda | April–maj, oktober |
| Havsöring | Mars–april, oktober–november |
| Makrill | Juli–september (ytterskärgård) |

## Regler

Fiske med handredskap är fritt för alla i allmänt vatten – ingen licens krävs. Dock gäller:
- Minimimått (t.ex. gädda 45 cm, torsk – kolla aktuellt)
- Fångstbegränsningar för torsk
- Fredade områden (kolla Havs- och vattenmyndigheten)
- Laxfiske kräver laxkort i vissa vatten

## Bästa platserna

**Innerskärgården (abborre):** Klippor och vass längs Lidingöns östra sida, Baggensfjärden och Baggenskanalen i Nacka – klassiska abborrevikar.

**Mellanska skärgården (gädda):** Grunda vikar runt Ornö, Möja och Ingmarsö är utmärkta gäddvatten på våren.

**Ytterskärgården (havsöring):** Längs ytterkusternas klippor, strömkanter och mynningszoner. Söderarm, Sandhamn och Landsort är kända platser.

## Utrustning för nybörjaren

- Lätt kastspö (7–21g) för abborre och havsöring
- Makrill-/havsöringlöp med spinnare och wobbler
- Flytväst – alltid på vattnet, oavsett farkost
- Återutsättningshåv – skyddad hantering av fisken

Svalla-kartan markerar bränsleplatser och gästhamnar längs fiskerutterna – bra för planering av längre fisketurer ute i skären.
 `,
 },

 'gasthamnar-guide': {
 title: 'Bästa gästhamnarna i Stockholms skärgård 2026',
 excerpt: 'Vi har besökt och betygsatt de 10 bästa gästhamnarna. Service, läge, faciliteter och pris.',
 category: 'Praktiskt',
 date: '2026-01-25',
 readTime: '8 min',
 emoji: '',
 tags: ['Gästhamn', 'Båt', 'Övernattning'],
 content: `
En bra gästhamn är mer än bara en förtöjningsplats. Det är slutpunkten på en lång seglingsdag, platsen för en kall öl i solnedgången och grunden för nästa dags äventyr. Här är tio av skärgårdens bästa.

## 1. Sandhamns gästhamn ★★★★★

Skärgårdens mest kända gästhamn är också bland de bästa. Utmärkt service, välskötta faciliteter och ett fantastiskt läge i seglingens hjärta. Fullbokad i juli – boka platser via waxholmsbolaget.se eller direkt med hamnen.

<!-- UPPSKATTNING: ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör (2026-08) -->
Pris: ca 380 kr/natt för 30 fot.

## 2. Utö gästhamn ★★★★☆

Perfekt läge vid Utö Värdshus. Nyrenoverade pontoner, el, vatten och rena faciliteter. Kombinera gästhamnen med middag på värdshuset för en av skärgårdens bästa kvällar.

<!-- UPPSKATTNING: ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör (2026-08) -->
Pris: ca 350 kr/natt.

## 3. Vaxholms gästhamn ★★★★☆

Centralt läge i Vaxholms hamn. Bra service, promenadavstånd till stadens alla restauranger. Lite trafikerat av färjor men välskött och rimligt prisad.

<!-- UPPSKATTNING: ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör (2026-08) -->
Pris: ca 280 kr/natt.

## 4. Dalarö gästhamn ★★★★☆

Charmig liten hamn söder om Stockholm. Bra service, välkänd krog i hamnen och lättillgänglig från Stockholm (E18 + landsväg). Populär startpunkt för turer mot Utö och Landsort.

## 5. Furusunds gästhamn ★★★★☆

Knutpunkt på Furusundsleder. Välutrustad hamn med bränsle, dusch och restaurang. Bra för norrutseglare.

## 6. Nynäshamns gästhamn ★★★☆☆

Stor och välskött men lite anonym. Bra om du ska till Utö nästa dag – ta pendeltåget från Stockholm till Nynäshamn och segla därifrån.

## 7. Möja gästhamn ★★★★☆

Liten och charmig. Plats för ca 40 båtar. Enkla faciliteter men perfekt läge – promenadavstånd till Möja Wärdshus och Möja Bageri.

## 8. Ingmarsö gästhamn ★★★☆☆

Lugnt och avsides. Om du vill ha avskildhet och inte turistifiering – Ingmarsö är det. Enkel service men i en av skärgårdens finaste miljöer.

## 9. Landsort gästhamn ★★★☆☆

Ytterst i ytterskärgården – landets sydligaste fyr är grannen. Enkel hamn med begränsad service men en upplevelse i sig att ligga förtöjd här med Östersjön runtomkring.

## 10. Kymmendö gästhamn ★★★☆☆

Strindbergs ö. Naturreservat med begränsat antal båtplatser. Lugnt, historiskt och med en känsla av att du inte befinner dig på vilken turistkrog som helst.

---

**Tips:** Svalla-kartan visar alla gästhamnar med -ikonen. Filtrera på "Hamn" för att hitta alternativen längs din planerade rutt.
 `,
 },

 'vinter-skargard': {
 title: 'Skärgård på vintern – upplev islugnet',
 excerpt: 'De flesta undviker skärgården på vintern. Det är ett misstag.',
 category: 'Inspiration',
 date: '2025-12-15',
 readTime: '5 min',
 emoji: '❄️',
 tags: ['Vinter', 'Lugn', 'Skärgård'],
 content: `
Sommaren i skärgården är fantastisk – men det vet alla. Det är vintern som är den bäst bevarade hemligheten. Öarna töms på turister, restaurangerna stänger eller går över till veckoslutsmeny, och det lugn som uppstår är ett av de vackraste tillstånd Sverige har att erbjuda.

## Varför vinter i skärgården?

**Tystnaden är annorlunda.** Utan motorbåtarnas buller, utan partyseglarnas radio och utan turistmassornas sorl – skärgårdsljudet på vintern är Östersjöns böljande, fåglarnas rop och kvistar som knäpper i kylan.

**Ljuset är unikt.** Det låga vinterjuset ger en klokhet åt klipporna och vattnet som sommaren aldrig producerar. Fotografer vet detta – de bästa skärgårdsbilderna tas inte i juli.

**Du är nästan ensam.** Öar som på sommaren är nästan oframkomliga av turister är vintertid nästan tomma. Vaxholm, Fjäderholmarna, Sandhamn – du kan promenera utan att tränga dig fram.

## Vad som är öppet

Inte allt – var beredd på det. Men mer än du tror.

**Waxholmsbåtarna** går året runt till de flesta öar. Reducerad tidtabell men fungerande.

**Vaxholms Hotell och Seglarhotellet i Sandhamn** håller öppet vintertid med begränsat utbud.

**Fjäderholmarna** öppnar för vinter-evenemang och julmarknader.

**Utö Värdshus** erbjuder vinterpaket och är en av skärgårdens mest uppskattade vinterupplevelser.

## Aktiviteter på vintern

**Isfiske** – i kalla vintrar fryser de grunda vikarna. Isfiske med pilkkast och termos är en gammal skärgårdstradition som lever kvar.

**Vinterpromenad** – klädd för väder och med isdobbar i fickan om du ska gå längs havsisen. Se alltid upp för issprickor.

**Bastu och vinterbad** – gör det med respekt och vana. Kalldopp i skärgården i januari med bastu efteråt är en sensation utan like.

## Praktiska tips

- Ta alltid med extra lager – havsvintern är obarmhärtigare än stadsvinter
- Isläget ändras snabbt – kontrollera länsstyrelsens iskarta
- Håll dig till bekanta platser – isvandringsförhållanden på okänd ö är risk
- Kolla öppettider mer noga – vinter har kortare öppettider överallt

Gå ut den här vintern. Skärgården är inte en sommarplats – den är en åretrunt-upplevelse.
 `,
 },

 'barnfamilj-skargard': {
 title: 'Skärgård med barnfamilj – 8 tips för en lyckad tur',
 excerpt: 'Att ta ut hela familjen i skärgården kräver lite planering. Här är de bästa öarna och säkraste badplatserna.',
 category: 'Familj',
 date: '2026-01-15',
 readTime: '6 min',
 emoji: '👨‍👩‍👧‍👦',
 tags: ['Barnfamilj', 'Barn', 'Planering'],
 content: `
Skärgård med barn är en av de bästa semestrar du kan ge dina ungar. Frihet, vatten, natur och en lagom dos äventyr. Men det kräver mer planering än vuxensegling – rätt öar, rätt aktiviteter och rätt säkerhetsförberedelse gör skillnaden.

## 1. Välj rätt ö

Inte alla öar är lika barnvänliga. Prioritera:
- **Fjäderholmarna** – kort resa, tryggt läge, akvarium och bra mat
- **Vaxholm** – stad med service, fästning att utforska, gott om lekplatser
- **Möja** – bilfri ö, lugnt tempo, relativt plan för cyklar
- **Utö** – sandstrand vid Stora Sand på Utö, grundt vatten bra för barn

## 2. Planera vädret noga

Barn är mer känsliga för väder – kylvindar, direkt sol utan skugga och regnkyla. Kolla SMHI 48 timmar i förväg. Ha alltid regnjackor och ett extra lager.

## 3. Flytväst är inte förhandlingsbart

Barn under 12 år bär flytväst när de är på däck. Inte vid kajen. Inte "nästan hela tiden." Hela tiden. Det är enkelt.

## 4. Välj rätta badplatser

Klippbad med djupt vatten direkt utanför kan vara krävande för små barn. Välj:
- Stora Sand på Utö (sandstrand, kontrollera tillgänglighet då området ligger inom skjutfält)
- Dalarö (klapperstensstrand, lättillgängligt)
- Stadsfjärden runt Vaxholm (lugnt, tryggt)

## 5. Mat och mellanmål

Barn i skärgård behöver mer mat och vatten än de tror. Ta med mer än planerat – busiga ungar och frisk luft ökar kaloribehovet. Ha alltid snabba mellanmål tillgängliga ombord.

## 6. Platsbaserade aktiviteter

**Minibåtar och pedalbåtar** finns att hyra på de flesta gästhamnar – en favorit hos barn i alla åldrar.

**Fiske** – enkelt pilkfiske från brygga eller klippa är en magisk aktivitet för barn från ca 5 år.

**Snorkling** – i klart skärgårdsvatten med snorkelmask är undervattenvärlden en upplevelse som fastnar.

## 7. Tidiga kvällar och gott om tid

Ha inget pressat schema. Barn behöver extra tid för allt – att gå ombord, att byta kläder, att hitta en krabba under en sten. Bygg in extra tid i planeringen och boka inte en Stockholmsmiddag för tidigt.

## 8. Övernattning på ön

Barn minns inte dagsturerna. De minns natten i hyttbädden, gryningsbadet och frukosten på däcket. Boka en natt på gästhamn eller i en stuga – det är skillnaden mellan ett utflykt och ett minne.
 `,
 },

 'svenska-hoar-sandhamn': {
 title: 'Svenska Högarna – den yttersta förposten',
 excerpt: 'Längst ut i ytterskärgården: klippor, hav och en av skärgårdens absolut finaste naturupplevelser.',
 category: 'Öguide',
 date: '2026-03-05',
 readTime: '5 min',
 emoji: '🪨',
 tags: ['Svenska Högarna', 'Ytterskärgård', 'Naturreservat'],
 content: `
Det finns inga restauranger på Svenska Högarna. Ingen butik. Inget vandrarhem. Knappt någon fast befolkning. Det finns klippor, hav, himmel och en av Stockholms skärgårds mest oförglömliga upplevelser. Det är tillräckligt.

## Vad är Svenska Högarna?

Svenska Högarna är en liten ögrupp ytterst i Stockholms skärgård, cirka 35 km öst om Möja. Naturreservat sedan 1976 (utvidgades 2020 till ett av Sveriges största marina reservat på cirka 61 000 hektar), med ett gammalt lotssamhälle och fyrvaktarbostäder som idag används som naturum och för enkel övernattning.

Ön nås normalt på ca 4–5 timmar med segelbåt från Stockholm, eller med snabbare motorbåt. Det finns ingen reguljärbåt dit.

## Fyren och historien

Svenska Högarna har en fyr från mitten av 1800-talet och är en gammal lots- och fiskeplats. Lotsverksamheten har lång historia på platsen och de bevarade byggnaderna berättar om livet i ytterskärgården. Idag fungerar delar av bebyggelsen som naturum.

## Upplevelsen

Att ligga förtöjd vid Svenska Högarna på en klar sommarnatt – med Östersjön runt om, fyrarens sken och himlen full av stjärnor utan att ett enda stadsljus stör – är en av de upplevelser som sätter ett märke.

Klipporna är urgamla. Vädret kan vara skoningslöst. Naturen är orörd. Det är precis det som gör det ovärderligt.

## Praktisk info

- Nås med privat båt – ingen reguljärtrafik
- Enkel övernattning möjlig i naturumet (kontakta länsstyrelsen i förväg)
- Ankring möjlig på läsidan – känsligt för väder, kolla prognosen noga
- Ta med allt du behöver – det finns ingenting att köpa på plats
- Naturreservat – ta inte ved, lämna inget skräp
 `,
 },

 'grilla-naturhamn': {
 title: 'Grilla i naturhamnen – regler, tips och bästa platser',
 excerpt: 'Vad gäller egentligen vid eldning i skärgården? Vi reder ut allemansrätten och de bästa grillplatserna.',
 category: 'Praktiskt',
 date: '2026-02-05',
 readTime: '5 min',
 emoji: '',
 tags: ['Grill', 'Eldning', 'Allemansrätten'],
 content: `
Grillning i naturhamnen är en av skärgårdens finaste traditioner. Men reglerna för eldning är inte alltid uppenbara – och de varierar med väder, plats och tid på året. Här är vad du behöver veta.

## Allemansrätten och eldning

Allemansrätten ger rätt att vistas i naturen – men inte automatisk rätt att elda. Eldning kräver att det är säkert och att du inte skadar marken eller orsakar brandrisk.

**Grundreglerna:**
- Elda aldrig direkt på berghällar/klippor — hettan får berget att spjälkas och skadan är permanent
- Använd befintliga eldstäder/grillplatser där de finns
- Elda inte under eldningsförbud (utfärdat av länsstyrelsen eller kommunen)
- Lämna aldrig en eld utan tillsyn
- Vattna ordentligt och kontrollera att asken är helt kall innan du lämnar platsen

## Eldningsförbud

Under torra sommrar utfärdar länsstyrelser och kommuner eldningsförbud. Kontrollera alltid:
- **SMHI:s brandriskprognos** på smhi.se
- **Krisinformation.se** och din **länsstyrelses hemsida** för aktuellt eldningsförbud

Vid &quot;ordinärt&quot; eldningsförbud är ofta grillning på medhavd grill med ben tillåtet, men det varierar mellan kommuner och beroende på förbudets nivå. Vid totalt eldningsförbud är all öppen eld förbjuden — också grill. Kolla alltid de exakta reglerna för platsen där du befinner dig.

## Portabelt alternativ

Satsa på en bra engångsgrill eller bärbar kolgrill med ben. Lätt att ta med, fungerar i princip var som helst, och du riskerar inte att skada klipphällar eller orsaka skogsbrand.

## Bästa platserna för grillning

**Fejan** – naturhamnen har befintliga eldstäder på klipporna norra sidan.

**Möja – södra hamnen** – skyddad, med vedförråd avsett för besökare.

**Kymmendö** – naturreservat men med specificerade grillplatser. Kolla reservatsreglerna.

**Gällnö** – privat förvaltad mark, men med hänvisade rastplatser längs promenadstigarna.

## Lämna inget spår

Sopa bort aska, plocka upp kolrester och lämna platsen i bättre skick än du hittade den. Det är inte bara regler — det är respekt för platsen och de som kommer efter dig.
 `,
 },

 'norrtelje-norra-skargard': {
 title: 'Norra skärgården – Norrtelje och Singö',
 excerpt: 'Norrtäljes skärgård är mer rå och orörd än Stockholms. Singö, Väddö och Räfsnäs är ett annat tempo.',
 category: 'Öguide',
 date: '2026-01-20',
 readTime: '6 min',
 emoji: '',
 tags: ['Norra skärgården', 'Norrtelje', 'Singö'],
 content: `
Norr om Stockholm, i Norrtälje och Upplandskusten, finns en skärgård som många Stockholmare aldrig besökt. Det är ett misstag. Norra skärgården är råare, vildare och avsevärt mindre turistifierad än söder om Stockholm.

## Norrtelje – porten norrut

Norrtälje är inte ofta förknippad med lyx och sofistikering – men det är en av de mest genuint charmerande skärgårdsstäder du hittar. Gammal handelsstad med trähus, en flod som rinner ut i skärgården och ett restaurangscen som håller på att bli på riktigt.

**Norrtälje centrum:** Gamla stan med sina trähusgator är genuint vacker. Lilla torget, Bossgatan och hamnen längs Norrtäljeån.

**Söderhamnsholme:** Promenera ut på holmen i Norrtäljefjärden – utsikt mot skärgårdsöarna och bästa solnedgångsplatsen i stan.

## Singö – den bortglömda ön

Singö nås med en kort bilfärja från Norrtälje-området. Liten, lugn, med en gammal fiskebebyggelse som ännu inte upptäckts av Stockholms sommarfolk. Inga restauranger att tala om – ta med matsäck och njut av ön för sin natur och sina klippor.

**Singö kapell** – en av Upplands äldsta träkyrkor, idylliskt beläget.

**Storön och Kallskär:** Lite längre ut, nåbara med privat båt. Orörd natur, klippor och sjöfågel.

## Väddö – landsväg och hamnar

Väddö är förbundet med fastlandet via bro och landsväg – men känns ändå som en ö. Väddökanalens sluss, Herräng (känd för sin dansfestival) och Blidö mot söder.

**Herräng** har en av landets bästa lindy hop-festivaler varje sommar – märklig, underhållande och unik.

## Räfsnäs och Norrtälje hamn

Räfsnäs är startpunkten för Waxholmsbåten norrut. En liten samlingsplats med enkel service och direktlinjer ut till öarna. Parkeringen fylls tidigt på sommaren – kör dit tidigt eller ta buss från Norrtälje.
 `,
 },

 'packlista-bat': {
 title: 'Packlista för båtturen – det du inte får glömma',
 excerpt: 'Oavsett om du tar ut en dagsbåt eller planerar en vecka i skärgården finns saker du alltid behöver. Komplett packlista.',
 category: 'Praktiskt',
 date: '2026-04-01',
 readTime: '4 min',
 emoji: '🎒',
 tags: ['Packlista', 'Utrustning', 'Säkerhet'],
 content: `
En bra packlista för båt handlar inte om att ta med allt – det handlar om att aldrig glömma det viktiga. En vätska man inte kan fylla på, en kabel som inte finns ombord och ett läge som försämras snabbt.

## Säkerhetsutrustning (ej förhandlingsbart)

- Flytvästar till samtliga ombord (rätt storlek!)
- Kastkrans med lina
- Nödbloss (godkänd och ej utgången)
- Handeldslockare (B-typ)
- Kompass (fungerande, ej bara GPS)
- Sjökort för området (papper, inte bara app)
- VHF-radio (kanalerna 16 och 77)
- Ankare med kedja och lina

## Navigation och kommunikation

- GPS/plotter eller sjökortsapp (Navionics, C-MAP)
- Sjökortsapp offline (ladda ner kartan utan nät)
- Mobil med vattentätt fodral
- Reservbatterier eller powerbank
- Signalhorn

## Verktyg och reparation

- Verktygslåda (kniv, tång, skruvmejsel, skiftnyckel)
- Reservkylarvätska för motorn
- Reservimpeller (om du har utombordsmotor)
- Självhäftande reparationstejp
- Packnålar för segel (om segelbåt)
- Reservpropeller

## Mat och vatten

- Minimum 2 liter vatten per person och dag, plus extra
- Reservmat för minst 1 extra dag utöver planerat
- Gasolkök med reservgasol
- Gryta, kastrull, tallrik och bestick
- Kaffebryggare eller fältperkulator – prioriterat

## Personliga saker

- Regnkläder (täcker hela kroppen, inklusive byxor)
- Varma kläder (även sommar – temperaturen på havet är lägre)
- Solskyddsfaktor 50 (havsreflektion förstärker solen)
- Solglasögon med UV-skydd
- Myggmedel (maj–juli inomskärs)
- Förbandslåda

## Administrativa saker

- Båtens dokument (registrering, försäkring, sjövägsboken)
- Kontanter i nödfall
- Betalkort (de flesta gästhamnar tar kort nu)
- Nödkontaktlista i vattentätt fodral

---

**Bra regel:** Gå igenom listan kvällen innan och inte morgonen du ska iväg. Det är lätt att missa saker i startruschen.
 `,
 },

 'havsbastu-guide': {
 title: 'Havsbastu i skärgården – de bästa platserna 2026',
 excerpt: 'Ingenting slår en rykande bastu vid havet med ett dopp efteråt. Vi listar de bästa havsbastuplatserna.',
 category: 'Aktiviteter',
 date: '2026-03-10',
 readTime: '5 min',
 emoji: '🧖',
 tags: ['Bastu', 'Havsbastu', 'Avkoppling'],
 content: `
Havsbastu är en av de upplevelser som definierar skärgård på riktigt. Inte för att det är unikt i Sverige – bastun finns överallt – utan för att kombinationen av en 85-gradig bastu och hopp direkt in i Östersjön är något som inte kan reproduceras.

## Varför havsbastu?

Det finns tre saker som händer i en havsbastu som du inte hittar på ett vanligt gym:

1. **Kontrasten är extrem** – från 85° till 15° havsvatten på tre sekunder. Kroppens reaktion är en kombination av chock och välmående.
2. **Utsikten är del av upplevelsen** – en bastu vid havet med klippor och öppet vatten runtomkring är en annan sak än en bastukabins i en källare.
3. **Gemenskapen** – havsbastun är en social institution. Människor pratar med varandra på ett sätt de inte gör annars.

## Bästa bastuplatserna i Stockholms skärgård

### Utö Värdshus Havsbastu ★★★★★
Utö har en av skärgårdens bäst belägna bastun – direkt vid vattnet med vy mot öppet hav. Tillgänglig för gäster på värdshuset och för dagsgäster mot avgift. Varm, välskött, med brygga för kaldopp.

### Dalarö Havsbastu ★★★★☆
Populär anläggning på Dalarö söder om Stockholm. Tillgänglig med bil eller båt. Bra faciliteter och trevlig hamnmiljö. Öppen sommar och vinter.

### Sandhamn Bastun ★★★☆☆
Liten bastukoja vid gästhamnen i Sandhamn. Enkel men fungerande. Bäst sena kvällar när trycket är lägre.

### Naturhamnsbastun på Möja ★★★★☆
En av Möjas sommargäster som hyr stugorna erbjuder bastun. Fråga lokalt vid Möja Wärdshus om vad som är öppet den aktuella veckan.

### Privata bastubåtar ★★★★★
Det absolut bästa alternativet om du kan boka det: bastubåtar som hyrs ut i skärgården. Du tar hela bastubåten med sällskapet, väljer din naturhamn och sitter i bastun ute i ytterskärgården. Bokas via skärgårdsbastuuthyrning.se och liknande.

## Bastuetikett

- Torka av dig med handduk innan du återgår till bastun
- Håll nere hällandet om inte alla i bastun vill ha mer ånga
- Respektera tystnadszoner – bastun är inte en bar
- Kaldopp med respekt för omgivningen – inga skrik och väsande mitt i natten
 `,
 },

 'segling-klassiska-leder': {
 title: 'Klassiska seglarleder i Stockholms skärgård',
 excerpt: 'Stockholmsleder, Furusundsleder och Sandhamnsleden – ryggraden i skärgårdssegling.',
 category: 'Segling',
 date: '2026-02-25',
 readTime: '9 min',
 emoji: '',
 tags: ['Segling', 'Leder', 'Rutter'],
 content: `
Stockholms skärgård har ett av världens tätaste nät av märkta seglarleder. De sträcker sig från Stockholms hamn ut till ytterskärgårdens öppna hav och är ett arv från den tid då skärgårdssegling var vardaglig transport, inte fritidsaktivitet.

## Stockholmsleden

Den mest trafikerade seglingsleden i Sverige. Löper från Stockholms hamn (Lidingöbron) ut mot Sandhamn i öster. Ca 40 NM total längd.

**Karaktär:** Delvis trängre passage (Baggensfjärden, Baggenskanalen) men mestadels öppna fjärdar med bra sikt. Hög trafik av alltifrån dagscruisers till oceanseglare.

**Gästhamnar längs leden:** Nacka, Stavsnäs, Sandhamn (slutdestination).

**Svårighetsgrad:** Lämplig för nybörjare med god sikt och normalt väder. Läs sjökortet noga vid Baggenskanalen.

## Furusundsleder

Den nordliga leder från Vaxholm via Furusund och vidare mot Grisslehamn. Klassisk rutt för sommarseglingen norrut.

**Karaktär:** Kuperade passager, vikar och bryggor i en lummig skärgårdsmiljö. Mer skyddad än Stockholmsleden.

**Nyckelpunkter:** Vaxholm (start), Björn (kafébrygga klassiker), Furusund (knutpunkt, bränsle), Blidösund (smalare passage), Grisslehamn (slutpunkt norrut).

**Svårighetsgrad:** Medel. Smalare passager kräver uppmärksamhet men leden är väl utprickad.

## Sandhamnsleden (södra)

Söder om Stockholm mot Dalarö, Utö och Landsort. Det öppnare vattnet och mer utsatt läge gör denna led till ett steg upp från nybörjare.

**Karaktär:** Öppnare fjärdar, mer Östersjöpåverkan. Vacker och dramatisk, med Landsort som yttersta fyr.

**Gästhamnar:** Dalarö, Utö, Nynäshamn, Landsort.

**Svårighetsgrad:** Medel-avancerad. Öppet vatten och mer vind kräver erfarenhet.

## Praktiska tips för seglarleden

**Sjökort:** SSPA Sjökort, serien 5 och 6 täcker Stockholms skärgård. Digitalt alternativ: Navionics eller C-MAP.

**VHF-radio:** Kanal 16 (anropskanal), 77 (hamnar och marina). Obligatorisk utrustning.

**Pricksystemet:** Röda prickar till styrbord (höger) och gröna till babord (vänster) när du är på väg in mot Stockholm. Tvärtom utgående.

**Strömmar:** Svala strömmar i skärgården men värt att känna till vid smala passager som Blidösund.

**Gästhamnsbokning:** Boka i förväg i juli och tidigt augusti. Sandhamn, Furusund och Utö är fullbokade de flesta helger.

---

Oavsett vilken led du väljer: ta tid på dig. De bästa seglarupplevelserna i Stockholms skärgård händer inte när du har bråttom.
 `,
 },

 // ── Säsongsredaktionella artiklar ────────────────────────────────────────

 'host-i-skargarden-2026': {
   title: 'Höst i skärgården 2026 – varför september är årets bästa månad',
   excerpt: 'Lugnet efter högsäsongen, varmt vatten kvar, öppna restauranger och inga köer. September och tidigt oktober är skärgårdens bäst bevarade hemlighet.',
   category: 'Inspiration',
   date: '2026-07-27',
   readTime: '6 min',
   emoji: 'leaf',
   tags: ['Höst', 'September', 'Säsong', 'Tips'],
   content: `
Fråga vem som helst som bott i eller nära skärgården länge vad årets bästa månad är. Svaret är nästan alltid september.

Inte juli. Inte midsommar. September.

Anledningarna är uppenbara när man tänker på det – men de flesta missar dem, för vi är programmerade att tänka "skärgård = sommar = juli". Det är ett dyrt misstag.

## Varmt vatten, kalla nätter, inga köer

I september är Östersjön och innerskärgårdens vikar fortfarande badvarma – ytvattentemperaturen brukar ligga runt 17–20 grader de första veckorna. Lufttemperaturen på dagen är 18–22 grader, perfekt för att sitta ute utan att svettas. Nätterna är svala, sömnen är god.

Och gästhamnarna? Du bokar dagen innan. Ibland bara dyker du upp.

[Sandhamn](/o/sandhamn) i september är en annan planet jämfört med Sandhamn i juli. Restaurangen tar emot dig. Du hittar en brygga att lägga till vid. Det finns bord.

## Vad som faktiskt är öppet

Det här är den vanligaste frågan: "Men är ju allt stängt i september?"

Nej. Inte alls.

De flesta restauranger och gästhamnar håller öppet till och med september, och många till mitten av oktober. Sandhamns Värdshus, [Möja](/o/moja) Krog, [Utö](/o/uto) Värdshus, [Bullerö](/o/bullero) och Furusunds Gästhamn är alla öppna september ut och tar emot besökare. Ring och bekräfta – men förvänta dig inte att det är stängt.

Det som stänger tidigt är strandbarer och enklare baguettekiosker. Det som håller öppet länge är restauranger med kök och historia.

## Ljuset i september är unikt

Fotografer vet det. Färgtemperaturen på ljuset i september är varmare och lägre än i juli. Gyllene timmar som varar längre. Solnedgångar som slår allt du ser på Instagram i somras. Om du ska fota skärgården – september är rätt.

Lövens första antydning av höstfärger börjar synas i ytterskärgårdens lövträd mot slutet av månaden. Det är inte höst på allvar – det är höstens debut, och den är vacker.

## Vilka öar fungerar bäst i september?

**Sandhamn** – Nästan alltid öppet, sämre alternativ finns inte i september. Tar emot oavsett väder.

**Utö** – Utö Värdshus håller öppet och cykelleder är bättre att cykla nu än i sommarvärmen. Lugnt, genuint.

**Möja** – Bilfritt, lugnt, en av de vackraste öarna i eftersäsongen. Möja Krog håller öppet september ut.

**Nämndö** – Litet, stilla, naturhamnarna är tomma. Perfekt för segling utan att stressa om bryggor.

**Bullerö** – Naturreservat i ytterskärgården. Vandringsled runt ön, inga restauranger – men en av de vackraste naturupplevelserna i skärgården.

## Vad du behöver tänka på

Klädsel förändras. Ta med ett lager extra – en rejäl fleece och regnfria ytterkläder om du är i båt. Nätterna är kalla.

<!-- UPPSKATTNING: ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör (2026-08) -->
Solnedgångarna är tidiga – runt 20:00 i september mot 21:30 i juli. Planera rutter med det i åtanke.

Kollektivtrafiken tunnas ut. Waxholmsbolaget kör färre turer efter högsäsong. Kolla tidtabellen innan du lämnar bryggan.

---

Det bästa med september i skärgården? Du hinner faktiskt lyssna. På vattnet. På löven. På det du missar i juli när allt är brus.

Boka en tur. Du ångrar dig inte.
   `,
   faqs: [
     { q: 'Är skärgården öppen i september?', a: 'Ja. De flesta restauranger, gästhamnar och aktiviteter håller öppet genom hela september. Vissa stänger i mitten av oktober. Ring och bekräfta för specifika ställen, men räkna inte med att det är stängt.' },
     { q: 'Hur varmt är vattnet i skärgården i september?', a: 'Normalt 17–20 grader i ytvattnet de första veckorna av september. Det är fullt badbart. Mot slutet av månaden sjunker temperaturen mot 15–16 grader.' },
     { q: 'Kör Waxholmsbolaget i september?', a: 'Ja, men med reducerad tidtabell jämfört med högsäsong. Kontrollera aktuell tidtabell på waxholmsbolaget.se innan du planerar resan.' },
   ],
 },

 'dagstur-skargard-fyra-timmar': {
   title: 'Dagstur till skärgården på 4 timmar – 6 konkreta förslag från Stockholm',
   excerpt: 'Inget eget fartyg, inget tält, inga dagar ledigt. Bara en förmiddag och en retur med Waxholmsbåten. Här är sex rutter som faktiskt fungerar.',
   category: 'Guide',
   date: '2026-07-27',
   readTime: '7 min',
   emoji: 'compass',
   tags: ['Dagstur', 'Stockholm', 'Kollektivt', 'Planering'],
   content: `
"Man måste ha båt för att uppleva skärgården." Det är myten som håller folk borta.

Sanningen: Waxholmsbolaget har avgångar från Strömkajen och Nybrokajen nästan varje timme under sommarsäsongen. En dagstur till några av de vackraste öarna tar 25 minuter till 2,5 timmar, beroende på destination. Ingen båt behövs. Ingen camping krävs. Ingen ledighet utöver en dag.

Här är sex konkreta rutter du kan boka idag.

---

## 1. [Fjäderholmarna](/o/fjaderholmarna) – 25 minuter, 4 timmars utflykt

**Avresa:** Strömkajen, Nybroplan eller Slussen. Avgångar var 30:e minut i högsäsong.
**Restid:** 25 minuter.
**Vad du gör:** Hantverksgallerier, rökeri, pub och en häftigt fin utsikt över inloppet till Stockholm. En av de kortaste skärgårdsturerna som faktiskt känns som skärgård.
**Bäst för:** Första gångare, barnfamiljer, spontanbesök.
**Tips:** Gå till östra sidan av ön bort från turisterna. Klipphällar, stillhet och äkta skärgårdskänsla.

---

## 2. [Vaxholm](/o/vaxholm) – 1 timme, halvdagsutflykt

**Avresa:** Strömkajen. Frekventa avgångar.
**Restid:** 55–65 minuter.
**Vad du gör:** Promenera runt på Vaxholm stad, besök fästningen (sommarperiod), ät lunch vid hamnen. Vaxholm Stadshotells restaurang har utmärkt skärgårdsmat.
**Bäst för:** Historieintresserade, par, de som vill ha en lugn halvdag med kafékultur.
**Tips:** Ta snabbfärjan tillbaka till Stockholm istället för ordinarie linje – det sparar 20 minuter.

---

## 3. [Grinda](/o/grinda) – 1,5 timme, klassisk heldagsö

**Avresa:** Strömkajen. 2–3 avgångar per dag beroende på säsong.
**Restid:** Cirka 1,5 timme.
**Vad du gör:** Grinda är en av yttreskärgårdens bäst tillgängliga öar utan egen båt. Vandringsstig runt ön (ca 2 km), badklippor, naturhamn och Grinda Wärdshus med klassisk skärgårdsmat.
**Bäst för:** De som vill ha äkta skärgård, utan att ta en hel dag.
**Tips:** Boka bord på Grinda Wärdshus i förväg – fullt de flesta sommarlördagar.

---

## 4. [Möja](/o/moja) – 2 timmar, bilfri upplevelse

**Avresa:** Stavsnäs (pendeltåg till Hässelby, buss till Stavsnäs) eller Strömkajen via Sandhamn.
**Restid:** Ca 2 timmar från Strömkajen.
**Vad du gör:** En av skärgårdens vackraste bilfria öar. Hyr cykel vid bryggan (150–200 kr/dag), cykla runt hela ön (ca 15 km), ät lunch på Möja Krog.
**Bäst för:** Cyklister, friluftsmänniskor, den som vill ha en hel dag på en ö.
**Tips:** Ta morgonbåten – det ger dig 5–6 timmar på ön.

---

## 5. [Utö](/o/uto) – 2,5 timmar, södra skärgårdens kronjuvel

**Avresa:** Nynäshamn (pendeltåg från Stockholm) + bilfärja. Avgångar 3–4 gånger per dag.
**Restid:** Totalt 2–2,5 timmar.
**Vad du gör:** Cykelleder, gruvmuseum, havsbastu, Utö Värdshus. En av de öar som ger mest upplevelse per besök.
**Bäst för:** De som vill ha en rik heldagsupplevelse och kan starta tidigt.
**Tips:** Hyr cykel vid bryggan (finns flera uthyrare). Cykla inte Utö runt på 3 timmar – ta det lugnt.

---

## 6. [Sandhamn](/o/sandhamn) – 2,5 timmar, seglingsikonen

**Avresa:** Strömkajen (lång tur) eller Stavsnäs (snabbgående, ca 40 min).
**Restid:** 40 min (Stavsnäs) eller 2,5 timmar (Strömkajen).
**Vad du gör:** Sandhamn är det klassiska skärgårdsnamnet. Segelbåtshamn, vita trävillor, goda restauranger och en atmosfär som är svår att replikera.
**Bäst för:** De som vill ha "ikonen". Inte den lugnaste ön men en av de vackraste.
**Tips:** Från Stavsnäs nås Sandhamn med snabbgående båt på 40 minuter. Enklare och snabbare än du tror.

---

## Praktisk checklista

- **Biljetter:** Köp via Waxholmsbolaget-appen eller på bryggan. SL-kortet gäller inte på Waxholmsbåtarna.
- **Mat och vatten:** Ta med lunch om du inte planerar restaurang – det sparar tid och pengar.
- **Kläder:** Alltid ett vindtätt lager extra på båten, även i juli.
- **Tidtabell:** Kolla sista båten tillbaka innan du ger dig av. Det finns inga taxi-alternativ till havs.

Skärgården är närmre än du tror. Börja med ett av förslagen ovan – och du förstår varför folk återkommer år efter år.
   `,
   faqs: [
     { q: 'Kostar det något att åka med Waxholmsbolaget?', a: 'Ja, Waxholmsbolaget är ett separat biljettsystem från SL. SL-kortet gäller inte. Köp biljetter via appen Waxholmsbolaget eller på bryggan. Priser varierar med destination.' },
     { q: 'Vilken är den kortaste dagsturen till skärgården?', a: 'Fjäderholmarna – 25 minuter med båt från Strömkajen eller Nybroplan. Öppet under sommarsäsongen med avgångar var 30:e minut.' },
     { q: 'Kan man göra dagstur till Utö?', a: 'Ja, men det kräver tidig start. Ta pendeltåget till Nynäshamn och sedan bilfärjan till Utö. Totalt cirka 2,5 timme. Ta morgonbåten för att få maximalt med tid på ön.' },
   ],
 },

 'eftersasong-skargard-oktober': {
   title: 'Eftersäsongen i skärgården – vad som håller öppet i oktober',
   excerpt: 'Många tror att skärgården stänger i september. Det stämmer inte. Här är en genomgång av vilka öar, restauranger och aktiviteter som håller öppet in i oktober.',
   category: 'Praktiskt',
   date: '2026-07-27',
   readTime: '5 min',
   emoji: 'sun',
   tags: ['Oktober', 'Höst', 'Eftersäsong', 'Öppettider'],
   content: `
Det finns en utbredd missuppfattning om skärgårdens eftersäsong: att allt stänger efter midsommar, senast efter sommarlovet, och definitivt innan oktober.

Det stämmer inte.

Skärgården i oktober är inte detsamma som skärgården i juli – men den är öppen, vacker och i många avseenden mer autentisk. Här är en konkret genomgång av vad som faktiskt håller öppet.

## Restauranger och kaféer

Flera av skärgårdens bäst etablerade restauranger håller öppet hela oktober. Gemensamt för dem: de har en lojal lokal kundkrets, starka varumärken och matsalar som tål att vara tomma en kväll då och då.

**Sandhamn:**
Sandhamns Värdshus håller öppet september–oktober (ring och bekräfta aktuellt datum, öppettider varierar per år). Seglarhotellet har matsalsservering tom tredje veckan i oktober.

**Utö:**
[Utö](/o/uto) Värdshus är öppet hela oktober och är faktiskt ett av de bästa alternativen för en hösthelg. Lugnt, vackert och med menyändringar mot säsong.

**Möja:**
[Möja](/o/moja) Krog håller normalt öppet september ut och helger i oktober. Ring i förväg.

**Grinda:**
[Grinda](/o/grinda) Wärdshus brukar ha öppet tom andra helgen i oktober. Kontrollera deras sociala medier för aktuell info.

**Fjäderholmarna:**
Restaurangerna håller öppet september ut. Oktober beror på år och väderlek.

## Gästhamnar

Gästhamnarna har generellt sett längre säsong än restaurangerna. De flesta av Waxholmsbåtarnas gästhamnar håller öppet tom mitten–slutet av oktober.

**Furusunds Gästhamn** brukar ta emot gäster tom sista veckan i oktober. **Sandhamns Gästhamn** håller öppet så länge trafiken tillåter.

Naturhamnarna – ankringsplatser utan service – är förstås alltid öppna.

## Waxholmsbolaget och kollektivtrafik

Waxholmsbolaget kör reducerad tidtabell efter högsäsong (normalt från slutet av augusti) men linjer till de större öarna – [Sandhamn](/o/sandhamn), [Vaxholm](/o/vaxholm), [Grinda](/o/grinda), [Utö](/o/uto) – trafikeras hela oktober.

Kontrollera alltid aktuell tidtabell på waxholmsbolaget.se. Söndagskvällar har färre avgångar.

## Aktiviteter

Vandring och cykling är faktiskt bättre i oktober än i juli: färre mygg, svalare luft och höstfärger i lövträden. De markerade lederna på Utö och Ornö fungerar utmärkt.

Paddling är möjlig med rätt utrustning (våtdräkt eller torrdräkt), men kräver mer erfarenhet i oktober när vattnet svalnat till 12–15 grader.

Naturreservaten och fågelskären är om möjligt ännu mer intressanta i oktober – höstflytten gör att ovanliga fågelarter dyker upp i ytterskärgården.

## Vad stänger tidigt?

Det som stänger i september eller tidigt oktober: strandbarer och enklare sommarkiosker, de flesta aktivitetsbolag (kajak-uthyrning, paddel-guider), vattenscooteruthyrning.

## Tips för en hösttur

Ring innan. Det sparar dig besvikelsen av en stängd restaurang. Ett snabbt samtal tar 2 minuter.

Ta med rätt kläder. Oktober i skärgården kan vara en strålande solig dag på 15 grader – eller en fuktig grå dag på 8. Ha alltid ett isolerande lager och regnkläder.

Njut av stillheten. Oktober-skärgården är tyst på ett sätt som inte finns i juli. Det är inte ett minus. Det är ett annat sätt att uppleva havet.
   `,
   faqs: [
     { q: 'Är Sandhamn öppet i oktober?', a: 'Ja, Sandhamns Värdshus och Seglarhotellet håller normalt öppet i oktober (ring och bekräfta aktuella datum). Gästhamnen tar emot besökare tom slutet av oktober.' },
     { q: 'Kör Waxholmsbolaget i oktober?', a: 'Ja, med reducerad tidtabell. Linjer till de stora öarna (Sandhamn, Vaxholm, Grinda, Utö) trafikeras under hela oktober. Kontrollera aktuell tidtabell på waxholmsbolaget.se.' },
     { q: 'Är det värt att åka till skärgården på hösten?', a: 'Absolut. Eftersäsongen bjuder på lugn, tomma hamnar, öppna restauranger utan köer och ett unikt höstljus. Många som besökt skärgården både i juli och oktober föredrar oktober.' },
   ],
 },

 'skargard-barnfamilj-sommar-2026': {
   title: 'Skärgård med barnfamilj sommaren 2026 – de 7 bästa öarna',
   excerpt: 'Sandstrand, grunt vatten, direktbåt och restaurang som faktiskt fungerar med barn. Vi har rangordnat de bästa alternativen för barnfamiljer i Stockholms skärgård.',
   category: 'Familj',
   date: '2026-07-27',
   readTime: '8 min',
   emoji: 'anchor',
   tags: ['Barnfamilj', 'Sommar', 'Barn', '2026'],
   content: `
Att ta med barn till skärgården kräver lite annorlunda tänk än en vuxentur. Vattendjupet vid bryggan spelar roll. Badmöjligheterna avgör humöret. Restaurangen måste kunna ta emot barnvagn och inte ha 45 minuters väntetid.

Vi har gått igenom alternativen och rangordnat dem – inte efter vad som är vackrast, utan vad som faktiskt fungerar med barn.

---

## 1. [Fjäderholmarna](/o/fjaderholmarna) – bäst för de minsta (0–4 år)

**Varför:** Kortast restid (25 min), inga farliga bryggor, lugnt vatten, kafé och restaurang, barnvagnsanpassad.
**Hur tar man sig dit:** Med Fjäderholmsbåtarna från Strömkajen, Nybroplan eller Slussen. Frekventa avgångar.
**Badmöjligheter:** Klippor och lite strandkant på baksidan av ön. Inte sandstrand, men grunt och lugnt.
**Att göra:** Rökeri, hantverksgallerier, promenad runt ön (~20 min). Barnen är nöjda med att titta på båtarna.
**Bra att veta:** Kan bli trångt i juli. Kom tidigt.

---

## 2. [Vaxholm](/o/vaxholm) – bäst för kulturhistorisk familjedag

**Varför:** Barnvagnsvänligt, tydlig stad, fästning att besöka (sommaröppet), badbrygga med grunt inhopp.
**Hur tar man sig dit:** Med Waxholmsbåt från Strömkajen, ca 55 min. Eller bil och SL-buss.
**Badmöjligheter:** Badbrygga i centrum, relativt grunt. Bra för barn som lärt sig simma.
**Att göra:** Fästningen (museum och torn), promenad på strandpromenaden, glass vid hamnen.
**Bra att veta:** Vaxholm är en riktig stad – det finns apotek, matbutik och alla bekvämligheter.

---

## 3. [Grinda](/o/grinda) – bäst för barnfamilj som vill ha äkta skärgård

**Varför:** Naturliga badplatser med grund stenig strand, ö-känsla utan att vara krånglig att nå, barnvänlig restaurang.
**Hur tar man sig dit:** Med Waxholmsbåt från Strömkajen, ca 1,5 timme.
**Badmöjligheter:** Flera badplatser runt ön med grunt inhopp. Perfekt för barn i åldern 4–10 år.
**Att göra:** Vandringsstig runt ön (2 km, barnvagnsanpassad på de flesta sträckor), bad, picknick.
**Bra att veta:** Boka bord på Grinda Wärdshus i förväg under högsäsong.

---

## 4. [Möja](/o/moja) – bäst för cyklande barnfamiljer (barn 6+)

**Varför:** Bilfritt, cykeluthyrning vid bryggan, lugna vägar, ingen biltrafik att oroa sig för.
**Hur tar man sig dit:** Stavsnäs (buss/tåg+buss från Stockholm) + Waxholmsbåt, totalt ca 2 timmar.
**Badmöjligheter:** Flera badvikar runt ön, lugnt vatten.
**Att göra:** Cykla runt ön med barnen, picknick vid naturhamnarna, bad.
**Bra att veta:** Cyklar med barnstol och lådcykel finns att hyra vid bryggan. Boka i förväg under juli.

---

## 5. [Utö](/o/uto) – bäst för aktiva familjer med äldre barn (barn 8+)

**Varför:** Cykelleder, gruvmuseum, havsbastu, sandstrand (Alsvik), heldagsupplevelse.
**Hur tar man sig dit:** Pendeltåg till Nynäshamn + bilfärja till Utö. Totalt ca 2,5 timme.
**Badmöjligheter:** Alsvik på Utö har en av skärgårdens enda riktiga sandstränder. Värd resan i sig.
**Att göra:** Gruvmuseum, cykling, sandstrand, havsbastu (Utö Värdshus), vandring.
**Bra att veta:** Utö är stor – det finns matbutik, restauranger och alla bekvämligheter. Planera att stanna minst en dag.

---

## 6. Dalarö – bäst för barnfamilj med bil

**Varför:** Nås med bil (ca 40 km söder om Stockholm), fina badmöjligheter, lugnt och lättillgängligt.
**Hur tar man sig dit:** Bil från Stockholm (E4 söderut mot Handen, skyltning mot Dalarö).
**Badmöjligheter:** Grunt vatten, sandstrand, idealiskt för barn under 6 år.
**Att göra:** Bad, promenad, kajakuthyrning, glass vid hamnen.
**Bra att veta:** Dalarö är faktiskt fastlandsbaserat men har stark skärgårdskänsla. Parkeringssituationen kan vara trång i högsäsong.

---

## 7. Nynäshamn (stadsnära) – bäst som startpunkt med barn

**Varför:** Pendeltåg direkt från Stockholm central (50 min), god sandstrand, hamnstämning.
**Hur tar man sig dit:** Pendeltåg från Stockholm C.
**Badmöjligheter:** Nynäshamns sandstrand är fin och barnvänlig med grunt vatten.
**Att göra:** Bad på stranden, glass, äta lunch vid hamnen, se båttrafiken. Bra halvdagsutflykt.
**Bra att veta:** Nynäshamn är startpunkten för Utö-färjan – kombinera gärna med ett Utö-besök.

---

## Checklista för barnfamiljen

**Ta med:** Ombyteskläder (fler än du tror), solskydd, vattenflaskor, snacks, barnväst om ni är på båt.

**Boka:** Restaurangbord i förväg om ni ska äta ute – särskilt Grinda och Utö i juli.

**Kolla:** Sista båten tillbaka innan ni ger er iväg. Med trötta barn vill du inte missa den.

**Tänk på:** Barn och vatten i skärgården kräver att vuxna är nära. Klippor kan vara hala. Flytväst för icke-simmare är ett enkelt beslut.

Skärgården med barn är en av de bästa sommarminnena man kan ge. Välj rätt ö för barnens ålder – och resten löser sig.
   `,
   faqs: [
     { q: 'Vilken är den bästa skärgårdsön för barn?', a: 'Det beror på barnens ålder. För de minsta (0–4 år): Fjäderholmarna. För familjer med barn 6–10 år: Grinda eller Möja. För äldre barn: Utö med sandstrand och cykelleder.' },
     { q: 'Finns det sandstränder i Stockholms skärgård?', a: 'Ja, men de är få. Utö (Alsvik) har en av de finaste sandstränderna. Nynäshamn har också sandstrand nära pendeltågsstationen.' },
     { q: 'Kan man ta med barnvagn på Waxholmsbåtarna?', a: 'Ja. Waxholmsbåtarna tar emot barnvagnar. Vik ihop den vid påstigning om möjligt. Vaxholm och Fjäderholmarna är barnvagnsanpassade destinationer med plana gångvägar.' },
   ],
 },

 'weekend-skargard-stockholm': {
   title: 'Weekend i skärgården 2026 – 8 kompletta upplägg från Stockholm',
   excerpt: 'Hur planerar man en perfekt skärgårdshelg? Här är åtta konkreta upplägg — från dagsturen som känns som ett äventyr till weekendresan som laddar batterierna ordentligt.',
   category: 'Guide',
   date: '2026-07-28',
   readTime: '9 min',
   emoji: '⚓',
   tags: ['Weekend', 'Helgresa', 'Stockholm', 'Planering'],
   content: `
En skärgårdshelg kräver ingen avancerad planering. Det kräver att du vet vart du ska och varför. Här är åtta upplägg – ett för varje typ av helg du kan vilja ha.

## 1. Dagstur till Fjäderholmarna (3–4 timmar, familjevänlig)

Det kortaste och enklaste alternativet. [Fjäderholmarna](/o/fjaderholmarna) ligger 25 minuter från Strömkajen med Waxholmsbåten och passar perfekt om du vill smaka på skärgården utan att planera övernattning. Kaféer, hantverk, en liten naturslinga och utsikt tillbaka mot Stockholm. Åk dit på en tisdag eller onsdag – helger är trånga.

**Bäst för:** Barnfamiljer, sista minuten, besökare från utlandet.

## 2. En natt på Grinda (2 dagar, romantik eller vilsam)

[Grinda](/o/grinda) är Waxholmsbåtens mest välskötta stopp. Grinda Wärdshus tar emot gäster i en miljö som känns som ett naturreservat – för det är ett. Boka en natt, ta med lite vin och gå runt ön på kvällen. Direktbåt från Strömkajen.

**Bäst för:** Par, vilsam helg, ingen bil krävs.

## 3. Sandhamns-weekend (2 dagar, segling & restauranger)

[Sandhamn](/o/sandhamn) är skärgårdens stora namn och lever upp till ryktet. Seglarhotellet, Trouville-stranden, kvällsmaten på Sandhamns Värdshus. Boka boende tidigt – sommarsäsongen fyller på redan i april. Snabbåt från Stavsnäs (40 min) eller Waxholmsbåt (2,5 timmar).

**Bäst för:** De som vill ha en fullständig semesterkänsla ute i skären.

## 4. Möja på cykel (2 dagar, aktiv naturupplevelse)

[Möja](/o/moja) är bilfri, kuperad och har en egen mataffär och café. Hyr cykel på ön och utforska de tre byarna – Mojaland, Möja och Yttre Möja – längs vägar som knappt finns på kartan. Waxholmsbåten dit tar ca 1 timme 45 minuter.

**Bäst för:** Cyklister, friluftsmänniskor, de som vill uppleva en äkta skärgårdsö.

---

## 5. Vaxholms historia och fästning (1 dag, kulturintresserade)

[Vaxholm](/o/vaxholm) är en hel stad – med stenhusen vid hamnen, fästningen på sin lilla ö och ett gatukök som serverar den bästa räksmörgåsen i skärgården. Ta pendelbåten från Strömkajen (55 min) och ha en dag att utforska. Fästningsmuseet är öppet sommartid.

**Bäst för:** Kulturresor, kortare turer, historieintresserade.

## 6. Kajak och tält på Bullerö (2–3 dagar, äventyr)

[Bullerö](/o/bullero) är ett naturreservat utan fast boende – du ankrar eller paddlar dit och tältar under allemansrätten. Ett av Stockholms skärgårds vackraste öar att övernatta på. Kombinera med kajakuthyrning från Dalarö eller charter.

**Bäst för:** Äventyrare, kajakpaddlare, de som vill ha riktig vildmark.

## 7. Utö – strand, sand och cykel (2–3 dagar, sommar)

[Utö](/o/uto) är unik i Stockholms skärgård med sin sandstrand vid Alsvik. Cykeluthyrning, en charmig hamn och Utö Värdshus för middag. Nås med båt från Nynäshamn (ca 1 timme).

**Bäst för:** De som vill ha strand, sommarliv och en ö att utforska.

## 8. Norrskärens yttre skärgård (2 dagar, havsluft)

Den yttre skärgårdens öar – nakna klippor, havsluft och total stillhet. Chartra en båt från Stavsnäs eller Nynäshamn och sätt kurs mot de öar få turister hittar. Kräver lite mer planering men ger mest av allt.

**Bäst för:** Båtägare, de som söker ro och inte vill möta andra turister.

## Boka i tid

Under sommarsäsongen (juni–aug) är populära öar som Sandhamn och Grinda fullbokade veckor i förväg. Om du reser i juli – boka boende redan i april. Lågsäsong (maj, september) är skärgårdens bäst bevarade hemlighet: all skönhet, halva trängseln.
   `,
   faqs: [
     { q: 'Vilken skärgårdsö är bäst för en weekend?', a: 'Det beror på vad du söker. För romantik: Grinda. För aktivt: Möja eller Utö. För restauranger och stämning: Sandhamn. För kortast möjliga tidsåtgång: Fjäderholmarna.' },
     { q: 'Hur tar man sig till skärgårdsöarna utan bil?', a: 'Waxholmsbåtarna och Cinderella Boats går från Strömkajen i Stockholm city. Bil krävs inte till de flesta öar – pendelbåtar är snabba och bekväma.' },
     // UPPSKATTNING: ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör (2026-08)
     { q: 'Vad kostar en skärgårdshelg?', a: 'En övernattning på Grinda Wärdshus kostar från ~1 500 kr/natt. Budget-alternativet är att campa med tält under allemansrätten. Båten till/från kostar ~180–350 kr tur-retur beroende på destination.' },
   ],
 },

 'sandhamn-guide-2026': {
   title: 'Sandhamn guide 2026 – restauranger, bad, boende och hur du tar dig dit',
   excerpt: 'Sandhamn är skärgårdens mest välkända destination. Komplett guide: de bästa restaurangerna, Trouville-stranden, var du bor och allt om båten från Stockholm.',
   category: 'Öguide',
   date: '2026-07-28',
   readTime: '8 min',
   emoji: '⛵',
   tags: ['Sandhamn', 'Guide', 'Restauranger', 'Segling'],
   content: `
[Sandhamn](/o/sandhamn) är Stockholms skärgårds mest kända destination och lever upp till ryktet. Segelbåtar i hamnen, välskötta restauranger, vita trävillor och en skärgårdsstämning som är svår att hitta längre in mot Stockholm. Den här guiden är allt du behöver för ett besök 2026.

## Hur du tar dig till Sandhamn

**Snabbaste vägen:** Waxholmsbåtens snabba linjer från Stavsnäs (nås med bil/buss från Slussen) — ca 40 minuter. Stavsnäs är enklast med bil; parkering kostar 80–100 kr/dygn.

**Direkt från Stockholm city:** Waxholmsbåten från Strömkajen — ca 2,5 timmar. Längre men stämningsfull; passa på att se skärgårdens karaktär förändras längs vägen.

**Snabbaste linjen sommartid:** Cinderella Boats kör expresser i sommarperioden.

## Stränderna

**Trouville** är Sandhamns ikoniska strand – vit sand, klart vatten och en vy mot havet. Nås med 15 minuters promenad från hamnen längs byns enda väg. Kom tidigt på högsommar; den fylls på fort.

**Flaskbrottet** är en lite mer undanstoppad strand söder om byn. Lugnare, mer klippor, fint för solbad.

---

## Restauranger 2026

**Seglarhotellets Restaurang** – Det finaste alternativet på ön. Svenska råvaror, kök med säsongsvariation och en historia sedan 1897. Boka bord minst en vecka i förväg i juli–aug.

**Sandhamns Värdshus** – Det klassiska stoppet vid bryggan. Fisksoppa, räkor och smörgåsar. Prisvärt och med direkt hamnutsikt. Ingen bokning behövs.

**Dykarbaren** – Bryggservering med hamburgare och öl. Det avslappnade alternativet, bra för sundowner.

**Bryggcafé 7an** – Bäst för frukost eller fika. Nybakat och hamnutsikt. Köen bildas fort på helger.

## Boende

**Seglarhotellet** (seglarhotellet.se) — Historiskt hotell i trävillor. Dubbel från ~1 800 kr/natt högsäsong. Boka månader i förväg.

**Sandhamns Pensionat** — Mer budgetvänlig, lite enklare standard. Perfekt för de som prioriterar priset över poolen.

**Villor och stugor** — Går att hyra via Blocket och Airbnb. Priserna varierar kraftigt; förvänta dig minst 3 000–5 000 kr/natt under högsäsongens populäraste veckor.

## Vad du inte får missa

- **Sandhamns Segelsällskap** — Seglarnas hjärta på ön. Under Match Cup Sweden i juni är ön fullpackad med seglare.
- **Promenad längs Västerudd** — Det vackraste sundet på ön, med båttrafik in och ut mot havet.
- **Lotsmuseet** — Litet och charmigt museum om öns historia som lots- och skepparstation.

## Praktiska tips

Sandhamn är bilfri. Allt du behöver ta med är det du bär på. Det finns en liten livsmedelsbutik på ön men räkna inte med att hitta allt du söker. Ta med solkräm, kontanter (inte alla ställen tar kortbetalning ute i skären) och ett vindtätt plagg — havet kan vara kallare än du tror.

Hög- vs lågsäsong: juli är turisternas månad. Maj och september är skärgårdens bäst bevarade hemlighet — all skönhet, utan köerna.
   `,
   faqs: [
     { q: 'Hur lång tid tar båten från Stockholm till Sandhamn?', a: 'Från Strömkajen med Waxholmsbåten tar det ca 2,5 timmar. Från Stavsnäs med snabbåt ca 40 minuter. Stavsnäs nås enklast med bil.' },
     { q: 'Finns det strand på Sandhamn?', a: 'Ja. Trouville-stranden är den mest kända – vit sand och klart vatten, ca 15 min promenad från hamnen. Flaskbrottet är ett mer undanskymt alternativ med klippor.' },
     { q: 'Är det bilfritt på Sandhamn?', a: 'Ja, Sandhamn är bilfri. Det finns inga bilar på ön. Allt nås till fots.' },
   ],
 },

 'boende-skargard-2026': {
   title: 'Boende i skärgården 2026 – stugor, gästhamnar och camping',
   excerpt: 'Ska du övernatta i skärgården? Här är en genomgång av alla alternativ — från lyxig värdshussvit till tält på klippan — med konkreta råd om vad som passar vem.',
   category: 'Praktiskt',
   date: '2026-07-28',
   readTime: '7 min',
   emoji: '🏕️',
   tags: ['Boende', 'Stuga', 'Camping', 'Övernattning'],
   content: `
En övernattning i skärgården är annorlunda än att ta in på ett stadshotell. Det handlar om att vakna till ljud av vatten, fiskgjuse och lugn. Men alternativen är fler än du tror – och prisskalan bred.

## Värdshus och hotell

Det klassiska värdshuset är kärnan i skärgårdens övernattningserbjudande. De bästa:

**Grinda Wärdshus** ([Grinda](/o/grinda)) — Sverigebäst i sitt slag. Naturskönt läge, restaurang med lokalproducerat, enkla och dubbelrum. Boka tidigt; det är fullbokat fort.

**Seglarhotellet** ([Sandhamn](/o/sandhamn)) — Historiskt hotell i trävillor. Räkna med 1 800–2 500 kr/natt för dubbel i juli.

**Utö Värdshus** ([Utö](/o/uto)) — Lugnt, naturnära och med en av skärgårdens bästa restauranger. Populärt för par och familjer.

**Vaxholms Kastell** ([Vaxholm](/o/vaxholm)) — Historisk fästning omgjord till vandrarhem och enklare boende. Billigare och unik upplevelse.

---

## Stuguthyrning

Privatpersoner hyr ut allt från sjöbodar till villor i skärgården – och det är ofta det mest prisvärda alternativet för familjer.

**Var du hittar:**
- Blocket (blocket.se) — störst utbud
- Airbnb — enklare bokningsprocess
- Sverigestugor.se — specialiserat

**Vad du kan förvänta dig:** Enklare stugor från ~800 kr/natt, veckohyra vanligare än dygn. Lyxvillor med brygga och sjöutsikt kan kosta 5 000–10 000 kr/vecka.

**Tips:** Boka för sommarveckor senast i mars. De populäraste lägena är slutbokade månader i förväg.

## Camping och tältning

Allemansrätten i Sverige ger rätt att tälta i naturen – även i skärgården. Det innebär att du faktiskt kan ta Waxholmsbåten ut, paddla till en öde ö och sova under stjärnorna gratis.

**Regler att känna till:**
- Tälta inte närmre än 70 meter från bebyggelse
- Stör inte djurlivet (häckande fåglar, etc)
- Ta med allt du tagit med dig hem
- Elda inte på klipporna (brandrisk)

**Campingplatser i skärgården:** [Utö](/o/uto) har en etablerad campingplats med faciliteter. Ornö camping på [Ornö](/o/orno) är ett lugnare alternativ söder om Stockholm.

## Gästhamnar

<!-- UPPSKATTNING: ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör (2026-08) -->
Om du har egen båt är gästhamnarna skärgårdens hotell. Flertalet öar med besöksbryggor tar ut ~150–300 kr/natt för en kajplats. De flesta har el, vatten, dusch och toalett.

**Bästa gästhamnarna:** Grinda, Möja, Sandhamn, Utö och Vaxholm har välskötta anläggningar med god kapacitet.

**Boka i förväg** under högsäsong — speciellt Sandhamns gästhamn kan vara fullbelagd veckor i förväg i juli.

## Vad kostar en övernattning?

| Typ | Prisnivå |
|-----|----------|
<!-- UPPSKATTNING: ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör (2026-08) -->
| Värdshus/hotell (dubbel) | 1 500–3 000 kr/natt |
| Stuga (familj) | 1 000–2 500 kr/natt |
| Gästhamn (båtplats) | 150–300 kr/natt |
| Tältning (allemansrätten) | Gratis |
| Vandrarhem | 350–700 kr/person/natt |

Skärgårdsövernattning handlar inte nödvändigtvis om pengar. Med tält och rätt planering kan du ha en av sommarens bästa nätter — helt gratis.
   `,
   faqs: [
     { q: 'Kan man tälta fritt i skärgården?', a: 'Ja, allemansrätten ger rätt att tälta 1–2 nätter på de flesta platser i naturen. Håll avstånd till bebyggelse (minst 70 m), ta med allt hem och elda inte på klipporna.' },
     { q: 'Var hittar man stuguthyrning i skärgården?', a: 'Blocket.se har störst utbud av sommarstugor. Airbnb och Sverigestugor.se är kompletterande alternativ. Boka sommarveckor senast i mars.' },
     { q: 'Finns det vandrarhem i skärgården?', a: 'Ja. Vaxholms Kastell är ett unikt alternativ i en historisk fästningsmiljö. STF driver vandrarhem på flera öar, bland annat Utö.' },
   ],
 },

 'skargard-med-hund': {
   title: 'Skärgård med hund – 6 hundvänliga öar och regler du måste känna till',
   excerpt: 'Hundar och skärgård är en perfekt kombination — om du vet vad som gäller. Här är de bästa hundvänliga öarna, när hunden måste vara kopplad och naturhamnar med grönyta.',
   category: 'Guide',
   date: '2026-07-28',
   readTime: '6 min',
   emoji: '🐕',
   tags: ['Hund', 'Hundvänlig', 'Regler', 'Allemansrätten'],
   content: `
En skärgårdsdag med hund är annorlunda på ett bra sätt. Hunden älskar klippor, gräs och havsluften — och de flesta öar välkomnar hundar. Men det finns regler att känna till, och några öar har restriktioner under sommarmånaderna.

## Regler du måste känna till

**Kopplingstvång 1 mars–20 aug:** Under den här perioden ska hundar vara kopplade i de flesta naturreservat. Anledningen är fågelungar och häckande djur. Det gäller oavsett hur väluppfostrad hunden är.

**Naturreservat med egna regler:** Varje reservat kan ha egna föreskrifter. Kontrollera alltid Länsstyrelsens webbplats för den specifika ön du ska besöka.

**Badplatser:** Hundar är ofta förbjudna vid kommunala badplatser under badsäsongen. Privata klippor under allemansrätten är oftast okej.

**Waxholmsbåtarna tar hundar:** Ja, hundar är välkomna ombord. Det kostar normalt inget extra. Håll hunden lugn och iaktta hänsyn mot medspassagerare.

---

## 6 hundvänliga öar

**1. [Grinda](/o/grinda)** — Naturreservat med tydliga leder och stora gräsytor. Hunden kan springa fritt utanför kopplingstvångsperioden. Grinda Wärdshus tillåter hundar i uteserveringen.

**2. [Möja](/o/moja)** — Bilfri ö med vägar och stigar. Lite trafik, lugnt tempo. Perfekt för en dag med hunden längs byvägarna.

**3. [Vaxholm](/o/vaxholm)** — Stad med kaféer och restauranger med uteservering. Stadspromenaden längs vattnet är populär. Fästningsholmen kräver koppling.

**4. Runmarö** — Lite större ö i Stockholms skärgård med skogspartier och klippor. Välbesökt av hundägare som vill ha plats att röra sig.

**5. Blidö** — I norra skärgården, enklare att nå med bil. Stigar och skogar, lite turister. Bra för längre promenader med hunden.

**6. [Ornö](/o/orno)** — En av de större skärgårdsöarna söder om Stockholm. Bil krävs (vägfärja från Nynäshamn). Stor ö med riktig natur att utforska.

## Praktiska tips

- Ta med **extra vatten** till hunden — saltvattnet är inte drickbart
- Kontrollera att **klipporna inte är hala** innan hunden hoppar
- Ha alltid **hundpåsar** med
- **Flytväst till hunden** rekommenderas om ni ska ut i båt

Skärgården med hund fungerar utmärkt med rätt planering. Välj öar med utrymme, kontrollera reservatets regler och åk på förmiddagen för att undvika trängseln vid bryggorna.
   `,
   faqs: [
     { q: 'Är hundar tillåtna på Waxholmsbåtarna?', a: 'Ja, hundar är välkomna ombord på Waxholmsbåtarna. Det kostar normalt inget extra. Hunden ska vara i koppel ombord.' },
     { q: 'Gäller kopplingstvång hela sommaren i skärgårdens naturreservat?', a: 'Kopplingstvång gäller 1 mars–20 aug i de flesta naturreservat för att skydda häckande fåglar. Kontrollera alltid det specifika reservatets regler på Länsstyrelsens webbplats.' },
     { q: 'Vilka öar i skärgården är bäst för hundar?', a: 'Grinda och Möja är populära val med gott om utrymme och få bilar. Vaxholm passar för en stadsrunda med hunden. Ornö och Blidö är bra om du kan ta dig dit med bil.' },
   ],
 },

 'vandring-skargard-guide': {
   title: 'Vandring i Stockholms skärgård 2026 – de 8 bästa lederna',
   excerpt: 'Stockholms skärgård är inte bara vatten. De bästa lederna tar dig genom urbergslandskap, längs klippkuster och över bilfria öar. Här är åtta vandringar du faktiskt kan genomföra.',
   category: 'Aktiviteter',
   date: '2026-07-28',
   readTime: '8 min',
   emoji: '🥾',
   tags: ['Vandring', 'Leder', 'Natur', 'Friluftsliv'],
   content: `
Skärgårdsvandraren har det bäst. Du sitter på en klippa, äter matsäcken och ser solen dala mot havet — och vet att du förtjänat det. Stockholms skärgård erbjuder fantastisk vandring längs kuster, genom skogar och över öar som flesta turister aldrig ser.

## Vad du behöver veta

Skärgårdens vandringsleder är sällan markerade på samma sätt som fjälleder. Kartappen Komoot (eller Alltrails) med nedladdad offline-karta är ett måste. Ta med vatten — det finns ingen vattenkälla ute på klipporna.

---

## De 8 bästa lederna

### 1. Utö – Alsvik till Rånö (ca 12 km)
[Utö](/o/uto) har en av skärgårdens bästa vandringsleder. Från Alsvik (med sandstrand!) söderut längs öns klippkust till Rånö. Kuperat, havsnära och med dramatiska vyer. Nås med båt från Nynäshamn.

### 2. Ornö – Runt hela ön (ca 20 km)
[Ornö](/o/orno) är en av de större öarna söder om Stockholm med ett välskyltat runt-öled. Gammelskogar, klippor och vyer mot yttre skärgården. Bra att kombinera med övernattning. Bil till Nynäshamn + vägfärja.

### 3. Möja – Byvandring (ca 8 km)
[Möja](/o/moja) är bilfri och perfekt för en dagstur med vandring. Vandra mellan de tre byarna längs byvägar och skogstigar. Kuperat, charmigt och med café-paus på vägen.

### 4. Gällnö naturreservat (ca 6 km)
Gällnö är ett naturreservat i Värmdö skärgård med markerade leder och vacker urbergsterräng. Enklare och kortare — perfekt för familjer med barn som kan gå.

### 5. Bullerö naturreservat (ca 5 km)
[Bullerö](/o/bullero) är en av skärgårdens vackraste öar och ett naturreservat utan fast boende. Kort slingled med utsiktsplatser. Nås med charter- eller privatbåt.

### 6. Grinda – Runt ön (ca 4 km)
[Grinda](/o/grinda) är liten nog att gå runt på en förmiddag. Välskötta stigar, utsiktsplatser och möjlighet att bada när du känner för det. Perfekt familjevandring.

### 7. Tynningö (ca 6 km)
Ö i Stockholms yttre skärgård med skogar och klippkust. Inga restauranger — ta med matsäck och njut av lugnet. Waxholmsbåt dit.

### 8. Fjäderholmarnas naturslinga (ca 2 km)
[Fjäderholmarna](/o/fjaderholmarna) har en kort naturslinga runt öns sydöstra del. Inte ett äventyr i sig men bra för en 25-minutersbåttur från Stockholm och en kort rörelse i naturen.

## Packlista för skärgårdsvandring

- Vatten (minst 1,5 l per person)
- Energibar/matsäck (ingen service längs de flesta leder)
- Kartapp med offline-karta
- Vindtätt plagg (det blåser alltid mer vid vattnet)
- Bra skor (klippor är hala vid regn)
- Solkräm och myggolja

Skärgårdens vandringsleder kräver respekt och planering men ger enormt tillbaka. Bästa säsongen: maj–juni och september — grönare och svalare, utan högsommarens trängsel.
   `,
   faqs: [
     { q: 'Vilken är den bästa vandringen i Stockholms skärgård?', a: 'Utö (Alsvik–Rånö, 12 km) och Ornö runt-led (20 km) är de mest kompletta vandringarna. För kortare dagsvandringar är Grinda och Möja utmärkta.' },
     { q: 'Behöver man bil för att vandra i skärgården?', a: 'Nej. De flesta vandringsleder nås med Waxholmsbåten direkt från Stockholm. Utö nås med båt från Nynäshamn (pendeltåg + byte).' },
     { q: 'Är det markerade vandringsleder i skärgården?', a: 'Delvis. Gällnö naturreservat och Grinda har markerade leder. Utö och Ornö har skyltade leder men ladda ner kartappen Komoot med offline-karta som säkerhetsnet.' },
   ],
 },

 'naturhamnar-stockholm-skargard': {
   title: 'Bästa naturhamnarna i Stockholms skärgård 2026 – seglares guide',
   excerpt: 'De bästa platserna att ankra för natten är sällan i en gästhamn. Här är de naturhamnar i Stockholms skärgård som seglare pratar om — med djup, vindskydd och vad du behöver veta.',
   category: 'Segling',
   date: '2026-07-28',
   readTime: '7 min',
   emoji: '⚓',
   tags: ['Naturhamn', 'Segling', 'Ankring', 'Båt'],
   content: `
En naturhamn är seglingslivets belöning. Du rundar en udde, ser en skyddad vik och förstår direkt att det är hit du ska för natten. Ingen avgift, inget grannskap av charterturister — bara berget, vattnet och stillheten.

Här är de naturhamnar i Stockholms skärgård som erfarna seglare återkommer till år efter år.

## Vad gör en naturhamn bra?

- **Vindskydd** — skyddat från de vanligaste vindarna (S, SW och W i Stockholm)
- **Lagom djup** — 2–5 meter är idealiskt för de flesta båtar
- **Klippyta att gå upp på** — för att ta en promenad och göra fast en lina
- **Ingen motorbotstrafik** — lugn och ro

---

## De bästa naturhamnarna

### Bullerskär / Bullerö
[Bullerö](/o/bullero) och de omgivande skären är ett av Stockholms skärgårds finaste ankringsområden. Naturreservat utan bofast befolkning, med klippor som sträcker sig ner i vattnet. Välskyddat från sydväst. Använd sjökortet noggrant — det är grunt på flera ställen.

### Möja – Östersundet
Ostlunden på [Möjas](/o/moja) östsida erbjuder ett välskyddat ankringsläge med bra vindskydd. Flera naturhamnar längs sundet. Populärt och kan vara trångt i juli — kom innan kl 15.

### Rånö – södra sidan
Sydöstnängsudden på Rånö har en skyddad vik med bra djup och fin klippterräng. Mer avlägset och därmed lugnare än de populärare alternativen.

### Utö – Rånöviken
Söder om [Utö](/o/uto) finns Rånöviken, ett omtyckt ankringsläge med bra vindskydd. Kombinera med en promenad upp till Utö fyr.

### Svartsö – Norra änden
Svartsö i Stockholms norra skärgård har en fin naturhamn i norra änden av ön. Lugnt, relativt lätttillgängligt och med möjlighet till promenad i skogen.

### Kymöndö – Sundet
Sundet mellan Kymöndö och den lilla grannön är ett smalt men välskyddat ankringsläge. Fint med kvällsljuset.

### Fjärdlång – Innerskäret
Söder om Ornö, ett av de mer avlägset belägna ankringsalternativen. Yttre skärgård, havsluft och total stillhet. För den som vill ha verkligheten på lagom avstånd.

## Praktiska tips för naturhamnsankring

**Sjökortet är viktigast.** Stockholms skärgård har grunt längs klipptornen. Navionics-appen med uppdaterat djupdata är oumbärlig.

**Kom tidigt.** De populäraste naturhamnarna fylls på under eftermiddagen. Sikta på att vara ankrad senast 15–16 på högsommar.

**Ta en lina till land.** De flesta naturhamnar kräver att du sätter fast en baklina i klippan — för att hålla båten stabil och minska svaj.

**Respektera naturreservaten.** Bullerö och många av de finaste naturhamnarna är naturreservat. Elda inte (eldförbud råder vid torr väderlek), plocka inte blommor och ta med all sopor hem.

Naturhamnens framtid beror på att vi som seglare behandlar dem rätt. Med respekt för reglerna och havsmiljön förblir de tillgängliga för generationer av seglare.
   `,
   faqs: [
     { q: 'Vad är en naturhamn?', a: 'En naturhamn är en naturligt skyddad vik eller fjärd där båtar kan ankra utan att betala hamnavgift. Till skillnad från en gästhamn saknar den faciliter som dusch och el.' },
     { q: 'Behöver man betala för att ankra i en naturhamn?', a: 'Nej, ankring i naturhamnar är normalt gratis i Sverige tack vare allemansrätten. Undantag kan finnas i vissa naturreservat med speciella regler.' },
     { q: 'Vilken sjökortsapp rekommenderas för Stockholms skärgård?', a: 'Navionics är den vanligaste och mest uppdaterade sjökortsappen för Stockholms skärgård. Ladda ner offline-kartor för att klara dig utan nätuppkoppling ute i skären.' },
   ],
 },

 'grinda-guide-2026': {
   title: 'Grinda guide 2026 – Grinda Wärdshus, gästhamn och direktbåt',
   excerpt: 'Grinda kallas skärgårdens hjärta och lever upp till det. Komplett guide: Grinda Wärdshus, gästhamnen, stränderna och direktbåten från Strömkajen.',
   category: 'Öguide',
   date: '2026-07-28',
   readTime: '6 min',
   emoji: '🌿',
   tags: ['Grinda', 'Värdshus', 'Gästhamn', 'Guide'],
   content: `
[Grinda](/o/grinda) är en av Stockholms skärgårds mest omtyckta öar — och med rätta. Naturreservat sedan 1968, bilfri, med ett välskött värdshus och en gästhamn som tar emot seglare från hela Östersjön. Den här guiden är allt du behöver för ett besök 2026.

## Hur du tar dig till Grinda

**Direktbåt från Strömkajen** med Waxholmsbåtarna — ca 1 timme 20 min. Sommartid går det flera avgångar per dag; se waxholmsbolaget.se för tidtabell.

**Med segelbåt** — Grinda är ett populärt stopp längs den klassiska Stockholms skärgårdsrutten. Gästhamnen tar emot upp till 200 båtar.

## Grinda Wärdshus

Värdshuset är öns hjärta. Byggt i traditionell skärgårdsarkitektur med rödfärgade trävillor mot skogen, uteservering mot havet och rum med sjöutsikt.

**Restaurangen** serverar lokalt och säsongsanpassat — torghandlad fisk, bär plockade på ön och brännvinsnuanser som passar maten. Boka bord i förväg för kvällsmaten; utflyktsgrupper och seglare konkurrerar om platserna.

**Övernattning** — Dubbelrum från ~1 400 kr/natt. Boka på grinda.se. Högsäsong (juli) är fullbokad månader i förväg.

**Uteserveringen** — Öppet för lunch och middag utan bokning. Kom tidigt på helger.

---

## Stränderna

Grinda har tre godkända bad-ställen:

**Södra bryggan** — En klippstrand med solbad och direkt tillgång från Waxholmsbåtens brygga.

**Grindaviken** — En vik på öns södra sida med fin badplats och lugn vattenyta.

**Naturreservat-leden** — Tar dig runt ön och förbi badplatser längs östra sidan.

## Gästhamnen

Grinda gästhamn är välskött med dusch, toalett, el och vatten vid bryggorna. Plats för ca 150–200 båtar.

**Boka i förväg** via marinadata.se eller via Grinda Wärdshus hemsida. Helgveckor i juli är fullbelagda – ring/boka minst en vecka i förväg.

<!-- UPPSKATTNING: ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör (2026-08) -->
Avgiften 2026: ~180–220 kr/natt för en standardbåt, inkl. el.

## Aktiviteter på Grinda

- **Vandring** — Runt hela ön ca 4 km längs välskötta stigar
- **Kajak** — Uthyrning finns på ön sommartid
- **Fiske** — Abborre och gädda i vikarna, havsöring längs ytterklipporna
- **Svampplockning** — Höst (sept–okt) när turisterna är borta

## Bra att veta

Grinda är ett naturreservat. Det innebär att du inte får tälta utanför anvisade platser, plocka blommor eller köra motorbåt i höghastighet längs stränderna. Respektera djurlivet — öns fågelstam är rik och höjden av häckning sammanfaller med högsäsongen.

Grinda med barn: barnvänlig, plana gångvägar, varm och lugn vattenyta vid södra bryggan. Perfekt för familjer med barn under tio år.
   `,
   faqs: [
     { q: 'Hur lång är båtresan till Grinda från Stockholm?', a: 'Direktbåten från Strömkajen med Waxholmsbåten tar ca 1 timme 20 minuter. Sommartid går det flera avgångar per dag.' },
     // UPPSKATTNING: ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör (2026-08)
     { q: 'Kan man övernatta på Grinda?', a: 'Ja. Grinda Wärdshus har rum från ~1 400 kr/natt. Gästhamnen tar emot båtar till ~200 kr/natt. Boka i god tid — högsäsong är det fullbokat fort.' },
     { q: 'Är Grinda lämplig för barnfamiljer?', a: 'Absolut. Grinda är bilfri, har lugna badplatser, plana gångvägar och ett barnvänligt värdshus. En av de bästa öarna i Stockholms skärgård för familjer med barn.' },
   ],
 },

 'basta-utflykter-skargard-2026': {
   title: 'De 12 bästa utflykterna i Stockholms skärgård 2026',
   excerpt: 'Från 25-minutersdagsturen till Fjäderholmarna till weekendäventyret på Sandhamn — tolv utflykter i Stockholms skärgård rangordnade efter tid, svårighetsgrad och upplevelse.',
   category: 'Inspiration',
   date: '2026-07-28',
   readTime: '10 min',
   emoji: '🗺️',
   tags: ['Utflykter', 'Tips', 'Stockholm', '2026', 'Inspiration'],
   content: `
Stockholms skärgård är 30 000 öar. Det kan verka överväldigande. Den här guiden rangordnar de tolv bästa utflykterna — kortaste till längst, enklaste till mest äventyrliga — så att du kan välja rätt nivå för just din dag.

## Snabbguide: Välj rätt utflykt

| Utflykt | Tid | Svårighet | Kostnad |
|---------|-----|-----------|---------|
| Fjäderholmarna | 3–4 timmar | ⬜ Enkel | Låg |
| Vaxholm | 1 dag | ⬜ Enkel | Låg |
| Grinda | 1 dag | ⬜ Enkel | Medel |
| Möja | 1 dag | 🟦 Medel | Medel |
| Sandhamn | 1–2 dagar | 🟦 Medel | Hög |
| Utö | 1–2 dagar | 🟦 Medel | Medel |

---

## 1. Fjäderholmarna – 25 minuter från Stockholm

Den kortaste och lättaste. [Fjäderholmarna](/o/fjaderholmarna) är bara 25 minuter med Waxholmsbåten från Strömkajen. Kaféer, hantverk, utsikt tillbaka mot Stockholm. Perfekt för en förmiddag eller en kvällstur med sällskap som aldrig sett skärgården.

**Res dit:** Waxholmsbåten från Strömkajen, avgår var 30:e minut sommartid.

## 2. Vaxholm – stad och fästning

[Vaxholm](/o/vaxholm) är ingen ö i traditionell mening — det är en stad som råkar ligga omgiven av vatten. Stenhusen vid hamnen, Vaxholms fästning på sin lilla klippö, och den bästa räksmörgåsen i skärgården. En komplett dagsutflykt.

**Res dit:** Waxholmsbåten från Strömkajen, ca 55 minuter. Alternativt buss 676 från Tekniska Högskolan.

## 3. Grinda – naturreservat och värdshus

[Grinda](/o/grinda) kallas skärgårdens hjärta. Direktbåt (1h 20min), Grinda Wärdshus för lunch och en promenad runt ön på 4 km. En perfekt heldagsutflykt för den som vill ha natur och mat i kombination.

## 4. Möja – bilfri ö med äkta karaktär

[Möja](/o/moja) är annorlunda. Bilfri, kuperad och med tre byar sammanbundna av byvägar som knappt finns på Google Maps. Waxholmsbåten dit (ca 1h 45 min), ett café och en dag av genuint skärgårdsliv.

## 5. Sandhamn – seglarnas ö

[Sandhamn](/o/sandhamn) är skärgårdens mest kända destination. Snabbåt från Stavsnäs (40 min) eller Waxholmsbåt från Strömkajen (2,5 h). Restauranger, Trouville-strand och en hamn fylld med segelbåtar. Boka boende tidigt om du stannar.

---

## 6. Utö – sandstrand och cykel

[Utö](/o/uto) är unik med sin sandstrand (Alsvik) och cykelleder. Nås med pendeltåg till Nynäshamn + båt (ca 1 timme). En av de bästa dagar du kan ha i Stockholms skärgård.

## 7. Ornö – vandring och vildmark

[Ornö](/o/orno) är för den som vill ha riktig natur. Bil krävs (vägfärja från Nynäshamn), men belöningen är en av skärgårdens bäst bevarade öar med runt-öled och fullständigt lugn.

## 8. Bullerö naturreservat – klippor och frihet

[Bullerö](/o/bullero) nås bara med båt och har ingen fast service. Charter eller privat båt, med tält och matsäck. En av Stockholms skärgårds vackraste öar för den som vill vara ifred.

## 9. Fjärdlång – yttre skärgårdens stillhet

En av de öar i yttre skärgården som fortfarande är relativt okänd. Charter- eller privat båt. Nakna klippor, havsluft och utsikt mot Östersjön.

## 10. Gällnö naturreservat – vandring och paddling

Norra Stockholms skärgård med markerade vandringsleder och möjlighet att hyra kajak i närheten. Kombinera vandring och paddling för en aktiv dag.

## 11. Möja + Sandhamn kombinationstur

Erfarna skärgårdsfarare gör gärna kombinationen: Möja på förmiddagen, med båt vidare till Sandhamn för middag och övernattning. Kräver planering men ger en bred bild av skärgårdens variation.

## 12. Segelbåtsdag i yttre skärgården

Det ultimate skärgårdsäventyret: chartra en segelbåt (med eller utan skeppare) och tillbringa en dag under segel i yttre skärgården. Erfarenhet rekommenderas men är inte obligatoriskt med skeppare ombord.

## Boktips för sommaren 2026

Boka Sandhamn och Grinda tidigt — helst i mars–april för sommarveckor. Fjäderholmarna och Vaxholm kräver ingen bokning. För de mer avlägsna öarna: ta med allt du behöver, informera någon om var du ska och planera för eventuellt dåligt väder.
   `,
   faqs: [
     { q: 'Vilken är den bästa utflykten i Stockholms skärgård för nybörjare?', a: 'Fjäderholmarna är den enklaste introduktionen — 25 minuter med båt, inga bil och en rolig halvdag. Nästa steg är Vaxholm eller Grinda.' },
     { q: 'Kan man åka till skärgårdsöarna utan bil?', a: 'Ja. De flesta populära öarna nås med Waxholmsbåtarna direkt från Strömkajen i Stockholm. Utö nås med pendeltåg till Nynäshamn + byte till båt.' },
     { q: 'Vilken tid på året är bäst för skärgårdsutflykter?', a: 'Högsäsongen är juli, men maj–juni och september är bättre för de som vill undvika trängseln. All naturupplevelse finns kvar — men köerna vid bryggorna försvinner.' },
   ],
 },
}

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({
 params,
}: {
 params: Promise<{ slug: string }>
}): Promise<Metadata> {
 const { slug } = await params
 const post = POSTS[slug]
 if (!post) return { title: 'Artikel hittades inte – Svalla' }
 return {
 title: post.title,
 description: post.excerpt,
 keywords: post.tags,
 alternates: { canonical: `https://svalla.se/blogg/${slug}` },
 openGraph: {
 title: post.title,
 description: post.excerpt,
 url: `https://svalla.se/blogg/${slug}`,
 type: 'article',
 locale: 'sv_SE',
 publishedTime: post.date,
 authors: ['Svalla'],
 images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: post.title }],
 },
 twitter: {
 card: 'summary_large_image',
 title: post.title,
 description: post.excerpt,
 images: ['/og-image.jpg'],
 },
 }
}

export function generateStaticParams() {
 return Object.keys(POSTS).map((slug) => ({ slug }))
}

// ─── Simple markdown-ish renderer ────────────────────────────────────────────

/** Parses inline **bold** and [text](url) within a string */
function parseInline(text: string, keyPrefix: string): React.ReactNode[] {
 // Split on markdown links first
 const linkChunks = text.split(/(\[[^\]]+\]\([^)]+\))/g)
 const nodes: React.ReactNode[] = []
 linkChunks.forEach((chunk, ci) => {
  const linkMatch = chunk.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
  if (linkMatch) {
   nodes.push(
    <a key={`${keyPrefix}-l${ci}`} href={linkMatch[2]}
     style={{ color: 'var(--sea)', textDecoration: 'underline', textUnderlineOffset: 2 }}>
     {linkMatch[1]}
    </a>
   )
  } else {
   // Handle **bold** within plain text
   const boldParts = chunk.split(/\*\*(.*?)\*\*/g)
   boldParts.forEach((bp, bi) => {
    if (bi % 2 === 1) nodes.push(<strong key={`${keyPrefix}-b${ci}-${bi}`} style={{ color: 'var(--txt)' }}>{bp}</strong>)
    else if (bp) nodes.push(bp)
   })
  }
 })
 return nodes
}

function renderContent(content: string) {
 const lines = content.trim().split('\n')
 const elements: React.ReactNode[] = []
 let key = 0

 for (let i = 0; i < lines.length; i++) {
 const line = lines[i]!

 // HTML-kommentarer i innehållet är redaktionella markörer (KÄLLA/UPPSKATTNING
 // för verify-claims-spärren) och ska ALDRIG renderas. Utan detta undantag
 // skrivs de ut som synlig brödtext — upptäckt 2026-08-12 innan det nådde prod.
 if (line.trim().startsWith('<!--')) continue

 if (line.startsWith('## ')) {
 elements.push(
 <h2 key={key++} style={{ color: 'var(--txt)', fontSize: 20, fontWeight: 600, marginTop: 32, marginBottom: 12 }}>
 {parseInline(line.slice(3), `h2-${key}`)}
 </h2>
 )
 } else if (line.startsWith('### ')) {
 elements.push(
 <h3 key={key++} style={{ color: 'var(--sea)', fontSize: 16, fontWeight: 700, marginTop: 24, marginBottom: 8 }}>
 {parseInline(line.slice(4), `h3-${key}`)}
 </h3>
 )
 } else if (line.startsWith('**') && line.endsWith('**')) {
 elements.push(
 <p key={key++} style={{ margin: '12px 0', fontWeight: 700, color: 'var(--txt)' }}>
 {line.slice(2, -2)}
 </p>
 )
 } else if (line.startsWith('- ')) {
 elements.push(
 <li key={key++} style={{ marginBottom: 6, marginLeft: 20, color: 'var(--txt2)' }}>
 {parseInline(line.slice(2), `li-${key}`)}
 </li>
 )
 } else if (line.startsWith('| ') && line.includes('|')) {
 // Skip table separator lines
 if (line.includes('---')) continue
 const cells = line.split('|').filter(c => c.trim())
 const isHeader = lines[i + 1]?.includes('---')
 elements.push(
 <tr key={key++} style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
 {cells.map((cell, ci) => (
 isHeader
 ? <th key={ci} style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 700, color: 'var(--sea)', fontSize: 13 }}>{cell.trim()}</th>
 : <td key={ci} style={{ padding: '8px 12px', fontSize: 13, color: 'var(--txt2)' }}>{cell.trim()}</td>
 ))}
 </tr>
 )
 } else if (line.startsWith('---')) {
 elements.push(<hr key={key++} style={{ border: 'none', borderTop: '1px solid rgba(0,0,0,0.1)', margin: '28px 0' }} />)
 } else if (line.trim() === '') {
 // skip empty lines
 } else {
 // Regular paragraph – handle bold + links inline
 elements.push(
 <p key={key++} style={{ margin: '10px 0', color: 'var(--txt2)', lineHeight: 1.75 }}>
 {parseInline(line, `p-${key}`)}
 </p>
 )
 }
 }

 // Wrap table rows in a table
 const wrapped: React.ReactNode[] = []
 let tableRows: React.ReactNode[] = []
 elements.forEach((el) => {
 if (el && typeof el === 'object' && 'type' in el && (el as { type: unknown }).type === 'tr') {
 tableRows.push(el)
 } else {
 if (tableRows.length) {
 wrapped.push(
 <div key={`table-${wrapped.length}`} style={{ overflowX: 'auto', margin: '16px 0' }}>
 <table style={{ borderCollapse: 'collapse', width: '100%', background: 'var(--bg)', borderRadius: 8 }}>
 <tbody>{tableRows}</tbody>
 </table>
 </div>
 )
 tableRows = []
 }
 wrapped.push(el)
 }
 })
 if (tableRows.length) {
 wrapped.push(
 <div key={`table-${wrapped.length}`} style={{ overflowX: 'auto', margin: '16px 0' }}>
 <table style={{ borderCollapse: 'collapse', width: '100%', background: 'var(--bg)', borderRadius: 8 }}>
 <tbody>{tableRows}</tbody>
 </table>
 </div>
 )
 }

 return wrapped
}

// ─── Region crosslinks per post ───────────────────────────────────────────────

const REGION_LINKS: Record<string, { href: string; label: string }[]> = {
 'basta-restaurangerna-sandhamn': [{ href: '/stockholms-skargard', label: 'Stockholms skärgård' }],
 'kajak-stockholms-skargard-nyborjare': [{ href: '/stockholms-skargard', label: 'Stockholms skärgård' }, { href: '/aktiviteter', label: '🎯 Aktiviteter i skärgården' }],
 'dolda-parlor-moja': [{ href: '/stockholms-skargard', label: 'Stockholms skärgård' }],
 'bransle-ankring-skargard': [{ href: '/stockholms-skargard', label: 'Stockholms skärgård' }, { href: '/hamnar-och-bryggor', label: 'Hamnar & bryggor' }],
 'sommar-skargard-tips': [{ href: '/stockholms-skargard', label: 'Stockholms skärgård' }, { href: '/aktiviteter', label: '🎯 Aktiviteter i skärgården' }],
 'fjaderholmarna-dagstur': [{ href: '/stockholms-skargard', label: 'Stockholms skärgård' }],
 'vaxholm-guide': [{ href: '/stockholms-skargard', label: 'Stockholms skärgård' }],
 'uto-guide': [{ href: '/stockholms-skargard', label: 'Stockholms skärgård' }],
 'segling-nyborjare-guide': [{ href: '/stockholms-skargard', label: 'Stockholms skärgård' }, { href: '/nyborjarguider', label: 'Nybörjarguider' }, { href: '/segelrutter', label: 'Segelrutter' }],
 'basta-badplatserna': [{ href: '/stockholms-skargard', label: 'Stockholms skärgård' }, { href: '/aktiviteter', label: '🎯 Aktiviteter i skärgården' }],
 'vandring-orno-uto': [{ href: '/stockholms-skargard', label: 'Stockholms skärgård' }, { href: '/aktiviteter', label: '🎯 Aktiviteter i skärgården' }],
 'cykling-moja-gallno': [{ href: '/stockholms-skargard', label: 'Stockholms skärgård' }, { href: '/aktiviteter', label: '🎯 Aktiviteter i skärgården' }],
 'fiske-skargard-guide': [{ href: '/stockholms-skargard', label: 'Stockholms skärgård' }, { href: '/aktiviteter', label: '🎯 Aktiviteter i skärgården' }],
 'gasthamnar-guide': [{ href: '/stockholms-skargard', label: 'Stockholms skärgård' }, { href: '/hamnar-och-bryggor', label: 'Hamnar & bryggor' }],
 'vinter-skargard': [{ href: '/stockholms-skargard', label: 'Stockholms skärgård' }],
 'barnfamilj-skargard': [{ href: '/stockholms-skargard', label: 'Stockholms skärgård' }, { href: '/aktiviteter', label: '🎯 Aktiviteter i skärgården' }],
 'svenska-hoar-sandhamn': [{ href: '/stockholms-skargard', label: 'Stockholms skärgård' }],
 'grilla-naturhamn': [{ href: '/stockholms-skargard', label: 'Stockholms skärgård' }],
 'norrtelje-norra-skargard': [{ href: '/stockholms-skargard', label: 'Stockholms skärgård' }],
 'packlista-bat': [{ href: '/stockholms-skargard', label: 'Stockholms skärgård' }, { href: '/hamnar-och-bryggor', label: 'Hamnar & bryggor' }],
 'havsbastu-guide': [{ href: '/stockholms-skargard', label: 'Stockholms skärgård' }, { href: '/aktiviteter', label: '🎯 Aktiviteter i skärgården' }],
 'segling-klassiska-leder': [{ href: '/stockholms-skargard', label: 'Stockholms skärgård' }, { href: '/segelrutter', label: 'Segelrutter' }],
}

// ─── Page ─────────────────────────────────────────────────────────────────────

import React from 'react'
import { emojiToIcon } from '@/lib/iconMap'

export default async function BloggPostPage({
 params,
}: {
 params: Promise<{ slug: string }>
}) {
 const { slug } = await params
 const post = POSTS[slug]
 if (!post) notFound()

 const relatedLinks = REGION_LINKS[slug] ?? []
 const relatedPosts = getRelatedPosts(slug, 3)

 const jsonLd = {
 '@context': 'https://schema.org',
 '@type': 'Article',
 '@id': `https://svalla.se/blogg/${slug}#article`,
 headline: post.title,
 description: post.excerpt,
 datePublished: post.date,
 dateModified: post.updatedAt ?? post.date,
 url: `https://svalla.se/blogg/${slug}`,
 image: {
   '@type': 'ImageObject',
   url: `https://svalla.se/api/og/blogg/${slug}`,
   width: 1200,
   height: 630,
 },
 author: { '@type': 'Organization', '@id': 'https://svalla.se/#organization', name: 'Svalla' },
 publisher: { '@id': 'https://svalla.se/#organization' },
 keywords: post.tags.join(', '),
 inLanguage: 'sv-SE',
 mainEntityOfPage: { '@type': 'WebPage', '@id': `https://svalla.se/blogg/${slug}` },
 }

 const faqSchema = post.faqs && post.faqs.length > 0 ? {
   '@context': 'https://schema.org',
   '@type': 'FAQPage',
   mainEntity: post.faqs.map(f => ({
     '@type': 'Question',
     name: f.q,
     acceptedAnswer: { '@type': 'Answer', text: f.a },
   })),
 } : null

 return (
 <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 80 }}>
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
 />
 {faqSchema && (
   <script
     type="application/ld+json"
     dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
   />
 )}
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify({
 '@context': 'https://schema.org',
 '@type': 'BreadcrumbList',
 itemListElement: [
 { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://svalla.se' },
 { '@type': 'ListItem', position: 2, name: 'Bloggen', item: 'https://svalla.se/blogg' },
 { '@type': 'ListItem', position: 3, name: post.title, item: `https://svalla.se/blogg/${slug}` },
 ],
 }) }}
 />
 {/* Header */}
 <div style={{
 background: 'var(--grad-sea-hero)',
 padding: '60px 20px 40px',
 }}>
 <div style={{ maxWidth: 720, margin: '0 auto' }}>
 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
 <Link href="/" style={{ textDecoration: 'none', display: 'inline-block' }}>
 <SvallaLogo height={24} color="#ffffff" />
 </Link>
 <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
   <Link href="/blogg" style={{ color: 'rgba(255,255,255,0.65)', fontSize: 12, textDecoration: 'none' }}>
     ← Bloggen
   </Link>
   <Link href="/nyhetsbrev" style={{
     color: '#fff', fontSize: 12, fontWeight: 700, textDecoration: 'none',
     background: 'rgba(255,255,255,0.18)', borderRadius: 20,
     padding: '5px 12px', border: '1px solid rgba(255,255,255,0.25)',
   }}>
     ✉ Nyhetsbrev
   </Link>
 </div>
 </div>
 <div style={{ display: 'flex', gap: 10, marginTop: 16, marginBottom: 12, flexWrap: 'wrap' }}>
 <span style={{
 fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.9)',
 background: 'rgba(255,255,255,0.15)', padding: '4px 12px', borderRadius: 20,
 }}>{post.category}</span>
 <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', paddingTop: 4 }}>{post.readTime}</span>
 <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', paddingTop: 4 }}>
 {new Date(post.date).toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' })}
 </span>
 </div>
 <h1 style={{ fontSize: 26, fontWeight: 700, color: '#fff', margin: '0 0 12px', lineHeight: 1.2, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
 <span style={{
   display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
   width: 44, height: 44, borderRadius: 12,
   background: 'rgba(255,255,255,0.14)', color: '#fff',
   flexShrink: 0,
 }}>
 <Icon name={emojiToIcon(post.emoji)} size={24} stroke={1.7} />
 </span>
 {post.title}
 </h1>
 <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, margin: 0, lineHeight: 1.6 }}>
 {post.excerpt}
 </p>
 </div>
 </div>

 {/* Content */}
 <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 20px' }}>
 <article style={{
 background: 'var(--white)',
 borderRadius: 16,
 padding: '36px 32px',
 boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
 fontSize: 15,
 }}>
 {(() => {
   // Klyv vid första --- för mid-article email capture
   const dividerIdx = post.content.indexOf('\n---\n')
   if (dividerIdx === -1) return renderContent(post.content)
   const firstHalf = post.content.slice(0, dividerIdx)
   const secondHalf = post.content.slice(dividerIdx + 5)
   return (
     <>
       {renderContent(firstHalf)}
       <div style={{
         margin: '32px 0',
         background: 'linear-gradient(135deg, rgba(30,92,130,0.06) 0%, rgba(45,125,138,0.06) 100%)',
         borderRadius: 14,
         padding: '20px 22px',
         border: '1px solid rgba(30,92,130,0.10)',
       }}>
         <EmailSignup
           variant="inline"
           source={`blogg-${slug}-mid`}
           title="Häng med i skärgårdsvärlden"
           description="Insider-tips och öppna öar — varannan tisdag. Helt gratis."
           buttonLabel="Prenumerera gratis"
         />
       </div>
       {renderContent(secondHalf)}
     </>
   )
 })()}
 </article>

 {/* Tags */}
 <div style={{ display: 'flex', gap: 8, marginTop: 24, flexWrap: 'wrap' }}>
 {post.tags.map(tag => (
 <span key={tag} style={{
 fontSize: 12, color: 'var(--sea)', background: 'rgba(30,92,130,0.08)',
 padding: '4px 12px', borderRadius: 20, fontWeight: 600,
 }}>#{tag}</span>
 ))}
 </div>

 {/* Relaterade artiklar — internal linking-graf för SEO */}
 <RelatedPosts posts={relatedPosts} heading="Läs mer i bloggen" />

 {/* Region crosslinks */}
 {relatedLinks.length > 0 && (
 <div style={{ marginTop: 24 }}>
 <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 12 }}>
 Utforska mer
 </div>
 <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
 {relatedLinks.map(link => (
 <Link key={link.href} href={link.href} style={{
 padding: '8px 16px', borderRadius: 20, textDecoration: 'none',
 background: 'rgba(30,92,130,0.07)', border: '1.5px solid rgba(30,92,130,0.15)',
 color: 'var(--sea)', fontSize: 13, fontWeight: 600,
 }}>{link.label}</Link>
 ))}
 </div>
 </div>
 )}

 {/* FAQ-sektion */}
 {post.faqs && post.faqs.length > 0 && (
   <div style={{ marginTop: 40 }}>
     <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--txt)', marginBottom: 16 }}>
       Vanliga frågor
     </h2>
     <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
       {post.faqs.map((faq, i) => (
         <div key={i} style={{
           background: 'var(--white)',
           border: '1px solid rgba(10,123,140,0.12)',
           borderRadius: 12,
           padding: '16px 20px',
         }}>
           <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--txt)', marginBottom: 8 }}>
             {faq.q}
           </div>
           <div style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.7 }}>
             {faq.a}
           </div>
         </div>
       ))}
     </div>
   </div>
 )}

 {/* Newsletter — kontextuell CTA */}
 <div style={{
   marginTop: 44,
   borderTop: '2px solid rgba(30,92,130,0.10)',
   paddingTop: 36,
 }}>
   <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--sea)', textTransform: 'uppercase', letterSpacing: '0.8px', margin: '0 0 10px' }}>
     Gillade du den här artikeln?
   </p>
   <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--txt)', margin: '0 0 10px', lineHeight: 1.3 }}>
     Fler guider likt denna, varannan tisdag
   </h3>
   <p style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.7, margin: '0 0 22px', maxWidth: 480 }}>
     Vi skriver om Stockholms skärgård — öppna öar, öppettider och insider-tips du inte hittar på TripAdvisor. Inga annonser. Inga länklistor. Bara skärgård.
   </p>
   <EmailSignup
     source={`blogg-${slug}-bottom`}
     variant="inline"
     title=""
     description=""
     buttonLabel="Skriv upp mig gratis →"
   />
   <p style={{ fontSize: 12, color: 'var(--txt3)', marginTop: 10 }}>
     Avregistrera dig när du vill. <a href="/nyhetsbrev" style={{ color: 'var(--sea)', textDecoration: 'underline' }}>Se ett smakprov →</a>
   </p>
 </div>

 {/* Dela-knappar */}
 <div style={{ marginTop: 32, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
   <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Dela:</span>
   <a
     href={`https://wa.me/?text=${encodeURIComponent(`${post.title} – svalla.se/blogg/${slug}`)}`}
     target="_blank" rel="noopener noreferrer"
     style={{
       display: 'inline-flex', alignItems: 'center', gap: 6,
       padding: '8px 14px', borderRadius: 20, textDecoration: 'none',
       background: '#25d366', color: '#fff', fontSize: 13, fontWeight: 700,
     }}
   >
     <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.106 1.523 5.836L0 24l6.335-1.499A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.877 9.877 0 01-5.031-1.375l-.361-.214-3.741.885.924-3.641-.235-.374A9.86 9.86 0 012.106 12C2.106 6.58 6.58 2.106 12 2.106c5.42 0 9.894 4.474 9.894 9.894 0 5.42-4.474 9.894-9.894 9.894z"/></svg>
     WhatsApp
   </a>
   <CopyLinkButton url={`svalla.se/blogg/${slug}`} />
 </div>

 {/* Back + CTA */}
 <div style={{ display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap' }}>
 <Link href="/blogg" style={{
 padding: '12px 24px', background: 'var(--white)', color: 'var(--sea)',
 borderRadius: 20, fontWeight: 700, fontSize: 14, textDecoration: 'none',
 border: '1.5px solid #1e5c82',
 }}>← Fler artiklar</Link>
 <Link href="/upptack" style={{
 padding: '12px 24px', background: 'var(--sea)', color: '#fff',
 borderRadius: 20, fontWeight: 700, fontSize: 14, textDecoration: 'none',
 }}>Utforska kartan →</Link>
 </div>
 </div>
 </div>
 )
}
