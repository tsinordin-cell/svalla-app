/**
 * Mapper från äldre emoji-strängar (i island-data, forum-categories) till
 * IconName i `components/Icon.tsx`. Används vid rendering av ö-sidor och
 * forum-listsidor så att vi visar premium SVG-ikoner istället för emojis.
 *
 * Fallback: 'compass' (neutral resa-/utforska-ikon).
 */
import { ICON_NAMES, type IconName } from '@/components/Icon'

const MAP: Record<string, IconName> = {
  // Båtar / transport-på-vatten
  '⛵': 'sailboat',
  // hyrbat-datans regionemojis (2026-08-11, uppgiftskortet "Ta bort emojis"):
  // utan dessa foll fjall/klippor/oar tillbaka pa kompassen.
  '🏔': 'mountain',
  '🪨': 'mountain',
  '🏝': 'palmtree',
  // tipsrutorna i hyrbat-datan (samma uppgiftskort):
  '📋': 'check',
  '📜': 'quote',
  '📱': 'phone',
  '🗺': 'map',
  '🌤': 'sun',
  '🌲': 'leaf',
  '⛴': 'sailboat',
  '🚢': 'sailboat',
  '🚤': 'sailboat',
  '🚣': 'sailboat',
  '🛶': 'sailboat',

  // Land-transport
  '🚲': 'navigation',
  '🚶': 'navigation',
  '🥾': 'navigation',
  '🚗': 'map',
  '🚌': 'map',
  '🛍': 'map',
  '🛒': 'map',

  // Hamn / förtöjning / bränsle
  '⚓': 'anchor',
  '⛽': 'fuel',

  // Vatten / hav / fisk
  '🌊': 'waves',
  '🏊': 'waves',
  '🤿': 'waves',
  '🏄': 'waves',
  '🎣': 'waves',
  '🐟': 'waves',
  '🐠': 'waves',
  '🦐': 'utensils',
  '🦪': 'utensils',

  // Mat / krog
  '🍽': 'utensils',
  '🍺': 'utensils',
  '🥗': 'utensils',
  '🍴': 'utensils',

  // Sol / hav / sandstrand
  '☀️': 'sun',
  '🌅': 'sun',
  '🏖': 'sun',

  // Natur / skog / växter
  '🌳': 'leaf',
  '🌿': 'leaf',
  '🌾': 'leaf',
  '🌺': 'leaf',
  '🦌': 'leaf',
  '🐦': 'leaf',
  '🦅': 'leaf',
  '🦩': 'leaf',
  '🐴': 'leaf',
  '⛰': 'leaf',
  '🏕': 'leaf',
  '🏌': 'leaf',

  // Kyrka / fästning / historia
  '⛪': 'building',
  '✝️': 'building',
  '🏛': 'building',
  '🏰': 'building',
  '🗼': 'building',
  '🏮': 'building',
  '⚔️': 'award',
  '👑': 'award',
  '⛏': 'award',
  '🥽': 'award',

  // Spa / bastu / wellness
  '🧖': 'sun',
  '🛁': 'waves',

  // Foto / observatorium
  '📸': 'camera',
  '🔭': 'camera',
  '🔬': 'camera',
  '📡': 'camera',

  // Konst / kultur / bok
  '🎨': 'star',
  '🎵': 'star',
  '💃': 'users',
  '📚': 'mail',
  '✍️': 'mail',


  // Kompletteringar 2026-08-12 — tacker alla emojis som forekommer i datan
  '❄️': 'snow',
  '⛈️': 'rain',
  '🌧️': 'rain',
  '🌦️': 'rain',
  '☁️': 'cloud',
  '🌫️': 'fog',
  '💨': 'wind',
  '🌙': 'moon',
  '🌑': 'moon',
  '🌒': 'moon',
  '🌞': 'sun',
  '⚡': 'sun',
  '🚴': 'navigation',
  '🏇': 'navigation',
  '🎒': 'navigation',
  '🚀': 'navigation',
  '⛺': 'leaf',
  '🏁': 'flag',
  '🎯': 'target',
  '⏱': 'clock',
  '🍂': 'leaf',
  '🌸': 'leaf',
  '🌼': 'leaf',
  '🌻': 'leaf',
  '🏞️': 'leaf',
  '🌴': 'leaf',
  '🌍': 'globe',
  '🗾': 'map',
  '🌉': 'building',
  '🔥': 'sun',
  '🦀': 'utensils',
  '🦭': 'fish',
  '🐕': 'heart',
  '🏢': 'building',
  '🏘': 'building',
  '🏡': 'building',
  '🏠': 'building',
  '🏚': 'building',
  '🏯': 'building',
  '🛥': 'sailboat',
  '🏆': 'trophy',
  '🏅': 'award',
  '🎓': 'award',
  '🗿': 'award',
  '⚖️': 'award',
  '🌟': 'star',
  '✨': 'star',
  '🪄': 'star',
  '💥': 'star',
  '🔴': 'pin',
  '📍': 'pin',
  '🧭': 'compass',
  '📊': 'target',
  '📈': 'target',
  '💰': 'target',
  '🎫': 'bookmark',
  '🗝': 'bookmark',
  '🔒': 'bookmark',
  '📬': 'mail',
  '✏️': 'edit',
  '🤝': 'handshake',
  '👨‍👩‍👧‍👦': 'users',
  '👨‍👩‍👧': 'users',

  // Övrigt
  '💡': 'star',
}

/**
 * Emoji → ikonnamn. Datafilerna behåller sina emoji-fält; det är bara nyckeln
 * in hit. Fälten kan också innehålla ett färdigt IconName (delar av datan är
 * redan migrerad) och används då rakt av.
 */
export function emojiToIcon(emoji: string | undefined | null): IconName {
  if (!emoji) return 'compass'
  const direct = MAP[emoji] ?? MAP[emoji.replace(/️/g, '')]
  if (direct) return direct
  if (ICON_NAMES.has(emoji)) return emoji as IconName
  return 'compass'
}
