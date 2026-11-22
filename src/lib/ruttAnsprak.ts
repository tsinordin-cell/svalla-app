/**
 * Anspråksnyckel för planerade rutter som skapas utloggad (granskning 2026-11-22).
 *
 * Tidigare kunde vilken inloggad användare som helst som hade länken bli ägare
 * till en rutt utan ägare. Nu får den som skapar rutten en slumpad nyckel som
 * sparas i webbläsaren (lib/ruttAnsprakKlient.ts); databasen har bara SHA-256
 * av den (planned_routes.ansprak_hash). /api/planera/claim kräver nyckeln.
 *
 * Bara för servern (node:crypto).
 */
import { createHash, randomBytes, timingSafeEqual } from 'node:crypto'

export function nyAnsprakNyckel(): string {
  return randomBytes(24).toString('base64url')
}

export function ansprakHash(nyckel: string): string {
  return createHash('sha256').update(nyckel, 'utf8').digest('hex')
}

/** Stämmer nyckeln mot det sparade hashvärdet? Saknas något: nej. */
export function ansprakGiltigt(nyckel: unknown, hash: string | null | undefined): boolean {
  if (typeof nyckel !== 'string' || !nyckel || nyckel.length > 200) return false
  if (typeof hash !== 'string' || !/^[0-9a-f]{64}$/.test(hash)) return false
  const a = Buffer.from(ansprakHash(nyckel), 'hex')
  const b = Buffer.from(hash, 'hex')
  return a.length === b.length && timingSafeEqual(a, b)
}
