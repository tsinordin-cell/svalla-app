-- 2026-11-17: EXECUTE på SECURITY DEFINER-funktioner i schemat public.
-- Anon får bara köra de funktioner som utloggade besökare faktiskt träffar.
-- Alla 20 SECURITY DEFINER-funktionerna har redan search_path = public
-- (pg_proc.proconfig). Inga funktionskroppar ändras.
--
-- Kvar med EXECUTE för anon, med flit:
--   ar_blockerad(uuid, uuid)
--     feed_with_counts är SECURITY INVOKER och kör den publika feeden.
--     Policyn "Anyone can read comments" körs när utloggade läser kommentarer.
--     Utan grant blir båda anropen 42501 permission denied for function ar_blockerad.
--   is_team_admin()
--     Policyn "team attachments - admin read" på storage.objects gäller public
--     och ligger i samma SELECT som "Public can view images". Postgres
--     kontrollerar EXECUTE när uttrycket initieras, så ett anon-SELECT mot
--     images ger 42501 permission denied for function is_team_admin utan grantet.
--
-- Övriga SECURITY DEFINER-funktioner hade redan rätt grant och rörs inte.

begin;

-- Trigger på user_blocks. EXECUTE krävs när triggern skapas, inte när den körs.
revoke execute on function public.vid_blockering() from public, anon, authenticated;

-- Bara INSERT-policyn "send messages". Utloggade läser inte den policyn.
revoke execute on function public.blockerad_i_konversation(uuid, uuid) from public, anon;
grant execute on function public.blockerad_i_konversation(uuid, uuid) to authenticated, service_role;

-- RLS på reports för inloggade (egen anmälan och admin). Ingen publik sida läser reports.
revoke execute on function public.is_admin_user() from public, anon;
grant execute on function public.is_admin_user() to authenticated, service_role;

-- Ingen anropare i appen och ingen policy. Funktionen var en öppen räkne-RPC.
revoke execute on function public.saved_count_for_island(text) from public, anon, authenticated;
grant execute on function public.saved_count_for_island(text) to service_role;

commit;
