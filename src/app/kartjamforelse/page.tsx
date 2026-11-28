import type { Metadata } from 'next'
import Jamforelse from './Jamforelse'

// Testsida för omtaget av /upptack (steg 5 och 6). Bara för förhandsvisning, ska inte slås ihop.
export const metadata: Metadata = { title: 'Kartjämförelse (test)', robots: { index: false, follow: false } }

export default function Page() {
  return <Jamforelse />
}
