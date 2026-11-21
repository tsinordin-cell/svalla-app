/**
 * Wikimedia Commons-miniatyr i given bredd.
 *
 * Originalfiler (upload.wikimedia.org/wikipedia/commons/a/ab/Fil.jpg, utan /thumb/) svarar
 * 429 när man länkar direkt till dem, och de är ofta flera MB. Bastu-rutan på startsidan
 * var grå av det skälet (mätt 2026-11-21). Miniatyrer (/thumb/.../960px-Fil.jpg) fungerar.
 *
 * Andra adresser lämnas orörda.
 */
export function commonsTumme(url: string, px: number): string {
  if (url.includes('/thumb/')) return url.replace(/\/\d+px-/, `/${px}px-`)
  const m = url.match(/^https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/([0-9a-f])\/([0-9a-f]{2})\/([^/]+)$/)
  return m ? `https://upload.wikimedia.org/wikipedia/commons/thumb/${m[1]}/${m[2]}/${m[3]}/${px}px-${m[3]}` : url
}
