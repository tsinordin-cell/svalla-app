'use client'
import { useRouter } from 'next/navigation'
import { IconChevronLeft } from '@/components/ui/icons'

/** `ljus`: vit pil på genomskinlig platta, för mörka sidhuvuden (t.ex. /nyhetsbrev). */
export default function BackButtonInline({ fallback = '/feed', ljus = false }: { fallback?: string; ljus?: boolean }) {
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
        width: 36, height: 36, borderRadius: '50%',
        background: ljus ? 'rgba(255,255,255,0.14)' : 'rgba(10,123,140,0.08)',
        border: 'none', cursor: 'pointer', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      <IconChevronLeft size={18} stroke={2.5} color={ljus ? '#ffffff' : 'var(--sea)'} />
    </button>
  )
}
