/**
 * Mapper från äldre emoji-strängar (i island-data, forum-categories) till
 * IconName i `components/Icon.tsx`. Används vid rendering av ö-sidor och
 * forum-listsidor så att vi visar premium SVG-ikoner istället för emojis.
 *
 * Fallback: 'compass' (neutral resa-/utforska-ikon).
 */
import { ICON_NAMES, type IconName } from '@/components/Icon'

const MAP: Record<string, IconName> = {
  // Farkoster
  '⛵': 'sailboat',
  '⛴': 'ship',
  '🚢': 'ship',
  '🚤': 'ship',
  '🛥': 'ship',
  '🚣': 'paddle',
  '🛶': 'paddle',
  '⚓': 'anchor',
  '⛽': 'fuel',

  // Land-transport
  '🚲': 'bike',
  '🚴': 'bike',
  '🚶': 'walk',
  '🥾': 'walk',
  '🏇': 'walk',
  '🚗': 'car',
  '🚌': 'bus',
  '🚀': 'rocket',
  '🎒': 'backpack',
  '🛍': 'shoppingBag',
  '🛒': 'shoppingBag',

  // Orientering
  '🧭': 'compass',
  '📍': 'pin',
  '🔴': 'pin',
  '🗺': 'map',
  '🗾': 'map',
  '🌍': 'globe',

  // Bad och vatten
  '🌊': 'waves',
  '🏊': 'swim',
  '🤿': 'diving',
  '🥽': 'diving',
  '🏄': 'surf',
  '🎣': 'fishing',
  '🐟': 'fish',
  '🐠': 'fish',
  '🦭': 'fish',
  '🛁': 'bathtub',
  '🏖': 'beach',
  '🧖': 'shower',

  // Mat och dryck
  '🍽': 'utensils',
  '🍴': 'utensils',
  '🍺': 'beer',
  '🥗': 'salad',
  '🦐': 'shellfish',
  '🦪': 'shellfish',
  '🦀': 'shellfish',

  // Natur
  '🌲': 'tree',
  '🌳': 'tree',
  '🌿': 'leaf',
  '🍂': 'leaf',
  '🏞️': 'leaf',
  '🌸': 'leaf',
  '🌼': 'leaf',
  '🌻': 'leaf',
  '🌺': 'leaf',
  '🌾': 'wheat',
  '🌴': 'palmtree',
  '🏝': 'island',
  '🦅': 'bird',
  '🐦': 'bird',
  '🦩': 'bird',
  '🦌': 'bird',
  '🐴': 'bird',
  '🐕': 'dog',
  '🏔': 'mountain',
  '⛰': 'mountain',
  '🪨': 'mountain',
  '🏕': 'tent',
  '⛺': 'tent',
  '🔥': 'fire',
  '🏌': 'leaf',

  // Vader
  '☀️': 'sun',
  '🌞': 'sun',
  '🌤': 'sun',
  '⚡': 'sun',
  '🌅': 'sunrise',
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

  // Byggnader
  '🏠': 'home',
  '🏡': 'home',
  '🏘': 'home',
  '🏢': 'building',
  '🏚': 'building',
  '🏰': 'castle',
  '🏯': 'castle',
  '🏛': 'museum',
  '⛪': 'church',
  '✝️': 'church',
  '🗼': 'tower',
  '🏮': 'tower',
  '🌉': 'bridge',

  // Kultur och konst
  '🎨': 'palette',
  '🎵': 'music',
  '💃': 'music',
  '📚': 'book',
  '📜': 'quote',
  '✍️': 'edit',
  '✏️': 'edit',
  '📝': 'edit',
  '📸': 'camera',
  '🔬': 'camera',
  '📡': 'camera',
  '🔭': 'binoculars',

  // Utmarkelser
  '🏆': 'trophy',
  '🏅': 'award',
  '🎓': 'award',
  '🗿': 'award',
  '👑': 'crown',
  '⚖️': 'scale',
  '⚔️': 'swords',
  '⛏': 'pickaxe',

  // Symboler
  '💡': 'lightbulb',
  '📋': 'clipboard',
  '🌟': 'sparkles',
  '✨': 'sparkles',
  '🪄': 'sparkles',
  '💥': 'sparkles',
  '🎫': 'ticket',
  '🗝': 'key',
  '🔒': 'lock',
  '💰': 'money',
  '📊': 'barChart',
  '📈': 'barChart',
  '🎯': 'target',
  '🏁': 'flag',
  '⏱': 'clock',
  '📅': 'calendar',
  '🗓': 'calendar',
  '📆': 'calendar',
  '📱': 'phone',
  '📬': 'mail',
  '🤝': 'handshake',

  // Mat, aktivitet, tillstallning (teambuilding-datan)
  '🍳': 'pan',
  '🧗': 'climb',
  '🥂': 'toast',

  // Personer
  '👥': 'users',
  '👨‍👩‍👧‍👦': 'users',
  '👨‍👩‍👧': 'users',
  '👶': 'child',
  '👦': 'child',
  '👧': 'child',

  // Redan ikonnamn i datan (inte emoji)
  'island': 'island',
  'rock': 'mountain',
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
