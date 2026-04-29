-- ═══════════════════════════════════════════════════════════════════════════
-- MIGRATION_2026_04_29_forum_seed_personas.sql
-- ═══════════════════════════════════════════════════════════════════════════
--
-- Tom: Kör i Supabase SQL Editor.
--
-- Skapar 12 påhittade båtfolk-användare och fyller forumet med ~25 nya trådar
-- och ~110 svar fördelade över alla 9 kategorier — så det inte ser tomt ut
-- och inte längre verkar som om endast tsinordin har skrivit.
--
-- IDEMPOTENT: alla INSERTs har deterministiska IDs och ON CONFLICT DO NOTHING,
-- så du kan köra om filen utan att duplicera data.
--
-- BEROENDE: kör efter MIGRATION_2026_04_29_forum_starter_threads.sql.
--
-- HUR DET FUNGERAR:
-- 1. Vi insert:ar i auth.users — triggern handle_new_user skapar automatiskt
--    en motsvarande rad i public.users.
-- 2. Vi UPDATE:ar public.users efteråt med bio, hemmahamn, båt-info.
-- 3. Vi skapar trådar och svar med spridda timestamps (1–90 dagar bakåt) så
--    last_reply_at-sortering ger en realistisk fördelning av "nya" och
--    "äldre" diskussioner.
-- ═══════════════════════════════════════════════════════════════════════════

DO $persona_seed$
DECLARE
  -- Deterministiska persona-UUIDs
  anders_id   UUID := '00000000-c0c0-4a00-b000-000000000001';  -- Anders Wahlström
  maja_id     UUID := '00000000-c0c0-4a00-b000-000000000002';  -- Maja Lindqvist
  erik_id     UUID := '00000000-c0c0-4a00-b000-000000000003';  -- Erik Holmberg
  sofia_id    UUID := '00000000-c0c0-4a00-b000-000000000004';  -- Sofia Bergström
  lars_id     UUID := '00000000-c0c0-4a00-b000-000000000005';  -- Lars Nilsson
  hanna_id    UUID := '00000000-c0c0-4a00-b000-000000000006';  -- Hanna Eriksson
  mikael_id   UUID := '00000000-c0c0-4a00-b000-000000000007';  -- Mikael Sjögren
  birgitta_id UUID := '00000000-c0c0-4a00-b000-000000000008';  -- Birgitta Lundberg
  patrik_id   UUID := '00000000-c0c0-4a00-b000-000000000009';  -- Patrik Karlsson
  johan_id    UUID := '00000000-c0c0-4a00-b000-00000000000a';  -- Johan Nyström
  camilla_id  UUID := '00000000-c0c0-4a00-b000-00000000000b';  -- Camilla Wallin
  tobias_id   UUID := '00000000-c0c0-4a00-b000-00000000000c';  -- Tobias Engström

  admin_uid UUID;

  -- Tråd-IDs (deterministiska för idempotens)
  t1  UUID := '11111111-0000-4a00-b000-000000000001';
  t2  UUID := '11111111-0000-4a00-b000-000000000002';
  t3  UUID := '11111111-0000-4a00-b000-000000000003';
  t4  UUID := '11111111-0000-4a00-b000-000000000004';
  t5  UUID := '11111111-0000-4a00-b000-000000000005';
  t6  UUID := '11111111-0000-4a00-b000-000000000006';
  t7  UUID := '11111111-0000-4a00-b000-000000000007';
  t8  UUID := '11111111-0000-4a00-b000-000000000008';
  t9  UUID := '11111111-0000-4a00-b000-000000000009';
  t10 UUID := '11111111-0000-4a00-b000-00000000000a';
  t11 UUID := '11111111-0000-4a00-b000-00000000000b';
  t12 UUID := '11111111-0000-4a00-b000-00000000000c';
  t13 UUID := '11111111-0000-4a00-b000-00000000000d';
  t14 UUID := '11111111-0000-4a00-b000-00000000000e';
  t15 UUID := '11111111-0000-4a00-b000-00000000000f';
BEGIN
  -- ── Hämta admins userid (tsinordin) ──
  SELECT id INTO admin_uid FROM users WHERE username = 'tsinordin' LIMIT 1;
  IF admin_uid IS NULL THEN
    RAISE EXCEPTION 'Hittade inte tsinordin — skapa kontot först';
  END IF;

  -- ═════════════════════════════════════════════════════════════════════════
  -- 1. SKAPA PÅHITTADE AUTH.USERS (triggern fyller public.users automatiskt)
  -- ═════════════════════════════════════════════════════════════════════════
  INSERT INTO auth.users (
    id, instance_id, aud, role, email, encrypted_password,
    email_confirmed_at, created_at, updated_at,
    raw_user_meta_data, raw_app_meta_data
  ) VALUES
    (anders_id,   '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
     'seed.anders.w@svalla.local', '', NOW() - INTERVAL '180 days',
     NOW() - INTERVAL '180 days', NOW() - INTERVAL '180 days',
     '{"username":"anders_w"}'::jsonb, '{"provider":"email","providers":["email"]}'::jsonb),

    (maja_id,     '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
     'seed.maja.l@svalla.local', '', NOW() - INTERVAL '155 days',
     NOW() - INTERVAL '155 days', NOW() - INTERVAL '155 days',
     '{"username":"maja_l"}'::jsonb, '{"provider":"email","providers":["email"]}'::jsonb),

    (erik_id,     '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
     'seed.erik.h@svalla.local', '', NOW() - INTERVAL '210 days',
     NOW() - INTERVAL '210 days', NOW() - INTERVAL '210 days',
     '{"username":"erik_h"}'::jsonb, '{"provider":"email","providers":["email"]}'::jsonb),

    (sofia_id,    '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
     'seed.sofia.b@svalla.local', '', NOW() - INTERVAL '120 days',
     NOW() - INTERVAL '120 days', NOW() - INTERVAL '120 days',
     '{"username":"sofia_b"}'::jsonb, '{"provider":"email","providers":["email"]}'::jsonb),

    (lars_id,     '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
     'seed.lars.n@svalla.local', '', NOW() - INTERVAL '170 days',
     NOW() - INTERVAL '170 days', NOW() - INTERVAL '170 days',
     '{"username":"lars_n"}'::jsonb, '{"provider":"email","providers":["email"]}'::jsonb),

    (hanna_id,    '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
     'seed.hanna.e@svalla.local', '', NOW() - INTERVAL '95 days',
     NOW() - INTERVAL '95 days', NOW() - INTERVAL '95 days',
     '{"username":"hanna_e"}'::jsonb, '{"provider":"email","providers":["email"]}'::jsonb),

    (mikael_id,   '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
     'seed.mikael.s@svalla.local', '', NOW() - INTERVAL '140 days',
     NOW() - INTERVAL '140 days', NOW() - INTERVAL '140 days',
     '{"username":"mikael_s"}'::jsonb, '{"provider":"email","providers":["email"]}'::jsonb),

    (birgitta_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
     'seed.birgitta.l@svalla.local', '', NOW() - INTERVAL '230 days',
     NOW() - INTERVAL '230 days', NOW() - INTERVAL '230 days',
     '{"username":"birgitta_l"}'::jsonb, '{"provider":"email","providers":["email"]}'::jsonb),

    (patrik_id,   '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
     'seed.patrik.k@svalla.local', '', NOW() - INTERVAL '105 days',
     NOW() - INTERVAL '105 days', NOW() - INTERVAL '105 days',
     '{"username":"patrik_k"}'::jsonb, '{"provider":"email","providers":["email"]}'::jsonb),

    (johan_id,    '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
     'seed.johan.n@svalla.local', '', NOW() - INTERVAL '60 days',
     NOW() - INTERVAL '60 days', NOW() - INTERVAL '60 days',
     '{"username":"johan_n"}'::jsonb, '{"provider":"email","providers":["email"]}'::jsonb),

    (camilla_id,  '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
     'seed.camilla.w@svalla.local', '', NOW() - INTERVAL '110 days',
     NOW() - INTERVAL '110 days', NOW() - INTERVAL '110 days',
     '{"username":"camilla_w"}'::jsonb, '{"provider":"email","providers":["email"]}'::jsonb),

    (tobias_id,   '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
     'seed.tobias.e@svalla.local', '', NOW() - INTERVAL '195 days',
     NOW() - INTERVAL '195 days', NOW() - INTERVAL '195 days',
     '{"username":"tobias_e"}'::jsonb, '{"provider":"email","providers":["email"]}'::jsonb)
  ON CONFLICT (id) DO NOTHING;

  -- ═════════════════════════════════════════════════════════════════════════
  -- 2. UPPDATERA PUBLIC.USERS MED BIO + BÅT-INFO
  --    (triggern har fyllt grunddata; vi lägger till bio/hemmahamn/båt här)
  -- ═════════════════════════════════════════════════════════════════════════
  UPDATE users SET
    bio = '32-fots Bavaria. Hemmahamn Vaxholm. Seglat sedan 1985 — mest helger.',
    home_port = 'Vaxholm', vessel_type = 'Segelbåt', vessel_model = 'Bavaria 32', vessel_name = 'Najad',
    nationality = 'SE'
  WHERE id = anders_id;

  UPDATE users SET
    bio = 'Yamarin 56 Day Cruiser. Familj med två barn. Helgturer från Saltsjöbaden.',
    home_port = 'Saltsjöbaden', vessel_type = 'Motorbåt', vessel_model = 'Yamarin 56', vessel_name = 'Sjöstjärnan',
    nationality = 'SE'
  WHERE id = maja_id;

  UPDATE users SET
    bio = 'Pensionerad lots. 40 år på vattnet. Väder, nöd och navigering är mitt specialområde.',
    home_port = 'Nynäshamn', vessel_type = 'Segelbåt', vessel_model = 'Hallberg-Rassy 31', vessel_name = 'Klara',
    nationality = 'SE'
  WHERE id = erik_id;

  UPDATE users SET
    bio = 'Albin Vega + havskajak. Värmdö. Tyst skärgård och långa kvällar.',
    home_port = 'Värmdö', vessel_type = 'Segelbåt', vessel_model = 'Albin Vega', vessel_name = 'Trine',
    nationality = 'SE'
  WHERE id = sofia_id;

  UPDATE users SET
    bio = 'Buster Magnum + spö. Dalarö. Havsöring i april, gädda hela sommaren.',
    home_port = 'Dalarö', vessel_type = 'Motorbåt', vessel_model = 'Buster Magnum', vessel_name = 'Storfisk',
    nationality = 'SE'
  WHERE id = lars_id;

  UPDATE users SET
    bio = 'Beneteau First 31 i Smögens hamn. Sommar i Bohuslän, vinter i Stockholm.',
    home_port = 'Smögen', vessel_type = 'Segelbåt', vessel_model = 'Beneteau First 31', vessel_name = 'Vinda',
    nationality = 'SE'
  WHERE id = hanna_id;

  UPDATE users SET
    bio = 'Nimbus 27 Family. Andra båten, ny båtägare sedan 2024. Stavsnäs.',
    home_port = 'Stavsnäs', vessel_type = 'Motorbåt', vessel_model = 'Nimbus 27 Family', vessel_name = 'Brisen',
    nationality = 'SE'
  WHERE id = mikael_id;

  UPDATE users SET
    bio = 'Linjett 33. KSSS-medlem sedan 1972. Sandhamn varje sommar i 50 år.',
    home_port = 'Sandhamn', vessel_type = 'Segelbåt', vessel_model = 'Linjett 33', vessel_name = 'Astrid',
    nationality = 'SE'
  WHERE id = birgitta_id;

  UPDATE users SET
    bio = 'Hanse 348. Ingarö. Jobbar i sjöfartsbranschen — segling är pust och paus.',
    home_port = 'Ingarö', vessel_type = 'Segelbåt', vessel_model = 'Hanse 348', vessel_name = 'Tor',
    nationality = 'SE'
  WHERE id = patrik_id;

  UPDATE users SET
    bio = 'Ny seglare 2025. Hyr för det mesta. Bor i Stockholm, lär mig vägen ut.',
    home_port = 'Stockholm', vessel_type = 'Hyrbåt', nationality = 'SE'
  WHERE id = johan_id;

  UPDATE users SET
    bio = 'Itiwit-kajak + iSUP. Tyresö. Föredrar paddelblad framför motor.',
    home_port = 'Tyresö', vessel_type = 'Kajak', nationality = 'SE'
  WHERE id = camilla_id;

  UPDATE users SET
    bio = 'Flipper 700 ST. Nacka. Diesel, motor och elektronik — allt som tickar.',
    home_port = 'Nacka', vessel_type = 'Motorbåt', vessel_model = 'Flipper 700 ST', vessel_name = 'Eka',
    nationality = 'SE'
  WHERE id = tobias_id;

  -- ═════════════════════════════════════════════════════════════════════════
  -- 3. NYA TRÅDAR (15 st) — fördelade på alla 9 kategorier, ägda av personas
  -- ═════════════════════════════════════════════════════════════════════════
  INSERT INTO forum_threads (id, category_id, user_id, title, body, is_pinned, in_spam_queue, view_count, created_at, last_reply_at)
  VALUES
    -- ── Segling (3 nya) ──
    (t1, 'segling', anders_id,
     'Vinter-uppställning på land — vad gör ni med riggen?',
     'Tar ner mast varje höst eller låter ni den stå? Har gjort båda och tycker nedtagning är jobbigt men sparar slitage. Vad är konsensus i klubben?',
     false, false, 42, NOW() - INTERVAL '4 days', NOW() - INTERVAL '6 hours'),

    (t2, 'segling', birgitta_id,
     'Sandhamn Race i juli — anmäler ni er i år?',
     'Funderar på att ta Astrid till start igen. Förra året var det fantastiska vindar lördagen, lugnare söndag. Någon annan som planerar?',
     false, false, 67, NOW() - INTERVAL '11 days', NOW() - INTERVAL '2 days'),

    (t3, 'segling', johan_n,
     'Fjäderholmarna första turen — okej startpunkt för en nybörjare?',
     'Tagit förarintyg i mars och hyrt en H-båt över helgen. Tänkt börja smått. Är Fjäderholmarna och tillbaka rimligt eller ska jag våga mig längre?',
     false, false, 28, NOW() - INTERVAL '2 days', NOW() - INTERVAL '14 hours'),

    -- ── Motorbåt (2 nya) ──
    (t4, 'motorbat', mikael_id,
     'Nimbus 27 Family — tips på saker att kolla efter första säsongen?',
     'Köpte en Nimbus 27 i fjol och har nu ett år bakom mig. Vad ska man kolla noga inför andra säsongen? Specifikt motor, drev och elektronik. Tar tacksamt emot tips.',
     false, false, 51, NOW() - INTERVAL '7 days', NOW() - INTERVAL '20 hours'),

    (t5, 'motorbat', tobias_e,
     'Volvo Penta D3 — koppla bort grundvärme inför vintern?',
     'Har D3-110 i Flippern. Lämnar ni grundvärme på under vinter eller drar ni säkringar? Hur gör ni i praktiken?',
     false, false, 33, NOW() - INTERVAL '6 days', NOW() - INTERVAL '1 day'),

    -- ── Fiske (2 nya) ──
    (t6, 'fiske', lars_n,
     'Havsöring vid Dalarö — var hittar ni den i april?',
     'Fiskat Lerviksudden, Skogsö och Edesön. April är trögt, men i fjol fick jag en grov fisk vid Edesön. Var fiskar ni nu i vår?',
     false, false, 38, NOW() - INTERVAL '5 days', NOW() - INTERVAL '11 hours'),

    (t7, 'fiske', sofia_b,
     'Slukfiske från kajak — säkert eller dumt?',
     'Provat slukfiske från kajak ett par gånger. Roligt men det är knepigt att hantera fisk i smal kajak. Vilka tips har ni andra som gör detta regelbundet?',
     false, false, 22, NOW() - INTERVAL '8 days', NOW() - INTERVAL '3 days'),

    -- ── Paddling (2 nya) ──
    (t8, 'paddling', camilla_w,
     'iSUP eller hård bräda för Stockholms vikar?',
     'Funderar på första SUP. Hört att iSUP funkar för det mesta men är långsammare. Är hård bräda värd extra-pengarna om jag mest paddlar i Tyresö och Värmdö?',
     false, false, 29, NOW() - INTERVAL '3 days', NOW() - INTERVAL '8 hours'),

    (t9, 'paddling', sofia_b,
     'Kajakrutt Värmdö → Bullerö över en dag — rimligt?',
     'Tänker mig en kajakdagstur från Värmdö ut till Bullerö. Har gjort halva sträckan och funderar på att fortsätta. Vad är realistisk tid? Behöver man matsäck eller finns det vatten/krog på vägen?',
     false, false, 19, NOW() - INTERVAL '12 days', NOW() - INTERVAL '4 days'),

    -- ── Väder & säkerhet (2 nya) ──
    (t10, 'vader-sakerhet', erik_h,
     'VHF kanal 16 — vet alla nybörjare om denna?',
     'Det här är inte en fråga utan en påminnelse. Kanal 16 ÄR det internationella nödanropet — inte 70, inte 09. Lärt mig att många nyare båtägare tror DSC-knappen räcker. Den är bra men kanal 16 är primärt. Lyssna alltid när ni är ute.',
     true, false, 89, NOW() - INTERVAL '15 days', NOW() - INTERVAL '5 hours'),

    (t11, 'vader-sakerhet', patrik_k,
     'Windy vs Yr för korttidsvind i Stockholms skärgård?',
     'Använder Windy med ECMWF-modellen. Tycker det är bäst för 1–2 dagar fram. Yr för senaste 6 timmarna. SMHI för officiell varning. Vad är ert recept?',
     false, false, 47, NOW() - INTERVAL '9 days', NOW() - INTERVAL '1 day'),

    -- ── Teknik & underhåll (2 nya) ──
    (t12, 'teknik-underhall', tobias_e,
     'Bottenfärg 2026 — vilken håller bäst i bräckt vatten?',
     'Mellersta skärgården, sötare än Bohuslän. Provat International Micron och Hempel Mille NCT. Vad har ni för erfarenhet? Vill helst undvika att slipa varje vår.',
     false, false, 56, NOW() - INTERVAL '10 days', NOW() - INTERVAL '2 days'),

    (t13, 'teknik-underhall', anders_id,
     'Stående rigg — när är det dags att byta vant?',
     'Min rigg är 22 år gammal — original. Många säger byt vid 15. Andra säger inspektera och kör vidare. Vad har ni för erfarenhet?',
     false, false, 71, NOW() - INTERVAL '14 days', NOW() - INTERVAL '3 days'),

    -- ── Hamnar & bryggor (1 ny) ──
    (t14, 'hamnar-bryggor', hanna_id,
     'Smögens gästhamn i juli — så tidigt som ni måste vara framme?',
     'Bohuslän här. Smögen kan vara helt fullt redan kl 12 i juli. Jag siktar nu på att vara där senast 10:30 om jag vill ha plats vid bryggan. Hur tidigt kommer ni andra?',
     false, false, 44, NOW() - INTERVAL '6 days', NOW() - INTERVAL '18 hours'),

    -- ── Loppis & köp/sälj (1 ny) ──
    (t15, 'loppis', maja_id,
     'Säljes: Garmin GPSMAP 521s plottner — fungerande, 2 500 kr',
     'Garmin GPSMAP 521s med svenskt sjökort (Bluechart Atlantic). Köpte ny båt med integrerad MFD så denna behövs inte längre. Skick: bra, lite repor på höljet. Hämtas Saltsjöbaden eller skickas (köpare betalar frakt).',
     false, false, 31, NOW() - INTERVAL '5 days', NOW() - INTERVAL '1 day')
  ON CONFLICT (id) DO NOTHING;

  -- ═════════════════════════════════════════════════════════════════════════
  -- 4. SVAR (forum_posts) — på BÅDE starter-trådarna och de nya
  --
  --    Trigger uppdaterar reply_count och last_reply_at automatiskt så
  --    vi inte rör de fälten direkt.
  -- ═════════════════════════════════════════════════════════════════════════

  -- ── Svar på STARTER-trådarna (de 10 från tsinordin) ─────────────────────
  -- Vi hämtar dem via title eftersom IDs är gen_random_uuid där.

  -- "Bästa rutten Stockholm → Sandhamn för en helg?"
  INSERT INTO forum_posts (id, thread_id, user_id, body, in_spam_queue, created_at) VALUES
    ('22222222-0000-4a00-b000-000000000101',
     (SELECT id FROM forum_threads WHERE title = 'Bästa rutten Stockholm → Sandhamn för en helg?' LIMIT 1),
     anders_id,
     'Klassiska rutten är via Vaxholm, Grinda och in i Sandhamn på söndagsmorgonen. Ger 25 NM första dagen, 15 andra. Stannar du på Grinda får du både bra middag på Wärdshuset och kort hopp ut på söndagen.',
     false, NOW() - INTERVAL '1 hour 50 minutes'),
    ('22222222-0000-4a00-b000-000000000102',
     (SELECT id FROM forum_threads WHERE title = 'Bästa rutten Stockholm → Sandhamn för en helg?' LIMIT 1),
     birgitta_id,
     'Kör Möja-vägen om vinden ligger sydväst. Naturhamnar längs vägen och du får mer skärgård. Tar längre men är vackrare. Sandhamn på söndag eftermiddag är rätt — då börjar pågångsfolk dra hem och hamnen är luftigare.',
     false, NOW() - INTERVAL '50 minutes'),
    ('22222222-0000-4a00-b000-000000000103',
     (SELECT id FROM forum_threads WHERE title = 'Bästa rutten Stockholm → Sandhamn för en helg?' LIMIT 1),
     mikael_id,
     'Vi gjorde Vaxholm-Grinda-Sandhamn förra sommaren. Bokade brygga i Sandhamn 3 veckor i förväg. Värt det.',
     false, NOW() - INTERVAL '20 minutes')
  ON CONFLICT (id) DO NOTHING;

  -- "Ankra utanför Möja — vilka vikar funkar?"
  INSERT INTO forum_posts (id, thread_id, user_id, body, in_spam_queue, created_at) VALUES
    ('22222222-0000-4a00-b000-000000000201',
     (SELECT id FROM forum_threads WHERE title = 'Ankra utanför Möja — vilka vikar funkar?' LIMIT 1),
     erik_id,
     'Norra sidan av Möja, viken in mot Norrsund — bra skydd för sydväst. Ankra på lera, scope 5–7. Akterförtöj mot klippa om det är trångt. Sätt två ankare om det blåser över 12 m/s.',
     false, NOW() - INTERVAL '4 hours 30 minutes'),
    ('22222222-0000-4a00-b000-000000000202',
     (SELECT id FROM forum_threads WHERE title = 'Ankra utanför Möja — vilka vikar funkar?' LIMIT 1),
     anders_id,
     'Erik har rätt om norra sidan. Jag väljer alltid Norrsund före Berg. Lugnare och skyddat även när det blir nordvest.',
     false, NOW() - INTERVAL '3 hours'),
    ('22222222-0000-4a00-b000-000000000203',
     (SELECT id FROM forum_threads WHERE title = 'Ankra utanför Möja — vilka vikar funkar?' LIMIT 1),
     hanna_id,
     'Och kolla djupet noga vid inseglingen — det är några stenar som inte syns på vissa sjökort.',
     false, NOW() - INTERVAL '1 hour 45 minutes')
  ON CONFLICT (id) DO NOTHING;

  -- "Skärgårdens enklaste segelrutt för en nybörjare?"
  INSERT INTO forum_posts (id, thread_id, user_id, body, in_spam_queue, created_at) VALUES
    ('22222222-0000-4a00-b000-000000000301',
     (SELECT id FROM forum_threads WHERE title = 'Skärgårdens enklaste segelrutt för en nybörjare?' LIMIT 1),
     johan_id,
     'Jag är också nybörjare. Förra helgen körde jag Stockholm → Vaxholm → tillbaka. Funkade fint. Korta sträckor, mycket trafik = lätt att navigera, nära hjälp om något händer.',
     false, NOW() - INTERVAL '20 hours'),
    ('22222222-0000-4a00-b000-000000000302',
     (SELECT id FROM forum_threads WHERE title = 'Skärgårdens enklaste segelrutt för en nybörjare?' LIMIT 1),
     birgitta_id,
     'Vaxholm-Resarö-runt är en bra första riktig segling. Skyddat, bra vindar, alla farleder ut. Ta inte ut till Sandhamn första gången — vänta tills ni gjort 3–4 helger.',
     false, NOW() - INTERVAL '10 hours'),
    ('22222222-0000-4a00-b000-000000000303',
     (SELECT id FROM forum_threads WHERE title = 'Skärgårdens enklaste segelrutt för en nybörjare?' LIMIT 1),
     anders_id,
     'Bra tips från Birgitta. Lägg till Bogesundslandet-runt — också skyddat och kort.',
     false, NOW() - INTERVAL '4 hours')
  ON CONFLICT (id) DO NOTHING;

  -- "Bensin- vs dieselbåt för skärgårdsturer?"
  INSERT INTO forum_posts (id, thread_id, user_id, body, in_spam_queue, created_at) VALUES
    ('22222222-0000-4a00-b000-000000000401',
     (SELECT id FROM forum_threads WHERE title = 'Bensin- vs dieselbåt för skärgårdsturer?' LIMIT 1),
     tobias_id,
     'Diesel är värt det om du går över 80 timmar/år. Längre livslängd, lägre bränslekostnad per timme och mindre brandrisk. Bensin är simpel och billig att köpa, men du tankar oftare och sliter snabbare.',
     false, NOW() - INTERVAL '2 hours 30 minutes'),
    ('22222222-0000-4a00-b000-000000000402',
     (SELECT id FROM forum_threads WHERE title = 'Bensin- vs dieselbåt för skärgårdsturer?' LIMIT 1),
     maja_id,
     'Vi har bensin (Yamarin 56) och tankar nästan varje helg i juli. Skulle valt diesel om vi hade vetat hur mycket vi skulle köra.',
     false, NOW() - INTERVAL '1 hour'),
    ('22222222-0000-4a00-b000-000000000403',
     (SELECT id FROM forum_threads WHERE title = 'Bensin- vs dieselbåt för skärgårdsturer?' LIMIT 1),
     mikael_id,
     'Diesel här (D3-110). Tystare, säkrare, dyrare initialt. Har gått 3 säsonger nu — inga klagomål.',
     false, NOW() - INTERVAL '30 minutes')
  ON CONFLICT (id) DO NOTHING;

  -- "Bästa gästhamnen i mellersta skärgården?"
  INSERT INTO forum_posts (id, thread_id, user_id, body, in_spam_queue, created_at) VALUES
    ('22222222-0000-4a00-b000-000000000501',
     (SELECT id FROM forum_threads WHERE title = 'Bästa gästhamnen i mellersta skärgården?' LIMIT 1),
     maja_id,
     'Grinda för familj. Bra dusch, bra restaurang, bad direkt vid bryggan. Sandhamn är trångt och dyrt om man inte är där för seglingen.',
     false, NOW() - INTERVAL '3 hours 30 minutes'),
    ('22222222-0000-4a00-b000-000000000502',
     (SELECT id FROM forum_threads WHERE title = 'Bästa gästhamnen i mellersta skärgården?' LIMIT 1),
     birgitta_id,
     'Finnhamn är dolda pärlan. Lugnare, bastun i klippan, krogen är enkel men god. Brygga kan vara trångt i juli — kom tidigt eller boka.',
     false, NOW() - INTERVAL '2 hours'),
    ('22222222-0000-4a00-b000-000000000503',
     (SELECT id FROM forum_threads WHERE title = 'Bästa gästhamnen i mellersta skärgården?' LIMIT 1),
     sofia_id,
     'För familj med små barn — Möja. Mindre folk, äkta känsla, bageriet på morgonen är guld.',
     false, NOW() - INTERVAL '50 minutes')
  ON CONFLICT (id) DO NOTHING;

  -- "Kostnader för en helg i Sandhamns gästhamn?"
  INSERT INTO forum_posts (id, thread_id, user_id, body, in_spam_queue, created_at) VALUES
    ('22222222-0000-4a00-b000-000000000601',
     (SELECT id FROM forum_threads WHERE title = 'Kostnader för en helg i Sandhamns gästhamn?' LIMIT 1),
     birgitta_id,
     'I juli 2025 var KSSS 450/natt för 33-fot, el 60, dusch 30. Pumpa septic 100. Räkna 600–700 kr/natt totalt. Ringer du i förväg får du oftast plats om du ringer före 10.',
     false, NOW() - INTERVAL '6 hours'),
    ('22222222-0000-4a00-b000-000000000602',
     (SELECT id FROM forum_threads WHERE title = 'Kostnader för en helg i Sandhamns gästhamn?' LIMIT 1),
     anders_id,
     'Stämmer bra. Lägg på 50 kr om du vill ha brygga A-D — närmast krogen.',
     false, NOW() - INTERVAL '4 hours')
  ON CONFLICT (id) DO NOTHING;

  -- "Min första båtsommar — vad ska jag absolut ha med?"
  INSERT INTO forum_posts (id, thread_id, user_id, body, in_spam_queue, created_at) VALUES
    ('22222222-0000-4a00-b000-000000000701',
     (SELECT id FROM forum_threads WHERE title = 'Min första båtsommar — vad ska jag absolut ha med?' LIMIT 1),
     erik_id,
     'Tre saker: 1) Båtshake ihopfällbar, riktig kvalitet — inte plastversionen. 2) Reservpropp i passande dimension för dräneringshålet. 3) Dragsäck — alltid finns någon som tappar nyckel/mobil i sjön. Sjökort på papper — backup när elektroniken stryper sig.',
     false, NOW() - INTERVAL '5 hours'),
    ('22222222-0000-4a00-b000-000000000702',
     (SELECT id FROM forum_threads WHERE title = 'Min första båtsommar — vad ska jag absolut ha med?' LIMIT 1),
     mikael_id,
     'Lägg till: extra batteri-kabel + krokodilklämmor. Min motor ville inte starta första helgen — räddade sig själv med ett extrabatteri från grannbåten.',
     false, NOW() - INTERVAL '2 hours'),
    ('22222222-0000-4a00-b000-000000000703',
     (SELECT id FROM forum_threads WHERE title = 'Min första båtsommar — vad ska jag absolut ha med?' LIMIT 1),
     anders_id,
     'Och en bra kniv. På dig, inte i facket. Du vet det när du behöver kapa en lina snabbt.',
     false, NOW() - INTERVAL '45 minutes')
  ON CONFLICT (id) DO NOTHING;

  -- "Vilken väder-app använder ni i skärgården?"
  INSERT INTO forum_posts (id, thread_id, user_id, body, in_spam_queue, created_at) VALUES
    ('22222222-0000-4a00-b000-000000000801',
     (SELECT id FROM forum_threads WHERE title = 'Vilken väder-app använder ni i skärgården?' LIMIT 1),
     patrik_id,
     'Windy med ECMWF för 1–2 dagar fram. Yr för korta uppdateringar (uppdateras tätare). SMHI som officiell varning för byig vind. Använder alla tre.',
     false, NOW() - INTERVAL '11 hours'),
    ('22222222-0000-4a00-b000-000000000802',
     (SELECT id FROM forum_threads WHERE title = 'Vilken väder-app använder ni i skärgården?' LIMIT 1),
     erik_id,
     'SMHI är officiell, så börjar jag där. Windy är bra för visualisering. Yr för "vad händer om 6 timmar". Ingen är perfekt — kombinera.',
     false, NOW() - INTERVAL '8 hours'),
    ('22222222-0000-4a00-b000-000000000803',
     (SELECT id FROM forum_threads WHERE title = 'Vilken väder-app använder ni i skärgården?' LIMIT 1),
     hanna_id,
     'I Bohuslän använder jag Yr mer än SMHI. Norrmännen har bättre korttidsmodell för västerhavet.',
     false, NOW() - INTERVAL '4 hours')
  ON CONFLICT (id) DO NOTHING;

  -- "Bra plats för havsöring i mellersta skärgården?"
  INSERT INTO forum_posts (id, thread_id, user_id, body, in_spam_queue, created_at) VALUES
    ('22222222-0000-4a00-b000-000000000901',
     (SELECT id FROM forum_threads WHERE title = 'Bra plats för havsöring i mellersta skärgården?' LIMIT 1),
     lars_id,
     'Edesön och Lerviksudden är klassiker. Aspö också — inte vilt fiskat och bra strömmar. April är knepigt — vänta tills temperaturen är 6–8 grader, då börjar det.',
     false, NOW() - INTERVAL '20 hours'),
    ('22222222-0000-4a00-b000-000000000902',
     (SELECT id FROM forum_threads WHERE title = 'Bra plats för havsöring i mellersta skärgården?' LIMIT 1),
     erik_id,
     'Norra Lidingö-sundet på morgonen i april kan ge fina fångster. Färre folk än Edesön.',
     false, NOW() - INTERVAL '5 hours')
  ON CONFLICT (id) DO NOTHING;

  -- "Vinterförvaring — på land eller i sjön?"
  INSERT INTO forum_posts (id, thread_id, user_id, body, in_spam_queue, created_at) VALUES
    ('22222222-0000-4a00-b000-000000001001',
     (SELECT id FROM forum_threads WHERE title = 'Vinterförvaring — på land eller i sjön?' LIMIT 1),
     anders_id,
     'På land. Sparar gelcoaten, bottenfärgen, hela skrovet. Får fundera på täckställning men det är värt det. I sjön blir det alltid fukt och alger på sikt.',
     false, NOW() - INTERVAL '17 hours'),
    ('22222222-0000-4a00-b000-000000001002',
     (SELECT id FROM forum_threads WHERE title = 'Vinterförvaring — på land eller i sjön?' LIMIT 1),
     tobias_id,
     'I sjön i hamn med uppvärmt skydd är OK men dyrt. Land för en plastbåt på 8 meter — definitivt land.',
     false, NOW() - INTERVAL '12 hours'),
    ('22222222-0000-4a00-b000-000000001003',
     (SELECT id FROM forum_threads WHERE title = 'Vinterförvaring — på land eller i sjön?' LIMIT 1),
     birgitta_id,
     'Land i 50 år nu. Aldrig gjort om.',
     false, NOW() - INTERVAL '6 hours')
  ON CONFLICT (id) DO NOTHING;

  -- ── Svar på de NYA trådarna ────────────────────────────────────────────

  -- t1: Vinter-uppställning på land — vad gör ni med riggen?
  INSERT INTO forum_posts (id, thread_id, user_id, body, in_spam_queue, created_at) VALUES
    ('22222222-0000-4a00-b000-000000001101', t1, birgitta_id,
     'Tar ner riggen vartannat år. Kompromiss. Inspekterar vant och stag varje gång. På Astrid är allt original sedan 2003 — fortfarande bra.',
     false, NOW() - INTERVAL '3 days 20 hours'),
    ('22222222-0000-4a00-b000-000000001102', t1, anders_id,
     'Birgitta, vartannat år låter rimligt om du har bra övertäckning. Jag tar ner varje år men min båt står utomhus utan tak.',
     false, NOW() - INTERVAL '3 days 12 hours'),
    ('22222222-0000-4a00-b000-000000001103', t1, patrik_id,
     'Står masthögt här. Klubbens kran är inte alltid ledig och nedtagning kostar 1 800. Ekonomiskt viktigare än man tror för många.',
     false, NOW() - INTERVAL '2 days 10 hours'),
    ('22222222-0000-4a00-b000-000000001104', t1, erik_id,
     'Ner. Alltid. Vant och stag tål inte vinterfukt. Om någon säger annat har de antingen tur eller obegriplig båt.',
     false, NOW() - INTERVAL '6 hours')
  ON CONFLICT (id) DO NOTHING;

  -- t2: Sandhamn Race i juli
  INSERT INTO forum_posts (id, thread_id, user_id, body, in_spam_queue, created_at) VALUES
    ('22222222-0000-4a00-b000-000000001201', t2, anders_id,
     'Anmäler Najad. Lördagens långrace är det jag siktar på. Söndag är mer för socialt.',
     false, NOW() - INTERVAL '10 days'),
    ('22222222-0000-4a00-b000-000000001202', t2, patrik_id,
     'Anmält Tor. Vi var med 2024 också. Förra årets första runda var märklig — vinden vände två gånger.',
     false, NOW() - INTERVAL '8 days'),
    ('22222222-0000-4a00-b000-000000001203', t2, mikael_id,
     'Tittar bara från bryggan i år men bra att se er Sandhamn-folk här.',
     false, NOW() - INTERVAL '4 days'),
    ('22222222-0000-4a00-b000-000000001204', t2, birgitta_id,
     'Passar på här — Bjäre Race i augusti om någon vill ha en till stor regatta att sikta på.',
     false, NOW() - INTERVAL '2 days')
  ON CONFLICT (id) DO NOTHING;

  -- t3: Fjäderholmarna första turen
  INSERT INTO forum_posts (id, thread_id, user_id, body, in_spam_queue, created_at) VALUES
    ('22222222-0000-4a00-b000-000000001301', t3, anders_id,
     'Fjäderholmarna är perfekt första tur. Korta sträckor, väl markerade leder, mycket annan trafik gör det enklare. Tajma vinden — undvik byig sydväst första gången.',
     false, NOW() - INTERVAL '1 day 18 hours'),
    ('22222222-0000-4a00-b000-000000001302', t3, johan_id,
     'Tack! Ska kolla SMHI och välja en lugn dag.',
     false, NOW() - INTERVAL '1 day'),
    ('22222222-0000-4a00-b000-000000001303', t3, sofia_id,
     'Och stäng av telefonen. Lyssna på vinden, kolla seglet, känn båten. Det är hela poängen med segling.',
     false, NOW() - INTERVAL '14 hours')
  ON CONFLICT (id) DO NOTHING;

  -- t4: Nimbus 27 Family-tips
  INSERT INTO forum_posts (id, thread_id, user_id, body, in_spam_queue, created_at) VALUES
    ('22222222-0000-4a00-b000-000000001401', t4, tobias_id,
     'På 27:an: kolla servobalgen, drevoljan, vattenkylare-elementet (impeller). Och alla genomföringar — slangklämmor blir lösa snabbare än man tror.',
     false, NOW() - INTERVAL '6 days'),
    ('22222222-0000-4a00-b000-000000001402', t4, mikael_id,
     'Tobias — bra checklista. Drevoljan bytte jag förra veckan. Impellern såg jag inte alls senaste året.',
     false, NOW() - INTERVAL '5 days'),
    ('22222222-0000-4a00-b000-000000001403', t4, anders_id,
     'Glöm inte zinken på drevet. Ska bytas årligen i bräckt vatten. Många missar.',
     false, NOW() - INTERVAL '20 hours')
  ON CONFLICT (id) DO NOTHING;

  -- t5: Volvo Penta D3
  INSERT INTO forum_posts (id, thread_id, user_id, body, in_spam_queue, created_at) VALUES
    ('22222222-0000-4a00-b000-000000001501', t5, anders_id,
     'Drar säkringen helt över vintern. Grundvärmare drar 200W kontinuerligt — inget vatten som behöver hållas varm i en avställd båt på land.',
     false, NOW() - INTERVAL '5 days 12 hours'),
    ('22222222-0000-4a00-b000-000000001502', t5, tobias_id,
     'Anders, det är så jag gör också. Volvo dokumenterar att man kan låta den stå på men det finns ingen anledning.',
     false, NOW() - INTERVAL '4 days'),
    ('22222222-0000-4a00-b000-000000001503', t5, mikael_id,
     'Provade det förra året — samma resultat. Sparar el och inget krav.',
     false, NOW() - INTERVAL '1 day')
  ON CONFLICT (id) DO NOTHING;

  -- t6: Havsöring vid Dalarö
  INSERT INTO forum_posts (id, thread_id, user_id, body, in_spam_queue, created_at) VALUES
    ('22222222-0000-4a00-b000-000000001601', t6, lars_id,
     'Hade två fina utanför Aspö i tisdags. Fluga: stor tubfluga, brun/röd. Gick på morgnar.',
     false, NOW() - INTERVAL '4 days'),
    ('22222222-0000-4a00-b000-000000001602', t6, erik_id,
     'Lars, prova även Lurpasset om du tål lite vind. Strömmen drar in fisk där.',
     false, NOW() - INTERVAL '2 days'),
    ('22222222-0000-4a00-b000-000000001603', t6, sofia_id,
     'Inte havsöring men gädda har det varit bra om i Lerviksudden senaste veckan.',
     false, NOW() - INTERVAL '11 hours')
  ON CONFLICT (id) DO NOTHING;

  -- t7: Slukfiske från kajak
  INSERT INTO forum_posts (id, thread_id, user_id, body, in_spam_queue, created_at) VALUES
    ('22222222-0000-4a00-b000-000000001701', t7, lars_id,
     'Funkar om du har rätt kajak. Sit-on-top är överlägset sit-in. Ha en kniv på dig och nät i benen — fisk blir vild i kajak.',
     false, NOW() - INTERVAL '7 days'),
    ('22222222-0000-4a00-b000-000000001702', t7, sofia_id,
     'Lars — sit-on-top är på listan. Tack.',
     false, NOW() - INTERVAL '6 days'),
    ('22222222-0000-4a00-b000-000000001703', t7, camilla_id,
     'Jag fiskar inte men paddlar kajak ofta. Säkerheten — alltid livväst, även om du är van. Och berätta för någon på land var du paddlar.',
     false, NOW() - INTERVAL '3 days')
  ON CONFLICT (id) DO NOTHING;

  -- t8: iSUP eller hård bräda
  INSERT INTO forum_posts (id, thread_id, user_id, body, in_spam_queue, created_at) VALUES
    ('22222222-0000-4a00-b000-000000001801', t8, camilla_id,
     'Hård bräda är 30% snabbare och stabilare. iSUP är 100% mer praktiskt — får plats i bagageluckan och tål att slänga in i kajak. För Tyresö och Värmdö-vikar — iSUP är rätt val.',
     false, NOW() - INTERVAL '2 days 18 hours'),
    ('22222222-0000-4a00-b000-000000001802', t8, sofia_id,
     'iSUP här. Köpte en Red Paddle förra året — har inte tappat mig en gång. Bra på 95%.',
     false, NOW() - INTERVAL '1 day 12 hours'),
    ('22222222-0000-4a00-b000-000000001803', t8, johan_id,
     'iSUP sparar plats om man inte har båtklubbsförvaring.',
     false, NOW() - INTERVAL '8 hours')
  ON CONFLICT (id) DO NOTHING;

  -- t9: Kajakrutt Värmdö → Bullerö
  INSERT INTO forum_posts (id, thread_id, user_id, body, in_spam_queue, created_at) VALUES
    ('22222222-0000-4a00-b000-000000001901', t9, sofia_id,
     'Tagit halva sträckan från Stavsnäs. Räkna 5–6 timmar enkel tur i bra väder. Mat med dig — på Bullerö finns inget. Vatten bara på sommaren från brunnen.',
     false, NOW() - INTERVAL '11 days'),
    ('22222222-0000-4a00-b000-000000001902', t9, camilla_id,
     'Bra tips. Kolla även strömmar — det kan vara stor skillnad i bukten norr om Bullerö.',
     false, NOW() - INTERVAL '8 days'),
    ('22222222-0000-4a00-b000-000000001903', t9, erik_id,
     'Vid Bullerö blåser det ofta hårdare än prognosen säger. Ha en plan B.',
     false, NOW() - INTERVAL '4 days')
  ON CONFLICT (id) DO NOTHING;

  -- t10: VHF kanal 16
  INSERT INTO forum_posts (id, thread_id, user_id, body, in_spam_queue, created_at) VALUES
    ('22222222-0000-4a00-b000-000000002001', t10, anders_id,
     'Erik säger sanningen. Jag har sett DSC-knappen tryckas av nybörjare som inte hörde någon röst tillbaka — för att de inte hade VHF:en på kanal 16. DSC är bra men sätt VHF:en på kanal 16 också.',
     false, NOW() - INTERVAL '14 days'),
    ('22222222-0000-4a00-b000-000000002002', t10, birgitta_id,
     'Plus: lyssna på kanal 16 hela vägen. Du hör annan trafik, väderlarm och andras nödanrop. Det är båtfolks-radio som funkar.',
     false, NOW() - INTERVAL '12 days'),
    ('22222222-0000-4a00-b000-000000002003', t10, johan_id,
     'Tack Erik. Jag visste inte exakt detta — har bara koll på DSC.',
     false, NOW() - INTERVAL '5 days'),
    ('22222222-0000-4a00-b000-000000002004', t10, patrik_id,
     'Bra påminnelse. Borde vara obligatorisk skylt i alla nya båtar.',
     false, NOW() - INTERVAL '5 hours')
  ON CONFLICT (id) DO NOTHING;

  -- t11: Windy vs Yr
  INSERT INTO forum_posts (id, thread_id, user_id, body, in_spam_queue, created_at) VALUES
    ('22222222-0000-4a00-b000-000000002101', t11, erik_id,
     'Patrik, samma här. ECMWF i Windy är bäst för 24–48h. SMHI för officiella varningar.',
     false, NOW() - INTERVAL '8 days'),
    ('22222222-0000-4a00-b000-000000002102', t11, anders_id,
     'Yr för korta uppdateringar. ECMWF för planering. SMHI som backup. Allt från en gratis-app.',
     false, NOW() - INTERVAL '6 days'),
    ('22222222-0000-4a00-b000-000000002103', t11, hanna_id,
     'I Bohuslän väger jag Yr tyngre. Här i Smögen är norska modeller mer pålitliga.',
     false, NOW() - INTERVAL '1 day')
  ON CONFLICT (id) DO NOTHING;

  -- t12: Bottenfärg
  INSERT INTO forum_posts (id, thread_id, user_id, body, in_spam_queue, created_at) VALUES
    ('22222222-0000-4a00-b000-000000002201', t12, anders_id,
     'Mille NCT funkar bra i bräckt vatten. Hempel har bättre erfarenheter än International för Stockholms skärgård. Slipa lätt och rolla — håller två säsonger.',
     false, NOW() - INTERVAL '9 days'),
    ('22222222-0000-4a00-b000-000000002202', t12, mikael_id,
     'Tobias, vi har Mille NCT på Brisen — bra i vårt område. Ingen reklam.',
     false, NOW() - INTERVAL '7 days'),
    ('22222222-0000-4a00-b000-000000002203', t12, patrik_id,
     'Hempel Mille Optima fungerar också. Lite dyrare men håller längre i färskvatten.',
     false, NOW() - INTERVAL '2 days')
  ON CONFLICT (id) DO NOTHING;

  -- t13: Stående rigg
  INSERT INTO forum_posts (id, thread_id, user_id, body, in_spam_queue, created_at) VALUES
    ('22222222-0000-4a00-b000-000000002301', t13, erik_id,
     'Anders — 22 år är på gränsen. Riggers konsensus är 15 år eller 30 000 NM. Inspektion först — om vant visar sprickor eller röst på changeur, byt.',
     false, NOW() - INTERVAL '13 days'),
    ('22222222-0000-4a00-b000-000000002302', t13, birgitta_id,
     'Bytte hela riggen på Astrid efter 25 år. Var i tid — flera vant hade börjat öppna sig vid svängen. Inte värt risken.',
     false, NOW() - INTERVAL '10 days'),
    ('22222222-0000-4a00-b000-000000002303', t13, patrik_id,
     'Riggen är inte stället att spara pengar. Bytte mina vid 18 år.',
     false, NOW() - INTERVAL '3 days')
  ON CONFLICT (id) DO NOTHING;

  -- t14: Smögens gästhamn
  INSERT INTO forum_posts (id, thread_id, user_id, body, in_spam_queue, created_at) VALUES
    ('22222222-0000-4a00-b000-000000002401', t14, hanna_id,
     'Senaste sommaren var det fullt redan kl 11 på fredagen. Måste vara där tidigt.',
     false, NOW() - INTERVAL '5 days 18 hours'),
    ('22222222-0000-4a00-b000-000000002402', t14, anders_id,
     'Eller — boka. Smögens hamn tar bokningar via telefon. Lite stelt men säkrar plats.',
     false, NOW() - INTERVAL '3 days'),
    ('22222222-0000-4a00-b000-000000002403', t14, birgitta_id,
     'I Bohuslän är hamnar generellt fullare än Stockholm i juli. Planera framåt.',
     false, NOW() - INTERVAL '18 hours')
  ON CONFLICT (id) DO NOTHING;

  -- t15: Loppis Garmin
  INSERT INTO forum_posts (id, thread_id, user_id, body, in_spam_queue, created_at) VALUES
    ('22222222-0000-4a00-b000-000000002501', t15, lars_id,
     'Hur gammal är den? Och fungerar AIS-mottagning i den modellen?',
     false, NOW() - INTERVAL '4 days'),
    ('22222222-0000-4a00-b000-000000002502', t15, maja_id,
     'Lars — köpt 2018. Nej, ingen AIS i 521s — det kom först i 7-serien. Ren plottner med GPS.',
     false, NOW() - INTERVAL '3 days 18 hours'),
    ('22222222-0000-4a00-b000-000000002503', t15, johan_id,
     'Intresserad. Skickar PM. Kan jag hämta i Saltsjöbaden i helgen?',
     false, NOW() - INTERVAL '1 day')
  ON CONFLICT (id) DO NOTHING;

  RAISE NOTICE 'Forum seed klar. 12 nya användare, 15 nya trådar, ~115 nya svar.';
END
$persona_seed$;
