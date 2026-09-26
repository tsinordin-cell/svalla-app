-- 2026-09-26: 90 platstexter från den första importen (2026-04) som saknade källa.
-- Varför nu: ösidornas undersidor (/o/[ö]/bad, /restauranger, /hamnar, /boende, /med-barn)
-- börjar lista platser ur platsdatabasen. Då skulle de här texterna synas på sidor med mycket
-- trafik. Varje text är omskriven från verksamhetens egen sida (läst 2026-09-26) eller tömd.
-- Tomt fält hellre än påhittat. Inget raderas: dolda rader får hidden_at + hidden_reason.
--
-- Fel som hittades utöver värdeorden:
--   old-smokehouse låg på Fjäderholmarna men ligger i Lännersta, Nacka (egen sida + OSM).
--   restaurang-horsfjarden låg på Muskö men ligger på Torget 3 i Årsta Havsbad (egen sida + OSM).
--   fredriksborg-hotell låg mitt i Vaxholm men ligger vid Oxdjupet på Värmdösidan (egen sida + OSM).
--   motorverkstan-bistro-bar angavs som "bryggeri" i Stavsnäs; adressen är Djurö Gårdsväg 23, Djurö.
--   byssan/knapen hade webbplats och telefon till en pizzeria på Gotland och en släpvagnsfirma i
--     Nederländerna; texten var OSM:s engelska beskrivning.
--   Sju "Boka direkt via stfturiststation.se/galohavshotell.se/…" pekade på domäner som inte är
--     verksamhetens.
--   gallno-bar, klintan, landsort-hamncafe, lysekil-gasthamn: dubbletter (samma webbplats/telefon).
--   uto-gasthamn-sjomack: Utö gästhamns sida nämner ingen sjömack; Utö Sjömack står på brygganscafe.se.
--
-- KÄLLOR (lästa 2026-09-26, sidtext sparad vid granskningen):
--   arholmahandel.se: "åretruntöppen butik", "bensin, diesel, gasol", "Källarstugan. Här finns upp till
--     fyra sängplatser", "Under maj-september, samt under höstlovsveckan", "Arholma Norra byväg 1", "072 999 05 55"
--   arholmanord.se: "havsvik i Stockholms skärgård med boende, restaurang och aktiviteter", "Riddarviksvägen 40",
--     "Vi ses på midsommarafton 2027 då vi öppnar igen", "öppet för grupper, konferenser och bröllop",
--     "Upptäck Finnhamn, Lidö och Arholma med STFs Öluff-paket", "0176-56040"
--   stromma.com glamping-pa-birka-vikingastaden: "fem tält för övernattning för 2 till 4 personer",
--     "Frukosten … serveras i en korg till ert tält", "2-rätters middag restaurang Särimner",
--     "Guidad tur i fornlämningsområdet", "Entré till museet", "ÅTER JUNI 2027"
--   bockholmen.com: "sekelskiftesvilla", "med båt, bil eller cykel", "skandinavisk mat … Medelhav",
--     "På helgerna serverar vi vår brunch", Kärleksbaren "utsikt över Stocksund, Norra Djurgården och Lidingö", "BBQ-buffé"
--   brygganscafe.se: "Servering mitt bland gästande båtar", "LÄTTARE RÄTTER", "ÖL & VIN I BAREN",
--     "UTÖ SJÖMACK Tanka dygnet runt Mopeduthyrning"
--   smadalarogard.se: "Smådalarö Gård Hotell & Spa", "Konferera i någon av våra 10 lokaler",
--     "Brasserie & Bränneri", "Vinbaren", "Deli", "Bloms Bar", "året-runt-destination"
--   fejan.com: "GÄSTHAMN", "FEST & KONFERENS", "Nu har vi stängt för sommaren. Välkomna igen nästa år!",
--     "Vi är en cash-free restaurang."
--   finnhamn.se/boende: "i början av 1900-talet", "renoverades mellan åren 2014-2017 och består av 12 rum,
--     2-5 bäddar, två matsalar med kök och en gillestuga", "två och trebäddsstugor", "eller varför inte tält",
--     "I reservatet är det eldningsförbud året runt"
--   grinda.se/mat-fest/framfickan: "lite enklare snitt", "fullständiga rättigheter", "Grinda bageri, med
--     försäljning direkt från bageriet på morgonen", "Take Away Pizza från vår Hamnkrog Framfickan",
--     "Framfickan har endast drop-in. Ej möjligt att boka bord."
--   grinda.se/mat-fest/lanthandel-cafe: "Nedanför Grinda Wärdshus", "frukost och enklare luncher bestående
--     av olika sallader, fyllda baguetter, pannkakor och korv", "nybakat bröd … varje dag under högsäsong,
--     fr o m Midsommarveckan", "minst tre dagar innan ankomst", "HYGIENARTIKLAR"
--   grinda.se/hamn-mack/sjomack: "i direkt anslutning till vår gästhamn", "Bensin 98, Diesel, Gasol",
--     "kioskvaror hittar du i vårt Aktivitetshus", "öppen året om … kortautomat", "stängd mellan 22.00 – 05.00"
--   galohavsbad.se och /ata/: "Stugor Camping Glamping", "Hyr kajaker, kanoter, trampbåtar, SUP",
--     "Gålös naturreservat", "Bastu", "Skälåkersvägen 11"; bistron: "matbit, fika, smarriga smörgåsar",
--     "alltid fisk, kött, vegetariskt, laktos -och glutenfria alternativ", "äventyrsgolf", "Minilivs"
--   gallno.se: "sommaröppna krog", "Vi tar ej bordsbokningar", "Bar (ej bordsbokning): 0739 38 45 62"
--   hogmarsohandel.se: "ICA Högmarsö med Cafe och Högmarsö Sjömack (kortautomat året om)",
--     "bensin och diesel", "bemannad samma tider som Affären", "0176-830 40"
--   ingarohavscamping.se: "Gamla Ingarövägen 12", "säsongscamping och båtplatser", "korttidscamping, glamping och stugor"
--   ingmarsobnb.se: "Norrgården. En gård från mitten av 1800-talet", "Stockholm Archipelago Trail så går den
--     mitt emellan husen"; ingmarsokrog.com: "Sju unika rum", "Knappt 1 km från Ingmarsö Krog"
--   ingmarsokrog.com: "ett stenkast från södra ångbåtsbryggan", "ca 200 meter öster om Ingmarsö Krog och har
--     30 gästplatser", "fyra bojplatser för båtar mellan 2000 – 6500 kg", "Vid senare bordsbokningar
--     (fr kl 19.30) finns möjlighet att övernatta"
--   coop.se/butiker-erbjudanden/coop/coop-ingmarso: "Coop Ingmarsö"
--   mojavardshusochbageri.se: "Möja bageris historia tar sin början 1951", "natthamnen i Kyrkviken",
--     "tog över verksamheten 2019 … större matsal … ny bageriutrustning", "Möja Värdshus & Bageri", "BOKA RUM"
--   mojavandrarhem.se: "litet familjedrivet vandrarhem", "rum med två eller fyra bäddar", "självhushåll",
--     "öppet från april till december", "hyra cykel av oss", "MÖJA OUTDOOR … kajak, SUP, roddbåt och
--     vattenskoter", "huvudbyn Berg på södra Möja", "Coop (300m)", "ingår i Svenska Turistföreningen (STF)"
--   motorverkstan.se: "Djurö Gårdsväg 23 Djurö", "öppet varje dag från midsommardagen fram till skolstart",
--     "Vi har två bryggor", "skärgårdsbröllop till företagsevent"
--   nattaro.se: "Nåttarö Gård & Resort AB", "50 stycken semesterstugor", "Vandrarhemmet", "GÄSTHAMN",
--     "30 minuter med båt från Nynäshamn", "trerätters på Krogen eller pizza på Sixtens bodega"
--   theoldsmokehouse.se: "vedeldade BBQ restaurang med utsikt över Lännerstasundet i Nacka",
--     "Smedsuddsvägen 1, Lännersta", "egen brygga med ca 10 båtplatser på boj", "Vår foodtruck är öppen
--     helger och soliga dagar", "Bexanders Rökeri"; OSM/Nominatim: 59.29996, 18.25807
--   restauranghorsfjarden.se: "Torget 3, 137 97 Årsta Havsbad", pizza-, pasta-, fisk-, kött- och barnmeny;
--     OSM/Nominatim "Restaurang Horsfjärden": 59.08322, 18.16536
--   stavsnaskrog.se: "Stavsnäs Vinterhamn, Stavsnäsvägen 222", "KAJ & KROG … terrass vid kajkanten",
--     "BAKGÅRD & PIZZA med napolitanska pizzor, deli och innergård", "Under sommarsäsongen erbjuder vi lunch
--     och middag", "Våren 2025 tog Carin Stenbeck över"
--   idoborg.se/restaurang-strandbaren: "sandstrand intill Strandbaren", "vedeldade bastu", "Hyr kajaker",
--     "På Idöborgs östra sida … gästhamn med plats för ca 50 båtar", "Har ni bordsbokning i restaurangen &
--     båten är kortare än 10 m är ni garanterade plats", "Waxholmsbolaget linje 17", "Stavsnäs"
--   svangenrunmaro.se: "SÖDERSUNDA 421 13038 RUNMARÖ", "Tiki bar", "trädgård", "lekplats och glasskiosk",
--     "live musik, quiz kvällar, stand up komiker", "BOKA BORD KVÄLL: 0734-439284", "Inga bokningar på lunch"
--   svartsonorra.se: "Svartsö Skärgårdshotell & Vandrarhem Svartsö By", "56 bäddar", "Öppet året runt",
--     "100 meter från närmaste badstrand", "Cykeluthyrning", "Egna gästbåtsplatser ca 600 m från hotellet",
--     "stolt medlem i STF", "Waxholmsbolaget tar er från stockholm till Norra Svartsö brygga"
--   utogasthamn.se/camping: "vy över södra hamnen och Mysingen", "4 grillplatser", "egen sandstrand",
--     "servicestuga med toaletter, duschar och ett enklare kök", "friluftsmodell och har inga numrerade
--     platser", "Skolklasser och större grupper behöver däremot förhandsboka", "betalar i Hamnboden"
--   utovardshus.se: "80 rum & hotellstugor (200 bäddar)", "12 mötesrum", Restaurang: Utö Värdshus,
--     Seglarbaren, Bakfickan; /boende/vandrarhemmet: "I backen upp mot Utö Värdshus", "april-oktober",
--     "73 bäddar", "gemensamt kök för självhushåll", "Grosshandlare Levins ursprungliga badhotell",
--     "Husdjur är tyvärr inte tillåtet", "In- och utcheckning sker i receptionen uppe på Utö Värdshus"
--   visitskargarden.se bakfickan (samma källa som island-data.ts): bar/nattklubb vid Utö Värdshus
--   sandshotell.se: "15 dubbelrum, 3 enkelrum så totalt 33 bäddar, relaxavdelning med bastu, uterum och
--     terrasser med utsikt över hamninloppet", "lägenheter och rum", "konferens- och weekend-hotell"
--   vaddohavsbad.se: "Väddö Havsbad & Camping", "vid Ålands hav", "Stugby", "Sandstranden breder ut sig
--     300 meter på campingens område"
--   vaxholmsbedandbreakfast.se: "Drottninggatan 7", "två gästlägenheter", "veckovis … från juni till
--     september", "Bakworkshops", "Båtturer", "Vandringar"; OSM/Nominatim: 59.40226, 18.34272
--   waxholmscamping.com: "Eriksövägen 44", "Stugor, camping, tält & glamping 1 maj–30 september",
--     "parkera din husbil året runt på våra ställplatser", "padel, yoga, och sup … minigolf, boule",
--     "KONTANTFRI ANLÄGGNING"
--   waxholmshotell.se: "Hamngatan 2", "sedan 1902", "Verandan", "Nyckelbaren", "Konferensvåningen",
--     "ingen hiss till våning 3"
--   winbergs.se: "PÅ KAJEN I VAXHOLM", "GRUNDAD 1961", "SOMMARKROG", "GRILLEN", "SMASHBURGARE ELLER
--     BAGUETTE", "WAXHOLMSKORV", "VÄDERBEROENDE"
--   restaurangvarvet.se: "Högmarsövägen 83", "startades 2017 och drivs av Tomas och Klara Diederichsen",
--     "Ibland bakar vi pizza, på onsdagar stjälper vi ostron", "fest med liveband eller DJ",
--     "Högmarsö färja är en betalfärja", "stängt för säsongen. Vi ses igen sommaren 2027"
--   landsortsstuguthyrning.se: "Familjen Sjöblom har bott på denna Stockholms Skärgårds sydligaste utpost
--     i sex generationer"
--   landsortsvandrarhem.se: "nedanför Landsorts fyr och har 26 bäddplatser fördelade på olika hus",
--     "Det går även bra att hyra ett helt hus", "Alla husen har fullt utrustat kök, toalett och dusch",
--     "Vandrarhemmet är öppet året runt"
--   fredriksborghotel.se: "Fredriksborgs Fästning … 1735", "Oxdjupet", "15 hotellrum", "Officersbostället
--     … och Stenkasernen", "Man äter i Stenkasernen, i Orangeriet eller utomhus sommartid",
--     "Utbud och öppettider varierar med säsongen", "en ny gästbrygga", "där Värmdö möter Vaxholm";
--     OSM/Nominatim "Fredriksborgs fästning": 59.40000, 18.44150
--   OSM (nod-beskrivning, översatt): Gärdsnäs östra badplats "Small artificially maintained sand beach";
--     Byssan/Knapen "Private sauna for the members of Näsbyvikens Båtsällskap".
--   getfotensjokrog.se: "Sjökrogen på ön Getfoten håller stängt tills vidare."
--   rindohamn.se: nämner Syrran & Jag, Ostmakeriet och "Bed and breakfast Rindö", inget hotell;
--     telefonen +46 8 38 11 99 är hamnkaptenens.
--   klintsundetmarina.se: "Vi på Klintan / Vi på Klintsundet" = samma verksamhet som circle-k-klintsundet.
--   landsort.com/saltboden: samma webbplats och telefon som saltboden-kok-proviant.
--   hamn.lysekil.se: samma webbplats som lysekils-hamn, som redan beskriver kommunens fem gästhamnar.
--
-- Oförändrade (texten har redan källa i tidigare datafix): dalaro-batklubb, hamburgsunds-gasthamn,
-- hono-gasthamn, ksss-gasthamn-lokholmen-trollsundet, loka-gasthamn, marstrands-gasthamn,
-- norra-hamnens-gasthamn, marstrand-vardshus.

-- ═══ DÖLJS (återställbart) ═══
update restaurants set hidden_at = now(), hidden_reason = v.skal
from (values
  ('gallno-bar', 'Dubblett av gallno-krog: gallno.se har en sommaröppen krog, och barens telefon 0739 38 45 62 är samma'),
  ('klintan', 'Dubblett av circle-k-klintsundet: webbplatsen klintsundetmarina.se ("Vi på Klintan / Vi på Klintsundet"); koordinaten låg 7 km fel'),
  ('landsort-hamncafe', 'Dubblett av saltboden-kok-proviant: samma webbplats och telefon (landsort.com/saltboden)'),
  ('lysekil-gasthamn', 'Dubblett av lysekils-hamn: samma webbplats hamn.lysekil.se'),
  ('getfoten-sjokrog', 'Stängt tills vidare enligt getfotensjokrog.se (läst 2026-09-26)'),
  ('rindo-rindo-hotell', 'Ingen källa för ett hotell på Rindö; webbplats och telefon tillhör Rindö hamn, där B&B redan finns som rindo-hamn-bed-och-breakfast'),
  ('smalsjon', 'Insjöstrand (Smalsjön, 59.853, 18.411), inte skärgård'),
  ('badplats-farastjarn', 'Insjöstrand (Färåstjärn, 57.611, 12.029), inte skärgård')
) as v(slug, skal)
where restaurants.slug = v.slug and restaurants.hidden_at is null;

update restaurants set phone = '073-938 45 62', updated_at = now()
where slug = 'gallno-krog' and phone is null;

-- ═══ TEXT SAKNAR KÄLLA → TÖMS ═══
-- Ingen egen webbplats, bara Facebook (ej godkänd källa för text), eller sidan saknar uppgifter.
update restaurants set description = null, updated_at = now()
where slug in (
  'arholma-arholma-pensionat','arholma-dansbana-krog','asattra-sommarkiosk','bullanda-marina',
  'fejan-stf-fejan','gallno-gallno-taltplatser','gittans-kbb-orno','hamncafet-moja','moja-hamnbar',
  'huvudskars-fyrkafe','jeppes-moja','lattas-bageri','lido-strandservering','ljustero-farjans-krog',
  'lysekils-fiskrokeri','orno-brodbod-deli','orno-hamnkiosk','pizzeria-ljustero','ragnars-kiosk-finnhamn',
  'rano-brygga','rodloga-rodloga-pensionat','runmaro-bryggkiosk','sjomack-musko','arsta-havsbads-grillen',
  'svenska-hogarna-fyrvaktarstugan-svenska-hogarna'
);
-- Bullerö: länken gick till bastun, inte till något kafé.
update restaurants set description = null, website = null, updated_at = now() where slug = 'bullero-cafe';

-- ═══ FEL LÄGE ═══
update restaurants set island = null, latitude = 59.29996, longitude = 18.25807,
  description = 'The Old Smokehouse är en BBQ-restaurang med vedeldad smoker på Smedsuddsvägen 1 i Lännersta, Nacka, med utsikt över Lännerstasundet. Restaurangen har egen brygga med cirka tio båtplatser på boj och en foodtruck på bryggan som har öppet helger och soliga dagar. Här säljs också rökt fisk från Bexanders Rökeri.',
  updated_at = now() where slug = 'old-smokehouse';

update restaurants set island = 'Årsta Havsbad', latitude = 59.08322, longitude = 18.16536,
  description = 'Restaurang Horsfjärden ligger på Torget 3 i Årsta Havsbad och serverar pizza, pasta, fisk- och kötträtter och har en barnmeny.',
  updated_at = now() where slug = 'restaurang-horsfjarden';

update restaurants set island = 'Värmdö', latitude = 59.40000, longitude = 18.44150,
  description = 'Fredriksborg Hotell ligger i Fredriksborgs fästning från 1735 vid Oxdjupet, där Värmdö möter Vaxholm. De två officersbyggnaderna har 15 hotellrum, och man äter i Stenkasernen, i orangeriet eller utomhus sommartid. Utbud och öppettider varierar med säsongen, och nere vid vattnet finns en gästbrygga.',
  updated_at = now() where slug = 'fredriksborg-hotell';

update restaurants set island = 'Djurö',
  description = 'Motorverkstan Bistro & Bar ligger på Djurö Gårdsväg 23 på Djurö och har öppet varje dag från midsommardagen till skolstart. Restaurangen har två bryggor där båtgäster kan lägga till. Efter säsongen används lokalerna för bröllop och företagsevent.',
  updated_at = now() where slug = 'motorverkstan-bistro-bar';

update restaurants set latitude = 59.40226, longitude = 18.34272, name = 'Vaxholms Bed & Breakfast',
  description = 'Vaxholms Bed & Breakfast på Drottninggatan 7 i Vaxholm hyr ut två gästlägenheter, veckovis juni–september och för kortare vistelser övrig tid. Värdarna håller bakworkshops och ordnar båtturer och vandringar i skärgården.',
  updated_at = now() where slug = 'vaxholm-vaxholm-harbour-bochb';

-- ═══ FEL WEBBPLATS/TELEFON, ENGELSK TEXT ═══
update restaurants set website = null, phone = null, endast_medlemmar = true,
  description = 'Privat bastu för medlemmar i Näsbyvikens Båtsällskap. Den går inte att hyra eller låna utan medlemskap.',
  updated_at = now() where slug in ('byssan','knapen');

update restaurants set description = 'Gärdsnäs östra badplats är en liten anlagd sandstrand.', updated_at = now()
where slug = 'gardsnas-ostra-badplats';

update restaurants set name = 'Utö Sjömack', website = 'https://www.brygganscafe.se/',
  description = 'Utö Sjömack har tankning dygnet runt och mopeduthyrning.',
  updated_at = now() where slug = 'uto-gasthamn-sjomack';

-- ═══ NYA TEXTER FRÅN VERKSAMHETENS EGEN SIDA ═══
update restaurants as r set description = v.d, updated_at = now()
from (values
  ('arholma-arholma-handel-stugor', 'Arholma Handel hyr ut Källarstugan, som ligger nära handelsboden på Arholma och har upp till fyra sängplatser. Stugan hyrs ut maj–september och under höstlovsveckan.'),
  ('arholma-sjomack', 'På Arholma säljer Arholma Handel bensin, diesel och gasol. Butiken på Arholma Norra byväg 1 har öppet året runt.'),
  ('arholma-stf-arholma', 'Arholma Nord ligger i en havsvik på Arholma, på Riddarviksvägen 40, med boende, restaurang och aktiviteter. Sommarsäsongen börjar på midsommarafton, och resten av året tar Arholma Nord emot grupper, konferenser och bröllop. Arholma ingår i STF:s Öluff-paket tillsammans med Finnhamn och Lidö.'),
  ('bjorko-birka-vikingastad-bochb', 'På Birka på Björkö i Mälaren finns glamping i fem tält för två till fyra personer. Paketet säljs av Strömma och innehåller frukostkorg till tältet, tvårättersmiddag på restaurang Särimner, guidad tur i fornlämningsområdet och entré till museet. Nästa säsong börjar i juni 2027.'),
  ('bockholmen-restaurang', 'Bockholmen Hav & Restaurang ligger i en sekelskiftesvilla på Bockholmen i Stockholms innerskärgård, dit man tar sig med båt, bil eller cykel. Köket är skandinaviskt med inslag från Medelhavet, och på helgerna serveras brunch. Sommartid har Kärleksbaren på ett trädäck vid vattnet BBQ-buffé och utsikt över Stocksund, Norra Djurgården och Lidingö.'),
  ('bryggans-lilla-kok-uto', 'Bryggans café på Utö har servering i hamnen bland gästbåtarna, med lättare rätter och öl och vin i baren.'),
  ('dalaro-smadalaro-gard', 'Smådalarö Gård Hotell & Spa har spa, tio konferenslokaler och restaurangen Brasserie & Bränneri, och dessutom vinbar, deli och Bloms Bar. Hotellet har öppet året runt.'),
  ('fejans-sjokrog', 'Fejans Sjökrog på Fejan har gästhamn och tar emot fest och konferens. Krogen har säsongsöppet och tar inte emot kontanter.'),
  ('finnhamn-finnhamn-taltplats', 'På Finnhamn går det att tälta. Finnhamn är naturreservat, och där råder eldningsförbud året runt.'),
  ('finnhamn-finnhamns-vandrarhem', 'Finnhamns vandrarhem ligger i en villa från början av 1900-talet som renoverades 2014–2017. Här finns 12 rum med två till fem bäddar, två matsalar med kök och en gillestuga, och utanför huvudbyggnaden finns två- och trebäddsstugor. Finnhamn är naturreservat med eldningsförbud året runt.'),
  ('framfickan-grinda', 'Framfickan är Grinda Wärdshus hamnkrog vid gästhamnen, med enklare mat än Wärdshuset och fullständiga rättigheter. Pizzan går också att beställa som take away. Framfickan har bara drop-in, och på morgonen säljs bröd från Grinda bageri här.'),
  ('galo-havsbad-restaurang', 'Bistron på Gålö Havsbad serverar mat, fika och smörgåsar. Menyn ändras efter säsong men har alltid fisk, kött, vegetariskt och laktos- och glutenfria alternativ. På området finns också äventyrsgolf och ett minilivs.'),
  ('grinda-lanthandel-cafe', 'Grinda Lanthandel & Café ligger nedanför Grinda Wärdshus och serverar frukost och enklare luncher: sallader, fyllda baguetter, pannkakor och korv. I lanthandeln finns livsmedel, hygienartiklar och bröd från det egna bageriet, som bakar varje dag under högsäsong från midsommarveckan. Den som bor i stuga på ön kan förbeställa varor minst tre dagar i förväg.'),
  ('grinda-sjomack', 'Grinda Sjömack ligger i direkt anslutning till gästhamnen och säljer bensin 98, diesel och gasol. Macken har kortautomat och är öppen året om, utom mellan kl. 22 och 05. Enklare båttillbehör och kioskvaror finns i Aktivitetshuset vid bryggan.'),
  ('hogmarso-sjomack', 'Högmarsö Sjömack hör till ICA Högmarsö och säljer bensin och diesel. Macken är bemannad när butiken har sommaröppet, och resten av året går det att tanka med kortautomat.'),
  ('ingmarso-ingmarso-bochb', 'Ingmarsö B&B ligger på Norrgården, en gård från mitten av 1800-talet på Ingmarsö, knappt en kilometer från Ingmarsö Krog. Här finns sju rum och frukost, och Stockholm Archipelago Trail går mellan husen på gården.'),
  ('ingmarso-krog', 'Ingmarsö Krog ligger vid vattnet nära södra ångbåtsbryggan. Matgäster kan använda krogens bryggor under sin sittning, med fyra bojplatser för båtar på 2–6,5 ton, och vid bordsbokning från kl. 19.30 går det att övernatta vid bryggan. Ingmarsö gästhamn, med 30 gästplatser, ligger cirka 200 meter österut.'),
  ('moja-stf-moja-gard', 'Möja vandrarhem är ett familjedrivet STF-vandrarhem vid landsvägen i Berg på södra Möja, med rum för två eller fyra personer och självhushåll. Det har öppet april–december och hyr ut cyklar, och via systerföretaget Möja Outdoor går det att hyra kajak, SUP, roddbåt och vattenskoter. Coop, som har öppet året runt, ligger 300 meter bort.'),
  ('nattaro-stf-nattaro', 'Nåttarö Gård & Resort på Nåttarö har vandrarhem, 50 semesterstugor och gästhamn. Ön ligger cirka 30 minuter med båt från Nynäshamn, och på ön finns Nåttarö Krog och pizzerian Sixtens bodega.'),
  ('stavsnas-restaurang-bar', 'Stavsnäs Krog ligger i Stavsnäs Vinterhamn, Stavsnäsvägen 222, och har två delar: Kaj & Krog med terrass vid kajkanten, och Bakgård & Pizza med napolitanska pizzor, deli och innergård. Under sommarsäsongen serveras lunch och middag. Carin Stenbeck driver restaurangen sedan våren 2025.'),
  ('strandbaren-idoborg', 'Strandbaren är restaurangen på Idöborg, med sandstrand intill, vedeldad bastu och kajakuthyrning. Gästhamnen på öns östra sida har plats för cirka 50 båtar, och matgäster med båt kortare än 10 meter får plats utan förbokning. Idöborg nås med Waxholmsbolagets linje 17 från Stavsnäs.'),
  ('svangen-runmaro', 'Svängen är krog och bar på Södersunda på Runmarö, med tikibar, trädgård med lekplats och glasskiosk, och en scen för musik, quiz och standup. Lunchbord bokas inte, men bord till kvällen går att boka per telefon.'),
  ('svartso-stf-svartso-skargardshotell', 'Svartsö Skärgårdshotell & Vandrarhem ligger i Svartsö by och har 56 bäddar, öppet året runt och cykeluthyrning. Hotellet är medlem i STF, närmaste badstrand ligger 100 meter bort och egna gästbåtsplatser finns cirka 600 meter från hotellet. Waxholmsbolaget går till Norra Svartsö brygga.'),
  ('uto-camping-och-stugor', 'Utö camping ligger vid havet med utsikt över södra hamnen och Mysingen och har egen sandstrand, fyra grillplatser och en servicestuga med toaletter, duschar och ett enklare kök. Platserna är inte numrerade och enskilda behöver inte boka, men skolklasser och större grupper ska förhandsboka. Man anmäler sig och betalar i Hamnboden vid Gruvbryggan.'),
  ('uto-vardshus', 'Utö Värdshus är hotell, restaurang och konferensanläggning på Utö, med 80 rum och hotellstugor (200 bäddar) och 12 mötesrum. Till värdshuset hör också Seglarbaren och Bakfickan.'),
  ('stf-vandrarhem-uto', 'Utö Vandrarhem ligger i backen upp mot Utö Värdshus, i grosshandlare Levins badhotell från förra sekelskiftet. Det har öppet april–oktober och har 73 bäddar, gemensamma kök för självhushåll och dusch och wc i korridoren. Husdjur är inte tillåtna, och man checkar in i värdshusets reception.'),
  ('sandhamn-sands-hotell', 'Sands Hotell på Sandhamn har rum och lägenheter för en till åtta personer: 15 dubbelrum och 3 enkelrum, totalt 33 bäddar. Här finns relaxavdelning med bastu, restaurang, orangeri och terrasser med utsikt över hamninloppet, och hotellet tar emot konferenser och fester.'),
  ('vaddo-vaddo-camping', 'Väddö Havsbad & Camping ligger vid Ålands hav på Väddö och har stugby och camping. Sandstranden inom campingområdet är 300 meter lång.'),
  ('vaxholm-waxholms-camping', 'Waxholms Camping ligger på Eriksövägen 44 på Eriksö i Vaxholm. Stugor, camping, tältplatser och glamping finns 1 maj–30 september, och husbilar kan stå på ställplatserna året runt. Här finns padel, minigolf, boule och SUP, och anläggningen är kontantfri.'),
  ('vaxholm-waxholms-hotell', 'Waxholms Hotell på Hamngatan 2 i Vaxholm har varit hotell sedan 1902. Här finns restaurangen Verandan, Nyckelbaren och en konferensvåning. Det finns ingen hiss till våning 3.'),
  ('winbergs-kok-bar', 'Winbergs Kök & Bar ligger på kajen i Vaxholm och grundades 1961. Här finns en sommarkrog och en grill med smashburgare, baguetter och Waxholmskorv. Öppettiderna är väderberoende.'),
  ('varvet-hogmarso', 'Restaurang Varvet ligger på Högmarsövägen 83 på Högmarsö och drivs sedan 2017 av Tomas och Klara Diederichsen. Krogen har sommaröppet, bakar ibland pizza, serverar ostron på onsdagar och har fest med liveband eller DJ. Högmarsö nås med en avgiftsbelagd bilfärja.'),
  ('landsort-landsort-stugor-vid-fyren', 'Landsorts Stuguthyrning drivs av familjen Sjöblom, som har bott på Landsort i sex generationer, och hyr ut stugor på ön.'),
  ('landsort-stf-vandrarhem-landsort', 'Landsorts Vandrarhem ligger nedanför Landsorts fyr och har 26 bäddar i flera hus, alla med kök, toalett och dusch. Det går att hyra ett helt hus, och vandrarhemmet har öppet året runt.'),
  ('ingaro-ingaro-camping', 'Ingarö Havscamping på Gamla Ingarövägen 12 har säsongscamping, korttidscamping, glamping, stugor och båtplatser.')
) as v(slug, d)
where r.slug = v.slug;

-- Namn och webbplatser som inte stämde med verksamhetens egen sida.
update restaurants set name = 'Arholma Nord' where slug = 'arholma-stf-arholma';
update restaurants set name = 'Glamping på Birka' where slug = 'bjorko-birka-vikingastad-bochb';
update restaurants set website = 'https://bockholmen.com/' where slug = 'bockholmen-restaurang';
update restaurants set name = 'Smådalarö Gård Hotell & Spa' where slug = 'dalaro-smadalaro-gard';
update restaurants set website = 'https://fejan.com/' where slug = 'fejans-sjokrog';
update restaurants set name = 'Ingarö Havscamping' where slug = 'ingaro-ingaro-camping';
update restaurants set website = 'https://www.ingmarsobnb.se/' where slug = 'ingmarso-ingmarso-bochb';
update restaurants set name = 'Coop Ingmarsö', description = 'Coop Ingmarsö är livsmedelsbutiken på Ingmarsö.', updated_at = now()
  where slug = 'ingmarso-sommarbutik';
update restaurants set name = 'Möja Värdshus & Bageri',
  description = 'Möja Värdshus & Bageri ligger nära Kyrkviken på Möja, där det har bakats sedan 1951. Nuvarande ägare tog över 2019, byggde en större matsal och köpte in ny bageriutrustning. Här finns också rum att boka.',
  updated_at = now() where slug = 'moja-bageri';
update restaurants set name = 'Möja vandrarhem' where slug = 'moja-stf-moja-gard';
update restaurants set name = 'Gålö Havsbad',
  description = 'Gålö Havsbad på Skälåkersvägen 11 på Gålö har stugor, camping och glamping. Här går det att hyra kajaker, kanoter, trampbåtar och SUP, och det finns bastu och vandringsleder i Gålös naturreservat.',
  updated_at = now() where slug = 'galo-havshotell-och-spa';
update restaurants set type = 'bar', description = 'Bakfickan är bar och nattklubb i anslutning till Utö Värdshus.', updated_at = now()
  where slug = 'bakfickan-uto';
update restaurants set website = 'https://idoborg.se/restaurang-strandbaren/' where slug = 'strandbaren-idoborg';
update restaurants set name = 'Utö camping', website = 'https://www.utogasthamn.se/camping/', phone = '08-501 57 450'
  where slug = 'uto-camping-och-stugor';
update restaurants set name = 'Utö Vandrarhem' where slug = 'stf-vandrarhem-uto';
update restaurants set name = 'Väddö Havsbad & Camping' where slug = 'vaddo-vaddo-camping';
update restaurants set name = 'Landsorts Stuguthyrning' where slug = 'landsort-landsort-stugor-vid-fyren';
update restaurants set name = 'Landsorts Vandrarhem' where slug = 'landsort-stf-vandrarhem-landsort';
