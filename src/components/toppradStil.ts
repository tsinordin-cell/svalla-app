import type { CSSProperties } from 'react'

/**
 * Gemensamt utseende för knapparna i appens topprad (sök, meddelanden, notiser,
 * kugghjul). 2026-11-23, menyförslaget: 44 px tryckyta som Apple och WCAG
 * rekommenderar (knapparna var 34–38 px), och samma form överallt.
 *
 * 2026-11-25 (Tom: "mindre menyer och mer app", variant C): ingen fylld cirkel,
 * bara ikonen (22 px) i en genomskinlig knapp på 40 px, så att toppraden blir
 * 44 px hög (var 60). Tryckytan är 44 px på höjden: klassen `toppknapp`
 * (globals.css) lägger en osynlig yta 2 px över och under knappen, så ALLA
 * knappar med den här stilen ska också ha className "toppknapp".
 */
export const TOPPKNAPP_STIL: CSSProperties = {
  width: 40, height: 40, borderRadius: '50%',
  background: 'transparent',
  color: 'var(--sea)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  position: 'relative', flexShrink: 0,
  WebkitTapHighlightColor: 'transparent',
}

/** Räknaren på meddelanden och notiser. Text 11 px (var 9 px), vit på --acc-knapp. */
export const RAKNARE_STIL: CSSProperties = {
  position: 'absolute', top: 1, right: 0,
  minWidth: 18, height: 18, padding: '0 4px', borderRadius: 9,
  background: 'var(--acc-knapp)', border: '2px solid var(--bg)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontSize: 11, fontWeight: 700, color: '#fff', lineHeight: 1,
  boxSizing: 'content-box',
}
