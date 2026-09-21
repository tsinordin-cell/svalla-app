-- Bistro Lillströmma låg på Ljusterö i Svallas data men ligger på Värmdö.
-- KÄLLA: Bistro Lillströmma, https://www.lillstromma.se/kontakt — "Lillströmmsuddsvägen 1, 139 60 Värmdö";
--   https://www.lillstromma.se/ — "vid porten till skärgården … rustik husmanskost med pasta och sallader, och pizza";
--   "Där båtfolk, badjävlar och locals kan samsas"; sidtitel "Dagens lunch" (lästa i webbläsare 2026-09-21).
--   Google Places gav redan formatted_address "Lillströmsbacken 2, 139 60 Värmdö".
-- Rättat: ö, typ, text, taggar, meny. Struket utan källa: öppettider (handskrivna, stämde inte med
--   restaurangens egna), säsong "endast sommar", toalett, "familj/dagstur".
-- Koordinaterna (59.53, 18.605) pekade på Ljusterö och nollställs tills rätt position är belagd.
update restaurants set
  island = 'Värmdö',
  archipelago_region = 'stockholm',
  type = 'restaurant',
  categories = array['restaurant','lunch_stop'],
  tags = array['värmdö','pizza','lunch'],
  best_for = array['boaters'],
  facilities = null,
  seasonality = null,
  opening_hours = null,
  menu = 'Husmanskost, pasta, sallader och pizza.',
  description = 'Bistro vid Lillströmma på Värmdö, vid porten till skärgården. Husmanskost, pasta, sallader och pizza enligt restaurangens egen sida.',
  core_experience = 'Bistro vid porten till skärgården på Värmdö – pizza, husmanskost och dagens lunch.',
  latitude = null,
  longitude = null,
  updated_at = now()
where slug = 'bistro-lillstromma'
returning slug, island, type, latitude;
