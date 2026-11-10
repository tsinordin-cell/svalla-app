-- Faktagranskningen batch 01, Möja (Granskare/Skribent 2026-10-29; omarbete runda 4 2026-11-09).
-- Bara UPDATE. Varje sats skriver över exakt den text som granskats (gamla värdet i WHERE).
-- Läggs in av huvudsessionen. Inga rader raderas eller döljs. Inget här är kört.
-- SELECT 2026-11-09: varje WHERE nedan träffar exakt en rad (Supabase, bara SELECT).
-- Omarbete 4b (2026-11-09): satserna för loka-gasthamn.description, moja-bageri.description och hamncafet-moja.website är ändrade och
--   hamncafet-moja.latitude/.longitude är ny. Inget har körts mot databasen i omarbete 4b, så deras WHERE är inte prövade med SELECT. Kör SELECT före.
-- Omarbete 4c (2026-11-10): bara det nya värdet i satsen för moja-bageri.description är ändrat; WHERE är samma. Inget har körts mot databasen.

-- restaurants.loka-gasthamn.description (moja-0407, moja-0408, moja-0409, moja-0413, moja-0414, moja-N005, moja-N006, moja-N007, moja-N008, moja-N009)
-- Omarbete runda 4 (full-08 utanför-1): ingen nivå 1–2-källa anger antal gästplatser eller Y-bommar. Kommunen nämner bara bryggan och gästhamnen;
-- turistföreningen (nivå 3) skriver "ca 5 platser". Antalet står därför inte i den nya texten, och djupet har ingen nivå 1-källa (förtydligande 16).
-- Omarbete 4b (mo4s08, mo4033): strykningen av Y-bommarna var fel. Svenska Gästhamnar (nivå 3; ingen nivå 1–2-källa nämner dem) anger dem, utan datum,
--   medan sidans tabell fortfarande anger förtöjning med ankare. Uppgiften står därför tillskriven hamnens uppgift. Trafikledet skrivs efter
--   teckenförklaringen för X i tabell 14 (MÄTT kolumn för kolumn: Löka står med X på 38 av 54 turer som angör Möja vår och höst 2026 och 37 av 53 i sommartabellen).
-- FÖRE: 'Löka är en liten fiskehamn på östra Möja med sju gästplatser och ett hamndjup på 1,5–2 meter; hamnens västra del är mycket grund. Här finns begränsat med färskvatten, toalett och miljöstation för hushållssopor och glas. Y-bommar installeras på gästplatserna, vilket begränsar båtbredden till 2,75 meter inklusive fendrar.'
-- KÄLLA: https://www.varmdo.se/download/18.15c854f417f448919aea0f76/1649062023495/Mo%CC%88ja.pdf — "Här finns brygga med ångbåtsförbindelse och gästhamn" (läst 2026-11-09)
-- KÄLLA: https://www.svenskagasthamnar.se/stockholms-skargard/moja-loka/ (Svenska Gästhamnar, nivå 3) — "Liten fiskehamn på östra Möja.", "Färskvatten begränsat", "Miljöstation hushållssopor, glas", "Då vi håller på att installera y-bommar på gästplatserna så blir båtbredderna på max 2,75m inklusive fendrar." (läst 2026-11-09). Läst med curl i arbetsytan (Chromium får 502 från proxyn) och av Redaktören i Toms Chrome (kallcache/facebook-2026-11-09.txt, punkt 5); uppgiften om Y-bommarna är odaterad.
-- KÄLLA: https://visitmoja.se/g%C3%A4sthamnar/ — "Direkt till höger innnanför piren finns ca 5 platser, angöring med ankare.", "Faciliteter: wc, vatten (handpump)" (läst 2026-11-09)
-- KÄLLA: https://kund.printhuset-sthlm.se/wa/h14.pdf — "14A STOCKHOLM – VAXHOLM – SOLLENKROKA – MÖJA", "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Löka (Möja)", "Bryggorna trafikeras utan fast avgångstid." (läst 2026-11-09); uppmätt: X på 38 av 54 turer som angör Möja.
-- KÄLLA: https://kund.printhuset-sthlm.se/wa/s14.pdf — "GÄLLER 19 JUNI 2026 – 16 AUGUSTI 2026", "Löka (Möja)", "Bryggorna trafikeras utan fast avgångstid." (läst 2026-11-09); uppmätt: X på 37 av 53 turer som angör Möja.
-- KÄLLA: https://www.varmdo.se/download/18.15c854f417f448919aea0f76/1649062023495/Mo%CC%88ja.pdf — "Möjlighet till klippbad finns i t.ex. Långvik, Ramsmora, Löka och Berg." (läst 2026-11-09)
-- KÄLLA: https://www.stockholmarchipelagotrail.com/sv/section/etapp-moja/ — "Möja är en stor ö i Stockholms mellersta skärgård på gränsen till ytterskärgården, i Värmdö Kommun." (läst 2026-11-09)
update restaurants set description = 'Löka gästhamn är en gästhamn i en liten fiskehamn på östra Möja i Värmdö kommun. Gästplatserna ligger direkt till höger innanför piren, och förtöjning sker med ankare. Enligt hamnens uppgift på Svenska Gästhamnar håller man på att installera Y-bommar på gästplatserna, och båtbredden blir då högst 2,75 meter inklusive fendrar. Här finns toalett, begränsat med färskvatten från handpump och miljöstation för hushållssopor och glas. Waxholmsbolagets linje 14 angör Löka; i tabellerna för 2026 står bryggan på de flesta turer med X, som betyder att den trafikeras utan fast avgångstid. I byn finns också klippbad.' where slug = 'loka-gasthamn' and description = 'Löka är en liten fiskehamn på östra Möja med sju gästplatser och ett hamndjup på 1,5–2 meter; hamnens västra del är mycket grund. Här finns begränsat med färskvatten, toalett och miljöstation för hushållssopor och glas. Y-bommar installeras på gästplatserna, vilket begränsar båtbredden till 2,75 meter inklusive fendrar.';

-- restaurants.loka-gasthamn.website (moja-0404)
-- FÖRE: 'https://www.svenskagasthamnar.se/'
-- KÄLLA: https://www.svenskagasthamnar.se/stockholms-skargard/moja-loka/ — "Möja - Löka" (läst 2026-11-09)
update restaurants set website = 'https://www.svenskagasthamnar.se/stockholms-skargard/moja-loka/' where slug = 'loka-gasthamn' and website = 'https://www.svenskagasthamnar.se/';

-- restaurants.kyrkviken.description (moja-0599, moja-0603, moja-N010, moja-N011, moja-N012)
-- Omarbete runda 4 (full-08 utanför-2): djupet "1,8–2,5 meter" har ingen nivå 1-källa (Sjöfartsverket) och stryks; kompensation är toalett och vatten i dunk.
-- FÖRE: 'Kyrkviken är en liten fiskehamn på Möjas sydöstra sida med gästbrygga längst in i hamnen, och gästplatser finns även längst ut i viken på både östra och västra sidan. Hamndjupet är 1,8–2,5 meter och förtöjning sker med ankare. Hamnen ligger nära Berg, Möjas största by, med kyrka och hembygdsmuseum.'
-- KÄLLA: https://www.svenskagasthamnar.se/stockholms-skargard/moja-kyrkviken/ — "Liten fiskehamn på Möjas sydöstra sida med gästbrygga längst in i hamnen.", "Det finns även gästplatser längst ut i viken på både östra och västra (vid kyrkan) sidan.", "Gästhamnen ligger nära Berg" (läst 2026-11-09). Läst med curl; Chromium fick 502 från arbetsytans proxy.
-- KÄLLA: https://visitmoja.se/g%C3%A4sthamnar/ — "Konsollbryggor vid östra och västra inloppet samt längst in mot landsvägen, tilläggning med ankare.", "Faciliteter: wc, vatten (dunk)." (läst 2026-11-09)
-- KÄLLA: https://www.varmdo.se/download/18.15c854f417f448919aea0f76/1649062023495/Mo%CC%88ja.pdf — "Möjas största by" (läst 2026-11-09)
-- KÄLLA: https://stockholmslansmuseum.se/besoksmal/moja-bockon-och-lokaon/ — "Möja hembygdsmuseum, invigt 1922, finns i Berg." (läst 2026-11-09)
-- KÄLLA: https://www.stockholmarchipelagotrail.com/sv/section/etapp-moja/ — "Möja är en stor ö i Stockholms mellersta skärgård på gränsen till ytterskärgården, i Värmdö Kommun." (läst 2026-11-09)
update restaurants set description = 'Kyrkviken är en liten fiskehamn med gästhamn på Möjas sydöstra sida i Värmdö kommun, med gästbrygga längst in i hamnen; gästplatser finns även längst ut i viken på både den östra sidan och den västra, vid kyrkan. Förtöjning sker med ankare, och här finns toalett och vatten i dunk. Hamnen ligger nära Berg, Möjas största by, med hembygdsmuseum.' where slug = 'kyrkviken' and description = 'Kyrkviken är en liten fiskehamn på Möjas sydöstra sida med gästbrygga längst in i hamnen, och gästplatser finns även längst ut i viken på både östra och västra sidan. Hamndjupet är 1,8–2,5 meter och förtöjning sker med ankare. Hamnen ligger nära Berg, Möjas största by, med kyrka och hembygdsmuseum.';

-- restaurants.kyrkviken.island och .latitude/.longitude (moja-0593, moja-0594): ingen UPDATE, källan byts.
-- KÄLLA: https://api.openstreetmap.org/api/0.6/relation/8719765/full — "Kyrkviken" (läst 2026-11-09); uppmätt i OpenStreetMap: nålen ligger inne i viken Kyrkviken (natural=bay), 1 m från vikens kant.
-- KÄLLA: https://api.openstreetmap.org/api/0.6/relation/8346534/full — "Möja" (läst 2026-11-09); uppmätt i OpenStreetMap: nålen ligger 1 m från Möjas strandlinje (place=island).

-- restaurants.moja-hamnbar.island (moja-0626): ingen UPDATE, källan byts.
-- KÄLLA: https://api.openstreetmap.org/api/0.6/relation/8346534/full — "Möja" (läst 2026-11-09); uppmätt i OpenStreetMap: nålen ligger på Möja, 17 m från strandlinjen.

-- restaurants.bastuhuset.description (moja-0576, moja-N013, moja-N014). SET-texten är ändrad i runda 4: namnet Bastuhuset finns bara i OpenStreetMap (moja-0570).
-- FÖRE: 'Bastuhuset är en bastu i Värmdö kommun.'
-- KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-stora-kalholmen-vandrarhem/ — "Stora Kalholmen är belägen i mellersta skärgården mellan Finnhamn och Möja.", "STF Stora Kalholmen Vandrarhem", "Bastu finns." (läst 2026-11-09)
-- KÄLLA: https://api.openstreetmap.org/api/0.6/way/247542022 — "sauna" (läst 2026-11-09); läget: byggnaden på Stora Kalholmen där nålen står.
update restaurants set description = 'Bastun ligger på Stora Kalholmen, ön mellan Finnhamn och Möja i Stockholms mellersta skärgård. På ön ligger STF Stora Kalholmen Vandrarhem, där bastu finns.' where slug = 'bastuhuset' and description = 'Bastuhuset är en bastu i Värmdö kommun.';

-- restaurants.bastuhuset.name (moja-0570, OBELAGD → PRECISERA)
-- Namnet finns bara i OpenStreetMap, som bara får belägga läget. STF nämner bastu på ön men inget namn. Namnet blir det som är belagt.
-- FÖRE: 'Bastuhuset'
-- KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-stora-kalholmen-vandrarhem/ — "Stora Kalholmen är belägen i mellersta skärgården mellan Finnhamn och Möja.", "Bastu finns." (läst 2026-11-09)
update restaurants set name = 'Bastu på Stora Kalholmen' where slug = 'bastuhuset' and name = 'Bastuhuset';

-- restaurants.moja-bageri.type (moja-0614)
-- FÖRE: 'cafe'
-- KÄLLA: https://mojavardshusochbageri.se/v%C3%A4rdshuset.php — "skärgårdsrestaurang med fullskaligt bageri" (läst 2026-11-09)
update restaurants set type = 'restaurant' where slug = 'moja-bageri' and type = 'cafe';

-- restaurants.moja-bageri.description (moja-0619 FEL → RÄTTA; moja-0618 KÄLLA ny)
-- Sidan säger att bageriets historia börjar 1951 och att ny bageriutrustning köptes 2019 för att återta bageripositionen, inte att det har bakats där sedan 1951.
-- Omarbete 4b (mo4014, granskare-skribent.md punkt 19): ägarbytet 2019, renoveringen för en större matsal och utrustningen är verksamheten om sig själv
--   och står tillskrivna värdshuset. Rummen går bara att boka 18 juni–15 augusti enligt bokningssidan, som inte anger år; raden läses om före publiceringen.
-- Omarbete 4c (ob4022, Redaktörens beslut): startåret 1951 står som bageriets startår enligt värdshuset (verksamheten om sig själv), och
--   «då man började baka bröd i fastigheten» är struket, så att meningen inte blir en uppgift om fastighetens historia.
-- FÖRE: 'Möja Värdshus & Bageri ligger nära Kyrkviken på Möja, där det har bakats sedan 1951. Nuvarande ägare tog över 2019, byggde en större matsal och köpte in ny bageriutrustning. Här finns också rum att boka.'
-- KÄLLA: https://mojavardshusochbageri.se/ — "Möja bageris historia tar sin början 1951", "Nuvarande fastighetsägare tog över verksamheten 2019 och gjorde då en omfattande renovering för att möjliggöra en större matsal", "investera i ny bageriutrustning för att återta bageripositionen." (läst 2026-11-10)
-- KÄLLA: https://mojavardshusochbageri.se/boka-bord.php — "Det går att boka boende hos oss via Booking.com mellan den 18e juni till den 15e augusti.", "Stängt för säsongen alla andra samtliga datum." (läst 2026-11-10)
-- KÄLLA: https://api.openstreetmap.org/api/0.6/relation/8719765/full — "Kyrkviken" (läst 2026-11-09); uppmätt i OpenStreetMap: nålen ligger på land, 54 m från vikens kant.
update restaurants set description = 'Möja Värdshus & Bageri ligger nära Kyrkviken på Möja. Enligt värdshuset startade bageriet 1951, och 2019 tog nuvarande fastighetsägare över verksamheten, gjorde en omfattande renovering för en större matsal och investerade i ny bageriutrustning för att återta bageripositionen. Här finns också rum, som bara går att boka 18 juni–15 augusti.' where slug = 'moja-bageri' and description = 'Möja Värdshus & Bageri ligger nära Kyrkviken på Möja, där det har bakats sedan 1951. Nuvarande ägare tog över 2019, byggde en större matsal och köpte in ny bageriutrustning. Här finns också rum att boka.';

-- restaurants.bastuhuset.website (moja-0574, FEL)
-- https://finnhamn.se/ är Finnhamns Arkipelag AB:s sajt för Finnhamn och nämner varken bastun eller Stora Kalholmen; bastun ligger på Stora Kalholmen (moja-0572, moja-N013). Länken tas bort i stället för att ersättas med en adress som inte är belagd som bastuns egen.
-- KÄLLA: https://finnhamn.se/ — "Välkommen till Finnhamn", "©2026 Finnhamns Arkipelag AB" (läst 2026-11-03)
-- FÖRE: 'http://www.finnhamn.se/'
update restaurants set website = null where slug = 'bastuhuset' and website = 'http://www.finnhamn.se/';

-- restaurants.hamncafet-moja.website (moja-0581, FEL → RÄTTA)
-- Turistföreningens "Läs mer" för Hamncafét går till Facebooksidan Möja-Hamnbar (220792088434354), och profilen i fältet (100065104277412) ger föreningen till Hamnbaren (länkadresserna MÄTT i sidans HTML 2026-11-09).
-- Omarbete 4b (mo4069): fältet sätts till kaféets egen Facebooksida, som turistföreningen länkar till från "MÖJA HAMNCAFÉ (Kyrkviken)" (MÄTT i sidans HTML
--   2026-11-09). Sidan går att läsa utan inloggning, och senaste inlägget är från 7 augusti 2026, alltså högst 12 månader gammalt (nivå 2).
-- FÖRE: 'https://www.facebook.com/profile.php?id=100065104277412'
-- KÄLLA: https://visitmoja.se/%c3%a4ta-och-handla-p%c3%a5-m%c3%b6ja/ — "Hamncafét", "Café med glass och bullar samt cykeluthyrning.", "Hamnbaren" (läst 2026-11-09)
-- KÄLLA: https://www.facebook.com/profile.php?id=100067003784963 — "Möja Hamncafé", "Enkelt café och cykeluthyrning i Kyrkviken på Möja" (läst 2026-11-09, i Chromium utan inloggning; adressen leder till facebook.com/people/Möja-Hamncafé/100067003784963/); senaste inlägget 7 augusti 2026.
-- KÄLLA: https://visitmoja.se/aktiviteter-p%C3%A5-m%C3%B6ja/ — "MÖJA HAMNCAFÉ (Kyrkviken)" (läst 2026-11-09); länken går till kaféets Facebookprofil (id 100067003784963), MÄTT i sidans HTML
update restaurants set website = 'https://www.facebook.com/profile.php?id=100067003784963' where slug = 'hamncafet-moja' and website = 'https://www.facebook.com/profile.php?id=100065104277412';

-- restaurants.hamncafet-moja.latitude/.longitude (moja-0580, FEL → RÄTTA; omarbete 4b, mo4008)
-- Ingen källa ger kaféets punkt: kaféets egen Facebooksida anger bara "Kyrkviken , Möja, Sweden", utan adress eller karta, och turistföreningen
--   "(Kyrkviken)"; kaféet finns inte i OpenStreetMap. Den gamla nålen låg på land 22 m från Les Poissonniers de Möja (OSM way 1192092028), en annan
--   verksamhet, och 106 m från viken. Nålen flyttas till bryggan i Kyrkviken, där kaféet ligger enligt turistföreningen.
-- FÖRE: latitude 59.4069, longitude 18.8858 (registrets värde, moja-0580)
-- KÄLLA: https://www.facebook.com/profile.php?id=100067003784963 — "Enkelt café och cykeluthyrning i Kyrkviken på Möja", "Kyrkviken , Möja, Sweden" (läst 2026-11-09, i Chromium utan inloggning); senaste inlägget 7 augusti 2026.
-- KÄLLA: https://visitmoja.se/aktiviteter-p%C3%A5-m%C3%B6ja/ — "MÖJA HAMNCAFÉ (Kyrkviken)" (läst 2026-11-09)
-- KÄLLA: https://api.openstreetmap.org/api/0.6/way/528147405/full — "pier" (läst 2026-11-09); den nya punkten är mittpunkten mellan bryggans två noder (5133201726 och 5133201727), uppmätt i OpenStreetMaps API 2026-11-09 (haversine). Bryggan ligger längst in i Kyrkviken; punkten ligger 17 m från gästhamnens nål, 30 m från Möja hamnbar (nod 13190921824) och 118 m från Les Poissonniers de Möja (nod 12089216159).
-- KÄLLA: https://api.openstreetmap.org/api/0.6/relation/8719765/full — "Kyrkviken" (läst 2026-11-09)
update restaurants set latitude = 59.4064678, longitude = 18.8840547 where slug = 'hamncafet-moja' and latitude = 59.4069 and longitude = 18.8858;

-- restaurants.jeppes-moja.name (moja-0584): ingen UPDATE. Omarbete 4b (mo4075): källan byts från Instagram (som bara visade inloggningen för Kontrollanten)
--   till verksamhetens egen Facebooksida (nivå 2), läst av Redaktören i Toms Chrome 2026-11-09 (kallcache/facebook-2026-11-09.txt, punkt 4).
-- KÄLLA: https://www.facebook.com/jeppesgastgiveri/ — "Jeppes Gästgiveri", "Restaurang", "Välkomna till oss i Långvik." (läst 2026-11-09); senaste inlägget 6 november 2026.
-- restaurants.jeppes-moja.latitude/.longitude (moja-0587): ingen UPDATE, källan byts.
-- KÄLLA: https://api.openstreetmap.org/api/0.6/node/5012735219 — "Jeppes" (läst 2026-11-09); uppmätt: nålen ligger 10 m från noden (amenity=restaurant).

-- restaurants.moja-stf-moja-gard.type (moja-0633, FEL → RÄTTA). Typen hostel finns redan i tabellen (SELECT 2026-11-09), så det är ingen schemaändring.
-- Boendesidan hämtar i dag bara typen hotel (src/app/o/[slug]/boende/page.tsx:80); mallen tas av mallarnas Skribent enligt Vaktens lista.
-- FÖRE: 'hotel'
-- KÄLLA: https://mojavandrarhem.se/ — "Välkommen till ett litet familjedrivet vandrarhem i yttre mellanskärgården!" (läst 2026-11-09)
update restaurants set type = 'hostel' where slug = 'moja-stf-moja-gard' and type = 'hotel';

-- restaurants.moja-stf-moja-gard.description (moja-0645 FEL → RÄTTA; moja-N004 KÄLLA ny)
-- Sidan knyter bara transporten med båt eller fyrhjuling till Möja Outdoor; kajak, SUP, roddbåt och vattenskoter hyrs via vandrarhemmet. Att Coop har öppet året runt beläggs av Coop.
-- FÖRE: 'Möja vandrarhem är ett familjedrivet STF-vandrarhem vid landsvägen i Berg på södra Möja, med rum för två eller fyra personer och självhushåll. Det har öppet april–december och hyr ut cyklar, och via systerföretaget Möja Outdoor går det att hyra kajak, SUP, roddbåt och vattenskoter. Coop, som har öppet året runt, ligger 300 meter bort.'
-- KÄLLA: https://mojavandrarhem.se/ — "Genom vårt systerföretag MÖJA OUTDOOR kan även ordna transport med båt eller fyrhjuling med släp.", "Och vill du ut på havet kan du även hyra kajak, SUP, roddbåt och vattenskoter via oss!", "Självklart kan du hyra cykel av oss när du är på Möja." (läst 2026-11-09)
-- KÄLLA: https://mojavandrarhem.se/ — "Vandrarhemmet har öppet från april till december", "Vandrarhemmet ligger utmed landsvägen i huvudbyn Berg på södra Möja, och inom promenadavstånd från huset finns den året-runt-öppna matbutiken Coop (300m)." (läst 2026-11-09)
-- KÄLLA: https://konsummoja.se/ — "Den stora butiken på Möja och som har öppet året runt." (läst 2026-11-09)
update restaurants set description = 'Möja vandrarhem är ett familjedrivet STF-vandrarhem vid landsvägen i Berg på södra Möja, med rum för två eller fyra personer och självhushåll. Det har öppet april–december och hyr ut cyklar, kajak, SUP, roddbåt och vattenskoter, och via systerföretaget Möja Outdoor går det att ordna transport med båt eller fyrhjuling med släp. Coop Berg, som har öppet året runt, ligger 300 meter bort.' where slug = 'moja-stf-moja-gard' and description = 'Möja vandrarhem är ett familjedrivet STF-vandrarhem vid landsvägen i Berg på södra Möja, med rum för två eller fyra personer och självhushåll. Det har öppet april–december och hyr ut cyklar, och via systerföretaget Möja Outdoor går det att hyra kajak, SUP, roddbåt och vattenskoter. Coop, som har öppet året runt, ligger 300 meter bort.';
