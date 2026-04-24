'use client'
import { useRouter } from 'next/navigation'
import { IconChevronLeft } from '@/components/ui/icons'

export default function BackButton({ fallback = '/feed' }: { fallback?: string }) {
  const router = useRouter()

  function goBack() {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push(fallback)
    }
  }

  return (
    <button
      onClick={goBack}
      aria-label="Gå tillbaka"
      className="press-feedback"
      style={{
        position: 'absolute', top: 16, left: 16,
        width: 40, height: 40, borderRadius: '50%',
        background: 'var(--glass-88)', backdropFilter: 'blur(8px)',
        border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <IconChevronLeft size={18} stroke={2.5} color="var(--sea)" />
    </button>
  )
}
