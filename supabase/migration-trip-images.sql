-- Migration: add multi-photo support to trips
-- Adds a jsonb column `images` (array of URL strings) for additional photos beyond the primary `image`.
-- Safe: adds column with constant default — PostgreSQL handles this as metadata-only change (no table rewrite).
-- STATUS: PENDING — awaiting confirmation from Tom before applying.

ALTER TABLE public.trips
  ADD COLUMN IF NOT EXISTS images jsonb DEFAULT '[]'::jsonb;

-- Index for queries that filter on images array not being empty (optional, useful later)
-- CREATE INDEX IF NOT EXISTS idx_trips_images ON public.trips USING gin(images);
