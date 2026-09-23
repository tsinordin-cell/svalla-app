-- 2026-09-22: beskrivningar för gästhamnar, block 2 (hamnar utan användbar egen webbplats).
--
-- Källor: hamnens eller operatörens egen sida, kommunen, Länsstyrelsen, Skärgårdsstiftelsen,
-- Region Gotland, Västsverige/Visit Roslagen eller Svenska Gästhamnars sida för just den hamnen.
-- Varje citat nedan är kontrollerat mot en ny hämtning av källsidan (Playwright, 2026-09-22).
-- Svenska Gästhamnars tabellrader (djup, gästplatser, förtöjning) kontrollerades för hand.
-- Inga priser, tider eller telefonnummer. Bara rader utan beskrivning ändras.

-- KÄLLA: https://honoklavahamn.se/gasthamn/ (läst 2026-09-22)
--   "Från kajen når du snabbt matbutik samt ett stort utbud av butiker, restauranger och caféer."
--   "Här finns duschar, toaletter, tvättmaskin och torktumlare."
--   "I Hönö Klåva hamn finns miljöstation, septisug, vatten, diesel (sjömack) och mastkran."
--   "I vår gästhamn tillämpas ingen förbokning av platser."
update restaurants set description = 'Gästhamnen ligger i Hönö Klåva Hamn, en båt- och fiskehamn på Hönö i Göteborgs skärgård, och från kajen är det nära till matbutik, butiker, restauranger och caféer. Servicehuset vid hamnkontoret har duschar, toaletter, tvättmaskin och torktumlare, och i hamnen finns miljöstation, septisug, vatten, diesel och mastkran. Platserna kan inte förbokas.', updated_at = now() where slug = 'hono-klava-gasthamn' and description is null;

-- KÄLLA: https://gasthamnsbolaget.se/gasthamnar-i-bohuslan/hamburgsund-gasthamn/ (läst 2026-09-22)
--   "Hamburgsund gästhamn består av två huvudbryggor: en på fastlandssidan söder om färjan mellan fiskehamnen och marinan"
--   "placering sker långsides på gästhamnsbryggorna"
--   "Det finns en serviceanläggning på Hamburgö och en på fastlandssidan."
--   "På Hamburgö finns möjlighet att tömma porta potti, och på fastlandssidan finns tvättstuga."
--   "I hamnen finns också möjlighet att sortera glas, matavfall, pant och restavfall."
update restaurants set description = 'Hamburgsunds gästhamn består av två huvudbryggor, en på fastlandssidan söder om färjan och en på Hamburgö intill färjeläget, där båtarna ligger långsides. Det finns en serviceanläggning på vardera sidan, med tvättstuga på fastlandet och tömning av porta potti på Hamburgö. I hamnen kan man sortera glas, matavfall, pant och restavfall.', updated_at = now() where slug = 'hamburgsund-gasthamn' and description is null;

-- KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html (läst 2026-09-22)
--   "Norra och södra bryggan trafikeras året om av Waxholmsbolaget och Cinderella."
--   "Grinda har fina barnvänliga bad både vid den södra och norra ångbåtsbryggan."
--   "Grillplatser finns vid södra ångbåtsbryggan och vid tältplatsen."
--   "Torrdass finns vid alla badplatser och vid södra ångbåtsbryggan"
--   "Gästhamn finns i Hemviken och naturhamn i Hästholmssundet."
update restaurants set description = 'Södra ångbåtsbryggan på Grinda, i Grinda naturreservat, trafikeras året om av Waxholmsbolaget och Cinderella. Vid bryggan finns ett barnvänligt bad, grillplatser och torrdass. Gästhamn för fritidsbåtar finns i Hemviken och naturhamn i Hästholmssundet.', updated_at = now() where slug = 'grinda-sodra-bryggan' and description is null;

-- KÄLLA: https://www.vastsverige.com/lysekil/produkter/lysekils-marina/ (läst 2026-09-22)
--   "vackert belägen vid Basteviksholmarna strax norr om Lysekils stad"
--   "Marinan erbjuder över 400 fasta båtplatser och en generös gästhamn med flytbryggor, el, vatten och ett nybyggt servicehus med dusch, toalett, tvätt och HWC."
--   "Precis vid vattnet finns 42 ställplatser för husbil"
--   "serveras närproducerad mat, färska skaldjur och goda drycker"
update restaurants set description = 'Lysekils Marina ligger vid Basteviksholmarna strax norr om Lysekils stad och har över 400 fasta båtplatser samt en gästhamn med flytbryggor, el och vatten. Det nybyggda servicehuset har dusch, toalett, tvätt och HWC, och vid vattnet finns ställplatser för husbil. På Bastevik Bar & Café serveras närproducerad mat och färska skaldjur.', updated_at = now() where slug = 'lysekils-marina-ab-basteviksholmarna' and description is null;

-- KÄLLA: https://www.vaxholm.se/trafik--infrastruktur/hamnar-kajer-och-batplatser (läst 2026-09-22)
--   "I Norrbergshamnen finns fem gästplatser på utsidan av pontonen."
--   "Tillfälliga besökare som kommer sjövägen kan nyttja kommunens tidsbestämda platser om max 3 timmar utan avgift."
--   "Gästhamnen drivs av Waxholms hamn AB på uppdrag av Vaxholms stad."
update restaurants set description = 'I Norrbergshamnen i Vaxholm finns fem gästplatser på utsidan av pontonen. Tillfälliga besökare som kommer sjövägen kan använda kommunens tidsbestämda platser i högst tre timmar utan avgift. Vaxholms centralt belägna gästhamn, med bland annat dusch, toalett och latrintömning, drivs av Waxholms hamn AB.', updated_at = now() where slug = 'norrbergshamnen' and description is null;

-- KÄLLA: https://www.svenskagasthamnar.se/norra-vastkusten/lysekil-norra-hamnen/ (läst 2026-09-22)
--   "Längst ut vid den nya pontonbryggan finns det gästplatser, använd befintliga akterförtöjningar på insidan potonen, långskepps på utsidan."
--   "Det är gångavstånd till centrum och till akvariet Havets Hus."
--   "En vacker strandpromenad går utmed havet norrut mot Ålevik."
update restaurants set description = 'Gästplatserna i Norra Hamnen i Lysekil ligger längst ut vid den nya pontonbryggan, med akterförtöjning på insidan och långskepps på utsidan; hamndjupet är 4–5 meter. Stadsdelen Gamlestan ligger alldeles intill och det är gångavstånd till centrum och akvariet Havets Hus. En strandpromenad går utmed havet norrut mot Ålevik.', updated_at = now() where slug = 'norra-hamnens-gasthamn' and description is null;

-- KÄLLA: https://www.svenskagasthamnar.se/norra-vastkusten/bovallstrand-marinan/ (läst 2026-09-22)
--   "Vid marinan i Vikefjorden omedelbart sydväst om samhället."
--   "Lugn och trafikfri miljö med fritidsbebyggelse."
--   "I samhället finns förutom välsorterad livsmedelsaffär även en restaurang med höga kulinariska ambitioner."
update restaurants set description = 'Bovallstrands Marina ligger i Vikefjorden omedelbart sydväst om samhället, i en lugn och trafikfri miljö med fritidsbebyggelse. Gästplatserna har pålförtöjning och hamndjupet är 3–5 meter. Marinan har färskvatten, toalett, dusch, el, kran och mastkran, och i samhället finns livsmedelsaffär och restaurang.', updated_at = now() where slug = 'bovallstrands-marina' and description is null;

-- KÄLLA: https://www.svenskagasthamnar.se/stockholms-skargard/finnhamn-med-paradisviken-och-soder-langholm/ (läst 2026-09-22)
--   "Pontonbrygga, 40m, i viken sydväst om Söder-Långholm vid farleden."
--   "Finnhamn har krog med takbar, lanthandel, stugby och tältplats."
--   "Cinderella och Waxholmsbåt till Stockholm."
--   "Finnhamn ägs sedan 1998 av Skärgårdsstiftelsen"
update restaurants set description = 'Gästhamnen vid Söder-Långholm i Finnhamn har en 40 meter lång pontonbrygga i viken sydväst om ön, vid farleden, med 30 platser. Här finns dass och sopmaja, medan krog och lanthandel finns på Stora Jolpan. Finnhamn ägs av Skärgårdsstiftelsen och har båttrafik med Cinderella och Waxholmsbåt till Stockholm.', updated_at = now() where slug = 'soderlangholm' and description is null;

-- KÄLLA: https://www.svenskagasthamnar.se/stockholms-skargard/moja-loka/ (läst 2026-09-22)
--   "Liten fiskehamn på östra Möja. Hamnen är mycket grund i sin västra del."
--   "Då vi håller på att installera y-bommar på gästplatserna så blir båtbredderna på max 2,75m inklusive fendrar."
update restaurants set description = 'Löka är en liten fiskehamn på östra Möja med sju gästplatser och ett hamndjup på 1,5–2 meter; hamnens västra del är mycket grund. Här finns begränsat med färskvatten, toalett och miljöstation för hushållssopor och glas. Y-bommar installeras på gästplatserna, vilket begränsar båtbredden till 2,75 meter inklusive fendrar.', updated_at = now() where slug = 'loka-gasthamn' and description is null;

-- KÄLLA: https://www.ksss.se/hamnar/lokholmen/ (läst 2026-09-22)
--   "Den första delen, Trollsundet, som under högsommaren i första hand är reserverad för KSSS medlemmar, rymmer upp till 90 båtar"
--   "I Trollsundet sker tilläggning antingen med mooringlina, boj eller Y-bom."
--   "Det är förbjudet att ankra i Trollsundet"
--   "Lökholmens gästhamn är belägen strax nordost om Sandhamns gästhamn."
--   "finns längs med spängerna beläget mellan Trollsundet och Kroksöfladen"
update restaurants set description = 'Trollsundet är den första delen av KSSS gästhamn på Lökholmen, strax nordost om Sandhamns gästhamn, och rymmer upp till 90 båtar med möjlighet till landström. Tilläggning sker med mooringlina, boj eller Y-bom och det är förbjudet att ankra; under högsommaren är platserna i första hand reserverade för KSSS medlemmar. På ön finns toaletter, duschar, bastu och sophus.', updated_at = now() where slug = 'ksss-gasthamn-lokholmen-trollsundet' and description is null;

-- KÄLLA: https://www.svenskagasthamnar.se/stockholms-skargard/blido/ (läst 2026-09-22)
--   "Hamn i skyddat läge vid restaurang Blidö Brygga."
--   "kan fyllas i dunkar på rest.el duschrum"
--   "Blidö Bio 200 meter bort med biovisningar flera dagar i veckan under sommaren."
update restaurants set description = 'Gästhamnen på Blidö ligger i skyddat läge vid restaurang Blidö Brygga och har 50 gästplatser med förtöjning vid boj, mooringlina eller långsides. Hamndjupet är 2–7 meter och här finns toalett, dusch och tvätt, medan färskvatten kan fyllas i dunkar. Blidö Bio ligger 200 meter bort.', updated_at = now() where slug = 'blido-gasthamn' and description is null;

-- KÄLLA: https://lidovardshus.com/gsthamnen (läst 2026-09-22)
--   "Gästhamnen hittar ni på öns sydvästra sida, i Båthusviken."
--   "Här finns ett 50-tal båtplatser för stävförtöjning med ankare."
--   "I vår hamn kan man inte boka platser utan man tar en plats som är ledig"
--   "Vid Oasen finns toaletter, dusch samt en servering med hemgjorda pizzor"
update restaurants set description = 'Lidös gästhamn ligger i Båthusviken på öns sydvästra sida och har ett 50-tal platser för stävförtöjning med ankare, med ett djup på 1,7–2,7 meter. Platserna kan inte bokas. På bryggan finns eluttag, vid en separat brygga fylls dricksvatten och vid Oasen finns toaletter, dusch och en servering under högsommaren.', updated_at = now() where slug = 'lido-gasthamn' and description is null;

-- KÄLLA: https://www.visitroslagen.se/yxlan (läst 2026-09-22)
--   "På Yxlans nordspets ligger skärgårdssamhället Köpmanholm, öns huvudort."
--   "Waxholmsbolaget angör åtta bryggor på Yxlan; Yxlö, Alsvik, Brokholmen, Duvnäs, Kolsvik, Köpmanholm, Vagnsunda, Yxlövik."
--   "populär mötesplats för ö-borna och båtbesökare vid Köpmanholms brygga"
--   "Strax norr om Köpmanholm på berget finns en trojeborg"
update restaurants set description = 'Köpmanholms brygga ligger vid skärgårdssamhället Köpmanholm på Yxlans nordspets och är en av åtta bryggor på ön som Waxholmsbolaget angör. Köpmanholms Lanthandel & Grill, med livsmedel, grill och bar, är en mötesplats för båtbesökare vid bryggan. Strax norr om samhället finns en trojeborg och på nordöstra sidan ett bad.', updated_at = now() where slug = 'kopmanholms-angbatsbrygga' and description is null;

-- KÄLLA: https://www.orust.se/uppleva-och-gora/gasthamnar/karingons-gasthamn (läst 2026-09-22)
--   "Om du vill uppleva ett unikt fiskesamhälle på en ö längst ut i skärgården ska du besöka Käringön."
--   "Servicebyggnad med toalett, dusch, tvättmaskin och torktumlare."
--   "Hushållsavfall lämnas i gästhamnens sopbod. Kom ihåg att sortera ut glas"
update restaurants set description = 'Käringöns gästhamn ligger i ett fiskesamhälle på en ö längst ut i skärgården och har 125 platser med ett djup på cirka 4 meter. Här finns el, servicebyggnad med toalett, dusch, tvättmaskin och torktumlare samt sugtömningsstation och sopbod. På ön finns mataffär, restaurang och café.', updated_at = now() where slug = 'karingon-gasthamn' and description is null;

-- KÄLLA: https://www.svenskagasthamnar.se/goteborgs-skargard/vrango/ (läst 2026-09-22)
--   "Det finns även en nyutlagd dagbrygga för kortare besök. Hamnen ligger väl skyddad för vind och vågor."
--   "I gästhamnen finns toaletter, duschar, tvättmaskin, sopkärl, miljöstation och septictank sugtömning."
--   "Det finns mataffär och matställen i hamnen."
update restaurants set description = 'Vrångö gästhamn har plats för cirka 130 gästande båtar och en dagbrygga för kortare besök, och hamnen ligger väl skyddad för vind och vågor. Hamndjupet är 3,5–5 meter. I gästhamnen finns toaletter, duschar, tvättmaskin, sopkärl, miljöstation och sugtömning, och i hamnen finns mataffär och matställen.', updated_at = now() where slug = 'vrango-gasthamn' and description is null;

-- KÄLLA: https://www.svenskagasthamnar.se/stockholms-skargard/stockholm-fjaderholmarna/ (läst 2026-09-22)
--   "På Stora Fjäderholmen utanför Blockhusudden vid inloppet till Stockholm."
--   "Båtmuseum, glasblåseri, hantverksbodar, östersjöakvarium m m."
--   "Passbåt t/fr Nybroplan varje halvtimme kl 10-17 samt kvällsturer."
update restaurants set description = 'Gästhamnen ligger på Stora Fjäderholmen utanför Blockhusudden vid inloppet till Stockholm och har 35 gästplatser med förtöjning vid boj. Hamndjupet är 1–8 meter. På ön finns bland annat lekplats, fiskrökeri, båtmuseum, glasblåseri och hantverksbodar, och passbåt går till och från Nybroplan.', updated_at = now() where slug = 'fjaderholmarnas-gasthamn' and description is null;

-- KÄLLA: https://www.grisslehamnsmarina.se/hamnen/ (läst 2026-09-22)
--   "Vår gästhamn har 77 gästplatser och ligger vackert samt välskyddat, med högsta komfort i den västra hamnen i Grisslehamn."
--   "Färskvatten och el finns på bryggorna."
--   "Servicehuset är fräscht med wc, fri dusch och trådlöst internet."
--   "Hamndjupet hos oss är mellan 1-5 meter."
update restaurants set description = 'Gästhamnen vid Grisslehamns Marina ligger i västra hamnen i Grisslehamn bakom en vågbrytare och har 77 gästplatser med förtöjning vid Y-bom eller boj, på 1–5 meters djup. Färskvatten och el finns på bryggorna och servicehuset har wc, dusch och trådlöst internet. Här finns även tömningsstation för septiktankar och sjömack med diesel och bensin.', updated_at = now() where slug = 'grisslehamn-gasthamn' and description is null;

-- KÄLLA: https://www.svenskagasthamnar.se/norra-vastkusten/lysekil-fiskhamnen/ (läst 2026-09-22)
--   "En gästhamn med gångavstånd till livsmedelsaffär, restauranger och sommaraktiviteter."
--   "I anslutning till gästhamnen finns även café och sjömack."
update restaurants set description = 'Fiskhamnens gästhamn i Lysekil har 25 gästplatser med förtöjning vid akterfäste eller långskepps och ett hamndjup på 2–4 meter. I anslutning till gästhamnen finns café och sjömack, och det är gångavstånd till livsmedelsaffär och restauranger.', updated_at = now() where slug = 'fiskehamnen-gasthamn' and description is null;

-- KÄLLA: https://www.sotenas.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/batar-och-hamnar/gasthamnar/kungshamns-gasthamn (läst 2026-09-22)
--   "Kustsamhället Kungshamn är beläget ytterst på halvön Sotenäset och är huvudorten i Sotenäs kommun."
--   "Dusch, WC, tvättstuga, färskvatten, eluttag, wifi, sopor och mycket centralt placerad."
update restaurants set description = 'Kungshamns gästhamn ligger centralt i kustsamhället Kungshamn, ytterst på halvön Sotenäset, och har cirka 100 platser med förtöjning vid bommar, med ankare eller långsides. Vattendjupet är 2,5–5 meter. I hamnen finns dusch, WC, tvättstuga, färskvatten, eluttag, wifi och sopor.', updated_at = now() where slug = 'kungshamn-gasthamn' and description is null;

-- KÄLLA: https://finnhamn.se/hamnar/ (läst 2026-09-22)
--   "Välj mellan klassiska Paradisviken (Djupfladen i sjökortet), Vandrarhemsviken och Söder Långholm."
--   "Som öborna kallar för Ragges Marina, här har du tillgång till vatten, el och gratis WiFi."
--   "Närhet till Ragnars kiosk, bad, fotbollsplan m.m. 10 minuters promenad till Lanthandel och Krog."
--   "Toatömning finns i Båthusviken, nedanför Vandrarhemmet"
update restaurants set description = 'Paradisviken, som heter Djupfladen i sjökortet, är den stora gästhamnen på Finnhamn. Här finns vatten, el och gratis wifi samt sopmaja och mulltoa, och nära ligger Ragnars kiosk, bad och fotbollsplan. Toatömning finns i Båthusviken nedanför vandrarhemmet, och till lanthandel och krog är det tio minuters promenad.', updated_at = now() where slug = 'paradiset-stora-jolpan' and description is null;

-- KÄLLA: https://www.svenskagasthamnar.se/stockholms-skargard/moja-kyrkviken/ (läst 2026-09-22)
--   "Liten fiskehamn på Möjas sydöstra sida med gästbrygga längst in i hamnen."
--   "Det finns även gästplatser längst ut i viken på både östra och västra (vid kyrkan) sidan."
--   "Gästhamnen ligger nära Berg, som är den största byn i Möja."
update restaurants set description = 'Kyrkviken är en liten fiskehamn på Möjas sydöstra sida med gästbrygga längst in i hamnen, och gästplatser finns även längst ut i viken på både östra och västra sidan. Hamndjupet är 1,8–2,5 meter och förtöjning sker med ankare. Hamnen ligger nära Berg, Möjas största by, med kyrka och hembygdsmuseum.', updated_at = now() where slug = 'kyrkviken' and description is null;

-- KÄLLA: https://www.ramsmora.se/ (läst 2026-09-22)
--   "Service, reparationer, båtförvaring och sjösättning — vi tar hand om din båt från A till Ö."
--   "Tryggt och välskyddat läge i Ramsmoraviken."
--   "Inomhus- och utomhusförvaring för över 300 båtar."
update restaurants set description = 'Ramsmora Varv & Marina är ett fullservicevarv i Ramsmoraviken på Ljusterö med bryggplatser i skyddat läge. Varvet erbjuder service, reparationer, sjösättning och båtförvaring, med en lyftkapacitet på 40 ton och inomhus- och utomhusförvaring för över 300 båtar.', updated_at = now() where slug = 'ramsmora-varv-och-marina-ab' and description is null;

-- KÄLLA: https://www.creapreneur.se/dalaro-information (läst 2026-09-22)
--   "på Dalarös sydvästra sida söderifrån före Dalarö kanal."
--   "rena, moderna och tillgängliga toaletter, duschar, bastu, tvättstuga samt sop- och miljöstation och WiFi."
--   "som driver Dalarö Turistbyrå sedan 2007 och arrenderar Dalarö gästhamn av Dalarö båtklubb i Askfatshamnen"
update restaurants set description = 'Dalarö gästhamn ligger i Askfatshamnen på Dalarös sydvästra sida, före Dalarö kanal söderifrån, och drivs tillsammans med turistbyrån. Hamnen har cirka 40 gästplatser med bom och 2–4 meters djup. Här finns toaletter, duschar, bastu, tvättstuga, sop- och miljöstation samt wifi.', updated_at = now() where slug = 'dalaro-turistbyra-och-gasthamn-askfatshamnen' and description is null;

-- KÄLLA: https://www.grisslehamnsmarina.se/singo-camping/ (läst 2026-09-22)
--   "Det finns även en liten småbåtshamn och badbrygga samt bastu."
--   "det är en liten kaj med ytterst begränsade platser och endast för små båtar."
--   "Singö Camping har reception på Grisslehamns Marina."
update restaurants set description = 'Singö Camping ligger vid havet och har en liten småbåtshamn med badbrygga och bastu. Kajen har ytterst begränsade platser och är endast för små båtar. Under säsong finns restaurang och en liten närlivs- och delikatessbutik, och incheckning sker i receptionen på Grisslehamns Marina.', updated_at = now() where slug = 'singo-camping-grisslehamns-marina-och-camping-ab' and description is null;

-- KÄLLA: https://styrsohamn.se/styrs%C3%B6-t%C3%A5ngen/ (läst 2026-09-22)
--   "Som båtgäst i Tången får du tillgång till toaletter samt dusch vid Båtebacken och betalning sker inne på restaurangen."
--   "Vid Styrsö Tångens Gästhamn får du uppleva skärgårds känslan på riktigt!"
--   "Får du för dig att laga egen mat? Då ligger Ica inom räckhåll."
update restaurants set description = 'Tångens gästhamn ligger vid Båtebacken på Styrsö, nära restaurangerna Tångbaren och Båtebacken. För den som vill laga egen mat finns Ica inom räckhåll. Båtgäster har tillgång till toaletter och dusch vid Båtebacken, och betalning sker inne på restaurangen.', updated_at = now() where slug = 'styrso-tangen-gasthamn' and description is null;

-- KÄLLA: https://www.sanduddenuto.se/ (läst 2026-09-22)
--   "Hyr båtplats per dygn, vecka eller för hela säsongen"
--   "EN GÄSTHAMN I KYRKVIKEN PÅ UTÖ"
--   "En oas mitt på Utö Gästhamn Sandudden"
update restaurants set description = 'Gästhamn Sandudden ligger i Kyrkviken, mitt på Utö. Här hyr man båtplats per dygn, per vecka eller för hela säsongen, och platserna kan inte förbokas. El och vatten ingår i hyran för båtplatsen.', updated_at = now() where slug = 'gasthamn-sandudden-uto' and description is null;

-- KÄLLA: https://gasthamnsbolaget.se/gasthamnar-i-bohuslan/grebbestad-gasthamn/ (läst 2026-09-22)
--   "Grebbestad gästhamn har ungefär 150 båtplatser"
--   "går att förboka via Dockspot, medan resten beror på vad som är ledigt när du kommer."
--   "Det finns två serviceanläggningar, en vid hamnkontoret på Grebbestadbryggan och en vid flytbryggan på Vadskär."
--   "Runt gästhamnen möts du av bryggpromenad, butiker, restauranger, uteserveringar och närhet till bad och strandpromenad."
--   "I hamnen finns också möjlighet att sortera glas, matavfall, pant och restavfall."
update restaurants set description = 'Grebbestad gästhamn ligger mitt i Grebbestad med bryggpromenad, butiker och restauranger runt hamnen. Hamnen har ungefär 150 båtplatser, varav cirka 22 kan förbokas via Dockspot. Det finns två serviceanläggningar, vid hamnkontoret på Grebbestadbryggan och vid flytbryggan på Vadskär, samt tvättstuga och sopsortering.', updated_at = now() where slug = 'grebbestad-gasthamn' and description is null;

-- KÄLLA: https://www.svenskagasthamnar.se/norra-vastkusten/stromstad-sodra-hamnen/ (läst 2026-09-22)
--   "Mitt i centrum av Strömstad med närhet till allt."
--   "Hamndjup 1-8 m Gästplatser 250 Förtöjning ankare, bom,longside"
--   "Färskvatten Toalett Dusch Bastu Tvättstuga"
--   "Turistbyrå 100 m Buss/Tåg/Färja B,T,F 100 m"
update restaurants set description = 'Södra hamnen ligger mitt i centrum av Strömstad och har 250 gästplatser med förtöjning vid ankare, bom eller longside på 1–8 meters djup. I hamnen finns färskvatten, el, toalett, dusch, bastu, tvättstuga, latrinvask och septiksug. Buss, tåg och färja finns inom 100 meter.', updated_at = now() where slug = 'stromstad-sodra-hamn' and description is null;

-- KÄLLA: https://gotland.se/trafik-gator-och-parker/hamnar/hamnar-for-fritidsbat (läst 2026-09-22)
--   "Här finns det sju stycken permanenta fritidsbåtplatser."
--   "Här finns det fem gästbåtsplatser. Det finns tillgång till toalett och dusch."
--   "För att kunna nyttja dessa köper man ett kort laddat med olika summor av gästhamnsvärden."
--   "Från Fårösund kan man åka med kollektivtrafiken, linje 20, till Visby."
update restaurants set description = 'Region Gotlands hamn i Fårösund har fem gästbåtsplatser och sju permanenta fritidsbåtplatser. Det finns tillgång till toalett och dusch, och för att använda dem köper man ett laddat kort av gästhamnsvärden. Från Fårösund går kollektivtrafikens linje 20 till Visby.', updated_at = now() where slug = 'farosunds-lanthamn-gotland' and description is null;

-- KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html (läst 2026-09-22)
--   "Grinda har fina barnvänliga bad både vid den södra och norra ångbåtsbryggan."
--   "Norra och södra bryggan trafikeras året om av Waxholmsbolaget och Cinderella."
--   "Tältning är endast tillåten på tältplatsen nära norra bryggan."
--   "Gästhamn finns i Hemviken och naturhamn i Hästholmssundet."
update restaurants set description = 'Norra bryggan är en av Grindas ångbåtsbryggor och trafikeras året om av Waxholmsbolaget och Cinderella. Vid bryggan finns ett barnvänligt bad, och öns tältplats ligger nära norra bryggan. För egen båt finns gästhamn i Hemviken och naturhamn i Hästholmssundet.', updated_at = now() where slug = 'grinda-norra-bryggan' and description is null;

-- KÄLLA: https://skargardsstiftelsen.se/omraden/finnhamn/ (läst 2026-09-22)
--   "Paradisviken och Vandrarhemsviken erbjuder gästhamnsservice med bland annat el och vatten, medan Söder Långholm passar dig som söker ett lugnare och mer naturnära läge."
--   "Trots sitt läge i mellanskärgården är ön lätt att nå med reguljär skärgårdstrafik från Stockholm."
--   "badstrand, kafé och Finnhamns sjökrog med en oslagbar takbar."
update restaurants set description = 'Finnhamn i mellanskärgården har tre hamnar för egen båt: Paradisviken, Vandrarhemsviken och Söder Långholm. Paradisviken och Vandrarhemsviken erbjuder gästhamnsservice med bland annat el och vatten, medan Söder Långholm har ett lugnare och mer naturnära läge. På ön finns bland annat bastu, badstrand, kafé och krog.', updated_at = now() where slug = 'finnhamn' and description is null;

-- KÄLLA: https://www.linanasbryggan.se/faq (läst 2026-09-22)
--   "Hur många båtplatser har ni? 20+"
--   "Finns det toalett? Ja. 3 st. Inklusive 1 handikapptoalett"
--   "De är hjärtligt välkomna till både vår restaurang och café, vi älskar hundar."
update restaurants set description = 'Linanäs gästhamn ligger vid Linanäsbryggan på Ljusterö och har fler än 20 båtplatser. Det finns tre toaletter, varav en handikapptoalett. Vid bryggan finns restaurang och café, där även hundar är välkomna.', updated_at = now() where slug = 'linanas-gasthamn' and description is null;

-- KÄLLA: https://www.utogasthamn.se/ (läst 2026-09-22)
--   "Närmsta bryggan till Utö Gästhamn är Gruvbryggan."
--   "I vår gästhamn finns plats för ca 300 fritidsbåtar."
--   "Vi erbjuder båtplatser för både stora och små båtar med tillgång till el, vatten, bastu, dusch och toalett."
update restaurants set description = 'Gruvbryggan är den brygga som ligger närmast Utö gästhamn. Gästhamnen har plats för ca 300 fritidsbåtar, och båtplatserna har tillgång till el, vatten, bastu, dusch och toalett. Där finns även cykeluthyrning, tvättstuga, kiosk, restaurang och café.', updated_at = now() where slug = 'gruvbryggan' and description is null;

-- KÄLLA: https://www.svenskagasthamnar.se/stockholms-skargard/orno-kyrkviken/ (läst 2026-09-22)
--   "På Ornös östra sida vid ångbåtsbryggan i viken nedanför kyrkan."
--   "Hamndjup 4 m Gästplatser 35 Förtöjning ankare Hamnvärd Ornö-macken GULF"
--   "Toalett 30 m Dusch 30 m"
update restaurants set description = 'Gästhamnen i Kyrkviken ligger på Ornös östra sida vid ångbåtsbryggan, i viken nedanför kyrkan, och Ornö-macken är hamnvärd. Hamnen har 35 gästplatser med ankarförtöjning och 4 meters djup. Här finns diesel, bensin och el, och toalett, dusch och restaurang ligger inom 30 meter.', updated_at = now() where slug = 'ornomacken-gasthamn' and description is null;

-- KÄLLA: https://www.torovarv.se/ (läst 2026-09-22)
--   "VI LIGGER STRAX SÖDER OM NYNÄSHAMN PÅ VACKRA TORÖ"
--   "I butiken säljer vi båttillbehör, båtmotorer och reservdelar."
--   "Vi servar dom flesta förekommande motorer på marknaden"
--   "AUKTORISERAD ÅTERFÖRSÄLJARE OCH VERKSTAD FÖR VOLVO PENTA, SUZUKI"
update restaurants set description = 'Torö Varv ligger strax söder om Nynäshamn på Torö. Varvet är auktoriserad återförsäljare och verkstad för bland annat Volvo Penta och Suzuki och servar de flesta förekommande motorer. I butiken säljs båttillbehör, båtmotorer och reservdelar.', updated_at = now() where slug = 'toro-varv-ab' and description is null;

-- KÄLLA: https://www.vastsverige.com/kungalv/produkter/marstrands-gasthamn/ (läst 2026-09-22)
--   "På den sydöstra delen av Marstrandsön ligger den kommunala gästhamnen."
--   "Bryggorna G, H, D och E är för gästande båtar."
--   "På alla bryggor/pontoner finns el och vatten som ingår i gästhamnsavgiften."
--   "Kajen är förtöjningsplats för gästande båtar över 15 m skrovlängd."
--   "Minsta djup är 3,5 m."
update restaurants set description = 'Den kommunala gästhamnen ligger på sydöstra delen av Marstrandsön, där bryggorna G, H, D och E är till för gästande båtar. Det råder ankringsförbud, och båtarna förtöjs i hamnens fasta akterförtöjningar. Alla bryggor har el och vatten, det finns duschar och toalett, och båtar över 15 meter hänvisas till stenkajen norr om färjeläget med minst 3,5 meters djup.', updated_at = now() where slug = 'marstrand-gasthamn' and description is null;

-- KÄLLA: https://www.brannobatagare.se/hamnar/husvik/ (läst 2026-09-22)
--   "Det finns en gästbrygga i Husvik som drivs av den privata bryggföreningen Helena men det går inte att förboka dessa platser."
--   "Husvik har en ramp och en truck för lyft upp till 3000 kg."
update restaurants set description = 'I Husvik på Brännö finns en gästbrygga som drivs av den privata bryggföreningen Helena, och platserna där går inte att förboka. Hamnen har också en ramp och en truck för lyft upp till 3000 kg, som Brännö Båtägare Förening använder för uppläggning av båtar.', updated_at = now() where slug = 'branno-husvik-gasthamn' and description is null;

-- KÄLLA: https://www.mossholmen.se/marinan/ (läst 2026-09-22)
--   "Lugn hamn på Tjörns västsida belägen vid brofästet innanför Klädesholmen"
--   "40 st (300) Hamndjup: 1 m till 6 m"
--   "Här finns båtplatser, verkstad, sjötapp med diesel, gästhamn & butik."
--   "I butiken kan ni byta gasolflaskor, köpa flytvästar, sjökort, kläder m.m."
--   "Det är gångavstånd till restauranger, museum m.m. på Klädesholmen."
update restaurants set description = 'Mossholmens Marina är en lugn hamn på Tjörns västsida vid brofästet innanför Klädesholmen, med 40 gästplatser och hamndjup från 1 till 6 meter. Förtöjning sker vid bom, pål eller långsides, och sjötappen har diesel. I butiken kan man byta gasolflaskor och köpa sjökort, och det är gångavstånd till restauranger på Klädesholmen.', updated_at = now() where slug = 'mossholmens-marina' and description is null;

-- KÄLLA: https://www.knippla.se/gasthamn (läst 2026-09-22)
--   "Gästplatser: 130st varav 5st är funktionhindersanpassade."
--   "Hamndjup: 3 - 6 meter."
--   "Förtöjning: Bom, boj samt långsides."
--   "Vi strävar efter fräscha och fina anläggningar med el, vatten och Wifi på alla gästplatser."
--   "Sugtömnings- och latrinstation där fritidsbåtar och husbilar kan tömma sin latrintank."
update restaurants set description = 'Knippla hamn är skyddad i alla väderstreck och har 130 gästplatser, varav 5 är funktionshindersanpassade, med 3–6 meters djup och förtöjning vid bom, boj eller långsides. Alla gästplatser har el, vatten och wifi, och det finns sugtömnings- och latrinstation. Runt hamnen finns grillar, badbrygga, restauranger, café och en ICA-butik.', updated_at = now() where slug = 'kallo-knippla-gasthamn' and description is null;

-- KÄLLA: https://www.lysekil.se/uppleva-och-gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/batar-hamnar-och-husbilsparkeringar/gasthamnar/gasthamnar (läst 2026-09-22)
--   "Här kan du läsa mer om våra fem gästhamnar med hög servicegrad för det du efterfrågar som gäst."
--   "Om du vill komma rätt in i staden med krogar och rikt musikliv välj Havsbadet, Norra hamnen eller Fiskhamnen."
--   "WC och dusch (Kod får ni via e-post och sms.)"
--   "Mottagningsanordning för hushållsavfall från din båt."
update restaurants set description = 'Lysekils kommun har fem gästhamnar: Havsbadet, Norra hamnen och Fiskhamnen inne i staden nära krogar, Valbodalen i en lugnare miljö samt Grundsund. I alla hamnar finns landström, färskvatten, fritt wifi, WC och dusch samt mottagning av hushållsavfall från båt. Sugtömningsstation finns bland annat i Fiskhamnen, Norra hamnen och Valbodalen.', updated_at = now() where slug = 'lysekils-hamn' and description is null;

-- KÄLLA: https://www.orust.se/uppleva-och-gora/gasthamnar/mollosunds-gasthamn (läst 2026-09-22)
--   "Mollösund är ett gammalt genuint fiskesamhälle beläget på sydvästspetsen av Orust."
--   "Servicebyggnad med toalett, dusch, tvättmaskin och torktumlare."
--   "Sugtömningsstation där fritidsbåtar kan tömma sin latrintank, mellan 1 april och 31 oktober."
--   "Förhandsbokning av gästplats sker via Dockspot."
update restaurants set description = 'Mollösunds gästhamn ligger i det gamla fiskesamhället på sydvästspetsen av Orust och har 100 platser med ett djup på cirka 4 meter. Det finns el och en servicebyggnad med toalett, dusch, tvättmaskin och torktumlare samt en sugtömningsstation. I Mollösund finns mataffär, bensin och diesel, restaurang och café.', updated_at = now() where slug = 'mollosund-gasthamn' and description is null;

-- KÄLLA: https://honorodshamn.se/ (läst 2026-09-22)
--   "Mysiga Hönö Röds hamn, övernattar ni bland sjöbodar & nära naturen"
--   "Hamnen har ett lugnt läge och närhet till fantastiska bad från klippor och sandstränder."
--   "Gångavstånd till mataffär och servicebutik Tappen."
update restaurants set description = 'Hönö Röds hamn har ställplatser för husbil i ett lugnt läge bland sjöbodar, nära bad från klippor och sandstränder. Man kan fiska från kajen och bada från piren, som har badstege. Det är gångavstånd till mataffär, och härifrån kan man promenera till Ersdalens naturvårdsområde på Hönös nordvästra sida.', updated_at = now() where slug = 'stallplats-rodhamnen' and description is null;

-- KÄLLA: https://rindohamn.se/ (läst 2026-09-22)
--   "Mitt i Stockholms underbara skärgård, ca 10 minuter från Vaxholm."
--   "Rindö Hamn erbjuder 13 gästhamnsplatser som är bokningsbara genom Dockspot"
--   "Utanför hamnen finns en kaj där större båtar kan långsidesförtöja."
--   "Vid gästhamnen ligger restaurang Syrran & Jag (Fd Batteriet)"
update restaurants set description = 'Rindö Hamn är en skyddad hamn cirka 10 minuter från Vaxholm, med 13 gästhamnsplatser som kan bokas via Dockspot eller tas vid drop in. Utanför hamnen finns en kaj där större båtar kan förtöja långsides. I marinan finns dusch, landström och sjösättningsramp, och i hamnen ligger bland annat ett ostmakeri med café och en restaurang.', updated_at = now() where slug = 'rindo-marina' and description is null;

-- KÄLLA: https://www.ornobatvarv.se/gasthamn/ (läst 2026-09-22)
--   "Vi erbjuder en trevlig, annorlunda, liten och mycket familjär gästhamn med ca 20 platser."
--   "Hamnen som ligger längst in i Brunnsviken har naturligt skydd för vinden och med säker angöring."
--   "Toaletter, vatten och sophantering finns nu tillgängligt."
--   "I hela hamnen är det inte tillåtet att använda eget ankare"
update restaurants set description = 'Ornö Båtvarvs gästhamn är en liten och familjär hamn med cirka 20 platser längst in i Brunnsviken, med naturligt skydd för vinden och säker angöring. Förtöjning sker vid bojar eller långsides på tre meters djup, och eget ankare får inte användas. Här finns toaletter, vatten och sophantering samt duschar, café och microlivs.', updated_at = now() where slug = 'orno-gasthamn-och-stugor' and description is null;

-- KÄLLA: https://nattaro.se/gasthamn/ (läst 2026-09-22)
--   "Vår gästhamn ligger vid Kvarnviken."
--   "har 45 platser med maxdjup på 3-4 meter längst ut och 1-2 meter längre in. Förtöjning med boj vid alla platser."
--   "Dagsgäster lägger sig med fördel vid gamla ångbåtsbryggan med 16 bojplatser."
--   "Här finner ni toaletter, duschar och bastu."
update restaurants set description = 'Nåttarö gästhamn ligger vid Kvarnviken, där den nya flytbryggan har 45 platser med el och bojförtöjning vid alla platser. Djupet är 3–4 meter längst ut och 1–2 meter längre in, och dagsgäster kan lägga sig vid gamla ångbåtsbryggan med 16 bojplatser. I servicebyggnaden finns toaletter, duschar och bastu.', updated_at = now() where slug = 'nattaro-nya-gasthamn' and description is null;

-- KÄLLA: https://www.svenskagasthamnar.se/oregrunds-skargard/elmsta-almsta-gasthamn/ (läst 2026-09-22)
--   "Där Väddö kanal mynnar ut i Väddöviken ligger Elmsta Gästhamn."
--   "hamnen har duschar, bastu, toaletter, tvättstuga, latrintömning och soptunnor."
--   "På bryggorna finns el, vatten och trådlöst internet."
--   "Hamnen har ca 50 platser och klarar båtar upp till 25 m (75 fot). Hamndjupet är ca 5 m."
update restaurants set description = 'Elmsta gästhamn ligger där Väddö kanal mynnar ut i Väddöviken och har cirka 50 platser för båtar upp till 25 meter, med ett hamndjup på cirka 5 meter. Hamnen har duschar, bastu, toaletter, tvättstuga, latrintömning och soptunnor, och på bryggorna finns el, vatten och trådlöst internet. Älmsta centrum med mataffär ligger på gångavstånd.', updated_at = now() where slug = 'elmsta-udde-gasthamn' and description is null;

-- KÄLLA: https://www.graddosjomack.se/gasthamn/ (läst 2026-09-22)
--   "Gräddö gästhamn ligger i Gräddöviken och är ett naturligt stopp för båttrafik mellan Norrtälje och skärgården."
--   "Gästplatser finns på den östra sidan av viken samt på den yttersta pontonen på västra sidan (norra sidan av bryggan)."
--   "Sjömack och service finns i anslutning till hamnen."
--   "I servicehuset finns toaletter, duschar, bastu och tvättstuga."
update restaurants set description = 'Gräddö gästhamn ligger i Gräddöviken och har 50 platser med bojförtöjning och ett djup på 1,5–6 meter. Gästplatser finns på östra sidan av viken och på yttersta pontonen på västra sidan, och sjömack och service finns i anslutning till hamnen. I servicehuset finns toaletter, duschar, bastu och tvättstuga.', updated_at = now() where slug = 'graddo-brygga' and description is null;

-- Käringöns gästhamn låg nära Lysekil (58.2467, 11.4044).
-- KÄLLA: https://www.orust.se/uppleva-och-gora/gasthamnar/karingons-gasthamn — "Koordinater 58° 06,8 N, 11° 22,1 E." (läst 2026-09-22)
update restaurants set latitude = 58.11333, longitude = 11.36833, updated_at = now() where slug = 'karingon-gasthamn';

-- Dubbletter, dolda enligt Toms linje för dubbletter ("dölj ena"):
--   ockero-hamn-fiskareforening = samma gästhamn som ockero-gasthamn (samma operatör och beskrivning)
--   gasthamn-gratis-kommunala-gastplatser = norrbergshamnen (ca 30 m isär, samma källtext på vaxholm.se)
--   varmdo-hamnar-ab = operatören av Stavsnäs vinterhamn, på samma punkt som stavsnas-vinterhamn
update restaurants set hidden_at = now(), hidden_reason = 'Dubblett av ockero-gasthamn' where slug = 'ockero-hamn-fiskareforening';
update restaurants set hidden_at = now(), hidden_reason = 'Dubblett av norrbergshamnen' where slug = 'gasthamn-gratis-kommunala-gastplatser';
update restaurants set hidden_at = now(), hidden_reason = 'Dubblett av stavsnas-vinterhamn (operatörens namn)' where slug = 'varmdo-hamnar-ab';
