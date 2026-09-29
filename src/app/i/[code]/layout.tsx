/**
 * GÖMD 2026-09-29 (schemakontroll, se PR #409). Funktionen bygger på tabeller
 * som aldrig skapats i databasen (migration social-v2 kördes inte). Sidan
 * svarar 404 tills funktionen tas i bruk på riktigt — koden ligger kvar.
 */
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = { robots: { index: false, follow: false } }

export default function GomdLayout(_: { children: React.ReactNode }) {
  notFound()
}
