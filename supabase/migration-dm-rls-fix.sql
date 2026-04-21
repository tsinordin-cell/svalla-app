-- Fix: tillåt konversationsskaparen att lägga till andra deltagare
-- Kör detta i Supabase SQL Editor (Dashboard → SQL Editor → New query)

DROP POLICY IF EXISTS "join conversation" ON public.conversation_participants;

CREATE POLICY "join conversation" ON public.conversation_participants
  FOR INSERT WITH CHECK (
    auth.uid() = user_id  -- användaren kan alltid lägga till sig själv
    OR EXISTS (            -- skaparen kan lägga till motparten
      SELECT 1 FROM public.conversations
      WHERE id = conversation_id AND created_by = auth.uid()
    )
  );
