-- 2026-09-23, omgång 3: text till de platser som saknade text (Toms beslut 2026-09-23: "ge dem text", SEO-anpassad).
-- Regel: första meningen säger namn, typ, ort och kommun. Inget påstås som inte går att belägga:
--   ort och kommun kommer från postens egen koordinat via OpenStreetMap (Nominatim reverse, zoom 14),
--   typ från postens typfält. Där en tillåten källa gav mer finns citatet vid raden.
-- Utan text (motsägelse i posten, frågas/granskas): bad, bastu-brf-doppingen, byxelkroks-marina-sea-resort-oland,
--   gotlands-bryggeri-gotland, lange-erik-oland, lange-jan-oland, m-s-sunnan-ii-aland, vrango-skargardscaf.

-- algebybadet: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Älgebybadet är en badplats vid Älgeby i Vallentuna kommun.', updated_at = now() where slug = 'algebybadet' and hidden_at is null and (description is null or description = '');
-- andra-pumpviken: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Andra pumpviken är en badplats vid Sofiero i Nynäshamn, Nynäshamns kommun.', updated_at = now() where slug = 'andra-pumpviken' and hidden_at is null and (description is null or description = '');
-- andys-thai: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Andys Thai är en restaurang i Ellös på Orust, Orust kommun.', updated_at = now() where slug = 'andys-thai' and hidden_at is null and (description is null or description = '');
-- asattra-marina: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Åsättra Marina är en hamn vid Åsättra på Ljusterö i Österåkers kommun.', updated_at = now() where slug = 'asattra-marina' and hidden_at is null and (description is null or description = '');
-- badberget: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Badberget är en badplats i Värmdö kommun.', updated_at = now() where slug = 'badberget' and hidden_at is null and (description is null or description = '');
-- badhuset: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Badhuset är en bastu på Källö-Knippla i Öckerö kommun.', updated_at = now() where slug = 'badhuset' and hidden_at is null and (description is null or description = '');
-- badplats-sabyviken: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set name = 'Badplats Säbyviken', description = 'Badplats Säbyviken är en badplats i Värmdö kommun, vid Evlinge och Ramsdalen.', updated_at = now() where slug = 'badplats-sabyviken' and hidden_at is null and (description is null or description = '');
-- bastuhuset: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Bastuhuset är en bastu i Värmdö kommun.', updated_at = now() where slug = 'bastuhuset' and hidden_at is null and (description is null or description = '');
-- bjorkuddens-bad: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Björkuddens bad är en badplats vid Tyresö strand i Tyresö kommun.', updated_at = now() where slug = 'bjorkuddens-bad' and hidden_at is null and (description is null or description = '');
-- blekets-bastu: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Blekets bastu är en bastu vid Bleket på Tjörn, Tjörns kommun.', updated_at = now() where slug = 'blekets-bastu' and hidden_at is null and (description is null or description = '');
-- bokhandlarens-pub: kostersweden.com/bokhandlarens-pub: "gedigen mat, hantverksöl och unika viner i en stämningsfull miljö precis vid havet", "Puben ligger vid Pensionat Bergdalen på Sydkoster."
update restaurants set description = 'Bokhandlarens pub ligger vid Pensionat Bergdalen på Sydkoster i Strömstads kommun och serverar mat, hantverksöl och viner vid havet.', updated_at = now() where slug = 'bokhandlarens-pub' and hidden_at is null and (description is null or description = '');
-- byxelkroks-hamn-oland: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23); borgholm.se listar "Byxelkroks hamn" bland kommunens hamnar
update restaurants set description = 'Byxelkroks hamn är en hamn i Byxelkrok på norra Öland, Borgholms kommun.', updated_at = now() where slug = 'byxelkroks-hamn-oland' and hidden_at is null and (description is null or description = '');
-- caf-obergska: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Café Öbergska är ett kafé på Styrsö i Göteborgs södra skärgård.', updated_at = now() where slug = 'caf-obergska' and hidden_at is null and (description is null or description = '');
-- dalenbadet: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Dalenbadet är en badplats i Saltsjöbaden, Nacka kommun.', updated_at = now() where slug = 'dalenbadet' and hidden_at is null and (description is null or description = '');
-- donso-hamnkrog: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Donsö Hamnkrog är en restaurang på Donsö i Göteborgs södra skärgård.', updated_at = now() where slug = 'donso-hamnkrog' and hidden_at is null and (description is null or description = '');
-- dyviken: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Dyviken är en badplats vid Mölnvik i Värmdö kommun.', updated_at = now() where slug = 'dyviken' and hidden_at is null and (description is null or description = '');
-- ekelofs-mat-bar: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Ekelöfs Mat & Bar är en restaurang på Smögen i Sotenäs kommun.', updated_at = now() where slug = 'ekelofs-mat-bar' and hidden_at is null and (description is null or description = '');
-- farnabben: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Fårnabben är en badplats vid Graninge i Boo, Nacka kommun.', updated_at = now() where slug = 'farnabben' and hidden_at is null and (description is null or description = '');
-- fem-knop-ab: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set name = 'Fem Knop', description = 'Fem Knop är en restaurang i Skärhamn på Tjörn, Tjörns kommun.', updated_at = now() where slug = 'fem-knop-ab' and hidden_at is null and (description is null or description = '');
-- fiskmyrans-badstrand: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Fiskmyrans badstrand är en badplats vid Hedvigsberg i Värmdö kommun.', updated_at = now() where slug = 'fiskmyrans-badstrand' and hidden_at is null and (description is null or description = '');
-- fjallbacka-bastuforening: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Fjällbacka Bastuförening har en bastu i Fjällbacka, Tanums kommun.', updated_at = now() where slug = 'fjallbacka-bastuforening' and hidden_at is null and (description is null or description = '');
-- fjordbastun: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Fjordbastun är en bastu i Uddevalla, Uddevalla kommun.', updated_at = now() where slug = 'fjordbastun' and hidden_at is null and (description is null or description = '');
-- flaskbergets-strand: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Fläskbergets strand är en badplats på Sandhamn i Värmdö kommun.', updated_at = now() where slug = 'flaskbergets-strand' and hidden_at is null and (description is null or description = '');
-- graddo-askens-bryggforening: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Gräddö-Askens Bryggförening har en brygga i Gräddö i Norrtälje kommun.', updated_at = now() where slug = 'graddo-askens-bryggforening' and hidden_at is null and (description is null or description = '');
-- grebbestadsgrannen-bistro-bar-ab: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set name = 'Grebbestadsgrannen Bistro & Bar', description = 'Grebbestadsgrannen Bistro & Bar är en restaurang i Grebbestad, Tanums kommun.', updated_at = now() where slug = 'grebbestadsgrannen-bistro-bar-ab' and hidden_at is null and (description is null or description = '');
-- guldbadans-batklubb: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Guldbådans Båtklubb har en hamn vid Guldboda i Haninge kommun.', updated_at = now() where slug = 'guldbadans-batklubb' and hidden_at is null and (description is null or description = '');
-- halleviksstrands-grill-glasscaf: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Hälleviksstrands Grill & Glasscafé är ett grillställe och glasskafé i Hälleviksstrand på Orust, Orust kommun.', updated_at = now() where slug = 'halleviksstrands-grill-glasscaf' and hidden_at is null and (description is null or description = '');
-- hamnkrogen: hamnkrogenmarstrand.se: "KÖK & BAR", "Lilla varvsgatan 20 44266 MARSTRAND", "Telefon: 0303 611 53" (samma telefon som posten)
update restaurants set description = 'Hamnkrogen är en restaurang med kök och bar på Lilla Varvsgatan 20 på Marstrand, Kungälvs kommun.', updated_at = now() where slug = 'hamnkrogen' and hidden_at is null and (description is null or description = '');
-- hamnmagasinet-aland: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Hamnmagasinet är en restaurang vid Vargata brygga på Vårdö, Åland.', updated_at = now() where slug = 'hamnmagasinet-aland' and hidden_at is null and (description is null or description = '');
-- hedersviken: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Hedersviken är en badplats vid Byholma nära Grisslehamn, Norrtälje kommun.', updated_at = now() where slug = 'hedersviken' and hidden_at is null and (description is null or description = '');
-- holo-klippbad: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Hölö klippbad är en badplats vid Stavsnäs i Värmdö kommun.', updated_at = now() where slug = 'holo-klippbad' and hidden_at is null and (description is null or description = '');
-- holo-restaurang: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Hölö Restaurang är en restaurang i Hölö, Södertälje kommun.', updated_at = now() where slug = 'holo-restaurang' and hidden_at is null and (description is null or description = '');
-- hono-klava-drivmedel: svenskagasthamnar.se/goteborgs-skargard/hono-klava/: "Diesel sjömack", "Bensin 2 km"
update restaurants set description = 'I Hönö Klåva gästhamn på Hönö, Öckerö kommun, finns diesel vid sjömacken. Bensin finns cirka två kilometer bort.', updated_at = now() where slug = 'hono-klava-drivmedel' and hidden_at is null and (description is null or description = '');
-- hoppbryggans-bad: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Hoppbryggans bad är en badplats vid Tyresö strand i Tyresö kommun.', updated_at = now() where slug = 'hoppbryggans-bad' and hidden_at is null and (description is null or description = '');
-- hotell-magasin1-morbylanga-oland: oland.se/en/stf-hotel-magasin-1: "a small, intimate hotel in Mörbylånga harbor", "This former harbor depot offers … accommodation with its own restaurant", "now has fifteen comfortable rooms"
update restaurants set name = 'Hotell Magasin 1', type = 'hotel', description = 'Hotell Magasin 1 är ett litet hotell med egen restaurang i ett före detta hamnmagasin i Mörbylånga hamn på Öland. Hotellet har femton rum.', updated_at = now() where slug = 'hotell-magasin1-morbylanga-oland' and hidden_at is null and (description is null or description = '');
-- kajplatsen-fisk-grill: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Kajplatsen Fisk & Grill är en restaurang på Hönö i Öckerö kommun.', updated_at = now() where slug = 'kajplatsen-fisk-grill' and hidden_at is null and (description is null or description = '');
-- kallbadhuset: friluftsframjandet.se/regioner/vast/lokalavdelningar/ljungskile/: "Föreningens medlemmar underhåller också Kallbadhuset som är en uppskattad samlingsplats"
update restaurants set description = 'Kallbadhuset i Ljungskile, Uddevalla kommun, underhålls av medlemmarna i Friluftsfrämjandets lokalavdelning i Ljungskile.', updated_at = now() where slug = 'kallbadhuset' and hidden_at is null and (description is null or description = '');
-- kalvhagens-bryggforening: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Kalvhagens bryggförening har en brygga vid Norrsund på Blidö, Norrtälje kommun.', updated_at = now() where slug = 'kalvhagens-bryggforening' and hidden_at is null and (description is null or description = '');
-- karran: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Kärran är en restaurang på Brännö i Göteborgs södra skärgård.', updated_at = now() where slug = 'karran' and hidden_at is null and (description is null or description = '');
-- kladesholmens-bastu: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Klädesholmens bastu är en bastu i Tjörns kommun.', updated_at = now() where slug = 'kladesholmens-bastu' and hidden_at is null and (description is null or description = '');
-- kolholm-sand: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Kolholm sand är en badplats vid Grebbestad i Tanums kommun.', updated_at = now() where slug = 'kolholm-sand' and hidden_at is null and (description is null or description = '');
-- korvan: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Korvan är en restaurang i Skärhamn på Tjörn, Tjörns kommun.', updated_at = now() where slug = 'korvan' and hidden_at is null and (description is null or description = '');
-- lacka-nynashamns-segelsallskap: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23); namnet anger föreningen
update restaurants set description = 'Lacka är Nynäshamns Segelsällskaps hamn i Haninge kommun.', updated_at = now() where slug = 'lacka-nynashamns-segelsallskap' and hidden_at is null and (description is null or description = '');
-- langedrag-bransle: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Långedrag bränsle är ett tankställe i Långedrag i Göteborg.', updated_at = now() where slug = 'langedrag-bransle' and hidden_at is null and (description is null or description = '');
-- langestrand: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Långestrand är en badplats vid Ammenäs i Uddevalla kommun.', updated_at = now() where slug = 'langestrand' and hidden_at is null and (description is null or description = '');
-- langviks-yttre-gasthamn: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Långviks yttre gästhamn ligger vid Långvik på Möja, Värmdö kommun.', updated_at = now() where slug = 'langviks-yttre-gasthamn' and hidden_at is null and (description is null or description = '');
-- larsson-karlsson: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Larsson & Karlsson är en restaurang i Tjörns kommun.', updated_at = now() where slug = 'larsson-karlsson' and hidden_at is null and (description is null or description = '');
-- lilla-haket-ninas-bod: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Lilla Haket & Ninas Bod är ett kafé i Gruvbyn på Utö, Haninge kommun.', updated_at = now() where slug = 'lilla-haket-ninas-bod' and hidden_at is null and (description is null or description = '');
-- lilla-sand: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Lilla Sand är en badplats i Haninge kommun.', updated_at = now() where slug = 'lilla-sand' and hidden_at is null and (description is null or description = '');
-- lilla-trouville-stranden: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Lilla Trouville är en strand på Sandhamn i Värmdö kommun.', updated_at = now() where slug = 'lilla-trouville-stranden' and hidden_at is null and (description is null or description = '');
-- loknasudds-gard-och-marina-ab: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set name = 'Löknäsudds Gård & Marina', description = 'Löknäsudds Gård & Marina är en hamn på Gällnö i Värmdö kommun.', updated_at = now() where slug = 'loknasudds-gard-och-marina-ab' and hidden_at is null and (description is null or description = '');
-- madam-koko: madamkoko.com: "MADAM KOKO, HAMNGATAN 19A, 45631 KUNGSHAMN 0523-32000" (samma telefon som posten)
update restaurants set description = 'Madam Koko är en restaurang på Hamngatan 19A i Kungshamn, Sotenäs kommun.', updated_at = now() where slug = 'madam-koko' and hidden_at is null and (description is null or description = '');
-- marstrand-drivmedel: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Marstrand drivmedel är ett tankställe på Marstrand, Kungälvs kommun.', updated_at = now() where slug = 'marstrand-drivmedel' and hidden_at is null and (description is null or description = '');
-- muskan: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Muskan är en badplats vid Ösmo i Nynäshamns kommun.', updated_at = now() where slug = 'muskan' and hidden_at is null and (description is null or description = '');
-- nasets-klippbad: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Näsets klippbad är en badplats vid Stavsnäs i Värmdö kommun.', updated_at = now() where slug = 'nasets-klippbad' and hidden_at is null and (description is null or description = '');
-- nosunds-vardshus: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Nösunds Värdshus är en restaurang i Nösund på Orust, Orust kommun.', updated_at = now() where slug = 'nosunds-vardshus' and hidden_at is null and (description is null or description = '');
-- ornsand: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Örnsand är en badplats vid Åsvik i Haninge kommun.', updated_at = now() where slug = 'ornsand' and hidden_at is null and (description is null or description = '');
-- ostersjoviksens-badplats: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Östersjövikens badplats är en badplats vid Stavsnäs i Värmdö kommun.', updated_at = now() where slug = 'ostersjoviksens-badplats' and hidden_at is null and (description is null or description = '');
-- pizzaverket: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Pizzaverket är en restaurang i Hamburgsund, Tanums kommun.', updated_at = now() where slug = 'pizzaverket' and hidden_at is null and (description is null or description = '');
-- porsangen: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Porsängen är en badplats vid Återvall i Värmdö kommun.', updated_at = now() where slug = 'porsangen' and hidden_at is null and (description is null or description = '');
-- pub-niska-sjokvarteret-aland: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Pub Niska är en restaurang i Sjökvarteret i Mariehamn på Åland.', updated_at = now() where slug = 'pub-niska-sjokvarteret-aland' and hidden_at is null and (description is null or description = '');
-- radmanby-hamn: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Rådmanby hamn ligger vid Rådmanby nära Gräddö, Norrtälje kommun.', updated_at = now() where slug = 'radmanby-hamn' and hidden_at is null and (description is null or description = '');
-- ragosand: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Rågösand är en badplats vid Hamburgsund i Tanums kommun.', updated_at = now() where slug = 'ragosand' and hidden_at is null and (description is null or description = '');
-- ravstavik: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Rävstavik är en badplats nära Gruvbyn på Utö, Haninge kommun.', updated_at = now() where slug = 'ravstavik' and hidden_at is null and (description is null or description = '');
-- restaurang-fregatten: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Restaurang Fregatten är en restaurang i Kungshamn, Sotenäs kommun.', updated_at = now() where slug = 'restaurang-fregatten' and hidden_at is null and (description is null or description = '');
-- restaurang-kroken: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Restaurang Kroken är en restaurang i Fjällbacka, Tanums kommun.', updated_at = now() where slug = 'restaurang-kroken' and hidden_at is null and (description is null or description = '');
-- risbaren: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Risbaren är en restaurang på Hönö i Öckerö kommun.', updated_at = now() where slug = 'risbaren' and hidden_at is null and (description is null or description = '');
-- rorviksbadet: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Rörviksbadet är en badplats vid Näset i Göteborg.', updated_at = now() where slug = 'rorviksbadet' and hidden_at is null and (description is null or description = '');
-- salt-och-sill-hotell-konferens-och-restaurang-bohuslan: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23); verksamheten anges i namnet
update restaurants set description = 'Salt & Sill är hotell, konferens och restaurang i Tjörns kommun.', updated_at = now() where slug = 'salt-och-sill-hotell-konferens-och-restaurang-bohuslan' and hidden_at is null and (description is null or description = '');
-- salviken: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Sälviken är en badplats vid Simpnäs i Norrtälje kommun.', updated_at = now() where slug = 'salviken' and hidden_at is null and (description is null or description = '');
-- sand-namdo-brygga: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Sand är en brygga på Nämdö i Värmdö kommun.', updated_at = now() where slug = 'sand-namdo-brygga' and hidden_at is null and (description is null or description = '');
-- smogen-drivmedel: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Smögen drivmedel är ett tankställe på Smögen, Sotenäs kommun.', updated_at = now() where slug = 'smogen-drivmedel' and hidden_at is null and (description is null or description = '');
-- sodersjon: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Södersjön är en badplats i Eckerö på Åland.', updated_at = now() where slug = 'sodersjon' and hidden_at is null and (description is null or description = '');
-- sodra-badet: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Södra Badet är en badplats i Huddinge kommun.', updated_at = now() where slug = 'sodra-badet' and hidden_at is null and (description is null or description = '');
-- stenstrand: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Stenstrand är en badplats vid Västberga i Nynäshamns kommun.', updated_at = now() where slug = 'stenstrand' and hidden_at is null and (description is null or description = '');
-- stora-sand: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Stora Sand är en badplats i Haninge kommun.', updated_at = now() where slug = 'stora-sand' and hidden_at is null and (description is null or description = '');
-- stora-sandvik: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Stora Sandvik är en badplats vid Krokarna i Haninge kommun.', updated_at = now() where slug = 'stora-sandvik' and hidden_at is null and (description is null or description = '');
-- stora-trouvillestranden: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Stora Trouville är en strand på Sandhamn i Värmdö kommun.', updated_at = now() where slug = 'stora-trouvillestranden' and hidden_at is null and (description is null or description = '');
-- storsand: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Storsand är en badplats vid Lättinge i Haninge kommun.', updated_at = now() where slug = 'storsand' and hidden_at is null and (description is null or description = '');
-- stromstad-cafe-och-bistro-ab: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set name = 'Strömstad café och bistro', description = 'Strömstad café och bistro är ett kafé och bistro i Strömstad, Strömstads kommun.', updated_at = now() where slug = 'stromstad-cafe-och-bistro-ab' and hidden_at is null and (description is null or description = '');
-- stromstad-gasthamn-drivmedel: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Strömstad gästhamn drivmedel är ett tankställe vid gästhamnen i Strömstad.', updated_at = now() where slug = 'stromstad-gasthamn-drivmedel' and hidden_at is null and (description is null or description = '');
-- stromstads-bastusallskap: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Strömstads Bastusällskap har en bastu i Strömstad, Strömstads kommun.', updated_at = now() where slug = 'stromstads-bastusallskap' and hidden_at is null and (description is null or description = '');
-- suntrip-bar-gotland: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'SunTrip Bar är en bar i Visby på Gotland.', updated_at = now() where slug = 'suntrip-bar-gotland' and hidden_at is null and (description is null or description = '');
-- talluddens-bad: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Talluddens bad är en badplats på Brevikshalvön i Tyresö kommun.', updated_at = now() where slug = 'talluddens-bad' and hidden_at is null and (description is null or description = '');
-- tant-anton: tantanton.se: "Hos oss vill vi ge er lite av allt serverat i mindre rätter som man delar. Vi kallar det för \"sharing\"", "Strandpromenaden, 456 31 Kungshamn … Tel. 0523-380 00" (samma telefon som posten)
update restaurants set description = 'Tant Anton är en restaurang på Strandpromenaden i Kungshamn, Sotenäs kommun. Maten serveras som mindre rätter att dela, det restaurangen kallar sharing.', updated_at = now() where slug = 'tant-anton' and hidden_at is null and (description is null or description = '');
-- tjusviks-hamn: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Tjusviks hamn ligger vid Tjusvik på Nämdö, Värmdö kommun.', updated_at = now() where slug = 'tjusviks-hamn' and hidden_at is null and (description is null or description = '');
-- torsbybadet: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Torsbybadet är en badplats vid Torsby i Värmdö kommun.', updated_at = now() where slug = 'torsbybadet' and hidden_at is null and (description is null or description = '');
-- tralhavsstrand: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Trälhavsstrand är en badplats vid Västra Skägga i Värmdö kommun.', updated_at = now() where slug = 'tralhavsstrand' and hidden_at is null and (description is null or description = '');
-- tubbevikens-bad-bastu: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Tubbevikens Bad & Bastu är en bastu i Skärhamn på Tjörn, Tjörns kommun.', updated_at = now() where slug = 'tubbevikens-bad-bastu' and hidden_at is null and (description is null or description = '');
-- tunanas-bastun: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Tunanäs bastun är en bastu vid Örsta i Södertälje kommun.', updated_at = now() where slug = 'tunanas-bastun' and hidden_at is null and (description is null or description = '');
-- vansviken: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Vänsviken är en badplats i Haninge kommun.', updated_at = now() where slug = 'vansviken' and hidden_at is null and (description is null or description = '');
-- vasterudde-strand: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Västerudde strand är en badplats på Sandhamn i Värmdö kommun.', updated_at = now() where slug = 'vasterudde-strand' and hidden_at is null and (description is null or description = '');
-- vaxholms-hembygdsgards-cafe: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Vaxholms Hembygdsgårds Café är ett kafé i Vaxholm, Vaxholms kommun.', updated_at = now() where slug = 'vaxholms-hembygdsgards-cafe' and hidden_at is null and (description is null or description = '');
-- yings-restaurang: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Yings Restaurang är en restaurang i Lysekil, Lysekils kommun.', updated_at = now() where slug = 'yings-restaurang' and hidden_at is null and (description is null or description = '');
-- yu-mi: läge från postens koordinat, kommun och ort via OpenStreetMap (Nominatim reverse, 2026-09-23)
update restaurants set description = 'Yu&Mi är en restaurang i Lysekil, Lysekils kommun.', updated_at = now() where slug = 'yu-mi' and hidden_at is null and (description is null or description = '');

-- Toms beslut 2026-09-23: "Myrstigsbadet, ta bort." Dold (går att återställa), ingen Google-trafik.
update restaurants set hidden_at = now(), hidden_reason = 'Toms beslut 2026-09-23: finns inte ("Myrstigsbadet, ta bort.")' where slug = 'myrstigsbadet' and hidden_at is null;
-- salt-sill: samma verksamhet som salt-och-sill-hotell-konferens-och-restaurang-bohuslan, men utan webbplats/telefon och med
--   koordinat ca 3,5 km från Klädesholmen (OSM: Rösseldalen, Skärhamn). Dold, 308 i middleware.
update restaurants set hidden_at = now(), hidden_reason = 'Dubblett av salt-och-sill-hotell-konferens-och-restaurang-bohuslan (läge ca 3,5 km fel, saknade webbplats och telefon)' where slug = 'salt-sill' and hidden_at is null;
