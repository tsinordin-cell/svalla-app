'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function PlaneraCTA({ routeId, hasDoneIt }: { routeId: string; hasDoneIt: boolean }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  if (hasDoneIt) {
    return (
      <div style={{
        marginTop: 20, background: 'rgba(42,157,92,0.1)', borderRadius: 16,
        padding: '14px 16px', border: '1px solid rgba(42,157,92,0.2)',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <span style={{ fontSize: 20 }}>✅</span>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#2a9d5c' }}>Du har gjort den här turen!</span>
      </div>
    )
  }

  async function handleDoneIt() {
    setLoading(true)
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push(`/logga-in?returnTo=/planera/${routeId}`)
      return
    }
    router.push(`/logga?planned_route_id=${routeId}`)
  }

  return (
    <button
      onClick={handleDoneIt}
      disabled={loading}
      style={{
        width: '100%', marginTop: 20, padding: '15px', borderRadius: 16, border: 'none',
        background: 'var(--grad-sea)', color: '#fff', fontSize: 15, fontWeight: 700,
        cursor: 'pointer', boxShadow: '0 4px 20px rgba(10,123,140,0.35)',
        transition: 'all 0.2s',
      }}
    >
      Jag gjorde den här turen!
    </button>
  )
}
