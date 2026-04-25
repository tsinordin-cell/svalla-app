/**
 * Thorkel — persona-konstanter.
 * Se /thorkel_brand.md för hela karaktärsbeskrivningen.
 */

export const THORKEL = {
  name: 'Thorkel',
  title: 'Skeppare, Möja',
  bio: '30 år på vattnet',
  avatar: '/thorkel-avatar.svg',
  colors: {
    primary:     'var(--thor)',
    primaryDark: 'var(--thor-d)',
    bg:          'var(--thor-l)',
    cream:       'var(--thor-cream)',
    pipeEmber:   'var(--acc)',
    onPrimary:   '#ffffff',
  },
  timing: {
    /** Minsta tid innan första tecknet visas — han röker på pipan först. */
    minThinkMs: 1800,
    /** Text-stream-hastighet när vi faktiskt streamar. Lite långsammare än ChatGPT. */
    streamCharsPerSec: 30,
  },
} as const

export type ThorkelRole = 'user' | 'thorkel'

export type ThorkelMessage = {
  id: string
  role: ThorkelRole
  text: string
  timestamp: string
  suggestedRoute?: {
    title: string
    stops: Array<{ place_id: string; title: string }>
  }
}
