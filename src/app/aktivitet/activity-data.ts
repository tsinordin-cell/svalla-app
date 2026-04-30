import { ALL_ISLANDS, type Island } from '../o/island-data'

export type ActivityType = 'segling' | 'cykla' | 'bada' | 'vandring' | 'mat'

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
}

export const ACTIVITIES: Record<ActivityType, ActivityMeta> = {
  segling: {
    slug: 'segling',
    name: 'Segling',
    shortName: 'Segling',
    hero: 'Segla i Stockholms och Bohusläns skärgård',
    description: 'Skärgården är seglingens kungarike — gästhamnar, vindskydd och fyrar i tusental. Från Sandhamns klassiker till Bohusläns yttre kobbar finns rutter för alla nivåer, från nybörjare till blåvattensseglare.',
    whatToBring: ['Sjökort + plotter', 'Räddningsväst per person', 'Förtöjningar (akterlinor + boj-anordning)', 'Reservgas + bränsle', 'VHF-radio'],
    bestSeason: 'Maj–september. Juli är högtryck — boka gästhamn i förväg.',
    level: 'Nybörjare till expert. Yttre skärgården kräver erfarenhet.',
    matchers: ['segling', 'gästhamn', 'hamn', 'segl', 'båt', 'ksss', 'kss'],
  },
  cykla: {
    slug: 'cykla',
    name: 'Cykling',
    shortName: 'Cykling',
    hero: 'Cykla mellan klippor, hamnar och historia',
    description: 'Skärgårdens öar är som gjorda för cykel — bilfria stigar, korta avstånd och en hamnby aldrig långt borta. På flera öar kan du hyra cykel direkt vid båtbryggan.',
    whatToBring: ['Cykelhjälm', 'Vattenflaska', 'Lätt regnjacka', 'Liten ryggsäck', 'Solskydd'],
    bestSeason: 'April–oktober. Maj–juni och september är klart bäst (mindre folk, lagom temperatur).',
    level: 'Lätt till medel. De flesta lederna går på grusvägar utan stora höjdskillnader.',
    matchers: ['cykling', 'cykel', 'cykl', 'leder', 'mtb'],
  },
  bada: {
    slug: 'bada',
    name: 'Bad',
    shortName: 'Bad',
    hero: 'Klippbad och sandstränder i Stockholms skärgård',
    description: 'Östersjön är skärgårdens stora swimmingpool. Sandstränder är sällsynta men finns på vissa öar — annars dominerar släta klippor som värms av solen. Vattnet är som varmast i juli och augusti.',
    whatToBring: ['Badkläder', 'Stor handduk', 'Solkräm SPF 30+', 'Badskor om barfota känns ovant på klippor', 'Picknick'],
    bestSeason: 'Mitten av juni till slutet av augusti. Bästa vattentemperatur 18–22 °C.',
    level: 'Alla nivåer. Klippbad fungerar för barn under uppsyn.',
    matchers: ['bad', 'sandstrand', 'strand', 'klippbad', 'svalk', 'simn', 'badstr'],
  },
  vandring: {
    slug: 'vandring',
    name: 'Vandring',
    shortName: 'Vandring',
    hero: 'Vandra i naturreservat och längs öknarna',
    description: 'Skärgården är fullt av små vandringsleder — från korta kuststigar på Finnhamn till hela dagsturen på Kosterhavet. Stigarna är ofta välmarkerade och passerar genom blandskogar, hällmarker och fram till havet.',
    whatToBring: ['Bekväma kängor eller stadiga skor', 'Vatten + matsäck', 'Karta eller GPX', 'Skydd för väder (sol + regn)', 'Mygg-myggmedel i juli'],
    bestSeason: 'Maj–oktober. Hösten ger vackra färger och färre myggor.',
    level: 'Lätt till medel. Få stigar är tekniskt krävande.',
    matchers: ['vandring', 'led', 'naturres', 'kuststi', 'promen', 'strövstig'],
  },
  mat: {
    slug: 'mat',
    name: 'Mat & krogar',
    shortName: 'Mat',
    hero: 'Skärgårdskrogar — färsk fisk, räkor och vidöppen utsikt',
    description: 'En del av skärgårdsupplevelsen är att äta nära havet. Ett antal öar har riktigt välkända krogar och värdshus, men även de minsta öarna har ofta ett kafé eller en bryggrestaurang som öppnar i juni.',
    whatToBring: ['Bokning i förväg (juli kräver det)', 'Kontanter eller swish vid mindre kiosker'],
    bestSeason: 'Juni–augusti är de flesta krogar öppna. Sandhamn, Vaxholm och Marstrand håller öppet året runt.',
    level: 'Inga krav.',
    matchers: ['restaurang', 'krog', 'värdshus', 'bistro', 'kafé', 'cafe', 'bageri', 'mat'],
  },
}

export const ACTIVITY_LIST: ActivityMeta[] = Object.values(ACTIVITIES)

/** Returnerar öar som matchar en aktivitet baserat på tags + activities.name + accommodation.type */
export function islandsForActivity(type: ActivityType): Island[] {
  const meta = ACTIVITIES[type]
  const matchers = meta.matchers
  return ALL_ISLANDS.filter(island => {
    const haystack = [
      ...island.tags,
      ...island.activities.map(a => a.name.toLowerCase()),
      ...island.activities.map(a => a.desc.toLowerCase()),
      ...island.restaurants.map(r => r.type.toLowerCase()),
    ].join(' ').toLowerCase()
    return matchers.some(m => haystack.includes(m))
  })
}

/** Hämtar de aktivitets-cards från ön som faktiskt matchar typen */
export function islandActivitiesForType(island: Island, type: ActivityType): typeof island.activities {
  const matchers = ACTIVITIES[type].matchers
  return island.activities.filter(a => {
    const text = `${a.name} ${a.desc}`.toLowerCase()
    return matchers.some(m => text.includes(m))
  })
}

export function getActivity(slug: string): ActivityMeta | undefined {
  return ACTIVITIES[slug as ActivityType]
}
