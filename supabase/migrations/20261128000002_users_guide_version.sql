-- Vilken version av onboardingen kontot har sett (Toms beslut 2026-11-28:
-- "alla tidigare konton får upp denna onboarding ... då dem inte sett den än").
--
-- Tillägg. onboarded_at lämnas orörd (när kontot gick igenom någon guide
-- första gången), så ingen befintlig data ändras eller går förlorad.
-- Guiden visas när guide_version är null eller lägre än GUIDE_VERSION
-- i src/lib/guidenForst.ts (2 = guiden från 2026-11-28).
--
-- Rättigheter: authenticated får läsa kolumnen (samma som onboarded_at; kolumnrätter
-- kan inte begränsas per rad, och raden skyddas av RLS). Skrivning sker med
-- den befintliga tabellrätten UPDATE under RLS (bara egen rad). anon får ingen läsrätt.
--
-- Återställning: alter table public.users drop column guide_version;

alter table public.users add column if not exists guide_version smallint;

grant select (guide_version) on public.users to authenticated;

comment on column public.users.guide_version is
  'Senaste onboardingversion kontot har gått igenom eller hoppat över. Null = ingen sedan 2026-11-28. Se src/lib/guidenForst.ts.';
