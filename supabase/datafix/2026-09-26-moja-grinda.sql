-- 2026-09-26: uppföljning av 2026-09-26-platstexter-legacy.sql.
--
-- Möja: Hamncafét och Möja Hamnbar delar Facebooksida och telefon i databasen, och texterna tömdes
-- i förra datafixen i väntan på källa. Möja turistförening listar dem som två olika ställen,
-- så ingen av dem döljs.
-- KÄLLA: visitmoja.se/äta-och-handla-på-möja/ (Möja turistförening, läst 2026-09-26):
--   "Hamnbaren – Pizza i en liten mysig sjöbod vid gästhamnen i Kyrkviken."
--   "Hamncafét – Café med glass och bullar samt cykeluthyrning."
--   "Jeppes – På spritbaronens gamla gård drivs ett bohemt och lite galet ställe."
--   "Möja slöjd – Charmig lada med lokalt hantverk och konst vid Jeppes i Långvik."
--   "sommartid dubbleras antalet matställen"
-- explorearchipelago.com/sv/sthlm/mellersta-skargarden/moja: "Jeppes Gästgiveri – Restaurang", "Möja Hamnbar – Restaurang".
--
-- Grinda: sjömackens kartpunkt låg cirka 900 m från gästhamnen, fast Grinda Wärdshus skriver att macken
-- ligger "i direkt anslutning till vår gästhamn" (grinda.se/hamn-mack/sjomack, läst 2026-09-26).
-- KÄLLA läge: OpenStreetMap/Nominatim, nod "Grinda sjömack" (amenity=fuel): 59.4151747, 18.5542641,
-- cirka 170 m från gästhamnens OSM-punkt (59.4142, 18.5557).

update restaurants set description = 'Möja Hamnbar serverar pizza i en sjöbod vid gästhamnen i Kyrkviken.', updated_at = now()
where slug = 'moja-hamnbar';

update restaurants set description = 'Hamncafét på Möja är ett kafé med glass och bullar, som också hyr ut cyklar.', updated_at = now()
where slug = 'hamncafet-moja';

update restaurants set name = 'Jeppes Gästgiveri',
  description = 'Jeppes Gästgiveri är en restaurang på spritbaronens gamla gård i Långvik på Möja.', updated_at = now()
where slug = 'jeppes-moja';

update restaurants set latitude = 59.4151747, longitude = 18.5542641, updated_at = now()
where slug = 'grinda-sjomack';
