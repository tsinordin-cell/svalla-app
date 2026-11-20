-- 2026-11-20. Tillägg, ändrar inga befintliga behörigheter.
--
-- Två funktioner som koden börjar använda INNAN läsrätten stramas åt i nästa
-- migration (20261120210000). Båda fungerar likadant före och efter.
--
-- planerad_rutt(id): en planerad rutt åt gången, för den som har länken.
--   Lämnar inte ut ägarens id, bara om rutten är frågarens egen och om den har
--   en ägare. Ger publicerade rutter, och ägarens egna oavsett status.
-- profiltal(user): antal följare, antal följda och antal märken för en
--   profil. Den publika profilen visar siffrorna; listorna bakom kräver
--   inloggning efter nästa migration.
--
-- Återställning: drop function public.planerad_rutt(uuid); drop function public.profiltal(uuid);

create or replace function public.planerad_rutt(p_id uuid)
returns table (
  id uuid,
  start_name text,
  end_name text,
  start_lat double precision,
  start_lng double precision,
  end_lat double precision,
  end_lng double precision,
  interests text[],
  suggested_stops jsonb,
  status text,
  created_at timestamptz,
  trip_id uuid,
  cached_path jsonb,
  ar_min boolean,
  har_agare boolean
)
language sql
stable
security definer
set search_path = ''
as $$
  select r.id, r.start_name, r.end_name, r.start_lat, r.start_lng, r.end_lat, r.end_lng,
         r.interests, r.suggested_stops, r.status, r.created_at, r.trip_id, r.cached_path,
         (auth.uid() is not null and r.user_id = auth.uid()) as ar_min,
         (r.user_id is not null) as har_agare
  from public.planned_routes r
  where r.id = p_id
    and (r.status = 'published' or r.user_id = auth.uid())
$$;

revoke all on function public.planerad_rutt(uuid) from public;
grant execute on function public.planerad_rutt(uuid) to anon, authenticated;

create or replace function public.profiltal(p_user uuid)
returns table (foljare bigint, foljer bigint, marken bigint)
language sql
stable
security definer
set search_path = ''
as $$
  select
    (select count(*) from public.follows f where f.following_id = p_user),
    (select count(*) from public.follows f where f.follower_id = p_user),
    (select count(*) from public.achievement_events a where a.user_id = p_user)
$$;

revoke all on function public.profiltal(uuid) from public;
grant execute on function public.profiltal(uuid) to anon, authenticated;
