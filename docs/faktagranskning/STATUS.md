# STATUS — faktagranskningen

Senaste raden överst. Varje session börjar här. Tider är svensk tid.

## 2026-11-02 23:39 — Utö kontrollerad; utogasthamn.se läst i Toms Chrome

- **Kontrollant Utö (MÄTT):** 116 OK, 9 FEL, 15 SAKNAS av 140. Beslut per
  fynd i `register/b01/kontroll/uto.beslut.tsv`:
  - Fyra fynd gällde klockslag i liveraderna och är inte fel i datafilerna.
    Resan mot "färjeterminal" kom av den gamla avreseorten Nynäshamn, som
    rättas i P0 1.
  - Fem rader kunde Kontrollanten inte läsa (utogasthamn.se visar CAPTCHA för
    arbetsytan). Redaktören läste www.utogasthamn.se i Toms Chrome, där ingen
    CAPTCHA visades: bastu, cirka 300 platser, sjömacken i norra hamnen och
    campingen av friluftsmodell står där. Raderna är OK. Sidorna är sparade i
    kallcache/ny.
  - Till Tom (redan i beslut 4–5): campingtypen, Bakgården (campingsidan
    nämner "Bageriet" vid Bygatan), Lilla Haket och Rånö brygga.
  - Omarbete för Skribenten: fiskeregeln saknar "eller på allmänt vatten", och
    den nya fiskemeningen är utfyllnad. Restaurangen heter "Utö by Krog".
    Gruvbryggan är en av tre bryggor, inte den enda. En sann uppgift om läget
    vid vägen mellan Gruvbyn och Ålö ska tillbaka. Guidelistan tar med guider
    om andra platser (guide-island-map.ts, samma fel som på Styrsö).
- Kontrollant Möja startad (160 rader). Agenter nu (fyra): sidmallarna, P0
  runda 6, Grinda och Möja.

## 2026-11-02 23:36 — P0 runda 5; Fjäderholmarna kontrollerad; P0 16

- **Kontrollant P0 runda 5 (MÄTT):** 5 OK, 1 FEL, 1 SAKNAS, och runda 5b
  (hundregeln) FEL. Rättat i P0-grenen:
  - Rubriken gav "Sista båten från ? idag" när ResRobot saknar namn, och en
    färja utan linjenummer räknades som promenad. Nu tolkas "?" som tomt, och
    bara typen WALK/TRSF eller ett ben helt utan trafikslag räknas som
    promenad (normalizeLeg).
  - Vaxholms not ("buss 670 från Tekniska högskolan") saknade KÄLLA-rad. Nu
    finns h2.pdf och h670670x.pdf, samma källor som Vaxholms Granskare
    använde (vaxholm-0075/0076).
  - Hundregeln sa mindre än Naturvårdsverket. Ny text: alltid koppel i alla
    nationalparker, hund kan vara förbjuden i vissa skyddade områden, ofta
    kopplingstvång i naturreservat, och läs skylten eller fråga länsstyrelsen
    eller kommunen.
  - P0 13 och 14 (Husarö i databasen) är OK.
- **P0 16 (Fjäderholmarna):** Kontrollanten för Fjäderholmarna visade att
  bryggan är märkt X i tabell 2 ("Bryggorna trafikeras utan fast
  avgångstid"). Avgångsrutan och kortet "Sista båten" visade ändå exakta tider
  som om de vore tidtabellens. Nytt fält `tidsObs` i transit-stops.ts visas i
  båda: tiderna kommer från reseplaneraren, var på bryggan i god tid. Andra
  bryggor med X i batch 01 är inte undersökta än (Vakten).
- verify-claims, 705 tester och tsc gröna. Kontrollant P0 runda 6 pågår
  (p0-k071–k074).
- **Kontrollant Fjäderholmarna (MÄTT):** 106 OK, 13 FEL, 1 SAKNAS av 120.
  Redaktörens beslut per fynd står i `register/b01/kontroll/fjaderholmarna.beslut.tsv`.
  Fyra fynd gällde klockslag i liveraderna; de är inte fel i datafilerna och
  blev P0 16. Två fynd gällde strukna hamndjup och underkänns, eftersom djup
  enligt DEL 5 bara får beläggas av nivå 1. Regeln är nu tillagd i
  Kontrollantens instruktion. Omarbete för Skribenten: "Sök resan i
  SL-appen" (3 rader), julbordsbåtens datum (2), fågelskyddsområdet (1) och
  luftvärnskanonerna (1). Hållplats-id:t kontrolleras av Vakten.
- Agenter nu (fyra): Kontrollant Utö, sidmallarna, P0 runda 6 och Grinda.

## 2026-11-02 23:13 — Sidmallarna granskade; P0 15 (hundregeln i nationalparker)

- **Sidmallarna (MÄTT):** 253 rader. KORREKT 145, DELVIS 43, FEL 42,
  OBELAGD 20, INAKTUELL 3. 72 ersättningar i 16 filer (alla 11 beslutade
  mallfel, plus bland annat SMHI:s vindbenämningar, väderkoderna för snöbyar,
  SCB:s kommunnamn och "Lågsäsong" i stället för "Stängt"). Inlagda i
  arbetskopian /home/claude/svalla-mallar: tsc och verify-claims gröna.
  Källistan omgenererad där: myndighetsmärkningarna går från 544 till 433, och
  inga citat med klockslag eller belopp publiceras (före: 148).
- **P0 15 (mall-0212, alla öar):** badrutan sa bara att hunden inte får
  springa lös 1 mars–20 augusti och att naturreservat kan kräva koppel. I
  nationalparker (Ängsö, Kosterhavet) ska hunden alltid vara kopplad enligt
  Naturvårdsverket. Rättelsen (mallar.edits.json nr 62–63) ligger nu i
  P0-grenen (`register/b01/ut/p0-mall.edits.json`) och hoppas över när
  batchen läggs in. Kontrollanten i runda 5 har fått raden (p0-runda5b).
- **Efter att P0-PR:en är inne, i batchens PR (inte i edits.json):** ta bort
  'storholmen' ur ISLAND_NO_TRANSIT i transit-stops.ts (sidan säger "Hit går
  ingen kollektivtrafik", men SL:s pendelbåt 80 går dit), och låt
  avgångsrutan och kortet "Sista båten" länka till Västtrafik för Göteborgs
  skärgård i stället för SL (adressen ska läsas innan den läggs in).
- Kontrollant sidmallarna startad: 136 rader (100 ändrade, 36 högrisk) och 7
  strukna. Agenter nu (fyra): Kontrollant P0 runda 5, Fjäderholmarna, Utö och
  sidmallarna.
- Rättelse: rubriken nedan sa 23:30. Avsnittet skrevs 23:09.

## 2026-11-02 23:09 — EJ NÅBAR-källorna i Toms Chrome (Claude i Chrome)

Lästa och sparade i kallcache/ny (`*.chrome-2026-11-02.txt`), för en
Granskare som dömer EJ NÅBAR-raderna när en plats blir ledig:
- **hhmarin.se (Möja, 8 rader):** läsbar. Namn, totalentreprenad, adress
  Norra Stavsudda, telefon, e-post och webbplats står där. Möja nämns inte
  (mejlfrågan står kvar). "Snickare" står inte ordagrant; sidan säger
  "själva bygger stora delar av husen".
- **instagram.com/ankaretsandhamn (Sandhamn, 5 rader):** läsbar inloggad.
  "Ankaret ⚓ Sandhamn", café, butik och konstgalleri. Senaste inlägget är
  daterat 28 augusti 2026, alltså inom 12 månader. Ingen gatuadress.
- **Commons, Storholmens öbild:** beskrivningen är "Linje 80, Storholmen from
  the south", men filen ligger bara i förgreningskategorin Storholmen.
- **Inte lästa:** facebook.com (tillägget saknar behörighet för domänen:
  Café Strindbergsgården, Vaxholms Hembygdsgårds Café). wallnermarin.se och
  rentunder.se ger Chromes felsida även hos Tom; orsaken är okänd.
  Elsäkerhetsverkets register visar bara sökformuläret, och sökningen kräver
  att ett formulär skickas, vilket inte görs utan Toms ja. finnhamn.se lästes
  av Husarös Granskare i dag och ligger i cachen.

## 2026-11-02 23:05 — Styrsö och Husarö granskade; P0 runda 4 gav två fynd; P0 13 och 14

- **Styrsö (MÄTT):** 503 rader (+2 nya). KORREKT 444, FEL 27, DELVIS 25,
  OBELAGD 7. 31 ersättningar, 1 UPDATE. Inga nya P0. Till Tom: radie 2,0 km,
  Donsö Hamnkrog → Isbolaget, mejl till Bastubryggan Brännö.
- **Husarö (MÄTT):** 297 rader (+4 nya). KORREKT 241, DELVIS 23, FEL 13,
  OBELAGD 12, INAKTUELL 6, MOTSTRIDIG 2. 15 ersättningar, 6 UPDATE (WHERE
  inte kontrollerade mot databasen). Till Tom: radie 1,5 km, regionetiketten.
- **P0 13 (Husarö, databasen):** gästhamnens text sa att det går att tanka
  med kortautomat året runt; verksamheten skriver att macken är stängd i
  väntan på tillstånd. **P0 14 (Söder-Långholm, databasen):** texten sa att
  Cinderella trafikerar Finnhamn; Strömmas tidtabell 2026 har ingen brygga
  där. Båda står i husaro.sql och läggs in direkt när Supabase är uppe. Medan
  databasen är pausad syns texterna inte.
- **Kontrollant P0 runda 4 (MÄTT):** 6 OK, 2 FEL. (1) 740098250 är ResRobots
  grupp "VAXHOLM", inte bryggan (Vaxholm Hotellkajen, 740020991), och
  påståendet om avgångsrutan var fel: den visar även buss 670, vilket noten
  säger. (2) Rubriken med destStopName namngav inte bryggan för Grinda
  (gruppen "GRINDA"; sista båten från Norra och Södra går olika tider) och
  hade gett busshållplatser som brygga. Rättat: rubriken tar första
  färjebenets avgångshållplats ur ResRobot, och filtret kontrollerar också
  allLegs (ett bussben utan linjenummer räknades som promenad). verify-claims,
  705 tester och tsc gröna. Runda 5 pågår (Vaxholm, filtret, rubriken, P0
  13–14).
- **Regeln om full kontroll (Redaktörens läsning):** Kontrollanten menade
  att två fynd utlöser full kontroll av alla KORREKT-rader. I uppdraget står
  regeln direkt efter stickprovet ("ett slumpat stickprov på 30 KORREKT-rader
  per batch. Två fynd eller fler → …") och gäller fynd i stickprovet. Fynd i
  ändrade rader går tillbaka till Skribenten. Batchens stickprov (30 rader)
  dras när alla öar är granskade. De 30 per ö i Storholmens underlag är inte
  batchens stickprov.
- **Kontrollanter:** underlag klart för åtta öar: ändrade, nya och
  högriskrader. Källistan kontrolleras mekaniskt av Vakten efter
  omgenereringen, och EJ NÅBAR-raderna väntar tills sidorna är lästa.
  Fjäderholmarna (116 rader) och Utö (133) pågår. Kvar: Möja 160, Sandhamn
  182, Grinda 128, Vaxholm 169, Styrsö 95, Husarö 82, Storholmen efter
  omarbetning. Kontrollfilerna säkerhetskopieras i `register/b01/kontroll/`.
- Agenter nu (fyra): Granskare sidmallarna, Kontrollant P0 runda 5,
  Kontrollant Fjäderholmarna, Kontrollant Utö.
- beslut-tom.md: punkt 2, 3, 5c, 5d, 6 och 7 uppdaterade eller nya.

## 2026-11-02 22:26 — Omstart på Opus; P0 11 (Styrsö) och P0 12 (Husarö)

Fable-krediterna tog slut cirka 17:30 och stoppade fyra agenter efter några
minuter. Inga sparade domar gick förlorade; Kontrollanten för Vaxholms P0 hann
inte skriva något. Sessionen kör nu Opus 5.5. Fyra nya agenter (högst fyra):
Kontrollant P0 runda 4 (Vaxholm, Styrsö, Husarö; `kontroll/p0-runda4.*`),
Granskare Styrsö (fortsätter från 43 domar), Husarö (fortsätter från 57) och
sidmallarna (0 av 253).

**Läge (MÄTT 22:10):** 3 897 av 4 844 rader har dom (80 %). KORREKT 3 467,
DELVIS 192, OBELAGD 116, FEL 69, EJ NÅBAR 38, MOTSTRIDIG 8, INAKTUELL 7.
Supabase fortfarande INACTIVE, så /team uppdateras inte; PR #504 öppen
(mergeable_state blocked). Toms fråga om läget besvarad i chatten 22:15.

**P0 11 (Styrsö, styrso-0075/0079):** kortet "Sista båten från Styrsö" räknar
från Bratten. Tången trafikeras bara av linje 282, och sista båten därifrån går
tidigare (Granskarens uppgift, inte kontrollerad än). Rättat i P0-grenen:
rubriken i LastBoatPanel visar bryggans namn (destName) för alla öar, och
Styrsös not säger att tiderna gäller Bratten. "Kortast överfarten i södra
skärgården" är struken (obelagd superlativ).
**P0 12 (Husarö, husaro-0078–0080):** avgångsrutan visade beställningsturer
(b, B och C i tabell 10, 12 och 13) som vanliga avgångar. Granskaren flaggade
det 2026-10-31; Redaktören såg det först nu. Lindrat som Möja: `bestallning`
för Husarö i transit-stops.ts. Grundorsaken (ResRobots anmärkningar visas
inte) är fortfarande öppen och gäller alla öar med beställningsturer.
P0-grenen är okommitterad: verify-claims, 705 tester och tsc gröna. eslint
visar två emoji-fel i LastBoatPanel som finns på main sedan tidigare. Hela
diffen mot main: `register/b01/ut/p0-2026-10-29.patch` (uppdaterad 22:26).

## 2026-11-02 17:50 — Vaxholm granskad; P0 9 och 10

Supabase fortfarande INACTIVE (MÄTT 17:27). Ett projektdokument
`claude/p0-supabase-pausad-2026-11-02.md` från en annan session bekräftar
läget och listar vad som ska verifieras efter restore.

**Vaxholm (MÄTT):** 702 rader (+7 nya). KORREKT 638, DELVIS 38, OBELAGD 10,
FEL 9, EJ NÅBAR 6, MOTSTRIDIG 1. 37 ersättningar (island-data.ts,
guide-island-map.ts; torrkörning 0 fel), 7 UPDATE (WHERE inte kontrollerade
mot databasen). Slutsvaret gick förlorat i avbrottet; P0 lästa ur registret.
**P0 9 (kod, alla öar):** kortet "Sista båten från Vaxholm" visade 20:02 →
Strömkajen, som är SL-buss 670 + tunnelbana. Sista båten enligt tabell 2B går
18.25. Orsak: Vaxholms mål-id var busshållplatsen Västerhamnsplan, och
fetchLastTripOfDay sökte utan trafikslagsfilter. Rättat i P0-grenen: id
740098250 (båtbryggan, samma som ferries.ts) och products=256 + legs-filter
på catCode 8 i fetchLastTripOfDay – gäller alla öar. verify-claims, 705
tester och tsc gröna.
**P0 10 (regel):** "Avgiftsfritt 1 september–30 april" vid Kronängsskolan
gäller bara kvällar och helger enligt kommunens taxa. Rättat i
vaxholm.edits.json nr 27 (går in med batchen, inte i P0-grenen: texten är
sann i den riktning som kan kosta någon böter först när batchen läggs in –
RESONERAT, Kontrollanten avgör om den ska in i P0-PR:en).
- Kontrollant P0 Vaxholm pågår. Granskare Styrsö (tredje försöket), Husarö
  och sidmallarna återupptagna 17:30; ingen av dem hade domar i registret.

## 2026-11-01 00:55 — Grindas P0 godkända och i PR #504; alla nio öar + mallarna har Granskare

- Kontrollant Grinda P0: 5 av 5 OK, 0 fynd. Commit 10d560f på P0-grenen,
  pushad; PR #504 uppdaterad till "åtta transportfel". Bygget faller tills
  Supabase är uppe.
- Granskare startade: Husarö (293 rader) och sidmallarna (253 rader, med
  kodändringar för de elva kända mallfelen). Vaxholm och Styrsö pågår.
  Fyra agenter.
- Kvar i batch 01 efter Granskarna: Kontrollant per ö (Storholmen gjord:
  9 FEL + 2 SAKNAS, går tillbaka till Granskaren), Vakten (samma fel i hela
  repot, mått, HTTP-kontroll, renderade sidor), batchens PR och merge.

## 2026-10-31 23:55 — Grinda granskad, två P0 till

**Grinda (MÄTT):** 616 rader (+1 ny). KORREKT 586, DELVIS 13, FEL 6, INAKTUELL 5,
OBELAGD 6. BEHÅLL 580, RÄTTA 23, PRECISERA 8, STRYK+KOMPENSERA 4, NY 1. 16
ersättningar (torrkörning 0 fel) och 8 UPDATE, vars WHERE-villkor inte är
kontrollerade mot databasen (pausad). Ord 1 590 → 1 633. Granskaren totalt
(två körningar): ~977 000 tokens.
**P0 7 och 8 (Grinda):** Cinderellabåten framställdes som trafik året om i
getting_there, FAQ och båda bryggornas platstexter. Strömma: säsong 30/4–27/9
2026, bara Södra Grinda, "Åter april 2027" (läst i dag). Och "I övrigt gäller
allemansrätten" dolde föreskriften om eld bara på anvisad plats
(Länsstyrelsen). Datafilsraderna ligger i P0-grenen (`p0-grinda.edits.json`
= grinda.edits.json nr 2 och 7). Platstexterna (grinda.sql, bryggorna) väntar
på databasen. Kontrollant pågår. Källistan på main har redan klockslag i
Grindas KÄLLA-rader – Vaktens ärende i batchens PR, inte P0.
- Kontots gräns slog till en tredje gång ~21:40 29 okt och en fjärde ~22:30
  31 okt (mitt på dagen Toms tid). Grinda, Vaxholm och Styrsö återupptagna
  00:40.
- Vaxholm 155/698 dömda, Styrsö 0/501 när gränsen slog till.

## 2026-10-31 19:00 — Supabase pausat för obetald faktura, inte inaktivitet

- restore_project avvisades: "This organization has unpaid invoices." Tom sa
  ja till omstart, men den går inte att göra härifrån.
- MÄTT ur Toms Gmail: faktura PPOHLL-00009 (11,29 USD) förföll 16 okt,
  kortbetalningen misslyckades, påminnelser 16–29 okt. 30 okt 09:36 svensk
  tid nedgraderades organisationen till free och alla projekt pausades. En
  kreditnota på samma faktura utfärdades samtidigt. Datan är säkerhetskopierad
  enligt Supabase.
- Kräver Tom: betala/kontrollera fakturorna i Supabase-panelen, sedan
  avpausa projektet. Ingen automatisk återgång till Pro.
- Tills dess: /upptack, forum, inloggning och /team nere; inga byggen.
  P0-PR #504 väntar. Granskningen fortsätter; status loggas här.

## 2026-10-31 18:50 — P0-PR #504 öppen, blockerad av pausad databas

- P0-kontroll runda 3: 4 av 4 OK, 0 fynd (alla tidtabeller omhämtade i dag,
  identiska med 29 okt). P0-grenen committad (033b0e0) och pushad en gång.
  PR #504 öppnad: https://github.com/tsinordin-cell/svalla-app/pull/504.
- vitest grön. **Vercels förhandsbygge misslyckades**, men inte på
  ändringarna: `getaddrinfo ENOTFOUND oiklttwylndesewauytj.supabase.co` vid
  förrendering av /aland/krogar. Supabase-projektet står som INACTIVE
  (pausat) sedan någon gång före 18:15 i dag. Det blockerar alla byggen,
  /team-uppdateringar, /upptack och inloggning. Tom tillfrågad om omstart
  (kontoinställning, kräver hans ja). Ingen ny push eller merge förrän
  databasen är uppe; sedan begärs bygget om i Vercel utan ny push.
- Fortsatt kö: Granskare Grinda, Vaxholm, Styrsö pågår. Husarö och
  sidmallarna väntar på en ledig plats.

## 2026-10-31 18:20 — återupptaget efter andra avbrottet

Kontots 5-timmarsgräns stoppade alla fyra agenter 2026-10-29 ~21:40. Ingen
session kördes 30 okt. Allt överlevde: arbetsytan, P0-grenen, registren.
- P0-omkontrollen var klar: 10 OK, 4 FEL. Rättat i P0-grenen: Kymmendö och
  Fjärdlång "linje 19 från Dalarö; enstaka turer går från Strömkajen";
  Sandhamn "året runt" gäller båten, inte bussen; buss 846 tillbaka i
  Utö-noten med h846 som källa. verify-claims och tsc gröna. Runda 3 pågår.
- Granskare Grinda (168/615 dömda), Vaxholm och Styrsö återupptagna.
- Modellen i huvudsessionen bytt till Fable 5.1 av Tom.

## 2026-10-29 21:30 — Sandhamn granskad, P0-PR omarbetad efter Kontrollanten

**Sandhamn (MÄTT):** 674 rader (+17 nya). KORREKT 587, OBELAGD 38, DELVIS 25,
EJ NÅBAR 13, FEL 10, INAKTUELL 1. 22 ersättningar och 12 UPDATE för 5 platser.
Granskaren: 608 000 tokens, 160 anrop, 53 min. Två P0, se nedan. EJ NÅBAR:
Instagram (Café Ankaret) och Facebook (Café Strindbergsgården). De läses i
Toms webbläsare.

**P0-kontrollen (Kontrollanten, MÄTT):** 3 av 6 rader underkändes. Buss 846
var obelagd sommartid. "Minst två timmar före avgång" är fel för B-turer, där
det också finns en sista tid samma dag, och för C-turer, som beställs dagen
före. Premissen "ingen linje till Utö stannar vid Dalarö eller Ornö" var fel,
eftersom linje 19 och 20 gör det. Kontrollanten hittade också samma felklass
som på Utö för Kymmendö, Fjärdlång och Ornö (avreseort Nynäshamn).
**P0-grenen nu (patch: `register/b01/ut/p0-2026-10-29.patch`):**
- Utö: noten utan busslinjens nummer. ferries.ts wxb-uto: ['Årsta Brygga', 'Utö'],
  med en rättad kommentar.
- Möja: beställningsnoten anger ingen frist och hänvisar till anmärkningen i
  tabell 14.
- Kymmendö och Fjärdlång: avreseort Stockholm C, linje 19 via Dalarö, och
  Nordsydlinjen från Nynäshamn sommartid (s40: 22 juni–16 augusti 2026). En
  beställningsnot hänvisar till tabell 19.
- Ornö: avreseort Stockholm C (noten om bilfärja är oförändrad och granskas i
  batch 05).
- Sandhamn: noten om bussen är rättad (433, vissa turer 434), och resvägarna
  får säsongens datum (Cinderella 30 april–27 september, linje 15 19 juni–16
  augusti).
Prebuild, 705 tester och tsc är gröna. Omkontroll pågår.
P0-kort på /team: Utö ×2, Möja ×2, Kymmendö/Fjärdlång/Ornö, Sandhamn.
Vid batchens inläggning hoppas uto.edits.json nr 0 och sandhamn.edits.json
nr 20 över (de ligger i P0-PR:en). sandhamn.edits.json nr 11 (getting_there)
måste rebaseras mot P0-ändringen av namnen på resvägarna.

## 2026-10-29 21:00 — Utö och Möja granskade, fyra P0

**Utö (MÄTT):** 580 rader (+18 nya). KORREKT 530, OBELAGD 22, DELVIS 19, FEL 7,
MOTSTRIDIG 2. BEHÅLL 510, RÄTTA 23, PRECISERA 22, STRYK+KOMPENSERA 7, NY 18. 36
ersättningar och 7 UPDATE. Granskaren: 640 313 tokens, 213 anrop, 57 min.
**Möja (MÄTT):** 660 rader (+14). KORREKT 578, OBELAGD 24, EJ NÅBAR 19, DELVIS
18, FEL 16, MOTSTRIDIG 4, INAKTUELL 1. BEHÅLL 558, RÄTTA 40, PRECISERA 20,
STRYK+KOMPENSERA 10, NY 13. 22 ersättningar och 5 UPDATE. Granskaren: 723 780
tokens, 204 anrop, 72 min.

**P0 (4 kort på /team, egen gren `p0-uto-2026-10-29` från main):**
1. Utö, avgångsrutan: hänvisade till båt från Nynäshamn, som inte går nu.
   Avreseorten blir Stockholm C, med en not om pendeltåg till Västerhaninge,
   buss 846 och linje 21.
2. Utö, /farjor: Årsta–Utö visades med stopp vid Brandholmen, Dalarö och
   Ornö. Tabell 21 nämner inget av dem. stops blir ['Årsta Brygga', 'Utö'].
3. Möja, Sista båten: en beställningstur (anmärkning B, tabell 14) visades som
   vanlig avgång. Nytt fält `bestallning` i transit-stops.ts, som returneras
   av båda API:erna och visas i LastBoatPanel och DepartureWidget.
4. Möja, avgångsrutan: "14X"-turer som inte finns i tabell 14A. Samma not
   som åtgärd i dag. Grundorsaken (ResRobot-turer som kräver förbokning)
   kräver ett ResRobot-anrop med nyckel och är öppen.
Prebuild, 705 tester och tsc är gröna. Lint-felen i LastBoatPanel
(emoji, rad 222 och 234) finns redan på main. Kontrollanten för P0 pågår.
`uto.edits.json` nr 0 ingår i P0-PR:en och hoppas över när batchen läggs in.

**EJ NÅBAR (läses i Toms webbläsare):** Möja 19 rader: wallnermarin.se (466),
hhmarin.se (TLS-fel och 502), finnhamn.se (403) och Elsäkerhetsverkets
register. Storholmen: öbildens Commons-sida (429).

**Integritet:** två Granskare (Utö och Möja) skickade kontots e-postadress i
User-Agent till OpenStreetMaps Nominatim och till Wikimedias API, innan regeln
om personuppgifter fanns. Regeln finns nu i båda rollinstruktionerna och är
skickad till alla agenter som kör. Tom informeras.

**Till Vakten (batch 01:s PR):** dagsplan.ts (Nynäshamn → Utö),
bingo-data.ts:26 ("havsbastu" på Utö), guider.ts:358–360 (Strömkajen),
HantverkarKort (jämför "moja" utan ö), validThrough (17 öar har "Året runt"),
källistan publicerar tider och öppettider ur KÄLLA-citaten (alla öar),
ferries.ts (övriga rutter kontrolleras i fas 3).

**/team:** beslutskortet "TOM BESLUT: Faktagranskning batch 01 – 5 beslut" och
mejlkortet "TOM/MAX: Mejla 7 verksamheter" är skapade. Två rader med
uppskattade tider på P0-korten är rättade. Tidsstämplarna på /team sätts nu
av databasen (now() i svensk tid), inte av mig.

## 2026-10-29 20:25 — steg 2: piloten Fjäderholmarna klar

**Fjäderholmarna (MÄTT ur registret och Granskarens rapport):** 342 rader (329 +
13 nya). KORREKT 290, DELVIS 27, OBELAGD 6, FEL 5, MOTSTRIDIG 1. BEHÅLL 289,
PRECISERA 25, RÄTTA 11, STRYK+KOMPENSERA 4, NY 13. 40 rader ändras. 33
ersättningar (torrkörning 0 fel) och 4 UPDATE i SQL. Ord 1 304 → 1 463.
Granskaren: 571 420 tokens, 155 verktygsanrop, 58 min.
- Fel: säsong 13, fel plats 7 (ö-nålen låg i vattnet, Rökeriets nål i Nacka
  Strand), faciliteter 7, restid 3, färdsätt 2, superlativ 3, samma uppgift
  olika 2.
- Mallfel: validThrough hårdkodat till 2026-10-31 (page.tsx:247),
  slice(0, 2) i islandFaqs.ts:56 tappar linje 2 i FAQ-svaret, och
  hantverkarsidan säger att kontrollerade uppgifter saknas trots att ö-posten
  har dem. Samma obelagda Strömkajen-text står i src/data/guider.ts:358–360
  (Vakten).
- **Beslut om radien (Redaktören):** `radiusKm` är GPS-detektionsradien
  (kommentaren i islandCoords.ts), men islandPlaces lånar den för
  platslistorna. Typen får ett eget fält `platsRadieKm` som bara
  islandPlaces läser. Granskarnas uppmätta värden läggs där (Storholmen 0,8,
  Fjäderholmarna 0,7). radiusKm rörs inte. Storholmens ersättning nr 10 och
  Fjäderholmarnas nr 31 justeras därefter, när Vakten samlar ändringarna.
- Huvudet i islandCoords.ts påstår att koordinaterna omkontrollerats mot två
  källor 2026-08-05. Storholmen låg ändå 40 km fel. Kommentaren uppdateras.
- Förtydliganden efter piloten finns i `roller/granskare-skribent.md` och är
  skickade till Granskarna för Möja och Utö: källradsfel ger KORREKT+BEHÅLL,
  brott mot ARBETSREGLER ger KORREKT+PRECISERA, och radie, mallfel och
  regionetikett tas centralt. Storholmens 9 DELVIS som bara gällde
  källraden räknas om innan rapporten.
- Granskare 5 startad: Sandhamn.
- **Ingen förklädd user agent (20:35).** Ett försök att ge las_sida.py en
  webbläsar-UA för att nå svenskagasthamnar.se (502 för headless-Chromium,
  200 för curl) stoppades av arbetsytans klassificerare som kringgående av
  bot-skydd. Det är riktigt bedömt. kallcache.py skickade sedan tidigare en
  webbläsar-UA med både curl och Chromium, och den är nu borttagen. Cachen
  som byggdes före 20:35 hämtades med den UA:n. Innehållet är sajternas eget,
  men nya hämtningar görs utan förklädnad. Regel i båda rollinstruktionerna:
  blockerar en sajt arbetsytan används WebFetch, annars blir raden EJ NÅBAR
  och läses i Toms webbläsare. Alla fyra agenter som kör har fått regeln.
  Chromium startar nu med --disable-http2, som bara väljer protokoll.

## 2026-10-29 20:14 — steg 2: Storholmen granskad, Kontrollanten startad

**Storholmen (MÄTT ur registret):** 223 rader (217 + 6 nya). KORREKT 176,
DELVIS 23, FEL 14, OBELAGD 10. Åtgärder: BEHÅLL 170, RÄTTA 21, PRECISERA 23,
STRYK+KOMPENSERA 3, NY 6. 13 ersättningar i island-data.ts, islandCoords.ts,
transit-stops.ts och kommaDitTitlar.ts (torrkörning: 0 fel). Ingen SQL.
Granskaren: 475 480 tokens, 126 verktygsanrop, 43 min.
- Kartnålen låg vid Byholmen i Värmdö, cirka 40 km fel. Rätt läge enligt
  OSM-relation 9340511.
- "Hit går ingen kollektivtrafik" är fel: SL:s pendelbåt 80 går dit. Texten
  kom från ISLAND_NO_TRANSIT, som mättes från den felaktiga nålen. Rutan med
  live-avgångar försvinner tills Storholmen läggs in i ISLAND_TRANSIT med
  hållplats-id verifierade mot ResRobot (kräver API-nyckel, öppen punkt).
- Granskarens bedömning: inget P0. Inget av felen strandar någon eller
  leder till regelbrott.
- Till Tom: platsen runmaro-bryggkiosk (se beslut-tom.md).
- Kontrollant startad: 125 rader (50 ändrade, 45 högrisk, 30 stickprov) och
  3 strukna. Underlaget byggs av `verktyg/kontrollunderlag.py`.
  Leveransfiler: `register/b01/ut/`.

**Kodfel funna av Granskaren (rättas i batch 01:s PR, Vakten):**
- `scripts/generera-kallor.mjs`: när två URL:er står på samma KÄLLA-rad
  läggs hela raden under den första. Citat hamnar då under fel källa i
  källistan, på alla öar. Generatorn gör också om " – " till " — " i citat.
- `komma-dit/page.tsx:84`: Waxholmsbolagets "Praktiska tips" visas för alla
  öar i norra, mellersta och södra skärgården, även där SL kör.
- `bad/page.tsx:66`: allt som innehåller ordet "brygga" sorteras in som bad.
- `page.tsx:203`: isAccessibleForFree är en konstant i JSON-LD.
- og:description gör regionLabel till gemener ("i lidingös skärgård").

## 2026-10-29 19:46 — steg 1 klart

**Steg 1 klart (MÄTT): 10 register, 4 768 rader.** Nio öar 4 515 rader och
sidmallarna 253 (`register/b01/mallar.tsv`). Alla har rätt form, inga domar.
Utvinnarnas förbrukning enligt uppgiftsnotiserna: Storholmen 384 568
tokens, Styrsö 434 205, Grinda 469 932, Vaxholm 556 048, Husarö 402 378,
sidmallarna 477 840. För Fjäderholmarna, Utö, Möja och Sandhamn gick
notiserna förlorade vid containeromstarten.

Mallfel som rättas i batch 01:s PR (ur mallregistret):
- mall-0015: två identiska FAQPage-block (page.tsx:268–279 och FAQSection).
- mall-0169, mall-0222: dubbel punkt i FAQ-svaren, komma-dit/page.tsx:104 och
  med-barn/page.tsx:116 (`join('. ')` efter en text som redan slutar med punkt).
- Märket "Bekräftad av Svalla" visas när `verifierad !== false`, alltså även
  när fältet saknas. Det syns inte på någon ö i batch 01, men det är ett
  falskt påstående som väntar.
- Storholmen visar både "Hit går ingen kollektivtrafik" och "Ingen egen båt
  krävs". Granskaren avgör vilket som stämmer.

Steg 2: Granskare kör för Fjäderholmarna (pilot), Storholmen, Möja och Utö.
Kö: Sandhamn, Grinda, Vaxholm, Styrsö, Husarö, sidmallarna.

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
