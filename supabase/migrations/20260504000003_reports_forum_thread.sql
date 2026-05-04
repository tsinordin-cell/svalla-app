-- Utöka reports.target_type så den även täcker forum-trådar (Loppis-annonser).
alter table public.reports drop constraint if exists reports_target_type_check;
alter table public.reports add constraint reports_target_type_check
  check (target_type in (
    'trip','comment','user','message','review','story','checkin','forum_thread'
  ));
