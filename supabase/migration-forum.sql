-- ─────────────────────────────────────────────────────────────────────────────
-- FORUM MVP — Svalla.se
-- Kör i Supabase SQL editor (supabase.com → project → SQL editor).
-- Säker att köra flera gånger (IF NOT EXISTS + OR REPLACE).
-- ─────────────────────────────────────────────────────────────────────────────

-- ── 1. Kategorier ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS forum_categories (
  id            text PRIMARY KEY,          -- slug, t.ex. 'segling'
  name          text        NOT NULL,
  description   text,
  icon          text        NOT NULL DEFAULT '💬',
  sort_order    int         NOT NULL DEFAULT 0,
  thread_count  int         NOT NULL DEFAULT 0,
  post_count    int         NOT NULL DEFAULT 0,
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- ── 2. Trådar ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS forum_threads (
  id                  uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id         text        NOT NULL REFERENCES forum_categories(id) ON DELETE CASCADE,
  user_id             uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title               text        NOT NULL CHECK (char_length(title) BETWEEN 5 AND 200),
  body                text        NOT NULL CHECK (char_length(body) BETWEEN 10 AND 10000),
  is_pinned           boolean     NOT NULL DEFAULT false,
  is_locked           boolean     NOT NULL DEFAULT false,
  view_count          int         NOT NULL DEFAULT 0,
  reply_count         int         NOT NULL DEFAULT 0,
  last_reply_at       timestamptz NOT NULL DEFAULT now(),
  last_reply_user_id  uuid        REFERENCES auth.users(id) ON DELETE SET NULL,
  in_spam_queue       boolean     NOT NULL DEFAULT false,  -- moderationskö för nya användare
  created_at          timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS forum_threads_category_id_idx   ON forum_threads (category_id, created_at DESC);
CREATE INDEX IF NOT EXISTS forum_threads_last_reply_at_idx ON forum_threads (last_reply_at DESC);

-- ── 3. Svar (posts) ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS forum_posts (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id     uuid        NOT NULL REFERENCES forum_threads(id) ON DELETE CASCADE,
  user_id       uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  body          text        NOT NULL CHECK (char_length(body) BETWEEN 1 AND 10000),
  is_deleted    boolean     NOT NULL DEFAULT false,
  in_spam_queue boolean     NOT NULL DEFAULT false,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS forum_posts_thread_id_idx ON forum_posts (thread_id, created_at ASC);

-- ── 4. Räknare (trigger) ─────────────────────────────────────────────────────
-- Håller reply_count + last_reply_at uppdaterat utan extra queries från appen.

CREATE OR REPLACE FUNCTION forum_after_post_insert()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  UPDATE forum_threads
  SET
    reply_count        = reply_count + 1,
    last_reply_at      = NEW.created_at,
    last_reply_user_id = NEW.user_id
  WHERE id = NEW.thread_id
    AND NEW.in_spam_queue = false;  -- räkna inte spam-köade svar

  UPDATE forum_categories
  SET post_count = post_count + 1
  WHERE id = (SELECT category_id FROM forum_threads WHERE id = NEW.thread_id)
    AND NEW.in_spam_queue = false;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_forum_post_insert ON forum_posts;
CREATE TRIGGER trg_forum_post_insert
  AFTER INSERT ON forum_posts
  FOR EACH ROW EXECUTE FUNCTION forum_after_post_insert();

CREATE OR REPLACE FUNCTION forum_after_thread_insert()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  UPDATE forum_categories
  SET thread_count = thread_count + 1
  WHERE id = NEW.category_id
    AND NEW.in_spam_queue = false;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_forum_thread_insert ON forum_threads;
CREATE TRIGGER trg_forum_thread_insert
  AFTER INSERT ON forum_threads
  FOR EACH ROW EXECUTE FUNCTION forum_after_thread_insert();

-- ── 5. RLS ───────────────────────────────────────────────────────────────────
ALTER TABLE forum_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_threads    ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_posts      ENABLE ROW LEVEL SECURITY;

-- Kategorier: alla kan läsa
CREATE POLICY "forum_categories_public_read"
  ON forum_categories FOR SELECT USING (true);

-- Trådar: alla kan läsa godkända; ägaren ser sina egna även i kö
CREATE POLICY "forum_threads_public_read"
  ON forum_threads FOR SELECT
  USING (in_spam_queue = false OR user_id = auth.uid());

-- Trådar: inloggad kan skapa
CREATE POLICY "forum_threads_insert"
  ON forum_threads FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL AND user_id = auth.uid());

-- Trådar: ägaren kan uppdatera (redigera) sin tråd
CREATE POLICY "forum_threads_update_own"
  ON forum_threads FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Svar: alla kan läsa godkända
CREATE POLICY "forum_posts_public_read"
  ON forum_posts FOR SELECT
  USING (in_spam_queue = false OR user_id = auth.uid());

-- Svar: inloggad kan skapa
CREATE POLICY "forum_posts_insert"
  ON forum_posts FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL AND user_id = auth.uid());

-- Svar: ägaren kan mjuk-radera
CREATE POLICY "forum_posts_soft_delete"
  ON forum_posts FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- ── 6. Seed — kategorier ─────────────────────────────────────────────────────
INSERT INTO forum_categories (id, name, description, icon, sort_order)
VALUES
  ('segling',         'Segling',              'Segelteknik, rutter, rigg och utrustning',       '⛵', 1),
  ('motorbat',        'Motorbåt',             'Motorteknik, bränsle, navigation och service',   '🚤', 2),
  ('fiske',           'Fiske',                'Fiskeplatser, regler, spön och drag',             '🎣', 3),
  ('paddling',        'Paddling',             'Kajak, SUP, kanot — allt som paddlas',            '🛶', 4),
  ('vader-sakerhet',  'Väder & säkerhet',     'SMHI-tips, passageplanering och nödlägen',        '🌤️', 5),
  ('teknik-underhall','Teknik & underhåll',   'Motor, elektronik, rigg, lackning och verkstad',  '🔧', 6),
  ('hamnar-bryggor',  'Hamnar & bryggor',     'Gästhamnstips, avgifter, ankringsplatser',        '⚓', 7),
  ('nybörjare',       'Nybörjare',            'Inga dumma frågor — fråga allt här',              '👋', 8),
  ('loppis',          'Loppis & köp/sälj',    'Utrustning, båtar, delar och evenemang',          '💰', 9)
ON CONFLICT (id) DO NOTHING;
