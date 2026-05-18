/**
 * aventyr.ts — datakälla för äventyrssidorna /gotland/aventyr, /aland/aventyr,
 * /oland/aventyr.
 *
 * 8 äventyr per destination (inte 10 — färre välbeskrivna är bättre än
 * 10 där några är fabricerade detaljer). Inga specifika priser eller
 * öppettider — säg "kolla aktuellt" istället.
 *
 * Designregel: bara etablerade destinationer som ofta nämns i officiella
 * turistmaterial. Inga sub-agent-uppfunna platser.
 */

export type Transport = 'bil' | 'kollektivt' | 'cykel'

export interface Aventyr {
  slug: string
  title: string
  beskrivning: string
  transport: Transport
  ungefarTid: string  // "Halvdag", "Heldag" eller "Resa: 30 min från Visby"
  bastaManad: string   // "Maj-Sep", "Juli-Aug"
  startPunkt: string
  emoji: string
}

export interface Destination {
  slug: string  // "gotland", "aland", "oland"
  namn: string
  introTitle: string
  introDescription: string
  metaTitle: string
  metaDescription: string
  /** Region-huvudort som "resa från" referensteras mot. */
  huvudort: string
  aventyr: Aventyr[]
}

// ── GOTLAND ─────────────────────────────────────────────────────────────
export const GOTLAND: Destination = {
  slug: 'gotland',
  namn: 'Gotland',
  huvudort: 'Visby',
  introTitle: '8 äventyr på Gotland — för turisten utan och med bil',
  introDescription: 'Färdiga förslag uppdelade efter transportsätt. Bil-tunga upplevelser längs Gotlands ytter- och innerlandskap, samt cykel- och busstillvalsärenden som funkar utan egen bil.',
  metaTitle: '8 äventyr på Gotland — guide för bilist, cyklist och bussresenär | Svalla',
  metaDescription: '8 handplockade Gotlands-äventyr fördelade efter transport. Med bil till Färö och Lummelunda, med cykel runt norra Gotland, med buss till Roma och Tofta.',
  aventyr: [
    {
      slug: 'faro-dagstur',
      title: 'Färö — dagstur till Gotlands ytterspets',
      beskrivning: 'Färö är den lilla ön norr om Gotland — kontinentens raukar, ödsligt landskap och Ingmar Bergmans miljöer. Bilfärjan går från Fårösund och tar några minuter. På Färö rör du dig bäst med bil eftersom avstånden mellan severdheterna är stora. Spela ett halvt dygn eller mer.',
      transport: 'bil',
      ungefarTid: 'Heldag — räkna 45 min till Fårösund från Visby + färja',
      bastaManad: 'Juni–september',
      startPunkt: 'Bilfärja från Fårösund (gratis)',
      emoji: '🪨',
    },
    {
      slug: 'lummelunda-grottan',
      title: 'Lummelunda grottan — geologisk magi',
      beskrivning: 'Sveriges längsta turistgrotta med dramatiska kalkstenformationer och underjordiska vatten. Guidade turer flera gånger om dagen. Området har också naturreservat ovan jord och en restaurang för lunch. En av Gotlands mest besökta sevärdheter — boka biljett i förväg på sommaren.',
      transport: 'bil',
      ungefarTid: 'Halvdag — 20 min från Visby',
      bastaManad: 'Maj–september',
      startPunkt: 'Lummelundagrottans entré, norr om Visby på väg 149',
      emoji: '🗝',
    },
    {
      slug: 'hoburgen-sydspetsen',
      title: 'Hoburgen — Gotlands sydspets och rauk-trollet',
      beskrivning: 'Den klassiska "Hoburgsgubben" — en rauk som ser ut som en gammal man — står ute på Gotlands sydspets. Området har vackra klippstränder, fyr och utsikt över öppna havet. Bra för dramatiska solnedgångar och fågelskådning. Restaurang i närheten under säsong.',
      transport: 'bil',
      ungefarTid: 'Halvdag till heldag — 90 min från Visby',
      bastaManad: 'Maj–oktober',
      startPunkt: 'Hoburgen, längst söder på Gotland',
      emoji: '🗿',
    },
    {
      slug: 'raukar-ostkusten',
      title: 'Raukar längs ostkusten — Folhammar och Ljugarn',
      beskrivning: 'Gotlands östra kust är ett av Sveriges geologiskt mest dramatiska landskap. Folhammars rauk-fält söder om Ljugarn är klassiskt — knubbiga kalkstenformationer mot havet. Kombinera med bad i Ljugarn (en av Gotlands populäraste badorter) och lunch i samhället.',
      transport: 'bil',
      ungefarTid: 'Heldag — 60 min från Visby',
      bastaManad: 'Juni–september',
      startPunkt: 'Ljugarn, väg 143 från Visby',
      emoji: '🌅',
    },
    {
      slug: 'visby-stadsvandring',
      title: 'Visby — medeltidsstaden till fots',
      beskrivning: 'Visby är ett av Europas bäst bevarade medeltida stadsmiljöer och UNESCO-världsarv sedan 1995. Hela innerstaden går att gå runt på några timmar. Ringmuren, ruinerna av flera medeltida kyrkor och de smala gränderna är poängen. Botaniska trädgården är gratis och vacker. Buss från Visby flygplats tar dig till stadskärnan på tio minuter.',
      transport: 'kollektivt',
      ungefarTid: 'Halvdag — kollektivt från flygplats eller färjeterminal',
      bastaManad: 'Maj–september',
      startPunkt: 'Visby stadskärna (alla bussar går dit)',
      emoji: '🏰',
    },
    {
      slug: 'roma-kloster',
      title: 'Roma kloster — medeltida ruin på inlandet',
      beskrivning: 'Roma var en gång Gotlands rikaste cistercienserkloster. Ruinen står kvar mitt i en park och är fritt tillgänglig. På sommaren spelas Romateatern i ruinerna med klassisk teater. Roma nås med lokalbuss från Visby — ungefär 25 minuter med regional buss. Kombinera med café eller butik i den lilla orten.',
      transport: 'kollektivt',
      ungefarTid: 'Halvdag — buss 11 från Visby (cirka 25 min)',
      bastaManad: 'Maj–september (teater juli–augusti)',
      startPunkt: 'Visby busstation (Östercentrum)',
      emoji: '⛪',
    },
    {
      slug: 'norra-gotland-cykel',
      title: 'Cykla runt norra Gotland — flerdagars rundtur',
      beskrivning: 'Norra Gotland är cyklarens dröm — platta vägar, små samhällen, fyrar och badstränder. En klassisk rundtur går Visby—Slite—Lärbro—Fårösund och tillbaka, ungefär 150 kilometer som du fördelar på två-tre dagar. Hyr cykel i Visby, packa lätt och övernatta längs vägen. Bilfärja till Färö ingår i upplevelsen.',
      transport: 'cykel',
      ungefarTid: '2–3 dagar — start och slut i Visby',
      bastaManad: 'Maj–september',
      startPunkt: 'Cykeluthyrning i Visby',
      emoji: '🚴',
    },
    {
      slug: 'visby-ljugarn-cykel',
      title: 'Cykla Visby till Ljugarn — ostkustleden',
      beskrivning: 'En klassiker för dig som vill cykla men inte gå hela vägen runt ön. Visby till Ljugarn är cirka 50 kilometer, passar att göra på en dag om du är van eller över två dagar med övernattning. Du följer mestadels mindre vägar med utsikt över inlandet och kan göra avstickare till Roma kloster, Lojsta hed eller naturreservaten. Tag tåget bussen tillbaka eller cykla rundan.',
      transport: 'cykel',
      ungefarTid: 'Heldag — ca 50 km',
      bastaManad: 'Maj–september',
      startPunkt: 'Visby cykeluthyrning',
      emoji: '🚲',
    },
  ],
}

// ── ÅLAND ───────────────────────────────────────────────────────────────
export const ALAND: Destination = {
  slug: 'aland',
  namn: 'Åland',
  huvudort: 'Mariehamn',
  introTitle: '8 äventyr på Åland — för turisten utan och med bil',
  introDescription: 'Åland är en cyklisternas dröm — platt landskap, korta avstånd, små vägar. Bilen behövs egentligen bara för att komma till de mest avlägsna öarna. Här är åtta sätt att uppleva ögruppen.',
  metaTitle: '8 äventyr på Åland — guide för cyklist, bilist och båtresenär | Svalla',
  metaDescription: 'Åländska äventyr fördelade efter transport. Cykla från Mariehamn till Eckerö, bilfärja till Kökar, Kastelholms slott, Bomarsunds fästning och mer.',
  aventyr: [
    {
      slug: 'kastelholm-slott',
      title: 'Kastelholms slott — Ålands medeltida fästning',
      beskrivning: 'Kastelholm är Ålands enda medeltida slott och en av Nordens äldsta bevarade befästningar. Du går runt på egen hand eller med guidning. I anslutning ligger Jan Karlsgårdens friluftsmuseum med traditionellt bondgårdsliv från olika tidsepoker. Båda nås enkelt med bil från Mariehamn — cirka 25 minuter.',
      transport: 'bil',
      ungefarTid: 'Halvdag till heldag — 25 min från Mariehamn',
      bastaManad: 'Maj–september',
      startPunkt: 'Kastelholm, Sund kommun',
      emoji: '🏰',
    },
    {
      slug: 'bomarsunds-fastning',
      title: 'Bomarsunds fästning — krimkrigets minnen',
      beskrivning: 'Bomarsund byggdes av Ryssland på 1830-talet och bombarderades till ruiner av brittisk-fransk flotta under Krimkriget 1854. Idag är platsen ett välbevarat ruinkomplex med besökscenter, fri tillgång till området och guidning på sommaren. Vacker plats med havsutsikt.',
      transport: 'bil',
      ungefarTid: 'Halvdag — 30 min från Mariehamn',
      bastaManad: 'Maj–september',
      startPunkt: 'Bomarsund, Sund kommun (i närheten av Kastelholm)',
      emoji: '💥',
    },
    {
      slug: 'kokar-bilfarja',
      title: 'Kökar — bilfärja till ytterskärgården',
      beskrivning: 'Kökar är ett av Ålands mest avlägsna och fascinerande resmål — en liten kommun längst söderut med medeltida kyrka, sälsafariområden och autentisk skärgårdskänsla. Bilfärjan från Långnäs tar mellan två och tre timmar enkelriktat. Tag åtminstone en övernattning för att uppleva ön i sin helhet.',
      transport: 'bil',
      ungefarTid: 'Övernattning — färja från Långnäs',
      bastaManad: 'Juni–augusti',
      startPunkt: 'Långnäs färjeterminal',
      emoji: '⛴',
    },
    {
      slug: 'jan-karlsgarden',
      title: 'Jan Karlsgården — bondegårdsliv i bevarade hus',
      beskrivning: 'Friluftsmuseet ligger granne med Kastelholm och består av traditionella åländska byggnader flyttade hit från hela ögruppen. Du går igenom hus från 1700- och 1800-talen, ladugårdar och stugor. Bra för familjer med barn. Bil rekommenderas eftersom kollektivtrafiken är gles.',
      transport: 'bil',
      ungefarTid: 'Halvdag — 25 min från Mariehamn',
      bastaManad: 'Maj–september',
      startPunkt: 'Jan Karlsgården, Sund',
      emoji: '🏠',
    },
    {
      slug: 'mariehamn-till-eckero-cykel',
      title: 'Mariehamn till Eckerö på cykel',
      beskrivning: 'En av Ålands klassiska cykeltursrutter — cirka 30 kilometer västerut från Mariehamn till Eckerö och Storby. Vägen följer mestadels lugna bygdevägar och du passerar små samhällen, vatten och skogspartier. Vid Storby finns Post & Tullhuset från 1828, idag museum. Tag färja eller buss tillbaka om du inte vill cykla samma väg igen.',
      transport: 'cykel',
      ungefarTid: 'Heldag — ca 30 km enkel väg',
      bastaManad: 'Maj–september',
      startPunkt: 'Mariehamn cykeluthyrning',
      emoji: '🚴',
    },
    {
      slug: 'lemland-lumparland-cykel',
      title: 'Cykla Lemland och Lumparland — sydöstra hörnet',
      beskrivning: 'Två relativt små kommuner sydost om Mariehamn som hänger ihop med bro. Cykla genom låglandskap, små byar och längs Lumparns kust. Lemland har medeltida kyrka och Granö-tornet med utsikt. En halvdagstur till heldagstur beroende på hur många avstickare du gör.',
      transport: 'cykel',
      ungefarTid: 'Halvdag — start och slut i Mariehamn',
      bastaManad: 'Maj–september',
      startPunkt: 'Mariehamn cykeluthyrning',
      emoji: '🚲',
    },
    {
      slug: 'skargardshoppning-passagerarbat',
      title: 'Skärgårdshoppning med passagerarbåt',
      beskrivning: 'Åland har passagerarbåttrafik mellan flera kommuner i ytterskärgården under sommaren. Du kan välja att hoppa mellan öar som Brändö, Kumlinge och Sottunga utan att ha bil. Tag med matsäck eftersom utbudet är begränsat ute, och boka övernattning i förväg om du planerar nätter ute. Aktuell tidtabell finns hos Ålandstrafiken.',
      transport: 'kollektivt',
      ungefarTid: 'Heldag eller flera dagar',
      bastaManad: 'Juni–augusti',
      startPunkt: 'Långnäs eller Hummelvik (beroende på rutt)',
      emoji: '🛥',
    },
    {
      slug: 'mariehamn-stadsvandring',
      title: 'Mariehamn — stadsvandring till fots',
      beskrivning: 'Mariehamn är Nordens minsta huvudstad med drygt 11 000 invånare och en stadsmiljö som går att utforska på en eftermiddag. Esplanaden, Sjöfartsmuseet med fyrmästaren Pommern i hamnen, gågatan Torggatan och den sjöbods-färgade Östra hamnen. Allt nås till fots. Bra som half-day-aktivitet före eller efter andra äventyr.',
      transport: 'kollektivt',
      ungefarTid: 'Halvdag — start var som helst i centrum',
      bastaManad: 'Maj–september',
      startPunkt: 'Mariehamn färjeterminal eller flygplats',
      emoji: '🚶',
    },
  ],
}

// ── ÖLAND ───────────────────────────────────────────────────────────────
export const OLAND: Destination = {
  slug: 'oland',
  namn: 'Öland',
  huvudort: 'Borgholm',
  introTitle: '8 äventyr på Öland — för turisten utan och med bil',
  introDescription: 'Öland är 137 kilometer långt och naturen växlar dramatiskt från norr till söder. Bilen är praktisk för att täcka avstånden, men cykel passar bra mellan vissa specifika punkter och buss räcker för stadsbesök.',
  metaTitle: '8 äventyr på Öland — guide för bilist, cyklist och bussresenär | Svalla',
  metaDescription: 'Ölands bästa äventyr fördelade efter transport. UNESCO-landskap, Eketorps fornborg, Borgholms slott, Trollskogen, cykla södra Öland och mer.',
  aventyr: [
    {
      slug: 'sodra-oland-unesco',
      title: 'Södra Öland — UNESCO-landskap och fyren Långe Jan',
      beskrivning: 'Södra Öland är UNESCO-världsarv sedan 2000 — ett kulturlandskap där människor bott och brukat jorden i tusentals år. Mosaiken av byar, alvar, vångar och kustområden ses bäst med bil eftersom du behöver röra dig över ett stort område. Långe Jan, Sveriges högsta fyr (cirka 42 meter), står vid sydspetsen. Klättra upp i klart väder för dramatisk utsikt.',
      transport: 'bil',
      ungefarTid: 'Heldag — räkna 90 min ner från Borgholm',
      bastaManad: 'Maj–oktober',
      startPunkt: 'Bil söderut från Färjestaden eller Borgholm',
      emoji: '🗼',
    },
    {
      slug: 'eketorps-fornborg',
      title: 'Eketorps fornborg — rekonstruerad järnålders-by',
      beskrivning: 'En av Ölands mest unika sevärdheter — en delvis återuppbyggd fornborg från järnåldern och vendeltid. Du går in genom porten och möts av rekonstruerade hus, gärdar och husdjur. Pedagogiska program för barn under sommaren. Ligger på södra Öland nära Degerhamn.',
      transport: 'bil',
      ungefarTid: 'Halvdag — 75 min från Borgholm',
      bastaManad: 'Maj–september',
      startPunkt: 'Eketorp, Mörbylånga kommun',
      emoji: '🏯',
    },
    {
      slug: 'borgholms-slottsruin',
      title: 'Borgholms slott — Skandinaviens största slottsruin',
      beskrivning: 'En enorm slottsruin på en höjd ovanför Borgholm med utsikt över Kalmarsund. Ursprungligen från 1100-talet, byggdes om flera gånger och brann 1806. Du går runt fritt på området och kan klättra upp i delar av strukturen. Konserter och evenemang här under sommaren. Tio minuters promenad eller kort bilfärd från Borgholms centrum.',
      transport: 'bil',
      ungefarTid: 'Halvdag — promenadavstånd från Borgholm',
      bastaManad: 'Maj–oktober',
      startPunkt: 'Borgholms slott (skyltat från staden)',
      emoji: '🏰',
    },
    {
      slug: 'trollskogen',
      title: 'Trollskogen — vridna tallar och naturreservat',
      beskrivning: 'Trollskogen ligger vid Ölands nordspets och är ett naturreservat med en av Ölands mest fotograferade landskap — vindpinade och vridna tallar som ser ut som troll. Vandringsled på cirka tre kilometer genom skogen ner mot havet. Skeppsvraket Swiks från 1926 ligger kvar i strandkanten. Bil rekommenderas eftersom platsen ligger långt från kollektivtrafiken.',
      transport: 'bil',
      ungefarTid: 'Halvdag — 45 min från Borgholm',
      bastaManad: 'Året om (vackrast hösten)',
      startPunkt: 'Trollskogen, Ölands nordspets',
      emoji: '🌲',
    },
    {
      slug: 'alvaret-stora-alvaret',
      title: 'Stora Alvaret — Europas största alvarsteppe',
      beskrivning: 'En kalkstenslandskap utan motsvarighet i Sverige — flata, karga och blommande på våren. Stora Alvaret täcker stora delar av södra Öland och är hem för sällsynta orkidéer (väl synliga i maj-juni) och fågelliv. Du kör genom det med bil eller stannar vid någon utsiktspunkt. Visningar arrangeras under sommaren.',
      transport: 'bil',
      ungefarTid: 'Halvdag — 60 min från Borgholm',
      bastaManad: 'Maj–juni (orkidéer)',
      startPunkt: 'Resmo eller Möckelmossen (parkeringsplatser)',
      emoji: '🌾',
    },
    {
      slug: 'ostra-kusten-cykel',
      title: 'Cykla östra kusten — Borgholm till Byxelkrok',
      beskrivning: 'Ölands östra kust är cyklarens favorit — relativt flat, mestadels lugna vägar och frekventa byar med fik och bad. Sträckan Borgholm till Byxelkrok är cirka 60 kilometer och kan delas på två dagar. Du passerar Källa kyrkoruin, Horns kungsgård och slutar i ett av Ölands mest kända fiskelägen.',
      transport: 'cykel',
      ungefarTid: '1–2 dagar — ca 60 km',
      bastaManad: 'Maj–september',
      startPunkt: 'Borgholm cykeluthyrning',
      emoji: '🚴',
    },
    {
      slug: 'sodra-oland-cykel',
      title: 'Cykla södra Öland — UNESCO-landskap på cykel',
      beskrivning: 'En kortare cykeltur (30–40 kilometer) som tar dig genom UNESCO-landskapet på södra Öland. Du passerar gamla byar, kvarnar, ödekyrkor och har alvar och hav i utsikten. Mörbylånga är bra startpunkt eftersom regional buss går dit från fastlandet. Slutet beror på hur långt du orkar — Eketorps fornborg är ett mål, Långe Jan ett annat.',
      transport: 'cykel',
      ungefarTid: 'Heldag — 30–40 km',
      bastaManad: 'Maj–september',
      startPunkt: 'Mörbylånga centrum',
      emoji: '🚲',
    },
    {
      slug: 'borgholm-stadsvandring',
      title: 'Borgholm — stadsvandring med buss från Kalmar',
      beskrivning: 'Borgholm är Ölands mest besökta sommarstad och bra som dagsutflykt utan bil. Regional buss går från Kalmar centralstation över Ölandsbron till Borgholm. Promenera Storgatan, besök Solliden (kungafamiljens sommarresidens, parken är öppen för besökare), besök slottsruinen och äta lunch nära torget. Allt inom gångavstånd från busshållplatsen.',
      transport: 'kollektivt',
      ungefarTid: 'Halvdag — buss från Kalmar (cirka 45 min)',
      bastaManad: 'Maj–september',
      startPunkt: 'Kalmar centralstation (buss till Borgholm)',
      emoji: '🚌',
    },
  ],
}

export const DESTINATIONS = [GOTLAND, ALAND, OLAND]

export function getDestination(slug: string): Destination | undefined {
  return DESTINATIONS.find(d => d.slug === slug)
}

export const TRANSPORT_LABEL: Record<Transport, string> = {
  bil:         'Med bil',
  kollektivt:  'Kollektivt',
  cykel:       'Med cykel',
}

export const TRANSPORT_EMOJI: Record<Transport, string> = {
  bil:         '🚗',
  kollektivt:  '🚌',
  cykel:       '🚲',
}
