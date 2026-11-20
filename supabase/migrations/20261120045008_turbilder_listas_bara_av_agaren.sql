-- 2026-11-19 (kördes 23:50 ET, version 20261120045008 i databasen).
--
-- Turbilder: ingen ska kunna lista hinkens innehåll.
--
-- Före: regeln "Public can view trips" lät vem som helst, även utloggad, lista
-- alla filer i hinken trips och därmed hitta bilder från privata turer.
--
-- Efter: bara den inloggade ägaren kan lista och läsa sina egna filer genom
-- lagringens API. Hinken är fortfarande publik, så bilder visas som förut för
-- den som har bildens adress. Uppladdning, byte och borttagning av egna bilder
-- är oförändrade (de reglerna rörs inte).
--
-- Kvar efter detta: en bild från en privat tur går att öppna för den som redan
-- känner till den exakta adressen. Det kräver en privat hink med signerade
-- länkar och är en större ombyggnad.
--
-- Inga borttagningar i den här filen. Ångra: se slutet av filen.

alter policy "Public can view trips" on storage.objects
  to authenticated
  using (
    bucket_id = 'trips'
    and (owner = auth.uid() or owner_id = (auth.uid())::text)
  );

-- ÅNGRA (körs bara om ändringen ska backas):
--   alter policy "Public can view trips" on storage.objects to public using (bucket_id = 'trips');
