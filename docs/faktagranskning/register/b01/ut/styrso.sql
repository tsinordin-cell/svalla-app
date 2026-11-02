-- Faktagranskning batch 01 – Styrsö (Granskare/Skribent, 2026-11-02).
-- Körs av huvudsessionen. Bara UPDATE. Satsen skriver över exakt det granskade värdet (gamla värdet i WHERE).
-- OBS: WHERE-villkoret är INTE kontrollerat mot databasen – Supabase var pausad (betalningsspärr) 2026-11-02.
-- Den gamla texten kommer från supabase/datafix/2026-09-23-texter-omgang3.sql:85 (description sattes bara om den var tom)
-- och stämmer med den renderade sidan /o/styrso/restauranger 2026-10-28.
-- Kör först:  select slug, description from restaurants where slug = 'karran';
-- och kontrollera att satsen träffar en rad (UPDATE ... RETURNING slug).

-- restaurants.karran.description (styrso-0335; DELVIS: Kärran är en foodtruck, inte en restaurang; första meningen enligt SEO-regeln)
-- FÖRE: 'Kärran är en restaurang på Brännö i Göteborgs södra skärgård.'
-- KÄLLA: https://www.goteborg.com/guider/guide-ata-och-fika-i-goteborgs-skargard — "Det är en rosa foodtruck som serverar asiatiska rätter med en svensk touch, hemmagjorda bakverk, juicer och iskaffe. Foodtrucken hittas på Varpevägen 3 på Brännö, med utsikt över Gärdet och hamninloppet, öppet april-september." (läst 2026-10-31)
-- KÄLLA: https://www.goteborg.com/platser/branno — "Brännö är en levande skärgårdsö i södra delen av Göteborgs skärgård" (läst 2026-10-31)
update restaurants set description = 'Kärran är en rosa foodtruck på Varpevägen 3 på Brännö i Göteborgs södra skärgård. Den serverar asiatiska rätter med en svensk touch, hemmagjorda bakverk, juicer och iskaffe och har öppet april–september.', updated_at = now() where slug = 'karran' and description = 'Kärran är en restaurang på Brännö i Göteborgs södra skärgård.';
