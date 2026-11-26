-- Ångrar 20261126000002_meddelanden_anmalan.sql.
-- OBS: raderar underlaget för alla anmälningar av meddelanden. Själva
-- anmälningarna i reports ligger kvar.
begin;

do $$ begin
  if exists (select 1 from cron.job where jobname = 'svalla-anmalan-rensning') then
    perform cron.unschedule('svalla-anmalan-rensning');
  end if;
end $$;

drop policy if exists "dm-bilder admin läser anmäld bild" on storage.objects;
drop policy if exists "dm-bilder underlag får inte raderas" on storage.objects;
drop function if exists public.ar_anmald_dm_bild(text);
drop trigger if exists reports_fore_ny on public.reports;
drop function if exists public.reports_fore_ny();
drop function if exists public.anmal_meddelande(uuid, text, text);
drop function if exists public.anmal_konversation(uuid, text, text);
drop table if exists public.anmalan_underlag;

commit;
