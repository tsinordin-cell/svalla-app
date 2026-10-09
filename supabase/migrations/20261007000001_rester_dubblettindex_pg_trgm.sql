-- Rester efter revisionen (2026-10-07): två dubblettindex på restaurants och
-- tillägget pg_trgm i fel schema.
--
-- Körs i produktion av Tom via supabase/skript/2026-10-07-rester.sql, där
-- indexen tas bort med DROP INDEX CONCURRENTLY (en sats per körning, utan
-- tabellås). Den här filen speglar ändringen för historiken och för en tom
-- databas, där CONCURRENTLY inte går att köra inuti migrationens transaktion.
--
-- restaurants_google_place_id_idx (partiellt, WHERE google_place_id IS NOT NULL)
--   dubblerar det unika indexet restaurants_google_place_id_key.
-- restaurants_slug_idx (partiellt, WHERE slug IS NOT NULL)
--   dubblerar det unika indexet restaurants_slug_unique (2,1 miljoner
--   läsningar; det partiella hade 39 000).
-- Båda unika indexen täcker samma frågor. Uppmätt storlek 48 + 56 kB.

drop index if exists public.restaurants_google_place_id_idx;
drop index if exists public.restaurants_slug_idx;

-- pg_trgm hör hemma i schemat extensions (Supabase-lint extension_in_public).
-- Forumsökningens GIN-index (forum_threads_title_trgm_idx, _body_) refererar
-- operatorklassen via OID och påverkas inte.
do $$
begin
  if exists (select 1 from pg_extension e join pg_namespace n on n.oid = e.extnamespace
             where e.extname = 'pg_trgm' and n.nspname = 'public') then
    alter extension pg_trgm set schema extensions;
  end if;
end $$;
