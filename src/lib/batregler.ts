// Lokala föreskrifter för båt på öar där komma-dit visar allemansrättens regler för båt (egenBatFard i
// src/app/o/[slug]/komma-dit/page.tsx). Mallarnas runda 9, 2026-11-17 (mall-N025 till N042).
//
// Regeln: varje ö där rutan visas är genomgången i öns egen data (island-data.ts: kort, hamnar, tips, KÄLLA-rader) och hos
// myndigheten för området (Länsstyrelsens sida för reservatet eller nationalparken, nationalparksföreskrifterna,
// Länsstyrelsen i Stockholms läns föreskrifter om ankringsförbud) efter förbud eller begränsningar för ankring, förtöjning,
// tillträde eller fart.
//   1. Lokalt förbud som myndigheten (nivå 1) anger: rutan börjar med förbudet (LOKALA_BATREGLER). I ett skyddat område
//      (SKYDDADE_OMRADEN) inleds det med SKYDDAT_INLEDNING; ett ankringsförbud vid en kabel (ANKRINGSFORBUD_VID_KABEL) står
//      utan inledning, eftersom Naturvårdsverkets mening bara gäller skyddade områden (Kontrollantens fynd sm07-k016;
//      mallarnas runda 10, 2026-11-17).
//   2. Lokalt förbud som bara en verksamhet (nivå 2) eller aggregator anger: rutan visas inte (BATRUTA_DOLD). Förbudet kan
//      inte skrivas utan nivå 1, och den allmänna regeln ska inte stå ensam bredvid öns eget kort om förbudet.
//   3. Inget lokalt förbud hittat: rutan visas med förbehållet att lokala föreskrifter går före (GRANSKADE_UTAN_FORBUD).
// Sjötrafikföreskrifternas fartbegränsningar i Stockholms län (01FS 2001:138) är inte genomsökta; omtrycket hittades inte.
// Texterna är utan tankstreck och klockslag. En URL per KÄLLA-rad.

// Nämdöskärgårdens nationalpark (Bullerö, Ormskär och huvuddelen av Långviksskär).
// KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/nationalparker/namdoskargardens-nationalpark.html — "Du får ankra eller lägga till med fartyg på samma plats upp till två dygn i följd.", "Du får inte köra motordrivet fartyg snabbare än 5 knop inom 100 meter från land.", "I vissa särskilt känsliga områden är det förbjudet att ankra, köra motordrivet fartyg eller framföra någon typ av fartyg (båt, kajak, SUP-bräda och liknande).", "Under aktuella perioder får du inte vara i områden med tillträdesförbud (så kallade fågelskyddsområden)." (läst 2026-11-17)
const NAMDO = [
  'I nationalparken får du ankra eller lägga till på samma plats högst två dygn i följd, och du får inte köra motordriven båt fortare än 5 knop inom 100 meter från land.',
  'I vissa särskilt känsliga områden i nationalparken är det förbjudet att ankra, att köra motordriven båt eller att färdas med någon typ av farkost, även kajak och SUP-bräda.',
  'Under de aktuella perioderna får du inte vara i nationalparkens fågelskyddsområden, som har tillträdesförbud.',
]

// Länsstyrelsen i Stockholms läns föreskrifter om ankringsförbud (Storholmen, Smådalarö, Väddö).
// KÄLLA: https://www.lansstyrelsen.se/download/18.4e0415ee166afb59324b782/1541414119836/01FS%202001%20074%20L%C3%A4nsstyrelsens%20i%20Stockholms%20l%C3%A4n%20f%C3%B6reskrifter%20om%20ankringsf%C3%B6rbud%20inom%20Stockholms%20l%C3%A4n.pdf — "Ankringsförbud skall gälla inom de områden och i övrigt i enlighet vad som anges nedan i punkterna 1–208.", "skall sådana vara uppsatta på lämpliga platser vid stränderna i anslutning till den anordning som ankringsförbudet avser att skydda.", "Den som bryter mot ett ankringsförbud kan dömas" (01FS 2001:74) (läst 2026-11-17)
// KÄLLA: https://lansstyrelsen.se/download/18.2c30d6f167c5e8e7c015aaf/1547824511573/01FS%202019%20001%20F%C3%B6rteckning%20%C3%B6ver%20f%C3%B6reskrifter%20och%20allm%C3%A4nna%20r%C3%A5d%20utf%C3%A4rdade%20av%20L%C3%A4nsstyrelsen%20i%20Stockholms%20l%C3%A4n%20och%20som%20g%C3%A4ller%20den%2031%20december%202018.pdf — "Föreskrifter om ankringsförbud", "Ändrad p. 180", "Ändrad, p. 92" (01FS 2001:74 gällde 31 december 2018; punkterna 3, 7, 83 och 128 inte ändrade) (läst 2026-11-17)
const SKYLTAR = 'Förbudsområdet ska vara utmärkt med skyltar vid stranden.'

// Inledningen i skyddade områden (mall-N025, omarbetad i runda 10). Förut "Lokala föreskrifter går före allemansrätten, och du
// är skyldig att följa dem." på alla 14 öar, också där föreskriften är ett ankringsförbud vid en kabel.
// KÄLLA: https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/skyddade-omraden/ — "Allemansrätten gäller även i skyddade områden, men den kan vara begränsad eller i vissa fall utökad.", "Som besökare eller markägare är du skyldig att följa reglerna." (läst 2026-11-17)
export const SKYDDAT_INLEDNING = 'Allemansrätten gäller även i skyddade områden, men den kan vara begränsad, och som besökare är du skyldig att följa områdets regler.'

export const LOKALA_BATREGLER: Record<string, string[]> = {
  // KÄLLA: https://www.lansstyrelsen.se/sodermanland/besoksmal/naturreservat/asko.html — "för längre tid än två dygn i följd förankra båt vid samma strand", "Öarna Skåren, Gråskär och del av Isskären är fågelskyddsområden med beträdnadsförbud 1 april–15 juli. Asenskallen har beträdnadsförbud 1 april–31 juli.", "På södra udden och halvön Kyrkogårdsskär ligger ett militärt skjutfält.", "Det är förbjudet att beträda området." (läst 2026-11-17)
  asko: [
    'I Askö naturreservat får du inte ligga förankrad vid samma strand mer än två dygn i följd.',
    'Skåren, Gråskär och en del av Isskären är fågelskyddsområden med beträdnadsförbud 1 april till 15 juli, och Asenskallen har beträdnadsförbud 1 april till 31 juli.',
    'Södra udden och halvön Kyrkogårdsskär är militärt skjutfält, och det är förbjudet att beträda området.',
  ],
  // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/nationalparker/namdoskargardens-nationalpark.html — "Bullerö är nationalparkens entré" (läst 2026-11-17)
  bullero: ['Bullerö ligger i Nämdöskärgårdens nationalpark.', ...NAMDO],
  // KÄLLA: https://geodata.naturvardsverket.se/handlingar/rest/dokument/1031975 — "Lagunerna är talrika kring de större öarna Koskären, Brunskär, Ormskär, Braka, Söderö och Långviksskär i den sydvästra delen av nationalparken" (Skötselplan för Nämdöskärgårdens nationalpark och Långviksskärs naturreservat, rapport 7202, november 2025) (läst 2026-11-17)
  ormskar: ['Ormskär ligger i Nämdöskärgårdens nationalpark.', ...NAMDO],
  // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/langviksskar.html — "När Nämdöskärgårdens nationalpark bildades år 2025 övergick huvuddelen av det som tidigare var Långviksskärs naturreservat till att bli nationalpark, men en mindre del kvarstår som reservat.", "ankra eller förtöja farkost vid brygga,", "ankra eller förtöja farkost på samma plats mer än två dygn i följd" (läst 2026-11-17)
  langviksskaret: [
    'Huvuddelen av Långviksskär blev nationalpark 2025, och en mindre del är kvar som naturreservat. I reservatsdelen är det förbjudet att ankra eller förtöja vid brygga och att ankra eller förtöja på samma plats mer än två dygn i följd.',
    ...NAMDO,
  ],
  // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/svenska-hogarna.html — "under tiden 1 februari – 15 augusti beträda eller färdas eller uppehålla sig inom område A med tillträdesförbud", "under tiden 1 april – 31 juli beträda eller färdas eller uppehålla sig inom område B med tillträdesförbud", "under tiden 1 maj- 30 juni beträda eller färdas eller uppehålla sig inom område C med tillträdesförbud" (läst 2026-11-17)
  // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/svenska-hogarna.html — "framföra båt, fartyg eller annan vattenfarkost inom område som angivits på karta, bilaga 1C i beslutet,", "framföra båt, fartyg eller annan vattenfarkost med högre hastighet än 5 knop inom område som angivits på karta, bilaga 1C i beslutet,", "ankra båt eller fartyg inom område som angivits på karta, bilaga 1C i beslutet," (läst 2026-11-17)
  // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/svenska-hogarna.html — "förtöja båt eller fartyg på allemansrättslig grund längre än två dygn i följd vid samma strand eller brygga.", "landstiga med större sällskap än 10 personer. Landstigning med större sällskap får dock ske efter samråd med förvaltaren om villkoren för detta," (läst 2026-11-17)
  'svenska-hogarna': [
    'Svenska Högarnas naturreservat har tillträdesförbud i områden som anges på beslutskartan: område A 1 februari till 15 augusti, område B 1 april till 31 juli och område C 1 maj till 30 juni. Där får du varken beträda området, färdas eller uppehålla dig.',
    'På kartan i bilaga 1C till reservatsbeslutet anges vattenområden där det är förbjudet att framföra båt, att köra fortare än 5 knop och att ankra.',
    'Du får inte förtöja på allemansrättslig grund längre än två dygn i följd vid samma strand eller brygga, och ett sällskap större än tio personer får landstiga bara efter samråd med förvaltaren.',
  ],
  // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/huvudskar.html — "200 öar i Huvudskärs naturreservat", "för längre tid än två dygn i följd förankra båt vid samma strand" (läst 2026-11-17)
  huvudskar: ['I Huvudskärs naturreservat får du inte ligga förankrad vid samma strand mer än två dygn i följd.'],
  // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/norrpada.html — "för längre tid än två dygn i följd förtöja båt vid samma plats" (läst 2026-11-17)
  norrpada: ['I Norrpada naturreservat får du inte förtöja båten vid samma plats mer än två dygn i följd.'],
  // Runda 11 (sr04-k010, sb05-k014): alla förbud i Länsstyrelsens lista som gäller den som kommer med båt, också eldningsförbudet.
  // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/langskar.html — "I reservatet är det förbjudet att", "Under tiden 1 februari–15 augusti beträda utpekat fågelskyddsområde (se karta i föreskrifterna)", "förankra båt vid samma plats mer än två dygn", "elda", "framföra motordriven farkost snabbare än 7 knop med undantag för utpekat område (se karta i föreskrifterna)." (läst 2026-11-25, i Chromium)
  langskar: [
    'Det utpekade fågelskyddsområdet i Långskärs naturreservat får inte beträdas 1 februari till 15 augusti. Kartan finns i föreskrifterna.',
    'Motordriven båt får inte köras fortare än 7 knop utom i ett utpekat område, och du får inte ligga förankrad på samma plats mer än två dygn.',
    'Det är förbjudet att elda i reservatet.',
  ],
  // KÄLLA: https://www.lansstyrelsen.se/gotland/besoksmal/naturreservat/lilla-karlso.html — "under tiden 1/3–31/8 vistas på ön utan tillstånd av länsstyrelsen eller av länsstyrelsen förordnad tillsynsman för reservatet.", "Under tiden 1/9–28/2 äger allmänheten rätt att vistas på ön efter skriftlig anmälan. Besökare skall därvid göra sådan anmälan omedelbart efter ilandstigning vid bryggan på öns östra sida.", "landstiga på annan plats än vid bryggan på öns östra sida utan tillstånd av länsstyrelsen eller av länsstyrelsen förordnad tillsynsman för reservatet", "under tiden 1/2–31/8 beträda eller vistas inom de delar av naturreservatet som omfattas av fågelskydd" (läst 2026-11-17)
  'lilla-karlso': [
    'Du får bara landstiga vid bryggan på öns östra sida, om du inte har tillstånd av Länsstyrelsen eller reservatets tillsynsman.',
    '1 mars till 31 augusti får du inte vistas på ön utan sådant tillstånd. 1 september till 28 februari får du vistas där efter skriftlig anmälan, som görs direkt efter landstigningen vid bryggan.',
    'De delar av reservatet som omfattas av fågelskydd får inte beträdas 1 februari till 31 augusti.',
  ],
  // KÄLLA: https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/gotska-sandon/besok-parken/hitta-hit — "Det finns ingen hamn så du får ankra utanför på en läsida. Observera att det finns ett sälskyddsområde vid Säludden i nordost. Det är ankringsförbud vid Tärnudden." (läst 2026-11-25, i Chromium)
  // Tärnudden prövat i föreskrifterna (Kontrollantens fynd sm07-k044; runda 10): förbudet står inte i nationalparksföreskrifterna
  // NFS 2014:7 (gäller från 2015-01-01; bara Säludden och vattenskoter om vattnet). Skötselplanen anger grunden: en elkabel och
  // Länsstyrelsen i Gotlands läns föreskrift 09FS 2006:4. Den föreskriften finns inte i länets författningssamling på webben
  // (listan går tillbaka till 2017) och är inte läst, så att den gäller i dag är inte belagt (sr02-k006). Runda 11: förbudet
  // står med sverigesnationalparker.se som källa, och föreskriften nämns bara tillskriven skötselplanen.
  // KÄLLA: https://www.naturvardsverket.se/globalassets/nfs/2014/nfs-2014-7.pdf — "Naturvårdsverkets föreskrifter", "om Gotska Sandöns nationalpark;", "beträda eller färdas inom sälskyddsområdet vid Säludden, enligt karta i" (NFS 2014:7) (läst 2026-11-17)
  // KÄLLA: https://www.naturvardsverket.se/globalassets/media/publikationer-pdf/ovriga-pub/skotselplaner-nationalparker/978-91-620-8810-1.pdf — "Ankring med båt är tillåtet runt hela Gotska Sandön, med undantag för en", "sektor vid Tärnudden på grund av elkabel (Länsstyrelsen i Gotlands läns", "föreskrift 09FS 2006:4) samt inom sälskyddsområdet." (Skötselplan för Gotska Sandöns nationalpark, rapport 8810, 2018) (läst 2026-11-25)
  // KÄLLA: https://www.lansstyrelsen.se/gotland/besoksmal/nationalparker/gotska-sandons-nationalpark.html — "beträda eller färdas inom sälskyddsområdet vid Säludden, enligt karta i bilaga 1, förutom inom anvisat område för gömsle och spång,", "framföra vattenskoter, förutom för transport till och från land kortast möjliga sträcka från nationalparksgränsen," (läst 2026-11-17)
  'gotska-sandon': [
    'Det är ankringsförbud vid Tärnudden. Det finns ingen hamn, så du ankrar utanför på en läsida.',
    'Enligt Naturvårdsverkets skötselplan för nationalparken från 2018 gäller förbudet en sektor vid Tärnudden på grund av en elkabel, och planen hänvisar till Länsstyrelsen i Gotlands läns föreskrift 09FS 2006:4.',
    'I sälskyddsområdet vid Säludden i nordost får du varken beträda området eller färdas, utom i det anvisade området vid gömslet och spången.',
    'Vattenskoter får bara köras kortaste vägen mellan nationalparksgränsen och land.',
  ],
  // KÄLLA: https://www.naturvardsverket.se/4ac67d/globalassets/nfs/2014/nfs-2014-8.pdf — "om Blå Jungfruns nationalpark", "3 § Inom nationalparken är det förbjudet att", "framföra motorbåt, vattenskoter eller annan motordriven farkost med högre hastighet än åtta (8) knop," (NFS 2014:8) (läst 2026-11-17)
  'bla-jungfrun': ['I Blå Jungfruns nationalpark får motorbåt, vattenskoter eller annan motordriven farkost inte köras fortare än 8 knop.'],
  // KÄLLA: https://www.lansstyrelsen.se/download/18.4e0415ee166afb59324b782/1541414119836/01FS%202001%20074%20L%C3%A4nsstyrelsens%20i%20Stockholms%20l%C3%A4n%20f%C3%B6reskrifter%20om%20ankringsf%C3%B6rbud%20inom%20Stockholms%20l%C3%A4n.pdf — "83. Förbudsområde: Vid kabel i Stora Värtan mellan Lidingö och Storholmen." (läst 2026-11-17)
  storholmen: [
    'Länsstyrelsen har föreskrivit ankringsförbud vid kabeln i Stora Värtan mellan Lidingö och Storholmen (01FS 2001:74, punkt 83).',
    SKYLTAR,
  ],
  // KÄLLA: https://www.lansstyrelsen.se/download/18.4e0415ee166afb59324b782/1541414119836/01FS%202001%20074%20L%C3%A4nsstyrelsens%20i%20Stockholms%20l%C3%A4n%20f%C3%B6reskrifter%20om%20ankringsf%C3%B6rbud%20inom%20Stockholms%20l%C3%A4n.pdf — "128. Förbudsområde: Vid kabel i sundet mellan fastlandet och Edesön i Dalarö inom ett område av 100 meter på ömse sidor om kabeln.", "fastlandet (Smådalarö)" (läst 2026-11-17)
  smadalaro: [
    'Länsstyrelsen har föreskrivit ankringsförbud inom 100 meter på ömse sidor om kabeln i sundet mellan Smådalarö och Edesön (01FS 2001:74, punkt 128).',
    SKYLTAR,
  ],
  // KÄLLA: https://www.lansstyrelsen.se/download/18.4e0415ee166afb59324b782/1541414119836/01FS%202001%20074%20L%C3%A4nsstyrelsens%20i%20Stockholms%20l%C3%A4n%20f%C3%B6reskrifter%20om%20ankringsf%C3%B6rbud%20inom%20Stockholms%20l%C3%A4n.pdf — "7. Förbudsområde: Vid kabel i Väddö kanal vid norra ändan av Storfjärden inom ett område av 100 meter på ömse sidor om kabeln.", "3. Förbudsområde: Vid kabel i Ornefjärden mellan Grisslehamn och Byholma inom ett område av 150 meter på ömse sidor om kabeln." (läst 2026-11-17)
  vaddo: [
    'Länsstyrelsen har föreskrivit ankringsförbud inom 100 meter på ömse sidor om kabeln i Väddö kanal vid norra ändan av Storfjärden, och inom 150 meter på ömse sidor om kabeln i Ornefjärden mellan Grisslehamn och Byholma (01FS 2001:74, punkterna 7 och 3).',
    SKYLTAR,
  ],
}

// Grunden för förbudet, som avgör inledningen i rutan (runda 10). Gotska Sandön är nationalpark; förbudet vid Tärnudden gäller en
// kabel men står i samma ruta som nationalparkens föreskrifter.
export const SKYDDADE_OMRADEN = new Set<string>([
  'asko', 'bullero', 'ormskar', 'langviksskaret', 'svenska-hogarna', 'huvudskar', 'norrpada', 'langskar', 'lilla-karlso',
  'gotska-sandon', 'bla-jungfrun',
])
export const ANKRINGSFORBUD_VID_KABEL = new Set<string>(['storholmen', 'smadalaro', 'vaddo'])

/** Inledningen före öns första föreskrift: SKYDDAT_INLEDNING i skyddade områden, ingen vid ett ankringsförbud vid en kabel. */
export function batregelInledning(slug: string): string | null {
  return SKYDDADE_OMRADEN.has(slug) ? SKYDDAT_INLEDNING : null
}

// Birka: öns eget kort anger ankringsförbud i viken och inom 50 meter från strandkanten, med källa
// https://www.birkavikingastaden.se/hitta-pa-birka/gasthamnen/ (nivå 2). Länsstyrelsens sida om Björkö naturreservat (läst
// 2026-11-17) har inga föreskrifter om ankring, och Björkö finns inte bland Ekerö kommuns punkter i 01FS 2001:74.
export const BATRUTA_DOLD = new Set<string>(['birka'])

// Genomgångna utan lokalt förbud för ankring, förtöjning, tillträde eller fart (2026-11-17): Länsstyrelsens sidor för
// Storskärs, Trysundas och Hanös naturreservat har inga sådana föreskrifter; för Yttre Gården finns inget reservat i
// Nynäshamns kommun i Naturvårdsregistret och ingen punkt i 01FS 2001:74.
export const GRANSKADE_UTAN_FORBUD = new Set<string>(['storskar', 'trysunda', 'hano', 'yttre-garden'])

/**
 * Visas båtrutan på ön? Bara på öar som är genomgångna enligt regeln ovan (LOKALA_BATREGLER eller GRANSKADE_UTAN_FORBUD).
 * Main har sedan runda 9 fått 43 nya öar, och på 16 av dem skulle rutan visas utan att någon har letat efter lokala
 * förbud (Ringsö, Kråmö, Fågelskär, Runnö, Furön, Limön, Agön, Rödkallen, Vendelsö, Balgö, Malön, Djurö nationalpark,
 * Brommö, Onsö, Utklippan, Stora Karlsö; MÄTT 2026-11-17, mallarnas runda 10). De får rutan när de är genomgångna.
 */
export function batrutaGranskad(slug: string): boolean {
  return !BATRUTA_DOLD.has(slug) && (slug in LOKALA_BATREGLER || GRANSKADE_UTAN_FORBUD.has(slug))
}
