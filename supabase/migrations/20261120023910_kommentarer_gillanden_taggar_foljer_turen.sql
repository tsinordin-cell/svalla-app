-- 2026-11-19 (kördes 21:39 ET, version 20261120023910 i databasen).
-- Ångra: villkoren före var true för likes, trip_tags och trip_highlights,
-- och (not ar_blockerad(auth.uid(), user_id)) för comments.
--
-- Kommentarer, gillanden, taggar och höjdpunkter ska följa turens synlighet.
-- Före: alla fyra gick att läsa för alla, även när turen var privat eller raderad.
-- Delfrågan mot trips körs med läsarens egna rättigheter, så "finns turen för
-- läsaren" betyder exakt "läsaren får se turen" (publik och klar, eller egen).
alter policy "Anyone can read comments" on public.comments
  using (
    (not ar_blockerad(auth.uid(), user_id))
    and exists (select 1 from public.trips t where t.id = comments.trip_id)
  );

alter policy "Anyone can read likes" on public.likes
  using (exists (select 1 from public.trips t where t.id = likes.trip_id));

alter policy "Anyone can read trip_tags" on public.trip_tags
  using (
    auth.uid() = tagged_user_id
    or auth.uid() = tagged_by_user_id
    or exists (select 1 from public.trips t where t.id = trip_tags.trip_id)
  );

alter policy trip_highlights_read_all on public.trip_highlights
  using (
    auth.uid() = user_id
    or exists (select 1 from public.trips t where t.id = trip_highlights.trip_id)
  );
