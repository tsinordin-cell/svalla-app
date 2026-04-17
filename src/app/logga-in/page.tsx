'use client'
import dynamic from 'next/dynamic'

// Disable SSR — avoids React 19 hydration errors with createBrowserClient
const LoggaInClient = dynamic(() => import('./LoggaInClient'), { ssr: false })

export default function LoggaInPage() {
  return <LoggaInClient />
}
