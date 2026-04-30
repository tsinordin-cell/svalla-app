/**
 * Mapper från äldre emoji-strängar (i island-data, forum-categories) till
 * IconName i `components/Icon.tsx`. Används vid rendering av ö-sidor och
 * forum-listsidor så att vi visar premium SVG-ikoner istället för emojis.
 *
 * Fallback: 'compass' (neutral resa-/utforska-ikon).
 */
import type { IconName } from '@/components/Icon'

const MAP: Record<string, IconName> = {
  // Båtar / transport-på-vatten
  '⛵': 'sailboat',
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

  // Övrigt
  '💡': 'star',
}

export function emojiToIcon(emoji: string | undefined | null): IconName {
  if (!emoji) return 'compass'
  return MAP[emoji] ?? MAP[emoji.replace('️', '')] ?? 'compass'
}
