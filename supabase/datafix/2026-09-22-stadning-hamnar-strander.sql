-- 2026-09-22: städning efter granskningen av hamnar och stränder (Toms beslut 2026-09-22:
-- "gör det som gör produkten bättre och inte fattigare, men alltid korrekt info").
-- Inget raderas: dolda rader får hidden_at + hidden_reason och kan återställas.

-- ── 1. Insjöbad döljs (Svalla är en skärgårdsguide). Vattentyp kontrollerad 2026-09-22 ──
-- HaV-sidorna nedan visar "Vattentyp: Sjö" (hämtade med Playwright 2026-09-22):
--   bergsjobadet          havochvatten.se/.../badplatser-i-goteborgs-stad/bergsjon.html
--   frokens-udde          havochvatten.se/.../badplatser-i-harryda-kommun/landvettersjon-frokens-udde.html
--   harlanda-tjarns-badplats havochvatten.se/.../badplatser-i-goteborgs-stad/harlanda-tjarn.html
--   badplats-kvarnsjon    havochvatten.se/.../badplatser-i-varmdo-kommun/kvarnsjon.html
--   rakstabadet           havochvatten.se/.../badplatser-i-tyreso-kommun/rakstabadet.html (Albysjön)
--   eklundsnasbadet       havochvatten.se/.../badplatser-i-sodertalje-kommun/masnaren-eklundsnasbadet.html
--   rudan-strand          havochvatten.se/.../badplatser-i-haninge-kommun/ovre-rudan.html
--   lilla-rudan-badplats  havochvatten.se/.../badplatser-i-haninge-kommun/nedre-rudan.html
--   lida-badplats         havochvatten.se/.../badplatser-i-botkyrka-kommun/getaren-lidabadet.html
--   rudan-norra-strand-lillrudan = Stationsbadet, "Rudans friluftsbad – norra sidan" (haninge.se), samma sjö som Övre Rudan.
--   smorvattnets-badplats: Länsstyrelsens VISS listar Smörvattnet som "Sjö" (sidtitel; sidan svarade 502 vid kontroll).
--     Läget (57.779, 12.105) ligger i inlandet nordost om Göteborg — resonerat, inte mätt mot källa.
update restaurants set hidden_at = now(), hidden_reason = 'Insjöbad, inte skärgård (HaV/kommun: vattentyp sjö)'
where type = 'beach' and hidden_at is null and slug in (
  'bergsjobadet','frokens-udde','harlanda-tjarns-badplats','badplats-kvarnsjon','rakstabadet','eklundsnasbadet',
  'rudan-strand','lilla-rudan-badplats','lida-badplats','rudan-norra-strand-lillrudan','smorvattnets-badplats');

-- ── 2. Åland: behålls (Svalla täcker Åland, region 'aland' har 23 platser) men får rätt region ──
-- Koordinaterna (60.154/19.597 och 60.181/19.595) ligger i Eckerö på Åland — mätt.
update restaurants set archipelago_region = 'aland', updated_at = now()
where slug in ('degersand','sodersjon') and archipelago_region is null;

-- ── 3. Poster i hamnlistan som inte är hamnar ─────────────────────────────
--   singo-battaxi: ett båttaxiföretag, ingen hamn; ingen tillåten källa beskriver platsen.
--   v-holm-marina-ab: båtverkstad utan båtplatser enligt egen sida (vholmmarina.com: "reparation och service").
--   gasthamn / hamn (Möja): generiska namn utan identifierbar plats; ingen källa.
--   forsvarsplats-lysekil-hamn: ingen tillåten källa nämner platsen; troligen ingen gästhamn.
update restaurants set hidden_at = now(), hidden_reason = 'Inte en hamn / går inte att identifiera (granskning 2026-09-22)'
where type = 'harbor' and hidden_at is null and slug in ('singo-battaxi','v-holm-marina-ab','gasthamn','hamn','forsvarsplats-lysekil-hamn');

-- ── 4. Felaktiga webblänkar på stränder (kontrollerade 2026-09-22) ─────────
-- Tomt fält är bättre än en länk till fel plats.
--   kolholm-sand      bodasand.se            = "Camping & semester på Öland hos Böda Sand"
--   talluddens-bad    talludden.nu/poolstrand = Talluddens Stugby, "Njut av Öland!"
--   torsbybadet       torsby.se/torsbybadet  = Torsby kommun (Värmland); badet ligger på Värmdö (59.335, 18.483)
--   badberget         sollentuna.se Edsviken = Badberget vid Edsviken i Sollentuna; vår punkt ligger vid 18.78 E (ca 45 km österut)
--   farnabben         booff.se               = Boo FF (fotbollsklubb)
--   hoppbryggans-bad  havochvatten.se Skrubba strandbad, Drevviken = en annan badplats
--   holo-klippbad     badkartan.se (förbjuden källa), sidan gäller "Oxnö klippbad"
update restaurants set website = null, updated_at = now()
where type = 'beach' and slug in ('kolholm-sand','talluddens-bad','torsbybadet','badberget','farnabben','hoppbryggans-bad','holo-klippbad');

-- Döda/allmänna länkar ersätts med källsidan som beskrivningen bygger på:
--   askimsbadet: goteborg.com-länken svarar 404.
--   tenobadet:   upplevvaxholm.se går till startsidan för en turistguide, inte badet.
update restaurants set website = 'https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-goteborgs-stad/askimsbadet.html', updated_at = now() where slug = 'askimsbadet';
update restaurants set website = 'https://www.vaxholm.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser', updated_at = now() where slug = 'tenobadet';
