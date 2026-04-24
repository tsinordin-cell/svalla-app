-- ============================================================
-- SVALLA — Seed-data för tours + restaurants
-- Kör i Supabase SQL Editor (Dashboard → SQL Editor → New query)
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- RESTAURANGER
-- ────────────────────────────────────────────────────────────
INSERT INTO restaurants (id, name, island, latitude, longitude, description, opening_hours, menu, images, image_url, tags, core_experience)
VALUES
  (
    gen_random_uuid(), 'Grinda Wärdshus', 'Grinda',
    59.40940, 18.56150,
    'Klassisk skärgårdskrog med brygga, utsikt och vällagad husmanskost. En av skärgårdens absoluta favoriter – boka alltid i förväg.',
    'Juni–Augusti: dagligen 12–22. Begränsat öppet maj & sep.',
    'Skärgårdsplanka, skaldjur, husmanskost, vegetariskt. Brunch på helger.',
    ARRAY['https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800'],
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
    ARRAY['klassisk', 'brygga', 'middag', 'lunch', 'boka i förväg'],
    'Skärgårdens mysigaste värdshusupplevelse med direkt bryggläge. Boka bord – det är alltid fullt.'
  ),
  (
    gen_random_uuid(), 'Utö Värdshus', 'Utö',
    58.95470, 18.31370,
    'Anrikt värdshus på Utö med fantastisk mat och skärgårdskänsla. Perfekt stopp efter cykeltur runt ön.',
    'Maj–September. Ring och boka – stängt vissa dagar.',
    'Säsongsbetonad skärgårdsmat, fisk, skaldjur, vegetariskt.',
    ARRAY['https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800'],
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
    ARRAY['klassisk', 'cykel', 'historia', 'middag', 'boka alltid'],
    'Boka bord ALLTID – Utö Värdshus är en institution i södra skärgården. Otrolig mat, mytomspunnen atmosfär.'
  ),
  (
    gen_random_uuid(), 'Sandhamns Värdshus', 'Sandhamn',
    59.28790, 18.91080,
    'Avslappnad krog mitt i seglarparadiset Sandhamn. Fin terrass, skärgårdsmat och perfekt för en lång lunch.',
    'Maj–September: dagligen 11–22.',
    'Klassisk skärgårdsmat, fisk, hamburgare, sallader, barnmeny.',
    ARRAY['https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800'],
    'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800',
    ARRAY['sandhamn', 'lunch', 'terrass', 'seglare', 'avslappnat'],
    'Det avslappnade alternativet i Sandhamn. Fin terrass med utsikt mot hamnen, bra mat utan krusiduller.'
  ),
  (
    gen_random_uuid(), 'Sandhamn Seglarhotell', 'Sandhamn',
    59.28850, 18.91200,
    'Premiumupplevelse i hjärtat av Sandhamn. Restaurang med hög klass, bar och direkt koppling till seglarlivet.',
    'Öppet hela sommarsäsongen. Restaurang kräver bokning.',
    'Haute cuisine, trerättersmeny, vinmeny, cocktailbar.',
    ARRAY['https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800'],
    'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800',
    ARRAY['premium', 'sandhamn', 'middag', 'par', 'boka i förväg'],
    'Seglarhotellets restaurang är skärgårdens mest exklusiva matupplevelse. Räkna med fullt – boka långt i förväg.'
  ),
  (
    gen_random_uuid(), 'Finnhamns Krog', 'Finnhamn',
    59.49280, 18.78580,
    'Enkel och trevlig krog på vackra Finnhamn. Bäst känd för bastun i klippan och sommarstämningen.',
    'Midsommar–Mitten av Augusti: dagligen 12–21.',
    'Enkel mat, räkor, smörgåsar, glass, öl och vin.',
    ARRAY['https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800'],
    'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800',
    ARRAY['bastu', 'enkel', 'sommar', 'naturhamn', 'klippbad'],
    'Finnhamn handlar mer om bastun och naturen än om maten – men räkor på bryggan är en sommarklassiker.'
  ),
  (
    gen_random_uuid(), 'Möja Värdshus & Bageri', 'Möja',
    59.43780, 18.82780,
    'Autentisk skärgårdskrog på bilfria Möja. Husmanskost, hembakat bröd och äkta öistämning.',
    'Sommar: dagligen 9–21. Begränsat under tidig/sen säsong.',
    'Husmanskost, fisk, hembakat bröd, frukost, fika.',
    ARRAY['https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800'],
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
    ARRAY['autentisk', 'hembakat', 'möja', 'frukost', 'bilfri ö'],
    'Möja är den bilfria öns hjärta. Värdshuset serverar riktig husmanskost – inget fins, men äkta vara.'
  ),
  (
    gen_random_uuid(), 'Hamnkrogen Vaxholm', 'Vaxholm',
    59.40220, 18.35450,
    'Välplacerad krog i Vaxholms hamn med utsikt mot Kastellet. Perfekt halvdagstur från Stockholm.',
    'April–Oktober: dagligen 11–22.',
    'Skaldjur, fisk, kött, barnmeny, lunch och middag.',
    ARRAY['https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800'],
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
    ARRAY['vaxholm', 'hamn', 'skaldjur', 'lunch', 'halvdag'],
    'Bästa läget i Vaxholm – direkt vid hamnen med utsikt mot Kastellet. Bra för en lång lunch.'
  ),
  (
    gen_random_uuid(), 'Nåttarö Krog', 'Nåttarö',
    58.95280, 18.08780,
    'Liten mysig krog på sandstrandsön Nåttarö i södra skärgården. Enkelt, trivsamt och stranden runt hörnet.',
    'Juni–Augusti: dagligen 11–20.',
    'Enkel mat, glass, räkor, läsk, öl.',
    ARRAY['https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800'],
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
    ARRAY['sandstrand', 'enkel', 'familj', 'sommar', 'snorkling'],
    'Nåttarö är unik i skärgården med sin sandstrand – glass och räkor efter ett dopp är perfekt.'
  ),
  (
    gen_random_uuid(), 'Rökeriet Fjäderholmarna', 'Fjäderholmarna',
    59.32190, 18.16170,
    'Skärgårdsklassiker på Fjäderholmarna med rökt fisk och skaldjur. Fantastisk utsikt mot Stockholm.',
    'April–Oktober: dagligen 11–22.',
    'Rökt lax, räkor, skaldjur, mackor, öl och vin.',
    ARRAY['https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800'],
    'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800',
    ARRAY['rökt fisk', 'fjäderholmarna', 'skaldjur', 'kvällstur', 'utsikt'],
    'Rökt fisk med utsikt mot Stockholms siluett – perfekt kvällsdestination för en kort skärgårdstur.'
  ),
  (
    gen_random_uuid(), 'Fjäderholmarnas Krog', 'Fjäderholmarna',
    59.32100, 18.16000,
    'Lite finare alternativet på Fjäderholmarna. Bokningsbord, bättre mat och fin interiör.',
    'April–Oktober: mån–sön 12–22. Boka bord i förväg.',
    'Á la carte, skärgårdsrätter, vegetariskt, vinlista.',
    ARRAY['https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800'],
    'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800',
    ARRAY['fjäderholmarna', 'finare', 'boka i förväg', 'á la carte', 'nära stan'],
    'Skärgårdens närmaste fina restaurang från stan. Perfekt för kvällstur med båt och middag.'
  ),
  (
    gen_random_uuid(), 'Nämdö Krog', 'Nämdö',
    59.13500, 18.67170,
    'Pittoresk liten krog på lantliga Nämdö. Husmanskost och äkta skärgårdsidyll utan turister.',
    'Juni–Augusti: ons–sön 12–20.',
    'Husmanskost, fisk, enkel mat, kaffe och kaka.',
    ARRAY['https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800'],
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
    ARRAY['nämdö', 'lantlig', 'enkel', 'autentisk', 'lugnt'],
    'Nämdö Krog är skärgårdens bäst bevarade hemlighet – inga turister, bara stammisar och seglare.'
  ),
  (
    gen_random_uuid(), 'Dalarö Krog & Bryggeri', 'Dalarö',
    59.13170, 18.39780,
    'Populärt hänge i Dalarö med eget bryggeri, god mat och sommarstämning. Bra startpunkt för södra skärgården.',
    'Maj–September: dagligen 12–22. Vinter: fre–sön.',
    'Burgare, pizza, husmanskost, eget öl från bryggeriet.',
    ARRAY['https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800'],
    'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800',
    ARRAY['dalarö', 'bryggeri', 'öl', 'sommar', 'startpunkt'],
    'Dalarö är porten till södra skärgården – bryggeriet och maten gör det till ett perfekt start- eller slutstopp.'
  )
ON CONFLICT DO NOTHING;


-- ────────────────────────────────────────────────────────────
-- TURER (tours)
-- ────────────────────────────────────────────────────────────
INSERT INTO tours (
  id, slug, title, start_location, destination,
  transport_types, duration_label, best_for, highlights,
  food_stops, season, usp, category,
  hamn_profil, bad_profil, tone_tags, log_suggestions,
  insider_tip, cover_image, description, waypoints
)
VALUES

-- ── 1. Stockholm → Fjäderholmarna ──────────────────────────
(
  gen_random_uuid(), 'stockholm-fjaderholmarna',
  'Stockholm till Fjäderholmarna', 'Stockholm', 'Fjäderholmarna',
  ARRAY['motorbåt','segelbåt'], '2–4h (snabb dagstur)',
  ARRAY['turist','familj','nybörjare'],
  ARRAY['Närmaste skärgårdsön från stan','Rökeriet med rökt fisk','Utsikt mot Stockholms siluett','Enkel och snabb tur'],
  '[{"namn":"Rökeriet Fjäderholmarna","nara_bryggan":true,"typ":"skaldjur/rökt fisk"},{"namn":"Fjäderholmarnas Krog","nara_bryggan":true,"typ":"á la carte"}]'::jsonb,
  'Maj–September', 'Skärgårdens närmaste ö från Stockholm – perfekt för en kvällstur eller snabb dagstur.',
  ARRAY['klassisk','snabb'], ARRAY['gästhamn','restaurang','handel'], ARRAY['klippbad nära bryggan'],
  ARRAY['lättsam','nybörjarvänlig'],
  ARRAY['Bra starttur för den som aldrig åkt ut i skärgården','Perfekt kvällstur – tillbaka innan mörkret'],
  'Ta kvällsturen – solen går ner bakom Stockholm och det är magiskt från bryggan.',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
  'Fjäderholmarna är den lättaste inkörsporteln till Stockholms skärgård. Nära, vacker och med mat.',
  '[{"lat":59.3250,"lng":18.0710,"name":"Slussen/Strömkajen"},{"lat":59.3219,"lng":18.1617,"name":"Fjäderholmarna"}]'::jsonb
),

-- ── 2. Stockholm → Vaxholm ──────────────────────────────────
(
  gen_random_uuid(), 'stockholm-vaxholm',
  'Stockholm till Vaxholm', 'Stockholm', 'Vaxholm',
  ARRAY['motorbåt','segelbåt'], 'Halvdag–Heldag',
  ARRAY['familj','par','turist'],
  ARRAY['Kastellet – Stockholms skärgårds ikon','Hamnpromenad och köpmanshus','Hamnkrogen med skaldjur','Levande samhälle med historia'],
  '[{"namn":"Hamnkrogen Vaxholm","nara_bryggan":true,"typ":"skaldjur och fisk"}]'::jsonb,
  'April–Oktober', 'Skärgårdens port – Vaxholm är navet som alla rutter passerar.',
  ARRAY['klassisk'], ARRAY['gästhamn stor','service','handel','restaurang'], ARRAY['klippbad på Resarö'],
  ARRAY['somrig','familjevänlig','historisk'],
  ARRAY['Ta en runda förbi Kastellet med båten','Prova skaldjuren på Hamnkrogen'],
  'Lägg till vid Kastellholmens brygga och ta en kort promenad upp – utsikten är gratis och fantastisk.',
  'https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=800',
  'Vaxholm är skärgårdens klassiska port. Kastellet, trähusen och hamnlivet gör det till en självklar tur.',
  '[{"lat":59.3250,"lng":18.0710,"name":"Stockholm"},{"lat":59.3800,"lng":18.2900,"name":"Lidingösundet"},{"lat":59.4022,"lng":18.3545,"name":"Vaxholm"}]'::jsonb
),

-- ── 3. Stockholm → Grinda ───────────────────────────────────
(
  gen_random_uuid(), 'stockholm-grinda',
  'Stockholm till Grinda', 'Stockholm', 'Grinda',
  ARRAY['motorbåt','segelbåt'], 'Heldag',
  ARRAY['familj','par','naturälskare'],
  ARRAY['Naturreservat med klippbad','Grinda Wärdshus – bästa maten i norr','Skyddade bad för barn','Inga bilar – ren natur'],
  '[{"namn":"Grinda Wärdshus","nara_bryggan":true,"typ":"skärgårdsmiddag"}]'::jsonb,
  'Maj–September', 'Familjevänliga Grinda med naturreservat, bad och skärgårdens bästa värdshusmat.',
  ARRAY['klassisk','familj'], ARRAY['gästhamn','restaurang','naturhamn'], ARRAY['klippbad','barnvänligt bad i vik','sandvik norra sidan'],
  ARRAY['somrig','naturlig','lugn'],
  ARRAY['Boka bord på Grinda Wärdshus INNAN du åker','Bäst bad på norra sidan av ön'],
  'Boka bord på Wärdshuset senast 3 dagar innan – fullbokat nästan varje helg i juli.',
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800',
  'Grinda är det perfekta naturreservatsbesöket – bad, vandring och middag på klassiskt värdshus.',
  '[{"lat":59.3250,"lng":18.0710,"name":"Stockholm"},{"lat":59.4022,"lng":18.3545,"name":"Vaxholm (passera)"},{"lat":59.4094,"lng":18.5615,"name":"Grinda"}]'::jsonb
),

-- ── 4. Stockholm → Sandhamn ─────────────────────────────────
(
  gen_random_uuid(), 'stockholm-sandhamn',
  'Stockholm till Sandhamn', 'Stockholm', 'Sandhamn',
  ARRAY['segelbåt','motorbåt'], 'Heldag / Weekend',
  ARRAY['par','seglare','turist'],
  ARRAY['Seglarparadis och KSSS-atmosfär','Havsläge vid Östersjöns inlopp','Sandhamns Värdshus och Seglarhotellet','Solnedgång från yttersta klippan'],
  '[{"namn":"Sandhamns Värdshus","nara_bryggan":true,"typ":"skärgårdsmat"},{"namn":"Sandhamn Seglarhotell","nara_bryggan":true,"typ":"premium middag"}]'::jsonb,
  'Juni–Augusti', 'Det ultimata segelmålet – Sandhamn vid Östersjöns inlopp med puls och atmosfär.',
  ARRAY['klassisk','premium','segling'], ARRAY['KSSS gästhamn','gästhamn stor','butiker','restauranger','bar'], ARRAY['Trouville sandstrand','klippbad yttersidan'],
  ARRAY['energisk','social','seglingspuls'],
  ARRAY['Segla in i solnedgången','Promenera ut till Östersjöklipporna'],
  'Promenera förbi KSSS och fortsätt 10 min till ytterklipporna – du ser öppna Östersjön och det är magiskt.',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
  'Sandhamn är målet alla seglare drömmer om – Östersjöns inlopp, KSSS och fullspäckade hamnar.',
  '[{"lat":59.3250,"lng":18.0710,"name":"Stockholm"},{"lat":59.4022,"lng":18.3545,"name":"Vaxholm"},{"lat":59.3700,"lng":18.7500,"name":"Baggensfjärden"},{"lat":59.2879,"lng":18.9108,"name":"Sandhamn"}]'::jsonb
),

-- ── 5. Stockholm → Finnhamn ─────────────────────────────────
(
  gen_random_uuid(), 'stockholm-finnhamn',
  'Stockholm till Finnhamn', 'Stockholm', 'Finnhamn',
  ARRAY['segelbåt','motorbåt'], 'Heldag / Weekend',
  ARRAY['par','äventyrare','seglare'],
  ARRAY['Bastun i klippan – skärgårdens bästa','Vandringsstigar med utsikt','Klippbad och naturhamnar','Autentisk sommarstämning'],
  '[{"namn":"Finnhamns Krog","nara_bryggan":true,"typ":"enkel mat och räkor"}]'::jsonb,
  'Juni–Mitten av Augusti', 'Natur, bastu och klippbad – Finnhamn är äventyrsparet perfekta destination.',
  ARRAY['aktiv','naturlig'], ARRAY['gästhamn','bastu','naturhamn'], ARRAY['klippbad','naturliga badvikar'],
  ARRAY['äventyrlig','naturlig','lugn'],
  ARRAY['Boka bastun när du ankrar – den är populär','Ta vandringen upp på höjden för utsikt'],
  'Bastun bokas direkt vid ankomst – gör det direkt, den tar slut fort.',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
  'Finnhamn är skärgårdens bastuparadis. Kvällen i bastun med havsutsikt – svårslagen upplevelse.',
  '[{"lat":59.3250,"lng":18.0710,"name":"Stockholm"},{"lat":59.4022,"lng":18.3545,"name":"Vaxholm"},{"lat":59.4928,"lng":18.7858,"name":"Finnhamn"}]'::jsonb
),

-- ── 6. Stockholm → Möja ─────────────────────────────────────
(
  gen_random_uuid(), 'stockholm-moja',
  'Stockholm till Möja', 'Stockholm', 'Möja',
  ARRAY['segelbåt','motorbåt'], 'Heldag / Weekend',
  ARRAY['par','lugn-sökare','seglare'],
  ARRAY['Bilfri ö med äkta skärgårdsstämning','Möja Värdshus med hembakat bröd','Inga turister – genuint och stilla','Klipplandskap och naturhamnar'],
  '[{"namn":"Möja Värdshus & Bageri","nara_bryggan":false,"typ":"husmanskost och hembakat"}]'::jsonb,
  'Maj–September', 'Bilfria Möja – skärgårdens mest autentiska ö utan turister.',
  ARRAY['klassisk','lugn','autentisk'], ARRAY['gästhamn','naturhamn','bageri'], ARRAY['klippbad','naturliga vikar'],
  ARRAY['stilla','autentisk','äkta'],
  ARRAY['Frukost på Möja Bageri på morgonen','Cykla runt ön – tar 2h och är fantastiskt'],
  'Möja Bageri öppnar 08:00 – vakna tidigt och ta morgonfika med hembakat bröd på bryggan.',
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800',
  'Möja är skärgårdens bäst bevarade hemlighet – bilfri, genuin och otroligt vacker.',
  '[{"lat":59.3250,"lng":18.0710,"name":"Stockholm"},{"lat":59.4022,"lng":18.3545,"name":"Vaxholm"},{"lat":59.4378,"lng":18.8278,"name":"Möja"}]'::jsonb
),

-- ── 7. Stockholm → Utö ──────────────────────────────────────
(
  gen_random_uuid(), 'stockholm-uto',
  'Stockholm till Utö', 'Stockholm', 'Utö',
  ARRAY['motorbåt','segelbåt'], 'Heldag / Weekend',
  ARRAY['par','äventyrare','cyklist'],
  ARRAY['Cykel runt ön längs klipporna','Utö Värdshus – anrikt och vällagat','Gruvmuseum och historia','Klippbad på yttersidan'],
  '[{"namn":"Utö Värdshus","nara_bryggan":false,"typ":"skärgårdsmat, boka alltid"}]'::jsonb,
  'Maj–September', 'Cykel, historia och klippbad – Utö är södra skärgårdens kronjuvel.',
  ARRAY['klassisk','aktiv'], ARRAY['gästhamn','cykeluthyrning','naturhamn'], ARRAY['klippbad yttersidan','badvik innanför'],
  ARRAY['äventyrlig','aktiv','historisk'],
  ARRAY['Hyr cykel vid bryggan och kör runt ön','Besök gruvmuseet – gratis inträde'],
  'Boka bord på Utö Värdshus ALLTID. Be om bord mot havet – det är skärgårdens bästa utsikt.',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
  'Utö kombinerar cykeltur, historia och fantastisk mat. Boka värdshuset – fullt varje weekend.',
  '[{"lat":59.3250,"lng":18.0710,"name":"Stockholm/Nynäshamn"},{"lat":58.9547,"lng":18.3137,"name":"Utö"}]'::jsonb
),

-- ── 8. Ingarö → Sandhamn ────────────────────────────────────
(
  gen_random_uuid(), 'ingaro-sandhamn',
  'Ingarö till Sandhamn', 'Ingarö', 'Sandhamn',
  ARRAY['segelbåt','motorbåt'], 'Heldag / 2 dagar',
  ARRAY['seglare','par','äventyrare'],
  ARRAY['Klassisk sträcka via Baggensfjärden','Östersjöns inlopp och KSSS','Sandhamns Värdshus och terrassen','Möjlighet till nattsegling hem'],
  '[{"namn":"Sandhamns Värdshus","nara_bryggan":true,"typ":"skärgårdsmat"},{"namn":"Sandhamn Seglarhotell","nara_bryggan":true,"typ":"premium"}]'::jsonb,
  'Juni–Augusti', 'Den klassiska ut-seglingsrutten från Ingarö – Baggensfjärden ut mot öppet hav.',
  ARRAY['segling','klassisk'], ARRAY['KSSS gästhamn','butiker','restauranger'], ARRAY['Trouville sandstrand','klippor yttersidan'],
  ARRAY['seglingspuls','äventyrlig'],
  ARRAY['Segla tidigt för att ha vinden med dig','Ankra utanför KSSS om det är fullt inne'],
  'Lämna Ingarö på morgonen och du har vinden med dig. Nattsegling hem ger en magisk upplevelse.',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
  'Ingaröseglaren klassiska tur – ut genom Baggensfjärden och in i Sandhamn vid lunch.',
  '[{"lat":59.2553,"lng":18.5328,"name":"Ingarö"},{"lat":59.2700,"lng":18.6800,"name":"Baggensfjärden"},{"lat":59.2879,"lng":18.9108,"name":"Sandhamn"}]'::jsonb
),

-- ── 9. Ingarö → Grinda ──────────────────────────────────────
(
  gen_random_uuid(), 'ingaro-grinda',
  'Ingarö till Grinda', 'Ingarö', 'Grinda',
  ARRAY['segelbåt','motorbåt'], 'Heldag',
  ARRAY['familj','par','naturälskare'],
  ARRAY['Skyddade vatten via Mysingen','Grinda Wärdshus – perfekt dagstursmål','Naturreservat och bad','Lugn sträcka med vind i ryggen'],
  '[{"namn":"Grinda Wärdshus","nara_bryggan":true,"typ":"skärgårdsmiddag"}]'::jsonb,
  'Maj–September', 'Familjevänlig dagstur från Ingarö via lugna Mysingen till Grindas värdshus.',
  ARRAY['familj','klassisk'], ARRAY['gästhamn','restaurang','naturhamn'], ARRAY['klippbad','barnvänliga vikar'],
  ARRAY['lugn','familjevänlig'],
  ARRAY['Boka bord på Grinda Wärdshus i förväg','Bäst bad på norra sidan av ön'],
  'Från Ingarö är Grinda en bekväm sträcka – perfekt för familjer med barn som inte vill for långt.',
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800',
  'Lugna vatten och välmat barn – Ingarö till Grinda är familjens favoritsträcka.',
  '[{"lat":59.2553,"lng":18.5328,"name":"Ingarö"},{"lat":59.3200,"lng":18.5000,"name":"Mysingen"},{"lat":59.4094,"lng":18.5615,"name":"Grinda"}]'::jsonb
),

-- ── 10. Ingarö → Bullerö ────────────────────────────────────
(
  gen_random_uuid(), 'ingaro-bullero',
  'Ingarö till Bullerö naturreservat', 'Ingarö', 'Bullerö',
  ARRAY['segelbåt','motorbåt','kajak'], 'Halvdag–Heldag',
  ARRAY['naturälskare','äventyrare','seglare'],
  ARRAY['Fridlyst naturreservat','Klippor och havsörnar','Bra fiske i omgivningen','Absolut tystnad – ta med matsäck'],
  '[]'::jsonb,
  'Maj–September', 'Öde naturreservat med klipplandskap – ta med matsäck, det finns ingenting på plats.',
  ARRAY['aktiv','naturlig','avskilt'], ARRAY['naturhamn','ankring'], ARRAY['klippbad','öppet hav'],
  ARRAY['vild','stilla','äkta natur'],
  ARRAY['Ta med all mat och vatten – inget finns på plats','Ankra i skyddad vik på sydöstra sidan'],
  'Bullerö är fridlyst – kör sakta. Håll utkik efter havsörnar som häckar här.',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
  'Bullerö är skärgårdens vildaste naturreservat. Ta med matsäck – ingenting finns på plats.',
  '[{"lat":59.2553,"lng":18.5328,"name":"Ingarö"},{"lat":59.2300,"lng":18.6200,"name":"Bullerö naturreservat"}]'::jsonb
),

-- ── 11. Ingarö → Nämdö ──────────────────────────────────────
(
  gen_random_uuid(), 'ingaro-namdo',
  'Ingarö till Nämdö', 'Ingarö', 'Nämdö',
  ARRAY['segelbåt','motorbåt'], 'Heldag',
  ARRAY['seglare','par','lugn-sökare'],
  ARRAY['Pittoreskt och lantligt – inga turister','Nämdö Krog med husmanskost','Skyddade vikar och naturhamnar','Autentisk skärgårdsö'],
  '[{"namn":"Nämdö Krog","nara_bryggan":false,"typ":"husmanskost och kaffe"}]'::jsonb,
  'Juni–Augusti', 'Nämdö är den lilla hemligheten söder om Sandhamn – äkta, stilla och vacker.',
  ARRAY['lugn','autentisk'], ARRAY['naturhamn','gästhamn enkel'], ARRAY['klippbad','badvikar'],
  ARRAY['stilla','äkta','avskilt'],
  ARRAY['Nämdö Krog har begränsade öppettider – kolla innan du åker','Ankra i den stora viken i sydväst'],
  'Nämdö har få besökare jämfört med Sandhamn – det är poängen. Kom hit när du vill ha lugn.',
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800',
  'Nämdö är den dolda pärlan – pittoreskt, lugnt och autentiskt skärgårdsliv.',
  '[{"lat":59.2553,"lng":18.5328,"name":"Ingarö"},{"lat":59.1700,"lng":18.6200,"name":"Kanholmsfjärden"},{"lat":59.1350,"lng":18.6717,"name":"Nämdö"}]'::jsonb
),

-- ── 12. Nynäshamn → Nåttarö ────────────────────────────────
(
  gen_random_uuid(), 'nynashamn-nattaro',
  'Nynäshamn till Nåttarö', 'Nynäshamn', 'Nåttarö',
  ARRAY['motorbåt','segelbåt'], 'Heldag',
  ARRAY['familj','par','badälskare'],
  ARRAY['Unik sandstrand – ovanlig i skärgården','Snorkling och barnvänligt grunt vatten','Nåttarö Krog med enkel sommarmat','Lugn och barnvänlig atmosfär'],
  '[{"namn":"Nåttarö Krog","nara_bryggan":false,"typ":"enkel sommarmat och glass"}]'::jsonb,
  'Juni–Augusti', 'Nåttarö är unik – skärgårdens bästa sandstrand och perfekt för barnfamiljer.',
  ARRAY['familj','bad'], ARRAY['gästhamn enkel','naturhamn'], ARRAY['sandstrand unik','snorkling','barnvänligt'],
  ARRAY['somrig','familjevänlig','avslappnad'],
  ARRAY['Snorkla vid klipporna norr om sandstranden','Ta med picknick – krogens mat är enkel'],
  'Vattnet vid sandstranden är grunt och varmt – bäst för barn. Vuxna snorklar vid klipporna norr om stranden.',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
  'Sandstrand i skärgården är sällsynt – Nåttarö är unikt och barnfamiljer älskar det.',
  '[{"lat":58.9025,"lng":17.9471,"name":"Nynäshamn"},{"lat":58.9528,"lng":18.0878,"name":"Nåttarö"}]'::jsonb
),

-- ── 13. Stavsnäs → Sandhamn ─────────────────────────────────
(
  gen_random_uuid(), 'stavsnäs-sandhamn',
  'Stavsnäs till Sandhamn', 'Stavsnäs', 'Sandhamn',
  ARRAY['segelbåt','motorbåt'], 'Halvdag–Heldag',
  ARRAY['seglare','par','vänner'],
  ARRAY['Snabb väg ut till ytterskärgården','Sandhamn och KSSS-atmosfär','Bra vind på sträckan','Bra startpunkt utan lång körväg'],
  '[{"namn":"Sandhamns Värdshus","nara_bryggan":true,"typ":"skärgårdsmat"},{"namn":"Sandhamn Seglarhotell","nara_bryggan":true,"typ":"premium"}]'::jsonb,
  'Maj–September', 'Kortaste vägen till Sandhamn för den som bor på Värmdösidan.',
  ARRAY['segling','klassisk'], ARRAY['KSSS gästhamn','restauranger','handel'], ARRAY['Trouville sandstrand'],
  ARRAY['energisk','seglingspuls'],
  ARRAY['Stavsnäs har bra parkering – kör hit och segla ut','Vinden är ofta sydvästlig – perfekt ut-segling'],
  'Stavsnäs är Värmdöseglaren hemmahamn – kortare til Sandhamn än från Stockholm.',
  'https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=800',
  'Från Stavsnäs är Sandhamn en smidig dagstur med bra parkering och direkt ut i ytterskärgården.',
  '[{"lat":59.2017,"lng":18.7147,"name":"Stavsnäs"},{"lat":59.2879,"lng":18.9108,"name":"Sandhamn"}]'::jsonb
),

-- ── 14. Kajak: Vaxholm runt Bogesundslandet ─────────────────
(
  gen_random_uuid(), 'kajak-vaxholm-bogesundslandet',
  'Kajak: Vaxholm runt Bogesundslandet', 'Vaxholm', 'Bogesundslandet',
  ARRAY['kajak'], 'Halvdag (4–5h paddling)',
  ARRAY['nybörjare','aktiv','naturälskare'],
  ARRAY['Skyddade vatten – säkert för nybörjare','Utsikt mot Kastellet och Vaxholm','Naturreservat på Bogesundslandet','Lugna vikar och klipphyllor'],
  '[]'::jsonb,
  'Maj–September', 'Bästa kajakstarten – skyddade vatten och vacker natur nära Vaxholm.',
  ARRAY['aktiv','kajak'], ARRAY['naturhamn','strandning möjlig'], ARRAY['bad från kajak','klipphyllor'],
  ARRAY['aktiv','lugn','nybörjarvänlig'],
  ARRAY['Hyr kajak i Vaxholm hamn','Ta med lunch – inget finns längs sträckan'],
  'Paddla tidigt på morgonen när vattnet är som spegeln – den känslan är obetalbar.',
  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
  'Skärgårdens bästa nybörjar-kajaktour med skyddade vatten och fantastisk natur.',
  '[{"lat":59.4022,"lng":18.3545,"name":"Vaxholm"},{"lat":59.4200,"lng":18.3200,"name":"Bogesundslandet"}]'::jsonb
),

-- ── 15. Solnedgångsturen från Vaxholm ───────────────────────
(
  gen_random_uuid(), 'sunset-vaxholm',
  'Solnedgångsturen från Vaxholm', 'Vaxholm', 'Vaxholm (runt)',
  ARRAY['motorbåt','segelbåt'], 'Kvällstur (2–3h)',
  ARRAY['par','båtfolk'],
  ARRAY['Solnedgång västerut mot fastlandet','Lugnt vatten på kvällen','Kastellet i solnedgångsfärgerna','Romantisk och avslappnad stämning'],
  '[{"namn":"Hamnkrogen Vaxholm","nara_bryggan":true,"typ":"middag vid hemkomst"}]'::jsonb,
  'Juni–Augusti', 'Kvällsturen som är svår att slå – solnedgång och Vaxholm i sina vackraste färger.',
  ARRAY['romantisk','kvälls'], ARRAY['gästhamn om du vill stanna'], ARRAY['kvällsdopp möjligt'],
  ARRAY['romantisk','stilla','vacker'],
  ARRAY['Lämna vid 19–20 för bäst ljus','Ha med filt – det blir kyligare ute på vattnet'],
  'Solnedgången speglar sig i Kastellets murar – planera hemfärden så att du ser den.',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
  'Romantikens tur – kvällen ut på vattnet när turisterna är hemma och allt är stilla.',
  '[{"lat":59.4022,"lng":18.3545,"name":"Vaxholm"},{"lat":59.4200,"lng":18.3000,"name":"Västerut mot solnedgång"},{"lat":59.4022,"lng":18.3545,"name":"Vaxholm (åter)"}]'::jsonb
),

-- ── 16. Krogturné: Vaxholm → Grinda → Sandhamn ─────────────
(
  gen_random_uuid(), 'krogtourne-klassiken',
  'Krogturné: Vaxholm, Grinda & Sandhamn', 'Vaxholm', 'Sandhamn',
  ARRAY['motorbåt','segelbåt'], '2–3 dagar',
  ARRAY['par','vänner','foodie'],
  ARRAY['Tre av skärgårdens bästa restauranger','Hamnkrogen Vaxholm – dag 1','Grinda Wärdshus – dag 2','Sandhamn Seglarhotell – dag 3'],
  '[{"namn":"Hamnkrogen Vaxholm","nara_bryggan":true,"typ":"dag 1 – skaldjur"},{"namn":"Grinda Wärdshus","nara_bryggan":true,"typ":"dag 2 – skärgårdsmiddag"},{"namn":"Sandhamn Seglarhotell","nara_bryggan":true,"typ":"dag 3 – premium"}]'::jsonb,
  'Juni–Augusti', 'Skärgårdens mattriangel – tre dagar, tre klassiska krogar och vackra anchorages emellan.',
  ARRAY['mat','premium','weekend'], ARRAY['gästhamn alla stopp'], ARRAY['bad vid Grinda','Trouville sandstrand'],
  ARRAY['festlig','gastronomisk','social'],
  ARRAY['Boka ALLA tre restauranger innan du lämnar kajen','Ta det lugnt – det är inget race'],
  'Boka alla tre i förväg – i juli är det omöjligt att få bord utan bokning.',
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
  'Tre dagar, tre mat-ikoner i skärgården. Det klassiska sättet att kombinera segling och god mat.',
  '[{"lat":59.4022,"lng":18.3545,"name":"Vaxholm – dag 1"},{"lat":59.4094,"lng":18.5615,"name":"Grinda – dag 2"},{"lat":59.2879,"lng":18.9108,"name":"Sandhamn – dag 3"}]'::jsonb
),

-- ── 17. Dalarö → Ornö ───────────────────────────────────────
(
  gen_random_uuid(), 'dalaro-orno',
  'Dalarö till Ornö', 'Dalarö', 'Ornö',
  ARRAY['motorbåt','segelbåt'], 'Heldag',
  ARRAY['familj','nybörjare','par'],
  ARRAY['Lugna vatten i södra skärgården','Ornös naturhamnar och klippor','Bra för nybörjare','Dalarö Krog som start eller avslut'],
  '[{"namn":"Dalarö Krog & Bryggeri","nara_bryggan":true,"typ":"mat och eget öl"}]'::jsonb,
  'Maj–September', 'Söderut i lugna vatten – Dalarö till Ornö är nybörjarens perfekta dagstur.',
  ARRAY['familj','lugn'], ARRAY['naturhamn','ankring'], ARRAY['klippbad','badvikar'],
  ARRAY['lugn','familjevänlig','nybörjarvänlig'],
  ARRAY['Starta från Dalarö för bra parkering','Ornö har inga restauranger – ta med matsäck'],
  'Dalarö Krog & Bryggeri är ett perfekt avslut efter turen – eget öl och bra mat.',
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800',
  'Sodra skärgårdens lugna alternativ – Dalarö till Ornö med stillsamt vatten och fin natur.',
  '[{"lat":59.1317,"lng":18.3978,"name":"Dalarö"},{"lat":59.0694,"lng":18.3978,"name":"Ornö"}]'::jsonb
)

ON CONFLICT (slug) DO UPDATE SET
  title        = EXCLUDED.title,
  usp          = EXCLUDED.usp,
  highlights   = EXCLUDED.highlights,
  best_for     = EXCLUDED.best_for,
  waypoints    = EXCLUDED.waypoints,
  food_stops   = EXCLUDED.food_stops,
  insider_tip  = EXCLUDED.insider_tip,
  cover_image  = EXCLUDED.cover_image;
