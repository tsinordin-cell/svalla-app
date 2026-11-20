import type { Metadata } from 'next'

/** Sidan nås bara via länken i återställningsmejlet; den ska aldrig indexeras. */
export const metadata: Metadata = {
  title: 'Välj nytt lösenord',
  robots: { index: false, follow: false },
}

export default function NyttLosenordLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
