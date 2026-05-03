'use client'
import { analytics } from '@/lib/analytics'
import { toast } from '@/components/Toast'

export default function PlanDayChip({ source = 'upptack' }: { source?: 'upptack' | 'platser' | 'island' }) {
  return (
    <button
      onClick={() => {
        analytics.planDayTap({ source })
        toast('Planera din dag — kommer snart 🌊', 'info')
      }}
      style={{
        position: 'absolute',
        top: 12, right: 12, zIndex: 1001,
        padding: '8px 14px',
        height: 36,
        borderRadius: 999,
        border: '1px solid rgba(30,92,130,0.18)',
        background: 'linear-gradient(90deg, rgba(30,92,130,0.95), rgba(201,110,42,0.95))',
        color: '#fff',
        fontSize: 13, fontWeight: 700,
        cursor: 'pointer',
        display: 'inline-flex', alignItems: 'center', gap: 6,
        boxShadow: '0 2px 8px rgba(0,45,60,0.15)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
      aria-label="Planera din dag"
    >
      <span aria-hidden>☀</span>
      Planera dag
    </button>
  )
}
