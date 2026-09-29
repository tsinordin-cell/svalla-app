-- 2026-09-23: Dölj påhittade poster från importen 2026-05-08.
-- Reversibelt: hidden_at sätts, inget raderas.
--
-- BEVIS (mätt i databasen 2026-09-23):
--  * Ingen av raderna har webbplats, telefon eller google_place_id (ingen källa).
--  * Olika "verksamheter" i samma ort delar exakt samma koordinat
--    (t.ex. Strömstad Gästhamn / Strömstad Bensinstation / Strömstad Restaurang,
--    Torhamn Gästhamn / Torhamn Bensin / Torhamn Restaurang, Karlskrona Bensin /
--    Karlskrona Restaurang / Karlskrona Naturreservat) = platshållarkoordinater.
--  * Beskrivningarna är skrivna utan å/ä/ö och innehåller påståenden utan källa
--    ("Chef fran Norge", "Kite- och windsurfing-centrum", "Bast pa Kosteroarna").
--  * Systerrader ur samma import (aspoe-gasthamn, karlskrona-gasthamn,
--    fjallbacka-restaurang) var redan dolda.
-- Undantag: grebbestad-bensinstation (rättad med källa grebbestadseaport.se) lämnas.
update restaurants
set hidden_at = now(),
    hidden_reason = 'Påhittad post från import 2026-05-08: ingen källa, platshållarkoordinat, ogrundad beskrivning'
where hidden_at is null
  and created_at::date = '2026-05-08'
  and website is null and phone is null and google_place_id is null
  and slug in (
    'aspoe-krogen','aspoe-naturhamn','hassloe-gasthamn','karlshamn-gasthamn','karlskrona-bensin',
    'karlskrona-naturreservat','karlskrona-restaurang','kristianopel-bensin','kristianopel-gasthamn',
    'nogersund-naturhamn','tjurkoe-gasthamn','torhamn-bensin','torhamn-gasthamn','torhamn-restaurang',
    'utlaengan-naturhamn','fjallbacka-bensinstation','havstenssund-naturhamn','kastinget-marina',
    'kosterfjaorden-anchorage','nord-koster-naturhamn','nordvik-marina','ramsvik-naturhamn',
    'stromstad-bensinstation','stromstad-gasthamn','stromstad-restaurang','syd-koster-gasthamn'
  );
