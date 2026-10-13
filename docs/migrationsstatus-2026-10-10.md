# Migrationsstatus – supabase/migrations mot produktionsdatabasen

Datum: 2026-10-10. Projekt: oiklttwylndesewauytj. Endast läsande SQL har körts.

## Sammanfattning

| Status | Antal |
|---|---|
| HELT KÖRD | 54 (varav 8 redan registrerade i schema_migrations) |
| DELVIS | 13 |
| INTE KÖRD | 3 |
| OKLART (rena datauppdateringar) | 6 |
| **Totalt** | **76 filer** (inte 74 – katalogen innehåller 76 .sql-filer) |

Bedömningsregel: HELT KÖRD = varje ändring finns i databasen, eller saknas för att en **senare fil i repot** uttryckligen tagit bort/ersatt den (anges då i motiveringen). DELVIS = något saknas utan att någon senare fil förklarar det. OKLART = filen gör bara UPDATE/INSERT på data som sedan kan ha ändrats av annat (Google-berikning m.m.).

Underlag (DB-snapshots som jämförts mot filerna): `information_schema.tables/columns`, `pg_policies` (schema public + storage), `pg_proc` + `has_function_privilege` + `proconfig`, `pg_indexes`, `pg_trigger`, `pg_constraint` (`pg_get_constraintdef`), `pg_description`, `cron.job`, `pg_extension`, `pg_publication_tables`, `information_schema.role_table_grants` / `column_privileges`, `storage.buckets`, samt `supabase_migrations.schema_migrations.statements` (innehåller den exakta SQL som kördes).

Viktiga fynd:
1. **Alla 55 publika tabeller har RLS på** (fråga mot `pg_class.relrowsecurity` gav 0 träffar utan RLS).
2. **`reports_target_type_check` saknar `forum_thread`** (fil 20260504000003 aldrig körd) – `src/app/api/forum/threads/[id]/report/route.ts` skriver `target_type: 'forum_thread'` och måste därför få CHECK-fel i produktion.
3. **Social v2 (klubbar, events, stories, reposts, place_reviews, follow_prefs, invites, user_blocks, check_ins) och Stripe (`subscriptions`) finns inte i databasen**, men koden refererar tabellerna (`from('clubs')` ×7, `from('subscriptions')` ×8 osv.).
4. Den registrerade migrationen **20260913175707 "skapa_tre_tabeller_som_koden_forvantade"** skapade `achievement_events`, `affiliate_clicks` och `account_deletions` med repots egna definitioner – dvs filerna 20260502000019 (delvis), 20260502000031 och 20260505000001 fick sitt innehåll applicerat den vägen.
5. Den registrerade migrationen **20260920033416 "team_tasks_recurrence"** (kolumnerna `recurrence`, `last_done_at`, constraint, index) **har ingen fil i repot** – bör läggas till för nya miljöer.
6. Två filer delar version **20260503000002** (`email_log` och `loppis_listing`). `schema_migrations.version` är primärnyckel – en av dem måste byta tidsstämpel innan båda kan registreras.
7. Flera kolumner finns men deras `COMMENT ON COLUMN` saknas (017, 026, 027, 030, 044, 049) – tyder på att kolumnerna lades till på annat sätt än via filen. Ofarligt, men strikt sett DELVIS.
8. Policyer som inte motsvarar någon fil (oversionerade ändringar): `trips_select_visible` (+ kolumnerna `trips.visibility`, `trips.status`), `gps_select_own/gps_insert_own/gps_delete_own`, `stops_delete_own`, `restaurants_read_all`, `tours_read_all`, `push_subs_service_all`, `Users manage own subscriptions`, bookmarks-policyer på svenska, `users_service_all`, `users_update_self`, `partner_inquiries_*`, `route_feedback_*`, `site_feedback_*`, `email_log_*`, `ps_*` (place_saves), `saved_islands`-policyer, funktionerna `find_or_create_dm`, `my_saved_islands`, `set_updated_at`, tabellerna `app_kv`, `place_saves`, `saved_islands`, `partner_inquiries`, `route_feedback`, `route_metrics`, `route_reports`, `site_feedback`, `email_subscribers`, `bookmarks`, `reviews`, `tours`. Dessa ligger utanför uppdraget men förklarar varför fil 040 ser "halvkörd" ut.

---

## Tabell: alla filer

| Fil | Version | Status | Motivering |
|---|---|---|---|
| 20260502000001_schema.sql | 20260502000001 | DELVIS | Tabeller users/restaurants/routes/trips/gps_points/stops finns. Index `gps_points_trip_id_idx`, `stops_trip_id_idx` finns; **`gps_points_recorded_at_idx` saknas** (ingen fil tar bort det). Policyer "Users can insert gps points for own trips", "Users can insert stops for own trips", "Anyone can read routes" finns; users-/trips-policyer togs bort av 072 (ok); **"Anyone can read trips/gps points/stops/restaurants"** ersatta av oversionerade policyer. Seed: routes med id `b1000000-…` finns (3/3); **restauranger med id `a1000000-…` finns inte** (0/6; 3 av namnen finns med andra id). Omkörning skulle krascha på `restaurants_name_unique` (ON CONFLICT (id)). |
| 20260502000002_migration-discovery.sql | 20260502000002 | DELVIS | `gps_heat()` finns, `trips_created_at_idx` finns. **`gps_points_lat_lng_idx` saknas** (`pg_indexes` på gps_points: bara pkey + trip_id_idx). |
| 20260502000003_migration-dm-push.sql | 20260502000003 | HELT KÖRD | `user_presence` + `user_presence_chat_idx` + 4 policyer finns; `push_log` finns med RLS. |
| 20260502000004_migration-dm-requests.sql | 20260502000004 | HELT KÖRD | `conversations.status` + `conversations_status_idx`; `accept_dm_request`, `decline_dm_request` (kropp ersatt av 072, finns, EXECUTE till authenticated), `block_declined_messages` + trigger `block_declined_messages_trigger` på messages. |
| 20260502000005_migration-dm-complete.sql | 20260502000005 | HELT KÖRD | conversations/conversation_participants/messages + 4 index; `is_conv_member`; policyer "read own conversations", "create conversations", "join/leave conversation", "update own participant", 3 messages-policyer; "update conversations own" togs bort av 024 (ok); "read participants" ersatt av 006 (ok); `touch_conversation_last_message` + `trg_touch_conv_last` finns. |
| 20260502000006_migration-dm-rls-fix.sql | 20260502000006 | HELT KÖRD | "read participants" saknas, "read participants of own convs" finns med exakt qual `user_id = auth.uid() OR is_conv_member(...)`. "join conversation" finns (with_check ändrat av 072 – ok). |
| 20260502000007_migration-forum.sql | 20260502000007 | HELT KÖRD | forum_categories/threads/posts, 3 index, `forum_after_post_insert`/`forum_after_thread_insert` + triggers, 7 policyer, alla 9 seed-kategorier finns (`select id from forum_categories`). |
| 20260502000008_migration-forum-subscriptions.sql | 20260502000008 | HELT KÖRD | Tabell + policy `forum_subscriptions_own` (ALL). |
| 20260502000009_migration-forum-likes.sql | 20260502000009 | HELT KÖRD | Tabell, `forum_post_likes_post_id_idx`, 3 policyer. |
| 20260502000010_migration-forum-trgm-index.sql | 20260502000010 | HELT KÖRD | pg_trgm installerat (schema `extensions`, flyttat av 074 – ok); `forum_threads_title_trgm_idx`, `_body_trgm_idx`, `_not_spam_last_reply_idx` finns. |
| 20260502000011_migration-tags.sql | 20260502000011 | HELT KÖRD | `restaurants.tags`, `restaurants.core_experience`, `tours.tags` finns. Data-UPDATE ej strikt bevisbar men konsistent: 346 restauranger har tags, 176 core_experience, 13/13 tours har tags. |
| 20260502000012_migration-tag-follows.sql | 20260502000012 | HELT KÖRD | Tabell, policy "Users can manage own tag follows", `idx_tag_follows_tag`. |
| 20260502000013_migration-places-v2.sql | 20260502000013 | HELT KÖRD | Alla 10 kolumner finns, `restaurants_name_unique` finns. Backfill-UPDATE ej bevisbar (data senare Google-berikad). |
| 20260502000014_migration-trip-images.sql | 20260502000014 | HELT KÖRD | `trips.images jsonb` finns. |
| 20260502000015_migration-stripe.sql | 20260502000015 | INTE KÖRD | **`users.stripe_customer_id` saknas, tabell `subscriptions` saknas** (ingen fil tar bort dem). Koden refererar `from('subscriptions')` på 8 ställen. |
| 20260502000016_migration-planned-routes.sql | 20260502000016 | HELT KÖRD | Tabell finns; `planned_routes_select_published` finns; `planned_routes_insert_any` finns (with_check ändrat av 070 – ok); `planned_routes_update_stops` borttagen av 073 (ok). |
| 20260502000017_migration-onboarding-boat-type.sql | 20260502000017 | DELVIS | `users.boat_type` finns. **COMMENT saknas** (`pg_description` har ingen rad för users.boat_type). |
| 20260502000018_migration-social.sql | 20260502000018 | HELT KÖRD | likes/comments/follows/notifications + policyer finns (likes 3, comments 3, follows 3, notifications read+mark read); "Users can insert notifications" borttagen av 050 (ok); index `comments_trip_id_idx`, `notifications_user_id_idx`, `notifications_created_at_idx` finns; type-CHECK ersatt av 076 (ok). |
| 20260502000019_migration-social-v2.sql | 20260502000019 | DELVIS | Finns: DM-delen (= 005), `trip_tags` + index + policyer ("read trip_tags" borttagen av 072, ok), `achievement_events` (skapad 2026-09-13 via registrerad migration 20260913175707, inte via denna fil). **Saknas: clubs, club_members, club_members_user_idx, FK conversations_club_id_fkey, check_ins, events, event_attendees, stories, story_views, reposts, place_reviews, follow_prefs, invites, vyn invite_codes, funktionen redeem_invite_code, user_blocks** (inget av det finns i `information_schema.tables`/`pg_proc`). |
| 20260502000020_migration-events-articles.sql | 20260502000020 | DELVIS | `articles` + 3 index + 5 policyer finns. **Saknas: events-tabellen (så alla ALTER/index på events), funktionen `tg_touch_updated_at`, triggers `events_updated_at`/`articles_updated_at`, seed-artikel `sandhamn-guide-2026` (0 rader).** |
| 20260502000021_migration-feed-rpc.sql | 20260502000021 | HELT KÖRD | 7 index finns (trips_created_at_idx, trips_user_created_idx, likes_trip_id_idx, likes_user_trip_idx, comments_trip_id_idx, follows_follower_idx, notifications_user_unread_idx). `feed_with_counts` (EXECUTE anon+authenticated) och `notifications_grouped` finns. |
| 20260502000022_migration-moderation.sql | 20260502000022 | HELT KÖRD | `users.is_admin`, `is_admin_user()`, `reports` + 3 index + 4 policyer, `admin_update_report`, `get_moderation_queue` finns. Type-CHECK ersatt av 076 (ok). |
| 20260502000023_migration-soft-delete-ratelimit.sql | 20260502000023 | HELT KÖRD | `trips.deleted_at`, `trips_active_created_idx`, `trips_active_user_created_idx`; `feed_with_counts` innehåller `deleted_at is null` (prosrc-kontroll); `soft_delete_trip`, `restore_trip`, `purge_old_deleted_trips`; `likes_user_created_idx`, `comments_user_created_idx`; `rate_limit_likes`/`rate_limit_comments` + triggers. |
| 20260502000024_migration-rls-pass-b.sql | 20260502000024 | HELT KÖRD | "Authenticated can insert notifications" saknas (ok); `notifications_insert` borttagen av 075 (ok); `enforce_forum_mod_columns` + triggers `forum_threads_mod_columns`/`forum_posts_mod_columns` finns; "update conversations own" saknas; `conversations_update_creator` borttagen av 072 (ok). |
| 20260502000025_add-admin-role.sql | 20260502000025 | DELVIS | `users.is_admin` finns (även från 022). **UPDATE-steget stämmer inte: is_admin=true för max@svalla.se och tsinordin@gmail.com; thomas@svalla.se finns i auth.users men är inte admin.** Omkörning skulle göra thomas@svalla.se till admin. |
| 20260502000026_add-ai-summary.sql | 20260502000026 | DELVIS | `trips.ai_summary`, `stops.place_name` finns. **Båda COMMENT saknas.** |
| 20260502000027_add-route-points.sql | 20260502000027 | DELVIS | `trips.route_points` finns. **COMMENT saknas.** |
| 20260502000028_add-slugs-to-restaurants.sql | 20260502000028 | OKLART | Ren datafix. Effekten finns: 0 av 699 restauranger saknar slug. Omkörning är no-op. |
| 20260502000029_add-visited-islands.sql | 20260502000029 | DELVIS | Tabell, `visited_islands_user_id_idx`, 3 policyer finns. **`visited_islands_island_slug_idx` saknas.** |
| 20260502000030_add-website-to-users.sql | 20260502000030 | DELVIS | `users.website` finns. **COMMENT saknas.** |
| 20260502000031_migration-account-deletions.sql | 20260502000031 | HELT KÖRD | Tabell, `account_deletions_deleted_at_idx`, policy "no public access" (ALL, anon+authenticated) finns. Applicerad via registrerad 20260913175707 (identisk SQL). Obs: filen saknar `drop policy if exists` → omkörning skulle faila på dubblettpolicy. |
| 20260502000032_audit-rls.sql | 20260502000032 | HELT KÖRD | Innehåller enbart SELECT – inga ändringar att verifiera. Ofarlig att registrera. |
| 20260502000033_business-leads.sql | 20260502000033 | INTE KÖRD | Tabellen `business_leads` som finns skapades av 20260913000001 (registrerad): **kolumnerna lat, lng, notes saknas; policyerna "Anyone can submit lead" och "Admins can read leads" saknas** (business_leads har 0 policyer). Omkörning skulle återöppna en anon-insert-policy som 075 avsiktligt stängde – ska inte köras. |
| 20260502000034_enable-realtime-notifications.sql | 20260502000034 | HELT KÖRD | `public.notifications` finns i `pg_publication_tables` för supabase_realtime. |
| 20260502000035_fix-coordinates-v1.sql | 20260502000035 | OKLART | Data. De 7 Tier-1-platserna finns (slug-kontroll 7/7). Koordinaterna för Grinda/Utö m.fl. har sedan ändrats av Google-berikning (`place_data_source='google'`); Finnhamns Kafé, Möja Krog, Arholma Krog finns inte längre. Omkörning skulle **skriva över verifierade koordinater** med gamla manuella. |
| 20260502000036_fix-coordinates-v3.sql | 20260502000036 | OKLART | Data. Exakta träffar för orörda platser (Ingmarsö Krog 59.4752/18.7445, Svartsö Krog 59.4658/18.7285, Södermöja Krog 59.4118/18.8815, Artipelag 59.3149/18.3566) visar att den sannolikt kördes; övriga överskrivna av Google. Omkörning skadlig (skriver över Google-koordinater). |
| 20260502000037_fix-missing-places-djuro.sql | 20260502000037 | OKLART | Data. `vita-grindarna-djuro` och `motorverkstan-djuro` finns men med andra koordinater (59.3111/18.6926 resp. 59.3057/18.6868, ej 59.1952/59.2005). Tours `stockholm-uto`/`stockholm-uto-weekend` finns inte; 0 tours har waypoints utanför boxen. Omkörning skulle skriva över Djurö-koordinaterna. |
| 20260502000038_fix-missing-users-trigger.sql | 20260502000038 | HELT KÖRD | `handle_new_user()` (SECURITY DEFINER, search_path) + trigger `on_auth_user_created` på auth.users finns. Backfill: auth.users 120 = public.users 120. |
| 20260502000039_fix-water-coordinates-v2.sql | 20260502000039 | OKLART | Data, delmängd av 036 (samma träffar som ovan). Omkörning skadlig av samma skäl. |
| 20260502000040_supabase_rls_migration.sql | 20260502000040 | DELVIS | Finns med exakt namn: `users_select_all/update_own/insert_own`, `trips_insert_own/update_own/delete_own`, `stops_select_own/insert_own/update_own`, `push_subs_select_own/insert_own/delete_own`. **Saknas: trips_select_all, gps_points_select_own/insert_own/delete_own, likes_*, comments_*, follows_*, notifications_select_own/insert_service/update_own/delete_own, push_subs_update_own, visited_select_own/insert_own/upsert_own, restaurants_select_all, tours_select_all, routes_select_all, bookmarks_*, reviews_*, trip_tags_select_all/insert_own/delete_own** (DB har i stället oversionerade varianter: `trips_select_visible`, `gps_select_own`, `restaurants_read_all`, `tours_read_all` …). Omkörning saknar `if not exists` och skulle faila på första dubbletten (`users_select_all`). |
| 20260502000041_update-websites.sql | 20260502000041 | OKLART | Data. Flera slugs i filen finns inte (`grinda-vardshus` – DB har `grinda-wardshus`); där slug finns har website ofta annat värde (t.ex. bullando-krog `http://www.bullandokrog.se/` via Google). Omkörning skriver över. |
| 20260503000001_trip_highlights.sql | 20260503000001 | HELT KÖRD | Tabell, 3 index (one_per_trip unikt, place_slug, user), 4 policyer finns. |
| 20260503000002_email_log.sql | 20260503000002 | HELT KÖRD | Tabell med user_id/error/created_at, index `email_log_user_template_idx`, `_sent_at_idx`, `_template_idx`, RLS på, COMMENT på tabell + template + resend_id finns. **Delar version med loppis_listing – byt tidsstämpel på en av dem.** |
| 20260503000002_loppis_listing.sql | 20260503000002 | DELVIS | `forum_threads.listing_data`, `forum_threads_listing_data_gin`, `forum_threads_loppis_status_idx` finns. **COMMENT på listing_data saknas.** Delar version med email_log. |
| 20260504000001_email_unsubscribes.sql | 20260504000001 | HELT KÖRD | Tabell, `email_unsubscribes_at_idx`, RLS, tabell-COMMENT finns. |
| 20260504000002_loppis_saves.sql | 20260504000002 | HELT KÖRD | Tabell, 2 index, 3 policyer finns. |
| 20260504000003_reports_forum_thread.sql | 20260504000003 | INTE KÖRD | `pg_get_constraintdef(reports_target_type_check)` = `trip,comment,user,message,review,story,checkin` – **`forum_thread` saknas**. Koden rapporterar forumtrådar med `target_type:'forum_thread'` → CHECK-fel. |
| 20260505000001_affiliate_clicks.sql | 20260505000001 | HELT KÖRD | Tabell, 3 index, RLS, tabell-COMMENT finns (applicerad via registrerad 20260913175707 med identisk SQL). |
| 20260505000002_places_premium_fields.sql | 20260505000002 | DELVIS | Alla 18 kolumner finns; `restaurants_verified_at_idx` finns; `restaurants_google_place_id_idx` borttagen av 074 (ok); `place_photos` + 2 index + policy finns. **COMMENT på place_photos (tabell), restaurants.google_place_id och restaurants.place_data_source saknas.** |
| 20260506000001_notifications_insert_policy.sql | 20260506000001 | HELT KÖRD | Policyn "Users can insert notifications" finns inte (notifications har bara SELECT + UPDATE-policyer). |
| 20260506000002_forum_anonymize_on_delete.sql | 20260506000002 | HELT KÖRD | `forum_threads.user_id` och `forum_posts.user_id` är nullable (is_nullable=YES); båda FK:erna har `ON DELETE SET NULL`. |
| 20260507000001_analytics_events.sql | 20260507000001 | HELT KÖRD | Tabell, 4 index, policy "service role can manage events", tabell-COMMENT finns. |
| 20260515103000_audit_indexes.sql | 20260515103000 | HELT KÖRD | `restaurants_island_idx`, `follows_following_idx`, `trips_deleted_at_idx` finns. |
| 20260515103100_push_subscriptions_retrofit.sql | 20260515103100 | HELT KÖRD | Tabellen fanns redan (CREATE IF NOT EXISTS = no-op; DB har `UNIQUE(user_id,endpoint)` i stället för filens `endpoint UNIQUE`, vilket är väntat). `push_subscriptions_user_id_idx` finns. |
| 20260523000001_planned_routes_cache.sql | 20260523000001 | HELT KÖRD | 4 cached_*-kolumner, `planned_routes_cached_quality_check` (exakt lista), `planned_routes_cached_at_idx`, `planned_routes_cached_quality_idx` finns. |
| 20260527000001_restaurants_slug_polish.sql | 20260527000001 | HELT KÖRD | `restaurants.updated_at`, `touch_restaurants_updated_at()` + trigger `restaurants_touch_updated_at`, constraint `restaurants_slug_unique` finns; `restaurants_slug_idx` borttagen av 074 (ok). |
| 20260729000001_team_dashboard.sql | 20260729000001 | HELT KÖRD | `is_team_admin()` (search_path satt av 072), team_projects/tasks/prompts/activity med triggers, index och alla 15 policyer, `log_team_task_activity` + trigger, realtime för 4 tabeller finns. Seed: `routing-safety-layer` och `innehall-fakta` finns, **`transit-intelligence` saknas** (ON CONFLICT DO NOTHING – troligen raderad i UI; omkörning skulle återskapa det). |
| 20260729000002_team_tasks_claude_workflow.sql | 20260729000002 | HELT KÖRD | `team_tasks_status_check` = todo/working/review/done; `pr_url`, `prompt` finns; `log_team_task_activity` innehåller "Claude jobbar". |
| 20260730000001_team_task_attachments.sql | 20260730000001 | HELT KÖRD | `team_tasks.images` finns; bucket `team-attachments` (public=false, 10 MB) finns; 3 storage-policyer finns med rätt villkor – **men namnen använder bindestreck "-" (ascii 45), filen tankstreck "–"**. Omkörning skulle inte hitta dem i DROP och skapa dubbletter. |
| 20260730000002_team_task_color.sql | 20260730000002 | HELT KÖRD | `team_tasks.color` finns. |
| 20260906000001_gps_points_raw.sql | 20260906000001 | HELT KÖRD (registrerad som 20260910181126) | 3 kolumner + 3 COMMENT finns. `statements` i schema_migrations citerar filnamnet. |
| 20260906000002_trips_gps_quality.sql | 20260906000002 | HELT KÖRD (registrerad som 20260910181133) | Kolumn + COMMENT finns; `statements` citerar filnamnet. |
| 20260910000001_trips_duration_seconds.sql | 20260910000001 | HELT KÖRD (registrerad som 20260910203141) | Kolumn + COMMENT finns; identisk SQL i `statements`. |
| 20260913000001_business_leads.sql | 20260913000001 | HELT KÖRD (registrerad som 20260913040958) | Tabell med exakt kolumnuppsättning, grants = bara INSERT för anon/authenticated, `business_leads_created_at_idx`. Policyn "business_leads: anon insert" borttagen av 075 (ok). |
| 20260913000002_lankkontroll_rapporter.sql | 20260913000002 | HELT KÖRD (registrerad som 20260913191347) | Tabell, RLS, inga grants till anon/authenticated, `lankkontroll_rapporter_kord_at_idx`. |
| 20260913000003_cron_purge_old_deleted_trips.sql | 20260913000003 | HELT KÖRD (registrerad som 20260913193047) | pg_cron 1.6.4 installerat; `cron.job` har `purge-old-deleted-trips`, `15 3 * * *`, `select public.purge_old_deleted_trips()`. |
| 20260916000001_lankkontroll_status_pagar.sql | 20260916000001 | HELT KÖRD (registrerad som 20260916191507) | CHECK = PÅGÅR/KOMPLETT/AVBRUTEN; COMMENT på status finns. |
| 20260922000001_restaurants_endast_medlemmar.sql | 20260922000001 | HELT KÖRD (registrerad som 20260922204241) | Kolumn + COMMENT finns; identisk SQL i `statements`. |
| 20261003000001_users_is_admin_sparr.sql | 20261003000001 | HELT KÖRD | `skydda_users_is_admin()` (search_path, ingen EXECUTE för anon/authenticated via 072) + trigger `users_skydda_is_admin` på public.users. |
| 20261003000002_planned_routes_bara_agaren_andrar.sql | 20261003000002 | HELT KÖRD | `planned_routes_insert_any` with_check = `user_id IS NULL OR user_id = auth.uid()`; `planned_routes_update_stops` borttagen av 073 (ok). |
| 20261003000003_users_email_bara_for_tjansten.sql | 20261003000003 | HELT KÖRD | `role_table_grants` på users för anon/authenticated saknar SELECT; `column_privileges` ger exakt de 19 kolumnerna i filen (email saknas). |
| 20261003000004_behorigheter_del2.sql | 20261003000004 | HELT KÖRD | accept/decline innehåller "Bara mottagaren" och är SECURITY DEFINER, EXECUTE anon=false/auth=true; `find_or_create_dm` EXECUTE false/false + search_path; `ar_konversationens_skapare` finns, "join conversation" with_check = `ar_konversationens_skapare(conversation_id)`; `touch_conversation_last_message` SECURITY DEFINER; `conversations_update_creator`, "Users can tag", "Public can count saves", "Anon can subscribe", `rm_service_insert`, `rr_insert_anyone`, "Anon can submit inquiry", "Anyone can read restaurants", "read trip_tags", gamla users/trips/notifications-dubbletter saknas alla; `saved_count_for_island` finns; `my_saved_islands` EXECUTE false/true; trigger-/cronfunktioner EXECUTE false/false; `admin_update_report`/`get_moderation_queue` false/true; `is_team_admin`/`enforce_forum_mod_columns` har search_path; avatar-policyerna i storage har `name ~~ 'avatars/' || auth.uid() || '.%'`. |
| 20261006000001_planned_routes_ingen_skrivning_utan_agare.sql | 20261006000001 | HELT KÖRD | `planned_routes_update_stops` finns inte i `pg_policies`. |
| 20261007000001_rester_dubblettindex_pg_trgm.sql | 20261007000001 | HELT KÖRD | `restaurants_google_place_id_idx` och `restaurants_slug_idx` saknas i `pg_indexes`; pg_trgm ligger i schema `extensions`. |
| 20261010000001_stang_oppna_insertpolicyer.sql | 20261010000001 | HELT KÖRD | Ingen av de fem policyerna (`notifications_insert`, "business_leads: anon insert", `partner_inquiries_insert_anyone`, `route_feedback_insert`, `site_feedback_insert_anon`) finns; tabellerna har kvar sina admin-/service-policyer. |
| 20261010000002_notiser_listing_saved.sql | 20261010000002 | HELT KÖRD | `notifications_type_check` = exakt listan i filen inkl. `listing_saved`; unikt index `notifications_en_per_handelse` finns. |

---

## REGISTRERA (HELT KÖRDA, ej redan i schema_migrations) – 46 filer

Dessa bör markeras som applicerade utan att köras (t.ex. `supabase migration repair --status applied <version>` per version). Att köra dem skulle i flera fall faila på dubblettpolicyer eller återskapa sådant som senare filer avsiktligt tagit bort.

```
20260502000003_migration-dm-push.sql
20260502000004_migration-dm-requests.sql
20260502000005_migration-dm-complete.sql
20260502000006_migration-dm-rls-fix.sql
20260502000007_migration-forum.sql
20260502000008_migration-forum-subscriptions.sql
20260502000009_migration-forum-likes.sql
20260502000010_migration-forum-trgm-index.sql
20260502000011_migration-tags.sql
20260502000012_migration-tag-follows.sql
20260502000013_migration-places-v2.sql
20260502000014_migration-trip-images.sql
20260502000016_migration-planned-routes.sql
20260502000018_migration-social.sql
20260502000021_migration-feed-rpc.sql
20260502000022_migration-moderation.sql
20260502000023_migration-soft-delete-ratelimit.sql
20260502000024_migration-rls-pass-b.sql
20260502000031_migration-account-deletions.sql
20260502000032_audit-rls.sql
20260502000034_enable-realtime-notifications.sql
20260502000038_fix-missing-users-trigger.sql
20260503000001_trip_highlights.sql
20260503000002_email_log.sql          (OBS: versionskrock med loppis_listing – byt tidsstämpel först)
20260504000001_email_unsubscribes.sql
20260504000002_loppis_saves.sql
20260505000001_affiliate_clicks.sql
20260506000001_notifications_insert_policy.sql
20260506000002_forum_anonymize_on_delete.sql
20260507000001_analytics_events.sql
20260515103000_audit_indexes.sql
20260515103100_push_subscriptions_retrofit.sql
20260523000001_planned_routes_cache.sql
20260527000001_restaurants_slug_polish.sql
20260729000001_team_dashboard.sql     (seedraden transit-intelligence saknas – troligen raderad; registrera, kör inte)
20260729000002_team_tasks_claude_workflow.sql
20260730000001_team_task_attachments.sql   (policynamn i DB har "-" i stället för "–"; registrera, kör inte)
20260730000002_team_task_color.sql
20261003000001_users_is_admin_sparr.sql
20261003000002_planned_routes_bara_agaren_andrar.sql
20261003000003_users_email_bara_for_tjansten.sql
20261003000004_behorigheter_del2.sql
20261006000001_planned_routes_ingen_skrivning_utan_agare.sql
20261007000001_rester_dubblettindex_pg_trgm.sql
20261010000001_stang_oppna_insertpolicyer.sql
20261010000002_notiser_listing_saved.sql
```

Redan registrerade (8, behöver inget): 20260906000001, 20260906000002, 20260910000001, 20260913000001, 20260913000002, 20260913000003, 20260916000001, 20260922000001 – men under **andra versionsnummer** (se sista avsnittet). Om `supabase db push` ska bli rent måste antingen filerna döpas om till DB-versionerna, eller DB-raderna bytas till filernas versioner, eller filernas versioner registreras som applicerade utöver de befintliga.

---

## KRÄVER BESLUT – 22 filer

### INTE KÖRD (3)

| Fil | Saknas | Att ta ställning till |
|---|---|---|
| 20260504000003_reports_forum_thread.sql | `forum_thread` i `reports_target_type_check` | **Bör köras** – idempotent, ofarlig, och koden (`/api/forum/threads/[id]/report`) kräver den. |
| 20260502000015_migration-stripe.sql | `users.stripe_customer_id`, tabell `subscriptions` + 2 index + 2 policyer | Koden refererar `subscriptions` (8 st). Kör om Stripe-funktionen ska leva; annars ta bort/arkivera filen och registrera som överhoppad. `is_admin_user()` finns så filen går att köra. |
| 20260502000033_business-leads.sql | lat/lng/notes-kolumner, "Anyone can submit lead", "Admins can read leads" | **Kör inte** – återöppnar anon-insert som 075 stängde. Ersatt av 20260913000001. Ta bort filen eller registrera som överhoppad. |

### DELVIS (13)

| Fil | Saknas | Att ta ställning till |
|---|---|---|
| 20260502000001_schema.sql | `gps_points_recorded_at_idx`; seed-restauranger med `a1000000-…`-id; ursprungliga läs-policyer (ersatta oversionerat) | Registrera utan att köra (omkörning kraschar på `restaurants_name_unique`). Besluta om `gps_points_recorded_at_idx (trip_id, recorded_at)` ska återskapas separat. |
| 20260502000002_migration-discovery.sql | `gps_points_lat_lng_idx` | Registrera; skapa indexet separat om `gps_heat()` ska vara snabb (bbox-filter på gps_points). |
| 20260502000017_migration-onboarding-boat-type.sql | COMMENT på users.boat_type | Registrera; kör COMMENT-satsen separat om önskat (ofarligt). |
| 20260502000026_add-ai-summary.sql | COMMENT på trips.ai_summary, stops.place_name | Samma som ovan. |
| 20260502000027_add-route-points.sql | COMMENT på trips.route_points | Samma som ovan. |
| 20260502000030_add-website-to-users.sql | COMMENT på users.website | Samma som ovan. |
| 20260503000002_loppis_listing.sql | COMMENT på forum_threads.listing_data; **versionskrock** med email_log | Byt tidsstämpel (t.ex. 20260503000003), registrera; COMMENT separat om önskat. |
| 20260505000002_places_premium_fields.sql | COMMENT på place_photos, restaurants.google_place_id, restaurants.place_data_source | Registrera; COMMENT separat. |
| 20260502000029_add-visited-islands.sql | `visited_islands_island_slug_idx` | Registrera; skapa indexet separat (frågan "X seglare har besökt" filtrerar på island_slug). |
| 20260502000025_add-admin-role.sql | UPDATE: thomas@svalla.se är inte admin | **Kör inte om** utan beslut – skulle sätta is_admin=true på thomas@svalla.se. Registrera. |
| 20260502000019_migration-social-v2.sql | clubs, club_members, conversations_club_id_fkey, check_ins, events, event_attendees, stories, story_views, reposts, place_reviews, follow_prefs, invites, invite_codes (vy), redeem_invite_code, user_blocks | Koden refererar alla dessa tabeller. Besluta: (a) kör de saknade delarna i en ny migration, eller (b) ta bort funktionerna ur koden. Registrera inte som applicerad om (a) väljs via denna fil – men filen innehåller också DM-delen som redan finns (idempotent), så den går tekniskt att köra. |
| 20260502000020_migration-events-articles.sql | events-tabellen + dess kolumner/index, `tg_touch_updated_at`, triggers på events/articles, seed-artikel, seed-event | Beroende av 019 (events). Om 019:s events skapas kan denna köras efteråt; annars registrera och lägg `articles_updated_at`-trigger separat om önskat. |
| 20260502000040_supabase_rls_migration.sql | ~35 av 48 policyer saknas med filens namn (DB har oversionerade motsvarigheter) | **Kör inte** – saknar `if not exists`, failar på `users_select_all`, och skulle öppna `trips_select_all` som i dag medvetet är `trips_select_visible`. Registrera som applicerad och skriv i stället en ny fil som speglar dagens oversionerade policyer (se fynd 8). |

### OKLART – rena datauppdateringar (6)

| Fil | Läge | Att ta ställning till |
|---|---|---|
| 20260502000028_add-slugs-to-restaurants.sql | 0 restauranger utan slug | Registrera; omkörning är no-op. |
| 20260502000035_fix-coordinates-v1.sql | Tier-1-platser finns; koordinater för Grinda/Utö m.fl. har sedan Google-berikats | Registrera; **kör inte** (skriver över `place_data_source='google'`-koordinater). |
| 20260502000036_fix-coordinates-v3.sql | Exakta träffar på 4 orörda platser; övriga Google-berikade | Registrera; **kör inte**. |
| 20260502000037_fix-missing-places-djuro.sql | Djurö-platser finns med andra koordinater; tours-slugs finns inte | Registrera; **kör inte**. |
| 20260502000039_fix-water-coordinates-v2.sql | Delmängd av 036 | Registrera; **kör inte**. |
| 20260502000041_update-websites.sql | Flera slugs finns inte, websites har andra värden | Registrera; **kör inte**. |

---

## De 10 befintliga raderna i schema_migrations och motsvarande fil

| version (DB) | name (DB) | Motsvarar fil | Kommentar |
|---|---|---|---|
| 20260910181126 | gps_points_raw | 20260906000001_gps_points_raw.sql | `statements` citerar filnamnet; identiskt innehåll. |
| 20260910181133 | trips_gps_quality | 20260906000002_trips_gps_quality.sql | `statements` citerar filnamnet; identiskt innehåll. |
| 20260910203141 | trips_duration_seconds | 20260910000001_trips_duration_seconds.sql | Identisk SQL. |
| 20260913040958 | business_leads | 20260913000001_business_leads.sql | Identisk SQL (inte 20260502000033). |
| 20260913175707 | skapa_tre_tabeller_som_koden_forvantade | **Ingen fil.** Innehåller `achievement_events` (ur 20260502000019), `affiliate_clicks` (= 20260505000001) och `account_deletions` (= 20260502000031) | Förklarar varför 031 och 048 är applicerade trots att filerna aldrig kördes. Behöver ingen egen fil om 031/048 registreras; `achievement_events` täcks dock bara av 019 som i övrigt inte är körd. |
| 20260913191347 | lankkontroll_rapporter | 20260913000002_lankkontroll_rapporter.sql | Identisk SQL. |
| 20260913193047 | cron_purge_old_deleted_trips | 20260913000003_cron_purge_old_deleted_trips.sql | Identisk SQL. |
| 20260916191507 | lankkontroll_status_pagar | 20260916000001_lankkontroll_status_pagar.sql | Identisk SQL. |
| 20260920033416 | team_tasks_recurrence | **Ingen fil i repot.** Lägger till `team_tasks.recurrence`, `last_done_at`, `team_tasks_recurrence_check`, 2 COMMENT, `team_tasks_recurrence_idx` | Bör skrivas ned som `supabase/migrations/20260920033416_team_tasks_recurrence.sql` (SQL finns i `schema_migrations.statements`). |
| 20260922204241 | restaurants_endast_medlemmar | 20260922000001_restaurants_endast_medlemmar.sql | Identisk SQL. |

Versionerna i DB är tidpunkten då migrationen applicerades via Supabase MCP/Studio, inte filens tidsstämpel. Ingen av de 8 filerna matchar sin DB-version, så `supabase db push` kommer att anse dem okörda tills antingen filerna byter namn till DB-versionerna eller DB-raderna/filversionerna synkas.
