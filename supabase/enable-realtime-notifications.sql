-- Aktivera Realtime på notifications-tabellen
-- Kör i Supabase SQL Editor

ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;

-- Verifiera
SELECT schemaname, tablename
FROM pg_publication_tables
WHERE pubname = 'supabase_realtime'
  AND tablename = 'notifications';
