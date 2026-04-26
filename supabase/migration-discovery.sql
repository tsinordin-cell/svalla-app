create or replace function public.gps_heat(
  min_lat float,
  min_lng float,
  max_lat float,
  max_lng float,
  zoom    int default 10
)
returns table(cell_lat float, cell_lng float, weight float)
language sql stable security definer set search_path = public
as $$
  with params as (
    select case
      when zoom >= 13 then 0.005
      when zoom >= 11 then 0.02
      when zoom >= 9  then 0.05
      else                 0.1
    end as cell_size
  ),
  raw as (
    select
      floor(g.latitude  / (select cell_size from params)) * (select cell_size from params) as clat,
      floor(g.longitude / (select cell_size from params)) * (select cell_size from params) as clng,
      count(*)::float as cnt
    from public.gps_points g
    join public.trips t on t.id = g.trip_id
    where
      g.latitude  between min_lat and max_lat
      and g.longitude between min_lng and max_lng
      and t.created_at >= now() - interval '90 days'
    group by clat, clng
  ),
  mx as (select greatest(max(cnt), 1) as m from raw)
  select
    r.clat as cell_lat,
    r.clng as cell_lng,
    round((r.cnt / mx.m)::numeric, 4)::float as weight
  from raw r, mx
  order by weight desc
  limit 2000;
$$;

create index if not exists gps_points_lat_lng_idx
  on public.gps_points (latitude, longitude);

create index if not exists trips_created_at_idx
  on public.trips (created_at);
