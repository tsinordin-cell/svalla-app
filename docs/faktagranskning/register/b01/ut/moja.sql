-- Faktagranskningen batch 01, Möja (Granskare/Skribent 2026-10-29; omarbete runda 4 2026-11-09).
-- Bara UPDATE. Varje sats skriver över exakt den text som granskats (gamla värdet i WHERE).
-- Läggs in av huvudsessionen. Inga rader raderas eller döljs. Inget här är kört.
-- SELECT 2026-11-09: varje WHERE nedan träffar exakt en rad (Supabase, bara SELECT).

-- restaurants.loka-gasthamn.description (moja-0407, moja-0408, moja-0409, moja-0413, moja-0414, moja-N005, moja-N006, moja-N007, moja-N008, moja-N009)
-- Omarbete runda 4 (full-08 utanför-1): ingen nivå 1–2-källa anger antal gästplatser eller Y-bommar. Kommunen nämner bara bryggan och gästhamnen;
-- turistföreningen (nivå 3) skriver "ca 5 platser". Antalet och Y-bommarna står därför inte i den nya texten, och djupet har ingen nivå 1-källa (förtydligande 16).
-- FÖRE: 'Löka är en liten fiskehamn på östra Möja med sju gästplatser och ett hamndjup på 1,5–2 meter; hamnens västra del är mycket grund. Här finns begränsat med färskvatten, toalett och miljöstation för hushållssopor och glas. Y-bommar installeras på gästplatserna, vilket begränsar båtbredden till 2,75 meter inklusive fendrar.'
-- KÄLLA: https://www.varmdo.se/download/18.15c854f417f448919aea0f76/1649062023495/Mo%CC%88ja.pdf — "Här finns brygga med ångbåtsförbindelse och gästhamn" (läst 2026-11-09)
-- KÄLLA: https://www.svenskagasthamnar.se/stockholms-skargard/moja-loka/ — "Liten fiskehamn på östra Möja.", "Färskvatten begränsat", "Miljöstation hushållssopor, glas" (läst 2026-11-09). Läst med curl; Chromium fick 502 från arbetsytans proxy.
-- KÄLLA: https://visitmoja.se/g%C3%A4sthamnar/ — "Direkt till höger innnanför piren finns ca 5 platser, angöring med ankare.", "Faciliteter: wc, vatten (handpump)" (läst 2026-11-09)
-- KÄLLA: https://kund.printhuset-sthlm.se/wa/h14.pdf — "Löka (Möja)", "Bryggorna trafikeras utan fast avgångstid." (läst 2026-11-09)
-- KÄLLA: https://www.varmdo.se/download/18.15c854f417f448919aea0f76/1649062023495/Mo%CC%88ja.pdf — "Möjlighet till klippbad finns i t.ex. Långvik, Ramsmora, Löka och Berg." (läst 2026-11-09)
-- KÄLLA: https://www.stockholmarchipelagotrail.com/sv/section/etapp-moja/ — "Möja är en stor ö i Stockholms mellersta skärgård på gränsen till ytterskärgården, i Värmdö Kommun." (läst 2026-11-09)
update restaurants set description = 'Löka gästhamn är en gästhamn i en liten fiskehamn på östra Möja i Värmdö kommun. Gästplatserna ligger direkt till höger innanför piren, och förtöjning sker med ankare. Här finns toalett, begränsat med färskvatten från handpump och miljöstation för hushållssopor och glas. Waxholmsbåtarna på linje 14 angör Löka, oftast utan fast tid, och i byn finns också klippbad.' where slug = 'loka-gasthamn' and description = 'Löka är en liten fiskehamn på östra Möja med sju gästplatser och ett hamndjup på 1,5–2 meter; hamnens västra del är mycket grund. Här finns begränsat med färskvatten, toalett och miljöstation för hushållssopor och glas. Y-bommar installeras på gästplatserna, vilket begränsar båtbredden till 2,75 meter inklusive fendrar.';

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
-- FÖRE: 'Möja Värdshus & Bageri ligger nära Kyrkviken på Möja, där det har bakats sedan 1951. Nuvarande ägare tog över 2019, byggde en större matsal och köpte in ny bageriutrustning. Här finns också rum att boka.'
-- KÄLLA: https://mojavardshusochbageri.se/ — "Möja bageris historia tar sin början 1951", "börjar baka bröd i fastigheten", "Nuvarande fastighetsägare tog över verksamheten 2019 och gjorde då en omfattande renovering för att möjliggöra en större matsal", "investera i ny bageriutrustning för att återta bageripositionen." (läst 2026-11-09)
-- KÄLLA: https://mojavardshusochbageri.se/boka-bord.php — "Det går att boka boende hos oss via Booking.com" (läst 2026-11-09)
-- KÄLLA: https://api.openstreetmap.org/api/0.6/relation/8719765/full — "Kyrkviken" (läst 2026-11-09); uppmätt i OpenStreetMap: nålen ligger på land, 54 m från vikens kant.
update restaurants set description = 'Möja Värdshus & Bageri ligger nära Kyrkviken på Möja. Bageriets historia tar enligt värdshuset sin början 1951, då man började baka bröd i fastigheten. Nuvarande ägare tog över 2019, byggde en större matsal och köpte in ny bageriutrustning för att återta bageripositionen. Här finns också rum att boka.' where slug = 'moja-bageri' and description = 'Möja Värdshus & Bageri ligger nära Kyrkviken på Möja, där det har bakats sedan 1951. Nuvarande ägare tog över 2019, byggde en större matsal och köpte in ny bageriutrustning. Här finns också rum att boka.';

-- restaurants.bastuhuset.website (moja-0574, FEL)
-- https://finnhamn.se/ är Finnhamns Arkipelag AB:s sajt för Finnhamn och nämner varken bastun eller Stora Kalholmen; bastun ligger på Stora Kalholmen (moja-0572, moja-N013). Länken tas bort i stället för att ersättas med en adress som inte är belagd som bastuns egen.
-- KÄLLA: https://finnhamn.se/ — "Välkommen till Finnhamn", "©2026 Finnhamns Arkipelag AB" (läst 2026-11-03)
-- FÖRE: 'http://www.finnhamn.se/'
update restaurants set website = null where slug = 'bastuhuset' and website = 'http://www.finnhamn.se/';

-- restaurants.hamncafet-moja.website (moja-0581, FEL → RÄTTA)
-- Turistföreningens "Läs mer" för Hamncafét går till Facebooksidan Möja-Hamnbar (220792088434354), och profilen i fältet (100065104277412) ger föreningen till Hamnbaren (länkadresserna MÄTT i sidans HTML 2026-11-09).
-- Ingen adress är belagd som Hamncaféts egen, så fältet töms (texträttelse, ingen radering).
-- FÖRE: 'https://www.facebook.com/profile.php?id=100065104277412'
-- KÄLLA: https://visitmoja.se/%c3%a4ta-och-handla-p%c3%a5-m%c3%b6ja/ — "Hamncafét", "Café med glass och bullar samt cykeluthyrning.", "Hamnbaren" (läst 2026-11-09)
update restaurants set website = null where slug = 'hamncafet-moja' and website = 'https://www.facebook.com/profile.php?id=100065104277412';

-- restaurants.hamncafet-moja.latitude/.longitude (moja-0580, OBELAGD): ingen UPDATE.
-- Turistföreningen anger "MÖJA HAMNCAFÉ (Kyrkviken)". Uppmätt i OpenStreetMap 2026-11-09: nålen ligger på Möja, 106 m från vikens kant. Kaféet finns inte i OpenStreetMap och har ingen egen adress eller karta,
-- så byggnaden går inte att belägga. Nålen står kvar tills verksamhetens egen uppgift finns.
-- KÄLLA: https://visitmoja.se/aktiviteter-p%C3%A5-m%C3%B6ja/ — "MÖJA HAMNCAFÉ (Kyrkviken)" (läst 2026-11-09)
-- KÄLLA: https://api.openstreetmap.org/api/0.6/relation/8719765/full — "Kyrkviken" (läst 2026-11-09); uppmätt: 106 m från vikens kant.

-- restaurants.jeppes-moja.name (moja-0584): ingen UPDATE. Verksamhetens egen Instagram (nivå 2, senaste inlägget 2026-11-06) skriver namnet Jeppes Gästgiveri.
-- Facebooksidan visar bara inloggningen (Chromium 2026-11-09).
-- KÄLLA: https://www.instagram.com/jeppesgastgiveri/ — "Jeppes Gästgiveri", "Välkomna till oss i Långvik." (läst 2026-11-09); senaste inlägget 2026-11-06.
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
