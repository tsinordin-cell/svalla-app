# Sidmallarna, batch 01 – omarbete 11 (2026-11-25): dagens main och rättelserna efter mopp 2

Arbetskopia: /home/claude/svalla-mallar11 (worktree på origin/main f3f8df4, 149 commits efter 65ec7c3, 144 öar; patchen från runda 10 inlagd med `apply --3way`; inget committat, nya filer `git add -N`). /home/claude/svalla-mallar10 orörd.
Leverans: ut/mallar-arbetskopia.patch (`git diff origin/main`, 53 filer; `git apply --check` mot ren f3f8df4 går igenom), mallar.tsv (4 ändrade rader: mall-0047, 0111, N033, N035; 1 ny: mall-N051).
MÄTT = renderat med mallar11/skript/matt11.tsx (kopia av matt10.tsx) och db-riktig.json. Nytt i mätningen: `<style>` och sajtens meny (MegaMeny via SidHuvud, ny på main) räknas inte, eftersom de inte räknades i rundorna 7 till 10; next/cache är en stubbe. RESONERAT = läst i koden. Läsdatum 2026-11-25; nya källor i kallcache/ny/ (Långskär, Gotska Sandön hitta-hit, skötselplanen 8810).

## Krockarna (11 filer; main:s design orörd)
- Importer (bad, boende, komma-dit, med-barn, restauranger, kajak): main:s `ogO`/`ogSida` och mallarnas importer båda kvar.
- openGraph (bad, hamnar, komma-dit, restauranger): main:s `images: ogO(...)` plus mallarnas titel och beskrivning.
- hamnar/page.tsx: mallarnas rad utan hamn (mall-N049) med main:s nya marginal `24px` (förut `-24px`).
- page.tsx: FAQPage-blocket borttaget som förut (mall-0015). Sidfoten: main:s nya slogan "Skärgården börjar här" (#666) står kvar; den är ingen sakuppgift, så mallarnas "Guide till öar i Sverige och på Åland" utgår (mall-0111).
- activity-data.ts: main flyttade `islandsForActivity` till activity-islands.ts; mallarnas `harGasthamn` står kvar (mallarna ändrade inte den flyttade funktionen).
- islandPlaces.ts: main hämtar alla platser en gång (`hamtaAllaPlatser`, `platserForO`). Mallarnas regler flyttade in i `platserForO`: ö-fältet före avståndet (`arPaOn`, `ofaltMotOn`), `platsRadie`, `urval` före sortering. islandPlaces.test.ts: låtsasklienten fick `order` och next/cache mockas. Main:s platserForO-test grönt.
- kallor.generated.ts: tagen från main och genererad om (144 öar, 1 799 källor).
- Utan krock men trasigt: main bytte fem sluggar (#676). batregler.ts: `ormsko` → `ormskar`, `smaadalaro` → `smadalaro` (testet "gäller bara öar som finns" föll). Inga andra gamla sluggar i patchen.

## Punkterna
- **sr02-k006 (mall-N035).** Gotska Sandön: "Det är ankringsförbud vid Tärnudden." med sverigesnationalparker.se som källa (Chromium i dag). Ny mening: "Enligt Naturvårdsverkets skötselplan för nationalparken från 2018 gäller förbudet en sektor vid Tärnudden på grund av en elkabel, och planen hänvisar till Länsstyrelsen i Gotlands läns föreskrift 09FS 2006:4." (pdftotext i dag). Att 09FS 2006:4 gäller i dag står inte i texten.
- **sr04-k010, sb05-k014 (mall-N033).** Långskärs förbud står i batregler.ts. Rutan har nu Länsstyrelsens lista för den som kommer med båt: fågelskyddsområdet 1 februari till 15 augusti, 7 knop, förankring högst två dygn och "Det är förbjudet att elda i reservatet." (sidan läst i dag i Chromium). MÄTT: meningen står på /o/langskar/komma-dit.
- **sb05-k031, sr04-k019 (Hjälvik).** Står inte i batregler.ts: texten är lag3b-N012 (Öckerös insiderTips i lag3-b.edits.json). Till öarnas Skribent.
- **Öns egen Långskärstext (lag3a-N017, getting_there)** räknar fortfarande bara tältning, eldning och hund. Till öarnas Skribent.
- **sr03-utanfor (mall-N051, mall-0047).** ThorkelRouteCard.tsx:94 och api/guide/route.ts:768 använder `arBatben` som DepartureWidget. Inget `includes('färja')` kvar i src.

## Lag 3 (main f3f8df4 mot ihop, 1 296 sidor, upplysningstexten som i runda 10)
Ihop = arbetskopian + de nio öarnas edits.json + utanfor-b01 + lag3-a + lag3-b (källistan omgenererad, 1 934 källor). Går inte in i dag (main har ändrat texten): lag3-a #2 (lag3a-N001, N002, Dalarö, SL 839), #9 (lag3a-N007, Gålö, SL 845), #12 (lag3a-N010, 839); lag3-b #11 (lag3b-N015, N016: `related` med `'ormsko'`, nu `'ormskar'`). Övriga 339 poster gick in.
Under 95 %: 17 sidor (batch 01: 0). Bara mallarnas kopia: 70 (batch 01: 7; öarnas poster lyfter alla sju). Ö, sida, nu/main, brist, orsak:
- Dalarö komma-dit 182/264, 69 · Gålö komma-dit 198/280, 68 · Smådalarö komma-dit 243/296, 39: öarnas poster ovan går inte in.
- Bullerö med barn 173/201, 18 · Kungshamn med barn 261/276, 2 · Pater Noster med barn 308/325, 1: barnurvalet (sm05-k003) och Thorkel-raden.
- Arkösund boende 104/111, 2 · Harstena boende 122/129, 1 · Ämtö boende 120/127, 1 · Eknö med barn 195/206, 1: bara klockslagsstrykningen ("Resan bokas senast klockan 18.00 dagen innan", Eknös fasta tider).
- Tjärö bad 255/270, 2 · Runmarö bad 241/255, 2: metabeskrivningen utan "vägbeskrivning"; Runmarö dessutom kortet Segling.
- Limön aktiviteter 77/82, 1 (Segling, harGasthamn) · Lidö hamnar 124/131, 1 ("och sjömackar") · Hemsön ösidan 1314/1387, 4 (länk- och FAQ-texter) · Storskär komma-dit 183/193, 1 · Mörkö komma-dit 246/259, 1 (94,98 %; Waxholmsbolagets tips, mall-0174).
Batch 01, lägsta andel per ö: Husarö bad 97,1 %, Möja hamnar 98,4 %, Utö restauranger 98,7 %, övriga ≥ 101 %. Mätfiler: mallar11/matt/ (lag3-main-ihop.tsv, main/r11/ihop.jsonl).

## Till öarnas Skribent
1. lag3-a #2, #9, #12 och lag3-b #11 måste skrivas om mot dagens main (sb04-k029, sb04-k042, sb04-k032 gäller samma poster).
2. lag3a-N017 (Långskär) och lag3b-N012 (Hjälvik): förbuden enligt sr04-k010, sb05-k014, sb05-k031.
3. Ny regel på main: src/lib/oSok.ts ska följa island-data.ts (oSok.test.ts). Med öarnas poster ändras sju öar: Sandhamn, Utö, Vaxholm, Grinda, Husarö, Storholmen, Styrsö (taggar, tagline, `slag`). Raderna ska skrivas om vid inläggningen.

## Till Redaktören
1. Arkösund, Harstena och Ämtö boende och Eknö med barn hamnar under 95 % bara av klockslagsstrykningen. Enligt beslut C borde de stå i UPPSKJUTEN_STRYKNING; inte ändrat. Ska de läggas till?
2. mall-0111: main:s slogan ersätter mallarnas sidfotstext. Bekräfta.

- **Redaktörens beslut (enligt beslut C):** Ämtö, Arkösund och Harstena boende och Eknö med barn ligger nu i UPPSKJUTEN_STRYKNING (src/lib/klockslagStrykning.ts). MÄTT mot main f3f8df4 med öarnas poster: 128/127, 112/111, 130/129 och 217/206 ord (alla ≥ 100 %). Under 95 % nu 13 sidor (batch 01: 0). Efteråt: prebuild exit 0, tsc 0 fel, vitest 997 gröna, patchen sparad igen (53 filer).

## Kontroller (2026-11-25)
/home/claude/svalla-mallar11: `npm run -s prebuild` exit 0 (verify-claims utan nya påståenden, källistan och uppskattningar aktuella, vitest i prebuild grön, obilder grön) · `npx tsc --noEmit -p .` 0 fel · `npx vitest run src/lib` 112 filer, 997 test gröna · eslint på ändrade filer: bara de tre emojifelen som finns på main (hamnar/page.tsx, page.tsx, api/guide/route.ts).
Ihop (kopia i scratchpad/b01/mallar11/ihop): först föll oSok.test.ts (punkt 3 ovan); med O_SOK omskriven ur ALL_ISLANDS (skript/osok.ts): prebuild exit 0, tsc 0 fel, vitest 112 filer, 997 test gröna. Kopian borttagen.
kontrollera_register.py (mallar): inga formfel, 304 rader. Nya citat sökta ordagrant i de sparade sidorna: alla står. Inga tankstreck i tillagd publicerad text.
