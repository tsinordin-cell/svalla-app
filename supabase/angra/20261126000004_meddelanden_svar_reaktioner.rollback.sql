-- Ångra 20261126000004_meddelanden_svar_reaktioner.sql
--
-- RADERAR DATA: alla reaktioner tas bort, och alla svar tappar kopplingen
-- till meddelandet de svarade på (själva svaren ligger kvar som vanliga
-- meddelanden). Kör först: select backup.ta_kopia();

begin;

alter publication supabase_realtime drop table public.message_reactions;

drop table if exists public.message_reactions;
drop function if exists public.reaktion_kontroll();

drop trigger if exists meddelande_svar_samma_samtal_trigger on public.messages;
drop function if exists public.meddelande_svar_samma_samtal();

drop index if exists public.messages_reply_to_idx;
alter table public.messages drop column if exists reply_to_id;

commit;
