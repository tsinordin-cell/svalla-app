-- 2026-09-23: platser där webbplatsen gick till fel verksamhet eller var död (upptäckt i block 5).
-- Varje ändring bygger på en källa; citaten kontrollerade mot ny hämtning (Playwright 2026-09-23,
-- Kungälvs PDF via pdftotext). Inget raderas — dolda rader får hidden_at + hidden_reason.

-- ── Namnbyten / felregistreringar ─────────────────────────────────────────
-- haro-krog: länken 59north18east.com går nu till rogummerholmen.se.
-- KÄLLA https://www.rogummerholmen.se/
--   "Rök, Bak, Eld. @59N18E (fd Harö Natur)"
--   "RO ligger på den lilla ön Gummerholmen i Stockholms skärgård."
--   "En längre matresa genom Sverige där elden sätter prägel på maten"
--   "Femrättersmeny - smaken i centrum, serveras till samtliga i sällskapet"
--   "Pizza - med olika toppings vid sidan av"
--   "Restauranggäster: Hit kommer du med egen båt eller taxibåt, bryggplats behöver ej förbokas."
update restaurants set name = 'RO Gummerholmen', website = 'https://www.rogummerholmen.se/',
  description = 'RO ligger på den lilla ön Gummerholmen i Stockholms skärgård, tidigare Harö Natur, och har tre kök samt boende. Eld erbjuder en längre matresa genom Sverige där elden präglar maten, Rök serverar en femrättersmeny och Bak serverar pizza. Restauranggäster kommer med egen båt eller taxibåt.',
  updated_at = now() where slug = 'haro-krog';

-- rafsnas-sjokrog: webbplats och telefon (070 271 46 89) tillhör Bryggan Bar i Räfsnäs hamn.
-- KÄLLA https://brygganbar.se/
--   "Välkommen till BRYGGAN BAR i Räfsnäs hamn!"
--   "Vill du äta hemma? Ring 070 271 46 89 och beställ pizza."
--   "Vi serverar italiensk pizza, soft serve gelato (italiensk mjukglass) och har fullständiga rättigheter."
update restaurants set name = 'Bryggan Bar', website = 'https://brygganbar.se/',
  description = 'Bryggan Bar ligger i Räfsnäs hamn och serverar italiensk pizza och soft serve gelato, italiensk mjukglass. Baren har fullständiga rättigheter, och pizza kan även beställas för avhämtning.',
  updated_at = now() where slug = 'rafsnas-sjokrog';

-- lasses-krog: telefon (0303-611 22) och koordinater (57.886, 11.585 = Marstrand) stämmer med Lasse-Majas Krog.
-- Ön "Klädesholmen" var fel (Klädesholmen ligger vid 57.945, 11.55) — mätt.
-- KÄLLA https://www.lassemajaskrog.se/
--   "På Marstrandsön, med kajens bästa läge, hittar ni Lasse-Majas Krog."
--   "Menyn influeras och inspireras av smaker från världen, Skandinavien och årstiderna."
--   "Vi gör vårat bästa med att använda råvaror från Sverige."
update restaurants set name = 'Lasse-Majas Krog', island = 'Marstrand', website = 'https://www.lassemajaskrog.se/',
  description = 'Lasse-Majas Krog är en restaurang vid kajen på Marstrandsön. Menyn är inspirerad av smaker från världen, Skandinavien och årstiderna, med råvaror från Sverige.',
  updated_at = now() where slug = 'lasses-krog';

-- tofta-strand-gotland: gotland.com-länken beskrev stranden, inte restaurangen. Telefonen i posten stämde inte.
-- KÄLLA https://toftastrand.se/
--   "Pensionatet ligger 50 meter från den populära stranden i Tofta på Gotland."
--   "Precis ovanför stranddynerna på välkända Tofta strand"
--   "Den UNESCO-listade medeltidsstaden Visby ligger 17 km norrut."
--   Telefon 0498-29 70 60 står på sidan (kontrollerat 2026-09-23).
update restaurants set name = 'Tofta Strandpensionat & Restaurang', website = 'https://toftastrand.se/', phone = '+46 498 29 70 60',
  description = 'Tofta Strandpensionat & Restaurang ligger ovanför stranddynerna vid Tofta strand på Gotland, 17 km söder om Visby. Restaurangen har uteservering och serverar frukostbuffé, dagens lunch och middag à la carte. Pensionatet ligger 50 meter från stranden.',
  updated_at = now() where slug = 'tofta-strand-gotland';

-- styrso-sjomack: christensson.se är J.Christensson Oljefirma, inte macken. Punkten (57.619, 11.761) ligger på Styrsö — mätt.
-- KÄLLA https://www.styrsosjomack.info/
--   "Diesel Blank och Diesel Färgad, Bensin 98, HVO & ECOPAR."
--   "Alkylatbensin, 2-takt/4-takt, glykol och smörjmedel för både små och stora motorer."
--   "Hos oss hittar du flytvästar för både vuxna och barn, fendrar, tampar, rep, spännband och solglasögon."
--   "Glass, dryck & snacks för stora och små kaptener."
update restaurants set island = 'Styrsö', website = 'https://www.styrsosjomack.info/',
  description = 'Styrsö Sjömack säljer diesel, bensin, HVO, alkylatbensin, gasol och oljor samt båttillbehör som flytvästar, fendrar, tampar och reservdelar. Det finns även en kiosk med glass, dryck och snacks.',
  updated_at = now() where slug = 'styrso-sjomack';

-- ── Aktiva verksamheter: text från regional turistorganisation, döda länkar ersatta ──
-- KÄLLA https://www.vastsverige.com/foretagprodukter/goteborg/branno-vardshus/
--   "Restaurangens meny speglas av närheten till havet, med fisk och skaldjur som självklara inslag."
--   "I de mysiga små rummen i den gamla lotsbostaden eller i glashus-paviljongen kan du njuta av god mat med inspiration från havet."
--   "Önskar du något lättare att äta kan du besöka Brännö Värdshus egna bageri som håller öppet under sommaren."
--   "På värdshuset kan du övernatta i något av gästrummen eller på pensionat Baggen."
update restaurants set description = 'Brännö Värdshus är en restaurang på Brännö vars meny präglas av närheten till havet, med fisk och skaldjur. Maten serveras i den gamla lotsbostaden eller i en glashuspaviljong, och till värdshuset hör ett café och ett eget bageri som har öppet under sommaren. Övernattning finns i gästrum och på pensionat Baggen.',
  updated_at = now() where slug = 'branno-vardshus' and description is null;

-- KÄLLA https://www.vastsverige.com/sotenas/produkter/henrik-olssons-fiskaffar/
--   "Fiskaffären har funnits och levererat havets läckerheter i ca 55 år."
--   "På sommaren är även sjökrogen öppen."
update restaurants set description = 'Sjökrogen hör till Henrik Olssons Fiskaffär i Hunnebostrand, som har funnits i omkring 55 år. Sjökrogen har öppet på sommaren.',
  updated_at = now() where slug = 'henrik-s-sjokrog' and description is null;

-- KÄLLA https://www.vastsverige.com/visitockero/produkter/lilling-cottage/
--   "Lilling Cottage ligger beläget i Hönö Klåva hamn och här finner du såväl en butik med vackra blommor, växter och inredning som en mysig restaurang med säsongsbaserad mat och lokala råvaror."
--   "Lilling Cottage startade som en blomsterbutik för över 25 år sedan."
--   "I samma lokal finns sedan 2011 även en restaurang."
update restaurants set description = 'Lilling Cottage ligger i Hönö Klåva hamn och är en kombinerad butik och restaurang. Butiken har blommor, växter och inredning, och restaurangen serverar säsongsbaserad mat med lokala råvaror. Verksamheten startade som blomsterbutik för över 25 år sedan och har sedan 2011 även en restaurang.',
  updated_at = now() where slug = 'lilling-cottage-ab' and description is null;

-- sandviks-hamnkrog.se svarar 404 (mätt två gånger). Länken ersätts med Ölands turistorganisations sida.
-- KÄLLA https://www.oland.se/sandviks-hamnkrog
--   "Sandviks Hamnkrog är en restaurang precis vid hamnen i Sandvik."
--   "Här träffas du av en fantastisk uteservering med utsikt över havet och solnedgången."
--   "Här har du en gemytlig restaurang där det serveras en vällagad meny med råvaror som är noggrant utvalda efter säsong."
--   "Till detta erbjuds fina viner, kall öl och läskande drinkar."
update restaurants set website = 'https://www.oland.se/sandviks-hamnkrog',
  description = 'Sandviks Hamnkrog är en restaurang vid hamnen i Sandvik på Öland, med uteservering och utsikt över havet. Menyn bygger på råvaror som väljs efter säsong, och här serveras även vin, öl och drinkar.',
  updated_at = now() where slug = 'sandviks-hamnkrog-oland';

-- skargarn.se omdirigerar till en tredjepartskatalog (mätt). Länken ersätts med Västsveriges sida.
-- KÄLLA https://www.vastsverige.com/tjorn/produkter/skargarn-bar-restaurang/
--   "Njut av en god glass eller lättare lunch ute på bryggan, eller slå dig ner i restaurangen och ät en god middag."
--   "Här har du utsikt över sundet mellan Rönnäng och Tjörnekalv som sommartid är vältrafikerat av fritidsbåtar."
--   "Färjan som går året runt till Åstol, Dyrön och Tjörnekalv har sin hållplats här."
update restaurants set website = 'https://www.vastsverige.com/tjorn/produkter/skargarn-bar-restaurang/',
  description = 'Skärgår´n Bar & Restaurang ligger på Rönnängs brygga på Tjörn. På bryggan serveras glass och lättare lunch och i restaurangen middag, med utsikt över sundet mellan Rönnäng och Tjörnekalv. Färjan till Åstol, Dyrön och Tjörnekalv har sin hållplats här.',
  updated_at = now() where slug = 'skargarn-bar-restaurang';

-- kallvikens-bastu: bastun hyrs via Grinda Wärdshus; svenska sidan i stället för /en/.
-- KÄLLA https://grinda.se/aktiviteter/  "Bastu / Sauna Källviken 1 tim / hour 1-4 pers."
update restaurants set website = 'https://grinda.se/aktiviteter/', updated_at = now() where slug = 'kallvikens-bastu';

-- ── Felaktiga länkar tömda ───────────────────────────────────────────────
--   badhuset: länken gick till Lundbybadet på Hisingen (goteborg.se), inte till punkten vid Källö-Knippla.
--   lilla-karlso-gotland: länken (storakarlso.se/.../lilla-karlso/) svarar 404.
update restaurants set website = null, updated_at = now() where slug in ('badhuset', 'lilla-karlso-gotland');

-- ── Döljs (finns inte som besöksplats) ───────────────────────────────────
-- marstrands-kallbadhus: KÄLLA Kungälvs kommun, samrådsredogörelse detaljplan för kallbadhus och hotell (granskning 2025):
--   "funnits kallbadhus tidigare på platsen" / "möjliggör bland annat uppförande av ett kallbadhus"
--   => det finns inget kallbadhus i drift i dag; ett nytt är planerat.
update restaurants set hidden_at = now(), hidden_reason = 'Inget kallbadhus i drift; nytt planeras (Kungälvs kommun, detaljplan 2025)' where slug = 'marstrands-kallbadhus' and hidden_at is null;
-- alice-foodtruck-skarhamn: KÄLLA https://alicefoodtruck.se/  "Vi utgår från Göteborg och kör uppdrag från Malmö till Falun."
--   => bokningsbar catering-foodtruck utan fast plats i Skärhamn.
update restaurants set hidden_at = now(), hidden_reason = 'Mobil cateringfoodtruck utan fast plats (egen webbplats)' where slug = 'alice-foodtruck-skarhamn' and hidden_at is null;
