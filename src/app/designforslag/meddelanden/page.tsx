import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Forhandsvisning from './Forhandsvisning'
import '../../meddelanden/meddelanden.css'

/**
 * Förhandsvisning av Meddelanden med påhittade samtal (2026-11-26, premiumsteg 1).
 * Visar samma byggstenar som de riktiga sidorna, så att designen kan granskas och
 * fotograferas utan inloggning. Finns bara i förhandsversioner, aldrig på svalla.se.
 */
export const metadata: Metadata = {
  title: 'Förhandsvisning: meddelanden',
  robots: { index: false, follow: false },
}

export default async function Page({ searchParams }: { searchParams: Promise<{ vy?: string; tema?: string; meny?: string; svar?: string; db?: string; plus?: string; pek?: string; rost?: string; konv?: string }> }) {
  if (process.env.VERCEL_ENV === 'production') notFound()
  const { vy, tema, meny, svar, db, plus, pek, rost, konv } = await searchParams
  return <Forhandsvisning vy={vy ?? 'samtal'} tema={tema} meny={meny} svar={svar} db={db} plus={plus} pek={pek} rost={rost} konv={konv} />
}
