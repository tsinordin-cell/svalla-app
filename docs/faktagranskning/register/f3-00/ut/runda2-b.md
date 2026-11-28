# Runda 2, fas 3 batch 00 del B (läst 2026-11-28)

Underlag: kontroll/b1.kontroll.tsv och b2.kontroll.tsv (13 FEL, 3 SAKNAS, 123 OK). Säkerhetskopior: scratchpad/fas3/runda2b/fore/. Källor sparade i scratchpad/fas3/runda2b/kallor/. Ändrade registerrader har "runda 2" först i kolumnen rätt uppgift (22 rader). b.edits.json: 42 poster före, 53 efter (13 befintliga ändrade, 11 nya). P0-posten (Lidö, nu i p0-29.edits.json) är orörd.

## En rad per kid
- b-k002 (0080) SAKNAS: underlaget citerar gammal kodkommentar. Ingen ändring.
- b-k013 (0139) FEL: registret säger nu MÄTT 404; Strömma-citatet borttaget. Ingen kodändring, artikeln är opublicerad.
- b-k027 (0082) och b-k086 (0081) FEL: mejlrutan lovar nu "nästa tidtabellsbyte". Samma ruta, samma utseende, ny titel och beskrivning.
- b-k035 (0076) FEL: metabeskrivning och hjältetext säger när vintertabellerna börjar gälla (13 december 2026) och inte att höstens gäller "till 12 december". Styrsöbolagets linje 285 till 287 är tillagda (höst till 13 december, vinter till 14 juni 2027).
- b-s010 (0084) FEL: linje 24, 26 och 27 står kvar, i dåtid ("till 1 november 2026"). Linje 28 (till 30 september, h28) har jag lagt till.
- b-k033 (0083) OK med anmärkning: rubriken "Det här gäller just nu" heter nu "Hösten 2026 och vintern 2026/27", etiketterna heter "Hösten 2026" och "Vintern 2026/27", och höstperioderna står utan "gäller".
- b-k063 (0120) FEL: "Se tidtabell →" följer nu samma etikettregel som färdsättskorten. Alla 10 länkar blir "Mer hos <sajt> →".
- b-k071 (0098), b-k107 (0097), b-k097 (0102) FEL: /ta-dig-till säger "färja, buss eller egen båt" (ingen snabbåt) och "linjer och restider där de finns".
- b-k109 (0099) FEL: titeln är "Hur tar man sig till öarna? Transport till ${ALL_ISLANDS.length} öar och kustorter".
- b-k073 (0028) SAKNAS: cinderellabatarna.com gav igen 502 i Chromium och connection reset i curl. EJ NÅBAR; står kvar.
- b-k075 (0055, 0057) FEL: "Stavsnäs vinterhamn" heter nu "Stavsnäs" som i Waxholmsbolagets tabeller 16 och 17. KÄLLA för h16 är tillagd.
- b-k084 (0111) FEL: mallen /ta-dig-till/[ö] (308) har inte längre "Du kliver av vid öns brygga". Steg 3 är restiden och visas bara när den finns.
- b-k105 (0109) FEL: samma mall har BoatTrip i stället för BusTrip och ingen reserv för Waxholmsbolaget eller Stockholm. Avgångsbrygga och operatör finns med bara när de finns i datan.
- b-k117 (0069) SAKNAS: texten finns inte i slutlig kod. Ingen ändring.
- b-k126 (0067) FEL: "Dagstur är fullt möjlig" är nu "Strömma beskriver båtarna som en startpunkt för en dagsutflykt".
- Uppdraget, /farjor (0034 till 0036): SL-svaret (JSON-LD och synligt) följer Waxholmsbolagets egna sidor. Under lågsäsongen, 14 september till 29 april, gäller SL:s periodbiljetter på 30 dagar eller längre i hela trafiken. Resten av året kompletterar man för delsträckan utanför SL-området. Linje 17, 18 och 19 via Baggensstäket är undantagna, utom lågsäsongens periodbiljetter. Källor: alla-sl-biljetter-galler-mellan-44-bryggor och sa-galler-sl-biljetten-pa-baten.

## Genomgången
- "Se tidtabell" och "Mer hos": alla 59 länkmål på komma-dit svarar 200 (runda2b/lankar-status.tsv). Etiketten "Tidtabell" står på Trafikverkets och Västtrafiks linjesidor, som båda har tidtabell. De 8 pdf:erna är tidtabeller. Sex av dem slutar gälla 12 december; se runda2b-till-p0.md.
- RESONERAT: att "hela Waxholmsbolagets trafik" under lågsäsongen också gäller linje 17 till 19 är min läsning av Waxholmsbolagets formulering. Sidan säger inte uttryckligen hur undantaget och lågsäsongen hänger ihop.
- EJ NÅBAR 2026-11-28: waxholmsbolaget.linjetidtabeller.se (Chromium visade en verifieringssida) och cinderellabatarna.com (502). KÄLLA-raden för linjetidtabeller.se på /vintertidtabeller är borttagen och ersatt med en anteckning. Länken "Linjetidtabeller som pdf" står kvar men är inte prövad i dag.
- Inte ändrat: transit-stops.ts, LastBoatPanel.tsx, DepartureWidget.tsx, P0-posterna. Inga sidor tillagda eller borttagna.

## Kontroller
- applicera.mjs --torr p0-28.edits.json mot main: 19 ok, 0 fel. b.edits.json utan P0-posterna gav 52 ok, 0 fel efter p0-28 (i kopia). Den gav också 52 ok efter p0-28a och p0-29.
- I egen kopia (p0-28 och sedan b utan P0): generera-kallor.mjs gav 144 av 144 öar och 1943 källor. prebuild gav kod 0. tsc gav bara de 2 kända felen (dmBilderRensning.test.ts, kontoRadering.test.ts). vitest src/lib gav 119 filer och 1044 tester, alla godkända. Kopian är borttagen.
- Citat (skript runda2b/kollcitat.py): 52 av 52 citat i ändrade och nya poster står ordagrant i de sparade källorna. 33 av 33 citat i registerraderna gör det också.
- Inga tankstreck i publicerade strängar i ändrade poster.
