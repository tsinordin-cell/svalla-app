-- 2026-10-19: rättelser i platsdatabasen efter faktagranskningen av filmöarnas sidor 2026-10-19
-- (granskning/grupp1.md till grupp4.md). Gäller platser som visas via /upptack/<slug> och i
-- listorna "Fler ställen/boenden/hamnar/badplatser" på ösidorna.
--
-- Varje ändring bygger på en källa som hämtades på nytt 2026-10-19. Citaten står ovanför varje sats.
-- Inget raderas: dolda rader får hidden_at + hidden_reason och kan visas igen genom att hidden_at
-- sätts till null.
--
-- Körs i Supabase SQL-editorn av Max eller Thomas. Allt ligger i en transaktion.
--
-- Bra att veta innan körning:
--   * Säsongsfältet (seasonality) visas inte längre på /upptack (commit d6ea4f76), men det används
--     fortfarande av dagplaneraren (src/lib/dagPlanner.ts). Därför rättas det där källan motsäger
--     "summer_only". 'seasonal_unknown' är kolumnens standardvärde och betyder "okänt".
--   * Commit d6ea4f76 filtrerar redan bort "Fler ställen"-poster som har samma namn som en post i
--     öns egen lista (utanDubbletter). Dubbletterna nedan döljs ändå enligt granskningen, utom
--     de som det länkas till från artiklar (se kommentarerna under "Dubbletter").

begin;

-- ════════════════════════════════════════════════════════════════════════
-- ARHOLMA
-- ════════════════════════════════════════════════════════════════════════

-- arholma-sjomack: "Varför hit?" (core_experience) sa "sista tankmöjligheten i norr – tanka fullt om
-- du planerar Ålands-overgången". Ingen källa säger det. Säsong "Endast sommar" saknar också källa.
-- KÄLLA https://arholmahandel.se/diesel-och-bensin/
--   "Vi har en sjömack där du själv kan tanka bensin och diesel."
--   "Betala gör du med ditt bankkort."
--   "Macken är öppen mellan 8:00 och 20:00"
-- KÄLLA https://arholmahandel.se/stuguthyrning/  "Arholma Handel är en åretruntöppen butik"
update restaurants set
  core_experience = 'Arholma Handel har en sjömack där du själv tankar bensin och diesel och betalar med bankkort.',
  tags = array_remove(tags, 'ytterst'),
  seasonality = 'seasonal_unknown',
  updated_at = now() where slug = 'arholma-sjomack';

-- arholma-dansbana-krog: "Arholma Dansbana är en institution – dans under bar himmel längst norrut.
-- Gammaldags och fantastiskt." saknar källa, liksom faciliteten Gästbrygga och menyn "Bar, dans,
-- enkel mat, öl." Koordinaten (59.8452, 19.0802) låg 1,7 km från Norra bryggan.
-- KÄLLA https://www.arholma.nu/mat-dryck/dansbanan
--   "På Arholma har det funnits en dansbana sedan beredskapstiden i början av 1940-talet. Idag är
--    det en charmig restaurang med stort kök, trevlig bar och skärgårdens bästa utsikt!"
-- KÄLLA https://arholmahandel.se/stuguthyrning/
--   "Stugan ligger vid Norra bryggan där båtarna från fastlandet lägger till."
--   "den närmaste ser du från ditt sovrumsfönster – Arholma Dansbana"
-- KÄLLA https://www.explorearchipelago.com/sv/sthlm/norra-skargarden/arholma/arholma-dansbana
--   (Skärgårdsstiftelsen) "pl 7, 764 54 Arholma", kartlänk destination=59.8499691,19.1085929
--   Samma sida listar "Arholma Norra Brygga Ångbåtsbrygga" på 59.85123,19.10762, alltså cirka 150 m bort.
update restaurants set
  core_experience = 'På Arholma har det funnits en dansbana sedan beredskapstiden i början av 1940-talet. I dag är det en restaurang med stort kök och bar, nära Norra bryggan.',
  facilities = array_remove(facilities, 'guest_dock'),
  tags = array_remove(tags, 'legendar'),
  menu = null,
  latitude = 59.8499691, longitude = 19.1085929,
  updated_at = now() where slug = 'arholma-dansbana-krog';

-- arholma-arholma-handel-stugor: dubblett av "Arholma Handel — Källarstugan" i öns lista, och typad
-- som hotell. Arholma Handel har bara en stuga. Raden döljs inte eftersom den är den enda
-- /upptack-sidan för Källarstugan; den får rätt namn och typen Stugor (cabin), vilket också tar
-- bort den ur "Fler boenden" (boendesidan hämtar bara typen hotel).
-- KÄLLA https://arholmahandel.se/stuguthyrning/
--   "Källarstugan är ett boende med fantastisk utsikt över havet. Stugan ligger vid Norra bryggan"
--   "Källarstugan erbjuder upp till fyra bäddar och uthyres per dygn från maj till och med september
--    månad samt under höstlovsveckan."
update restaurants set
  name = 'Källarstugan, Arholma Handel',
  type = 'cabin',
  description = 'Arholma Handel hyr ut Källarstugan, som ligger vid Norra bryggan där båtarna från fastlandet lägger till. Stugan har upp till fyra bäddar och hyrs ut per dygn från maj till och med september och under höstlovsveckan.',
  updated_at = now() where slug = 'arholma-arholma-handel-stugor';

-- arholma-arholma-pensionat: ingen webbplats, ingen beskrivning, koordinaten (59.8531061, 19.1262924)
-- är samma punkt som Upptäck Skärgården använder för hela ön Arholma.
-- KÄLLA https://www.arholma.nu/hitta-boende  (Arholma intresseförening) listar bara
--   "Arholma Nord", "Bull-August" och "Källarstugan".
-- KÄLLA https://www.explorearchipelago.com/sv/sthlm/norra-skargarden/arholma  listar
--   "Österhamns pensionat" (Österhamnsvägen 21, 59.8461202, 19.1190628), men inget "Arholma Pensionat".
-- Om posten egentligen avser Österhamns pensionat bör den läggas in på nytt med rätt namn och läge.
update restaurants set hidden_at = now(),
  hidden_reason = 'Går inte att belägga (granskning 2026-10-19): inte listad av Arholma intresseförening eller Upptäck Skärgården, koordinaten är öns mittpunkt'
  where slug = 'arholma-arholma-pensionat' and hidden_at is null;

-- arholma-gasthamn: KONTROLLERA. Beskrivningen ("gästhamnen har 50 meter brygga med mooringlinor,
-- segelbåtsdjup, el och toaletter") bygger på arholmanord.se, som inte går att läsa utan JavaScript.
-- KÄLLA https://www.arholma.nu/resa-hit  nämner bara gästbryggorna i Österhamn ("ett 20-tal båtar")
-- och Ahlmansviken ("för 30"). Inte ändrad här; kontrollera arholmanord.se i en vanlig webbläsare.

-- ════════════════════════════════════════════════════════════════════════
-- MARSTRAND
-- ════════════════════════════════════════════════════════════════════════

-- societetshuset: adressen "Långgatan 1, 442 67 Marstrand" är fel, kategorin Hamnkrog saknar källa,
-- och säsongen "Endast sommar" motsägs av julbord och konferens.
-- KÄLLA https://societetshuset.se
--   "ADRESS Kungsplan 442 60 Marstrand"
--   "Societetshuset Marstrand byggdes 1886"
--   "Julbord och julfester upp till 250 personer i en stämningsfull miljö."
update restaurants set
  formatted_address = 'Kungsplan, 442 60 Marstrand',
  categories = array_remove(categories, 'hamnkrog'),
  seasonality = 'seasonal_unknown',
  updated_at = now() where slug = 'societetshuset';

-- marstrands-havshotell-bohuslan: "Endast sommar" är fel.
-- KÄLLA https://www.vastsverige.com/en/kungalv/products/marstrands-havshotell/
--   "All year round, holidaymakers and conference guests love the view of the harbour and Marstrandsön from the veranda."
update restaurants set seasonality = 'year_round', updated_at = now()
  where slug = 'marstrands-havshotell-bohuslan';

-- marstrand-drivmedel: ingen operatör, ingen adress ("Bohuslän"), ingen webbplats. Punkten
-- (57.8867, 11.5853) ligger 50 m från Le Comptoir mitt i stan.
-- KÄLLA https://www.marstrandsgasthamn.se/sv/Gasthamn (enligt granskningen; sidan svarade inte vid
--   ny hämtning 2026-10-19): "Bunkring av bränsle är förbjuden inom området kring gästhamnen"
update restaurants set hidden_at = now(),
  hidden_reason = 'Går inte att belägga (granskning 2026-10-19): ingen operatör, adress eller källa för ett tankställe på platsen'
  where slug = 'marstrand-drivmedel' and hidden_at is null;

-- ════════════════════════════════════════════════════════════════════════
-- SANDHAMN
-- ════════════════════════════════════════════════════════════════════════

-- ksss-gasthamn-sandhamn: telefonen 070-213 20 68 och säsongen "Endast sommar" stämmer inte.
-- KÄLLA https://www.ksss.se/hamnar/sandhamn
--   "Hamnkontor Sandhamn: 08-571 532 85"
--   "Hamnen är öppen från sista helgen i april till sista helgen i oktober."
update restaurants set
  phone = '+46 8 571 532 85', contact_phone = '+46 8 571 532 85',
  seasonality = 'seasonal_unknown',
  updated_at = now() where slug = 'ksss-gasthamn-sandhamn';

-- seglarhotellet-sandhamn: "Endast sommar" är fel. "Det naturliga mötesplatsen för seglare från hela
-- Östersjön" saknar källa (syntes inte längre vid hämtning 2026-10-19; satsen tar bort den om den finns kvar).
-- KÄLLA https://www.sandhamn.com/sv
--   "Hotellrum vid havet med spa, restaurang, gym och pool – öppet året runt på Sandhamn."
--   "Hit kommer människor för att vila, fira, mötas och njuta av skärgården – året runt."
update restaurants set seasonality = 'year_round', updated_at = now()
  where slug = 'seglarhotellet-sandhamn';
update restaurants set core_experience = null, updated_at = now()
  where slug = 'seglarhotellet-sandhamn' and core_experience ilike '%naturliga mötesplatsen%';

-- bistro-sands: "Bistro Sands är Sandhamns vardagsalternativ – bra mat utan Seglarhotellets prislapp."
-- är en prisjämförelse utan källa. Taggarna "prisvärt" och "enkel" bygger på samma påstående, och
-- menyn "Enklare rätter, smörgåsar, räkor, bar." finns inte hos hotellet.
-- KÄLLA https://sandshotell.se/  "relax med bastu, restaurangen med uteterassen samt ett orangeri"
--   (beskrivningen, som redan stämmer med källan, står kvar och visas i stället)
update restaurants set
  core_experience = null,
  tags = array_remove(array_remove(tags, 'prisvärt'), 'enkel'),
  menu = null,
  updated_at = now() where slug = 'bistro-sands';

-- cafe-strindbergsgarden: "Ta fika där August Strindberg en gång vistades – Sandhamns kulturella och
-- mysiga caféstopp." Källan säger bara att Strindberg besökte ön, inte just den här gården.
-- KÄLLA https://stockholmslansmuseum.se/besoksmal/sandhamn/
--   "Författare och konstnärer lockades till ön, bland annat berömdheter som August Strindberg och Anders Zorn."
-- KÄLLA https://www.explorearchipelago.com/sv/sthlm/mellersta-skargarden/sandhamn  listar "Café Strindbergsgården Café".
update restaurants set core_experience = null, updated_at = now() where slug = 'cafe-strindbergsgarden';

-- sandhamns-glassigaste-stalle: "Barnen hittar hit av instinkt – Sandhamns bästa glass och ett
-- klassiskt sommarstopp." är en värdering utan källa.
-- KÄLLA https://www.explorearchipelago.com/sv/sthlm/mellersta-skargarden/sandhamn  listar
--   "Sandhamns Glassigaste Ställe Café" (inget mer). Beskrivningen "ett glasscafé på Sandhamn" står kvar.
update restaurants set core_experience = null, updated_at = now() where slug = 'sandhamns-glassigaste-stalle';

-- pub-alma-sandhamn: "PUB Alma är Sandhamns enkla kvällsalternativ – inga pretentioner, bara öl och
-- bra sällskap." saknar källa. Puben finns i Skärgårdsstiftelsens lista, så posten behålls.
-- KÄLLA https://www.explorearchipelago.com/sv/sthlm/mellersta-skargarden/sandhamn  "PUB Alma Bar"
--   (kartlänk destination=59.2880307,18.9187625)
update restaurants set core_experience = null, updated_at = now() where slug = 'pub-alma-sandhamn';

-- flaskbergets-strand: dubblett av "Fläskberget" i öns egen badlista. Upptäck Skärgården listar ett
-- enda bad med det namnet.
-- KÄLLA https://www.explorearchipelago.com/sv/sthlm/mellersta-skargarden/sandhamn  "Fläskberget Badplats"
update restaurants set hidden_at = now(),
  hidden_reason = 'Dubblett av Fläskberget i öns egen badlista (granskning 2026-10-19)'
  where slug = 'flaskbergets-strand' and hidden_at is null;

-- stora-trouvillestranden och lilla-trouville-stranden: KONTROLLERA. Granskningen fann tre poster för
-- Trouville (öns egen "Trouville-stranden" plus dessa två) med nästan samma text. Upptäck Skärgården
-- listar bara "Trouvillestranden Badplats", men ingen källa säger att Stora och Lilla Trouville inte
-- är separata bad. Inte ändrade här. Om de ska döljas:
-- update restaurants set hidden_at = now(), hidden_reason = 'Dubblett av Trouville-stranden (granskning 2026-10-19)'
--   where slug in ('stora-trouvillestranden', 'lilla-trouville-stranden') and hidden_at is null;

-- ════════════════════════════════════════════════════════════════════════
-- UTÖ
-- ════════════════════════════════════════════════════════════════════════

-- bakfickan-uto: beskrevs som matställe ("Bakfickan är Utös informella alternativ – enkel mat utan
-- väntan eller bokning", meny "Enkel mat, smörgåsar, räkor, fika", kategorin Familjevänligt).
-- Källan beskriver ett ställe för musik och dans.
-- KÄLLA https://www.utovardshus.se/bakfickan/
--   "DANSA IN SOMMARNATTEN"
--   "ett säkert kort för dig som är sugen på musik, dans och trevligt umgänge"
--   "Bakfickan stänger för säsongen 31 augusti 2026."
--   "Entréavgift fredagar och lördagar under högsommar samt vid uppträdanden. Endast kortbetalning."
update restaurants set
  description = 'Bakfickan hör till Utö Värdshus och är ett ställe för musik, dans och umgänge på sommarkvällarna. Fredagar och lördagar under högsommaren och vid uppträdanden tas entréavgift, och bara kort gäller som betalning. Säsongen 2026 slutade 31 augusti.',
  core_experience = null,
  menu = null,
  categories = '{}',
  best_for = array_remove(best_for, 'family'),
  facilities = array_remove(facilities, 'restaurant'),
  tags = array_remove(array_remove(array_remove(tags, 'enkelt'), 'alternativ'), 'lunch'),
  updated_at = now() where slug = 'bakfickan-uto';

-- stf-vandrarhem-uto: dubblett av "Utö Vandrarhem Skärgården" i öns lista och typad som hotell.
-- Döljs inte eftersom en tipsartikel länkar till /upptack/stf-vandrarhem-uto
-- (supabase/datafix/2026-09-26-tips-artiklar.sql). Typen Vandrarhem (hostel) tar bort den ur
-- "Fler boenden" och visar rätt typ på sidan.
-- KÄLLA https://www.utovardshus.se/boende/vandrarhemmet/ (enligt granskningen: samma vandrarhem, 73 bäddar)
update restaurants set type = 'hostel', updated_at = now() where slug = 'stf-vandrarhem-uto';

-- gruvbryggan: beskrevs som gästhamn ("Gästhamnen har plats för ca 300 fritidsbåtar …"), vilket gör
-- den till en dubblett av Utö Gästhamn i öns lista, och hade säsongen "Endast sommar". Gruvbryggan är
-- Waxholmsbolagets brygga. Döljs inte eftersom fyra artiklar länkar till /upptack/gruvbryggan
-- (src/app/blogg/[slug]/page.tsx); texten skrivs om så att den bara beskriver bryggan.
-- KÄLLA https://kund.printhuset-sthlm.se/wa/h21.pdf
--   "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026 21A ÅRSTA – UTÖ"
--   hållplatser "Årsta brygga  Gruvbryggan (Utö)  Näsudden (Utö)  Spränga (Utö)"
-- KÄLLA https://www.utogasthamn.se/gasthamnen/
--   "I den norra hamnen finns sjömacken och det är också där de reguljära Waxholmsbåtarna lägger till."
--   "I Utö Gästhamn finns plats för ca 300 fritidsbåtar"
update restaurants set
  description = 'Gruvbryggan är Waxholmsbolagets brygga på Utö, där båtarna på linje 21 från Årsta brygga lägger till. Bryggan ligger i norra delen av Utö gästhamn, där också sjömacken finns.',
  seasonality = 'seasonal_unknown',
  updated_at = now() where slug = 'gruvbryggan';

-- stora-sand: adressen "Stora sand, 134 67 Ingarö" hör till Värmdö, inte Haninge. Koordinaten
-- (58.919, 18.248) ligger vid Ålö, så posten är troligen Ålö Storsand, som redan finns i öns egen
-- badlista. lilla-sand: samma adressfel, 250 m från Stora Sand, och ingen källa visar att badet finns.
-- KÄLLA https://www.utogasthamn.se/att-gora/ (enligt granskningen) nämner bara "Storsand … på
--   skjutfältets mark några kilometer från Gruvbyn" och Ålö Storsand.
update restaurants set hidden_at = now(), formatted_address = null,
  hidden_reason = 'Trolig dubblett av Ålö Storsand; adressen (Ingarö) var fel (granskning 2026-10-19)'
  where slug = 'stora-sand' and hidden_at is null;
update restaurants set hidden_at = now(), formatted_address = null,
  hidden_reason = 'Går inte att belägga; adressen (Ingarö) var fel (granskning 2026-10-19)'
  where slug = 'lilla-sand' and hidden_at is null;

-- ════════════════════════════════════════════════════════════════════════
-- FJÄDERHOLMARNA
-- ════════════════════════════════════════════════════════════════════════

-- roda-villan: "Röda Villan är lokalen som Nacka-borna håller för sig själva – charmigt läge, bra mat,
-- inga turister." är fel (Fjäderholmarna ligger i Lidingö stad och är ett populärt turistmål), och
-- "mat grillad över öppen eld" saknar källa (grillmenyn gäller bara större sällskap).
-- KÄLLA https://www.rodavillan.nu/
--   "Röda Villan ligger omgiven av rogivande och vacker natur. Det perfekta stället att spendera en dag på Stockholms närmaste skärgårdsö."
--   "Besök oss för lunch, drink, middag, fika eller varför inte spela ett parti boule på våra fina banor."
--   "Våra uteplatser är lugna oaser och erbjuder en fantastisk havsutsikt över Stockholms inlopp."
--   "Vår veranda går att boka för större sällskap."  "För större sällskap har ni möjlighet att boka vår grillmeny."
--   "Vi har stängt för säsongen 2026! Öppnar igen maj 2027."
-- KÄLLA https://lidingo.se/stad-politik/om-lidingo/lidingo-skargard/ (enligt granskningen):
--   Fjäderholmarna är ett "mycket populärt utflyktsmål både bland stadens invånare och turister"
update restaurants set
  description = 'Röda Villan ligger på Fjäderholmarna, Stockholms närmaste skärgårdsö, och serverar lunch, middag, drinkar och fika. Uteplatserna har utsikt över Stockholms inlopp, och på restaurangens banor kan man spela boule. Verandan går att boka för större sällskap, som också kan beställa en grillmeny. Säsongen 2026 är slut och restaurangen öppnar igen i maj 2027.',
  core_experience = null,
  tags = array_remove(array_remove(tags, 'nacka'), 'lokal'),
  updated_at = now() where slug = 'roda-villan';

-- fjaderholmarnas-gasthamn: dubblett av "Fjäderholmarnas Gästhamn & Sjömack" i öns lista, med
-- inaktuell text ("fiskrökeri, båtmuseum, glasblåseri …", "passbåt går till och från Nybroplan").
-- Döljs inte eftersom två artiklar länkar till /upptack/fjaderholmarnas-gasthamn; texten skrivs om
-- till det som källan säger om själva hamnen.
-- KÄLLA https://www.svenskagasthamnar.se/stockholms-skargard/stockholm-fjaderholmarna/
--   "På Stora Fjäderholmen utanför Blockhusudden vid inloppet till Stockholm."
--   "Hamndjup 1-8 m"  "Förtöjning boj"  "Gästplatser 35"  "Dusch ingår"
--   "Hamnvärd: Sjöstation Fjäderholmarna, tel.08-716 39 10"
update restaurants set
  description = 'Gästhamnen ligger på Stora Fjäderholmen utanför Blockhusudden vid inloppet till Stockholm och har 35 gästplatser med förtöjning vid boj. Hamndjupet är mellan 1 och 8 meter, och dusch ingår. Hamnvärd är Sjöstation Fjäderholmarna.',
  updated_at = now() where slug = 'fjaderholmarnas-gasthamn';

-- fjaderholmarna-stora-bryggan: beskrevs som "gästhamn med bensinstation" (kategori Gästhamn), men
-- Stora Bryggan är angöringsbryggan. Gästhamnen och macken är samma som ovan. Ingen länk pekar hit.
-- KÄLLA https://www.svenskagasthamnar.se/stockholms-skargard/stockholm-fjaderholmarna/ (en gästhamn, 35 platser)
update restaurants set hidden_at = now(),
  hidden_reason = 'Dubblett av Fjäderholmarnas gästhamn och sjömack (granskning 2026-10-19)'
  where slug = 'fjaderholmarna-stora-bryggan' and hidden_at is null;

-- ════════════════════════════════════════════════════════════════════════
-- RESARÖ
-- ════════════════════════════════════════════════════════════════════════

-- badviken (Överbybadet): adressen "Svartviksslingan 17, 167 38 Bromma" är fel.
-- KÄLLA https://www.vaxholm.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser
--   rubrik "Resarö": "På Överby finns denna fina familjevänliga badplats som ligger utefter Badviksvägen."
update restaurants set
  formatted_address = 'Badviksvägen, Överby, Resarö', postal_code = null, city = 'Vaxholm',
  updated_at = now() where slug = 'badviken';

-- resaro-batklubb: kategorin Gästhamn motsäger märkningen "Endast medlemmar". Säsongen saknar källa.
-- KÄLLA https://www.resarobatklubb.se/
--   "Resarö Båtklubb, bildad 1972 och med hemort på Resarö i Vaxholm, är en allmännyttig ideell förening"
--   "i de 4 hamnarna finns totalt 236 båtplatser"  "Ansök om medlemskap"
update restaurants set
  categories = array_remove(array_remove(categories, 'guest_harbor'), 'gasthamn'),
  seasonality = 'seasonal_unknown',
  updated_at = now() where slug = 'resaro-batklubb';

-- ════════════════════════════════════════════════════════════════════════
-- DUBBLETTER MOT ÖNS EGEN LISTA (Marstrand)
-- ════════════════════════════════════════════════════════════════════════
-- Granskningen fann "Tenan" och "Tenan Marstrand", "Johans krog Marstrand" och "Johans Krog",
-- "Hamnkrogen Marstrand" och "Hamnkrogen" på /o/marstrand/restauranger. Den första i varje par kommer
-- från öns egen lista i koden (bohuslan-data.ts), den andra från databasen. Commit d6ea4f76 filtrerar
-- redan bort databasposten ur "Fler ställen", så de här satserna behövs bara om /upptack-sidan också
-- ska bort. Hoppa över dem om sidorna ska finnas kvar.
--   hamnkrogen döljs inte: en artikel länkar till /upptack/hamnkrogen (src/app/blogg/[slug]/page.tsx).
--   seglarhotellet-sandhamn (dubblett av Segelsalen, Sandhamn) döljs inte av samma skäl, och
--   middleware.ts hänvisar till sluggen.

-- tenan-marstrand. KÄLLA https://grandmarstrand.se/restaurang-tenan/ : samma restaurang som "Tenan"
--   ("Restaurang Grand Tenan", "Här kan vi duka för 100 glada gäster").
update restaurants set hidden_at = now(),
  hidden_reason = 'Dubblett av Tenan i öns egen lista (granskning 2026-10-19)'
  where slug = 'tenan-marstrand' and hidden_at is null;

-- johans-krog. Samma bistro som "Johans krog Marstrand" i öns lista (johanskrogmarstrand.se går inte
-- att läsa utan JavaScript; påståendet "Hundar är välkomna så länge de är lydiga" kunde inte beläggas).
update restaurants set hidden_at = now(),
  hidden_reason = 'Dubblett av Johans krog Marstrand i öns egen lista (granskning 2026-10-19)'
  where slug = 'johans-krog' and hidden_at is null;

commit;
