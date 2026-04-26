-- Forum thread subscriptions
-- Kör i Supabase SQL Editor

CREATE TABLE IF NOT EXISTS forum_subscriptions (
  user_id    uuid NOT NULL REFERENCES users(id)         ON DELETE CASCADE,
  thread_id  uuid NOT NULL REFERENCES forum_threads(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, thread_id)
);

ALTER TABLE forum_subscriptions ENABLE ROW LEVEL SECURITY;

-- Egna rader: full CRUD
CREATE POLICY "forum_subscriptions_own" ON forum_subscriptions
  FOR ALL USING (auth.uid() = user_id);
