'use client'
import dynamic from 'next/dynamic'

// Disable SSR — avoids React 19 hydration errors with createBrowserClient
const ProfilClient = dynamic(() => import('./ProfilClient'), { ssr: false })

export default function ProfilPage() {
  return <ProfilClient />
}
