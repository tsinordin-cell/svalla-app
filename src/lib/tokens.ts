/**
 * Svalla Design Tokens — single source of truth.
 * All components reference these. No magic numbers in component files.
 */

// ─── Spacing (4-grid) ────────────────────────────────────────────────────────
export const space = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
} as const

// ─── Border radius ───────────────────────────────────────────────────────────
export const radius = {
  xs:   6,   // small chips, tags
  sm:   12,  // cards, buttons, inputs, square avatars
  md:   16,  // bubbles, larger inputs
  lg:   20,  // large cards, sheets top corners
  full: 999, // pills
} as const

// ─── Typography — sizes (px) ─────────────────────────────────────────────────
export const fontSize = {
  caption:  11,
  small:    13,
  body:     14,
  bodyEmph: 15,
  subtitle: 17,
  title:    20,
  hero:     28,
} as const

// ─── Typography — weights ────────────────────────────────────────────────────
export const fontWeight = {
  regular:  400,
  medium:   500,
  semibold: 600,
} as const

// ─── Shadows ─────────────────────────────────────────────────────────────────
export const shadow = {
  xs: '0 1px 2px rgba(0,0,0,.04)',
  sm: '0 2px 6px rgba(0,0,0,.06)',
  md: '0 8px 24px rgba(0,0,0,.08)',
  // dark-mode variants (same keys, stronger)
  xsDark: '0 1px 2px rgba(0,0,0,.4)',
  smDark: '0 2px 6px rgba(0,0,0,.32)',
  mdDark: '0 8px 24px rgba(0,0,0,.36)',
} as const

// ─── Motion ──────────────────────────────────────────────────────────────────
export const duration = {
  fast: 160,  // tap feedback, send-button activation
  base: 200,  // route transitions, sheets
  slow: 240,  // stagger final element
} as const

export const easing = 'cubic-bezier(0.2, 0.8, 0.2, 1)'

// ─── Avatar sizes ────────────────────────────────────────────────────────────
export const avatarSize = {
  xs: 24,
  sm: 32,
  md: 44,
  lg: 64,
} as const

// ─── Touch target minimum ────────────────────────────────────────────────────
export const touchTarget = 44

// ─── Z-index layers ─────────────────────────────────────────────────────────
export const zIndex = {
  base:    0,
  raised:  1,
  header:  50,
  modal:   200,
  sheet:   300,
  toast:   400,
  nav:     900,
} as const
