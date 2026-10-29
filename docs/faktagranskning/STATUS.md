# STATUS — faktagranskningen

Senaste raden överst. Varje session börjar här. Tider är svensk tid.

## 2026-10-29 — session 1, fortsättning kväll

**Batch 01, steg 1: 4 av 10 register klara (MÄTT, `kontrollera_register.py`).**
| Ö | Rader | Med befintlig källa | Från datafil / render / restaurants | Olika URL:er |
|---|---|---|---|---|
| Fjäderholmarna | 329 | 260 | 264 / 26 / 39 | 17 |
| Utö | 562 | 383 | 406 / 26 / 130 | 32 |
| Möja | 646 | 496 | 522 / 32 / 92 | 41 |
| Sandhamn | 657 | 419 | 454 / 26 / 177 | 39 |
Alla fyra har 15 kolumner per rad och unika id, varje rad i grundregistret
har minst en rad i registret, och domkolumnerna är tomma.
- Igång: Grinda, Vaxholm, Storholmen, Styrsö. Kö: Husarö, sidmallarna.
- Toms beslut 2026-10-29: se `beslut-tom.md` (säkerhetskopiering av docs,
  högst 4 agenter, FAQ-dubbletten bort i batch 01:s PR).
- Nästa: steg 2. Källorna hämtas en gång till en gemensam cache, och
  citaten i befintliga KÄLLA-rader kontrolleras mekaniskt innan
  Granskarna dömer.

**Förberedelse steg 2 (MÄTT, `verktyg/kallcache.py`):** 102 olika URL:er i de
fyra registren, 84 lästa med curl och 18 med Chromium. Två svarar 502
(utogasthamn.se/gasthamnen/ och /hitta-hit/) – läses om innan någon dom.
| Ö | Alla citat ordagrant | Citat saknas | Bara URL/skiftläge | Ingen KÄLLA-URL |
|---|---|---|---|---|
| Fjäderholmarna | 209 | 22 | 20 | 78 |
| Utö | 273 | 47 | 23 | 219 |
| Möja | 325 | 39 | 44 | 238 |
| Sandhamn | 343 | 34 | 20 | 260 |
Platsraderna saknar källa i registret, men källorna står i
`supabase/datafix/*.sql`. `verktyg/datafix_kallor.py` matchar dagens text
(md5) mot datafix-satserna: 35 av 42 platser har en sats med exakt dagens
text och källkommentar. Utan: bryggans-lilla-kok-uto, moja-stf-moja-gard,
rano-brygga (ingen text), sandhamn-sands-hotell, stf-vandrarhem-uto,
uto-camping-och-stugor, uto-vardshus.
- /team: två skrivförsök 19:03–19:05 avbröts ("cancelled"). Tredje försöket
  19:19 gick igenom. Batchkortet stämmer.
- Storholmen klar 19:15: 217 rader, form och täckning OK. Agentens förbrukning
  (MÄTT, uppgiftsnotisen): 384 568 tokens, 16 min. Första datapunkten för
  kostnad per ö.
- Upptäckt av Utvinnaren: FAQ-svaren på komma-dit och med-barn har dubbel
  punkt ("SL-biljett gäller.."). Rättas i batch 01:s PR.
- Platsurvalet i baslinjen (radie + 2 km) är vidare än det /restauranger
  visar (radie + 0,5 km). Måttet är jämförbart före och efter, men alla
  platser i baslinjen syns inte på alla undersidor.
- Kö: sidmallarnas Utvinnare startar på nästa lediga plats, sedan
  Granskarna en ö i taget, högst 4 agenter samtidigt.
- Styrsö klar: 501 rader (434 205 tokens, 19 min). Grinda klar: 615 rader
  (469 932 tokens, 22 min). Båda OK i formkontrollen.
- Fält som ingen sida läser (MÄTT, grep i src/ utanför datafilerna):
  amenities, dog_friendly, dog_notes, day_cost. seasonal.peak läses bara av
  /oppet-nu och insiderTips bara av /med-barn. De raderna får dom men
  granskas sist.
- Datafix-källor utökade till 53 platser: 42 har en sats med dagens text.
- Steg 2 startat med pilot-Granskare för Fjäderholmarna (minsta registret
  med färdig cache). Instruktionen justeras efter piloten innan de andra
  öarna startar.
- Vaxholm klar: 695 rader (556 048 tokens, 25 min). Platsernas datafix-källor
  utökade: 59 av 73 platser har en sats med dagens text.
- Storholmens förkontroll kördes om efter ett tillfälligt fel vid hämtningen
  av SL:s h80.pdf: 146 rader har alla citat ordagrant, inga citat saknas.
- Granskare 2 startad: Storholmen (mest besökt). Rättelse skickad: min
  instruktion innehöll en kommunuppgift ur minnet, som Granskaren fick
  besked att bortse från.
- `verktyg/rendera.py` fäller nu också ut "Läs hela texten".
- Husarö klar: 293 rader (402 378 tokens, 17 min). Förkontroll: 168 med alla
  citat ordagrant, 16 saknar citat, 109 utan källa.
- Vaxholms förkontroll efter omhämtning: 246 / 87 bara URL / 28 saknas / 334
  utan källa. Proxyfel: kund.printhuset-sthlm.se återställer vissa HTTP/2-
  anslutningar, och utogasthamn.se ger 502 genom proxyn (avbrutna tunnlar
  enligt proxyns logg). kallcache.py hämtar nu med --http1.1 och försöker
  igen. Granskarna prövar curl --http1.1, Chromium och WebFetch innan EJ
  NÅBAR.
- Granskare 3 startad: Möja. Kö för steg 2: Utö, Sandhamn, Grinda, Vaxholm,
  Styrsö, Husarö, sidmallarna.
- Teknik: klonen är grund och följde bara main. Fetch-refspec för grenen
  tillagd så att `git status` och stopphooken ser att allt är pushat.

## 2026-10-29 — session 1, fortsättning 14:40

**Batch 01, steg 1: avbrutet i natt, återupptaget.**
- 05:25 startade tio Utvinnare (nio öar + sidmallarna). Alla stoppades av
  kontots 5-timmarsgräns innan något register skrevs (MÄTT: `register/b01/`
  tom). Gränsen släppte 09:00.
- Fel i underlaget: de hämtade sidorna saknade synlig text. Ösidorna
  strömmar in huvudinnehållet efter laddningsskelettet (`loading.tsx`), så
  HTML:en som hämtades med curl hade ett tomt `<main>`. Rättat: sidorna
  renderas i Chromium med `verktyg/rendera.py` (81 sidor, 37 593 ord,
  utfällbara listor öppnade).
- FAQ: bara första svaret är utfällt på sidan. Alla svar finns ordagrant i
  sidans FAQPage-JSON-LD, som byggs av samma `getFaqsForIsland`.
- Körregel: högst 4 agenter samtidigt, så att kontots gräns inte låses för
  annan användning. Granskarna sparar källor i en gemensam cache och söker
  citat med grep i stället för att läsa hela sidor.
- Kö för steg 1: igång Fjäderholmarna, Utö, Möja, Sandhamn. Väntar Grinda,
  Vaxholm, Storholmen, Styrsö, Husarö, sidmallarna. Agenterna fortsätter
  från där de stannade.
- Rollinstruktionerna ligger i `roller/`, verktygen i `verktyg/`.
- Oväntat, utanför granskningen: varje ösida har två identiska
  FAQPage-block i JSON-LD, ett från sidmallen (`src/app/o/[slug]/page.tsx`)
  och ett från `FAQSection`. Inget faktafel.
- Rättelse: klockslagen i session 1:s rader på /team var uppskattade, inte
  avlästa. Databasen visar att den senaste uppdateringen gjordes 05:20.

## 2026-10-29 — session 1

**Steg 0: klart (i arbetskopian, följer med batch 01:s PR).**
- `scripts/faktaregister.mjs` skrivet: register, baslinje, mätning.
- `baslinje.json` skapad 2026-10-29 (MÄTT): 101 öar, 86 227 ord, 10 066
  enheter, 8 495 med KÄLLA-rad, 397 med UPPSKATTNING-rad. 699 platser, 625
  med text, 143 dolda.
- Batchlista fas 1: `batchlista-fas1.json`, 11 batchar. Ordnad efter
  sessioner 90 dagar i `analytics_events` (Search Console är inte anslutet,
  Vercel Web Analytics är inte aktiverat). Underlaget är tunt — som mest 45
  sessioner (Storholmen) — så ordningen är grov.
- `docs/ARBETSREGLER.md`: Lag 2, Lag 3 och Facebook/Instagram-regeln.
  `scripts/verify-claims.mjs`: TOMT-raderna omskrivna enligt Lag 2.
- /team: huvudkortet och fas 1 i Claude jobbar; batchkort 01–11 skapade.

Batchkortens id:
| Batch | id |
|---|---|
| 01 | 02170202-9348-482b-ab60-418f88eddd1e |
| 02 | abd01b6e-154a-42ff-bb67-d4239c07b159 |
| 03 | 4bce5ad4-962a-42b2-bc63-3599191cc066 |
| 04 | e21a0e89-dd2a-499c-9b67-a568a70ef442 |
| 05 | 1850e4f4-643e-4d7d-9ce7-ec30872a7f52 |
| 06 | 872190dd-2dcb-433f-8c5f-3914ae640192 |
| 07 | c6ab77f2-dfb3-442a-b976-d8ea76117f71 |
| 08 | 00abad8e-8b27-481e-a1fb-833bda481525 |
| 09 | 34d0ee02-16cf-4a47-81f9-3525a564bd44 |
| 10 | c8bcd21a-5981-43c2-a317-97acd6960828 |
| 11 | a1e92d92-e5a9-4364-bce4-3ded5747b495 |

**Batch 01: startad.** Storholmen, Möja, Utö, Sandhamn, Fjäderholmarna,
Grinda, Vaxholm, Styrsö, Husarö. Gren: `faktagranskning-batch-01`.
Nästa steg: 1 (Utvinnaren).
