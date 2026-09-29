-- 2026-09-23: "Vrångö Skärgårdscafé" heter i dag Ternan Restaurang & Glassbar.
-- Skärgårdens Cafés egen Instagram-profil (skärmbild från Tom 2026-09-23): "Säsongen 2023 lämnar vi över cafet i ny regi.
--   Restaurang Ternan tar över i våra fina lokaler."
-- vastsverige.com/visitockero/oppetnu-restaurangguidegoteborgsskargard/: "Ternan Restaurang & Glassbar – Vrångö Mittvik",
--   "Restaurang och glassbar vid färjeläget med fokus på fisk och skaldjur. Här finns även vegetariska/veganska alternativ, fika och glass.",
--   "Telefon: 070-469 04 49"
-- Läge: posten låg på Styrsö (57.6094, 11.7672). Nytt läge från OpenStreetMap "Restaurang Ternan, 4, Mittviksvägen, … Vrångö" (57.5704261, 11.7905315), geokodad.
update restaurants set name = 'Ternan Restaurang & Glassbar', phone = '070-469 04 49', latitude = 57.5704261, longitude = 11.7905315, island = 'Vrångö',
 description = 'Ternan Restaurang & Glassbar är en restaurang och glassbar vid färjeläget i Mittvik på Vrångö i Göteborgs södra skärgård, i lokalerna där Skärgårdens Café låg fram till 2023. Fokus ligger på fisk och skaldjur, och här finns också vegetariska och veganska rätter, fika och glass.',
 updated_at = now()
where slug = 'vrango-skargardscaf';
