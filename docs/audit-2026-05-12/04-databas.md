# Dimension 4 — Databas-integritet

## [P1] Icke-idempotenta CREATE POLICY utan DROP-skydd
**Fil:** `supabase/migrations/20260502000029_add-visited-islands.sql:22-33`, `supabase/migrations/20260502000020_migration-events-articles.sql:64-84`, `supabase/migrations/20260502000040_supabase_rls_migration.sql:10-185`
**Beskrivning:** 50+ `CREATE POLICY`-satser saknar `DROP POLICY IF EXISTS` prefix. Migration kraschar vid re-run med "policy already exists".
**Fix:** Lägg till `DROP POLICY IF EXISTS "..." ON tablename;` före varje `CREATE POLICY`. Nyaste migrations (`20260506000001`, `20260507000001`) gör detta korrekt — använd dem som mall.
**Status:** VERIFIERAT

---

## [P1] Forum-triggers saknar exception handling
**Fil:** `supabase/migrations/20260502000007_migration-forum.sql:55-95`
**Beskrivning:** `forum_after_post_insert` och `forum_after_thread_insert` uppdaterar reply_count och category counters utan `BEGIN...EXCEPTION...END`. Om subquery returnerar NULL (t.ex. saknad category_id) failar trigger silent och counters blir inkonsistenta.
**Fix:**
```sql
BEGIN
  UPDATE forum_categories SET post_count = post_count + 1 WHERE ...;
EXCEPTION WHEN OTHERS THEN
  RAISE WARNING 'forum counter update failed: %', SQLERRM;
END;
```
**Status:** VERIFIERAT

---

## [P1] `enforce_forum_mod_columns()` trigger — N+1 user lookup per UPDATE
**Fil:** `supabase/migrations/20260502000024_migration-rls-pass-b.sql:55-57`
**Beskrivning:** Trigger kör `SELECT is_admin FROM users WHERE id = auth.uid()` för varje row-UPDATE. Bulk-uppdateringar → N separate user-queries.
**Fix:** Cache admin-status i JWT claims eller flytta logiken till RLS-policy istället för trigger.
**Status:** VERIFIERAT

---

## [P2] JSONB utan schema-validering
**Fil:** `supabase/migrations/20260503000002_loppis_listing.sql:20`, `supabase/migrations/20260502000027_add-route-points.sql:6`
**Beskrivning:** `listing_data JSONB` och `route_points JSONB` har ingen CHECK-constraint eller trigger-validering. Schema dokumenteras enbart i kommentarer.
**Fix:** Acceptabel design för nuvarande skala — dokumentera förväntad struktur i kod + lägg till applikations-validering på inkommande data.
**Status:** VERIFIERAT — design-risk, ej kritiskt

---

## Verifierat OK — ingen åtgärd krävs

- **users.username UNIQUE:** Definierat som `text unique not null` i schema.sql. VERIFIERAT OK.
- **20260506000001_notifications_insert_policy.sql:** Använder `DROP POLICY IF EXISTS` korrekt. VERIFIERAT IDEMPOTENT.
- **20260507000001_analytics_events.sql:** `IF NOT EXISTS` konsekvent. VERIFIERAT IDEMPOTENT.
- **Forum-anonymisering (20260506000002):** SET NULL + app-maskering i `/api/account/delete`. VERIFIERAT KORREKT.
- **achievements/visited_islands upsert:** Använder `ON CONFLICT DO UPDATE`. VERIFIERAT IDEMPOTENT.
