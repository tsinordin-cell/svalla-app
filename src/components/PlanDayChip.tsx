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
        bottom: 'calc(var(--nav-h, 64px) + env(safe-area-inset-bottom, 0px) + 12px)',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1001,
        padding: '10px 18px',
        height: 40,
        borderRadius: 999,
        border: '1px solid rgba(30,92,130,0.20)',
        background: 'linear-gradient(90deg, rgba(30,92,130,0.97), rgba(201,110,42,0.97))',
        color: '#fff',
        fontSize: 13, fontWeight: 700,
        cursor: 'pointer',
        display: 'inline-flex', alignItems: 'center', gap: 6,
        boxShadow: '0 4px 14px rgba(0,45,60,0.25)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        whiteSpace: 'nowrap',
      }}
      aria-label="Planera din dag"
    >
      <span aria-hidden>☀</span>
      Planera dag
    </button>
  )
}
