/**
 * indexnow — meddelar Bing, Yandex m.fl. att sidor har ändrats.
 *
 * Ersätter Google Indexing API (borttaget 2026-10-10). Googles API är bara
 * avsett för jobbannonser och livesändningar; för guider och ösidor ignoreras
 * anropen. Google hittar ändringar via sitemap.xml, som nu har riktiga
 * ändringsdatum (src/lib/sidodatum.ts).
 *
 * IndexNow kräver att nyckeln går att hämta på sajten. Den serveras från
 * /indexnow-nyckel.txt (src/app/indexnow-nyckel.txt/route.ts) och anges som
 * keyLocation. Saknas INDEXNOW_KEY görs ingenting.
 */
const HOST = 'svalla.se'
export const NYCKEL_URL = `https://${HOST}/indexnow-nyckel.txt`

export type IndexNowSvar = { ok: boolean; skickade: number; status?: number; fel?: string }

export async function pingaIndexNow(urls: string[]): Promise<IndexNowSvar> {
  const key = process.env.INDEXNOW_KEY
  const lista = urls.filter(u => u.startsWith(`https://${HOST}/`)).slice(0, 10_000)
  if (!key) return { ok: false, skickade: 0, fel: 'INDEXNOW_KEY saknas' }
  if (lista.length === 0) return { ok: false, skickade: 0, fel: 'inga svalla.se-adresser' }
  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host: HOST, key, keyLocation: NYCKEL_URL, urlList: lista }),
    })
    // 200 = mottaget, 202 = mottaget, nyckeln verifieras senare.
    return { ok: res.status === 200 || res.status === 202, skickade: lista.length, status: res.status }
  } catch (e) {
    return { ok: false, skickade: 0, fel: (e as Error).message }
  }
}
