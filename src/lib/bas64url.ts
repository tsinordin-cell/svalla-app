/**
 * UTF-8 till base64url utan Node-Buffer.
 * Söksidan körs i webbläsaren, där Buffer-polyfillen saknar kodningen
 * base64url och kastar. Fotolänken måste ändå gå att avkoda med
 * Buffer.from(s, 'base64url') på servern.
 */
export function utf8TillBas64url(text: string): string {
  const bytes = new TextEncoder().encode(text)
  let bin = ''
  for (const b of bytes) bin += String.fromCharCode(b)
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}
