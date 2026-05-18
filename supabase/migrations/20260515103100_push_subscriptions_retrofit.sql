-- Retrofit-migration 2026-05-15: push_subscriptions saknade CREATE TABLE-migration.
-- Tabellen existerar live (RLS-policies applicerade 2026-05-02), men ingen tidigare
-- migration deklarerade schemat. Detta är en idempotent retrofit baserat på faktisk
-- användning i src/lib/push-server.ts och src/app/api/push/*.
--
-- Kolumner härleds från SELECT-listor i koden:
--   user_id, endpoint, p256dh, auth
--
-- Strikt CREATE TABLE IF NOT EXISTS — ingen DROP, ingen ALTER.

CREATE TABLE IF NOT EXISTS push_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  endpoint text NOT NULL UNIQUE,
  p256dh text NOT NULL,
  auth text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS push_subscriptions_user_id_idx ON push_subscriptions(user_id);
