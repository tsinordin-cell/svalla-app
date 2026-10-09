-- ============================================================================
-- RESTER EFTER REVISIONEN – databasdelen. För Tom att köra i Supabase SQL Editor.
-- Upprättad 2026-10-07 av Claude. Kontrollerad med SELECT mot produktionen
-- samma dag (varje ändring nedan visades först som "så här blir det").
--
-- SÅ HÄR GÖR DU (3 körningar, ca 2 minuter):
--   1. Supabase → SQL Editor → New query.
--   2. Klistra in BLOCK 1 (allt mellan "BLOCK 1 BÖRJAR" och "BLOCK 1 SLUTAR"),
--      tryck Run. Svaret längst ned ska visa fyra rader med "OK".
--   3. Töm rutan, klistra in ENBART raden under BLOCK 2, tryck Run.
--   4. Töm rutan, klistra in ENBART raden under BLOCK 3, tryck Run.
--      (Block 2 och 3 måste köras var för sig: "concurrently" tillåts inte
--      tillsammans med andra satser. Det är därför de inte ligger i block 1.)
--   5. Skriv "körd" till Claude, som kontrollerar resultatet.
--
-- Vad som ändras:
--   A. Platsen Klädesholmen gästhamn får huvudbild (första av sina två egna
--      foton). Enda platsen i databasen med foton men utan huvudbild.
--   B. Sex seed-rutter i tabellen routes (Göteborg→Marstrand … Malmö→Ven) får
--      rätt tecken: "KosterÃ¶arna" → "Kosteröarna", "SvÃ¥r" → "Svår" osv. Felet
--      finns i beskrivning, svårighetsgrad, båttyper och vägpunkters namn.
--      Rutterna visas i dag bara via ett oanvänt API, så ingen sida ändras.
--   C. Tillägget pg_trgm flyttas från schemat public till extensions (Supabase
--      rekommenderar det; forumsökningens index fortsätter fungera).
--   D. Två dubblettindex på restaurants tas bort (de unika indexen på samma
--      kolumner finns kvar och gör samma jobb). 48 + 56 kB.
--
-- Allt är idempotent: körs blocket två gånger händer inget andra gången.
-- Inga rader tas bort. Inga policyer ändras.
-- ============================================================================


-- ============================ BLOCK 1 BÖRJAR ================================

-- A. Klädesholmen gästhamn: huvudbild = första egna fotot.
update public.restaurants
set image_url = 'https://oiklttwylndesewauytj.supabase.co/storage/v1/object/public/images/places/4f101fc1-af0b-4594-b719-9948fdbfe3bf/0.jpg'
where id = '4f101fc1-af0b-4594-b719-9948fdbfe3bf'
  and slug = 'kladesholmen-gasthamn'
  and image_url is null;

-- B. Rutter med trasig teckenkodning (UTF-8 läst som Latin-1). Bara värden
--    som innehåller "Ã" rörs; redan korrekta värden lämnas som de är.
update public.routes r
set
  description = case when r.description ~ 'Ã'
                     then convert_from(convert_to(r.description, 'LATIN1'), 'UTF8')
                     else r.description end,
  difficulty  = case when r.difficulty ~ 'Ã'
                     then convert_from(convert_to(r.difficulty, 'LATIN1'), 'UTF8')
                     else r.difficulty end,
  boat_types  = (select array_agg(case when b ~ 'Ã'
                                       then convert_from(convert_to(b, 'LATIN1'), 'UTF8')
                                       else b end order by ord)
                 from unnest(r.boat_types) with ordinality as t(b, ord)),
  waypoints   = case when jsonb_typeof(r.waypoints) = 'array'
                     then (select jsonb_agg(case when (w->>'name') ~ 'Ã'
                                                 then w || jsonb_build_object('name', convert_from(convert_to(w->>'name', 'LATIN1'), 'UTF8'))
                                                 else w end order by ord)
                           from jsonb_array_elements(r.waypoints) with ordinality as t(w, ord))
                     else r.waypoints end
where r.id::text like 'b2000000-%'
  and to_jsonb(r)::text ~ 'Ã';

-- C. pg_trgm till schemat extensions.
do $$
begin
  if exists (select 1 from pg_extension e join pg_namespace n on n.oid = e.extnamespace
             where e.extname = 'pg_trgm' and n.nspname = 'public') then
    alter extension pg_trgm set schema extensions;
  end if;
end $$;

-- Kontroll: fyra rader, alla ska säga OK.
select 'A Klädesholmen har huvudbild' as kontroll,
       case when image_url is not null then 'OK' else 'FEL' end as resultat
from public.restaurants where id = '4f101fc1-af0b-4594-b719-9948fdbfe3bf'
union all
select 'B inga trasiga tecken kvar i routes',
       case when count(*) = 0 then 'OK' else 'FEL: ' || count(*) || ' rader' end
from public.routes where to_jsonb(routes)::text ~ 'Ã'
union all
select 'B Kosterfjorden-ringen läsbar',
       case when description like 'Komplett rundtur kring Kosteröarna och Strömstad%' then 'OK' else 'FEL' end
from public.routes where id = 'b2000000-0000-0000-0000-000000000004'
union all
select 'C pg_trgm i schemat extensions',
       case when n.nspname = 'extensions' then 'OK' else 'FEL: ' || n.nspname end
from pg_extension e join pg_namespace n on n.oid = e.extnamespace where e.extname = 'pg_trgm';

-- ============================ BLOCK 1 SLUTAR ================================


-- ====================== BLOCK 2 (kör denna rad ensam) =======================
drop index concurrently if exists public.restaurants_google_place_id_idx;


-- ====================== BLOCK 3 (kör denna rad ensam) =======================
drop index concurrently if exists public.restaurants_slug_idx;
