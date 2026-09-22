-- 2026-09-22: märkning av klubb- och föreningshamnar.
--
-- Bakgrund: platsgranskningen (scripts/granska-platser.mjs) visade att flera
-- "hamnar" på kartan är båtklubbars och föreningars egna hamnar, där platserna
-- är för medlemmar (Resarö båtklubb, Bromskärs samfällighet, Kryssarklubbens
-- uthamn m.fl.). För en besökare med båt är det missvisande att se dem som
-- vanliga gästhamnar. Toms beslut: märk dem "Endast medlemmar", dölj dem inte —
-- klubbarnas egna medlemmar kan använda Svalla.
--
-- Körd via Supabase MCP (apply_migration) 2026-09-22.

alter table public.restaurants add column if not exists endast_medlemmar boolean not null default false;
comment on column public.restaurants.endast_medlemmar is 'Klubb- eller föreningshamn vars platser är för medlemmar. Visas som "Endast medlemmar" på platssidan och i kartlistan. Beslut Tom 2026-09-22: märk, dölj inte.';
