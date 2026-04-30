/**
 * adminToken.ts
 * Edge-compatible HMAC helper för admin-cookie.
 *
 * Cookievärdet är HMAC-SHA256(ADMIN_PASSWORD, "svalla-admin-v1") i hex.
 * Utan att känna till lösenordet går det inte att beräkna rätt token,
 * även om man vet cookie-namnet och har sett källkoden.
 */

const MSG = 'svalla-admin-v1'

async function importKey(password: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  )
}

/** Beräknar det förväntade cookie-värdet för ett givet lösenord. */
export async function computeAdminToken(password: string): Promise<string> {
  const key = await importKey(password)
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(MSG))
  return Array.from(new Uint8Array(sig))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

/**
 * Konstant-tids jämförelse av token mot förväntat värde.
 * Returnerar true om token är korrekt för det givna lösenordet.
 */
export async function verifyAdminToken(token: string, password: string): Promise<boolean> {
  if (!token || !password) return false
  const expected = await computeAdminToken(password)
  if (expected.length !== token.length) return false
  let mismatch = 0
  for (let i = 0; i < expected.length; i++) {
    mismatch |= expected.charCodeAt(i) ^ token.charCodeAt(i)
  }
  return mismatch === 0
}
