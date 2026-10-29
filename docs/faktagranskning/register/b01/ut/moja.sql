-- Faktagranskningen batch 01, Möja (Granskare/Skribent 2026-10-29).
-- Bara UPDATE. Varje sats skriver över exakt den text som granskats (gamla värdet i WHERE).
-- Läggs in av huvudsessionen. Inga rader raderas eller döljs.

-- restaurants.loka-gasthamn.description (moja-0407, moja-0408, moja-0409, moja-0413, moja-0414, moja-N005, moja-N006, moja-N007, moja-N008, moja-N009)
-- FÖRE: 'Löka är en liten fiskehamn på östra Möja med sju gästplatser och ett hamndjup på 1,5–2 meter; hamnens västra del är mycket grund. Här finns begränsat med färskvatten, toalett och miljöstation för hushållssopor och glas. Y-bommar installeras på gästplatserna, vilket begränsar båtbredden till 2,75 meter inklusive fendrar.'
-- KÄLLA: https://www.svenskagasthamnar.se/stockholms-skargard/moja-loka/ — "Liten fiskehamn på östra Möja.", "Färskvatten begränsat", "Miljöstation hushållssopor, glas" (läst 2026-10-29)
-- KÄLLA: https://visitmoja.se/g%C3%A4sthamnar/ — "Direkt till höger innnanför piren finns ca 5 platser, angöring med ankare.", "Faciliteter: wc, vatten (handpump)" (läst 2026-10-29)
-- KÄLLA: https://kund.printhuset-sthlm.se/wa/h14.pdf — "Löka (Möja)", "utan fast avgångstid." (läst 2026-10-29)
-- KÄLLA: https://www.varmdo.se/download/18.15c854f417f448919aea0f76/1649062023495/Mo%CC%88ja.pdf — "Möjlighet till klippbad finns i t.ex. Långvik, Ramsmora, Löka och Berg." (läst 2026-10-29)
-- KÄLLA: https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=59.4106731&lon=18.8968738&zoom=18&addressdetails=1&accept-language=sv — "Löka gästhamn, Länsväg 694, Löka, Berg, Värmdö kommun" (läst 2026-10-29)
update restaurants set description = 'Löka gästhamn är en gästhamn i en liten fiskehamn på östra Möja i Värmdö kommun. Gästplatserna ligger direkt till höger innanför piren, och förtöjning sker med ankare. Här finns toalett, begränsat med färskvatten från handpump och miljöstation för hushållssopor och glas. Waxholmsbåtarna på linje 14 angör Löka, oftast utan fast tid, och i byn finns också klippbad.' where slug = 'loka-gasthamn' and description = 'Löka är en liten fiskehamn på östra Möja med sju gästplatser och ett hamndjup på 1,5–2 meter; hamnens västra del är mycket grund. Här finns begränsat med färskvatten, toalett och miljöstation för hushållssopor och glas. Y-bommar installeras på gästplatserna, vilket begränsar båtbredden till 2,75 meter inklusive fendrar.';

-- restaurants.loka-gasthamn.website (moja-0404)
-- FÖRE: 'https://www.svenskagasthamnar.se/'
-- KÄLLA: https://www.svenskagasthamnar.se/stockholms-skargard/moja-loka/ — "Möja - Löka" (läst 2026-10-29)
update restaurants set website = 'https://www.svenskagasthamnar.se/stockholms-skargard/moja-loka/' where slug = 'loka-gasthamn' and website = 'https://www.svenskagasthamnar.se/';

-- restaurants.kyrkviken.description (moja-0599, moja-0603, moja-N010, moja-N011, moja-N012)
-- FÖRE: 'Kyrkviken är en liten fiskehamn på Möjas sydöstra sida med gästbrygga längst in i hamnen, och gästplatser finns även längst ut i viken på både östra och västra sidan. Hamndjupet är 1,8–2,5 meter och förtöjning sker med ankare. Hamnen ligger nära Berg, Möjas största by, med kyrka och hembygdsmuseum.'
-- KÄLLA: https://www.svenskagasthamnar.se/stockholms-skargard/moja-kyrkviken/ — "Liten fiskehamn på Möjas sydöstra sida med gästbrygga längst in i hamnen.", "Det finns även gästplatser längst ut i viken på både östra och västra (vid kyrkan) sidan.", "Gästhamnen ligger nära Berg, som är den största byn i Möja." (läst 2026-10-29)
-- KÄLLA: https://visitmoja.se/g%C3%A4sthamnar/ — "Konsollbryggor vid östra och västra inloppet samt längst in mot landsvägen, tilläggning med ankare.", "Faciliteter: wc, vatten (dunk)." (läst 2026-10-29)
-- KÄLLA: https://stockholmslansmuseum.se/besoksmal/moja-bockon-och-lokaon/ — "Möja hembygdsmuseum, invigt 1922, finns i Berg." (läst 2026-10-29)
-- KÄLLA: https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=59.406497&lon=18.8837513&zoom=18&addressdetails=1&accept-language=sv — "Länsväg 694, Källa strand, Berg, Värmdö kommun" (läst 2026-10-29)
update restaurants set description = 'Kyrkviken är en liten fiskehamn med gästhamn på Möjas sydöstra sida i Värmdö kommun, med gästbrygga längst in i hamnen; gästplatser finns även längst ut i viken på både den östra sidan och den västra, vid kyrkan. Förtöjning sker med ankare, och här finns toalett och vatten i dunk. Hamnen ligger nära Berg, Möjas största by, med hembygdsmuseum.' where slug = 'kyrkviken' and description = 'Kyrkviken är en liten fiskehamn på Möjas sydöstra sida med gästbrygga längst in i hamnen, och gästplatser finns även längst ut i viken på både östra och västra sidan. Hamndjupet är 1,8–2,5 meter och förtöjning sker med ankare. Hamnen ligger nära Berg, Möjas största by, med kyrka och hembygdsmuseum.';

-- restaurants.bastuhuset.description (moja-0576, moja-N013, moja-N014)
-- FÖRE: 'Bastuhuset är en bastu i Värmdö kommun.'
-- KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-stora-kalholmen-vandrarhem/ — "Stora Kalholmen är belägen i mellersta skärgården mellan Finnhamn och Möja.", "STF Stora Kalholmen Vandrarhem", "Bastu finns." (läst 2026-10-29)
-- KÄLLA: https://nominatim.openstreetmap.org/search?format=jsonv2&q=Stora+Kalholmen&accept-language=sv&limit=3 — "Stora Kalholmen, Värmdö kommun, Stockholms län, Sverige" (läst 2026-10-29)
-- KÄLLA: https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=59.4521226&lon=18.8230902&zoom=18&addressdetails=1&accept-language=sv — "Bastuhuset, Naturstig" (läst 2026-10-29)
update restaurants set description = 'Bastuhuset är en bastu på Stora Kalholmen, som ligger mellan Finnhamn och Möja i Stockholms mellersta skärgård. På ön ligger STF Stora Kalholmen Vandrarhem, där bastu finns.' where slug = 'bastuhuset' and description = 'Bastuhuset är en bastu i Värmdö kommun.';

-- restaurants.moja-bageri.type (moja-0614)
-- FÖRE: 'cafe'
-- KÄLLA: https://mojavardshusochbageri.se/v%C3%A4rdshuset.php — "Möja Värdshus & Bageri är en genuin och hemtrevlig skärgårdsrestaurang med fullskaligt bageri." (läst 2026-10-29)
update restaurants set type = 'restaurant' where slug = 'moja-bageri' and type = 'cafe';
