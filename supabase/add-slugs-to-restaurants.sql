-- Generera slugs för platser som saknar dem
-- Kör i Supabase SQL Editor (kräver admin-access)

DO $$
DECLARE
  rec RECORD;
  base_slug TEXT;
  final_slug TEXT;
  counter INT;
BEGIN
  FOR rec IN SELECT id, name FROM restaurants WHERE slug IS NULL ORDER BY created_at LOOP
    base_slug := lower(rec.name);
    -- Svenska tecken
    base_slug := regexp_replace(base_slug, '[åÅ]', 'a', 'g');
    base_slug := regexp_replace(base_slug, '[äÄ]', 'a', 'g');
    base_slug := regexp_replace(base_slug, '[öÖ]', 'o', 'g');
    base_slug := regexp_replace(base_slug, '[éèêëÉÈ]', 'e', 'g');
    base_slug := regexp_replace(base_slug, '[üúùÜ]', 'u', 'g');
    base_slug := regexp_replace(base_slug, '[íìîÍ]', 'i', 'g');
    -- Icke-alfanumeriska → bindestreck
    base_slug := regexp_replace(base_slug, '[^a-z0-9]+', '-', 'g');
    -- Ta bort inledande/avslutande bindestreck
    base_slug := regexp_replace(base_slug, '^-+|-+$', '', 'g');

    -- Hantera dubletter
    final_slug := base_slug;
    counter := 2;
    WHILE EXISTS (SELECT 1 FROM restaurants WHERE slug = final_slug) LOOP
      final_slug := base_slug || '-' || counter;
      counter := counter + 1;
    END LOOP;

    UPDATE restaurants SET slug = final_slug WHERE id = rec.id;
    RAISE NOTICE 'Slug: % -> %', rec.name, final_slug;
  END LOOP;
END $$;

-- Verifiera
SELECT COUNT(*) AS utan_slug FROM restaurants WHERE slug IS NULL;
