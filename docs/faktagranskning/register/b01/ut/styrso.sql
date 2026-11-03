-- Faktagranskning batch 01 – Styrsö (Granskare/Skribent, 2026-11-02).
-- Körs av huvudsessionen. Bara UPDATE. Satsen skriver över exakt det granskade värdet (gamla värdet i WHERE).
-- Databasen kontrollerad 2026-11-03 (bara SELECT): FÖRE-värdena i WHERE stämmer i dag för karran och vrango-gasthamn (description).
-- Den gamla Kärran-texten kommer från supabase/datafix/2026-09-23-texter-omgang3.sql:85 (description sattes bara om den var tom).
-- Träffar en sats ändå 0 rader har värdet ändrats efter 2026-11-03: kör  select slug, description from restaurants where slug in ('karran', 'vrango-gasthamn');
-- och kontrollera att satsen träffar en rad (UPDATE ... RETURNING slug).

-- restaurants.karran.description (styrso-0335; DELVIS: Kärran är en foodtruck, inte en restaurang; första meningen enligt SEO-regeln)
-- FÖRE: 'Kärran är en restaurang på Brännö i Göteborgs södra skärgård.'
-- KÄLLA: https://www.goteborg.com/guider/guide-ata-och-fika-i-goteborgs-skargard — "Det är en rosa foodtruck som serverar asiatiska rätter med en svensk touch, hemmagjorda bakverk, juicer och iskaffe. Foodtrucken hittas på Varpevägen 3 på Brännö, med utsikt över Gärdet och hamninloppet, öppet april-september." (läst 2026-10-31)
-- KÄLLA: https://www.goteborg.com/platser/branno — "Brännö är en levande skärgårdsö i södra delen av Göteborgs skärgård" (läst 2026-10-31)
update restaurants set description = 'Kärran är en rosa foodtruck på Varpevägen 3 på Brännö i Göteborgs södra skärgård. Den serverar asiatiska rätter med en svensk touch, hemmagjorda bakverk, juicer och iskaffe och har öppet april–september.', updated_at = now() where slug = 'karran' and description = 'Kärran är en restaurang på Brännö i Göteborgs södra skärgård.';

-- restaurants.vrango-gasthamn.description (styrso-0493 STRYK+KOMPENSERA; nya uppgifter styrso-N003–N006; första meningen enligt SEO-regeln)
-- FÖRE: 'Vrångö gästhamn har plats för cirka 130 gästande båtar och en dagbrygga för kortare besök, och hamnen ligger väl skyddad för vind och vågor. Hamndjupet är 3,5–5 meter. I gästhamnen finns toaletter, duschar, tvättmaskin, sopkärl, miljöstation och sugtömning, och i hamnen finns mataffär och matställen.'
-- Struket: "Hamndjupet är 3,5–5 meter." Djup får bara beläggas av myndigheten (nivå 1); enda källan är svenskagasthamnar.se (nivå 3, "Hamndjup 3,5-5 m").
-- Inte med: källans "Ankringsförbud" – en föreskrift, som bara myndigheten kan belägga.
-- KÄLLA: https://www.svenskagasthamnar.se/goteborgs-skargard/vrango/ — "Vrångö hamn är en mycket populär och välbesökt gästhamn som har plats för c a 130 gästande båtar.", "Det finns även en nyutlagd dagbrygga för kortare besök. Hamnen ligger väl skyddad för vind och vågor.", "I gästhamnen finns toaletter, duschar, tvättmaskin, sopkärl, miljöstation och septictank sugtömning.", "Det finns mataffär och matställen i hamnen.", "för mot brygga, fast akterfäste el. boj." (läst 2026-11-03). Aggregator (nivå 3); ingen nivå 1–2-källa hittad för hamnen.
-- KÄLLA: https://www.goteborg.com/platser/vrango — "Skärgårdsbåten lägger till i Mittvik", "Tvärs över ön, en knapp kilometer från båtens tilläggsplats, finns en stor modern gästhamn med fiskekaj" (läst 2026-11-03)
-- KÄLLA: https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Vr%C3%A5ng%C3%B6 — "Vrångö", "Göteborg | Tätort" (läst 2026-11-03)
update restaurants set description = 'Vrångö gästhamn är gästhamnen på Vrångö i Göteborgs kommun, med plats för cirka 130 gästande båtar och en dagbrygga för kortare besök. Hamnen ligger väl skyddad för vind och vågor, och båtarna förtöjs med fören mot bryggan och fast akterfäste eller boj. I gästhamnen finns toaletter, duschar, tvättmaskin, sopkärl, miljöstation och sugtömning, och i hamnen finns fiskekaj, mataffär och matställen. Skärgårdsbåten lägger till i Mittvik, en knapp kilometer bort på andra sidan ön.', updated_at = now()
 where slug = 'vrango-gasthamn' and description = 'Vrångö gästhamn har plats för cirka 130 gästande båtar och en dagbrygga för kortare besök, och hamnen ligger väl skyddad för vind och vågor. Hamndjupet är 3,5–5 meter. I gästhamnen finns toaletter, duschar, tvättmaskin, sopkärl, miljöstation och sugtömning, och i hamnen finns mataffär och matställen.';
