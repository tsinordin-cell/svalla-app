# SCHEMA_SNAPSHOT - den VERKLIGA databasen

Genererad 2026-08-17T01:55:17 ur produktionsdatabasen (information_schema + pg_policies
+ pg_indexes via SQL-editorn -> tillfallig tabell -> detta dokument).

**VARFOR DEN FINNS:** migrationsfilerna i `supabase/` beskriver INTE
databasen - 14+ tabeller skapades manuellt i SQL-editorn. Fyra
produktionsbuggar kom av att koden fragade efter kolumner som inte finns
(`users.updated_at`, `forum_threads.is_deleted` x2, `subscriptions`) och
felen svaldes tyst av fallbacks. DETTA dokument ar sanningen - kolla HAR
innan du skriver en fraga, inte i migrationsfilerna (CLAUDE.md p21).

**OBS 2026-08-16:** snapshoten fran 08-03 SAKNADE gps_select_all-policyn
(dubblett av 'Anyone can read gps points'). Verifiera RLS-andringar ratt
mot PostgREST med anon-nyckeln - aldrig enbart mot detta dokument (p41).

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

Index (5):
- `analytics_events_created_idx`: CREATE INDEX analytics_events_created_idx ON public.analytics_events USING btree (created_at DESC)
- `analytics_events_name_created_idx`: CREATE INDEX analytics_events_name_created_idx ON public.analytics_events USING btree (event_name, created_at DESC)
- `analytics_events_pkey`: CREATE UNIQUE INDEX analytics_events_pkey ON public.analytics_events USING btree (id)
- `analytics_events_props_idx`: CREATE INDEX analytics_events_props_idx ON public.analytics_events USING gin (props)
- `analytics_events_user_idx`: CREATE INDEX analytics_events_user_idx ON public.analytics_events USING btree (user_id) WHERE (user_id IS NOT NULL)

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

Index (5):
- `articles_pkey`: CREATE UNIQUE INDEX articles_pkey ON public.articles USING btree (id)
- `articles_slug_key`: CREATE UNIQUE INDEX articles_slug_key ON public.articles USING btree (slug)
- `idx_articles_category`: CREATE INDEX idx_articles_category ON public.articles USING btree (category)
- `idx_articles_published`: CREATE INDEX idx_articles_published ON public.articles USING btree (published)
- `idx_articles_published_at`: CREATE INDEX idx_articles_published_at ON public.articles USING btree (published_at DESC)

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

Index (3):
- `bookmarks_pkey`: CREATE UNIQUE INDEX bookmarks_pkey ON public.bookmarks USING btree (id)
- `bookmarks_user_id_restaurant_id_key`: CREATE UNIQUE INDEX bookmarks_user_id_restaurant_id_key ON public.bookmarks USING btree (user_id, restaurant_id)
- `bookmarks_user_id_route_id_key`: CREATE UNIQUE INDEX bookmarks_user_id_route_id_key ON public.bookmarks USING btree (user_id, route_id)

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

Index (3):
- `comments_pkey`: CREATE UNIQUE INDEX comments_pkey ON public.comments USING btree (id)
- `comments_trip_id_idx`: CREATE INDEX comments_trip_id_idx ON public.comments USING btree (trip_id)
- `comments_user_created_idx`: CREATE INDEX comments_user_created_idx ON public.comments USING btree (user_id, created_at DESC)

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
  WHERE ((conversations.id = conversation_participants.conversation_id) AND (conversations.created_by = auth.uid())))))`
- policy **leave conversation** (DELETE): using `(auth.uid() = user_id)` check `-`
- policy **read participants of own convs** (SELECT): using `((user_id = auth.uid()) OR is_conv_member(conversation_id, auth.uid()))` check `-`
- policy **update own participant** (UPDATE): using `(auth.uid() = user_id)` check `-`

Index (2):
- `conversation_participants_pkey`: CREATE UNIQUE INDEX conversation_participants_pkey ON public.conversation_participants USING btree (conversation_id, user_id)
- `participants_user_idx`: CREATE INDEX participants_user_idx ON public.conversation_participants USING btree (user_id)

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

Index (3):
- `conversations_last_msg_idx`: CREATE INDEX conversations_last_msg_idx ON public.conversations USING btree (last_message_at DESC)
- `conversations_pkey`: CREATE UNIQUE INDEX conversations_pkey ON public.conversations USING btree (id)
- `conversations_status_idx`: CREATE INDEX conversations_status_idx ON public.conversations USING btree (status)

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

Index (7):
- `email_log_pkey`: CREATE UNIQUE INDEX email_log_pkey ON public.email_log USING btree (id)
- `email_log_sent_at_idx`: CREATE INDEX email_log_sent_at_idx ON public.email_log USING btree (sent_at DESC)
- `email_log_template_idx`: CREATE INDEX email_log_template_idx ON public.email_log USING btree (template, sent_at DESC)
- `email_log_user_template_idx`: CREATE INDEX email_log_user_template_idx ON public.email_log USING btree (user_id, template, sent_at DESC)
- `idx_email_log_email`: CREATE INDEX idx_email_log_email ON public.email_log USING btree (email)
- `idx_email_log_email_template`: CREATE INDEX idx_email_log_email_template ON public.email_log USING btree (email, template)
- `idx_email_log_sent_at`: CREATE INDEX idx_email_log_sent_at ON public.email_log USING btree (sent_at DESC)

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

Index (4):
- `email_subscribers_email_key`: CREATE UNIQUE INDEX email_subscribers_email_key ON public.email_subscribers USING btree (email)
- `email_subscribers_pkey`: CREATE UNIQUE INDEX email_subscribers_pkey ON public.email_subscribers USING btree (id)
- `idx_email_subscribers_active`: CREATE INDEX idx_email_subscribers_active ON public.email_subscribers USING btree (confirmed, unsubscribed) WHERE ((confirmed = true) AND (unsubscribed = false))
- `idx_email_subscribers_email`: CREATE INDEX idx_email_subscribers_email ON public.email_subscribers USING btree (email)

### email_unsubscribes

RLS: PA | policies: 0

| kolumn | typ | null | default |
|---|---|---|---|
| email | text | NO |  |
| unsubscribed_at | timestamp with time zone | NO | now() |
| ip | text | YES |  |
| user_agent | text | YES |  |
| source_template | text | YES |  |

Index (2):
- `email_unsubscribes_at_idx`: CREATE INDEX email_unsubscribes_at_idx ON public.email_unsubscribes USING btree (unsubscribed_at DESC)
- `email_unsubscribes_pkey`: CREATE UNIQUE INDEX email_unsubscribes_pkey ON public.email_unsubscribes USING btree (email)

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

Index (4):
- `follows_follower_id_following_id_key`: CREATE UNIQUE INDEX follows_follower_id_following_id_key ON public.follows USING btree (follower_id, following_id)
- `follows_follower_idx`: CREATE INDEX follows_follower_idx ON public.follows USING btree (follower_id)
- `follows_following_idx`: CREATE INDEX follows_following_idx ON public.follows USING btree (following_id)
- `follows_pkey`: CREATE UNIQUE INDEX follows_pkey ON public.follows USING btree (id)

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

Index (1):
- `forum_categories_pkey`: CREATE UNIQUE INDEX forum_categories_pkey ON public.forum_categories USING btree (id)

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

Index (2):
- `forum_post_likes_pkey`: CREATE UNIQUE INDEX forum_post_likes_pkey ON public.forum_post_likes USING btree (post_id, user_id)
- `forum_post_likes_post_id_idx`: CREATE INDEX forum_post_likes_post_id_idx ON public.forum_post_likes USING btree (post_id)

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

Index (2):
- `forum_posts_pkey`: CREATE UNIQUE INDEX forum_posts_pkey ON public.forum_posts USING btree (id)
- `forum_posts_thread_id_idx`: CREATE INDEX forum_posts_thread_id_idx ON public.forum_posts USING btree (thread_id, created_at)

### forum_subscriptions

RLS: PA | policies: 1

| kolumn | typ | null | default |
|---|---|---|---|
| user_id | uuid | NO |  |
| thread_id | uuid | NO |  |
| created_at | timestamp with time zone | YES | now() |

- policy **forum_subscriptions_own** (ALL): using `(auth.uid() = user_id)` check `-`

Index (1):
- `forum_subscriptions_pkey`: CREATE UNIQUE INDEX forum_subscriptions_pkey ON public.forum_subscriptions USING btree (user_id, thread_id)

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

Index (11):
- `forum_threads_body_trgm_idx`: CREATE INDEX forum_threads_body_trgm_idx ON public.forum_threads USING gin (body gin_trgm_ops)
- `forum_threads_category_id_idx`: CREATE INDEX forum_threads_category_id_idx ON public.forum_threads USING btree (category_id, created_at DESC)
- `forum_threads_last_reply_at_idx`: CREATE INDEX forum_threads_last_reply_at_idx ON public.forum_threads USING btree (last_reply_at DESC)
- `forum_threads_listing_data_gin`: CREATE INDEX forum_threads_listing_data_gin ON public.forum_threads USING gin (listing_data) WHERE (listing_data IS NOT NULL)
- `forum_threads_loppis_status_idx`: CREATE INDEX forum_threads_loppis_status_idx ON public.forum_threads USING btree (((listing_data ->> 'status'::text))) WHERE ((category_id = 'loppis'::text) AND (listing_data IS NOT NULL))
- `forum_threads_not_spam_last_reply_idx`: CREATE INDEX forum_threads_not_spam_last_reply_idx ON public.forum_threads USING btree (last_reply_at DESC) WHERE (in_spam_queue = false)
- `forum_threads_pkey`: CREATE UNIQUE INDEX forum_threads_pkey ON public.forum_threads USING btree (id)
- `forum_threads_title_trgm_idx`: CREATE INDEX forum_threads_title_trgm_idx ON public.forum_threads USING gin (title gin_trgm_ops)
- `idx_forum_threads_best_post`: CREATE INDEX idx_forum_threads_best_post ON public.forum_threads USING btree (best_post_id)
- `idx_forum_threads_is_solved`: CREATE INDEX idx_forum_threads_is_solved ON public.forum_threads USING btree (is_solved)
- `idx_forum_threads_island_slug`: CREATE INDEX idx_forum_threads_island_slug ON public.forum_threads USING btree (island_slug) WHERE (island_slug IS NOT NULL)

### gps_points

RLS: PA | policies: 4

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
- policy **gps_select_own** (SELECT): using `(auth.uid() = ( SELECT trips.user_id
   FROM trips
  WHERE (trips.id = gps_points.trip_id)))` check `-`

Index (2):
- `gps_points_pkey`: CREATE UNIQUE INDEX gps_points_pkey ON public.gps_points USING btree (id)
- `gps_points_trip_id_idx`: CREATE INDEX gps_points_trip_id_idx ON public.gps_points USING btree (trip_id)

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

Index (5):
- `likes_pkey`: CREATE UNIQUE INDEX likes_pkey ON public.likes USING btree (id)
- `likes_trip_id_idx`: CREATE INDEX likes_trip_id_idx ON public.likes USING btree (trip_id)
- `likes_user_created_idx`: CREATE INDEX likes_user_created_idx ON public.likes USING btree (user_id, created_at DESC)
- `likes_user_id_trip_id_key`: CREATE UNIQUE INDEX likes_user_id_trip_id_key ON public.likes USING btree (user_id, trip_id)
- `likes_user_trip_idx`: CREATE INDEX likes_user_trip_idx ON public.likes USING btree (user_id, trip_id)

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

Index (3):
- `loppis_saves_pkey`: CREATE UNIQUE INDEX loppis_saves_pkey ON public.loppis_saves USING btree (user_id, thread_id)
- `loppis_saves_thread_idx`: CREATE INDEX loppis_saves_thread_idx ON public.loppis_saves USING btree (thread_id)
- `loppis_saves_user_idx`: CREATE INDEX loppis_saves_user_idx ON public.loppis_saves USING btree (user_id, saved_at DESC)

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

Index (2):
- `messages_conv_created_idx`: CREATE INDEX messages_conv_created_idx ON public.messages USING btree (conversation_id, created_at DESC)
- `messages_pkey`: CREATE UNIQUE INDEX messages_pkey ON public.messages USING btree (id)

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

Index (6):
- `idx_notifications_dedup`: CREATE INDEX idx_notifications_dedup ON public.notifications USING btree (user_id, actor_id, type, created_at DESC)
- `idx_notifications_island`: CREATE INDEX idx_notifications_island ON public.notifications USING btree (related_island_slug) WHERE (related_island_slug IS NOT NULL)
- `notifications_created_at_idx`: CREATE INDEX notifications_created_at_idx ON public.notifications USING btree (created_at DESC)
- `notifications_pkey`: CREATE UNIQUE INDEX notifications_pkey ON public.notifications USING btree (id)
- `notifications_user_id_idx`: CREATE INDEX notifications_user_id_idx ON public.notifications USING btree (user_id, created_at DESC)
- `notifications_user_unread_idx`: CREATE INDEX notifications_user_unread_idx ON public.notifications USING btree (user_id, read, created_at DESC)

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

Index (4):
- `idx_partner_inquiries_created`: CREATE INDEX idx_partner_inquiries_created ON public.partner_inquiries USING btree (created_at DESC)
- `idx_partner_inquiries_status`: CREATE INDEX idx_partner_inquiries_status ON public.partner_inquiries USING btree (status)
- `idx_partner_inquiries_stripe_sub`: CREATE INDEX idx_partner_inquiries_stripe_sub ON public.partner_inquiries USING btree (stripe_subscription_id)
- `partner_inquiries_pkey`: CREATE UNIQUE INDEX partner_inquiries_pkey ON public.partner_inquiries USING btree (id)

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

Index (3):
- `place_photos_one_hero_per_place`: CREATE UNIQUE INDEX place_photos_one_hero_per_place ON public.place_photos USING btree (place_id) WHERE (is_hero = true)
- `place_photos_pkey`: CREATE UNIQUE INDEX place_photos_pkey ON public.place_photos USING btree (id)
- `place_photos_place_idx`: CREATE INDEX place_photos_place_idx ON public.place_photos USING btree (place_id, sort_order)

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

Index (3):
- `idx_place_saves_user_created`: CREATE INDEX idx_place_saves_user_created ON public.place_saves USING btree (user_id, created_at DESC)
- `place_saves_pkey`: CREATE UNIQUE INDEX place_saves_pkey ON public.place_saves USING btree (id)
- `uq_place_saves_user_slug`: CREATE UNIQUE INDEX uq_place_saves_user_slug ON public.place_saves USING btree (user_id, place_slug) WHERE (place_slug IS NOT NULL)

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

Index (3):
- `planned_routes_cached_at_idx`: CREATE INDEX planned_routes_cached_at_idx ON public.planned_routes USING btree (cached_at) WHERE (cached_at IS NOT NULL)
- `planned_routes_cached_quality_idx`: CREATE INDEX planned_routes_cached_quality_idx ON public.planned_routes USING btree (cached_quality) WHERE (cached_quality IS NOT NULL)
- `planned_routes_pkey`: CREATE UNIQUE INDEX planned_routes_pkey ON public.planned_routes USING btree (id)

### push_log

RLS: PA | policies: 0

| kolumn | typ | null | default |
|---|---|---|---|
| target_user_id | uuid | NO |  |
| conversation_id | uuid | NO |  |
| last_sent_at | timestamp with time zone | NO | now() |

Index (1):
- `push_log_pkey`: CREATE UNIQUE INDEX push_log_pkey ON public.push_log USING btree (target_user_id, conversation_id)

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

Index (3):
- `push_subscriptions_pkey`: CREATE UNIQUE INDEX push_subscriptions_pkey ON public.push_subscriptions USING btree (id)
- `push_subscriptions_user_id_endpoint_key`: CREATE UNIQUE INDEX push_subscriptions_user_id_endpoint_key ON public.push_subscriptions USING btree (user_id, endpoint)
- `push_subscriptions_user_id_idx`: CREATE INDEX push_subscriptions_user_id_idx ON public.push_subscriptions USING btree (user_id)

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

Index (5):
- `reports_pkey`: CREATE UNIQUE INDEX reports_pkey ON public.reports USING btree (id)
- `reports_reporter_id_target_type_target_id_key`: CREATE UNIQUE INDEX reports_reporter_id_target_type_target_id_key ON public.reports USING btree (reporter_id, target_type, target_id)
- `reports_reporter_idx`: CREATE INDEX reports_reporter_idx ON public.reports USING btree (reporter_id)
- `reports_status_created_idx`: CREATE INDEX reports_status_created_idx ON public.reports USING btree (status, created_at DESC)
- `reports_target_idx`: CREATE INDEX reports_target_idx ON public.reports USING btree (target_type, target_id)

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
| hidden_at | timestamp with time zone | YES |  |
| hidden_reason | text | YES |  |

- policy **Anyone can read restaurants** (SELECT): using `(hidden_at IS NULL)` check `-`
- policy **restaurants_read_all** (SELECT): using `(hidden_at IS NULL)` check `-`

Index (9):
- `restaurants_google_place_id_idx`: CREATE INDEX restaurants_google_place_id_idx ON public.restaurants USING btree (google_place_id) WHERE (google_place_id IS NOT NULL)
- `restaurants_google_place_id_key`: CREATE UNIQUE INDEX restaurants_google_place_id_key ON public.restaurants USING btree (google_place_id)
- `restaurants_hidden_at_idx`: CREATE INDEX restaurants_hidden_at_idx ON public.restaurants USING btree (hidden_at) WHERE (hidden_at IS NULL)
- `restaurants_island_idx`: CREATE INDEX restaurants_island_idx ON public.restaurants USING btree (island)
- `restaurants_name_unique`: CREATE UNIQUE INDEX restaurants_name_unique ON public.restaurants USING btree (name)
- `restaurants_pkey`: CREATE UNIQUE INDEX restaurants_pkey ON public.restaurants USING btree (id)
- `restaurants_slug_idx`: CREATE INDEX restaurants_slug_idx ON public.restaurants USING btree (slug) WHERE (slug IS NOT NULL)
- `restaurants_slug_unique`: CREATE UNIQUE INDEX restaurants_slug_unique ON public.restaurants USING btree (slug)
- `restaurants_verified_at_idx`: CREATE INDEX restaurants_verified_at_idx ON public.restaurants USING btree (verified_at DESC NULLS LAST)

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

Index (1):
- `reviews_pkey`: CREATE UNIQUE INDEX reviews_pkey ON public.reviews USING btree (id)

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

Index (3):
- `route_feedback_created_at_idx`: CREATE INDEX route_feedback_created_at_idx ON public.route_feedback USING btree (created_at DESC)
- `route_feedback_pkey`: CREATE UNIQUE INDEX route_feedback_pkey ON public.route_feedback USING btree (id)
- `route_feedback_unresolved_idx`: CREATE INDEX route_feedback_unresolved_idx ON public.route_feedback USING btree (resolved, created_at DESC) WHERE (resolved = false)

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

Index (3):
- `idx_route_metrics_created`: CREATE INDEX idx_route_metrics_created ON public.route_metrics USING btree (created_at DESC)
- `idx_route_metrics_quality`: CREATE INDEX idx_route_metrics_quality ON public.route_metrics USING btree (quality)
- `route_metrics_pkey`: CREATE UNIQUE INDEX route_metrics_pkey ON public.route_metrics USING btree (id)

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

Index (3):
- `idx_route_reports_created`: CREATE INDEX idx_route_reports_created ON public.route_reports USING btree (created_at DESC)
- `idx_route_reports_status`: CREATE INDEX idx_route_reports_status ON public.route_reports USING btree (status)
- `route_reports_pkey`: CREATE UNIQUE INDEX route_reports_pkey ON public.route_reports USING btree (id)

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

Index (1):
- `routes_pkey`: CREATE UNIQUE INDEX routes_pkey ON public.routes USING btree (id)

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

Index (4):
- `idx_saved_islands_slug`: CREATE INDEX idx_saved_islands_slug ON public.saved_islands USING btree (island_slug)
- `idx_saved_islands_user`: CREATE INDEX idx_saved_islands_user ON public.saved_islands USING btree (user_id)
- `saved_islands_pkey`: CREATE UNIQUE INDEX saved_islands_pkey ON public.saved_islands USING btree (id)
- `saved_islands_user_id_island_slug_key`: CREATE UNIQUE INDEX saved_islands_user_id_island_slug_key ON public.saved_islands USING btree (user_id, island_slug)

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

Index (3):
- `site_feedback_created_at_idx`: CREATE INDEX site_feedback_created_at_idx ON public.site_feedback USING btree (created_at DESC)
- `site_feedback_pkey`: CREATE UNIQUE INDEX site_feedback_pkey ON public.site_feedback USING btree (id)
- `site_feedback_resolved_idx`: CREATE INDEX site_feedback_resolved_idx ON public.site_feedback USING btree (resolved, created_at DESC)

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
- policy **stops_select_own** (SELECT): using `(auth.uid() = ( SELECT trips.user_id
   FROM trips
  WHERE (trips.id = stops.trip_id)))` check `-`
- policy **stops_update_own** (UPDATE): using `(auth.uid() = ( SELECT trips.user_id
   FROM trips
  WHERE (trips.id = stops.trip_id)))` check `(auth.uid() = ( SELECT trips.user_id
   FROM trips
  WHERE (trips.id = stops.trip_id)))`

Index (2):
- `stops_pkey`: CREATE UNIQUE INDEX stops_pkey ON public.stops USING btree (id)
- `stops_trip_id_idx`: CREATE INDEX stops_trip_id_idx ON public.stops USING btree (trip_id)

### tag_follows

RLS: PA | policies: 1

| kolumn | typ | null | default |
|---|---|---|---|
| user_id | uuid | NO |  |
| tag | text | NO |  |
| created_at | timestamp with time zone | NO | now() |

- policy **Users can manage own tag follows** (ALL): using `(auth.uid() = user_id)` check `(auth.uid() = user_id)`

Index (2):
- `idx_tag_follows_tag`: CREATE INDEX idx_tag_follows_tag ON public.tag_follows USING btree (tag)
- `tag_follows_pkey`: CREATE UNIQUE INDEX tag_follows_pkey ON public.tag_follows USING btree (user_id, tag)

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

Index (2):
- `team_activity_created_at_idx`: CREATE INDEX team_activity_created_at_idx ON public.team_activity USING btree (created_at DESC)
- `team_activity_pkey`: CREATE UNIQUE INDEX team_activity_pkey ON public.team_activity USING btree (id)

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

Index (2):
- `team_projects_pkey`: CREATE UNIQUE INDEX team_projects_pkey ON public.team_projects USING btree (id)
- `team_projects_slug_key`: CREATE UNIQUE INDEX team_projects_slug_key ON public.team_projects USING btree (slug)

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

Index (3):
- `team_prompts_pkey`: CREATE UNIQUE INDEX team_prompts_pkey ON public.team_prompts USING btree (id)
- `team_prompts_project_idx`: CREATE INDEX team_prompts_project_idx ON public.team_prompts USING btree (project_id)
- `team_prompts_tags_idx`: CREATE INDEX team_prompts_tags_idx ON public.team_prompts USING gin (tags)

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

Index (4):
- `team_tasks_assignee_idx`: CREATE INDEX team_tasks_assignee_idx ON public.team_tasks USING btree (assignee_id)
- `team_tasks_pkey`: CREATE UNIQUE INDEX team_tasks_pkey ON public.team_tasks USING btree (id)
- `team_tasks_project_idx`: CREATE INDEX team_tasks_project_idx ON public.team_tasks USING btree (project_id)
- `team_tasks_status_idx`: CREATE INDEX team_tasks_status_idx ON public.team_tasks USING btree (status)

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

Index (2):
- `tours_pkey`: CREATE UNIQUE INDEX tours_pkey ON public.tours USING btree (id)
- `tours_slug_key`: CREATE UNIQUE INDEX tours_slug_key ON public.tours USING btree (slug)

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
  WHERE ((t.id = trip_highlights.trip_id) AND (t.user_id = auth.uid())))))`
- policy **trip_highlights_modify_own** (UPDATE): using `(auth.uid() = user_id)` check `-`
- policy **trip_highlights_read_all** (SELECT): using `true` check `-`

Index (4):
- `trip_highlights_one_per_trip_idx`: CREATE UNIQUE INDEX trip_highlights_one_per_trip_idx ON public.trip_highlights USING btree (trip_id)
- `trip_highlights_pkey`: CREATE UNIQUE INDEX trip_highlights_pkey ON public.trip_highlights USING btree (id)
- `trip_highlights_place_slug_idx`: CREATE INDEX trip_highlights_place_slug_idx ON public.trip_highlights USING btree (place_slug, created_at DESC)
- `trip_highlights_user_idx`: CREATE INDEX trip_highlights_user_idx ON public.trip_highlights USING btree (user_id, created_at DESC)

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
  WHERE ((trips.id = trip_tags.trip_id) AND (trips.user_id = auth.uid())))))`
- policy **untag own** (DELETE): using `((auth.uid() = tagged_user_id) OR (auth.uid() = tagged_by_user_id))` check `-`

Index (2):
- `trip_tags_pkey`: CREATE UNIQUE INDEX trip_tags_pkey ON public.trip_tags USING btree (trip_id, tagged_user_id)
- `trip_tags_user_idx`: CREATE INDEX trip_tags_user_idx ON public.trip_tags USING btree (tagged_user_id)

### trips

RLS: PA | policies: 7

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
| visibility | text | NO | 'public'::text |
| status | text | NO | 'done'::text |

- policy **Users can delete own trips** (DELETE): using `(auth.uid() = user_id)` check `-`
- policy **Users can insert own trips** (INSERT): using `-` check `(auth.uid() = user_id)`
- policy **Users can update own trips** (UPDATE): using `(auth.uid() = user_id)` check `-`
- policy **trips_delete_own** (DELETE): using `(auth.uid() = user_id)` check `-`
- policy **trips_insert_own** (INSERT): using `-` check `(auth.uid() = user_id)`
- policy **trips_select_visible** (SELECT): using `(((status = 'done'::text) AND (visibility = 'public'::text)) OR (auth.uid() = user_id))` check `-`
- policy **trips_update_own** (UPDATE): using `(auth.uid() = user_id)` check `-`

Index (6):
- `trips_active_created_idx`: CREATE INDEX trips_active_created_idx ON public.trips USING btree (created_at DESC) WHERE (deleted_at IS NULL)
- `trips_active_user_created_idx`: CREATE INDEX trips_active_user_created_idx ON public.trips USING btree (user_id, created_at DESC) WHERE (deleted_at IS NULL)
- `trips_created_at_idx`: CREATE INDEX trips_created_at_idx ON public.trips USING btree (created_at DESC)
- `trips_deleted_at_idx`: CREATE INDEX trips_deleted_at_idx ON public.trips USING btree (deleted_at) WHERE (deleted_at IS NULL)
- `trips_pkey`: CREATE UNIQUE INDEX trips_pkey ON public.trips USING btree (id)
- `trips_user_created_idx`: CREATE INDEX trips_user_created_idx ON public.trips USING btree (user_id, created_at DESC)

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

Index (2):
- `user_presence_chat_idx`: CREATE INDEX user_presence_chat_idx ON public.user_presence USING btree (current_chat_id)
- `user_presence_pkey`: CREATE UNIQUE INDEX user_presence_pkey ON public.user_presence USING btree (user_id)

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
| public_fields | ARRAY | YES | ARRAY['vessel_name'::text, 'nationality'::text, 'home_port'::text, 'sailing_region'::text] |
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

Index (3):
- `idx_users_onboarded_at`: CREATE INDEX idx_users_onboarded_at ON public.users USING btree (onboarded_at) WHERE (onboarded_at IS NULL)
- `users_pkey`: CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id)
- `users_username_key`: CREATE UNIQUE INDEX users_username_key ON public.users USING btree (username)

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

Index (3):
- `visited_islands_pkey`: CREATE UNIQUE INDEX visited_islands_pkey ON public.visited_islands USING btree (id)
- `visited_islands_user_id_idx`: CREATE INDEX visited_islands_user_id_idx ON public.visited_islands USING btree (user_id)
- `visited_islands_user_id_island_slug_key`: CREATE UNIQUE INDEX visited_islands_user_id_island_slug_key ON public.visited_islands USING btree (user_id, island_slug)
