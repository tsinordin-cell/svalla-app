/**
 * P0 22 (2026-11-09): markeringen i ISLAND_NO_TRANSIT för en ö vars brygga finns i
 * Trafiklab men saknar resor, fast en turbåt går dit under säsongen (Bullerö). Rutorna
 * sa då "ingen kollektivtrafik". För sådana öar visar avgångsrutan och dagsplaneraren
 * i stället texten efter " — ", som är belagd i transit-stops.ts.
 */
export const UTAN_RESOR_I_TRAFIKLAB = 'har inga resor i Trafiklab'

/** Hur man tar sig till en ö med UTAN_RESOR_I_TRAFIKLAB i skälet, annars null. */
export function vagDitText(skal: string): string | null {
  if (!skal.includes(UTAN_RESOR_I_TRAFIKLAB)) return null
  const tillagg = skal.split(' — ')[1]?.trim()
  return tillagg ? `${tillagg.replace(/\.$/, '')}.` : null
}

/**
 * Texten i dagsplaneraren för en ö utan Trafiklab-hållplats (ISLAND_NO_TRANSIT i transit-stops.ts).
 *
 * 2026-10-23: Alla sådana öar fick "Ingen kollektivtrafik hit — egen båt eller taxibåt.", även när
 * skälet var att en hållplats fanns men inte kunde knytas till ön. Birka visade då "med Strömma från
 * Klara Mälarstrand" och direkt under "Ingen kollektivtrafik hit". Den texten står kvar för öar utan
 * hållplats inom 5 km; de andra får en text som stämmer.
 */
export function ingenTrafikText(skal: string): string {
  const vagDit = vagDitText(skal)
  if (vagDit) return vagDit
  if (skal.includes('kunde inte knytas') || skal.includes(UTAN_RESOR_I_TRAFIKLAB)) {
    return 'Båttider hit finns inte hos Trafiklab. Se ösidan för hur du tar dig hit.'
  }
  const tillagg = skal.split(' — ')[1]?.trim()
  if (tillagg) return `Ingen kollektivtrafik hit — ${tillagg.replace(/\.$/, '')}.`
  return 'Ingen kollektivtrafik hit — egen båt eller taxibåt.'
}
