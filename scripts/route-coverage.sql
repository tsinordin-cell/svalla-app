-- route-coverage.sql
--
-- Diagnostiska queries mot route_metrics för att hitta vilka start→end-par
-- som faller på 'straight' eller 'waypoint' (= dålig kvalitet) och därför
-- skulle gynnas mest av att läggas till precomputed-routes.json.
--
-- Kör i Supabase Studio SQL Editor.
-- Eller kör admin-vyn live: https://svalla.se/admin/routes


-- ─── 1. KVALITETSFÖRDELNING ÖVER 30 DAGAR ──────────────────────────────────
-- Snabb hälso-check: hur stor andel av rutterna är "premium" (precomputed/grid)
-- vs "fallback" (waypoint/straight)?

select
  quality,
  count(*)                                  as hits,
  round(avg(ms))                            as avg_ms,
  round(percentile_cont(0.95) within group (order by ms))::int as p95_ms,
  round(100.0 * count(*) / sum(count(*)) over (), 1) as pct
from route_metrics
where created_at > now() - interval '30 days'
group by quality
order by hits desc;


-- ─── 2. TOPP 30 FAILING-PAR (exakta koordinater) ──────────────────────────
-- Använder rounding till 2 decimaler ≈ 1 km tolerans (admin-vyn använder
-- 0.05° ≈ 5–6 km vilket är grövre). Här vill vi se kandidater i högre
-- upplösning för att passa precomputed-format.

select
  round(start_lat::numeric, 2) as start_lat_r,
  round(start_lng::numeric, 2) as start_lng_r,
  round(end_lat::numeric, 2)   as end_lat_r,
  round(end_lng::numeric, 2)   as end_lng_r,
  count(*)                      as hits,
  round(avg(ms))                as avg_ms,
  max(created_at)               as last_hit,
  -- Sample-koordinaterna som ska användas vid precompute (medianer)
  round(percentile_cont(0.5) within group (order by start_lat)::numeric, 4) as sample_start_lat,
  round(percentile_cont(0.5) within group (order by start_lng)::numeric, 4) as sample_start_lng,
  round(percentile_cont(0.5) within group (order by end_lat)::numeric,   4) as sample_end_lat,
  round(percentile_cont(0.5) within group (order by end_lng)::numeric,   4) as sample_end_lng
from route_metrics
where created_at > now() - interval '30 days'
  and quality in ('straight', 'waypoint')
group by start_lat_r, start_lng_r, end_lat_r, end_lng_r
having count(*) >= 2
order by hits desc
limit 30;


-- ─── 3. P95 LATENCY PER QUALITY-TIER ──────────────────────────────────────
-- Om grid-A* p95 närmar sig 250s börjar vi nå Vercel maxDuration=300s.
-- Då börjar fler par falla genom till waypoint/straight pga timeout.

select
  quality,
  count(*)                                                    as hits,
  round(min(ms))                                              as min_ms,
  round(percentile_cont(0.5)  within group (order by ms))::int as p50_ms,
  round(percentile_cont(0.95) within group (order by ms))::int as p95_ms,
  round(max(ms))                                              as max_ms
from route_metrics
where created_at > now() - interval '30 days'
group by quality
order by p95_ms desc;


-- ─── 4. GEOGRAFISKA HOTSPOTS ──────────────────────────────────────────────
-- Vilka regioner (start-koord 0.1° = ~10 km celler) genererar mest fel?
-- Bra för att se om vi har systematiska luckor i en specifik del av skärgården.

select
  round(start_lat::numeric, 1) as region_lat,
  round(start_lng::numeric, 1) as region_lng,
  count(*) filter (where quality = 'straight')     as straight_hits,
  count(*) filter (where quality = 'waypoint')     as waypoint_hits,
  count(*) filter (where quality = 'grid')         as grid_hits,
  count(*) filter (where quality = 'precomputed')  as precomputed_hits,
  count(*)                                          as total_hits
from route_metrics
where created_at > now() - interval '30 days'
group by region_lat, region_lng
having count(*) filter (where quality in ('straight', 'waypoint')) > 0
order by straight_hits desc, waypoint_hits desc
limit 20;


-- ─── 5. ANVÄNDARRAPPORTER MED GEOGRAFI ────────────────────────────────────
-- Korsa route_reports med planned_routes för att se VAR användarna rapporterar
-- problem. Combo av reports + straight-quality = högsta prio att fixa.

select
  rr.id                          as report_id,
  rr.created_at                  as reported_at,
  rr.reason,
  pr.start_lat, pr.start_lng,
  pr.end_lat,   pr.end_lng,
  pr.start_name, pr.end_name,
  rr.status
from route_reports rr
left join planned_routes pr on pr.id = rr.route_id
where rr.created_at > now() - interval '30 days'
  and rr.status = 'open'
order by rr.created_at desc
limit 50;
