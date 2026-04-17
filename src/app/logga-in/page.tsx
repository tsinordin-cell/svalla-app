'use client'
import { useState, useEffect } from 'react'
import LoggaInClient from './LoggaInClient'

// Server renders null → client initial render = null → perfect hydration match.
// After mount, useEffect fires and the full page renders client-side only.
// This avoids the React 19 fatal error from BAILOUT_TO_CLIENT_SIDE_RENDERING.
export default function LoggaInPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null
  return <LoggaInClient />
}
