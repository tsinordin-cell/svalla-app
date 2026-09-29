/**
 * GÖMD 2026-09-29 (schemakontroll, se PR #409). Funktionen bygger på tabeller
 * som aldrig skapats i databasen (migration social-v2 kördes inte). Sidan
 * svarar 404 tills funktionen tas i bruk på riktigt — koden ligger kvar.
 */
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

/**
 * Incheckningssidan är robots-blockerad men Google hade ändå indexerat den — troligen
 * via interna länkar från innan blockeringen. robots.txt hindrar crawl, inte
 * indexering; bara ett noindex-svar gör det. Sidan är en klientkomponent och
 * kan inte exportera metadata själv, därför denna layout.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function CheckInLayout(_: { children: React.ReactNode }) {
  notFound()
}
