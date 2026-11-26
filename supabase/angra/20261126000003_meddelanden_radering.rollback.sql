-- Ångrar 20261126000003_meddelanden_radering.sql
--
-- Tar bort de två kontrollerna och hjälpfunktionen. Samtal som redan har
-- raderats kommer inte tillbaka härifrån; de finns bara i säkerhetskopian
-- (den extra kopian i backup-schemat som togs före körningen).

begin;

drop trigger if exists meddelande_raderat_trigger on public.messages;
drop trigger if exists samtal_utan_deltagare_trigger on public.conversation_participants;
drop function if exists public.meddelande_raderat();
drop function if exists public.samtal_utan_deltagare();
drop function if exists public.meddelanden_raknar_om_samtal(uuid[]);

commit;
