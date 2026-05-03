/**
 * islandFaqs.ts — FAQ-data per ö, region-aware.
 *
 * Strategi:
 *   1. Handskrivna unika FAQ för de mest besökta öarna (Stockholm + Bohuslän).
 *   2. Region-specifika mall-FAQ för resten — INGEN Stockholm-text för Bohuslän etc.
 *   3. Alla returnerade FAQ:er är markupkompatibla med schema.org/FAQPage.
 *
 * Källor:
 *   Stockholm:  Skärgårdsstiftelsen, Visit Stockholm, Waxholmsbolaget
 *   Bohuslän:   vastsverige.com, Trafikverket Färjerederiet, kommunala turistsidor
 */

import type { Island } from '@/app/o/island-data'

export interface FAQ {
  q: string
  a: string
}

type IslandRegion = Island['region']

// ─── Unika FAQ för viktiga öar — Stockholms skärgård ────────────────────────
const UNIQUE_STOCKHOLM: Record<string, FAQ[]> = {
  sandhamn: [
    { q: 'Hur tar jag mig till Sandhamn?',
      a: 'Waxholmsbolaget trafikerar Sandhamn året om från Strömkajen och Stavsnäs. På sommaren går även Cinderellabåtarna direkt från Strandvägen i Stockholm. Restid: ca 2–3 timmar från Strömkajen, 1 timme från Stavsnäs.' },
    { q: 'Vad är värt att göra på Sandhamn?',
      a: 'Besök Sandhamns Seglarhotell, promenera till Trouville-stranden för bad och dyner, vandra till Västerudd för utsikt över öppet hav, eller besök KSSS:s anrika klubbhus. Sandhamn är hemma för Gotland Runt-seglingen i juli.' },
    { q: 'Finns det boende på Sandhamn?',
      a: 'Sands Hotell & Konferens, Sandhamns Värdshus och Sandhamns Seglarhotell erbjuder övernattningar. Boka i god tid — sommaren är extremt populär, särskilt under Gotland Runt-veckan.' },
    { q: 'Kan man åka till Sandhamn på dagstur?',
      a: 'Absolut. Tidiga avgångar från Strömkajen ger dig 5–6 timmar på ön innan kvällsbåten tillbaka. En lunch på Seglarhotellet, ett bad på Trouville och en runda i den gamla bymiljön är en perfekt dag.' },
    { q: 'Kostar det att ligga i hamn på Sandhamn?',
      a: 'Sandhamns gästhamn tar 250–350 kr/natt under högsäsong (juli) beroende på båtens längd. Förboka via gästhamnen vid storhelger och Gotland Runt — det blir oftast fullt.' },
    { q: 'Är Sandhamn barnvänligt?',
      a: 'Ja. Trouville-stranden är grund och säker, det finns lekplats vid hamnen och kortare promenader passar familjer. Saknar dock barnaktiviteter inomhus, så välj fint väder.' },
  ],
  grinda: [
    { q: 'Hur tar jag mig till Grinda?',
      a: 'Waxholmsbolaget från Strömkajen, Vaxholm eller Stavsnäs. Sommarsäsongen har täta avgångar — restid 1,5–2 timmar från Stockholm. Cinderellabåtarna gör också stopp.' },
    { q: 'Var ligger Grinda gästhamn?',
      a: 'Det finns två hamnar: Norra (Södra Sundet) med restaurang och kiosk, och Södra (vid Wärdshuset) som är mer skyddad. Båda har gästplatser, dusch och el.' },
    { q: 'Är Grinda Wärdshus värt besöket?',
      a: 'Ja. Det är ett klassiskt skärgårdsvärdshus med traditionell sjömanskost. Boka bord i förväg på sommaren. För enklare lunch finns Grinda Strandcafé vid hamnen.' },
    { q: 'Kan man bada på Grinda?',
      a: 'Ja, två klippbad och en barnvänlig sandstrand. Ön har också vandringsleder genom skogen. Cykla går också (uthyrning vid hamnen).' },
    { q: 'Finns det stuga att hyra på Grinda?',
      a: 'Skärgårdsstiftelsen hyr ut stugor och rum året runt — boka 6+ månader i förväg för sommaren. Det finns också ett vandrarhem.' },
    { q: 'Är Grinda eller Sandhamn bättre för en dagstur?',
      a: 'Grinda är närmare och lugnare — bra för en avkopplande dag. Sandhamn är mer levande och har bättre restauranger men kräver mer restid.' },
  ],
  moja: [
    { q: 'Hur kommer jag till Möja?',
      a: 'Waxholmsbolaget från Stavsnäs (45 min) eller via Sollenkroka. Bilfärja går från Sollenkroka till Berg på Möja. Restid totalt: ca 1,5 timmar från Stockholm.' },
    { q: 'Vilken del av Möja ska jag åka till?',
      a: 'Berg och Långvik är de två huvudbyarna. Berg har mer service (Wikströms Fisk, Möjabutiken, krogar). Långvik är roligare för naturupplevelse och bad.' },
    { q: 'Finns det restauranger på Möja?',
      a: 'Möja Krog (Berg), Wikströms Fisk (Berg) — den legendariska räkmackan, och Långvik Krog (Långvik). Möja Lanthandel & Kök serverar enkel mat med lokala produkter.' },
    { q: 'Kan man cykla på Möja?',
      a: 'Ja, ön är 6 km lång med få bilvägar. Cykla från Berg till Långvik tar 25–30 minuter på asfalt och grusvägar. Cykeluthyrning finns i Berg.' },
    { q: 'Är Möja barnvänligt?',
      a: 'Mycket. Säkra hamnar, badmöjligheter, pubar med barnportioner och natur som lockar. Möja är ett av skärgårdens mest populära ö-val för familjer.' },
    { q: 'Var hyr man båt på Möja?',
      a: 'Möja Båt & Sjömackars uthyrning erbjuder mindre motorbåtar och kajaker. Bra för ö-hopp till exempelvis Norrpada, Gillinge eller Stora Träskärsudden.' },
  ],
  uto: [
    { q: 'Hur tar jag mig till Utö?',
      a: 'Waxholmsbolaget från Årsta Brygga (söder om Stockholm) — restid ca 2 timmar. Bilfri. Båt går året om men tätare på sommaren.' },
    { q: 'Vad är speciellt med Utö?',
      a: 'Utö är Sveriges äldsta gruvort — gruvan stängde 1879 men museet och de gamla gruvhålen är öppna. Ön har också Utö Kvarn, Sveriges äldsta bevarade bagarstuga, och vacker natur.' },
    { q: 'Finns det boende på Utö?',
      a: 'Utö Värdshus är klassikern (60-tal rum, restaurang, brygga). Pensionat och stugor i Bygatan. Boka tidigt för sommaren.' },
    { q: 'Är Utö bra för cykel?',
      a: 'Mycket bra. Bilfri, ca 8 km från norr till syd, asfalterade vägar mellan bygdarna. Cykeluthyrning vid hamnen — räkna 200 kr/dag.' },
    { q: 'Var ligger Utös bästa stränder?',
      a: 'Storsand (norra delen) är populär klippstranden. Bytviken har skyddad sandstrand bra för barn. Ålö (mindre ö norr om Utö) har också fina bad — kort båttur dit.' },
    { q: 'Vad gör man på Utö när det regnar?',
      a: 'Gruvmuseet, Utö Bageri (köpa surdeg och kanelbullar), Utö Värdshus med inomhusservering, och Utö Kvarn-museet. Cykla regnstället — det är skärgård.' },
  ],
  finnhamn: [
    { q: 'Hur kommer jag till Finnhamn?',
      a: 'Waxholmsbolaget från Strömkajen via Vaxholm — restid ca 2,5 timmar. Cinderellabåtarna direktförbindelser från Strandvägen sommartid. Inga bilar tillåtna på ön.' },
    { q: 'Vad är Finnhamns Wärdshus?',
      a: 'Skärgårdsstiftelsens klassiska värdshus med rum, restaurang och vandrarhem. Maten serveras på trädäcket med utsikt över hamnen. Öppet majstart till septemberslut.' },
    { q: 'Kan man tälta på Finnhamn?',
      a: 'Ja, det finns tältplatser i anslutning till värdshuset. Boka via Skärgårdsstiftelsen. Vandrarhem är ett alternativ för 4–8 pers.' },
    { q: 'Är Finnhamn lugnt eller livligt?',
      a: 'Lugnt — det är en av de mest avskilda ö-öarna med reguljär trafik. Ingen by, ingen affär förutom värdshusets kiosk, perfekt för avkoppling.' },
    { q: 'Vilka bad finns på Finnhamn?',
      a: 'Klippbad runt hela ön. Sydsidan är mer öppen mot Östersjön, norra mer skyddad. Bron till Idholmen ger access till en mindre, vacker badvik.' },
    { q: 'Hur länge bör man stanna på Finnhamn?',
      a: 'En övernattning rekommenderas starkt. Dagsturer fungerar men du missar bästa stunden — kvällen och morgonen när dagsturisterna åkt.' },
  ],
  vaxholm: [
    { q: 'Hur tar jag mig till Vaxholm?',
      a: 'Waxholmsbolaget från Strömkajen (50 min), buss 670 från Tekniska Högskolan (45 min) eller bil via E18 (35 min). Tätaste tidtabellen i hela Stockholms skärgård.' },
    { q: 'Är Vaxholms Fästning öppen för besök?',
      a: 'Ja, sommartid maj–september. Fästningsmuseet, kafé och guidade turer. Båt går från Vaxholm hamn — 5 minuters tur.' },
    { q: 'Var äter man bäst i Vaxholm?',
      a: 'Hamnkrogen vid Söderhamnen (klassisk skärgårdsmat), Vaxholms Hembageri (lunch och fika), Restaurang Lotsen (mer påkostat). Många populära alternativ året runt.' },
    { q: 'Är Vaxholm en bra startpunkt för skärgårdstur?',
      a: 'Ja — det är skärgårdens "port". Härifrån går båtar till de flesta öar (Grinda, Möja, Sandhamn). Bra hub för båtbyte.' },
    { q: 'Finns det bra hotell i Vaxholm?',
      a: 'Vaxholms Hotell (centralt, klassiskt), Bogesunds Värdshus och flera B&B i de gamla husen. Boka tidigt för helger.' },
    { q: 'Är Vaxholm värt en heldag?',
      a: 'Ja — Fästningsmuseet, gamla stan, hamnen, lunchställen och promenader längs Norrhamnen tar lätt 5–6 timmar. Bra alternativ när vädret är osäkert.' },
  ],
  arholma: [
    { q: 'Hur tar jag mig till Arholma?',
      a: 'Bilfärja från Simpnäs (10 min) eller Waxholmsbolaget från Furusund. Räkna 2,5–3 timmar från Stockholm med bil + färja.' },
    { q: 'Vad är Arholma känt för?',
      a: 'Den klassiska sjöfartsbygd med välbevarad bymiljö. Arholma kapell (1700-tal), Båkberget med utsikt över Ålands hav, och konstnärsgalleriet.' },
    { q: 'Finns det restaurang på Arholma?',
      a: 'Arholma Hamnkrog (klassisk), Arholma Värdshus (mer påkostat) och en kiosk vid hamnen. Öppna i huvudsak säsongssomrar.' },
    { q: 'Är Arholma värt en heldag?',
      a: 'Ja, särskilt på sommaren. Bymiljön, Båkberget, kapellet och en lunch vid hamnen — räkna 4–6 timmar. Förläng med övernattning för de bästa morgnarna.' },
    { q: 'Var ligger Arholma?',
      a: 'Längst norr i Stockholms skärgård, på gränsen mot Roslagen och Ålands hav. Det är sista bebodda ön innan öppet hav norrut.' },
    { q: 'Är Arholma bilfri?',
      a: 'Nej — bilar går att ta över med färjan, men öns vägar är smala och cykel rekommenderas. Promenader är det bästa sättet att utforska.' },
  ],
  rodloga: [
    { q: 'Hur kommer jag till Rödlöga?',
      a: 'Waxholmsbolaget i sommarsäsongen (juni–augusti) från Furusund. Inga bilfärjor — det är yttre skärgården, kräver båt eller turbåt.' },
    { q: 'Vad är speciellt med Rödlöga?',
      a: 'Sista bebodda ön i Stockholms ytterskärgård. Klippor, hav, vindpinade tallar och en av Stockholms mest fotograferade landskap. Magisk.' },
    { q: 'Finns det boende på Rödlöga?',
      a: 'Ja, Rödlöga Skärgårdspensionat (få rum, boka i tid), och stughyrning. Begränsat utbud — perfekt för en lugn skärgårdsupplevelse.' },
    { q: 'Vad äter man på Rödlöga?',
      a: 'Rödlöga Skärgårdspensionat serverar enklare mat och fika. Café Truten på Rödlöga är en sommarklassiker. Förbered egen mat om man stannar längre.' },
    { q: 'Är Rödlöga svårt att nå?',
      a: 'Bara på sommaren med reguljär båt. Med egen båt: ca 4 timmar från Stockholms innerskärgård. Yttre läge betyder också att vädret kan stoppa båttrafik.' },
    { q: 'Vad gör man på Rödlöga en hel dag?',
      a: 'Vandra runt klipporna, bada från klippbadet, äta lunch på pensionatet, ta foto av landskapet vid solnedgång. Lugn och tystnad är poängen.' },
  ],
  namdo: [
    { q: 'Hur tar jag mig till Nämdö?',
      a: 'Waxholmsbolaget från Stavsnäs (45 min) eller via Sollenkroka. Bilfärja går från Sollenkroka till Sand på Nämdö. Räkna 1,5 timmar från Stockholm.' },
    { q: 'Var ligger Nämdös hamn?',
      a: 'Sand är huvudbyn med gästhamn, café och affär. Det finns flera mindre bryggor runt om, t.ex. Bunkvik och Östanvik.' },
    { q: 'Finns det restaurang på Nämdö?',
      a: 'Nämdö Handelsbod & Café (Sand) — kombinerad lanthandel och fik. Bistro och säsongsöppna ställen vid större hamnar. Mat på ön är enkel — ta med egen för utflykter.' },
    { q: 'Är Nämdö bra för cykel?',
      a: 'Ja. Ca 7 km lång med asfalt mellan byarna. Cykel är det bästa sättet att utforska Nämdös fina natur och kustlinje.' },
    { q: 'Vad är specifikt för Nämdö?',
      a: 'Naturreservatet Nämdöskärgården är en av Stockholms vildaste områden. Sjöfågeltätt, fina klippor och naturhamnar. Populär bland kajakpaddlare.' },
    { q: 'Kan man kombinera Nämdö med andra öar?',
      a: 'Absolut — Stora Sand, Söder Stavsudda och Bullerön är inom kajak/båtavstånd. Bra ö-hopp-tur över 2–3 dagar.' },
  ],
  landsort: [
    { q: 'Hur tar jag mig till Landsort?',
      a: 'Bilfärja från Ankarudden (Nynäshamn) — ca 30 min båtfärd. Inga reguljära Waxholmsbolaget-turer. Räkna 1,5–2 timmar från Stockholm med bil.' },
    { q: 'Vad är Landsorts Fyr?',
      a: 'Sveriges äldsta bevarade fyr (1689). Du kan klättra upp och se ett av Sveriges vackraste fyrlandskap. Också B&B i fyrvaktarbostaden.' },
    { q: 'Var bor man på Landsort?',
      a: 'Landsorts Fyr B&B, Stora Hamnen pensionat, eller stuga via Skärgårdsstiftelsen. Få rum totalt — boka tidigt.' },
    { q: 'Vad gör man på Landsort?',
      a: 'Klättra upp i fyren, vandra till Sydudden och Norrudden, bada från klippor, fågelskåda (passage för flyttfåglar), eller bara njuta av tystnaden.' },
    { q: 'Är Landsort barnvänligt?',
      a: 'Ja, men kräver lugnare familjer — det finns ingen lekplats eller barnkultur. Däremot trygg natur, säkra bad och snabbt nära allt.' },
    { q: 'Hur länge bör man stanna på Landsort?',
      a: 'Helst en övernattning. Magin är solnedgången från Sydudden och morgontimmen vid fyren. Dagsturer fungerar men missar essensen.' },
  ],
}

// ─── Unika FAQ för viktiga öar — Bohuslän / västkusten ──────────────────────
//
// Källor: vastsverige.com, Trafikverket Färjerederiet, kommunala turistsidor.
// Transport i Bohuslän är vägfärjor (gratis Trafikverket) eller turbåtar —
// ALDRIG Waxholmsbolaget. Kosterhavet undantag: Kosterbåtarna från Strömstad.
const UNIQUE_BOHUSLAN: Record<string, FAQ[]> = {
  marstrand: [
    { q: 'Hur tar jag mig till Marstrand?',
      a: 'Marstrand är bilfri. Kör till Koön via Kungälv (E6 → väg 168) och ta sedan Marstrandsfärjan över sundet — gratis kommunal färja som går kontinuerligt under dagtid (5 min). Från Göteborg: ca 50 min med bil. Buss 312 från Kungälv eller direktbuss från Göteborg sommartid.' },
    { q: 'Vad är värt att se på Marstrand?',
      a: 'Carlstens fästning (1600-tal, guidade turer + museum), Paradiset-stranden (klippbad), promenaden runt ön, hummerfiske-turer i augusti, och de färgglada hus i hamnen. Marstrand är också Skandinaviens äldsta segelort.' },
    { q: 'Var äter man bäst i Marstrand?',
      a: 'Tenan (utsikt över hamnen, klassiska skaldjur), Båtellet, Strandverket Café & Konsthall (lokal mat + utställningar), och Carlstens Krog uppe vid fästningen. Hummersafari + lunchpaket finns sommartid.' },
    { q: 'Finns det boende på Marstrand?',
      a: 'Grand Hotel Marstrand (klassiskt), Marstrands Värdshus, Strandverket Hotell och flera B&B i de gamla husen. Hummerveckan i september är extremt eftertraktad — boka 6+ månader i förväg.' },
    { q: 'Är Marstrand bra för dagstur?',
      a: 'Ja — perfekt dagstur från Göteborg. Räkna 50 min bil + färja, sen 4–5 timmar på ön (fästning, lunch, promenad, bad). Färjan går till sent på kvällen sommartid.' },
    { q: 'Finns det gästhamn för egen båt på Marstrand?',
      a: 'Marstrands gästhamn har plats för ca 350 båtar — en av västkustens största. El, dusch, mack, restauranger inom 50 m. Pris 320–450 kr/natt högsäsong (juli). Boka via gasthamn.se vid hummerveckan eller Match Cup-veckan.' },
  ],
  smogen: [
    { q: 'Hur tar jag mig till Smögen?',
      a: 'Smögen är förbunden med Kungshamn via vägbro — du kör hela vägen ut. Från Göteborg: ca 1 h 45 min via E6 → väg 174. Inga färjor behövs. Buss 870/871 från Göteborg sommartid eller tåg till Munkedal + buss.' },
    { q: 'Vad är Smögenbryggan?',
      a: 'Den 600 m långa bryggan med röda fiskebodar är Smögens ikon. Här ligger restauranger, glasskiosker, hummerförsäljning och butiker. Promenaden längs bryggan i kvällssolen är den klassiska Bohuslän-upplevelsen.' },
    { q: 'Var äter man bäst på Smögen?',
      a: 'Smögens Hafvsbad (hotellet, fine dining), Hamnkrogen Smögen (skaldjur direkt vid bryggan), Skäret (inomhus + uteservering med utsikt över hamnen), och Roy & Roger (klassisk skaldjurskrog). Räkmackan på bryggan är obligatorisk.' },
    { q: 'Finns det boende på Smögen?',
      a: 'Hotell Smögens Hafvsbad är flaggskeppet — spa, restaurang, havsutsikt. Smögens Logi (fiskeläge-stil), Hotell Lökeberg på fastlandet, och stuguthyrning runt ön. Boka 3–6 månader i förväg för juli.' },
    { q: 'Är Smögen barnvänligt?',
      a: 'Ja. Kungshamns Badhus, klippbad runt ön, glassbarer, lekparker och promenader. Smögens Hafvsbad har familjepaket. Sommaren är livlig — välj juni eller augustislut för lugnare upplevelse.' },
    { q: 'Kan man fiska på Smögen?',
      a: 'Ja — flera turbåtar går från hamnen för havsfiske (makrill, sej, torsk). Hummerfiske startar i september ("hummerpremiären") med dedikerade safari-paket. Smögen Whale Tour kör också utflykter till Kosterhavet.' },
  ],
  karingon: [
    { q: 'Hur tar jag mig till Käringön?',
      a: 'Käringön är bilfri. Kör till Hälleviksstrand (Orust, väg 178) och ta passagerarfärjan över — 5 min, går kontinuerligt sommartid. Ingen bilfärja. Från Göteborg ca 1 h 30 min till Hälleviksstrand.' },
    { q: 'Vad är speciellt med Käringön?',
      a: 'En av västkustens bäst bevarade fiskelägen — täta vita hus, smala gränder, ingen biltrafik. Hela ön är ett kulturreservat. Klippbad, ett välbevarat kapell från 1797, och utsikt över Skagerrak från höjderna.' },
    { q: 'Var äter man på Käringön?',
      a: 'Pensionat Hassellöfs Restaurang (klassiska skaldjur, fine dining), Café Lokstallet (sommaröppet), och Käringö Hamnkrog vid bryggan. Begränsat utbud — boka bord i förväg sommartid.' },
    { q: 'Finns det boende på Käringön?',
      a: 'Pensionat Hassellöf (klassiskt anrikt, drivs sedan 1899), Käringö B&B och stuguthyrning. Få rum totalt — boka 4+ månader i förväg för juli.' },
    { q: 'Är Käringön bra för dagstur?',
      a: 'Ja. Räkna 1 h 30 min bil till Hälleviksstrand + 5 min färja, sen 3–4 timmar på ön — promenad runt, lunch, bad. Sista färjan tillbaka går oftast 22–23-tiden sommartid, kontrollera lokalt.' },
    { q: 'Kan man ligga med egen båt på Käringön?',
      a: 'Ja, Käringö gästhamn har ca 80 platser, dusch, el, mack. Pris 300–400 kr/natt högsäsong. Skyddat läge. Boka via gasthamn.se sommartid — fyller snabbt.' },
  ],
  kosterhavet: [
    { q: 'Hur tar jag mig till Kosterhavet?',
      a: 'Kosterbåtarna från Strömstad gästhamn — 30–45 min till Sydkoster eller Nordkoster. Tätare turer på sommaren. Från Göteborg till Strömstad: 2 h med bil eller tåg. Kostervägfärjan trafikerar bara mellan Sydkoster och Nordkoster (5 min).' },
    { q: 'Vilken Koster-ö ska jag åka till?',
      a: 'Sydkoster är större (8 km²) med mer service — gästhamn, restauranger, cykeluthyrning, naturum. Nordkoster är mindre och vildare med klippor och fyr. Båda öarna är bilfria och förbundna med vägfärja.' },
    { q: 'Vad är Kosterhavets nationalpark?',
      a: 'Sveriges första marina nationalpark (2009). Skyddar Sveriges enda korallrev, säldjur, makrillstim och ett unikt undervattenslandskap. Naturum Kosterhavet på Sydkoster har utställningar och guidning.' },
    { q: 'Var äter man i Kosterhavet?',
      a: 'På Sydkoster: Ekenäs Sjökrog (skaldjur med havsutsikt), Långegärde Kafé och Kosters Trädgårdar (lokal mat). På Nordkoster: Kafé Lyngnor och Mor Kerstins Kök. Begränsat utbud — boka i förväg sommartid.' },
    { q: 'Kan man cykla på Koster?',
      a: 'Mycket bra — Sydkoster är 8 km lång med asfalterade vägar. Cykeluthyrning vid Långegärde brygga och Ekenäs. Räkna 4–6 timmar för att cykla runt med stopp för bad och fika.' },
    { q: 'Finns det boende på Koster?',
      a: 'Ekenäs Hotell (Sydkoster, klassiskt), Kosters Trädgårdar (B&B + restaurang), Kosters Vandrarhem och flera stughyrare via Strömstads turistbyrå. Boka tidigt — Koster är ett av sommarens mest eftertraktade resmål.' },
  ],
  fjallbacka: [
    { q: 'Hur tar jag mig till Fjällbacka?',
      a: 'Fjällbacka är förbundet med fastlandet — du kör direkt dit. Från Göteborg: ca 2 h via E6 → väg 163. Buss 875 från Strömstad eller Tanumshede sommartid. Tåg till Tanumshede (15 min med buss därifrån).' },
    { q: 'Vad är Fjällbacka känt för?',
      a: 'Hemorten för Camilla Lägkbergs deckare — bygden förekommer i hennes romaner. Klassisk fiskebygd med röda sjöbodar, smala gränder och Vetteberget med utsikt över skärgården. Ingrid Bergman tillbringade sina somrar här.' },
    { q: 'Var äter man bäst i Fjällbacka?',
      a: 'Bryggan i Fjällbacka (skaldjurspecialist, klassiker), Stora Hotellet Bryggeri, Café Bryggan, och Richters Konditori (kaffe + bakverk). Sommarens räkmacka från sjöbodarna är obligatorisk.' },
    { q: 'Finns det boende i Fjällbacka?',
      a: 'Stora Hotellet Bryggeri (centralt, klassiskt), Tanumstrand Resort (utanför byn, spa), B&B i de gamla fiskarhusen och stuguthyrning. Boka 3–6 månader i förväg för juli.' },
    { q: 'Vad gör man på Fjällbacka?',
      a: 'Klättra upp på Vetteberget (15 min, fantastisk utsikt), Camilla Läckberg-tur, ta båt ut till Väderöarna (skärgårdens yttre rand), bad och promenad i hamnen. Fjällbacka Music Festival i juli.' },
    { q: 'Kan man ligga med egen båt i Fjällbacka?',
      a: 'Ja, Fjällbacka gästhamn (Badis) har ca 200 platser med el, dusch, restauranger inom 100 m. Pris 280–380 kr/natt högsäsong. Skyddat läge. Boka via gasthamn.se vid musikfestivalen eller storhelger.' },
  ],
  grundsund: [
    { q: 'Hur tar jag mig till Grundsund?',
      a: 'Grundsund ligger på Skaftölandet i Lysekils kommun. Kör till Skår (väg 161 från E6) och ta Trafikverkets gratis vägfärja Skår–Skaftö (5 min, kontinuerlig under dagen), sen 6 km till Grundsund. Från Göteborg: ca 2 h totalt. Sommartid också vägfärja Fiskebäckskil–Lysekil.' },
    { q: 'Vad är speciellt med Grundsund?',
      a: 'Ett välbevarat fiskeläge med smala gränder och vita hus tätt packade kring den långsmala hamnen. Ursprungligen en sillfiskestation. Mer lugnt och autentiskt än Smögen — perfekt för dem som vill undvika sommarens trängsel.' },
    { q: 'Var äter man i Grundsund?',
      a: 'Brygghuset Grundsund (skaldjur, klassiker vid hamnen), Grundsunds Värdshus (säsongsöppet), och Tång & Sånt — anrika kafé. För finare middag: Salt & Sill på Klädesholmen (bilbar) eller Slussens Pensionat i Fiskebäckskil.' },
    { q: 'Finns det boende på Grundsund?',
      a: 'Begränsat lokalt — Grundsunds Pensionat och stuguthyrning via Lysekils turistbyrå. Slussens Pensionat (Fiskebäckskil, 5 km) är klassikern i området. Boka 3+ månader i förväg för juli.' },
    { q: 'Är Grundsund barnvänligt?',
      a: 'Ja — bilfri inom byn (smala gränder), klippbad runt om, lekplats vid hamnen och säkra promenader. Mindre kommersiellt än Smögen, vilket många familjer föredrar.' },
    { q: 'Kan man ligga med egen båt i Grundsund?',
      a: 'Ja, Grundsunds gästhamn har ca 60 platser med el, dusch och mack inom byn. Pris 250–320 kr/natt högsäsong. Skyddat läge i sundet. Bra hub för utflykter till Käringön, Lysekil eller Fiskebäckskil.' },
  ],
}

// ─── Region-specifika mall-FAQ för icke-unika öar ────────────────────────────

const TEMPLATE_STOCKHOLM: FAQ[] = [
  { q: 'Hur tar jag mig till {{name}}?',
    a: 'Vanligaste sättet är med Waxholmsbolaget eller Cinderellabåtarna från närmaste avgångshamn (Strömkajen, Vaxholm eller Stavsnäs). Sommarsäsongen har tätare turer. Se aktuell tidtabell på Waxholmsbolagets webbplats eller på vår färjsida (/farjor).' },
  { q: 'Finns det restaurang på {{name}}?',
    a: 'Många öar i Stockholms skärgård har minst en sommaröppen krog eller café. Se "Mat & krogar"-sektionen på denna sida för aktuella alternativ. Öppettider varierar per säsong.' },
  { q: 'Kan man övernatta på {{name}}?',
    a: 'Beroende på ön finns vandrarhem, värdshus, B&B eller stughyrning. Sommarbokningar fylls snabbt — boka 2–3 månader i förväg för juli. Se "Boende"-sektionen.' },
  { q: 'Är {{name}} bra för en dagstur?',
    a: 'Ja, om båtförbindelsen tillåter. Räkna med båttiden tur och retur plus minst 3–4 timmar på ön. Kontrollera sista båt tillbaka — den går oftast tidigare än man tror.' },
  { q: 'Finns det gästhamn för egen båt på {{name}}?',
    a: 'De flesta större öar har gästhamn med plats för 10–50 båtar, dusch och el. Pris: 200–350 kr/natt under högsäsong. Förboka via gästhamnen vid storhelger.' },
  { q: 'Är {{name}} barnvänligt?',
    a: 'De flesta öar i Stockholms skärgård är trygga och har badmöjligheter, korta promenader och sommaraktiviteter som passar barn. Saknas oftast inomhusalternativ — välj fina dagar.' },
]

const TEMPLATE_BOHUSLAN: FAQ[] = [
  { q: 'Hur tar jag mig till {{name}}?',
    a: 'I Bohuslän når du de flesta öar via Trafikverkets vägfärjor (oftast gratis) eller direktväg. Vanliga avgångar: Skår–Skaftö, Hälleviksstrand–Käringön, Tuvesvik–Gullholmen, Lysekil–Fiskebäckskil. Från Göteborg via E6 norrut. Se Trafikverket Färjerederiets tidtabell. Waxholmsbolaget trafikerar inte Bohuslän.' },
  { q: 'Finns det restaurang på {{name}}?',
    a: 'Bohusläns kustsamhällen har oftast minst en sommaröppen skaldjurskrog eller fiskrökeri. Se "Mat & krogar"-sektionen för aktuella alternativ. Öppettider varierar starkt mellan säsong och vintersäsong.' },
  { q: 'Kan man övernatta på {{name}}?',
    a: 'Många bohuslänsöar har pensionat, vandrarhem eller stuguthyrning. Sommarsäsongen är extremt eftertraktad — boka 3+ månader i förväg för juli och hummerveckan i september. Se "Boende"-sektionen.' },
  { q: 'Är {{name}} bra för en dagstur?',
    a: 'Ja, många bohuslänsöar fungerar utmärkt som dagstur från Göteborg eller via E6. Räkna med körtid + ev. färjetid, sen 3–5 timmar på plats. Sommartid trängsel — välj morgon eller lågsäsong för bästa upplevelse.' },
  { q: 'Finns det gästhamn för egen båt på {{name}}?',
    a: 'De flesta bohuslänsorter har gästhamn med el, dusch och mack. Pris: 250–450 kr/natt under högsäsong (juli). Förboka via gasthamn.se vid hummerveckan, midsommar och storhelger — fyller snabbt.' },
  { q: 'Är {{name}} barnvänligt?',
    a: 'Bohusläns kust har många trygga klippbad, lekplatser och korta promenader. Bilfria fiskelägen är särskilt familjevänliga. Saknas oftast inomhusalternativ — välj fina dagar.' },
]

// ─── Region-routing ─────────────────────────────────────────────────────────

function getUniqueForRegion(region: IslandRegion): Record<string, FAQ[]> {
  if (region === 'bohuslan') return UNIQUE_BOHUSLAN
  // norra/mellersta/södra → Stockholms skärgård
  return UNIQUE_STOCKHOLM
}

function getTemplateForRegion(region: IslandRegion): FAQ[] {
  if (region === 'bohuslan') return TEMPLATE_BOHUSLAN
  return TEMPLATE_STOCKHOLM
}

export function getFaqsForIsland(island: Pick<Island, 'slug' | 'name' | 'region'>): FAQ[] {
  const unique = getUniqueForRegion(island.region)
  if (unique[island.slug]) return unique[island.slug]!
  const template = getTemplateForRegion(island.region)
  return template.map(t => ({
    q: t.q.replace(/{{name}}/g, island.name),
    a: t.a.replace(/{{name}}/g, island.name),
  }))
}

export function hasUniqueFaqs(slug: string, region: IslandRegion): boolean {
  return slug in getUniqueForRegion(region)
}
