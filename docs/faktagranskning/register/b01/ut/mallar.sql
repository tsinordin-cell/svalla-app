-- Sidmallarna, batch 01, runda 6 (2026-11-16): ö-fält i platsdatabasen (Kontrollantens fynd ma5025, register mall-N010).
-- Körs inte av Granskaren/Skribenten. Varje UPDATE har det gamla värdet ovanför (FÖRE) och i WHERE-villkoret, så att den
-- bara skriver över exakt det som granskats. Värdena kommer ur exporten docs/faktagranskning/platser-export-2026-10-29.json;
-- ingen fråga är körd mot databasen.
--
-- Bakgrund: sedan runda 5 går ö-fältet före avståndet (islandPlaces.ts, arPaOn). En plats vars ö-fält är postorten och inte
-- ön hamnar då under "i närheten" på sin egen ö. Bland de 76 placeringar (66 platser på 23 öar) där ö-fältet är en annan ort
-- men platsen ligger inom platsradien från nålen är det här det enda fallet där ö-fältet är fel (listan och besluten:
-- register/b01/ut/mallar.omarbete6.md, punkt 6).

-- Smådalarö Gård (Smådalarös boendesida: "Dalaro Smadalaro Gard", "0,2 km fågelvägen från Smådalarö").
-- Hotellet ligger vid Hemviken på Smådalarö; Dalarö är postorten. Lantmäteriets namn Smådalarö (bebyggelse) ligger 0,20 km
-- från platsens läge i databasen (59.1668, 18.45564) och närmaste namn Dalarö (trakt) 4,40 km bort (uppmätt 2026-11-16:
-- Lantmäteriets SWEREF 99 TM-koordinater omräknade till WGS 84, avstånd fågelvägen med haversine).
-- KÄLLA: https://www.smadalarogard.se/hotellet/kontakt-hitta-hit/ — "Smådalarö Gård Hotell & Spa ligger idylliskt i Hemviken i Stockholms skärgård.", "Smådalarövägen 100", "137 70 Dalarö" (läst 2026-11-16)
-- KÄLLA: https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Sm%C3%A5dalar%C3%B6 — "Smådalarö", "Haninge | Bebyggelse", "Smådalarö Hemviken 10", "Haninge | Dalarö" (läst 2026-11-16)
-- KÄLLA: https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Dalar%C3%B6 — "Dalarö", "Haninge | Trakt" (läst 2026-11-16)
-- FÖRE: island = 'Dalarö'
update public.restaurants
   set island = 'Smådalarö'
 where slug = 'dalaro-smadalaro-gard'
   and island = 'Dalarö';
