# SCHEMA_SNAPSHOT - den VERKLIGA databasen

Genererad 2026-08-03T12:07:32 ur produktionsdatabasen (information_schema + pg_policies
+ pg_indexes via SQL-editorn -> tillfallig tabell -> detta dokument).

**VARFOR DEN FINNS:** migrationsfilerna i `supabase/` beskriver INTE
databasen - 14+ tabeller skapades manuellt i SQL-editorn. Fyra
produktionsbuggar kom av att koden fragade efter kolumner som inte finns
(`users.updated_at`, `forum_threads.is_deleted` x2, `subscriptions`) och
felen svaldes tyst av fallbacks. DETTA dokument ar sanningen - kolla HAR
innan du skriver en fraga, inte i migrationsfilerna (CLAUDE.md p21).

Uppdatera: kor snapshot-queryn i SQL-editorn (se git-loggen for denna fil)
och kor om detta skript. Ogenererad for hand = garanterat inaktuell.

## Tabeller (48)

### analytics_events

RLS: PA | policies: 1

| kolumn | typ | null | default |
|---|---|---|---|
| id | bigint | NO | nextval('analytics_events_id_seq'::regclass) |
| event_name | text | NO |  |
| user_id | uuid | YES |  |
| session_id | text | YES |  |
| path | text | YES |  |
| props | jsonb | NO | '{}'::jsonb |
| country_code | text | YES |  |
| user_agent | text | YES |  |
| referer | text | YES |  |
| created_at | timestamp with time zone | NO | now() |

- policy **service role can manage events** (ALL): using `((auth.jwt() ->> 'role'::text) = 'service_role'::text)` check `-`

### articles

RLS: PA | policies: 5

| kolumn | typ | null | default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| slug | text | NO |  |
| title | text | NO |  |
| excerpt | text | YES |  |
| body_md | text | NO |  |
| cover_image | text | YES |  |
| author_id | uuid | YES |  |
| author_name | text | YES |  |
| category | text | YES | 'guide'::text |
| tags | ARRAY | YES | '{}'::text[] |
| reading_min | integer | YES |  |
| published | boolean | YES | false |
| published_at | timestamp with time zone | YES |  |
| created_at | timestamp with time zone | NO | now() |
| updated_at | timestamp with time zone | NO | now() |

- policy **Articles author delete** (DELETE): using `(auth.uid() = author_id)` check `-`
- policy **Articles author insert** (INSERT): using `-` check `(auth.uid() = author_id)`
- policy **Articles author read drafts** (SELECT): using `(auth.uid() = author_id)` check `-`
- policy **Articles author update** (UPDATE): using `(auth.uid() = author_id)` check `(auth.uid() = author_id)`
- policy **Articles public read** (SELECT): using `(published = true)` check `-`

### bookmarks

RLS: PA | policies: 3

| kolumn | typ | null | default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| user_id | uuid | NO |  |
| restaurant_id | uuid | YES |  |
| route_id | uuid | YES |  |
| created_at | timestamp with time zone | YES | now() |

- policy **Användare ser sina egna bokmärken** (SELECT): using `(auth.uid() = user_id)` check `-`
- policy **Användare skapar egna bokmärken** (INSERT): using `-` check `(auth.uid() = user_id)`
- policy **Användare tar bort egna bokmärken** (DELETE): using `(auth.uid() = user_id)` check `-`

### comments

RLS: PA | policies: 3

| kolumn | typ | null | default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| user_id | uuid | NO |  |
| trip_id | uuid | NO |  |
| content | text | NO |  |
| created_at | timestamp with time zone | YES | now() |

- policy **Anyone can read comments** (SELECT): using `true` check `-`
- policy **Users can comment** (INSERT): using `-` check `(auth.uid() = user_id)`
- policy **Users can delete own comments** (DELETE): using `(auth.uid() = user_id)` check `-`

### conversation_participants

RLS: PA | policies: 4

| kolumn | typ | null | default |
|---|---|---|---|
| conversation_id | uuid | NO |  |
| user_id | uuid | NO |  |
| role | text | NO | 'member'::text |
| joined_at | timestamp with time zone | NO | now() |
| last_read_at | timestamp with time zone | NO | '1970-01-01 00:00:00+00'::timestamp with time zone |
| muted | boolean | NO | false |

- policy **join conversation** (INSERT): using `-` check `((auth.uid() = user_id) OR (EXISTS ( SELECT 1
   FROM conversations
  WHERE ((conversations.id = conversation_participan`
- policy **leave conversation** (DELETE): using `(auth.uid() = user_id)` check `-`
- policy **read participants of own convs** (SELECT): using `((user_id = auth.uid()) OR is_conv_member(conversation_id, auth.uid()))` check `-`
- policy **update own participant** (UPDATE): using `(auth.uid() = user_id)` check `-`

### conversations

RLS: PA | policies: 3

| kolumn | typ | null | default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| is_group | boolean | NO | false |
| title | text | YES |  |
| club_id | uuid | YES |  |
| created_by | uuid | YES |  |
| status | text | NO | 'active'::text |
| created_at | timestamp with time zone | NO | now() |
| last_message_at | timestamp with time zone | NO | now() |
| last_message_preview | text | YES |  |
| last_message_user_id | uuid | YES |  |

- policy **conversations_update_creator** (UPDATE): using `(created_by = auth.uid())` check `(created_by = auth.uid())`
- policy **create conversations** (INSERT): using `-` check `(auth.uid() = created_by)`
- policy **read own conversations** (SELECT): using `is_conv_member(id, auth.uid())` check `-`

### email_log

RLS: PA | policies: 2

| kolumn | typ | null | default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| email | text | NO |  |
| template | text | NO |  |
| resend_id | text | YES |  |
| sent_at | timestamp with time zone | NO | now() |
| user_id | uuid | YES |  |
| error | text | YES |  |
| created_at | timestamp with time zone | NO | now() |

- policy **email_log_admin_read** (SELECT): using `(auth.uid() IN ( SELECT users.id
   FROM users
  WHERE (users.is_admin = true)))` check `-`
- policy **email_log_service_all** (ALL): using `true` check `true`

### email_subscribers

RLS: PA | policies: 3

| kolumn | typ | null | default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| email | text | NO |  |
| source | text | YES |  |
| preferences | jsonb | YES | '{}'::jsonb |
| confirmed | boolean | NO | false |
| unsubscribed | boolean | NO | false |
| user_id | uuid | YES |  |
| created_at | timestamp with time zone | NO | now() |
| confirmed_at | timestamp with time zone | YES |  |
| unsubscribed_at | timestamp with time zone | YES |  |

- policy **Anon can subscribe** (INSERT): using `-` check `true`
- policy **User can unsubscribe own** (UPDATE): using `(auth.uid() = user_id)` check `-`
- policy **User can view own subscription** (SELECT): using `(auth.uid() = user_id)` check `-`

### email_unsubscribes

RLS: PA | policies: 0

| kolumn | typ | null | default |
|---|---|---|---|
| email | text | NO |  |
| unsubscribed_at | timestamp with time zone | NO | now() |
| ip | text | YES |  |
| user_agent | text | YES |  |
| source_template | text | YES |  |

### follows

RLS: PA | policies: 3

| kolumn | typ | null | default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| follower_id | uuid | NO |  |
| following_id | uuid | NO |  |
| created_at | timestamp with time zone | YES | now() |

- policy **Anyone can read follows** (SELECT): using `true` check `-`
- policy **Users can follow** (INSERT): using `-` check `(auth.uid() = follower_id)`
- policy **Users can unfollow** (DELETE): using `(auth.uid() = follower_id)` check `-`

### forum_categories

RLS: PA | policies: 1

| kolumn | typ | null | default |
|---|---|---|---|
| id | text | NO |  |
| name | text | NO |  |
| description | text | YES |  |
| icon | text | NO | '💬'::text |
| sort_order | integer | NO | 0 |
| thread_count | integer | NO | 0 |
| post_count | integer | NO | 0 |
| created_at | timestamp with time zone | NO | now() |

- policy **forum_categories_public_read** (SELECT): using `true` check `-`

### forum_post_likes

RLS: PA | policies: 3

| kolumn | typ | null | default |
|---|---|---|---|
| post_id | uuid | NO |  |
| user_id | uuid | NO |  |
| created_at | timestamp with time zone | NO | now() |

- policy **forum_post_likes_delete_own** (DELETE): using `(user_id = auth.uid())` check `-`
- policy **forum_post_likes_insert** (INSERT): using `-` check `((auth.uid() IS NOT NULL) AND (user_id = auth.uid()))`
- policy **forum_post_likes_public_read** (SELECT): using `true` check `-`

### forum_posts

RLS: PA | policies: 3

| kolumn | typ | null | default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| thread_id | uuid | NO |  |
| user_id | uuid | YES |  |
| body | text | NO |  |
| is_deleted | boolean | NO | false |
| in_spam_queue | boolean | NO | false |
| created_at | timestamp with time zone | NO | now() |

- policy **forum_posts_insert** (INSERT): using `-` check `((auth.uid() IS NOT NULL) AND (user_id = auth.uid()))`
- policy **forum_posts_public_read** (SELECT): using `((in_spam_queue = false) OR (user_id = auth.uid()))` check `-`
- policy **forum_posts_soft_delete** (UPDATE): using `(user_id = auth.uid())` check `(user_id = auth.uid())`

### forum_subscriptions

RLS: PA | policies: 1

| kolumn | typ | null | default |
|---|---|---|---|
| user_id | uuid | NO |  |
| thread_id | uuid | NO |  |
| created_at | timestamp with time zone | YES | now() |

- policy **forum_subscriptions_own** (ALL): using `(auth.uid() = user_id)` check `-`

### forum_threads

RLS: PA | policies: 3

| kolumn | typ | null | default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| category_id | text | NO |  |
| user_id | uuid | YES |  |
| title | text | NO |  |
| body | text | NO |  |
| is_pinned | boolean | NO | false |
| is_locked | boolean | NO | false |
| view_count | integer | NO | 0 |
| reply_count | integer | NO | 0 |
| last_reply_at | timestamp with time zone | NO | now() |
| last_reply_user_id | uuid | YES |  |
| in_spam_queue | boolean | NO | false |
| created_at | timestamp with time zone | NO | now() |
| best_post_id | uuid | YES |  |
| is_solved | boolean | NO | false |
| listing_data | jsonb | YES |  |
| island_slug | text | YES |  |

- policy **forum_threads_insert** (INSERT): using `-` check `((auth.uid() IS NOT NULL) AND (user_id = auth.uid()))`
- policy **forum_threads_public_read** (SELECT): using `((in_spam_queue = false) OR (user_id = auth.uid()))` check `-`
- policy **forum_threads_update_own** (UPDATE): using `(user_id = auth.uid())` check `(user_id = auth.uid())`

### gps_points

RLS: PA | policies: 5

| kolumn | typ | null | default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| trip_id | uuid | NO |  |
| latitude | double precision | NO |  |
| longitude | double precision | NO |  |
| speed_knots | double precision | YES | 0 |
| heading | double precision | YES |  |
| accuracy | double precision | YES |  |
| recorded_at | timestamp with time zone | NO | now() |

- policy **Anyone can read gps points** (SELECT): using `true` check `-`
- policy **Users can insert gps points for own trips** (INSERT): using `-` check `(auth.uid() = ( SELECT trips.user_id
   FROM trips
  WHERE (trips.id = gps_points.trip_id)))`
- policy **gps_delete_own** (DELETE): using `(auth.uid() = ( SELECT trips.user_id
   FROM trips
  WHERE (trips.id = gps_points.trip_id)
 LIMIT 1))` check `-`
- policy **gps_insert_own** (INSERT): using `-` check `(auth.uid() = ( SELECT trips.user_id
   FROM trips
  WHERE (trips.id = gps_points.trip_id)
 LIMIT 1))`
- policy **gps_select_all** (SELECT): using `true` check `-`

### likes

RLS: PA | policies: 3

| kolumn | typ | null | default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| user_id | uuid | NO |  |
| trip_id | uuid | NO |  |
| created_at | timestamp with time zone | YES | now() |

- policy **Anyone can read likes** (SELECT): using `true` check `-`
- policy **Users can like** (INSERT): using `-` check `(auth.uid() = user_id)`
- policy **Users can unlike** (DELETE): using `(auth.uid() = user_id)` check `-`

### loppis_saves

RLS: PA | policies: 3

| kolumn | typ | null | default |
|---|---|---|---|
| user_id | uuid | NO |  |
| thread_id | uuid | NO |  |
| saved_at | timestamp with time zone | NO | now() |

- policy **loppis_saves_delete_own** (DELETE): using `(auth.uid() = user_id)` check `-`
- policy **loppis_saves_insert_own** (INSERT): using `-` check `(auth.uid() = user_id)`
- policy **loppis_saves_select_own** (SELECT): using `(auth.uid() = user_id)` check `-`

### messages

RLS: PA | policies: 3

| kolumn | typ | null | default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| conversation_id | uuid | NO |  |
| user_id | uuid | NO |  |
| content | text | YES |  |
| attachment_type | text | YES |  |
| attachment_url | text | YES |  |
| attachment_meta | jsonb | YES |  |
| created_at | timestamp with time zone | NO | now() |

- policy **delete own message** (DELETE): using `(auth.uid() = user_id)` check `-`
- policy **read messages in conv** (SELECT): using `is_conv_member(conversation_id, auth.uid())` check `-`
- policy **send messages** (INSERT): using `-` check `((auth.uid() = user_id) AND is_conv_member(conversation_id, auth.uid()))`

### notifications

RLS: PA | policies: 5

| kolumn | typ | null | default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| user_id | uuid | NO |  |
| actor_id | uuid | NO |  |
| type | text | NO |  |
| trip_id | uuid | YES |  |
| read | boolean | YES | false |
| created_at | timestamp with time zone | YES | now() |
| related_island_slug | text | YES |  |
| reference_id | uuid | YES |  |

- policy **Users can mark read** (UPDATE): using `(auth.uid() = user_id)` check `-`
- policy **Users can read own notifications** (SELECT): using `(auth.uid() = user_id)` check `-`
- policy **Users mark own as read** (UPDATE): using `(user_id = auth.uid())` check `-`
- policy **Users see own notifications** (SELECT): using `(user_id = auth.uid())` check `-`
- policy **notifications_insert** (INSERT): using `-` check `((actor_id = auth.uid()) AND (user_id IS NOT NULL) AND (user_id <> actor_id))`

### partner_inquiries

RLS: PA | policies: 4

| kolumn | typ | null | default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| business_name | text | NO |  |
| contact_name | text | YES |  |
| email | text | NO |  |
| phone | text | YES |  |
| category | text | YES |  |
| island_slug | text | YES |  |
| tier | text | YES |  |
| message | text | YES |  |
| status | text | NO | 'new'::text |
| source | text | YES | 'partner-page'::text |
| created_at | timestamp with time zone | NO | now() |
| contacted_at | timestamp with time zone | YES |  |
| stripe_subscription_id | text | YES |  |
| stripe_customer_id | text | YES |  |
| stripe_status | text | YES |  |
| activated_at | timestamp with time zone | YES |  |

- policy **Anon can submit inquiry** (INSERT): using `-` check `true`
- policy **partner_inquiries_admin_read** (SELECT): using `(auth.uid() IN ( SELECT users.id
   FROM users
  WHERE (users.is_admin = true)))` check `-`
- policy **partner_inquiries_insert_anyone** (INSERT): using `-` check `true`
- policy **partner_inquiries_service_all** (ALL): using `true` check `true`

### place_photos

RLS: PA | policies: 1

| kolumn | typ | null | default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| place_id | uuid | NO |  |
| url | text | NO |  |
| source | text | NO | 'upload'::text |
| source_ref | text | YES |  |
| credit | text | YES |  |
| blurhash | text | YES |  |
| width | integer | YES |  |
| height | integer | YES |  |
| sort_order | integer | NO | 0 |
| is_hero | boolean | NO | false |
| created_at | timestamp with time zone | NO | now() |
| uploaded_by | uuid | YES |  |

- policy **Anyone can read place_photos** (SELECT): using `true` check `-`

### place_saves

RLS: PA | policies: 3

| kolumn | typ | null | default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| user_id | uuid | NO |  |
| place_slug | text | YES |  |
| place_name | text | NO |  |
| place_type | text | YES |  |
| lat | double precision | NO |  |
| lng | double precision | NO |  |
| image_url | text | YES |  |
| island | text | YES |  |
| notes | text | YES |  |
| created_at | timestamp with time zone | YES | now() |

- policy **ps_delete_own** (DELETE): using `(auth.uid() = user_id)` check `-`
- policy **ps_insert_own** (INSERT): using `-` check `(auth.uid() = user_id)`
- policy **ps_select_own** (SELECT): using `(auth.uid() = user_id)` check `-`

### planned_routes

RLS: PA | policies: 7

| kolumn | typ | null | default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| user_id | uuid | YES |  |
| start_name | text | NO |  |
| end_name | text | NO |  |
| start_lat | double precision | NO |  |
| start_lng | double precision | NO |  |
| end_lat | double precision | NO |  |
| end_lng | double precision | NO |  |
| interests | ARRAY | NO | '{}'::text[] |
| suggested_stops | jsonb | NO | '[]'::jsonb |
| status | text | NO | 'draft'::text |
| trip_id | uuid | YES |  |
| created_at | timestamp with time zone | NO | now() |
| updated_at | timestamp with time zone | NO | now() |
| cached_path | jsonb | YES |  |
| cached_quality | text | YES |  |
| cached_validated | boolean | YES |  |
| cached_at | timestamp with time zone | YES |  |

- policy **planned_routes_insert_any** (INSERT): using `-` check `true`
- policy **planned_routes_select_published** (SELECT): using `(status = 'published'::text)` check `-`
- policy **planned_routes_update_stops** (UPDATE): using `true` check `true`
- policy **published routes viewable by anyone** (SELECT): using `((status = 'published'::text) OR (auth.uid() = user_id))` check `-`
- policy **users delete own routes** (DELETE): using `(auth.uid() = user_id)` check `-`
- policy **users insert own routes** (INSERT): using `-` check `(auth.uid() = user_id)`
- policy **users update own routes** (UPDATE): using `(auth.uid() = user_id)` check `-`

### push_log

RLS: PA | policies: 0

| kolumn | typ | null | default |
|---|---|---|---|
| target_user_id | uuid | NO |  |
| conversation_id | uuid | NO |  |
| last_sent_at | timestamp with time zone | NO | now() |

### push_subscriptions

RLS: PA | policies: 5

| kolumn | typ | null | default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| user_id | uuid | NO |  |
| endpoint | text | NO |  |
| p256dh | text | NO |  |
| auth | text | NO |  |
| created_at | timestamp with time zone | YES | now() |

- policy **Users manage own subscriptions** (ALL): using `(user_id = auth.uid())` check `(user_id = auth.uid())`
- policy **push_subs_delete_own** (DELETE): using `(auth.uid() = user_id)` check `-`
- policy **push_subs_insert_own** (INSERT): using `-` check `(auth.uid() = user_id)`
- policy **push_subs_select_own** (SELECT): using `(auth.uid() = user_id)` check `-`
- policy **push_subs_service_all** (ALL): using `true` check `true`

### reports

RLS: PA | policies: 4

| kolumn | typ | null | default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| reporter_id | uuid | NO |  |
| target_type | text | NO |  |
| target_id | uuid | NO |  |
| reason | text | NO |  |
| note | text | YES |  |
| status | text | NO | 'open'::text |
| auto_flagged | boolean | NO | false |
| created_at | timestamp with time zone | NO | now() |
| reviewed_by | uuid | YES |  |
| reviewed_at | timestamp with time zone | YES |  |

- policy **admin read reports** (SELECT): using `is_admin_user()` check `-`
- policy **admin update report** (UPDATE): using `is_admin_user()` check `-`
- policy **create report** (INSERT): using `-` check `(auth.uid() = reporter_id)`
- policy **read own reports** (SELECT): using `(auth.uid() = reporter_id)` check `-`

### restaurants

RLS: PA | policies: 2

| kolumn | typ | null | default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| name | text | NO |  |
| latitude | double precision | YES |  |
| longitude | double precision | YES |  |
| images | ARRAY | YES | '{}'::text[] |
| menu | text | YES |  |
| opening_hours | text | YES |  |
| description | text | YES |  |
| created_at | timestamp with time zone | YES | now() |
| tags | ARRAY | YES | '{}'::text[] |
| core_experience | text | YES |  |
| island | text | YES |  |
| image_url | text | YES |  |
| type | text | YES | 'restaurant'::text |
| slug | text | YES |  |
| archipelago_region | text | YES |  |
| categories | ARRAY | YES | '{}'::text[] |
| best_for | ARRAY | YES | '{}'::text[] |
| facilities | ARRAY | YES | '{}'::text[] |
| seasonality | text | YES | 'seasonal_unknown'::text |
| source_confidence | text | YES | 'medium'::text |
| contact_phone | text | YES |  |
| website | text | YES |  |
| booking_url | text | YES |  |
| google_place_id | text | YES |  |
| place_data_source | text | YES | 'manual'::text |
| verified_at | timestamp with time zone | YES |  |
| verified_by | uuid | YES |  |
| phone | text | YES |  |
| email | text | YES |  |
| menu_url | text | YES |  |
| instagram | text | YES |  |
| facebook | text | YES |  |
| formatted_address | text | YES |  |
| postal_code | text | YES |  |
| city | text | YES |  |
| opening_hours_json | jsonb | YES |  |
| google_rating | numeric | YES |  |
| google_ratings_total | integer | YES |  |
| google_rating_updated | timestamp with time zone | YES |  |
| google_photo_refs | jsonb | YES |  |
| updated_at | timestamp with time zone | NO | now() |

- policy **Anyone can read restaurants** (SELECT): using `true` check `-`
- policy **restaurants_read_all** (SELECT): using `true` check `-`

### reviews

RLS: PA | policies: 4

| kolumn | typ | null | default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| user_id | uuid | NO |  |
| place_id | uuid | NO |  |
| rating | integer | NO |  |
| text | text | YES |  |
| created_at | timestamp with time zone | NO | now() |

- policy **Anyone can read reviews** (SELECT): using `true` check `-`
- policy **Authenticated users can insert reviews** (INSERT): using `-` check `(auth.uid() = user_id)`
- policy **Users can delete own reviews** (DELETE): using `(auth.uid() = user_id)` check `-`
- policy **Users can update own reviews** (UPDATE): using `(auth.uid() = user_id)` check `-`

### route_feedback

RLS: PA | policies: 3

| kolumn | typ | null | default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| route_id | text | NO |  |
| start_name | text | YES |  |
| end_name | text | YES |  |
| issue_type | text | NO |  |
| comment | text | YES |  |
| user_id | uuid | YES |  |
| resolved | boolean | NO | false |
| created_at | timestamp with time zone | NO | now() |

- policy **route_feedback_admin_read** (SELECT): using `(auth.uid() IN ( SELECT users.id
   FROM users
  WHERE (users.is_admin = true)))` check `-`
- policy **route_feedback_admin_update** (UPDATE): using `(auth.uid() IN ( SELECT users.id
   FROM users
  WHERE (users.is_admin = true)))` check `-`
- policy **route_feedback_insert** (INSERT): using `-` check `true`

### route_metrics

RLS: PA | policies: 1

| kolumn | typ | null | default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| start_lat | double precision | NO |  |
| start_lng | double precision | NO |  |
| end_lat | double precision | NO |  |
| end_lng | double precision | NO |  |
| quality | text | NO |  |
| ms | integer | NO |  |
| waypoints_count | integer | NO |  |
| route_id | uuid | YES |  |
| user_id | uuid | YES |  |
| created_at | timestamp with time zone | YES | now() |

- policy **rm_service_insert** (INSERT): using `-` check `true`

### route_reports

RLS: PA | policies: 1

| kolumn | typ | null | default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| route_id | uuid | NO |  |
| user_id | uuid | YES |  |
| reason | text | NO |  |
| status | text | NO | 'open'::text |
| created_at | timestamp with time zone | YES | now() |

- policy **rr_insert_anyone** (INSERT): using `-` check `true`

### routes

RLS: PA | policies: 1

| kolumn | typ | null | default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| name | text | NO |  |
| description | text | YES |  |
| distance | double precision | NO |  |
| duration | integer | NO |  |
| difficulty | text | YES | 'Medel'::text |
| boat_types | ARRAY | YES | '{}'::text[] |
| waypoints | jsonb | YES | '[]'::jsonb |
| cover_image | text | YES |  |
| restaurant_ids | ARRAY | YES | '{}'::uuid[] |
| created_at | timestamp with time zone | YES | now() |

- policy **Anyone can read routes** (SELECT): using `true` check `-`

### saved_islands

RLS: PA | policies: 4

| kolumn | typ | null | default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| user_id | uuid | NO |  |
| island_slug | text | NO |  |
| created_at | timestamp with time zone | NO | now() |

- policy **Public can count saves** (SELECT): using `true` check `-`
- policy **Users can delete own saves** (DELETE): using `(auth.uid() = user_id)` check `-`
- policy **Users can insert own saves** (INSERT): using `-` check `(auth.uid() = user_id)`
- policy **Users can view own saves** (SELECT): using `(auth.uid() = user_id)` check `-`

### site_feedback

RLS: PA | policies: 3

| kolumn | typ | null | default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| feedback_type | text | NO |  |
| message | text | NO |  |
| page_url | text | YES |  |
| user_id | uuid | YES |  |
| resolved | boolean | NO | false |
| resolved_at | timestamp with time zone | YES |  |
| resolved_by | uuid | YES |  |
| created_at | timestamp with time zone | NO | now() |

- policy **site_feedback_admin_select** (SELECT): using `(auth.uid() IN ( SELECT users.id
   FROM users
  WHERE (users.is_admin = true)))` check `-`
- policy **site_feedback_admin_update** (UPDATE): using `(auth.uid() IN ( SELECT users.id
   FROM users
  WHERE (users.is_admin = true)))` check `-`
- policy **site_feedback_insert_anon** (INSERT): using `-` check `true`

### stops

RLS: PA | policies: 5

| kolumn | typ | null | default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| trip_id | uuid | NO |  |
| latitude | double precision | NO |  |
| longitude | double precision | NO |  |
| stop_type | text | YES | 'stop'::text |
| started_at | timestamp with time zone | NO |  |
| ended_at | timestamp with time zone | YES |  |
| duration_seconds | integer | YES | 0 |
| note | text | YES |  |
| place_name | text | YES |  |

- policy **Anyone can read stops** (SELECT): using `true` check `-`
- policy **Users can insert stops for own trips** (INSERT): using `-` check `(auth.uid() = ( SELECT trips.user_id
   FROM trips
  WHERE (trips.id = stops.trip_id)))`
- policy **stops_delete_own** (DELETE): using `(auth.uid() = ( SELECT trips.user_id
   FROM trips
  WHERE (trips.id = stops.trip_id)
 LIMIT 1))` check `-`
- policy **stops_insert_own** (INSERT): using `-` check `(auth.uid() = ( SELECT trips.user_id
   FROM trips
  WHERE (trips.id = stops.trip_id)
 LIMIT 1))`
- policy **stops_select_all** (SELECT): using `true` check `-`

### tag_follows

RLS: PA | policies: 1

| kolumn | typ | null | default |
|---|---|---|---|
| user_id | uuid | NO |  |
| tag | text | NO |  |
| created_at | timestamp with time zone | NO | now() |

- policy **Users can manage own tag follows** (ALL): using `(auth.uid() = user_id)` check `(auth.uid() = user_id)`

### team_activity

RLS: PA | policies: 3

| kolumn | typ | null | default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| kind | text | NO | 'note'::text |
| message | text | NO |  |
| task_id | uuid | YES |  |
| prompt_id | uuid | YES |  |
| project_id | uuid | YES |  |
| created_by | uuid | YES |  |
| created_at | timestamp with time zone | NO | now() |

- policy **team admins can delete activity** (DELETE): using `is_team_admin()` check `-`
- policy **team admins can read activity** (SELECT): using `is_team_admin()` check `-`
- policy **team admins can write activity** (INSERT): using `-` check `is_team_admin()`

### team_projects

RLS: PA | policies: 4

| kolumn | typ | null | default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| name | text | NO |  |
| slug | text | NO |  |
| description | text | YES |  |
| color | text | NO | '#1e5c82'::text |
| status | text | NO | 'active'::text |
| created_by | uuid | YES |  |
| created_at | timestamp with time zone | NO | now() |
| updated_at | timestamp with time zone | NO | now() |

- policy **team admins can delete projects** (DELETE): using `is_team_admin()` check `-`
- policy **team admins can read projects** (SELECT): using `is_team_admin()` check `-`
- policy **team admins can update projects** (UPDATE): using `is_team_admin()` check `-`
- policy **team admins can write projects** (INSERT): using `-` check `is_team_admin()`

### team_prompts

RLS: PA | policies: 4

| kolumn | typ | null | default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| project_id | uuid | YES |  |
| title | text | NO |  |
| content | text | NO |  |
| tags | ARRAY | NO | '{}'::text[] |
| created_by | uuid | YES |  |
| created_at | timestamp with time zone | NO | now() |
| updated_at | timestamp with time zone | NO | now() |

- policy **team admins can delete prompts** (DELETE): using `is_team_admin()` check `-`
- policy **team admins can read prompts** (SELECT): using `is_team_admin()` check `-`
- policy **team admins can update prompts** (UPDATE): using `is_team_admin()` check `-`
- policy **team admins can write prompts** (INSERT): using `-` check `is_team_admin()`

### team_tasks

RLS: PA | policies: 4

| kolumn | typ | null | default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| project_id | uuid | YES |  |
| title | text | NO |  |
| description | text | YES |  |
| status | text | NO | 'todo'::text |
| priority | text | NO | 'normal'::text |
| assignee_id | uuid | YES |  |
| created_by | uuid | YES |  |
| due_date | date | YES |  |
| created_at | timestamp with time zone | NO | now() |
| updated_at | timestamp with time zone | NO | now() |
| pr_url | text | YES |  |
| prompt | text | YES |  |
| images | jsonb | NO | '[]'::jsonb |
| color | text | YES |  |

- policy **team admins can delete tasks** (DELETE): using `is_team_admin()` check `-`
- policy **team admins can read tasks** (SELECT): using `is_team_admin()` check `-`
- policy **team admins can update tasks** (UPDATE): using `is_team_admin()` check `-`
- policy **team admins can write tasks** (INSERT): using `-` check `is_team_admin()`

### tours

RLS: PA | policies: 1

| kolumn | typ | null | default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| slug | text | NO |  |
| title | text | NO |  |
| start_location | text | NO |  |
| destination | text | NO |  |
| transport_types | ARRAY | NO | '{}'::text[] |
| duration_label | text | NO |  |
| best_for | ARRAY | NO | '{}'::text[] |
| highlights | ARRAY | NO | '{}'::text[] |
| food_stops | jsonb | NO | '[]'::jsonb |
| season | text | NO | 'Maj–september'::text |
| usp | text | NO | ''::text |
| category | ARRAY | NO | '{}'::text[] |
| hamn_profil | ARRAY | NO | '{}'::text[] |
| bad_profil | ARRAY | NO | '{}'::text[] |
| tone_tags | ARRAY | NO | '{}'::text[] |
| log_suggestions | ARRAY | NO | '{}'::text[] |
| insider_tip | text | YES |  |
| cover_image | text | YES |  |
| description | text | YES |  |
| created_at | timestamp with time zone | YES | now() |
| waypoints | jsonb | YES | '[]'::jsonb |
| tags | ARRAY | YES | '{}'::text[] |

- policy **tours_read_all** (SELECT): using `true` check `-`

### trip_highlights

RLS: PA | policies: 4

| kolumn | typ | null | default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| trip_id | uuid | NO |  |
| user_id | uuid | NO |  |
| place_slug | text | NO |  |
| place_name | text | NO |  |
| place_type | text | YES |  |
| island | text | YES |  |
| lat | double precision | YES |  |
| lng | double precision | YES |  |
| note | text | YES |  |
| created_at | timestamp with time zone | NO | now() |

- policy **trip_highlights_delete_own** (DELETE): using `(auth.uid() = user_id)` check `-`
- policy **trip_highlights_insert_own** (INSERT): using `-` check `((auth.uid() = user_id) AND (EXISTS ( SELECT 1
   FROM trips t
  WHERE ((t.id = trip_highlights.trip_id) AND (t.user_id `
- policy **trip_highlights_modify_own** (UPDATE): using `(auth.uid() = user_id)` check `-`
- policy **trip_highlights_read_all** (SELECT): using `true` check `-`

### trip_tags

RLS: PA | policies: 6

| kolumn | typ | null | default |
|---|---|---|---|
| trip_id | uuid | NO |  |
| tagged_user_id | uuid | NO |  |
| tagged_by_user_id | uuid | YES |  |
| confirmed | boolean | NO | false |
| created_at | timestamp with time zone | NO | now() |

- policy **Anyone can read trip_tags** (SELECT): using `true` check `-`
- policy **Users can tag** (INSERT): using `-` check `(auth.uid() = tagged_by_user_id)`
- policy **confirm own tag** (UPDATE): using `(auth.uid() = tagged_user_id)` check `-`
- policy **read trip_tags** (SELECT): using `true` check `-`
- policy **tag on own trip** (INSERT): using `-` check `((auth.uid() = tagged_by_user_id) AND (EXISTS ( SELECT 1
   FROM trips
  WHERE ((trips.id = trip_tags.trip_id) AND (trip`
- policy **untag own** (DELETE): using `((auth.uid() = tagged_user_id) OR (auth.uid() = tagged_by_user_id))` check `-`

### trips

RLS: PA | policies: 8

| kolumn | typ | null | default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| user_id | uuid | NO |  |
| boat_type | text | NO |  |
| distance | double precision | YES | 0 |
| duration | integer | YES | 0 |
| average_speed_knots | double precision | YES | 0 |
| max_speed_knots | double precision | YES | 0 |
| image | text | NO |  |
| route_id | uuid | YES |  |
| started_at | timestamp with time zone | YES |  |
| ended_at | timestamp with time zone | YES |  |
| created_at | timestamp with time zone | YES | now() |
| caption | text | YES |  |
| location_name | text | YES |  |
| pinnar_rating | smallint | YES |  |
| start_location | text | YES |  |
| ai_summary | text | YES |  |
| route_points | jsonb | YES |  |
| images | jsonb | YES | '[]'::jsonb |
| planned_route_id | uuid | YES |  |
| deleted_at | timestamp with time zone | YES |  |

- policy **Anyone can read trips** (SELECT): using `true` check `-`
- policy **Users can delete own trips** (DELETE): using `(auth.uid() = user_id)` check `-`
- policy **Users can insert own trips** (INSERT): using `-` check `(auth.uid() = user_id)`
- policy **Users can update own trips** (UPDATE): using `(auth.uid() = user_id)` check `-`
- policy **trips_delete_own** (DELETE): using `(auth.uid() = user_id)` check `-`
- policy **trips_insert_own** (INSERT): using `-` check `(auth.uid() = user_id)`
- policy **trips_select_all** (SELECT): using `true` check `-`
- policy **trips_update_own** (UPDATE): using `(auth.uid() = user_id)` check `-`

### user_presence

RLS: PA | policies: 4

| kolumn | typ | null | default |
|---|---|---|---|
| user_id | uuid | NO |  |
| current_chat_id | uuid | YES |  |
| updated_at | timestamp with time zone | NO | now() |

- policy **delete own presence** (DELETE): using `(auth.uid() = user_id)` check `-`
- policy **read own presence** (SELECT): using `(auth.uid() = user_id)` check `-`
- policy **update own presence** (UPDATE): using `(auth.uid() = user_id)` check `-`
- policy **upsert own presence** (INSERT): using `-` check `(auth.uid() = user_id)`

### users

RLS: PA | policies: 9

| kolumn | typ | null | default |
|---|---|---|---|
| id | uuid | NO |  |
| username | text | NO |  |
| email | text | NO |  |
| avatar | text | YES |  |
| created_at | timestamp with time zone | YES | now() |
| bio | text | YES |  |
| nationality | text | YES |  |
| experience_years | integer | YES |  |
| vessel_type | text | YES |  |
| vessel_model | text | YES |  |
| vessel_name | text | YES |  |
| home_port | text | YES |  |
| sailing_region | text | YES |  |
| public_fields | ARRAY | YES | ARRAY['vessel_name'::text, 'nationality'::text, 'home_port': |
| is_admin | boolean | NO | false |
| boat_type | text | YES |  |
| website | text | YES |  |
| onboarded_at | timestamp with time zone | YES |  |
| home_port_lat | double precision | YES |  |
| home_port_lng | double precision | YES |  |

- policy **Users can insert own profile** (INSERT): using `-` check `(auth.uid() = id)`
- policy **Users can read all profiles** (SELECT): using `true` check `-`
- policy **Users can update own profile** (UPDATE): using `(auth.uid() = id)` check `-`
- policy **users_insert_own** (INSERT): using `-` check `(auth.uid() = id)`
- policy **users_read_all** (SELECT): using `true` check `-`
- policy **users_select_all** (SELECT): using `true` check `-`
- policy **users_service_all** (ALL): using `true` check `true`
- policy **users_update_own** (UPDATE): using `(auth.uid() = id)` check `-`
- policy **users_update_self** (UPDATE): using `(auth.uid() = id)` check `(auth.uid() = id)`

### visited_islands

RLS: PA | policies: 3

| kolumn | typ | null | default |
|---|---|---|---|
| id | uuid | NO | gen_random_uuid() |
| user_id | uuid | NO |  |
| island_slug | text | NO |  |
| trip_id | uuid | YES |  |
| visited_at | timestamp with time zone | NO | now() |

- policy **visited_islands_delete_own** (DELETE): using `(auth.uid() = user_id)` check `-`
- policy **visited_islands_insert_own** (INSERT): using `-` check `(auth.uid() = user_id)`
- policy **visited_islands_select_all** (SELECT): using `true` check `-`

