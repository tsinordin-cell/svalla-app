/**
 * Texten i dagsplaneraren för en ö utan Trafiklab-hållplats (ISLAND_NO_TRANSIT i transit-stops.ts).
 *
 * 2026-10-23: Alla sådana öar fick "Ingen kollektivtrafik hit — egen båt eller taxibåt.", även när
 * skälet var att en hållplats fanns men inte kunde knytas till ön. Birka visade då "med Strömma från
 * Klara Mälarstrand" och direkt under "Ingen kollektivtrafik hit". Den texten står kvar för öar utan
 * hållplats inom 5 km; de andra får en text som stämmer.
 */
export function ingenTrafikText(skal: string): string {
  if (skal.includes('kunde inte knytas')) {
    return 'Båttider hit finns inte hos Trafiklab. Se ösidan för hur du tar dig hit.'
  }
  const tillagg = skal.split(' — ')[1]?.trim()
  if (tillagg) return `Ingen kollektivtrafik hit — ${tillagg.replace(/\.$/, '')}.`
  return 'Ingen kollektivtrafik hit — egen båt eller taxibåt.'
}
