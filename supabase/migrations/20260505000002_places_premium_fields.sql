-- Premium-fält på places (restaurants).
-- Här lagrar vi data som hämtas från Google Places + manuellt admin-input.
--
-- Workflow:
--   1. Google Places Find/Details fyller i google_place_id, phone, website,
--      formatted_address, google_rating, google_user_ratings_total, photo_refs.
--   2. Backfill-scriptet uppdaterar latitude/longitude med verifierade värden
--      om de skiljer >50m från befintliga (men flaggar för admin-review).
--   3. Admin kan manuellt redigera menu_url, instagram, facebook, opening_hours
--      via /admin/platser/[id]/redigera.
--
-- INGEN data raderas — vi lagrar både ursprunglig data + Google-berikad.

-- ── Identifiers + verifiering ────────────────────────────────────────────
alter table public.restaurants add column if not exists google_place_id    text unique;
alter table public.restaurants add column if not exists place_data_source  text default 'manual'; -- 'manual', 'osm', 'google', 'mixed'
alter table public.restaurants add column if not exists verified_at        timestamptz;
alter table public.restaurants add column if not exists verified_by        uuid references auth.users(id) on delete set null;

-- ── Kontakt ──────────────────────────────────────────────────────────────
alter table public.restaurants add column if not exists phone              text;
alter table public.restaurants add column if not exists email              text;
alter table public.restaurants add column if not exists website            text;
alter table public.restaurants add column if not exists menu_url           text; -- separat från website om de har dedikerad meny-sida
alter table public.restaurants add column if not exists instagram          text; -- t.ex. "rogrundsjokrog" (inte full URL — vi bygger https://instagram.com/{handle})
alter table public.restaurants add column if not exists facebook           text;

-- ── Adress ───────────────────────────────────────────────────────────────
alter table public.restaurants add column if not exists formatted_address  text;
alter table public.restaurants add column if not exists postal_code        text;
alter table public.restaurants add column if not exists city               text;

-- ── Öppettider (strukturerade) ───────────────────────────────────────────
-- JSONB-format: { "monday": [{ "open": "11:00", "close": "22:00" }], ... }
-- Vi behåller kvar opening_hours (text) för bakåtkompatibilitet.
alter table public.restaurants add column if not exists opening_hours_json jsonb;

-- ── Ratings från Google (vi lagrar snapshot, refreshar månadsvis) ────────
alter table public.restaurants add column if not exists google_rating          numeric(2,1); -- 0.0 - 5.0
alter table public.restaurants add column if not exists google_ratings_total   integer;
alter table public.restaurants add column if not exists google_rating_updated  timestamptz;

-- ── Foton från Google (photo references — vi cachar URLs senare) ─────────
-- Format: array av objekt med { reference: "AbcDef...", attribution: "..." }
-- Photo references roterar — bör cache:as som binär i Supabase Storage istället.
alter table public.restaurants add column if not exists google_photo_refs jsonb;

-- ── Index ────────────────────────────────────────────────────────────────
create index if not exists restaurants_google_place_id_idx on public.restaurants (google_place_id) where google_place_id is not null;
create index if not exists restaurants_verified_at_idx on public.restaurants (verified_at desc nulls last);

-- ── place_photos: dedikerad tabell för bild-galleri ──────────────────────
-- Anledning: vi vill ha en ordnad lista med bilder per plats där varje bild
-- har en source (google/upload/scraped), credit, blurhash för loading-state,
-- och kan ordnas (sort_order). Att stoppa allt i restaurants.images-array gör
-- detta omöjligt.
create table if not exists public.place_photos (
  id              uuid          primary key default gen_random_uuid(),
  place_id        uuid          not null references public.restaurants(id) on delete cascade,
  url             text          not null,                       -- offentlig URL till Supabase Storage eller extern CDN
  source          text          not null default 'upload',      -- 'upload', 'google', 'osm', 'admin'
  source_ref      text,                                         -- google photo reference om source='google'
  credit          text,                                         -- t.ex. "Foto: Anders Wahlström / Google"
  blurhash        text,                                         -- för LQIP loading-state
  width           integer,
  height          integer,
  sort_order      integer       not null default 0,
  is_hero         boolean       not null default false,
  created_at      timestamptz   not null default now(),
  uploaded_by     uuid          references auth.users(id) on delete set null
);

create index if not exists place_photos_place_idx on public.place_photos (place_id, sort_order);
create unique index if not exists place_photos_one_hero_per_place
  on public.place_photos (place_id) where is_hero = true;

alter table public.place_photos enable row level security;
create policy "Anyone can read place_photos" on public.place_photos for select using (true);
-- Admin-bara skriv-policys läggs till separat när admin-system är klart.

comment on table public.place_photos is 'Galleri av bilder per plats. En är hero (visas som cover på plats-sidan). Övriga är carousel/galleri.';
comment on column public.restaurants.google_place_id is 'Persistent Google Place ID. Används för att refetcha data utan att tappa länken om plats byter namn/adress.';
comment on column public.restaurants.place_data_source is 'Var huvuddatan kommer ifrån: manual=admin matade in, osm=OpenStreetMap, google=Google Places, mixed=kombo.';
