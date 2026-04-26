-- Uppdatera website-fält för restauranger, kaféer och barer
-- Kör i Supabase SQL Editor

UPDATE restaurants SET website = 'https://sandhamns-vardshus.se/'           WHERE slug = 'sandhamns-vardshus';
UPDATE restaurants SET website = 'https://grinda.se/'                        WHERE slug = 'grinda-vardshus';
UPDATE restaurants SET website = 'https://www.fjaderholmarnaskrog.se/'       WHERE slug = 'fjaderholmarnas-krog';
UPDATE restaurants SET website = 'https://www.utovardshus.se/'               WHERE slug = 'uto-vardshus';
UPDATE restaurants SET website = 'https://www.waxholmshotell.se/'            WHERE slug = 'waxholms-hotell-restaurang';
UPDATE restaurants SET website = 'https://lindgarden.com/'                   WHERE slug = 'lindgarden-visby';
UPDATE restaurants SET website = 'https://gullholmenshamnkrog.se/'           WHERE slug = 'gullholmens-krog';
UPDATE restaurants SET website = 'https://www.karingon.se/'                  WHERE slug = 'karingoen-restaurang';
UPDATE restaurants SET website = 'https://astolsrokeri.se/'                  WHERE slug = 'astol-hamnkrog';
UPDATE restaurants SET website = 'https://www.marstrandswardshus.se/'        WHERE slug = 'marstrand-vardshus';
UPDATE restaurants SET website = 'https://www.wards.se/'                     WHERE slug = 'mollosunds-vardshus';
UPDATE restaurants SET website = 'https://arholmanord.se/'                   WHERE slug = 'arholma-vardshus';
UPDATE restaurants SET website = 'https://arholmanord.se/'                   WHERE slug = 'arholma-hamnkrog';
UPDATE restaurants SET website = 'https://sjobodentoro.se/'                  WHERE slug = 'toro-ankarudden';
UPDATE restaurants SET website = 'https://www.bullandokrog.se/'              WHERE slug = 'bullando-krog';
UPDATE restaurants SET website = 'https://blidorestaurang.se/'               WHERE slug = 'blido-vardshus';

-- Verifiera
SELECT name, slug, website FROM restaurants WHERE website IS NOT NULL AND type IN ('restaurant','cafe','bar') ORDER BY name;
