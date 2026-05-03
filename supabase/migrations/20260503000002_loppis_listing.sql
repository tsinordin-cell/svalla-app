-- Loppis annons-format
-- Strukturerad data för forum-trådar i kategorin 'loppis' så de kan
-- renderas som riktiga marknadsplats-annonser à la Blocket istället för
-- vanliga forum-inlägg.
--
-- Schema (JSONB):
-- {
--   "price": 150000,
--   "currency": "SEK",
--   "condition": "Mycket bra",
--   "category": "Båt",                 -- Båt | Motor | Tillbehör | Säkerhet | Övrigt
--   "images": ["https://.../1.jpg", ...],
--   "specs": [{ "label": "Modell", "value": "Comfort 32" }, ...],
--   "location": "Halmstad",
--   "external_link": "https://blocket.se/...",
--   "status": "aktiv"                  -- aktiv | reserverad | sald
-- }

alter table public.forum_threads
  add column if not exists listing_data jsonb;

-- Bara index på rader där listing_data finns (sparar plats för
-- icke-Loppis-trådar). Använder GIN för flexibel JSON-sökning på t.ex.
-- pris-intervall, kategori, status.
create index if not exists forum_threads_listing_data_gin
  on public.forum_threads using gin (listing_data)
  where listing_data is not null;

-- Snabb filter-index för "visa bara aktiva annonser i Loppis"
create index if not exists forum_threads_loppis_status_idx
  on public.forum_threads ((listing_data ->> 'status'))
  where category_id = 'loppis' and listing_data is not null;

comment on column public.forum_threads.listing_data is
  'Strukturerad annons-data för Loppis-kategorin. Null för vanliga forum-trådar. Schema dokumenterat i migration 20260503000002.';
