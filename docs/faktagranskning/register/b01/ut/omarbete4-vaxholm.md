# Omarbete runda 4 – Vaxholm (Granskare och Skribent, 2026-11-09)

Alla källor lästa 2026-11-09 (kajaksidorna även 2026-11-08): Chromium (las_sida.py; kanotcenter.com utan klick, eftersom las_sida.py klickar sig till /our-story/), curl och pdftotext/pdfplumber för PDF:er, curl med HTTP/1.1 för frode.se (Chromium fick 502 från proxyn), OpenStreetMaps API med paus mellan anropen. Ingen verifieringssida visades. Facebook lästes inte här: Toms beslut 9, avskriften i kallcache/facebook-2026-11-09.txt (punkt 2). Sidkopior, OSM-data och skript: /tmp/claude-0/-home-claude/dab286cd-d211-5dcf-ae13-8cab8efaa49f/scratchpad/b01/omk4-vaxholm/ (texterna även i kallcache/ny/).
Kortnamn: SFV = sfv.se/…/vaxholms-kastell. LM = stockholmslansmuseum.se/besoksmal/vaxholms-fastning/ (länsmuseet). RAÄ = Riksantikvarieämbetets post L2014:2913, pub.raa.se/dokumentation/9181fdb5-…/visning (PDF). BeBR = Bebyggelseregistret, byggnad 21400000444853 (historik ur Stockholms läns museums kyrkokaraktärisering). KOM = vaxholm.se/…/historia. KAN = kanotcenter.com (FAQ på startsidan).

## Ändrade och nya registerrader (118 rader med läst 2026-11-09, varav 16 nya)
Säkerhet först: kajak
- vaxholm-0615: DELVIS, PRECISERA: Lätt gäller bara paddling med guide. Förbehållet skrivs i notes, som /aktivitet/kajak visar direkt ovanför märket; difficulty står kvar, eftersom kortet visar allt utom lätt/medel som Svår och ingen källa belägger Medel. Källa: destinationvaxholm.se, KAN.
- vaxholm-N009: ny mening i notes: den som hyr får före start paddlingsintroduktion, säkerhetsgenomgång och ruttförslag efter erfarenhet och väder. Källa: KAN.
- vaxholm-0618, vaxholm-0234 (full-25 utanför-3): DELVIS, RÄTTA: uthyrning maj–september, guidade turer året runt, i både notes och activities[3]. Källa: KAN.
- vaxholm-0616, 0617, 0619, 0232, 0233, 0235, 0236: KORREKT, lästa igen (citat oförändrade eller bytta till dagens).
Fästningens historia (nivå 1 i stället för fästningsmuseets historiksida, som är nivå 2)
- vaxholm-0046, 0047, 0048, 0051 (did_you_know): FEL, RÄTTA: "blockhus från början av 1500-talet, byggt av Svante Nilsson Sture" och "Gustav Vasa … 1548" → den första kända befästningen var skansen som Gustav Vasa lät bygga 1549–58. Källa: LM, RAÄ.
- vaxholm-0052: DELVIS, PRECISERA: "revs" → stora delar revs. Källa: SFV, LM.
- vaxholm-0053: KORREKT, PRECISERA: "slagits tillbaka" → "stått emot anfall mot Stockholm". Källa: LM. 0054, 0055: KORREKT, KÄLLA-rad ny (LM).
- vaxholm-0049, 0050: KORREKT, lästa igen (SFV, LM).
- vaxholm-0079, 0080, 0081, 0082 (description[0]): FEL, RÄTTA: skansen 1549–58 i stället för blockhus, Sture och 1548. Källa: SFV, LM, RAÄ.
- vaxholm-0083, 0084: OBELAGD, STRYK+KOMPENSERA: ståthållaren och "ny och kraftigare fästning" har ingen nivå 1-källa.
- vaxholm-N013, N014, N015: kompensation i description[0]: Vaxholms militärstrategiska betydelse när Stockholm blev centralort, kedjestängslet och försvarstornet (SFV), beslutet i mitten av 1500-talet om permanent bemanning (KOM).
- vaxholm-0085, 0086: KORREKT, lästa igen; orsakssambandet står hos SFV ("Med sitt strategiska läge … började platsen befästas").
- vaxholm-0087: DELVIS, PRECISERA: den gamla fästningen revs → Meijer rev stora delar och byggde nytt. Källa: SFV, LM.
- vaxholm-0088: KORREKT, KÄLLA-rad ny: byggt 1833–1863. Källa: SFV, LM, RAÄ. 0089, 0090, N004: lästa igen (SFV).
- vaxholm-N011: ny uppgift i description[1]: ombyggnaden sedan Finland blivit ryskt och försvarsbehovet ökat. Källa: SFV.
- vaxholm-0092, 0093: KORREKT, PRECISERA: ordalydelsen följer LM ("stod emot", "under Kristian IV försökte tränga in till Stockholm").
- vaxholm-0094: DELVIS, PRECISERA: "härjade i Stockholms skärgård" står bara hos fästningsmuseet → "när ryssarna försökte detsamma". Källa: LM.
- vaxholm-N012: ny mening i description[2]: "Båda gångerna höll fästningen stånd." Källa: LM.
- vaxholm-N024: kompensation i did_you_know: anläggningen har också kallats Vaxholms fästning och Vaxholms fort, och namnet Vaxholms kastell används sedan 1920. Källa: RAÄ.
- vaxholm-0591, 0592 (insiderTips[1]): FEL, RÄTTA: blockhus och 1548 → skansen 1549–58. Källa: SFV, LM, RAÄ. 0593: DELVIS, källan byts till LM. 0594, 0595: lästa igen.
- vaxholm-0385 (källistan): FEL, RÄTTA: alla KÄLLA-rader med vaxholmsfastning.se/historik/ är borttagna, så posten där "uppdrog" föll bort försvinner när källistan genereras om. Nivå 1-källorna kommer in i stället.
Vaxholms kyrka (nivå 1: BeBR; församlingen bara för nuläget)
- vaxholm-0156, 0157, 0158, 0161: KORREKT, KÄLLA-rad ny: grunden 1760, klar 1803, ritningar av Adelcrantz och Tempelman. Källa: BeBR.
- vaxholm-0159: DELVIS, PRECISERA: "med namnet Gustav Adolfkyrkan" → "som också kallas Gustav Adolfskyrkan" (BeBR:s stavning; när namnet gavs har ingen nivå 1-källa).
- vaxholm-0160, 0162: OBELAGD, STRYK+KOMPENSERA: namnets ursprung och det planerade tornet står bara hos församlingen.
- vaxholm-0163: DELVIS, PRECISERA: "i stället restes en klockstapel" → "i stället finns en klockstapel av trä" (nuläget, församlingen). Källa: svenskakyrkan.se, BeBR.
- vaxholm-0165, 0166, 0167, 0168 (dopfunten; full-18 anm-1): OBELAGD, STRYK+KOMPENSERA: dopfuntens ålder och ursprung har ingen nivå 1-källa, och församlingen säger inte var funten står i dag (den flyttades ut och togs 1835 till Blynäsgårdens trädgård). Meningen är struken.
- vaxholm-N016–N020: kompensation: enskeppig salkyrka i nyklassicistisk stil med vitputsade fasader (BeBR beskrivning), restaureringen 1896 (BeBR), en mindre träkyrka vid fästningssundet sannolikt redan på 1500-talet och Petrikyrkan 1644 (BeBR historiktext), klockstapeln uppförd 1760 (BeBR).
- vaxholm-N021: "Kyrkan har inget torn" (nuläget, församlingen). 0164, 0169, 0170: lästa igen.
Övrigt i arbetslistan
- vaxholm-0378: DELVIS, RÄTTA (KÄLLA-rad): julmarknadens citat får datumraderna med år ("lördag 6 december 2025", "söndag 7 december 2025"). Ösidans mening anger själv 2025 och står kvar. Källa: destinationvaxholm.se/events/vaxholms-julmarknad-2025.
- vaxholm-0550: OBELAGD, STRYK: märket Barnvänlig (child_friendly) borttaget; kommunens badplatssida säger inget om barn. Ingen kompensation: märket bar ingen belagd uppgift, och kommunens alla uppgifter om badet står kvar i posten.
- vaxholm-N023 (full-07 utanför-1): FEL, RÄTTA i databasen: Grönviksbadets adress "Ensjövägen 90, 603 66 Norrköping" → "Grönviksvägen, Rindö". Källa: kommunens badplatssida.
- vaxholm-0147: OBELAGD, PRECISERA: orsakssambandet buss–bro struket; landsförbindelsen 1926 via Pålsundsbron (KOM) och bussen för sig.
- vaxholm-N022: buss 670 mellan Tekniska högskolan och Västerhamnsplan enligt SL:s tabell för hösten 2026. Källa: h670670x.pdf.
- vaxholm-0225: OBELAGD, RÄTTA: Stadspromenaden utan "ner till gästhamnen" från gatunätet. 0227: DELVIS, PRECISERA: gästhamnens utbud enligt kommunen (restaurang, kiosk, butiker i sjöbodar). vaxholm-N010: "Gästhamnen ligger centralt". Källa: KOM, vaxholm.se/…/hamnar-kajer-och-batplatser. 0226: läst igen.
- vaxholm-0599: DELVIS, PRECISERA: "nästan helt byggd i trä" → "till övervägande del av trähus". Källa: KOM. 0600: läst igen.
- vaxholm-0203: DELVIS, PRECISERA: "Mitt på Bogesundslandet" → "som ett slags centrum på Bogesundslandet". Källa: Länsstyrelsen.
- vaxholm-0182: DELVIS, RÄTTA: "innehöll två kaponjärer" → "har två kaponjärer". Källa: sfv.se/…/rindo-redutt.
- vaxholm-0426: KORREKT, KÄLLA-rad ny: Waxholmsbolagets sida om de 44 bryggorna ("året runt", Kastellet). Texten i databasen står kvar.
- vaxholm-0008: KORREKT, KÄLLA-rad ny för weekendresa: kastelletvaxholm.se (27 rum, året runt) och fästningens besöksinfo ("Övernattning … öppet året runt"); dagstur: Waxholmsbolaget.
- vaxholm-0040: OBELAGD, PRECISERA: "första skärgårdsbesöket" → "besök året runt med buss och båt". Källa: Waxholmsbolaget, SL:s tre tabeller. 0038: läst igen.
- vaxholm-0068: OBELAGD, PRECISERA: best "Maj–Juni eller September" → "Maj–september, när kastellmuseet har öppet". Källa: besöksinfo ("Öppettider maj-sept …").
- vaxholm-0069 (OMPROVAS): KORREKT, PRECISERA: SL:s sommartabell s670670x.pdf ("Giltig 19 juni–16 augusti 2026") fyller luckan; de tre tabellerna täcker 14 december 2025–12 december 2026 med turer alla dagar.
- vaxholm-0072: DELVIS, RÄTTA: vår- och hösttabellens period efter GÄLLER-raden (2 april–18 juni och 17 augusti–12 december 2026). Källa: h2.pdf. 0070, 0071: lästa igen (bestReason omskriven, perioder utan klockslag).
- vaxholm-0059, 0065: FEL, RÄTTA: april och oktober open → limited, samma som november (museet stängt, campingen i vinterläge, samma tabell). Källa: besöksinfo, waxholmscamping.com, h2.pdf.
- vaxholm-0103, 0336: DELVIS, PRECISERA: "de flesta turer stannar" vid Nacka strand, Hasseludden och Gåshaga brygga. MÄTT i tabell 2A (pdfplumber): 61 av 89 turer vid Nacka strand, 87 vid Hasseludden och Gåshaga.
- vaxholm-0437: FEL (MÄTT): punkten ligger 857 m utanför Vaxöns polygon. ö-fältet säger redan Bogesundslandet; listningen "på Vaxholm" kommer av mallens radie (Vaktens lista, f26-k052).
- vaxholm-0438: FEL, RÄTTA i databasen: nålen flyttas från stranden till restaurangbyggnaden (OSM way 142454383), 59.392279, 18.328248, 125 m. Källa: tenorok.se/om-oss, OSM.
- vaxholm-0449, 0457, 0676: KORREKT, KÄLLA-rad ny (mätning mot OSM-relationen 4121363 Vaxön): nålarna ligger i vattnet 29, 23 och 34 m från Vaxöns strand; Norrhamnen 4 m från OSM-noden Norrhamnen.
- vaxholm-0655: KORREKT, KÄLLA-rad ny: OSM-noden Vaxholm Bed&Breakfast (Drottninggatan 7) ligger 0 m från nålen.
- vaxholm-0477: KORREKT, KÄLLA-rad ny: frode.se anger besöksadressen Björkstigen 4 och en GPS-position; nålen ligger på OSM-byggnaden Björkstigen 4, 26 m från GPS-positionen. Nålen behöver inte flyttas.
- vaxholm-0677: KORREKT, KÄLLA-rad ny: Waxholms Gästhamn anger "Västerhamnen"; nålen ligger 47 m från OSM:s marina där (stavad "Västerhammen"). Namnet: se Toms beslut 8 nedan.
- vaxholm-0650 (f18-k097, ANM): KORREKT, KÄLLA-rad: citatet rättat till ordagrant "inspirerande" (stod "inspirande") i KÄLLA-raden i edits.json nr 21 och i citatkolumnen för hotellets rader 0273, 0641, 0642, 0645–0651; alla fyra citat lästa igen. Källa: waxholmshotell.se.
- vaxholm-0428, 0429, 0432, 0433 (Vaxholms Hembygdsgårds Café, Toms beslut 9): EJ NÅBAR → KORREKT: namn, kategori Kafé, adressen Trädgårdsgatan 19 och säsongen; senaste inlägget 17 september 2026. Oberoende stöd: kommunens badplatssida nämner "Hembygdsgårdens café". KÄLLA i vaxholm.sql (kommentar).

## Rader i arbetslistan som inte rörts
- vaxholm-0355, 0356 (f02-k078, k079): Generatorn (Vakten) räknar trafikbolagen som myndighet och delar organisationer; mäts om efter inläggningen.
- full-15 utanför-3 (Hamnkrogen: core_experience, menu, tags): fas 2.
- vaxholm-0021 (f26-k052), 0421 (f27-k053), 0561 (f27-k073): mallarnas platslista och Vaktens lista (polygon eller ö-fält i stället för cirkel). Inget i öns data.
- Namnet "Waxholms Gästhamn & Rent Under Båtbotten tvätt" (TOM-flaggan på 0676, 0677): rörs inte; avgörs enligt Toms beslut 8 (fynd nedan).

## Omprövas i slutomkontrollen
- vaxholm-0069 (OMPROVAS i arbetslistan): bussen året runt med SL:s tre tabeller, ny källa s670670x.pdf.
- full-18 anm-1 (OMPROVAS) / vaxholm-0165: dopfuntsmeningen är struken; pröva att ingen text säger att funten står i kyrkan.
- Tidsbundet (förtydligande 15): bestReason (0069–0072) och kaféets säsong läses om före publiceringen.

## edits.json (42 poster) och SQL (10 UPDATE)
- nr 27: parkeringsdelen bort, eftersom den redan finns i main (Vaktens lista, P0 10/#505). "gammal" och "ny" slutar nu före car_parking; resten av posten läggs in. Inga andra poster låg i main: P0 9 var kod utanför filen, och nr 30 (intill P0 17) matchar main.
- Main-kopian uppdaterades 2026-11-08 18:43 (PR #513, Utö). Den rör inga Vaxholm-rader; alla 42 "gammal" står exakt en gång i main.
- Ändrade poster: 1, 2, 3, 5, 7, 10, 11, 12, 15, 20, 21 (hotellets KÄLLA-rad), 24, 26 ("gammal" utökad med did_you_know-raden), 28, 31, 32 ("gammal" utökad med best och months). Nya poster 37–41: seoDescription (KÄLLA), best_for, Stadspromenaden, insiderTips[3], Grönviksbadet (child_friendly bort).
- vaxholm.sql: 2 nya UPDATE (gronviksbadet.formatted_address; bryggan-teno lat/lng) och ett kommentarsavsnitt "Källor utan ändring" (kaféet, fästningskaféet, Norrhamnen, Norrbergshamnen, B&B, Frodé, gästhamnen). SELECT 2026-11-09: alla 10 satsers WHERE träffar exakt en rad. Inget kört.

## Kontroller (MÄTT)
- Torrkörning: `applicera.mjs main-kopia vaxholm.edits.json --torr` → 42 ersättningar ok, 0 fel. TypeScript-parsern: 0 syntaxfel i island-data.ts och guide-island-map.ts efter inläggning.
- Citat: 118 registerrader och 55 KÄLLA-rader (edits.json och sql) med läst 2026-11-09; 361 citat står ordagrant i dagens sparade källtext (citatkoll.py; blanktecken normaliserade, OSM-taggar ur XML). En URL per KÄLLA-rad. Inga klockslag i KÄLLA-citaten (två GPS-angivelser i SQL-kommentaren för Frodé).
- Registret: 719 rader, alla 15 kolumner; kontrollera_register.py: inga formfel, 0 grundrader utan motsvarighet.
- Lag 3: Vaxholm-blocket 2 079 → 2 242 ord (107,8 %). description +88, activity_meta +31, seasonal +23, did_you_know +13, facts +5, activities +4, tips +4, insiderTips −5 (rättelser; inget struket utan ersättning).

## För Redaktören och Vakten
- Toms beslut 8 (MÄTT): gästhamnens egen bokningssida (waxholmsgasthamn.bokamera.se, Waxholms Hamn AB) har "Waxholms Gästhamn & Drive in Boatwash" och "Vår båtbottentvätt finns i Waxholms Gästhamn". Båttvätten finns alltså, men som gästhamnens egen; Rent Under nämns inte. Startsidan kallar hamnen "Vaxholms Gästhamn".
- Samma obelagda historia på andra ställen: blogg/[slug]/page.tsx:372 (KÄLLA-noten: blockhus, Sture, 1548) och :389 (kyrkan: tornet, dopfunten "inne i kyrkan").
- Länsmuseet anger Rindö redutt 1858–1863 och Oscar-Fredriksborg 1870–1877; SFV, som förvaltar dem, 1859–1864 och 1867–1877. Ösidan följer SFV (inte ändrat, inte i arbetslistan).
- Kaféets opening_hours i databasen ("Juni–Augusti", ons–sön) stämmer inte med Facebooksidan; fältet visas inte (verified_at saknas). Fas 2.
- Julmarknaden 2026 är 5–6 december (destinationvaxholm.se/events/vaxholms-julmarknad-2026); ösidans mening om 2025 stämmer och står kvar.
- Bebyggelseregistrets interiörtext och dokumentet Vaxholm.pdf leder till RAÄ:s startsida; därför saknar dopfunten nivå 1-källa.
