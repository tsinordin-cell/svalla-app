-- ═══════════════════════════════════════════════════════════════════════════
-- MASTER_MIGRATION_2026_04_26.sql
-- ═══════════════════════════════════════════════════════════════════════════
--
-- Tom: KÖR DENNA EN GÅNG i Supabase SQL Editor.
-- Skapar nya tabeller för: spara öar, partner-inquiries, e-postlista.
-- Idempotent (CREATE TABLE IF NOT EXISTS) — säker att köra om.
--
-- ═══════════════════════════════════════════════════════════════════════════

BEGIN;

-- ─── 1. saved_islands — användares sparade öar ─────────────────────────────
CREATE TABLE IF NOT EXISTS saved_islands (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  island_slug  TEXT NOT NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, island_slug)
);

CREATE INDEX IF NOT EXISTS idx_saved_islands_user ON saved_islands(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_islands_slug ON saved_islands(island_slug);

ALTER TABLE saved_islands ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own saves" ON saved_islands;
CREATE POLICY "Users can view own saves" ON saved_islands
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own saves" ON saved_islands;
CREATE POLICY "Users can insert own saves" ON saved_islands
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own saves" ON saved_islands;
CREATE POLICY "Users can delete own saves" ON saved_islands
  FOR DELETE USING (auth.uid() = user_id);

-- Räkna sparade per ö (för socialt bevis på ösidor)
DROP POLICY IF EXISTS "Public can count saves" ON saved_islands;
CREATE POLICY "Public can count saves" ON saved_islands
  FOR SELECT USING (TRUE);
-- (Public count är OK eftersom saved_islands är aggregerad data, ej PII)


-- ─── 2. partner_inquiries — B2B-leads från /partner ────────────────────────
CREATE TABLE IF NOT EXISTS partner_inquiries (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name TEXT NOT NULL,
  contact_name  TEXT,
  email         TEXT NOT NULL,
  phone         TEXT,
  category      TEXT,                              -- 'restaurang' | 'hamn' | 'upplevelse' | 'annat'
  island_slug   TEXT,                              -- vilken ö (om relevant)
  tier          TEXT,                              -- 'bas' | 'standard' | 'premium'
  message       TEXT,
  status        TEXT NOT NULL DEFAULT 'new',       -- 'new' | 'contacted' | 'closed' | 'lost'
  source        TEXT DEFAULT 'partner-page',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  contacted_at  TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_partner_inquiries_status  ON partner_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_partner_inquiries_created ON partner_inquiries(created_at DESC);

ALTER TABLE partner_inquiries ENABLE ROW LEVEL SECURITY;

-- Anon kan INSERT (formulär från /partner) men INTE SELECT
DROP POLICY IF EXISTS "Anon can submit inquiry" ON partner_inquiries;
CREATE POLICY "Anon can submit inquiry" ON partner_inquiries
  FOR INSERT WITH CHECK (TRUE);

-- Bara service_role kan SELECT (Tom hämtar via admin-vy senare)


-- ─── 3. email_subscribers — nyhetsbrev ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS email_subscribers (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email           TEXT NOT NULL UNIQUE,
  source          TEXT,                            -- 'homepage-footer' | 'island-page' | 'min-skargard' | 'partner-page'
  preferences     JSONB DEFAULT '{}'::jsonb,       -- { weekly_tips: true, season_alerts: true }
  confirmed       BOOLEAN NOT NULL DEFAULT FALSE,  -- double-opt-in (du sätter via Resend webhook)
  unsubscribed    BOOLEAN NOT NULL DEFAULT FALSE,
  user_id         UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  confirmed_at    TIMESTAMPTZ,
  unsubscribed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_email_subscribers_email   ON email_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_email_subscribers_active  ON email_subscribers(confirmed, unsubscribed)
  WHERE confirmed = TRUE AND unsubscribed = FALSE;

ALTER TABLE email_subscribers ENABLE ROW LEVEL SECURITY;

-- Anon kan INSERT (signup-formulär) men inte SELECT
DROP POLICY IF EXISTS "Anon can subscribe" ON email_subscribers;
CREATE POLICY "Anon can subscribe" ON email_subscribers
  FOR INSERT WITH CHECK (TRUE);

-- User kan SE & DELETE (unsub) sin egen rad om kopplad
DROP POLICY IF EXISTS "User can view own subscription" ON email_subscribers;
CREATE POLICY "User can view own subscription" ON email_subscribers
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "User can unsubscribe own" ON email_subscribers;
CREATE POLICY "User can unsubscribe own" ON email_subscribers
  FOR UPDATE USING (auth.uid() = user_id);


-- ─── 4. RPC: räkna sparade per ö (cachad public count) ─────────────────────
-- För socialt bevis på ösidor utan att läcka user_id
CREATE OR REPLACE FUNCTION saved_count_for_island(slug TEXT)
RETURNS INTEGER
LANGUAGE SQL STABLE
AS $$
  SELECT COUNT(*)::INTEGER FROM saved_islands WHERE island_slug = slug;
$$;

GRANT EXECUTE ON FUNCTION saved_count_for_island(TEXT) TO anon, authenticated;


-- ─── 5. RPC: hämta sparade öar för inloggad ────────────────────────────────
CREATE OR REPLACE FUNCTION my_saved_islands()
RETURNS TABLE(island_slug TEXT, created_at TIMESTAMPTZ)
LANGUAGE SQL STABLE SECURITY DEFINER
AS $$
  SELECT island_slug, created_at FROM saved_islands
  WHERE user_id = auth.uid()
  ORDER BY created_at DESC;
$$;

GRANT EXECUTE ON FUNCTION my_saved_islands() TO authenticated;


COMMIT;

-- ═══════════════════════════════════════════════════════════════════════════
-- Verifiering: kör efter COMMIT
-- ═══════════════════════════════════════════════════════════════════════════
SELECT
  'saved_islands' AS table_name, COUNT(*) AS rows FROM saved_islands
UNION ALL
SELECT 'partner_inquiries', COUNT(*) FROM partner_inquiries
UNION ALL
SELECT 'email_subscribers', COUNT(*) FROM email_subscribers;
