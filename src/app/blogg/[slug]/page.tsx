import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import SvallaLogo from '@/components/SvallaLogo'

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
}

const POSTS: Record<string, Post> = {

  'basta-restaurangerna-sandhamn': {
    title: 'De 5 bästa restaurangerna på Sandhamn 2026',
    excerpt: 'Sandhamn är seglingscentrum och skärgårdsklassiker. Men vilka ställen är verkligen värda ett besök?',
    category: 'Mat & dryck',
    date: '2026-04-10',
    readTime: '5 min',
    emoji: '🍽',
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
    emoji: '🛶',
    tags: ['Kajak', 'Nybörjare', 'Paddling'],
    content: `
Stockholms skärgård är ett av världens bästa paddlingslandskap. 30 000 öar, skyddade vikar och ett unikt allemansrätt som låter dig paddla nästan var du vill och övernatta i naturen. Som nybörjare är det lätt att komma igång – men det finns saker du behöver veta innan du sätter dig i båten.

## Utrustning

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

### Strömma – Blidö
Norra Upplands skärgård runt Blidö är idealt för nybörjare. Lugnt vatten, korta sträckor och vackra naturhamnar.

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
    emoji: '🏝',
    tags: ['Möja', 'Bilfri ö', 'Skärgård'],
    content: `
Det finns öar i Stockholms skärgård som alla vet om – Sandhamn, Fjäderholmarna, Vaxholm. Och sedan finns det Möja. Bilfri, lagom svårtillgänglig och med en genuinitet som turistifierade öar saknar. Det är precis det som gör Möja till en av skärgårdens finaste hemligheter.

## Varför Möja?

Möja är Stockholms skärgårds näst folkrikaste ö, men känslan är långt ifrån urban. Inga bilar, inga köer, inga hotellkedjor. Istället: cyklar, båtar, get-driven och en takt som påminner dig om vad sommaren egentligen är till för.

Ön är stor nog att utforska – drygt 12 km lång – men liten nog att inte kännas anonym. Här vet folk vem du är när du kommit tillbaka andra gången.

## Komma dit

Waxholmsbåten från Strömkajen tar ca 2,5 timmar. Alternativet är att ta bilen till Stavsnäs och ta Waxholmsbåten därifrån – då tar det ca 1 timme. Under högsäsong går det fler avgångar, men kolla tidtabellen noga på waxholmsbolaget.se.

## Vad du ska göra

**Hyr cykel vid bryggan.** Det är det självklara sättet att ta sig runt ön. Cykelvägarna är platta och fina längs kusterna, lite kuperade inne i skogen.

**Bada vid Möja Hälludden.** En av öns finaste badplatser med klippor och klart vatten. Lite promenad från huvudbryggan men väl värt det.

**Fika hos Möja Bageri.** Genuint lokalt bageri med kanelbullar som smakar som de ska smaka.

**Naturhamnen i söder.** Om du har med dig kajak eller liten båt, ta dig till den skyddade naturhamnen i södra delen av ön. Sällar och storskarvar håller ofta till här.

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
Längst söderut på Stockholmssidan – Nynäshamns gästhamn är välutrustad och prisvärdd. Bra sista stopp innan Landsort.

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

Ställ klockan på 4:30. Ta med termos och en filt. Sitt på en klippa och se hur skärgården vaknar. Det är tyst på ett sätt som inte existerar resten av dagen. En upplevelse du inte glömmer.

## 2. Käka räkor direkt från båten

Räkor inköpta från en fiskebåt ute i skären, ätna med fingrarna på däck med havet runt om. Det finns ingenting enklare och ingenting bättre.

## 3. Bada naket i en naturhamn

Hitta en liten vik utan grannar. Kasta kläderna och hoppa i. Befrielse i ordets allra enklaste mening.

## 4. Paddla kajak i gryningen

Vattnet är stilla, dimman lyfter och du är ensam med sin tankar och havsfåglarna. Kajak i gryningen är skärgårdens bäst bevarade hemlighet.

## 5. Grilla på en skär

Hitta en liten klippa ute i ytterskärgården. Grilla hamburgare eller fisk. Sommar distillerat till ett enda ögonblick.

## 6. Övernatta i en naturhamn

Förtöj vid en klippa, sov ombord eller tälta. Vakna till ljudet av vatten mot skrovet och en omärkt kaffe med havsutsikt.

## 7. Ta en gammal ångbåt

Waxholmsbolagets äldre båtar är en del av skärgårdshistorien. Ta en tur bara för resan skull – inte destinationen.

## 8. Besök en fyr

Landsort, Söderarm, Svenska Björn. Fyrarnas historia är skärgårdens historia. Flera är möjliga att besöka och ha picknick vid.

## 9. Hitta ett ställe som inte finns på Google Maps

Fråga en lokal. Använd Svalla. Hitta restaurangen, badplatsen eller naturhamnen som inte är med i reseguiden. Det är alltid den bästa platsen.

## 10. Titta på stjärnorna

Ute i ytterskärgården, långt från Stockholms ljusföroreningar, är natthinmeln ett skådespel. Ta med en filt och ligg på klippan. Sommar är kortvarig – det är värda varje stjärna.
    `,
  },

  'fjaderholmarna-dagstur': {
    title: 'Fjäderholmarna – perfekt dagstur från Stockholm',
    excerpt: 'Bara 25 minuter från Strandvägen och du är i skärgården. Fjäderholmarna är den perfekta introduktionen.',
    category: 'Öguide',
    date: '2026-01-30',
    readTime: '5 min',
    emoji: '⛴',
    tags: ['Fjäderholmarna', 'Dagstur', 'Stockholm'],
    content: `
Om du aldrig sett Stockholms skärgård men vill starta försiktigt – Fjäderholmarna är din ö. 25 minuters båtresa från Strandvägen, öppen sommarsäsong och ett litet ösamhälle med restauranger, hantverk och promenadstråk.

## Ta sig dit

Båt från Strandvägen, Nybroplan eller Allmänna Gränd. Sommarsäsong med täta avgångar (var 30:e minut under högtrafik). Pris ca 125 kr tur och retur. Inga förkunskaper behövs – det är en riktig båt som Waxholmsbolaget kör.

## Vad du gör på Fjäderholmarna

Öarna är fyra till antalet – bara Stora Fjäderholmen är tillgänglig för besökare. Det räcker gott.

**Promenera runt ön.** Det tar ca 45 minuter att gå runt hela Stora Fjäderholmen längs strandstigen. Fantastisk utsikt, historiska byggnader och fågellivet som sköljer in från havet.

**Hantverksgallerierna.** Unika butiker med lokalt hantverk – keramik, smycken, textil. Inte turistfällan du kanske tror utan genuint gott hantverk.

**Akvariet.** Litet men välgjort akvarium med Östersjöns fisk och havsliv. Bra för barn, intressant för vuxna.

## Äta och dricka

**Fjäderholmarnas Krog** – det självklara alternativet för en riktigt lunch eller middag. Havsutsikt, fisk och skaldjur och en av Stockholms bästa sommarterrasser. Boka bord.

**Rökeriet** – lite mer avslappnat, fokus på rökt fisk och skaldjur. Perfekt för en enkel lunch.

**Båthuset Bar & Grill** – drinkar och snabbmat nere vid bryggan. Bra sundowner-plats.

## Bästa tid att åka

Morgon eller sen eftermiddag – undvik mitt på dagen i juli när dagstursturister är som flest. En kvällstur med middag på Fjäderholmarnas Krog och sista båten hem är en av Stockholms bästa sommarupplevelser.

**Tips:** Köp returbiljett ombord eller via appen. Checka avgångstider noga – sista båten tillbaka kan vara tidigare än du tror.
    `,
  },

  'vaxholm-guide': {
    title: 'Vaxholm – skärgårdsstadens kompletta guide',
    excerpt: 'Vaxholm är porten till skärgården. En stad med fästning, historia, fantastiska restauranger och direktbåt från Strömkajen.',
    category: 'Öguide',
    date: '2026-04-05',
    readTime: '6 min',
    emoji: '🏰',
    tags: ['Vaxholm', 'Fästning', 'Dag- eller weekendtur'],
    content: `
Vaxholm kallas för porten till skärgården – och det är en rättvis beskrivning. Staden är startpunkten för Waxholmsbåtarna ut i Stockholmsskärgård, men förtjänar att besökas i sig. Fästningen på holmen mitt i sundet, trähusen längs kanalen, restaurangerna vid vattnet. En dag i Vaxholm räcker inte.

## Ta sig dit

**Båt:** Waxholmsbåten från Strömkajen, ca 1,5 timmar. En av de trevligaste turerna i sig.

**Buss:** 670 från Tekniska Högskolan, ca 1 timme. Billigare men missar skärgårdsupplevelsen.

**Bil:** E18 norrut mot Norrtälje, avfart mot Vaxholm. Ca 45 min från centrala Stockholm.

## Vaxholms fästning

Fästningen på Kastellholmen i Vaxholms sund är Stockholms skärgårds bäst bevarade historiska monument. Byggd under 1500-talet och förstärkt fram till 1800-talet. Idag museum – ta färjan ut till fästningen (5 minuters tur) och vandra runt i historien.

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
I sydvästra Stockholms skärgård, ca 60 km från Stockholm, ligger Utö. Det är en av skärgårdens mest kompletta öar – historia, natur, mat, aktiviteter och infrastruktur som gör ett längre besök möjligt utan att sakna fastlandets bekvämligheter.

## Historien under marken

Utö har gruvor. Järnmalmsbrytning pågick här från 1100-talet till 1879 – en av Sveriges äldsta kända gruvdrifter. Gruvmuseet berättar historien och det går faktiskt att gå ner i de gamla schakten. En unik upplevelse som sätter ön i ett helt annat perspektiv.

## Cykla runt Utö

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
    emoji: '⛵',
    tags: ['Segling', 'Nybörjare', 'Hyrbåt'],
    content: `
Segling ser svårt ut utifrån. Det är det inte – men det kräver lite grundkunskap och respekt för havet innan du ger dig ut. Den goda nyheten: med rätt förberedelse kan du segla en enklare båt i skyddad skärgård redan efter en helgkurs.

## Börja med en kurs

Seglingen rätt: börja med en SXK (Segel sällskapet för att lära sig), KSSS eller liknande klubbs nybörjarkurs. En tvådagars grundkurs kostar ca 2 000–3 500 kr och lär dig det du behöver för att ta ut en hyrbåt i lugn skärgård.

Du lär dig: kryssa (segla mot vinden), falla (segla med vinden), revning (minska segel i vind), förtöja och lägga till.

## Hyra segelbåt

Det finns flera hyrbåtsföretag runt Stockholm. Vanligast är att hyra en 28–32 fots segelbåt – tillräckligt stor för 4 personer och tillräckligt liten för att hanteras av en nybörjare.

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
    readTime: '6 min',
    emoji: '🏊',
    tags: ['Bad', 'Badplatser', 'Sommar'],
    content: `
Stockholms skärgård har hundratals badplatser. De flesta är dolda klippor nåbara bara med båt. Några är klassiker. Alla är gratis tack vare allemansrätten. Här är våra tolv favoriter.

## 1. Ängsholmen, Ornö
Sandstrand i sydvästra skärgården med kristallklart vatten. En av de få riktiga sandstränderna i stockholmsskärgård. Nås med båt eller kajak från Ornö.

## 2. Möja Hälludden
Klippbad på Möjas östra sida. Lite promenad från bryggan men med en av öns bästa utsikter. Solsäker plats från tidig morgon.

## 3. Sandhamns Sandpiper
Sandstrand strax utanför Sandhamn med friare läge mot havet. Ta kayak eller promenera från hamnen. Klart, öppet vatten med lite mer våg än de skyddade vikarna.

## 4. Utö Sandvik
Lång sandstrand på Utös sydöstra del. Grundt vatten – bra för barn. Vacker solnedgångssida.

## 5. Fejan, naturreservat
En av skärgårdens finaste klippöar norr om Furusund. Klar vatten, vita klippor och en naturhamn som är lika fin att bada i som att ankra i.

## 6. Ingmarsö, norra sidan
Norra Ingmarsös klippbad är ostört och otouristifierat. Ta cykel från södra bryggan upp till norra sidan.

## 7. Västerudd, Värmdö
Lättillgängligt klippbad med buss och promenad från Gustavsberg. Bra för Stockholmsbor utan båt.

## 8. Björkvik, Gällnö
Gällnö är bilfri och rofylld. Björkvik på öns västra sida har klippor och fin vik. Perfekt kombination med en cykeltur på ön.

## 9. Norrpada
Litet skär ute i ytterskärgården söder om Furusund. Bäst nått med fritidsbåt. Renaste vattnet av alla på listan.

## 10. Huvudskär
Ytterst i ytterskärgården. Mer äventyr än bekvämt bad – men att bada här med öppen Östersjö runtomkring är något alldeles speciellt.

## 11. Dalarö klapperstensstrand
Söder om Stockholm, nåbar med bil. Gammal fiskeby och fin klapperstensstrand. Bra för familjer.

## 12. Kymmendö (Strindbergs ö)
August Strindberg bodde här och inspirerades. Ön är numera naturreservat – besök med respekt och njut av en av stockholmsskärgårdens mest stämningsfulla bad.

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
    emoji: '🥾',
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

**Kustslingan** (12 km) – Längs Utös östra kust mot naturhamnarna och ner mot södra udden. Lång dagstur men ett av de finaste naturstigarna i stockholmsskärgård.

**Kortslingan** (5 km) – Perfekt för en kortare förmiddagstur med tid för lunch på värdshuset efteråt.

## Utrustning för skärgårdsvandring

Terrängen är generellt lättframkomlig men kan vara hal på klipporna. Ta med:
- Vandringsskor med grepp (inte sneakers)
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

**Norra rundan** (ca 8 km) – Från Möja brygga norrut och in mot bykärnan. Grusvägar, gammal bebyggelse och en naturhamn vid norr udden som är perfekt för en paus.

**Södra rundan** (ca 12 km) – Ner längs östra kusten mot södra udden. Mer kuperat, bättre utsikt mot ytterskärgården. Ta med matsäck.

**Uthyrning:** Möja Cykeluthyrning vid bryggan, ca 100–150 kr/dag. Elektriska cyklar finns för den som vill ha lite hjälp i backarna.

**Äta:** Möja Wärdshus är klart bästa alternativet för middag. Möja Bageri för fika. Vänta inte för länge – Möja Bageri stänger ofta tidigt.

## Gällnö – den lilla ön med stort välbefinnande

Gällnö är mindre än Möja och mer lättcyklad. Ön är bilfri och lite mer undanskymd – färre turister, mer ro.

**Rundan runt ön** (ca 6 km) – En lagom dagstur. Ön är platt längs kusterna men lite backig inne i mitten. Fina klippbad på västra sidan.

**Björkvik** är den finaste badplatsen på Gällnö. Ta cykeln dit och hoppa i från klipporna.

**Stationärens restaurang** vid bryggan – öppen sommarsäsong, enkel mat och en av skärgårdens bästa korvar.

## Tips för cykeldagen

- Kom med tidig båt – ön vaknar kring nio, du kan cykla i freden
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
    emoji: '🎣',
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
- Flytväst om du fiskar från kajak eller liten båt
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
    emoji: '⚓',
    tags: ['Gästhamn', 'Båt', 'Övernattning'],
    content: `
En bra gästhamn är mer än bara en förtöjningsplats. Det är slutpunkten på en lång seglingsdag, platsen för en kall öl i solnedgången och grunden för nästa dags äventyr. Här är tio av skärgårdens bästa.

## 1. Sandhamns gästhamn ★★★★★

Skärgårdens mest kända gästhamn är också bland de bästa. Utmärkt service, välskötta faciliteter och ett fantastiskt läge i seglingens hjärta. Fullbokad i juli – boka platser via waxholmsbolaget.se eller direkt med hamnen.

Pris: ca 380 kr/natt för 30 fot.

## 2. Utö gästhamn ★★★★☆

Perfekt läge vid Utö Värdshus. Nyrenoverade pontoner, el, vatten och rena faciliteter. Kombinera gästhamnen med middag på värdshuset för en av skärgårdens bästa kvällar.

Pris: ca 350 kr/natt.

## 3. Vaxholms gästhamn ★★★★☆

Centralt läge i Vaxholms hamn. Bra service, promenadavstånd till stadens alla restauranger. Lite trafikerat av färjor men välskött och rimligt prisad.

Pris: ca 280 kr/natt.

## 4. Dalarö gästhamn ★★★★☆

Charmig småhamsn söder om Stockholm. Bra service, välkänd krog i hamnen och lättillgänglig från Stockholm (E18 + landsväg). Populär startpunkt för turer mot Utö och Landsort.

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

**Tips:** Svalla-kartan visar alla gästhamnar med ⚓-ikonen. Filtrera på "Hamn" för att hitta alternativen längs din planerade rutt.
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
Sommaren i skärgården är fantastisk – men det vet alla. Det är vintern som är den bäst bevarade hemligheten. Öarna töms på turister, restaurangerna stänger eller går över till veckoslutsmeny, och den lugn som uppstår är ett av de vackraste tillstånd Sverige har att erbjuda.

## Varför vinter i skärgården?

**Tystnaden är annorlunda.** Utan motorbåtarnas buller, utan partyseglarnas radio och utan turistmassornas sorl – skärgårdsljudet på vintern är Östersjöns böljande, fåglarnas rop och kvistar som knäpper i kylan.

**Ljuset är unikt.** Det låga vinterjuset ger en klokhet åt klipporna och vattnet som sommaren aldrig producerar. Fotografer vet detta – de bästa skärgårdsbilderna tas inte i juli.

**Du är nästan ensam.** Öar som på sommaren är nästan oframkomliga av turister är vintertid nästan tomma. Vaxholm, Fjäderholmarna, Sandhamn – du kan promenera utan att tränga dig fram.

## Vad som är öppet

Inte allt – var beredd på det. Men mer än du tror.

**Waxholmsbåtarna** går året runt till de flesta öar. Reduceradtidtabell men fungerande.

**Vaxholms Hotell och Seglarhotellet i Sandhamn** håller öppet vintertid med begränsat utbud.

**Fjäderholmarna** öppnar för vinster-evenemang och julmarknader.

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
- **Utö** – sandstrand vid Utö Sandvik, grundt vatten bra för barn

## 2. Planera vädret noga

Barn är mer känsliga för väder – kylvindar, direkt sol utan skugga och regnkyla. Kolla SMHI 48 timmar i förväg. Ha alltid regnjackor och ett extra lager.

## 3. Flytväst är inte förhandlingsbart

Barn under 12 år bär flytväst när de är på däck. Inte vid kajen. Inte "nästan hela tiden." Hela tiden. Det är enkelt.

## 4. Välj rätta badplatser

Klippbad med djupt vatten direkt utanför kan vara krävande för små barn. Välj:
- Utö Sandvik (sandstrand, grundt)
- Dalarö (klapperstensstrand, lättillgängligt)
- Stadsfjärden runt Vaxholm (lugnt, tryggt)

## 5. Mat och mellanmål

Barn i skärgård behöver mer mat och vatten än de tror. Ta med mer än planerat – busiga ungar och frisk luft ökar kaloribehovet. Ha alltid snabba mellanmål tillgängliga ombord.

## 6. Platsbaserade aktiviteter

**Minibåtar och pedalbåtar** finns att hyra på de flesta gästhamnar – en favorit hos barn i alla åldrar.

**Fiske** – enkelt pilkfiske från brygga eller klippa är en magisk aktivitet för barn från ca 5 år.

**Snorkling** – i klart skärgårdsvatten med snorkelmask är undervattenvärlden en upplevelse som fastnar.

## 7. Tidiga kvällar och gott om tid

Ha ingen tajt tidtabell. Barn behöver extra tid för allt – att gå ombord, att byta kläder, att hitta en krabba under en sten. Bygg in extra tid i planeringen och boka inte en Stockholmsmiddag för tidigt.

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

Svenska Högarna är en liten ögrupp ytterst i Stockholms skärgård, ca 85 km från Stockholm. Naturreservat sedan 1990-talet, med ett gammalt lotskomp och en fyrvaktarbostad som idag används som naturum och enkel övernattning.

Ön nås normalt på ca 4–5 timmar med segelbåt från Stockholm, eller med snabbare motorbåt. Det finns ingen reguljärbåt dit.

## Fyren och historien

Fyren Svenska Björn ligger på en klippa strax söder om Högarna – ett av de vackraste fyrscenarion i hela Östersjön. Lotsstationen på Högarna var bemannad i över hundra år och lotsade in Stockholmstrafiken i säkerhet. Idag är det naturum och förklarar lotshistoriens roll i skärgårdens sjöfart.

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
    emoji: '🔥',
    tags: ['Grill', 'Eldning', 'Allemansrätten'],
    content: `
Grillning i naturhamnen är en av skärgårdens finaste traditioner. Men reglerna för eldning är inte alltid uppenbara – och de varierar med väder, plats och tid på året. Här är vad du behöver veta.

## Alemansrätten och eldning

Allemansrätten ger rätt att vistas i naturen – men inte automatisk rätt att elda. Eldning kräver att det är säkert och att du inte skadar marken eller orsakar brandrisk.

**Grundreglerna:**
- Elda aldrig på klippor – berget kan spricka av värmen (på djupet)
- Använd befintliga eldstäder där de finns
- Elda inte under eldningsförbud (utfärdat av länsstyrelsen vid torrt väder)
- Lämna aldrig en eld utan tillsyn
- Vattna ordentligt och kolla att det är kallt innan du lämnar

## Eldningsförbud

Under torra sommrar utfärdar länsstyrelserna eldningsförbud. Kontrollera alltid:
- **SMHI:s brandriskprognos** på smhi.se
- **Länsstyrelsens hemsida** för aktuellt eldningsförbud i ditt område

Eldningsförbud gäller inte för grillar med ben som inte vidrör marken – men använd portabelt grillkol, inte ved.

## Portabelt alternativ

Satsa på en bra engångsgrill eller bärbar kolgrill med ben. Lätt att ta med, fungerar i princip var som helst, och du riskerar inte att skada klipphällar eller orsaka skogsbrand.

## Bästa platserna för grillning

**Fejan** – naturhamnen har befintliga eldstäder på klipporna norra sidan.

**Möja – södra hamnen** – skyddad, med vedförråd avsett för besökare.

**Kymmendö** – naturreservat men med specificerade grillplatser. Kolla reservatsreglerna.

**Gällnö** – privat förvaltad mark, men med hänvisade rastplatser längs promenadstigarna.

## Lämna inget spår

Tysk bort aske, ta bort kolrester och lämna platsen i bättre skick än du hittade den. Det är inte bara ett regelverk – det är respekt för platsen och de som kommer efter dig.
    `,
  },

  'norrtelje-norra-skargard': {
    title: 'Norra skärgården – Norrtelje och Singö',
    excerpt: 'Norrtäljes skärgård är mer rå och orörd än Stockholms. Singö, Väddö och Räfsnäs är ett annat tempo.',
    category: 'Öguide',
    date: '2026-01-20',
    readTime: '6 min',
    emoji: '🌊',
    tags: ['Norra skärgården', 'Norrtelje', 'Singö'],
    content: `
Norr om Stockholm, i Norrtälje och Upplandskusten, finns en skärgård som många Stockholmare aldrig besökt. Det är ett misstag. Norra skärgården är rawer, vildare och signifikant mindre turistifierad än söder om Stockholm.

## Norrtelje – porten norrut

Norrtälje är inte ofta förknippad med lyx och sofistikering – men det är en av de mest genuint charmerande skärgårdsstäder du hittar. Gammal handelsstad med trähus, en flod som rinner ut i skärgården och ett restaurangscen som håller på att bli på riktigt.

**Norrtälje centrum:** Gamla stan med sina trähusgator är genuint vacker. Lilla torget, Bossgatan och hamnen längs Norrtäljeån.

**Söderhamnsholme:** Promenera ut på holmen i Norrtäljefjärden – utsikt mot skärgårdsöarna och bästa solnedgångsplatsen i stan.

## Singö – den bortglömda ön

Singö nås med en kort bilfärja från Norrtälje-området. Liten, lugn, med en gammal fiskebebyggelse som ännu inte upptäckts av Stockholms sommarfolk. Inga restauranger att tala om – ta med matsäck och njut av ön för sin natur och sina klippor.

**Singö kapell** – ett av Upplands äldsta träkyrkor, idylliskt beläget.

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
    emoji: '🗺',
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
    title: `${post.title} – Svalla`,
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

function renderContent(content: string) {
  const lines = content.trim().split('\n')
  const elements: React.ReactNode[] = []
  let key = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={key++} style={{ color: 'var(--txt)', fontSize: 20, fontWeight: 600, marginTop: 32, marginBottom: 12 }}>
          {line.slice(3)}
        </h2>
      )
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={key++} style={{ color: 'var(--sea)', fontSize: 16, fontWeight: 700, marginTop: 24, marginBottom: 8 }}>
          {line.slice(4)}
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
          {line.slice(2).replace(/\*\*(.*?)\*\*/g, '$1')}
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
      // Regular paragraph – handle bold inline
      const parts = line.split(/\*\*(.*?)\*\*/g)
      elements.push(
        <p key={key++} style={{ margin: '10px 0', color: 'var(--txt2)', lineHeight: 1.75 }}>
          {parts.map((part, pi) =>
            pi % 2 === 1 ? <strong key={pi} style={{ color: 'var(--txt)' }}>{part}</strong> : part
          )}
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

// ─── Page ─────────────────────────────────────────────────────────────────────

import React from 'react'

export default async function BloggPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = POSTS[slug]
  if (!post) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    url: `https://svalla.se/blogg/${slug}`,
    image: 'https://svalla.se/og-image.jpg',
    author: {
      '@type': 'Organization',
      name: 'Svalla',
      url: 'https://svalla.se',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Svalla',
      url: 'https://svalla.se',
      logo: {
        '@type': 'ImageObject',
        url: 'https://svalla.se/icon-192.png',
      },
    },
    keywords: post.tags.join(', '),
    inLanguage: 'sv-SE',
    about: {
      '@type': 'Thing',
      name: 'Stockholms skärgård',
    },
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 80 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
            <Link href="/blogg" style={{ color: 'rgba(255,255,255,0.65)', fontSize: 12, textDecoration: 'none' }}>
              ← Bloggen
            </Link>
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
          <h1 style={{ fontSize: 26, fontWeight: 700, color: '#fff', margin: '0 0 12px', lineHeight: 1.2 }}>
            {post.emoji} {post.title}
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
          {renderContent(post.content)}
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

        {/* Back + CTA */}
        <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
          <Link href="/blogg" style={{
            padding: '12px 24px', background: 'var(--white)', color: 'var(--sea)',
            borderRadius: 20, fontWeight: 700, fontSize: 14, textDecoration: 'none',
            border: '1.5px solid #1e5c82',
          }}>← Fler artiklar</Link>
          <Link href="/platser" style={{
            padding: '12px 24px', background: 'var(--sea)', color: '#fff',
            borderRadius: 20, fontWeight: 700, fontSize: 14, textDecoration: 'none',
          }}>Utforska kartan →</Link>
        </div>
      </div>
    </div>
  )
}
