/**
 * islandFaqs.ts — FAQ-data per ö.
 *
 * Strategi:
 *   1. 10 öar har handskrivna unika FAQ (de mest besökta).
 *   2. Resterande öar får mall-FAQ med ortnamn-substitution via getFaqsForIsland().
 *   3. Alla returnerade FAQ:er är markupkompatibla med schema.org/FAQPage.
 *
 * Lägg till fler unika FAQ när du har tid — de förbättrar SEO och Featured Snippets.
 */

import type { Island } from '@/app/o/island-data'

export interface FAQ {
  q: string
  a: string
}

// ─── Unika FAQ för de viktigaste öarna ─────────────────────────────────────
const UNIQUE: Record<string, FAQ[]> = {
  sandhamn: [
    { q: 'Hur tar jag mig till Sandhamn?',
      a: 'Waxholmsbolaget trafikerar Sandhamn året om från Strömkajen och Stavsnäs. På sommaren går även Cinderella-båtarna direkt från Strandvägen i Stockholm. Restid: ca 2–3 timmar från Strömkajen, 1 timme från Stavsnäs.' },
    { q: 'Vad är värt att göra på Sandhamn?',
      a: 'Besök Seglarrestaurangen, promenera till Trouville-stranden för bad och dyner, vandra till Västerudd för utsikt över öppet hav, eller besök KSSS:s anrika klubbhus. Sandhamn är hemma för Gotland Runt-seglingen i juli.' },
    { q: 'Finns det boende på Sandhamn?',
      a: 'Sands Hotell & Konferens, Sandhamns Värdshus och Hotell Seglarhotellet erbjuder övernattningar. Boka i god tid — sommaren är extremt populär, särskilt under Gotland Runt-veckan.' },
    { q: 'Kan man åka till Sandhamn på dagstur?',
      a: 'Absolut. Tidiga avgångar från Strömkajen ger dig 5–6 timmar på ön innan kvällsbåten tillbaka. En lunch på Seglarrestaurangen, ett bad på Trouville och en runda i den gamla bymiljön är en perfekt dag.' },
    { q: 'Kostar det att ligga i hamn på Sandhamn?',
      a: 'Sandhamns gästhamn tar 250–350 kr/natt under högsäsong (juli) beroende på båtens längd. Förboka via gästhamnen vid storhelger och Gotland Runt — det blir oftast fullt.' },
    { q: 'Är Sandhamn barnvänligt?',
      a: 'Ja. Trouville-stranden är grund och säker, det finns lekplats vid hamnen och kortare promenader passar familjer. Saknar dock barnaktiviteter inomhus, så välj fint väder.' },
  ],
  grinda: [
    { q: 'Hur tar jag mig till Grinda?',
      a: 'Waxholmsbolaget från Strömkajen, Vaxholm eller Stavsnäs. Sommarsäsongen har täta avgångar — restid 1,5–2 timmar från Stockholm. Cinderella-båtarna gör också stopp.' },
    { q: 'Var ligger Grinda gästhamn?',
      a: 'Det finns två hamnar: Norra (Södra Sundet) med restaurang och kiosk, och Södra (vid Wärdshuset) som är mer skyddad. Båda har gästplatser, dusch och el.' },
    { q: 'Är Grinda Wärdshus värt besöket?',
      a: 'Ja. Det är ett klassiskt skärgårdsvärdshus med traditionell sjömanskost. Boka bord i förväg på sommaren. För enklare lunch finns Grinda Strandcafé vid hamnen.' },
    { q: 'Kan man bada på Grinda?',
      a: 'Ja, två klippbad och en barnvänlig sandstrand. Ön har också vandringsleder genom skogen. Cykla går också (uthyrning vid hamnen).' },
    { q: 'Finns det stuga att hyra på Grinda?',
      a: 'Skärgårdsstiftelsen hyr ut stugor och rum året runt — boka 6+ månader i förväg för sommaren. Det finns också ett vandrarhem.' },
    { q: 'Är Grinda eller Sandhamn bättre för en dagstur?',
      a: 'Grinda är närmare och lugnare — bra för en avkopplande dag. Sandhamn är mer levande och har bättre restauranger men kräver mer restid. Se vår jämförelse: /jamfor/sandhamn-vs-grinda' },
  ],
  moja: [
    { q: 'Hur kommer jag till Möja?',
      a: 'Waxholmsbolaget från Stavsnäs (45 min) eller Sollenkroka. Bilfärja går från Sollenkroka till Berg på Möja. Restid totalt: ca 1,5 timmar från Stockholm.' },
    { q: 'Vilken del av Möja ska jag åka till?',
      a: 'Berg och Långvik är de två huvudbyarna. Berg har mer service (Wikströms Fisk, Möjabutiken, krogar). Långvik är roligare för naturupplevelse och bad.' },
    { q: 'Finns det restauranger på Möja?',
      a: 'Möja Krog (Berg), Wikströms Fisk (Berg) — den legendariska räkmackan, och Långviks Brygga (Långvik). Möja Lanthandel & Kök serverar enkel mat med lokala produkter.' },
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
      a: 'Waxholmsbolaget från Strömkajen via Vaxholm — restid ca 2,5 timmar. Cinderella-båtarna direktförbindelser från Strandvägen sommartid. Inga bilar tillåtna på ön.' },
    { q: 'Vad är Finnhamns Wärdshus?',
      a: 'Skärgårdsstiftelsens klassiska värdshus med rum, restaurang och vandrarhem. Maten serveras på trädäcket med utsikt över hamnen. Öppen majstart till septemberslut.' },
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
      a: 'Waxholmsbolaget från Strömkajen (50 min), buss 670 från Tekniska Högskolan (45 min) eller bil via E18 (35 min). Tätaste tidtabellen i hela skärgården.' },
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

// ─── Mall-FAQ för alla andra öar (substitution {{name}}) ───────────────────
const TEMPLATE: FAQ[] = [
  { q: 'Hur tar jag mig till {{name}}?',
    a: 'Vanligaste sättet är med Waxholmsbolaget eller Cinderella-båtar från närmaste avgångshamn. Sommarsäsongen har tätare turer. Se aktuell tidtabell på vår färjsida (/farjor) eller på Waxholmsbolagets webbplats.' },
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

export function getFaqsForIsland(island: Pick<Island, 'slug' | 'name'>): FAQ[] {
  if (UNIQUE[island.slug]) return UNIQUE[island.slug]!
  return TEMPLATE.map(t => ({
    q: t.q.replace(/{{name}}/g, island.name),
    a: t.a.replace(/{{name}}/g, island.name),
  }))
}

export function hasUniqueFaqs(slug: string): boolean {
  return slug in UNIQUE
}
