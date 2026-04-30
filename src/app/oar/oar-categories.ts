/**
 * Long-tail SEO-kategorier för öar.
 * Varje kategori filtrerar ALL_ISLANDS efter en heuristik (tags + facts + tagline).
 * Mål: ranka för kommersiell intent som "barnvänliga öar stockholm",
 * "öar nära nynäshamn", "lyxig skärgård".
 */

import { ALL_ISLANDS, type Island } from '../o/island-data'

export type OarCategory = {
  slug: string
  title: string
  hero: string
  description: string
  intro: string
  filter: (island: Island) => boolean
  searchTerms: string[]
}

export const OAR_CATEGORIES: OarCategory[] = [
  {
    slug: 'barnvanliga',
    title: 'Barnvänliga öar i skärgården',
    hero: 'Skärgårdsöar som är perfekta för familjer',
    description: 'Hitta öar med sandstränder, lugna stigar, korta restider och boende som passar familjer med små barn. Vi har samlat de öar där hela familjen får plats.',
    intro: 'Skärgården är fantastisk med barn — men inte alla öar passar lika bra. Det vi tittar på: kort restid från Stockholm, lugn karaktär, sandstrand eller barnvänligt klippbad, mat och boende på plats. Här är de öar som faktiskt funkar för en familjeutflykt.',
    filter: (i) => {
      const text = `${i.tagline} ${i.facts.best_for} ${i.tags.join(' ')}`.toLowerCase()
      return text.includes('familj') || text.includes('barn')
        || i.tags.some(t => ['sandstrand', 'cykling', 'havsbastu', 'naturreservat'].includes(t))
    },
    searchTerms: ['barnvänliga öar stockholm', 'skärgården med barn', 'familjeö skärgården'],
  },
  {
    slug: 'dagstur-stockholm',
    title: 'Öar du kan göra dagstur till från Stockholm',
    hero: 'Skärgårdsöar — dagstur från Stockholm',
    description: 'Öar du tar dig till på morgonen och hem på kvällen. Färjebåt eller pendelbåt från Strömkajen, Stavsnäs eller Nynäshamn. Inga övernattningar — bara perfekta dagsutflykter.',
    intro: 'En dagstur kräver att du är hemma till middag. Det betyder restid på max 2 h enkel väg, regelbundna båtar och tillräckligt på ön för att fylla 4–6 timmar. Det är öarna nedan.',
    filter: (i) => {
      const t = i.facts.travel_time.toLowerCase()
      // Inkluderar grovt: "1 h", "1,5 h", "2 h" — exkluderar längre
      const isShort = /(\b30\s*min|\b1[,.]?\d?\s*h|\b2\s*h)/.test(t) && !t.includes('3 h') && !t.includes('4 h')
      const isStockholmRegion = i.region === 'norra' || i.region === 'mellersta' || i.region === 'södra'
      return isShort && isStockholmRegion
    },
    searchTerms: ['dagstur stockholm skärgård', 'öar nära stockholm', 'skärgården dagsutflykt'],
  },
  {
    slug: 'utan-bil',
    title: 'Skärgårdsöar utan bil — kollektivt och med båt',
    hero: 'Öar du når utan bil',
    description: 'Pendelbåt från Strömkajen och Slussen tar dig direkt ut i skärgården. Här är öarna där du inte behöver bil eller bilfärja för att komma fram.',
    intro: 'Du behöver inte bil för att uppleva skärgården. Waxholmsbolagets båtar går direkt från Strömkajen, och flera öar nås med SL-buss + båt från Slussen. Här är öarna där det funkar.',
    filter: (i) => {
      const t = `${i.facts.travel_time} ${i.getting_there.map(g => `${g.method} ${g.from || ''}`).join(' ')}`.toLowerCase()
      return t.includes('strömkajen') || t.includes('waxholmsbåt') || t.includes('pendelbåt') || t.includes('slussen')
    },
    searchTerms: ['skärgården utan bil', 'kollektivt skärgården stockholm', 'pendelbåt skärgården'],
  },
  {
    slug: 'segling',
    title: 'Bästa öarna för segling',
    hero: 'Öar för seglare — gästhamnar, vindskydd och klassiker',
    description: 'Öar med välutrustade gästhamnar, säkra ankarplatser och seglartradition. Från Sandhamns klassiska KSSS-hamn till Bohusläns yttre kobbar.',
    intro: 'En seglares-ö behöver mer än fina vyer — den behöver hamn, bränsle, service och plats för fler än din båt. Här är öarna där seglare faktiskt åker.',
    filter: (i) => i.harbors.length > 0
      || i.tags.some(t => ['segling', 'gästhamn'].includes(t))
      || i.activities.some(a => a.name.toLowerCase().includes('segl')),
    searchTerms: ['segla skärgården', 'gästhamn stockholm', 'seglartradition skärgården'],
  },
  {
    slug: 'romantiska',
    title: 'Romantiska skärgårdsöar — för en weekend till två',
    hero: 'Öar för romantiska weekends',
    description: 'Stilla värdshus, havsutsikt, gourmetkök och plats att vara två. De öar där en weekend räcker för att bygga om hela förhållandet.',
    intro: 'Skärgården är som gjord för weekends till två — om du väljer rätt ö. Sandhamns Seglarhotell, Utö Värdshus, Pater Noster i Bohuslän. Spa, restaurang, vyer. Inga turistflockar.',
    filter: (i) => {
      const acc = i.accommodation.map(a => a.name + ' ' + a.type).join(' ').toLowerCase()
      const restNames = i.restaurants.map(r => r.name + ' ' + r.type).join(' ').toLowerCase()
      return acc.includes('hotell') || acc.includes('värdshus') || restNames.includes('värdshus')
        || i.tags.some(t => ['spa', 'havsbastu'].includes(t))
    },
    searchTerms: ['weekend skärgården', 'romantisk skärgård', 'spa skärgården'],
  },
  {
    slug: 'cykling',
    title: 'Skärgårdsöar för cykling',
    hero: 'Cykelöar i skärgården',
    description: 'Öar med markerade cykelleder, cykeluthyrning vid hamnen och plats nog att fylla en hel dag på två hjul.',
    intro: 'Cykling i skärgården är det bästa sättet att se en hel ö på en dag. Utö och Möja är klassiker, men det finns fler. Här är öarna där cykel slår till fots.',
    filter: (i) => i.tags.includes('cykling') || i.activities.some(a => a.name.toLowerCase().includes('cykl')),
    searchTerms: ['cykla skärgården', 'cykelö stockholm', 'utö cykel'],
  },
  {
    slug: 'havsbastu',
    title: 'Skärgårdsöar med havsbastu',
    hero: 'Bada bastu — och hoppa rätt i havet',
    description: 'Öar med bastu vid havskanten. Basta, hoppa i, basta igen. De bästa platserna för en av Sveriges mest underskattade upplevelser.',
    intro: 'Havsbastu är skärgårdens bästa hemlighet. Dörren går rätt ut mot havet — du basta, hoppa i, basta igen. Här är öarna där det är bra utfört.',
    filter: (i) => i.tags.includes('havsbastu') || i.activities.some(a => a.name.toLowerCase().includes('bastu')),
    searchTerms: ['havsbastu skärgården', 'bada bastu öster', 'utö bastu'],
  },
  {
    slug: 'avskild',
    title: 'Avskilda skärgårdsöar — bort från turistflocken',
    hero: 'Öar bort från turistflocken',
    description: 'Yttre skärgården och de mindre öarna. Färre besökare, mer natur, lugn ända ut. För dig som vill verkligen komma bort.',
    intro: 'Sandhamn och Vaxholm är full i juli. Det här är öarna där du faktiskt kan vara ifred — yttre skärgården, små öar, lite längre att åka men värt det.',
    filter: (i) => {
      const t = `${i.facts.character} ${i.tagline}`.toLowerCase()
      return t.includes('lugn') || t.includes('avskild') || t.includes('orörd') || t.includes('yttersk')
        || i.tags.some(tag => ['ytterskärgård', 'naturreservat', 'fyr'].includes(tag))
    },
    searchTerms: ['avskild skärgård', 'lugn ö', 'ytterskärgård'],
  },
  {
    slug: 'krogö',
    title: 'Skärgårdsöar med riktigt bra krogar',
    hero: 'Öar för matälskare',
    description: 'Värdshus, gastronomi och bryggrestauranger värda att åka för. Sandhamn, Utö, Marstrand — men också mindre kända.',
    intro: 'Vissa åker till skärgården för att simma, andra för att äta. Här är öarna där krogarna är så bra att de är destinationen, inte bonusen.',
    filter: (i) => i.restaurants.length >= 3 && i.restaurants.some(r => r.type === 'Restaurang'),
    searchTerms: ['bästa krogen skärgården', 'mat skärgården', 'sandhamn restaurang'],
  },
  {
    slug: 'nara-nynashamn',
    title: 'Skärgårdsöar nära Nynäshamn',
    hero: 'Söder om Stockholm — öar från Nynäshamn',
    description: 'Pendeltåg från Stockholm + båt från Nynäshamn. Utö, Nåttarö, Ornö, Fjärdlång. Söderskärgården är glesare och billigare än norr.',
    intro: 'Söderskärgården är ofta glömd — fel. Härifrån går färjor till Utö, Nåttarö, Ornö och fler. Pendeltåget tar dig till Nynäshamn på en timme. Här är öarna i den södra änden.',
    filter: (i) => {
      const t = `${i.facts.travel_time} ${i.getting_there.map(g => g.from || '').join(' ')}`.toLowerCase()
      return t.includes('nynäs') || i.region === 'södra'
    },
    searchTerms: ['öar nynäshamn', 'södra skärgården', 'utö nynäshamn'],
  },
]

export function getOarCategory(slug: string): OarCategory | undefined {
  return OAR_CATEGORIES.find(c => c.slug === slug)
}

export function islandsForCategory(slug: string): Island[] {
  const cat = getOarCategory(slug)
  if (!cat) return []
  return ALL_ISLANDS.filter(cat.filter)
}
