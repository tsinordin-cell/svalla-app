-- 2026-09-21: två platser i Stockholms skärgård hade fått data från en
-- FINSK Google Places-träff.
--
-- MÄTT (Supabase, 2026-09-21):
--   skatudden-cafe-hamn (lat 59.19, lng 18.70, Nämndö):
--     formatted_address = 'Mastgatan 1, 00160 Helsingfors, Finland'
--     website = portofhelsinki.fi … katajanokan-terminaali (en färjeterminal i Helsingfors)
--     google_rating 3.0 (3 omdömen) och 6 fotoreferenser — från samma finska träff.
--     Platssidan länkade alltså "se aktuella tider" till Helsingfors hamn och
--     visade betyg och bilder från en annan plats.
--   buskudden (lat 59.44, lng 18.32):
--     formatted_address = 'Buskudden, Pargas, Finland' + finskt google_place_id.
--
-- Här töms bara fälten som kom från fel träff. Raderna finns kvar.
-- Skatuddens beskrivning ("Lantligt café vid Skatuddens gästhamn … Baggensfjärden")
-- har ingen källa och är flaggad för granskning — inte ändrad här.

update restaurants set
  formatted_address = null,
  website = null,
  google_rating = null,
  google_ratings_total = null,
  google_place_id = null,
  google_photo_refs = null,
  updated_at = now()
where slug = 'skatudden-cafe-hamn'
returning slug, website, google_place_id;

update restaurants set
  formatted_address = null,
  google_place_id = null,
  updated_at = now()
where slug = 'buskudden'
returning slug, formatted_address, google_place_id;
