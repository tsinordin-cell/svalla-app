-- Fix: circular RLS dependency in conversation_participants SELECT policy
-- The old policy called is_conv_member() which queries conversation_participants,
-- creating infinite recursion and "stack depth limit exceeded" errors.
--
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New query)
-- STATUS: APPLIED via Management API 2026-04-21

-- 1. Drop the old recursive SELECT policies
DROP POLICY IF EXISTS "read participants" ON public.conversation_participants;
DROP POLICY IF EXISTS "read participants of own convs" ON public.conversation_participants;

-- 2. New SELECT policy: see your own rows + all participants in conversations you're in
--    is_conv_member(conv, uid) only queries WHERE user_id = uid → hits "user_id = auth.uid()"
--    branch (short-circuit) → no infinite recursion
CREATE POLICY "read participants of own convs" ON public.conversation_participants
  FOR SELECT USING (
    user_id = auth.uid()
    OR is_conv_member(conversation_id, auth.uid())
  );

-- 3. Fix INSERT policy: allow conversation creator to add other participants
DROP POLICY IF EXISTS "join conversation" ON public.conversation_participants;
CREATE POLICY "join conversation" ON public.conversation_participants
  FOR INSERT WITH CHECK (
    auth.uid() = user_id  -- user can always add themselves
    OR EXISTS (           -- conversation creator can add anyone
      SELECT 1 FROM public.conversations
      WHERE id = conversation_id AND created_by = auth.uid()
    )
  );
