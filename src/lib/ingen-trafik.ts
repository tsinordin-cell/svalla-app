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
 * 2026-10-23: Alla sådana öar fick "Ingen kollektivtrafik hit: egen båt eller taxibåt.", även när
 * skälet var att en hållplats fanns men inte kunde knytas till ön. Birka visade då "med Strömma från
 * Klara Mälarstrand" och direkt under "Ingen kollektivtrafik hit". Den texten står kvar för öar utan
 * hållplats inom 5 km; de andra får en text som stämmer.
 */
export function ingenTrafikText(skal: string): string {
  const vagDit = vagDitText(skal)
  if (vagDit) return vagDit
  // Rättelse P0 28 (2026-11-28, k26): "finns inte hos Trafiklab" var inte mätt. Dagsplaneraren visar inga båttider
  // för öar i ISLAND_NO_TRANSIT (hasTransit i dagsplan.ts), och det är vad texten säger.
  if (skal.includes('kunde inte knytas') || skal.includes(UTAN_RESOR_I_TRAFIKLAB)) {
    return 'Båttider hit visas inte här. Se ösidan för hur du tar dig hit.'
  }
  // Rättelse P0 28 (2026-11-28, k24): Mörkö har SL-buss 727 och vägfärja, så "Ingen kollektivtrafik hit:" stod fel framför
  // tillägget. Tillägget i ISLAND_NO_TRANSIT säger själv hur ön nås och visas nu som det står, som i avgångsrutan.
  const tillagg = skal.split(' — ')[1]?.trim().replace(/\.$/, '')
  if (tillagg) return `${tillagg.charAt(0).toUpperCase()}${tillagg.slice(1)}.`
  return 'Ingen kollektivtrafik hit: egen båt eller taxibåt.'
}
