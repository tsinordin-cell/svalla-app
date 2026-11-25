# Databasändringar i batch 01 (tabellen restaurants)

Underlag för Toms beslut, 2026-11-25. 113 UPDATE-satser i register/b01/ut/<ö>.sql. *Före* är villkoret i satsen (WHERE), alltså värdet satsen kräver i produktion för att skriva. MÄTT med SELECT 2026-11-25: alla satser som ska köras träffar exakt en rad (Trouville-satsen två, en per strand). Tre satser har redan sina nya värden sedan P0-rättelserna den 3 november och träffar 0 rader: husaro.sql #1 och #5 och grinda.sql #8.

Fem poster döljs (hidden_at, går att ångra; inget raderas): Stora och Lilla Trouvillestranden (dubbletter, Toms beslut 6), PUB Alma och Sandhamns Glassigaste Ställe (ingen tillåten källa, Toms beslut 6) och Lilla Haket & Ninas Bod på Utö (inget belagt namn; Redaktörens förslag).

Inget har körts. Satserna körs först efter Toms ja, en fil i taget, med SELECT före och efter.


## fjaderholmarna.sql

**fjaderholmarna.sql#1 · rokeriet-fjaderholmarna**
- latitude: före 59.3208 → efter 59.3294071
- longitude: före 18.1628 → efter 18.1760774

**fjaderholmarna.sql#2 · fjaderholmarna-bryggeri**
- latitude: före 59.3283 → efter 59.3291303
- longitude: före 18.175 → efter 18.1751220

**fjaderholmarna.sql#3 · fjaderholmarna-bryggeri**
- name: före 'Fjäderholmarnas Bryggeri Taproom' → efter 'Fjäderholmarnas Bryggeri'

**fjaderholmarna.sql#4 · fjaderholmarnas-gasthamn**
- description: före 'Gästhamnen ligger på Stora Fjäderholmen utanför Blockhusudden vid inloppet till Stockholm och har 35 gästplatser med förtöjning vid boj. Hamndjupet är mellan 1 och 8 meter, och dusch ingår. Hamnvärd är Sjöstation Fjäderholmarna.' → efter 'Fjäderholmarnas gästhamn ligger på Stora Fjäderholmen i Lidingö kommun, utanför Blockhusudden vid inloppet till Stockholm. Hamnen har 35 gästplatser med förtöjning vid boj. Svenska Gästhamnar anger el, färskvatten, toalett och dusch, och duschen ingår. Hamnvärd är Sjöstation Fjäderholmarna.'


## grinda.sql

**grinda.sql#1 · grinda-sjomack**
- description: före 'Grinda Sjömack ligger i direkt anslutning till gästhamnen och säljer bensin 98, diesel och gasol. Macken har kortautomat och är öppen året om, utom mellan kl. 22 och 05. Enklare båttillbehör och kioskvaror finns i Aktivitetshuset vid bryggan.' → efter 'Grinda Sjömack är en sjömack i direkt anslutning till gästhamnen på Grinda i Värmdö kommun och säljer bensin 98, diesel och gasol. Macken har kortautomat för de tider den är obemannad och är öppen året om, utom nattetid. Enklare båttillbehör och kioskvaror finns i Aktivitetshuset vid bryggan.'

**grinda.sql#2 · framfickan-grinda**
- type: före 'cafe' → efter 'restaurant'

**grinda.sql#3 · grinda-lanthandel-cafe**
- latitude: före 59.4128 → efter 59.4130702
- longitude: före 18.5576 → efter 18.5592303

**grinda.sql#4 · grinda-wardshus**
- description: före 'Grinda Wärdshus vid Södra bryggan på Grinda ligger i ett hus som har sett ut över Saxarfjärden sedan 1906 och serverar skärgårdsmat. I viken finns gästhamnen med el, dusch och toalett, och sjömacken säljer bensin, diesel och gasol.' → efter 'Grinda Wärdshus är en restaurang med hotell mitt på Grinda i Värmdö kommun, en knapp kilometers promenad från både Södra och Norra bryggan. Wärdshuset ligger i en sommarvilla med utsikt över Saxarfjärden, som enligt Länsstyrelsen uppfördes 1907 efter ritning av arkitekten Ernst Stenhammar, och köket serverar klassisk skärgårdsmat. Från månadsskiftet mellan augusti och september 2026 renoveras husets tak och fasad, och Grinda Wärdshus räknar med nypremiär i maj 2027. I anslutning till wärdshuset ligger gästhamnen i Hemviken med el, dusch och toalett, och sjömacken säljer bensin 98, diesel och gasol.'

**grinda.sql#5 · hemmesta-sjocafe**
- type: före 'restaurant' → efter 'cafe'

**grinda.sql#6 · hemmesta-sjocafe**
- latitude: före 59.41017 → efter 59.4127412
- longitude: före 18.49936 → efter 18.4963563

**grinda.sql#7 · grinda-sodra-bryggan**
- description: före 'Södra ångbåtsbryggan på Grinda, i Grinda naturreservat, trafikeras av Waxholmsbolaget, som skriver att Grinda har trafik året om. Under säsong angör även Strömmas Cinderellabåt Södra Grinda; 2026 gick den 30 april–27 september. Vid bryggan finns ett barnvänligt bad, grillplatser och torrdass. Gästhamn för fritidsbåtar finns i Hemviken och naturhamn i Hästholmssundet.' → efter 'Södra ångbåtsbryggan på Grinda, i Grinda naturreservat, trafikeras av Waxholmsbolaget, som skriver att Grinda har trafik året om. Under säsong angör även Strömmas Cinderellabåt Södra Grinda; 2026 gick den 30 april till 27 september. Vid bryggan finns ett barnvänligt bad, grillplatser och torrdass. Gästhamn för fritidsbåtar finns i Hemviken och naturhamn i Hästholmssundet.'

**grinda.sql#8 · grinda-norra-bryggan** (redan gjord, träffar 0 rader)
- description: före 'Norra bryggan är en av Grindas ångbåtsbryggor och trafikeras året om av Waxholmsbolaget och Cinderella. Vid bryggan finns ett barnvänligt bad, och öns tältplats ligger nära norra bryggan. För egen båt finns gästhamn i Hemviken och naturhamn i Hästholmssundet.' → efter 'Norra bryggan är en av Grindas ångbåtsbryggor och trafikeras av Waxholmsbolaget, som skriver att Grinda har trafik året om. Vid bryggan finns ett barnvänligt bad, och öns tältplats ligger nära norra bryggan. För egen båt finns gästhamn i Hemviken och naturhamn i Hästholmssundet.'


## husaro.sql

**husaro.sql#1 · husaro-gasthamn-cafe** (redan gjord, träffar 0 rader)
- description: före 'Vid Husarö gästhamn fungerar Sjöstationen som minilivs med ekologiska livsmedel, kaffe och grillade paninis. Drivmedel kan köpas med kortautomat året runt.' → efter 'Husarö Handel gästhamn är gästhamnen vid ångbåtsbryggan på Husarö i Österåkers kommun. Pontonbryggan har Y-bommar, mooringlinor och bojar; plats bokas via Dockspot. Sjömacken är stängd i väntan på tillstånd, så här går det inte att tanka. Gästhamnen är obemannad, elen är avstängd och färskvatten saknas.'

**husaro.sql#2 · husaro-gasthamn-cafe**
- name: före 'Husarö Gästhamn & Café' → efter 'Husarö Handel gästhamn'

**husaro.sql#3 · husaro-gasthamn-cafe**
- latitude: före 59.5064 → efter 59.5018917
- longitude: före 18.8475 → efter 18.8454895

**husaro.sql#4 · husaro-gasthamn-cafe**
- website: före 'https://www.svenskagasthamnar.se/stockholms-skargard/husaro/' → efter 'http://husarohandel.se/'

**husaro.sql#5 · soderlangholm** (redan gjord, träffar 0 rader)
- description: före 'Gästhamnen vid Söder-Långholm i Finnhamn har en 40 meter lång pontonbrygga i viken sydväst om ön, vid farleden, med 30 platser. Här finns dass och sopmaja, medan krog och lanthandel finns på Stora Jolpan. Finnhamn ägs av Skärgårdsstiftelsen och har båttrafik med Cinderella och Waxholmsbåt till Stockholm.' → efter 'Gästhamnen på Söder-Långholm vid Finnhamn i Österåkers kommun är en 40 meter lång pontonbrygga med 30 platser i viken sydväst om ön, vid farleden. Här finns dass och sopmaja, medan krog och lanthandel finns på Stora Jolpan. Finnhamn ägs av Skärgårdsstiftelsen och har båttrafik med Waxholmsbåt till Stockholm.'

**husaro.sql#6 · soderlangholm**
- name: före 'Söderlångholm' → efter 'Söder-Långholm'


## mallar.sql

**mallar.sql#1 · dalaro-smadalaro-gard**
- island: före 'Dalarö' → efter 'Smådalarö'


## moja.sql

**moja.sql#1 · loka-gasthamn**
- description: före 'Löka är en liten fiskehamn på östra Möja med sju gästplatser och ett hamndjup på 1,5–2 meter; hamnens västra del är mycket grund. Här finns begränsat med färskvatten, toalett och miljöstation för hushållssopor och glas. Y-bommar installeras på gästplatserna, vilket begränsar båtbredden till 2,75 meter inklusive fendrar.' → efter 'Löka gästhamn är en gästhamn i en liten fiskehamn på östra Möja i Värmdö kommun. Gästplatserna ligger direkt till höger innanför piren, och förtöjning sker med ankare. Enligt hamnens uppgift på Svenska Gästhamnar håller man på att installera Y-bommar på gästplatserna, och båtbredden blir då högst 2,75 meter inklusive fendrar. Här finns toalett, begränsat med färskvatten från handpump och miljöstation för hushållssopor och glas. Waxholmsbolagets linje 14 angör Löka; i tabellerna för 2026 står bryggan på de flesta turer med X, som betyder att den trafikeras utan fast avgångstid. I byn finns också klippbad.'

**moja.sql#2 · loka-gasthamn**
- website: före 'https://www.svenskagasthamnar.se/' → efter 'https://www.svenskagasthamnar.se/stockholms-skargard/moja-loka/'

**moja.sql#3 · kyrkviken**
- description: före 'Kyrkviken är en liten fiskehamn på Möjas sydöstra sida med gästbrygga längst in i hamnen, och gästplatser finns även längst ut i viken på både östra och västra sidan. Hamndjupet är 1,8–2,5 meter och förtöjning sker med ankare. Hamnen ligger nära Berg, Möjas största by, med kyrka och hembygdsmuseum.' → efter 'Kyrkviken är en liten fiskehamn med gästhamn på Möjas sydöstra sida i Värmdö kommun, med gästbrygga längst in i hamnen; gästplatser finns även längst ut i viken på både den östra sidan och den västra, vid kyrkan. Förtöjning sker med ankare, och här finns toalett och vatten i dunk. Hamnen ligger nära Berg, Möjas största by, med hembygdsmuseum.'

**moja.sql#4 · bastuhuset**
- description: före 'Bastuhuset är en bastu i Värmdö kommun.' → efter 'Bastun ligger på Stora Kalholmen, ön mellan Finnhamn och Möja i Stockholms mellersta skärgård. På ön ligger STF Stora Kalholmen Vandrarhem, där bastu finns.'

**moja.sql#5 · bastuhuset**
- name: före 'Bastuhuset' → efter 'Bastu på Stora Kalholmen'

**moja.sql#6 · moja-bageri**
- type: före 'cafe' → efter 'restaurant'

**moja.sql#7 · moja-bageri**
- description: före 'Möja Värdshus & Bageri ligger nära Kyrkviken på Möja, där det har bakats sedan 1951. Nuvarande ägare tog över 2019, byggde en större matsal och köpte in ny bageriutrustning. Här finns också rum att boka.' → efter 'Möja Värdshus & Bageri ligger nära Kyrkviken på Möja. Enligt värdshuset startade bageriet 1951, och 2019 tog nuvarande fastighetsägare över verksamheten, gjorde en omfattande renovering för en större matsal och investerade i ny bageriutrustning för att återta bageripositionen. Här finns också rum, som bara går att boka 18 juni till 15 augusti.'

**moja.sql#8 · bastuhuset**
- website: före 'http://www.finnhamn.se/' → efter null

**moja.sql#9 · hamncafet-moja**
- website: före 'https://www.facebook.com/profile.php?id=100065104277412' → efter 'https://www.facebook.com/profile.php?id=100067003784963'

**moja.sql#10 · hamncafet-moja**
- latitude: före 59.4069 → efter 59.4064678
- longitude: före 18.8858 → efter 18.8840547

**moja.sql#11 · moja-stf-moja-gard**
- type: före 'hotel' → efter 'hostel'

**moja.sql#12 · moja-stf-moja-gard**
- description: före 'Möja vandrarhem är ett familjedrivet STF-vandrarhem vid landsvägen i Berg på södra Möja, med rum för två eller fyra personer och självhushåll. Det har öppet april–december och hyr ut cyklar, och via systerföretaget Möja Outdoor går det att hyra kajak, SUP, roddbåt och vattenskoter. Coop, som har öppet året runt, ligger 300 meter bort.' → efter 'Möja vandrarhem är ett familjedrivet STF-vandrarhem vid landsvägen i Berg på södra Möja, med rum för två eller fyra personer och självhushåll. Det har öppet april till december och hyr ut cyklar, kajak, SUP, roddbåt och vattenskoter, och via systerföretaget Möja Outdoor går det att ordna transport med båt eller fyrhjuling med släp. Coop Berg, som har öppet året runt, ligger 300 meter bort.'

**moja.sql#13 · bastuhuset**
- formatted_address: före '184 99 Finnhamn' → efter null


## sandhamn.sql

**sandhamn.sql#1 · dykarbaren**
- latitude: före 59.2888 → efter 59.2885549

**sandhamn.sql#2 · dykarbaren**
- longitude: före 18.9103 → efter 18.9143792

**sandhamn.sql#3 · cafe-ankaret**
- latitude: före 59.2875 → efter 59.2893019

**sandhamn.sql#4 · cafe-ankaret**
- longitude: före 18.9108 → efter 18.9141727

**sandhamn.sql#5 · sandhamns-bageriet**
- latitude: före 59.2884 → efter 59.2897678

**sandhamn.sql#6 · sandhamns-bageriet**
- longitude: före 18.9118 → efter 18.9141812

**sandhamn.sql#7 · bistro-sands**
- latitude: före 59.2882 → efter 59.2879473

**sandhamn.sql#8 · bistro-sands**
- longitude: före 18.9115 → efter 18.914614

**sandhamn.sql#9 · vasterudde-strand**
- name: före 'Västerudde strand' → efter 'Stranden vid Västerudden'

**sandhamn.sql#10 · vasterudde-strand**
- description: före 'Västerudde strand är en badplats på Sandhamn i Värmdö kommun.' → efter 'Stranden vid Västerudden ligger på Sandöns västra udde, på Sandhamn i Värmdö kommun. Från Västerudden är det omkring 1,5 kilometer längs Stockholm Archipelago Trail till ångbåtsbryggan i byn.'

**sandhamn.sql#11 · vasterudde-strand**
- website: före 'http://www.varmdo.se/' → efter null

**sandhamn.sql#12 · sandhamns-glassigaste-stalle**
- description: före 'Sandhamns Glassigaste Ställe är ett glasscafé på Sandhamn i Stockholms mellersta skärgård.' → efter ''

**sandhamn.sql#13 · pub-alma-sandhamn**
- description: före 'PUB Alma är en pub på Sandhamn i Stockholms mellersta skärgård.' → efter ''

**sandhamn.sql#14 · cafe-ankaret**
- name: före 'Café Ankaret' → efter 'Ankaret'

**sandhamn.sql#15 · cafe-ankaret**
- description: före 'Café Ankaret är ett kafé i Sandhamn, på adressen Sandhamn 310.' → efter 'Ankaret är ett kafé med butik och konstgalleri i Sandhamn i Värmdö kommun.'

**sandhamn.sql#16 · dykarbaren**
- description: före 'Dykarbaren på Sandhamn 425 är bar och restaurang i ett hus som uppfördes 1921. Baren växte fram 1982, när huset användes för dykutbildningar på Sandhamn. Uteserveringen ligger mitt emot, vid strandkanten. Säsongen är maj–september, och bord bokas bara inomhus eftersom uteserveringen inte går att vädersäkra.' → efter 'Dykarbaren på Sandhamn 425 i Värmdö kommun är bar och restaurang, med baren och matplatserna på nedervåningen. Enligt Dykarbaren växte café- och barverksamheten fram när man höll dykutbildningar på Sandhamn 1982, och samma ägare med familj har drivit stället i mer än 20 år. Uteserveringen ligger mitt emot, vid strandkanten. Säsongen 2026 var maj till september, och bord bokas bara inomhus eftersom uteserveringen inte helt går att vädersäkra.'

**sandhamn.sql#17 · ksss-gasthamn-lokholmen-trollsundet**
- description: före 'Trollsundet är den första delen av KSSS gästhamn på Lökholmen, strax nordost om Sandhamns gästhamn, och rymmer upp till 90 båtar med möjlighet till landström. Tilläggning sker med mooringlina, boj eller Y-bom och det är förbjudet att ankra; under högsommaren är platserna i första hand reserverade för KSSS medlemmar. På ön finns toaletter, duschar, bastu och sophus.' → efter 'Trollsundet är den första delen av KSSS gästhamn på Lökholmen, som ligger i yttre havsbandet intill Sandhamn, strax nordost om Sandhamns gästhamn. Här ryms upp till 90 båtar, och båten kan anslutas till landström mot avgift. Tilläggning sker med mooringlina, boj eller Y-bom och det är förbjudet att ankra; under högsommaren är platserna i första hand reserverade för KSSS medlemmar. På ön finns toaletter, duschar, bastu och sophus, men från oktober till maj stänger KSSS av all el och vatten på ön och därmed även servicehus och bastu. Under högsäsong går en passbåt mellan Lökholmen och Sandhamn minst en gång i timmen.'

**sandhamn.sql#18 · stora-trouvillestranden, lilla-trouville-stranden**
- hidden_at: före null → efter dold
- skäl: 'Dubblett av Trouville (Toms beslut 6, faktagranskning b01 2026-11-09)'

**sandhamn.sql#19 · pub-alma-sandhamn**
- hidden_at: före null → efter dold
- skäl: 'Ingen tillåten källa bekräftar att puben finns (Toms beslut 6, faktagranskning b01)'

**sandhamn.sql#20 · sandhamns-glassigaste-stalle**
- hidden_at: före null → efter dold
- skäl: 'Ingen tillåten källa bekräftar att glasscaféet finns (Toms beslut 6, faktagranskning b01)'

**sandhamn.sql#21 · vasterudde-strand**
- type: före 'beach' → efter 'nature'

**sandhamn.sql#22 · ksss-gasthamn-lokholmen-trollsundet**
- island: före 'Sandhamn' → efter 'Lökholmen'

**sandhamn.sql#23 · cafe-strindbergsgarden**
- name: före 'Café Strindbergsgården' → efter 'Strindberg''s Champagne Club'

**sandhamn.sql#24 · cafe-strindbergsgarden**
- type: före 'cafe' → efter 'restaurant'

**sandhamn.sql#25 · cafe-strindbergsgarden**
- latitude: före 59.2891 → efter 59.2890639
- longitude: före 18.9121 → efter 18.9138771

**sandhamn.sql#26 · cafe-strindbergsgarden**
- website: före 'http://www.facebook.com/cafestrindbergsgarden' → efter 'https://strindbergs.se/'

**sandhamn.sql#27 · cafe-strindbergsgarden**
- description: före 'Café Strindbergsgården är ett kafé i Sandhamn, på adressen Sandhamn 109.' → efter 'Strindberg''s Champagne Club är en champagnebar, restaurang och medlemsklubb i Strindbergsgården, Sandhamn 111, i hamnen på Sandhamn i Värmdö kommun. Klubben skriver att alla är välkomna till restaurangen och att medlemskapet, som är kostnadsfritt, dessutom ger inbjudningar och andra erbjudanden. Restaurangen har stängt efter sommarsäsongen 2026, och klubben har ännu inte planerat in datum för öppning under 2027.'

**sandhamn.sql#28 · cafe-strindbergsgarden**
- formatted_address: före 'Sandhamn 109, 130 39 Sandhamn' → efter 'Strindbergsgården, Sandhamn 111, Sandhamn'

**sandhamn.sql#29 · cafe-strindbergsgarden**
- menu: före 'Kaffe, te, hembakat, enkel lunch.' → efter null

**sandhamn.sql#30 · cafe-strindbergsgarden**
- opening_hours: före 'Juni–Augusti: dagligen 10–16.' → efter null

**sandhamn.sql#31 · cafe-strindbergsgarden**
- categories: före '{cafe,coffee,hidden_gem}' → efter '{}'

**sandhamn.sql#32 · cafe-strindbergsgarden**
- facilities: före '{cafe}' → efter '{}'

**sandhamn.sql#33 · cafe-strindbergsgarden**
- best_for: före '{couples,family,day_trip}' → efter '{}'

**sandhamn.sql#34 · cafe-strindbergsgarden**
- tags: före '{sandhamn,strindberg,kultur,fika}' → efter '{sandhamn,strindberg}'

**sandhamn.sql#35 · cafe-strindbergsgarden**
- google_place_id: före 'ChIJ0wJoUwR09UYR5LcGchumH5Y' → efter null
- google_photo_refs: före (se villkoret) → efter null
- google_rating: före (se villkoret) → efter null
- google_ratings_total: före (se villkoret) → efter null
- google_rating_updated: före (se villkoret) → efter null
- image_url: före (se villkoret) → efter null


## styrso.sql

**styrso.sql#1 · karran**
- description: före 'Kärran är en restaurang på Brännö i Göteborgs södra skärgård.' → efter 'Kärran är en rosa foodtruck på Varpevägen 3 på Brännö i Göteborgs södra skärgård. Den serverar asiatiska rätter med en svensk touch, hemmagjorda bakverk, juicer och iskaffe och har öppet april till september.'

**styrso.sql#2 · vrango-gasthamn**
- description: före 'Vrångö gästhamn har plats för cirka 130 gästande båtar och en dagbrygga för kortare besök, och hamnen ligger väl skyddad för vind och vågor. Hamndjupet är 3,5–5 meter. I gästhamnen finns toaletter, duschar, tvättmaskin, sopkärl, miljöstation och sugtömning, och i hamnen finns mataffär och matställen.' → efter 'Vrångö gästhamn är gästhamnen på Vrångö i Göteborgs kommun, med plats för cirka 130 gästande båtar och en dagbrygga för kortare besök. Hamnen ligger väl skyddad för vind och vågor, och båtarna förtöjs med fören mot bryggan och fast akterfäste eller boj. I gästhamnen finns toaletter, duschar, tvättmaskin, sopkärl, miljöstation och sugtömning, och i hamnen finns fiskekaj, mataffär och matställen. Skärgårdsbåten lägger till i Mittvik, en knapp kilometer bort på andra sidan ön.'

**styrso.sql#3 · donso-hamnkrog**
- name: före 'Donsö Hamnkrog' → efter 'Isbolaget Hotell & Restaurang'

**styrso.sql#4 · donso-hamnkrog**
- description: före 'Donsö Hamnkrog är en restaurang på Donsö i Göteborgs södra skärgård.' → efter 'Isbolaget Hotell & Restaurang är ett hotell och en restaurang längst ut på piren i Donsö hamn, på Donsö i Göteborgs södra skärgård. Här serveras bland annat fisk och skaldjur, dagens lunch, pizza och à la carte. Hundar är välkomna.'

**styrso.sql#5 · donso-hamnkrog**
- website: före 'http://www.donsohamn.se/' → efter 'https://www.isbolaget.com/'

**styrso.sql#6 · donso-hamnkrog**
- latitude: före 57.5985718 → efter 57.5980216
- longitude: före 11.792968 → efter 11.7910826

**styrso.sql#7 · donso-fiskrokeri**
- latitude: före 57.5983 → efter 57.5991484
- longitude: före 11.7919 → efter 11.7950433

**styrso.sql#8 · branno-vardshus**
- description: före 'Brännö Värdshus är en restaurang på Brännö vars meny präglas av närheten till havet, med fisk och skaldjur. Maten serveras i den gamla lotsbostaden eller i en glashuspaviljong, och till värdshuset hör ett café och ett eget bageri som har öppet under sommaren. Övernattning finns i gästrum och på pensionat Baggen.' → efter 'Brännö Värdshus är en restaurang på Brännö vars meny präglas av närheten till havet, med fisk och skaldjur. Maten serveras i värdshusets små rum eller i en glashuspaviljong, och restaurangen har bland annat dagens lunch, skärgårdslunch på lördagar och söndagsmiddag. Till värdshuset hör ett café och ett eget bageri, men i november 2026 var bageriet enligt värdshuset tillfälligt stängt och väntades öppna igen inom kort. Övernattning finns i gästrum och på pensionat Baggen.'

**styrso.sql#9 · donso-hamnkrog**
- phone: före '+46 31 97 17 32' → efter '+46 31 97 27 00'


## uto.sql

**uto.sql#1 · uto-bykrog**
- description: före 'Utö Bykrog är en sommaröppen restaurang i Edesnäs på Utö, vid vägen mellan Gruvbyn och Ålö. Adressen är Edesnäs Gård 3.' → efter 'Utö by Krog är en skärgårdsrestaurang i Edesnäs på Utö i Haninge kommun. Adressen är Edesnäs Gård 3, och restaurangen tar emot bordsbokningar och förfrågningar om catering. Enligt restaurangen vill den vara en mötesplats för både öbor och besökare.'

**uto.sql#2 · uto-bykrog**
- name: före 'Utö Bykrog' → efter 'Utö by Krog'

**uto.sql#3 · gruvbryggan**
- description: före 'Gruvbryggan är Waxholmsbolagets brygga på Utö, där båtarna på linje 21 från Årsta brygga lägger till. Bryggan ligger i norra delen av Utö gästhamn, där också sjömacken finns.' → efter 'Gruvbryggan är den mest trafikerade av Waxholmsbolagets bryggor på Utö i Haninge kommun, och här lägger båtarna på linje 21 från Årsta brygga till. Längre söderut angör båtarna också Näsudden och Spränga. Bryggan ligger i norra delen av Utö gästhamn, där också sjömacken finns.'

**uto.sql#4 · lilla-haket-ninas-bod**
- description: före 'Lilla Haket & Ninas Bod är ett kafé i Gruvbyn på Utö, Haninge kommun.' → efter 'Platsen ligger vid Bygatan i Gruvbyn på Utö, Haninge kommun. I Gruvbyn finns enligt Skärgårdsstiftelsen bland annat gästhamn, turistbyrå, livsmedelsbutik och bageri.'

**uto.sql#5 · lilla-haket-ninas-bod**
- hidden_at: före null → efter dold
- skäl: 'Inget namn är belagt av verksamheten eller en myndighet (faktagranskning batch 01, uto-0401, ub01-k016)'

**uto.sql#6 · bakgarden-uto**
- description: före 'Bakgården på Bygatan på Utö är ett bageri som säljer bröd och bakverk. Under sommaren finns också ett kafé.' → efter 'Bakgården Utö ligger i Gruvbyn på Utö, Haninge kommun. I Gruvbyn finns ett bageri där det går att köpa nybakat bröd.'

**uto.sql#7 · uto-gasthamn-sjomack**
- description: före 'Utö Sjömack har tankning dygnet runt och mopeduthyrning.' → efter 'Utö Sjömack är sjömacken i norra delen av Utö gästhamn i Gruvbyn på Utö, Haninge kommun. Här går det att tanka båten och hyra moped.'

**uto.sql#8 · uto-vardshus**
- description: före 'Utö Värdshus är hotell, restaurang och konferensanläggning på Utö, med 80 rum och hotellstugor (200 bäddar) och 12 mötesrum. Till värdshuset hör också Seglarbaren och Bakfickan.' → efter 'Utö Värdshus är hotell, restaurang och konferensanläggning i Gruvbyn på Utö, Haninge kommun. Hotellrummen finns i Kvarnvillan, Stenhotellet och hotellstugorna, och för konferenser finns 14 mötesrum för grupper på 2 till 100 personer. Till värdshuset hör också Seglarbaren och Bakfickan.'

**uto.sql#9 · bryggans-lilla-kok-uto**
- name: före 'Bryggans lilla kök' → efter 'Bryggans café och bar'

**uto.sql#10 · stf-vandrarhem-uto**
- name: före 'Utö Vandrarhem' → efter 'Utö Vandrarhem Skärgården'

**uto.sql#11 · gruvbryggan**
- latitude: före 58.9703736 → efter 58.9704915
- longitude: före 18.3234346 → efter 18.3251962

**uto.sql#12 · bryggans-lilla-kok-uto**
- latitude: före 58.96988 → efter 58.9703328
- longitude: före 18.324775 → efter 18.3274586

**uto.sql#13 · uto-gasthamn-sjomack**
- latitude: före 58.9702425 → efter 58.9706315
- longitude: före 18.3246747 → efter 18.3272322

**uto.sql#14 · bakgarden-uto**
- latitude: före 58.9699 → efter 58.9694382
- longitude: före 18.3255 → efter 18.3225705

**uto.sql#15 · bakfickan-uto**
- latitude: före 58.97 → efter 58.967438
- longitude: före 18.3265 → efter 18.3304686

**uto.sql#16 · stf-vandrarhem-uto**
- description: före 'Utö Vandrarhem ligger i backen upp mot Utö Värdshus, i grosshandlare Levins badhotell från förra sekelskiftet. Det har öppet april–oktober och har 73 bäddar, gemensamma kök för självhushåll och dusch och wc i korridoren. Husdjur är inte tillåtna, och man checkar in i värdshusets reception.' → efter 'Utö Vandrarhem Skärgården är ett vandrarhem i Gruvbyn på Utö i Haninge kommun, i backen upp mot Utö Värdshus. Huset är en hotellbyggnad i trä i tre våningar, som enligt Haninge kommuns kulturmiljöinventering byggdes efter 1878, när Utö planerades som badort, och är ett av de första hotellen från den tiden. Vandrarhemmet har öppet april till oktober och har 73 bäddar, gemensamma kök för självhushåll och dusch och wc i korridoren. Husdjur är inte tillåtna, och man checkar in i värdshusets reception.'

**uto.sql#17 · rano-brygga**
- name: före 'Rånö Brygga' → efter 'Rånökällan'

**uto.sql#18 · rano-brygga**
- description: före null → efter 'Rånökällan är en restaurang på Rånö i Haninge kommun, med uteservering och veranda med utsikt över Ernviken. Den ligger intill livsmedelsbutiken Rånö Livs vid Ernviken, nära Waxholmsbåtens brygga, och drivs av Rånö Brygga, som också har stugbyn på ön. Restaurangen serverar mat, kylda drycker, glass och färskt bröd. Enligt restaurangen var sista dagen för säsongen lördagen den 8 augusti, och den öppnar igen i juni 2027.'

**uto.sql#19 · rano-brygga**
- website: före null → efter 'https://rano.se/krog/'

**uto.sql#20 · rano-brygga**
- latitude: före 58.919054 → efter 58.9197616
- longitude: före 18.177884 → efter 18.1763804

**uto.sql#21 · uto-camping-och-stugor**
- type: före 'hotel' → efter 'camping'


## vaxholm.sql

**vaxholm.sql#1 · magasinet-gustavsberg**
- description: före 'Magasinet ligger vid vattnet på Fiskaregatan 1 i Vaxholm.' → efter 'Magasinet i Waxholm är en bistro vid vattnet på Fiskaregatan 1 i Vaxholm, Vaxholms kommun. I den gamla smedjan finns också inredningsbutik, festlokal och yogastudio. Bistron har stängt för vintern 2026 till 2027 och öppnar igen våren 2027.'

**vaxholm.sql#2 · vaxholms-fastning-cafe**
- island: före 'Kastellet' → efter 'Vaxholmen'

**vaxholm.sql#3 · norrhamnen**
- website: före 'https://www.vaxholm.se/' → efter 'https://www.vaxholm.se/trafik--infrastruktur/hamnar-kajer-och-batplatser/kommunala-batplatser'

**vaxholm.sql#4 · norrbergshamnen**
- website: före 'http://www.vaxholm.se/' → efter 'https://www.vaxholm.se/trafik--infrastruktur/hamnar-kajer-och-batplatser'

**vaxholm.sql#5 · norrbergshamnen**
- description: före 'I Norrbergshamnen i Vaxholm finns fem gästplatser på utsidan av pontonen. Tillfälliga besökare som kommer sjövägen kan använda kommunens tidsbestämda platser i högst tre timmar utan avgift. Vaxholms centralt belägna gästhamn, med bland annat dusch, toalett och latrintömning, drivs av Waxholms hamn AB.' → efter 'Norrbergshamnen vid Badhusgatan och Norrbergsplan är en av Vaxholms stads kommunala småbåtshamnar i Vaxholm. Här finns fem gästplatser på utsidan av pontonen, och tillfälliga besökare som kommer sjövägen kan använda kommunens tidsbestämda platser i högst tre timmar utan avgift. Dusch, toalett och latrintömning finns i Vaxholms gästhamn, en egen anläggning som drivs av Waxholms hamn AB på uppdrag av Vaxholms stad.'

**vaxholm.sql#6 · blynasvikens-batklubb**
- description: före 'Blynäsvikens Båtklubbs klubbhamn har numrerade bryggor, en kranbrygga och bojplatser förankrade med kätting. Vid nytillträde gäller båtar upp till 12 m/4 m/8000 kg med ett djupgående på högst 2,20 m. Endast BBK-medlemmar kan i mån av utrymme få gästplats.' → efter 'Blynäsvikens Båtklubbs klubbhamn i Blynäsviken på Vaxön i Vaxholm har numrerade bryggor, en kranbrygga och bojplatser förankrade med kätting eller godkänd mooringslina. Klubben erbjuder inte båtplats till båtar som överstiger 12 m/4 m/8000 kg eller har ett djupgående över 2,20 m. Endast BBK-medlemmar kan i mån av utrymme få gästplats.'

**vaxholm.sql#7 · resaro-marina**
- description: före 'Resarö Marina ligger strax utanför Vaxholm, där farlederna in till Stockholm möts. Anläggningen har pontoner i helbetong med y-bom, el och vatten på samtliga platser, och båtarna får vara högst cirka 33 fot.' → efter 'Resarö Marina ligger på Resarö strax utanför Vaxholm, där farlederna in till Stockholm möts. Anläggningen har pontoner i helbetong med y-bom på samtliga platser samt el och vatten, och båtarna får vara högst cirka 33 fot.'

**vaxholm.sql#8 · resaro-batklubb**
- description: före 'Ytterbygårds bryggor ligger på Ytterby på södra Resarö, strax efter Resarö Marina på Sjöviksvägen. Vid inseglingen har man Tallholmen rakt söderut, och det finns ett par stenar att se upp för mellan Marieskäret och Resarö Marina. Hamnen har 120 båtplatser och sjösättningsramp, färskvatten, el och grillplats.' → efter 'Ytterbygårds bryggor ligger på Ytterby på södra Resarö, strax efter Resarö Marina på Sjöviksvägen. Vid inseglingen har man Tallholmen rakt söderut. Hamnen har 120 båtplatser och sjösättningsramp, färskvatten, el och grillplats. Bryggorna hör till Resarö Båtklubb, en ideell förening bildad 1972 med hemort på Resarö, som har 236 båtplatser i sina fyra hamnar.'

**vaxholm.sql#9 · gronviksbadet**
- formatted_address: före 'Ensjövägen 90, 603 66 Norrköping' → efter 'Grönviksvägen, Rindö'

**vaxholm.sql#10 · bryggan-teno**
- latitude: före 59.39257 → efter 59.392279
- longitude: före 18.33038 → efter 18.328248

**vaxholm.sql#11 · waxholms-gasthamn-och-rent-under-batbotten-tvatt**
- name: före 'Waxholms Gästhamn & Rent Under Båtbotten tvätt' → efter 'Vaxholms Gästhamn'

**vaxholm.sql#12 · vaxholms-fastning-cafe**
- formatted_address: före 'Trädgårdsgatan 19, 185 32 Vaxholm' → efter 'Kastellet, 185 99 Vaxholm'

**vaxholm.sql#13 · tenobadet**
- island: före null → efter 'Bogesundslandet'

**vaxholm.sql#14 · vaxholm-waxholms-camping**
- type: före 'hotel' → efter 'camping'

**vaxholm.sql#15 · magasinet-gustavsberg**
- core_experience: före 'Gamla magasinslokaler, god mat och Gustavsbergs pittoreska hamn – ett genuint alternativ till turistkrogarna.' → efter 'Bistro, inredningsbutik, festlokal och yogastudio under samma tak på Fiskaregatan 1 i Vaxholm.'

**vaxholm.sql#16 · magasinet-gustavsberg**
