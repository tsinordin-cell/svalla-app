-- ═══════════════════════════════════════════════════════════════════════════
-- MIGRATION_2026_05_05_loppis_cleanup_rename_personas.sql
-- ═══════════════════════════════════════════════════════════════════════════
--
-- Tom: Kör i Supabase SQL Editor.
--
-- Tre saker:
--   1. Tar bort 3 av 5 fake Loppis-annonser (de billigaste/minst trovärdiga)
--   2. Lyfter Comfort 32 (Toms riktiga annons) till nyast i feeden
--   3. Byter alla 12 persona-usernames från 'förnamn_initial'-mönstret till
--      en mix av stilar (smeknamn, dot-format, år, komprimerat efternamn)
--      så det inte längre ser ut som auto-genererad seed-data.
--
-- IDEMPOTENT: alla UPDATEs är safe att köra om — den kollar gamla username:et.
-- ═══════════════════════════════════════════════════════════════════════════

BEGIN;

-- ── 1. TA BORT 3 SEED-ANNONSER ─────────────────────────────────────────────
-- Behåller de två båt-annonserna (Bavaria 32 + Hanse 348) eftersom de
-- representerar den prisklass och målgrupp Svalla vill prata till.
-- Tar bort tillbehör (väst), kajak och utombordare — de ser ut som Blocket-
-- skräp i grid:en.
--
-- Cascadar saves/likes/replies via existing FK-constraints.
DELETE FROM forum_threads
WHERE category_id = 'loppis'
  AND title IN (
    'Räddningsväst-set Baltic 165N (4 st vuxen)',
    'Prijon Marlin havskajak — komplett paket med utrustning',
    'Yamaha F40 utombordare — låga timmar, full service'
  );


-- ── 2. LYFT COMFORT 32 TILL NYAST ──────────────────────────────────────────
-- Sätt created_at till nu så Toms egen annons hamnar överst i sort-by-newest.
-- Last_reply_at uppdateras också så last-reply-sortering också sätter den först.
UPDATE forum_threads
SET
  created_at      = NOW(),
  last_reply_at   = NOW()
WHERE id = '19cb8f74-225f-457b-87cc-57b4d73a7a73';


-- ── 3. BYT 12 PERSONA-USERNAMES — variation, mindre fake-känsla ────────────
-- Förra mönstret: alla var "förnamn_initial" → tomma signal att det är seed.
-- Nya stilen mixar 5 format som man ser på riktiga svenska forum/Blocket:
--   * komprimerat (andersw, mikaelsj, larnils, camillaw)
--   * dot-initial (hanna.e, patrik.k, kapten.erik)
--   * dash + smeknamn (joppe-n)
--   * smeknamn (tobben, bittan58, seglar_maja)
--   * med år (sofiab83, bittan58)

UPDATE users SET username = 'andersw'     WHERE username = 'anders_w';
UPDATE users SET username = 'seglar_maja' WHERE username = 'maja_l';
UPDATE users SET username = 'kapten.erik' WHERE username = 'erik_h';
UPDATE users SET username = 'sofiab83'    WHERE username = 'sofia_b';
UPDATE users SET username = 'larnils'     WHERE username = 'lars_n';
UPDATE users SET username = 'hanna.e'     WHERE username = 'hanna_e';
UPDATE users SET username = 'mikaelsj'    WHERE username = 'mikael_s';
UPDATE users SET username = 'bittan58'    WHERE username = 'birgitta_l';
UPDATE users SET username = 'patrik.k'    WHERE username = 'patrik_k';
UPDATE users SET username = 'joppe-n'     WHERE username = 'johan_n';
UPDATE users SET username = 'camillaw'    WHERE username = 'camilla_w';
UPDATE users SET username = 'tobben'      WHERE username = 'tobias_e';

-- Sync auth.users.raw_user_meta_data så det är konsistent vid framtida
-- onAuthStateChange-events (Nav läser primärt public.users men auth-metadata
-- kan poppa upp i debugging/email-flöden).
UPDATE auth.users SET raw_user_meta_data = raw_user_meta_data || '{"username":"andersw"}'::jsonb     WHERE id = '00000000-c0c0-4a00-b000-000000000001';
UPDATE auth.users SET raw_user_meta_data = raw_user_meta_data || '{"username":"seglar_maja"}'::jsonb WHERE id = '00000000-c0c0-4a00-b000-000000000002';
UPDATE auth.users SET raw_user_meta_data = raw_user_meta_data || '{"username":"kapten.erik"}'::jsonb WHERE id = '00000000-c0c0-4a00-b000-000000000003';
UPDATE auth.users SET raw_user_meta_data = raw_user_meta_data || '{"username":"sofiab83"}'::jsonb    WHERE id = '00000000-c0c0-4a00-b000-000000000004';
UPDATE auth.users SET raw_user_meta_data = raw_user_meta_data || '{"username":"larnils"}'::jsonb     WHERE id = '00000000-c0c0-4a00-b000-000000000005';
UPDATE auth.users SET raw_user_meta_data = raw_user_meta_data || '{"username":"hanna.e"}'::jsonb     WHERE id = '00000000-c0c0-4a00-b000-000000000006';
UPDATE auth.users SET raw_user_meta_data = raw_user_meta_data || '{"username":"mikaelsj"}'::jsonb    WHERE id = '00000000-c0c0-4a00-b000-000000000007';
UPDATE auth.users SET raw_user_meta_data = raw_user_meta_data || '{"username":"bittan58"}'::jsonb    WHERE id = '00000000-c0c0-4a00-b000-000000000008';
UPDATE auth.users SET raw_user_meta_data = raw_user_meta_data || '{"username":"patrik.k"}'::jsonb    WHERE id = '00000000-c0c0-4a00-b000-000000000009';
UPDATE auth.users SET raw_user_meta_data = raw_user_meta_data || '{"username":"joppe-n"}'::jsonb     WHERE id = '00000000-c0c0-4a00-b000-00000000000a';
UPDATE auth.users SET raw_user_meta_data = raw_user_meta_data || '{"username":"camillaw"}'::jsonb    WHERE id = '00000000-c0c0-4a00-b000-00000000000b';
UPDATE auth.users SET raw_user_meta_data = raw_user_meta_data || '{"username":"tobben"}'::jsonb      WHERE id = '00000000-c0c0-4a00-b000-00000000000c';

COMMIT;

-- ── AUDIT: HITTA ANDRA "förnamn_initial"-NAMN ──────────────────────────────
-- Listar ALLA users som har username i mönstret 'ord_x' (1-2 bokstäver
-- efter understreck) — så vi ser om det finns RIKTIGA användare som också
-- råkar ha den fake-känslande stilen och som vi kanske vill be byta.
--
-- Personas som migrationen ovan redan rensar är exkluderade (id-prefix c0c0).
-- Kör SEPARAT i SQL Editor efter migrationen — read-only:
--
--   SELECT u.id, u.username, u.created_at,
--          (SELECT count(*) FROM forum_threads WHERE user_id = u.id) AS forum_threads,
--          (SELECT count(*) FROM trips WHERE user_id = u.id) AS trips
--     FROM users u
--    WHERE u.username ~ '^[a-z]+_[a-z]{1,2}$'
--      AND u.id::text NOT LIKE '00000000-c0c0-%'
--    ORDER BY u.created_at DESC;
--
-- Om det finns träffar — diskutera med Tom innan vi byter (riktiga användare
-- ska inte få sitt valda username utbytt utan deras vetskap).

-- ── VERIFIERA EFTER ────────────────────────────────────────────────────────
-- Kör dessa selects för att bekräfta att allt blev rätt:
--
--   SELECT title, created_at FROM forum_threads
--    WHERE category_id='loppis' ORDER BY created_at DESC;
--
--   SELECT username FROM users
--    WHERE id IN (
--      '00000000-c0c0-4a00-b000-000000000001',
--      '00000000-c0c0-4a00-b000-000000000002',
--      '00000000-c0c0-4a00-b000-000000000003',
--      '00000000-c0c0-4a00-b000-000000000004',
--      '00000000-c0c0-4a00-b000-000000000005',
--      '00000000-c0c0-4a00-b000-000000000006',
--      '00000000-c0c0-4a00-b000-000000000007',
--      '00000000-c0c0-4a00-b000-000000000008',
--      '00000000-c0c0-4a00-b000-000000000009',
--      '00000000-c0c0-4a00-b000-00000000000a',
--      '00000000-c0c0-4a00-b000-00000000000b',
--      '00000000-c0c0-4a00-b000-00000000000c'
--    ) ORDER BY username;
