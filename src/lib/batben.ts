/**
 * Är resans ben en båt? DepartureWidget skrev "· båt" bara när kategorin innehöll "färja", så ResRobots kategori
 * "Färjetrafik - övrigt" (Stavsnäs båttaxi till Sandhamn) fick ingen markering fast benet är en båt (Kontrollantens fynd
 * sm08-k011; mallarnas runda 10, 2026-11-17). Nu samma test som valjSistaBaten i src/lib/trafiklab.ts: ResRobots
 * trafikslag catCode 8 (Ferries) eller produktklass cls 256 (färja), och kategorins namn som reserv när koderna saknas
 * (färja, färjetrafik, båt).
 */
export function arBatben(l: { category?: string | null; catCode?: string | number; cls?: string | number }): boolean {
  if (l.catCode != null && String(l.catCode) === '8') return true
  if (l.cls != null && String(l.cls) === '256') return true
  return /färj|båt/i.test(l.category ?? '')
}
