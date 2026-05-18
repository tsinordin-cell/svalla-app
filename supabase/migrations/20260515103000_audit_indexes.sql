-- Audit-fynd 2026-05-15: saknade index på ofta queryade kolumner.
-- Påverkar feed-RPC, region-listningar och profil-sidan.

CREATE INDEX IF NOT EXISTS restaurants_island_idx ON restaurants(island);
CREATE INDEX IF NOT EXISTS follows_following_idx ON follows(following_id);
CREATE INDEX IF NOT EXISTS trips_deleted_at_idx ON trips(deleted_at) WHERE deleted_at IS NULL;
