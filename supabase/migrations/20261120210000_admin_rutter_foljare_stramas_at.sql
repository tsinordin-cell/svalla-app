-- 2026-11-20. Tom har godkänt A, C och B ("Kör din ordning").
-- Körs EFTER att koden i samma PR är i produktion.
--
-- A. Vilka konton som är admin ska inte gå att lista.
--    Sex policyer läste users.is_admin direkt; de frågar nu is_admin_user()
--    (samma villkor, security definer), annars hade de slutat fungera när
--    läsrätten till kolumnen tas bort.
-- C. Planerade rutter läses i tabellen bara av ägaren. Den som har länken
--    hämtar rutten genom planerad_rutt(id).
-- B. Följare och märken läses bara inloggad. Antalen ges av profiltal(user).
--
-- Återställning (hela filen):
--   grant select (is_admin) on public.users to anon, authenticated;
--   revoke execute on function public.is_admin_user() from anon;
--   alter policy route_feedback_admin_read    on public.route_feedback    using (auth.uid() in (select id from public.users where is_admin = true));
--   alter policy route_feedback_admin_update  on public.route_feedback    using (auth.uid() in (select id from public.users where is_admin = true));
--   alter policy partner_inquiries_admin_read on public.partner_inquiries using (auth.uid() in (select id from public.users where is_admin = true));
--   alter policy email_log_admin_read         on public.email_log         using (auth.uid() in (select id from public.users where is_admin = true));
--   alter policy site_feedback_admin_select   on public.site_feedback     using (auth.uid() in (select id from public.users where is_admin = true));
--   alter policy site_feedback_admin_update   on public.site_feedback     using (auth.uid() in (select id from public.users where is_admin = true));
--   alter policy "published routes viewable by anyone" on public.planned_routes using ((status = 'published') or (auth.uid() = user_id));
--   alter policy planned_routes_select_published        on public.planned_routes using (status = 'published');
--   alter policy "Anyone can read follows"      on public.follows            to public;
--   alter policy "read achievement events"      on public.achievement_events to public;

-- A
grant execute on function public.is_admin_user() to anon; -- svarar false för utloggad; behövs för att policyerna nedan ska gå att utvärdera
alter policy route_feedback_admin_read    on public.route_feedback    using (public.is_admin_user());
alter policy route_feedback_admin_update  on public.route_feedback    using (public.is_admin_user());
alter policy partner_inquiries_admin_read on public.partner_inquiries using (public.is_admin_user());
alter policy email_log_admin_read         on public.email_log         using (public.is_admin_user());
alter policy site_feedback_admin_select   on public.site_feedback     using (public.is_admin_user());
alter policy site_feedback_admin_update   on public.site_feedback     using (public.is_admin_user());
revoke select (is_admin) on public.users from anon, authenticated;

-- C
alter policy "published routes viewable by anyone" on public.planned_routes using (auth.uid() = user_id);
alter policy planned_routes_select_published        on public.planned_routes using (auth.uid() = user_id);

-- B
alter policy "Anyone can read follows" on public.follows            to authenticated;
alter policy "read achievement events" on public.achievement_events to authenticated;
