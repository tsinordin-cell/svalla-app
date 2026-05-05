-- Affiliate click-tracking
--
-- Vi loggar varje affiliate-klick själva (utöver nätverkets dashboard) av två skäl:
--   1. Egen data — vi vet vilka sidor/komponenter som driver konvertering, även
--      om Adtraction/Awin laggar med rapportering eller stänger.
--   2. Anti-fraud — vi kan upptäcka uppenbar bot-trafik (samma IP-hash spammar
--      samma länk) innan vi rapporterar siffror externt.
--
-- Vi sparar INTE råa IP-adresser. Vi sparar en HMAC-hash så vi kan räkna unika
-- klickare per dag utan att lagra PII. Hashen roteras dagligen via salt-rotation.

create table if not exists affiliate_clicks (
  id           uuid          primary key default gen_random_uuid(),
  user_id      uuid          references auth.users(id) on delete set null,
  network      text          not null,                -- 'adtraction', 'awin', 'direct'
  program_id   text          not null,                -- t.ex. 'batagent', 'booking', 'webhallen'
  link_id      text          not null,                -- vår interna identifierare per länk-placering
  placement    text          not null,                -- 'tur_gear', 'plats_book', 'guide_recommend'
  source_url   text,                                  -- vilken sida klicket kom från
  destination  text          not null,                -- final-URL (med UTM)
  ip_hash      text,                                  -- daglig HMAC, ej råaddress
  user_agent   text,
  clicked_at   timestamptz   not null default now()
);

create index if not exists affiliate_clicks_program_idx on affiliate_clicks (program_id, clicked_at desc);
create index if not exists affiliate_clicks_placement_idx on affiliate_clicks (placement, clicked_at desc);
create index if not exists affiliate_clicks_user_idx on affiliate_clicks (user_id, clicked_at desc) where user_id is not null;

-- RLS: bara service-role kan skriva, ingen kan läsa rådata förutom admin
alter table affiliate_clicks enable row level security;

-- Service-role bypass:ar RLS automatiskt — vi behöver ingen INSERT-policy.
-- Admin-läsning sker via service-role i API-route, ingen direkt klient-åtkomst.
-- Ingen public SELECT/UPDATE/DELETE-policy = totallås för anon + authenticated.

comment on table affiliate_clicks is 'Egen click-tracking för affiliate-länkar. Service-role-only access. IP är HMAC-hashad, aldrig rå.';
