import type { Metadata } from 'next'
import type { ReactNode } from 'react'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return {
    alternates: { canonical: `https://svalla.se/event/${slug}` },
  }
}

export default function EventSlugLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
