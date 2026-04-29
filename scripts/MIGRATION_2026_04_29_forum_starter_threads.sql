-- ═══════════════════════════════════════════════════════════════════════════
-- MIGRATION_2026_04_29_forum_starter_threads.sql
-- ═══════════════════════════════════════════════════════════════════════════
--
-- Tom: Kör i Supabase SQL Editor.
-- Skapar 10 starter-trådar i forumet så det inte ser tomt ut för första
-- nya användare. Trådarna ägs av tsinordin (admin-användaren).
--
-- IDEMPOTENT: ON CONFLICT DO NOTHING via deterministisk slug-baserad ID.
-- ═══════════════════════════════════════════════════════════════════════════

DO $$
DECLARE
  admin_uid UUID;
BEGIN
  -- Hämta admin-userns id (tsinordin)
  SELECT id INTO admin_uid FROM users WHERE username = 'tsinordin' LIMIT 1;
  IF admin_uid IS NULL THEN
    RAISE EXCEPTION 'Hittade inte användaren tsinordin — skapa kontot först eller ändra username i SQL';
  END IF;

  -- ── 10 starter-trådar — fördelade över kategorier ──
  INSERT INTO forum_threads (category_id, user_id, title, body, is_pinned, in_spam_queue, view_count, reply_count, last_reply_at)
  VALUES
    -- Segling (3)
    ('segling', admin_uid,
     'Bästa rutten Stockholm → Sandhamn för en helg?',
     'Är ny på vågorna och funderar på en weekend till Sandhamn. Vilken är klassiska rutten — direkt via Vaxholm, eller via Möja och Finnhamn? Hur lång tid tog det för er, och var stannade ni över?',
     true, false, 12, 0, NOW() - INTERVAL '2 hours'),

    ('segling', admin_uid,
     'Ankra utanför Möja — vilka vikar funkar?',
     'Vilka är de bästa ankarvikarna runt Möja? Helst vindskyddat från sydväst. Vill kunna spendera natten lugnt och inte behöva flytta i en byig fö.',
     false, false, 8, 0, NOW() - INTERVAL '5 hours'),

    ('segling', admin_uid,
     'Skärgårdens enklaste segelrutt för en nybörjare?',
     'Min sambo och jag har precis tagit förarintyg. Vilken är den absolut enklaste segelrutten man kan göra som nybörjare i Stockholms skärgård? Tänker max en helg, gärna nära Vaxholm.',
     false, false, 5, 0, NOW() - INTERVAL '1 day'),

    -- Motorbåt (1)
    ('motorbat', admin_uid,
     'Bensin- vs dieselbåt för skärgårdsturer?',
     'Funderar på att köpa en motorbåt för skärgården. Främst dagsturer, ibland övernattning. Är diesel värt prispåslaget om man kör 50–100 timmar per år? Eller räcker bensin?',
     false, false, 7, 0, NOW() - INTERVAL '3 hours'),

    -- Hamnar & bryggor (2)
    ('hamnar-bryggor', admin_uid,
     'Bästa gästhamnen i mellersta skärgården?',
     'Vilken gästhamn rekommenderar ni för en familj med två barn? Söker bra dusch, mat på plats och plats att svalka sig. Sandhamn eller Grinda — eller någon mer dold pärla?',
     true, false, 18, 0, NOW() - INTERVAL '4 hours'),

    ('hamnar-bryggor', admin_uid,
     'Kostnader för en helg i Sandhamns gästhamn?',
     'Hur mycket bör jag räkna med för en helg i KSSS-hamnen i juli? Vill veta vad jag behöver budgetera för båtplats, dusch, el och eventuell pump-out.',
     false, false, 6, 0, NOW() - INTERVAL '8 hours'),

    -- Nybörjare (1)
    ('nybörjare', admin_uid,
     'Min första båtsommar — vad ska jag absolut ha med?',
     'Skaffat min första segelbåt i vår och planerar första riktiga sommarn nu. Vad är de tre saker ni alltid har med er som rederi inte tänker på? Allt utöver det självklara (livräddning, sjökort, etc).',
     false, false, 14, 0, NOW() - INTERVAL '6 hours'),

    -- Väder & säkerhet (1)
    ('vader-sakerhet', admin_uid,
     'Vilken väder-app använder ni i skärgården?',
     'SMHI är default, men jag märker att vinden ofta avviker. Använder ni Windy, Yr, eller något annat? Vad är mest pålitligt för en helgseglare i Stockholms skärgård?',
     false, false, 9, 0, NOW() - INTERVAL '12 hours'),

    -- Fiske (1)
    ('fiske', admin_uid,
     'Bra plats för havsöring i mellersta skärgården?',
     'Är ni igång med havsöringen redan? Vart har ni fått bra fiske i april–maj? Helst plats man kan nå med båt utan extrem ytterskärgård.',
     false, false, 4, 0, NOW() - INTERVAL '1 day'),

    -- Teknik & underhåll (1)
    ('teknik-underhall', admin_uid,
     'Vinterförvaring — på land eller i sjön?',
     'Diskussion: vinterförvaring på land vs i sjön (i hamn med uppvärmning). Vad tycker ni är bäst för en plastbåt på 8 meter? Konkreta för- och nackdelar.',
     false, false, 11, 0, NOW() - INTERVAL '18 hours')
  ON CONFLICT DO NOTHING;

  RAISE NOTICE 'Lade till 10 starter-trådar för admin %', admin_uid;
END $$;

-- Verifiering:
SELECT category_id, COUNT(*) AS trådar
FROM forum_threads
GROUP BY category_id
ORDER BY category_id;
