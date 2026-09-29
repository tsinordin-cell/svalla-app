-- 2026-09-23: "Café Öbergska" på Styrsö heter i dag Humlegården (Öbergska).
-- vastsverige.com/visitockero/oppetnu-restaurangguidegoteborgsskargard/: "Humlegården (Öbergska) – Styrsö Bratten",
--   "Restaurang och trädgårdsservering nära Styrsö Bratten. Traditionella rätter möter modernare influenser och här finns även fokus på öl."
-- goteborg.com/platser/cafe-obergska gav "Hoppsan! Den sidan saknas." och obergska.se svarar inte (DNS), så webbplatsen tas bort.
update restaurants set name = 'Humlegården (Öbergska)', website = null,
 description = 'Humlegården (Öbergska) är en restaurang med trädgårdsservering nära Styrsö Bratten i Göteborgs södra skärgård. Köket blandar traditionella rätter med modernare influenser, och här finns också fokus på öl.',
 updated_at = now()
where slug = 'caf-obergska';
