/**
 * guider.ts — datakälla för /guider och /guider/[slug].
 *
 * 10 fulla guider med riktigt innehåll. Inga stubbar — sajten visar bara
 * publicerade artiklar. Nya guider läggs till här efter hand när innehåll
 * är skrivet och faktagranskat.
 *
 * Designregler:
 *  - Inga specifika priser eller öppettider (de förändras)
 *  - Inga påhittade krogar eller verksamheter — bara etablerade platser
 *  - Inga sub-agent-fabricerade fakta — content är hand-curated
 *  - Hänvisa till officiell källa när tider/priser nämns
 */

export type GuideKategori = 'praktisk' | 'transport' | 'aktivitet' | 'mat' | 'sasong' | 'region'

export interface Guide {
  slug: string
  title: string
  description: string  // för SEO + kortet på listsidan
  emoji: string
  kategori: GuideKategori
  lasMinuter: number   // ungefärlig läsning
  editorsChoice?: boolean
  datePublished: string  // YYYY-MM-DD
  /** Markdown-light body: H2 = ##, H3 = ###, ordlistor = "- " på radstart. */
  body: string
}

export const GUIDER: Guide[] = [
  // ── 1. MIDSOMMAR — Redaktionens val ────────────────────────────────────
  {
    slug: 'midsommar-skargarden-2026',
    title: 'Midsommar i skärgården 2026 — kompletta guiden',
    description: 'Sex genomtänkta alternativ för att fira midsommar i Stockholms och Bohusläns skärgård. Hur du tar dig dit, vad du gör och vad du behöver veta.',
    emoji: '🌼',
    kategori: 'sasong',
    lasMinuter: 12,
    editorsChoice: true,
    datePublished: '2026-05-15',
    body: `Midsommar i skärgården är en av de starkaste svenska traditionerna — och en av de svåraste att boka sent. Den här guiden tar dig genom sex väl etablerade alternativ längs ost- och västkusten. Vi har medvetet hållit oss till destinationer där traditionen lever vidare år efter år, och där du kan vara säker på att hitta något att göra även om du planerar i sista stund.

## Tre alternativ på ostkusten

### Möja — den klassiska midsommarön

Möja har firat midsommar med stång och lekar utanför Berg sedan långt innan färjorna gick i moderna tider. Det är en folkfest snarare än ett arrangemang — alla som är på ön deltar och alla bidrar.

**Hur du tar dig dit:** Waxholmsbolaget från Stavsnäs vinterhamn. Buss 433 eller 434 från Slussen tar dig till Stavsnäs. Räkna med fullbokade båtar på fredag förmiddag — boka i förväg eller åk torsdag kväll.

**Att göra:** Stångresningen brukar börja runt klockan elva på midsommarafton. Lekar och dans följer. På kvällen sprider sig folket över ön — många hittar en bra plats vid vatten, andra söker sig till värdshuset.

**Insidertips:** Tag med egen mat. Möja har en handelsbod och ett par serveringar, men de blir extremt belastade under midsommarhelgen. Om du vill äta ute, boka veckor i förväg.

### Sandhamn — segelhamn i midsommarskrud

Sandhamn är mer kosmopolitiskt än Möja men har sin egen midsommartradition runt KSSS-hamnen. Många kommer hit med segelbåt, så hamnen är full av båtar och människor.

**Hur du tar dig dit:** Cinderellabåten direkt från Strömkajen är den enklaste vägen. Alternativ är Waxholmsbolaget via Stavsnäs.

**Att göra:** Stångresning på KSSS-tomten. Lekar på sandstranden Trouville. Restaurangerna har specialmeny — Sandhamns Värdshus och Sandhamns Seglarhotell är de mest etablerade.

**Insidertips:** Övernattning i Sandhamn på midsommarafton är dyrt och slut tidigt. Många pendlar dagstur från Stockholm med sista båten hem efter elva.

### Grinda — mellanvägen

Grinda passar dig som vill ha midsommartraditionen utan att resa i två timmar. Båtresan dit är cirka två timmar från Strömkajen, och ön är liten nog att man hittar runt på en eftermiddag.

**Hur du tar dig dit:** Waxholmsbåt från Strömkajen — kollar du Waxholmsbolagets sommartidtabell strax före midsommar har du flest direktturer. Kortast är via Boda brygga på Värmdö.

**Att göra:** Midsommarstången reses på en av öns ängar. Wärdshuset på södra delen av ön är öppet och brukar ha midsommarbuffé.

**Insidertips:** Grinda är ett populärt dagsturmål, så förmiddagsbåtar är fulla. Vill du ha en lugnare resa, ta tidig båt och var beredd att stå kvar till sen kväll.

## Tre alternativ på västkusten

### Smögen — bryggdans och hav

Smögen är västkustens midsommar-ikon. Den långa bryggan med röda sjöbodar fylls med folk, och midsommarstången reses traditionellt i det öppna området nedanför bryggan.

**Hur du tar dig dit:** Med bil hela vägen — Smögen ligger på fastlandet (bron från Kungshamn). Från Göteborg är det cirka tre timmar. Kollektivt går buss från Göteborg till Kungshamn och därifrån buss eller taxi över bron.

**Att göra:** Stångresning, dans på bryggan, fiskebodar med räkmackor och inläggningar. Många badar i Sotefjorden trots att vattnet sällan är varmare än fjorton grader på midsommar.

**Insidertips:** Parkering är ett vanligt problem. Ankommer du med bil, kom tidigt på dagen eller parkera i Kungshamn och promenera.

### Marstrand — Carlstens fästning och båtfolk

Marstrand kombinerar midsommartradition med det historiska — Carlstens fästning ligger som bakgrundsbild över hela ön. Här firar segelfolk midsommar i mängd eftersom Marstrand är en av Bohusläns största gästhamnar.

**Hur du tar dig dit:** Bilfärja från Koön (Kungälv) tar dig över på några minuter. Kollektivt går buss från Göteborg till Kungälv och vidare till Marstrand. Bilen står på Koön.

**Att göra:** Stångresning, lekar, levande musik i hamnen. Carlstens fästning är öppen för guidade turer och har egen midsommarprogram.

**Insidertips:** Boendet är fullt tidigt. Många besöker som dagstur från Göteborg eller övernattar på fastlandssidan.

### Käringön — bevarade kulturmiljöer

Käringön är mindre och lugnare än Smögen och Marstrand men har en lika levande midsommartradition. Ön är ett kulturreservat och utan bilar — vandring och cykel är allt.

**Hur du tar dig dit:** Passagerarfärja från Hälleviksstrand. Hälleviksstrand når du med bil eller med buss från Göteborg via Stenungsund.

**Att göra:** Stångresning på Skvallergränd, sång och lekar. Käringön Värdshus är öppet under helgen och har sommarmeny.

**Insidertips:** Käringön har begränsat med övernattningsplatser. Om du vill stanna över, boka tidigt — annars planera som dagstur från fastlandet.

## Planera i förväg — annars sitter du där

Sista båten hem på midsommardagskvällen är ofta full. Reseplanera båda riktningar i förväg och kolla Waxholmsbolagets eller den lokala operatörens tidtabell veckan innan helgen. Om du tänkt köra bil, kolla parkering vid hamnplats innan du åker.

För restauranger gäller: boka i förväg på de etablerade ställena. Många stänger köket tidigt på midsommarafton och övergår till bar-meny.

Vill du undvika folkträngseln helt — välj en mindre ö i ytterskärgården med eget medhavt och åk med första båten på morgonen. Du får då både traditionen och en stund för dig själv.`,
  },

  // ── 2. PACKLISTA ──────────────────────────────────────────────────────
  {
    slug: 'packlista-skargarden',
    title: 'Packlista för skärgården — komplett och kategoriserad',
    description: 'Vad du faktiskt behöver för en dag eller helg i skärgården. Kläder, mat, säkerhet och prylar — kategoriserat så du inte glömmer något.',
    emoji: '🎒',
    kategori: 'praktisk',
    lasMinuter: 6,
    datePublished: '2026-05-14',
    body: `En bra dag i skärgården börjar med rätt packning. Skärgårdsvädret växlar snabbt, mobiltäckning är ojämn och affärer är få — så det du inte tar med dig får du klara dig utan. Den här listan är pragmatisk och hand-testad, inte ambitiös.

## Kläder — lager är allt

Skärgårdsvädret kan gå från sommar till blåst på en timme. Klä dig efter lager-principen.

- Vindtålig ytterjacka (helst regntätt yttre)
- Tunn fleece eller ulltröja som mellanlager
- T-shirt eller tunn skjorta
- Långbyxor (inte shorts om du planerar långa promenader — myggor)
- Mössa eller buff även sommartid — vinden är kall ute på fjärden
- Tunn handduk om bad är möjligt
- Två par strumpor — våta fötter dödar humöret
- Skor med grepp (släta klippor blir hala när det regnat)

## Mat och dryck

Vatten är det viktigaste. Många öar har dricksvatten men inte alla, och prislappar på handelsbodar är inte alltid roliga.

- Två liter vatten per person och dag
- Termos med kaffe eller te
- Smörgåsar eller annat som tål värme
- Frukt och nötter som mellanmål
- Mörk choklad eller liknande för energi
- Avfallspåse — det du tagit ut tar du med tillbaka

## Säkerhet

Skärgården är inte vildmark, men det är vatten överallt och hjälp tar tid.

- Mobiltelefon med fullt batteri och powerbank
- Liten första-hjälpen-kit (plåster, brännskadekräm, allergi-piller)
- Solskydd faktor minst 30
- Mygg- och knottmedel särskilt försommar och hög sommar
- Visselpipa om barn är med
- Flytväst om båtfärd eller bad från brygga

## Teknik och prylar

- Karta — papperskarta eller offline-karta på telefon (täckning glipar)
- Kniv eller multitool
- Liten ficklampa eller pannlampa
- Plastpåsar för våta kläder
- Identifikation och plats för förlorade saker

## Om barn är med

- Extra ombytespaket — våta barn blir frusna fortare än vuxna
- Snacks oftare än vuxenmagar tål
- En aktivitet i ryggsäcken (uppblåsbar boll, lekkort) för väntan
- Sjösjuke-medel om båtresa är lång

## Om du seglar

- Seglarjacka och seglarbyxor med tätningar
- Seglarstövlar eller halksäkra skor
- Båtkniv accessibel
- Solglasögon med polariserad lins
- Sjökort eller plotter med uppdaterad sjökortsdata
- VHF om längre färd

## Vad du kan lämna hemma

Sportiga kläder du aldrig kommer använda. Tre par skor när två räcker. Boken du aldrig hinner läsa. Tunga konserver om du bara är ute en dag. Stativ till kameran om du inte är fotograf.

## Sista koll innan du går

Toalett. Vatten. Solskydd. Telefon laddad. Vet du var färjan går från? Vet du när sista båten hem går? Berätta för någon hemma var du är.`,
  },

  // ── 3. ALLEMANSRÄTTEN PÅ SJÖN ─────────────────────────────────────────
  {
    slug: 'allemansratten-pa-sjon',
    title: 'Allemansrätten på sjön — vad gäller egentligen?',
    description: 'Allemansrätten ser annorlunda ut till sjöss än i skogen. Var du får ankra, var du får tälta, regler om eld och avfall — förklarat enkelt.',
    emoji: '⚓',
    kategori: 'praktisk',
    lasMinuter: 7,
    datePublished: '2026-05-13',
    body: `Allemansrätten är en av Sveriges starkaste vardagsrättigheter — men den är inte en enkel regel. Den är snarare ett ramverk där "inte störa, inte förstöra" är grundprincipen, och resten handlar om sunt förnuft. På sjön gäller särskilda hänsyn eftersom miljön är känsligare och människors hem ligger närmare havet än de gör skogen.

## Var får du ankra?

Du får ankra fritt i öppet vatten så länge du inte stör. "Inte stör" innebär konkret: inte tätt intill någon annans brygga eller hus, inte i farleder, inte där fågelliv eller sälar håller på med årets viktigaste arbete (häckning, kutar).

Tumregler:
- Minst hundra meter från enskilda hus eller bryggor
- Inte i tydliga farleder eller mellan ledfyrar
- Inte i avlysta områden (de är märkta i sjökort)
- Inte över längre tid på samma plats — du är på besök, inte boende

## Var får du tälta?

Tältning för en eller två nätter är tillåten i naturen — också på en obebodd ö — men inte i direkt anslutning till annans bostad och inte i naturreservat med tältförbud.

Tre praktiska regler:
- En till två nätter på samma plats är max utan ägarens tillåtelse
- Inte synligt från bebyggelse om du kan undvika det
- Lämna inga spår — du ska kunna gå därifrån och ingen ska se att du varit där

## Eld och grillning

Öppen eld är reglerad och varierar med årstid och vindrisken. På sommaren är det ofta eldningsförbud på öar i ytterskärgården av brandskäl.

- Kolla aktuell brandriskprognos innan du tänder något
- Använd alltid medhavd grillplats eller etablerad eldstad
- Aldrig direkt på klippan — sotet stannar i åratal
- Släck helt, vänta till askan är kall, ta med dig kvarvarande grillkol

Vid eldningsförbud gäller även stormkök och engångsgrill om de har öppen låga.

## Toalett och avfall

Det här är där skärgårdens allemansrätt skiljer sig från skogens mest. Mark är känslig, vatten är delat, och illaluktande lägerplatser sprider sig snabbt mellan båtfolk.

- Toalettavfall på båten ska tömmas i mottagningsstation, inte i havet
- Inom skyddat skärgårdsområde är direkt urinerande i havet inte heller lämpligt
- Soppåsar tar du alltid med dig — inga öar har sopstation
- Toalettpapper bränns eller tas med — det bryts inte ner snabbt i magert skärgårdsklimat

## Motorbuller och fart

I många farleder gäller fartbegränsningar nära stränder. Tio knop är vanlig gräns. Respektera den — vågsvallet sliter på bryggor och stränder, och det stör både djur och människor.

Vattenskoter och liknande är förbjudet i många skärgårdsområden. Kolla länsstyrelsens regler för det område du är i.

## Naturreservat och skyddade områden

Stora delar av skärgården är naturreservat med egna regler som går FÖRE allemansrätten. Vanliga begränsningar:
- Tältförbud
- Eldningsförbud året om
- Avlysningar under fågelhäckning (vanligt mellan april och juli)
- Hundförbud eller koppeltvång

Reservaten är markerade i sjökort och på Naturvårdsverkets karta. Det är ditt ansvar att kolla.

## När du är osäker

Fråga om du ser någon. Skärgårdsbefolkningen är generellt välvillig mot besökare som visar hänsyn. Det som upprör är inte att du är där — det är att du beter dig som om ön var en allmänning utan ägare.

Sammanfattning i en mening: lämna platsen tystare och renare än du fann den.`,
  },

  // ── 4. WAXHOLMSBOLAGET ────────────────────────────────────────────────
  {
    slug: 'waxholmsbolaget-guide',
    title: 'Waxholmsbolaget — komplett guide för dig som aldrig åkt',
    description: 'Hur Waxholmsbolaget fungerar, var båtarna går från, hur du köper biljett och om SL-kortet duger. Praktisk genomgång för förstagångsresenärer.',
    emoji: '⛴',
    kategori: 'transport',
    lasMinuter: 8,
    datePublished: '2026-05-12',
    body: `Waxholmsbolaget är ryggraden i Stockholms skärgårdstrafik och har varit det sedan 1869. Linjenätet täcker hela skärgården från Vaxholm i norr till Landsort i söder. För den som inte är van är det dock inte alltid självklart hur det fungerar — det här är genomgången du behöver för att kunna planera en resa.

## Var båtarna går från

Det finns inte en avgångshamn utan flera, och vilken du använder beror på vart du ska.

**Strömkajen** i centrala Stockholm är den största. Härifrån går båtar till Vaxholm, Grinda, Möja, Sandhamn (vissa), Husarö, Finnhamn och hela mellersta och norra skärgården. Strömkajen ligger granne med Grand Hotell och Nationalmuseum. Buss 65 stannar utanför.

**Stavsnäs vinterhamn** på Värmdö är knutpunkten för många öar i mellersta skärgården, inte minst Sandhamn och Möja. Buss 433 eller 434 från Slussen tar dig dit på ungefär en timme. Båtarna från Stavsnäs är ofta snabbare till destinationen än de som går hela vägen från Strömkajen.

**Nynäshamn** är södra skärgårdens utgångspunkt — pendeltåg dit tar cirka femtio minuter från Stockholm Central. Härifrån går Waxholmsbolaget till Utö, Ornö, Nåttarö och Landsort.

**Vaxholm** själv är en knutpunkt — många båtar mellan Stockholm och ytterskärgården gör angörningar här. Du når Vaxholm med buss 670 från Tekniska högskolan eller med Waxholmsbåt från Strömkajen.

## SL-kortet — gäller det?

Här är förvirringen störst. Svar: SL-kortet gäller på Waxholmsbolaget endast på vissa korta sträckor — främst pendelbåtarna runt centrala Stockholm och Vaxholm. Den långa skärgårdstrafiken är inte SL — den har egen biljett.

Konkret:
- Pendelbåten 80 från Slussen till Ropsten och Lidingö — SL-kort gäller
- Pendelbåten 89 mellan Klara mälarstrand och Ekerö — SL-kort gäller
- Vaxholms-trafiken (kortare turer kring Vaxholm) — SL-kort gäller på vissa avgångar
- Trafiken ut i skärgården — egen biljett krävs

Är du osäker, kolla Waxholmsbolagets eller SL:s reseplanerare. De säger tydligt om "SL-kort gäller" för en specifik tur.

## Hur du köper biljett

Tre alternativ:

**Waxholmsbolagets app.** Bekvämt. Du köper biljett digitalt och visar QR-koden för ombordstigning. Kortbetalning på telefon.

**Köp ombord** med betalkort. Funkar på de flesta båtar, men kan vara mer skvallrigt vid hög belastning. Köp i förväg om du kan.

**Skärgårdskort eller periodkort.** Om du planerar resa ofta finns dag-, vecko- och säsongskort. För enstaka turer är det inte värt det.

För längre resor (Strömkajen-Sandhamn till exempel) är biljetten betydligt dyrare än SL-pris — räkna med ett par hundralappar enkel resa. Tur och retur ger sällan rabatt jämfört med två enkelresor.

## Cykel och barnvagn

Cykel är tillåten på de flesta båtar — med en cykelavgift utöver passagerarbiljetten. Antalet platser är begränsat och kan ta slut på populära turer på fredag eftermiddag och söndag kväll. Boka via appen i förväg.

Barnvagn går ombord utan extra avgift. Hopfällbara modeller är enklast.

Hundar är välkomna men ska hållas kopplade.

## Tidtabell och säsong

Trafiken är säsongsbetonad. Sommartrafik (mitten av juni till mitten av augusti) har många avgångar per dag på de stora linjerna. Vinter har glest schema — vissa öar har bara en eller två turer per dag, vissa har enbart vid behov.

Kolla alltid tidtabellen för det specifika datum du planerar. Tidtabeller läggs ut säsongsvis.

## Vilka du faktiskt åker med

Båtar i Waxholmsbolagets flotta varierar från stora passagerarfartyg (Cinderella, Storskär, Norrskär) till mindre snabba färjor. Klassiska ångare som Storskär går vissa rutter på sommaren — om du har en val, ta den ångbåten. Resan blir en upplevelse i sig.

## Praktiska tips

- Kom femton minuter före avgång, särskilt sommartid
- Lägg bagaget på däck eller i bagagehyllor — inte på säte
- Det blåser på däck även varma dagar — ha en jacka tillgänglig
- Köp kaffe ombord, men ta med eget vatten
- Returbåten kan vara senare än du tror — kolla sista turen INNAN du åker

För aktuella tidtabeller, biljetter och eventuella trafikstörningar, gå till waxholmsbolaget.se eller använd Trafiklabs reseplanerare som även täcker färjorna.`,
  },

  // ── 5. SKÄRGÅRD UTAN BÅT ──────────────────────────────────────────────
  {
    slug: 'skargard-utan-bat',
    title: 'Skärgården utan egen båt — kompletta guiden',
    description: 'Tio konkreta sätt att uppleva skärgården utan att äga eller hyra båt. Rangordnade efter hur lätta de är att nå med kollektivtrafik.',
    emoji: '🚤',
    kategori: 'transport',
    lasMinuter: 9,
    datePublished: '2026-05-11',
    body: `Du behöver ingen båt för att uppleva skärgården. De flesta öar utanför Stockholm nås med Waxholmsbolaget, bilfärja eller buss + båtkombination. Den här listan ger dig tio förslag, från lättast att nå (utan bil, en timme från city) till mest äventyrligt (tar en dag, kräver planering).

## Tio förslag — rangordnade efter tillgänglighet

### 1. Fjäderholmarna — närmast och enklast

Båt direkt från Strömkajen, restid runt tjugofem minuter. Sommarschemat går halvtimmesvis. Du har restauranger, hantverkshus och en kort vandringsled på själva ön. Perfekt halvdagsutflykt om du är i Stockholm och vill testa skärgårdskänslan utan att ge bort hela dagen.

### 2. Vaxholm — staden mer än ön

Du når Vaxholm med buss 670 från Tekniska högskolan eller med Waxholmsbåt från Strömkajen. Vaxholm är en småstad med gränder, kaféer och en fästning. Bra för dig som vill ha kombinerad sightseeing och skärgårdsljus, och som inte vill övernatta ute.

### 3. Grinda — den enkla skärgårdsklassikern

Direktbåt från Strömkajen tar ungefär två timmar. Snabbare alternativ är buss till Boda och båt därifrån. Grinda har stränder, vandringsleder och Grinda Wärdshus för lunch. Bra dagsutflykt — sista båten hem är ofta runt sju till nio på kvällen beroende på säsong.

### 4. Sandhamn — segelhamn och dansstrand

Lättast är Cinderellabåten direkt från Strömkajen (sommartid). Alternativ är Waxholmsbolaget via Stavsnäs. Restid tre till fyra timmar enkel väg. Sandhamn har badstränder (Trouville är mest kända), restauranger och en charm som drar besökare från hela Europa. Bra som dagsutflykt eller övernattning om du kan boka i förväg.

### 5. Utö — historia, bad och cykel

Pendeltåg till Nynäshamn (cirka femtio minuter), sedan Waxholmsbåt till Utö (ytterligare timme). Hyr cykel på Utö och åk runt på gruvområden, längs stränder och till havsbastun. Utö har vandrarhem och hotell, så övernattning är möjlig.

### 6. Möja — den autentiska upplevelsen

Buss från Slussen till Stavsnäs vinterhamn (cirka en timme), sedan Waxholmsbåt till Möja (cirka en till två timmar). Möja har inte överturism — du möter mer av en levande skärgårdsby. Vandringsleder, bagerier och en handelsbod.

### 7. Husarö och Ingmarsö — mellanskärgårdens vandringsöar

Båda nås från Strömkajen eller Stavsnäs. Husarö är mindre och lugnare; Ingmarsö har vandringsleden Blå Leden mellan ön och Finnhamn. Bra för dig som vill kombinera båt och naturvandring.

### 8. Finnhamn — STF vandrarhem och naturreservat

Båt från Strömkajen, runt tre timmar enkel väg. Finnhamn har vandringsleder, klippbad och STF-vandrarhem i gamla turisthusen från tidigt 1900-tal. Övernatta för att hinna med både kvällsljus och morgonpromenad.

### 9. Landsort (Öja) — sydligaste utposten

Pendeltåg till Nynäshamn, buss 858 till Ankarudden, båt till Landsort. Tar minst tre timmar enkel väg från Stockholm. Landsort är en liten ö med fyr, lots-station och rå atmosfär — och relativt få besökare just för att resan är så lång. För dig som vill bort från turist-skärgården helt.

### 10. Arholma — norra skärgårdens ytterspets

Buss 631 från Norrtälje till Simpnäs, båt till Arholma. Räkna med en hel dag bara för att ta sig dit. Arholma är en av Sveriges mest isolerade bebodda öar och har den känslan kvar. Vandring, bad i kallt vatten, sjökrog. Bäst som övernattning eftersom dagstur knappt hinner.

## Andra sätt att komma ut

Förutom Waxholmsbolagets linjebåtar finns:

**Cinderellabåtarna** — privata snabbåtar direkt från Strömkajen till Vaxholm, Grinda, Sandhamn och fler destinationer. Snabbare än Waxholmsbolaget men dyrare.

**Bilfärjor** är gratis och tar bil eller cykel. Stora linjer: Vaxholm-Rindö, Östanå-Ljusterö, Furusund-Yxlan.

**Pendelbåtarna 80 och 89** runt centrala Stockholm täcker Lidingö och Ekerö med SL-kort.

**Lokalbåtar och taxibåtar** trafikerar mindre öar — kolla med Trafiklab eller Värmdö kommun för aktuell trafik.

## Praktiska tips för båtlöst skärgårdsfolk

- Sista båten hem är det viktiga datumet — kolla den först
- Reseplanera fram och tillbaka samtidigt, inte bara dit
- Cykel är ofta värt att ta med eller hyra på destinationen
- Vandringsskor istället för sandaler — många öar har klippstigar
- Boka boende eller övernattning i god tid på populära öar

Vi har också byggt en transit-funktion på Svalla där du kan slå upp aktuella avgångar till de flesta öar i skärgården. Den hämtar tider från Trafiklab.`,
  },

  // ── 6. SL-KORT ──────────────────────────────────────────────────────
  {
    slug: 'sl-kort-skargarden',
    title: 'SL-kort i skärgården — gäller det, och vart?',
    description: 'Var SL-kortet faktiskt fungerar i skärgården, var det inte gäller och vilka alternativ som finns. Förklarat utan jargong.',
    emoji: '🎫',
    kategori: 'transport',
    lasMinuter: 5,
    datePublished: '2026-05-10',
    body: `Den vanligaste missuppfattningen om Stockholms skärgård är att SL-kortet räcker hela vägen. Det stämmer för en liten del av trafiken — och inte alls för det mesta. Här är vad du behöver veta innan du planerar.

## Var SL-kortet GÄLLER

SL-kortet räcker till dessa båtar:

**Pendelbåten 80** — Slussen, Skeppsholmen, Frihamnen, Ropsten, Allmänna Gränd, Nybroplan, Lidingö. Pendlartrafik året runt med tät turtäthet.

**Pendelbåten 89** — Klara Mälarstrand till Ekerö. Mälarens motsvarighet till 80:an.

**Vissa Vaxholmsbåtar** — på korta sträckor i den närmaste skärgården gäller SL-kort. Det beror på linjen och tiden — kolla i reseplaneraren om en specifik tur är SL-giltig.

**Bilfärjorna** — Vaxholm-Rindö, Östanå-Ljusterö, Furusund-Yxlan och flera till. Dessa är gratis för fotgängare och cyklister.

Det är allt. Det är inte mycket.

## Var SL-kortet INTE gäller

Stora delar av skärgårdstrafiken har egen biljett:

- Waxholmsbolaget från Strömkajen till längre ut belägna öar (Grinda, Möja, Sandhamn, Utö, Landsort, Arholma och fler)
- Cinderellabåtarna
- De flesta turer från Stavsnäs vinterhamn
- Pendelbåten 83 mellan Stockholm och Tyresö (egen biljett)

För dessa måste du köpa skärgårdsbiljett, antingen som enkel resa eller med periodkort.

## Vad det kostar utan SL-kort

Enkelbiljett ut till skärgården är dyrare än man tror. För Strömkajen-Sandhamn ligger priset typiskt runt två hundralappar enkel väg per vuxen. Kortare turer (Vaxholm) är billigare, runt en hundralapp. Tur och retur är sällan rabatterad — det är nästan alltid två enkelresor.

Periodkort för skärgården finns: dagskort, treveckorskort, säsongskort. För enstaka utflykter är de inte värda det. För dig som planerar veckor i sträck eller pendlar är de billigare.

## Smartare alternativ

**Buss + båt-kombination**. Kollar du Trafiklabs reseplanerare så ser du ofta att en bussresa till Stavsnäs (SL-kort) följt av kort båtresa (skärgårdsbiljett) blir både snabbare och billigare än direktbåt från Strömkajen.

**Bilfärja + cykel**. Östanå-Ljusterö är gratis, kort och leder dig till en stor ö med mycket att se. Förstärk med en cykel så hinner du runt på en dag.

**Skärgårdskort sommartid**. Om du planerar tre-fyra utflykter inom samma månad är säsongskortet ofta billigare än tre enkla biljetter.

## Hur du tar reda på vad som gäller

Använd reseplanerarna:

- **SL:s reseplanerare** visar tydligt om hela resan är SL-giltig
- **Waxholmsbolagets sida** visar tidtabell och biljett-typer för deras båtar
- **Trafiklabs reseplanerare** kombinerar allt och kan föreslå smartaste väg

Säg du planerar Grinda. SL:s reseplanerare visar dig direkt att den kortaste vägen är buss 434 till Stavsnäs (SL-kort räcker) + Waxholmsbolaget till Grinda (egen biljett). Du sparar både tid och pengar jämfört med direktbåt från Strömkajen.

## Sammanfattning i en mening

SL-kortet täcker stadens vatten och bilfärjor — för riktig skärgårdstrafik behöver du egen biljett, men du kan ofta kombinera SL-buss med kort skärgårdsbåt och komma fram snabbare.`,
  },

  // ── 7. BADTEMPERATUR ──────────────────────────────────────────────────
  {
    slug: 'badtemperatur-skargard',
    title: 'Badtemperatur i skärgården — när är det egentligen badbart?',
    description: 'När havet blir tillräckligt varmt för bad i Stockholms och Bohusläns skärgård. Månadsvis genomgång och varför det skiljer sig mellan kusterna.',
    emoji: '🌊',
    kategori: 'aktivitet',
    lasMinuter: 5,
    datePublished: '2026-05-09',
    body: `Det är en av de vanligaste frågorna inför en skärgårdsresa: går det att bada? Svaret beror på var, när och vad du betraktar som "badbart". Här är en pragmatisk genomgång — utan löften, eftersom havsvädret aldrig håller sig till medel.

## Vad räknas som badbart?

Smaken varierar. För många svenskar börjar bad bli rimligt vid sjutton-arton grader. För andra är det ljummet först vid tjugotvå. För vintervana är fjorton grader badbart om solen är stark.

Tumregler:
- Under fjorton grader: chock-bad, kort dopp
- Fjorton till sjutton: badbart för vana, kort vistelse i vatten
- Sjutton till tjugo: trivsamt för de flesta
- Över tjugo: badtid utan brådska

## Stockholms skärgård — månad för månad

**Maj** ligger vattnet typiskt mellan tio och tretton grader. För få. Snabbdopp möjligt om luften är het.

**Juni** stiger temperaturen. Mitten av juni ligger runt fjorton till sjutton grader. På grunda vikar uppvärmda av sol kan det vara över tjugo redan vid midsommar, men ute på fjärden är det kallare.

**Juli** är den varmaste perioden. Sjutton till tjugotvå grader är vanligt. Innerskärgården (grunda vikar) kan slå tjugofem under långa värmeperioder. Ytterskärgården och Östersjön ligger fyra-fem grader kallare än innerskärgården.

**Augusti** håller värmen länge. Första halvan av augusti är ofta varmast hela året — ytan har då hunnit värma sig under hela sommaren. Senare delen sjunker temperaturen.

**September** är överraskande badbart första hälften, runt sjutton-arton grader. Senare faller det snabbt.

## Bohusläns kust — kallare än Stockholm

Västkusten har stora skillnader inom samma region. Innerfjordar i Bohuslän kan vara varma — ofta likvärdiga eller varmare än Stockholm. Men ytterskärgården och öppet hav är klart kallare.

Tumregel:
- Hampedalen i Bohuslän eller en grund vik bakom en ö: kan vara över tjugo i juli
- Marstrand, Smögen, Käringön: vanligen fjorton till arton grader hela sommaren
- Öppet hav mot Skagerrak: tio till femton grader året om

## Varför kallare på västkusten

Atlantens kalla djupvatten cirkulerar in via Skagerrak. Östersjön är ett delvis instängt innehav som värms upp snabbare. Tumregel: Östersjön sommarvarm, västerhavet sommarsvalkt.

## Var hittar du varmast vatten?

- Grunda vikar med vass — solen värmer botten och vattnet
- Vänd från vind och våg — vågorna blandar varm yta med kallt djupvatten
- Klippor som värmts av solen kan ge ett dräneringsläge — vatten precis intill värmer fortare
- Stränder med söder- eller sydvästläge får mer sol

## Var hittar du svalast vatten?

- Djupa fjärdar och öppet hav
- Norrsluttande klippor i skugga
- Områden med strömmar (sund mellan öar) — vattnet blandas konstant
- Mätstationer i ytterskärgården

## Officiella mätstationer

SMHI driver mätstationer för havsvattentemperatur. Värdena finns på smhi.se under havstemperatur. Tänk på att stationen mäter en specifik plats — ditt favoritbadställe kan ligga fyra grader varmare eller kallare än närmsta stationsvärde.

## Praktiska tips

- Solglasögon polariserade visar bottnen — varma grunda områden syns
- Vinden bestämmer mer än lufttemperaturen — kallvind kyler vattenytan
- Termometer på telefonen är inte vattentät, men en billig poolthermometer är värd att ha med
- Efter en regnig vecka: temperaturen faller, ge det ett par dagar

## Sammanfattning

Stockholms innerskärgård juli och första hälften av augusti: nästan alltid badbart. Bohuslän: bara i skyddade vikar och vid stadiga sommarperioder. Resten av året: beroende av lokal plats, sol och tålamod.`,
  },

  // ── 8. NATURHAMNAR ────────────────────────────────────────────────────
  {
    slug: 'naturhamnar-guide',
    title: 'Naturhamnar i skärgården — så hittar du dem och så bär du dig åt',
    description: 'Vad en naturhamn är, hur du hittar och använder en, och hur du bär dig åt så du inte stör. För dig som seglar eller motorbåtar i skärgården.',
    emoji: '🗺',
    kategori: 'aktivitet',
    lasMinuter: 6,
    datePublished: '2026-05-08',
    body: `En naturhamn är inte en hamn i konventionell mening. Det är en plats där du som båtfolk kan lägga till, ankra eller fortöja mellan klippor — utan service, utan bryggor, ofta utan andra människor. För den som söker tystnad och autentisk skärgård är de hela poängen.

## Vad gör en bra naturhamn?

Den ideala naturhamnen har:
- **Lä från övervägande vind** — i Stockholm betyder oftast skydd mot västlig och sydvästlig vind
- **Tillräckligt djup** för att lägga till — minst en och en halv meter vid klippor är vanligt
- **Klippa som är ren och rätt sluttning** för stenbult eller landgång
- **Plats att fortöja akteröver** — buske, sten eller dragankare
- **Inget farligt grund i inloppet** som du inte ser i sjökortet

## Hur du hittar dem

**Sjökort först.** Etablerade naturhamnar är markerade i sjökort med ankare-symbol och ibland med information om bottendjup och bottentyp.

**Lokala böcker.** Det finns klassiska naturhamn-guider för Stockholm, Bohuslän och Mälaren. De ger djupare information än sjökort om praktiska saker som vindskydd, anlöp och förbehåll.

**Apps och digitala kartor.** Eniro Sjökort, Navionics och liknande visar etablerade hamnar och har kommentarer från andra båtfolk.

**Be andra båtfolk.** Om du är osäker i en hamn är det oftast OK att gå över och fråga — skärgårdsfolk pratar gärna om sina favoritplatser.

## Så bär du dig åt ombord

Naturhamn är inte fri-tag. Etiketten är specifik och uppskattad.

**Lugn fart genom inloppet.** Sänk farten redan långt innan. Vågsvallet stör andra båtar i hamnen och sliter på land.

**Bottenkoll innan du lägger till.** Sjökortets bottendjup är inte alltid uppdaterat. Använd ekolod och titta också efter mörka områden (djupare) jämfört med ljusa (grundare).

**Fortöja noggrant.** Vinden vänder. Säkra både stäv och akter, och tänk på vad som händer om vinden går från sydväst till nordväst på natten.

**Tystnad efter elva.** Motorer, musik, höga röster — det bär över vatten. Klockan är sällan tio på land, den är åtta i en naturhamn.

**Soppåsar med er.** Ingen hamn har sopstation. Tar du med skräp tar du också tillbaka det.

## Var ska du INTE lägga till?

- Direkt utanför enskilda hus eller bryggor
- I farleder eller i passagerar
- I avlysta områden under fågelhäckning (april till juli i många reservat)
- Vid Försvarsmaktens skyddsområden — sjökortet visar dem

## Klassiska områden — utan att låsa fast specifika hamnar

Vissa områden i skärgården är kända för rik tillgång på goda naturhamnar:

**Möja-arkipelagen** har många små hamnar mellan Storö, Lillö och kring Möja Sand.

**Sandön och områdena söder om Sandhamn** ger flera naturligt skyddade vikar.

**Ytterskärgården kring Bullerö** — Bullerö själv är naturreservat med stränga regler, men närliggande öar har goda hamnar.

**Norra delen av Möjafladen** mellan Möja och Furusundsleden.

**Mälarens norra del** mellan Adelsö och Björkö.

I Bohuslän är området kring **Hamburgsund**, **Resö** och **Bjuröklubb** välkända för naturhamnar.

## Praktiska tips för naturhamnsfolk

- Sätt akterankare för att inte slå mot klippan vid vindvändning
- Stenbult med kil är säkrare än naturligt sten
- Använd fender mellan båt och klippa även om det "ser snällt ut"
- En extra långa lina i påvinden kan rädda dig en vinterstormig kväll
- Ha alltid en kollegabåt eller andra människor inom syn vid ovan väder

## Sammanfattning

Naturhamnen är skärgårdens hjärta — och dess känsligaste del. Hitta dem genom sjökort och lokala guider, bär dig åt med försiktighet och respekt för andra båtfolk och skärgårdsmiljön, och lämna platsen som du fann den. Då har du en av Sveriges starkaste utomhusupplevelser, gratis och med eget program.`,
  },

  // ── 9. SANDHAMN VS GRINDA ─────────────────────────────────────────────
  {
    slug: 'sandhamn-vs-grinda',
    title: 'Sandhamn vs Grinda — vilken passar dig?',
    description: 'En jämförelse mellan två klassiska skärgårdsdestinationer. Restid, atmosfär, mat, övernattning och vem som passar var.',
    emoji: '⚖️',
    kategori: 'region',
    lasMinuter: 5,
    datePublished: '2026-05-07',
    body: `Sandhamn och Grinda är de två mest populära dagsutflyktsmålen i Stockholms skärgård — och de är inte alls samma sak. Den här jämförelsen är pragmatisk: vilket alternativ passar din typ av dag, inte vilket är "bättre".

## Snabbjämförelse

**Restid från Stockholm Central:**
- Grinda: ungefär två timmar med Waxholmsbåt direkt från Strömkajen, eller drygt en timme via buss till Boda och båt
- Sandhamn: tre till fyra timmar med Cinderellabåten från Strömkajen, två och en halv via buss till Stavsnäs och båt

**Storlek:**
- Grinda är liten — du går runt på en eftermiddag
- Sandhamn är medelstor — du kan utforska i flera dagar

**Atmosfär:**
- Grinda har mer av en lugn skärgårdskänsla
- Sandhamn har segelmiljö och mer kosmopolitiskt liv

## Grinda — för dig som vill ha lugnare dag

Grinda är en av Skärgårdsstiftelsens öar och har bevarats med viss skydd från kommersialisering. Här hittar du:

- Två badstränder och flera klippbad
- Vandringsled runt ön (några timmar)
- Grinda Wärdshus med matservering och bar
- Sex-sju gästhamnsplatser om du kommer med egen båt
- Övernattning på vandrarhem eller stugor

**Bra för:** familjer, par på dagsutflykt, folk som vill bada och promenera, dig som inte vill ha mycket folk.

**Mindre bra för:** dig som söker nattliv, dig som vill ha utbud av restauranger, dig som vill se "skärgårdens scen".

## Sandhamn — för dig som vill ha mer liv

Sandhamn ligger längre ut än Grinda och är en gammal lotsby med starka seglartraditioner. KSSS (Kungliga Svenska Segel Sällskapet) har sitt klubbhus där och stora kappseglingar avslutas i Sandhamn.

På ön:
- Trouville — en av Stockholms vackraste sandstränder
- Flera restauranger och kaféer (Sandhamns Värdshus, Sandhamns Seglarhotell, Café Sandhamn)
- Gränder med röda bodar och kulturmiljö
- Vandringsleder mot Värsholm och ytterskärgården
- KSSS stora hamn full av segelbåtar sommartid

**Bra för:** dig som vill kombinera bad och stadsliv, dig som gillar segelmiljöer, helger med sociala inslag, dig som inte räds folk.

**Mindre bra för:** dig som söker totalitet och lugn (särskilt sommarhelgerna), dagsutflykt om du är trött (resan tar tid), budgetresenärer (restauranger är dyrare än i staden).

## Praktiska skillnader

**Med kollektivtrafik:** Grinda nås bekvämare. Sandhamn kräver mer planering och tid.

**Med bil:** Båda kräver bil till en av Värmdöhamnarna (Boda för Grinda, Stavsnäs för Sandhamn) följt av båt. Stavsnäs har gott om parkering, Boda är begränsat.

**Med egen båt:** Grinda har gästhamn med få platser — kommer du efter klockan tre eftermiddag på en lördag kan det vara fullt. Sandhamn har KSSS-hamnen som rymmer mycket fler båtar men där platserna kostar mer.

**Övernattning:** Grinda har vandrarhem och stugor. Sandhamn har hotell, vandrarhem, B&B och privatuthyrning. Båda måste bokas tidigt sommartid.

## Säsong

Båda är säsongsbetonade. Sommarsäsongen (mitten av juni till mitten av augusti) har full service på båda. På Grinda stänger värdshuset sommarsäsongen — kolla aktuella öppettider innan du åker. Sandhamn har lite längre säsong eftersom flera ställen håller öppet året runt för seglare som ändå är där.

## Sammanfattning

Vill du ha en lugn dagsutflykt utan stora ansträngningar: **Grinda**.

Vill du ha mer "skärgårdens scen" och är beredd att resa: **Sandhamn**.

Är det första gången du åker ut: **Grinda** — det är enklare att navigera, lägre tröskel, snabbare resa.

Vill du segla eller är van med skärgården: **Sandhamn** — mer att utforska och en helt annan miljö.

Eller — och det här är vårt egentliga råd — gör båda. Inte samma dag, utan olika helger. De ger olika känslor av skärgården, och båda hör hemma i en svensk skärgårdsupplevelse.`,
  },

  // ── 10. SKÄRGÅRD HÖST ─────────────────────────────────────────────────
  {
    slug: 'skargard-host',
    title: 'Skärgården på hösten — varför den är bättre än sommaren',
    description: 'Hösten är skärgårdens kanske bästa säsong — färre folk, mer ljus, ofta vackrare väder. Här är vad du behöver veta för en höstutflykt.',
    emoji: '🍂',
    kategori: 'sasong',
    lasMinuter: 6,
    datePublished: '2026-05-06',
    body: `Hösten i skärgården är en av Sveriges bäst bevarade hemligheter. När sommarfolket har åkt hem, restaurangerna fortfarande är öppna och vädret ofta är som vackrast — då blir skärgården till en helt annan plats. Den här guiden förklarar varför och när du ska åka.

## Varför hösten ofta är bättre än sommaren

**Färre människor.** Augusti slutar någonstans runt den tjugonde, sedan tunnas det ut snabbt. September är en mellanmånad där populära öar fortfarande har service men inte folkträngsel.

**Tydligare ljus.** Solen står lägre, vilket ger längre skuggor, varmare färger och bättre fotograferingsförhållanden. Klippor som ser bleka ut i juli-solen lyser i septemberljus.

**Stabilare väder ofta.** Det går inte att lova, men många septembrar är vackrare än många julimånader. Mindre åska, mindre regn, ofta perfekt vandringstemperatur.

**Vattnet är fortfarande varmt.** Första halvan av september ligger ytan kvar på sjutton-arton grader i innerskärgården. Att bada är fullt rimligt.

**Restaurangerna är öppna men inte fullbokade.** Du kan dyka in spontant där du varit tvungen att boka två veckor i förväg i juli.

## När exakt — månad för månad

**September** — bästa månaden. Sommarservice fortfarande aktiv på de stora öarna. Vatten badbart första halvan. Stabilt väder ofta.

**Oktober** — övergångsmånad. Många restauranger har stängt eller övergått till helgöppet. Trafiken glesar ut. Lövfärgerna kommer. Bra för stillare promenader och boendet är billigt.

**November** — definitivt lågsäsong. Många turer går bara på begäran eller med begränsade tider. Atmosfär av tomhet och förfall — kan vara magiskt om du är beredd. Sista båt-tider är tidiga.

## Vad du faktiskt kan göra

**Vandring och friluftsliv.** Skärgårdens leder är öppna året runt. På de större öarna (Möja, Sandhamn, Utö, Finnhamn) finns markerade leder som passar för dagsturer.

**Bad i kallt vatten.** Vintervana skärgårdsfolk badar långt in på hösten. Klippkust med söder-läge värms av sol till långt in i oktober.

**Svamp.** September är topp för kantareller och stenmurkel. Många skärgårdsöar har skogspartier som ger riklig svamp eftersom få plockar.

**Fotografering.** Skärgården i ljus av septembermorgon eller oktoberhost är fotogenetisk på ett annat sätt än sommarens. Tidig morgon med dimma över vattnet är dödsbra.

**Bastubad och stuga.** Många stugor och hus uthyrning sänker pris i september-oktober. En helg med ved-eldad bastu och hav är en av Sveriges bästa höst-upplevelser.

## Vad du behöver tänka på

**Sista båten kommer tidigare.** Sommarschemat slutar typiskt sista söndagen i augusti. Hösttabellen är glesare och sista båten kan vara redan klockan fyra på eftermiddagen. Kolla innan du åker.

**Klä dig för väder.** Vindtätt och vattenavstötande är inte överflöd i september. Augustivärmen ljuger ofta.

**Boendet stänger gradvis.** Vissa stugor och vandrarhem stänger redan i mitten av september. Boka i förväg och kontrollera öppettider.

**Restaurangtider varierar.** Det som stod på menyn i juli kanske inte serveras i oktober. Mindre kök, mindre meny — men ofta också mer omsorg.

**Mörker kommer fort.** Hösten är då dagslängden minskar mest. Räkna med flera timmar mörker när du planerar tur tillbaka.

## Bra höst-destinationer i Stockholms skärgård

- **Möja** — stadsmiljö plus stora skogspartier, perfekt för svampplock
- **Utö** — bra vandring och vandrarhemmet är öppet hösten igenom
- **Finnhamn** — STF-vandrarhemmet är öppet länge och stigarna är vackrast på hösten
- **Vaxholm** — kort dagsutflykt med stadsservice även när skärgården är tom
- **Sandhamn** — vissa restauranger året runt, plus magiska novemberkvällar

## I Bohuslän

- **Marstrand** — Carlstens fästning har höstprogram, restauranger året om
- **Smögen** — räkmackor smakar bättre när det blåser
- **Käringön** — kulturreservatet är vackrast i hösten utan turistmängder

## Sammanfattning

Sommaren är skärgårdens charterresa-säsong. Hösten är när den lämnar tillbaka till sin egen rytm. Klä dig varmt, planera båtarna, ta med kaffe — och du har Sveriges kanske finaste utomhus-upplevelse, billigare och lugnare än man trodde gick.`,
  },
]

export function getGuide(slug: string): Guide | undefined {
  return GUIDER.find(g => g.slug === slug)
}

export function getAllGuider(): Guide[] {
  // Sortera så Redaktionens val kommer först, sen efter datum
  return [...GUIDER].sort((a, b) => {
    if (a.editorsChoice && !b.editorsChoice) return -1
    if (!a.editorsChoice && b.editorsChoice) return 1
    return b.datePublished.localeCompare(a.datePublished)
  })
}

export const KATEGORI_LABEL: Record<GuideKategori, string> = {
  praktisk: 'Praktisk',
  transport: 'Transport',
  aktivitet: 'Aktivitet',
  mat: 'Mat',
  sasong: 'Säsong',
  region: 'Region',
}
