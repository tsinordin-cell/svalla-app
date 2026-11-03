# Omarbete Husarö och Styrsö efter Kontrollanten – batch 01 (2026-11-03)

En rad per ändrad registerrad (kid / register-id). «edits nr» räknas från 0 i öns edits.json. Allt som är läst i den här omgången har läsdatum 2026-11-03.
Registren i docs/faktagranskning/register/b01/ är uppdaterade med skript (kolumnen kontrollant tom); kontrollera_register.py: inga formfel.
Torrkörning (applicera.mjs --torr): husaro.edits.json 15 ersättningar ok, 0 fel; styrso.edits.json 31 ok, 0 fel; båda tillsammans ger giltig TypeScript-syntax.
Databasen lästes 2026-11-03 (bara SELECT): alla FÖRE-värden i WHERE i husaro.sql och styrso.sql stämmer med databasen i dag (husaro-gasthamn-cafe, soderlangholm, karran, vrango-gasthamn).
Skript och nedladdade källor: work-omarbete-hs/ (skript/, dl/). Nya källtexter i kallcache/ny/ med suffixet .2026-11-03.

## Husarö
Filer: ut/husaro.edits.json (nr 6, 8 och 11 omskrivna), ut/husaro.sql (Söder-Långholm: KÄLLA-kommentarer, huvudet), register/b01/husaro.tsv.

Restiderna (h10, h12, h13 hämtade igen 2026-11-03, md5 som Kontrollantens kopior; tiderna MÄTTA tur för tur ur PDF:ernas textlager, dagarna efter DAG-radens läge, h12:s tabellhuvud avläst i sidbilden eftersom det inte är sökbar text):
- husaro-k017 / husaro-0018: Dom FEL, RÄTTA. «Ca 3–4 tim» → travel_time «2 tim 20 min–5 tim med Waxholmsbåt från Strömkajen (linje 12/13, vår- och hösttidtabellen 2026; 2 november–12 december 3 tim 5 min–5 tim); 35–60 min från Åsättra på Ljusterö (linje 10)» (edits nr 6). Den gamla KÄLLA-raden citerade h12:s GÄLLER-rad, som inte går att söka fram i h12.pdf; den citeras nu ur h13.pdf.
- husaro-k102 / husaro-0021: Dom FEL, RÄTTA. «Snabbast 3 tim 5 min» gäller först från 2 november; snabbast i vår- och hösttabellen är 2 tim 20 min (söndag, tur 1273, 2 april–18 juni). Samma travel_time.
- husaro-k010 / husaro-0022: Dom DELVIS, RÄTTA. Åsättra–Husarö 35–60 min (C-turerna 1001/1021 35 min, B-turen 1011 60 min, övriga 16 turer 45–55 min). Samma travel_time.
- husaro-k089 / husaro-0025: Dom FEL, RÄTTA. ✓ Källbelagd stod på en obelagd restid; restiden är nu uppmätt med period i KÄLLA-raderna, facts_provenance.travel_time står kvar som 'matt'.
- husaro-k105 / husaro-0160: Dom FEL, RÄTTA. getting_there[0].time «ca 3–4 tim» → «2 tim 20 min–5 tim enligt vår- och hösttidtabellen 2026» (edits nr 8).
- husaro-k067 / husaro-0163: Dom FEL, RÄTTA. desc: spannet 2 tim 20 min–5 tim och 3 tim 5 min–5 tim 2 november–12 december i stället för «snabbast 3 tim 5 min» (edits nr 8).
- husaro-k116 / husaro-0168: Dom DELVIS, RÄTTA. desc: Åsättra 35–60 min (edits nr 8).
- husaro-k112 / husaro-0169: Dom DELVIS, PRECISERA. desc nämner b, B, C och c (c vid Husarö i tabell 13, avgångarna mot Stockholm) och fristerna utan klockslag, med samma lydelse som den godkända beställningstexten (P0 12) (edits nr 8).
- husaro-k050 / husaro-0194: Dom DELVIS, RÄTTA. tips[1]: «35–60 minuter enligt vår- och hösttidtabellen 2026, de flesta turer 45–55 minuter. De kortaste turerna och den längsta går bara om resan har beställts i förväg.» (edits nr 11).
- husaro-k040 / husaro-0197: FAQ på /o/husaro, byggs ur getting_there[0]; Dom DELVIS, RÄTTA (följer av 0163, 0168, 0169).
- husaro-k028 / husaro-0284: FAQ på /komma-dit; som 0197.
- husaro-k075 / husaro-0293: FAQ på /med-barn; som 0197.
- husaro-k003 / husaro-0285: FAQ «Behöver man en egen båt …»; Dom DELVIS, RÄTTA (följer av 0160).
- husaro-k066 / husaro-0286: FAQ «Hur lång tid tar båten …»; Dom DELVIS, RÄTTA (följer av travel_time).
- husaro-k107 / husaro-0292: FAQ på /med-barn; Dom DELVIS, RÄTTA (krogdelen oförändrad, restiden följer av travel_time).
- husaro-0211: Källistan: ny text och läst – GÄLLER-raden citeras ur h13.pdf och h10.pdf; h12-raden anger perioden som avläst text.
- husaro-0212: Källistan: ny text «söndag förmiddag 3 tim 5 min (tur 1271), snabbast 2 november–12 december»; läst 2026-11-03.
- husaro-0213, 0214, 0215, 0218, 0219, 0220: Källistan: läst 2026-11-03 (mätningarna står kvar i de nya KÄLLA-raderna).
- husaro-0222, 0223, 0224: Källistan: ny text «Åsättra–Husarö 35–60 min utan klockslag; C-turerna och B-turen går efter beställning, övriga 16 turer 45–55 min».

Övrigt:
- husaro-k021 / husaro-0002: Dom FEL (Österåkers kommun «Långt ut i Österåkers yttersta skärgård», husaro.se «norra ytterskärgården»), RÄTTA utan ändring i edits.json: etiketten är Toms beslut 2. I löptext står «mellersta skärgården» bara i mallmeningarna og:description och twitter:description (page.tsx:77 och :89), som bygger på etiketten; ödatans löptext nämner det inte. Samma påstående i src/app/resetips/trips-data.ts:1034 – för Vakten.
- husaro-k126 / husaro-0003: Som 0002 (regiongruppen, styr också biljettipsen på /komma-dit).
- husaro-k027 / husaro-0016: Dom OBELAGD, åtgärd STRYK+KOMPENSERA (mallen, mall-0008). Husarö Handels «Avgift är beroende av säsong» gäller gästhamnsavgiften och är borttagen ur raden; källa och citat tomma.
- husaro-k007 / husaro-0147: Dom KORREKT (KÄLLA-rad ny), BEHÅLL. oct-entreprenad.com nåddes i Chromium (502 vid flera försök, svar 200 två gånger; curl återställs). Sidan «Byggfirma Värmdö»: «Ditt lokala byggföretag på Värmdö». Krock: grinda.edits.json nr 13–14 byter ort och bas till «Stockholms skärgård» med KÄLLA «Ingen ort eller adress på webbplatsen» – Redaktören avgör; ingen ändring i husaro.edits.json.
- husaro-k005 / husaro-0281: Dom FEL (P0 14, Cinderella), RÄTTA. Texten i husaro.sql oförändrad; raden har nu källor för alla uppgifter i den nya texten: Strömmas tidtabell 2026 (ingen Finnhamn), Skärgårdsstiftelsen (Waxholmsbolaget året runt), svenskagasthamnar.se (40 m, 30 platser, sydväst, farleden, dass, sopmaja), Länsstyrelsen (restaurang och handelsbod på Stora Jolpan, markägare), Finnhamns Arkipelag (sopmaja och mulltoa), Lantmäteriet (Österåker). husaro.sql: KÄLLA-kommentarerna omskrivna, läst 2026-11-03.
- husaro-0271: KÄLLA-rad ny: Länsstyrelsen «Gästhamn finns i Djupfladen, vid Söder-Långholm och nedanför vandrarhemmet.» och finnhamn.se.
- husaro-0272, 0273, 0274, 0275: Läst 2026-11-03 (svenskagasthamnar.se igen); rätt uppgift: nivå 3, ingen nivå 1–2-källa anger mått, läge eller antal och ingen säger emot.
- husaro-0276, 0277: Ny källa vid sidan av nivå 3: Finnhamns Arkipelag «Här finns sopmaja och mulltoa.»
- husaro-0278, 0279: KÄLLA-rad ny: Länsstyrelsen «på Stora Jolpan finns bland annat vandrarhem, restaurang, tältplats och handelsbod».
- husaro-0280: Länsstyrelsen «Markägare: Skärgårdsstiftelsen», «Förvaltare: Skärgårdsstiftelsen» (naturreservatet) vid sidan av svenskagasthamnar.se.
- husaro-0282: Skärgårdsstiftelsen «Finnhamn nås med reguljär båttrafik från Stockholm, året runt med Waxholmsbolaget.» och h13.
- husaro-k080 / husaro-0078: Utgår enligt beslutet; raden oförändrad.

## Styrsö
Filer: ut/styrso.edits.json (nr 1, 3 och 7 ändrade), ut/styrso.sql (ny UPDATE för vrango-gasthamn, huvudet), register/b01/styrso.tsv.

- styrso-k061 / styrso-0021: Dom DELVIS, RÄTTA. Skäret 13–36 min: MÄTT i tabell 281–282 (gäller 24 aug–12 dec 2026), lördagens tidiga tur på linje 281 Saltholmen → Vrångö → Skäret i omvänd riktning tar 36 min («( ) Anlöps i omvänd riktning.»). travel_time och KÄLLA-raden i edits nr 3.
- styrso-k033 / styrso-0020: Ny text med Skäret 13–36 min; läst 2026-11-03 (Bratten 14–30 och Tången 24–41 mätta igen och oförändrade).
- styrso-k120 / styrso-0022: Som 0020.
- styrso-k051 / styrso-0420: FAQ på /komma-dit, ny text «Restid till Styrsö: 14–30 min till Bratten, 13–36 min till Skäret och 24–41 min till Tången …».
- styrso-k028 / styrso-0435: FAQ på /med-barn, restiden följer av travel_time; antalet krogar ligger kvar hos radieförslaget i styrso.tom.md.
- styrso-k042 / styrso-0422: Ingen ändring i ödatan: Gröna vik står inte i Styrsös data (bara under Brännö). Den kommer med via platsdatabasen (grona-vik-badplats, island = null, 4,3 km bort, inom räckvidden radie 3 km + 2 km) och bad/page.tsx:72–79 lägger den i «Badplatser på Styrsö». Radien är Toms beslut (styrso.tom.md punkt 1, förslag 2,0 km); mallfrågan i slutsvaret.
- styrso-k001 / styrso-0423: Som 0422; antalet blir 2 när mallen bara räknar badplatser på ön.
- styrso-k015 / styrso-0139: Dom DELVIS, RÄTTA: «vattnet kan vara strömt» → «vattnet är strömt i farleden utanför» enligt Göteborgs Stads badplatssida (id=3700) «Var försiktig - vattnet är strömt i farleden!». Ny KÄLLA-rad i edits nr 7; Göteborg & Co-raden har inte längre «kan vara»-citatet.
- styrso-0142: Ny text (samma mening, «är strömt»).
- styrso-k110 / styrso-0080: Ny text «… och utgör den södra delen av skärgårdens centralort …» (Göteborg & Co, läst 2026-11-03); ingen nivå 1-källa om centralorten hittad (edits nr 1).
- styrso-0081: Dom KORREKT → DELVIS, RÄTTA: källan säger «den södra delen av skärgårdens centralort», inte att Styrsö är södra skärgårdens centralort.
- styrso-0085: Ny text (samma beskrivning).
- styrso-k039 / styrso-0493: Dom KORREKT → OBELAGD, STRYK+KOMPENSERA. «Hamndjupet är 3,5–5 meter.» struken (djup bara från nivå 1; enda källan är nivå 3). Ny UPDATE i styrso.sql: «Vrångö gästhamn är gästhamnen på Vrångö i Göteborgs kommun, med plats för cirka 130 gästande båtar och en dagbrygga för kortare besök. Hamnen ligger väl skyddad för vind och vågor, och båtarna förtöjs med fören mot bryggan och fast akterfäste eller boj. I gästhamnen finns toaletter, duschar, tvättmaskin, sopkärl, miljöstation och sugtömning, och i hamnen finns fiskekaj, mataffär och matställen. Skärgårdsbåten lägger till i Mittvik, en knapp kilometer bort på andra sidan ön.» Källans «Ankringsförbud» står inte med (föreskrift). 47 → 73 ord.
- styrso-N003: Ny rad: «Vrångö gästhamn är gästhamnen på Vrångö i Göteborgs kommun» (SEO-meningen; Lantmäteriet «Vrångö», Göteborg; Göteborg & Co).
- styrso-N004: Ny rad: förtöjning med fören mot bryggan och fast akterfäste eller boj (svenskagasthamnar.se «för mot brygga, fast akterfäste el. boj.»).
- styrso-N005: Ny rad: fiskekaj i hamnen (Göteborg & Co).
- styrso-N006: Ny rad: skärgårdsbåten i Mittvik, en knapp kilometer bort på andra sidan ön (Göteborg & Co).
- styrso-0490, 0491, 0492, 0494–0501: Läst 2026-11-03 (svenskagasthamnar.se igen); uppgifterna står kvar i den nya texten.
