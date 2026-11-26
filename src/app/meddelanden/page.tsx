'use client'

import { IKON, TomtLage } from '@/components/meddelanden/Delar'

/**
 * /meddelanden. Inkorgen ligger i layouten (src/components/meddelanden/Inkorg.tsx).
 * Här står bara högerspalten på dator, innan man valt ett samtal. På telefon döljs den.
 */
export default function MeddelandenPage() {
  return (
    <div className="md-valj">
      <TomtLage ikon={IKON.pratbubbla} rubrik="Välj ett samtal" text="Dina samtal finns till vänster. Du kan också starta ett nytt." />
    </div>
  )
}
