/**
 * forum-categories.ts — ren statisk data, INGA server-importer.
 * Kan importeras i både Server Components och Client Components.
 */
import type { IconName } from '@/components/Icon'

export interface ForumCategory {
  id: string
  name: string
  description: string | null
  /** Bevarad emoji för bakåtkompatibilitet — visas inte längre. Använd `iconName`. */
  icon: string
  /** SVG-ikon från components/Icon.tsx — används av nya UI:n. */
  iconName: IconName
  /** Hex-accent som färgar ikon-puck och border-left. */
  iconColor: string
  sort_order: number
  thread_count: number
  post_count: number
}

export const STATIC_CATEGORIES: ForumCategory[] = [
  { id: 'segling',          name: 'Segling',            description: 'Segelteknik, rutter, rigg och utrustning',      icon: '⛵', iconName: 'sailboat',  iconColor: '#1e5c82', sort_order: 1, thread_count: 0, post_count: 0 },
  { id: 'motorbat',         name: 'Motorbåt',           description: 'Motorteknik, bränsle, navigation och service',  icon: '🚤', iconName: 'fuel',      iconColor: '#c96e2a', sort_order: 2, thread_count: 0, post_count: 0 },
  { id: 'fiske',            name: 'Fiske',              description: 'Fiskeplatser, regler, spön och drag',           icon: '🎣', iconName: 'waves',     iconColor: '#0a7b8c', sort_order: 3, thread_count: 0, post_count: 0 },
  { id: 'paddling',         name: 'Paddling',           description: 'Kajak, SUP, kanot — allt som paddlas',          icon: '🛶', iconName: 'sailboat',  iconColor: '#0a7b3c', sort_order: 4, thread_count: 0, post_count: 0 },
  { id: 'vader-sakerhet',   name: 'Väder & säkerhet',   description: 'SMHI-tips, passageplanering och nödlägen',      icon: '⛅', iconName: 'wind',      iconColor: '#7c4dff', sort_order: 5, thread_count: 0, post_count: 0 },
  { id: 'teknik-underhall', name: 'Teknik & underhåll', description: 'Motor, elektronik, rigg och verkstad',          icon: '🔧', iconName: 'building',  iconColor: '#525252', sort_order: 6, thread_count: 0, post_count: 0 },
  { id: 'hamnar-bryggor',   name: 'Hamnar & bryggor',   description: 'Gästhamnstips, avgifter, ankringsplatser',      icon: '⚓', iconName: 'anchor',    iconColor: '#1d4ed8', sort_order: 7, thread_count: 0, post_count: 0 },
  { id: 'nybörjare',        name: 'Nybörjare',          description: 'Inga dumma frågor — fråga allt här',            icon: '👋', iconName: 'compass',   iconColor: '#9d174d', sort_order: 8, thread_count: 0, post_count: 0 },
  { id: 'loppis',           name: 'Loppis & köp/sälj',  description: 'Utrustning, båtar, delar och evenemang',        icon: '💰', iconName: 'handshake', iconColor: '#0a7b3c', sort_order: 9, thread_count: 0, post_count: 0 },
]
