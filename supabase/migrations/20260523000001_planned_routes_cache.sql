-- 2026-05-23 — Routing safety layer P2: cache route-paths i planned_routes
--
-- Bakgrund:
-- /api/route/calculate kör grid-A* över ~80 000 vattenpunkter mot 6 MB
-- swedish-coastline.json. För nya rutt-par tar det 30–120 sekunder. Idag
-- finns bara in-memory cache per Lambda-instans — kall start eller annan
-- Lambda kör om hela jobbet. Två besökare till samma /planera/[id] kan
-- bägge vänta ut grid-A*.
--
-- Lösning:
-- Cacha beräknad path + kvalitet + validering på planned_routes-raden.
-- Andra besöket på samma rutt-id hämtar svaret direkt från DB (<10 ms).
-- Cache invalideras manuellt (TRUNCATE eller UPDATE SET cached_at=NULL)
-- om coastline-datan uppdateras eller pathfinder-logiken ändras.
--
-- Idempotent: säker att köra flera gånger.

-- ── Kolumner ───────────────────────────────────────────────────────────────

ALTER TABLE planned_routes
  ADD COLUMN IF NOT EXISTS cached_path     jsonb,
  ADD COLUMN IF NOT EXISTS cached_quality  text,
  ADD COLUMN IF NOT EXISTS cached_validated boolean,
  ADD COLUMN IF NOT EXISTS cached_at       timestamptz;

-- ── CHECK constraint på cached_quality ─────────────────────────────────────
-- Säkerställer att bara giltiga RouteQuality-värden skrivs.
-- 'straight' är bortaget från app-kod 2026-05-23 men accepteras här ifall
-- gammal kod någonsin skriver tillbaka legacy-värdet (defensive).

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'planned_routes_cached_quality_check'
  ) THEN
    ALTER TABLE planned_routes
      ADD CONSTRAINT planned_routes_cached_quality_check
      CHECK (
        cached_quality IS NULL
        OR cached_quality IN ('precomputed', 'grid', 'waypoint', 'straight', 'unavailable')
      );
  END IF;
END $$;

-- ── Index för cache-invalidation queries ───────────────────────────────────
-- Används av admin-jobb som "rensa cache äldre än N dagar" eller
-- "räkna routes med cached_quality = 'unavailable'".

CREATE INDEX IF NOT EXISTS planned_routes_cached_at_idx
  ON planned_routes(cached_at)
  WHERE cached_at IS NOT NULL;

CREATE INDEX IF NOT EXISTS planned_routes_cached_quality_idx
  ON planned_routes(cached_quality)
  WHERE cached_quality IS NOT NULL;
