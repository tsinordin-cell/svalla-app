/**
 * Landning för inbjudningslänk /i/[code]
 * - Validerar koden
 * - Visar inbjudaren (om möjligt) och CTA till signup/login
 * - Sparar koden i cookie så den kan lösas in efter auth
 *
 * Server-komponent: läser koden + visar statiskt innehåll.
 */
import { createServerSupabaseClient } from '@/lib/supabase-server'
import Link from 'next/link'
import { cookies } from 'next/headers'
import InviteRedeemClient from './InviteRedeemClient'

export const dynamic = 'force-dynamic'

export default async function InvitePage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params
  const upper = code.toUpperCase()
  const supabase = await createServerSupabaseClient()

  // Spara koden i cookie så den kan lösas in efter signup
  const cookieStore = await cookies()
  cookieStore.set('svalla_invite', upper, {
    maxAge: 60 * 60 * 24 * 30, // 30 dagar
    path: '/',
    sameSite: 'lax',
  })

  // Hämta publik info om koden
  const { data: inv } = await supabase
    .from('invite_codes')
    .select('code, max_uses, uses, expires_at')
    .eq('code', upper)
    .maybeSingle()

  const expired = inv?.expires_at ? new Date(inv.expires_at) < new Date() : false
  const exhausted = inv?.max_uses != null && inv.uses >= inv.max_uses
  const valid = !!inv && !expired && !exhausted

  // Hämta inbjudare via invites-tabellen — endast möjligt om vi även är auth eller via RPC.
  // Enklast: hämta senaste invite med code via en rpc. Vi kör dock utan inviterprofil
  // i landningen och berättar bara att länken är giltig.

  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 40 }}>
      <div style={{ maxWidth: 520, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 64, marginBottom: 8 }}>⛵</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: 'var(--txt)', margin: '0 0 6px' }}>
            Välkommen till Svalla
          </h1>
          <p style={{ fontSize: 14, color: 'var(--txt2)', margin: 0, lineHeight: 1.5 }}>
            En social plattform för båtliv och skärgård.
          </p>
        </div>

        {valid && (
          <div style={{
            background: 'var(--white)', borderRadius: 20, padding: '18px 20px',
            boxShadow: '0 4px 24px rgba(0,45,60,0.10)',
            border: '1.5px solid rgba(30,92,130,0.15)',
            marginBottom: 20,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 22 }}>🔗</span>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--txt)' }}>
                Du har bjudits in
              </div>
            </div>
            <p style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.55, margin: '0 0 12px' }}>
              När du skapar ett konto följer du automatiskt personen som bjöd in dig.
              Inbjudningskod: <strong style={{ fontFamily: 'ui-monospace, SF Mono, Menlo, monospace', letterSpacing: '1.2px' }}>{upper}</strong>
            </p>
            {user ? (
              <InviteRedeemClient code={upper} />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Link href={`/kom-igang?invite=${upper}`} style={{
                  display: 'block', padding: 14, borderRadius: 14,
                  background: 'var(--grad-acc)',
                  color: '#fff', fontSize: 15, fontWeight: 600, textAlign: 'center', textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(201,110,42,0.35)',
                }}>
                  Skapa konto
                </Link>
                <Link href={`/logga-in?invite=${upper}&next=/i/${upper}`} style={{
                  display: 'block', padding: 12, borderRadius: 12,
                  border: '1px solid rgba(10,123,140,0.20)', textAlign: 'center',
                  fontSize: 13, fontWeight: 700, color: 'var(--txt)', textDecoration: 'none',
                }}>
                  Logga in
                </Link>
              </div>
            )}
          </div>
        )}

        {!valid && (
          <div style={{
            background: 'var(--white)', borderRadius: 20, padding: '18px 20px',
            boxShadow: '0 2px 12px rgba(0,45,60,0.07)',
            border: '1px solid rgba(200,30,30,0.15)',
            marginBottom: 20,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 22 }}>⚠️</span>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--red)' }}>
                {expired ? 'Länken har gått ut' : exhausted ? 'Länken är slut' : 'Ogiltig länk'}
              </div>
            </div>
            <p style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.55, margin: 0 }}>
              Du kan fortfarande skapa ett konto — be personen som delade länken om en ny.
            </p>
            <Link href="/kom-igang" style={{
              display: 'block', marginTop: 14, padding: 12, borderRadius: 12,
              background: 'var(--grad-sea)',
              color: '#fff', fontSize: 14, fontWeight: 600, textAlign: 'center', textDecoration: 'none',
            }}>
              Skapa konto ändå →
            </Link>
          </div>
        )}

        <div style={{ textAlign: 'center' }}>
          <Link href="/" style={{ fontSize: 12, color: 'var(--txt3)' }}>
            ← Till startsidan
          </Link>
        </div>
      </div>
    </div>
  )
}
