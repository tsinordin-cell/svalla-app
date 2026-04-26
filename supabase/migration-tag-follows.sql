-- Migration: tag_follows — användare kan följa hashtags
-- Ny tabell, påverkar inga existerande rader. Körs direkt.

CREATE TABLE IF NOT EXISTS public.tag_follows (
  user_id    uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tag        text NOT NULL CHECK (length(tag) >= 1 AND length(tag) <= 100),
  created_at timestamptz DEFAULT now() NOT NULL,
  PRIMARY KEY (user_id, tag)
);

ALTER TABLE public.tag_follows ENABLE ROW LEVEL SECURITY;

-- Användare kan bara se och hantera sina egna tagg-följningar
CREATE POLICY "Users can manage own tag follows"
  ON public.tag_follows FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Index för att snabbt räkna hur många följer en viss tagg
CREATE INDEX IF NOT EXISTS idx_tag_follows_tag ON public.tag_follows (tag);
