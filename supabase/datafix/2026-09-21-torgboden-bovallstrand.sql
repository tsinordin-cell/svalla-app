-- Torgboden i Bovallstrand stod som "Endast sommar" utan text.
-- KÄLLA: Västsverige, Torgboden, https://www.vastsverige.com/sotenas/produkter/torgboden/ — "Precis vid torget,
--   ett stenkast från havet … serverar vällagad och riktigt god mat. Lokala råvaror prioriteras och det serveras
--   allt från lunch till a la carte. Krogen har öppet stora delar av året, sommartid varje dag." (läst 2026-09-21)
-- Säsong "endast sommar" stämde inte och nollställs; öppettider skrivs inte för hand.
update restaurants set
  seasonality = null,
  categories = array['restaurant','lunch_stop'],
  description = 'Krog vid torget i Bovallstrand, ett stenkast från havet. Lokala råvaror, lunch och à la carte – öppet stora delar av året enligt Västsverige.',
  core_experience = 'Krogen vid torget i Bovallstrand – lokala råvaror från lunch till à la carte.',
  updated_at = now()
where slug = 'torgboden-i-bovallstrand'
returning slug, seasonality;
