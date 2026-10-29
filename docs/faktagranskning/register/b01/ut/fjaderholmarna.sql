-- Faktagranskning batch 01 – Fjäderholmarna (Granskare/Skribent, 2026-10-29).
-- Körs av huvudsessionen. Varje UPDATE skriver bara över exakt det granskade värdet (gamla värdet i WHERE).
-- Kontrollerat med SELECT 2026-10-29: varje WHERE-villkor träffar exakt en rad.

-- restaurants.rokeriet-fjaderholmarna.latitude/longitude (fjaderholmarna-0290)
-- FÖRE: latitude 59.3208, longitude 18.1628 – ligger i Nacka Strand (Augustendalsvägen), 1,1 km från ön
-- KÄLLA: https://www.openstreetmap.org/node/1764542855 — "Rökeriet", "59.3294071", "18.1760774" (läst 2026-10-29)
-- KÄLLA: https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=59.3208&lon=18.1628&zoom=18 — "Augustendalsvägen, Vikdalen, Nacka Strand, Nacka, Nacka kommun" (läst 2026-10-29)
update restaurants set latitude = 59.3294071, longitude = 18.1760774
 where slug = 'rokeriet-fjaderholmarna' and latitude = 59.3208 and longitude = 18.1628;

-- restaurants.fjaderholmarna-bryggeri.latitude/longitude (fjaderholmarna-0283)
-- FÖRE: latitude 59.3283, longitude 18.175 – på ön men ca 90 m söder om bryggeriet
-- KÄLLA: https://www.openstreetmap.org/node/3237778866 — "Fjäderholmarnas Bryggeri", "59.3291303", "18.1751220" (läst 2026-10-29)
update restaurants set latitude = 59.3291303, longitude = 18.1751220
 where slug = 'fjaderholmarna-bryggeri' and latitude = 59.3283 and longitude = 18.175;

-- restaurants.fjaderholmarna-bryggeri.name (fjaderholmarna-0280)
-- FÖRE: 'Fjäderholmarnas Bryggeri Taproom'
-- KÄLLA: https://fjaderholmarnasbryggeri.se/fjaderholmarnas-bryggeri-at-sea — "Brewpub (at sea)", "Fjäderholmarnas Bryggeri" (läst 2026-10-29)
-- KÄLLA: https://www.fjaderholmarna.se/ — "(14) Fjäderholmarnas Bryggeri" (läst 2026-10-29)
update restaurants set name = 'Fjäderholmarnas Bryggeri'
 where slug = 'fjaderholmarna-bryggeri' and name = 'Fjäderholmarnas Bryggeri Taproom';

-- restaurants.fjaderholmarnas-gasthamn.description (fjaderholmarna-0305, N011, N012)
-- FÖRE: 'Gästhamnen ligger på Stora Fjäderholmen utanför Blockhusudden vid inloppet till Stockholm och har 35 gästplatser med förtöjning vid boj. Hamndjupet är mellan 1 och 8 meter, och dusch ingår. Hamnvärd är Sjöstation Fjäderholmarna.'
-- Hamndjupet är struket: djup får bara beläggas av Sjöfartsverket (nivå 1), Svenska Gästhamnar är nivå 3. Första meningen enligt SEO-regeln (namn, gästhamn, ort, kommun).
-- KÄLLA: https://www.svenskagasthamnar.se/stockholms-skargard/stockholm-fjaderholmarna/ (Svenska Gästhamnar, aggregator, nivå 3) — "På Stora Fjäderholmen utanför Blockhusudden vid inloppet till Stockholm.", "35 (1/5-31/9)", "boj", "Dusch ingår", "Sjöstation Fjäderholmarna, tel.08-716 39 10"; Eluttag, Färskvatten och Toalett är markerade med bock (ikon i sidans HTML) (läst 2026-10-29)
-- KÄLLA: https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=59.3290854&lon=18.174088&zoom=18 — "Lidingö kommun" (omvänd geokodning av postens egen koordinat, läst 2026-10-29)
update restaurants set description = 'Fjäderholmarnas gästhamn ligger på Stora Fjäderholmen i Lidingö kommun, utanför Blockhusudden vid inloppet till Stockholm. Hamnen har 35 gästplatser med förtöjning vid boj. Svenska Gästhamnar anger el, färskvatten, toalett och dusch, och duschen ingår. Hamnvärd är Sjöstation Fjäderholmarna.'
 where slug = 'fjaderholmarnas-gasthamn' and description = 'Gästhamnen ligger på Stora Fjäderholmen utanför Blockhusudden vid inloppet till Stockholm och har 35 gästplatser med förtöjning vid boj. Hamndjupet är mellan 1 och 8 meter, och dusch ingår. Hamnvärd är Sjöstation Fjäderholmarna.';
