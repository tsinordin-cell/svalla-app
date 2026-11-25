// Bara typen: hela ö-listan importeras i activity-islands.ts, så att /sok
// (klientsida) kan läsa ACTIVITY_LIST utan att dra in 865 kB ö-data (2026-11-21).
import type { Island } from '../o/island-data'

export type ActivityType = 'segling' | 'cykla' | 'bada' | 'vandring' | 'mat' | 'fiske'

export type ActivityMeta = {
  slug: ActivityType
  name: string
  shortName: string
  hero: string                 // hero-tagline
  description: string          // 2-3 meningar för intro/SEO
  whatToBring: string[]
  bestSeason: string
  level: string
  /** keyword-matchers mot tags + activities.name + accommodation.type */
  matchers: string[]
  /** Valfri topplist — ö-slugs i prioritetsordning, visas som horisontell favorit-rad */
  featured?: string[]
}

export const ACTIVITIES: Record<ActivityType, ActivityMeta> = {
  segling: {
    slug: 'segling',
    name: 'Segling',
    shortName: 'Segling',
    hero: 'Segla i Stockholms och Bohusläns skärgård',
    description: 'Skärgården är seglingens kungarike: gästhamnar, vindskydd och fyrar i tusental. Från Sandhamns klassiker till Bohusläns yttre kobbar finns rutter för alla nivåer, från nybörjare till blåvattensseglare.',
    whatToBring: ['Sjökort + plotter', 'Räddningsväst per person', 'Förtöjningar (akterlinor + boj-anordning)', 'Reservgas + bränsle', 'VHF-radio'],
    bestSeason: 'Maj till september. Juli är högtryck. Boka gästhamn i förväg.',
    level: 'Nybörjare till expert. Yttre skärgården kräver erfarenhet.',
    matchers: ['segling', 'gästhamn', 'hamn', 'segl', 'båt', 'ksss', 'kss'],
  },
  cykla: {
    slug: 'cykla',
    name: 'Cykling',
    shortName: 'Cykling',
    hero: 'Cykla mellan klippor, hamnar och historia',
    description: 'Skärgårdens öar är som gjorda för cykel: bilfria stigar, korta avstånd och en hamnby aldrig långt borta. På flera öar kan du hyra cykel direkt vid båtbryggan.',
    whatToBring: ['Cykelhjälm', 'Vattenflaska', 'Lätt regnjacka', 'Liten ryggsäck', 'Solskydd'],
    bestSeason: 'April till oktober. Maj till juni och september är klart bäst (mindre folk, lagom temperatur).',
    level: 'Lätt till medel. De flesta lederna går på grusvägar utan stora höjdskillnader.',
    matchers: ['cykling', 'cykel', 'cykl', 'mtb'],   // 'leder' borttaget 2026-10-20: matchade vandringsleder och gav falska cykelsidor (t.ex. Hanö)
    featured: ['uto', 'svartso', 'singo', 'runmaro', 'vaddo', 'ljustero', 'adelso', 'resaro', 'vindo', 'galo'],
  },
  bada: {
    slug: 'bada',
    name: 'Bad',
    shortName: 'Bad',
    hero: 'Klippbad och sandstränder i Stockholms skärgård',
    description: 'Östersjön är skärgårdens stora swimmingpool. Sandstränder är sällsynta men finns på vissa öar, annars dominerar släta klippor som värms av solen. Vattnet är som varmast i juli och augusti.',
    whatToBring: ['Badkläder', 'Stor handduk', 'Solkräm SPF 30+', 'Badskor om barfota känns ovant på klippor', 'Picknick'],
    bestSeason: 'Mitten av juni till slutet av augusti. Bästa vattentemperatur 18 till 22 °C.',
    level: 'Alla nivåer. Klippbad fungerar för barn under uppsyn.',
    matchers: ['bad', 'sandstrand', 'strand', 'klippbad', 'svalk', 'simn', 'badstr'],
  },
  vandring: {
    slug: 'vandring',
    name: 'Vandring',
    shortName: 'Vandring',
    hero: 'Vandra i naturreservat och längs öknarna',
    description: 'Skärgården är fullt av små vandringsleder, från korta kuststigar på Finnhamn till hela dagsturen på Kosterhavet. Stigarna är ofta välmarkerade och passerar genom blandskogar, hällmarker och fram till havet.',
    whatToBring: ['Bekväma kängor eller stadiga skor', 'Vatten + matsäck', 'Karta eller GPX', 'Skydd för väder (sol + regn)', 'Mygg-myggmedel i juli'],
    bestSeason: 'Maj till oktober. Hösten ger vackra färger och färre myggor.',
    level: 'Lätt till medel. Få stigar är tekniskt krävande.',
    matchers: ['vandring', 'led', 'naturres', 'kuststi', 'promen', 'strövstig'],
  },
  mat: {
    slug: 'mat',
    name: 'Mat & krogar',
    shortName: 'Mat',
    hero: 'Skärgårdskrogar: färsk fisk, räkor och vidöppen utsikt',
    description: 'En del av skärgårdsupplevelsen är att äta nära havet. Ett antal öar har riktigt välkända krogar och värdshus, men även de minsta öarna har ofta ett kafé eller en bryggrestaurang som öppnar i juni.',
    whatToBring: ['Bokning i förväg (juli kräver det)', 'Kontanter eller swish vid mindre kiosker'],
    bestSeason: 'Juni till augusti är de flesta krogar öppna. Sandhamn, Vaxholm och Marstrand håller öppet året runt.',
    level: 'Inga krav.',
    matchers: ['restaurang', 'krog', 'värdshus', 'bistro', 'kafé', 'cafe', 'bageri', 'mat'],
  },
  fiske: {
    slug: 'fiske',
    name: 'Fiske',
    shortName: 'Fiske',
    hero: 'Fiska i skärgården: fritt längs kusten, men inte överallt',
    // KÄLLA: Havs- och vattenmyndigheten — handredskapsfiske är fritt på allmänt vatten
    // längs kusten och i de fem stora sjöarna (läst 2026-09-18).
    // KÄLLA: Länsstyrelsen Stockholm, lansstyrelsen.se/stockholm/djur/fiske — 60
    // fredningsområden med fiskeförbud 1 april–15 juni, varav 7 året runt, plus 13
    // fredningsområden vid åmynningar med fiskeförbud på hösten (läst 2026-09-18).
    description: 'Handredskapsfiske är fritt på allmänt vatten längs kusten. Du behöver inget fiskekort för att meta eller kasta från en klippa i Stockholms skärgård. Men friheten har gränser: i skärgården finns 60 fredningsområden med fiskeförbud 1 april till 15 juni, varav sju gäller året runt. Kontrollera alltid kartan på svenskafiskeregler.se innan du börjar, förbudsområdena syns inte i naturen.',
    whatToBring: [
      'Kontrollerad position mot svenskafiskeregler.se, fredningsområdena är inte utmärkta på plats',
      'Spö och rulle anpassade för kustfiske',
      'Måttband: det finns minimimått och fångstbegränsningar',
      'Avbitare och peang för kroklossning',
      'Solglasögon med polariserat glas',
    ],
    // KÄLLA: Länsstyrelsen Stockholm — vårfredning 1 april–15 juni, höstfredning vid
    // åmynningar när havsöringen går upp för att leka (läst 2026-09-18).
    bestSeason: 'Sensommar och höst är enklast: vårfredningen 1 april till 15 juni stänger 60 vikar i Stockholms skärgård, och på hösten är 13 åmynningar fredade när havsöringen leker.',
    level: 'Alla nivåer. Ansvaret för att känna till reglerna ligger dock på dig som fiskar.',
    matchers: ['sportfiske', 'fisketur', 'fiskeguide', 'abborre', 'gädda', 'havsöring', 'spinnfiske', 'fiskevatten'],
  },
}

export const ACTIVITY_LIST: ActivityMeta[] = Object.values(ACTIVITIES)

/**
 * Kan besökande båtar lägga till på ön? En trafikbrygga räcker inte: på Eknö och Gräskö
 * säger öns egen hamntext att gästhamn inte gått att belägga (2026-11-02, mall-0093 omarbete 2).
 */
function harGasthamn(island: Island): boolean {
  const ord = /gästhamn|gästplats|gästbåt|gästbrygg|naturhamn|båtplats|boj|ankr/i
  const fornekat = /inte kunnat belägga|inte hittat/i
  return island.harbors.some(h => (h.spots ?? 0) > 0 || (h.service ?? []).length > 0
      || (ord.test(`${h.name} ${h.desc}`) && !fornekat.test(h.desc)))
    || island.activities.some(a => /segl|gästhamn|naturhamn/i.test(`${a.name} ${a.desc}`) && !fornekat.test(a.desc))
}

/** Hämtar de aktivitets-cards från ön som faktiskt matchar typen */
export function islandActivitiesForType(island: Island, type: ActivityType): typeof island.activities {
  // Delordsmatchningen gav "Mat & krogar" av "ta med mat" (Svartlöga), "Kayakomat" (Yttre Gården)
  // och "informationsskyltar" (Långviksskär), och "Segling" av t.ex. "trampbåtar" (Gålö).
  // Mat kräver krog, kafé eller butik i ödatan, segling en hamn eller ett seglingsord
  // (2026-11-02, mall-0093 omarbete).
  if (type === 'mat' && island.restaurants.length === 0) return []
  if (type === 'segling' && !harGasthamn(island)) return []
  const matchers = ACTIVITIES[type].matchers
  return island.activities.filter(a => {
    const text = `${a.name} ${a.desc}`.toLowerCase()
    return matchers.some(m => text.includes(m))
  })
}

export function getActivity(slug: string): ActivityMeta | undefined {
  return ACTIVITIES[slug as ActivityType]
}
