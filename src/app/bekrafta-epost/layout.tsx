import type { Metadata } from 'next'

/** Sidan nås bara via länken i bekräftelsemejlet; den ska aldrig indexeras. */
export const metadata: Metadata = {
  title: 'Bekräfta e-post',
  robots: { index: false, follow: false },
}

export default function BekraftaEpostLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
