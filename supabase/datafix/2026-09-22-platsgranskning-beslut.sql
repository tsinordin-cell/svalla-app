-- 2026-09-22: Toms beslut om fynden från scripts/granska-platser.mjs.
-- Rader döljs (hidden_at + hidden_reason), de raderas inte.

-- 1. "Blidö Värdshus" var en kopia av Lidö Värdshus: Lidös koordinat
--    (59.77137, 19.08008), Lidös webbplats och telefon, fel önamn.
update restaurants set hidden_at = now(), hidden_reason = 'Kopia av Lidö Värdshus med fel namn och ö (granska-platser 2026-09-22)'
where slug = 'blido-vardshus';

-- 2. Lidö Värdshus fanns två gånger. Samma ställe enligt STF och värdshusets
--    egen sida: värdshus, boende och gästhamn i ett. Den rikare raden behålls.
update restaurants set hidden_at = now(), hidden_reason = 'Dubblett av lido-vardshus — samma verksamhet (STF Lidö Värdshus)'
where slug = 'lido-lido-vardshus-stf';

-- KÄLLA: Lidö Värdshus, https://lidovardshus.com/ — "Säsongen 2026 Vi har nu öppet för
-- grupper, konferenser, fester och bröllop"; "Boende & restaurang öppnar åter till midsommar
-- 2027 den 25 juni och Oasen, vår framficka vid gästhamnen 26 juni"; "Värdshus, stugor,
-- pensionat och gästhamn" (läst 2026-09-22). STF, https://www.svenskaturistforeningen.se/boende/stf-lido-vardshus/
-- — "STF Lidö Värdshus", "Stockholms norra skärgård", "utsikt över Lidöfjärden" (läst 2026-09-22).
-- lidovardshus.se omdirigerar till lidovardshus.com (301).
update restaurants set
  website = 'https://lidovardshus.com/',
  description = 'Värdshus på Lidö i Stockholms norra skärgård, anslutet till STF, med utsikt över Lidöfjärden. Här finns restaurang, stugor, pensionat och gästhamn, och vid gästhamnen framfickan Oasen. Säsongen 2026 tar värdshuset bara emot grupper, konferenser och bröllop — boende och restaurang öppnar igen till midsommar 2027.',
  seasonality = 'Boende och restaurang öppnar 25 juni 2027, Oasen 26 juni 2027. Hösten 2026 endast grupper och konferenser.',
  updated_at = now()
where slug = 'lido-vardshus';

-- 3. Två poster som inte är platser: en kartmarkering vars egen text säger att
--    den ligger på fel ställe, och en namnlös insjöstrand öster om Göteborg.
update restaurants set hidden_at = now(), hidden_reason = 'Felplacerad kartmarkering från Google, ingen riktig plats (granska-platser 2026-09-22)'
where slug = 'not-the-public-sauna';
update restaurants set hidden_at = now(), hidden_reason = 'Namnlös insjöstrand (57.657, 12.199), inte skärgård (granska-platser 2026-09-22)'
where slug = 'sandstrand';

-- 4. Stavsnäs vinterhamn fanns två gånger och låg dessutom på fel ö (Runmarö).
--    KÄLLA: Värmdö kommun, https://www.varmdo.se/varmdohamnar/stavsnasvinterhamn.4.1524f1c618a8d1d9fee45c6d.html
--    — "den viktigaste knutpunkten mellan fastlandet och skärgårdsöar som Sandhamn, Runmarö,
--    Harö och Eknö"; "1 300 parkeringsplatser"; "drivs av det kommunala bolaget Värmdö Hamnar AB";
--    "Gästhamnen Stavsnäs Vinterhamn är certifierad med Blå Flagg" (läst 2026-09-22).
update restaurants set hidden_at = now(), hidden_reason = 'Dubblett av stavsnas-vinterhamn'
where slug = 'stavsnas-vinterhamn-runmaro';
update restaurants set
  island = 'Värmdö',
  website = 'https://www.varmdo.se/varmdohamnar/stavsnasvinterhamn.4.1524f1c618a8d1d9fee45c6d.html',
  description = 'Den viktigaste knutpunkten mellan fastlandet och öarna i mellersta skärgården — härifrån går båtarna till Sandhamn, Runmarö, Harö och Eknö. Hamnen har bussar och båtar, 1 300 parkeringsplatser, service för besökare och en gästhamn med Blå Flagg. Drivs av det kommunala Värmdö Hamnar AB.',
  updated_at = now()
where slug = 'stavsnas-vinterhamn';

-- 5. "Grebbestad Bensinstation" låg 24 km norr om Grebbestad och hade en
--    beskrivning utan å/ä/ö. Det är sjömacken i Grebbestad Seaports marina på Svinnäs.
--    KÄLLA: Grebbestad Seaport, https://grebbestadseaport.se/sjomacken/ — "Vår bensinstation på
--    yttre bryggan har bensin och diesel"; "urvalet av sjötillbehör och glass i vår kiosk";
--    "Öppettider på macken (säsong april-sep) Måndag–Fredag: 10.00–17.00 Lördag–Söndag:
--    10.00–17.00"; "kortautomat på baksidan av mackbyggnaden"; "Fri vattenpåfyllning när du
--    tankar". https://grebbestadseaport.se/gasthamn/ — "Grebbestad gästhamn"; "I vår sjömack";
--    "Adress Svinnäs 457 72 Grebbestad"; "0525-199 50" (lästa 2026-09-22).
--    Koordinat: samma marina som raden grebbestad-gasthamn (Google-plats, Strandvägen 1).
update restaurants set
  name = 'Grebbestad Seaport sjömack',
  latitude = (select latitude from restaurants where slug = 'grebbestad-gasthamn'),
  longitude = (select longitude from restaurants where slug = 'grebbestad-gasthamn'),
  website = 'https://grebbestadseaport.se/sjomacken/',
  phone = '0525-199 50',
  description = 'Sjömacken på yttre bryggan i Grebbestad Seaports marina. Bensin och diesel, en kiosk med sjötillbehör och glass, och fri vattenpåfyllning när du tankar. Utanför öppettiderna finns en kortautomat på baksidan av mackbyggnaden.',
  opening_hours = 'April–september: dagligen 10–17. Kortautomat utanför öppettid.',
  verified_at = now(),
  updated_at = now()
where slug = 'grebbestad-bensinstation';
