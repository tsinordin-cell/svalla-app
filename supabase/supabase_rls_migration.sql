-- ============================================================
-- SVALLA.SE — SUPABASE ROW LEVEL SECURITY MIGRATION
-- Kör detta i Supabase Dashboard → SQL Editor
-- ============================================================

-- ── USERS ────────────────────────────────────────────────────
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Alla inloggade kan läsa alla profiler (feed, follow-listor etc)
CREATE POLICY "users_select_all"
  ON users FOR SELECT
  USING (true);

-- Bara den egna raden kan uppdateras
CREATE POLICY "users_update_own"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Insert sker bara via auth-hook / signup-flödet
CREATE POLICY "users_insert_own"
  ON users FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Ingen delete (stöds ej i appen)
-- DROP POLICY IF EXISTS "users_delete" ON users;


-- ── TRIPS ────────────────────────────────────────────────────
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;

-- Alla kan läsa turer (publik feed)
CREATE POLICY "trips_select_all"
  ON trips FOR SELECT
  USING (true);

-- Bara ägaren kan skapa turer
CREATE POLICY "trips_insert_own"
  ON trips FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Bara ägaren kan uppdatera
CREATE POLICY "trips_update_own"
  ON trips FOR UPDATE
  USING (auth.uid() = user_id);

-- Bara ägaren kan ta bort
CREATE POLICY "trips_delete_own"
  ON trips FOR DELETE
  USING (auth.uid() = user_id);


-- ── GPS_POINTS ────────────────────────────────────────────────
ALTER TABLE gps_points ENABLE ROW LEVEL SECURITY;

-- Bara ägaren kan läsa sina GPS-punkter
CREATE POLICY "gps_points_select_own"
  ON gps_points FOR SELECT
  USING (
    auth.uid() = (SELECT user_id FROM trips WHERE id = trip_id)
  );

CREATE POLICY "gps_points_insert_own"
  ON gps_points FOR INSERT
  WITH CHECK (
    auth.uid() = (SELECT user_id FROM trips WHERE id = trip_id)
  );

CREATE POLICY "gps_points_delete_own"
  ON gps_points FOR DELETE
  USING (
    auth.uid() = (SELECT user_id FROM trips WHERE id = trip_id)
  );


-- ── STOPS ────────────────────────────────────────────────────
ALTER TABLE stops ENABLE ROW LEVEL SECURITY;

CREATE POLICY "stops_select_own"
  ON stops FOR SELECT
  USING (
    auth.uid() = (SELECT user_id FROM trips WHERE id = trip_id)
  );

CREATE POLICY "stops_insert_own"
  ON stops FOR INSERT
  WITH CHECK (
    auth.uid() = (SELECT user_id FROM trips WHERE id = trip_id)
  );

CREATE POLICY "stops_update_own"
  ON stops FOR UPDATE
  USING (
    auth.uid() = (SELECT user_id FROM trips WHERE id = trip_id)
  );


-- ── LIKES ────────────────────────────────────────────────────
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

-- Alla kan se likes (behövs för likes_count i feed)
CREATE POLICY "likes_select_all"
  ON likes FOR SELECT
  USING (true);

CREATE POLICY "likes_insert_own"
  ON likes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "likes_delete_own"
  ON likes FOR DELETE
  USING (auth.uid() = user_id);


-- ── COMMENTS ────────────────────────────────────────────────
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Alla inloggade kan läsa kommentarer
CREATE POLICY "comments_select_all"
  ON comments FOR SELECT
  USING (true);

CREATE POLICY "comments_insert_own"
  ON comments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "comments_delete_own"
  ON comments FOR DELETE
  USING (auth.uid() = user_id);


-- ── FOLLOWS ────────────────────────────────────────────────
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;

-- Alla kan se vem som följer vem (krävs för följarlistor)
CREATE POLICY "follows_select_all"
  ON follows FOR SELECT
  USING (true);

CREATE POLICY "follows_insert_own"
  ON follows FOR INSERT
  WITH CHECK (auth.uid() = follower_id);

CREATE POLICY "follows_delete_own"
  ON follows FOR DELETE
  USING (auth.uid() = follower_id);


-- ── NOTIFICATIONS ───────────────────────────────────────────
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Bara mottagaren kan se sina notiser
CREATE POLICY "notifications_select_own"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);

-- System/triggers skapar notiser via service_role (kringgår RLS)
CREATE POLICY "notifications_insert_service"
  ON notifications FOR INSERT
  WITH CHECK (auth.uid() = user_id OR auth.role() = 'service_role');

CREATE POLICY "notifications_update_own"
  ON notifications FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "notifications_delete_own"
  ON notifications FOR DELETE
  USING (auth.uid() = user_id);


-- ── PUSH_SUBSCRIPTIONS ──────────────────────────────────────
ALTER TABLE push_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "push_subs_select_own"
  ON push_subscriptions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "push_subs_insert_own"
  ON push_subscriptions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "push_subs_update_own"
  ON push_subscriptions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "push_subs_delete_own"
  ON push_subscriptions FOR DELETE
  USING (auth.uid() = user_id);


-- ── VISITED_ISLANDS ─────────────────────────────────────────
ALTER TABLE visited_islands ENABLE ROW LEVEL SECURITY;

CREATE POLICY "visited_select_own"
  ON visited_islands FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "visited_insert_own"
  ON visited_islands FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "visited_upsert_own"
  ON visited_islands FOR UPDATE
  USING (auth.uid() = user_id);


-- ── RESTAURANTS ─────────────────────────────────────────────
-- Publikt läsbar, inga ändringar från klienten
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "restaurants_select_all"
  ON restaurants FOR SELECT
  USING (true);
-- Insert/Update/Delete sker bara via Supabase dashboard (admin)


-- ── TOURS ───────────────────────────────────────────────────
ALTER TABLE tours ENABLE ROW LEVEL SECURITY;

CREATE POLICY "tours_select_all"
  ON tours FOR SELECT
  USING (true);


-- ── ROUTES ──────────────────────────────────────────────────
ALTER TABLE routes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "routes_select_all"
  ON routes FOR SELECT
  USING (true);


-- ── BOOKMARKS ───────────────────────────────────────────────
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "bookmarks_select_own"
  ON bookmarks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "bookmarks_insert_own"
  ON bookmarks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "bookmarks_delete_own"
  ON bookmarks FOR DELETE
  USING (auth.uid() = user_id);


-- ── REVIEWS ─────────────────────────────────────────────────
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "reviews_select_all"
  ON reviews FOR SELECT
  USING (true);

CREATE POLICY "reviews_insert_own"
  ON reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "reviews_update_own"
  ON reviews FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "reviews_delete_own"
  ON reviews FOR DELETE
  USING (auth.uid() = user_id);


-- ── TRIP_TAGS ────────────────────────────────────────────────
ALTER TABLE trip_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "trip_tags_select_all"
  ON trip_tags FOR SELECT
  USING (true);

CREATE POLICY "trip_tags_insert_own"
  ON trip_tags FOR INSERT
  WITH CHECK (
    auth.uid() = (SELECT user_id FROM trips WHERE id = trip_id)
  );

CREATE POLICY "trip_tags_delete_own"
  ON trip_tags FOR DELETE
  USING (
    auth.uid() = (SELECT user_id FROM trips WHERE id = trip_id)
  );


-- ============================================================
-- VERIFIERING — kör detta efteråt för att kontrollera att
-- alla tabeller har RLS aktiverat:
-- ============================================================
-- SELECT tablename, rowsecurity
-- FROM pg_tables
-- WHERE schemaname = 'public'
-- ORDER BY tablename;
