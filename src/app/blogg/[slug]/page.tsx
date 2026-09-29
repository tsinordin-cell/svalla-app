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
Sandhamn nås med Waxholmsbåten direkt från Strömkajen bara sommartid (2026: 19 juni–16 augusti), och då tar turen mellan 3 tim 45 min och knappt 5 timmar beroende på avgång och byte i Finnhamn. Året runt går buss 433 eller 434 från Slussen till Stavsnäs vinterhamn (48–59 min) och därifrån Waxholmsbolagets linje 16 på 40–60 min eller Stavsnäs Båttaxis Sandhamnslinje på 30 min. Cinderella från Strandvägen kajplats 14 tar 2 tim 30 min under sin säsong (2026: 30 april–27 september). Alla alternativ med restider finns på [Båt till Sandhamn](/o/sandhamn/komma-dit).
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
Med kajak når du stränder och vikar som båtarna inte angör, och allemansrätten ger dig rätt att paddla, gå i land och bada längs stränderna. Här är det du behöver veta som nybörjare – var du hyr kajak, vad som gäller när du går i land och vad du packar.

## Börja med en guidad tur eller kurs
Första gången är det tryggast att paddla med någon som kan området – en guidad tur eller en nybörjarkurs hos en kajakuthyrare eller paddelklubb.

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
   title: 'Sjömackar i Stockholms skärgård – tanka och ankra',
   excerpt: 'Var du tankar båten i Stockholms skärgård: sjömackar från Grisslehamn och Rödlöga i norr till Nynäshamn i söder, Kryssarklubbens råd om säker tankning och vad allemansrätten säger om att ankra.',
   category: 'Praktiskt',
   date: '2026-03-01',
   updatedAt: '2026-09-24',
   readTime: '6 min',
   emoji: '⛽',
   tags: ['Sjömack', 'Bränsle', 'Tanka båt', 'Ankring', 'Stockholms skärgård'],
   // KÄLLA: stavsnasbatvarv.se ("Hos oss kan du tanka dygnet runt", datafix 2026-09-23), grisslehamnsmarina.se ("med diesel & bensin – öppet dygnet runt med kortbetalning", datafix 2026-09-22), ingmarsogasthamn.se, svenskagasthamnar.se/stockholms-skargard/husaro/, rodlogaboden.se/pages/om-oss, naturvardsverket.se på vatten, lansstyrelsen.se Grinda och Finnhamn – se KÄLLA-kommentaren i content.
   faqs: [
     { q: 'Var kan man tanka båten dygnet runt i Stockholms skärgård?', a: 'Stavsnäs Båtvarv & Sjömack i Vinterhamnen i Stavsnäs anger att du kan tanka dygnet runt, och Grisslehamns Marina har diesel och bensin dygnet runt med kortbetalning. På Ingmarsö och Husarö finns kortautomat året runt.' },
     { q: 'Finns det sjömack i ytterskärgården?', a: 'Ja. Rödlögaboden på Rödlöga har en sjömack med bensin, diesel, fotogen och gasol.' },
     { q: 'Hur länge får man ankra på samma plats?', a: 'Naturvårdsverket anger ingen fast gräns, men skriver att man brukar följa samma princip som för tältning, alltså något enstaka dygn. I många naturreservat, som Grinda och Finnhamn, är gränsen två dygn i följd på samma strand.' },
   ],
   content: `
<!-- KÄLLA (lästa 2026-09-22–24): grisslehamnsmarina.se ("med diesel & bensin – öppet dygnet runt med kortbetalning"; datafix 2026-09-22). graddosjomack.se/gasthamn/ ("Sjömack och service finns i anslutning till hamnen."; datafix 2026-09-22) och graddosjomack.se (sjömack med bensin och diesel, island-data graddo). rodlogaboden.se/pages/om-oss ("Till Rödlögaboden också en sjömack med bensin, diesel, fotogen och gasol."; "Butiken har öppet sommartid."). svenskagasthamnar.se, tjänstetabeller lästa 2026-09-24: furusund (Diesel, Bensin, Gasol), waxholm-vaxholm ("Diesel Sjömackarna/Gulf", "Bensin Sjömackarna/Gulf"), moja-langviks-inre-hamn ("Diesel OK/Q8", "Bensin OK/Q8"), ksss-gasthamn-telegrafholmen ("Diesel Sandhamns sjöstation", "Bensin Sandhamns sjöstation"), stockholm-fjaderholmarna (Diesel, Bensin, Gasol), linanas-gasthamn (Diesel, Bensin, Gasol), dalaro-hotellbryggan (Diesel, Bensin, Gasol), orno-kyrkviken (Diesel, Bensin; "Hamnvärd: Ornö-macken GULF"), uto ("Bensin Separat mack", Diesel), nynashamn (Diesel, Bensin, Gasol). dyvik.se ("vår marina som ligger perfekt bredvid Furusundsleden"; "GÄSTHAMN MACK OCH SJÖBUTIK"; datafix 2026-09-22). klintsundetmarina.se ("Blyfri 98, RME-fri diesel för båtar och alkylatbensin från pump och på dunk", gasol "från både AGA och Primagaz"; datafix 2026-09-23). ingmarsogasthamn.se ("Sjömacken är öppen året runt och har självservice med kortautomat året om."). grinda.se/hamn-mack/sjomack ("Bensin 98, Diesel, Gasol"; island-data grinda). svenskagasthamnar.se/stockholms-skargard/husaro/ ("Drivmedel kan köpas med kortautomat året runt."; datafix 2026-09-23). namdosolvik.com/handla ("Här tankar du snabbt och smidigt innan nästa äventyr till havs."; datafix 2026-09-23). stavsnasbatvarv.se ("Stavsnäsvägen 218, Vinterhamn, 139 70 Stavsnäs", "Hos oss kan du tanka dygnet runt"; datafix 2026-09-23). marindepan.se/om-oss/marindepan-dalaro ("Vi har sjömack, kiosk samt en välsorterad tillbehörsbutik."; datafix 2026-09-22). utogasthamn.se/gasthamnen/ ("I den norra hamnen finns sjömacken"; island-data uto). sxk.se/batliv/toalettavfall-och-sjomackar ("Personer skall inte vistas ombord på båten vid tankning. Det finns risk för att tunga bensingaser samlas i lågpunkter och dessa kan antändas."; "Stäng av motorn."; "slå av huvudströmbrytaren"; "Efter avslutad tankning skall man ventilera ut gaserna genom att använda motorrumsfläkten."; "Rök inte vid tankning"; "Undvik att få den högexplosiva bensingasen i båten. Därför ska lösa utombordartankar aldrig fyllas på inombords."; "Förvara bara bränslet i godkända kärl."; "Fyll inte tanken helt. Kallt bränsle expanderar kraftigt under varma sommardagar."). naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/pa-vatten/ ("Du får gå i land, bada, ankra och tillfälligt förtöja vid en strand som inte tillhör någon tomt"; "Det finns inte heller någon regel för hur länge du får ligga för ankar på samma plats. Man brukar använda sig av samma princip som för tältning, och det är något enstaka dygn."). sxk.se/batliv/allemansratten ("Du kan ankra upp något enstaka dygn på samma plats utan att fråga markägaren."). lansstyrelsen.se Grinda och Finnhamn (förbjudet att "för längre tid än två dygn i följd förankra båt vid samma strand"). skargardsstiftelsen.se/omraden/fejan/ ("Fejan ligger i norra skärgården, strax öster om Räfsnäs."; "Hamnavgiften inkluderar tillgång till dusch, toalett och bastu."). rodlogaboden.se ("It is possible to find a safe natural harbour in all winds."). lansstyrelsen.se Huvudskär ("Reservatet omfattar hela Huvudskärsarkipelagen utom huvudön Ålandsskär, och ligger tio kilometer sydost om Ornö."; "Det finns gott om fina naturhamnar i reservatet"). Tidigare version (borttagen 2026-09-24): Vaxholm "öppet nästan dygnet runt under sommarsäsongen med kortautomater" (obelagt), Sandhamn "dyrt i förhållande till fastlandet – tanka hellre i Stavsnäs eller Dalarö" och Nynäshamn "prisvärd" (prisjämförelser utan källa), Fejan som "skyddad vik norr om Furusund" (Skärgårdsstiftelsen: strax öster om Räfsnäs), Rödlöga med "plats för ett tiotal båtar" (obelagt), Gillöga (inga uppgifter gick att belägga), Huvudskär som "det yttersta lotshuset, nu naturreservat" (reservatet omfattar arkipelagen utom huvudön Ålandsskär), att man får "ankra fritt i naturhamnar upp till ett par nätter" (Naturvårdsverket: ingen fast regel, något enstaka dygn), "egna förtöjningsringar", en filterfunktion på Svalla-kartan och rådet om reservdunk utan källa. -->
Sjömackar finns i gästhamnar och marinor i hela Stockholms skärgård, från Grisslehamn och Rödlöga i norr till Nynäshamn i söder. Här är de som går att belägga hos Svenska Gästhamnar och verksamheternas egna sidor. Öppettider och säsong varierar, så kolla med macken innan du planerar sista tankningen.

## Norra skärgården och Roslagen
- [Grisslehamns marina](/upptack/grisslehamns-marina-och-camping) – diesel och bensin, öppet dygnet runt med kortbetalning.
- [Gräddö](/upptack/graddo-brygga) – sjömack med bensin och diesel i anslutning till gästhamnen.
- [Rödlöga](/o/rodloga) – Rödlögaboden har en sjömack med bensin, diesel, fotogen och gasol. Butiken har öppet sommartid.
- [Furusund](/o/furusund) – Svenska Gästhamnar anger diesel, bensin och gasol i gästhamnen.
- [Dyvik Marina](/upptack/dyvik-marina) vid Furusundsleden – gästhamn, mack och sjöbutik.
- [Klintsundet Marina](/upptack/circle-k-klintsundet) på Ljusterö – blyfri 98, RME-fri diesel och alkylatbensin från pump och på dunk, samt gasol.
- **Linanäs gästhamn** på Ljusterö – enligt Svenska Gästhamnar finns diesel, bensin och gasol.
- [Ingmarsö](/upptack/ingmarso-gasthamn) – sjömacken är öppen året runt med självservice och kortautomat.

## Mellersta skärgården
- [Vaxholm](/upptack/waxholms-gasthamn-och-rent-under-batbotten-tvatt) – diesel, bensin och gasol via Sjömackarna/Gulf.
- [Fjäderholmarna](/o/fjaderholmarna) – enligt Svenska Gästhamnar finns diesel, bensin och gasol.
- [Grinda](/upptack/grinda-gasthamn) – sjömacken säljer bensin 98, diesel och gasol.
- [Möja](/o/moja) – i Långviks inre hamn finns diesel och bensin (OK/Q8).
- [Husarö](/upptack/husaro-gasthamn-cafe) – drivmedel med kortautomat året runt.
- [Sandhamn](/o/sandhamn) – enligt Svenska Gästhamnar säljs diesel och bensin på Sandhamns sjöstation.
- [Nämdö](/upptack/namdo-macken) – sjömack i Solvik.
- **Stavsnäs** – Stavsnäs Båtvarv & Sjömack i Vinterhamnen, där du kan tanka dygnet runt.

## Södra skärgården
- [Dalarö](/upptack/marindepan-dalaro) – Marindepån Dalarö har sjömack, och vid Hotellbryggan anger Svenska Gästhamnar diesel, bensin och gasol.
- [Ornö](/upptack/ornomacken-gasthamn) – Ornö-macken i Kyrkviken, med diesel och bensin.
- [Utö](/o/uto) – sjömacken ligger i norra hamnen.
- [Nynäshamn](/upptack/nynashamn-marinbransle) – diesel, bensin och gasol i gästhamnen.

## Tanka säkert
Svenska Kryssarklubben ger de här råden:
- Ingen ska vara ombord medan du tankar – tunga bensingaser kan samlas i båtens lågpunkter och antändas.
- Stäng av motorn och slå av huvudströmbrytaren. Rök inte.
- Fyll aldrig lösa utombordartankar inombords, och förvara bara bränsle i godkända kärl.
- Fyll inte tanken helt. Kallt bränsle expanderar kraftigt under varma sommardagar.
- Ventilera ut gaserna med motorrumsfläkten efter tankningen.

## Ankra för natten
Enligt Naturvårdsverket får du ankra och tillfälligt förtöja vid en strand som inte tillhör någon tomt. Det finns ingen fast regel för hur länge, men man brukar följa samma princip som för tältning – något enstaka dygn. I naturreservat som Grinda och Finnhamn får båten inte ligga förankrad vid samma strand längre än två dygn i följd.

Några hamnar i ytterskärgården:
- [Rödlöga](/o/rodloga) – enligt Rödlögaboden finns en skyddad naturhamn i alla vindar, och sjömacken ligger på ön.
- [Fejan](/o/fejan) – strax öster om Räfsnäs, med gästhamn där dusch, toalett och bastu ingår i hamnavgiften.
- [Huvudskär](/o/huvudskar) – naturreservatet tio kilometer sydost om Ornö har gott om naturhamnar.

Fler platser och regler: [Naturhamnar i Stockholms skärgård](/blogg/naturhamnar-stockholm-skargard) och [Gästhamnar i Stockholms skärgård](/blogg/gasthamnar-guide).
   `,
 },

 'sommar-skargard-tips': {
 title: 'Sommar i skärgården – bad, vandring, tält och kajak',
 excerpt: 'Tio saker att göra i Stockholms skärgård på sommaren: sandstrand, en etapp av Stockholm Archipelago Trail, kajak, sälsafari, bastu, fyr och dansbana – och reglerna för tält, eld och hund.',
 category: 'Inspiration',
 date: '2026-02-14',
 updatedAt: '2026-09-24',
 readTime: '5 min',
 emoji: '☀️',
 tags: ['Sommar', 'Stockholms skärgård', 'Bad', 'Vandring', 'Kajak'],
 faqs: [
   // KÄLLA: lansstyrelsen.se Grinda, Utö, Gällnö och Nämdöskärgårdens nationalpark; stockholmarchipelagotrail.com etappsidorna – se KÄLLA-kommentaren i content.
   { q: 'Får man tälta i skärgårdens naturreservat?', a: 'Det beror på reservatet. På Grinda bara på tältplatsen nära norra bryggan och på Utö bara på anvisade platser. På Gällnö får tältet stå högst två dygn på samma plats, och på Bullerös tältplats upp till sju dygn.' },
   { q: 'Får man grilla och elda i skärgården?', a: 'Stockholm Archipelago Trail uppmanar dig att respektera eldningsförbud och aldrig elda på klippa. På Utö får du bara elda på iordningställda platser, och i Nämdöskärgårdens nationalpark på anvisade platser eller i grill på ben.' },
   { q: 'Ska hunden vara kopplad i skärgården?', a: 'Längs Stockholm Archipelago Trail ska hundar vara kopplade mars–september. I Nämdöskärgårdens nationalpark ska hunden alltid vara kopplad, och i naturreservaten på Grinda, Utö och Gällnö gäller koppel.' },
 ],
 content: `
<!-- KÄLLA (läst 2026-09-24 om inget annat anges). Bad: varmdo.se Trouville (se /blogg/sandhamn-guide-2026: vit sand, södra sidan, "ca 20 min" promenad från hamnen, toaletter sommartid); skargardsstiftelsen.se/omraden/uto ("Ålö Storsand, som nås med båt eller via vandringsled"); skargardsstiftelsen.se/omraden/gallno-karklo (Torsviken "sandstrand och tältplats"); skargardsstiftelsen.se/omraden/grinda (badplatsen Källviken). Vandring: stockholmarchipelagotrail.com/sv/section/ ("Visar 22 etapper"; "Etapp Sandhamn Lätt 8.1 km"; "Etapp Möja Lätt 13.8 km"); etappsidorna Utö, Ornö, Möja och Sandhamn: "Under sommaren (22 juni – 16 augusti 2026) kan du åka Nordsydlinjen som följer SAT." Kajak och sälsafari: visitmoja.se/aktiviteter-på-möja/ (Möja Outdoor "Hyr kajak, roddbåt och SUP" och sälsafari; se /blogg/dolda-parlor-moja); stockholmarchipelagotrail.com/sv/section/etapp-orno/ ("kan du hyra kajak vid Kajakomaten vid Kyrkviken"); gallno.se (cykel och kajak att hyra sommartid; se /blogg/cykling-moja-gallno). Bastu: lansstyrelsen.se/stockholm/besoksmal/nationalparker/namdoskargardens-nationalpark.html ("en varm raststuga och vedeldad bastu som är öppna året om"); sverigesnationalparker.se Nämdöskärgården (via island-data.ts, hämtad 2026-08-19): Bastun på Bullerö "öppen för alla och går inte att boka"; utogasthamn.se/gasthamnen/ ("dusch, bastu och toaletter"). Fyr: skargardsstiftelsen.se och lansstyrelsen.se Grönskär (se /blogg/sandhamn-guide-2026: naturreservat sedan 1965, fyren 26 m hög, byggd 1770 efter ritningar av Carl Fredrik Adelcrantz). Utö: lansstyrelsen.se Utö (väderkvarnen "som uppfördes 1791", trähusen längs Lurgatan); skargardsstiftelsen.se ("Sveriges äldsta bevarade väderkvarn"; "Utö är en riktig cykel-ö med möjlighet att hyra dagsvis"). Gästhamnar: grinda.se/hamn-mack/gasthamn ("gästhamn för 100 båtar", "28 st bokningsbara platser"; se /blogg/grinda-guide-2026); ksss.se/hamnar/sandhamn (ca 150 gästplatser; se /blogg/sandhamn-guide-2026). Dansbana: visitmoja.se ("Möjas dansbana är skärgårdens äldsta ännu i drift"). Cykel på båten: waxholmsbolaget.se/att-resa-med-oss/vad-du-far-ta-med ("Du får ta med en vanlig cykel ombord i mån av plats. Att ta med cykeln kostar inget extra"). Regler: lansstyrelsen.se Grinda ("Tältning är endast tillåten på tältplatsen nära norra bryggan"; förbud att "medföra okopplad hund"); lansstyrelsen.se Utö (tältning endast på anvisade platser, eldning endast på iordningställda platser, hundar kopplade med undantag för Persholmen utanför 1 mars–20 augusti); lansstyrelsen.se Gällnö (hund kopplad, tält högst två dygn på samma plats); lansstyrelsen.se Nämdöskärgårdens nationalpark ("Du får endast elda på anvisade platser eller i grill på ben."; "Din hund ska alltid vara kopplad."; "Du får tälta upp till två dygn på samma plats i nästan hela nationalparken. På Bullerö finns en tältplats där du får tälta upp till sju dygn."; "I nationalparken finns flera fågelskyddsområden ... I dessa råder tidsbegränsat tillträdesförbud."; "Under högsäsongen går turbåt till entrén på Bullerö från Stavsnäs vinterhamn"); stockholmarchipelagotrail.com etappsidorna ("Under mars – september skall hundar alltid vara kopplade."; "Respektera eldningsförbud och elda absolut inte på klippa."); fjaderholmarna (se /blogg/fjaderholmarna-dagstur): Libertas och Rövarns holme fågelskyddsområden med landstigningsförbud under häckningstid. Tidigare version (borttagen 2026-09-24) var en lista med tyckande utan källor: soluppgång "klockan 4:30" (märkt UPPSKATTNING), räkor "inköpta från en fiskebåt", nakenbad i naturhamn, kajak i gryningen som "skärgårdens bäst bevarade hemlighet", grilla på en skär utan eldregler, övernattning i naturhamn utan regler, "Waxholmsbolagets äldre båtar" som ångbåtstur, fyrarna Landsort, Söderarm och Svenska Björn som "möjliga att besöka och ha picknick vid", "ett ställe som inte finns på Google Maps" och stjärnskådning. Inget av det gick att belägga. -->
Tio saker du kan göra i Stockholms skärgård på sommaren, var och en med var det finns och vad som gäller. Sist står reglerna för tält, eld och hund.

## 1. Bada på en sandstrand
- [Trouville](/upptack/stora-trouvillestranden) på Sandhamn är en lång strand med vit sand, cirka 20 minuters promenad från hamnen.
- Ålö Storsand på grannön till Utö nås med båt eller via vandringsled.
- Torsviken på Gällnö har sandstrand och tältplats.
- Vid Källviken på Grinda finns en badplats.

Fler: [Badplatser i Stockholms skärgård](/blogg/basta-badplatserna).

## 2. Gå en etapp av Stockholm Archipelago Trail
Leden har 22 etapper genom skärgården. Sandhamn, 8,1 kilometer, och Möja, 13,8 kilometer, klassas som lätta. På sommaren går Nordsydlinjen längs leden. Mer: [Vandring i Stockholms skärgård](/blogg/vandring-skargard-guide).

## 3. Paddla kajak
Möja Outdoor hyr ut kajak, roddbåt och SUP. På Ornö hyrs kajak vid Kajakomaten i Kyrkviken, och på Gällnö går kajak att hyra på sommaren. Mer: [Kajak för nybörjare](/blogg/kajak-stockholms-skargard-nyborjare).

## 4. Åk på sälsafari
Möja Outdoor ordnar sälsafari. Mer om ön: [Möja](/blogg/dolda-parlor-moja).

## 5. Basta på Bullerö
På [Bullerö](/o/bullero) i Nämdöskärgårdens nationalpark finns en vedeldad bastu som är öppen året om och för alla, och den går inte att boka. Under högsäsong går turbåt från Stavsnäs vinterhamn. Kommer du med egen båt till Utö har [Utö gästhamn](/upptack/gruvbryggan) bastu.

## 6. Se Grönskärs fyr
Öster om Sandhamn ligger Grönskär, naturreservat sedan 1965. Fyren är 26 meter hög och byggdes 1770 efter ritningar av Carl Fredrik Adelcrantz. Mer: [Sandhamn guide](/blogg/sandhamn-guide-2026).

## 7. Cykla på Utö
Utö är en cykel-ö där cykel hyrs dagsvis, och i Gruvbyn står Sveriges äldsta bevarade väderkvarn från 1791. En vanlig cykel får följa med på Waxholmsbåten i mån av plats utan extra kostnad. Mer: [Utö guide](/blogg/uto-guide) och [Hyra cykel på Möja och Gällnö](/blogg/cykling-moja-gallno).

## 8. Dansa på Möja
Möja turistförening skriver att dansbanan på Möja är skärgårdens äldsta som fortfarande är i drift.

## 9. Tälta en natt
På Bullerö får du tälta upp till sju dygn på tältplatsen. På Grinda finns tältplatsen nära norra bryggan, och på Gällnö tältplatsen vid Torsviken. Se reglerna nedan.

## 10. Lägg till i en gästhamn
Med egen båt: [Grinda gästhamn](/upptack/grinda-gasthamn) har plats för 100 båtar, varav 28 går att boka, och [KSSS gästhamn](/upptack/ksss-gasthamn-sandhamn) på Sandhamn har cirka 150 gästplatser. Fler hamnar: [Gästhamnar i Stockholms skärgård](/blogg/gasthamnar-guide). Ny på sjön: [Börja segla](/blogg/segling-nyborjare-guide).

## Regler för tält, eld och hund
- **Tält:** på Grinda bara på tältplatsen nära norra bryggan, på Utö bara på anvisade platser. På Gällnö får tältet stå högst två dygn på samma plats. I Nämdöskärgårdens nationalpark gäller två dygn på samma plats, utom på Bullerös tältplats där gränsen är sju dygn.
- **Eld:** respektera eldningsförbud och elda aldrig på klippa. På Utö får du bara elda på iordningställda platser, och i nationalparken på anvisade platser eller i grill på ben.
- **Hund:** längs Stockholm Archipelago Trail ska hundar vara kopplade mars–september. I nationalparken alltid, och i naturreservaten på Grinda, Utö och Gällnö gäller koppel. Mer: [Skärgård med hund](/blogg/skargard-med-hund).
- **Fåglar:** i nationalparken finns fågelskyddsområden med tidsbegränsat tillträdesförbud. Vid Fjäderholmarna är Libertas och Rövarns holme fågelskyddsområden med landstigningsförbud under häckningstiden.
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
Fjäderholmarna är de skärgårdsöar som ligger närmast centrala Stockholm – cirka 30 minuter med båt från Strandvägen. På Stora Fjäderholmen finns rökeri, krog, bryggeri och hantverkare, och du badar från klipporna med Stockholms inlopp framför dig. Mer fakta och karta: [Fjäderholmarna på Svalla](/o/fjaderholmarna).

## Båten dit
Tre operatörer trafikerar öarna: Waxholmsbolaget, Strömma Kanalbolaget och Fjäderholmslinjen. Strömmas båt går från Strandvägen kajplats 13 och tar cirka 30 minuter, och vissa avgångar stannar vid Nacka Strand. Alla restider: [Båt till Fjäderholmarna](/o/fjaderholmarna/komma-dit).

Fjäderholmarna har säsongsöppet under sommarhalvåret – båtar, restauranger och butiker. Utanför säsong är det mesta stängt.

## Äta och dricka
- **Restaurang Rökeriet** röker på plats och säljer både i restaurangen och i delin, med skagenmackor, sallader, rökta räkor och chark.
- **Fjäderholmarnas Krog** vid gästhamnen har Krogen, Hamnbaren och Loftet. Bord bokas online.
- **Fjäderholmarnas Bryggeri** har en brewpub där ölen serveras direkt från tankarna, med pubmeny och ölprovningar.

## Vad du gör på ön
- **Hantverkare** inom trä, textil, keramik och glas har verkstad på ön.
- **Utställningen Allmogebåtar** visar traditionella skärgårdsbåtar.
- **Bad** från klipporna och vid några mindre sandstränder.
- **Fåglarna:** ögruppen består av Stora Fjäderholmen, Ängsholmen, Libertas och Rövarns holme. Libertas och Rövarns holme är fågelskyddsområden med landstigningsförbud under häckningstiden.

## Historia
Fjäderholmarna nämns i skrift redan 1381, och åtminstone sedan 1699 har det funnits krog på Stora Fjäderholmen. Marinen köpte öarna 1918, och 1940 utfärdades ett landstigningsförbud som i princip gällde tills Försvarsmakten lämnade öarna 1976. Sedan 1995 ingår Fjäderholmarna i Kungliga nationalstadsparken.

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
   { q: 'Vad händer i Vaxholm på vintern?', a: 'I december arrangeras Vaxholms julmarknad. Buss 670 och Waxholmsbolagets båtar går till Vaxholm även utanför sommaren.' },
 ],
 content: `
<!-- KÄLLA: alla uppgifter är hämtade från källorna i src/app/o/island-data.ts (vaxholm): vaxholmsfastning.se/historik/ (blockhus i början av 1500-talet av Svante Nilsson Sture; Gustav Vasa 1548; nuvarande Kastellet 1833–1863; angrepp 1612 och 1719), sfv.se Vaxholms kastell (på ön Vaxholmen; museet invigt 1964; restaurang och konsertlokaler), vaxholmsfastning.se (museet om "skärgårdsförsvarets 500-åriga historia"), Waxholmsbolagets tabell 11 (Strömkajen–Vaxholm ~55–70 min), SL linje 670 (Tekniska högskolan–Vaxholm), vaxholm.se historia (stadsprivilegier 1647; Pålsundsbron 1926), svenskakyrkan.se/vaxholm (kyrkan 1760–1803, klockstapel, dopfunt från slutet av 1300-talet), sfv.se Rindö redutt (1859–1864, "går att besöka på egen hand"), sfv.se Oscar Fredriksborg (1867–1877, "Området ... är öppet för besök"), lansstyrelsen.se Bogesundslandet (bildat 2015, 4 341 ha, leder, badplatser, koppel på hund), vaxholm.se (julmarknad). Hamnkrogen: "Söderhamnen 10", "kvarterskrog sedan 1950-talet", ostar från Ostmakeriet på Rindö (datafix). Rindö nås med "gratis bilfärja från Vaxön" (vaxholm.se badplatser, datafix 2026-09-22). Tidigare version (borttagen 2026-09-24) angav båtresa 1,5 timmar och bussresa 1 timme utan källa, vägbeskrivning via E18, museibiljett "ca 120 kr" och restaurangomdömen utan källa. -->
Vaxholm är en stad i Stockholms skärgård. Du tar dig dit med båt från Strömkajen på ungefär en timme, och i sundet ligger kastellet med museum. Mer fakta och karta: [Vaxholm på Svalla](/o/vaxholm).

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
Bogesundslandets naturreservat, 4 341 hektar varav 2 891 på land, har markerade vandringsleder, badplatser och rastplatser med vindskydd. Hunden ska vara kopplad. I Tenöreservatet på Bogesund ligger [Tenöbadet](/upptack/tenobadet), och på Vaxön ligger [Eriksöbadet](/upptack/eriksobadet) i Eriksö friluftsområde.

## Äta
- [Hamnkrogen](/upptack/hamnkrogen-vaxholm) på Söderhamnen 10 har varit kvarterskrog sedan 1950-talet och ser ut över gästhamnen.
- [Magasinet](/upptack/magasinet-gustavsberg) ligger vid vattnet på Fiskaregatan 1.
- Restaurangen i kastellet.

## Med egen båt
[Vaxholms gästhamn](/upptack/waxholms-gasthamn-och-rent-under-batbotten-tvatt) ligger mitt i staden. I Norrbergshamnen finns fem gästplatser, och kommunens tidsbestämda platser får användas i högst tre timmar utan avgift.
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
Året runt: pendeltåg till Västerhaninge, buss 846 till Årsta brygga och Waxholmsbåt till Gruvbryggan på Utö. Båt går också från Nynäshamn till grannön Ålö, som har broförbindelse till Utö. Alla avgångar: [Båt till Utö](/o/uto/komma-dit).

## Gruvorna och Gruvbyn
Järnmalm bröts på Utö till och från i omkring 700 år, med början redan på 1100-talet, och gruvdriften upphörde helt 1879. Sommaren 1719 förstörde den ryska flottan gruvorna. I Gruvbyn står trähusen längs Lurgatan och väderkvarnen från 1791 – Sveriges äldsta bevarade, och byggnadsminne sedan 2001 tillsammans med nio gruvarbetarbostäder. Utö kyrka byggdes 1848–1850 av sten från gruvorna, och orgeln från 1745 stod ursprungligen i Holländska reformerta kyrkan i Stockholm.

## Cykla
Skärgårdsstiftelsen beskriver Utö som en riktig cykel-ö med milslånga grusvägar, och cyklar hyrs dagsvis vid hamnen.

## Bada
- **Ålö Storsand** på grannön Ålö, som nås med båt eller via vandringsled.
- [Rävstavik](/upptack/ravstavik).
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
Segling lär du dig bäst på en kurs, och sjövägsreglerna och ansvaret för båten gäller från första dagen. Här är vägen från noll till att ta ut en segelbåt i Stockholms skärgård, med fakta från Transportstyrelsen och Svenska Seglarförbundet.

## 1. Gå en seglarskola
Svenska Seglarförbundets certifierade seglarskolor finns hos klubbar över hela landet och har kurser för barn, ungdomar och vuxna i jolle, kölbåt och vindsurfing. På nybörjarkursen lär du dig hur vindens riktning påverkar båten, vad båtens delar heter och gör, hur du justerar seglen och hur du lägger till. För ungdomar och vuxna leder kurserna till Seglarintyg 1 och 2, som ingår i kompetensintygen hos Nämnden för båtlivsutbildning (NFB). Seglarförbundet har en sökfunktion för att hitta en certifierad seglarskola nära dig.

## 2. Vilka krav gäller?
För en fritidsbåt som är kortare än 12 meter och smalare än 4 meter krävs inget körkort, enligt Transportstyrelsen. Den som framför ett fritidsskepp som är både längre än 12 meter och bredare än 4 meter ska ha skepparexamen, kustskepparexamen eller högre. Vattenskoter kräver alltid förarbevis.

Oavsett storlek är det du som befälhavare som ansvarar för att båten är sjövärdig – rätt utrustad, bemannad och provianterad. Transportstyrelsen rekommenderar att alla som är ute på sjön har grundkunskaper om säkerhet och sjövägsregler.

## 3. Lär dig väjningsreglerna
Sjövägsreglerna gäller alla båtar. Tre regler du behöver kunna från början:
- **Motorbåt och segelbåt:** ett maskindrivet fartyg på väg ska hålla undan för ett segelfartyg.
- **Två segelbåtar:** den som har vinden in från babord håller undan. Har båda vinden från samma sida håller den i lovart undan för den i lä.
- **Trång farled:** segelfartyg och båtar under 20 meter får inte hindra ett fartyg som bara kan framföras säkert i farleden – i skärgården till exempel färjor och större fartyg. Segelbåtens företräde gäller alltså inte där.

Segelbåten ska också hålla undan för fartyg som inte är manöverfärdiga, har begränsad manöverförmåga eller fiskar.

## 4. Hyr en segelbåt
När du har gått kurs kan du hyra båt. Kolla uthyrarens villkor för intyg och seglingsvana innan du bokar. Uthyrare och observerade priser i Stockholms skärgård finns på [Hyra båt i Stockholms skärgård](/hyra-bat/stockholms-skargard).

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
Stockholms skärgård har både sandstränder och klippbad, och enligt allemansrätten får du bada vid stränder som inte hör till någon tomt. Här är badplatser där kommunen, Havs- och vattenmyndigheten, Skärgårdsstiftelsen eller Visit Värmdö beskriver vad som finns på plats. Vi rangordnar dem inte – de är sorterade efter hur du tar dig dit. Varje bad har en egen sida på Svalla med karta.

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
 title: 'Vandring på Ornö och Utö – etapper, slingor och båt',
 excerpt: 'Vandra på Ornö och Utö: Stockholm Archipelago Trails etapper på 34,1 och 18,4 km, var de börjar, Sundbyslingan, leden vidare till Ålö, bussen på Ornö och båtarna från Dalarö och Årsta brygga.',
 category: 'Aktiviteter',
 date: '2026-02-28',
 updatedAt: '2026-09-24',
 readTime: '6 min',
 emoji: '',
 tags: ['Vandring', 'Ornö', 'Utö', 'Stockholm Archipelago Trail', 'Södra skärgården'],
 faqs: [
   // KÄLLA: stockholmarchipelagotrail.com/sv/section/etapp-orno/ och /etapp-uto/ (läst 2026-09-24), lansstyrelsen.se Sundby naturreservat, ornosjotrafik.se – se KÄLLA-kommentaren i content.
   { q: 'Hur lång är vandringsleden på Ornö?', a: 'Stockholm Archipelago Trails etapp på Ornö är 34,1 kilometer och den längsta på hela leden. Den är märkt som två dagsetapper. Vill du gå kortare finns en drygt sex kilometer lång rundslinga från Sundby gård.' },
   { q: 'Var börjar vandringsleden på Utö?', a: 'Vid Gruvbryggan, där det finns affärer och restauranger, eller vid Spränga brygga, där det inte finns någon service. Etappen är 18,4 kilometer och klassas som utmanande. Leden rekommenderar att du går den motsols.' },
   { q: 'Hur tar man sig till Ornö utan bil?', a: 'Med SL-buss till Dalarö och bilfärjan därifrån till Hässelmara, en överfart på cirka 30 minuter. På Ornö går en buss där SL-kortet gäller.' },
 ],
 content: `
<!-- KÄLLA (läst 2026-09-24 om inget annat anges): stockholmarchipelagotrail.com/sv/section/etapp-orno/: "Medel 34.1 km"; "Ornö är den längsta etappen på Stockholm Archipelago Trail."; "Etappen kan börja på fyra olika platser. Du kan vandra från Hässelmara där bilfärjan från Dalarö kommer in. Du kan börja din vandring från Ornöboda, den nordligaste punkten på etappen där Waxholmsbåten lägger till, mittemot Kymendö. Du kan börja din vandring från Lättinge brygga ... eller så kan du börja vid Ornö Kyrka, som vi egentligen rekommenderar att du avslutar vid."; "Etappen är markerad som två dagsetapper som båda startar vid Hässelmara och där båda slutar nere i hamnen vid Ornö Kyrka. En etapp går nurrut till Skinnardal och sedan vidare via Ornöboda och Söderviken till Ornö Kyrka. En etapp går söderut från Hässelmara via utkiksberget, Bodal och gula spåret mot Lättinge via Kråkmora där du antingen fortsätter norrut igen via Mörby Gård och Lervassa träsk till Ornö Kyrka, eller så avslutar du vid Lättinge."; "Om du skall ta dig ann de 34 kilometrarna i ett stycke rekommenderar vi att du gör det medsols."; "Mellan Lättinge, Hässelmara och Skinnardal går SL-bussen på asfaltsvägen."; "bor du antingen på Ornö Skärgårdshotell i Brunnsviken vid Lättinge eller så bor du på Sundby B&B"; "I Kyrkviken nedanför Ornö Kyrka finns restaurang, sommarbrödbod och sommarrestaurang"; "Vi rekommenderar sträckan från Hässelmara till Bodal" (barnvagn/rullstol); "Etapperna Ornö, Fjärdlång och Utö passar bra ihop."; "Du åker till Hässelmara på Ornö från Dalarö året om. Från fredag – söndagar under mellansäsong kan du åka till Ornöboda från Dalarö."; "Under sommaren (22 juni – 16 augusti 2026) kan du åka Nordsydlinjen som följer SAT till Ornö Kyrka."; "Längst in i Brunnsviken ... finns Ornö Båtvarv där det finns små campingstugor, gästhamn, en Microbutik och ett litet café. Dessutom finns bastu och cyklar att hyra."; "Där finns Ornö Krog och Gittans strandbar, Ornö brödbod & deli, Ornö Museum, Ornö Kyrka"; "kan du hyra kajak vid Kajakomaten vid Kyrkviken"; "Under mars – september skall hundar alltid vara kopplade." Samma källa via island-data.ts (orno): "Bussen på Ornö går mellan Lättinge, Sundby, Ornö Kyrka, Hässelmara och Skinnardal ... du kan använda ditt SL-kort eller lösa enkelbiljett." lansstyrelsen.se/stockholm/besoksmal/naturreservat/sundby.html (via island-data.ts): "Med start vid Sundby gård finns en drygt sex kilometer lång, lättvandrad rundslinga. På grusvägar och stigar går du igenom naturreservatets uråldriga odlingslandskap. Slingan är till stora delar tillgänglig för barnvagn eller rullstol, men tyvärr inte hela vägen runt. Här har marken brukats sedan 1400-talet."; "Stenhuset, ruinen efter Sundbys första säteri som brändes av ryssarna 1719"; "det gamla eklandskapet vid Mane äng"; "Med kollektivtrafik: SL-buss till Dalarö (Hotellbryggan). Vägfärja till Ornö, därefter buss 889 från färjeterminalen till Sundby"; förbud att "medföra hund eller katt som inte är kopplad". lansstyrelsen.se/stockholm/besoksmal/naturreservat/norra-skogen.html (via island-data.ts): reservatet nås "endast till fots, cirka 1,5–2 kilometer från parkering eller färjeläget"; skyddat 2024. ornosjotrafik.se (via island-data.ts): "Avgår från Hässelmara brygga på Ornö och Hotellbryggan på Dalarö"; "Överfarten tar ca 30 minuter"; fordon måste bokas; publicerad turlista gäller 27/4–13/9 2026. stockholmarchipelagotrail.com/sv/section/etapp-uto/: "Utmanande 18.4 km"; "Du går på allt från öppna grusvägar till vindlande skogsstigar till tekniska stigar i klippmiljö."; "Etappen börjar antingen vid Gruvbryggan där du finner affärer, Värdshuset och restauranger. Där finns all service på Utö. Eller så kliver du av vid Spränga Brygga, där finns ingen service"; "Vi rekommenderar varmt att man går etappen motsols"; "Från Gruvbryggan kan du ta dig norrut längs grusvägen. Antingen hela vägen till Kroka eller till Barnens bad. Där är det dessutom väldigt långgrunt. Du kan även ta dig rakt österut, förbi Värdshuset och gruvhålen till Rävstavik"; "Från Spränga kan du följa leden söderut till våtmarken"; "Etapperna Utö, Ålö, Rånö och Nåttarö hör väldigt bra ihop."; "Du åker till Utö från Årsta Brygga året om." stockholmarchipelagotrail.com/sv/section/: "Utö – Ålö Connector Lätt 4.6 km", "Etapp Ålö Utmanande 13.2 km". lansstyrelsen.se/stockholm/besoksmal/naturreservat/uto.html (via island-data.ts och /blogg/uto-guide): "Reservatet utgör norra delen av Utö"; skjutfält i södra delen; hundar kopplade med undantag för Persholmen utanför 1 mars–20 augusti; tältning endast på anvisade platser; eldning endast på iordningställda platser; "Pendeltåg till Västerhaninge. Buss till Årsta brygga. Waxholmsbåt året om till Gruvbryggan". SL linje 846 (kund.printhuset-sthlm.se/sl/v846.pdf, giltig 17 augusti–12 december 2026): Västerhaninge station 06.02 → Årsta brygga 06.18, 05.32 → 05.46, 14.32 → 14.49; "Tidtabellen är anpassad till pendeltåg från Stockholm vid Västerhaninge station." Waxholmsbolaget tabell 21 (kund.printhuset-sthlm.se/wa/h21.pdf, "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026"): Årsta brygga 20.35 → Gruvbryggan 21.10, 08.25 → 09.40; "b Beställ resan i SL-appen, på Waxholmsbolagets webb eller via kundtjänst 08-600 10 00 minst 1 timme innan avgång från aktuell brygga, dock senast kl. 17.00." utovardshus.se/kontakt/hitta-hit/ (via island-data.ts): "Båt utgår även från Nynäshamn till grannön Ålö som har broförbindelse till Utö". Tidigare version (borttagen 2026-09-24) angav "Ornöleden ca 20 km", "Norra leden ca 7 km" från "Ornö brygga", "Södra leden ca 10 km" med "gamla fiskarstugorna", "Gruvstigen 3 km" upp på "Gruvbergets topp (53 m)", "Kustslingan 12 km" och "Kortslingan 5 km" på Utö – inga av dessa leder eller siffror finns hos Länsstyrelsen, Haninge kommun eller Stockholm Archipelago Trail. Borttaget även: "bästa tid september och oktober", att det saknas vattenkällor längs lederna, att båda öarna har bryggor "på båda sidor" för genomvandring, och värdeord. -->
Ornö och Utö i Stockholms södra skärgård har var sin etapp av Stockholm Archipelago Trail, den märkta vandringsleden genom skärgården. På Ornö finns också en kortare slinga i Sundby naturreservat, och från Utö fortsätter leden till Ålö. Här är var etapperna börjar, hur långa de är och hur du tar dig dit.

## Ornö

### Etappen – 34,1 km, medel
Ornö är den längsta etappen på Stockholm Archipelago Trail. Den är märkt som två dagsetapper som båda börjar vid Hässelmara, där bilfärjan från Dalarö lägger till, och slutar i hamnen vid Ornö kyrka:
- **Norra delen:** från Hässelmara norrut till Skinnardal och vidare via Ornöboda och Söderviken till Ornö kyrka.
- **Södra delen:** från Hässelmara söderut via utkiksberget, Bodal och gula spåret mot Lättinge via Kråkmora. Därifrån fortsätter du norrut via Mörby gård och Lervassa träsk till Ornö kyrka, eller avslutar vid Lättinge.

Du kan också börja vid Ornöboda, där Waxholmsbåten lägger till mitt emot Kymmendö, vid Lättinge brygga eller vid Ornö kyrka. Går du alla 34 kilometer i ett sträck rekommenderar leden medsols. Med barnvagn eller rullstol rekommenderar leden sträckan Hässelmara–Bodal.

### Sundby – drygt 6 km
Från Sundby gård i Sundby naturreservat på södra Ornö går en drygt sex kilometer lång, lättvandrad rundslinga på grusvägar och stigar genom ett odlingslandskap som brukats sedan 1400-talet. Den är till stora delar framkomlig med barnvagn eller rullstol, men inte hela vägen runt. Längs slingan ligger Stenhuset, ruinen efter Sundbys första säteri som brändes av ryssarna 1719, och eklandskapet vid Mane äng.

Naturreservatet Norra skogen på norra Ornö skyddades 2024 och nås bara till fots, cirka 1,5–2 kilometer från parkering eller färjeläget.

### Bo, äta och hyra
- **Boende:** delar du etappen på två dagar pekar leden på Ornö Skärgårdshotell i Brunnsviken vid Lättinge eller Sundby B&B. Ornö Båtvarv längst in i Brunnsviken har små campingstugor, café, bastu och cyklar att hyra.
- **Kyrkviken:** Ornö Krog, Gittans strandbar, Ornö brödbod & deli och Ornö museum. Kajak hyrs vid Kajakomaten.

### Ta dig till Ornö
- **Bilfärja:** Ornö Sjötrafik kör mellan Hotellbryggan på Dalarö och Hässelmara, en överfart på cirka 30 minuter. Fordon ska bokas. Stockholm Archipelago Trail anger att färjan går året om, medan Ornö Sjötrafiks publicerade turlista gällde 27 april–13 september 2026, så kontrollera turlistan.
- **Utan bil:** SL-buss till Dalarö och färjan över. På Ornö går en buss mellan Lättinge, Sundby, Ornö kyrka, Hässelmara och Skinnardal, och SL-kortet gäller.
- **Waxholmsbåt:** fredag till söndag under mellansäsongen går båt från Dalarö till Ornöboda. På sommaren går Nordsydlinjen till Ornö kyrka.

Alla alternativ: [Båt till Ornö](/o/orno/komma-dit).

## Utö

### Etappen – 18,4 km, utmanande
Leden beskriver underlaget på Utö som allt från grusvägar till skogsstigar och tekniska stigar i klippmiljö. Etappen börjar vid Gruvbryggan, där det finns affärer, värdshus och restauranger, eller vid Spränga brygga, där det inte finns någon service. Går du hela etappen rekommenderar leden motsols.

Kortare turer som går med barnvagn eller rullstol:
- Grusvägen norrut från Gruvbryggan till Kroka eller Barnens bad, där det är långgrunt.
- Österut förbi värdshuset och gruvhålen till Rävstavik.
- Från Spränga söderut längs leden till våtmarken.

### Vidare till Ålö
En förbindelseled på 4,6 kilometer, klassad som lätt, går från Utö till Ålö. Etappen på Ålö är 13,2 kilometer och klassas som utmanande.

### Regler på Utö
Norra delen av Utö är naturreservat, södra delen skjutfält. I reservatet ska hunden vara kopplad (undantag på Persholmen utanför perioden 1 mars–20 augusti), tält får bara stå på anvisade platser och eld bara göras upp på iordningställda platser. Mer om ön: [Utö guide](/blogg/uto-guide).

### Ta dig till Utö
Pendeltåg till Västerhaninge och buss 846 till Årsta brygga, 14–17 minuter. Bussen är anpassad till pendeltågen. Därifrån tar Waxholmsbåten 35–75 minuter till Gruvbryggan enligt höst- och vårtidtabellen. På flera turer ska resan beställas i SL-appen, på Waxholmsbolagets webb eller via kundtjänst minst en timme före avgång. Från Nynäshamn går båt till grannön Ålö, som har broförbindelse till Utö. Alla avgångar: [Båt till Utö](/o/uto/komma-dit).

## Kombinera öarna
Enligt Stockholm Archipelago Trail passar etapperna Ornö, Fjärdlång och Utö ihop, liksom Utö, Ålö, Rånö och Nåttarö. Under mars–september ska hundar vara kopplade längs leden. Fler leder: [Vandring i Stockholms skärgård](/blogg/vandring-skargard-guide).
 `,
 },

 'cykling-moja-gallno': {
 title: 'Hyra cykel på Möja och Gällnö – cykla i skärgården',
 excerpt: 'Var du hyr cykel på Möja och Gällnö, hur lång Möja är, var du badar och äter längs vägen och hur du tar dig dit med båt från Stockholm.',
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
På Möja och Gällnö i Stockholms mellersta skärgård går det att hyra cykel. Här är vad som finns, enligt öarnas egna turistsidor. Mer om öarna: [Möja](/o/moja) och [Gällnö](/o/gallno).

## Cykla på Möja

### Hyra cykel
Hamncafét på Möja, som också säljer glass och bullar, har cykeluthyrning. Vill du hellre åka än trampa kör PerMobilen daglig transport på landsvägen mellan norra och södra Möja sommartid, som hop on hop off.

### Vägen över ön
Möja är cirka 6,5 kilometer från norr till söder. Landsvägen binder ihop byarna, och Stockholm Archipelago Trail följer den från Långvik till Hamn – en lätt etapp som enligt turistföreningen fungerar även med barnvagn eller rullstol. Den uppmärkta naturstigen mellan Hamn och Ramsmora, 12 kilometer genom Björndalens naturreservat, är en vandringsled.

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
- **Kolla säsongen:** Gällnös uthyrning och krog och Möja bageri har sommaröppet. Möja turistförening har en öppettidskalender på visitmoja.se.
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
<!-- KÄLLA: Länsstyrelsen Stockholm, "Stockholms läns Fiskeguide 2023" (lansstyrelsen.se/download/18.1b1d393819324610c374853c/1732515630171/Fiskeguide Stockholms län.pdf, läst 2026-09-24): abborre "Bra fiske hela året med undantag av maj månad då abborren leker", "Bästa fisket är i innerskärgården", "djup mellan 1 och 10 meter", tips "söder om Horsfjärden, Västerfjärden utanför Spillersboda och vid Stora Värtan", "numera har skarv en stor inverkan på bestånden"; gädda "Hela året, bäst vår och höst", "Hela skärgården utom de yttersta delarna", tips "Väddö, Furusund, Ljusterö, Jolpan, Vaxholm, Järnafjärden, Stora Värtan och Västra Muskö"; gös "Bäst fiske på sommaren", "grunda inner fjärdar/vikar", tips "Bergshamraviken till Spillersboda, vattnet runt Vaxholm, Gålö, vattnen runt Mörkö samt Hallsfjärden och Järnafjärden"; havsöring "Från september till maj", "uddar, grynnor och strömsatta sund", "Ofta hugger havsöringen på grunt vatten nära land", utsättningar "Stockholms ström, Kappelskär, Möja, Gålö och Nynäshamn", andra ställen "Singö-Väddökusten, Ljusterö, Kanholmsfjärden, Baggensfjärden, Ingarö, Ornö, Utö och Torö", "Utplanterad öring är fettfeneklippt"; sik "November till maj, bäst i april", "Grunda vikar, sund och flader på 1 till 4 meters djup", "Bottenmete med sk Pater-Noster-tackel", tips "Väddö, Kappelskär, Baggensfjärden, Erstaviken, Kymmendö, Gålö, Fjärdlång, Häringe och Hammersta"; regler "Ryckfiskeförbud gäller i Mälaren, Strömmen och i skärgården", "Ålfiskeförbud gäller för allt fiske i hav och i alla vattendrag", "Trolling, dragrodd och angel får endast bedrivas med fiskerättsägarens tillstånd (exv TDA-kortet) eller på allmänt vatten", "max 3 gäddor eller gös ... per dag. Gäddor <40 cm och >75 cm är fredade". lansstyrelsen.se/stockholm/djur/fiske.html: "I havet längs kusten och i de fem stora sjöarna får du fiska fritt med handredskap utan fiskekort" (läst 2026-09-24). havochvatten.se gädda i Östersjön: minimimått 40 cm, maximimått 75 cm, "fångstbegränsning för gös och gädda till sammantaget tre fiskar". havochvatten.se öring: "50 centimeter som minimimått i Östersjöns samtliga delområden", "1 icke fenklippt öring per dygn" (läst 2026-09-24). Tidigare version (borttagen 2026-09-24) angav minimimått 45 cm för gädda (fel: 40–75 cm), en säsongstabell och platser utan källa. -->
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
Omkring 150 gästplatser vid tre pontonbryggor framför Seglarhotellet. Förtöjning med mooringlina, ankring förbjuden, och hamnvakter hjälper till. Passbåt går till [Lökholmen](/upptack/ksss-gasthamn-lokholmen-trollsundet) med plats för cirka 200 båtar, dusch och bastu. Under högsommaren är platserna i Trollsundet, den första delen av Lökholmens gästhamn, i första hand för KSSS medlemmar. Mat på ön: [Restauranger på Sandhamn](/blogg/basta-restaurangerna-sandhamn).

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
Kyrkviken har 35 platser med ankarförtöjning på 4 meters djup vid ångbåtsbryggan, med diesel, bensin och el, och toalett och dusch inom 30 meter. Ornö Båtvarvs gästhamn i Brunnsviken har cirka 20 platser vid boj eller långsides, café och microlivs.

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
 title: 'Skärgården på vintern – båtar, is och vad som är öppet',
 excerpt: 'Vinter i Stockholms skärgård: Waxholmsbåtar året runt till Sandhamn, Möja och Utö, boenden och butiker med vinteröppet, och vad SMHI och Sjöräddningssällskapet säger om isen.',
 category: 'Inspiration',
 date: '2025-12-15',
 updatedAt: '2026-09-24',
 readTime: '6 min',
 emoji: '❄️',
 tags: ['Skärgården på vintern', 'Vinter', 'Issäkerhet', 'Waxholmsbolaget', 'Året runt'],
 faqs: [
   { q: 'Går Waxholmsbåtarna på vintern?', a: 'Ja. Waxholmsbolaget trafikerar Stockholms skärgård varje dag året runt. Till Sandhamn går båtar året runt från Stavsnäs, till Möja från Boda brygga och till Utö från Årsta brygga. Vissa linjer, som Strömkajen–Sandhamn, går bara sommartid.' },
   // KÄLLA: svenskalivraddningssallskapet.se Isvett (PDF juni 2026): "Kärnis ska vara minst 10 cm tjock."; sjoraddning.se/sjosakerhet/issakerhet: "En 20 cm tjock is kan vara mindre hållbar än en is på 5 cm."; smhi.se/vader/vader-till-havs/is-till-havs: "havsis, som innehåller salt, har en annan karaktär och bärighet jämfört med is på sjöar"
   { q: 'Hur tjock ska isen vara för att gå på?', a: 'Svenska Livräddningssällskapet anger att kärnisen ska vara minst 10 centimeter. Sjöräddningssällskapet påpekar att en 20 centimeter tjock is kan hålla sämre än en is på 5 centimeter, beroende på kvalitet och struktur, och SMHI att havsis har en annan bärighet än is på sjöar.' },
   { q: 'Vad har öppet i skärgården på vintern?', a: 'Enligt verksamheterna själva har bland annat STF Svartsö Skärgårdshotell & Vandrarhem öppet året runt, liksom puben på Sandhamns Värdshus, Coop i Berg på Möja och Arholma Handel. Sandhamn Seglarhotell tar emot gäster året runt.' },
 ],
 content: `
<!-- KÄLLA (lästa 2026-09-24 om inget annat anges): waxholmsbolaget.se/om-oss ("Waxholmsbolaget, Waxholms Ångfartygs AB, grundades 1869. Allt sedan dess har vi trafikerat Stockholms skärgård varenda dag året runt."). waxholmsbolaget.se/reseplanering/resmal/sandhamn ("Ut till Sandhamn går det turer året runt."; "Du kan åka till Sandhamn med båt från Stavsnäs och då tar resan drygt en timme. Under sommaren så kan du också åka till Sandhamn från Strömkajen."; "tabell 15 (endast sommartid)"). waxholmsbolaget.se/reseplanering/resmal/moja ("Båtar går året runt från Boda brygga på Värmdö till flera bryggor på Möja."). lansstyrelsen.se Utö ("Waxholmsbåt året om till Gruvbryggan", island-data uto). lansstyrelsen.se Grinda ("Norra och södra bryggan trafikeras året om av Waxholmsbolaget och Cinderella."). skargardsstiftelsen.se/omraden/namdo/ ("Reguljär båttrafik går året runt från Stavsnäs med Waxholmsbolaget."; island-data namdo). vaxholmsfastning.se/besoksinfo/ ("med Waxholmsbolaget når du Kastellet året runt"; datafix 2026-09-23-texter-utan-kalla.sql). osteraker.se öar i Österåkers skärgård ("En bilfärja går från Östanå färjeläge året runt."). arholma.nu/resa-hit ("Härifrån går passbåten Monsun till Arholma året runt. Resan tar cirka 15 minuter."). svenskaturistforeningen.se STF Svartsö ("Välkommen ut till lugnet – öppet året runt!"), STF Möja Vandrarhem ("Öppet April - December"). sandhamn.com ("vila, fira, mötas och njuta av skärgården – året runt"; paketet "VINTER I SKÄRGÅRDEN"; "vedeldade bastuflottar vid vattnet"). sandhamns-vardshus.se (Puben "Öppet året runt."; restaurangen "Annan tid på året är restaurangen främst öppen helger."; datafix 2026-09-23-sandhamn-platser.sql). konsummoja.se (Coop i Berg "öppet året runt"; läst 2026-09-14, se cykling-moja-gallno). arholmahandel.se ("åretruntöppen butik"; island-data arholma). tjocko.se ("Sommarrestaurangen har även öppet för pubkvällar under vår, vinter och höst."; datafix 2026-09-23-vardeord-omgang2.sql). caravanclub.se/camping/bjorko-orn/ ("Allmän Camping – Året runt"; restaurang "som har öppet året om men endast på helger under vintersäsongen"; läst 2026-09-21, island-data graddo). lansstyrelsen.se Nämdöskärgårdens nationalpark (Bullerö: "en varm raststuga och vedeldad bastu som är öppna året om"; läst 2026-09-19, island-data bullero). skargardsstiftelsen.se/boka-boende/ (Hammersta, stugan Gröndal "öppet under perioden 22 januari-2 november"). skargardsstiftelsen.se/omraden/ (Björnö "ett uppskattat utflyktsmål året om"; Gålö "kombinera bad, vandring och naturupplevelser året runt"). nacka.se Saltsjöbadens friluftsbad ("separata badhus för herr- och dambad, bastu och vinterbad"; "Saltsjöbanan till station Saltsjöbaden. Därefter promenad ca 500 meter."; datafix 2026-09-22-strander-beskrivningar.sql). vaxholm.se (julmarknad i december; se vaxholm-guide). fjaderholmarna.se (Rökeriet julbord i november–december; "säsongsöppet"; island-data fjaderholmarna). smhi.se/vader/vader-till-havs/is-till-havs ("Kartan är en generell analys och isen kan se helt annorlunda ut lokalt. Gör alltid en egen bedömning av isen där du befinner dig."; "I Sveriges kustvatten och stora insjöar pågår sjöfart året runt. Fartygsrännor kan brytas upp i stort sett överallt. Information om dessa saknas i iskartan."; "havsis, som innehåller salt, har en annan karaktär och bärighet jämfört med is på sjöar"). sjoraddning.se/sjosakerhet/issakerhet ("En 20 cm tjock is kan vara mindre hållbar än en is på 5 cm. Allt beror på vilken kvalité och struktur isen har."). sjoraddning.se/artiklar/ratt-utrustning-pa-isen ("Att använda en skidstav i stället för en ispik är inte att rekommendera"; "Om piken går igenom isen och en svag ström av vatten kommer upp genom hålet, är det ett tecken på att isen är för tunn"; "Isdubbar ska sitta högt upp och utanför kragen på jackan"; "På isdubbarna ska det finnas en visselpipa av plast. Det är viktigt att det inte är en visselpipa med en kula som kan frysa fast."; "I CE-märkta räddningslinor måste linan vara minst 24 meter."; "Lägg telefonen i ett vattentätt mobilfodral"). sjoraddning.se/artiklar/sa-gor-du-om-isen-brister ("Vänd dig åt hållet du kom ifrån"; "Vid behov, ring 112."; "Åla dig istället bort från det svaga området."; "Åla dig istället bort från det svaga området."; "det är viktigt att du inte reser dig upp direkt"; "Grundregeln är att närma dig vaken från samma håll som den nödställde"; "Ta med dig något långt"; "Sträck inte fram handen"). svenskalivraddningssallskapet.se Isvett (PDF juni 2026: "Tala om vart du ska och när du tror du är tillbaka.", "Kärnis ska vara minst 10 cm tjock.", "Känn till isens svaga punkter." – Vindbrunn, Råk, Ränna, Avlopp, Bro, Grund, Utlopp, Vass, Brygga, Udde, Sund, Inlopp; "Ta med dig räddningsutrustning på isen.", "Gå aldrig ut på is om du inte är säker på att den håller.", "Ha alltid sällskap på och vid isen.", "Lägg dig på mage om du kommer ut på svag is.", "vänd dig om och ta dig upp med hjälp av isdubbarna samma väg som du kom"). Tidigare version (borttagen 2026-09-24) påstod att Vaxholms Hotell håller öppet vintertid, att Fjäderholmarna "öppnar för vinter-evenemang och julmarknader" (Fjäderholmarna har säsongsöppet; bara Rökeriet har julbord), att Utö Värdshus har vinterpaket, att isfiske är en levande skärgårdstradition och att iskartan är Länsstyrelsens (den är SMHI:s) – utan källa. Värdeord och tyckande om ljus och tystnad är borttagna. -->
Waxholmsbåtarna går i skärgården hela vintern, och några boenden, krogar och butiker har öppet året runt. Mycket annat har bara sommaröppet. Här är vad som går att belägga – och vad SMHI, Sjöräddningssällskapet och Svenska Livräddningssällskapet säger om isen.

## Båtarna går året runt
Enligt Waxholmsbolaget har bolaget trafikerat Stockholms skärgård varenda dag året runt sedan det grundades 1869. Exempel på resor som går även på vintern:
- [Sandhamn](/o/sandhamn): turer året runt från Stavsnäs, 40–60 minuter med linje 16. Båten från Strömkajen går bara på sommaren.
- [Möja](/o/moja): båtar året runt från Boda brygga på Värmdö. Alla vägar dit: [Båt till Möja](/o/moja/komma-dit).
- [Utö](/o/uto): Waxholmsbåt året om från Årsta brygga till Gruvbryggan.
- [Grinda](/o/grinda): norra och södra bryggan trafikeras året om.
- [Nämdö](/o/namdo): reguljär båttrafik året runt från Stavsnäs.
- [Vaxholm](/o/vaxholm): med Waxholmsbolaget når du Vaxholms kastell året runt.
- [Ljusterö](/o/ljustero): bilfärjan från Östanå går året runt.
- [Arholma](/o/arholma): passbåten Monsun går från Simpnäs året runt, cirka 15 minuter.

Tidtabellerna skiljer sig mellan sommar och vinter. Sök resan i SL-appen eller på Waxholmsbolagets webb.

## Öppet på vintern
Enligt verksamheternas egna sidor:
- **Sandhamn:** [Sandhamn Seglarhotell](/upptack/seglarhotellet-sandhamn) tar emot gäster året runt och har vinterpaket och vedeldade bastuflottar. Puben på [Sandhamns Värdshus](/upptack/sandhamn-sandhamns-vardshus) har öppet året runt. Restaurangen har främst öppet helger utanför sommaren.
- [Svartsö](/o/svartso): STF Svartsö Skärgårdshotell & Vandrarhem har öppet året runt.
- **Möja:** Coop i Berg har öppet året runt. STF Möja Vandrarhem har öppet april–december.
- **Arholma:** Arholma Handel är en åretruntöppen butik.
- **Tjockö:** [Ökrogen](/upptack/okrogen-tjocko) har pubkvällar under vår, vinter och höst.
- [Gräddö](/o/graddo): Björkö-Örns camping har öppet året runt, och restaurangen där har öppet helger under vintersäsongen.
- **Hammersta:** Skärgårdsstiftelsens stuga Gröndal går att hyra även på vintern.
- [Bullerö](/o/bullero) i Nämdöskärgårdens nationalpark: raststugan och den vedeldade bastun är öppna året om.
- **Björnö och Gålö:** Skärgårdsstiftelsen beskriver båda som utflyktsmål året om.

Jul i skärgården: i december hålls Vaxholms julmarknad, och Rökeriet på Fjäderholmarna har julbord i november–december. I övrigt har Fjäderholmarna säsongsöppet på sommaren.

## Vinterbad
[Saltsjöbadens friluftsbad](/upptack/saltsjobadens-friluftsbad) har separata badhus för dam och herr med bastu och vinterbad, cirka 500 meter från Saltsjöbanans station.

## Is till havs
SMHI:s iskarta visar isen på havet, men är en generell analys – isen kan se helt annorlunda ut lokalt, och du ska alltid göra en egen bedömning där du är. I kustvattnen pågår sjöfart året runt, och fartygsrännor kan brytas upp i stort sett överallt utan att synas på iskartan. Havsis innehåller salt och har en annan bärighet än is på sjöar.

### Tjocklek och svaga punkter
- **Kärnis minst 10 centimeter,** enligt Svenska Livräddningssällskapet.
- **Tjock är inte samma sak som stark:** en 20 centimeter tjock is kan enligt Sjöräddningssällskapet hålla sämre än en is på 5 centimeter – det beror på isens kvalitet och struktur.
- **Svaga punkter:** vid bryggor, broar, uddar, sund, grund, inlopp och utlopp, i vass och vid råkar och rännor.

### Utrustning
Sjöräddningssällskapets råd:
- **Ispik** – inte skidstav. Går piken igenom och vatten kommer upp är isen för tunn.
- **Isdubbar** högt upp utanför jackans krage, med en visselpipa av plast utan kula som kan frysa fast.
- **Räddningslina** som flyter. En CE-märkt räddningslina är minst 24 meter.
- **Mobil** i vattentätt fodral, och flytväst eller torrdräkt.

### På isen
Svenska Livräddningssällskapets isvett:
- Tala om vart du ska och när du räknar med att vara tillbaka.
- Ha alltid sällskap på och vid isen.
- Gå aldrig ut om du inte är säker på att isen håller.
- Lägg dig på mage om du kommer ut på svag is.

### Om isen brister
Enligt Sjöräddningssällskapet: vänd dig åt hållet du kom ifrån, där isen höll. Påkalla hjälp – ring 112 vid behov. Ta dig upp med isdubbarna, åla dig bort från det svaga området och res dig inte direkt. Om någon annan går igenom: ring 112, närma dig från samma håll och räck fram något långt, inte handen.

## Läs vidare
- [Hösten i skärgården](/blogg/host-i-skargarden-2026) och [skärgården i oktober](/blogg/eftersasong-skargard-oktober)
- [Boende i skärgården](/blogg/boende-skargard-2026)
 `,
 },

 'barnfamilj-skargard': {
 title: 'Skärgård med barn – flytväst, säkerhet och båtvett',
 excerpt: 'Barn i båten och vid vattnet i skärgården: vilken flytväst barn ska ha enligt Transportstyrelsen och Sjöräddningssällskapet, råd för små barn ombord, badvett, båtvett och 112.',
 category: 'Familj',
 date: '2026-01-15',
 updatedAt: '2026-09-24',
 readTime: '5 min',
 emoji: '👨‍👩‍👧‍👦',
 tags: ['Skärgård med barn', 'Flytväst barn', 'Sjösäkerhet', 'Badvett', 'Barnfamilj'],
 faqs: [
   // KÄLLA: sjoraddning.se/artiklar/tank-pa-det-har-nar-du-valjer-flytvast ("Barn ska alltid använda en räddningsväst", "En räddningsväst har alltid minst 100 N i flytkraft, oavsett om den är avsedd för barn eller vuxna", "flytkraften placerad på magen, inte på ryggen"); transportstyrelsen.se Använd flytväst ("Barn och vuxna som inte kan simma ska använda räddningsväst"); svenskalivraddningssallskapet.se/flytvastar/ ("Barn ska alltid använda grenband")
   { q: 'Vilken flytväst ska barn ha?', a: 'En räddningsväst. Enligt Transportstyrelsen ska barn och vuxna som inte kan simma använda räddningsväst, och en räddningsväst har alltid minst 100 N flytkraft. Sjöräddningssällskapet råder att flytkraften sitter på magen, och Svenska Livräddningssällskapet att barn alltid använder grenband.' },
   // KÄLLA: svenskalivraddningssallskapet.se/flytvastar/ ("Uppblåsbara västar är tekniskt mer avancerade och rekommenderas inte till barn under 40 kilo eller vuxna som inte kan simma"); transportstyrelsen.se Använd flytväst ("Uppblåsbara flytvästar ska bara användas av simkunniga personer")
   { q: 'Kan barn ha uppblåsbar flytväst?', a: 'Svenska Livräddningssällskapet rekommenderar inte uppblåsbara västar till barn under 40 kilo, och enligt Transportstyrelsen ska uppblåsbara flytvästar bara användas av simkunniga.' },
   // KÄLLA: svenskalivraddningssallskapet.se Båtvett (juni 2026): "Om du ramlar i vattnet - stanna vid båten", "Om du behöver hjälp - vifta långsamt med båda armarna över huvudet och åt sidorna"; sjoraddning.se/artiklar/lat-barnen-ta-ansvar-ombord ("112 är det absolut viktigaste numret att lära ut")
   { q: 'Vad ska barnen lära sig om de hamnar i vattnet?', a: 'Enligt Svenska Livräddningssällskapets båtvett ska den som ramlar i vattnet stanna vid båten, och den som behöver hjälp vifta långsamt med båda armarna över huvudet. Sjöräddningssällskapet råder att lära barnen ringa 112 så snart de kan hantera en telefon.' },
 ],
 content: `
<!-- KÄLLA (lästa 2026-09-24): transportstyrelsen.se/sv/sjofart/fritidsbatar/sjosakerhet/pa-sjon/anvand-flytvast/ ("Samtliga ombord ska ha en flytväst i rätt storlek. Var noga med att flytvästen du använder är CE-märkt."; "Barn och vuxna som inte kan simma ska använda räddningsväst."; "Uppblåsbara flytvästar ska bara användas av simkunniga personer."). transportstyrelsen.se/sv/sjofart/fritidsbatar/sjosakerhet/infor-batturen/forbered-dig-infor-din-battur/ ("Ta gärna på dig flytvästen innan du går ut på bryggan och se till att alla på båten har flytväst på sig innan ni ger er av"; "fulladdade mobiltelefon lättåtkomlig i ett vattentätt fodral runt halsen"; "titta på väderleksrapporter både innan och under resan"; "Packa klädombyte och något att äta och dricka i en vattentät väska"; "Meddela någon vart du ska och när du planerar att vara framme"). sjoraddning.se/artiklar/tank-pa-det-har-nar-du-valjer-flytvast ("Barn ska alltid använda en räddningsväst"; "En bra räddningsväst för barn har flytkraften placerad på magen, inte på ryggen"; "En räddningsväst har alltid minst 100 N i flytkraft, oavsett om den är avsedd för barn eller vuxna"; "det viktigare att västen sitter ordentligt och bekvämt på barnet än att enbart gå efter kiloangivelser"; "Så fort västen inte längre passar ordentligt på barnet eller känns för trång är det dags att byta ut den"; "Alla flytvästar har enligt branschstandard en livslängd på tio år"). sjoraddning.se/artiklar/lat-barnen-ta-ansvar-ombord ("Många använder sig av en bilbarnstol eller en vanlig cykelstol. Dessa kan fästas i till exempel båtens pulpit"; "Man ska dock inte ersätta flytvästen med en bärsele"; "ett finmaskigt nät utmed mantågen"; "Spisen är en vanlig orsak till olyckor"; "Med barn ombord blir avvägningarna ännu viktigare. Tuff sjö kan både skrämma och göra färden mer riskfylld. Dessutom blir risken för sjösjuka större."; "Välj hellre kortare rutter och låt barnen leka av sig på stranden"; "112 är det absolut viktigaste numret att lära ut"; "112, lätt att slå"; "Om klipporna är branta är det dessutom svårt att gå i land"; "Innan du monterar på en motor måste barnen lära sig grunderna. Ett bra tips är att börja med åror"; "Låt barnen från tidig ålder få arbetsuppgifter"). svenskalivraddningssallskapet.se/flytvastar/ ("Räddningsvästar är bäst för barn och icke-simkunniga"; "För små barn som leker i eller nära vatten är en räddningsväst ett bra komplement till ständig uppsikt"; "Barn ska alltid använda grenband"; "För barn till sjöss finns modeller med inbyggd livsele"; "rekommenderas inte till barn under 40 kilo"; "låna eller hyra en flytväst billigt i våra depåer"; "Olyckor sker oftast nära land och när vädret är lugnt."; "Bara en av tio som drunknar bär flytväst eller flytplagg."). svenskalivraddningssallskapet.se Badvett och Båtvett (PDF juni 2026): "Ha alltid sällskap med dig när du badar", "Ha hela tiden uppsikt över varandra", "Gå försiktigt på brygga, klippa eller bassängkant", "Hoppa och dyka bara om det är tillräckligt djupt", "Simma längs med strand eller brygga", "Undvik att simma under brygga eller hopptorn"; "Använd alltid flytväst", "Sitt ner i mindre båtar och byt bara plats om du måste", "Om du ramlar i vattnet - stanna vid båten", "vifta långsamt med båda armarna över huvudet och åt sidorna". Tidigare version (borttagen 2026-09-24) påstod att "barn under 12 år bär flytväst när de är på däck" (ingen sådan regel – Transportstyrelsen säger att alla ombord ska ha flytväst), att Fjäderholmarna har akvarium, att Stora Sand på Utö är öppet beroende på skjutfältet, att Dalarö har klapperstensstrand, att "minibåtar och pedalbåtar finns att hyra på de flesta gästhamnar" och att pilkfiske passar från ca 5 år – utan källa. Öar och bad för barnfamiljer finns nu i ett eget inlägg. -->
Barn kan följa med ut i båten och på badet i skärgården – med rätt flytväst och några vanor. Här är vad Transportstyrelsen, Sjöräddningssällskapet (SSRS) och Svenska Livräddningssällskapet (SLS) råder. Vilka öar och bad som passar barnfamiljer står i [Barnvänliga öar och bad i Stockholms skärgård](/blogg/skargard-barnfamilj-sommar-2026).

## Flytvästen

### Räddningsväst för barn
Enligt Transportstyrelsen ska alla ombord ha en CE-märkt flytväst i rätt storlek, och barn och vuxna som inte kan simma ska använda räddningsväst. Sjöräddningssällskapet säger att barn alltid ska ha räddningsväst.

- **Flytkraften:** en räddningsväst har minst 100 N flytkraft oavsett storlek. För barn ska flytkraften sitta på magen, inte på ryggen.
- **Passformen:** välj efter hur västen sitter på barnet, inte bara efter kiloangivelsen. Byt när den inte längre passar.
- **Grenband:** enligt SLS ska barn alltid använda grenband. För barn till sjöss finns västar med inbyggd livsele.
- **Uppblåsbara västar:** rekommenderas inte till barn under 40 kilo, och enligt Transportstyrelsen bara för den som kan simma.
- **Livslängd:** tio år enligt branschstandard.

### Ta på västen redan på bryggan
Transportstyrelsen råder att ta på flytvästen innan ni går ut på bryggan och att alla har väst innan båten lägger ut. För små barn som leker i eller nära vattnet är räddningsvästen enligt SLS ett komplement till ständig uppsikt. Enligt SLS sker olyckor oftast nära land och när vädret är lugnt, och bara en av tio som drunknar bär flytväst.

### Låna en väst
Svenska Livräddningssällskapet har depåer där du kan låna eller hyra en flytväst, till exempel när ni har gäster ombord.

## Med små barn ombord
Sjöräddningssällskapets råd:
- **Barnstol:** vid tilläggning eller i sjögång kan en bilbarnstol eller cykelstol fästas i till exempel pulpiten. Montera den så att den inte lossnar.
- **Bärsele** för de minsta – men den ersätter inte flytvästen.
- **Mantågsnät:** på segelbåt skyddar ett finmaskigt nät längs mantågen.
- **Spisen** är en vanlig orsak till olyckor ombord. Håll uppsikt vid matlagning.
- **Korta etapper:** välj kortare rutter och låt barnen leka av sig på stranden.
- **Tilläggningen:** välj plats med omsorg. Branta klippor gör det svårt att gå i land.
- **Jollen:** låt barnen lära sig grunderna med åror innan motorn monteras.
- **Uppgifter:** låt barnen hjälpa till ombord och öka svårigheten efter hand.

## Före turen
Transportstyrelsen råder att du:
- tittar på väderprognosen både före och under turen. SSRS påpekar att tuff sjö skrämmer barn och ökar risken för sjösjuka.
- har en fulladdad mobil i vattentätt fodral nära till hands.
- packar ombyte, mat och dryck i en vattentät väska.
- talar om för någon vart ni ska och när ni räknar med att vara framme.

## Badvett
Svenska Livräddningssällskapets badvett:
- Bada alltid i sällskap och ha hela tiden uppsikt över varandra.
- Gå försiktigt på brygga och klippa.
- Hoppa och dyk bara där det är tillräckligt djupt.
- Simma längs med stranden eller bryggan, och inte under brygga eller hopptorn.

## Båtvett
- Använd alltid flytväst.
- Sitt ner i mindre båtar och byt bara plats om du måste.
- Ramlar du i vattnet: stanna vid båten.
- Behöver du hjälp: vifta långsamt med båda armarna över huvudet och åt sidorna.

## Lär barnen ringa 112
När barnen kan hantera en telefon råder Sjöräddningssällskapet att lära dem 112 – "112, lätt att slå" – och förklara hur ett sådant samtal går till.

## Läs vidare
- [Barnvänliga öar och bad i Stockholms skärgård](/blogg/skargard-barnfamilj-sommar-2026)
- [Badplatser i Stockholms skärgård](/blogg/basta-badplatserna)
- [Börja segla](/blogg/segling-nyborjare-guide) och [kajak för nybörjare](/blogg/kajak-stockholms-skargard-nyborjare)
 `,
 },

 'svenska-hoar-sandhamn': {
   title: 'Svenska Högarna – naturreservat längst ut i skärgården',
   excerpt: 'Svenska Högarna i Norrtälje kommun är Sveriges största marina naturreservat, cirka 19 nautiska mil öster om Möja. Så når du ögruppen, var du lägger till och vilka regler som gäller.',
   category: 'Öguide',
   date: '2026-03-05',
   updatedAt: '2026-09-24',
   readTime: '4 min',
   emoji: '🪨',
   tags: ['Svenska Högarna', 'Ytterskärgård', 'Naturreservat', 'Fyrplats', 'Segling'],
   // KÄLLA: lansstyrelsen.se/stockholm/besoksmal/naturreservat/svenska-hogarna.html ("cirka 35 kilometer (cirka 19 nautiska mil) öster om Möja. Ögruppen kan bara nås med egen båt, taxi- eller charterbåt."; "övernattningsbodar finns vid inre hamnen. Bokas genom tillsynsmannen"; föreskrifterna) – se KÄLLA-kommentaren i content.
   faqs: [
     { q: 'Hur tar man sig till Svenska Högarna?', a: 'Enligt Länsstyrelsen kan ögruppen bara nås med egen båt, taxibåt eller charterbåt. Den ligger cirka 35 kilometer, eller cirka 19 nautiska mil, öster om Möja.' },
     { q: 'Kan man övernatta på Svenska Högarna?', a: 'Ja. Vid inre hamnen finns övernattningsbodar som bokas genom tillsynsmannen. Tältning är förbjuden mer än två dygn i följd på samma plats, utom på anvisad tältplats.' },
     { q: 'Får man ankra vid Svenska Högarna?', a: 'Inte överallt. Inom vissa områden som är markerade på reservatets karta är det förbjudet att ankra. Mellan Skrubban och Ytterhamnen finns Svenska Kryssarklubbens angöringsbojar, där allmänheten kan förtöja mot betalning.' },
   ],
   content: `
<!-- KÄLLA (läst 2026-09-24): lansstyrelsen.se/stockholm/besoksmal/naturreservat/svenska-hogarna.html ("Svenska Högarnas naturreservat är Sveriges största marina naturreservat."; "Svenska Högarna är en ögrupp i Norrtälje kommun, längst österut i Stockholms ytterskärgård. Området har varit naturreservat sedan 1976. Genom ett beslut 2020 lägger Länsstyrelsen till ett stort havsområde till reservatet, vilket ökar den skyddade ytan från knappt 3 000 hektar till 61 000 hektar."; "Knutna till öarna finns några av de viktigaste sjöfågelkolonierna i Stockholms län med arter som sillgrissla, tobisgrissla, tordmule, ejder och svärta"; "Området utgör också en av länets förnämsta sträcklokaler för flyttfågel. I närområdet finns Östersjöns största bestånd av gråsäl."; "Här finns omfattande blåmusselrev, djupa syresatta mjukbottnar och friska, artrika tång- och algbälten."; "Landområdena karaktäriseras av karg utskärgårdsnatur med kala renspolade hällar. Jättegrytor, hällkar och isräfflor finns i området."; "På Storön finns en artrik flora med bland annat strandnarv och gyllenbjörnbär."; "Svenska Högarna var förr en fiskehamn och är sedan gammalt en fyrplats. På Storön finns flera stigar runt Ytterhamnen, Innerhamnen, fyren och öns anläggningar. Bland sevärdheterna kan nämnas en trojaborg, stenlabyrint och en kyrkogård. Besökare ombeds att visa hänsyn till de boende vid fyrbyn."; "Begränsade hamnmöjligheter finns på östra delen av Storön, vid Ytterhamnen. Här finns en brygga och sopmaja samt torrdass för besökare. Mellan ön Skrubban och Ytterhamnen finns angöringsbojar som ägs och sköts av Svenska Kryssarklubben, allmänheten kan mot betalning angöra vid bojarna."; "övernattningsbodar finns vid inre hamnen. Bokas genom tillsynsmannen"; "fyren med utställning"; "cirka 35 kilometer (cirka 19 nautiska mil) öster om Möja. Ögruppen kan bara nås med egen båt, taxi- eller charterbåt."; föreskrifter: förbjudet att "under tiden 1 februari – 15 augusti beträda eller färdas eller uppehålla sig inom område A", "under tiden 1 april – 31 juli ... inom område B", "under tiden 1 maj- 30 juni ... inom område C", "framföra båt, fartyg eller annan vattenfarkost med högre hastighet än 5 knop inom område som angivits på karta", "ankra båt eller fartyg inom område som angivits på karta, bilaga 1C i beslutet", "fiska inom område som angivits på karta", "ta i land okopplad hund eller annat sällskapsdjur", "göra upp öppen eld eller använda grill annat än på anvisad plats", "tälta mer än två dygn i följd på samma plats, annat än på anvisad tältplats", "förtöja båt eller fartyg på allemansrättslig grund längre än två dygn i följd vid samma strand eller brygga", "släppa ut avloppsvatten, tankspolvatten, barlastvatten eller annat flytande eller fast avfall från båt eller fartyg", "tvätta båt- eller fartygsskrov", "tomgångsköra motor eller använda motordrivet laddningsaggregat vid angöringsplats", "landstiga med större sällskap än 10 personer. Landstigning med större sällskap får dock ske efter samråd med förvaltaren om villkoren för detta"). Tidigare version (borttagen 2026-09-24): att fyrvaktarbostäderna används som naturum (fel: Länsstyrelsen nämner fyren med utställning, inget naturum), att övernattning bokas genom att kontakta länsstyrelsen (bodarna bokas genom tillsynsmannen), "ca 4–5 timmar med segelbåt från Stockholm" (obelagt), "knappt någon fast befolkning" (Länsstyrelsen ber besökare visa hänsyn till de boende vid fyrbyn), "en fyr från mitten av 1800-talet" (årtalet obelagt), "ankring möjlig på läsidan" (ankring är förbjuden inom markerat område; Kryssarklubbens bojar finns vid Ytterhamnen), att det inte finns någon restaurang eller butik (obelagt) samt stämningsbeskrivningar utan källa. Rubriken kopplade tidigare ögruppen till Sandhamn; Länsstyrelsen anger läget i förhållande till Möja. -->
[Svenska Högarna](/o/svenska-hogarna) är en ögrupp i Norrtälje kommun, längst österut i Stockholms ytterskärgård, cirka 35 kilometer (cirka 19 nautiska mil) öster om Möja. Enligt Länsstyrelsen är det Sveriges största marina naturreservat. Ögruppen kan bara nås med egen båt, taxibåt eller charterbåt.

## Naturreservatet
Svenska Högarna har varit naturreservat sedan 1976. Genom ett beslut 2020 lades ett stort havsområde till, och den skyddade ytan ökade från knappt 3 000 hektar till 61 000 hektar.

- **Fåglar:** här finns några av länets viktigaste sjöfågelkolonier, med bland annat sillgrissla, tobisgrissla, tordmule, ejder och svärta. Området är också en viktig sträcklokal för flyttfåglar.
- **Säl:** i närområdet finns Östersjöns största bestånd av gråsäl.
- **Under ytan:** blåmusselrev, djupa syresatta mjukbottnar och tång- och algbälten.
- **På land:** kala, renspolade hällar med jättegrytor, hällkar och isräfflor. På Storön växer bland annat strandnarv och gyllenbjörnbär.

## Fyrplatsen och Storön
Svenska Högarna var förr en fiskehamn och är sedan gammalt en fyrplats. På Storön finns stigar runt Ytterhamnen, Innerhamnen, fyren och öns anläggningar. Bland sevärdheterna finns en trojaborg, en stenlabyrint och en kyrkogård, och i fyren finns en utställning. Länsstyrelsen ber besökare att visa hänsyn till de boende vid fyrbyn.

## Hamn och övernattning
- **Ytterhamnen:** på östra delen av Storön finns begränsade hamnmöjligheter, med brygga, sopmaja och torrdass för besökare.
- **Bojar:** mellan Skrubban och Ytterhamnen finns angöringsbojar som ägs och sköts av Svenska Kryssarklubben. Allmänheten kan förtöja vid dem mot betalning.
- **Övernattningsbodar:** vid inre hamnen, bokas genom tillsynsmannen.

## Reglerna i reservatet (urval)
- **Tillträdesförbud** i tre områden: område A 1 februari–15 augusti, område B 1 april–31 juli och område C 1 maj–30 juni. Områdena finns på kartan i Länsstyrelsens beslut.
- **Båt:** inom områden som är markerade på kartan är det förbjudet att ankra, köra båt, köra fortare än 5 knop eller fiska. Du får inte förtöja längre än två dygn i följd vid samma strand eller brygga, inte tomgångsköra motorn vid angöringsplatsen och inte tvätta båtskrovet. Du får inte heller släppa ut avloppsvatten eller annat avfall från båten.
- **Hund:** hunden ska vara kopplad när den tas i land.
- **Eld:** öppen eld och grill är bara tillåtna på anvisad plats.
- **Tält:** högst två dygn i följd på samma plats, utom på anvisad tältplats.
- **Grupper:** sällskap större än tio personer får bara landstiga efter samråd med förvaltaren.

## Mer att läsa
- [Naturhamnar i Stockholms skärgård](/blogg/naturhamnar-stockholm-skargard)
- [Sjömackar och ankring i skärgården](/blogg/bransle-ankring-skargard)
- [Grilla i naturhamnen](/blogg/grilla-naturhamn)
   `,
 },

 'grilla-naturhamn': {
   title: 'Grilla i naturhamnen – eldningsregler i skärgården',
   excerpt: 'Får du grilla i naturhamnen? Allemansrättens regler för eldning, hur du tar reda på om det är eldningsförbud i Stockholms län och vad som gäller i naturreservat som Grinda, Finnhamn och Nåttarö.',
   category: 'Praktiskt',
   date: '2026-02-05',
   updatedAt: '2026-09-24',
   readTime: '4 min',
   emoji: '',
   tags: ['Grilla', 'Eldning', 'Eldningsförbud', 'Allemansrätten', 'Naturhamn'],
   faqs: [
     { q: 'Får man grilla på klipporna i skärgården?', a: 'Naturvårdsverket avråder från att elda på berghällar och större stenblock, eftersom de kan spricka och skadas permanent. Använd en fast grillplats eller välj grus eller sand som underlag.' },
     { q: 'Får man grilla när det är eldningsförbud?', a: 'Vid eldningsförbud kan det vara tillåtet att grilla på fasta grillplatser, men vid skärpt eldningsförbud är det ofta förbjudet både att elda och att grilla, oavsett plats, enligt Naturvårdsverket. Vad som gäller står på länsstyrelsens eller kommunens webbplats.' },
     { q: 'Var får man grilla på Grinda?', a: 'Grinda är naturreservat, och där är det förbjudet att elda annat än på anvisad plats. Enligt Länsstyrelsen finns grillplatser vid södra ångbåtsbryggan och vid tältplatsen.' },
   ],
   content: `
<!-- KÄLLA (lästa 2026-09-24): naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/eldning/ (granskad 26 maj 2026: "allemansrätten ger dig ingen självklar rätt att elda"; "Använd en fast grillplats, eller välj grus eller sand som underlag."; "Ett friluftskök är också bra."; "Krafsa i askan för att se så att det inte finns någon glöd kvar. Se till att det finns vatten att släcka elden och glöden med."; "Välj matsäck som inte kräver eld när det är torrt i marken. Ta med skräp och matrester hem."; "undvika att göra upp eld på mossa, torvmark eller jordig skogsmark"; "Elda inte nära myrstackar eller stubbar"; "Undvik även att elda på berghällar och större stenblock. De kan nämligen spricka och skadas permanent."; "Du får använda pinnar, grenar och kottar som ligger på marken som ved till elden. Däremot får du inte hugga eller såga ner träd eller buskar. Det är inte heller tillåtet att ta ris, grenar eller näver från träd som lever. Omkullfallna träd som ligger på marken tillhör markägaren och får inte användas som ved"; "Om det är torrt i skog och mark kan länsstyrelsen eller kommunen besluta om eldningsförbud."; "Vid eldningsförbud kan det vara tillåtet att grilla på fasta grillplatser, men vid skärpt eldningsförbud är det ofta förbjudet att både göra upp en eld eller grilla, oavsett plats."; "Tänk på att brandrisken kan vara stor trots att det inte råder eldningsförbud."; "I dessa områden kan det vara helt förbjudet att elda, eller bara vara tillåtet på vissa iordningställda eldplatser."; "Om det råder eldningsförbud gäller det även i skyddade områden."; "Karta över eldningsförbud (krisinformation.se)"; "Brandriskprognoser (smhi.se)"). storstockholm.brand.se/pa-fritiden/eldning-tillatet/ ("Det är då tillåtet att elda och grilla i skog och mark, men lokala eldningsförbud kan fortfarande förekomma."; "Gör inte upp eld direkt på eller intill berghällar samt nära stubbar eller myrstackar."; "Du ska alltid ha tillgång till vatten och redskap (till exempel en spade)"; "Om vinden ökar ska du släcka elden."; "Storstockholms brandförsvars region: 08-454 83 39. Södertörns brandförsvarsförbund: 08-721 23 26. Räddningstjänsten Norrtälje kommun: 0176-28 42 00."; "Använd appen Brandrisk Ute"). storstockholm.brand.se/mer-om-oss/var-verksamhet/ ("Dessa är: Danderyd, Lidingö, Nacka, Solna, Stockholm, Sundbyberg, Täby, Vallentuna, Vaxholm, Värmdö samt Österåker."). lansstyrelsen.se Grinda (förbjudet att "elda annat än på anvisad plats"; "Grillplatser finns vid södra ångbåtsbryggan och vid tältplatsen."). lansstyrelsen.se Finnhamn (förbjudet att "elda annat än på anvisad plats"; "Eldplatser finns vid tältplatsen på södra Jolpan, nära vandrarhemmet och på Idholmen."). lansstyrelsen.se Nåttarö (förbjudet att "elda annat än på anvisad plats"; serviceinformation "Eldplats"). lansstyrelsen.se Nämdöskärgårdens nationalpark ("Du får endast elda på anvisade platser eller i grill på ben. Du får också använda friluftskök."). sverigesnationalparker.se Nämdöskärgården ("ett servicehus med dricksvatten, toalett och dusch, grill och utekök"). lansstyrelsen.se Svenska Högarna (förbjudet att "göra upp öppen eld eller använda grill annat än på anvisad plats"). lansstyrelsen.se Granholmen, Huvudskär och Biskopsö (förbjudet att "göra upp öppen eld"), Fjärdlång (förbjudet att "göra upp öppen eld", med undantag för lägerskolans eldplatser på södra Fjärdlång), Jungfruskär (förbjudet att "göra upp eld"). ingmarsogasthamn.se ("Våra nybyggda och fräscha duschar och WC, liksom grillplats och karta över ön ingår i hamnavgiften."). Tidigare version (borttagen 2026-09-24): "Fejan – befintliga eldstäder på klipporna norra sidan" (obelagt, och Naturvårdsverket avråder från eld på berghällar), "Möja – södra hamnen, med vedförråd avsett för besökare" (obelagt), "Kymmendö – naturreservat med specificerade grillplatser" (obelagt), "Gällnö – privat förvaltad mark" (fel: Gällnö naturreservat förvaltas av Skärgårdsstiftelsen enligt Länsstyrelsen), påståendet att grill med ben ofta är tillåten vid ordinärt eldningsförbud (Naturvårdsverket nämner fasta grillplatser) och att en engångsgrill "fungerar i princip var som helst". -->
Allemansrätten ger dig ingen given rätt att elda, enligt Naturvårdsverket. Du ansvarar för att elden inte sprider sig eller skadar marken, djuren och växterna. I skärgårdens naturreservat är det dessutom ofta bara tillåtet att elda på anvisade platser, och på flera ställen är öppen eld helt förbjuden.

## Så grillar du enligt allemansrätten
- **Underlag:** använd en fast grillplats, eller välj grus eller sand. Ett friluftskök är också ett alternativ.
- **Inte på berghällar:** undvik att elda på berghällar och större stenblock – de kan spricka och skadas permanent. Undvik också mossa, torvmark och jordig skogsmark, och elda inte nära myrstackar eller stubbar.
- **Ved:** du får använda pinnar, grenar och kottar som ligger på marken. Du får inte hugga eller såga ner träd eller buskar, eller ta ris, grenar eller näver från levande träd. Omkullfallna träd tillhör markägaren.
- **Släck:** ha vatten och gärna en spade till hands. Krafsa i askan så att ingen glöd finns kvar, och släck elden om vinden ökar.
- **Skräp:** ta med skräp och matrester hem.

## Eldningsförbud
Länsstyrelsen eller kommunen kan besluta om eldningsförbud när det är torrt. Vid eldningsförbud kan det vara tillåtet att grilla på fasta grillplatser, men vid skärpt eldningsförbud är det ofta förbjudet att både elda och grilla, oavsett plats. Brandrisken kan vara stor även när det inte råder förbud. Ett eldningsförbud gäller också i naturreservat och nationalparker.

Här kan du kolla vad som gäller:
- Krisinformation.se har en karta över eldningsförbud, och SMHI publicerar brandriskprognoser. Storstockholms brandförsvar tipsar också om appen Brandrisk Ute.
- Räddningstjänsternas telefonsvarare: Storstockholms brandförsvar 08-454 83 39, Södertörns brandförsvarsförbund 08-721 23 26 och Räddningstjänsten Norrtälje kommun 0176-28 42 00.
- Storstockholms brandförsvar omfattar bland annat Vaxholm, Värmdö, Österåker och Nacka. När deras risknivå visar ”Eldning tillåtet” kan det ändå finnas lokala eldningsförbud i kommunen.

## Naturreservat och nationalpark
I skyddade områden kan det vara helt förbjudet att elda, eller bara tillåtet på iordningställda eldplatser. Exempel ur Länsstyrelsens föreskrifter:

### Elda bara på anvisad plats
- [Grinda](/o/grinda) – grillplatser finns vid södra ångbåtsbryggan och vid tältplatsen.
- [Finnhamn](/o/finnhamn) – eldplatser finns vid tältplatsen på södra Jolpan, nära vandrarhemmet och på Idholmen.
- [Nåttarö](/o/nattaro) – reservatet har anvisade eldplatser.
- [Svenska Högarna](/o/svenska-hogarna) – både öppen eld och grill är bara tillåtna på anvisad plats.
- [Bullerö](/o/bullero) och Nämdöskärgårdens nationalpark – du får elda på anvisade platser eller i grill på ben, och friluftskök är tillåtet. I servicehuset på Bullerö finns grill och utekök.

### Öppen eld förbjuden
- Granholmen söder om Möja, [Huvudskär](/o/huvudskar), Biskopsö och Jungfruskär. På [Fjärdlång](/o/fjardlang) är öppen eld förbjuden; undantaget gäller bara eldplatser för lägerskolans verksamhet på södra Fjärdlång.

## Grillplats i gästhamnen
Ligger du i gästhamn kan det finnas grillplats. På [Ingmarsö gästhamn](/upptack/ingmarso-gasthamn) ingår grillplatsen i hamnavgiften.

## Mer att läsa
- [Naturhamnar i Stockholms skärgård](/blogg/naturhamnar-stockholm-skargard)
- [Skärgård med hund](/blogg/skargard-med-hund)
- [Gästhamnar i Stockholms skärgård](/blogg/gasthamnar-guide)
   `,
 },

 'norrtelje-norra-skargard': {
 title: 'Norrtälje skärgård – Arholma, Lidö, Väddö och Singö',
 excerpt: 'Norra skärgården i Norrtälje kommun: båt från Norrtälje hamn och Räfsnäs, Arholma och Lidö, Furusund och Blidö, Väddö kanal, Grisslehamn och Singö – med bad och gästhamnar enligt kommunen.',
 category: 'Öguide',
 date: '2026-01-20',
 updatedAt: '2026-09-24',
 readTime: '7 min',
 emoji: '',
 tags: ['Norrtälje skärgård', 'Norra skärgården', 'Arholma', 'Singö', 'Väddö', 'Roslagen'],
 faqs: [
   // KÄLLA: arholma.nu/resa-hit ("Kör till Simpnäs brygga. Härifrån går passbåten Monsun till Arholma året runt. Resan tar cirka 15 minuter."; "Till Simpnäs går SL-bussar."); blidosundsbolaget.se/norra-batlinjen/ ("dagliga avgångar mellan den 6 juli och 9 augusti", M/S Rex, "Norrtälje, längst bort på Norrtälje hamnpromenad, vid bron Havslänken")
   { q: 'Hur tar man sig till Arholma?', a: 'Passbåten Monsun går året runt från Simpnäs brygga till Arholma, cirka 15 minuter, och till Simpnäs går SL-bussar. På sommaren går Blidösundsbolagets Norra båtlinje från Norrtälje hamn till Lidö och Arholma.' },
   // KÄLLA: visitroslagen.se/singo-och-fogdo ("Singö nås med bro från Väddö via Fogdö"; "Bron till Singö invigdes år 1955."; "I dag tar du dig till Singö från Stockholm och Norrtälje med SL-buss 637, med bil eller egen båt."); roslagen.se Singö and Fogdö ("These islands are easily accessible all year round by bridge.")
   { q: 'Går det färja till Singö?', a: 'Nej. Singö nås med bro från Väddö via Fogdö, och bron invigdes 1955. Du tar dig dit med bil, egen båt eller SL-buss 637 från Norrtälje.' },
   { q: 'Vilka gästhamnar finns i Norrtälje kommun?', a: 'Norrtälje kommun listar gästhamnarna i Norrtälje, Spillersboda, Furusund, Lidö, Fejan, Gräddö, Blidö, Grisslehamn och Arholma.' },
 ],
 content: `
<!-- KÄLLA (lästa 2026-09-24 om inget annat anges): svenskagasthamnar.se/stockholms-skargard/norrtalje/ ("Vår gästhamn är uppdelad på två platser, dels mitt inne i stadens centrum och dels ute vid Restaurang Havspiren"; "bunkra upp inför utflykterna i skärgården eller turen över till Åland"; Gästplatser "120", Hamndjup "1-4 m"). norrtalje.se/info/visit-norrtalje/skargard/gasthamnar/ (Norrtälje gästhamn, Spillersboda, Furusunds, Lidö, Fejan, Gräddö, Blidö, Grisslehamn och Arholma gästhamn). norrtalje.se/info/visit-norrtalje/ (Norrtälje turistbyrå, "Lilla Torget 1A (Wallinska gårdarna)"). norrtalje.se/info/kultur-och-fritid/bad/badplatser/ ("Norrtälje kommun har 31 badplatser"; "Badplatserna sköts om och underhålls under sommarsäsongen, 15 maj – 15 september."; "Simskola utomhus"). blidosundsbolaget.se/norra-batlinjen/ ("I sommar erbjuder vi dagliga avgångar mellan den 6 juli och 9 augusti"; "M/S Rex"; "09:30 Norrtälje, längst bort på Norrtälje hamnpromenad, vid bron Havslänken", 10:50 Gräddö, 11:05 Lidö, 11:45 ankomst Arholma; "Att åka med Norra båtlinjen till Lidö tar lite drygt en och en halv timme"; Lidö: "Hela varvet runt är 11,9 kilometer medan den kortaste slingan är ungefär tre kilometer", "en badplats bara ett par hundra meter från ångbåtsbryggan", "Lidö batteri", "Ryssugn"). SL buss 631 (h631.pdf, giltig 17 augusti–12 december 2026: Norrtälje busstation … Gräddö torg … Räfsnäs brygga; island-data graddo). Waxholmsbolaget linje 31 (h31.pdf/v31.pdf, "31A RÄFSNÄS – TJOCKÖ – FEJAN", gäller 2 april–18 juni och 17 augusti–12 december 2026; Lidö-anlöpen märkta "b" = "Beställ resan i SL-appen, på Waxholmsbolagets webb eller via kundtjänst ... minst 1 timme innan avgång"; island-data lido). lidovardshus.com ("Säsongen 2026 Vi har nu öppet för grupper, konferenser, fester och bröllop."; "Boende & restaurang öppnar åter till midsommar 2027 den 25 juni"), lidovardshus.com/gsthamnen ("Gästhamnen hittar ni på öns sydvästra sida, i Båthusviken."; "ett 50-tal båtplatser"; "I vår hamn kan man inte boka platser"; datafix). skargardsstiftelsen.se/omraden/fejan/ ("Tack vare reguljär båttrafik från Räfsnäs är ön lätt att nå även utan egen båt, och här väntar restaurang, gästhamn, kajakuthyrning, glamping"; "I slutet av 1800-talet anlades här en karantänstation för fartyg som misstänktes bära smittsamma sjukdomar"). tjocko.se ("Tjockö är en … ö belägen i Norrtälje kommun"; Ökrogen "Sommarrestaurangen har även öppet för pubkvällar under vår, vinter och höst."; datafix). Arholma: lansstyrelsen.se/stockholm/besoksmal/naturreservat/arholma-ido.html (bildat 1965; "Arholma och öarna öster därom samt Idö, Idskär och några mindre öar"; landstigningsförbud på Rödkobben och Nollekobb 1 april–31 juli; hund kopplad), sjofartsverket.se Arholma båk ("byggdes 1768"; "Den är en så kallad känningsbåk och har aldrig haft fyrljus"), norrtalje.se Batteri Arholma ("Anläggningen byggdes för Kalla kriget och stod klar 1968"; "Den visas av säkerhetsskäl endast genom guidade turer"), arholmahandel.se ("åretruntöppen butik"; "livsmedel, nybakat bröd"; "bensin, diesel, gasol"), arholma.nu/resa-hit ("passbåten Monsun till Arholma året runt. Resan tar cirka 15 minuter."; "Gästbryggan i Österhamn har plats för ett 20-tal båtar och gästbryggan i Ahlmansviken för 30."), svenskaturistforeningen.se STF Arholma Bull-August gård och STF Arholma Nord; citaten i island-data (arholma). Furusund och Blidö: trafikverket.se Furusundsleden ("Furusundsleden går mellan Furusund och Yxlan"; "överfartstiden är fyra minuter"; "Resan med vägfärjan är avgiftsfri"), trafikverket.se Blidöleden ("Blidöleden går mellan Yxlan och Blidö"), furusund.se/hamnen/ ("I vår gästhamn finns plats för upp till hundra båtar"), hotellfurusund.se/historia/ ("August Strindberg kom till Furusund sommaren 1899"), svenskagasthamnar.se/stockholms-skargard/blido/ ("Hamn i skyddat läge vid restaurang Blidö Brygga."), havochvatten.se Rådmansholmen Blidö ("Sandstrand samt långgrunt badvatten"; "Dass på badplatsen, Lekutrustning samt grillplats"); citaten i island-data (furusund, blido). Väddö: roslagen.se/en/eagle/vaddo-roslagens-storsta-o/ ("Roslagen's largest island with the Väddö Canal and the Åland Sea"; "Väddö Canal connects Bagghusfjärden in the south with Bay of Väddö in the north, offering a sheltered alternative to the open sea east of Väddö"; "Every year, the canal is travelled by around 22 000 boats."; "From Grisslehamn, Eckerölinjen boats go to Eckerö in Åland."), norrtalje.se Väddö kanal kulturmiljöutredning nr 6 ("Arbetet med att anlägga nuvarande Väddö kanal påbörjades år 1819"; "Kanalen öppnades för trafik 1835, och 1840 invigdes den officiellt av Karl XIV Johan."), grisslehamnsmarina.se/hamnen/ ("Vår gästhamn har 77 gästplatser"; "Hamndjupet hos oss är mellan 1-5 meter."; datafix), norrtalje.se Kvarnsand ("Kvarnsandsbadet är ett havsbad på Väddö östkust, söder om Grisslehamn."; "cirka 190 meter lång strandlinje i österläge"; datafix), SL buss 637 (h637.pdf: Norrtälje via Väddö kyrka, Älmsta och Grisslehamn till Ellan; island-data vaddo). Singö: visitroslagen.se/singo-och-fogdo ("Singö nås med bro från Väddö via Fogdö"; "Busshållplatsen vid Ellan är Storstockholms lokaltrafiks nordligaste."; "cirka 300 bofasta invånare och 3 000 - 4 000 fritidsboende"; "Singö träkyrka som byggdes 1753. Det är en av få bevarade äldre skärgårdskyrkor."; "Backbyn och Tranvik är kulturmiljöer av riksintresse"; "Bron till Singö invigdes år 1955. Dessförinnan gick dagliga turer med Waxholmsbolagets båtar från Strandvägen i Stockholm via Norrtälje, Väddö Kanal, Trästa, Singö med slutdestination Östhammar eller Öregrund."; "Svartklubbens fyr – statligt byggnadsminne"), roslagen.se/en/eagle/singo-and-fogdo-lattillganglig-cultural-environment/ ("easily accessible all year round by bridge"; "Swimming - sandy beach and grass areas at Backbyn"), norrtalje.se Backbyn ("Badplatsen är ett havsbad vid Backby på ön Singös östra sida."; "en sandstrand med gräsytor i en skyddad vik i söderläge"; datafix). Tidigare version (borttagen 2026-09-24) stavade kommunen "Norrtelje", påstod att Singö nås med bilfärja (fel: bro sedan 1955), att Singö kapell är "en av Upplands äldsta träkyrkor", att Herräng har "en av landets bästa lindy hop-festivaler", att Blidö ligger söder om Väddö, att parkeringen vid Räfsnäs "fylls tidigt" och nämnde Söderhamnsholme, Storön och Kallskär och Norrtäljes "restaurangscen" – utan källa. -->
Norrtälje kommun har den norra delen av Stockholms skärgård – från Furusund och Blidö i söder till Arholma, Väddö och Singö vid Ålands hav. Här är hur du tar dig ut, vad som finns på öarna och var du badar och lägger till, enligt kommunen, Länsstyrelsen, Svenska Gästhamnar och verksamheterna själva.

## Norrtälje hamn
Norrtäljes gästhamn ligger på två platser: i stadens centrum och ute vid Restaurang Havspiren. Enligt Svenska Gästhamnar finns 120 gästplatser på 1–4 meters djup, och hamnen används för att bunkra inför turer i skärgården eller över till Åland. Norrtälje turistbyrå finns på Lilla Torget 1A i Wallinska gårdarna.

På sommaren går Blidösundsbolagets Norra båtlinje med M/S Rex från Norrtälje hamn, vid bron Havslänken, via Gräddö till Lidö och Arholma.

## Räfsnäs, Lidö, Fejan och Tjockö
SL-buss 631 går från Norrtälje busstation via Gräddö till Räfsnäs brygga på Rådmansö. Därifrån går Waxholmsbolagets linje 31 till [Fejan](/o/fejan) och Tjockö. Turer som lägger till vid Lidö ska beställas minst en timme i förväg.

- [Lidö](/o/lido): med Norra båtlinjen tar resan från Norrtälje drygt en och en halv timme. Stockholm Archipelago Trail går runt ön, 11,9 kilometer, och den kortaste slingan är ungefär tre kilometer. En badplats ligger ett par hundra meter från ångbåtsbryggan, och på ön finns Lidö batteri och en ryssugn. [Lidö gästhamn](/upptack/lido-gasthamn) i Båthusviken har ett 50-tal platser som inte går att boka. [Lidö Värdshus](/upptack/lido-vardshus) har perioder då det bara tar emot grupper – se värdshusets sida för aktuell säsong.
- Fejan: i slutet av 1800-talet anlades en karantänstation här för fartyg som misstänktes ha smitta ombord. Skärgårdsstiftelsen nämner restaurang, gästhamn, kajakuthyrning och glamping.
- Tjockö: [Ökrogen](/upptack/okrogen-tjocko) är sommarrestaurang och har pubkvällar under vår, vinter och höst.

## [Arholma](/o/arholma)
Passbåten Monsun går året runt från Simpnäs brygga, cirka 15 minuter, och till Simpnäs går SL-bussar.

- **Naturreservatet Arholma-Idö** bildades 1965 och omfattar Arholma, öarna öster om den och Idö. Hunden ska vara kopplad, och på Rödkobben och Nollekobb råder landstigningsförbud 1 april–31 juli.
- **Arholma båk** byggdes 1768. Den är en känningsbåk och har aldrig haft fyrljus.
- **Batteri Arholma** stod klart 1968 och visas av säkerhetsskäl bara med guide.
- **Arholma Handel** har öppet året runt, med livsmedel, bröd, bensin, diesel och gasol.
- **Boende:** STF Arholma Bull-August gård och STF Arholma Nord.
- **Egen båt:** gästbryggan i Österhamn har plats för ett 20-tal båtar och den i Ahlmansviken för 30. Se [Arholma gästhamn](/upptack/arholma-gasthamn).

## [Furusund](/o/furusund) och [Blidö](/o/blido)
Furusundsleden går mellan Furusund och Yxlan, fyra minuter, och Blidöleden mellan Yxlan och Blidö. Furusundsleden är avgiftsfri. [Furusunds gästhamn](/upptack/furusunds-gasthamn) har plats för upp till hundra båtar. August Strindberg kom till Furusund sommaren 1899.

På Blidö ligger [Blidö gästhamn](/upptack/blido-gasthamn) vid restaurang Blidö Brygga, och badplatsen Rådmansholmen har sandstrand, långgrunt vatten, lekutrustning och grillplats.

## [Väddö](/o/vaddo) och Grisslehamn
Väddö är Roslagens största ö. Väddö kanal förbinder Bagghusfjärden i söder med Väddöviken i norr och är ett skyddat alternativ till öppna havet öster om ön. Arbetet med den nuvarande kanalen började 1819, den öppnades för trafik 1835 och invigdes 1840 av Karl XIV Johan. Omkring 22 000 båtar passerar varje år.

Från Grisslehamn på Väddös norra del går Eckerölinjen till Eckerö på Åland. [Grisslehamns gästhamn](/upptack/grisslehamn-gasthamn) har 77 gästplatser på 1–5 meters djup. Söder om Grisslehamn ligger havsbadet [Kvarnsand](/upptack/kvarnsand) med cirka 190 meter strandlinje i österläge. SL-buss 637 går från Norrtälje via Älmsta och Grisslehamn.

## [Singö](/o/singo)
Singö nås med bro från Väddö via Fogdö, och bron invigdes 1955. Innan dess gick Waxholmsbolagets båtar från Strandvägen via Norrtälje, Väddö kanal och Singö till Östhammar eller Öregrund. I dag går SL-buss 637 hela vägen till Ellan, SL:s nordligaste hållplats.

- Omkring 300 personer bor på Singö året runt och 3 000–4 000 fritidsboende kommer på sommaren.
- **Singö kyrka** är en träkyrka från 1753, en av få bevarade äldre skärgårdskyrkor.
- **Backby och Tranvik** är kulturmiljöer av riksintresse.
- [Backbybadet](/upptack/backbybadet) har sandstrand och gräsytor i en skyddad vik i söderläge.
- **Svartklubbens fyr** är statligt byggnadsminne.

## Bad och gästhamnar
Norrtälje kommun har 31 badplatser som sköts under sommarsäsongen, 15 maj–15 september, och på sommaren finns simskola utomhus. Kommunens lista över gästhamnar: Norrtälje, Spillersboda, Furusund, Lidö, Fejan, Gräddö, Blidö, Grisslehamn och Arholma.

Mer: [Gästhamnar i Stockholms skärgård](/blogg/gasthamnar-guide) och [Badplatser i Stockholms skärgård](/blogg/basta-badplatserna).
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

<!-- RÅD: packlistan är Svallas checklista, inte myndighetskrav (2026-09-24) -->
## Säkerhetsutrustning

- Flytvästar till samtliga ombord (rätt storlek!)
- Kastkrans med lina
- Nödbloss
- Kompass (fungerande, ej bara GPS)
- Sjökort för området – i app och gärna på papper som reserv
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
   title: 'Havsbastu i skärgården – bastur vid hamnar och öar',
   excerpt: 'Här finns bastu vid vattnet i Stockholms skärgård: vedeldad bastu på Bullerö, bastu att hyra i Källviken på Grinda, Kryssarklubbens uthamn på Runmarö och gästhamnar med bastu från Furusund till Nynäshamn.',
   category: 'Aktiviteter',
   date: '2026-03-10',
   updatedAt: '2026-09-24',
   readTime: '5 min',
   emoji: '🧖',
   tags: ['Havsbastu', 'Bastu skärgården', 'Bastu', 'Gästhamn', 'Stockholms skärgård'],
   // KÄLLA: grinda.se/aktiviteter/ ("Bastu / Sauna Källviken 1 tim / hour 1-4 pers.", datafix 2026-09-23), skargardsstiftelsen.se/omraden/fejan/, ingmarsogasthamn.se, svenskagasthamnar.se/stockholms-skargard/nynashamn/ – se KÄLLA-kommentaren i content.
   faqs: [
     { q: 'Var finns havsbastu i Stockholms skärgård?', a: 'Bland annat på Bullerö i Nämdöskärgårdens nationalpark, i Källviken på Grinda och i Svenska Kryssarklubbens uthamn i Norrviken på Runmarö. Många gästhamnar har också bastu, till exempel Fejan, Furusund, Ingmarsö, Finnhamn, Sandhamn, Utö, Nåttarö och Dalarö.' },
     { q: 'Kan man hyra bastun på Grinda?', a: 'Ja. Grinda Wärdshus hyr ut bastun i Källviken per timme för en till fyra personer.' },
     { q: 'Ingår bastu i hamnavgiften?', a: 'Det varierar. På Fejan ingår bastu i hamnavgiften enligt Skärgårdsstiftelsen, och i Nynäshamns gästhamn anger Svenska Gästhamnar att bastu ingår. På Ingmarsö kostar bastun extra och bokas via gästhamnen.' },
   ],
   content: `
<!-- KÄLLA (lästa 2026-09-24): lansstyrelsen.se/stockholm/besoksmal/nationalparker/namdoskargardens-nationalpark.html ("Bullerö är nationalparkens entré. I byn finns ett gästhem med utekök som är öppet under högsäsong och en varm raststuga och vedeldad bastu som är öppna året om."). sverigesnationalparker.se Nämdöskärgården, Övernatta i parken ("På Bullerö har du också tillgång till ett servicehus med dricksvatten, toalett och dusch, grill och utekök. Där finns även möjlighet att hyra en vedeldad bastu."). grinda.se/aktiviteter/ ("Hyr en kajak, Stand Up Paddle boards eller bastu:"; "Boka bastu"; prislistan "Bastu / Sauna Källviken 1 tim / hour 1-4 pers." enligt datafix 2026-09-23; Grinda Sea Lodge: "Här kan du äta grillad mat, basta, paddla kajak"; Sea Lodge på södra sidan enligt svenskaturistforeningen.se, se island-data grinda). lansstyrelsen.se Grinda naturreservat ("Ytterligare ett fint bad finns vid Källviken."). sxk.se/bojar-hamnar-och-farleder/hamnar/uthamnar (Norrviken, Runmarö: "I uthamnen finns under sommaren en vedeldad bastu, OBS, använd EJ sjövatten vid vattenkastning."; "Uthamnarna är tillgängliga för alla båtturister, även för icke SXK-medlemmar."). skargardsstiftelsen.se/omraden/fejan/ ("Hamnavgiften inkluderar tillgång till dusch, toalett och bastu."). furusund.se/hamnen/ ("I vår gästhamn finns plats för upp till hundra båtar. I hamnen finner du toalett, dusch, bastu, el och vatten samt tvättmöjligheter."). svenskagasthamnar.se/stockholms-skargard/furusund/ ("Vill du hyra vår bastuflotte och jacuzzi? Kontakta receptionen !"). ingmarsogasthamn.se ("Dricksvatten, bastu, tvättmaskin, landström och cykel finns att tillgå mot avgift."; menyval "BOKA BASTU"). skargardsstiftelsen.se/omraden/finnhamn/ ("vandrarhem, stugby, tältplats, flera gästhamnar, bastu, badstrand, kafé"). ksss.se/hamnar/sandhamn/ ("I anslutning till hamnen finns duschar, toaletter och bastu.") och svenskagasthamnar.se/stockholms-skargard/sandhamn-lokholmen/ (tjänstetabell "Bastu" markerad). utogasthamn.se ("Vi erbjuder båtplatser för både stora och små båtar med tillgång till el, vatten, bastu, dusch och toalett."; "Närmsta bryggan till Utö Gästhamn är Gruvbryggan."). nattaro.se/gasthamn/ ("Vår gästhamn ligger vid Kvarnviken."; "Här finner ni toaletter, duschar och bastu."). creapreneur.se/dalaro-information ("rena, moderna och tillgängliga toaletter, duschar, bastu, tvättstuga"; Dalarö gästhamn "i Askfatshamnen"). svenskagasthamnar.se/stockholms-skargard/nynashamn/ (tjänstetabell "Bastu ingår"). svenskagasthamnar.se/stockholms-skargard/landsort-norrhamnen/ (tjänstetabell: bastu finns i hamnen). nacka.se Saltsjöbaden ("Saltsjöbadens friluftsbad är ett anrikt friluftsbad med separata badhus för herr- och dambad, bastu och vinterbad."; "Saltsjöbanan till station Saltsjöbaden. Därefter promenad ca 500 meter."; datafix 2026-09-22). grisslehamnsmarina.se ("Premiäröppning av vår vedeldade bastuflotte med badstege"; "i vår nya bastuflotte – med bästa läget, precis intill baren"; datafix 2026-09-22). Tidigare version (borttagen 2026-09-24): "Utö Värdshus Havsbastu" (ingen bastu nämns på utovardshus.se; bastun på Utö finns i Utö gästhamn), "Dalarö Havsbastu" (anläggningen gick inte att hitta; Dalarö gästhamn har bastu), en "liten bastukoja vid gästhamnen i Sandhamn" (KSSS anger bara bastu i anslutning till hamnen), "Naturhamnsbastun på Möja" som skulle erbjudas av en sommargäst (obelagd), bastubåtar via "skärgårdsbastuuthyrning.se" (obelagd), temperaturerna 85 och 15 grader, stjärnbetyg, påståenden om hälsa och gemenskap samt bastuetikett utan källa. -->
Bastu vid vattnet finns både fristående på öarna och i gästhamnarna. Här är de bastur i Stockholms skärgård som går att belägga hos Länsstyrelsen, Skärgårdsstiftelsen, Svenska Kryssarklubben och verksamheternas egna sidor. Säsong och bokning skiljer sig åt, så kolla med respektive ställe innan du åker.

## Bastu på öarna

### Bullerö, Nämdöskärgårdens nationalpark
På [Bullerö](/o/bullero), nationalparkens entré, finns en vedeldad bastu. Enligt Länsstyrelsen är bastun och den varma raststugan öppna året om, och enligt Sveriges nationalparker är bastun öppen för alla och går inte att boka. I servicehuset finns dricksvatten, toalett, dusch, grill och utekök.

### Källviken, Grinda
Grinda Wärdshus hyr ut bastun i Källviken per timme för en till fyra personer. Vid Källviken finns också en badplats. Grinda Sea Lodge på öns södra sida har också bastu. Se [Källvikens bastu](/upptack/kallvikens-bastu) och [Grinda](/o/grinda).

### Norrviken, Runmarö
I Svenska Kryssarklubbens uthamn i Norrviken på [Runmarö](/o/runmaro) finns en vedeldad bastu under sommaren. SXK ber besökarna att inte använda sjövatten när de kastar vatten på stenarna. Uthamnen är öppen för alla båtturister. Se [Kryssarklubbens uthamn](/upptack/kryssarklubbens-uthamn).

## Gästhamnar med bastu
- [Fejan](/o/fejan) – hamnavgiften inkluderar dusch, toalett och bastu.
- [Furusund](/o/furusund) – bastu i gästhamnen, som har plats för upp till hundra båtar. Bastuflotte och jacuzzi hyrs via receptionen.
- [Ingmarsö](/upptack/ingmarso-gasthamn) – bastu mot avgift, bokas via gästhamnen.
- [Finnhamn](/upptack/finnhamn) – bastu finns bland öns anläggningar.
- [Sandhamn](/upptack/ksss-gasthamn-sandhamn) – KSSS har duschar, toaletter och bastu i anslutning till hamnen, och på [Lökholmen](/upptack/ksss-gasthamn-lokholmen-trollsundet) finns också bastu.
- [Utö gästhamn](/upptack/gruvbryggan) – båtplatser med el, vatten, bastu, dusch och toalett. Närmaste brygga är Gruvbryggan.
- [Nåttarö gästhamn](/upptack/nattaro-nya-gasthamn) i Kvarnviken – toaletter, duschar och bastu.
- [Dalarö gästhamn](/upptack/dalaro-turistbyra-och-gasthamn-askfatshamnen) i Askfatshamnen – toaletter, duschar, bastu och tvättstuga.
- **Nynäshamns gästhamn** – enligt Svenska Gästhamnar ingår bastu.
- **Landsort, Norrhamnen** – enligt Svenska Gästhamnar finns bastu för upp till sex personer. Se [Landsort](/o/landsort).

## På fastlandet och i Roslagen
- [Saltsjöbadens friluftsbad](/upptack/saltsjobadens-friluftsbad) i Nacka har separata badhus för dam och herr, bastu och vinterbad. Från Saltsjöbanans station Saltsjöbaden är det ungefär 500 meter att gå.
- [Grisslehamns marina](/upptack/grisslehamns-marina-och-camping) har en vedeldad bastuflotte med badstege intill baren.

## Mer att läsa
- [Gästhamnar i Stockholms skärgård](/blogg/gasthamnar-guide)
- [Naturhamnar i Stockholms skärgård](/blogg/naturhamnar-stockholm-skargard)
- [Eftersäsong i skärgården](/blogg/eftersasong-skargard-oktober)
   `,
 },

 'segling-klassiska-leder': {
   title: 'Farleder i Stockholms skärgård – guide för seglare',
   excerpt: 'Farlederna in mot Stockholm via Sandhamn, Landsort och Tjärven enligt Sjöfartsverket, hur du läser sjömärkena, vad som gäller för segelbåtar i trång farled och gästhamnar längs lederna.',
   category: 'Segling',
   date: '2026-02-25',
   updatedAt: '2026-09-24',
   readTime: '6 min',
   emoji: '',
   tags: ['Farleder', 'Segling', 'Stockholms skärgård', 'Sjömärken', 'Sjövägsregler'],
   // KÄLLA: sjofartsverket.se lotsområde Stockholm, Riktvärden och restriktioner; sjofartsverket.se Flytande sjömärken; TSFS 2009:44 regel 9 b – se KÄLLA-kommentaren i content.
   faqs: [
     { q: 'Vilka farleder går in mot Stockholm?', a: 'Sjöfartsverket anger bland annat farlederna Stockholm–Sandhamn, Landsort–Stockholm, Stockholm via Tjärven (den norra farleden), Simpnäs–Stockholm och Möjaleden. Landsortsleden ansluter till Sandhamnsleden i Kanholmsfjärden.' },
     { q: 'Vilken sida ska de röda prickarna vara på?', a: 'Röda märken är babordsmärken och gröna är styrbordsmärken. De sätts ut efter huvudriktningen, som går från sjön in mot hamnarna. På väg in har du alltså röda märken om babord och gröna om styrbord.' },
     { q: 'Har segelbåten företräde i farleden?', a: 'Inte alltid. Enligt sjövägsreglerna får segelfartyg och fartyg under 20 meter inte hindra ett fartyg som bara kan framföras säkert i en trång farled, till exempel en färja eller ett fraktfartyg.' },
   ],
   content: `
<!-- KÄLLA (lästa 2026-09-24): sjofartsverket.se/sv/tjanster/lotsning/lotsomrade-stockholm/lotsbestallning2/stockholm/ (farledslista: "Simpnäs - Stockholm (max djupg. 7m)", "Landsort - Stockholm (max djupg. 10m)", "Möjaleden (max djupg. 7m)", "Stockholm via Tjärven", "Stockholm-Sandhamn"). Undersidan stockholm-sandhamn ("Stockholm via Sandhamn Max djupgående 11 m"; "Sandhamn / Revengegrundet to Stockholm"). Undersidan stockholm-via-tjarven ("Stockholm via Tjärven Max djupgående 9 m"; "Northern fairway"). sjofartsverket.se lotsområde Södertälje, Landsortsleden ("Landsortsleden sträcker sig från Landsort över Mysingen, Jungfrufjärden, Nämdöfjärden till Kanholmsfjärden där den ansluter till Sandhamnsleden."; "För farleden genom Ornöström är maximalt djupgående 5,5 m."; "I området kring Dalarö finns flera ankarplatser utmärkta i sjökortet. Ankringsförbud råder på flera platser inom området och finns utmärkta i sjökorten."). Samma område, Stockholmsleden ("Stockholmsleden sträcker sig från Södra Björkfjärden till Danviksbron via Hammarbyslussen."; "Farleden från Södertälje till Stockholm, Lövholmen samt Hässelby har ett maximalt djupgående på 6,0 m."; "Stockholmsleden korsas av fyra öppningsbara broar."). sjofartsverket.se/sv/tjanster/transporter-och-farleder2/farleder-och-underhall/sjomarken/flytande-sjomarken/ ("Lateralmärken utsättes efter utmärkningens huvudriktning. Denna följer i princip den svenska kusten från Strömstad till Haparanda och i övrigt från sjön in mot hamnarna."; Babordsmärke "Färg: Röd", "Cylindrisk boj (plattboj)", topptecken "En röd cylinder"; Styrbordsmärke "Grön", "Konisk boj (spetsboj)", "En grön kon med spetsen uppåt"; "Kardinalmärke namnges efter den kvadrant (nord, ost, syd eller väst) i vilken det är placerat i bäring från grundet eller hindret. Märket ska passeras i samma väderstreck som namnet anger."). TSFS 2009:44 sjövägsregler (se KÄLLA i segling-nyborjare-guide): regel 9 b ("Fartyg med en längd under 20 meter och segelfartyg får inte hindra ett annat fartygs passage om det fartyget endast kan framföras säkert i en trång farled"), regel 18 a ("Ett maskindrivet fartyg på väg ska hålla undan för ... segelfartyg"). trafikverket.se Furusundsleden ("Furusundsleden går mellan Furusund och Yxlan i Stockholms skärgård"; "Färjeledens längd är 600 meter"; island-data furusund). ksss.se/hamnar/sandhamn/ ("Det finns ca 150 gästplatser på Sandhamn."; "I hamnbassängen nedanför Seglarhotellet förtöjer man med hjälp av mooringlinor som är fästa vid bryggorna."; "ANKRING FÖRBJUDEN."; "Passbåten tar er över från Sandhamn till det lite lugnare Lökholmen. Här finns plats för ca 200 gästande båtar."; datafix 2026-09-22). svenskagasthamnar.se/stockholms-skargard/furusund/ ("100 st (10 st bokningsbara) boj/y-bom/Mooring"; Diesel, Bensin markerade). svenskagasthamnar.se/stockholms-skargard/waxholm-vaxholm/ ("Gästhamnen är placerad mitt i centrum"; gästplatser "110", förtöjning "bom,mooring linor"). creapreneur.se/dalaro-information ("på Dalarös sydvästra sida söderifrån före Dalarö kanal."; Dalarö gästhamn "i Askfatshamnen"; datafix 2026-09-22). utogasthamn.se ("I vår gästhamn finns plats för ca 300 fritidsbåtar."). svenskagasthamnar.se/stockholms-skargard/nynashamn/ ("Gästplatser" "300", förtöjning "bom/boj"). Tidigare version (borttagen 2026-09-24): "Stockholmsleden" beskrevs som leden från Lidingöbron till Sandhamn, cirka 40 NM, via Baggensfjärden och Baggenskanalen (fel: Sjöfartsverkets Stockholmsleden går från Södra Björkfjärden till Danviksbron via Hammarbyslussen; leden mot Sandhamn heter Stockholm–Sandhamn/Sandhamnsleden). "Furusundsleder" från Vaxholm via Furusund och Blidösund till Grisslehamn (obelagt; Furusundsleden är enligt Trafikverket vägfärjeleden Furusund–Yxlan). "Sandhamnsleden (södra)" mot Dalarö, Utö och Landsort (fel: söderut går Landsortsleden, som ansluter till Sandhamnsleden i Kanholmsfjärden). Pricksystemet var omvänt – "röda prickar till styrbord ... på väg in mot Stockholm" (fel: röda är babordsmärken i huvudriktningen in mot hamn). Borttaget utan källa: sjökortsserie "SSPA ... serien 5 och 6", VHF-kanal 77 och att VHF skulle vara obligatorisk, "svala strömmar" vid Blidösund, att Sandhamn, Furusund och Utö är fullbokade de flesta helger, "världens tätaste nät av märkta seglarleder", "Björn (kafébrygga)", svårighetsgrader och gästhamnen "Nacka". -->
Från havet går flera farleder in mot Stockholm. Där går färjor och fraktfartyg, och som seglare följer eller korsar du dem ofta. Här är lederna enligt Sjöfartsverket, reglerna för segelbåtar i farled, sjömärkena och gästhamnar längs vägen.

## Farlederna in mot Stockholm
Sjöfartsverkets lotsområde Stockholm listar bland annat de här farlederna:
- **Stockholm–Sandhamn** – från Sandhamn och Revengegrundet in till Stockholm, för fartyg med upp till 11 meters djupgående.
- **Landsort–Stockholm** – upp till 10 meters djupgående.
- **Stockholm via Tjärven** – den norra farleden, upp till 9 meters djupgående.
- **Simpnäs–Stockholm** och **Möjaleden** – upp till 7 meters djupgående.

### Landsortsleden
<!-- KÄLLA: Sjöfartsverket, farleder i lotsområde Stockholm: "För farleden genom Ornöström är maximalt djupgående 5,5 m." (se kommentaren överst) -->
Landsortsleden går från Landsort över Mysingen, Jungfrufjärden och Nämdöfjärden till Kanholmsfjärden, där den ansluter till Sandhamnsleden. Genom Ornöström är största djupgående 5,5 meter. Kring Dalarö finns flera ankarplatser och på flera platser ankringsförbud – båda är utmärkta i sjökortet.

### Stockholmsleden går inte mot Sandhamn
Namnet kan förvirra: Sjöfartsverkets Stockholmsleden går från Södra Björkfjärden till Danviksbron via Hammarbyslussen och korsas av fyra öppningsbara broar. Det är alltså leden från Södertäljehållet, inte leden ut mot Sandhamn.

## Segelbåt i farleden
- Ett maskindrivet fartyg på väg ska hålla undan för ett segelfartyg.
- Men i en trång farled får segelbåtar och fartyg under 20 meter inte hindra ett fartyg som bara kan framföras säkert i farleden – till exempel en färja eller ett fraktfartyg.
- Tänk också på vägfärjorna. Furusundsleden, till exempel, är enligt Trafikverket färjeleden mellan Furusund och Yxlan, 600 meter lång.

Mer om väjningsreglerna: [Börja segla](/blogg/segling-nyborjare-guide).

## Så läser du sjömärkena
- **Huvudriktningen** följer i princip kusten från Strömstad till Haparanda, och i övrigt går den från sjön in mot hamnarna.
- **Babordsmärken** är röda, har formen av en cylindrisk boj (plattboj) eller prick och har en röd cylinder som topptecken.
- **Styrbordsmärken** är gröna, har formen av en konisk boj (spetsboj) eller prick och har en grön kon med spetsen uppåt som topptecken.
- På väg in mot hamn har du alltså röda märken om babord och gröna om styrbord. På väg ut är det tvärtom.
- **Kardinalmärken** heter nord, ost, syd eller väst efter var de står i förhållande till grundet, och ska passeras i samma väderstreck som namnet anger.

## Gästhamnar längs lederna
- [Sandhamn](/o/sandhamn) – [KSSS gästhamn](/upptack/ksss-gasthamn-sandhamn) har cirka 150 gästplatser. I hamnbassängen nedanför Seglarhotellet förtöjer man med mooringlinor, och ankring är förbjuden. Passbåten går till Lökholmen, med plats för cirka 200 båtar.
- [Vaxholm](/o/vaxholm) – [gästhamnen](/upptack/waxholms-gasthamn-och-rent-under-batbotten-tvatt) ligger mitt i centrum och har 110 gästplatser vid bom eller mooringlinor.
- [Furusund](/o/furusund) – plats för 100 båtar, varav 10 bokningsbara, vid boj, y-bom eller mooring. Svenska Gästhamnar anger diesel och bensin.
- [Dalarö](/o/dalaro) – [gästhamnen](/upptack/dalaro-turistbyra-och-gasthamn-askfatshamnen) ligger i Askfatshamnen på Dalarös sydvästra sida, före Dalarö kanal om du kommer söderifrån.
- [Utö](/o/uto) – gästhamnen har plats för cirka 300 fritidsbåtar.
- **Nynäshamn** – 300 gästplatser vid bom eller boj.

Fler hamnar: [Gästhamnar i Stockholms skärgård](/blogg/gasthamnar-guide), [Naturhamnar i Stockholms skärgård](/blogg/naturhamnar-stockholm-skargard) och [Sjömackar i skärgården](/blogg/bransle-ankring-skargard).
   `,
 },

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
Efter högsäsongen stänger en del av skärgården, men inte allt. Båtarna till de större öarna går året runt, en del pubar och butiker har öppet och Nämdöskärgårdens nationalpark på Bullerö är ny sedan 2025. Här är vad som gäller, ställe för ställe, med källa. Kolla alltid aktuella tider innan du åker.

## Öar med båt året runt
- [Sandhamn](/o/sandhamn): Waxholmsbolaget går dit året runt via Stavsnäs, och Stavsnäs Båttaxis Sandhamnslinje har hösttidtabell fram till 20 december. Cinderella från Strandvägen slutar för säsongen i slutet av september.
- [Grinda](/o/grinda): enligt Länsstyrelsen trafikeras Norra och Södra bryggan året om av Waxholmsbolaget och Cinderella.
- [Utö](/o/uto): Waxholmsbåt året om från Årsta brygga till Gruvbryggan.
- [Vaxholm](/o/vaxholm): en stad med liv året runt, och i december hålls Vaxholms julmarknad.

## Äta och bo efter högsäsongen
- **Sandhamns Värdshus:** puben är öppen året runt. Restaurangen har öppet främst på helger utanför perioden mitten av juni–mitten av september, och boendet i Missionshuset har frukost.
- **Seglarhotellet på Sandhamn:** julbord från slutet av november till julafton.
- **Möja:** Coop i Berg har öppet året runt, och STF Möja vandrarhem har öppet april–december.
- **Gällnö:** STF-vandrarhemmet har öppet året runt, men krogen stänger i slutet av augusti.

## Det som stänger
- Dykarbaren på Sandhamn har säsong maj–september.
- Finnhamns Café & Krog har öppet juni–augusti enligt Upptäck Skärgården.
- Fjäderholmarna har säsongsöppet under sommarhalvåret.
- KSSS servicehus med dusch och toalett i Sandhamns gästhamn är öppna maj–september.
- På Waxholmsbolagets båtar har vissa fartyg begränsad servering under vintertidtabellen, december–april.

## Bullerö och nationalparken
Nämdöskärgårdens nationalpark invigdes 5 september 2025 och är Sveriges första marina nationalpark i Östersjön – 97 procent av ytan är hav. Huvudentrén ligger på Bullerö, där bastun är öppen för alla och inte går att boka. Mer: [Bullerö](/o/bullero).

## Tänk på
- Hunden får inte springa lös i naturen 1 mars–20 augusti, och i naturreservat och nationalparker ska den ha koppel hela året.
- Färre avgångar på hösten: kolla tidtabellen för både ut- och hemresan.
- Fler ställen som har öppet: [Öppet i skärgården efter säsong](/blogg/eftersasong-skargard-oktober).
   `,
   faqs: [
     { q: 'Går skärgårdsbåtarna på hösten?', a: 'Ja, till de större öarna. Waxholmsbolaget går till Sandhamn året runt via Stavsnäs, till Grinda året om och till Utö året om från Årsta brygga. Cinderellabåtarna till Sandhamn har säsong (2026: 30 april–27 september).' },
     { q: 'Vad har öppet på Sandhamn på hösten?', a: 'Sandhamns Värdshus pub är öppen året runt, och restaurangen har främst öppet på helger utanför högsäsongen. Seglarhotellet har julbord från slutet av november till julafton.' },
     { q: 'Kan man bada bastu i skärgården på hösten?', a: 'Ja, på Bullerö i Nämdöskärgårdens nationalpark finns en bastu som är öppen för alla och inte går att boka.' },
   ],
 },

 'dagstur-skargard-fyra-timmar': {
   title: 'Dagstur till skärgården – sex öar och båtarna dit',
   excerpt: 'Dagstur till skärgården från Stockholm utan egen båt: restid, båtar och vad som finns på Fjäderholmarna, Vaxholm, Grinda, Möja, Utö och Sandhamn, plus biljettreglerna på Waxholmsbåten.',
   category: 'Guide',
   date: '2026-07-27',
   updatedAt: '2026-09-24',
   readTime: '6 min',
   emoji: 'compass',
   tags: ['Dagstur', 'Stockholm', 'Kollektivt', 'Waxholmsbolaget', 'Planering'],
   content: `
<!-- KÄLLA (läst 2026-09-24 om inget annat anges). Fjäderholmarna (se /blogg/fjaderholmarna-dagstur och island-data.ts): stromma.com/sv-se/stockholm/utflykter/dagsutflykter/fjaderholmarna/ ("Avgår från: Strandvägen & Nacka Strand"; "Strandvägen - Kajplatsområde 13"; "Endast 30 minuters båtresa från city"; "ÅTER MAJ 2027"; läst 2026-09-21); Waxholmsbolaget tabell 2 (kund.printhuset-sthlm.se/wa/h2.pdf, gäller 2 april–18 juni och 17 augusti–12 december 2026; Fjäderholmarna angörs på vissa turer, "X = trafikeras utan fast avgångstid"); fjaderholmarna.se (Restaurang Rökeriet, Fjäderholmarnas Krog, Fjäderholmarnas Bryggeri, hantverkare inom trä, textil, keramik och glas; "Fjäderholmarna har nu säsongsöppet"); explorearchipelago.com (klippbad med utsikt över Stockholms inlopp). Vaxholm (se /blogg/vaxholm-guide och island-data.ts): Waxholmsbolaget tabell 11 (kund.printhuset-sthlm.se/wa/h11.pdf) Strömkajen–Vaxholm ca 55–70 min; SL buss 670 Tekniska högskolan–Vaxholm; sfv.se Vaxholms kastell ("På ön Vaxholmen ett stenkast från skärgårdens huvudstad Vaxholm"; museet invigt 1964); datafix Hamnkrogen ("Söderhamnen 10"). Grinda (se /blogg/grinda-guide-2026 och island-data.ts): Waxholmsbolagets reseplanerare, läst 2026-09-19 (linje 14 Strömkajen–Södra Grinda 1 tim 45 min, linje 13 1 tim 50 min); stockholmarchipelagotrail.com/sv/section/etapp-grinda/ ("Du åker till Grinda från Vaxholm och Värmdö året om"); grinda.se Wärdshuset, Framfickan ("endast drop-in") och Lanthandel & café (frukost och enklare luncher); skargardsstiftelsen.se/omraden/grinda (badplatsen Källviken); lansstyrelsen.se Grinda (natur- och kulturstig "cirka 2,5 km", "Stigen startar vid gården Hemviken"). Möja (se /blogg/dolda-parlor-moja och /blogg/cykling-moja-gallno): varmdo.se Möja.pdf ("åka buss 434 från Slussen till Sollenkroka ... restid ca 2,5 timme"; "båt från Strömkajen tar ca 3-4 timmar"); visitmoja.se (Hamncafét "Café med glass och bullar samt cykeluthyrning"; naturstig Hamn–Ramsmora 12 km); konsummoja.se (Coop Berg "öppet året runt"); rolandsvenssonmuseet.se (museet vid Ramsmora ångbåtsbrygga). Utö (se /blogg/uto-guide och island-data.ts): lansstyrelsen.se Utö ("Pendeltåg till Västerhaninge. Buss till Årsta brygga. Waxholmsbåt året om till Gruvbryggan"); SL linje 846 (kund.printhuset-sthlm.se/sl/v846.pdf, giltig 17 augusti–12 december 2026: Västerhaninge station 05.32 → Årsta brygga 05.46, 14.32 → 14.49; "Tidtabellen är anpassad till pendeltåg från Stockholm vid Västerhaninge station."); Waxholmsbolaget tabell 21 (kund.printhuset-sthlm.se/wa/h21.pdf, "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026": Årsta brygga 20.35 → Gruvbryggan 21.10 och 08.25 → 09.40; "b Beställ resan i SL-appen, på Waxholmsbolagets webb eller via kundtjänst 08-600 10 00 minst 1 timme innan avgång från aktuell brygga, dock senast kl. 17.00."); utovardshus.se/kontakt/hitta-hit/ ("Båt utgår även från Nynäshamn till grannön Ålö som har broförbindelse till Utö"); skargardsstiftelsen.se/omraden/uto ("Utö är en riktig cykel-ö med möjlighet att hyra dagsvis"; "Sveriges äldsta bevarade väderkvarn"); utovardshus.se (Utö Värdshus i gamla gruvkontoret, à la carte lunch och middag; Seglarbaren "BAREN MITT I HAMNEN"); utogasthamn.se (Hamnboden "kiosk, café och restaurang i samma byggnad"). Sandhamn (se /blogg/sandhamn-guide-2026 och island-data.ts): sandhamn.com/en/hitta-hit ("Take bus 433 from Slussen … Approx. 1 hour by bus"); Waxholmsbolaget tabell 16 (Stavsnäs 10.40 → Sandhamn 11.20, 06.05 → 06.55, 09.45 → 10.45); battaxi.se/sandhamnslinjen-2 ("mellan Stavsnäs och Sandhamn på endast 30 minuter"); Strömma Cinderella 2026 (30/4–27/9, "Strandvägen - kajplats 14" 10:00 → Sandhamn 12:30); Waxholmsbolaget tabell 15 ("GÄLLER 19 JUNI 2026 – 16 AUGUSTI 2026", Strömkajen 10.00 → Sandhamn 13.45); varmdo.se Trouville (vit sand, "ca 20 min" promenad) och Sandhamnsstigen ca 8 km; Sandhamns Värdshus pub öppen året runt (se /blogg/basta-restaurangerna-sandhamn). Biljetter (läst 2026-09-19): waxholmsbolaget.se/biljetter-och-priser/mer-om-biljetter/alla-sl-biljetter-galler-mellan-44-bryggor ("Du kan resa med SL-biljett i skärgårdstrafiken mellan Strömkajen i innerstan och Vaxholm med omnejd"; "SL-biljetter gäller endast på de linjer som går via Vaxholm"; exemplet Strömkajen–Grinda: SL-biljett till Vaxholm plus Waxholmsbolaget-biljett Vaxholm–Grinda; SL-biljett gäller inte linje 17, 18 och 19); sl.se/biljetter/sortiment-och-regler/biljetter-for-resor-med-waxholmsbolagets-skargardsbatar (lågsäsong 14 september–29 april gäller SL-periodbiljetter på 30 dagar eller mer i hela trafiken; högsäsong 30 april–13 september krävs Waxholmsbolaget-biljett utanför SL-området); waxholmsbolaget.se/biljetter-och-priser/Enkelbiljetter/enkelbiljett-180-minuter (köps i SL-appen eller ombord). waxholmsbolaget.se/att-resa-med-oss/vad-du-far-ta-med (läst 2026-09-24, se /blogg/cykling-moja-gallno): "Du får ta med en vanlig cykel ombord i mån av plats. Att ta med cykeln kostar inget extra". Tidigare version (borttagen 2026-09-24): påståendet att "SL-kortet gäller inte på Waxholmsbåtarna" (fel – SL-biljett gäller Strömkajen–Vaxholm med omnejd, och SL-periodbiljett 30 dagar+ i hela trafiken 14/9–29/4) och att biljetter köps i en "Waxholmsbolaget-appen" (de säljs i SL-appen och ombord); "avgångar från Strömkajen och Nybrokajen nästan varje timme"; Fjäderholmarna från "Strömkajen, Nybroplan eller Slussen" var 30:e minut på 25 minuter och en "pub"; Vaxholm 55–65 min, "Vaxholm Stadshotells restaurang" och en "snabbfärja" som sparar 20 minuter; Grinda "2–3 avgångar per dag", "cirka 1,5 timme", "yttreskärgårdens", "vandringsstig runt ön (ca 2 km)" och att Wärdshuset är fullt sommarlördagar; Möja via Stavsnäs med "pendeltåg till Hässelby" (Möja nås via Sollenkroka), "ca 2 timmar från Strömkajen", "bilfria", cykelpris "150–200 kr/dag", "cykla runt hela ön (ca 15 km)" och "Möja Krog"; Utö "gruvmuseum" och "havsbastu" utan källa, att Gruvbryggan är beställningsbrygga "på de flesta avgångar" (det gäller flera, inte de flesta, turer), uppgiften om Utö Sjötransporters fraktfärja (inte kontrollerad i denna omgång) och "ca 10 km grusväg" från Ålö (Stockholm Archipelago Trail anger 12 km cykelväg Båtshaket–Gruvbryggan); Sandhamn "snabbgående, ca 40 min"; "Det finns inga taxi-alternativ till havs" (taxibåt finns); värdeord. -->
Sex öar du når från Stockholm på en dag utan egen båt, med restid enkel väg enligt operatörernas tidtabeller. Till Fjäderholmarna och Vaxholm tar båten en timme eller mindre. Till Grinda, Möja, Utö och Sandhamn är resan längre, och restiden står under varje ö.

## Fjäderholmarna – cirka 30 minuter
- **Båt:** Strömmas båt från Strandvägen kajplats 13 eller Nacka Strand, cirka 30 minuter. Den går under sommarhalvåret. Vår och höst lägger Waxholmsbolagets linje 2 till vid Fjäderholmarna på vissa turer, utan fast tid.
- **På ön:** Rökeriet, Fjäderholmarnas Krog, bryggeriet och hantverkare inom trä, textil, keramik och glas, med säsongsöppet. Bad från klipporna med utsikt över Stockholms inlopp.

Mer: [Fjäderholmarna dagstur](/blogg/fjaderholmarna-dagstur).

## Vaxholm – ungefär en timme
- **Båt och buss:** Waxholmsbolagets båt från Strömkajen tar ungefär en timme. Buss 670 går från Tekniska högskolan.
- **På ön:** Vaxholms kastell på ön Vaxholmen, ett stenkast från staden, med museum. Hamnkrogen ligger vid Söderhamnen.

Mer: [Vaxholm dagstur](/blogg/vaxholm-guide).

## Grinda – 1 timme 45–50 minuter
- **Båt:** Waxholmsbolagets linje 14 (1 timme 45 minuter) eller linje 13 (1 timme 50 minuter) från Strömkajen. Båtarna går året om.
- **På ön:** Grinda Wärdshus, hamnkrogen Framfickan (endast drop-in) och lanthandelns café med frukost och enklare luncher. Bad vid Källviken och en natur- och kulturstig på cirka 2,5 kilometer som börjar vid gården Hemviken.

Mer: [Grinda guide](/blogg/grinda-guide-2026).

## Möja – cirka 2,5 timmar
- **Buss och båt:** buss 434 från Slussen till Sollenkroka och båt därifrån, cirka 2,5 timmar enligt Värmdö kommun. Båt hela vägen från Strömkajen tar cirka 3–4 timmar.
- **På ön:** Hamncafét hyr ut cyklar, Coop i Berg har öppet året runt och Roland Svensson-museet ligger vid Ramsmora brygga. Naturstigen mellan Hamn och Ramsmora är 12 kilometer.

Mer: [Möja](/blogg/dolda-parlor-moja).

## Utö – pendeltåg, buss och båt
- **Resväg:** pendeltåg till Västerhaninge och buss 846 till Årsta brygga, 14–17 minuter. Bussen är anpassad till pendeltågen. Waxholmsbåten därifrån tar 35–75 minuter till Gruvbryggan enligt höst- och vårtidtabellen, och går året om.
- **Beställ:** på flera turer ska resan beställas i SL-appen, på Waxholmsbolagets webb eller via kundtjänst minst en timme före avgång, senast klockan 17.
- **Från Nynäshamn:** båt går till grannön Ålö, som har broförbindelse till Utö.
- **På ön:** gruvbyn med Sveriges äldsta bevarade väderkvarn, cykeluthyrning dagsvis, Utö Värdshus, Seglarbaren i hamnen och Hamnboden.

Mer: [Utö guide](/blogg/uto-guide).

## Sandhamn – via Stavsnäs
- **Buss och båt:** buss 433 från Slussen till Stavsnäs, ungefär en timme. Därifrån Waxholmsbolagets linje 16 på 40–60 minuter eller Sandhamnslinjen på 30 minuter, året runt.
- **Direkt från stan:** Cinderella från Strandvägen kajplats 14 tar 2 timmar 30 minuter och gick säsongen 2026 30 april–27 september. Waxholmsbåten från Strömkajen går bara sommartid (2026: 19 juni–16 augusti) och tar minst 3 timmar 45 minuter.
- **På ön:** Trouville, en strand med vit sand cirka 20 minuters promenad från hamnen, och Sandhamnsstigen på cirka 8 kilometer. Sandhamns Värdshus har pub som är öppen året runt.

Mer: [Sandhamn guide](/blogg/sandhamn-guide-2026).

## Biljetter och cykel
- **SL-biljett** gäller mellan Strömkajen och Vaxholm med omnejd, på linjer som går via Vaxholm. Till Vaxholm räcker alltså SL-biljetten.
- **Längre ut** behövs Waxholmsbolaget-biljett 30 april–13 september, till exempel på sträckan Vaxholm–Grinda. 14 september–29 april gäller SL-periodbiljetter på 30 dagar eller mer i hela Waxholmsbolagets trafik.
- **Köp** Waxholmsbolaget-biljetten i SL-appen eller ombord. Strömma, Cinderella och Sandhamnslinjen har egna biljetter.
- **Cykel:** en vanlig cykel får följa med ombord på Waxholmsbåten i mån av plats, utan extra kostnad.
- Alla restider per ö finns under Komma dit, till exempel [Båt till Grinda](/o/grinda/komma-dit) och [Båt till Utö](/o/uto/komma-dit).
   `,
   faqs: [
     // KÄLLA: waxholmsbolaget.se (SL-biljetter mellan 44 bryggor), sl.se (biljetter i Waxholmsbolagets skärgårdsbåtar), Waxholmsbolaget tabell 11 och 21, SL linje 670 och 846 – se KÄLLA-kommentaren i content.
     { q: 'Gäller SL-kortet på Waxholmsbåten?', a: 'SL-biljetter gäller mellan Strömkajen och Vaxholm med omnejd. Längre ut behövs Waxholmsbolaget-biljett 30 april–13 september, medan SL-periodbiljetter på 30 dagar eller mer gäller i hela trafiken 14 september–29 april.' },
     { q: 'Hur lång tid tar båten till Vaxholm?', a: 'Waxholmsbolagets båt från Strömkajen tar ungefär en timme. Buss 670 från Tekniska högskolan är ett alternativ.' },
     { q: 'Kan man göra dagstur till Utö?', a: 'Ja. Pendeltåg till Västerhaninge, buss 846 till Årsta brygga på 14–17 minuter och Waxholmsbåt till Gruvbryggan på 35–75 minuter. På flera turer ska resan beställas minst en timme före avgång.' },
   ],
 },

 'eftersasong-skargard-oktober': {
   title: 'Öppet i skärgården efter säsong – mat, båtar, bränsle och boende',
   excerpt: 'Vad har öppet i Stockholms skärgård i oktober och vintern? Lista med källa: pub och butik som har öppet året runt, båtlinjer som går hela året, sjömackar med automat och vandrarhem som tar emot gäster efter sommaren.',
   category: 'Praktiskt',
   date: '2026-07-27',
   updatedAt: '2026-09-24',
   readTime: '4 min',
   emoji: '🌿',
   tags: ['Eftersäsong', 'Oktober', 'Öppet året runt', 'Stockholms skärgård', 'Höst'],
   content: `
<!-- KÄLLA (ordagranna citat i island-data.ts och supabase/datafix): sandhamns-vardshus.se (puben "Öppet året runt", restaurangen främst helger utanför mitten juni–mitten september); sandhamn.com (julbord 26 november–24 december); konsummoja.se (Coop Berg "öppet året runt"); svenskaturistforeningen.se (STF Gällnö vandrarhem öppet året runt; STF Möja vandrarhem april–december); explorearchipelago.com (Tempo Westerbergs Livs på Sandhamn, ombud för Apoteket och Systembolaget); waxholmsbolaget.se (Sandhamn "turer året runt"; vintertidtabell december–april); lansstyrelsen.se Utö ("Waxholmsbåt året om till Gruvbryggan"); Grinda bryggor "trafikeras året om" (datafix 2026-09-22); battaxi.se/sandhamnslinjen-2 (hösttidtabell 21/9–20/12 2026); svenskagasthamnar.se/stockholms-skargard/husaro/ ("Drivmedel kan köpas med kortautomat året runt"); kymendo.se (tankning "dygnet runt året om med kortautomat", datafix 2026-09-23); sverigesnationalparker.se (bastun på Bullerö "öppen för alla och går inte att boka"); vaxholm.se (julmarknad i december). Tidigare version (borttagen 2026-09-24) angav öppettider för Seglarhotellet, Grinda Wärdshus, "Möja Krog" och gästhamnar i oktober och vattentemperatur 12–15 grader utan källa. -->
Den här listan tar bara med det vi kan belägga: ställen där verksamheten själv eller en myndighet anger att det är öppet året runt eller efter sommaren. Öppettider ändras, så ring eller kolla deras sida innan du åker. Vill du ha inspiration för hösten: [Höst i skärgården](/blogg/host-i-skargarden-2026).

## Mat och butik året runt
- **Sandhamns Värdshus, Sandhamn:** puben är öppen året runt. Restaurangen har främst öppet på helger utanför högsommaren. [Fler ställen på Sandhamn](/blogg/basta-restaurangerna-sandhamn).
- **Seglarhotellet, Sandhamn:** julbord från slutet av november till julafton.
- **Coop Berg, Möja:** öppet året runt.

## Båtar hela året
- **Sandhamn:** Waxholmsbolaget via Stavsnäs året runt. Stavsnäs Båttaxis Sandhamnslinje har hösttidtabell fram till 20 december.
- **Grinda:** enligt Länsstyrelsen trafikeras Norra och Södra bryggan året om.
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
   title: 'Barnvänliga öar och bad i Stockholms skärgård',
   excerpt: 'Öar och bad för barnfamiljer i Stockholms skärgård: långgrunda sandstränder på Nåttarö, barnvänliga bad på Grinda, lekplatser vid Utö och Tenöbadet och barn gratis på Waxholmsbåten.',
   category: 'Familj',
   date: '2026-07-27',
   updatedAt: '2026-09-24',
   readTime: '6 min',
   emoji: 'anchor',
   tags: ['Barnfamilj skärgården', 'Barnvänliga bad', 'Sandstrand', 'Lekplats', 'Stockholms skärgård'],
   faqs: [
     // KÄLLA: waxholmsbolaget.se/biljetter-och-priser/rabatterat-pris ("Barn som är under 7 år gamla reser utan avgift med annan betalande resenär"); waxholmsbolaget.se/att-resa-med-oss/vad-du-far-ta-med ("Du som reser med barn under 7 år får ta med barnvagn utan kostnad")
     { q: 'Reser barn gratis på Waxholmsbåten?', a: 'Barn under 7 år reser utan avgift med en annan betalande resenär, enligt Waxholmsbolaget. Reser du med barn under 7 år får du också ta med barnvagnen utan kostnad.' },
     { q: 'Var finns långgrunda sandstränder för barn i skärgården?', a: 'Haninge kommun beskriver Nåttarö med gott om barnvänliga, långgrunda sandstränder, bland annat Storsand och Skarsand. Torpesand i Björnö naturreservat har långgrund sandbotten, Schweizerbadet på Dalarö är mycket långgrunt och Rådmansholmen på Blidö har långgrunt badvatten.' },
     { q: 'Vilka skärgårdsbad har lekplats?', a: 'Enligt kommunerna har Tenöbadet på Bogesund, Överbybadet på Resarö, Österskärs havsbad (Solbrännan) och Grisslinge havsbad lekplats. På Utö finns en lekplats intill Seglarbarens uteservering i hamnen, och Rådmansholmen på Blidö har lekutrustning.' },
   ],
   content: `
<!-- KÄLLA (lästa 2026-09-24 om inget annat anges): waxholmsbolaget.se/biljetter-och-priser/rabatterat-pris ("Barn som är under 7 år gamla reser utan avgift med annan betalande resenär."). waxholmsbolaget.se/att-resa-med-oss/vad-du-far-ta-med ("Du som reser med barn under 7 år får ta med barnvagn utan kostnad."; "Du ställer barnvagnen på barnvagnsplatserna eller där personalen visar att den ska stå."; "Cykelkärra räknas inte som en barnvagn."). Grinda: lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html ("Grinda har fina barnvänliga bad både vid den södra och norra ångbåtsbryggan."; "Grillplatser finns vid södra ångbåtsbryggan och vid tältplatsen."; "Torrdass finns vid alla badplatser och vid södra ångbåtsbryggan"; "Norra och södra bryggan trafikeras året om av Waxholmsbolaget och Cinderella."; natur- och kulturstig "cirka 2,5 km" från Hemviken; datafix 2026-09-22-hamnar-beskrivningar-block2.sql), skargardsstiftelsen.se/omraden/grinda/ ("barnvänliga badstränder", badplatsen Källviken; lanthandel, café och tältplats sommartid; island-data grinda), Waxholmsbolagets reseplanerare (linje 13 Strömkajen–Södra Grinda 1 tim 50 min, läst 2026-09-19, island-data). Nåttarö: haninge.se/.../platser-att-besoka/nattaro/ ("endast en halvtimmes båtresa från Nynäshamn"; "Det finns gott om barnvänliga, långgrunda sandstränder. Mest känd är Stora sand, men den mer avskilda Skarsand är minst lika vacker."; "Här finns vandrarhem, stugor, restaurang, tältplats och en handelsbod."), lansstyrelsen.se Nåttarö ("Reguljär båttrafik till Nåttarö med Waxholmsbolaget från Nynäshamn."; "Invid ångbåtsbryggan finns en snorkelled som markeras på vattenytan av gula bojor, under ytan befinns skyltar som berättar om livet i vattnet."; "Torrdass finns bland annat vid Östermarsfladen och Storsand. Anpassat torrdass finns nära ångbåtsbryggan."), stockholmarchipelagotrail.com etapp Nåttarö ("grusvägen norrut (1,5 km) förbi Drottninggrottan till Nåttarö Storsand ... där det är långgrunt"; "Vid kajkanten är det en fin badstrand."); citaten i island-data (nattaro). Utö: lansstyrelsen.se Utö ("Pendeltåg till Västerhaninge. Buss till Årsta brygga. Waxholmsbåt året om till Gruvbryggan"), skargardsstiftelsen.se/omraden/uto/ (badplatserna Rävstavik och Barnens bad; Ålö Storsand "nås med båt eller via vandringsled"; "Utö är en riktig cykel-ö med möjlighet att hyra dagsvis"), utovardshus.se/seglarbaren ("Intill Seglarbarens uteservering finns en lekplats"; datafix 2026-09-23-texter-utan-kalla.sql). Tynningö: vaxholm.se badplatser ("Badet Myrholmsmaren ligger vid sjön Stora Maren. Badplatsen sköts av Tynningö Idrottsförening som också anordnar simskola varje sommar."; "Sandstrand", "Bryggor", "Grillplats med fasta bänkar och lösa bord", "Omklädningshytt", "Baja-maja under badsäsong"), Waxholmsbolaget linje 4 angör Norra Tynningö, Strömkajen 07.45 → Norra Tynningö 08.59 (h4.pdf, island-data). Ljusterö: osteraker.se/upplevagora/sevardheter/oariosterakersskargard.html ("Vill du bada finns det ett klippbad med storslagen utsikt över Saxarfjärden, och ett barnbad med sandstrand."; "gå en promenad i naturstigen, där det finns en sagostig för barn"; "En bilfärja går från Östanå färjeläge året runt."). Fjäderholmarna: stromma.com (Strandvägen kajplats 13, ca 30 min), explorearchipelago.com (klippbad, mindre sandstränder), fjaderholmarna.se ("säsongsöppet") – se fjaderholmarna-dagstur. Tenöbadet, Överbybadet, Eriksöbadet, Fridhemsbadet: vaxholm.se badplatser (Tenöbadet: "Sandstrand", "Stora grönytor", "Grillplats", "Omklädningshytt", "Lekplats", "Tenöbadet är ett EU-bad."; Överbybadet: "denna fina familjevänliga badplats som ligger utefter Badviksvägen", "Lekplats"; Eriksö: "sandstränder och klippbad", "Flytbrygga med hopptorn", "Handikappramp för tillgänglighet"; Fridhemsbadet: "Sandstrand (långgrund)"). Solbrännan: osteraker.se badplatser ("När du kliver av vid Österskärs station har du fem minuters promenad"; "Badet består av en lång inbjudande sandstrand med badbrygga."; "Bortanför badplatsen i öster finns en trevlig lekplats och en stor gräsplan."). Grisslinge: havochvatten.se ("ca 300 meter lång sandstrand"; "Vid badplatsen finns lekplats, toalett, omklädningsrum, utedusch, parkeringsplats, kiosk, konditori och restaurang."). Torpesand: havochvatten.se ("Sandstranden är ca 120 meter lång."; "Botten är sandbotten och är långgrund."). Schweizerbadet: haninge.se bad ("Schweizerbadet är känt för att vara väldigt långgrunt."; busshållplats Schweizerparken). Nickstabadet: havochvatten.se ("ca 600 meter lång sandstrand"; "hopptorn och vattenrutschbanor"). Rådmansholmen, Blidö: havochvatten.se, Norrtälje kommun (EU-bad; "Sandstrand samt långgrunt badvatten"; "Dass på badplatsen, Lekutrustning samt grillplats"; island-data blido). Badvattnet: havochvatten.se Badplatsen visar provtagning för bad som kommunerna provtar (se basta-badplatserna). Tidigare version (borttagen 2026-09-24) rangordnade "de 7 bästa öarna" och påstod bl.a. att Fjäderholmarna har "inga farliga bryggor" och är barnvagnsanpassade, att Grindas stig är 2 km och barnvagnsanpassad, att Möja har cyklar med barnstol och lådcykel att hyra vid bryggan, att Utöbåten tar 35–75 min, att Dalarö och Nynäshamn har grunda sandstränder "idealiska för barn" och att pendeltåget till Nynäshamn tar 50 min – utan källa. Råd om flytväst och säkerhet finns nu i ett eget inlägg. -->
Här är öar och bad i Stockholms skärgård där kommunen, Länsstyrelsen, Skärgårdsstiftelsen eller verksamheten själv beskriver barnvänliga bad, långgrunt vatten, lekplats eller simskola. Vi rangordnar dem inte – de är sorterade efter hur du tar dig dit. Om flytväst, badvett och säkerhet i båten: [Skärgård med barn – flytväst, säkerhet och båtvett](/blogg/barnfamilj-skargard).

## Resan med barn
På Waxholmsbolagets båtar reser barn under 7 år utan avgift med en annan betalande resenär. Reser du med barn under 7 år får du också ta med barnvagnen utan kostnad och ställer den på barnvagnsplatserna. En cykelkärra räknas inte som barnvagn.

## Öar du når med båt

### [Grinda](/o/grinda)
Enligt Länsstyrelsen har Grinda barnvänliga bad vid både den södra och den norra ångbåtsbryggan. Vid alla badplatser finns torrdass, och grillplatser finns vid södra bryggan och vid tältplatsen. Skärgårdsstiftelsen nämner också badplatsen Källviken, och lanthandel och café har öppet sommartid. En natur- och kulturstig på cirka 2,5 kilometer börjar vid gården Hemviken. Bryggorna trafikeras året om av Waxholmsbolaget och Cinderella – Waxholmsbolagets linje 13 från Strömkajen tar 1 timme och 50 minuter. Mer: [Grinda guide](/blogg/grinda-guide-2026).

### [Nåttarö](/o/nattaro)
Haninge kommun beskriver Nåttarö med gott om barnvänliga, långgrunda sandstränder, bland annat Storsand och den mer avskilda Skarsand. Vid kajkanten där båten lägger till finns en badstrand, och till Storsand är det cirka 1,5 kilometer på grusväg norrut. Invid ångbåtsbryggan ligger en snorkelled som är utmärkt med gula bojor och har skyltar under vattnet om livet där. Anpassat torrdass finns nära ångbåtsbryggan och torrdass vid Storsand. På ön finns vandrarhem, stugor, restaurang, tältplats och handelsbod. Waxholmsbolaget går från Nynäshamn, en båtresa på ungefär en halvtimme.

### [Utö](/o/uto)
Skärgårdsstiftelsen nämner badplatserna [Rävstavik](/upptack/ravstavik) och Barnens bad, och Ålö Storsand på grannön, som du når med båt eller via vandringsled. Utö beskrivs som en cykel-ö där cyklar hyrs dagsvis. Vid [Seglarbaren](/upptack/seglarbaren-uto) i hamnen finns en lekplats intill uteserveringen. Dit tar du dig med pendeltåg till Västerhaninge, buss till Årsta brygga och Waxholmsbåt till Gruvbryggan, året om. Mer: [Utö guide](/blogg/uto-guide).

### [Tynningö](/o/tynningo) – Myrholmsmaren
Badet vid sjön Stora Maren inne på ön sköts av Tynningö Idrottsförening, som har simskola varje sommar. Här finns sandstrand, bryggor, grillplats, omklädningshytt och Baja-maja under badsäsongen. Waxholmsbolagets linje 4 lägger till vid Norra Tynningö.

### [Ljusterö](/o/ljustero) – Linanäs
Vid Linanäs finns enligt Österåkers kommun ett barnbad med sandstrand och ett klippbad mot Saxarfjärden, och i naturstigen en sagostig för barn. Bilfärjan från Östanå går året runt, och Waxholmsbolaget lägger till vid [Linanäs](/upptack/linanas-gasthamn).

### [Fjäderholmarna](/o/fjaderholmarna)
Närmast stan: cirka 30 minuter med Strömmas båt från Strandvägen. Här badar du från klipporna och vid några mindre sandstränder. Öarna har säsongsöppet under sommarhalvåret. Mer: [Fjäderholmarna dagstur](/blogg/fjaderholmarna-dagstur).

## Bad du når med buss, tåg eller bil

### Vaxholm och Resarö
- [Tenöbadet](/upptack/tenobadet), Bogesund – sandstrand, stora grönytor, grillplats, omklädningshytt och lekplats. EU-bad.
- [Överbybadet](/upptack/badviken), Resarö – kommunen kallar det en familjevänlig badplats, med sandstrand, gräsytor och lekplats.
- [Eriksöbadet](/upptack/eriksobadet), Vaxön – sandstränder och klippbad, flytbrygga med hopptorn och handikappramp. EU-bad.
- Fridhemsbadet vid Karlsudd på Bogesund – mindre strandbad med långgrund sandstrand.

### Roslagsbanan och Värmdö
- [Österskärs havsbad (Solbrännan)](/upptack/solbrannan) – fem minuters promenad från Roslagsbanans Österskärs station. Lång sandstrand med badbrygga, och öster om badet en lekplats och en stor gräsplan.
- [Grisslinge havsbad](/upptack/grisslinge-havsbad) – cirka 300 meter sandstrand med lekplats, toalett, omklädningsrum, utedusch och kiosk.
- [Torpesand](/upptack/torpesand), Björnö naturreservat – cirka 120 meter sandstrand med långgrund sandbotten.

### Södra skärgården
- [Schweizerbadet](/upptack/schweizerbadet), Dalarö – Haninge kommun beskriver det som väldigt långgrunt. Närmaste busshållplats heter Schweizerparken.
- [Nickstabadet](/upptack/nickstabadet), Nynäshamn – cirka 600 meter sandstrand med hopptorn och vattenrutschbanor.

### Norra skärgården
- Rådmansholmen på [Blidö](/o/blido) – sandstrand och långgrunt badvatten, lekutrustning, grillplats och dass. EU-bad.

## Innan ni åker
- **Badvattnet:** Havs- och vattenmyndighetens Badplatsen visar provsvar för de bad som kommunen provtar.
- **Säsongen:** Grindas lanthandel och café och Fjäderholmarna har bara sommaröppet. Kolla verksamhetens egen sida innan ni åker.
- **Fler bad:** [Badplatser i Stockholms skärgård](/blogg/basta-badplatserna).
   `,
 },

 'weekend-skargard-stockholm': {
   title: 'Weekend i skärgården – sju öar med boende och båt dit',
   excerpt: 'Weekend i Stockholms skärgård: båt, boende och vad du gör på Grinda, Sandhamn, Möja, Utö, Gällnö, Ornö och Bullerö, med restider från Stockholm och reglerna för tält i reservaten.',
   category: 'Guide',
   date: '2026-07-28',
   updatedAt: '2026-09-24',
   readTime: '7 min',
   emoji: '⚓',
   tags: ['Weekend', 'Helgresa', 'Övernatta i skärgården', 'Stockholms skärgård', 'Planering'],
   content: `
<!-- KÄLLA (läst 2026-09-24 om inget annat anges). Grinda (se /blogg/grinda-guide-2026 och island-data.ts): Waxholmsbolagets reseplanerare, läst 2026-09-19 (linje 14 Strömkajen–Södra Grinda 1 tim 45 min, linje 13 1 tim 50 min); stockholmarchipelagotrail.com/sv/section/etapp-grinda/ ("Du åker till Grinda från Vaxholm och Värmdö året om"; "Medel 9.8 km"); svenskaturistforeningen.se/boende/stf-grinda-hotell-sea-lodge/ ("Hotellet erbjuder 28 moderna dubbelrum"; "På öns södra sida hittar ni Grinda Sea Lodge, som är ett lite enklare ... boende"; hotellet cirka en kilometer, ungefär 15 minuters promenad från bryggorna); lansstyrelsen.se Grinda naturreservat ("Tältning är endast tillåten på tältplatsen nära norra bryggan"; "En cirka 2,5 km lång natur- och kulturstig leder runt öns sydöstra del"); skargardsstiftelsen.se/omraden/grinda (badplatsen Källviken); grinda.se/mat-fest/framfickan ("hamnkrog, pizza & lättare rätter", "endast drop-in"). Sandhamn (se /blogg/sandhamn-guide-2026 och island-data.ts): Waxholmsbolaget tabell 16 (Stavsnäs–Sandhamn 40, 50 och 60 min), battaxi.se/sandhamnslinjen-2 ("mellan Stavsnäs och Sandhamn på endast 30 minuter"), Strömma Cinderella 2026 (30/4–27/9, Strandvägen kajplats 14 10:00 → Sandhamn 12:30), sandhamn.com/en/hitta-hit ("Take bus 433 from Slussen … Approx. 1 hour by bus"); boende sandhamn.com, sandhamns-vardshus.se (boende och frukost i Missionshuset), sandshotell.se; varmdo.se Trouville (vit sand, ca 20 min promenad) och Sandhamnsstigen ca 8 km; ksss.se/hamnar/sandhamn (ca 150 gästplatser). Möja (se /blogg/dolda-parlor-moja): varmdo.se Möja.pdf (buss 434 Slussen–Sollenkroka och båt "restid ca 2,5 timme"; "båt från Strömkajen tar ca 3-4 timmar"); svenskaturistforeningen.se/boende/stf-moja-vandrarhem/ ("Öppet April - December"; "i det gamla posthuset som byggts om till vandrarhem"); stockholmarchipelagotrail.com/sv/section/etapp-moja/ ("I Långvik finns Jeppes restaurang, där hittar du också Karlbergs Pensionat"; "Lätt 13.8 km"); visitmoja.se (naturstig Hamn–Ramsmora 12 km; Möja Outdoor "Hyr kajak, roddbåt och SUP"; Hamncafét "cykeluthyrning"). Utö (se /blogg/uto-guide och island-data.ts): lansstyrelsen.se Utö ("Pendeltåg till Västerhaninge. Buss till Årsta brygga. Waxholmsbåt året om till Gruvbryggan"); Waxholmsbolaget tabell 21 (Årsta brygga–Gruvbryggan 35–75 min, beställning "minst 1 timme innan avgång" på flera turer); utovardshus.se/boende/ ("Kvarnvillan är vår nyaste hotellbyggnad med 8 dubbelrum"; Stenhotellet "med totalt 10 rum"; "Våra faluröda hotellstugor ... går att boka både som rum med frukost eller för längre tid med självhushåll"; vandrarhemmet "Ett enklare boende"); skargardsstiftelsen.se/omraden/uto ("Utö är en riktig cykel-ö med möjlighet att hyra dagsvis"; Ålö Storsand "nås med båt eller via vandringsled"). Gällnö (se /blogg/cykling-moja-gallno och island-data.ts): gallno.se ("Båten från Strömkajen eller Strandvägen tar mellan 1,5 – 2 timmar"; "trafikeras av både Waxholmsbolaget och Strömma/Cinderella-båtarna"; Hotell Frans August; cykel och kajak att hyra sommartid; krogen sommaröppen mitten av maj–slutet av augusti 2026); svenskaturistforeningen.se/boende/stf-gallno-vandrarhem/ ("Grusvägarna är bilfria"; "stugor nära badviken, gästhamnen och handelsboden"); skargardsstiftelsen.se/omraden/gallno-karklo ("sandstrand och tältplats" vid Torsviken); lansstyrelsen.se Gällnö (hund kopplad, tält högst två dygn på samma plats). Ornö (se /blogg/vandring-orno-uto): ornosjotrafik.se ("Överfarten tar ca 30 minuter"); lansstyrelsen.se Sundby ("SL-buss till Dalarö (Hotellbryggan). Vägfärja till Ornö"; rundslinga "drygt sex kilometer"); ornoskargardshotell.se ("dubbelrum samt flera välplanerade lägenheter"; "Vi har öppet året runt"); stockholmarchipelagotrail.com/sv/section/etapp-orno/ ("Medel 34.1 km"; "två dagsetapper"; "Om du delar etappen i två så bor du antingen på Ornö Skärgårdshotell i Brunnsviken vid Lättinge eller så bor du på Sundby B&B"; Ornö Båtvarv "små campingstugor"). Bullerö: lansstyrelsen.se/stockholm/besoksmal/nationalparker/namdoskargardens-nationalpark.html ("Bullerö är nationalparkens entré. I byn finns ett gästhem med utekök som är öppet under högsäsong och en varm raststuga och vedeldad bastu som är öppna året om"; "vandringsleder av olika svårighetsgrad"; "Du får tälta upp till två dygn på samma plats i nästan hela nationalparken. På Bullerö finns en tältplats där du får tälta upp till sju dygn."; "Under högsäsongen går turbåt till entrén på Bullerö från Stavsnäs vinterhamn på Värmdö."; "Ta med egen mat och dryck – inget sådant finns att köpa i nationalparken."; "Din hund ska alltid vara kopplad."). Vaxholm och Fjäderholmarna (se /blogg/vaxholm-guide och /blogg/fjaderholmarna-dagstur): Waxholmsbolaget tabell 11 (Strömkajen–Vaxholm ca 55–70 min); SL buss 670 Tekniska högskolan–Vaxholm; stromma.com Fjäderholmarna ("Strandvägen - Kajplatsområde 13", "Endast 30 minuters båtresa från city", "ÅTER MAJ 2027"; läst 2026-09-21). Tidigare version (borttagen 2026-09-24) angav Fjäderholmarna "25 minuter från Strömkajen med Waxholmsbåten" (Strömmas båt går från Strandvägen, ca 30 min, och är nu uppehåll till maj 2027); Grinda med "direktbåt"; Sandhamn "Snabbåt från Stavsnäs (40 min) eller Waxholmsbåt (2,5 timmar)" (rätt: 30–60 min från Stavsnäs; Waxholmsbåten från Strömkajen tar minst 3 tim 45 min och går bara sommartid); Möja som bilfri med byarna "Mojaland, Möja och Yttre Möja" (finns inte; byarna heter bl.a. Berg, Långvik, Ramsmora, Löka och Hamn) och "Waxholmsbåten dit tar ca 1 timme 45 minuter"; Vaxholm med "den bästa räksmörgåsen" och fästningsmuseet "öppet sommartid" utan källa; Bullerö med "kajakuthyrning från Dalarö"; Utö med sandstränderna "Barnens bad och Stora Sand" och båt "från Nynäshamn (ca 1 timme)" (Utö nås från Årsta brygga; Nynäshamnsbåten går till Ålö); "Norrskärens yttre skärgård" med charter från Stavsnäs eller Nynäshamn; bokningsråd ("fullbokade veckor i förväg", "boka redan i april"); pris för Grinda Wärdshus och båtbiljetter; värdeord. -->
Sju öar i Stockholms skärgård där du kan övernatta, med båten dit, boendet som finns och vad du gör på ön. Restider och säsonger kommer från operatörerna, boendena och Länsstyrelsen.

## Grinda
- **Båt:** Waxholmsbolagets båt från Strömkajen tar 1 timme 45 minuter (linje 14) eller 1 timme 50 minuter (linje 13). Båtarna går året om. [Båt till Grinda](/o/grinda/komma-dit).
- **Bo:** STF Grinda Hotell har 28 dubbelrum och ligger ungefär 15 minuters promenad från bryggorna. Grinda Sea Lodge på öns södra sida är ett enklare boende. Tälta får du bara på tältplatsen nära norra bryggan.
- **Gör:** Stockholm Archipelago Trail på Grinda är 9,8 kilometer, och Länsstyrelsens natur- och kulturstig cirka 2,5 kilometer. Bad vid Källviken. Framfickan vid gästhamnen tar bara drop-in.

Mer: [Grinda guide](/blogg/grinda-guide-2026).

## Sandhamn
- **Båt:** året runt via Stavsnäs – buss 433 från Slussen, ungefär en timme, och sedan Waxholmsbolagets linje 16 på 40–60 minuter eller Sandhamnslinjen på 30 minuter. Cinderella från Strandvägen tar 2 timmar 30 minuter och gick säsongen 2026 30 april–27 september. [Båt till Sandhamn](/o/sandhamn/komma-dit).
- **Bo:** Sandhamn Seglarhotell, Sands Hotell och Sandhamns Värdshus boende i Missionshuset.
- **Gör:** Trouville, en lång strand med vit sand cirka 20 minuters promenad från hamnen, och Sandhamnsstigen på cirka 8 kilometer runt Sandön. Med egen båt finns KSSS gästhamn med cirka 150 gästplatser.

Mer: [Sandhamn guide](/blogg/sandhamn-guide-2026).

## Möja
- **Båt:** buss 434 från Slussen till Sollenkroka och båt därifrån tar cirka 2,5 timmar. Båt hela vägen från Strömkajen tar cirka 3–4 timmar. [Båt till Möja](/o/moja/komma-dit).
- **Bo:** STF Möja vandrarhem i det gamla posthuset har öppet april–december. I Långvik ligger Karlbergs Pensionat.
- **Gör:** naturstigen mellan Hamn och Ramsmora, 12 kilometer, och Stockholm Archipelago Trail, 13,8 kilometer på grusväg. Möja Outdoor hyr ut kajak, roddbåt och SUP, och Hamncafét hyr ut cyklar.

Mer: [Möja](/blogg/dolda-parlor-moja).

## Utö
- **Båt:** pendeltåg till Västerhaninge, buss 846 till Årsta brygga och Waxholmsbåt året om till Gruvbryggan, 35–75 minuter. På flera turer ska resan beställas minst en timme före avgång. [Båt till Utö](/o/uto/komma-dit).
- **Bo:** Utö Värdshus har rum i Kvarnvillan (8 dubbelrum) och Stenhotellet (10 rum), hotellstugor och ett vandrarhem.
- **Gör:** Utö är en cykel-ö där cykel hyrs dagsvis. Ålö Storsand på grannön nås med båt eller via vandringsled, och Stockholm Archipelago Trail på Utö är 18,4 kilometer.

Mer: [Utö guide](/blogg/uto-guide).

## Gällnö
- **Båt:** Waxholmsbolaget och Strömmas Cinderellabåtar från Strömkajen eller Strandvägen, 1,5–2 timmar. [Båt till Gällnö](/o/gallno/komma-dit).
- **Bo:** STF Gällnö vandrarhem har stugor nära badviken, gästhamnen och handelsboden. På ön finns också Hotell Frans August, och vid Torsviken har Skärgårdsstiftelsen tältplats och sandstrand. Gällnö är naturreservat: tältet får stå högst två dygn på samma plats, och hunden ska vara kopplad.
- **Gör:** cykel och kajak hyrs på sommaren. Gällnö krog har sommaröppet.

Mer: [Hyra cykel på Möja och Gällnö](/blogg/cykling-moja-gallno).

## Ornö
- **Båt:** SL-buss till Dalarö och bilfärjan till Hässelmara, cirka 30 minuter. [Båt till Ornö](/o/orno/komma-dit).
- **Bo:** Ornö Skärgårdshotell i Brunnsviken har dubbelrum och lägenheter och öppet året runt. Sundby B&B och Ornö Båtvarvs små campingstugor är andra alternativ.
- **Gör:** Stockholm Archipelago Trail på Ornö är 34,1 kilometer och märkt som två dagsetapper, så en natt på hotellet eller i Sundby delar leden i två. Från Sundby gård går en drygt sex kilometer lång rundslinga.

Mer: [Vandring på Ornö och Utö](/blogg/vandring-orno-uto).

## Bullerö
- **Båt:** under högsäsong går turbåt från Stavsnäs vinterhamn till Bullerö, entrén till Nämdöskärgårdens nationalpark. [Båt till Bullerö](/o/bullero/komma-dit).
- **Bo:** på Bullerös tältplats får du tälta upp till sju dygn, i nästan hela nationalparken i övrigt upp till två dygn på samma plats. I byn finns ett gästhem med utekök som har öppet under högsäsong, och en varm raststuga och vedeldad bastu som är öppna året om.
- **Gör:** vandringsleder av olika svårighetsgrad och en badstrand. Mat och dryck går inte att köpa i nationalparken, så ta med allt. Hunden ska alltid vara kopplad.

## Kortare: Vaxholm och Fjäderholmarna
- **Vaxholm:** Waxholmsbolagets båt från Strömkajen tar ungefär en timme, och buss 670 går från Tekniska högskolan. Se [Vaxholm dagstur](/blogg/vaxholm-guide).
- **Fjäderholmarna:** Strömmas båt från Strandvägen tar cirka 30 minuter och går under sommarhalvåret. Se [Fjäderholmarna dagstur](/blogg/fjaderholmarna-dagstur).
   `,
   faqs: [
     // KÄLLA: svenskaturistforeningen.se STF Grinda hotell & Sea Lodge, lansstyrelsen.se Grinda och Nämdöskärgårdens nationalpark, Waxholmsbolaget tabell 16, battaxi.se, Strömma Cinderella 2026 – se KÄLLA-kommentaren i content.
     { q: 'Var kan man övernatta på Grinda?', a: 'På STF Grinda Hotell, som har 28 dubbelrum, eller på Grinda Sea Lodge på öns södra sida. Tälta får du bara på tältplatsen nära norra bryggan.' },
     { q: 'Hur lång tid tar båten till Sandhamn?', a: 'Från Stavsnäs tar Waxholmsbolagets linje 16 40–60 minuter och Sandhamnslinjen 30 minuter, året runt. Cinderella från Strandvägen tar 2 timmar 30 minuter och gick säsongen 2026 30 april–27 september.' },
     { q: 'Får man tälta på Bullerö?', a: 'Ja. På tältplatsen på Bullerö får du tälta upp till sju dygn. I nästan hela nationalparken i övrigt får du tälta upp till två dygn på samma plats.' },
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
<!-- KÄLLA: källorna finns ordagrant i src/app/o/island-data.ts (sandhamn) och i /blogg/basta-restaurangerna-sandhamn: Waxholmsbolaget tabell 15 (gäller 19 juni–16 augusti 2026, Strömkajen 10.00 → Sandhamn 13.45, 08.30 → 13.25) och tabell 16 (Stavsnäs–Sandhamn 40, 50 och 60 min), waxholmsbolaget.se/reseplanering/resmal/sandhamn ("Ut till Sandhamn går det turer året runt"), battaxi.se/sandhamnslinjen-2 (Stavsnäs–Sandhamn 30 min), Strömma Cinderella 2026 (30/4–27/9, Strandvägen kajplats 14 10:00 → 12:30), SL buss 433/434 Slussen–Stavsnäs vinterhamn (runmaro.se/om: "buss 433 eller 434 från Slussen"). varmdo.se Trouville (vit sand, södra sidan, ca 20 min promenad, toaletter sommartid, ingen badvattenprovtagning), varmdo.se spår och leder (Sandhamnsstigen ca 8 km runt Sandön via Trouville), naturkartan.se Sandön (Värmdö kommun: slingor 2,5, 3,5 och 5,5 km; trädklädda sanddyner jämförbara med Gotska Sandön och Fårö), stockholmslansmuseum.se Sandhamn (lotsstation slutet av 1600-talet; tullhuset av Carl Hårleman 1752; museum i Bryggstugan och Tullvaktstugan; Värdshuset från 1670-talet), ksss.se historia (grundat 1830), ksss.se/en/gotlandrunt/ (start sedan 2024 vid Gråskärsfjärden, mål i Sandhamn), lansstyrelsen.se Grönskär (naturreservat sedan 1965), skargardsstiftelsen.se (fyren 26 m, 1770, Adelcrantz; skänkt till stiftelsen 1984), ksss.se/hamnar/sandhamn (ca 150 gästplatser, 20 bokningsbara via Dockspot). Boende: sandhamn.com, sandhamns-vardshus.se (Missionshuset, boende och frukost), sandshotell.se; inget STF-boende på Sandhamn (visitskargarden.se, läst 2026-09-14). Tidigare version (borttagen 2026-09-24) påstod att Match Cup Sweden seglas på Sandhamn (tävlingen hålls i Marstrand), nämnde "Bryggcafé 7an", "Sandhamns Pensionat", "Lotsmuseet" och "Flaskbrottet" som vi inte hittar, angav hotell- och stugpriser och att ön är bilfri utan källa. -->
[Sandhamn](/o/sandhamn) på Sandön i Värmdö kommun är en gammal lots- och tullplats som blev seglarort, och i dag målgång för havskappseglingen Gotland Runt. Här är det du behöver för ett besök: båtarna dit, stranden, maten och boendet, med källor från operatörerna, kommunen och Stockholms läns museum.

## Båt till Sandhamn
- **Året runt via Stavsnäs:** buss 433 eller 434 från Slussen till Stavsnäs vinterhamn och därifrån Waxholmsbolagets linje 16 på 40–60 minuter eller Stavsnäs Båttaxis Sandhamnslinje på 30 minuter.
- **Cinderella från Strandvägen:** kajplats 14, cirka 2 timmar 30 minuter, under säsongen (2026: 30 april–27 september).
- **Waxholmsbåten från Strömkajen:** bara sommartid (2026: 19 juni–16 augusti), 3 timmar 45 minuter till knappt 5 timmar beroende på avgång och byte i Finnhamn.

Alla avgångar och restider: [Båt till Sandhamn](/o/sandhamn/komma-dit).

## Bada och gå
[Trouville](/upptack/stora-trouvillestranden) är en lång strand med vit sand på öns södra sida, omkring 20 minuters promenad från hamnen, med toaletter sommartid. Kommunen tar inga badvattenprover här.

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
     { q: 'Hur lång tid tar båten från Stockholm till Sandhamn?', a: 'Via Stavsnäs året runt: buss från Slussen till Stavsnäs vinterhamn och sedan Waxholmsbolagets linje 16 på 40–60 minuter eller Sandhamnslinjen på 30 minuter. Cinderella från Strandvägen tar cirka 2 timmar 30 minuter (säsong 2026: 30 april–27 september), och Waxholmsbåten från Strömkajen 3 timmar 45 minuter till knappt 5 timmar (sommartid, 2026: 19 juni–16 augusti).' },
     { q: 'Finns det strand på Sandhamn?', a: 'Ja. Trouville på öns södra sida är en lång strand med vit sand, omkring 20 minuters promenad från hamnen enligt Värmdö kommun.' },
     { q: 'Kan man övernatta på Sandhamn?', a: 'Ja, på Sandhamn Seglarhotell, Sands Hotell eller i Sandhamns Värdshus boende i Missionshuset. Med egen båt finns KSSS gästhamn med cirka 150 gästplatser.' },
   ],
 },

 'boende-skargard-2026': {
   title: 'Boende i skärgården – vandrarhem, hotell och tältplatser',
   excerpt: 'Övernatta i Stockholms skärgård: STF-vandrarhem på Finnhamn, Möja, Gällnö och Svartsö, värdshus och hotell, Skärgårdsstiftelsens stugor, tältplatser och allemansrättens regler för tält.',
   category: 'Praktiskt',
   date: '2026-07-28',
   updatedAt: '2026-09-24',
   readTime: '6 min',
   emoji: '🏕️',
   tags: ['Boende i skärgården', 'Vandrarhem', 'STF', 'Tälta', 'Skärgårdsstiftelsen'],
   faqs: [
     // KÄLLA: naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/taltning/ ("Du får tälta något enstaka dygn i naturen"; "Stanna inte för länge, en eller två nätter är en bra tumregel."; "I allmänhet är det inte tillåtet att tälta annat än på särskilt angivna platser."); lansstyrelsen.se Grinda ("Tältning är endast tillåten på tältplatsen nära norra bryggan.")
     { q: 'Får man tälta var som helst i skärgården?', a: 'Enligt allemansrätten får du tälta något enstaka dygn i naturen, en bra bit från bostadshus – en eller två nätter är enligt Naturvårdsverket en bra tumregel. I naturreservat får du i allmänhet bara tälta på anvisade platser. På Grinda är tältning till exempel bara tillåten på tältplatsen nära norra bryggan.' },
     { q: 'Vilka STF-boenden finns i Stockholms skärgård?', a: 'STF listar bland annat Finnhamns Vandrarhem, Möja Vandrarhem, Gällnö Vandrarhem, Svartsö Skärgårdshotell & Vandrarhem, Stora Kalholmen Vandrarhem, Grinda Hotell & Sea Lodge, Siaröfortet, Kastellet Bed and Breakfast i Vaxholm, Bogesund Vandrarhem, Arholma Bull-August gård, Arholma Nord och Lidö Värdshus.' },
     // KÄLLA: skargardsstiftelsen.se/boka-boende/ ("Stugor och lägenheter på Utö är öppna under perioden 1 maj-2 november."; "Stugor och lägenheter på Gålö är öppna under perioden 1 maj-2 november."; Norrötorpet på Fjärdlång "8 maj-20 september"; Huvudskär "15 maj-20 september"; stugan Gröndal på Hammersta "22 januari-2 november")
     { q: 'Kan man hyra stuga av Skärgårdsstiftelsen?', a: 'Ja. Skärgårdsstiftelsen hyr själv ut stugor och lägenheter på Utö och Gålö (1 maj–2 november), torpet Norrötorpet på Fjärdlång, stugan Gröndal på Hammersta och vandrarhemmet på Huvudskär. Övriga boenden på stiftelsens områden drivs av entreprenörer och bokas direkt hos dem.' },
   ],
   content: `
<!-- KÄLLA (lästa 2026-09-24): svenskaturistforeningen.se/boende/ – STF Finnhamns Vandrarhem ("har varit ett landmärke i Stockholms skärgård i över 100 år"; "Förr i tiden var huset en privat sommarbostad för familjen Rönnerström"), STF Möja Vandrarhem ("familjeägt vandrarhem i Stockholms yttre mellanskärgård"; "det gamla posthuset som byggts om till vandrarhem"; "Öppet April - December"), STF Gällnö Vandrarhem ("bara 90 minuters båtfärd från centrala Stockholm"; "mysiga stugor nära badviken, gästhamnen och handelsboden"), STF Svartsö Skärgårdshotell & Vandrarhem ("öppet året runt!"; "Bada i både hav och insjö"), STF Grinda Hotell & Sea Lodge ("Bo på det intilliggande hotellet eller på Grinda Sea Lodge på öns södra sida"; "Hotellet erbjuder 28 moderna dubbelrum och två King Size rum", island-data grinda), STF Stora Kalholmen Vandrarhem ("Hela ön är naturreservat och förutom djuren så finns inga bofasta på ön"), STF Siaröfortet Skärgårdskrog och Pensionat ("ligger på Kyrkogårdsön, mitt i farleden mellan Vaxholm och Furusund"), STF Kastellet Bed and Breakfast ("bo på Vaxholms Kastell"; "belägen på en ö ett stenkast från Vaxholm stad"), STF Bogesund Vandrarhem Vaxholm ("slottsvandrarhem"; "dubbel- eller flerbäddsrum i de gedigna husen runt Bogesunds Slott"), STF Arholma Bull-August gård ("en vacker roslagsgård mitt på ön Arholma"), STF Arholma Nord ("i en egen stilla vik"; "vedeldade bastun"), STF Lidö Värdshus; STF:s söklista (svenskaturistforeningen.se/hitta/?boenden) visar även STF Sjövillan Bed and Breakfast, STF Lillsved Vandrarhem, STF Värmdö Sofielund, STF Fredriksborg Hotell och STF Prinsvillan under "Stockholms skärgård". lidovardshus.com ("Säsongen 2026 Vi har nu öppet för grupper, konferenser, fester och bröllop."; "Boende & restaurang öppnar åter till midsommar 2027 den 25 juni"). utovardshus.se ("80 rum & hotellstugor (200 bäddar)"). sandhamn.com ("Sandhamn Seglarhotell har varit en del av livet på Sandhamn i över ett sekel"; "med restaurang, spa, gym och pool"; "Frukost ingår, och som hotellgäst har du fri tillgång till spa och gym"; "vila, fira, mötas och njuta av skärgården – året runt"). sandhamns-vardshus.se ("Boende och frukost i Missionshuset", datafix 2026-09-23-sandhamn-platser.sql). waxholmshotell.se ("Waxholms Hotell har varit hjärtat i skärgårdens huvudstad sedan 1902"; "finns ingen hiss till våning 3"). hotellfurusund.se ("På vårt fyrstjärniga hotell finns rum för alla sällskap. Många av våra rum har utsikt över vattnet"). nattaro.se/boende/vandrarhemmet/ (fyra hus, 32 bäddar; island-data nattaro). skargardsstiftelsen.se/var-verksamhet/tillganglig-skargard/hotell-stugor-och-vandrarhem/ ("Skärgårdsstiftelsens besöksanläggningar drivs till största del av olika entreprenörer och bokas direkt via respektive anläggning"; områden med boende: Örskär, Arholma, Lidö, Riddersholm, Finnhamn, Stora Kalholmen, Grinda, Gällnö, Rögrund, Gålö, Utö, Rånö, Fjärdlång, Huvudskär, Nåttarö; "Många av boendena nås smidigt med Waxholmsbolagets båtar"). skargardsstiftelsen.se/boka-boende/ (Utö och Gålö "1 maj-2 november", "enkel standard och utedass"; Huvudskär "15 maj-20 september", "totalt nio olika boenden och 47 bäddar. Här saknas el och värme, men vatten finns i gårdspump och utedass. Du tar med egen mat"; Fjärdlång Norrötorpet "8 maj-20 september", "33 kvm", "utan el, med vatten i gårdspump, utedass och bastu vid egen brygga"; Hammersta stugan Gröndal "22 januari-2 november"). skargardsstiftelsen.se/.../oppna-bodar-och-raststugor/ ("Hit är du välkommen att stanna högst två nätter"; "du kanske måste dela boden"; "Vid besök till Myggskärens öppna bodar måste du ta med egen ved till kaminen och det finns inte matlagningsmöjligheter"; öppna bodar i Möjaskärgården (Kulans uddar) och Fjärdlång (Myggskären)). skargardsstiftelsen.se/.../talt-och-lagerplatser/ (lägerplatser "avsedda för friluftsliv och lägerverksamhet så som scouter eller skolor"; "toaletter, sopkärl och ofta tillgång till färskvatten"; Björnö, Gålö, Nåttarö; "Alla lägerplatser ligger i naturreservat"). naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/taltning/ ("Du får tälta något enstaka dygn i naturen"; "Välj en tältplats en bra bit bort från bostadshus"; "en eller två nätter är en bra tumregel"; "Sätt upp tältet på tålig mark, undvik betesmark och jordbruk"; "Om ni är flera personer med flera tält krävs markägarens tillstånd"; "I allmänhet är det inte tillåtet att tälta annat än på särskilt angivna platser."). lansstyrelsen.se Grinda ("Tältning är endast tillåten på tältplatsen nära norra bryggan."), Utö (tältning endast på anvisade platser), Nåttarö (förbud att "tälta mer än två dygn i följd annat än på anvisad plats"). skargardsstiftelsen.se/omraden/gallno-karklo/ (Torsviken "sandstrand och tältplats"); gallno.se (gratis tältplats, se cykling-moja-gallno). haninge.se Nåttarö ("vandrarhem, stugor, restaurang, tältplats och en handelsbod"). Tidigare version (borttagen 2026-09-24) kallade Grinda Wärdshus "Sverigebäst", angav rum-, stug-, gästhamns- och vandrarhemspriser utan prislista, rekommenderade Blocket, Airbnb och Sverigestugor.se, påstod att Vaxholms kastell är "omgjort till vandrarhem" (det är ett STF-anslutet B&B), att STF driver vandrarhem på Utö (STF listar inget boende på Utö), att Utö har "en etablerad campingplats med faciliteter" och att Ornö har camping, och att man kan "paddla till en öde ö och sova ... gratis" – utan källa. -->
I Stockholms skärgård kan du bo på vandrarhem, hotell och värdshus, hyra en enkel stuga av Skärgårdsstiftelsen eller tälta. Här är boenden som har en egen sida eller finns hos STF och Skärgårdsstiftelsen, och vad allemansrätten säger om tält. Priser och lediga datum står hos respektive boende.

## STF:s vandrarhem och hotell
Svenska Turistföreningen listar flera boenden i skärgården:
- [Finnhamn](/o/finnhamn): **STF Finnhamns Vandrarhem.** Det gula huset har varit ett landmärke i skärgården i över 100 år och var tidigare sommarbostad för familjen Rönnerström.
- [Möja](/o/moja): **STF Möja Vandrarhem.** Familjeägt vandrarhem i det gamla posthuset. Öppet april–december.
- [Gällnö](/o/gallno): **STF Gällnö Vandrarhem.** Stugor nära badviken, gästhamnen och handelsboden, 90 minuter med båt från centrala Stockholm.
- [Svartsö](/o/svartso): **STF Svartsö Skärgårdshotell & Vandrarhem.** Öppet året runt, med bad i både hav och insjö.
- [Grinda](/o/grinda): **STF Grinda Hotell & Sea Lodge.** Hotellet ligger intill [Grinda Wärdshus](/upptack/grinda-wardshus) och har 28 dubbelrum. [Grinda Sea Lodge](/upptack/grinda-grinda-sea-lodge) ligger på öns södra sida.
- **STF Stora Kalholmen Vandrarhem.** Hela ön är naturreservat och har inga bofasta.
- **STF Siaröfortet Skärgårdskrog och Pensionat** på Kyrkogårdsön, i farleden mellan Vaxholm och Furusund.
- [Vaxholm](/o/vaxholm): **STF Kastellet Bed and Breakfast** i Vaxholms kastell, och **STF Bogesund Vandrarhem** i husen runt Bogesunds slott.
- [Arholma](/o/arholma): **STF Arholma Bull-August gård,** en roslagsgård mitt på ön, och **STF Arholma Nord** i en egen vik med vedeldad bastu.
- [Lidö](/o/lido): **STF Lidö Värdshus.** Värdshuset har perioder då det bara tar emot grupper – se Lidö Värdshus egen sida för om boende och restaurang har öppet.

STF listar också Sjövillan, Lillsved, Värmdö Sofielund, Fredriksborg Hotell och Prinsvillan under Stockholms skärgård.

## Hotell och värdshus
- [Utö](/o/uto): **Utö Värdshus** har 80 rum och hotellstugor med sammanlagt 200 bäddar.
- [Sandhamn](/o/sandhamn): [Sandhamn Seglarhotell](/upptack/seglarhotellet-sandhamn) har restaurang, spa, gym och pool. Frukost ingår och hotellgäster har fri tillgång till spa och gym. Enligt hotellet kommer gäster hit året runt.
- Sandhamn: [Sandhamns Värdshus](/upptack/sandhamn-sandhamns-vardshus) har boende med frukost i Missionshuset.
- Vaxholm: **Waxholms Hotell** har funnits i staden sedan 1902. Det finns ingen hiss till tredje våningen.
- [Furusund](/o/furusund): **Hotell Furusund** är ett fyrstjärnigt hotell där många rum har utsikt över vattnet.
- [Nåttarö](/o/nattaro): vandrarhem i fyra hus med 32 bäddar, stugor och tältplats.

## Skärgårdsstiftelsens stugor
De flesta boenden på Skärgårdsstiftelsens områden drivs av entreprenörer och bokas direkt hos dem. Några hyr stiftelsen ut själv:
- **Utö och Gålö:** stugor och lägenheter med enkel standard och utedass, öppna 1 maj–2 november.
- **Fjärdlång – Norrötorpet:** torp på 33 kvadratmeter utan el, med gårdspump, utedass och bastu vid egen brygga. Öppet 8 maj–20 september.
- **Huvudskär:** vandrarhem i Lotshuset och Tullhuset, nio boenden med 47 bäddar. Här finns varken el eller värme, och du tar med egen mat. Öppet 15 maj–20 september.
- **Hammersta – stugan Gröndal** i Häringe–Hammersta naturreservat, öppen 22 januari–2 november.

### Öppna bodar
I Möjaskärgården (Kulans uddar) och på Fjärdlång (Myggskären) har Skärgårdsstiftelsen öppna bodar där du får stanna högst två nätter – och kan få dela boden med andra. Till Myggskären tar du med egen ved till kaminen.

## Tälta

### Allemansrätten
Enligt Naturvårdsverket får du tälta något enstaka dygn i naturen, på tålig mark och en bra bit från bostadshus – en eller två nätter är en bra tumregel. Är ni många med flera tält behövs markägarens tillstånd. I naturreservat och nationalparker får du i allmänhet bara tälta på anvisade platser.

### Tältplatser på öarna
- **Grinda:** tältning bara på tältplatsen nära norra bryggan.
- **Gällnö:** tältplats vid Torsvikens sandstrand.
- **Utö:** tälta bara på anvisade platser i naturreservatet.
- **Nåttarö:** tältplats. Utanför anvisad plats får du tälta högst två dygn i följd.
- **Lägerplatser för grupper:** på Björnö, Gålö och Nåttarö har Skärgårdsstiftelsen lägerplatser för till exempel scouter och skolor, med toaletter, sopkärl och ofta färskvatten.

## Med egen båt
Gästhamnar med antal platser och bokning: [Gästhamnar i Stockholms skärgård](/blogg/gasthamnar-guide). Med barn: [Barnvänliga öar och bad](/blogg/skargard-barnfamilj-sommar-2026).
   `,
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
Hunden får följa med på skärgårdsbåten och ut på öarna. I naturreservat ska hunden alltid vara kopplad – och bland annat Grinda, Gällnö, Finnhamn och norra Utö är naturreservat. Här är vad som gäller enligt Naturvårdsverket och Waxholmsbolaget.

## Reglerna

### Koppel 1 mars–20 augusti – överallt i naturen
Mellan 1 mars och 20 augusti får hunden inte springa lös i naturen, eftersom vilda djur har ungar. Enligt Naturvårdsverket innebär det i praktiken nästan alltid att hunden ska vara kopplad.

### I naturreservat – alltid koppel
I nationalparker och naturreservat ska hunden ha koppel hela året, enligt Naturvårdsverket. Varje reservat har också egna föreskrifter som står på Länsstyrelsens sida för reservatet.

### Nära betande djur – alltid koppel
Nära betande djur ska hunden alltid vara kopplad.

## Hunden på båten
På Waxholmsbolagets båtar får du ta med hund gratis. Ombord visar skyltar var platserna för husdjur finns, och hunden ska vara kopplad under resan.

## Öar och platser
- [Grinda](/o/grinda) – naturreservat. Här gäller koppel hela året.
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
   title: 'Vandring i Stockholms skärgård – leder och etapper',
   excerpt: 'Vandra i Stockholms skärgård: Stockholm Archipelago Trails etapper på Utö, Ålö, Ornö, Fjärdlång, Grinda, Möja och Sandhamn, kortare slingor, Bullerö och reglerna för hund, eld och tält.',
   category: 'Aktiviteter',
   date: '2026-07-28',
   updatedAt: '2026-09-24',
   readTime: '7 min',
   emoji: '🥾',
   tags: ['Vandring', 'Stockholm Archipelago Trail', 'Vandringsleder', 'Stockholms skärgård', 'Friluftsliv'],
   content: `
<!-- KÄLLA (läst 2026-09-24 om inget annat anges): stockholmarchipelagotrail.com/sv/section/ ("Visar 22 etapper"; sorterat norr–syd börjar listan med "Etapp Arholma" och slutar med "Etapp Landsort"; "Etapp Utö Utmanande 18.4 km", "Utö – Ålö Connector Lätt 4.6 km", "Etapp Ålö Utmanande 13.2 km", "Etapp Ornö Medel 34.1 km", "Etapp Fjärdlång Medel 11.7 km", "Etapp Grinda Medel 9.8 km", "Etapp Möja Lätt 13.8 km", "Etapp Sandhamn Lätt 8.1 km"). Alla SAT-etappsidor: "Följ leden som är uppmärkt med band och pilar där blått står för havet, gult för solen och reflex i mitten för den skimrande horisonten"; "Märkningen är gjord åt ett håll, antingen medsols eller motsols"; "Under mars – september skall hundar alltid vara kopplade."; "Respektera eldningsförbud och elda absolut inte på klippa."; "Allt skräp slänger vi på fastlandet". SAT etapp Utö: "Etappen börjar antingen vid Gruvbryggan där du finner affärer, Värdshuset och restauranger ... Eller så kliver du av vid Spränga Brygga, där finns ingen service"; "Vi rekommenderar varmt att man går etappen motsols"; "Från Gruvbryggan kan du ta dig norrut längs grusvägen. Antingen hela vägen till Kroka eller till Barnens bad"; "rakt österut, förbi Värdshuset och gruvhålen till Rävstavik"; "Du åker till Utö från Årsta Brygga året om."; "Under sommaren (22 juni – 16 augusti 2026) kan du åka Nordsydlinjen som följer SAT." waxholmsbolaget.se/reseplanering/resmal/sandhamn (läst 2026-09-21, se island-data.ts): "Nord/Sydlinjens tider hittar du i tabell 40". SAT etapp Ålö: "skall denna etapp vandras motsols"; "Etappen är utmanande och du behöver kunna gå i alla miljöer och du behöver kunna klara dig själv."; "Du åker till Ålö från Nynäshamn. Med reguljär tur via Nåttarö och Rånö. Du kan också gå eller cykla från Utö."; "Under sommaren kan man äta och hyra cyklar vid Båtshaket." SAT etapp Ornö: "Ornö är den längsta etappen på Stockholm Archipelago Trail."; "Etappen är markerad som två dagsetapper som båda startar vid Hässelmara och där båda slutar nere i hamnen vid Ornö Kyrka."; "Mellan Lättinge, Hässelmara och Skinnardal går SL-bussen på asfaltsvägen."; "bor du antingen på Ornö Skärgårdshotell i Brunnsviken vid Lättinge eller så bor du på Sundby B&B"; "Du åker till Hässelmara på Ornö från Dalarö året om." SAT etapp Fjärdlång: "Etappen utgår från den allmänna bryggan där Waxholmsbåten lägger till."; "Vi rekommenderar att du går hela etappen och då motsols."; "det inte finns någon service på ön"; "Du åker till Fjärdlång från Utö och Ornö under sommarmånaderna (slutet av juni – mitten av augusti) med Nordsydlinjen"; "Under mellansäsongerna går det turer från Dalarö fredag – söndag." SAT etapp Grinda: "rekommenderar vi som sagt att du går medsols"; "Norr om Wärdshuset blir det tekniskt längs en smal stig efter Campingen."; "Du åker till Grinda från Vaxholm och Värmdö året om." SAT etapp Möja: "De 13,8 km på grusväg runt den östra och södra kusten"; "vi rekommenderar att du går från Långvik, till Ramsmora, till Löka, till Berg och slutligen till Hamn"; "Skärgårdsbåten anlöper byarna Berg, Löka, Ramsmora och Långvik." SAT etapp Sandhamn: "Etappen utgår från den allmänna bryggan där Waxholmsbåtarna lägger till."; "Vi rekommenderar att du går vänster, medsols"; "På Sandhamn är leden sparsamt uppmärkt"; "Du åker till Sandhamn året runt från Stavsnäs via Runmarö." lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html: "En cirka 2,5 km lång natur- och kulturstig leder runt öns sydöstra del. Stigen startar vid gården Hemviken."; "Utkiksplatsen uppe på Klubbudden är öns högsta punkt med 35 m."; "Tältning är endast tillåten på tältplatsen nära norra bryggan". lansstyrelsen.se/stockholm/besoksmal/naturreservat/sundby.html: "Med start vid Sundby gård finns en drygt sex kilometer lång, lättvandrad rundslinga. På grusvägar och stigar ... Slingan är till stora delar tillgänglig för barnvagn eller rullstol, men tyvärr inte hela vägen runt." lansstyrelsen.se Utö naturreservat (via island-data.ts): tältning endast på anvisade platser, eldning endast på iordningställda platser, hund kopplad. lansstyrelsen.se/stockholm/besoksmal/nationalparker/namdoskargardens-nationalpark.html: "På ön finns vandringsleder av olika svårighetsgrad, en informationsplats, en badstrand, en tältplats"; "Delar av ön är tillgänglighetsanpassade"; "Under högsäsongen går turbåt till entrén på Bullerö från Stavsnäs vinterhamn på Värmdö."; "Ta med egen mat och dryck – inget sådant finns att köpa i nationalparken."; "Du kan fylla din vattenflaska på Bullerön"; "Du får endast elda på anvisade platser eller i grill på ben."; "Din hund ska alltid vara kopplad."; "På Bullerö finns en tältplats där du får tälta upp till sju dygn." visitmoja.se/vandra (Möja turistförening, se /blogg/dolda-parlor-moja): naturstig "Mellan Hamn-Ramsmora är det (12km)" genom Björndalens naturreservat. varmdo.se spår och leder (se /blogg/sandhamn-guide-2026): Sandhamnsstigen ca 8 km runt Sandön via Trouville. Restider: Waxholmsbolaget tabell 21 (kund.printhuset-sthlm.se/wa/h21.pdf, gäller 17 augusti–12 december 2026): Årsta brygga 11.00 → Gruvbryggan 11.40, 08.25 → 09.40, 20.35 → 21.10; "b Beställ resan i SL-appen, på Waxholmsbolagets webb eller via kundtjänst ... minst 1 timme innan avgång". ornosjotrafik.se: "Överfarten tar ca 30 minuter". Waxholmsbolagets reseplanerare (läst 2026-09-19): Strömkajen–Södra Grinda linje 14 1 tim 45 min, linje 13 1 tim 50 min. varmdo.se Möja.pdf: buss 434 Slussen–Sollenkroka och båt "restid ca 2,5 timme"; "båt från Strömkajen tar ca 3-4 timmar". Waxholmsbolaget tabell 16 och battaxi.se/sandhamnslinjen-2: Stavsnäs–Sandhamn 40–60 min respektive 30 min (se island-data.ts, sandhamn). Tidigare version (borttagen 2026-09-24) rangordnade "de 8 bästa lederna" och angav: "Utö runt ca 15 km" via "Stora Sand" och "Södra Sandvik" med båt från Nynäshamn (Utö nås från Årsta brygga, Nynäshamnsbåten går till Ålö); "Ornö runt hela ön ca 20 km" med "välskyltat runt-öled" och bil via Nynäshamn (färjan går från Dalarö, SAT-etappen är 34,1 km); Möja "bilfri" med "byvandring ca 8 km"; Gällnö "markerade leder ca 6 km"; Bullerö "kort slingled ca 5 km" som bara nås med charter; "Grinda runt ca 4 km"; Tynningö "i Stockholms yttre skärgård" med led på 6 km; en "naturslinga" på Fjäderholmarna och "25-minutersbåttur"; mängd vatten, kartappar och "bästa säsongen" utan källa. -->
Stockholm Archipelago Trail är en märkt vandringsled i 22 etapper genom Stockholms skärgård, från Arholma i norr till Landsort i söder. Här är etapperna i mellersta och södra skärgården med den längd och svårighetsgrad som leden själv anger, några kortare slingor och båten dit.

## Så är leden märkt
Leden är märkt med band och pilar: blått för havet, gult för solen och reflex i mitten. Märkningen är gjord åt ett håll, medsols eller motsols beroende på etapp. På sommaren går Nordsydlinjen, en båtlinje som följer leden.

## Södra skärgården

### Utö – 18,4 km, utmanande
Etappen på [Utö](/o/uto) börjar vid Gruvbryggan, där det finns affärer, värdshus och restauranger, eller vid Spränga brygga, där det inte finns någon service. Går du hela etappen rekommenderar leden motsols. Kortare turer som går med barnvagn eller rullstol: grusvägen norrut från Gruvbryggan till Kroka eller Barnens bad, eller österut förbi värdshuset och gruvhålen till Rävstavik.

Båten går året om från Årsta brygga och tar 35–75 minuter till Gruvbryggan enligt Waxholmsbolagets höst- och vårtidtabell. På flera turer ska resan beställas minst en timme före avgång. Alla avgångar: [Båt till Utö](/o/uto/komma-dit).

### Ålö – 13,2 km, utmanande
Ålö ligger söder om Utö. Etappen ska gås motsols, och leden skriver att du behöver kunna gå i alla miljöer och klara dig själv. Från Utö går en förbindelseled på 4,6 kilometer, klassad som lätt. Båt går från Nynäshamn via Nåttarö och Rånö till bryggan vid Båtshaket, där du sommartid kan äta och hyra cykel.

### Ornö – 34,1 km, medel
Ornö är den längsta etappen på hela leden. Den är märkt som två dagsetapper som båda börjar vid Hässelmara, där bilfärjan från Dalarö lägger till, och slutar i hamnen vid Ornö kyrka. SL-bussen går på asfaltsvägen mellan Lättinge, Hässelmara och Skinnardal, och för en övernattning pekar leden på Ornö Skärgårdshotell i Brunnsviken eller Sundby B&B. Mer om ön: [Vandring på Ornö och Utö](/blogg/vandring-orno-uto).

Kortare alternativ: från Sundby gård går en drygt sex kilometer lång, lättvandrad rundslinga på grusvägar och stigar. Den är till stora delar framkomlig med barnvagn eller rullstol, men inte hela vägen runt.

Bilfärjan från Dalarö till Hässelmara tar ungefär 30 minuter. Alla alternativ: [Båt till Ornö](/o/orno/komma-dit).

### Fjärdlång – 11,7 km, medel
Etappen på [Fjärdlång](/o/fjardlang) börjar vid den allmänna bryggan där Waxholmsbåten lägger till, och leden rekommenderar att du går hela etappen motsols. Det finns ingen service på ön. Sommartid, slutet av juni till mitten av augusti, går Nordsydlinjen hit från Utö och Ornö. Under mellansäsongen går turer från Dalarö fredag till söndag.

## Mellersta skärgården

### Grinda – 9,8 km, medel
På [Grinda](/o/grinda) rekommenderar leden medsols. Norr om Wärdshuset blir stigen smal och teknisk efter campingen. Kortare: Länsstyrelsens natur- och kulturstig är cirka 2,5 kilometer, går runt öns sydöstra del och börjar vid gården Hemviken. Klubbudden är öns högsta punkt, 35 meter.

Waxholmsbolagets båt från Strömkajen tar 1 timme 45 minuter med linje 14 och 1 timme 50 minuter med linje 13. Mer om ön: [Grinda guide](/blogg/grinda-guide-2026).

### Möja – 13,8 km, lätt
Etappen på [Möja](/o/moja) går på grusväg runt den östra och södra kusten. Leden rekommenderar ordningen Långvik, Ramsmora, Löka, Berg och sist Hamn. Skärgårdsbåten lägger till i Berg, Löka, Ramsmora och Långvik, så du kan åka mellan byarna. Möja turistförening har också en uppmärkt naturstig på 12 kilometer mellan Hamn och Ramsmora genom Björndalens naturreservat.

Buss 434 från Slussen till Sollenkroka och båt därifrån tar enligt Värmdö kommun cirka 2,5 timmar, och båt hela vägen från Strömkajen cirka 3–4 timmar. Mer om ön: [Möja](/blogg/dolda-parlor-moja).

### Sandhamn – 8,1 km, lätt
Etappen på [Sandhamn](/o/sandhamn) börjar vid den allmänna bryggan, och leden rekommenderar medsols. Här är leden sparsamt uppmärkt. Värmdö kommuns Sandhamnsstigen, cirka 8 kilometer, går också runt Sandön förbi Trouville. Året runt tar du dig dit via Stavsnäs: Waxholmsbolagets linje 16 på 40–60 minuter eller Sandhamnslinjen på 30 minuter. Mer om ön: [Sandhamn guide](/blogg/sandhamn-guide-2026).

### Bullerö i Nämdöskärgårdens nationalpark
[Bullerö](/o/bullero) är entrén till Nämdöskärgårdens nationalpark. Här finns vandringsleder av olika svårighetsgrad, en badstrand och en tältplats, och delar av ön är tillgänglighetsanpassade. Under högsäsong går turbåt från Stavsnäs vinterhamn. Mat och dryck går inte att köpa i nationalparken, men vattenflaskan kan fyllas på Bullerö.

## Regler längs lederna
- **Hund:** Stockholm Archipelago Trail anger att hundar ska vara kopplade mars–september. I naturreservaten på Utö och Grinda ska hunden vara kopplad, och i Nämdöskärgårdens nationalpark alltid. Mer: [Skärgård med hund](/blogg/skargard-med-hund).
- **Eld:** respektera eldningsförbud och elda aldrig på klippa. På Utö får du bara elda på iordningställda platser, och i nationalparken på anvisade platser eller i grill på ben.
- **Tält:** på Grinda bara på tältplatsen nära norra bryggan, på Utö bara på anvisade platser. På Bullerös tältplats får du tälta upp till sju dygn.
- **Skräp:** ta med det tillbaka till fastlandet.
   `,
   faqs: [
     // KÄLLA: stockholmarchipelagotrail.com/sv/section/ och etappsidorna Utö, Ornö, Möja och Sandhamn (läst 2026-09-24) – se KÄLLA-kommentaren i content.
     { q: 'Hur lång är Stockholm Archipelago Trail på Utö?', a: 'Etappen på Utö är 18,4 kilometer och klassas som utmanande. Den börjar vid Gruvbryggan eller vid Spränga brygga, och leden rekommenderar att du går motsols.' },
     { q: 'Vilken etapp på Stockholm Archipelago Trail är längst?', a: 'Ornö, 34,1 kilometer. Den är märkt som två dagsetapper som båda börjar vid Hässelmara och slutar i hamnen vid Ornö kyrka.' },
     { q: 'Vilka etapper i mellersta skärgården är lätta?', a: 'Möja, 13,8 kilometer på grusväg, och Sandhamn, 8,1 kilometer, klassas som lätta. Grinda, 9,8 kilometer, klassas som medel.' },
   ],
 },

 'naturhamnar-stockholm-skargard': {
   title: 'Naturhamnar i Stockholms skärgård – regler och platser',
   excerpt: 'Naturhamnar i Stockholms skärgård: vad allemansrätten säger om att ankra, tvådygnsregeln i naturreservaten, Kryssarklubbens bojar och uthamnar samt naturhamnar som Länsstyrelsen pekar ut.',
   category: 'Segling',
   date: '2026-07-28',
   updatedAt: '2026-09-24',
   readTime: '6 min',
   emoji: '⚓',
   tags: ['Naturhamn', 'Naturhamnar Stockholms skärgård', 'Ankring', 'Allemansrätten', 'Segling'],
   // KÄLLA: naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/pa-vatten/, lansstyrelsen.se (Grinda, Finnhamn, Fjärdlång, Huvudskär, Nämdöskärgårdens nationalpark), sxk.se bojar och uthamnar, skargardsstiftelsen.se/omraden/nattaro/ – se KÄLLA-kommentaren i content.
   faqs: [
     { q: 'Får man ankra var som helst i skärgården?', a: 'Enligt Naturvårdsverket får du ankra och tillfälligt förtöja vid en strand som inte tillhör någon tomt och som inte är skyddad för fågelliv eller annat. I naturreservat och nationalparker kan särskilda regler gälla, och vid fågel- och sälskyddsområden får du inte gå i land under vissa delar av året.' },
     { q: 'Hur länge får man ligga i en naturhamn?', a: 'Det finns ingen allmän regel. Naturvårdsverket skriver att man brukar följa samma princip som för tältning, alltså något enstaka dygn. I bland annat Grinda, Finnhamn, Fjärdlång, Huvudskär och Nämdöskärgårdens nationalpark är gränsen två dygn i följd på samma plats.' },
     { q: 'Får alla använda Kryssarklubbens bojar?', a: 'Nej, de blå bojarna kräver medlemskap i Svenska Kryssarklubben. Kryssarklubbens uthamnar, som Norrviken på Runmarö, är däremot öppna för alla båtturister, och Skärgårdsstiftelsens bojar i Östermarsfladen på Nåttarö är fria för alla.' },
   ],
   content: `
<!-- KÄLLA (lästa 2026-09-24): naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/pa-vatten/ ("Du får gå i land, bada, ankra och tillfälligt förtöja vid en strand som inte tillhör någon tomt, eller som är skyddad för fågelliv eller annat."; "Det finns inte heller någon regel för hur länge du får ligga för ankar på samma plats. Man brukar använda sig av samma princip som för tältning, och det är något enstaka dygn."; "Om du har tänkt att ligga för ankar eller förtöja en längre tid vid någon annans strand behöver du fråga markägaren om lov."; "I nationalparker och naturreservat kan det till exempel finnas särskilda regler om att elda, tälta eller förtöja en båt. Vid fågel- eller sälskyddsområden får du inte stiga iland under en viss tid av året."; "Förbuden märks ofta ut med gula eller röd/gula skyltar."; "Använd en hink med tättslutande lock om båten saknar toalett med avloppstank."; "Åker du båt ska du visa gott sjömanskap och känna till regler och föreskrifter som gäller för de vatten du färdas i."). sxk.se/batliv/toalettavfall-och-sjomackar ("Sedan den 1 april 2015 är det förbjudet att släppa ut toalettavfall från fritidsbåtar i hav, sjöar och inre vattendrag."). sxk.se/bojar-hamnar-och-farleder/hamnar/naturhamnar-och-ankarplatser ("Naturhamnar är vikar och platser som SXK:s medlemmar funnit vägen till och vill rekommendera andra att använda."; "I syfte att underlätta landförtöjning har bergöglor anordnats på andra ställen."; "Nedan finns några särskilt intressanta besöksmål."; "Jungfruskär, Värmdö"; "Koxviken på Biskopsön, Värmdö"). sxk.se/bojar-hamnar-och-farleder/bojar-mooring-buoys ("Över 260 bojar har ideella krafter i Kryssarklubben lagt ut."; "För att förtöja vid Kryssarklubbens blåa bojar behöver du vara medlem i Kryssarklubben."; "rekommenderad högsta totala deplacement, som är 8 ton"). sxk.se/bojar-hamnar-och-farleder/hamnar/uthamnar ("Norrviken, Runmarö"; "Uthamn med fem blå svajbojar och sex akterbojar (röda) för bryggförtöjning. Brygga, toa och sopmaja."; "Uthamnarna är tillgängliga för alla båtturister, även för icke SXK-medlemmar."). lansstyrelsen.se Grinda naturreservat ("Gästhamn finns i Hemviken och naturhamn i Hästholmssundet."; förbjudet att "för längre tid än två dygn i följd förankra båt vid samma strand"). lansstyrelsen.se Granholmen ("Munkhamnen är en utmärkt och välbesökt naturhamn."; "Reservatet ligger på nordvästra delen av Granholmen, 2,5 kilometer söder om Möja."; förbjudet att "förankra båt vid samma strand mer än två dygn i följd"). lansstyrelsen.se Gällnö ("Du når reservatets alla delar med egen båt och det finns flera fina naturhamnar."; förbjudet att "framföra motorbåt eller vattenskoter i Norrviken"; "under längre tid än två dygn i följd förankra båt vid samma strand"). skargardsstiftelsen.se/omraden/gallno-karklo/ ("Torsviken är särskilt uppskattad med naturhamn, sandstrand och tältplats."). lansstyrelsen.se Finnhamn ("Naturhamnar vid Djupfladen, Söder-Långholm och Korsholm."; "för längre tid än två dygn i följd förankra båt vid samma strand"). lansstyrelsen.se Nåttarö ("Östermarsfladen i norr" ... "bland båtfolk"; förbjudet att "under längre tid än två dygn i följd förankra båt vid annan plats än brygga eller båthamn"). skargardsstiftelsen.se/omraden/nattaro/ ("naturhamnen Östermarsfladen finns våra populära förtöjningsbojar som är fria för alla att använda"). lansstyrelsen.se Fjärdlång ("Fina naturhamnar finns på flera platser på norra delen av Fjärdlång."; förbjudet att "för längre tid än två dygn i följd, tälta eller förankra båt på samma ställe"; "framföra motordriven farkost med högre hastighet än 7 knop inom 100 m från land"). lansstyrelsen.se Huvudskär ("Det finns gott om fina naturhamnar i reservatet"; "ligger tio kilometer sydost om Ornö"; "Reservatet gränsar i norr till Fjärdlångs naturreservat"; "för längre tid än två dygn i följd förankra båt vid samma strand"). skargardsstiftelsen.se/omraden/huvudskar/ ("i fladen mellan Ålandsskär och Lökskär blir det ibland fullt med båtar."). lansstyrelsen.se Jungfruskär ("fyra kilometer söder om Nämdö"; tillträdesförbud i fågelskyddsområde "under tiden 1 februari till 15 augusti") och Biskopsö ("åtta kilometer söder om Nämdö"; sälskyddsområde "under tiden 1 februari till 15 augusti"). lansstyrelsen.se Nämdöskärgårdens nationalpark ("Här finns gott om naturhamnar"; "Du får ankra eller lägga till med fartyg på samma plats upp till två dygn i följd."; "Du får inte köra motordrivet fartyg snabbare än 5 knop inom 100 meter från land."; "I vissa särskilt känsliga områden är det förbjudet att ankra"). rodlogaboden.se ("It is possible to find a safe natural harbour in all winds."). lansstyrelsen.se Svenska Högarna ("Mellan ön Skrubban och Ytterhamnen finns angöringsbojar som ägs och sköts av Svenska Kryssarklubben, allmänheten kan mot betalning angöra vid bojarna."; förbjudet att "ankra båt eller fartyg inom område som angivits på karta"). Tidigare version (borttagen 2026-09-24) listade naturhamnar som inte gick att belägga i någon tillåten källa: Ostlunden i Östersundet på Möja, Sydöstnängsudden på Rånö, "Rånöviken söder om Utö", norra änden av Svartsö, "Kymöndö – Sundet" (felstavat) och "Innerskäret" på Fjärdlång, som dessutom felaktigt placerades söder om Ornö (Fjärdlång gränsar i söder mot Huvudskär, som ligger sydost om Ornö). Borttaget utan källa: att de vanligaste vindarna är S, SW och W, att 2–5 meters djup är idealiskt, rådet att vara ankrad före kl 15–16, rekommendationen av en viss sjökortsapp och påståendet om eldförbud vid torr väderlek. -->
En naturhamn är en vik där du ankrar eller förtöjer utanför en gästhamn. Enligt Naturvårdsverket ingår det i allemansrätten att ankra och tillfälligt förtöja vid en strand som inte tillhör någon tomt. I naturreservaten gäller dessutom egna föreskrifter. Här är reglerna och naturhamnar som Länsstyrelsen, Skärgårdsstiftelsen och Svenska Kryssarklubben (SXK) nämner.

## Vad allemansrätten säger
- Du får gå i land, bada, ankra och tillfälligt förtöja vid en strand som inte tillhör någon tomt och som inte är skyddad för fågelliv eller annat.
- Det finns ingen regel för hur länge du får ligga för ankar på samma plats. Naturvårdsverket skriver att man brukar följa samma princip som för tältning – något enstaka dygn.
- Vill du ligga längre vid någon annans strand behöver du fråga markägaren om lov.
- Vid fågel- och sälskyddsområden får du inte gå i land under vissa delar av året. Förbuden märks ofta ut med gula eller röd/gula skyltar.
- Sedan 1 april 2015 är det förbjudet att släppa ut toalettavfall från fritidsbåtar. Saknar båten toalett med avloppstank rekommenderar Naturvårdsverket en hink med tättslutande lock.

## Naturreservat och nationalpark: oftast två dygn
Många naturhamnar ligger i naturreservat. På Grinda, Granholmen, Gällnö, Finnhamn, Nåttarö, Fjärdlång och Huvudskär förbjuder föreskrifterna att båten ligger förankrad längre än två dygn i följd på samma ställe. I Nämdöskärgårdens nationalpark gäller samma gräns, och där får du inte köra motorbåt fortare än 5 knop inom 100 meter från land. I vissa känsliga områden i nationalparken är det förbjudet att ankra. Föreskrifterna för varje reservat står på Länsstyrelsens sida för reservatet.

## Bojar, uthamnar och bergöglor
- **SXK:s blå bojar:** Kryssarklubben har lagt ut över 260 bojar längs kusten. Du behöver vara medlem för att förtöja vid dem, och rekommenderat högsta deplacement är 8 ton.
- **SXK:s uthamn i Norrviken på Runmarö:** fem blå svajbojar och sex röda akterbojar för bryggförtöjning, brygga, toalett och sopmaja. Uthamnarna är öppna för alla båtturister, även den som inte är medlem. Se [Kryssarklubbens uthamn](/upptack/kryssarklubbens-uthamn).
- **Östermarsfladen på Nåttarö:** Skärgårdsstiftelsens förtöjningsbojar är fria för alla.
- **Bergöglor:** SXK har satt upp bergöglor på en del platser för att underlätta landförtöjning.

## Naturhamnar som nämns av Länsstyrelsen och Skärgårdsstiftelsen

### Mellersta skärgården
- [Grinda](/o/grinda) – naturhamn i Hästholmssundet. Gästhamnen ligger i Hemviken.
- **Granholmen** – Munkhamnen i Granholmens naturreservat, 2,5 kilometer söder om [Möja](/o/moja).
- [Gällnö](/o/gallno) – flera naturhamnar runt ön. Torsviken har naturhamn, sandstrand och tältplats. I Norrviken är motorbåt och vattenskoter förbjudna.
- [Finnhamn](/o/finnhamn) – naturhamnar vid Djupfladen, Söder-Långholm och Korsholm.
- [Runmarö](/o/runmaro) – SXK:s uthamn i Norrviken.

### Runt Nämdö
- **Jungfruskär** – naturreservat fyra kilometer söder om Nämdö, som SXK tar upp bland sina besöksmål. Fågelskyddsområdet får inte beträdas 1 februari–15 augusti.
- **Koxviken på Biskopsön** – också ett av SXK:s besöksmål. Biskopsö naturreservat ligger åtta kilometer söder om Nämdö, och sälskyddsområdet är stängt 1 februari–15 augusti.
- [Bullerö](/o/bullero) och Nämdöskärgårdens nationalpark – enligt Länsstyrelsen finns här gott om naturhamnar.

### Södra skärgården
- [Nåttarö](/o/nattaro) – Östermarsfladen i norr, med Skärgårdsstiftelsens bojar.
- [Fjärdlång](/o/fjardlang) – naturhamnar på flera platser på norra delen av ön. I reservatet får du inte köra fortare än 7 knop inom 100 meter från land.
- [Huvudskär](/o/huvudskar) – reservatet ligger tio kilometer sydost om Ornö och har gott om naturhamnar. Fladen mellan Ålandsskär och Lökskär blir ibland full med båtar.

### Ytterskärgården
- [Rödlöga](/o/rodloga) – enligt Rödlögaboden finns en skyddad naturhamn i alla vindar.
- [Svenska Högarna](/o/svenska-hogarna) – mellan Skrubban och Ytterhamnen finns SXK:s angöringsbojar, där allmänheten kan förtöja mot betalning. Inom vissa markerade områden är ankring förbjuden.

## Mer att läsa
- [Sjömackar och ankring i skärgården](/blogg/bransle-ankring-skargard)
- [Grilla i naturhamnen](/blogg/grilla-naturhamn)
- [Gästhamnar i Stockholms skärgård](/blogg/gasthamnar-guide)
   `,
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
[Grinda](/o/grinda) är ett naturreservat i Stockholms mellersta skärgård som ägs och förvaltas av Skärgårdsstiftelsen. Stockholms stad köpte ön 1947, och enligt Länsstyrelsen har den sedan dess blivit ett viktigt friluftsområde. På ön finns värdshus, gästhamn, tältplats och lantbruk. Här är det du behöver för ett besök.

## Båt till Grinda
Waxholmsbolagets båtar från Strömkajen tar ungefär 1 timme 45 minuter till Södra Grinda (linje 14) eller 1 timme 50 minuter (linje 13). Enligt Länsstyrelsen trafikeras både Norra och Södra bryggan året om av Waxholmsbolaget och Cinderella. Alla avgångar: [Båt till Grinda](/o/grinda/komma-dit).

## Äta
- **Grinda Wärdshus** ligger mitt på ön med utsikt över Saxarfjärden och serverar skärgårdsmat.
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
   title: 'Utflykter i Stockholms skärgård – elva öar och restider',
   excerpt: 'Utflykter i Stockholms skärgård: restid och vad som finns på Fjäderholmarna, Vaxholm, Grinda, Gällnö, Möja, Sandhamn, Utö, Ålö, Ornö, Fjärdlång och Bullerö, plus vilka biljetter som gäller.',
   category: 'Inspiration',
   date: '2026-07-28',
   updatedAt: '2026-09-24',
   readTime: '8 min',
   emoji: '🗺️',
   tags: ['Utflykter', 'Dagstur', 'Stockholms skärgård', 'Båt från Stockholm', 'Skärgårdsöar'],
   content: `
<!-- KÄLLA (läst 2026-09-24 om inget annat anges). Fjäderholmarna (se /blogg/fjaderholmarna-dagstur och island-data.ts): stromma.com/sv-se/stockholm/utflykter/dagsutflykter/fjaderholmarna/ ("Avgår från: Strandvägen & Nacka Strand"; "Strandvägen - Kajplatsområde 13"; "Endast 30 minuters båtresa från city"; "ÅTER MAJ 2027"; läst 2026-09-21); Waxholmsbolaget tabell 2 (kund.printhuset-sthlm.se/wa/h2.pdf, gäller 2 april–18 juni och 17 augusti–12 december 2026: Fjäderholmarna angörs på vissa turer med "X = trafikeras utan fast avgångstid"); fjaderholmarna.se (Restaurang Rökeriet, Fjäderholmarnas Krog, Fjäderholmarnas Bryggeri, hantverkare; "Fjäderholmarna har nu säsongsöppet"). Vaxholm (se /blogg/vaxholm-guide): Waxholmsbolaget tabell 11 Strömkajen–Vaxholm ca 55–70 min; SL buss 670 Tekniska högskolan–Vaxholm; sfv.se Vaxholms kastell (på ön Vaxholmen, museet invigt 1964). Grinda (se /blogg/grinda-guide-2026): Waxholmsbolagets reseplanerare, läst 2026-09-19 (linje 14 1 tim 45 min, linje 13 1 tim 50 min); lansstyrelsen.se Grinda ("Skyddat sedan: 2000"; natur- och kulturstig "cirka 2,5 km"); skargardsstiftelsen.se (Wärdshuset, badplatsen Källviken). Gällnö (se /blogg/cykling-moja-gallno och island-data.ts): gallno.se ("Båten från Strömkajen eller Strandvägen tar mellan 1,5 – 2 timmar"; "trafikeras av både Waxholmsbolaget och Strömma/Cinderella-båtarna"; cykel och kajak sommartid); lansstyrelsen.se Gällnö ("Skyddat sedan: 1978, utvidgat 2017 och 2024"); skargardsstiftelsen.se/omraden/gallno-karklo (Torsviken "sandstrand och tältplats", "en välbevarad jättegryta som bildades av inlandsisen för omkring 10 000 år sedan"). Möja (se /blogg/dolda-parlor-moja): varmdo.se Möja.pdf (buss 434 Slussen–Sollenkroka och båt "restid ca 2,5 timme"; "båt från Strömkajen tar ca 3-4 timmar"; "Kyrkan uppfördes 1768"); visitmoja.se (naturstig Hamn–Ramsmora 12 km); rolandsvenssonmuseet.se ("Museet öppnade 2014"). Sandhamn (se /blogg/sandhamn-guide-2026): Waxholmsbolaget tabell 16 (Stavsnäs–Sandhamn 40–60 min), battaxi.se/sandhamnslinjen-2 (30 min), Strömma Cinderella 2026 (30/4–27/9, 2 tim 30 min), Waxholmsbolaget tabell 15 ("GÄLLER 19 JUNI 2026 – 16 AUGUSTI 2026", Strömkajen 10.00 → Sandhamn 13.45); varmdo.se Trouville (vit sand, ca 20 min promenad); ksss.se historia (grundat 1830); skargardsstiftelsen.se Grönskär (fyren 26 m, 1770). Utö (se /blogg/uto-guide): lansstyrelsen.se Utö ("Pendeltåg till Västerhaninge. Buss till Årsta brygga. Waxholmsbåt året om till Gruvbryggan"); Waxholmsbolaget tabell 21 (Årsta brygga–Gruvbryggan 35–75 min); kulturarvstockholm.se (gruvdriften upphörde 1879); skargardsstiftelsen.se (väderkvarnen "byggd 1791", "Utö är en riktig cykel-ö"). Ålö: stockholmarchipelagotrail.com/sv/section/etapp-alo/ ("Du åker till Ålö från Nynäshamn. Med reguljär tur via Nåttarö och Rånö. Du kan också gå eller cykla från Utö."; "Under sommaren kan man äta och hyra cyklar vid Båtshaket. Med cykel kan du cykla 12 km till Utö Gruvbryggan längs grusvägen."; "Utmanande 13.2 km"); lansstyrelsen.se/stockholm/besoksmal/naturreservat/alo-rano.html (via island-data.ts: skyddat sedan 2008, Skärgårdsstiftelsen markägare och förvaltare, Ålö har broförbindelse med Utö); skargardsstiftelsen.se/omraden/uto (Ålö Storsand "nås med båt eller via vandringsled"). Ornö (se /blogg/vandring-orno-uto): lansstyrelsen.se Sundby ("SL-buss till Dalarö (Hotellbryggan). Vägfärja till Ornö"; rundslinga "drygt sex kilometer"); ornosjotrafik.se ("Överfarten tar ca 30 minuter"); haninge.se Ornö ("södra skärgårdens största ö"; Kyrkviken med "museum, bibliotek, gästbryggor och cykeluthyrning"). Fjärdlång: stockholmarchipelagotrail.com/sv/section/etapp-fjardlang/ ("Du åker till Fjärdlång från Utö och Ornö under sommarmånaderna (slutet av juni – mitten av augusti) med Nordsydlinjen"; "Under mellansäsongerna går det turer från Dalarö fredag – söndag. Missa inte söndagens retur färja."; "det inte finns någon service på ön"; "Från 1909 ägdes ön av bankmagnaten Ernest Thiel som lät uppföra en villa ritad av samma arkitekt som numera Grinda Wärdshus, Ernst Stenhammar."; "en stor del av ön är naturreservat som ägs och förvaltas av Skärgårdstiftelsen"; "Medel 11.7 km"). Bullerö: lansstyrelsen.se/stockholm/besoksmal/nationalparker/namdoskargardens-nationalpark.html ("Bullerö är nationalparkens entré"; "en varm raststuga och vedeldad bastu som är öppna året om"; "ett litet museum i konstnären Bruno Liljefors före detta jaktstuga"; "Under högsäsongen går turbåt till entrén på Bullerö från Stavsnäs vinterhamn på Värmdö."; "Ta med egen mat och dryck – inget sådant finns att köpa i nationalparken."; "Skyddat sedan: 2025"). Biljetter: waxholmsbolaget.se/biljetter-och-priser/mer-om-biljetter/alla-sl-biljetter-galler-mellan-44-bryggor ("Du kan resa med SL-biljett i skärgårdstrafiken mellan Strömkajen i innerstan och Vaxholm med omnejd"; "SL-biljetter gäller endast på de linjer som går via Vaxholm"; exemplet Strömkajen–Grinda = SL-biljett till Vaxholm och Waxholmsbolaget-biljett Vaxholm–Grinda); sl.se/biljetter/sortiment-och-regler/biljetter-for-resor-med-waxholmsbolagets-skargardsbatar (14 september–29 april gäller SL-periodbiljetter på 30 dagar eller mer i hela Waxholmsbolagets trafik; 30 april–13 september krävs Waxholmsbolaget-biljett utanför SL-området); waxholmsbolaget.se/biljetter-och-priser/Enkelbiljetter/enkelbiljett-180-minuter (köps i SL-appen eller ombord). Biljettsidorna lästa 2026-09-19. Tidigare version (borttagen 2026-09-24) hade titeln "De 12 bästa utflykterna ... 2026", en tabell med påhittad svårighetsgrad och kostnad, och påståendet att skärgården är "30 000 öar" utan källa. Fel som rättats: Fjäderholmarna "25 minuter med Waxholmsbåten från Strömkajen, avgår var 30:e minut" (rätt: Strömma från Strandvägen ca 30 min, Waxholmsbolaget bara vissa turer vår och höst); Vaxholm "buss 676" (rätt: 670) och "den bästa räksmörgåsen"; Grinda "direktbåt (1h 20min)" och "promenad runt ön på 4 km" (rätt: 1 tim 45–50 min; stigen är ca 2,5 km); Möja "bilfri" och restider på "3 tim 05" och "2 tim 35" utan källa; Sandhamn "snabbåt från Stavsnäs (40 min) eller Waxholmsbåt från Strömkajen (2,5 h)"; Utö via "pendeltåg till Nynäshamn + båt (ca 1 timme)" och sandstränderna "Barnens bad, Stora Sand" (Utö nås från Årsta brygga); Ornö "Bil krävs (vägfärja från Nynäshamn)" och "runt-öled" (färjan går från Dalarö och tar gående, SL-buss dit); Bullerö och Fjärdlång som bara nås med charter eller egen båt; Gällnö i "Norra Stockholms skärgård" (Gällnö ligger i mellersta skärgården) med kajak "i närheten"; kombinationsturen Möja–Sandhamn och charter av segelbåt utan källa; bokningsråd "helst i mars–april"; FAQ-svaret om Utö via Nynäshamn. -->
Elva öar i Stockholms skärgård som du når utan egen båt, grupperade efter hur du reser dit från Stockholm. För varje ö står restiden enligt operatörerna och några saker som finns på ön. Alla restider gäller enkel resa.

## Under en timme

### Fjäderholmarna – cirka 30 minuter
Strömmas båt från Strandvägen kajplats 13 eller Nacka Strand tar cirka 30 minuter. Den går under sommarhalvåret. Vår och höst lägger Waxholmsbolagets linje 2 till vid Fjäderholmarna på vissa turer, utan fast tid. På Stora Fjäderholmen finns Rökeriet, krog, bryggeri och hantverkare, som har säsongsöppet. [Fjäderholmarna dagstur](/blogg/fjaderholmarna-dagstur).

### Vaxholm – ungefär en timme
Waxholmsbolagets båt från Strömkajen tar ungefär en timme, och buss 670 går från Tekniska högskolan. Vaxholms kastell ligger på ön Vaxholmen mitt i sundet, och museet där invigdes 1964. [Vaxholm dagstur](/blogg/vaxholm-guide).

## Två timmar eller mindre med båt från stan

### Grinda – 1 timme 45–50 minuter
Waxholmsbolagets båt från Strömkajen, linje 13 eller 14. Grinda är naturreservat sedan 2000. Här finns Grinda Wärdshus, badplatsen Källviken och en natur- och kulturstig på cirka 2,5 kilometer. [Grinda guide](/blogg/grinda-guide-2026).

### Gällnö – 1,5–2 timmar
Waxholmsbolaget och Strömmas Cinderellabåtar från Strömkajen eller Strandvägen. Gällnö är naturreservat sedan 1978. Vid Torsviken finns sandstrand, tältplats och en jättegryta från inlandsisen, och på sommaren hyrs cykel och kajak ut. [Gällnö på Svalla](/o/gallno).

## Buss och båt

### Möja – cirka 2,5 timmar
Buss 434 från Slussen till Sollenkroka och båt därifrån. Båt hela vägen från Strömkajen tar cirka 3–4 timmar. Möja kyrka uppfördes 1768, Roland Svensson-museet vid Ramsmora brygga öppnade 2014, och naturstigen mellan Hamn och Ramsmora är 12 kilometer. [Möja](/blogg/dolda-parlor-moja).

### Sandhamn – 30–60 minuter från Stavsnäs
Buss från Slussen till Stavsnäs vinterhamn, sedan Waxholmsbolagets linje 16 (40–60 minuter) eller Sandhamnslinjen (30 minuter). Cinderella från Strandvägen tar 2 timmar 30 minuter (säsong 2026: 30 april–27 september), och Waxholmsbåten från Strömkajen minst 3 timmar 45 minuter (bara sommartid, 2026: 19 juni–16 augusti). På ön finns stranden Trouville, KSSS som grundades 1830 och, öster om ön, Grönskärs fyr från 1770. [Sandhamn guide](/blogg/sandhamn-guide-2026).

### Utö – båt från Årsta brygga
Pendeltåg till Västerhaninge, buss 846 till Årsta brygga och Waxholmsbåt året om till Gruvbryggan, 35–75 minuter enligt höst- och vårtidtabellen. I Gruvbyn står väderkvarnen från 1791, och gruvdriften upphörde 1879. Utö är en cykel-ö med cykeluthyrning dagsvis. [Utö guide](/blogg/uto-guide).

### Ålö – båt från Nynäshamn
Båt går från Nynäshamn via Nåttarö och Rånö till Ålö, som har broförbindelse med Utö. Från Gruvbryggan på Utö är det 12 kilometer att cykla längs grusvägen. Ålö ingår i naturreservatet Ålö-Rånö, och Ålö Storsand nås med båt eller via vandringsled. På sommaren kan du äta och hyra cykel vid Båtshaket.

### Ornö – cirka 30 minuter från Dalarö
SL-buss till Dalarö och bilfärjan till Hässelmara. Ornö är södra skärgårdens största ö. I Kyrkviken finns museum, bibliotek och cykeluthyrning, och från Sundby gård går en drygt sex kilometer lång rundslinga. [Vandring på Ornö och Utö](/blogg/vandring-orno-uto).

## Sommar- och helgturer

### Fjärdlång
Mellan slutet av juni och mitten av augusti går Nordsydlinjen hit från Utö och Ornö. Under mellansäsongen går turer från Dalarö fredag till söndag, och Stockholm Archipelago Trail påminner om söndagens returtur. Det finns ingen service på ön. En stor del av Fjärdlång är naturreservat som Skärgårdsstiftelsen äger och förvaltar, och från 1909 ägdes ön av bankmannen Ernest Thiel, som lät bygga en villa ritad av Ernst Stenhammar. [Fjärdlång på Svalla](/o/fjardlang).

### Bullerö
Under högsäsong går turbåt från Stavsnäs vinterhamn till Bullerö, entrén till Nämdöskärgårdens nationalpark som bildades 2025. Här finns ett litet museum i Bruno Liljefors före detta jaktstuga och en vedeldad bastu som är öppen året om. Mat och dryck går inte att köpa i nationalparken. [Bullerö på Svalla](/o/bullero).

## Biljetter på Waxholmsbåten
- SL-biljetter gäller mellan Strömkajen och Vaxholm med omnejd, på de linjer som går via Vaxholm.
- 30 april–13 september behövs Waxholmsbolaget-biljett utanför det området, till exempel på sträckan Vaxholm–Grinda.
- 14 september–29 april gäller SL-periodbiljetter på 30 dagar eller mer i hela Waxholmsbolagets trafik.
- Waxholmsbolaget-biljetter köps i SL-appen eller ombord. Strömma, Cinderella och Sandhamnslinjen har egna biljetter.
   `,
   faqs: [
     // KÄLLA: stromma.com Fjäderholmarna, Waxholmsbolaget tabell 2 och 21, Waxholmsbolaget och sl.se om SL-biljetter i skärgårdstrafiken, lansstyrelsen.se Utö – se KÄLLA-kommentaren i content.
     { q: 'Hur lång tid tar båten till Fjäderholmarna?', a: 'Strömmas båt från Strandvägen tar cirka 30 minuter under sommarhalvåret. Vår och höst lägger Waxholmsbolagets linje 2 till vid Fjäderholmarna på vissa turer.' },
     { q: 'Gäller SL-kortet på Waxholmsbåtarna?', a: 'SL-biljetter gäller mellan Strömkajen och Vaxholm med omnejd. 14 september–29 april gäller SL-periodbiljetter på 30 dagar eller mer i hela Waxholmsbolagets trafik. Övrig tid behövs Waxholmsbolaget-biljett längre ut.' },
     { q: 'Hur tar man sig till Utö utan bil?', a: 'Med pendeltåg till Västerhaninge, buss 846 till Årsta brygga och Waxholmsbåt året om till Gruvbryggan, 35–75 minuter. Från Nynäshamn går båt till grannön Ålö, som har bro till Utö.' },
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
