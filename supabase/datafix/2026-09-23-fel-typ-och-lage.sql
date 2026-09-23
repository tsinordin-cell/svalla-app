-- 2026-09-23: poster med fel typ eller fel läge (Toms beslut: ta bort det som verkligen är fel, rätta läget).
-- Bara det som källorna visar entydigt ändras. Inget raderas.

-- ── Naturplatser som stod som restauranger → typ 'nature' (visas som "Naturplats") ──
-- KÄLLA https://www.lansstyrelsen.se/gotland/besoksmal/naturreservat/lilla-karlso.html
--   "Lilla Karlsö är en ö med fågelberg och fårbetade kalkhedar."
--   "Liksom på Storön finns här höga klintar med tusentals häckande alkfåglar"
--   "Lilla Karlsö ligger ca 3,5 km väster om Djupviks fiskeläge i Eksta. Färjetrafik går från Klintehamn."
--   Serviceinformation: "Informationstavla" och "Rast-/övernattningsstuga" — ingen servering.
update restaurants set type = 'nature',
  description = 'Lilla Karlsö är ett naturreservat, en ö med fågelberg och fårbetade kalkhedar där tusentals alkfåglar häckar på de höga klintarna. Ön ligger cirka 3,5 km väster om Djupviks fiskeläge i Eksta, och färjetrafik går från Klintehamn. På ön finns en rast- och övernattningsstuga.',
  updated_at = now() where slug = 'lilla-karlso-gotland' and type = 'restaurant';
-- KÄLLA https://gotland.com/companies/hoburgen/
--   "Där vägen tar slut vid Gotlands sydspets finns naturreservatet Husrygg med Hoburgen och den berömda Hoburgsgubben som under årtusenden har blickat ut över havet."
--   "Härifrån har man en vidunderlig utsikt över Östersjön."
update restaurants set type = 'nature',
  description = 'Hoburgen ligger där vägen tar slut vid Gotlands sydspets, i naturreservatet Husrygg. Här finns Hoburgsgubben, och platsen har utsikt över Östersjön.',
  updated_at = now() where slug = 'hoburgen-gotland' and type = 'restaurant';

-- ── Döljs: inte en restaurang ─────────────────────────────────────────────
-- KÄLLA https://www.mittvisby.se/platser/donners-plats/
--   "Donners plats är ett torg som ligger centralt i Visby innerstad med närhet till Almedalen och Gästhamnen samt till många av stadens sevärdheter, restauranger och hotell."
update restaurants set hidden_at = now(), hidden_reason = 'Ett torg i Visby, inte en restaurang' where slug = 'donners-plats-gotland' and hidden_at is null;

-- ── Fel läge ──────────────────────────────────────────────────────────────
-- kärran: punkten (57.6439, 11.7802) ligger på Brännö; ön stod "Asperö".
-- KÄLLA https://www.goteborg.com/en/guides/guide-eat-and-fika-in-gothenburgs-archipelago (Kärran listas under Brännö)
--   "This pink food truck serves Asian dishes with a Swedish twist, homemade pastries, juices and iced coffee."
update restaurants set island = 'Brännö', updated_at = now() where slug = 'karran' and island = 'Asperö';

-- lyckans-slip: stod som restaurang på Asperö (57.643, 11.799). Lyckans Slip är en marina i Fiskebäckskil på Skaftö.
-- KÄLLA https://hamn.lyckansslip.se/sv/Gasthamn
--   "Position: 58 grader 14,7', 11 grader 27,8' O"  => 58.24500, 11.46333
--   "Småbåtshamn i inre delen av Fiskebäckskil, ca 2 M sydost om Lysekil. Djup 2-6 meter."
--   "I hamnen finns ca: 40 gästplatser samt ca: 60 förhyrda platser"
-- KÄLLA https://www.svenskagasthamnar.se/norra-vastkusten/fiskebackskil-lyckans-slip/  "Restaurang Brygghuset", "Motorservice VolvoPenta"
-- KÄLLA https://www.vastsverige.com/en/lysekil/produkter/lyckans-slip/  "in the heart of Fiskebäckskil on Skaftö"
update restaurants set type = 'marina', island = 'Skaftö', archipelago_region = 'bohuslan',
  latitude = 58.24500, longitude = 11.46333, website = 'https://www.lyckansslip.se/',
  description = 'Lyckans Slip är en småbåtshamn och marina i inre delen av Fiskebäckskil på Skaftö, cirka 2 M sydost om Lysekil. Hamnen har ett djup på 2–6 meter och cirka 40 gästplatser, och vid hamnen finns motorservice och restaurangen Brygghuset.',
  updated_at = now() where slug = 'lyckans-slip';
