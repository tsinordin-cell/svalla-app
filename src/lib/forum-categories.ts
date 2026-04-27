/**
 * forum-categories.ts — ren statisk data, INGA server-importer.
 * Kan importeras i både Server Components och Client Components.
 */

export interface ForumCategory {
  id: string
  name: string
  description: string | null
  icon: string
  sort_order: number
  thread_count: number
  post_count: number
}

export const STATIC_CATEGORIES: ForumCategory[] = [
  { id: 'segling',          name: 'Segling',            description: 'Segelteknik, rutter, rigg och utrustning',      icon: '⛵',  sort_order: 1, thread_count: 0, post_count: 0 },
  { id: 'motorbat',         name: 'Motorbåt',           description: 'Motorteknik, bränsle, navigation och service',  icon: '🚤', sort_order: 2, thread_count: 0, post_count: 0 },
  { id: 'fiske',            name: 'Fiske',              description: 'Fiskeplatser, regler, spön och drag',           icon: '🎣', sort_order: 3, thread_count: 0, post_count: 0 },
  { id: 'paddling',         name: 'Paddling',           description: 'Kajak, SUP, kanot — allt som paddlas',          icon: '🛶', sort_order: 4, thread_count: 0, post_count: 0 },
  { id: 'vader-sakerhet',   name: 'Väder & säkerhet',   description: 'SMHI-tips, passageplanering och nödlägen',      icon: '⛅', sort_order: 5, thread_count: 0, post_count: 0 },
  { id: 'teknik-underhall', name: 'Teknik & underhåll', description: 'Motor, elektronik, rigg och verkstad',          icon: '🔧', sort_order: 6, thread_count: 0, post_count: 0 },
  { id: 'hamnar-bryggor',   name: 'Hamnar & bryggor',   description: 'Gästhamnstips, avgifter, ankringsplatser',      icon: '⚓', sort_order: 7, thread_count: 0, post_count: 0 },
  { id: 'nybörjare',        name: 'Nybörjare',          description: 'Inga dumma frågor — fråga allt här',            icon: '👋', sort_order: 8, thread_count: 0, post_count: 0 },
  { id: 'loppis',           name: 'Loppis & köp/sälj',  description: 'Utrustning, båtar, delar och evenemang',        icon: '💰', sort_order: 9, thread_count: 0, post_count: 0 },
]
