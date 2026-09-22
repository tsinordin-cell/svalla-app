-- 2026-09-22: beskrivningar för restauranger, bastur och sjömackar (block 5).
--
-- Källa: platsens EGEN webbplats (fältet website), hämtad med Playwright 2026-09-22 och sparad.
-- Varje citat är maskinellt kontrollerat som ordagrant utdrag ur den sparade sidtexten.
-- Inga priser, öppettider, telefonnummer eller superlativ. Bara rader utan beskrivning ändras.

-- KÄLLA: https://ackesfjallbacka.se/om-ackes/ (läst 2026-09-22)
--   "Med storsäljare som fish’n’chips, fish taco och saftiga högsrevsburgare gjorda på kött från gården bredvid"
--   "Under sommaren är det fullt med folk på uteserveringen och stämningen vibrerar."
--   "I vårt glasscafé hittar du, förutom ett stort utbud av kvalitetsglass"
update restaurants set description = 'Ackes är en bistro och café/glassbar mitt i Fjällbacka, med havet som bakgrund. Menyn har bland annat fish''n''chips, fish tacos och burgare på kött från en närliggande gård, samt ett stort utbud av glass. Det finns uteservering.', updated_at = now() where slug = 'ackes' and description is null and hidden_at is null;

-- KÄLLA: https://www.bassottopizza.se/om-oss (läst 2026-09-22)
--   "Strana Hotell, havsutsikt, varma vindar, vad var det som saknades i Hälleviksstrand?"
--   "Med en ugn på över 350ºC, egen gjord pizzadeg, tomatsås, fräscha råvaror"
--   "Bassotto byggdes och stod klart Sommaren 2021."
update restaurants set description = 'Bassotto Pizza ligger vid Strana Hotell i Hälleviksstrand med utsikt över havet. Restaurangen bakar vedugnspizza på egen deg med tomatsås och färska råvaror, i en ugn på över 350 grader. Verksamheten stod klar sommaren 2021.', updated_at = now() where slug = 'bassotto-pizza' and description is null and hidden_at is null;

-- KÄLLA: https://brasserie.gastrogate.com/ (läst 2026-09-22)
--   "All mat tillagas i det öppna köket ute i matsalen där gästerna kan se på när kockarna arbetar."
--   "Grillen är murad av gammalt åländskt tegel och en stor del av inredningen bär på en historia."
--   "Både väggar och tak är gjorda av glas vilket ger en fantastisk atmosfär året om."
update restaurants set description = 'Brasserie Ångbåtsbryggan ligger vid östra hamnen i Mariehamn med utsikt över vattnet. Restaurangen serverar skaldjursplatå och grillat, tillagat i ett öppet kök mitt i matsalen. Grillen är murad av gammalt åländskt tegel, och lokalen har väggar och tak av glas.', updated_at = now() where slug = 'brasserie-angbatsbryggan-aland' and description is null and hidden_at is null;

-- KÄLLA: https://elloshavscafe.se/ (läst 2026-09-22)
--   "Vi är ett hantverksbageri på Ellös."
--   "Du kan beställa räkmackor, pastasallad (kyckling-eller tonfiskröra), smörgåsar, smörgåstårta, stekta jätteräkor serveras med vitlök, chili, lime, lax och ris."
--   "Vi har även persisk mat, välj mellan lamm eller högrev saffran- och örtris med sallad."
--   "Du kan äta på plats eller ta med."
update restaurants set description = 'Ellös havscafé är ett hantverksbageri och café på Ellös. Sortimentet omfattar bland annat räkmackor, smörgåstårta, sallader och persisk mat som lamm eller högrev med saffransris, samt vegansk och vegetarisk mat. Man kan äta på plats eller ta med maten.', updated_at = now() where slug = 'ellos-havscafe' and description is null and hidden_at is null;

-- KÄLLA: https://gallno.se/gallno-krog/ (läst 2026-09-22)
--   "Vår meny erbjuder en mångfald av smårätter som är perfekta att dela på och större rätter med grillade inslag och fokus på grönsaker i stort."
--   "Ölen är ofta från svenska mikrobryggerier medans vinet oftast kommer från småskaliga kvalitetsmedvetna producenter i Frankrike, Italien och Spanien."
--   "Vi tar ej bordsbokningar, det är bara att komma förbi!"
--   "har vi även ett café där man kan få hembakta sötsaker och brygg eller epressobaserat kaffe på vår egen rost från Lykke kafferosteri."
update restaurants set description = 'Gällnö Krog är en sommaröppen krog på Gällnö med en meny av smårätter att dela och större rätter med grillade inslag och fokus på grönsaker. Ölen kommer ofta från svenska mikrobryggerier och vinet från småskaliga producenter i Frankrike, Italien och Spanien. Bordsbokning tas inte emot, och det finns även ett café med hembakat och kaffe.', updated_at = now() where slug = 'gallno-krog' and description is null and hidden_at is null;

-- KÄLLA: https://www.hamburgsundsfisk.se/ (läst 2026-09-22)
--   "Nu går det fint att boka hummeragn!"
--   "Vi har både salt makrill och blandade huvuden"
update restaurants set description = 'Hamburgsunds Fisk & Skaldjur i Hamburgsund har både en butik och restaurangen Sunnegabet. Här kan man även boka hummeragn.', updated_at = now() where slug = 'hamburgsunds-fisk-skaldjur' and description is null and hidden_at is null;

-- KÄLLA: https://www.hotellarkipelag.ax/ (läst 2026-09-22)
--   "I vår orientaliska restaurang med ginbar fylls kvällarna av cocktails, boule, shuffleboard och biljard."
--   "Vi har även stans coolaste uteservering där grillen och baren är öppen från juni till augusti."
--   "Vi är också en naturlig mötesplats i Mariehamn med restauranger, nattklubb, konferensrum och pool."
update restaurants set description = 'Hotell Arkipelag i Mariehamn har en orientalisk restaurang med ginbar, där kvällarna bjuder på cocktails, boule, shuffleboard och biljard. Hotellet har även en uteservering med grill och bar samt en nattklubb i anslutning till restaurangerna och konferensrummen.', updated_at = now() where slug = 'hotell-arkipelag-aland' and description is null and hidden_at is null;

-- KÄLLA: https://www.johanskrogmarstrand.se/ (läst 2026-09-22)
--   "Johans Krog är en charmig bistro mitt på Marstrandsön där franska influenser kombineras med smaker från västkusten."
--   "Här serveras vällagad mat med fokus på fisk, skaldjur och säsongsråvaror i en avslappnad men elegant miljö nära havet."
--   "Hundar är välkomna hos oss, så länge de är lydiga och hålls intill sällskapet."
update restaurants set description = 'Johans Krog är en bistro på Marstrandsön där franska influenser möts med smaker från västkusten. Menyn har fokus på fisk, skaldjur och säsongsråvaror, serverade i en avslappnad miljö nära havet. Hundar är välkomna så länge de är lydiga.', updated_at = now() where slug = 'johans-krog' and description is null and hidden_at is null;

-- KÄLLA: https://knarrholmen.se/ (läst 2026-09-22)
--   "Vi är en skärdgårdskrog som omringas utav havet."
--   "Vi rymmer upp mot 14 gäster i samtliga 7 rum."
--   "Ni har väll inte missat att vi har en vedeldad badtunna med tillhörande bastu nere vid havet?"
--   "Några år efter restaurangen byggts så glasade vi in och isolerade vår övervåning."
update restaurants set description = 'Knarrholmens Restaurang på Donsö är en skärgårdskrog omgiven av hav, med en meny inspirerad av havet och den svenska skogen. Anläggningen har hotellrum med strandnära läge, en vedeldad badtunna med bastu vid havet, samt lokalerna Rotundan och ett glasat övervåningsplan för fester och konferenser.', updated_at = now() where slug = 'knarrholmens-restaurang' and description is null and hidden_at is null;

-- KÄLLA: https://www.le-comptoir.se/ (läst 2026-09-22)
--   "Le Comptoir är en ost- och delikatessbutik kombinerat med Bistrot."
--   "Här kan man njuta av en matbit och ett glas vin varefter vi packar ihop en påse med godsaker att ta med hem."
--   "Vi importerar framförallt gårdsproducerad ost och andra franska delikatesser"
update restaurants set description = 'Le Comptoir i Marstrand är en ost- och delikatessbutik kombinerad med bistro. Här kan man äta en matbit och dricka ett glas vin, eller köpa med sig delikatesser hem. Butiken importerar bland annat gårdsproducerad ost och andra franska delikatesser.', updated_at = now() where slug = 'le-comptoir-marstrand' and description is null and hidden_at is null;

-- KÄLLA: https://publiklysekil.se/ (läst 2026-09-22)
--   "Publik kan beskrivas som en modern restaurang med en varierande meny där smakkombinationer inspirerade från bland annat västkusten, japan och sydamerika"
--   "fokuserar vi på att erbjuda ett brett och lite udda utbud av öl, vin, sprit och cocktails."
--   "Idag hittar du oss på bryggan bakom huset, med oslagbar havsutsikt och en meny i äkta foodtruck-stil: okomplicerad, välsmakande och serverad direkt över disk."
--   "sväng förbi med båten för en havsnära drive-thru"
update restaurants set description = 'Publik Mat & Bar ligger i Norra Hamnen i Lysekil och beskrivs som en modern restaurang med meny som blandar smakkombinationer från bland annat västkusten, Japan och Sydamerika, samt ett brett utbud av öl, vin, sprit och cocktails. I anslutning ligger Backyard, en enklare servering på bryggan med meny i foodtruck-stil dit man även kan komma med båt.', updated_at = now() where slug = 'publik-mat-bar' and description is null and hidden_at is null;

-- KÄLLA: https://shfjallbacka.se/ (läst 2026-09-22)
--   "Beläget precis vid kajen i den charmiga fiskebyn Fjällbacka"
--   "Våra restauranger serverar läckra rätter med inspiration från havet."
--   "Här kan du som gäst själv välja besöka vår vinkällare och välja vin för kvällens middag."
update restaurants set description = 'Restaurang Mamsell är en av restaurangerna på Stora Hotellet i Fjällbacka, beläget vid kajen i fiskebyn. Maten är inspirerad av havet, och hotellet har en vinkällare där gästerna själva kan välja vin till middagen.', updated_at = now() where slug = 'restaurang-mamsell' and description is null and hidden_at is null;

-- KÄLLA: https://skargardshotellethono.se/restaurang-skafferiet/ (läst 2026-09-22)
--   "koncept är enkelt – riktigt bra råvaror som serveras i en härlig miljö på ett avslappnat sätt."
--   "Vi varierar vår meny ofta med fokus på de råvaror som är lokala och i säsong."
--   "olika typer av cateringuppdrag och lagar mat från grunden med säsongens bästa råvaror."
update restaurants set description = 'Skafferiet Hönö är restaurangen på Skärgårdshotellet Hönö i Göteborgs skärgård. Konceptet bygger på råvaror som är lokala och i säsong, och menyn varieras ofta utifrån det. Restaurangen tar även emot cateringuppdrag med mat lagad från grunden.', updated_at = now() where slug = 'skafferiet-hono' and description is null and hidden_at is null;

-- KÄLLA: https://societetshuset.se/ (läst 2026-09-22)
--   "Societetshuset Marstrand byggdes 1886 och är än idag en levande mötesplats för goda måltider, fira livets stunder och minnesvärda möten."
--   "Vällagad mat med omsorg om råvaror, säsong och smak."
--   "Med utsikt över havet och skärgårdens inlopp bjuder vi in till sagolika stunder att minnas."
update restaurants set description = 'Societetshuset i Marstrand är en restaurang och möteslokal i en byggnad från 1886, med utsikt över havet och skärgårdens inlopp. Här finns restaurang samt lokaler för bröllop, fest och konferens.', updated_at = now() where slug = 'societetshuset' and description is null and hidden_at is null;

-- KÄLLA: https://strandkanten.se/ (läst 2026-09-22)
--   "Restaurang Strandkanten på Nordkoster erbjuder mat och dryck i en fantastisk miljö med utomhusservering på bryggan eller inomhus i den mysiga sjöboden."
--   "Passa på att handla presenter till dig själv och andra i den välfyllda butiken."
--   "Restaurang Strandkanten har öppet under sommarhalvåret och drivs av Maria Wogenius med familj tillsammmans med kollegor från öarna."
update restaurants set description = 'Strandkanten på Nordkoster är en restaurang med servering utomhus på bryggan eller inomhus i en sjöbod. Verksamheten drivs av Maria Wogenius med familj och kollegor från öarna, och det finns även en butik med presentartiklar.', updated_at = now() where slug = 'strandkanten-pa-nord-koster' and description is null and hidden_at is null;

-- KÄLLA: https://alanddistillery.com/ (läst 2026-09-22)
--   "NESTLED IN THE HEART OF NORTHERN ÅLAND, IN THE SCENIC SURROUNDINGS OF THE KASTELHOLM CASTLE, YOU FIND ÅLAND DISTILLERY."
--   "ÅLAND DISTILLERY IS THE FIRST AND ONLY DISTILLERY ON THE ÅLAND ISLANDS."
--   "crafted with 10 botanicals, blending Åland’s handpicked herbs with exotic spices"
update restaurants set description = 'Destilleri beläget i anslutning till Kastelholms slott i norra Åland. Här tillverkas gin i mindre skala, med inspiration från öns maritima historia och naturliga råvaror såsom lokala örter och kryddor.', updated_at = now() where slug = 'aland-distillery-aland' and description is null and hidden_at is null;

-- KÄLLA: https://www.clubmarin.ax/ (läst 2026-09-22)
--   "Vi finns i Mariehamn mitt i Ålands största marina för fritidsbåtar, MSF,"
--   "Inne i vår restaurang finns sittplatser för 70 gäster, samt en bar."
--   "På vår meny har vi alltid dagens rätt, a la carte, sallader, pizza, smörgåsar och hembakt kaffebröd."
update restaurants set description = 'Restaurang och delikatessbutik i Mariehamn, belägen vid Ålands största marina för fritidsbåtar (MSF). Serverar dagens rätt, à la carte, sallader, pizza och smörgåsar, med sittplatser för 70 gäster inomhus samt en veranda mot vattnet.', updated_at = now() where slug = 'club-marin-aland' and description is null and hidden_at is null;

-- KÄLLA: https://www.evertssjobod.se/ (läst 2026-09-22)
--   "Hos oss får du uppleva smak- och naturupplevelser i den Bohuslänska skärgården."
--   "Vårt B&B ligger i direkt anslutning till vår gamla sjöbod där alla aktiviteter utgår ifrån."
--   "Grebbestad är känt för sina goda skaldjur, och hummersafari, ostronprovningar och fisketurer är bara några exempel på vad du kan uppleva här i Bohuslän."
update restaurants set description = 'Bed & Breakfast med bas i en gammal sjöbod i den Bohuslänska skärgården utanför Grebbestad. Erbjuder skärgårdsupplevelser som hummersafari, ostronprovning och fisketurer, samt boende i nära anslutning till sjöboden.', updated_at = now() where slug = 'everts-sjobod-grebbestad-bohuslan' and description is null and hidden_at is null;

-- KÄLLA: https://www.hunnebostrandsvandrarhem.se/ggbb/index.html (läst 2026-09-22)
--   "Vi tillagar maten från grunden, gärna med råvaror från vår närhet."
--   "Maten är inspirerad av det franska köket med Svenska klassiker."
--   "Menyerna varierar efter årstid och säsong."
update restaurants set description = 'Bar och bistro i Hunnebostrand, del av Hunnebostrands Vandrarhem. Maten lagas från grunden, gärna med råvaror från närområdet, med inspiration från det franska köket blandat med svenska klassiker. Menyn varierar efter säsong.', updated_at = now() where slug = 'gammelgardens-bar-bistro' and description is null and hidden_at is null;

-- KÄLLA: https://www.hamnkafeet.se/ (läst 2026-09-22)
--   "Vi erbjuder fri lunchutkörning i hela Klintehamn."
--   "Det ingår varmrätt och sallad i lunchpaketen."
--   "Klicka för att se vår À la Carte-meny."
update restaurants set description = 'Café och lunchrestaurang i Klintehamn på Gotland, med lunchmeny och à la carte-meny. Erbjuder fri hemkörning av lunch inom Klintehamn, där lunchpaketen innehåller varmrätt och sallad.', updated_at = now() where slug = 'hamnkafeet-klintehamn-gotland' and description is null and hidden_at is null;

-- KÄLLA: https://www.hotellborgholm.com/ (läst 2026-09-22)
--   "Hotell Borgholm har funnits sedan 1972"
--   "Lokala och säsongsbetonade menyer och alltid med inspiration från det öländska landskapet."
--   "örtträdgård där vi odlar närmare 100 olika smaksättningar till våra menyer."
update restaurants set description = 'Hotell och restaurang i centrala Borgholm på Öland, verksamt sedan 1972. Menyn är lokal och säsongsbetonad med inspiration från det öländska landskapet, och örtträdgården vid hotellet odlar närmare 100 olika smaksättningar till menyerna.', updated_at = now() where slug = 'hotell-borgholm-oland-oland' and description is null and hidden_at is null;

-- KÄLLA: https://www.kajmagasinet.se/ (läst 2026-09-22)
--   "Restaurang och bar vid Rosviksgatan i Lysekil sedan 2010. Mat, drinkar och stämning direkt vid vattnet."
--   "Vi serverar vällagad mat utan krångel — bra råvaror, lokala favoriter och rätter man faktiskt blir mätt på."
--   "Utmana kompisgänget i en match biljard eller dart, lyssna på livemusik under sommaren"
update restaurants set description = 'Restaurang och bar vid Rosviksgatan i Lysekil, verksam sedan 2010, direkt vid vattnet. Serverar hemlagad mat med lokala råvaror, och här finns biljard och dart samt livemusik på sommaren.', updated_at = now() where slug = 'kajmagasinet' and description is null and hidden_at is null;

-- KÄLLA: https://www.kosterbaden.com/ (läst 2026-09-22)
--   "Med utsikt över Kostersundet kan du njuta av en kopp kaffe, kall öl, dagens lunch eller en härlig fransk bistro på kvällen."
--   "köksmästare Calle Kindborg som startade sin karriär hos Leif Mannerström & Ulf Wagner"
--   "Välkommen till Västkusten och underbara Vettnet på Nordkoster."
update restaurants set description = 'Bistro i anslutning till Kosterbadens lägenhetshotell på Nordkoster i Bohuslän, med utsikt över Kostersundet. Köksmästare är Calle Kindborg, som tidigare arbetat hos Leif Mannerström och Ulf Wagner. Serverar kaffe, öl, lunch och fransk bistromat på kvällen.', updated_at = now() where slug = 'kosterbaden-och-ventuno-bistro-bohuslan' and description is null and hidden_at is null;

-- KÄLLA: https://nimbusockero.se/en/bastu-ockero/ (läst 2026-09-22)
--   "RENT OUR BEAUTIFUL SAUNA RIGHT BY THE SEA AT THE END OF THE PIER."
--   "YOU CAN SAUNA UP TO 8 PEOPLE FOR 2 OR 4 HOT HOURS."
--   "BATHING CAN BE DONE BOTH INSIDE THE HARBOR AND ON THE NEW PIER FACING THE SEA"
update restaurants set description = 'Bastu vid piren i Nimbus gästhamn på Öckerö utanför Göteborg. Bastun rymmer upp till åtta personer och kan hyras för två eller fyra timmar, med möjlighet till bad både i hamnen och vid den nya piren mot havet.', updated_at = now() where slug = 'nimbus-bastu-ockero' and description is null and hidden_at is null;

-- KÄLLA: https://www.brygganfjallbacka.se/sv/restaurang-matilda (läst 2026-09-22)
--   "Här sitter ni bokstavligen talat och äter på vattnet."
--   "Restaurangen har stort fokus på fisk och skaldjursrätter men ni hittar också härliga kötträtter i menyn."
--   "Restaurang Matilda är listad i White Guide sedan 20 år tillbaka"
update restaurants set description = 'Restaurang i Fjällbacka, del av Bryggan Fjällbacka, med bord direkt över vattnet. Fokus ligger på fisk- och skaldjursrätter samt kötträtter. Restaurangen har varit listad i White Guide sedan cirka 20 år tillbaka.', updated_at = now() where slug = 'restaurang-matilda' and description is null and hidden_at is null;

-- KÄLLA: https://biopark.se/ (läst 2026-09-22)
--   "hänga i baren över en drink, äta en trerätters middag, se en bra film eller bara slinka in på en kopp kaffe"
--   "Veckans lunchmeny
À la carte meny
Take away -I mån av tid för köket
Parks pan pizza meny"
--   "Park är en restaurang för alla, både för köttälskare och fiskälskare."
update restaurants set description = 'Restaurang och biograf i Strömstad som kombinerar mat, bar och film i samma byggnad. Gäster kan äta en trerätters middag, ta en drink i baren, se en film eller bara ta en kopp kaffe. Erbjuder lunchmeny, à la carte, take away och pizza.', updated_at = now() where slug = 'restaurangbiografen-park-ab' and description is null and hidden_at is null;

-- KÄLLA: https://skaretskrog.se/ (läst 2026-09-22)
--   "I början av Smögenbryggan, i samma lokaler där räkmackan såg dagens ljus 1931, lagas och bakas fortfarande allt från grunden."
--   "Mötesplatsen på bryggan med Sveriges pianistelit på scen."
--   "Nybakade godsaker, färska skaldjur, klassiska varmrätter"
update restaurants set description = 'Krog, café och bageri på Smögenbryggan, med anor sedan 1931 då räkmackan uppges ha uppstått på platsen. Byggnaden rymmer både Krog & Pianobar, med levande pianomusik, och Café & Bistro med nybakade bakverk och färska skaldjur.', updated_at = now() where slug = 'skarets-krog-caf' and description is null and hidden_at is null;

-- KÄLLA: https://www.soltuna.ax/ (läst 2026-09-22)
--   "Soltuna

Ålands högsta restaurang 

Boka Boende
Boka ditt sommarboende
Restaurang & Cafe"
--   "Vi har 10 stycken övernattningsstugor med 4 bäddar i varje."
--   "Det finns bastu med omklädningsrum och duschar att hyra."
--   "Soltuna erbjuder catering till olika typer av tillställningar t.ex bröllop, kalas, begravning."
update restaurants set description = 'Restaurang och café i Geta på Åland. Vid anläggningen finns tio övernattningsstugor med fyra bäddar vardera samt bastu med omklädningsrum. Soltuna erbjuder även catering till exempelvis bröllop, kalas och begravningar.', updated_at = now() where slug = 'soltuna-resturang-och-cafe-aland' and description is null and hidden_at is null;

-- KÄLLA: https://www.knippla.se/thai-corner (läst 2026-09-22)
--   "Tata är uppvuxen och har bott större delen av sitt liv i Thailand innan hon mötte kärleken och flyttade till Knippla."
--   "Här kan du njuta av äkta hemlagad thailändsk mat, tillagad med kärlek."
--   "Foodtrucksen är belägna i hamnen precis vid hamnplanen både på Öckerö och Knippla"
update restaurants set description = 'Thailändsk food truck på Knippla, driven av Tata som är uppvuxen i Thailand. Serverar hemlagad thailändsk mat som lunch eller middag, med foodtrucks placerade vid hamnplanen på både Knippla och Öckerö.', updated_at = now() where slug = 'thai-corner-knippla' and description is null and hidden_at is null;

-- KÄLLA: https://waggalantkok.se/ (läst 2026-09-22)
--   "Wägga Lantkök ligger i Johannesvik utanför Kungshamn på Bohuskusten — en plats där det lantliga möter det moderna och havet alltid finns i närheten."
--   "Handskalade räkor direkt från Västkusten."
--   "Smashburgare och pizza inspirerade av Bohuskusten."
--   "Livemusik under stjärnorna vid Bohuskusten."
update restaurants set description = 'Grillrestaurang i Johannesvik utanför Kungshamn på Bohuskusten, nära havet. Serverar grillat kött och fisk, handskalade räkor, samt smashburgare och pizza inspirerade av Bohuskusten. Bjuder även på livemusik.', updated_at = now() where slug = 'wagga-lantkok' and description is null and hidden_at is null;

-- KÄLLA: https://www.brudhall.com/ (läst 2026-09-22)
--   "I Brudhälls restaurang kan du njuta av god mat för alla smaker."
--   "därför väljer vi att tillreda maten från grunden på säsongsbaserade och närproducerade färska råvaror. Hos oss hittar du även alltid vegetariska rätter."
--   "Vår gästhamn ligger i en skyddad vik nära till bränslestation och välsorterad nybyggd butik."
update restaurants set description = 'Restaurang som en del av Brudhälls hotell- och gästhamnsanläggning på Kökar i Ålands skärgård. Menyn omfattar bland annat burgare, pizza, lunch och middag, tillagade av säsongsbaserade och närproducerade råvaror, med vegetariska alternativ. Gästhamnen ligger i en skyddad vik nära anläggningen.', updated_at = now() where slug = 'brudhall-hotel-restaurant-och-marina-aland' and description is null and hidden_at is null;

-- KÄLLA: https://rosholmensmarin.se/ (läst 2026-09-22)
--   "Välkommen till vår Sjömack på Rösholmen - mitt emellan Kungshamn och Smögen!"
--   "Här finns ren diesel och bensin tillgängligt dygnet runt, året om, via kortautomat."
--   "På sommaren har vi kiosken öppen med glass, godis, fika och andra förnödenheter."
update restaurants set description = 'Sjömack vid Rösholmen, mitt emellan Kungshamn och Smögen. Diesel och bensin finns tillgängligt dygnet runt via kortautomat. På sommaren öppnas även en kiosk med bland annat glass, godis och fika.', updated_at = now() where slug = 'diesel-och-bensin-rosholmens-sjomack' and description is null and hidden_at is null;

-- KÄLLA: https://www.fpvonknorring.com/ (läst 2026-09-22)
--   "Din sommarrestaurang och -bar i Mariehamn"
--   "Ombord på det historiska passagerarfartyget från 1928 möter du en atmosfär där sjöfartshistoria och kulinariska upplevelser förenas."
--   "Fartyget ligger vackert förtöjt i Österhamn och erbjuder gästerna en stämningsfull miljö med havet som närmaste granne."
update restaurants set description = 'Restaurang och bar ombord på ett historiskt passagerarfartyg från 1928, förtöjt i Österhamn i Mariehamn. Restaurangen är öppen på sommaren. I anslutning finns puben Pub Frans.', updated_at = now() where slug = 'f-p-von-knorring-aland' and description is null and hidden_at is null;

-- KÄLLA: https://www.vardskapivast.se/ (läst 2026-09-22)
--   "Nära Smögen i Bohuslän. Vi erbjuder aktiviteter, boende, event, bröllop, möten och mycket mer!"
--   "Boka sommarsemestern i egen sjöbod

Plats för lilla eller stora gänget med 4-16 bäddar"
--   "Inspireras av våra aktiviteter
Mat
Skaldjursbuffé eller grillat?"
update restaurants set description = 'Hampholmens Magasin är en egen ö nära Smögen i Bohuslän som hyrs ut för fester, bröllop, möten och andra evenemang, med boende i sjöbodar för mellan 4 och 16 personer. Verksamheten omfattar även Havets Magasin, och bland maten som erbjuds finns skaldjursbuffé eller grillat.', updated_at = now() where slug = 'hampholmens-magasin-pa-en-egen-o-nara-smogen' and description is null and hidden_at is null;

-- KÄLLA: https://hotellhamnen.se/om-hotellet/ (läst 2026-09-22)
--   "På bottenplan ligger Epok, en fantastiska restaurangen med härlig havsutsikt."
--   "Här bor du mitt på hamnplanen med ett generöst utbud av restauranger, specerihandlare, caféer och glassbarer."
--   "Hotellet är en rökfri anläggning med en fantastisk vy ut över Kalmarsund."
update restaurants set description = 'Hotell Hamnen ligger mitt på hamnplanen i Färjestaden på Öland, med restauranger, specerihandlare, caféer och glassbarer i direkt anslutning. På bottenplan i hotellet finns restaurangen Epok, och utsikten sträcker sig ut över Kalmarsund.', updated_at = now() where slug = 'hotell-hamnen-farjestaden-oland' and description is null and hidden_at is null;

-- KÄLLA: https://lysekilkallbadhus.se/ (läst 2026-09-22)
--   "Lysekils kallbadhus och dess bastu är en oas i direkt anslutning till Lysekils centrum."
--   "Lysekils kallbadhus är idag ett av få existerande kallbadhus här på Västkusten som finns kvar i näst intill originaltappning från 1906"
--   "Numera ryms både Herr-och Dambadet i Kallbadhuset – avdelningarna har separata ingångar efter huvudentrén och avdelas med ett högt plank."
update restaurants set description = 'Kallbadhuset i Lysekil är ett kallbadhus med bastu i direkt anslutning till stadens centrum, i drift sedan 1906 och ett av få kvarvarande kallbadhus av sitt slag på Västkusten. Det finns separata avdelningar för dam och herr, och anläggningen drivs av en ideell förening.', updated_at = now() where slug = 'kallbadhuset-i-lysekil' and description is null and hidden_at is null;

-- KÄLLA: https://sillosardell.se/ (läst 2026-09-22)
--   "Ni upplever oss i Strandverkets unika miljö på Marstrandsön."
--   "Med en inriktning på havsmat i matsalen och en italiensk vinbar levereras här en upplevelse"
--   "Olof & Robert, med förkärlek för italiensk skönsång, hantverksmässiga viner & njutningsmat, skapar här gemenskap i"
update restaurants set description = 'Restaurang på Marstrandsön, belägen i Strandverkets miljö vid borggården med havet som granne. Verksamheten kombinerar havsmat i matsalen med en italiensk vinbar och drivs av Olof och Robert.', updated_at = now() where slug = 'krogen-sill-sardell-pa-marstrands-on' and description is null and hidden_at is null;

-- KÄLLA: https://lolos.ax/snacko-frukt/ (läst 2026-09-22)
--   "I vår gårdsbutik vid Lolo’s Seaside Café & Restaurant finner du åländskt mathantverk från utvalda producenter"
--   "Lolo’s startade nämligen som en sidoverksamhet till denna vår äppelodling, som ligger alldeles intill restaurangen."
--   "Vid Snäckö Frukt pressar vi sortrena äppelmuster samt producerar äppelmos och -chutney."
update restaurants set description = 'Lolo''s Seaside Café & Restaurant ligger vid Snäckö på Åland, granne med den egna äppelodlingen Snäckö Frukt. I anslutning till caféet finns en gårdsbutik med åländskt mathantverk, bland annat äppelmust, äppelmos och -chutney från odlingen.', updated_at = now() where slug = 'lolo-s-seaside-cafe-och-restaurant-aland' and description is null and hidden_at is null;

-- KÄLLA: https://norrahamnen5.se/ (läst 2026-09-22)
--   "Lokala råvaror från kust och hav."
--   "Frestas av havskräftor, ostron, räkor och blåmusslor."
--   "Förstklassig mat och utsikt över västerhavet."
update restaurants set description = 'Restaurang i Lysekil med utsikt över västerhavet. Menyn bygger på lokala råvaror från kust och hav, med rätter som havskräftor, ostron, räkor och blåmusslor. Bordsbokning görs via restaurangen.', updated_at = now() where slug = 'norra-hamnen-5' and description is null and hidden_at is null;

-- KÄLLA: https://relaxbar.se/ (läst 2026-09-22)
--   "Våra mysiga lokaler speglar vår passion för färska ingredienser, ärlig matlagning och en njutbar atmosfär."
--   "Vår meny bjuder på rätter som har sammansatts med färska ingredienser och kärlek från Thailand"
--   "Relax Bar & Bistro är det självklara valet för att fika, äta, dricka och umgås i Strömstad."
update restaurants set description = 'Relax Bar & Bistro är en bar och bistro på Norra Hamngatan i Strömstad, för fika, mat och dryck. Menyn är sammansatt med färska ingredienser och hämtar inspiration från thailändska smaker.', updated_at = now() where slug = 'relax-bar-bistro' and description is null and hidden_at is null;

-- KÄLLA: https://dayseemedia.wixsite.com/mormorsgronahus (läst 2026-09-22)
--   "Vi huserar i släktens gårdshemman från 1800-talet på Ålands landsbygd och som varsamt omvandlats till en idyllisk och ombonad restaurang."
--   "Maten vi serverar är så långt det är möjligt producerad och odlad på Åland (axgan) allt för en hållbar framtid."
--   "Vi har även som första restaurang på Åland utsetts till Axganmästare av Skördefestens vänner 2 år i rad."
update restaurants set description = 'Restaurang i ett släktgårdshemman från 1800-talet i Norrby, Lemland, på Åland, omvandlat till restaurang i en lantlig och historisk miljö. Maten är i så hög grad som möjligt producerad och odlad på Åland, och restaurangen har utsetts till Axganmästare av Skördefestens vänner två år i rad.', updated_at = now() where slug = 'restaurang-mormors-grona-hus-aland' and description is null and hidden_at is null;

-- KÄLLA: https://www.roroboa.se/ (läst 2026-09-22)
--   "Vi gör vårt yttersta för att servera all gelato med så bra kvalitet som möjligt och så smakrikt det bara går."
--   "Sedan starten av Boa 2016 har vi serverat hamburgare. Varje burgare är tillverkad på 100% svenskt nötkött och smashas direkt på stekbordet när beställningen kommer."
--   "Vad vore en sommarmeny utan riktigt bra och fräscha sallader. Hos oss kan du få sallader både med kött och vegetariska."
update restaurants set description = 'Röröboa är ett café och restaurang i gästhamnen på Rörö i Göteborgs skärgård, verksamt sedan 2016. Där tillverkas handgjord gelato på plats, och menyn omfattar även hamburgare av svenskt nötkött samt sallader, både med kött och vegetariska.', updated_at = now() where slug = 'roroboa-caf-restaurang' and description is null and hidden_at is null;

-- KÄLLA: https://www.sommardrom.se/ (läst 2026-09-22)
--   "Vi är en glassbar & brunchrestaurang som finns på Tjörn i Skärhamn och i Göteborg i Linnéstaden."
--   "Hos oss hittar du nästan hundra kulglassmaker, mjukglass, glassdesserter och milkshakes"
--   "Vår stora meny erbjuder dessutom brunchpaket, amerikanska pannkakor, crêpes, våfflor och mycket mer."
update restaurants set description = 'Sommardröm är en glassbar och brunchrestaurang med en avdelning i Skärhamn på Tjörn, vid Södra Hamnen. Utbudet omfattar ett stort antal kulglassmaker, mjukglass och glassdesserter, samt en brunchmeny med bland annat amerikanska pannkakor, crêpes och våfflor.', updated_at = now() where slug = 'sommardrom-skarhamn' and description is null and hidden_at is null;

-- KÄLLA: https://www.thai-prastgarden.se/ (läst 2026-09-22)
--   "À la carte

Sushi

Lunch buffé

More...

Thairestaurang

Prästgården

Take Away Meny"
--   "Kontakta oss
Lunch Buffé
Sushi
Tre små rätter

Tempura maki

Poké bowl med lax"
update restaurants set description = 'Thairestaurang i Kungshamn med meny som omfattar à la carte, sushi och lunchbuffé, samt en take away-meny. Bland maträtterna märks bland annat tempura maki och pokébowl med lax.', updated_at = now() where slug = 'thairestaurang-prastgarden' and description is null and hidden_at is null;

-- KÄLLA: https://www.wolffskitchen.se/ (läst 2026-09-22)
--   "We are a small owner-run restaurant in the heart of Lysekil, serving a rotating lunch and dinner menu made from local ingredients"
--   "We love well produced wine, and we love to pair it. Our wine list is small and curated, with a special focus on Austria"
--   "We always have beer from local breweries on tap."
--   "High seats by the open kitchen."
--   "A more classic setting with a bistro style set up."
update restaurants set description = 'En liten, ägardriven restaurang i centrala Lysekil med en roterande lunch- och middagsmeny baserad på lokala råvaror och säsongsbetonade smaker. Restaurangen har en vinlista med fokus på Österrike och serverar öl från lokala bryggerier på fat. Sittplatser finns både vid Chef''s Table intill det öppna köket och i bistrodelen.', updated_at = now() where slug = 'wolff-s-kitchen-lysekil' and description is null and hidden_at is null;

-- KÄLLA: https://www.goteborg.com/platser/bastun-i-frihamnen (läst 2026-09-22)
--   "Bastun är öppen för allmänheten och ligger i anslutning till det flytande badet i Göta älv."
--   "Den har plats för upp till 25 personer, och är tillgänglighetsanpassad med hiss upp till basturummet."
--   "I direkt anslutning till bastun ligger det flytande utomhusbadet Hamnbadet."
update restaurants set description = 'Allmänna bastun ligger vid Göta älv i Frihamnen, alldeles intill det flytande utomhusbadet Hamnbadet. Bastun är öppen för allmänheten, rymmer upp till 25 personer och är tillgänglighetsanpassad med hiss upp till basturummet.', updated_at = now() where slug = 'allmanna-bastun' and description is null and hidden_at is null;

-- KÄLLA: https://batebacken.se/ (läst 2026-09-22)
--   "vår lilla skärgårdskrog på Styrsö Tången som drivs av Börjessons sjötaxi & charterbåtar"
--   "serverar vi dej helst något från havet och då framförallt skaldjur"
--   "finns det gästplatser nära intill vår servering på Tången"
update restaurants set description = 'Båtebacken är en liten skärgårdskrog och caférestaurang på Styrsö Tången, vid kajkanten i det gamla fiskarsamhället. Verksamheten drivs av Börjessons sjötaxi & charterbåtar och serverar bland annat skaldjur samt fika, med uteservering och utsikt över skärgården. Gästplatser för egen båt finns nära intill.', updated_at = now() where slug = 'batebacken' and description is null and hidden_at is null;

-- KÄLLA: https://www.brygganfjallbacka.se/sv (läst 2026-09-22)
--   "Bo med havet som granne"
--   "Hos oss lägger vi ett stort fokus på matupplevelsen."
--   "Tillsammans erbjuder våra restauranger ett brett utbud med något som skall passa de flesta tillfällen."
update restaurants set description = 'Bryggan Fjällbacka i Fjällbacka är ett hotell med flera restauranger under samma tak, bland dem Restaurang Matilda. Anläggningen ligger vid havet.', updated_at = now() where slug = 'bryggan-fjallbacka-bohuslan' and description is null and hidden_at is null;

-- KÄLLA: https://www.enigheten.ax/ (läst 2026-09-22)
--   "Enigheten är en restaurerad historisk gård i Degerby Föglö på Åland."
--   "Vi erbjuder 12 bekväma rum för 1-5 gäster och 3 enklare bodar för 1-6 gäster."
--   "De som kommer med egen båt är välkomna att lägga till vid vår brygga för besök eller övernattning."
update restaurants set description = 'Gästhem Enigheten är en restaurerad historisk gård i Degerby, Föglö på Åland, som fungerat som tingsplats och gästgiveri sedan 1700-talet. Gästhemmet har 12 rum för 1–5 gäster samt tre enklare bodar för 1–6 gäster, och den som kommer med egen båt kan lägga till vid gårdens brygga.', updated_at = now() where slug = 'gasthem-enigheten-aland' and description is null and hidden_at is null;

-- KÄLLA: https://www.alandhotels.fi/sv/hotell-pommern (läst 2026-09-22)
--   "Vårt hotell är Svanenmärkt och har 95 moderna och fräscha rum med hög komfort och standard."
--   "restaurang Kvarter 5 som bjuder på mångsidiga smakupplevelser under dygnets olika tider"
--   "Njut av mat som bygger på det nya nordiska köket och ett säsongsbaserat urval av Ålands fina lokala råvaror."
update restaurants set description = 'Hotell Pommern ligger centralt i Mariehamn på Åland och är ett Svanenmärkt hotell med 95 rum. I hotellet finns restaurang Kvarter5, som serverar nordisk mat med säsongsbaserade råvaror från Åland, samt en vinbar.', updated_at = now() where slug = 'hotell-pommern-aland' and description is null and hidden_at is null;

-- KÄLLA: https://www.kallungegard.se/ (läst 2026-09-22)
--   "Njut av smarriga bakverk, pajer, matiga mackor och en härlig lunchmeny."
--   "I vår glassbar hittar du Lejonet & Björnens fantastiska glass"
--   "Marknader, livemusik, yoga, matupplevelser och mycket mer."
update restaurants set description = 'Källunge Gård är en mötesplats på norra Gotland med café, glassbar och butik. Mat och fika serveras från en ombyggd 60-talsbuss med bland annat bakverk, pajer och matiga mackor, och gården arrangerar även marknader, livemusik och andra evenemang.', updated_at = now() where slug = 'kallunge-gard-gotland' and description is null and hidden_at is null;

-- KÄLLA: https://www.kronetbyvisby.se/ (läst 2026-09-22)
--   "Vi hämtar vår inspiration från spanskans tapas servering men låter oss omfamna Medelhavet och den underbara matkulturen från Italien, Frankrike och Spanien."
--   "Vårt fokus ligger på vällagade mindre rätter som är perfekta om du vill prova flera olika smaker"
update restaurants set description = 'Krönet By Visby är en restaurang i Visby, inspirerad av spansk tapasservering och Medelhavets matkultur från Italien, Frankrike och Spanien. Fokus ligger på mindre rätter som passar för att prova flera smaker eller dela med sällskapet, tillsammans med vin.', updated_at = now() where slug = 'kronet-by-visby-gotland' and description is null and hidden_at is null;

-- KÄLLA: https://lottasbakoform.se/ (läst 2026-09-22)
--   "Vid havet i Bleket på södra Tjörn ligger Lottas Bak&Form."
--   "Alla våra bröd bakas enbart med kulturspannmål och surdeg, får jäsa i minst 48 timmar och är stenungsbakade på plats."
--   "Ta med familj och vänner, sitt ner och njut av en härlig vegetarisk surdegspizza med säsongens grönsaker på vår uteservering."
update restaurants set description = 'Lottas Bak&Form är ett surdegsbageri och café i Bleket vid havet på södra Tjörn. Här bakas bröd på kulturspannmål och surdeg i stenugn, och kaféet serverar bland annat vegetarisk surdegspizza med säsongens grönsaker på uteserveringen med havsutsikt.', updated_at = now() where slug = 'lottas-bak-form-surdegsbageri-caf' and description is null and hidden_at is null;

-- KÄLLA: https://bryggvingen.se/erik-och-fisket/ (läst 2026-09-22)
--   "Bryggvingen är en restaurang som ligger på ön Lyr på sydvästra Orust."
--   "våra färska råvaror tillsammans med nyfångad fisk som vi fiskar till stora delar själva med vår fiskebåt"
--   "I vår fiskbutik säljer vi våra egenfångade delikatesser från havet tillsammans med Take Away, hembakat bröd, mejerivaror, färsk frukt och grönsaker."
update restaurants set description = 'Bryggvingen är en restaurang och fiskaffär på ön Lyr på sydvästra Orust. Restaurangen serverar skaldjurs- och fiskrätter som till stor del fångas med den egna fiskebåten, och i fiskaffären säljs egenfångade delikatesser från havet tillsammans med take away, bröd, mejerivaror, frukt och grönsaker.', updated_at = now() where slug = 'restaurang-bryggvingen-bohuslan' and description is null and hidden_at is null;

-- KÄLLA: https://qskar.se/ (läst 2026-09-22)
--   "Med bästa läge på bryggan i vackra Grebbestad hittar du vår mysiga restaurang."
--   "Från vår vindskyddade uteservering kan du njuta av utsikten över Grebbestadfjorden och gästhamnen."
--   "Vi serverar lunch och middag baserat på mycket råvaror från lokala producenter och leverantörer."
update restaurants set description = 'Q Restaurang & Bar ligger på bryggan i Grebbestad, med uteservering och utsikt över Grebbestadfjorden och gästhamnen. Restaurangen serverar lunch och middag baserad på råvaror från lokala producenter och leverantörer, tillsammans med drinkar, vin och öl.', updated_at = now() where slug = 'restaurang-q-skar-grebbestad' and description is null and hidden_at is null;

-- KÄLLA: https://www.roysdelikatesser.se/ (läst 2026-09-22)
--   "KÄNN ER SOM HEMMA PÅ VÅR UTESERVERINGEN ELLER EN TRAPPA UPP PÅ VÅR MYSIGA OVANVÅNING MED UTSIKT ÖVER SMÖGENS INLOPP."
--   "LUNCH, MIDDAG ELLER SNACKS & DRINKAR - VÄRME OCH KÄRLEK,"
update restaurants set description = 'Roy''s Delikatesser ligger vid hamnen på Smögen. Verksamheten har uteservering samt sittplatser på en övervåning med utsikt över Smögens inlopp, och serverar lunch, middag samt snacks och drinkar.', updated_at = now() where slug = 'roy-s-delikatesser' and description is null and hidden_at is null;

-- KÄLLA: https://www.slussenspensionat.se/ (läst 2026-09-22)
--   "ett litet hotell med stor själ, en scen där några av Sveriges finaste artister framför sin musik"
--   "Lokal mat, ekologiska viner, giftfri miljö och hållbara aktiviteter är bara några av våra ställningstaganden."
--   "Slussens Pensionat ligger mitt i havsviken med skog och öppna betesmarker nästgårds"
update restaurants set description = 'Slussens Pensionat är ett litet hotell och restaurang på norra Orust, i innerskärgården, med en scen för liveframträdanden. Verksamheten är ett familjeföretag med fokus på lokal mat, ekologiska viner och ett hållbart förhållningssätt, beläget vid en havsvik med skog och betesmarker i närheten.', updated_at = now() where slug = 'slussens-pensionat-bohuslan' and description is null and hidden_at is null;

-- KÄLLA: https://pizzeriastationen.se/ (läst 2026-09-22)
--   "Vi finns på togstationen i Strömstad"
--   "Hamburgare av kalvkött. 200 gram"
--   "Oxfilépasta

Oxfilé, grönsaker, krämig sås"
update restaurants set description = 'Stationen Restaurang i Strömstad är en pizzeria belägen vid järnvägsstationen, mitt i Strömstad. Menyn omfattar pizza, pasta och burgare, bland annat en hamburgare av kalvkött samt oxfilépasta med grönsaker och krämig sås.', updated_at = now() where slug = 'stationen-restaurang-stromstad' and description is null and hidden_at is null;

-- KÄLLA: https://www.stromstad-bad.se/ (läst 2026-09-22)
--   "Badhuset ligger mitt i centrum med en enorm utsikt över inloppet till Strömstads gästhamn."
--   "Vår simhall är unik med saltvatten!"
--   "Strömstads Badanstalt bedriver en modern bad- och friskvårdsanläggning för alla åldrar."
update restaurants set description = 'Strömstads kallbadhus ingår i Strömstads Badanstalt, en bad- och friskvårdsanläggning mitt i centrala Strömstad med utsikt över inloppet till gästhamnen. Anläggningen omfattar bland annat en simhall med saltvatten samt ett kallbadhus.', updated_at = now() where slug = 'stromstads-kallbadhus' and description is null and hidden_at is null;

-- KÄLLA: https://www.theoldhouseinn.se/ (läst 2026-09-22)
--   "The Old House Inn ligger mitt i centrum av Lysekil."
--   "Med en historia som innefattar anrik traditionell järnhandel, har lokalen än idag kvar sin robusta karaktär."
--   "Mötet mellan vår lavastensgrill och vårt omsorgsfullt utvalda kött skapar många fantastiska måltidsval för den köttälskande."
--   "Hela 10 olika öl på fat finns att välja bland och en hel komplettering av spännande flaskor."
update restaurants set description = 'The Old House Inn är en pub och steakhouse mitt i centrum av Lysekil, inrymd i en tidigare järnhandel med bevarade stenväggar och takbjälkar. Restaurangen tillagar kött på lavastensgrill och har ett stort ölutbud samt viner och sprit.', updated_at = now() where slug = 'the-old-house-inn' and description is null and hidden_at is null;

-- KÄLLA: https://ziversveranda.se/ (läst 2026-09-22)
--   "I vår bistromeny hittar du smårätter och huvudrätter, samt ett noggrant utval av vin, öl och andra trevliga drycker."
--   "Vårt glasscafé är beläget direkt på kajkanten i Hönö Klåva"
--   "Vi erbjuder ett brett utbud av glassmaker från Triumf Glass, tillverkade i Sävedalen Göteborg av tredje generationen Müntzing."
update restaurants set description = 'Zivers Veranda ligger i Hönö Klåva och erbjuder lunch, bistro & bar samt ett glasscafé på kajkanten. Bistromenyn har små- och huvudrätter samt vin och öl, med utsikt över hamninloppet från bistron eller terrassen. Glassen kommer från Triumf Glass i Sävedalen.', updated_at = now() where slug = 'zivers-veranda' and description is null and hidden_at is null;

-- KÄLLA: https://bellagastis.se/ (läst 2026-09-22)
--   "praktiskt taget på vattnet, är vår restaurang en central mötesplats"
--   "Hos oss ligger fokus på råvaror från vårt närområde"
--   "en familjär service med havet som kuliss"
update restaurants set description = 'Bella Gästis är en restaurang i Hunnebostrand, belägen praktiskt taget på vattnet med hamnen som kuliss. Verksamheten har fokus på råvaror från närområdet och en familjär service.', updated_at = now() where slug = 'bella-gastis' and description is null and hidden_at is null;

-- KÄLLA: http://www.bryggcafet.se/ (läst 2026-09-22)
--   "Restaurang och Bar precis vid havet i vackra Bovallstrand"
--   "A La Carte, Lunch, Pizza, Bar"
--   "att ha min dotter Sude vid min sida"
update restaurants set description = 'Bryggcafét är en restaurang och bar i Bovallstrand, belägen precis vid havet vid torget i hamnen. Verksamheten erbjuder à la carte, lunch, pizza och bar, och drivs av far och dotter tillsammans med sitt team.', updated_at = now() where slug = 'bryggcaf-t' and description is null and hidden_at is null;

-- KÄLLA: https://www.dyron.se/om-dyron/ (läst 2026-09-22)
--   "Dyrön har även en mycket populär bokningsbar bastu som år 2008 utnämndes till Sveriges finaste eluppvärmda bastu"
--   "Dyrön strax norr om Marstrand är en av Tjörns kommuns sex skärgårdsöar"
--   "två badplatser med trampoliner, badstegar och sandstrand"
--   "de två gästhamnarna – Nord- och Sydhamnen"
update restaurants set description = 'Dyröns bastu är en eluppvärmd, bokningsbar bastu på ön Dyrön norr om Marstrand. Den ligger nära öns två badplatser med sandstrand och klippor, alldeles intill gästhamnarna Nord- och Sydhamnen.', updated_at = now() where slug = 'dyrons-bastu' and description is null and hidden_at is null;

-- KÄLLA: https://www.fotohamn.se/om-foto-se-och-gora/ (läst 2026-09-22)
--   "Fotö Bastu är en nybyggd bastu som öppnade"
--   "längst ut på Ussholmen kan du nu basta upp till åtta personer"
--   "Välkommen till FOTÖ gästhamn och ställplats i Göteborgs norra skärgård"
update restaurants set description = 'Fotö Bastu är en nybyggd bastu belägen längst ut på Ussholmen vid Fotö, i Göteborgs norra skärgård. Bastun rymmer upp till åtta personer och ligger vid Fotö gästhamn.', updated_at = now() where slug = 'foto-bastu' and description is null and hidden_at is null;

-- KÄLLA: https://www.ekenashavshotell.se/himmelochhav (läst 2026-09-22)
--   "en restaurang mitt i Kosterhavets marina nationalpark"
--   "Menyn följer säsong och tillgång"
--   "råvaror från hav, skog och trädgård"
update restaurants set description = 'Himmel & Hav är en restaurang på Ekenäs på Sydkoster, belägen i Kosterhavets marina nationalpark. Menyn är à la carte och följer säsongen, med råvaror från hav, skog och trädgård.', updated_at = now() where slug = 'himmel-hav' and description is null and hidden_at is null;

-- KÄLLA: https://www.labellevierestaurang.com/om-oss (läst 2026-09-22)
--   "Vi serverar fisk rätter, surdegspizzor och a la carte"
--   "surdegspizzor och a la carte sedan 2024"
update restaurants set description = 'La Belle Vie i Fjällbacka är en restaurang som serverar fiskrätter, surdegspizzor och à la carte-rätter.', updated_at = now() where slug = 'la-belle-vie-fjallbacka' and description is null and hidden_at is null;

-- KÄLLA: https://marstrands.se/ (läst 2026-09-22)
--   "Frukost, lunch eller kvällar i vår restaurang"
--   "Marstrands Havshotell Varvskajen 2 442 66 Marstrand"
--   "Vid ett bord där vågorna nästan nuddar fötterna"
update restaurants set description = 'Restaurangen på Marstrands Havshotell ligger vid Varvskajen i Marstrand och serverar frukost, lunch och mat på kvällarna. Borden står nära vattnet.', updated_at = now() where slug = 'marstrands-havshotell-bohuslan' and description is null and hidden_at is null;

-- KÄLLA: https://ondas.se/ (läst 2026-09-22)
--   "Här möter latin vibes svenska råvaror i en stilren miljö fylld av grönska, värme och liv"
--   "Kom in för en cocktail, stanna för en middag med vänner eller dela några smårätter över ett glas vin"
--   "Varmrätter
Från kolgrillen

Grillad havskatt"
update restaurants set description = 'Ondas är en restaurang på Smögen med latinamerikansk inspiration, där smakerna kombineras med svenska råvaror. Menyn omfattar kolgrillade rätter och smårätter att dela, samt cocktails, i en miljö med grönska.', updated_at = now() where slug = 'ondas' and description is null and hidden_at is null;

-- KÄLLA: https://www.hamnen4.se/ (läst 2026-09-22)
--   "mitt på Smögenbryggan precis intill Snusfronten"
--   "trähuset från 1800-talet som vi huserar i är ett välkänt landmärke, och har genom åren varit både postkontor och segelmakeri"
--   "Vår meny hämtar inspiration från västkustens lokala råvaror i säsong"
update restaurants set description = 'Restaurang Hamnen 4 ligger mitt på Smögenbryggan, i ett trähus från 1800-talet som tidigare varit postkontor och segelmakeri. Menyn hämtar inspiration från lokala råvaror från västkusten i säsong, med havets delikatesser och klassiska sommarrätter.', updated_at = now() where slug = 'restaurang-hamnen-4' and description is null and hidden_at is null;

-- KÄLLA: https://www.seagram.ax/ (läst 2026-09-22)
--   "Vi är en skärgårdskrog på ön Föglö i Ålands södra skärgård"
--   "Vår restaurang ligger belägen alldeles intill vattnet"
--   "Vi serverar bistro och À la carte, men även våra populära pizzor"
update restaurants set description = 'Restaurang Seagram är en skärgårdskrog på ön Föglö i Ålands södra skärgård, nära färjeläget till fasta Åland. Restaurangen ligger alldeles intill vattnet och serverar bistro, à la carte och pizza.', updated_at = now() where slug = 'restaurang-seagram-aland' and description is null and hidden_at is null;

-- KÄLLA: https://sottungagasthamn.fi/ (läst 2026-09-22)
--   "Vi erbjuder en modern miljö för båtgäster, men också varierad mat- och dryckesutbud i Restaurang Salteriet"
--   "Du kan komma och njuta av läckra rätter på plats eller ta take away"
--   "Restaurang Salteriets meny inkluderar bl.a. de berömda Sottunga Schnizlarna samt lokala fiskdelikatesser och sallader"
update restaurants set description = 'Restaurang Salteriet ligger vid Sottunga Gästhamn och erbjuder ett varierat mat- och dryckesutbud, med möjlighet att äta på plats eller ta take away. Menyn omfattar bland annat Sottunga Schnitzlarna samt lokala fiskdelikatesser och sallader.', updated_at = now() where slug = 'salteriet-aland' and description is null and hidden_at is null;

-- KÄLLA: https://smakbyn.ax/ (läst 2026-09-22)
--   "Här samsas restaurangen (eller krogen som vi kallar den) med vår bod, konferens, vinkällare och torget, där du hittar karamelleriet, bageriet och Mias keramikverkstad"
--   "en matlagningskurs, en rundvandring i vinkällaren, en dryckesprovning"
update restaurants set description = 'Smakbyn i Kastelholm på Åland är en anläggning där restaurangen (krogen) samsas med en bod, vinkällare, konferens och ett torg med karamelleri, bageri och keramikverkstad. Besökare kan även boka matlagningskurser, vinkällarrundvandringar och dryckesprovningar.', updated_at = now() where slug = 'smakbyn-aland' and description is null and hidden_at is null;

-- KÄLLA: https://shfjallbacka.se/ (läst 2026-09-22)
--   "precis vid kajen i den charmiga fiskebyn Fjällbacka"
--   "Våra restauranger serverar läckra rätter med inspiration från havet"
--   "Stora Hotellet bjuder in till en vinkällare utöver det vanliga"
--   "Konferens
Restauranger
Mamsell
Galärbaren
Vinkällare"
update restaurants set description = 'Stora Hotellet Fjällbacka rymmer flera restauranger, bland annat Mamsell och Galärbaren, som serverar mat med inspiration från havet. Hotellet ligger vid kajen i Fjällbacka och har även en vinkällare.', updated_at = now() where slug = 'stora-hotellet-fjallbacka' and description is null and hidden_at is null;

-- KÄLLA: https://www.axmarin.se/Om-oss (läst 2026-09-22)
--   "Axelsson marin startades 1992 av Uno Axelsson och sonen Jerker"
--   "En sjöbensinstation hörde också till verksamheten"
--   "Bensinstationen har blivit en automatstation året runt."
update restaurants set description = 'Ax Marin Bensin i Strömstad drivs av Axelsson Marin, som startades 1992 av Uno Axelsson och sonen Jerker. Till verksamheten hör en sjöbensinstation, som i dag är en automatstation öppen året runt.', updated_at = now() where slug = 'ax-marin-bensin' and description is null and hidden_at is null;

-- KÄLLA: https://strandhotel.se/ (läst 2026-09-22)
--   "precis innanför Visby ringmur endast ett stenkast från havet"
--   "vår egen restaurang, Matsalen, där vi serverar rätter som kombinerar tradition med nytänkande"
--   "på vår Takbar kan du njuta av solnedgången över havet"
update restaurants set description = 'Best Western Strand Hotel ligger i Visby innerstad, precis innanför ringmuren och ett stenkast från havet. I hotellet finns restaurangen Matsalen och Takbaren, som har utsikt över havet.', updated_at = now() where slug = 'best-western-strand-hotel-visby-gotland' and description is null and hidden_at is null;

-- KÄLLA: https://www.bullandokrog.se/ (läst 2026-09-22)
--   "Bullandö krog ligger längst ut på Värmdö, på gränsen mellan inner- och ytterskärgården"
--   "hela vår nedervåning på totalt 250 platser, med både en matsal inomhus och en stor uteservering"
--   "Det går med andra ord alltid att få bord hos oss utan att boka i förväg."
update restaurants set description = 'Bullandö Krog ligger vid Bullandö Marina längst ut på Värmdö, på gränsen mellan inner- och ytterskärgården. Nedervåningen rymmer totalt 250 platser i matsal och på uteservering, och restaurangen tar emot gäster utan bordsbokning.', updated_at = now() where slug = 'bullando-krog' and description is null and hidden_at is null;

-- KÄLLA: https://dyronsvardshus.se/ (läst 2026-09-22)
--   "På Dyröns Värdshus äter du precis vid vattnet, mitt i Bohusläns skärgård."
--   "Här möts lokala råvaror, skärgårdsmiljö och en meny som förändras efter vad Bohuslän har att erbjuda."
--   "Vi erbjuder upp till 12 sjöbodar med plats för upp till 6 personer i varje."
update restaurants set description = 'Dyröns Värdshus ligger vid vattnet på ön Dyrön i Bohusläns skärgård, där maten inspireras av havet och lokala råvaror efter säsong. Gästerna kan även bo i sjöbodar med plats för upp till sex personer i anslutning till värdshuset.', updated_at = now() where slug = 'dyrons-vardshus-bohuslan' and description is null and hidden_at is null;

-- KÄLLA: https://franses.nu/ (läst 2026-09-22)
--   "Mat, musik och möten – mitt i Göteborgs skärgård"
--   "oförglömliga kvällar i vår festvåning med havet som närmsta granne"
--   "Hos oss på öarnas favoritpub är din fyrbenta vän alltid välkommen! Både inne och ute, överallt utom i köket."
update restaurants set description = 'Franses Skärgårdspub ligger på kajen på Hönö i Göteborgs skärgård och kombinerar mat med musik och event, bland annat i en egen festvåning vid havet. Hundar är välkomna både inne och ute, förutom i köket.', updated_at = now() where slug = 'franses-skargardspub' and description is null and hidden_at is null;

-- KÄLLA: https://grebys.se/grebys/om-oss (läst 2026-09-22)
--   "Vi är en familjeägd restaurang och hotell beläget i hjärtat av den pittoreska fiskebyn Grebbestad"
--   "Här serverar vi färsk fisk och skaldjur från lokala vatten."
--   "Restaurangen har en avslappnad atmosfär och utsikt över hamnen."
update restaurants set description = 'Grebys är en familjeägd restaurang och hotell i fiskebyn Grebbestad i Bohuslän. Restaurangen serverar färsk fisk och skaldjur från lokala vatten och har utsikt över hamnen.', updated_at = now() where slug = 'grebys-restaurang' and description is null and hidden_at is null;

-- KÄLLA: https://www.hjalmars.se/ (läst 2026-09-22)
--   "Välkommen till Hjalmars i Hamburgsund,
där havet är vår närmaste granne."
--   "Med en fantastisk utsikt över sundet erbjuder vi en inbjudande atmosfär för både stora och små sällskap."
--   "Här kombinerar vi god mat och vacker omgivning för en upplevelse utöver det vanliga."
update restaurants set description = 'Hjalmars Bar & Brygga ligger vid sundet i Hamburgsund i Bohusläns skärgård, med havet som närmaste granne. Restaurangen erbjuder mat med utsikt över sundet och tar emot både stora och små sällskap.', updated_at = now() where slug = 'hjalmars-bar-brygga' and description is null and hidden_at is null;

-- KÄLLA: https://www.hoteltanum.se/sv (läst 2026-09-22)
--   "Besök Sverige äldsta restaurang från 1600-talet."
--   "Hotellrummen på Hotel Tanums Gestgifveri är renoverade i modernare stil, alla med egna badrum och dusch."
--   "Varje fredag serverar restaurangen vår populära skaldjursbuffé."
update restaurants set description = 'Tanums Gestgifveri i Tanumshede är en restaurang från 1600-talet i en historisk miljö, med bland annat skaldjursbuffé på menyn. Gestgifveriet har även hotellrum med egna badrum, renoverade i modernare stil.', updated_at = now() where slug = 'hotell-tanumshede-gestgifveri-bohuslan' and description is null and hidden_at is null;

-- KÄLLA: https://www.perssonspakajen.se/ (läst 2026-09-22)
--   "Här njuter ni av Bohusläns saltstänkta delikatesser, krispigt fräscht från hav och land i vår närhet"
--   "Solnedgångarna i Hunnebostrand är oslagbara och på vår stora underbara uteservering direkt vid vattnet"
update restaurants set description = 'Perssons på kajen ligger vid hamnen i Hunnebostrand och serverar bohuslänska delikatesser med skaldjur från hav och land i närheten. Restaurangen har en stor uteservering direkt vid vattnet med utsikt över solnedgången.', updated_at = now() where slug = 'perssons-pa-kajen' and description is null and hidden_at is null;

-- KÄLLA: https://restauranghertigen.se/ (läst 2026-09-22)
--   "Hit kommer man för att äta goda klassiska pizzor, lunch eller a la carte tillsammans med nära vänner och familj"
--   "Vår nybyggda uteterrass med 150 sittplatser erbjuder strålande sol hela dagen."
--   "vila i en skön stol med underbar utsikt över Grebbestad hamn och strandpromenaden."
update restaurants set description = 'Restaurang Hertigen ligger i centrala Grebbestad och serverar pizza, lunch och à la carte, även för avhämtning. Uteterrassen rymmer 150 sittplatser med utsikt över Grebbestads hamn och strandpromenaden.', updated_at = now() where slug = 'restaurang-hertigen-grebbestad' and description is null and hidden_at is null;

-- KÄLLA: https://www.storaoset.se/ (läst 2026-09-22)
--   "Restaurang Stora Oset befinner sig mitt i hamnen på ön Hyppeln i Göteborgs skärgård."
--   "Här finns något för alla, god mat, läskande dryck och härlig stämning, allt i en underbar miljö."
update restaurants set description = 'Restaurang Stora Oset ligger mitt i hamnen på ön Hyppeln i Göteborgs skärgård. Restaurangen erbjuder mat och dryck.', updated_at = now() where slug = 'restaurang-stora-oset' and description is null and hidden_at is null;

-- KÄLLA: https://sthansvisby.se/ (läst 2026-09-22)
--   "S:T HANS ÄR DET GENUINA TRÄDGÅRDSCAFÉET MITT I VISBY."
--   "HÄR SERVERAR VI FRUKOST, KAFFE OCH FIKA MED HEMMAGJORDA BAKVERK."
--   "DU HITTAR OSS MITT I STAN INTILL S:T HANS RUIN MED ANOR FRÅN 1200-TALET."
update restaurants set description = 'S:t Hans är ett trädgårdscafé mitt i Visby, intill S:t Hans ruin med anor från 1200-talet. Caféet serverar frukost, kaffe och fika med hemmagjorda bakverk och har även en lunchmeny med rätter efter säsong.', updated_at = now() where slug = 'sankt-hans-cafe-gotland' and description is null and hidden_at is null;

-- KÄLLA: https://smogensolhall.se/ (läst 2026-09-22)
--   "En klassisk bierhall mitt på Smögens Torg."
--   "Bryggd med musselskal & havssalt"
--   "Torrhumlad brown ale bryggd med blåstång"
update restaurants set description = 'Smögens Ölhall är en bierhall mitt på Smögens Torg. Utöver snacks och mellanrätter serveras egna öl, bland annat sorter bryggda med musselskal och havssalt eller torrhumlade med blåstång.', updated_at = now() where slug = 'smogenbryggar-ns-olhall' and description is null and hidden_at is null;

-- KÄLLA: https://storakarlso.se/karlsorestaurangen/ (läst 2026-09-22)
--   "Restaurangen är belägen i Norderhamn, med fantastisk utsikt över viken och närhet till både båten, museet, starten på guideturerna"
--   "Menyn är inspirerad av havet, den svenska sommaren och omtyckta klassiker med allt från stekt sill, gravad lax och handskalade räkor"
--   "För den som önskar finns även vegetariska alternativ med härliga smaker av pesto, rostade frön och burrata."
update restaurants set description = 'Restaurangen på Stora Karlsö ligger i Norderhamn med utsikt över viken, nära båten, museet och start på guideturerna. Menyn bygger på klassiska svenska smaker som stekt sill, gravad lax och handskalade räkor, med vegetariska alternativ som pesto, rostade frön och burrata.', updated_at = now() where slug = 'stora-karlso-restaurang-gotland' and description is null and hidden_at is null;

-- KÄLLA: https://www.tororestaurang.se/ (läst 2026-09-22)
--   "vårt kök blandar de levande smakerna från Medelhavet, saftigt grillat, raffinerade europeiska och autentiska spanska rätter"
--   "vår meny ett brett utbud av alternativ för vegetarianer, veganer och de som söker glutenfria alternativ"
--   "Toro är en restaurang i Strömstad som välkomnar gäster som söker en måltid med tydlig karaktär och omsorg."
update restaurants set description = 'Toro Kolgrill & Tapas Bar ligger i Strömstad nära gränsen till Halden och serverar mat med influenser från Medelhavet, med grillat, tapas och spanska rätter. Menyn erbjuder alternativ för vegetarianer, veganer och glutenfria gäster.', updated_at = now() where slug = 'toro-kolgrill-tapas-bar' and description is null and hidden_at is null;

-- KÄLLA: https://burgsvikskrog.se/ (läst 2026-09-22)
--   "öppet året runt sedan 1970"
--   "Vi kommer att ha en fast meny som alltid går att äta hos oss på kvällar och helger samt lunchmeny på vardagar"
--   "kör vi på livespelningar inomhus i restaurangen"
update restaurants set description = 'Burgsviks Krog är en krog i Burgsvik på Gotland, öppen året runt. Restaurangen har en fast meny som serveras kvällar och helger samt en lunchmeny på vardagar, med mat lagad från grunden. Ibland förekommer livespelningar i lokalen.', updated_at = now() where slug = 'burgsviks-krog-gotland' and description is null and hidden_at is null;

-- KÄLLA: https://www.ekenashavshotell.se/ (läst 2026-09-22)
--   "Längst västerut i Sverige, mitt i Kosterhavets marina nationalpark, ligger Ekenäs Havshotell"
--   "Vår uteservering ligger precis vid havet, med utsikt över horisonten"
--   "erbjuder vi allt från en mustig fisksoppa till en grillad entrcote"
update restaurants set description = 'Ekenäs Havshotell är ett hotell med restaurangen Himmel och Hav, mitt i Kosterhavets marina nationalpark på Sydkoster. Restaurangens uteservering ligger vid havet med utsikt över horisonten, och menyn sträcker sig från fisksoppa till grillad entrecote.', updated_at = now() where slug = 'ekenas-havshotell-koster-bohuslan' and description is null and hidden_at is null;

-- KÄLLA: https://www.frokentrulls.se/om-oss/ (läst 2026-09-22)
--   "Fröken Trulls är ett personligt och lite annorlunda  café, restaurang och utflyktsmål på Orust"
--   "Inomhus kan du välja mellan 5 olika rum att sitta i och vi har även 2 uteserveringar"
--   "Vi tycker mycket om hundar och alla hundar är varmt välkomna att gästa oss i vårt cafe och restaurang"
update restaurants set description = 'Fröken Trulls är ett café och en restaurang på Orust, utanför Ellös i Morlanda by. Lokalerna är inredda med enbart antika möbler, och all mat samt bakverk tillagas på plats. Besökare kan välja mellan flera rum inomhus och två uteserveringar, och hundar är välkomna.', updated_at = now() where slug = 'froken-trulls' and description is null and hidden_at is null;

-- KÄLLA: http://www.hotellgullvivan.com/saaristohotelli-ravintola-gullvivan/ (läst 2026-09-22)
--   "Hotellissa on 31 huonetta. Tarjoamme merinäköalan kaikista huoneista."
--   "Ravintolassa on täydet anniskeluoikeudet ja tilaa 60 hengelle."
--   "- sauna
- oma vierasvenesatama, jossa on tilaa 10 veneelle
- uimaranta, minigolf-rata, grillikota, rantasauna"
update restaurants set description = 'Gullvivan är ett skärgårdshotell och en restaurang i Brändö i den åländska skärgården. Restaurangen har fullständiga serveringsrättigheter och plats för 60 gäster, och alla hotellrum har havsutsikt. Anläggningen har även en egen gästhamn för båtar samt bastu och badstrand.', updated_at = now() where slug = 'gullvivan-aland' and description is null and hidden_at is null;

-- KÄLLA: http://www.honopizzeria.se/ (läst 2026-09-22)
--   "PIZZOR MED SKALDJUR

32.MARINARA

Räkor, Musslor"
--   "PIZZOR MED KYCKLING

36.VICTOR SPECIAL

Kyckling, Champinjoner, Lök, Vitlök, Curry"
--   "PIZZOR MED KEBAB

40.KEBAB PIZZA

Kebabkött, Valfri Sås"
--   "VEGETARISK PIZZOR

25.VEGETARIANA

Champinjoner, Paprika, Lök, Kronärtskocka, Oliver"
--   "INBAKAD PIZZOR

27.CALZONE

Skinka"
update restaurants set description = 'Hönö Pizzeria erbjuder ett brett urval pizzor, bland annat med skaldjur, kyckling och kebab. Sortimentet omfattar även vegetariska pizzor och inbakade pizzor som calzone.', updated_at = now() where slug = 'hono-pizzeria' and description is null and hidden_at is null;

-- KÄLLA: https://hunnebo-kallbad.bokamera.se/ (läst 2026-09-22)
--   "Välkommen till nybyggda Hunnebostrands kallbadhus"
--   "Utanför bastun erbjuds havsbad med egen brygga"
--   "Du finner bastun vid Hunnebostrands hopptorn vid Hästedalen som också erbjuder gratis parkeringsplatser året runt"
update restaurants set description = 'Hunnebostrands Kallbadhus är en nybyggd bastu- och kallbadhusanläggning i Hunnebostrand. Utanför bastun finns möjlighet till havsbad från en egen brygga, och anläggningen ligger vid Hunnebostrands hopptorn med gratis parkering året runt.', updated_at = now() where slug = 'hunnebostrands-kallbadhus' and description is null and hidden_at is null;

-- KÄLLA: https://www.klapphagen.se/ (läst 2026-09-22)
--   "Boutique Hotel - Glamping - Restaurang - Bar - Gårdsbutik - Bryggeri"
--   "I restaurangen är det eld i alla former som är i fokus, det brinner i våra grillar, i vedugnen och framförallt i våra hjärtan"
--   "Närmsta brygga Ekenäs ligger 800m från oss"
update restaurants set description = 'Kläpphagen är ett boutiquehotell med restaurang, bar, gårdsbutik och eget bryggeri på Sydkoster. Restaurangen fokuserar på matlagning över eld, i grillar och vedugn. Anläggningen erbjuder även glamping, och närmaste brygga ligger 800 meter bort.', updated_at = now() where slug = 'klapphagen-koster-bohuslan' and description is null and hidden_at is null;

-- KÄLLA: https://honobastu.se/ (läst 2026-09-22)
--   "Ett stenkast från Hönö Klåva i Göteborgs norra skärgård"
--   "Har ni egen båt går det utmärkt att lägga till vid vår egna brygga. Annars ordnar vi med transporten vid ert besök."
--   "I vår fantastiska bastu har vi både ett elektriskt aggregat för att kunna förvärma bastun inför er ankomst men även ett vedeldat för maximal värme"
--   "I vår nybyggda sjöbod har vi skapat en gammaldags atmosfär"
update restaurants set description = 'Långholmens bastubad & Marina Möten är en bastuanläggning och festlokal på ön Långholmen i Göteborgs norra skärgård, nära Hönö Klåva. Den som har egen båt kan lägga till vid anläggningens egen brygga, annars ordnas transport. Bastun har både ett elektriskt och ett vedeldat aggregat, i en sjöbod med gammaldags atmosfär.', updated_at = now() where slug = 'langholmens-bastubad-marina-moten' and description is null and hidden_at is null;

-- KÄLLA: https://www.matjespaknippla.se/om-oss (läst 2026-09-22)
--   "Krog i Skandinavisk stil, där råvaror från havet självklart står i centrum, även smaker från hela världen besöker menyn"
--   "Vi vill skapa en avslappnad mötesplats belägen precis vid vattnet"
--   "CATERING
SPIKEN BAR & BRYGGA
HITTA HIT"
update restaurants set description = 'Matjes på Knippla är en krog i skandinavisk stil på Källö-Knippla, med fokus på råvaror från havet och inslag av smaker från hela världen. Restaurangen är belägen precis vid vattnet och har även en egen bar och brygga, Spiken Bar & Brygga.', updated_at = now() where slug = 'matjes-pa-knippla' and description is null and hidden_at is null;

-- KÄLLA: https://www.pipershuset.se/ (läst 2026-09-22)
--   "Pipers är ett familjeföretag sedan 2012 och ligger mitt i centrala Hamburgsund"
--   "Passa på att njuta av vårt stora utbud av bröd, frallor, bullar, bakelser och matiga mackor"
--   "På vårt glasscafé hittar du självklart vår egen Pipersglace och Engelholmsglass"
--   "Har ni hittat bak till vår mysiga innergård? Där kan ni sitta och njuta av lugnet"
update restaurants set description = 'Pipershuset är ett bageri och glasscafé centralt i Hamburgsund, drivet som familjeföretag. Utbudet omfattar färskt bröd, bullar, bakverk och mackor samt egen glass, Pipersglace, i flera smaker. Besökare kan även sitta i en innergård vid caféet.', updated_at = now() where slug = 'pipershuset' and description is null and hidden_at is null;

-- KÄLLA: https://www.kumlingestugor.com/ (läst 2026-09-22)
--   "Till kvällskvisten kan du boka ett bord på Restaurang Kastören som ligger på området"
--   "God mat i vacker skärgårdsmiljö med allt vad det innebär. Njut av utsikten invid gästhamnen under ditt restaurangbesök"
--   "Kumlinge Gästhamn

Välkommen till vår gästhamn! Ta iland och fortsätt din vistelse med ett restaurangbesök eller övernattning i en av våra stugor"
update restaurants set description = 'Restaurang Kastören ligger på Kumlinge i den åländska skärgården, på samma område som Kumlinge Stugor. Restaurangen erbjuder mat i skärgårdsmiljö med utsikt över gästhamnen.', updated_at = now() where slug = 'restaurang-kastoren-aland' and description is null and hidden_at is null;

-- KÄLLA: https://www.telegrafen.info/om-oss/ (läst 2026-09-22)
--   "Inredningen är enkel men personlig. Den består till stor del av krögarens egna konstverk, prylar som samlats ihop under livet"
--   "Då och då rensas väggar och lokal för samtida konstprojekt med lokala såväl som nationella konstnärer"
--   "Maten är som inredningen, okonstlad men unik. Vi försöker jobba så mycket som möjligt med lokala och ekologiska råvaror"
--   "Det gäller även vinet som produceras av småbönder som jobbar traditionellt och hantverksmässigt"
update restaurants set description = 'Restaurang Telegrafen finns i den gamla telegrafstationen i Grebbestad i Norra Bohuslän. Inredningen är personlig med krögarens egna konstverk och föremål, och lokalen används även för konstprojekt med lokala och nationella konstnärer. Maten beskrivs som okonstlad, med fokus på lokala och ekologiska råvaror, och vinerna kommer från småskaliga producenter.', updated_at = now() where slug = 'restaurang-telegrafen' and description is null and hidden_at is null;

-- KÄLLA: https://sjogrensibacken.se/ (läst 2026-09-22)
--   "🥖 Stenugnsbakat bröd & fikaklassiker
☕ Kaffe med omtanke"
--   "🥗 Säsongsbaserad mat lagad från grunden"
--   "Du hittar oss på Nedre Långgatan 34 i Grebbestad, i ett charmigt, varsamt renoverat hus. Här låg tidigare en tandläkarmottagning"
--   "Bröd & bakverk
Tårtor
Catering"
update restaurants set description = 'Sjögrens i backen är ett café i Grebbestad med stenugnsbakat bröd, fikaklassiker och säsongsbaserad mat lagad från grunden. Verksamheten erbjuder även tårtor och catering, och lokalerna finns i ett renoverat hus som tidigare var en tandläkarmottagning.', updated_at = now() where slug = 'sjogrens-i-backen' and description is null and hidden_at is null;

-- KÄLLA: https://smogensgastgiveri.se/ (läst 2026-09-22)
--   "Vi börjar med Snake River Farms Wagyu Gold MBS 8-10, och när det här köttet landar på The Green Egg händer något magiskt"
--   "Vår Tomahawk Iberico Bellota kommer in som en kung, ben och allt, örtmarinerad med olivolja, citron, rosmarin och vitlök"
--   "Tre generationer. Somrarna i Bohuslän, människorna, havet  och de kala klipporna"
--   "Vi tar drinkarna lika seriöst som köttet"
update restaurants set description = 'Smögens Gästgiveri är en restaurang vid havet på Smögen, driven i tre generationer, med fokus på Wagyu-nötkött och andra köttråvaror som Iberico Bellota-gris. Maten tillagas på grillen The Green Egg, och restaurangen serverar även drinkar.', updated_at = now() where slug = 'smogens-gastgiveri' and description is null and hidden_at is null;

-- KÄLLA: https://www.restaurangstorm.se/17/5/om-oss/ (läst 2026-09-22)
--   "Storm ligger precis vid vattnet längs hamnpromenaden i Grebbestad"
--   "Här serveras något för alla, allt från enklare rätter som hamburgare eller fish & chips, till goda fisk-, veg- eller kötträtter"
--   "Missa inte heller vår soliga uteservering med härlig utsikt över hamninloppet"
--   "Vår biograf är modernt utrustad och här kan du se de senaste filmerna medans du mumsar på nypoppade popcorn"
update restaurants set description = 'Storm Restaurang & Biograf ligger vid vattnet längs hamnpromenaden i Grebbestad och kombinerar restaurang, biograf, sportbar och shuffleboard. Köket lagar mat från grunden med svenska, lokala råvaror, från hamburgare och fish & chips till fisk-, veg- och kötträtter. Uteserveringen har utsikt över hamninloppet.', updated_at = now() where slug = 'storm-restaurang-biograf' and description is null and hidden_at is null;

-- KÄLLA: https://tangbaren.se/ (läst 2026-09-22)
--   "Belägen på en brygga över havet kan du njuta av utsikten över skärgården och lyssna på havet som kluckar under dina fötter"
--   "Hos oss varvar vi klassiska rätter såsom gratinerade kräftor och lågtempererad torskrygg med spännande smaker från världens alla hörn"
--   "Flera gånger i veckan lägger fiskebåtar till vid vår brygga för att leverera nyfiskade kräftor och andra läckerheter från havet"
--   "erbjuder vi också en  skaldjur- och ostronbar kan du slappna av med något kallt att dricka"
update restaurants set description = 'Tångbaren är en fisk- och skaldjursrestaurang på en brygga över havet vid Donsö, med utsikt över skärgården. Menyn blandar klassiska rätter som gratinerade kräftor med internationella smaker, och fiskebåtar levererar färska skaldjur direkt till bryggan flera gånger i veckan.', updated_at = now() where slug = 'tangbaren' and description is null and hidden_at is null;

-- KÄLLA: https://www.tullhuset.se/ (läst 2026-09-22)
--   "har vi, Preben och Sofie Pedersen, drivit Tullhuset som en renodlad fisk- och skaldjursrestaurang i Göteborgs skärgård under 23 år"
--   "Utöver á la carte servering erbjuder vi luncherbjudande varje vardag i form av Skärgårdslunch"
--   "Fisk- och skaldjursrestaurang i Göteborgs skärgård"
update restaurants set description = 'Tullhuset är en fisk- och skaldjursrestaurang på Hönö Klåva i Göteborgs skärgård, driven av Preben och Sofie Pedersen. Restaurangen serverar á la carte samt en skärgårdslunch varje vardag, med ett rent fokus på fisk och skaldjur.', updated_at = now() where slug = 'tullhuset-restaurang-hono' and description is null and hidden_at is null;

-- KÄLLA: https://www.bakfickanvisby.se/ (läst 2026-09-22)
--   "Vi är den lilla restaurangen med den stora kärleken till havet, fisken och skaldjuren."
--   "I över trettio år är det hit man går för att få stekt strömming eller fisksoppa."
--   "Här har ni även möjlighet att köpa havets läckerheter och andra delikatesser över disk."
update restaurants set description = 'Bakfickan är en fiskrestaurang vid Stora Torget i centrala Visby. Restaurangen har i över trettio år serverat stekt strömming och fisksoppa, med rätter som varieras efter säsong och lokala råvaror. I restaurangen går det även att köpa skaldjur och andra delikatesser över disk.', updated_at = now() where slug = 'bakfickan-gotland' and description is null and hidden_at is null;

-- KÄLLA: https://www.bjorholmensmarina.se/ (läst 2026-09-22)
--   "Björholmen på västkusten – vid hav och skärgård."
--   "Njut av havsnära hotellrum, vedeldad bastu och mat med lokala smaker."
--   "Här skapar vi minnesvärda upplevelser för bröllop, fest, konferens och weekend."
update restaurants set description = 'Björholmen är ett hotell och en restaurang vid havet i Bohuslän, i Klövedal på Tjörn. Verksamheten erbjuder havsnära hotellrum, vedeldad bastu och mat med lokala smaker, och riktar sig bland annat till bröllop, fest och konferens.', updated_at = now() where slug = 'bjorholmen-bohuslan' and description is null and hidden_at is null;

-- KÄLLA: https://eksgarden.com/om-oss/ (läst 2026-09-22)
--   "Eksgården är en av öns äldre gårdsmiljöer med byggnader som har anor ända tillbaka till 1600-talet."
--   "ett gårdshotell med restaurang och hantverksbageri där den historiska miljön står i centrum för upplevelsen"
--   "äter mat med rötter i det öländska landskapet och möts av en stillsam atmosfär som inbjuder till återhämtning"
update restaurants set description = 'Eksgården är ett gårdshotell med restaurang och bageri i byn Gårdby på östra Öland, i en gårdsmiljö med byggnader som går tillbaka till 1600-talet. Maten har rötter i det öländska landskapet.', updated_at = now() where slug = 'eksgarden-gardshotell-oland' and description is null and hidden_at is null;

-- KÄLLA: https://fyrenkungshamn.se/#omkoket (läst 2026-09-22)
--   "Restaurang Fyren ligger precis vid havet med uteservering och god mat & dryck."
--   "Slå dig ner på vår uteservering med utsikt över småbåtshamnen"
--   "Vi har även pizza för avhämtning!"
update restaurants set description = 'Fyren är en restaurang längst in i hamnen i Kungshamn, vid havet. Restaurangen har uteservering med utsikt över småbåtshamnen och serverar mat och dryck, med möjlighet att äta inne eller ute samt beställa pizza för avhämtning.', updated_at = now() where slug = 'fyren' and description is null and hidden_at is null;

-- KÄLLA: https://www.halltorp.se/om-oss2/ (läst 2026-09-22)
--   "Byggnaden vid Halltorp har funnits länge, men Halltorps Gästgiveri i sin nuvarande form tog sin början 1975."
--   "Idag är Halltorps Gästgiveri ett hotell och en restaurang med personlig prägel."
--   "Naturreservatet Halltorps Hage och VIDA konstmuseum finns precis intill, och med vårt centrala läge på Öland har du hela ön inom räckhåll."
update restaurants set description = 'Halltorps Gästgiveri är ett hotell och en restaurang mitt på Öland, i nuvarande form sedan 1975. Naturreservatet Halltorps Hage och VIDA konstmuseum ligger precis intill anläggningen, som har ett centralt läge på ön.', updated_at = now() where slug = 'halltorps-gastgiveri-oland' and description is null and hidden_at is null;

-- KÄLLA: https://www.hotelskansen.com/om-oss/ (läst 2026-09-22)
--   "Hotel Skansen ligger centralt i Färjestaden med en grönskande park och i anslutning till parken ligger uteserveringen och poolen"
--   "Hos oss finns också ett underbart spa där välutbildade terapeuter skämmer bort gästerna."
--   "Färjestadens hamn med restauranger, uteserveringar och färja till Kalmar på kort gångavstånd, och till Ölands djurpark är det bara några kilometer från hotellet."
update restaurants set description = 'Hotel Skansen ligger centralt i Färjestaden på Öland, med en park, uteservering och pool i anslutning till hotellet samt ett spa med utbildade terapeuter. Färjestadens hamn med restauranger och färjan till Kalmar ligger på kort gångavstånd, och Ölands djurpark finns några kilometer bort.', updated_at = now() where slug = 'hotel-skansen-oland-oland' and description is null and hidden_at is null;

-- KÄLLA: https://www.indigo.ax/om-indigo (läst 2026-09-22)
--   "Indigo Restaurang & Bar öppnades av krögarparet Stig Grönlund och Björn Ekstrand våren 2004."
--   "Stigs nya kollega sedan dess är den välkände ålandsprofilen Dennis Jansson."
--   "Vårt kök har rötterna i den skandinaviska matlagningen."
--   "Vi värnar om de åländska traditionerna och handlar helst närodlat och lokalt."
update restaurants set description = 'Indigo Restaurang & Bar i Mariehamn öppnades 2004 och drivs i dag av Stig Grönlund tillsammans med Dennis Jansson. Köket har sina rötter i den skandinaviska matlagningen, och restaurangen handlar helst närodlat och lokalt från åländska producenter.', updated_at = now() where slug = 'indigo-restaurant-och-bar-aland' and description is null and hidden_at is null;

-- KÄLLA: https://klobbars.ax/ (läst 2026-09-22)
--   "En lugn plats i Ålands skärgård med vacker utsikt över det åländska havet."
--   "Här bor du i ett naturskönt och fridfullt läge med havsutsikt"
--   "Du har dessutom nära till badbrygga och bastu, och i området finns minigolfbana samt en naturstig för promenader."
update restaurants set description = 'Klobbars Gästhem och Stugor ligger i Ålands skärgård på Kökar, med utsikt över havet. Boendet består av en stuga för självhushåll, flera stockstugor och rum i ett gästhem, och det finns nära till badbrygga, bastu och minigolfbana.', updated_at = now() where slug = 'klobbars-gasthem-och-stugor-aland' and description is null and hidden_at is null;

-- KÄLLA: https://macri.se/ (läst 2026-09-22)
--   "MAT , DRYCK & MUSIK
AFTERWORK, RÄKFROSSA, BISTRO, A LA CARTE"
--   "Vare sig du vill ha från havet eller land så har vi
en bra och bred meny. Allt finns som takeaway
dessutom."
update restaurants set description = 'Restaurang Macri ligger vid Grebbestadbryggan i Grebbestad och kombinerar mat, dryck och musik, med bland annat afterwork, räkfrossa, bistro och à la carte. Menyn har rätter både från havet och från land, och det går även att beställa takeaway.', updated_at = now() where slug = 'restaurang-macri' and description is null and hidden_at is null;

-- KÄLLA: https://jonassmaker.se/tg26/ (läst 2026-09-22)
--   "Sök Er till det sista huset på Trädgårdsgatan, i korsningen med Badhusgatan så möter Ni ett av Borgholms äldst bevarade hus."
--   "Krögaren Jonas Åhman skapar rätter med råvaror både från ön och längre bort"
--   "mat, dryck och service i den lilla kvarterskrogen."
update restaurants set description = 'Trädgårdsgatan 26 är en liten kvarterskrog i ett av Borgholms äldst bevarade hus, i hörnet av Trädgårdsgatan och Badhusgatan på Öland. Krögaren Jonas Åhman lagar mat med råvaror både från ön och längre bort, med fokus på mat, dryck och service.', updated_at = now() where slug = 'restaurang-tradgardsgatan-26-oland' and description is null and hidden_at is null;

-- KÄLLA: https://www.hunnebosjomack.se/ (läst 2026-09-22)
--   "Hos oss tankar du bensin och diesel hela året, dieseln är marin-diesel och därmed RME-fri."
--   "Här kan du köpa kaffe, kioskvaror och glass."
--   "Vi säljer även fisketillbehör, strandleksaker, gasol, diverse båttillbehör och båtmotoroljor."
--   "med möjlighet att köpa tillbehör, glass och kaffe eller hyra båt, kajak, SUP (Stand up paddle boarding) och vattenskoter."
update restaurants set description = 'Sjömacken Hunnebostrand är en bränslemack i gästhamnen i Hunnebostrand, där båtar kan tanka bensin och RME-fri marindiesel året runt. I servicebutiken går det att köpa kaffe, glass, kioskvaror, fisketillbehör, strandleksaker, gasol och båttillbehör, och det går även att hyra båt, kajak, SUP och vattenskoter.', updated_at = now() where slug = 'sjomacken-hunnebostrand' and description is null and hidden_at is null;

-- KÄLLA: https://www.smogenshafvsbad.se/hotell/historia/ (läst 2026-09-22)
--   "Smögens Hafvsbad invigdes år 1900 och blev därmed Bohusläns sista kuranstalt."
--   "består av 76 hotellrum fördelade på två hotellbyggnader, spaavdelning med stort utbud av behandlingar, pooler och bastur samt en stor konferensanläggning"
--   "Vintertid i Makrillviken ligger vår havsbastu med tillhörande brygga."
update restaurants set description = 'Smögens Hafvsbad är ett hotell på ön Smögen som invigdes 1900 som Bohusläns sista kuranstalt. Anläggningen omfattar i dag 76 hotellrum fördelade på två byggnader, en spaavdelning med pooler och bastur samt en restaurang och konferensdel. Vid Makrillviken finns en havsbastu med tillhörande brygga för kallbad.', updated_at = now() where slug = 'smogens-hafvshotell' and description is null and hidden_at is null;

-- KÄLLA: https://strandoland.se/ (läst 2026-09-22)
--   "110 stilfulla rum för avkoppling, komfort och en vistelse att längta tillbaka till."
--   "Smaker att samlas kring – från långa frukostar till middagar och drinkar i god stämning."
--   "väntar varma pooler inne och ute, bastu med utsikt, fotbad, loungeytor och poolbar."
update restaurants set description = 'Strand Öland är ett hotell i Borgholm med restaurangen Dockside, som serverar frukost, middagar och drinkar. Hotellet har 110 rum och en spaavdelning, The Treat, med pooler inne och ute, bastu, fotbad och poolbar.', updated_at = now() where slug = 'strand-hotell-oland' and description is null and hidden_at is null;

-- KÄLLA: https://havsbadet.se/ (läst 2026-09-22)
--   "En restaurang, uteservering och nattklubb precis vid vattnet."
--   "Säsongens råvaror, havsnära läge och en avslappnad restaurangkänsla."
--   "Live, DJ:s och dansgolv när kvällen växlar upp."
update restaurants set description = 'TASTE på Havsbadet i Lysekil är en restaurang med uteservering precis vid vattnet, som på kvällarna blir nattklubb med musik och dans. Maten bygger på säsongens råvaror.', updated_at = now() where slug = 'taste' and description is null and hidden_at is null;

-- KÄLLA: https://restaurangvatten.se/ (läst 2026-09-22)
--   "Vatten Restaurang & Kafé är en pärla belägen i den vackra hamnen i Skärhamn på Tjörn."
--   "Vatten Restaurang & Kafé, belägen strax intill Nordiska Akvarellmuseet, satsar på enkel och ärlig mat."
--   "Med havet som närmsta granne präglas menyn förstås av fisk och skaldjur, men där finns även alternativ för den som föredrar kött eller vegetariskt"
update restaurants set description = 'Vatten Restaurang & Kafé ligger i hamnen i Skärhamn på Tjörn, intill Nordiska Akvarellmuseet, med utsikt över havet. Restaurangen har fisk och skaldjur i fokus men även kött och vegetariska alternativ, samt ett kafé.', updated_at = now() where slug = 'vatten-restaurang-kaf' and description is null and hidden_at is null;
