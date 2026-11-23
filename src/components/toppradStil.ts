import type { CSSProperties } from 'react'

/**
 * Gemensamt utseende för knapparna i appens topprad (sök, meddelanden, notiser,
 * kugghjul). 2026-11-23, menyförslaget: 44 px tryckyta som Apple och WCAG
 * rekommenderar (knapparna var 34–38 px), och samma form överallt.
 */
export const TOPPKNAPP_STIL: CSSProperties = {
  width: 44, height: 44, borderRadius: '50%',
  background: 'var(--teal-12)',
  color: 'var(--sea)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  position: 'relative', flexShrink: 0,
  WebkitTapHighlightColor: 'transparent',
}

/** Räknaren på meddelanden och notiser. Text 11 px (var 9 px), vit på --acc-knapp. */
export const RAKNARE_STIL: CSSProperties = {
  position: 'absolute', top: 2, right: 2,
  minWidth: 18, height: 18, padding: '0 4px', borderRadius: 9,
  background: 'var(--acc-knapp)', border: '2px solid var(--bg)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontSize: 11, fontWeight: 700, color: '#fff', lineHeight: 1,
  boxSizing: 'content-box',
}
