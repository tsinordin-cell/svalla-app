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


  // Väder
  '❄️': 'snow', '⛈️': 'rain', '🌧️': 'rain', '🌦️': 'rain', '☁️': 'cloud',
  '🌫️': 'fog', '💨': 'wind', '🌙': 'moon', '🌑': 'moon', '🌒': 'moon',
  '🌞': 'sun', '⚡': 'sun',

  // Aktivitet / rörelse
  '🚴': 'navigation', '🏇': 'navigation', '🎒': 'navigation', '🚀': 'navigation',
  '⛺': 'leaf', '🏁': 'flag', '🎯': 'target', '⏱': 'clock',

  // Natur / djur / årstid
  '🍂': 'leaf', '🌸': 'leaf', '🌼': 'leaf', '🌻': 'leaf', '🏞️': 'leaf',
  '🌍': 'globe', '🗾': 'map', '🌉': 'building', '🔥': 'sun',
  '🦀': 'utensils', '🦭': 'fish', '🐕': 'heart',

  // Bebyggelse
  '🏢': 'building', '🏘': 'building', '🏡': 'building', '🏠': 'building',
  '🏚': 'building', '🏯': 'building',

  // Båt
  '🛥': 'sailboat',

  // Utmärkelser / status
  '🏆': 'trophy', '🏅': 'award', '🎓': 'award', '🗿': 'award', '⚖️': 'award',
  '🌟': 'star', '✨': 'star', '🪄': 'star', '💥': 'star',
  '🔴': 'pin', '📍': 'pin', '🧭': 'compass',

  // Kontor / affär
  '📊': 'target', '📈': 'target', '💰': 'target', '🎫': 'bookmark',
  '🗝': 'bookmark', '🔒': 'bookmark', '📬': 'mail', '✏️': 'edit', '🤝': 'handshake',

  // Människor
  '👨‍👩‍👧‍👦': 'users', '👨‍👩‍👧': 'users',

  // Övrigt
  '💡': 'star',
}

/**
 * Emoji → ikonnamn. Datafilerna får behålla sina emoji-fält; det är bara
 * nyckeln in hit. Fälten kan också innehålla ett färdigt IconName (delar av
 * datan är redan migrerad), och då används det rakt av.
 */
export function emojiToIcon(emoji: string | undefined | null): IconName {
  if (!emoji) return 'compass'
  const direct = MAP[emoji] ?? MAP[emoji.replace(/️/g, '')]
  if (direct) return direct
  if (ICON_NAMES.has(emoji)) return emoji as IconName
  return 'compass'
}
