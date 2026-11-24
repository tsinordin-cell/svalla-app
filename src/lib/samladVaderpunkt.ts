// Väderpunkt för en sökning på Utforska-kartan.
//
// 2026-11-24: en direktlänk som /upptack?q=Utö visade vädret för startvyn
// (Värmdö), eftersom vädret låstes på kartans mitt när sökningen började.
// Ligger alla träffar samlat (en ö, en ort) visar vi i stället vädret där
// träffarna ligger. En utspridd sökning (t.ex. "bastu", hela landet) ger null,
// och då står vädret kvar på platsen det visade före sökningen.

/** Största utbredning (grader) för att träffarna räknas som en plats. ≈ 33 × 28 km. */
export const MAX_LAT_SPANN = 0.3
export const MAX_LNG_SPANN = 0.5

export function samladVaderpunkt(
  traffar: ReadonlyArray<{ latitude: number; longitude: number }>,
): { lat: number; lng: number } | null {
  if (traffar.length === 0) return null
  let s = Infinity, n = -Infinity, w = Infinity, e = -Infinity
  for (const t of traffar) {
    if (t.latitude < s) s = t.latitude
    if (t.latitude > n) n = t.latitude
    if (t.longitude < w) w = t.longitude
    if (t.longitude > e) e = t.longitude
  }
  if (n - s > MAX_LAT_SPANN || e - w > MAX_LNG_SPANN) return null
  return { lat: (s + n) / 2, lng: (w + e) / 2 }
}
