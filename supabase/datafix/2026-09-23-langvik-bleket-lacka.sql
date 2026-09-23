-- 2026-09-23: Toms beslut om de tre sista öppna frågorna.

-- langviks-yttre-gasthamn: Toms beslut "Ta bort". skargarden.se/gasthamnen-i-langvik-stangs-efter-konflikt/: "Den populära gästhamnen
--   Långvik yttre har nu fått stänga efter att två medlemmar i Möja-Långviks samfällighetsförening stämt föreningen." Egen webbplats lygh.se
--   svarar inte. Dold; 308 till /o/moja i middleware (sidan hade Google-klick).
update restaurants set hidden_at = now(), hidden_reason = 'Toms beslut 2026-09-23: ta bort. Gästhamnen stängd enligt skargarden.se ("har nu fått stänga"); egen webbplats lygh.se svarar inte'
 where slug = 'langviks-yttre-gasthamn' and hidden_at is null;

-- blekets-bastu: bleketsbastu.se svarar 502 från oss; i stället Blekets fritidsförenings sida om bastun
--   (bleketsfritidsforening.se/?page_id=528): "En havsnära, vedeldad bastu i naturskön miljö.", "Hyr den privat för dig och till sällskap
--   eller besök den på vid allmänna bad", "Du kan hyra den som privatperson eller som företag.", "Kanot eller SUP bokas hos Kajaktiv i Bleket
--   och en bastu efteråt (300 m promenad genom hamnen)", "Följande tider är reserverade för allmän bastu"
update restaurants set
 description = 'Blekets bastu är en vedeldad bastu vid havet i Bleket på Tjörn, Tjörns kommun. Den kan hyras privat, av både privatpersoner och företag, och är öppen för alla på bestämda tider för allmän bastu. Kanot och SUP hyrs hos Kajaktiv i Bleket, 300 meter bort genom hamnen.',
 updated_at = now() where slug = 'blekets-bastu';

-- lacka-nynashamns-segelsallskap: nynashamnyachtclub.se/lacka-klubbholme/ (nådd via annan hämtning; 502 från sandlådan):
--   "Lacka ligger ca 5 nm norr om Nynäshamn.", "Vi ser gärna att båtar av större storlek lägger till i hamnens yttre del.",
--   "Vid pirarna är djupet ca 3 m men det grundar upp … mot sandstranden", karta "som visar var klubbhus, dass samt bastu ligger",
--   "Det finns en pump på vägen upp till klubbhuset för färskvatten", avgift för "gästande båtar". Samma citat hämtades tidigare av granskningsagenten.
update restaurants set
 description = 'Lacka är Nynäshamns Segelsällskaps klubbholme, cirka 5 nautiska mil norr om Nynäshamn. Gästande båtar kan lägga till, större båtar i hamnens yttre del. Vid pirarna är djupet cirka 3 meter och det grundar upp mot sandstranden. På ön finns klubbhus, dass, bastu och en pump med färskvatten.',
 updated_at = now() where slug = 'lacka-nynashamns-segelsallskap';

-- kajplatsen-fisk-grill: INGEN ÄNDRING. Ingen dubblett av klova-hamnkrog: Klova Hamnkrog har egen post i Västsveriges guide
--   (Hönö Klåva hamn väg 15, 0729 71 71 10), och Kajplatsen Fisk&Grill har en egen sida på Facebook ("Kajplatsen Fisk&Grill | Hönö").
--   Två verksamheter i samma hamn. Facebook används bara som belägg för att verksamheten finns, inte som källa för text.
