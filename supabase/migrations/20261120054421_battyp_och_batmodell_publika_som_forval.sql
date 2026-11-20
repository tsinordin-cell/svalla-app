-- 2026-11-20 (kördes 00:44 ET, version 20261120054421 i databasen).
-- Beslut av Tom: båttyp och båtmodell ska visas för andra.
--
-- Före: förvalet för public_fields var båtnamn, land, hemmahamn och
-- hemmafarvatten. Inget av de 132 kontona hade båttyp eller båtmodell påslaget,
-- men profilsidan och sök visade dem ändå. När visningen började följa valet
-- hade de försvunnit för alla.
--
-- Efter: båttyp och båtmodell ingår i förvalet för nya konton och läggs till
-- för befintliga. Var och en kan slå av dem under "Vad andra får se".
--
-- Ångra (inget konto hade nycklarna före, så detta återställer exakt):
--   update public.users set public_fields = array_remove(array_remove(public_fields, 'vessel_type'), 'vessel_model');
--   alter table public.users alter column public_fields set default array['vessel_name','nationality','home_port','sailing_region']::text[];

alter table public.users
  alter column public_fields
  set default array['vessel_name','nationality','home_port','sailing_region','vessel_type','vessel_model']::text[];

update public.users
   set public_fields = coalesce(public_fields, array[]::text[])
       || case when 'vessel_type'  = any (coalesce(public_fields, array[]::text[])) then array[]::text[] else array['vessel_type']  end
       || case when 'vessel_model' = any (coalesce(public_fields, array[]::text[])) then array[]::text[] else array['vessel_model'] end
 where not ('vessel_type' = any (coalesce(public_fields, array[]::text[])))
    or not ('vessel_model' = any (coalesce(public_fields, array[]::text[])));
