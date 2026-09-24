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
 title: 'Restauranger på Sandhamn – lunch, middag, kafé och bar',
 excerpt: 'Var du äter på Sandhamn: Värdshusets pub som är öppen året runt, Seglarhotellet, Dykarbaren, Sands, bageriet, kaféerna och barerna – säsonger, bordsbokning och båten dit.',
 category: 'Mat & dryck',
 date: '2026-04-10',
 updatedAt: '2026-09-23',
 readTime: '6 min',
 emoji: '',
 tags: ['Sandhamn', 'Restauranger på Sandhamn', 'Lunch på Sandhamn', 'Kafé', 'Bar', 'Stockholms skärgård'],
 faqs: [
  { q: 'Vilken restaurang på Sandhamn är öppen året runt?', a: 'Puben på Sandhamns Värdshus är öppen året runt och serverar lunchmeny, enligt värdshuset. Värdshusets restaurang har öppet varje dag från mitten av juni till mitten av september och annars främst på helger.' },
  { q: 'Behöver man boka bord på Sandhamn?', a: 'Seglarhotellet ber gäster boka bord i Segelsalen i förväg, och Sandhamns Värdshus ber om bordsbokning. Dykarbaren tar bara bokningar för bord inomhus, eftersom uteserveringen inte går att vädersäkra.' },
  { q: 'När har restaurangerna på Sandhamn säsong?', a: 'Dykarbaren har säsong maj–september, Värdshusets restaurang har öppet varje dag från mitten av juni till mitten av september och Sandhamnsbageriet är säsongsöppet. Värdshusets pub är öppen året runt.' },
  { q: 'Hur tar man sig till Sandhamn för att äta?', a: 'Året runt går buss 433 eller 434 från Slussen till Stavsnäs vinterhamn och därifrån Waxholmsbolagets linje 16 eller Stavsnäs Båttaxis Sandhamnslinje. Under säsong går Cinderella från Strandvägen, och på högsommaren går Waxholmsbåten direkt från Strömkajen.' },
 ],
 content: `
<!-- KÄLLA (lästa 2026-09-23): https://www.sandhamns-vardshus.se/ ("anno 1672"; Puben "Öppet året runt. Här serveras våra klassiska rätter samt lunchmeny."; Restaurangen "Med en magisk utsikt över hamnen. Öppet varje dag från mitten av juni till mitten på september. Annan tid på året är restaurangen främst öppen helger. Boka gärna bord."; Pentaboden "skaldjurslådor/platåer samt fina sallader", "vid vattnet"; "Boende och frukost i Missionshuset"; info@sandhamns-vardshus.se, 08-571 530 51). https://www.sandhamn.com/sv/restauranger-och-barer/segelsalen (Segelsalen "meny med fokus på säsongens råvaror", "Boka gärna bord i förväg", hovmastare@sandhamn.com; Bistro; Seglarbaren "Bar, dansgolv och DJ"; Orangeriet; Terassen "utsikt över hamnen"; Hamnbaren "under sommaren där vi då erbjuder After sail"; "Julbord med guldkant 26 november–24 december"). https://www.dykarbaren.se/ och /om-oss/ ("Sandhamn 425", "säsong maj – september", "endast bordsbokning inomhus då vår uteservering inte helt går att vädersäkra", "Större sällskap (fler än 8) vänligen mejla", "1921 uppfördes huset", "1982 höll man dykutbildningar på Sandhamn ... växte en café- och barverksamhet fram", uteservering "precis vid strandkanten"; menyer som PDF på /menyer/). https://sandshotell.se/ ("konferens- och weekend-hotell", "33 bäddar", "restaurangen med uteterassen", "terrasser med utsikt över hamninloppet", +46 8 571 530 20). https://www.sandhamnsbageriet.com/ (vetesurdeg, rågsurdeg, frallor, kanelbulle, kardemummabulle, seglarbulle; tårtor "BESTÄLLES MINST TRE VARDAGAR I FÖRVÄG"; beställning per sms). https://www.explorearchipelago.com/sv/sthlm/mellersta-skargarden/sandhamn (Skärgårdsstiftelsen: Café Ankaret "Kafe", Café Strindbergsgården "Sandhamn 109", PUB Alma "PUB", Sandhamns Glassigaste Ställe "Glass", Sandhamns Kiosk AB "Kiosk", Tempo Westerbergs Livs "Affär som även är ombud för Apoteket och Systembolaget"). KSSS gästhamn ligger vid "kajer framför Seglarhotellet" (ksss.se/hamnar/sandhamn). Resvägar: oförändrade från versionen 2026-09-21 (Waxholmsbolaget, SL, Stavsnäs Båttaxi, Strömma). Tidigare version listade "Sandhamns Krog" och "Bryggcafé 7an" som vi inte hittar på någon operatörssida – de är borttagna. -->
Sandhamn har fler restauranger, kaféer och barer än de flesta öar i Stockholms skärgård. Här är alla ställen att äta och dricka på [Sandhamn](/o/sandhamn) som vi kan belägga, antingen på operatörernas egna sidor eller i Skärgårdsstiftelsens förteckning Upptäck Skärgården. Varje ställe har en egen sida på Svalla med karta. Vi rangordnar dem inte, eftersom ingen har mätt vilket som är bättre.

## Restauranger på Sandhamn – lunch och middag

### [Sandhamns Värdshus](/upptack/sandhamn-sandhamns-vardshus)
Värdshuset, anno 1672 enligt värdshuset självt, har två delar. Puben är öppen året runt och serverar lunchmeny. Restaurangen har utsikt över hamnen och öppet varje dag från mitten av juni till mitten av september, annars främst på helger. På sommaren serverar värdshusets Pentaboden skaldjurslådor och sallader vid vattnet. Bord bokas på info@sandhamns-vardshus.se eller 08-571 530 51.

### [Sandhamn Seglarhotell](/upptack/seglarhotellet-sandhamn) – Segelsalen och Bistro
Seglarhotellet ligger vid KSSS gästhamn. Matsalen Segelsalen har en meny som hotellet beskriver som fokuserad på säsongens råvaror, och hotellet ber gäster boka bord där i förväg (hovmastare@sandhamn.com). Hotellet har också en Bistro. Från slutet av november till julafton serverar Seglarhotellet julbord.

### [Dykarbaren](/upptack/dykarbaren)
Bar och restaurang på Sandhamn 425, i ett hus som uppfördes 1921. Baren växte fram 1982, när huset användes för dykutbildningar. Uteserveringen ligger mitt emot, vid strandkanten. Säsongen är maj–september. Bord bokas bara inomhus, eftersom uteserveringen inte går att vädersäkra, och sällskap på fler än åtta mejlar info@dykarbaren.se. Veckans meny ligger som PDF på dykarbaren.se.

### [Bistro Sands](/upptack/bistro-sands) på Sands Hotell
Sands Hotell är ett konferens- och weekendhotell med 33 bäddar. Restaurangen har uteterrass, och hotellet har terrasser med utsikt över hamninloppet. Vi hittar inga öppettider för restaurangen på hotellets sida, så ring 08-571 530 20 innan du går dit.

## Kaféer, bageri och glass på Sandhamn

### [Sandhamnsbageriet](/upptack/sandhamns-bageriet)
Surdegsbröd, frallor och bullar, bland dem kanelbulle, kardemummabulle och bageriets seglarbulle. Tårtor beställs minst tre vardagar i förväg. Bageriet är säsongsöppet, och dagarna det har öppet står på sandhamnsbageriet.com.

### Fler kaféer
Upptäck Skärgården listar också [Café Strindbergsgården](/upptack/cafe-strindbergsgarden) på Sandhamn 109, [Café Ankaret](/upptack/cafe-ankaret), glasscaféet [Sandhamns Glassigaste Ställe](/upptack/sandhamns-glassigaste-stalle) och Sandhamns Kiosk. Ingen av dem har en egen webbplats med öppettider som vi hittar.

## Barer och pubar på Sandhamn
- **Seglarbaren** på Seglarhotellet: bar, dansgolv och DJ.
- **Hamnbaren** på Seglarhotellet: after sail i hamnen på sommaren.
- **Terassen** och **Orangeriet** på Seglarhotellet. Från Terassen ser du ut över hamnen.
- [Dykarbaren](/upptack/dykarbaren): bar på bottenvåningen, uteservering vid strandkanten.
- [PUB Alma](/upptack/pub-alma-sandhamn): pub, listad i Upptäck Skärgården.
- **Värdshusets pub**: öppen året runt.

## Äta på Sandhamn utanför högsäsong
Efter mitten av september har färre ställen öppet. Värdshusets pub är öppen året runt och restaurangen främst på helger. Dykarbaren har säsong till och med september, och bageriet är säsongsöppet. Seglarhotellet serverar julbord från slutet av november till julafton. Mat att laga själv finns i Tempo Westerbergs Livs, som också är ombud för Apoteket och Systembolaget.

## Boka bord på Sandhamn
- **Segelsalen**: hotellet ber om bokning i förväg, hovmastare@sandhamn.com.
- **Sandhamns Värdshus**: info@sandhamns-vardshus.se eller 08-571 530 51.
- **Dykarbaren**: bokning bara för bord inomhus, sällskap på fler än åtta mejlar info@dykarbaren.se.

## Så tar du dig till Sandhamn
Sandhamn nås med Waxholmsbåten direkt från Strömkajen bara 19 juni–16 augusti, och då tar turen mellan 3 tim 45 min och knappt 5 timmar beroende på avgång och byte i Finnhamn. Året runt går buss 433 eller 434 från Slussen till Stavsnäs vinterhamn (48–59 min) och därifrån Waxholmsbolagets linje 16 på 40–65 min eller Stavsnäs Båttaxis Sandhamnslinje på 30 min. Cinderella från Strandvägen kajplats 14 tar 2 tim 30 min under sin säsong 30 april–27 september. Alla alternativ med restider finns på [Båt till Sandhamn](/o/sandhamn/komma-dit).
    `,

 },

 'kajak-stockholms-skargard-nyborjare': {
 title: 'Kajak i Stockholms skärgård – guide för nybörjare',
 excerpt: 'Paddla kajak i Stockholms skärgård: var du hyr kajak, vad allemansrätten säger om att gå i land och övernatta, fågel- och sälskyddsområden, tältplatser och utrustning för säker paddling.',
 category: 'Aktiviteter',
 date: '2026-03-28',
 updatedAt: '2026-09-24',
 readTime: '6 min',
 emoji: '',
 tags: ['Kajak Stockholms skärgård', 'Paddla kajak', 'Nybörjare', 'Paddling', 'Allemansrätten'],
 faqs: [
   { q: 'Var kan man hyra kajak i Stockholms skärgård?', a: 'Några exempel: Möja Outdoor på Möja hyr ut kajak, roddbåt och SUP, Gällnö har kajakuthyrning på sommaren, Klintsundet Marina på Ljusterö hyr ut kajaker och Saltsjöbadens friluftsbad har kajakuthyrning.' },
   { q: 'Får man gå i land var som helst med kajak?', a: 'Enligt Naturvårdsverket får du gå i land, bada och tillfälligt förtöja vid en strand som inte hör till någon tomt och inte är skyddad för fågelliv eller annat. Håll koll på skyltar för fågel- och sälskyddsområden.' },
   { q: 'Vilken utrustning behöver man för att paddla kajak i skärgården?', a: 'Flytväst, vattentäta packpåsar för kläder och telefon, sjökort eller sjökortsapp, extra kläder och vatten. Kolla SMHI:s prognos innan du ger dig ut, och berätta för någon vart du ska och när du räknar med att vara tillbaka.' },
 ],
 content: `
<!-- KÄLLA: naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/pa-vatten/ (granskad 19 juni 2025, läst 2026-09-24): "Du får bada vid stränder, paddla kajak och åka båt"; "Du får gå i land, bada, ankra och tillfälligt förtöja vid en strand som inte tillhör någon tomt, eller som är skyddad för fågelliv eller annat"; "Håll avstånd till häckande fåglar"; "Håll koll på fågel- och sälskyddsområden"; "Ta med dig en påse som du kan samla skräp och matrester i"; toalett: "Använd toalett i land", annars "Gräv en grop för avföring"; "Du som färdas på vatten ska enligt Sjölagen visa hänsyn mot omgivningen". Uthyrning: visitmoja.se (Möja Outdoor "Hyr kajak, roddbåt och SUP"), gallno.se (cykel och kajak sommartid), klintsundetmarina.se ("Kajakuthyrning", läst 2026-09-23), nacka.se Saltsjöbadens friluftsbad ("kajakuthyrning", datafix 2026-09-22). Tältplatser: skargardsstiftelsen.se Gällnö-Karklö (Torsviken "sandstrand och tältplats"), Grinda ("öns tältplats ligger nära norra bryggan", datafix), Finnhamn (tältplats, Skärgårdsstiftelsen). Fågelskyddsområden Libertas och Rövarns holme vid Fjäderholmarna: landstigningsförbud under häckningstid (se island-data fjaderholmarna). Gällnö: förbud att köra motorbåt i Norrviken (lansstyrelsen.se). Tidigare version (borttagen 2026-09-24) angav hyrpris 400–600 kr per dag som uppskattning, blandade vindstyrka 5 med 8 m/s och föreslog rutter utan källa. -->
Kajak är ett av de enklaste sätten att ta sig ut bland öarna, och allemansrätten ger dig rätt att paddla, gå i land och bada längs stränderna. Här är det du behöver veta som nybörjare – var du hyr kajak, vad som gäller när du går i land och vad du packar.

## Börja med en guidad tur eller kurs
Första gången är det tryggast att paddla med någon som kan området – en guidad tur eller en nybörjarkurs hos en kajakuthyrare eller paddelklubb. Där får du öva på att komma i och ur kajaken och vad du gör om du välter.

## Hyra kajak
- **Möja:** Möja Outdoor hyr ut kajak, roddbåt och SUP och ordnar sälsafari.
- **Gällnö:** kajak går att hyra på ön under sommaren.
- **Ljusterö:** [Klintsundet Marina](/upptack/circle-k-klintsundet) har kajakuthyrning.
- **Saltsjöbaden:** [Saltsjöbadens friluftsbad](/upptack/saltsjobadens-friluftsbad) har kajakuthyrning, cirka 500 meter från Saltsjöbanans station.

## Allemansrätten på vattnet
Enligt Naturvårdsverket får du gå i land, bada och tillfälligt förtöja vid en strand som inte hör till någon tomt och inte är skyddad för fågelliv eller annat. Det finns inget bestämt avstånd till hus – det är risken att störa de boende som avgör. Plocka med dig skräp och matrester, och använd toalett i land när det finns.

## Fåglar och sälar
Håll avstånd till häckande fåglar och håll koll på skyltar för fågel- och sälskyddsområden, där det kan vara förbjudet att gå i land under delar av året. Ett exempel nära stan: Libertas och Rövarns holme vid [Fjäderholmarna](/o/fjaderholmarna) har landstigningsförbud under häckningstiden.

## Tältplatser för paddlare
- [Gällnö](/o/gallno): tältplats och sandstrand vid Torsviken. Tältet får stå högst två dygn på samma plats i reservatet.
- [Grinda](/o/grinda): öns tältplats ligger nära norra bryggan.
- [Finnhamn](/o/finnhamn): tältplats på Stora Jolpan.

## Utrustning
- Flytväst – alltid på.
- Vattentäta packpåsar för kläder, mat och telefon.
- Sjökort eller sjökortsapp.
- Extra varma kläder och vatten.
- Påse för skräp.

## Innan du paddlar ut
- Kolla SMHI:s prognos och varningar. Vind och vågor kan öka under dagen.
- Håll dig nära land i början i stället för att korsa öppna fjärdar.
- Berätta för någon vart du ska och när du räknar med att vara tillbaka.
 `,
 },

 'dolda-parlor-moja': {
 title: 'Möja – vandring, bad, museum och mat på ön',
 excerpt: 'Vad du gör på Möja i Stockholms mellersta skärgård: naturstigen genom Björndalen, bad enligt allemansrätten, Roland Svensson-museet, kyrkan från 1768, var du äter och hur du tar dig dit.',
 category: 'Öguide',
 date: '2026-03-15',
 updatedAt: '2026-09-24',
 readTime: '6 min',
 emoji: '',
 tags: ['Möja', 'Stockholms skärgård', 'Vandring', 'Mellersta skärgården'],
 faqs: [
   { q: 'Hur tar man sig till Möja?', a: 'Enligt Värmdö kommun tar buss 434 från Slussen till Sollenkroka och båt därifrån cirka 2,5 timmar. Båt hela vägen från Strömkajen tar cirka 3–4 timmar.' },
   { q: 'Finns det badplatser på Möja?', a: 'Möja har ingen officiell badplats. Möja turistförening tipsar om naturliga bad från klippor och stränder vid Saltvik, Kyrkviken, Löka, Ramsmora och Långvik, som används enligt allemansrätten.' },
   { q: 'Hur stor är Möja?', a: 'Möja är cirka 6,5 kilometer från norr till söder enligt Möja turistförening. Huvudöarna Möja och Södermöja har omkring 250 bofasta.' },
 ],
 content: `
<!-- KÄLLA: varmdo.se Möja.pdf ("Huvudöarna Möja och Södermöja har cirka 250 bofasta"; "Kyrkan uppfördes 1768"; buss 434 Slussen–Sollenkroka "restid ca 2,5 timme"; "båt från Strömkajen tar ca 3-4 timmar"; Björndalens, Storö-Bockö-Lökaö och Granholmens naturreservat; "Här finns tre insjöar"; fisket "den mest betydelsefulla inkomstkällan till långt in på 1980-talet"; 1719 "all bebyggelse blev nedbränd förutom det lilla kapellet i Berg"). stockholmslansmuseum.se/besoksmal/moja-bockon-och-lokaon/ ("Ryssugnarna", "Möja fick fast ångbåtsförbindelse 1906"). rolandsvenssonmuseet.se ("Roland Svensson (1910-2003)", museet vid Ramsmora ångbåtsbrygga, "Museet öppnade 2014"; läst 2026-09-19). visitmoja.se/aktiviteter-på-möja/ och /vandra/ ("ca 6,5km från norr till söder", ingen officiell badplats, Saltvik, Kyrkviken, Löka, Ramsmora, Långvik; naturstig Hamn–Ramsmora genom Björndalen "passerar du både ryssugn, insjöar och urskog", 12 km; SAT Långvik–Hamn; Möja Outdoor kajak, roddbåt, SUP, sälsafari; "Möjas dansbana är skärgårdens äldsta ännu i drift"; läst 2026-09-24). visitmoja.se/äta-och-handla-på-möja/ (Möja värdshus, Hamnbaren, Les Poissonniers de Möja, Jeppes, Hamncafét, "Sommaröppet" Möja bageri). konsummoja.se (Coop Berg året runt). svenskaturistforeningen.se STF Möja vandrarhem ("öppet april–december"). Gästhamnar: svenskagasthamnar.se moja-kyrkviken och moja-loka (datafix 2026-09-22). Tidigare version (borttagen 2026-09-24) påstod att Möja nås via Stavsnäs med linje 16 (det gäller Sandhamn), nämnde badplatsen "Möja Hälludden" som vi inte hittar och kallade ön bilfri och "näst folkrikaste" utan källa. -->
Möja ligger i Stockholms mellersta skärgård och är cirka 6,5 kilometer från norr till söder. Huvudöarna Möja och Södermöja har omkring 250 bofasta, och på ön finns byar, kyrka, lanthandel och tre naturreservat. Här är vad du kan göra på ön, enligt Möja turistförening och Värmdö kommun. Mer fakta: [Möja på Svalla](/o/moja).

## Vandra
Möja turistförening har märkt upp en naturstig mellan byarna Hamn i väster och Ramsmora i öster, 12 kilometer genom Björndalens naturreservat. Längs vägen passerar du ryssugnar – eldstäder där ryska soldater lagade mat när de brände Möja 1719 – insjöar och urskog. Stockholm Archipelago Trail följer landsvägen från Långvik till Hamn, en lätt etapp som fungerar även med barnvagn.

## Bada
Möja har ingen officiell badplats. Turistföreningen tipsar om naturliga bad från klippor och stränder vid Saltvik, Kyrkviken, Löka, Ramsmora och Långvik, som används enligt allemansrätten.

## Museum, kyrka och dansbana
- **Roland Svensson-museet** vid Ramsmora brygga öppnade 2014. Skärgårdskonstnären Roland Svensson (1910–2003) hade sin ateljé på Tornö, och hans målar- och skrivarhörnor flyttades hit.
- **Möja kyrka** uppfördes 1768, och kyrkogården anlades omkring 1755.
- **Möja dansbana** är enligt turistföreningen skärgårdens äldsta dansbana som fortfarande används, med musik, dans, bio och marknader på sommaren.

## Ut på vattnet
Möja Outdoor hyr ut kajak, roddbåt och SUP och ordnar sälsafari. Cykel hyrs på Hamncafét – se [Hyra cykel på Möja och Gällnö](/blogg/cykling-moja-gallno).

## Äta och handla
Möja värdshus, Hamnbaren, Les Poissonniers de Möja, Jeppes, Hamncafét och det sommaröppna Möja bageri. Coop i Berg har öppet året runt.

## Övernatta
STF Möja vandrarhem har öppet april–december. Med egen båt finns gästplatser i [Kyrkviken](/upptack/kyrkviken) nära Berg och i fiskehamnen [Löka](/upptack/loka-gasthamn).

## Ta sig dit
Buss 434 från Slussen till Sollenkroka och båt därifrån tar cirka 2,5 timmar. Båt hela vägen från Strömkajen tar cirka 3–4 timmar. Aktuella avgångar finns hos Waxholmsbolaget.
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
- Vid många gäst- och naturhamnsbryggor är kortare angöring gratis, men reglerna skiljer sig åt mellan hamnar – kolla alltid lokala skyltar.
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
 title: 'Fjäderholmarna dagstur – båt, mat och vad du gör på ön',
 excerpt: 'Dagstur till Fjäderholmarna från Stockholm: vilka båtar som går och hur lång tid det tar, Rökeriet, krogen och bryggeriet, hantverkarna, bad från klipporna och öarnas historia.',
 category: 'Öguide',
 date: '2026-01-30',
 updatedAt: '2026-09-24',
 readTime: '5 min',
 emoji: '',
 tags: ['Fjäderholmarna', 'Dagstur från Stockholm', 'Skärgård nära Stockholm', 'Stockholm'],
 faqs: [
   { q: 'Hur tar man sig till Fjäderholmarna?', a: 'Waxholmsbolaget, Strömma Kanalbolaget och Fjäderholmslinjen trafikerar öarna. Strömmas båt går från Strandvägen kajplats 13 och tar cirka 30 minuter, och vissa avgångar stannar vid Nacka Strand.' },
   { q: 'Är Fjäderholmarna öppet året runt?', a: 'Nej. Båtar, restauranger och butiker har säsongsöppet under sommarhalvåret, och utanför säsong är det mesta stängt.' },
   { q: 'Kan man bada på Fjäderholmarna?', a: 'Ja, från klipporna med utsikt över Stockholms inlopp och vid några mindre sandstränder.' },
 ],
 content: `
<!-- KÄLLA: stromma.com/sv-se/stockholm/utflykter/dagsutflykter/fjaderholmarna/ (Strandvägen kajplats 13, ca 30 min, "Some departures also stop at Nacka Strand"). fjaderholmarna.se (båtoperatörer Waxholmsbolaget, Strömma Kanalbolaget och Fjäderholmslinjen; Fjäderholmarnas Krog, Restaurang Rökeriet och Fjäderholmarnas Bryggeri; hantverkare inom trä, textil, keramik och glas; utställningen "Allmogebåtar"; "Fjäderholmarna har nu säsongsöppet"). fjaderholmarnasbryggeri.se (brewpub, öl direkt från tankarna, huvudproduktion i Bro). fjaderholmarnaskrog.se (Krogen, Hamnbaren och Loftet, bordsbokning online). explorearchipelago.com (klippbad med utsikt över Stockholms inlopp, mindre sandstränder). lidingo.se kulturmiljöunderlag Stora Fjäderholmen ("omnämns i skrift redan 1381", krog "Åtminstone sedan 1699", marinen förvärvade öarna 1918, Försvarsmakten lämnade 1976, "Sedan 1995 ingår Fjäderholmarna i Kungliga nationalstadsparken"). Ögruppen Stora Fjäderholmen, Ängsholmen, Libertas och Rövarns holme; Libertas och Rövarns holme fågelskyddsområden med landstigningsförbud under häckningstid (naturkartan.se/lidingo.se). Gästhamnen 35 platser med boj (svenskagasthamnar.se, datafix 2026-09-22). Alla källor återges i src/app/o/island-data.ts (fjaderholmarna). Tidigare version (borttagen 2026-09-24) påstod att "Waxholmsbolaget kör" båten från Strandvägen, att det finns ett akvarium och "Båthuset Bar & Grill" och gav pris och turtäthet utan källa. -->
Fjäderholmarna är de skärgårdsöar som ligger närmast centrala Stockholm – en dryg halvtimme med båt från Strandvägen. På Stora Fjäderholmen finns rökeri, krog, bryggeri och hantverkare, och du badar från klipporna med Stockholms inlopp framför dig. Mer fakta och karta: [Fjäderholmarna på Svalla](/o/fjaderholmarna).

## Båten dit
Tre operatörer trafikerar öarna: Waxholmsbolaget, Strömma Kanalbolaget och Fjäderholmslinjen. Strömmas båt går från Strandvägen kajplats 13 och tar cirka 30 minuter, och vissa avgångar stannar vid Nacka Strand. Alla restider: [Båt till Fjäderholmarna](/o/fjaderholmarna/komma-dit).

Fjäderholmarna har säsongsöppet under sommarhalvåret – båtar, restauranger och butiker. Utanför säsong är det mesta stängt.

## Äta och dricka
- **Restaurang Rökeriet** röker på plats och säljer både i restaurangen och i delin, med skagenmackor, sallader, rökta räkor och chark.
- **Fjäderholmarnas Krog** vid gästhamnen har Krogen, Hamnbaren och Loftet. Bord bokas online.
- **Fjäderholmarnas Bryggeri** har en brewpub där ölen serveras direkt från tankarna, med pubmeny och ölprovningar.

## Vad du gör på ön
- **Hantverkare** inom trä, textil, keramik och glas har verkstad på ön. Vilka som är på plats varierar mellan säsonger.
- **Utställningen Allmogebåtar** visar traditionella skärgårdsbåtar.
- **Bad** från klipporna och vid några mindre sandstränder.
- **Fåglarna:** ögruppen består av Stora Fjäderholmen, Ängsholmen, Libertas och Rövarns holme. Libertas och Rövarns holme är fågelskyddsområden med landstigningsförbud under häckningstiden.

## Historia
Fjäderholmarna nämns i skrift redan 1381, och åtminstone sedan 1699 har det funnits krog på Stora Fjäderholmen. Marinen köpte öarna 1918, och i praktiken rådde landstigningsförbud tills Försvarsmakten lämnade 1976. Sedan 1995 ingår Fjäderholmarna i Kungliga nationalstadsparken.

## Med egen båt
[Fjäderholmarnas gästhamn](/upptack/fjaderholmarnas-gasthamn) har 35 gästplatser med bojförtöjning.
 `,
 },

 'vaxholm-guide': {
 title: 'Vaxholm dagstur – kastellet, staden och båt från Strömkajen',
 excerpt: 'Dagstur till Vaxholm: båt från Strömkajen eller buss 670, Vaxholms kastell och museet, kyrkan, Rindö redutt och Oscar-Fredriksborg, Bogesundslandet och var du äter vid hamnen.',
 category: 'Öguide',
 date: '2026-04-05',
 updatedAt: '2026-09-24',
 readTime: '6 min',
 emoji: '',
 tags: ['Vaxholm', 'Vaxholms kastell', 'Dagstur från Stockholm', 'Stockholms skärgård'],
 faqs: [
   { q: 'Hur tar man sig till Vaxholm?', a: 'Waxholmsbolagets båt från Strömkajen tar ungefär en timme. Buss 670 går mellan Tekniska högskolan och Vaxholm.' },
   { q: 'Hur kommer man ut till Vaxholms kastell?', a: 'Kastellet ligger på ön Vaxholmen, ett stenkast från Vaxholms stad, och nås över vattnet. I kastellet finns museet, en restaurang och konsertlokaler.' },
   { q: 'Är Vaxholm öppet på vintern?', a: 'Vaxholm är en stad där livet inte följer turistsäsongen. I december arrangeras Vaxholms julmarknad.' },
 ],
 content: `
<!-- KÄLLA: alla uppgifter är hämtade från källorna i src/app/o/island-data.ts (vaxholm): vaxholmsfastning.se/historik/ (blockhus i början av 1500-talet av Svante Nilsson Sture; Gustav Vasa 1548; nuvarande Kastellet 1833–1863; angrepp 1612 och 1719), sfv.se Vaxholms kastell (på ön Vaxholmen; museet invigt 1964; restaurang och konsertlokaler), vaxholmsfastning.se (museet om "skärgårdsförsvarets 500-åriga historia"), Waxholmsbolagets tabell 11 (Strömkajen–Vaxholm ~55–70 min), SL linje 670 (Tekniska högskolan–Vaxholm), vaxholm.se historia (stadsprivilegier 1647; Pålsundsbron 1926), svenskakyrkan.se/vaxholm (kyrkan 1760–1803, klockstapel, dopfunt från slutet av 1300-talet), sfv.se Rindö redutt (1859–1864, "går att besöka på egen hand"), sfv.se Oscar Fredriksborg (1867–1877, "Området ... är öppet för besök"), lansstyrelsen.se Bogesundslandet (bildat 2015, 4 341 ha, leder, badplatser, koppel på hund), vaxholm.se (julmarknad). Hamnkrogen: "Söderhamnen 10", "kvarterskrog sedan 1950-talet", ostar från Ostmakeriet på Rindö (datafix). Rindö nås med "gratis bilfärja från Vaxön" (vaxholm.se badplatser, datafix 2026-09-22). Tidigare version (borttagen 2026-09-24) angav båtresa 1,5 timmar och bussresa 1 timme utan källa, vägbeskrivning via E18, museibiljett "ca 120 kr" och restaurangomdömen utan källa. -->
Vaxholm är en stad, inte en ö-by, och därför fungerar den som dagstur året runt. Du tar dig dit med båt från Strömkajen på ungefär en timme, och i sundet ligger kastellet med museum. Mer fakta och karta: [Vaxholm på Svalla](/o/vaxholm).

## Ta dig dit
- **Båt:** Waxholmsbolagets båt från Strömkajen tar ungefär en timme. Alla alternativ: [Båt till Vaxholm](/o/vaxholm/komma-dit).
- **Buss:** buss 670 går mellan Tekniska högskolan och Vaxholm. Landförbindelsen finns sedan Pålsundsbron byggdes 1926.

## Vaxholms kastell
Kastellet ligger på ön Vaxholmen, ett stenkast från staden, och nås över vattnet. Fästningens historia börjar i början av 1500-talet med ett blockhus byggt av Svante Nilsson Sture, och 1548 beställde Gustav Vasa en kraftigare fästning. Den nuvarande byggnaden uppfördes 1833–1863. Fästningen har slagit tillbaka angrepp två gånger, från danskarna 1612 och från ryssarna 1719.

Museet i kastellet invigdes 1964 och följer skärgårdsförsvarets 500-åriga historia. I kastellet finns också restaurang och konsertlokaler.

## Fler fästningar
- **Rindö redutt** (1859–1864) på grannön Rindö byggdes för att komplettera kastellet och går att besöka på egen hand. Rindö nås med gratis bilfärja från Vaxön.
- **Oscar-Fredriksborg** vid Oxdjupet (1867–1877) är ett bergfort med tunnlar sprängda i berget. Området är öppet för besök.

## Staden
Vaxholm fick stadsprivilegier 1647 av drottning Kristina. Vaxholms kyrka byggdes 1760–1803; det planerade tornet blev aldrig byggt och ersattes av en klockstapel i trä. Inne i kyrkan står en dopfunt i gotländsk sandsten från slutet av 1300-talet, som ursprungligen stod i Riddarholmskyrkan. I december hålls Vaxholms julmarknad.

## Natur: Bogesundslandet
Bogesundslandets naturreservat, 4 341 hektar varav 2 891 på land, har markerade vandringsleder, badplatser och rastplatser med vindskydd. Hunden ska vara kopplad. Badplatser i området: [Tenöbadet](/upptack/tenobadet) och [Eriksöbadet](/upptack/eriksobadet).

## Äta
- [Hamnkrogen](/upptack/hamnkrogen-vaxholm) på Söderhamnen 10 har varit kvarterskrog sedan 1950-talet och ser ut över gästhamnen.
- [Magasinet](/upptack/magasinet-gustavsberg) ligger vid vattnet på Fiskaregatan 1.
- Restaurangen i kastellet.

## Med egen båt
[Vaxholms gästhamn](/upptack/waxholms-gasthamn-och-rent-under-batbotten-tvatt) ligger mitt i staden. I Norrbergshamnen finns platser där du får ligga upp till tre timmar utan avgift.
 `,
 },

 'uto-guide': {
 title: 'Utö guide – gruvorna, cykel, bad och båt från Årsta brygga',
 excerpt: 'Allt om Utö i Stockholms södra skärgård: Waxholmsbåten från Årsta brygga, gruvorna och väderkvarnen från 1791, cykeluthyrning, bad vid Ålö Storsand och Rävstavik, Utö Värdshus, gästhamnen och reglerna i naturreservatet.',
 category: 'Öguide',
 date: '2026-03-22',
 updatedAt: '2026-09-24',
 readTime: '6 min',
 emoji: '🚲',
 tags: ['Utö', 'Utö gruvor', 'Cykla på Utö', 'Södra skärgården', 'Stockholms skärgård'],
 faqs: [
   { q: 'Hur tar man sig till Utö?', a: 'Enligt Länsstyrelsen tar du pendeltåg till Västerhaninge, buss 846 till Årsta brygga och Waxholmsbåt året om till Gruvbryggan på Utö. Båt går också från Nynäshamn till grannön Ålö, som har broförbindelse till Utö.' },
   { q: 'Kan man hyra cykel på Utö?', a: 'Ja. Skärgårdsstiftelsen beskriver Utö som en cykel-ö med cykeluthyrning dagsvis, och Utö gästhamn hyr ut cyklar vid hamnen.' },
   { q: 'Var badar man på Utö?', a: 'Skärgårdsstiftelsen nämner Ålö Storsand, som nås med båt eller via vandringsled, samt badplatserna Rävstavik och Barnens bad.' },
 ],
 content: `
<!-- KÄLLA: källorna finns ordagrant i src/app/o/island-data.ts (uto): lansstyrelsen.se Utö naturreservat (gruvor "till och från under 700 år med början redan under 1100-talet"; reservatet norra delen, skyddat 1974, 4 183 ha; skjutfält i södra delen; väderkvarnen 1791; hundar kopplade; tältning endast anvisade platser; båt högst två dygn vid samma strand; resväg "Pendeltåg till Västerhaninge. Buss till Årsta brygga. Waxholmsbåt året om till Gruvbryggan", läst 2026-09-21), kulturarvstockholm.se Utö gruvor (gruvdriften upphörde 1879; ryssarna förstörde gruvorna 1719; befolkningsmax 446 på 1840-talet), skargardsstiftelsen.se/omraden/uto ("Sveriges äldsta bevarade väderkvarn", "Utö är en riktig cykel-ö med möjlighet att hyra dagsvis", Ålö Storsand "nås med båt eller via vandringsled", Rävstavik och Barnens bad), skargardsstiftelsen.se byggnader (kvarnen byggd 1791, byggnadsminne 2001), svenskakyrkan.se/haninge/om-uto-kyrka (byggd 1848–1850 av sten från gruvorna, orgel från 1745), utovardshus.se (resväg; Utö Värdshus i gamla gruvkontoret, à la carte lunch och middag; Seglarbaren mitt i hamnen), utogasthamn.se (ca 300 fritidsbåtar med el, dusch, bastu, sjömack i norra hamnen; Hamnboden kiosk, café och restaurang; cykeluthyrning), SL linje 846 Västerhaninge–Årsta, Waxholmsbolaget tabell 21 Årsta–Utö. Tidigare version (borttagen 2026-09-24) angav "pendelfartyg från Nynäshamn ca 1,5 timmar" (Utö nås från Årsta brygga; Nynäshamnsbåten går till Ålö), en namngiven kock, cykelpris och naturhamnar utan källa. -->
[Utö](/o/uto) i Stockholms södra skärgård har gruvor från medeltiden, Sveriges äldsta bevarade väderkvarn och grusvägar som gör ön till en cykel-ö. Norra delen är naturreservat, södra delen militärt övningsområde. Här är det du behöver för ett besök.

## Ta dig dit
Enklast året runt: pendeltåg till Västerhaninge, buss 846 till Årsta brygga och Waxholmsbåt till Gruvbryggan på Utö. Båt går också från Nynäshamn till grannön Ålö, som har broförbindelse till Utö. Alla avgångar: [Båt till Utö](/o/uto/komma-dit).

## Gruvorna och Gruvbyn
Järnmalm bröts på Utö till och från i omkring 700 år, med början redan på 1100-talet, och gruvdriften upphörde helt 1879. Sommaren 1719 förstörde den ryska flottan gruvorna. I Gruvbyn står trähusen längs Lurgatan och väderkvarnen från 1791 – Sveriges äldsta bevarade, och byggnadsminne sedan 2001 tillsammans med nio gruvarbetarbostäder. Utö kyrka byggdes 1848–1850 av sten från gruvorna, och orgeln från 1745 stod ursprungligen i Holländska reformerta kyrkan i Stockholm.

## Cykla
Skärgårdsstiftelsen beskriver Utö som en riktig cykel-ö med milslånga grusvägar, och cyklar hyrs dagsvis vid hamnen.

## Bada
- **Ålö Storsand** på grannön Ålö, som nås med båt eller via vandringsled.
- [Rävstavik](/upptack/ravstavik) nära Gruvbyn.
- **Barnens bad.**

## Äta
- **Utö Värdshus** i det gamla gruvkontoret serverar à la carte till lunch och middag.
- **Seglarbaren** mitt i hamnen har enklare rätter till lunch och grillat på kvällen.
- **Hamnboden** är kiosk, café och restaurang i samma byggnad.

## Med egen båt
[Utö gästhamn](/upptack/gruvbryggan) har plats för cirka 300 fritidsbåtar med el, dusch, bastu och toaletter, och sjömacken ligger i norra hamnen. [Gästhamn Sandudden](/upptack/gasthamn-sandudden-uto) i Kyrkviken går inte att förboka.

## Regler i naturreservatet
- Hunden ska vara kopplad.
- Tälta bara på anvisade platser och elda bara på iordningställda platser.
- Båt får ligga högst två dygn vid samma strand.
 `,
 },

 'segling-nyborjare-guide': {
 title: 'Börja segla – så lär du dig segla i skärgården',
 excerpt: 'Så börjar du segla: seglarskola för vuxna, Seglarintyg 1 och 2, vilka krav som gäller för att köra fritidsbåt, de viktigaste väjningsreglerna och hur du hyr en segelbåt i Stockholms skärgård.',
 category: 'Aktiviteter',
 date: '2026-03-18',
 updatedAt: '2026-09-24',
 readTime: '7 min',
 emoji: '',
 tags: ['Börja segla', 'Lära sig segla', 'Segling', 'Seglarskola', 'Nybörjare'],
 faqs: [
   { q: 'Behöver man körkort för att segla?', a: 'Nej, inte för en fritidsbåt som är kortare än 12 meter och smalare än 4 meter, enligt Transportstyrelsen. Den som kör ett fritidsskepp som är längre än 12 meter och bredare än 4 meter ska ha skepparexamen, kustskepparexamen eller högre. Transportstyrelsen rekommenderar ändå att alla har grundläggande kunskaper om säkerhet och sjövägsregler.' },
   { q: 'Var lär man sig segla som vuxen?', a: 'Svenska Seglarförbundets certifierade seglarskolor finns hos klubbar över hela landet och har kurser för barn, ungdomar och vuxna i jolle, kölbåt och vindsurfing. För ungdomar och vuxna leder kurserna till Seglarintyg 1 och 2, som ingår i kompetensintygen hos Nämnden för båtlivsutbildning.' },
   { q: 'Har segelbåten alltid företräde framför motorbåten?', a: 'Nej. Enligt sjövägsreglerna ska ett maskindrivet fartyg på väg hålla undan för ett segelfartyg, men i en trång farled får segelfartyg och fartyg under 20 meter inte hindra ett fartyg som bara kan framföras säkert i farleden, till exempel en färja eller ett fraktfartyg.' },
 ],
 content: `
<!-- KÄLLA (lästa 2026-09-24): transportstyrelsen.se/sv/sjofart/fritidsbatar/Kunskap-och-kompetens/ ("inga krav på körkort om du har ett fritidsfartyg/en fritidsbåt som är kortare än tolv meter och smalare än fyra meter", vattenskoter kräver förarbevis, fritidsskepp "längd som överstiger 12 meter och en bredd som överstiger 4 meter ska ha skepparexamen, kustskepparexamen eller högre nautisk kompetens", "vi rekommenderar att alla som vistas på sjön har grundläggande kunskaper"). transportstyrelsen.se sjövärdighet för fritidsbåtsförare ("Det är befälhavarens ansvar att se till att båten är sjövärdig", sjölagen 1994:1009). TSFS 2009:44 sjövägsregler: regel 18 a ("Ett maskindrivet fartyg på väg ska hålla undan för ... segelfartyg"), regel 18 b (segelfartyg håller undan för ej manöverfärdiga fartyg, fartyg med begränsad manöverförmåga och fiskande fartyg), regel 9 b ("Fartyg med en längd under 20 meter och segelfartyg får inte hindra ett annat fartygs passage om det fartyget endast kan framföras säkert i en trång farled"), regel 12 a (vinden in på babord håller undan; lovart håller undan för lä). svensksegling.se/upptack-segling/seglarskola/ (certifierade seglarskolor "för barn, ungdomar, vuxna och paraseglare", "jolle, kölbåt och vindsurfing", "Seglarintyg 1 & 2 som ingår i kompetensintygen hos Nämnden för båtlivsutbildning (NFB)", nybörjarkursen: hur vindens riktning påverkar, lägga till, justera seglen). ksss.se/lager/seglarskola/ (KSSS seglarskola för 8–12-åringar). Tidigare version (borttagen 2026-09-24) angav uppskattade kurs- och hyrpriser och antydde att KSSS har nybörjarkurser för vuxna; KSSS seglarskola vänder sig till barn 8–12 år. -->
Att segla är inte svårare än att det går att lära sig på en kurs, men sjövägsreglerna och ansvaret för båten gäller från första dagen. Här är vägen från noll till att ta ut en segelbåt i Stockholms skärgård, med fakta från Transportstyrelsen och Svenska Seglarförbundet.

## 1. Gå en seglarskola
Svenska Seglarförbundets certifierade seglarskolor finns hos klubbar över hela landet och har kurser för barn, ungdomar och vuxna i jolle, kölbåt och vindsurfing. På nybörjarkursen lär du dig hur vindens riktning påverkar båten, vad båtens delar heter och gör, hur du justerar seglen och hur du lägger till. För ungdomar och vuxna leder kurserna till Seglarintyg 1 och 2, som ingår i kompetensintygen hos Nämnden för båtlivsutbildning (NFB). Seglarförbundet har en sökfunktion för att hitta en certifierad seglarskola nära dig.

## 2. Vilka krav gäller?
För en fritidsbåt som är kortare än 12 meter och smalare än 4 meter krävs inget körkort, enligt Transportstyrelsen. Det gäller de flesta segelbåtar du kan hyra. Den som framför ett fritidsskepp som är både längre än 12 meter och bredare än 4 meter ska ha skepparexamen, kustskepparexamen eller högre. Vattenskoter kräver alltid förarbevis.

Oavsett storlek är det du som befälhavare som ansvarar för att båten är sjövärdig – rätt utrustad, bemannad och provianterad. Transportstyrelsen rekommenderar att alla som är ute på sjön har grundkunskaper om säkerhet och sjövägsregler.

## 3. Lär dig väjningsreglerna
Sjövägsreglerna gäller alla båtar. Tre regler du behöver kunna från början:
- **Motorbåt och segelbåt:** ett maskindrivet fartyg på väg ska hålla undan för ett segelfartyg.
- **Två segelbåtar:** den som har vinden in från babord håller undan. Har båda vinden från samma sida håller den i lovart undan för den i lä.
- **Trång farled:** segelfartyg och båtar under 20 meter får inte hindra ett fartyg som bara kan framföras säkert i farleden – i skärgården till exempel färjor och större fartyg. Segelbåtens företräde gäller alltså inte där.

Segelbåten ska också hålla undan för fartyg som inte är manöverfärdiga, har begränsad manöverförmåga eller fiskar.

## 4. Hyr en segelbåt
När du har gått kurs kan du hyra båt. Många uthyrare vill se intyg eller dokumenterad seglingsvana, så kolla villkoren innan du bokar. Uthyrare och observerade priser i Stockholms skärgård finns på [Hyra båt i Stockholms skärgård](/hyra-bat/stockholms-skargard).

## 5. Planera första turen
- **Väder:** kolla SMHI:s prognos och varningar innan du går ut, och ha en plan för att vända om vinden ökar.
- **Sjökort:** ha sjökort ombord, i app eller på papper, och öva på att läsa det.
- **Hamn för natten:** [gästhamnar i Stockholms skärgård](/blogg/gasthamnar-guide) med antal platser och om de går att boka.
- **Leder:** [segelrutter i skärgården](/segelrutter).
 `,
 },

 'basta-badplatserna': {
 title: 'Badplatser i Stockholms skärgård – sandstränder och klippbad',
 excerpt: 'Sandstränder, klippbad och havsbad i Stockholms skärgård: Trouville på Sandhamn, Björnö och Ingarö, Vaxholmsöarna och bad du når med Roslagsbanan, Saltsjöbanan eller buss. Fakta från kommunerna och Havs- och vattenmyndigheten.',
 category: 'Aktiviteter',
 date: '2026-04-08',
 updatedAt: '2026-09-24',
 readTime: '7 min',
 emoji: '',
 tags: ['Badplatser Stockholms skärgård', 'Sandstrand', 'Klippbad', 'Havsbad', 'Bad'],
 faqs: [
   { q: 'Var finns sandstränder i Stockholms skärgård?', a: 'Trouville på Sandhamns södra sida har vit sand. På södra Ingarö finns Stora Sandarna, cirka 200 meter sandstrand, och Lilla Sandarna, och i Björnö naturreservat ligger Torpesand med ungefär 120 meter sandstrand och långgrund sandbotten. Nära Vaxholm har Eriksöbadet och Tenöbadet sandstrand.' },
   { q: 'Får man bada var som helst i skärgården?', a: 'Enligt Naturvårdsverket får du gå i land, bada, ankra och tillfälligt förtöja vid en strand som inte tillhör någon tomt eller är skyddad, till exempel för fågelliv. Det finns inget förbud mot att bada vid en brygga som ligger utanför en tomt, men ägaren får inte hindras från att använda den.' },
   { q: 'Vilka havsbad når man utan bil eller båt?', a: 'Österskärs havsbad (Solbrännan) ligger en kort promenad från Roslagsbanans Österskärs station, och Saltsjöbadens friluftsbad cirka 500 meter från Saltsjöbanans station. Schweizerbadet på Dalarö, Årsta havsbad, Trinntorpsbadet i Tyresö och Stora Sandarna på Ingarö har busshållplats i närheten.' },
   { q: 'Hur vet jag om badvattnet är bra?', a: 'Havs- och vattenmyndighetens Badplatsen visar provtagning och badvattenkvalitet för badplatser som kommunerna provtar, till exempel EU-baden Eriksöbadet och Tenöbadet. Alla bad provtas inte – Värmdö kommun tar till exempel inga prover vid Trouville på Sandhamn.' },
 ],
 content: `
<!-- KÄLLA (lästa 2026-09-22 om inget annat anges; citat i supabase/datafix/2026-09-22-strander-beskrivningar.sql): Trouville – varmdo.se/upplevaochgora/naturochfriluftsliv/badplatserivarmdo/trouvillesandhamn ("Den långsträckta stranden i Trouville, med sin vita sand, ligger på Sandhamns södra sida", "omkring 20 minuters promenad från hamnen", "Toaletter sommartid", "Ingen provtagning av badvatten utförs av Värmdö kommun"; läst 2026-09-23). Torpesand, Stora och Lilla Sandarna, Grisslinge, Södersved – havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-varmdo-kommun/. Björkviks havsbad – visitvarmdo.com ("a mixture of both rocky waters edge and sandy beaches", Ingaröfjärden; datafix 2026-09-23-texter-omgang2.sql). Eriksöbadet, Tenöbadet, Grönviksbadet, Måldepån, Överbybadet – vaxholm.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser ("Tenöbadet är ett EU-bad"). Solbrännan – osteraker.se badplatser. Saltsjöbadens friluftsbad – nacka.se/uppleva--gora/friluftsliv-motion/badplatser-och-badvatten/saltsjobaden-fisksatra/. Trinntorpsbadet – tyreso.se badplatser. Schweizerbadet, Årsta havsbad – haninge.se/uppleva-och-gora/idrott-och-friluftsliv/friluft-och-natur/bad/. Nickstabadet, Hamnviken – havochvatten.se Nynäshamns kommun. Backbybadet, Kvarnsand – norrtalje.se/info/kultur-och-fritid/bad/badplatser/. Allemansrätten – naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/pa-vatten/ ("Du får gå i land, bada, ankra och tillfälligt förtöja vid en strand som inte tillhör någon tomt, eller som är skyddad för fågelliv eller annat", "Det finns inget förbud mot att tillfälligt förtöja eller bada vid en brygga som ligger utanför en tomt"; läst 2026-09-24). Tidigare version (borttagen 2026-09-24) rangordnade "tolv favoriter" utan mätning och påstod bl.a. att Kymmendö är naturreservat och att Stora Sand på Utö ligger inom ett skjutfält som främst är öppet i juli – påståenden utan källa. -->
Stockholms skärgård har både sandstränder och klippbad, och enligt allemansrätten får du bada vid stränder som inte hör till någon tomt. Här är badplatser där kommunen, Havs- och vattenmyndigheten eller Skärgårdsstiftelsen beskriver vad som finns på plats. Vi rangordnar dem inte – de är sorterade efter hur du tar dig dit. Varje bad har en egen sida på Svalla med karta.

## Sandstränder i skärgården

### [Trouville, Sandhamn](/upptack/stora-trouvillestranden)
Den långa stranden med vit sand ligger på Sandhamns södra sida, omkring 20 minuters promenad från hamnen. Sommartid finns toaletter. Badet ägs och sköts av Eknö hemman, och Värmdö kommun tar inga badvattenprover här. Stranden delas i [Stora](/upptack/stora-trouvillestranden) och [Lilla Trouville](/upptack/lilla-trouville-stranden). Så tar du dig till ön: [Båt till Sandhamn](/o/sandhamn/komma-dit).

### [Torpesand, Björnö naturreservat](/upptack/torpesand)
Strand- och klippbad i Björnö naturreservat på Ingarö. Sandstranden är cirka 120 meter lång med långgrund sandbotten, och vid klippbadet finns en handikappanpassad badbrygga.

### [Stora Sandarna](/upptack/stora-sandarna) och [Lilla Sandarna](/upptack/lilla-sandarna), Ingarö
Två naturliga sandstränder på södra Ingarö med öppet läge i söder mot Nämdöfjärden. Stora Sandarna är cirka 200 meter lång och har klippuddar på båda sidor, Lilla Sandarna cirka 100 meter. Parkering finns cirka 150 meter bort och busshållplats cirka 500 meter bort.

### [Björkviks havsbad](/upptack/bjorviks-havsbad), Ingarö
Klippor och sandstrand vid Ingaröfjärden på södra Ingarö. Här finns komposttoalett.

### [Eriksöbadet](/upptack/eriksobadet), Vaxholm
Sandstränder och klippbad i Eriksö friluftsområde på Vaxön, med handikappramp, flytbrygga med hopptorn, grillplats och omklädningshytt. Badet är ett EU-bad, och i friluftsområdet finns camping, kiosk och servering.

### [Tenöbadet](/upptack/tenobadet), Bogesund
Sandstrand och stora grönytor i Tenöreservatet, nära vandringsleder, med grillplats, lekplats och omklädningshytt. EU-bad. Kör över Pålsundsbron och följ Tenövägen till den stora parkeringen.

## Klippbad och mindre bad

### [Måldepån](/upptack/maldepan), Rindö
Enklare bad med stenstrand och badbryggor längs Militärvägen, med utsikt mot Oxdjupet där de stora fartygen passerar på väg in mot Stockholm.

### [Grönviksbadet](/upptack/gronviksbadet), Rindö
Litet bad med sandstrand, badbrygga och grillplats i slutet av Grönviksvägen. Rindö nås med gratis bilfärja från Vaxön.

### [Hamnvikens badplats](/upptack/tian), Nynäshamn
Sandstrand, gräsytor och brygga i en skyddad vik söder om Nynäshamn, och bad från klippor.

## Havsbad du når med tåg eller buss

### [Österskärs havsbad (Solbrännan)](/upptack/solbrannan)
Lång sandstrand med badbrygga vid Trälhavet, en kort promenad från Roslagsbanans Österskärs station. Ett upplyst promenadstråk i trä gör stranden relativt lättillgänglig.

### [Saltsjöbadens friluftsbad](/upptack/saltsjobadens-friluftsbad)
Sandstrand som är öppen för alla, hopptorn, servering och kajakuthyrning, cirka 500 meter från Saltsjöbanans station Saltsjöbaden. Dam- och herrbaden har egna badhus med bastu och vinterbad.

### [Schweizerbadet](/upptack/schweizerbadet), Dalarö
Stort havsbad med strand som är mycket långgrunt, med toalett, kiosk och grillplats. Närmaste busshållplats heter Schweizerparken.

### [Årsta havsbad](/upptack/arsta-havsbad), Haninge
Stort bad med strand, hopptorn och flera bryggor. Busshållplatsen heter Årsta havsbad.

### [Trinntorpsbadet](/upptack/trinntorpsbadet), Tyresö
Sandstrand med brygga vid Erstaviken. Busshållplatsen heter Trinntorp.

### [Grisslinge havsbad](/upptack/grisslinge-havsbad) och [Södersved havsbad](/upptack/sodersved-havsbad), Värmdö
Grisslinge har cirka 300 meter sandstrand med kiosk, konditori och restaurang. Södersved, vid Ingarö Havscamping, har cirka 150 meter sandstrand och är handikappvänligt.

### [Nickstabadet](/upptack/nickstabadet), Nynäshamn
Cirka 600 meter lång, långgrund sandstrand längst in i Nickstaviken väster om centrala Nynäshamn, med hopptorn och vattenrutschbanor.

## Norra skärgården

### [Backbybadet](/upptack/backbybadet), Singö
Sandstrand i en skyddad vik i söderläge på Singös östra sida, med brygga, badstege, omklädningsrum och toalett.

### [Kvarnsand](/upptack/kvarnsand), Väddö
Havsbad med cirka 190 meter strandlinje i österläge söder om Grisslehamn, med beachvolleyplan och eldstad. Brygga saknas.

## Innan du badar
- **Allemansrätten:** enligt Naturvårdsverket får du gå i land och bada vid en strand som inte tillhör någon tomt eller är skyddad för fågelliv. Du får också bada vid en brygga utanför en tomt, så länge ägaren inte hindras från att använda den.
- **Badvattnet:** Havs- och vattenmyndighetens Badplatsen visar provsvar för de bad som kommunen provtar. Alla bad provtas inte.
- **Hitta fler:** på [Svallas karta](/upptack) kan du filtrera på badplatser.
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
 title: 'Hyra cykel på Möja och Gällnö – cykla i skärgården',
 excerpt: 'Var du hyr cykel på Möja och Gällnö, hur långa öarna är, var du badar och äter längs vägen och hur du tar dig dit med båt från Stockholm.',
 category: 'Aktiviteter',
 date: '2026-02-20',
 updatedAt: '2026-09-24',
 readTime: '5 min',
 emoji: '🚴',
 tags: ['Hyra cykel Möja', 'Cykla i skärgården', 'Möja', 'Gällnö', 'Cykeluthyrning'],
 faqs: [
   { q: 'Var hyr man cykel på Möja?', a: 'Hamncafét på Möja har cykeluthyrning enligt Möja turistförening. På sommaren kör PerMobilen också daglig transport på landsvägen mellan norra och södra Möja.' },
   { q: 'Kan man hyra cykel på Gällnö?', a: 'Ja, cykel och kajak går att hyra på Gällnö under sommaren enligt Gällnös egen sida. Länsstyrelsen räknar en cykelled till anordningarna i Gällnö naturreservat.' },
   { q: 'Får man ta med cykel på Waxholmsbåten?', a: 'Ja, enligt Waxholmsbolaget får du ta med en vanlig cykel i mån av plats utan extra kostnad. Personalen ombord avgör om det finns plats.' },
   { q: 'Hur lång är Möja?', a: 'Möja är cirka 6,5 kilometer från norr till söder enligt Möja turistförening, och Värmdö kommun anger ön till ungefär 6 kilometer lång och 4 kilometer bred.' },
 ],
 content: `
<!-- KÄLLA (lästa 2026-09-24 om inget annat anges): visitmoja.se/aktiviteter-på-möja/ (Möja turistförening: "Möja är ca 6,5km från norr till söder"; PerMobilen "Sommartid daglig transport på landsväg från norr till söder ... fr.100 kr/person"; Möja Outdoor "Hyr kajak, roddbåt och SUP"; SAT "går leden längs landsvägen från Långvik till Hamn, en lätt etapp som även fungerar med barnvagn eller rullstol"; "det finns ingen officiell badplats och alla platser nyttjas enl. Allemansrätten", Saltvik, Kyrkviken, Löka, Ramsmora, Långvik; naturstigar "Mellan Hamn-Ramsmora är det (12km)"). visitmoja.se/äta-och-handla-på-möja/ (Hamncafét "Café med glass och bullar samt cykeluthyrning"; Möja bageri "Sommaröppet"; Möja värdshus, Hamnbaren, Les Poissonniers de Möja, Jeppes). konsummoja.se (Coop Berg "öppet året runt"; läst 2026-09-14). varmdo.se Möja.pdf ("cirka 6 km lång och 4 km bred"; buss 434 Slussen–Sollenkroka och båt, "restid ca 2,5 timme"; "båt från Strömkajen tar ca 3-4 timmar"). gallno.se och gallno.se/dagsutflykt/ ("Båten från Strömkajen eller Strandvägen tar mellan 1,5 – 2 timmar", "Waxholmsbolaget och Strömma/Cinderella-båtarna", sommaröppen krog, lanthandel, café, gratis tältplats, vandrarhem; cykel och kajak att hyra sommartid enligt FAQ, kontrollerad 2026-09-03). lansstyrelsen.se Gällnö naturreservat (anordningar inkl. "cykelled"; hund kopplad, tält högst två dygn; läst 2026-09-14). skargardsstiftelsen.se/omraden/gallno-karklo/ (Torsviken "sandstrand och tältplats"). Tidigare version (borttagen 2026-09-24) nämnde "Möja Cykeluthyrning" med pris, "Stationärens restaurang" och rundor på 8 och 12 km som vi inte hittar i någon källa. -->
Möja och Gällnö i Stockholms mellersta skärgård går att cykla på en dag, och på båda öarna går det att hyra cykel på sommaren. Här är vad som finns, enligt öarnas egna turistsidor. Mer om öarna: [Möja](/o/moja) och [Gällnö](/o/gallno).

## Cykla på Möja

### Hyra cykel
Hamncafét på Möja, som också säljer glass och bullar, har cykeluthyrning. Vill du hellre åka än trampa kör PerMobilen daglig transport på landsvägen mellan norra och södra Möja sommartid, som hop on hop off.

### Vägen över ön
Möja är cirka 6,5 kilometer från norr till söder. Landsvägen binder ihop byarna, och Stockholm Archipelago Trail följer den från Långvik till Hamn – en lätt etapp som enligt turistföreningen fungerar även med barnvagn eller rullstol. Den uppmärkta naturstigen mellan Hamn och Ramsmora, 12 kilometer genom Björndalens naturreservat, är gjord för att gå.

### Bada längs vägen
Möja har ingen officiell badplats. Turistföreningen tipsar om naturliga bad från klippor och stränder vid Saltvik, Kyrkviken, Löka, Ramsmora och Långvik, som nyttjas enligt allemansrätten.

### Äta och handla
Möja värdshus, Hamnbaren, Les Poissonniers de Möja, Jeppes, Hamncafét och det sommaröppna Möja bageri. Coop i Berg har öppet året runt.

### Ta med egen cykel
<!-- KÄLLA: waxholmsbolaget.se/att-resa-med-oss/vad-du-far-ta-med (läst 2026-09-24): "Du får ta med en vanlig cykel ombord i mån av plats. Att ta med cykeln kostar inget extra"; "Personalen ombord avgör om det finns plats för din cykel"; "Elcyklar och elsparkcyklar ska placeras utomhus på däck."; "Lådcykel, tandemcykel eller andra skrymmande cyklar räknas som gods". -->
På Waxholmsbolagets båtar får du ta med en vanlig cykel i mån av plats utan extra kostnad. Personalen avgör om det finns plats, och elcyklar ställs ute på däck. Lådcyklar och tandemcyklar räknas som gods.

### Ta sig dit
Buss 434 från Slussen till Sollenkroka och båt därifrån tar enligt Värmdö kommun cirka 2,5 timmar. Båt hela vägen från Strömkajen tar cirka 3–4 timmar.

## Cykla på Gällnö

### Hyra cykel
Cykel och kajak går att hyra på Gällnö under sommaren. Länsstyrelsen räknar en cykelled till anordningarna i Gällnö naturreservat.

### Vad du cyklar genom
Gällnö är naturreservat med hagmarker, lövskog och ett odlat kulturlandskap. Vid Torsviken finns sandstrand och tältplats. I reservatet ska hundar vara kopplade och tält får stå högst två dygn på samma plats.

### Äta
En sommaröppen krog, Handelsboden och café. Vandrarhemmet har också stugor.

### Ta sig dit
Båten från Strömkajen eller Strandvägen tar 1,5–2 timmar. Både Waxholmsbolaget och Strömma/Cinderella-båtarna trafikerar ön.

## Före cykeldagen
- **Kolla säsongen:** uthyrning, krogar och bageri har sommaröppet. Möja turistförening har en öppettidskalender på visitmoja.se.
- **Möja Outdoor** hyr ut kajak, roddbåt och SUP om du vill ut på vattnet i stället.
- Fler öar: [Skärgård utan båt – öar du når med kollektivtrafik](/guider/skargard-utan-bat).
 `,
 },

 'fiske-skargard-guide': {
 title: 'Fiske i Stockholms skärgård – arter, platser och regler',
 excerpt: 'Abborre, gädda, gös, havsöring och sik i Stockholms skärgård: när och var de biter enligt Länsstyrelsens fiskeguide, var handredskapsfisket är fritt och vilka mått och fångstgränser som gäller.',
 category: 'Aktiviteter',
 date: '2026-02-10',
 updatedAt: '2026-09-24',
 readTime: '7 min',
 emoji: '',
 tags: ['Fiske Stockholms skärgård', 'Sportfiske', 'Gädda', 'Abborre', 'Havsöring', 'Fiskeregler'],
 faqs: [
   { q: 'Behöver man fiskekort i Stockholms skärgård?', a: 'Nej, inte för handredskap. Enligt Länsstyrelsen i Stockholm får du fiska fritt med handredskap utan fiskekort i havet längs kusten. Trolling, dragrodd och angelfiske kräver däremot fiskerättsägarens tillstånd, till exempel T-D-A-kortet, eller att du fiskar på allmänt vatten.' },
   { q: 'Hur många gäddor får man behålla i skärgården?', a: 'Vid fiske med handredskap och ryssjor får du behålla sammanlagt tre gäddor eller gösar per dag. Gäddan måste vara mellan 40 och 75 centimeter; mindre och större gäddor ska släppas tillbaka.' },
   { q: 'Vilket minimimått gäller för havsöring?', a: 'I Östersjön är minimimåttet för öring 50 centimeter, och längs Stockholmskusten får du behålla högst en icke fenklippt öring per dygn vid fiske med handredskap och ryssjor.' },
 ],
 content: `
<!-- KÄLLA: Länsstyrelsen Stockholm, "Stockholms läns Fiskeguide 2023" (lansstyrelsen.se/download/18.1b1d393819324610c374853c/1732515630171/Fiskeguide Stockholms län.pdf, läst 2026-09-24): abborre "Bra fiske hela året med undantag av maj månad då abborren leker", "Bästa fisket är i innerskärgården", "djup mellan 1 och 10 meter", tips "söder om Horsfjärden, Västerfjärden utanför Spillersboda och vid Stora Värtan", "numera har skarv en stor inverkan på bestånden"; gädda "Hela året, bäst vår och höst", "Hela skärgården utom de yttersta delarna", tips "Väddö, Furusund, Ljusterö, Jolpan, Vaxholm, Järnafjärden, Stora Värtan och Västra Muskö"; gös "Bäst fiske på sommaren", "grunda inner fjärdar/vikar", tips "Bergshamraviken till Spillersboda, vattnet runt Vaxholm, Gålö, vattnen runt Mörkö samt Hallsfjärden och Järnafjärden"; havsöring "Från september till maj", "uddar, grynnor och strömsatta sund", "Ofta hugger havsöringen på grunt vatten nära land", utsättningar "Stockholms ström, Kappelskär, Möja, Gålö och Nynäshamn", andra ställen "Singö-Väddökusten, Ljusterö, Kanholmsfjärden, Baggensfjärden, Ingarö, Ornö, Utö och Torö", "Utplanterad öring är fettfeneklippt"; sik "November till maj, bäst i april", "Grunda vikar, sund och flader på 1 till 4 meters djup", "Bottenmete med sk Pater-Noster-tackel", tips "Väddö, Kappelskär, Baggensfjärden, Erstaviken, Kymmendö, Gålö, Fjärdlång, Häringe och Hammersta"; regler "Ryckfiskeförbud gäller i Mälaren, Strömmen och i skärgården", "Ålfiskeförbud gäller för allt fiske i hav", "Trolling, dragrodd och angel får endast bedrivas med fiskerättsägarens tillstånd (exv TDA-kortet) eller på allmänt vatten", "max 3 gäddor eller gös ... per dag. Gäddor <40 cm och >75 cm är fredade". lansstyrelsen.se/stockholm/djur/fiske.html: "I havet längs kusten och i de fem stora sjöarna får du fiska fritt med handredskap utan fiskekort" (läst 2026-09-24). havochvatten.se gädda i Östersjön: minimimått 40 cm, maximimått 75 cm, "fångstbegränsning för gös och gädda till sammantaget tre fiskar". havochvatten.se öring: "50 centimeter som minimimått i Östersjöns samtliga delområden", "1 icke fenklippt öring per dygn" (läst 2026-09-24). Tidigare version (borttagen 2026-09-24) angav minimimått 45 cm för gädda (fel: 40–75 cm), en säsongstabell och platser utan källa. -->
Stockholms skärgård har både söt- och saltvattensarter, och med handredskap fiskar du fritt utan fiskekort längs kusten. Här är när och var de vanligaste arterna biter enligt Länsstyrelsen i Stockholms fiskeguide, och vilka regler som gäller.

## Arterna – när och var

### Abborre
Den vanligaste sportfisken. Bra fiske hela året utom i maj, när abborren leker, och bäst i innerskärgården på 1–10 meters djup på sommaren. Länsstyrelsen tipsar om vattnen söder om Horsfjärden, Västerfjärden utanför Spillersboda och Stora Värtan. Abborrtillgången varierar mycket, och skarven påverkar bestånden.

### Gädda
Hela året, bäst vår och höst, i hela skärgården utom de yttersta delarna. Spinnfiske med betet någon meter ovanför botten fungerar, liksom mete med död fisk. Tips: Väddö, Furusund, Ljusterö, Jolpan, Vaxholm, Järnafjärden, Stora Värtan och västra Muskö.

### Gös
Bäst på sommaren, i grunda innerfjärdar och vikar och runt grynnor på försommaren. Tips: sträckan Bergshamraviken–Spillersboda, vattnet runt Vaxholm, Gålö, Mörkö, Hallsfjärden och Järnafjärden.

### Havsöring
September till maj, vid uddar, grynnor och strömsatta sund, och ofta på grunt vatten nära land. Havsöring sätts ut vid bland annat Stockholms ström, Kappelskär, Möja, Gålö och Nynäshamn; andra ställen är Singö–Väddökusten, Ljusterö, Kanholmsfjärden, Baggensfjärden, Ingarö, Ornö, Utö och Torö. Utplanterad öring har klippt fettfena.

### Sik
November till maj, bäst i april, på 1–4 meters djup i grunda vikar, sund och flader. Bottenmete med paternostertackel. Tips: Väddö, Kappelskär, Baggensfjärden, Erstaviken, Kymmendö, Gålö, Fjärdlång, Häringe och Hammersta.

## Reglerna

### Var får du fiska?
Med handredskap – spö och liknande – fiskar du fritt och utan fiskekort i havet längs kusten. Trolling, dragrodd och angelfiske kräver fiskerättsägarens tillstånd, till exempel T-D-A-kortet, om du inte är på allmänt vatten.

### Mått och fångstgränser
| Art | Regel |
|-----|-------|
| Gädda | Minst 40 och högst 75 cm |
| Gädda och gös | Högst 3 fiskar sammanlagt per dag |
| Öring (havsöring) | Minst 50 cm, högst 1 icke fenklippt per dygn |

### Förbud
- Ryckfiske är förbjudet i skärgården.
- Ålfiske är förbjudet i hav och vattendrag.
- Fredningsområden och fredningstider varierar längs kusten – kolla kartan på svenskafiskeregler.se innan du fiskar.

## Innan du åker
- **Säkerhet:** flytväst på, oavsett om du fiskar från båt eller kajak.
- **Båt och bränsle:** Svallas karta visar [sjömackar och gästhamnar](/upptack) längs vägen.
- **Hitta fler regler:** Länsstyrelsen i Stockholms fiskeguide har kartor över allmänt vatten och fredningsområden.
 `,
 },

 'gasthamnar-guide': {
 title: 'Gästhamnar i Stockholms skärgård – platser, service och bokning',
 excerpt: 'Gästhamnar i Stockholms skärgård från Grisslehamn till Nåttarö: antal gästplatser, djup, förtöjning, service och om platsen går att boka – hämtat från hamnarnas egna sidor.',
 category: 'Praktiskt',
 date: '2026-01-25',
 updatedAt: '2026-09-24',
 readTime: '9 min',
 emoji: '',
 tags: ['Gästhamnar Stockholms skärgård', 'Gästhamn', 'Båt', 'Övernattning', 'Segling'],
 faqs: [
   { q: 'Kan man boka gästplats i skärgården?', a: 'Det beror på hamnen. Grinda har 28 bokningsbara platser, Rindö Hamn och Svartsö bokas via Dockspot, medan platserna i Lidö gästhamn och Gästhamn Sandudden på Utö inte kan förbokas. Kontrollera hos respektive hamn.' },
   { q: 'Vilken gästhamn har flest platser?', a: 'Av hamnarna i den här guiden har Utö gästhamn och Nynäshamns gästhamn vardera plats för omkring 300 båtar, och KSSS gästhamn på Sandhamn omkring 150 gästplatser, med ytterligare plats för cirka 200 båtar på Lökholmen.' },
   { q: 'Vad kostar en natt i gästhamn?', a: 'Hamnavgiften skiljer sig mellan hamnarna och beror oftast på båtens storlek och säsong. Vi anger inga priser utan prislista – aktuell avgift står på varje hamns egen sida.' },
 ],
 content: `
<!-- KÄLLA: uppgifterna om varje hamn är hämtade från hamnens egen sida eller Svenska Gästhamnars sida för hamnen och finns ordagrant citerade i supabase/datafix/2026-09-22-hamnar-beskrivningar*.sql och 2026-09-23-granskning-namn-lage.sql (lästa 2026-09-22–23): ksss.se/hamnar/sandhamn/ och /lokholmen/, grinda.se/hamn-mack/gasthamn/, finnhamn.se, svenskagasthamnar.se/stockholms-skargard/finnhamn-med-paradisviken-och-soder-langholm/, ingmarsogasthamn.se, svartsolanthandel.se/gasthamn, waxholmshamn.se, rindohamn.se, svenskagasthamnar.se/stockholms-skargard/stockholm-fjaderholmarna/, svenskagasthamnar.se/stockholms-skargard/moja-kyrkviken/ och /moja-loka/, utogasthamn.se, sanduddenuto.se, creapreneur.se/dalaro-information, svenskagasthamnar.se/stockholms-skargard/orno-kyrkviken/, ornobatvarv.se/gasthamn/, nattaro.se/gasthamn/, svenskagasthamnar.se/stockholms-skargard/nynashamn/, grisslehamnsmarina.se/hamnen/, svenskagasthamnar.se/oregrunds-skargard/elmsta-almsta-gasthamn/, arholmanord.se, lidovardshus.com/gsthamnen, graddosjomack.se/gasthamn/, svenskagasthamnar.se/stockholms-skargard/blido/, furusundshamnkrog.se. Tidigare version (borttagen 2026-09-24) påstod att Svalla "besökt och betygsatt" hamnarna, gav stjärnbetyg och ungefärliga priser, sa att Sandhamn bokas via waxholmsbolaget.se och att Landsort är landets sydligaste fyr – inget av det hade källa. -->
Här är gästhamnarna i Stockholms skärgård där hamnen själv eller Svenska Gästhamnar anger antal platser, djup och service. Vi har inte betygsatt dem: guiden är sorterad från norr till söder, och varje hamn har en egen sida på Svalla med karta. Priser står inte med, eftersom de ändras och ska hämtas från hamnens prislista.

## Norra skärgården

### [Grisslehamn Gästhamn](/upptack/grisslehamn-gasthamn)
77 gästplatser bakom en vågbrytare i västra hamnen, förtöjning vid Y-bom eller boj på 1–5 meters djup. El och vatten på bryggorna, servicehus med wc och dusch, septiktömning och sjömack.

### [Elmsta Udde Gästhamn](/upptack/elmsta-udde-gasthamn), Väddö
Cirka 50 platser där Väddö kanal mynnar ut i Väddöviken, för båtar upp till 25 meter och med cirka 5 meters djup. Dusch, bastu, tvättstuga och latrintömning. Mataffär på gångavstånd i Älmsta.

### [Arholma gästhamn](/upptack/arholma-gasthamn)
50 meter brygga med mooringlinor och segelbåtsdjup vid Arholma Nord, med el och toaletter. Restaurang och boende i samma anläggning.

### [Lidö gästhamn](/upptack/lido-gasthamn)
Ett 50-tal platser för stävförtöjning med ankare i Båthusviken, 1,7–2,7 meters djup. Platserna kan inte bokas. Eluttag på bryggan, toalett och dusch vid Oasen.

### [Gräddö gästhamn](/upptack/graddo-brygga)
50 platser med bojförtöjning i Gräddöviken, 1,5–6 meters djup. Sjömack och servicehus med toaletter, duschar, bastu och tvättstuga.

### [Blidö Gästhamn](/upptack/blido-gasthamn)
50 gästplatser i skyddat läge vid restaurang Blidö Brygga, förtöjning vid boj, mooringlina eller långsides på 2–7 meters djup. Toalett, dusch och tvätt.

### [Furusunds Gästhamn](/upptack/furusunds-gasthamn)
Gästhamn med hamnkrog i Furusund, för både korta och längre besök.

## Mellersta skärgården

### [Ingmarsö Gästhamn](/upptack/ingmarso-gasthamn)
Cirka 30 platser vid bom, på boj och för ankare, skyddat från alla vindar. Dusch, wc och grillplats ingår i hamnavgiften. Sjömack finns, och krogen ligger cirka 200 meter bort.

### [Finnhamn](/upptack/finnhamns-arkipelag-ab)
Tre gästhamnar: [Paradisviken](/upptack/paradiset-stora-jolpan) med drygt hundra platser, el, vatten och wifi, Vandrarhemsviken med ett tjugotal platser nära krog och lanthandel, och en flytbrygga vid [Söder Långholm](/upptack/soderlangholm) med 30 platser.

### [Svartsö Gästhamn](/upptack/svartso-gasthamn)
Drivs av Svartsö Lanthandel intill butiken och caféet. Den som bokat via Dockspot har tillgång till servicehuset med toalett och dusch.

### [Grinda Gästhamn](/upptack/grinda-gasthamn)
28 bokningsbara platser, förtöjning på boj eller mooringlina. El, dusch, toalett och tömning av sopor och septiktank. Nära sjökrogen Framfickan, lanthandeln och Wärdshuset.

### [Möja: Kyrkviken](/upptack/kyrkviken) och [Löka](/upptack/loka-gasthamn)
Kyrkviken är en fiskehamn på Möjas sydöstra sida med ankarförtöjning på 1,8–2,5 meters djup, nära byn Berg. Löka på östra Möja har sju gästplatser med Y-bom för båtar upp till 2,75 meters bredd.

### [KSSS Gästhamn Sandhamn](/upptack/ksss-gasthamn-sandhamn)
Omkring 150 gästplatser vid tre pontonbryggor framför Seglarhotellet. Förtöjning med mooringlina, ankring förbjuden, och hamnvakter hjälper till. Passbåt går till [Lökholmen](/upptack/ksss-gasthamn-lokholmen-trollsundet) med plats för cirka 200 båtar, dusch och bastu. Under högsommaren är platserna på Lökholmen i första hand för KSSS medlemmar. Mat på ön: [Restauranger på Sandhamn](/blogg/basta-restaurangerna-sandhamn).

## Vaxholm och innerskärgården

### [Vaxholms gästhamn](/upptack/waxholms-gasthamn-och-rent-under-batbotten-tvatt)
Mitt i Vaxholm, i skyddad hamn med mat, dryck och bränsle nära.

### [Rindö Hamn](/upptack/rindo-marina)
13 gästplatser som bokas via Dockspot eller tas vid drop in, cirka 10 minuter från Vaxholm. Dusch, landström och ostmakeri med café i hamnen.

### [Fjäderholmarnas gästhamn](/upptack/fjaderholmarnas-gasthamn)
35 gästplatser med bojförtöjning på Stora Fjäderholmen vid inloppet till Stockholm, 1–8 meters djup.

## Södra skärgården

### [Dalarö gästhamn (Askfatshamnen)](/upptack/dalaro-turistbyra-och-gasthamn-askfatshamnen)
Cirka 40 gästplatser med bom och 2–4 meters djup, drivs tillsammans med turistbyrån. Toaletter, duschar, bastu, tvättstuga och wifi.

### [Ornö: Kyrkviken](/upptack/ornomacken-gasthamn) och [Brunnsviken](/upptack/orno-gasthamn-och-stugor)
Kyrkviken har 35 platser med ankarförtöjning på 4 meters djup vid ångbåtsbryggan, med diesel, bensin och restaurang inom 30 meter. Ornö Båtvarvs gästhamn i Brunnsviken har cirka 20 platser vid boj eller långsides, café och microlivs.

### [Utö gästhamn](/upptack/gruvbryggan)
Plats för cirka 300 fritidsbåtar vid Gruvbryggan, med el, vatten, bastu, dusch, cykeluthyrning och restaurang. [Gästhamn Sandudden](/upptack/gasthamn-sandudden-uto) i Kyrkviken hyr ut platser per dygn, vecka eller säsong, men de kan inte förbokas.

### [Nåttarö gästhamn](/upptack/nattaro-nya-gasthamn)
45 platser med el och boj på den nya flytbryggan i Kvarnviken, 3–4 meters djup längst ut. Dagsgäster kan ligga vid gamla ångbåtsbryggan.

### [Nynäshamns gästhamn](/upptack/nynashamns-gasthamn)
300 gästplatser med bom eller boj, restauranger längs hamnstråket och cirka fem minuters promenad till centrum.

## Fler hamnar och naturhamnar
Svallas karta visar alla gästhamnar, bryggor och naturhamnar – [filtrera på hamnar](/upptack). Vill du ankra i en vik i stället: [Naturhamnar i Stockholms skärgård](/blogg/naturhamnar-stockholm-skargard).
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
 title: 'Packlista för båten – bra saker att ha ombord',
 excerpt: 'Bra saker att ha i båten: säkerhetsutrustning, navigation, verktyg, mat och kläder – en checklista för dagsturen och veckan i skärgården.',
 category: 'Praktiskt',
 date: '2026-04-01',
 updatedAt: '2026-09-24',
 readTime: '4 min',
 emoji: '🎒',
 tags: ['Packlista', 'Utrustning', 'Säkerhet'],
 content: `
En bra packlista för båt handlar inte om att ta med allt – det handlar om att aldrig glömma det viktiga. En vätska man inte kan fylla på, en kabel som inte finns ombord och ett läge som försämras snabbt.

## Säkerhetsutrustning (ej förhandlingsbart)

- Flytvästar till samtliga ombord (rätt storlek!)
- Kastkrans med lina
- Nödbloss (godkänd och ej utgången)
- Kompass (fungerande, ej bara GPS)
- Sjökort för området (papper, inte bara app)
- VHF-radio
- Ankare med kedja och lina

## Navigation och kommunikation

- GPS/plotter eller sjökortsapp (Navionics, C-MAP)
- Sjökortsapp offline (ladda ner kartan utan nät)
- Mobil med vattentätt fodral
- Reservbatterier eller powerbank
- Signalhorn

## Verktyg och reparation

- Verktygslåda (kniv, tång, skruvmejsel, skiftnyckel)
- Reservimpeller (om du har utombordsmotor)
- Självhäftande reparationstejp
- Packnålar för segel (om segelbåt)
- Reservpropeller

## Mat och vatten

- Dricksvatten, med marginal
- Reservmat för minst 1 extra dag utöver planerat
- Gasolkök med reservgasol
- Gryta, kastrull, tallrik och bestick
- Kaffebryggare eller perkulator

## Personliga saker

- Regnkläder (täcker hela kroppen, inklusive byxor)
- Varma kläder, även på sommaren
- Solskydd
- Solglasögon med UV-skydd
- Myggmedel
- Förbandslåda

## Administrativa saker

- Båtens försäkringsbrev och eventuellt hyreskontrakt
- Kontanter i nödfall
- Betalkort
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
   title: 'Höst i skärgården – öar du når med båt i september och oktober',
   excerpt: 'Skärgården på hösten: öarna med båt året runt (Sandhamn, Grinda, Utö, Vaxholm), var du kan äta och bo efter högsäsongen, bastun och nationalparken på Bullerö och vad som stänger i augusti och september.',
   category: 'Inspiration',
   date: '2026-07-27',
   updatedAt: '2026-09-24',
   readTime: '5 min',
   emoji: 'leaf',
   tags: ['Höst i skärgården', 'September', 'Oktober', 'Eftersäsong', 'Stockholms skärgård'],
   content: `
<!-- KÄLLA (lästa 2026-09-14–24; ordagranna citat i island-data.ts och datafix-filerna): waxholmsbolaget.se/reseplanering/resmal/sandhamn ("Ut till Sandhamn går det turer året runt"); battaxi.se/sandhamnslinjen-2 (hösttidtabeller 17/8–20/9 och 21/9–20/12 2026); Grinda Norra och Södra bryggan "trafikeras året om av Waxholmsbolaget och Cinderella" (datafix 2026-09-22); lansstyrelsen.se Utö ("Waxholmsbåt året om till Gruvbryggan"); sandhamns-vardshus.se (puben "Öppet året runt", restaurangen "Öppet varje dag från mitten av juni till mitten på september. Annan tid på året är restaurangen främst öppen helger", boende och frukost i Missionshuset); sandhamn.com (julbord 26 november–24 december); dykarbaren.se (säsong maj–september); konsummoja.se (Coop Berg öppet året runt); svenskaturistforeningen.se STF Möja vandrarhem (april–december) och STF Gällnö vandrarhem (öppet året runt); gallno.se/oppettider (krogen: mitten av maj–slutet av augusti); explorearchipelago.com Finnhamns Café & Krog ("Open June to August"); fjaderholmarna.se (säsongsöppet sommarhalvåret); stromma.com Cinderella Sandhamn (30/4–27/9); ksss.se/hamnar/sandhamn/aktuellt (servicehusen "endast öppna maj till september"); vaxholm.se (julmarknad i december); naturvardsverket.se (Nämdöskärgårdens nationalpark invigd 5 september 2025, huvudentré på Bullerö); sverigesnationalparker.se Nämdöskärgården ("Bastun är öppen för alla och går inte att boka", "97 procent av nationalparkens yta är hav"); waxholmsbolaget.se före och under resan (vintertidtabell december–april, vissa fartyg har då begränsad servering); naturvardsverket.se hundar (koppel 1 mars–20 augusti). Tidigare version (borttagen 2026-09-24) angav vatten- och lufttemperaturer och solnedgångstider utan källa, nämnde "Möja Krog" som inte finns i Möja turistförenings förteckning och påstod att "de flesta" restauranger håller öppet till mitten av oktober. -->
Efter högsäsongen stänger en del av skärgården, men inte allt. Båtarna till de större öarna går året runt, flera pubar och butiker har öppet och Nämdöskärgårdens nationalpark på Bullerö är ny sedan 2025. Här är vad som gäller, ställe för ställe, med källa. Kolla alltid aktuella tider innan du åker.

## Öar med båt året runt
- [Sandhamn](/o/sandhamn): Waxholmsbolaget går dit året runt via Stavsnäs, och Stavsnäs Båttaxis Sandhamnslinje har hösttidtabell fram till 20 december. Cinderella från Strandvägen slutar för säsongen i slutet av september.
- [Grinda](/o/grinda): Norra och Södra bryggan trafikeras året om av Waxholmsbolaget och Cinderella.
- [Utö](/o/uto): Waxholmsbåt året om från Årsta brygga till Gruvbryggan.
- [Vaxholm](/o/vaxholm): en stad med liv året runt, och i december hålls Vaxholms julmarknad.

## Äta och bo efter högsäsongen
- **Sandhamns Värdshus:** puben är öppen året runt. Restaurangen har öppet främst på helger utanför perioden mitten av juni–mitten av september, och boendet i Missionshuset har frukost.
- **Seglarhotellet på Sandhamn:** julbord från slutet av november till julafton.
- **Möja:** Coop i Berg har öppet året runt, och STF Möja vandrarhem har öppet april–december.
- **Gällnö:** STF-vandrarhemmet har öppet året runt, men krogen stänger i slutet av augusti.

## Det som stänger
- Dykarbaren på Sandhamn har säsong maj–september.
- Finnhamns Café & Krog har huvudsäsong juni–augusti.
- Fjäderholmarna har säsongsöppet under sommarhalvåret.
- KSSS servicehus med dusch och toalett i Sandhamns gästhamn är öppna maj–september.
- På Waxholmsbolagets båtar har vissa fartyg begränsad servering under vintertidtabellen, december–april.

## Bullerö och nationalparken
Nämdöskärgårdens nationalpark invigdes 5 september 2025 och är Sveriges första marina nationalpark i Östersjön – 97 procent av ytan är hav. Huvudentrén ligger på Bullerö, där bastun är öppen för alla och inte går att boka. Mer: [Bullerö](/o/bullero).

## Tänk på
- Efter 20 augusti upphör det allmänna kravet att hålla hunden kopplad i naturen, men i naturreservat och nationalparker gäller koppel hela året.
- Färre avgångar på hösten: kolla tidtabellen för både ut- och hemresan.
- Fler ställen som har öppet: [Öppet i skärgården efter säsong](/blogg/eftersasong-skargard-oktober).
   `,
   faqs: [
     { q: 'Går skärgårdsbåtarna på hösten?', a: 'Ja, till de större öarna. Waxholmsbolaget går till Sandhamn året runt via Stavsnäs, till Grinda året om och till Utö året om från Årsta brygga. Cinderellabåtarna till Sandhamn har säsong 30 april–27 september.' },
     { q: 'Vad har öppet på Sandhamn på hösten?', a: 'Sandhamns Värdshus pub är öppen året runt, och restaurangen har främst öppet på helger utanför högsäsongen. Seglarhotellet har julbord från slutet av november till julafton.' },
     { q: 'Kan man bada bastu i skärgården på hösten?', a: 'Ja, på Bullerö i Nämdöskärgårdens nationalpark finns en bastu som är öppen för alla och inte går att boka.' },
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

**Avresa:** Årsta brygga, som nås med pendeltåg till Västerhaninge och buss 846 (16 min). Överfarten till Utö tar 35–75 min beroende på tur, och Gruvbryggan är beställningsbrygga på de flesta avgångar — boka minst en timme före avgång. Waxholmsbolagets reguljära båtar tar inga bilar. Vill du ha bilen med går det via Utö Sjötransporters fraktfärja M/S Renskär, som tar gods och förbokade bilar — inte med den vanliga skärgårdsbåten. Nynäshamnslinjen går dessutom till grannön Ålö, inte till Utö by; därifrån är det ca 10 km grusväg.
**Restid:** Totalt 2–2,5 timmar.
**Vad du gör:** Cykelleder, gruvmuseum, havsbastu, Utö Värdshus. En av de öar som ger mest upplevelse per besök.
**Bäst för:** De som vill ha en rik heldagsupplevelse och kan starta tidigt.
**Tips:** Hyr cykel vid bryggan (finns flera uthyrare). Cykla inte Utö runt på 3 timmar – ta det lugnt.

---

## 6. [Sandhamn](/o/sandhamn) – 1,5–2,5 timmar via Stavsnäs, seglingsikonen

**Avresa:** Strömkajen (lång tur) eller Stavsnäs (snabbgående, ca 40 min).
**Restid:** 30 min med Sandhamnslinjen eller 30–70 min med Waxholmsbolagets linje 16 från Stavsnäs vinterhamn, beroende på antal angöringar. Direkt från Strömkajen går båten bara 19 juni–16 augusti, och tar då 3 tim 45 min eller mer.
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
     { q: 'Kan man göra dagstur till Utö?', a: 'Ja. Enklaste vägen året runt är pendeltåg till Västerhaninge, buss 846 till Årsta brygga (14–17 min) och sedan båt till Gruvbryggan, 35–75 min beroende på tur — och observera att Gruvbryggan är beställningsbrygga på de flesta avgångar, resan måste bokas minst en timme i förväg i SL-appen eller hos Waxholmsbolaget. Räkna med drygt två timmar från stan. Waxholmsbolagets båtar tar inga bilar; fordonstransport går via Utö Sjötransporters fraktfärja M/S Renskär och måste förbokas. Nynäshamnsbåten går till grannön Ålö, ca 10 km grusväg från Utö by. Ta morgonbåten för att få maximalt med tid på ön.' },
   ],
 },

 'eftersasong-skargard-oktober': {
   title: 'Öppet i skärgården efter säsong – mat, båtar, bränsle och boende',
   excerpt: 'Vad har öppet i Stockholms skärgård i oktober och vintern? Lista med källa: pubar och butiker som har öppet året runt, båtlinjer som går hela året, sjömackar med automat och vandrarhem som tar emot gäster efter sommaren.',
   category: 'Praktiskt',
   date: '2026-07-27',
   updatedAt: '2026-09-24',
   readTime: '4 min',
   emoji: '🌿',
   tags: ['Eftersäsong', 'Oktober', 'Öppet året runt', 'Stockholms skärgård', 'Höst'],
   content: `
<!-- KÄLLA (ordagranna citat i island-data.ts och supabase/datafix): sandhamns-vardshus.se (puben "Öppet året runt", restaurangen främst helger utanför mitten juni–mitten september); sandhamn.com (julbord 26 november–24 december); konsummoja.se (Coop Berg "öppet året runt"); svenskaturistforeningen.se (STF Gällnö vandrarhem öppet året runt; STF Möja vandrarhem april–december); explorearchipelago.com (Tempo Westerbergs Livs på Sandhamn, ombud för Apoteket och Systembolaget); waxholmsbolaget.se (Sandhamn "turer året runt"; vintertidtabell december–april); lansstyrelsen.se Utö ("Waxholmsbåt året om till Gruvbryggan"); Grinda bryggor "trafikeras året om" (datafix 2026-09-22); battaxi.se/sandhamnslinjen-2 (hösttidtabell 21/9–20/12 2026); svenskagasthamnar.se/stockholms-skargard/husaro/ ("Drivmedel kan köpas med kortautomat året runt"); kymendo.se (tankning "dygnet runt året om med kortautomat", datafix 2026-09-23); sverigesnationalparker.se (bastun på Bullerö "öppen för alla och går inte att boka"); vaxholm.se (julmarknad i december). Tidigare version (borttagen 2026-09-24) angav öppettider för Seglarhotellet, Grinda Wärdshus, "Möja Krog" och gästhamnar i oktober och vattentemperatur 12–15 grader utan källa. -->
Den här listan tar bara med det vi kan belägga: ställen som själva skriver att de har öppet året runt eller efter sommaren. Öppettider ändras, så ring eller kolla deras sida innan du åker. Vill du ha inspiration för hösten: [Höst i skärgården](/blogg/host-i-skargarden-2026).

## Mat och butik året runt
- **Sandhamns Värdshus, Sandhamn:** puben är öppen året runt. Restaurangen har främst öppet på helger utanför högsommaren. [Fler ställen på Sandhamn](/blogg/basta-restaurangerna-sandhamn).
- **Seglarhotellet, Sandhamn:** julbord från slutet av november till julafton.
- **Coop Berg, Möja:** öppet året runt.
- **Tempo Westerbergs Livs, Sandhamn:** livsmedelsbutik och ombud för Apoteket och Systembolaget.

## Båtar hela året
- **Sandhamn:** Waxholmsbolaget via Stavsnäs året runt. Stavsnäs Båttaxis Sandhamnslinje har hösttidtabell fram till 20 december.
- **Grinda:** Norra och Södra bryggan trafikeras året om.
- **Utö:** Waxholmsbåt året om från Årsta brygga.
- Under Waxholmsbolagets vintertidtabell, december–april, har vissa fartyg begränsad servering ombord.

## Bränsle med automat
- [Husarö](/upptack/husaro-gasthamn-cafe): drivmedel med kortautomat året runt.
- [Kymendö Service](/upptack/kymmendo-gasthamn-kok): tankning dygnet runt året om med kortautomat.

## Boende
- **STF Gällnö vandrarhem:** öppet året runt.
- **STF Möja vandrarhem:** öppet april–december.
- **Sandhamns Värdshus:** boende med frukost i Missionshuset.

## Övrigt
- **Bastun på Bullerö** i Nämdöskärgårdens nationalpark är öppen för alla och går inte att boka.
- **Vaxholms julmarknad** hålls i december.
   `,
   faqs: [
     { q: 'Är Sandhamn öppet i oktober?', a: 'Ja. Båtarna via Stavsnäs går året runt, och Sandhamns Värdshus pub är öppen året runt. Restaurangen har främst öppet på helger utanför högsommaren.' },
     { q: 'Kan man tanka båten i skärgården på hösten?', a: 'Ja, bland annat på Husarö, där drivmedel säljs med kortautomat året runt, och hos Kymendö Service, där det går att tanka dygnet runt året om med kortautomat.' },
     { q: 'Vilka vandrarhem i skärgården har öppet på vintern?', a: 'STF Gällnö vandrarhem har öppet året runt, och STF Möja vandrarhem har öppet april–december.' },
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

**Varför:** Cykelleder, gruvmuseum, havsbastu, sandstränder (Barnens bad, Stora Sand), heldagsupplevelse.
**Hur tar man sig dit:** Pendeltåg till Västerhaninge, buss 846 till Årsta brygga och båt därifrån, 35–75 min beroende på tur (Gruvbryggan är beställningsbrygga på de flesta avgångar). Totalt drygt två timmar. Waxholmsbolagets båtar tar inga bilar — fordon går med Utö Sjötransporters fraktfärja M/S Renskär och måste förbokas.
**Badmöjligheter:** Utö har flera riktiga sandstränder — Barnens bad nära Gruvbryggan, Stora Sand på södra ön och Ålö Storsand på grannön. Värda resan i sig.
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
     { q: 'Finns det sandstränder i Stockholms skärgård?', a: 'Ja, men de är få. Utö (Barnens bad, Stora Sand) och grannön Ålö (Storsand) har de finaste sandstränderna. Nynäshamn har också sandstrand nära pendeltågsstationen.' },
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

<!-- KÄLLA: Länsstyrelsen Stockholm — Bullerö ingår i Nämdöskärgårdens nationalpark (invigd sept 2025), reservatet Bullerö upphävt 01FS 2026:01 (läst 2026-09-14) -->
[Bullerö](/o/bullero) ingår sedan 2025 i Nämdöskärgårdens nationalpark och har ingen fast befolkning – du ankrar eller paddlar dit, men nationalparkens föreskrifter gäller (kolla vad som är tillåtet kring tält och eld innan du åker). Ett av Stockholms skärgårds vackraste öar att övernatta på. Kombinera med kajakuthyrning från Dalarö eller charter.

**Bäst för:** Äventyrare, kajakpaddlare, de som vill ha riktig vildmark.

## 7. Utö – strand, sand och cykel (2–3 dagar, sommar)

[Utö](/o/uto) är unik i Stockholms skärgård med sina sandstränder Barnens bad och Stora Sand. Cykeluthyrning, en charmig hamn och Utö Värdshus för middag. Nås med båt från Nynäshamn (ca 1 timme).

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
   title: 'Sandhamn guide – båt dit, Trouville, mat, boende och historia',
   excerpt: 'Allt om Sandhamn i Stockholms skärgård: båt från Strömkajen, Strandvägen och Stavsnäs med restider, Trouville och Sandhamnsstigen, restauranger och boende, Grönskärs fyr och öns historia som lotsplats.',
   category: 'Öguide',
   date: '2026-07-28',
   updatedAt: '2026-09-24',
   readTime: '7 min',
   emoji: '⛵',
   tags: ['Sandhamn', 'Sandhamn guide', 'Trouville', 'Stockholms skärgård', 'KSSS'],
   content: `
<!-- KÄLLA: källorna finns ordagrant i src/app/o/island-data.ts (sandhamn) och i /blogg/basta-restaurangerna-sandhamn: Waxholmsbolaget tabell 15 (gäller 19 juni–16 augusti 2026, Strömkajen 10.00 → Sandhamn 13.45, 08.30 → 13.25) och tabell 16 (Stavsnäs–Sandhamn 40–65 min), waxholmsbolaget.se/reseplanering/resmal/sandhamn ("Ut till Sandhamn går det turer året runt"), battaxi.se/sandhamnslinjen-2 (Stavsnäs–Sandhamn 30 min), Strömma Cinderella 2026 (30/4–27/9, Strandvägen kajplats 14 10:00 → 12:30), SL buss 433/434 Slussen–Stavsnäs vinterhamn. varmdo.se Trouville (vit sand, södra sidan, ca 20 min promenad, toaletter sommartid, ingen badvattenprovtagning), varmdo.se spår och leder (Sandhamnsstigen ca 8 km runt Sandön via Trouville), naturkartan.se Sandön (Värmdö kommun: slingor 2,5, 3,5 och 5,5 km; trädklädda sanddyner jämförbara med Gotska Sandön och Fårö), stockholmslansmuseum.se Sandhamn (lotsstation slutet av 1600-talet; tullhuset av Carl Hårleman 1752; museum i Bryggstugan och Tullvaktstugan; Värdshuset från 1670-talet), ksss.se historia (grundat 1830), ksss.se/en/gotlandrunt/ (start sedan 2024 vid Gråskärsfjärden, mål i Sandhamn), lansstyrelsen.se Grönskär (naturreservat sedan 1965), skargardsstiftelsen.se (fyren 26 m, 1770, Adelcrantz; skänkt till stiftelsen 1984), ksss.se/hamnar/sandhamn (ca 150 gästplatser, 20 bokningsbara via Dockspot). Boende: sandhamn.com, sandhamns-vardshus.se (Missionshuset, boende och frukost), sandshotell.se; inget STF-boende på Sandhamn (visitskargarden.se, läst 2026-09-14). Tidigare version (borttagen 2026-09-24) påstod att Match Cup Sweden seglas på Sandhamn (tävlingen hålls i Marstrand), nämnde "Bryggcafé 7an", "Sandhamns Pensionat", "Lotsmuseet" och "Flaskbrottet" som vi inte hittar, angav hotell- och stugpriser och att ön är bilfri utan källa. -->
[Sandhamn](/o/sandhamn) på Sandön i Värmdö kommun är en gammal lots- och tullplats som blev seglarort, och i dag målgång för havskappseglingen Gotland Runt. Här är det du behöver för ett besök: båtarna dit, stranden, maten och boendet, med källor från operatörerna, kommunen och Stockholms läns museum.

## Båt till Sandhamn
- **Året runt via Stavsnäs:** buss 433 eller 434 från Slussen till Stavsnäs vinterhamn och därifrån Waxholmsbolagets linje 16 på 40–65 minuter eller Stavsnäs Båttaxis Sandhamnslinje på 30 minuter.
- **Cinderella från Strandvägen:** kajplats 14, cirka 2 timmar 30 minuter, under säsongen 30 april–27 september.
- **Waxholmsbåten från Strömkajen:** bara 19 juni–16 augusti, 3 timmar 45 minuter till knappt 5 timmar beroende på avgång och byte i Finnhamn.

Alla avgångar och restider: [Båt till Sandhamn](/o/sandhamn/komma-dit).

## Bada och gå
[Trouville](/upptack/stora-trouvillestranden) är en lång strand med vit sand på öns södra sida, omkring 20 minuters promenad från hamnen, med toaletter sommartid. Kommunen tar inga badvattenprover här. Fler bad: [Fläskbergets strand](/upptack/flaskbergets-strand) och [Västerudde strand](/upptack/vasterudde-strand).

Sandhamnsstigen är cirka 8 kilometer och går runt hela Sandön, förbi Trouville och genom tallskogen. Det finns kortare slingor på 2,5, 3,5 och 5,5 kilometer, alla med start i byn. Sandön består till stor del av trädklädda sanddyner – i den här delen av landet finns motsvarigheten bara på Gotska Sandön och Fårö.

## Äta
Sandhamns Värdshus har pub som är öppen året runt, och Seglarhotellet, Dykarbaren och Sands Hotell har restauranger. Sandhamnsbageriet har säsongsöppet. Alla ställen, säsonger och bordsbokning: [Restauranger på Sandhamn](/blogg/basta-restaurangerna-sandhamn).

## Bo
- **Sandhamn Seglarhotell** vid gästhamnen.
- **Sandhamns Värdshus** har boende med frukost i Missionshuset mitt i byn.
- **Sands Hotell**, ett konferens- och weekendhotell.

Det finns inget STF-boende på Sandhamn.

## Med egen båt
[KSSS gästhamn](/upptack/ksss-gasthamn-sandhamn) har cirka 150 gästplatser, varav 20 går att boka via Dockspot. Passbåten går till [Lökholmen](/upptack/ksss-gasthamn-lokholmen-trollsundet), där det finns plats för cirka 200 båtar.

## Historia
En lotsstation upprättades på Sandhamn i slutet av 1600-talet, och de bofasta var länge främst lotsar, tullare och krögare. Det gula tullhuset av sten i hamnen ritades av Carl Hårleman och byggdes 1752, och i de små 1700-talshusen Bryggstugan och Tullvaktstugan finns ett museum. Värdshuset är från 1670-talet. Kungliga Svenska Segel Sällskapet, grundat 1830, har seglingsverksamhet på fjärdarna runt Sandhamn, och mot slutet av 1800-talet hade Sandhamn blivit ett svenskt centrum för seglare. Sedan 2024 startar Gotland Runt vid Gråskärsfjärden söder om Sandön med målgång i Sandhamn.

## Grönskärs fyr
Öster om Sandhamn ligger Grönskär, naturreservat sedan 1965. Fyren är 26 meter hög och byggdes 1770 efter ritningar av Carl Fredrik Adelcrantz. Sjöfartsverket skänkte den till Skärgårdsstiftelsen 1984.
   `,
   faqs: [
     // KÄLLA: Waxholmsbolagets tidtabell 15A (19 juni–16 augusti 2026), Strömma Cinderella 2026, battaxi.se/sandhamnslinjen-2, Waxholmsbolaget tabell 16 – se KÄLLA-kommentaren i content.
     { q: 'Hur lång tid tar båten från Stockholm till Sandhamn?', a: 'Via Stavsnäs året runt: buss från Slussen till Stavsnäs vinterhamn och sedan Waxholmsbolagets linje 16 på 40–65 minuter eller Sandhamnslinjen på 30 minuter. Cinderella från Strandvägen tar cirka 2 timmar 30 minuter (30 april–27 september), och Waxholmsbåten från Strömkajen 3 timmar 45 minuter till knappt 5 timmar (19 juni–16 augusti).' },
     { q: 'Finns det strand på Sandhamn?', a: 'Ja. Trouville på öns södra sida är en lång strand med vit sand, omkring 20 minuters promenad från hamnen enligt Värmdö kommun.' },
     { q: 'Kan man övernatta på Sandhamn?', a: 'Ja, på Sandhamn Seglarhotell, Sands Hotell eller i Sandhamns Värdshus boende i Missionshuset. Med egen båt finns KSSS gästhamn med cirka 150 gästplatser.' },
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
- Tältet ska stå utom syn- och hörhåll från boningshus — någon fast meteruppgift finns inte, terrängen avgör
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
     { q: 'Kan man tälta fritt i skärgården?', a: 'Ja, allemansrätten ger rätt att tälta 1–2 nätter på de flesta platser i naturen. Håll dig utom syn- och hörhåll från boningshus — någon fast meteruppgift finns inte — ta med allt hem och elda inte på klipporna.' },
     { q: 'Var hittar man stuguthyrning i skärgården?', a: 'Blocket.se har störst utbud av sommarstugor. Airbnb och Sverigestugor.se är kompletterande alternativ. Boka sommarveckor senast i mars.' },
     { q: 'Finns det vandrarhem i skärgården?', a: 'Ja. Vaxholms Kastell är ett unikt alternativ i en historisk fästningsmiljö. STF driver vandrarhem på flera öar, bland annat Utö.' },
   ],
 },

 'skargard-med-hund': {
   title: 'Skärgård med hund – regler, båten och öar att besöka',
   excerpt: 'Ta med hunden till Stockholms skärgård: när hunden ska vara kopplad enligt Naturvårdsverket, vad som gäller i naturreservat, hund på Waxholmsbåten, hundbad och öar att besöka.',
   category: 'Guide',
   date: '2026-07-28',
   updatedAt: '2026-09-24',
   readTime: '5 min',
   emoji: '🐕',
   tags: ['Skärgård med hund', 'Hund', 'Kopplingstvång', 'Allemansrätten', 'Waxholmsbolaget'],
   content: `
<!-- KÄLLA (lästa 2026-09-24): naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/hundar-i-naturen/ ("Mellan 1 mars och 20 augusti måste du ha extra uppsikt över din hund i naturen. Under den tiden får hunden inte springa lös. I praktiken innebär det nästan alltid att du behöver ha hunden kopplad."; "Ha alltid koppel på hunden när ni vistas i nationalparker eller naturreservat."; "Ha alltid hunden i koppel nära betande djur"). waxholmsbolaget.se/att-resa-med-oss/vad-du-far-ta-med ("Du får ta med hundar och mindre sällskapsdjur gratis. Ombord på båten finns det skyltar som visar var det finns platser för dig som reser med husdjur. Hundar ska hållas kopplade ombord"). lansstyrelsen.se Gällnö naturreservat (föreskrift: förbjudet att föra lös hund; läst 2026-09-14). Grinda, Finnhamn: naturreservat enligt Skärgårdsstiftelsen/Länsstyrelsen (se DB-texter och island-data). Linanäs gästhamn: "restaurang och café, där även hundar är välkomna" (datafix 2026-09-22). Schweizerbadet: "hundbad finns vid Vadviken" (haninge.se, datafix 2026-09-22). Tidigare version (borttagen 2026-09-24) påstod att hunden får springa fritt på Grinda utanför 1 mars–20 augusti (fel: Grinda är naturreservat där hunden alltid ska vara kopplad), att Ornö nås med vägfärja från Nynäshamn och att Grinda Wärdshus tillåter hundar i uteserveringen – utan källa. -->
Hunden får följa med på skärgårdsbåten och ut på öarna, men reglerna för koppel är striktare än många tror: i naturreservat ska hunden alltid vara kopplad, och många av Stockholms skärgårdsöar är naturreservat. Här är vad som gäller enligt Naturvårdsverket och Waxholmsbolaget.

## Reglerna

### Koppel 1 mars–20 augusti – överallt i naturen
Mellan 1 mars och 20 augusti får hunden inte springa lös i naturen, eftersom vilda djur har ungar. Enligt Naturvårdsverket innebär det i praktiken nästan alltid att hunden ska vara kopplad.

### I naturreservat – alltid koppel
I nationalparker och naturreservat ska hunden ha koppel hela året, enligt Naturvårdsverket. Varje reservat har också egna föreskrifter som står på Länsstyrelsens sida för reservatet.

### Nära betande djur – alltid koppel
På öar med betesmark, till exempel där får och kor håller landskapet öppet, ska hunden vara kopplad.

## Hunden på båten
På Waxholmsbolagets båtar får du ta med hund gratis. Ombord visar skyltar var platserna för husdjur finns, och hunden ska vara kopplad under resan.

## Öar och platser
- [Grinda](/o/grinda) – naturreservat med ångbåtsbryggor som trafikeras året om. Här gäller koppel hela året.
- [Gällnö](/o/gallno) – naturreservat där det enligt föreskrifterna är förbjudet att ha lös hund, med hagmarker och levande jordbruk.
- [Finnhamn](/o/finnhamn) – naturreservat med gästhamn, vandrarhem och krog.
- [Linanäs](/upptack/linanas-gasthamn), Ljusterö – restaurangen och caféet vid bryggan välkomnar hundar.
- **Hundbad i Vadviken, Dalarö** – intill [Schweizerbadet](/upptack/schweizerbadet) finns ett hundbad.

## Praktiskt
- Ta med dricksvatten och hundpåsar.
- Planerar du att ta hunden i egen båt: [gästhamnar i Stockholms skärgård](/blogg/gasthamnar-guide).
   `,
   faqs: [
     { q: 'Får man ta med hund på Waxholmsbåten?', a: 'Ja. Enligt Waxholmsbolaget får du ta med hundar och mindre sällskapsdjur gratis. Hunden ska vara kopplad ombord, och skyltar visar var platserna för husdjur finns.' },
     { q: 'När ska hunden vara kopplad i skärgården?', a: 'Mellan 1 mars och 20 augusti får hunden inte springa lös i naturen, vilket i praktiken nästan alltid betyder koppel. I naturreservat och nationalparker ska hunden ha koppel hela året, enligt Naturvårdsverket.' },
     { q: 'Får hunden springa lös på Grinda?', a: 'Nej. Grinda är naturreservat, och i naturreservat ska hunden alltid vara kopplad enligt Naturvårdsverket.' },
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

### 1. Utö – Utö runt (ca 15 km)
[Utö](/o/uto) har en av skärgårdens bästa vandringsleder. Från Gruvbryggan förbi långgrunda Barnens bad, söderut mot sandstranden Stora Sand och tillbaka längs östra klippkusten via Södra Sandvik. Kuperat, havsnära och med dramatiska vyer. Nås med båt från Nynäshamn.

### 2. Ornö – Runt hela ön (ca 20 km)
[Ornö](/o/orno) är en av de större öarna söder om Stockholm med ett välskyltat runt-öled. Gammelskogar, klippor och vyer mot yttre skärgården. Bra att kombinera med övernattning. Bil till Nynäshamn + vägfärja.

### 3. Möja – Byvandring (ca 8 km)
[Möja](/o/moja) är bilfri och perfekt för en dagstur med vandring. Vandra mellan de tre byarna längs byvägar och skogstigar. Kuperat, charmigt och med café-paus på vägen.

<!-- KÄLLA: Länsstyrelsen Stockholm — naturreservat Gällnö (med Karklö), sedan 1978, utvidgat 2017/2024, ca 270 ha, förvaltas av Skärgårdsstiftelsen (läst 2026-09-14) -->
### 4. Gällnö naturreservat (ca 6 km)
Gällnö är ett naturreservat i Värmdö skärgård med markerade leder och vacker urbergsterräng. Enklare och kortare — perfekt för familjer med barn som kan gå.

<!-- KÄLLA: Länsstyrelsen Stockholm — Bullerö ingår i Nämdöskärgårdens nationalpark (invigd sept 2025), reservatet Bullerö upphävt 01FS 2026:01 (läst 2026-09-14) -->
### 5. Bullerö, Nämdöskärgårdens nationalpark (ca 5 km)
<!-- KÄLLA: Länsstyrelsen Stockholm — Bullerö ingår i Nämdöskärgårdens nationalpark (invigd sept 2025), reservatet Bullerö upphävt 01FS 2026:01 (läst 2026-09-14) -->
[Bullerö](/o/bullero) är en av skärgårdens vackraste öar och ingår sedan 2025 i Nämdöskärgårdens nationalpark, utan fast boende. Kort slingled med utsiktsplatser. Nås med charter- eller privatbåt.

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
     { q: 'Vilken är den bästa vandringen i Stockholms skärgård?', a: 'Utö-etappen av Stockholm Archipelago Trail (18,4 km, start Gruvbryggan eller Spränga) och Ornö-etappen (34,1 km) är de mest kompletta vandringarna. För kortare dagsvandringar är Grinda och Möja utmärkta.' },
     { q: 'Behöver man bil för att vandra i skärgården?', a: 'Nej. De flesta vandringsleder nås med Waxholmsbåten direkt från Stockholm. Utö nås med båt från Nynäshamn (pendeltåg + byte).' },
     // KÄLLA: Länsstyrelsen Stockholm — naturreservat Gällnö (1978), Skärgårdsstiftelsen förvaltar (läst 2026-09-14)
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
<!-- KÄLLA: Länsstyrelsen Stockholm — Bullerö ingår i Nämdöskärgårdens nationalpark (invigd sept 2025), reservatet Bullerö upphävt 01FS 2026:01 (läst 2026-09-14) -->
[Bullerö](/o/bullero) och de omgivande skären är ett av Stockholms skärgårds finaste ankringsområden. Del av Nämdöskärgårdens nationalpark (sedan 2025), utan bofast befolkning, med klippor som sträcker sig ner i vattnet. Välskyddat från sydväst. Använd sjökortet noggrant — det är grunt på flera ställen.

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

**Respektera skyddad natur.** Bullerö ingår i Nämdöskärgårdens nationalpark och många av de finaste naturhamnarna är naturreservat. Elda inte (eldförbud råder vid torr väderlek), plocka inte blommor och ta med all sopor hem.

Naturhamnens framtid beror på att vi som seglare behandlar dem rätt. Med respekt för reglerna och havsmiljön förblir de tillgängliga för generationer av seglare.
   `,
   faqs: [
     { q: 'Vad är en naturhamn?', a: 'En naturhamn är en naturligt skyddad vik eller fjärd där båtar kan ankra utan att betala hamnavgift. Till skillnad från en gästhamn saknar den faciliter som dusch och el.' },
     { q: 'Behöver man betala för att ankra i en naturhamn?', a: 'Nej, ankring i naturhamnar är normalt gratis i Sverige tack vare allemansrätten. Undantag kan finnas i vissa naturreservat med speciella regler.' },
     { q: 'Vilken sjökortsapp rekommenderas för Stockholms skärgård?', a: 'Navionics är den vanligaste och mest uppdaterade sjökortsappen för Stockholms skärgård. Ladda ner offline-kartor för att klara dig utan nätuppkoppling ute i skären.' },
   ],
 },

 'grinda-guide-2026': {
   title: 'Grinda guide – båt dit, Wärdshuset, gästhamn och bad',
   excerpt: 'Allt om Grinda i Stockholms skärgård: Waxholmsbåten från Strömkajen, Grinda Wärdshus och Framfickan, gästhamnen med 28 bokningsbara platser, bad vid Källviken, natur- och kulturstigen och reglerna i naturreservatet.',
   category: 'Öguide',
   date: '2026-07-28',
   updatedAt: '2026-09-24',
   readTime: '6 min',
   emoji: '🌿',
   tags: ['Grinda', 'Grinda Wärdshus', 'Grinda gästhamn', 'Stockholms skärgård', 'Naturreservat'],
   content: `
<!-- KÄLLA: källorna finns ordagrant i src/app/o/island-data.ts (grinda): lansstyrelsen.se Grinda naturreservat ("Skyddat sedan: 2000", "503 hektar varav land 178", Skärgårdsstiftelsen förvaltare och markägare, "Stockholms stad förvärvade Grinda 1947", Klubbudden "öns högsta punkt med 35 m", natur- och kulturstig "cirka 2,5 km" från Hemviken, förbud mot okopplad hund, "Tältning är endast tillåten på tältplatsen nära norra bryggan", förbud att förankra båt längre än två dygn), skargardsstiftelsen.se/omraden/grinda (Wärdshuset mitt på ön, badplatsen Källviken, barnvänliga badstränder, lanthandel, café och tältplats sommartid, Grinda lantbruk med kor och hästar, SAT), grinda.se/mat-fest/wardshuset ("klassisk skärgårdsmat & stämning sedan 1906", utsikt över Saxarfjärden), grinda.se/mat-fest/framfickan ("hamnkrog, pizza & lättare rätter", "endast drop-in"), grinda.se/mat-fest/lanthandel-cafe (frukost och enklare luncher), grinda.se/hamn-mack/gasthamn ("gästhamn för 100 båtar", "28 st bokningsbara platser", el, dusch, toalett), grinda.se/hamn-mack/sjomack ("Bensin 98, Diesel, Gasol"), svenskaturistforeningen.se STF Grinda hotell & Sea Lodge (28 dubbelrum, Sea Lodge på södra sidan, ca 1 km/15 min från bryggorna), skargardsstiftelsen.se byggnader (jugendvillan av Ernst Stenhammar klar 1908, Henrik Santesson), Waxholmsbolagets reseplanerare (linje 13 Strömkajen–Södra Grinda 1 tim 50 min, linje 14 1 tim 45 min; läst 2026-09-19), Grinda Norra och Södra bryggan trafikeras året om av Waxholmsbolaget och Cinderella (datafix). Tidigare version (borttagen 2026-09-24) angav naturreservat sedan 1968 (rätt: 2000), båtresa 1 timme 20 minuter, gästhamn för 150–200 båtar, bokning via marinadata.se, rum- och hamnpriser, samt badplatser och fiske utan källa. -->
[Grinda](/o/grinda) är ett naturreservat i Stockholms mellersta skärgård som ägs och förvaltas av Skärgårdsstiftelsen. Stockholms stad köpte ön 1947, och sedan dess har den varit ett friluftsområde med värdshus, gästhamn, tältplats och lantbruk. Här är det du behöver för ett besök.

## Båt till Grinda
Waxholmsbolagets båtar från Strömkajen tar ungefär 1 timme 45 minuter till Södra Grinda (linje 14) eller 1 timme 50 minuter (linje 13). Både Norra och Södra bryggan trafikeras året om av Waxholmsbolaget och Cinderella. Alla avgångar: [Båt till Grinda](/o/grinda/komma-dit).

## Äta
- **Grinda Wärdshus** ligger mitt på ön med utsikt över Saxarfjärden och serverar skärgårdsmat. Wärdshuset har funnits sedan 1906.
- **Framfickan** vid gästhamnen är en hamnkrog med pizza och lättare rätter, endast drop-in.
- **Lanthandeln** nedanför Wärdshuset har café med frukost och enklare luncher.

## Bo
STF Grinda Hotell har 28 dubbelrum och ligger cirka en kilometer, ungefär 15 minuter till fots, från bryggorna. Grinda Sea Lodge på öns södra sida är ett enklare boende. Tälta får du bara på tältplatsen nära norra bryggan.

## Bad och natur
Skärgårdsstiftelsen lyfter fram badplatsen vid Källviken och öns barnvänliga badstränder. Natur- och kulturstigen är cirka 2,5 kilometer och börjar vid gården Hemviken, och från Klubbudden, öns högsta punkt på 35 meter, ser du ut över skärgården. Stockholm Archipelago Trail går också över ön. På Grinda lantbruk betar kor och hästar.

## Med egen båt
[Grinda gästhamn](/upptack/grinda-gasthamn) i Hemviken har plats för 100 båtar, varav 28 bokningsbara, med el, dusch och toalett. Sjömacken säljer bensin 98, diesel och gasol. I reservatet får du inte förankra båten längre än två dygn på samma ställe.

## Regler i naturreservatet
- Hunden ska vara kopplad.
- Tältning bara på tältplatsen nära norra bryggan.
- Båt får inte ligga förankrad längre än två dygn.

## Historia
En jugendvilla i sten på ön ritades av Ernst Stenhammar och stod klar 1908 åt Henrik Santesson, Nobelstiftelsens första vd. Reservatet omfattar 503 hektar, varav 178 hektar land, och bildades 2000.
   `,
   faqs: [
     // KÄLLA: Waxholmsbolagets reseplanerare (linje 13 och 14), grinda.se/hamn-mack/gasthamn, lansstyrelsen.se Grinda naturreservat – se KÄLLA-kommentaren i content.
     { q: 'Hur lång tid tar båten till Grinda?', a: 'Från Strömkajen tar Waxholmsbolagets båt ungefär 1 timme 45 minuter till Södra Grinda med linje 14 och 1 timme 50 minuter med linje 13. Båtarna går året om.' },
     { q: 'Kan man boka plats i Grinda gästhamn?', a: 'Ja, 28 av gästhamnens platser går att boka. Hamnen har plats för 100 båtar totalt.' },
     { q: 'Får man tälta på Grinda?', a: 'Ja, men bara på tältplatsen nära norra bryggan. Grinda är naturreservat, och där är tältning på andra platser förbjuden.' },
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

[Möja](/o/moja) är annorlunda. Bilfri, kuperad och med tre byar sammanbundna av byvägar som knappt finns på Google Maps. Waxholmsbåten dit tar 3 tim 05 och uppåt från Strömkajen i höst- och vårtabellen, 2 tim 35 med sommartidtabellens snabbaste tur — snabbast året runt är buss 434 till Sollenkroka och båt därifrån, ett café och en dag av genuint skärgårdsliv.

## 5. Sandhamn – seglarnas ö

[Sandhamn](/o/sandhamn) är skärgårdens mest kända destination. Snabbåt från Stavsnäs (40 min) eller Waxholmsbåt från Strömkajen (2,5 h). Restauranger, Trouville-strand och en hamn fylld med segelbåtar. Boka boende tidigt om du stannar.

---

## 6. Utö – sandstrand och cykel

[Utö](/o/uto) är unik med sina sandstränder (Barnens bad, Stora Sand) och cykelleder. Nås med pendeltåg till Nynäshamn + båt (ca 1 timme). En av de bästa dagar du kan ha i Stockholms skärgård.

## 7. Ornö – vandring och vildmark

[Ornö](/o/orno) är för den som vill ha riktig natur. Bil krävs (vägfärja från Nynäshamn), men belöningen är en av skärgårdens bäst bevarade öar med runt-öled och fullständigt lugn.

<!-- KÄLLA: Länsstyrelsen Stockholm — Bullerö ingår i Nämdöskärgårdens nationalpark (invigd sept 2025), reservatet Bullerö upphävt 01FS 2026:01 (läst 2026-09-14) -->
## 8. Bullerö i Nämdöskärgårdens nationalpark – klippor och frihet

[Bullerö](/o/bullero) nås bara med båt och har ingen fast service. Charter eller privat båt, med tält och matsäck. En av Stockholms skärgårds vackraste öar för den som vill vara ifred.

## 9. Fjärdlång – yttre skärgårdens stillhet

En av de öar i yttre skärgården som fortfarande är relativt okänd. Charter- eller privat båt. Nakna klippor, havsluft och utsikt mot Östersjön.

<!-- KÄLLA: Länsstyrelsen Stockholm — naturreservat Gällnö (med Karklö), sedan 1978, utvidgat 2017/2024, ca 270 ha, förvaltas av Skärgårdsstiftelsen (läst 2026-09-14) -->
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
 'basta-restaurangerna-sandhamn': [{ href: '/o/sandhamn', label: 'Sandhamn – ön' }, { href: '/o/sandhamn/komma-dit', label: 'Båt till Sandhamn' }, { href: '/stockholms-skargard', label: 'Stockholms skärgård' }],
 'kajak-stockholms-skargard-nyborjare': [{ href: '/stockholms-skargard', label: 'Stockholms skärgård' }, { href: '/aktiviteter', label: '🎯 Aktiviteter i skärgården' }],
 'dolda-parlor-moja': [{ href: '/stockholms-skargard', label: 'Stockholms skärgård' }],
 'bransle-ankring-skargard': [{ href: '/stockholms-skargard', label: 'Stockholms skärgård' }, { href: '/hamnar-och-bryggor', label: 'Hamnar & bryggor' }],
 'sommar-skargard-tips': [{ href: '/stockholms-skargard', label: 'Stockholms skärgård' }, { href: '/aktiviteter', label: '🎯 Aktiviteter i skärgården' }],
 'fjaderholmarna-dagstur': [{ href: '/stockholms-skargard', label: 'Stockholms skärgård' }],
 'vaxholm-guide': [{ href: '/stockholms-skargard', label: 'Stockholms skärgård' }],
 'uto-guide': [{ href: '/stockholms-skargard', label: 'Stockholms skärgård' }],
 'segling-nyborjare-guide': [{ href: '/stockholms-skargard', label: 'Stockholms skärgård' }, { href: '/nyborjare-segling', label: 'Börja segla — nybörjarguide' }, { href: '/segelrutter', label: 'Segelrutter' }],
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
     <Icon name="mail" size={12} stroke={2} style={{ verticalAlign: '-2px', marginRight: 5 }} />Nyhetsbrev
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
           description="Nya guider och säsongsnytt från skärgården. Gratis, inga annonser."
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
     Få nya guider som denna i inkorgen
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
