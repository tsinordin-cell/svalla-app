-- Länkkontrollen 2026-09-14 06:01 UTC startade men slutade med ABANDONED och
-- lämnade ingenting efter sig. Tabellen tillät bara slutstatus, så en körning
-- som dog på vägen syntes inte alls — vi upptäckte bristen först två dygn
-- senare, av en slump.
--
-- Nu skrivs raden när körningen STARTAR, med status PÅGÅR, och uppdateras vid
-- slutet. En rad som står kvar på PÅGÅR är i sig beviset på att körningen dog.
alter table public.lankkontroll_rapporter
  drop constraint if exists lankkontroll_rapporter_status_check;

alter table public.lankkontroll_rapporter
  add constraint lankkontroll_rapporter_status_check
  check (status in ('PÅGÅR', 'KOMPLETT', 'AVBRUTEN'));

comment on column public.lankkontroll_rapporter.status is
  'PÅGÅR skrivs vid start och ersätts vid slut. En rad som blir kvar på PÅGÅR betyder att körningen dog utan att rapportera.';
