'use client'
import { createContext, useContext, useEffect, useState } from 'react'

export type Theme = 'auto' | 'light' | 'dark'
export type Lang  = 'sv' | 'en'

interface ThemeCtx {
  theme:    Theme
  setTheme: (t: Theme) => void
  lang:     Lang
  setLang:  (l: Lang) => void
}

const Ctx = createContext<ThemeCtx>({
  theme: 'auto', setTheme: () => {},
  lang:  'sv',   setLang:  () => {},
})

export const useTheme = () => useContext(Ctx)

function resolvedTheme(t: Theme): 'light' | 'dark' {
  if (t === 'light') return 'light'
  if (t === 'dark')  return 'dark'
  // auto: 20:00–05:59 = mörkt
  const h = new Date().getHours()
  return (h >= 20 || h < 6) ? 'dark' : 'light'
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeRaw] = useState<Theme>('auto')
  const [lang,  setLangRaw]  = useState<Lang>('sv')

  // Ladda inställningar från localStorage på klienten
  useEffect(() => {
    const t = (localStorage.getItem('svalla-theme') || 'auto') as Theme
    const l = (localStorage.getItem('svalla-lang')  || 'sv')   as Lang
    setThemeRaw(t)
    setLangRaw(l)
  }, [])

  // Applicera data-theme på <html> + uppdatera automatiskt om auto-läge
  useEffect(() => {
    const apply = () =>
      document.documentElement.setAttribute('data-theme', resolvedTheme(theme))
    apply()
    if (theme === 'auto') {
      const id = setInterval(apply, 60_000)
      return () => clearInterval(id)
    }
  }, [theme])

  const setTheme = (t: Theme) => {
    setThemeRaw(t)
    localStorage.setItem('svalla-theme', t)
  }
  const setLang = (l: Lang) => {
    setLangRaw(l)
    localStorage.setItem('svalla-lang', l)
  }

  return (
    <Ctx.Provider value={{ theme, setTheme, lang, setLang }}>
      {children}
    </Ctx.Provider>
  )
}
