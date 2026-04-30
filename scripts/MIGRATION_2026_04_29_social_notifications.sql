-- ═══════════════════════════════════════════════════════════════════════════
-- MIGRATION_2026_04_29_social_notifications.sql
-- ═══════════════════════════════════════════════════════════════════════════
--
-- Tom: Kör i Supabase SQL Editor.
-- Lägger till stöd för 'friend_visit'-notifieringar (sociala notifieringar
-- när någon du följer besöker en ny ö).
--
-- ═══════════════════════════════════════════════════════════════════════════

BEGIN;

-- Lägg till kolumn för ö-slug i notifications
ALTER TABLE notifications
  ADD COLUMN IF NOT EXISTS related_island_slug TEXT;

CREATE INDEX IF NOT EXISTS idx_notifications_island
  ON notifications(related_island_slug)
  WHERE related_island_slug IS NOT NULL;

-- Index för dedup-query: hitta notif för (user, actor, type) idag
CREATE INDEX IF NOT EXISTS idx_notifications_dedup
  ON notifications(user_id, actor_id, type, created_at DESC);

COMMIT;

-- Verifiering:
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'notifications' AND column_name = 'related_island_slug';
