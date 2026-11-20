-- Integritet steg 1a (2026-11-20, godkänt av Tom: "Gör det som är bäst för användarna och Svalla").
-- TILLÄGG: ändrar inga befintliga rättigheter.
--
-- users_publik: profiler som andra får se. Varje valbart fält lämnas bara ut om
-- användaren valt att visa det (public_fields). Ingen hemmahamn-koordinat, ingen
-- e-post, ingen is_admin. Vyn ägs av postgres och läser users oavsett
-- kolumnrättigheter; filtreringen sker här, i vyn, inte i appen.
--
-- min_profil(): den inloggades egen rad, för /profil, onboarding och redigering.
--
-- Steg 1c (20261120000002) tar sedan bort läsrätten till de valbara kolumnerna
-- direkt i users för anon och authenticated.

create or replace view public.users_publik
with (security_barrier = true) as
select
  u.id,
  u.username,
  u.avatar,
  u.created_at,
  u.public_fields,
  case when 'bio'              = any(u.public_fields) then u.bio              end as bio,
  case when 'website'          = any(u.public_fields) then u.website          end as website,
  case when 'nationality'      = any(u.public_fields) then u.nationality      end as nationality,
  case when 'experience_years' = any(u.public_fields) then u.experience_years end as experience_years,
  case when 'vessel_type'      = any(u.public_fields) then u.vessel_type      end as vessel_type,
  case when 'vessel_model'     = any(u.public_fields) then u.vessel_model     end as vessel_model,
  case when 'vessel_name'      = any(u.public_fields) then u.vessel_name      end as vessel_name,
  case when 'home_port'        = any(u.public_fields) then u.home_port        end as home_port,
  case when 'sailing_region'   = any(u.public_fields) then u.sailing_region   end as sailing_region
from public.users u;

comment on view public.users_publik is
  'Publika profiler: valbara fält bara om de finns i public_fields. Integritet 2026-11-20.';

grant select on public.users_publik to anon, authenticated;

create or replace function public.min_profil()
returns table (
  id uuid, username text, avatar text, bio text, website text, nationality text,
  experience_years integer, vessel_type text, vessel_model text, vessel_name text,
  home_port text, sailing_region text, public_fields text[], created_at timestamptz,
  onboarded_at timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
  select u.id, u.username, u.avatar, u.bio, u.website, u.nationality, u.experience_years,
         u.vessel_type, u.vessel_model, u.vessel_name, u.home_port, u.sailing_region,
         u.public_fields, u.created_at, u.onboarded_at
  from public.users u
  where u.id = auth.uid()
$$;

revoke execute on function public.min_profil() from public, anon;
grant execute on function public.min_profil() to authenticated;
