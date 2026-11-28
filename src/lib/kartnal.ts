import type { PlatsKategori } from './platskategori'

/**
 * Kartnålar i formfamiljer (2026-11-27). Delas av Utforska, startsidans
 * karta och minikartan på platssidan, så att nålarna ser likadana ut överallt.
 * Gäller bara nålarna. Listkort, förklaringar och klusterbubblor ritas på
 * egna ställen.
 *
 * Formen visar gruppen: droppe = äta och handla, stäv = båt,
 * skylt = bo och uppleva. Färg och ikon visar kategorin.
 * Färgerna har minst 3:1 kontrast mot kartans vatten (#aad3df) och minst
 * 5:1 mot den vita ikonen. Ikonerna är ritade i 24×24 i Lucides stil.
 */
export type KartnalKategori = PlatsKategori | 'o'

export type PinForm = 'droppe' | 'stav' | 'skylt'
export const PIN_META: Record<KartnalKategori, { color: string; form: PinForm; icon: string }> = {
  krog:      { color: '#c2410c', form: 'droppe', icon: '<path d="M7 3v18"/><path d="M4 3v5a3 3 0 0 0 6 0V3"/><path d="M19 21V3c-2.5 1-4 4-4 8v2h4"/>' },
  butik:     { color: '#854d0e', form: 'droppe', icon: '<path d="M4.5 8h15l-1.2 13H5.7Z"/><path d="M8.5 11V7a3.5 3.5 0 0 1 7 0v4"/>' },
  hamn:      { color: '#1e40af', form: 'stav', icon: '<circle cx="12" cy="5" r="2.6"/><path d="M12 7.6V21"/><path d="M8 11h8"/><path d="M3.5 13.5a8.5 8.5 0 0 0 17 0"/>' },
  naturhamn: { color: '#166534', form: 'stav', icon: '<path d="M12 2.5 6.5 10h3l-3.5 5h12l-3.5-5h3Z"/><path d="M12 15v2"/><path d="M2.5 19.5c1.2 0 1.8-1 3.2-1s2 1 3.2 1 1.8-1 3.1-1 1.9 1 3.2 1 1.8-1 3.2-1 2 1 3.1 1"/>' },
  bastu:     { color: '#be123c', form: 'skylt', icon: '<path d="M3 16h18"/><path d="M5.5 16v4.5"/><path d="M18.5 16v4.5"/><path d="M8 2.5c-1.6 1.6 1.6 3.2 0 4.8s1.6 3.2 0 4.8"/><path d="M12 2.5c-1.6 1.6 1.6 3.2 0 4.8s1.6 3.2 0 4.8"/><path d="M16 2.5c-1.6 1.6 1.6 3.2 0 4.8s1.6 3.2 0 4.8"/>' },
  bensin:    { color: '#18181b', form: 'stav', icon: '<path d="M4.5 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16"/><path d="M3 21h13"/><path d="M7.5 7h4v3.5h-4Z"/><path d="M14.5 10h2a1.5 1.5 0 0 1 1.5 1.5v5a1.5 1.5 0 0 0 3 0V8.5L18 5.5"/>' },
  boende:    { color: '#9333ea', form: 'skylt', icon: '<path d="M3 5v15"/><path d="M3 16h18v4"/><path d="M10 16v-4.5h8a3 3 0 0 1 3 3V16"/><circle cx="6.5" cy="12.5" r="2"/>' },
  // Tillagda 2026-11-27. Uppmätt kontrast: brygga 3,41:1 mot vattnet och
  // 5,47:1 mot ikonen, sevärdhet 5,14:1 och 8,24:1.
  brygga:    { color: '#0f766e', form: 'stav', icon: '<path d="M3.5 9h17"/><path d="M7 9v7.5"/><path d="M12 9v7.5"/><path d="M17 9v7.5"/><path d="M2.5 19.5c1.2 0 1.8-1 3.2-1s2 1 3.2 1 1.8-1 3.1-1 1.9 1 3.2 1 1.8-1 3.2-1 2 1 3.1 1"/>' },
  sevardhet: { color: '#86198f', form: 'skylt', icon: '<path d="M3 21h18"/><path d="M5.5 21V10.5"/><path d="M18.5 21V10.5"/><path d="M10 21V10.5"/><path d="M14 21V10.5"/><path d="M2.5 10.5 12 3.5l9.5 7Z"/>' },
  bad:       { color: '#0369a1', form: 'skylt', icon: '<circle cx="17" cy="5.5" r="2.2"/><path d="M3 13.5l5.5-3.5 3.5 2.5 4-2.5"/><path d="M2.5 15.5c1.2 0 1.8-1 3.2-1s2 1 3.2 1 1.8-1 3.1-1 1.9 1 3.2 1 1.8-1 3.2-1 2 1 3.1 1"/><path d="M2.5 19.5c1.2 0 1.8-1 3.2-1s2 1 3.2 1 1.8-1 3.1-1 1.9 1 3.2 1 1.8-1 3.2-1 2 1 3.1 1"/>' },
  // Öarna finns bara på startsidans karta. Samma blå som idag och samma
  // ö-ikon som i startsidans förklaring, i skyltform.
  o:         { color: '#1e5c82', form: 'skylt', icon: '<path d="M2 19h20"/><path d="M4 19c1-4 4-7 8-7s7 3 8 7"/><path d="M12 12V5"/><path d="M12 5c-2-1-4-.5-5 1 2-.5 3.5 0 5 1 1.5-1 3-1.5 5-1-1-1.5-3-2-5-1Z"/>' },
  annat:     { color: '#475569', form: 'skylt', icon: '<path d="M12 2.8l2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3-4.6-4.4 6.3-.9Z"/>' },
}

// Formerna i en 32×40-ruta. Spetsen, som sitter på platsen, ligger i [16, 39].
export const PIN_PATHS: Record<PinForm, string> = {
  droppe: 'M16 1.2C7.8 1.2 1.2 7.8 1.2 16c0 8.2 14.8 22.6 14.8 22.6S30.8 24.2 30.8 16C30.8 7.8 24.2 1.2 16 1.2Z',
  stav:   'M5 1.5h22a3.5 3.5 0 0 1 3.5 3.5v11.5c0 8-6.5 14.5-14.5 22.5C8 31 1.5 24.5 1.5 16.5V5A3.5 3.5 0 0 1 5 1.5Z',
  skylt:  'M7.5 1.5h17a6 6 0 0 1 6 6v17a6 6 0 0 1-6 6h-4.8L16 38.8l-3.7-8.3H7.5a6 6 0 0 1-6-6v-17a6 6 0 0 1 6-6Z',
}
// Var ikonen ritas i varje form: [translate x, translate y, skala från 24 px].
export const PIN_ICON_POS: Record<PinForm, [number, number, number]> = {
  droppe: [6.5, 6.5, 0.7917],
  stav:   [6.5, 5.5, 0.7917],
  skylt:  [5.5, 5.5, 0.875],
}
export const PIN_SIZE: [number, number] = [32, 40]
export const PIN_ANCHOR: [number, number] = [16, 39]

export function pinHtml(cat: KartnalKategori, isActive = false): string {
  const { color, form, icon } = PIN_META[cat]
  const path = PIN_PATHS[form]
  const [tx, ty, sc] = PIN_ICON_POS[form]
  const scale = isActive ? 1.2 : 1
  const halo = isActive
    ? `<path d="${path}" fill="none" stroke="${color}" stroke-width="6" stroke-linejoin="round" opacity="0.35"/>`
    : ''
  return `
    <div style="transform:scale(${scale});transform-origin:center bottom;transition:transform .18s ease;filter:drop-shadow(0 4px 8px rgba(10,30,50,0.35))">
      <svg width="${PIN_SIZE[0]}" height="${PIN_SIZE[1]}" viewBox="0 0 ${PIN_SIZE[0]} ${PIN_SIZE[1]}" overflow="visible" xmlns="http://www.w3.org/2000/svg">
        ${halo}
        <path d="${path}" fill="${color}" stroke="#fff" stroke-width="2"/>
        <g transform="translate(${tx} ${ty}) scale(${sc})" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
          ${icon}
        </g>
      </svg>
    </div>
  `
}

/** Nålen i liten storlek, utan skugga, för förklaringen på startsidans karta. */
export function pinMiniSvg(cat: KartnalKategori, hojd: number): string {
  const { color, form, icon } = PIN_META[cat]
  const [tx, ty, sc] = PIN_ICON_POS[form]
  const bredd = Math.round((hojd * PIN_SIZE[0]) / PIN_SIZE[1] * 10) / 10
  return `<svg width="${bredd}" height="${hojd}" viewBox="0 0 ${PIN_SIZE[0]} ${PIN_SIZE[1]}" overflow="visible" xmlns="http://www.w3.org/2000/svg"><path d="${PIN_PATHS[form]}" fill="${color}" stroke="#fff" stroke-width="2"/><g transform="translate(${tx} ${ty}) scale(${sc})" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">${icon}</g></svg>`
}
