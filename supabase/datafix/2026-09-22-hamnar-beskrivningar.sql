-- 2026-09-22: beskrivningar för gästhamnar som saknade text (block 1, hamnar).
--
-- Varje text bygger bara på hamnens egen webbplats, hämtad 2026-09-22. Under varje
-- sats står källan och ordagranna citat som belägger påståendena; citaten är
-- maskinellt kontrollerade mot den sparade sidtexten. Inga priser, tider eller
-- telefonnummer. Bara rader som saknade beskrivning ändras (description is null).

-- KÄLLA: https://arholmanord.se/ (läst 2026-09-22)
--   "En havsvik i Stockholms skärgård med boende, restaurang och aktiviteter för alla."
--   "50 meter brygga med mooringlinor, segelbåtsdjup, el och toaletter."
--   "Se alla artister som spelar på Nord i sommar."
update restaurants set description = 'Arholma Nord är en havsvik i Stockholms skärgård med boende, restaurang och aktiviteter, och gästhamnen har 50 meter brygga med mooringlinor, segelbåtsdjup, el och toaletter. Under sommaren hålls livespelningar på Nord.', updated_at = now() where slug = 'arholma-gasthamn' and description is null;

-- KÄLLA: https://www.donsohamn.se/ (läst 2026-09-22)
--   "Gästplatser: Cirka 100 st på insidan av västra piren i hamnen."
--   "Förtöjning: Långsides, bom eller ankare"
--   "Donsö är med sina cirka 1500 invånare en levande ö i Göteborgs södra skärgård."
--   "Liksom övriga öar i den södra skärgården är Donsö bilfri"
--   "Alla priser är inklusive el, vatten, dusch och toalett."
--   "Även tillgång till tvättmaskin 50 kr per tillfälle."
--   "Grillplatser finns på den yttersta piren."
--   "på den yttersta piren finns en trevlig badbrygga"
update restaurants set description = 'Gästhamnen ligger på insidan av västra piren i Donsö hamn, på en bilfri ö i Göteborgs södra skärgård, och har cirka 100 gästplatser med förtöjning långsides, vid bom eller med ankare. El, vatten, dusch och toalett ingår i hamnavgiften och tvättmaskin finns. På yttersta piren finns grillplatser och en badbrygga.', updated_at = now() where slug = 'donso-gasthamn' and description is null;

-- KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/finnhamn.html?sv.target=12.382c024b1800285d5863a89d&sv.12.382c024b1800285d5863a89d.route=/&searchString=&counties=&municipalities=&reserveTypes=&natureTypes=&accessibility=&facilities=&sort=none (läst 2026-09-22)
--   "Finnhamns naturreservat är beläget i mellanskärgården öster om Ljusterö."
--   "Gästhamn finns i Djupfladen, vid Söder-Långholm och nedanför vandrarhemmet."
--   "Naturhamnar vid Djupfladen, Söder-Långholm och Korsholm."
--   "finns uthyrningsstugor och på Stora Jolpan finns bland annat"
--   "vandrarhem, restaurang, tältplats och handelsbod."
--   "för längre tid än två dygn i följd förankra båt vid samma strand"
update restaurants set description = 'Finnhamns naturreservat ligger i mellanskärgården öster om Ljusterö, med gästhamn i Djupfladen, vid Söder-Långholm och nedanför vandrarhemmet samt naturhamnar vid Djupfladen, Söder-Långholm och Korsholm. På Stora Jolpan finns vandrarhem, restaurang, tältplats och handelsbod. Båt får inte ligga förankrad vid samma strand mer än två dygn i följd.', updated_at = now() where slug = 'finnhamns-naturreservat' and description is null;

-- KÄLLA: https://furusundshamnkrog.se/ (läst 2026-09-22)
--   "Furusunds Hamn är en levande mötesplats i Roslagen"
--   "Furusunds Gästhamn erbjuder trygga och lättillgängliga platser med full service för både tillfälliga och långvariga besök."
--   "Enkel insegling och modern utrustning."
--   "en plats för luncher, middagar och sommarkvällar vid vattnet."
--   "Här möts båtfolk, lokalbefolkning och besökare i en avslappnad atmosfär."
update restaurants set description = 'Furusunds gästhamn i Roslagen har platser med full service för både tillfälliga och långvariga besök, enkel insegling och modern utrustning. Vid hamnen ligger hamnkrogen, en plats för luncher, middagar och sommarkvällar vid vattnet där båtfolk, lokalbefolkning och besökare möts.', updated_at = now() where slug = 'furusunds-gasthamn' and description is null;

-- KÄLLA: https://www.grisslehamnsmarina.se/ (läst 2026-09-22)
--   "Havsnära upplevelser året runt – i hjärtat av Roslagen"
--   "Vackert och lugnt beläget i den inre hamnen i Grisslehamns charmfulla skärgårdssamhälle med fiskebåtar"
--   "en havsnära resort med marina, camping, gästhamn, stugor, aktiviteter, restauranger och service på ett och samma ställe"
--   "Gästplatser med el & service"
--   "Förtöjning vid brygga eller boj"
--   "(WC, dusch, kök, tvätt & tork)"
--   "med diesel & bensin – öppet dygnet runt med kortbetalning"
--   "Njut av vår genuina hamnkrog & saluhall med närlivs."
--   "Premiäröppning av vår vedeldade bastuflotte med badstege"
--   "i vår nya bastuflotte – med bästa läget, precis intill baren"
update restaurants set description = 'Gästhamnen ligger i den inre hamnen i Grisslehamn i Roslagen, i en anläggning med marina, camping, stugor och restauranger. Gästplatserna har el och förtöjning vid brygga eller boj, och här finns servicehus med WC, dusch och tvätt, sjömack med diesel och bensin samt saluhall med närlivs. Intill baren ligger en vedeldad bastuflotte med badstege.', updated_at = now() where slug = 'grisslehamns-marina-och-camping' and description is null;

-- KÄLLA: https://ingmarsogasthamn.se/ (läst 2026-09-22)
--   "Här ligger du skyddad från alla vindar och vi har platser vid bom, på boj, för ankare och tre långsidaplatser."
--   "Vi har cirka 30 platser i gästhamnen"
--   "Våra nybyggda och fräscha duschar och WC, liksom grillplats och karta över ön ingår i hamnavgiften."
--   "Dricksvatten, bastu, tvättmaskin, landström och cykel finns att tillgå mot avgift."
--   "Sjömacken är öppen året runt och har självservice med kortautomat"
--   "Restaurang med drink och snacks-brygga i kvällssol ca 200 m från gästhamnen"
update restaurants set description = 'Ingmarsö gästhamn ligger skyddad från alla vindar och har cirka 30 platser vid bom, på boj och för ankare samt tre långsidesplatser. Dusch, WC och grillplats ingår i hamnavgiften, medan dricksvatten, bastu, tvättmaskin, landström och cykel finns mot avgift. Sjömack finns, och krogen ligger cirka 200 meter bort.', updated_at = now() where slug = 'ingmarso-gasthamn' and description is null;

-- KÄLLA: https://visitlandsort.se/resa-till-landsort/ (läst 2026-09-22)
--   "Det är också möjligt att förtöja i Österhamn"
--   "begränsat till storleksordningen 2-3 segelbåtar, eftersom Waxholmstrafiken använder hamnen vid västliga vindar"
--   "Besöker man Landsort med egen båt så finns det gästhamn i norr (Skravleviken eller Norrhamn)."
--   "Västerhamn (lotsbåtshamnen) får besökare inte gå in i, av utrymmes- och utryckningsskäl."
update restaurants set description = 'I Österhamn på Landsort går det att förtöja, men utrymmet räcker i praktiken för två till tre segelbåtar eftersom Waxholmstrafiken använder hamnen vid västliga vindar. Öns gästhamn ligger i norr, i Skravleviken eller Norrhamn, och lotsbåtshamnen Västerhamn får besökare inte gå in i.', updated_at = now() where slug = 'landsort-ostra-hamn' and description is null;

-- KÄLLA: https://www.ica.se/butiker/nara/ockero/roro-strandkassa-1003894/om-oss/roro-gasthamn/ (läst 2026-09-22)
--   "Precis intill butiken ligger vår fina gästhamn."
--   "Café Röröboa – här finner du riktigt god mat, bakverk, egentillverkad glass, kaffe med mera"
--   "Rörö Fiskeboa & Krog – här äter du havets delikatesser och annat gott."
--   "De erbjuder även fiskdisk med färsk fisk"
--   "I parken finns fyra boulebanor och en beach volley-plan där ni kan gå en match"
--   "förboka en plats i hamnen (8 bokningsbara platser)."
--   "Septitankstömmning finner i anslutning till vår kran intill sjöräddningsstationen."
update restaurants set description = 'Rörö gästhamn ligger precis intill ICA-butiken, och runt hamnen finns Café Röröboa, Rörö Fiskeboa & Krog med fiskdisk samt boulebanor och en beachvolleyplan. Åtta av platserna går att förboka, och septitanktömning finns vid kranen intill sjöräddningsstationen.', updated_at = now() where slug = 'roro-gasthamn' and description is null;

-- KÄLLA: https://stromstadmarina.se/ (läst 2026-09-22)
--   "Marinan ligger dessutom i den lugna Kebalviken, strax utanför centrum i Strömstad."
--   "Här har vi 129 båtplatser för både stora och små båtar."
--   "Vi använder platserna både som fasta båtplatser under säsongen och som gästhamn under sommaren när du är på genomresa."
--   "Strömstad Marina har dessutom auktorisation för Volvo Penta, Yanmar, Honda, Mercury och Evinrude"
--   "Här får du hjälp med allt från vinterförvaring och motorservice till reparationer"
update restaurants set description = 'Strömstad Marina ligger i Kebalviken strax utanför centrum i Strömstad och har 129 båtplatser för både stora och små båtar, som under sommaren också används som gästhamn för båtar på genomresa. Marinan har verkstad med auktorisation för bland annat Volvo Penta och Yanmar samt vinterförvaring.', updated_at = now() where slug = 'stromstad-marina-ab' and description is null;

-- KÄLLA: https://waxholmshamn.se/ (läst 2026-09-22)
--   "In the middle of Vaxholm - In the middle of Skärgården"
--   "Waxholm Marina with its central location in Vaxholm makes it a natural meeting point for"
--   "Moor in the sheltered marina and enjoy the picturesque village and historic landmarks."
--   "A perfect spot to easily bunker up with food, drinks and fuel for the rest of your journey."
update restaurants set description = 'Vaxholms gästhamn ligger mitt i Vaxholm, och det centrala läget gör den till en naturlig mötesplats för både båtfolk och landkrabbor. Man förtöjer i en skyddad hamn med småstaden och dess historiska sevärdheter inpå knuten, och här är det enkelt att bunkra mat, dryck och bränsle inför resten av resan.', updated_at = now() where slug = 'waxholms-gasthamn-och-rent-under-batbotten-tvatt' and description is null;

-- KÄLLA: https://www.asattra.com/ (läst 2026-09-22)
--   "Åsättra är strategiskt beläget på utsidan av Ljusterö i Österåkers kommun och utgör en replipunkt för vidare resor och transporter ut i skärgården."
--   "småbåtshamnen med tillhörande parkering i Åsättra på Ljusterö i stockholms mellanskärgård"
--   "Hamnen har reguljär passagerarbåttrafik till de större öarna utanför i skärgården"
--   "busstrafik (SL linje 626) som ansluter till roslagsbanan i Åkersberga"
--   "Uthyrning av båtplatser på årsbasis"
--   "Parkeringsplatser uthyres per timme och dygn via EasyPark"
--   "Bilparkering - Långtid Parkeringsplatser uthyres på årsbasis"
update restaurants set description = 'Åsättra ligger på utsidan av Ljusterö i Stockholms mellanskärgård och är en replipunkt för vidare resor ut i skärgården. Härifrån går reguljär passagerarbåttrafik till de större öarna, och SL-buss 626 ansluter till Roslagsbanan i Åkersberga. Småbåtshamnen hyr ut båtplatser på årsbasis och har parkering för både lång- och korttid.', updated_at = now() where slug = 'asattra-gard-och-hamn' and description is null;

-- KÄLLA: https://www.dyvik.se/ (läst 2026-09-22)
--   "Fullservicemarinan med båtförsäljning som erbjuder allt som hör båtlivet till."
--   "vår marina som ligger perfekt bredvid Furusundsleden med skyddat läge och skärgården utanför udden"
--   "Dyviken är drygt 800m lång och ca 150m bred"
--   "tillräckligt smal för att erbjuda vind- och våglä i nästan alla väder"
--   "Vår skyddade hamn ryms cirka 350 båtar sommartid"
--   "SOMMARPLATSER VINTERPLATSER GÄSTHAMN MACK OCH SJÖBUTIK"
--   "Vi gör service- och motorreparationer, motorbyten, reparerar glasfiber- och aluminiumbåtar"
update restaurants set description = 'Dyvik Marina är en fullservicemarina med båtförsäljning i Dyviken, bredvid Furusundsleden. Viken är drygt 800 meter lång och cirka 150 meter bred, smal nog att ge vind- och våglä i nästan alla väder, och hamnen rymmer cirka 350 båtar sommartid. Här finns gästhamn, sjömack och sjöbutik samt verkstad för service, motorreparationer och båtarbeten.', updated_at = now() where slug = 'dyvik-marina' and description is null;

-- KÄLLA: https://www.fjaderholmarna.se/ (läst 2026-09-22)
--   "Fjäderholmarna ligger i Lidingö stad och ingår sedan 1995 i Kungliga Nationalstadsparken."
--   "Sommartid går dagliga turer går till Stockholms närmsta skärgårdsö"
--   "Flera båtbolag trafikerar stan och Fjäderholmarna. Det finns även gästhamn med bensinstation."
--   "På Fjäderholmarna finns restauranger, kaféer och hantverksateljéer som är öppna under sommarsäsongen."
--   "På ön finns flera matställen och kaféer, bland annat ett rökeri och en skärgårdskrog."
--   "På ön finns en permanent utställning med allmogebåtar."
update restaurants set description = 'Fjäderholmarna, Stockholms närmsta skärgårdsöar, ligger i Lidingö stad och ingår i Kungliga Nationalstadsparken. Här finns gästhamn med bensinstation, och flera båtbolag trafikerar ön från stan. Under sommarsäsongen finns restauranger, kaféer och hantverksateljéer, bland annat ett rökeri och en skärgårdskrog, och på ön finns en permanent utställning med allmogebåtar.', updated_at = now() where slug = 'fjaderholmarna-stora-bryggan' and description is null;

-- KÄLLA: https://www.orust.se/uppleva-och-gora/gasthamnar/gullholmens-gasthamn (läst 2026-09-22)
--   "Gullholmen hittar du i Bohusläns ytterskärgård. Här finns matbutik med systembolagsombud och restauranger."
--   "50 platser. Djup cirka 1,5-3,5 meter."
--   "Servicebyggnad med toalett, dusch, tvättmaskin, torktumlare."
--   "El - undvik att använda alla elapparater i båten samtidigt"
--   "Sugtömningsstation där fritidsbåtar kan tömma sin latrintank"
--   "Hushållsavfall tas om hand vid hamnens servicestation."
--   "Förhandsbokning av gästplats sker via Dockspot."
update restaurants set description = 'Gullholmens gästhamn ligger i Bohusläns ytterskärgård och har 50 platser med ett djup på cirka 1,5–3,5 meter. Servicebyggnaden har toalett, dusch, tvättmaskin och torktumlare, och i hamnen finns el, sugtömningsstation och omhändertagande av hushållsavfall. På ön finns matbutik med systembolagsombud och restauranger, och gästplats kan förhandsbokas via Dockspot.', updated_at = now() where slug = 'gullholmens-gasthamn' and description is null;

-- KÄLLA: https://kladesholmenvh.se/gasthamn/ (läst 2026-09-22)
--   "Skyddat läge med närhet till restauranger, bad, service och genuin bohuslänsk miljö."
--   "perfekt för seglare som söker ett bekvämt stopp på Tjörn"
--   "Klädesholmen – ett gammalt fiskeläge, känt för att fånga och konservera sill redan från 1600-talet."
--   "Djupet i gästhamnen är 3-4 meter och passar de flesta segelbåtar."
--   "Ja, el och färskvatten finns tillgängligt vid bryggorna."
--   "Ja, dusch och toalett finns för gästande båtar."
--   "Ja, flera restauranger och café ligger inom gångavstånd från hamnen."
--   "Förhandsbokning endast Dockspot – 5 platser."
update restaurants set description = 'Klädesholmens gästhamn ligger skyddat på Tjörn, i ett gammalt fiskeläge känt för att fånga och konservera sill redan från 1600-talet. Djupet är 3–4 meter, el och färskvatten finns vid bryggorna och gästande båtar har dusch och toalett. Flera restauranger och café ligger inom gångavstånd, och fem platser kan förhandsbokas via Dockspot.', updated_at = now() where slug = 'kladesholmen-gasthamn' and description is null;

-- KÄLLA: https://styrsohamn.se/ (läst 2026-09-22)
--   "En hamn på vackra Styrsö med närhet till natur och andra sevärdigheter."
--   "Sandvikshamnen erbjuder ett 50 tal båtplatser designerade till gästbåtar."
--   "Privata båtplatser med grön skylt är även tillgängliga för gäster i minst ett dygn."
--   "I Sandvikshamnen får båtgäster tillgång till toaletter, duschar, el, färskvatten, sugtömmning samt en miljöstation."
--   "I Sandvikshamnen finns även Sandviks Marina, Styrsö Sjömack och Bommens Skepsshandel samt en glass kiosk."
update restaurants set description = 'Sandvikshamnen på Styrsö har ett femtiotal båtplatser avsedda för gästbåtar, och privata platser med grön skylt kan också användas av gäster i minst ett dygn. Båtgäster har tillgång till toaletter, duschar, el, färskvatten, sugtömning och miljöstation. I hamnen finns även Sandviks Marina, Styrsö Sjömack, Bommens Skeppshandel och en glasskiosk.', updated_at = now() where slug = 'sandviks-gasthamn' and description is null;

-- KÄLLA: https://www.orust.se/uppleva-och-gora/gasthamnar/ellos-gasthamn (läst 2026-09-22)
--   "Ellös hittar du på Orusts västsida. Här finns post, bank, affärer och matställen."
--   "Platsantal och service 30 platser. Djup cirka 2-4 meter."
--   "El - Undvik att använda alla elapparater i båten samtidigt"
--   "Servicebyggnad med toalett, dusch, tvättmaskin, torktumlare."
--   "hamnens sugtömningsstation, som är placerad längst ut på gästhamnskajen."
--   "Förhandsbokning av gästplats sker via Dockspot."
--   "Hamnen är kontantfri. Avgiften betalas enkelt via app."
update restaurants set description = 'Gästhamnen ligger i Ellös på Orusts västsida, där det finns post, bank, affärer och matställen. Hamnen har 30 platser med ett djup på cirka 2–4 meter, el och en servicebyggnad med toalett, dusch, tvättmaskin och torktumlare. Längst ut på gästhamnskajen finns en sugtömningsstation, gästplatser förbokas via Dockspot och hamnen är kontantfri.', updated_at = now() where slug = 'ellos-hamn' and description is null;

-- KÄLLA: https://www.fotohamn.se/gasthamn/ (läst 2026-09-22)
--   "Välkommen till FOTÖ gästhamn och ställplats i Göteborgs norra skärgård."
--   "Gästhamnen är belägen så långt söderut man kan komma bland Bohusläns bebyggda öar."
--   "på en mindre ö långt ut i kustbandet, med Vinga som granne."
--   "Antal båtplatser, ca 20 st. Förtöjning långsides."
--   "El, vatten, miljöstation, två servicehus med toaletter, dusch, tvättstuga, diskrum, septivask, gråvattentömning och ”septisug” till båtar."
--   "Café finns med begränsade öppettider. Wifi finns."
--   "Tre grillplatser finns runt hamnen med sittmöjligheter och samkväm."
update restaurants set description = 'Fotö gästhamn ligger i Göteborgs norra skärgård, så långt söderut man kan komma bland Bohusläns bebyggda öar, med Vinga som granne. Här finns ca 20 båtplatser med långsidesförtöjning, el, vatten och två servicehus med toaletter, dusch och tvättstuga, liksom septisug för båtar, wifi och café. Runt hamnen finns tre grillplatser.', updated_at = now() where slug = 'foto-gasthamn' and description is null;

-- KÄLLA: http://www.halleviksstrand.se/aktiv-fritid/batliv/gasthamn/ (läst 2026-09-22)
--   "Säsong: 1 maj – 15 september. Drivs av Orust Kommun."
--   "Det finns 8 st. gästplatser, som är belägna längst ut på första flytbryggan på styrbord sida, när man kör in i hamnen."
--   "Bakom den stora vita byggnaden mot land, ligger de mindre röda servicehusen."
--   "Här finns WC, duschar, tvättstuga, sophus och hamnkontor."
--   "Mitt emot gästhamnen ligger Stranakiosken där du kan köpa glass, kaffe, godis, hamburgare, tidning mm"
--   "I en av sjöbodarna längs Strandvägen ligger Mias Café, som serverar kaffe med dopp samt lunch."
update restaurants set description = 'Hälleviksstrands gästhamn drivs av Orust kommun och har 8 gästplatser längst ut på första flytbryggan, på styrbord sida när man kör in i hamnen. I de röda servicehusen bakom den stora vita byggnaden finns WC, duschar, tvättstuga och sophus. Mitt emot gästhamnen ligger Stranakiosken, och i en sjöbod längs Strandvägen serverar Mias Café kaffe med dopp och lunch.', updated_at = now() where slug = 'halleviksstrand-hamn' and description is null;

-- KÄLLA: https://www.marindepan.se/om-oss/marindepan-dalaro (läst 2026-09-22)
--   "Marinan ligger i en väl skyddad vik nära ytterskärgården"
--   "Allt detta endast 30 minuter från Stockholm med bil."
--   "Vi har sjömack, kiosk samt en välsorterad tillbehörsbutik."
--   "även ett bra utbud av kläder, skor och vattensportartiklar."
--   "Marindepån Dalarö har en auktoriserad och väl utrustad fullserviceverkstad"
--   "erbjuder både försäljning, butik, mack, service, sommar- och vinterplatser"
--   "Vi erbjuder även möjlighet till provkörning av både nya och begagnade båtar."
--   "I vår utställningshall har vi ett stort och varierat sortiment av båtar och motorer."
update restaurants set description = 'Marindepån Dalarö ligger i en väl skyddad vik nära ytterskärgården, 30 minuter med bil från Stockholm. Här finns sjömack, kiosk och en tillbehörsbutik med kläder, skor och vattensportartiklar, liksom en auktoriserad fullserviceverkstad. Marinan säljer båtar och motorer, nya som begagnade, och erbjuder sommar- och vinterplatser.', updated_at = now() where slug = 'marindepan-dalaro' and description is null;

-- KÄLLA: https://www.skarhamnsgasthamn.se/ (läst 2026-09-22)
--   "Gästhamnen ligger längst in i Skärhamns hamn."
--   "Vid pontonbryggor förtöjer man med stäv eller akter mot brygga med fast förtöjningslina."
--   "Vid kajkanter, förtöjer man med långsida mot kaj."
--   "När hamnen är obemannad under för- och eftersäsong betalar du med Swish, se information på hamnkontorets dörr."
--   "Skärhamns gästhamn drivs av Skärhamns Båtförening."
update restaurants set description = 'Skärhamns gästhamn ligger längst in i Skärhamns hamn och drivs av Skärhamns Båtförening. Vid pontonbryggorna förtöjer man med stäv eller akter mot bryggan med fast förtöjningslina, vid kajkanterna långsides. När hamnen är obemannad under för- och eftersäsong betalar man med Swish enligt informationen på hamnkontorets dörr.', updated_at = now() where slug = 'skarhamns-gasthamn' and description is null;

-- KÄLLA: https://www.svartsolanthandel.se/gasthamn (läst 2026-09-22)
--   "Välkommen att lägga till vid vår nya gästhamn."
--   "Hamnen drivs av oss i Svartsö Lanthandel och ligger i anslutning till både butiken och vårt fina café."
--   "I hamnen finns ett servicehus innehållandes toalett & dusch som alla hamngäster som bokat dygn via dockspot är välkomna att använda."
--   "Vill ni övernatta finns det möjlighet att boka våra sjöbodar som ligger i hamnen"
update restaurants set description = 'Svartsö gästhamn är ny, drivs av Svartsö Lanthandel och ligger i anslutning till både butiken och caféet. Gäster som bokat dygn via Dockspot har tillgång till servicehuset med toalett och dusch. Den som vill övernatta kan boka någon av sjöbodarna i hamnen.', updated_at = now() where slug = 'svartso-gasthamn' and description is null;

-- KÄLLA: https://finnhamn.se/ (läst 2026-09-22)
--   "Välj mellan klassiska gästhamnen Paradisviken med dryga hundra platser vid brygga utmed berget"
--   "med möjlighet till el, vatten och gratis WiFi"
--   "Vandrarhemsviken, den mindre hamnen med ett 20 tal platser med närhet till krog och lanthandel."
--   "Till sist har vi flytbryggan på Söder Långholm som ligger avskilt på ön mittemot Finnhamn till öster."
update restaurants set description = 'På Finnhamn finns tre gästhamnar. Paradisviken har drygt hundra platser vid brygga utmed berget med el, vatten och gratis wifi, medan den mindre Vandrarhemsviken har ett tjugotal platser nära krog och lanthandel. En flytbrygga ligger avskilt på Söder Långholm, ön mittemot Finnhamn österut.', updated_at = now() where slug = 'finnhamns-arkipelag-ab' and description is null;

-- KÄLLA: https://www.frode.se/ (läst 2026-09-22)
--   "Varvstraditionen är över 120 år inom familjen Frodé och har under hela denna tid varit knuten till Waxholmsområdet."
--   "Varvet är idag en marina med uthyrning av"
--   "sommarbåtplatser och har en bränslestation inom området."
--   "Egen tillverkning och försäljning av flytvästar för tävlingsbruk och snabbgående fritidsbåtar."
update restaurants set description = 'Frodé Marina ligger i Waxholmsområdet, dit familjen Frodés varvstradition har varit knuten i över 120 år. I dag är varvet en marina med uthyrning av sommarbåtplatser och en bränslestation inom området, och här tillverkas även flytvästar för tävlingsbruk och snabbgående fritidsbåtar.', updated_at = now() where slug = 'frode-marina-ab' and description is null;

-- KÄLLA: https://grinda.se/hamn-mack/gasthamn/ (läst 2026-09-22)
--   "I vår vik ligger gästhamnen som har plats för både stora och små båtar."
--   "Det finns det 28 st bokningsbara platser i gästhamnen."
--   "Förtöjning sker på boj eller mooringlina."
--   "Som övernattande gäst har du tillgång till el, dusch, toalett och hushållssop- och septitank-tömning."
--   "I gästhamnen finns våra hamnvärdar som hjälper dig till rätta."
--   "Här har du nära till Framfickan, Grinda Lanthandel och Wärdshus."
--   "ligger även våra wc och dusch faciliteter samt vår sjökrog Framfickan."
update restaurants set description = 'Grindas gästhamn ligger i en vik med plats för både stora och små båtar, varav 28 platser är bokningsbara, och förtöjning sker på boj eller mooringlina. Övernattande gäster har el, dusch, toalett samt sop- och septiktanktömning, och hamnvärdar finns på plats. Nära ligger sjökrogen Framfickan, Grinda Lanthandel och Wärdshus.', updated_at = now() where slug = 'grinda-gasthamn' and description is null;

-- KÄLLA: https://hyppeln.com/ (läst 2026-09-22)
--   "I Hyppelns inbjudande gästhamn finns en äkta skärgårdskrog, en välsorterad affär och ett hopptorn för de mest våghalsiga."
--   "I gästhamnen hittar du vår fina bastutunna, som har en fantastisk havsutsikt."
--   "Sommartid finns dusch vid bryggan. På vintern går det bra att duscha i hamnens sanitetsbyggnad."
--   "Med fri sikt över Västerhavet. Fortet på öns högsta punkt är en militärhistorisk attraktion."
update restaurants set description = 'I Hyppelns gästhamn finns en skärgårdskrog, en välsorterad affär och ett hopptorn. Hamnen har en bastutunna med havsutsikt, sommartid dusch vid bryggan och vintertid dusch i sanitetsbyggnaden. På öns högsta punkt ligger ett militärhistoriskt fort med fri sikt över Västerhavet.', updated_at = now() where slug = 'hyppelns-hamn' and description is null;

-- KÄLLA: https://www.ksss.se/hamnar/sandhamn/ (läst 2026-09-22)
--   "Gästhamnen på Sandhamn består av tre pontonbryggor med mellanliggande kajer framför Seglarhotellet."
--   "Det finns ca 150 gästplatser på Sandhamn."
--   "I hamnbassängen nedanför Seglarhotellet förtöjer man med hjälp av mooringlinor som är fästa vid bryggorna."
--   "ta kontakt med hamvakterna som står på bryggorna! ANKRING FÖRBJUDEN."
--   "Hamnvakterna finns där för att hjälpa dig som gäst"
--   "Passbåten tar er över från Sandhamn till det lite lugnare Lökholmen. Här finns plats för ca 200 gästande båtar."
--   "I anslutning till hamnen finns duschar, toaletter och bastu."
update restaurants set description = 'KSSS gästhamn på Sandhamn består av tre pontonbryggor med kajer framför Seglarhotellet och har omkring 150 gästplatser. Båtar förtöjs med mooringlinor, ankring är förbjuden och hamnvakter hjälper till på bryggorna. Passbåten går till lugnare Lökholmen med plats för cirka 200 båtar, duschar, toaletter och bastu.', updated_at = now() where slug = 'ksss-gasthamn-sandhamn' and description is null;

-- KÄLLA: https://www.ockerohamn.se/ (läst 2026-09-22)
--   "Längst söderut i Bohuslän strax utanför Göteborg ligger Öckerö och Öckerö Hamn."
--   "Gästhamnen är i sydvästra delen av fiskehamnen med plats för ca 30 båtar, förtöjning mellan Gångbara ybommar, långsida eller fasta akterförtöjningar."
--   "Båtlyft upp till 25 ton med eller utan mast"
--   "Hamnen erbjuder ca. 50 st ställplatser med el i omedelbar närhet till vattnet"
update restaurants set description = 'Öckerö Hamn ligger längst söderut i Bohuslän, strax utanför Göteborg. Gästhamnen i fiskehamnens sydvästra del har plats för cirka 30 båtar, med förtöjning vid gångbara y-bommar, långsida eller fasta akterförtöjningar. Hamnen har även båtlyft upp till 25 ton och ett femtiotal ställplatser med el nära vattnet.', updated_at = now() where slug = 'ockero-gasthamn' and description is null;

-- KÄLLA: https://rindobnb.se/ (läst 2026-09-22)
--   "Vårt Bed & Breakfast ligger högst upp i regementets gamla militärsjukhus!"
--   "Efter nedläggningen av Vaxholms amfibieregemente 2005 har gamla kasernbyggnader fått nytt liv"
--   "Vi har 8 ljusa och rymliga rum"
--   "I korridoren finns två gemensamma fräscha toaletter med dusch samt ett separat duschrum."
--   "I hamnen finns den populära restaurangen Syrran & Jag, det prisbelönta Rindö Ostmakeri samt Waxholms Bryggeri."
--   "På gångavstånd finns även badbrygga och en liten badstrand."
update restaurants set description = 'Rindö Hamn Bed & Breakfast ligger högst upp i det gamla militärsjukhuset i Rindö Hamn, där Vaxholms amfibieregemente lades ned 2005. Här finns åtta rum och gemensamma toaletter med dusch. I hamnen ligger restaurangen Syrran & Jag, Rindö Ostmakeri och Waxholms Bryggeri, och en badbrygga finns på gångavstånd.', updated_at = now() where slug = 'rindo-hamn-bed-och-breakfast' and description is null;

-- KÄLLA: https://www.dockspot.com/sv/docks/130-smogenbryggans-gasthamn (läst 2026-09-22)
--   "Gästhamnen erbjuder ett stort utbud av service och här finns totalt 120 båtplatser."
--   "Mooring-linor finns på plats 1-92."
--   "Som gäst i hamnen har man tillgång till toaletter, duschar och tvättstuga som ligger i nära anslutning till hamnen."
--   "Färskvatten och el finns även här, och Wifi finns att koppla upp sig mot."
--   "Skulle gasolen behöva fyllas på finns det också att köpa."
--   "Ett stort utbud av olika kaféer, kiosker och restauranger hittar ni direkt på bryggan."
--   "Här kan man uppleva ett genuint fiskesamhälle med gamla fiskebodar och vacker natur."
--   "Här kan man uppleva en riktig räkmacka, det var nämligen här den uppfanns"
update restaurants set description = 'Smögenbryggans gästhamn har totalt 120 båtplatser, med mooringlinor på plats 1–92. Här finns el, färskvatten, wifi, toaletter, duschar och tvättstuga, och gasol går att köpa. Direkt på bryggan ligger kaféer, kiosker och restauranger i ett fiskesamhälle med gamla fiskebodar, där räkmackan uppfanns.', updated_at = now() where slug = 'smogen-gasthamn' and description is null;
