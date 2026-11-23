/**
 * serializeForScript — JSON.stringify som är säker att lägga i en <script>-tagg.
 *
 * Bakgrund (2026-11-22): forumtrådar skrev ut användarens rubrik och text i
 * <script type="application/ld+json"> via dangerouslySetInnerHTML med rå
 * JSON.stringify. JSON escapar inte "<", så texten "</script><script>…" i en
 * rubrik avslutade taggen och startade ett nytt skript. CSP:n tillåter
 * 'unsafe-inline', så det hade körts hos alla som öppnade tråden.
 *
 * Escapar <, >, & samt U+2028/U+2029 som \uXXXX. Resultatet är fortfarande
 * giltig JSON (och giltig JS), så Google läser JSON-LD:n exakt som förut.
 *
 * Använd ALLTID denna i stället för JSON.stringify när resultatet hamnar i
 * dangerouslySetInnerHTML på en <script>-tagg.
 */
const ESCAPES: Record<string, string> = {
  '<': '\\u003c',
  '>': '\\u003e',
  '&': '\\u0026',
  '\u2028': '\\u2028',
  '\u2029': '\\u2029',
}

export function serializeForScript(data: unknown): string {
  const json = JSON.stringify(data)
  // JSON.stringify(undefined) ger undefined — tomt skript är ofarligt.
  if (json === undefined) return ''
  return json.replace(/[<>&\u2028\u2029]/g, (c) => ESCAPES[c] ?? c)
}
