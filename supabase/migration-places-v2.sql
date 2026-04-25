-- ============================================================
-- SVALLA — Migration: Places v2
-- Lägger till nya kolumner för rikare platsdata
-- Kör i Supabase SQL Editor innan seed-places-v2.sql
-- ============================================================

ALTER TABLE restaurants
  ADD COLUMN IF NOT EXISTS island             text,
  ADD COLUMN IF NOT EXISTS image_url          text,
  ADD COLUMN IF NOT EXISTS type               text DEFAULT 'restaurant',
  ADD COLUMN IF NOT EXISTS slug               text,
  ADD COLUMN IF NOT EXISTS archipelago_region text,
  ADD COLUMN IF NOT EXISTS categories         text[]  DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS best_for           text[]  DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS facilities         text[]  DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS seasonality        text    DEFAULT 'seasonal_unknown',
  ADD COLUMN IF NOT EXISTS source_confidence  text    DEFAULT 'medium';

-- Unik index på name
CREATE UNIQUE INDEX IF NOT EXISTS restaurants_name_unique ON restaurants (name);

-- Backfill befintliga
UPDATE restaurants SET type = 'restaurant' WHERE type IS NULL;
UPDATE restaurants SET seasonality = 'summer_only' WHERE seasonality IS NULL OR seasonality = 'seasonal_unknown';
UPDATE restaurants SET archipelago_region = 'inner'  WHERE island IN ('Fjäderholmarna');
UPDATE restaurants SET archipelago_region = 'middle' WHERE island IN ('Vaxholm','Grinda','Finnhamn','Möja','Nämdö');
UPDATE restaurants SET archipelago_region = 'outer'  WHERE island IN ('Sandhamn');
UPDATE restaurants SET archipelago_region = 'south'  WHERE island IN ('Utö','Nåttarö','Dalarö');
