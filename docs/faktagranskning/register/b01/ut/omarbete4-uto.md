# Omarbete runda 4 – Utö (Granskaren och Skribenten, 2026-11-09)

Alla källor lästa 2026-11-09 (svensk tid) med curl, Chromium (las_sida.py), pdftotext, Riksantikvarieämbetets K-samsök och Bebyggelseregistret och OpenStreetMaps API med paus mellan anropen; Supabase bara SELECT. Ingen P0. Ingen verifieringssida visades. utogasthamn.se/gasthamnen/ gav 403 i Chromium och avbruten anslutning med curl och är EJ NÅBAR i dag; inget nytt citat bygger på den.
Torrkört mot main-kopian 2a31087 (P0 20 del 2, #514). island-data.ts och islandCoords.ts är oförändrade sedan 85f7415 (git diff). Sidkopior, OSM-data, mätningar och skript: /tmp/claude-0/-home-claude/dab286cd-d211-5dcf-ae13-8cab8efaa49f/scratchpad/b01/omk4-uto/ (texterna också i kallcache/ny, *.2026-11-09*).
Kortnamn: BeBR = Bebyggelseregistret (Utö kyrka: anläggning 21300000004357 och byggnad 21400000445166, historik av Stockholms läns museum 2007; orgeln ur RDF-posten kulturarvsdata.se/raa/bbr/rdf/21400000445166, eftersom interiörsidan leder till raa.se; Utö kvarn och Lurgatan: 21300000013154, byggnadsminne enligt Länsstyrelsens beslut 2001-03-14). Haninge = Haninge kommuns kulturmiljöinventering Utö och Ålö (2017, uppdaterad 2020). LM = Stockholms läns museum, besöksmål Utö. Lst = Länsstyrelsens reservatssidor och beslutet om Ålö-Rånö 2008. Postnumren gäller den nya uto.edits.json.

## Ändrade och nya registerrader (63 ändrade, 12 nya: N020–N031)
1100-talet (nr 10 och nya nr 20)
- 0074: KORREKT → MOTSTRIDIG, PRECISERA: "med början redan under medeltiden, kanske redan under 1100-talet". Lst, LM ("Kanske började …"), Haninge ("troligen").
- 0202: samma i activities[2] ("från medeltiden, kanske redan från 1100-talet"). Ny post nr 20.
Kvarnen och byggnadsminnet (nr 13; texten oförändrad, bara KÄLLA-raderna)
- 0140: KORREKT, KÄLLA-rad ny: Haninge ("sedan länge varit sjömärke och symbol") och LM. Året: se Omprövas.
- 0141: KORREKT, KÄLLA-rad ny: Haninge (restaureringen 1982).
- 0142: KORREKT, KÄLLA-rad ny: BeBR:s lagskydd (byggnadsminne, 3 kap. KML, 2001-03-14), Lst:s lista över byggnadsminnen, Haninge.
- 0144: KORREKT, KÄLLA-rad ny: LM och BeBR (husen uppfördes som bostäder för gruvarbetare).
- 0145: KORREKT, KÄLLA-rad ny: skyddet är nu belagt av nivå 1, och rådet följer av det.
Kyrkan (nr 14, 15 och 25)
- 0146: DELVIS → RÄTTA: uppförd 1848–1849 och invigd i november 1850 (BeBR).
- 0147: KORREKT → PRECISERA: "av sten som togs direkt ur gruvorna" (BeBR).
- 0148: DELVIS → PRECISERA: "Gruvbolaget"; namnet Utö Gruvbolag står bara hos församlingen.
- 0149: KORREKT → PRECISERA: "stod för tomten" (BeBR).
- 0150: KORREKT → PRECISERA: "svarade för … och alla dagsverken" (BeBR).
- 0152, 0153: noterade; kompensationen är nu N007 och N020.
- 0154: KORREKT, KÄLLA-rad ny (BeBR).
- 0155: KORREKT → PRECISERA: "Den byggdes 1745" (BeBR).
- 0156: DELVIS → PRECISERA: byggdes för Holländska reformerta kyrkan och kom till Utö 1838 (BeBR).
- 0157: KORREKT → PRECISERA: den äldsta kända föregångaren, revs 1698 (BeBR).
- 0158: KORREKT → PRECISERA: "Året därpå" i stället för 1699, som nivå 1-källan skriver.
- 0159: KORREKT, KÄLLA-rad ny (BeBR).
- 0160: KORREKT → PRECISERA: "härjades av ryssarna 1719" (BeBR).
- 0161: KORREKT, KÄLLA-rad ny (BeBR).
- 0162: MOTSTRIDIG → PRECISERA: "revs på 1870-talet" (BeBR 1874, Haninge 1878).
- 0335: KORREKT, KÄLLA-rad ny: rådet följer av orgelns historia (BeBR).
- 0336: KORREKT → PRECISERA: "orgeln byggdes 1745" (BeBR).
- 0337: DELVIS → PRECISERA: "för Holländska reformerta kyrkan i Stockholm och kom till Utö 1838" (BeBR).
- N006: KÄLLA-rad ny: BeBR i stället för församlingen.
- N007: "efter ritningar av arkitekten Johan Fredrik Åbom", nu i första meningen (BeBR, LM).
- N020 NY: "beskrivs den som ett monument över öns blomstringstid vid 1800-talets mitt" (BeBR:s värdering).
- N021 NY: orgeln byggdes av Olof Hedlund och kom till Utö 1838 (BeBR).
- N022 NY: "anses vara den äldsta bevarade orgeln i Södermanland" (BeBR, med källans förbehåll).
- N023 NY: åtminstone två föregångare; den äldsta kändes placering är okänd (BeBR).
- N024 NY: det andra kapellet låg på södra Utö (BeBR).
Ålö-Rånö (nr 3)
- 0164: FEL → RÄTTA: Ålö ingår i naturreservatet Ålö-Rånö, "som omfattar öarna Ålö och Rånö med omgivande öar och marina miljöer" (Lst).
- 0172: KORREKT → PRECISERA: "Skogsmarken består till stor del av hällmarkstallskogar" (Lst).
- 0173: OBELAGD → RÄTTA: varken Lst:s sida, beslutet 2008 eller skötselplanen 2008 säger att hällmarkstallskogarna står på kalkpåverkad berggrund.
- 0174: KORREKT → PRECISERA: kalken "ger förutsättningar för en artrik flora i både skog och odlingslandskap" (Lst).
- N025 NY: "genom Ålö går ett stråk av urkalksten och kalkblandad berggrund" (Lst:s beslut 2008-05-16).
Övrigt i datafilerna
- 0188: DELVIS → RÄTTA: "skriver att ön har milslånga grusvägar och stigar som passar både vandrare och cyklister" (Skärgårdsstiftelsen). Nr 17.
- 0362: KORREKT, KÄLLA-rad ny: raderna är delade per URL i nr 5, 9, 27 och 30 och lästa i dag.
- 0344: KORREKT, KÄLLA-rad ny i registret: SAT (etapperna Utö, Ålö, Rånö och Nåttarö hör ihop, Ornö på sommaren, sommarbåten via Dalarö). Fältet related har ingen KÄLLA-rad, så ingen post.
- 0475: OBELAGD → PRECISERA: KÄLLA-raden i ny post nr 33 säger att trails räknar två SAT-sträckor med Utö i namnet, inte alla leder. Fältet visas inte.
- 0325: noterad: nr 8 är omskriven ovanpå P0 20; "med Waxholmsbolagets linje 22" står kvar och bärs av P0:s rad för h22.pdf.
- 0327, 0328, 0329: KÄLLA-rad ny i nr 8, lästa i dag (hundregeln, Lst).
- 0330: KÄLLA-rad ny i nr 8, läst i dag (tältning, Lst).
- 0331, 0332: DELVIS → RÄTTA som förut ("iordningställda och anvisade", förtöjning som hindrar andra), lästa i dag.
- 0197: KÄLLA-rad ny: nr 19 är omskriven ovanpå P0 20, och Lst:s rad om broförbindelsen är tillagd.
- N005, 0214, 0333: noterade: P0 20 har redan lagt in det posterna nr 10, 24 och 27 gjorde.
- 0016, 0017: RÄTTA enligt Toms beslut 3: nålen 58.9476, 18.2623 och radien 7,0 km (ny post nr 34, islandCoords.ts).
Databasen (uto.sql)
- 0446: FEL → RÄTTA: Gruvbryggans nål flyttas 102 m till OSM:s Gruvbryggan (node 269395949); Waxholmsbolaget anger ingen koordinat.
- 0411: FEL → RÄTTA: Bryggans café och bar flyttas 162 m till OSM-byggnaden med samma webbplats (kontaktsidan: Gruvbryggan).
- 0454: FEL → RÄTTA: sjömacken flyttas 153 m till OSM:s Cirkel K sjömack, 36 m från Bryggans café (brygganscafe.se: "UTÖ SJÖMACK").
- 0419: FEL → RÄTTA: Bakgården flyttas 176 m till OSM:s Utö Bakgård vid Bygatan (uto.se, nivå 3: "UTÖ BAKGÅRD", "Bygatan, Utö").
- 0417: KORREKT, KÄLLA-rad ny: mätning i Utös polygon (kommentar utan UPDATE).
- 0492: FEL → RÄTTA: Bakfickan flyttas 365 m till OSM-byggnaden med webbplatsen utovardshus.se/bakfickan/.
- 0523: KORREKT, KÄLLA-rad ny: mätning, 341 m innanför strandlinjen (kommentar utan UPDATE).
- 0551: FEL → RÄTTA: Levins badhotell struket; Haninge: hotellbyggnad i trä i tre våningar, byggd efter 1878 när Utö planerades som badort.
- 0552: FEL → RÄTTA: "ett av de första hotellen från den tiden" (Haninge) i stället för "förra sekelskiftet".
- N031 NY: "är ett vandrarhem i Gruvbyn på Utö i Haninge kommun" (Lst, Haninge, vandrarhemmet).
- 0559: OBELAGD → RÄTTA: namnet Rånökällan (Toms beslut 5; restaurangen kallar sig så, Lst skriver "Restaurang Rånökällan").
- 0560: KORREKT, KÄLLA-rad ny: den nya punkten ligger 101 m innanför Rånös strandlinje.
- 0561: KORREKT, KÄLLA-rad ny: typen restaurang belagd (Lst, Skärgårdsstiftelsens karta).
- 0562: FEL → RÄTTA: nålen flyttas 117 m ur vattnet till OSM:s Rånö Källan Pub & Café (node 3053395678), 17 m från Rånö Livs.
- N026–N029 NY: Rånökällans text (restaurang på Rånö i Haninge kommun, uteservering och veranda mot Ernviken, intill Rånö Livs och drivs av Rånö Brygga, mat, drycker, glass och bröd, säsongen). rano.se, Lst, Skärgårdsstiftelsen, OSM.
- N030 NY: webbplatsen https://rano.se/krog/.
- 0534: FEL → RÄTTA: type camping (Toms beslut 4). Satsen körs först när koden stöder typen (mallarnas runda 5).

## Rader i arbetslistan som inte rörts
- uto-N003 (o2-ks06): strykningen står enligt Redaktörens beslut.
- uto-0345 (f02-k072): generatorns räkning; Vaktens lista.
- uto-0535 (f12-k014): ingen åtgärd. Nålen ligger i campingens polygon (MÄTT i dag: 61 m innanför strandlinjen).
- uto-0151 (f13-k085), 0369 (f13-k095), 0177 (f13-k109), 0364 (f13-k110), 0143 (f14-k052): OK, ingen åtgärd. Meningarna för 0151 och 0143 står kvar oförändrade.
- uto-0339 (f22-k002): Vaktens lista (FAQ:n räknar Bakfickan som restaurang).
- uto-0096 (f24-k059) och 0334 (f26-k046): hör till P0 20, som är i main.
- Borttagna poster: nr 0 (transit-stops.ts, redan i main enligt Vaktens lista) och de tidigare nr 10, 24 och 27 (P0 20 har lagt in det de gjorde; omskrivna ovanpå P0 blev de tomma).

## Omprövas i slutomkontrollen
- 0164 och 0173 (flaggan OMPROVAS): Ålö-Rånö.
- 0140 (och 0139): kvarnens år. Byggnadsminnesbeslutet 2001 (BeBR) anger 1792; Haninge (2020) och Lst:s reservatssida anger 1791. 1791 står kvar enligt regeln om det senast daterade dokumentet.
- 0162: kapellets rivning skrivs som 1870-talet (1874 mot 1878).
- 0551, 0552 och N031: att Haninges "Hotell skärgården" är vandrarhemmets hus. Namnet, tre våningar och "inrymmer idag vandrarhem" stämmer, men inventeringen anger ingen adress.
- N029: Rånökällans säsong läses om före publiceringen (förtydligande 15).
- 0419: läget vilar på nivå 3 (uto.se); bageriets egen domän utobakgard.se visar i dag en spelsajt.
- 0154–0156, 0336, 0337, N021, N022: orgelcitaten är hämtade ur BeBR:s RDF-post på kulturarvsdata.se. Redaktören avgör om den URL:en duger som KÄLLA.

## Torrkörning och kontroller (MÄTT)
- `applicera.mjs main-kopia uto.edits.json --torr` (2a31087): **35 ersättningar ok, 0 fel**. Varje "gammal" står exakt en gång i orörd main.
- Ändrad "gammal" mot main: nr 3, 8, 10, 17, 19, 25 och 30 (nr 30 tar med nästa rad, eftersom den gamla KÄLLA-raden stod tre gånger i main). Ändrad bara "ny": nr 5, 7, 9, 13, 14, 15 och 27. Nya: nr 20, 33 och 34. Oförändrade: övriga 18.
- P0 20: 50 av de 51 rader P0 lade till står kvar ordagrant. Den 51:a, Nynäshamnstipset, har bara fått "med Waxholmsbolagets linje 22" infogat; förbudet, informationstavlorna och P0:s KÄLLA-rader är orörda.
- TypeScript-parsern: 0 syntaxfel i island-data.ts och islandCoords.ts efter inläggning.
- Citat (skript/citatkoll4.py): 38 KÄLLA-rader i edits.json, 25 i uto.sql och 69 registerrader med läst 2026-11-09 ger 281 citat, och alla står ordagrant i dagens sparade källtext. Inga klockslag, en URL per KÄLLA-rad. I nr 5 och 7 är "dock senast kl. 17.00" och tidsparen bortklippta ur två äldre citat ur h21.pdf (läsdatum 2026-10-29 kvar).
- uto.sql: 20 UPDATE (9 tidigare och 11 nya) och 2 kommentarer utan UPDATE. SELECT 2026-11-09: varje WHERE träffar exakt en rad. Gamla koordinater jämförs avrundade till 7 decimaler, eftersom två lagrade värden inte är exakt lika som flyttal. Inget är kört.
- Registret: 594 rader (rubrik och 593), alla med 15 kolumner. kontrollera_register.py: inga formfel, inga grundrader utan motsvarighet.
- Lag 3 (faktaregister.mjs --mat uto mot baslinjen): ord 1 690 → 2 277 (main 2a31087: 1 969), enheter 192 → 226, med källa 161 → 194: OK. De omskrivna strängarna går från 396 till 504 ord.

## För Redaktören och Vakten
- GPS-radien: med 7,0 km från den nya nålen hamnar också Ålö brygga (5,09 km) och Rånö färjeläge (5,77 km) innanför, så en tur dit taggas som Utö. uto.tom.md nämnde Rånö bara för alternativ a. islandPlaces räknar dessutom Rånökällan (ö-fältet Rånö, 5,82 km) som "på Utö", eftersom onIsland är ö-fältet eller avståndet ≤ radien. Ingen cirkel löser det: Stora Sandvik (6,00 km) och Rävstavik (4,47 km) ligger på Utö men saknar ö-fält. Förslag: ett ifyllt ö-fält som inte är öns namn ger onIsland = false.
- Samma uppgifter på fler ställen: blogg/[slug]/page.tsx:445 (1100-talet utan förbehåll, kyrkan "1848–1850", orgeln "stod ursprungligen i") och guider/[slug]/guide-content.ts:3653 (1100-talet).
- Toms beslut 5: uto.se/bar-restaurang/ (nivå 3) anger "Lilla Haket" vid gästhamnen, Gruvbryggan 1, med Båtshakets kontaktuppgifter. På uto.se heter bageriet både "Utö Bakgård" och "Utö Bageri".
- Utanför listan: "Sveriges äldsta bevarade väderkvarn" (did_you_know, description[3]) har bara Skärgårdsstiftelsen (nivå 2) som källa för en historieuppgift; BeBR säger att kvarnen är "unik i Stockholms län". LM anger att brytningen var störst på 1840-talet, Haninge att den kulminerade 1874.
