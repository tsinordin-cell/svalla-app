-- ═══════════════════════════════════════════════════════════════════════════
-- MIGRATION_2026_04_29_partner_stripe.sql
-- ═══════════════════════════════════════════════════════════════════════════
--
-- Tom: KÖR DENNA i Supabase SQL Editor.
-- Lägger till Stripe-kolumner till partner_inquiries så webhook kan
-- spegla betalningsstatus i admin-vyn.
--
-- ═══════════════════════════════════════════════════════════════════════════

BEGIN;

ALTER TABLE partner_inquiries
  ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT,
  ADD COLUMN IF NOT EXISTS stripe_customer_id     TEXT,
  ADD COLUMN IF NOT EXISTS stripe_status          TEXT,
  ADD COLUMN IF NOT EXISTS activated_at           TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_partner_inquiries_stripe_sub ON partner_inquiries(stripe_subscription_id);

-- ── email_log för spårning av utskick ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS email_log (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email      TEXT NOT NULL,
  template   TEXT NOT NULL,
  resend_id  TEXT,
  sent_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_email_log_email_template
  ON email_log(email, template);
CREATE INDEX IF NOT EXISTS idx_email_log_sent_at
  ON email_log(sent_at DESC);

ALTER TABLE email_log ENABLE ROW LEVEL SECURITY;
-- Bara service_role läser/skriver — ingen offentlig policy

COMMIT;

-- Verifiering:
SELECT column_name, data_type FROM information_schema.columns
WHERE table_name = 'partner_inquiries' AND column_name LIKE 'stripe%';

SELECT 'email_log' AS table_name, COUNT(*) AS rows FROM email_log;
