-- trips.duration_seconds — exakt tid i sekunder (2026-09-10, "det synliga").
--
-- trips.duration är MINUTER (avrundat), vilket räcker för kortet men inte
-- för tursidan: en tur på 17 min 34 s visades som "18min". /spara har
-- sekunderna (elapsed) och skriver dem hit. Gamla turer saknar värdet;
-- tursidan faller då tillbaka på ended_at - started_at när det stämmer
-- med duration inom 90 s, annars duration * 60.
alter table public.trips
  add column if not exists duration_seconds integer;

comment on column public.trips.duration_seconds is
  'Turens längd i sekunder (elapsed i /spara, exkl. tid appen var stängd). null för turer sparade före 2026-09-10.';
