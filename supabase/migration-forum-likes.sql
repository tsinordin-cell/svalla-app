-- ─────────────────────────────────────────────────────────────────────────────
-- FORUM LIKES — Svalla.se
-- Kör i Supabase SQL editor efter migration-forum.sql.
-- ─────────────────────────────────────────────────────────────────────────────

-- ── 1. forum_post_likes ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS forum_post_likes (
  post_id     uuid        NOT NULL REFERENCES forum_posts(id) ON DELETE CASCADE,
  user_id     uuid        NOT NULL REFERENCES auth.users(id)  ON DELETE CASCADE,
  created_at  timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (post_id, user_id)
);

CREATE INDEX IF NOT EXISTS forum_post_likes_post_id_idx ON forum_post_likes (post_id);

ALTER TABLE forum_post_likes ENABLE ROW LEVEL SECURITY;

-- Alla kan läsa likes (för att visa räknaren)
CREATE POLICY "forum_post_likes_public_read"
  ON forum_post_likes FOR SELECT USING (true);

-- Inloggad kan gilla
CREATE POLICY "forum_post_likes_insert"
  ON forum_post_likes FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL AND user_id = auth.uid());

-- Ägaren kan ångra sin like
CREATE POLICY "forum_post_likes_delete_own"
  ON forum_post_likes FOR DELETE
  USING (user_id = auth.uid());
