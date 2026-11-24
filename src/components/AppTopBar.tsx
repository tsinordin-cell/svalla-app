import type { ReactNode } from 'react'
import Link from 'next/link'
import MessageBell from '@/components/MessageBell'
import NotificationBell from '@/components/NotificationBell'
import SilentBoundary from '@/components/SilentBoundary'
import Icon from '@/components/Icon'
import { TOPPKNAPP_STIL } from '@/components/toppradStil'
import ToppradLogga from '@/components/ToppradLogga'
import ToppradGom from '@/components/ToppradGom'

/**
 * Appens topprad, samma på huvudsidorna (menyförslaget, Toms ja 2026-11-23).
 *
 * Före: Flöde, Profil, Rutter och Topplista hade var sin header. Planera och
 * Utforska saknade meddelanden och notiser, och ett hus ledde till
 * marknadssajten på Flöde och Profil.
 *
 * Till vänster: loggan (till Flöde, eller startsidan utloggad), annars sidans namn.
 * Till höger: sök, meddelanden och notiser. På Profil byts sök mot kugghjulet.
 *
 * Från 1024 px finns sök, meddelanden och notiser i sidomenyn, så knapparna
 * döljs där (klassen app-topbar-atgarder i globals.css). Kugghjulet syns alltid.
 */
export default function AppTopBar({
  titel,
  undertitel,
  variant = 'standard',
  hoger,
  doljPaDesktop = false,
  sticky = true,
  bakgrund,
  huvudrubrik = false,
  onSok,
}: {
  /** Sidans namn. Utan titel visas loggan som länk till Flöde. */
  titel?: ReactNode
  undertitel?: ReactNode
  /** 'profil' byter sök mot kugghjulet till inställningarna. */
  variant?: 'standard' | 'profil'
  /** Extra innehåll längst till höger, efter knapparna (t.ex. Thorkel på Rutter). */
  hoger?: ReactNode
  /** Döljer hela raden från 1024 px, där sidomenyn redan har allt (Flöde, Utforska). */
  doljPaDesktop?: boolean
  sticky?: boolean
  /** Bakgrund om sidan har en egen ton bakom raden (Flödets gradient). */
  bakgrund?: string
  /** Titeln blir sidans h1. Bara där sidan saknar en egen h1 (Topplista). */
  huvudrubrik?: boolean
  /** Sidan har ett eget sök (Utforska): förstoringsglaset öppnar det i stället för /sok. */
  onSok?: () => void
}) {
  const Rubrik = huvudrubrik ? 'h1' : 'p'
  return (
    <header
      className={`app-topbar${doljPaDesktop ? ' app-topbar--dold-desktop' : ''}`}
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        minHeight: 44,
        padding: '2px 8px 2px 16px',
        background: bakgrund ?? 'var(--header-bg)',
        backdropFilter: 'saturate(1.4) blur(16px)', WebkitBackdropFilter: 'saturate(1.4) blur(16px)',
        borderBottom: '1px solid rgba(10,123,140,0.10)',
        position: sticky ? 'sticky' : 'relative', top: 0, zIndex: 50,
      }}
    >
      <div style={{ minWidth: 0, flex: 1 }}>
        {titel ? (
          <>
            <Rubrik className="app-topbar-titel" style={{
              fontSize: 20, fontWeight: 700, color: 'var(--sea)', margin: 0,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {titel}
            </Rubrik>
            {undertitel && (
              <p style={{ fontSize: 12, color: 'var(--txt3)', margin: '2px 0 0', fontWeight: 500 }}>{undertitel}</p>
            )}
          </>
        ) : (
          <ToppradLogga />
        )}
      </div>
      <TopBarAtgarder variant={variant} onSok={onSok} />
      {hoger}
      {/* 2026-11-25: raden glider undan när man skrollar ner och kommer tillbaka
          när man skrollar upp. Bara där den ligger fast överst (inte kartan på Utforska). */}
      {sticky && <ToppradGom />}
    </header>
  )
}

/**
 * Knapparna till höger i toppraden. Används också på sidor som behåller sin
 * egen header (Rutter, Meddelanden), så att knapparna ser lika ut överallt.
 */
export function TopBarAtgarder({ variant = 'standard', utanMeddelanden = false, onSok }: { variant?: 'standard' | 'profil'; utanMeddelanden?: boolean; onSok?: () => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0 }}>
      <div className="app-topbar-atgarder" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {variant === 'standard' && (onSok ? (
          <button type="button" onClick={onSok} aria-label="Sök på kartan" className="press-feedback toppknapp" style={{ ...TOPPKNAPP_STIL, border: 'none', padding: 0, cursor: 'pointer' }}>
            <Icon name="search" size={22} stroke={2} />
          </button>
        ) : (
          <Link href="/sok" aria-label="Sök" className="press-feedback toppknapp" style={{ ...TOPPKNAPP_STIL, textDecoration: 'none' }}>
            <Icon name="search" size={22} stroke={2} />
          </Link>
        ))}
        {!utanMeddelanden && <SilentBoundary><MessageBell /></SilentBoundary>}
        <SilentBoundary><NotificationBell /></SilentBoundary>
      </div>
      {variant === 'profil' && (
        <Link href="/profil/installningar" aria-label="Inställningar" className="press-feedback toppknapp" style={{ ...TOPPKNAPP_STIL, textDecoration: 'none' }}>
          <Icon name="settings" size={22} stroke={2} />
        </Link>
      )}
    </div>
  )
}
