'use client'
import { THORKEL } from '@/lib/thorkel/persona'

type Props = {
  size?: number
  className?: string
  priority?: boolean
  /**
   * När true — animerar en subtil "talking" rörelse (käk-bobble + glow-pulse).
   * Sätt detta till `loading`-state i chat/overlay för att få Thorkel att se
   * ut som han rör munnen medan han streamar text.
   */
  talking?: boolean
}

/**
 * ThorkelAvatar — cirkulär avatar-SVG med valfri talking-animation.
 *
 * Default 40px, 56px i chat, 80px i intro-overlay, 120px på /guide-sidan.
 *
 * Talking-animation:
 *   - Subtil scaleY-pulse (1.0 → 1.018 → 0.992 → 1.0) med transform-origin
 *     överst, så käken är den som rör sig — klassisk talking-head-effekt.
 *   - Mjuk glow-ring som pulserar i samma 280ms-takt som ord-streamen.
 *   - Animationen körs bara medan `talking={true}`, inga DOM-changes annars.
 *
 * Använder vanlig <img> istället för Next.js <Image> eftersom SVG-filer
 * blockeras av Next/Image som standard. Ingen optimerings-vinst förloras.
 */
export default function ThorkelAvatar({ size = 40, className, priority, talking }: Props) {
  return (
    <span
      style={{
        position: 'relative',
        display: 'inline-block',
        width: size,
        height: size,
        flexShrink: 0,
        verticalAlign: 'middle',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={THORKEL.avatar}
        alt={`${THORKEL.name}, ${THORKEL.title}`}
        width={size}
        height={size}
        loading={priority || size >= 80 ? 'eager' : 'lazy'}
        decoding="async"
        className={className}
        style={{
          borderRadius: '50%',
          display: 'block',
          background: 'var(--thor)',
          objectFit: 'cover',
          width: size,
          height: size,
          // Käken är längst ner — origin upptill gör att skalningen rör underdelen.
          transformOrigin: 'center 28%',
          animation: talking ? 'thorkel-talk 320ms ease-in-out infinite' : undefined,
          willChange: talking ? 'transform' : undefined,
        }}
      />
      {talking && (
        <>
          <span
            aria-hidden
            style={{
              position: 'absolute',
              inset: -2,
              borderRadius: '50%',
              animation: 'thorkel-talk-glow 320ms ease-in-out infinite',
              pointerEvents: 'none',
            }}
          />
          <style>{`
            @keyframes thorkel-talk {
              0%, 100% { transform: scaleY(1); }
              25%      { transform: scaleY(1.018); }
              55%      { transform: scaleY(0.992); }
              80%      { transform: scaleY(1.012); }
            }
            @keyframes thorkel-talk-glow {
              0%, 100% { box-shadow: 0 0 0 0 rgba(239,228,204,0); }
              50%      { box-shadow: 0 0 0 3px rgba(239,228,204,0.32); }
            }
            @media (prefers-reduced-motion: reduce) {
              img[alt^="${THORKEL.name}"] {
                animation: none !important;
              }
            }
          `}</style>
        </>
      )}
    </span>
  )
}
