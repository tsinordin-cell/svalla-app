-- 2026-09-22: svenska platsnamn stavade utan å/ä/ö i namn och ö-fält.
--
-- MÄTT via scripts/granska-platser.mjs och SQL 2026-09-22: 25 rader hade namn
-- som "Stromstad Gasthamn", "Aspoe Krogen", "Utlaengan Naturhamn" och
-- "Namndö Restaurang". Det är samma sorts fel som en kartimport ger när
-- diakriterna tappas bort. Besökaren ser stavfelet direkt, och sökningen på
-- "Strömstad" hittar inte raden.
--
-- Bara stavningen ändras. Inga rader raderas, inga fält töms, och slug lämnas
-- orörd så att befintliga länkar fortsätter fungera.

update restaurants set name = replace(name, 'Gasthamn', 'Gästhamn'), updated_at = now()
where hidden_at is null and name like '%Gasthamn%';

update restaurants set
  name = replace(replace(replace(replace(replace(replace(replace(replace(replace(
           name, 'Stromstad', 'Strömstad'), 'Aspoe', 'Aspö'), 'Hassloe', 'Hasslö'),
           'Tjurkoe', 'Tjurkö'), 'Utlaengan', 'Utlängan'), 'Namndö', 'Nämndö'),
           'Nynashamn', 'Nynäshamn'), 'Huvudskar', 'Huvudskär'), 'Fjallbacka', 'Fjällbacka'),
  updated_at = now()
where hidden_at is null and name ~ '(Stromstad|Aspoe|Hassloe|Tjurkoe|Utlaengan|Namndö|Nynashamn|Huvudskar|Fjallbacka)';

-- "Orno" → "Ornö" bara som eget ord, så att inte t.ex. "Bornö" träffas.
update restaurants set name = regexp_replace(name, '\mOrno\M', 'Ornö', 'g'), updated_at = now()
where hidden_at is null and name ~ '\mOrno\M';

update restaurants set
  island = replace(replace(replace(replace(replace(replace(replace(replace(replace(
           island, 'Stromstad', 'Strömstad'), 'Aspoe', 'Aspö'), 'Hassloe', 'Hasslö'),
           'Tjurkoe', 'Tjurkö'), 'Utlaengan', 'Utlängan'), 'Namndö', 'Nämndö'),
           'Nynashamn', 'Nynäshamn'), 'Huvudskar', 'Huvudskär'), 'Fjallbacka', 'Fjällbacka'),
  updated_at = now()
where hidden_at is null and island ~ '(Stromstad|Aspoe|Hassloe|Tjurkoe|Utlaengan|Namndö|Nynashamn|Huvudskar|Fjallbacka)';

update restaurants set island = regexp_replace(island, '\mOrno\M', 'Ornö', 'g'), updated_at = now()
where hidden_at is null and island ~ '\mOrno\M';

-- Vaxholms Fästning Café pekade på Vaxholms Hembygdsgårds Café på Facebook —
-- en annan verksamhet. KÄLLA: Vaxholms Fästnings Museum, Besöksinfo 2026,
-- https://www.vaxholmsfastning.se/besoksinfo/ — "Fika och äta: enkelt café
-- finns i museets reception" (läst 2026-09-22).
update restaurants set website = 'https://www.vaxholmsfastning.se/besoksinfo/', updated_at = now()
where slug = 'vaxholms-fastning-cafe';
