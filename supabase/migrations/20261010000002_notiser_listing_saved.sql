-- Notiser (2026-10-10): typen listing_saved tillåts, och varje händelse ger
-- högst en notis.
--
-- 1. listing_saved: /api/forum/threads/[id]/save skapar notisen sedan
--    loppis-sparandet byggdes, men typen saknades i notifications_type_check.
--    Varje försök gav fel som sväljdes, så ingen annonsägare har fått notisen.
--    Listan är den befintliga plus listing_saved.
-- 2. Ett partiellt unikt index: samma aktör, mottagare, typ och händelse
--    (reference_id = gillningens/kommentarens/följningens/meddelandets id,
--    turen för taggningar, annonsen för listing_saved, konversationen för
--    dm_accepted) kan bara ge en notis – även vid samtidiga anrop. Gäller
--    bara rader med reference_id; äldre rader (utan) berörs inte.

set lock_timeout = '5s';

alter table public.notifications drop constraint if exists notifications_type_check;
alter table public.notifications add constraint notifications_type_check check (type = any (array[
  'like', 'comment', 'follow', 'tag', 'mention',
  'forum_reply', 'forum_like', 'forum_mention', 'forum_best_answer',
  'message', 'dm_accepted', 'friend_visit', 'listing_saved'
]::text[]));

create unique index if not exists notifications_en_per_handelse
  on public.notifications (user_id, actor_id, type, reference_id)
  where reference_id is not null
    and type in ('like', 'comment', 'mention', 'follow', 'tag', 'message', 'dm_accepted', 'listing_saved');
