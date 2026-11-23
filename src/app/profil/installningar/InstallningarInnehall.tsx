'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { useTheme, type Theme, type Lang } from '@/components/ThemeProvider'
import { Sun, Moon, SunMoon } from '@/components/icons/LucideIcons'
import Icon from '@/components/Icon'
import LogoutConfirm from '@/components/LogoutConfirm'

/**
 * Inställningar, flyttade från profilsidan 2026-11-23 (menyförslaget, Toms ja).
 * Före: tema, språk och Radera konto låg längst ned på /profil, och Logga ut
 * var en textlänk i profilens sidhuvud. Nu ligger allt här, bakom kugghjulet.
 * Innehållet är detsamma som förut; inget val är borttaget.
 */
export default function InstallningarInnehall() {
  const { theme, setTheme, lang, setLang } = useTheme()
  const router = useRouter()
  const [signOutOpen, setSignOutOpen] = useState(false)
  const [signingOut, setSigningOut] = useState(false)

  async function performSignOut() {
    setSigningOut(true)
    await createClient().auth.signOut()
    router.push('/logga-in')
  }

  const pill = (active: boolean): React.CSSProperties => ({
    padding: '8px 16px', borderRadius: 20, cursor: 'pointer', border: 'none', minHeight: 40,
    fontFamily: 'inherit', fontSize: 13, fontWeight: active ? 600 : 500,
    transition: 'all 0.15s',
    background: active ? 'var(--grad-sea)' : 'rgba(10,123,140,0.07)',
    color: active ? '#fff' : 'var(--txt2)',
    boxShadow: active ? '0 2px 8px rgba(30,92,130,0.25)' : 'none',
  })
  const themes = [
    { val: 'auto'  as Theme, label: 'Auto',  icon: <SunMoon size={13} /> },
    { val: 'light' as Theme, label: 'Ljust', icon: <Sun size={13} /> },
    { val: 'dark'  as Theme, label: 'Mörkt', icon: <Moon size={13} /> },
  ]
  const langs: { val: Lang; label: string; flag: string }[] = [
    { val: 'sv', label: 'Svenska', flag: '🇸🇪' },
    { val: 'en', label: 'English', flag: '🇬🇧' },
  ]
  const kort: React.CSSProperties = {
    background: 'var(--white)', borderRadius: 18, padding: '18px 16px', marginTop: 12,
    boxShadow: '0 1px 8px rgba(0,45,60,0.07)',
  }
  const rubrik: React.CSSProperties = {
    fontSize: 11, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px', margin: '0 0 12px',
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 'calc(var(--nav-h) + env(safe-area-inset-bottom, 0px) + 24px)' }}>
      <LogoutConfirm
        open={signOutOpen}
        busy={signingOut}
        onCancel={() => { if (!signingOut) setSignOutOpen(false) }}
        onConfirm={performSignOut}
      />

      <header style={{
        display: 'flex', alignItems: 'center', gap: 8, minHeight: 60, padding: '8px 16px 8px 8px',
        background: 'var(--header-bg)',
        backdropFilter: 'saturate(1.4) blur(16px)', WebkitBackdropFilter: 'saturate(1.4) blur(16px)',
        borderBottom: '1px solid rgba(10,123,140,0.10)',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <Link href="/profil" aria-label="Tillbaka till profilen" style={{
          width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--sea)', textDecoration: 'none', flexShrink: 0,
        }}>
          <Icon name="chevronLeft" size={22} stroke={2} />
        </Link>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--sea)', margin: 0 }}>Inställningar</h1>
      </header>

      <div style={{ maxWidth: 520, margin: '0 auto', padding: '4px 16px 0' }}>
        <section style={kort} aria-labelledby="inst-tema">
          <h2 id="inst-tema" style={rubrik}>Tema</h2>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {themes.map(t => (
              <button key={t.val} onClick={() => setTheme(t.val)} aria-pressed={theme === t.val} style={pill(theme === t.val)}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>{t.icon} {t.label}</span>
              </button>
            ))}
          </div>
        </section>

        <section style={kort} aria-labelledby="inst-sprak">
          <h2 id="inst-sprak" style={rubrik}>Språk</h2>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {langs.map(l => (
              <button key={l.val} onClick={() => setLang(l.val)} aria-pressed={lang === l.val} style={pill(lang === l.val)}>{l.flag} {l.label}</button>
            ))}
          </div>
        </section>

        <section style={kort} aria-labelledby="inst-konto">
          <h2 id="inst-konto" style={rubrik}>Konto</h2>
          <button onClick={() => setSignOutOpen(true)} style={{
            display: 'flex', alignItems: 'center', gap: 10, width: '100%', minHeight: 48, padding: '0 4px',
            background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
            fontSize: 15, fontWeight: 600, color: 'var(--sea)', textAlign: 'left',
          }}>
            <Icon name="logOut" size={18} stroke={2} />
            Logga ut
          </button>
          <div style={{ borderTop: '1px solid rgba(10,123,140,0.10)', margin: '6px 0' }} />
          <Link href="/profil/installningar/radera" style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, padding: '0 4px', fontSize: 13, color: 'var(--txt2)', textDecoration: 'underline' }}>
            Radera mitt konto
          </Link>
        </section>
      </div>
    </div>
  )
}
