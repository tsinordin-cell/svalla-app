'use client'

/**
 * Inspelning av röstmeddelanden (2026-11-26).
 *
 * Spelar in med webbläsarens MediaRecorder. Formatet väljs i den här ordningen,
 * så att klippet kan spelas upp på så många telefoner som möjligt:
 *   1. MP4 med AAC (iPhone och Safari spelar alltid in så)
 *   2. WebM med Opus (Chrome och Firefox)
 * Hinken dm-bilder tar bara emot audio/mp4 och audio/webm, högst 5 MB.
 * Med 64 kbit/s blir två minuter knappt 1 MB.
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { ROST_MAX_SEKUNDER } from './dmBilder'

export type RostFormat = { mime: string; typ: 'audio/mp4' | 'audio/webm'; filandelse: 'm4a' | 'webm' }

const KANDIDATER: RostFormat[] = [
  { mime: 'audio/mp4;codecs=mp4a.40.2', typ: 'audio/mp4', filandelse: 'm4a' },
  { mime: 'audio/mp4', typ: 'audio/mp4', filandelse: 'm4a' },
  { mime: 'audio/webm;codecs=opus', typ: 'audio/webm', filandelse: 'webm' },
  { mime: 'audio/webm', typ: 'audio/webm', filandelse: 'webm' },
]

/** Formatet som den här webbläsaren kan spela in, eller null. */
export function rostFormat(): RostFormat | null {
  if (typeof window === 'undefined' || typeof MediaRecorder === 'undefined' || !navigator.mediaDevices?.getUserMedia) return null
  for (const k of KANDIDATER) {
    try { if (MediaRecorder.isTypeSupported(k.mime)) return k } catch { /* prova nästa */ }
  }
  return null
}

export type RostLage = 'av' | 'startar' | 'spelar' | 'klar' | 'skickar'

export type RostKlipp = { blob: Blob; sekunder: number; format: RostFormat }

export type RostInspelning = {
  /** Sant när webbläsaren kan spela in. Avgörs efter att sidan laddats. */
  kan: boolean
  lage: RostLage
  sekunder: number
  /** Ljudnivåer 0–1 för de senaste ögonblicken, nyast sist. */
  nivaer: number[]
  starta: () => void
  avbryt: () => void
  skicka: () => void
}

const STAPLAR = 28

export function useRostInspelning({ onKlipp, onFel }: {
  /** Anropas när ett klipp ska skickas. Returnerar när uppladdningen är klar. */
  onKlipp: (k: RostKlipp) => Promise<void>
  onFel: (text: string) => void
}): RostInspelning {
  const [kan, setKan] = useState(false)
  const [lage, setLage] = useState<RostLage>('av')
  const [sekunder, setSekunder] = useState(0)
  const [nivaer, setNivaer] = useState<number[]>(() => Array(STAPLAR).fill(0))

  const rec = useRef<MediaRecorder | null>(null)
  const strom = useRef<MediaStream | null>(null)
  const bitar = useRef<Blob[]>([])
  const start = useRef(0)
  const varaktighet = useRef(0)
  const format = useRef<RostFormat | null>(null)
  const timer = useRef<number | null>(null)
  const ljud = useRef<AudioContext | null>(null)
  const ram = useRef<number | null>(null)
  const efterStopp = useRef<'skicka' | 'kasta' | 'vanta'>('kasta')
  const onKlippRef = useRef(onKlipp); onKlippRef.current = onKlipp
  const onFelRef = useRef(onFel); onFelRef.current = onFel

  useEffect(() => { setKan(rostFormat() !== null) }, [])

  const stadaUpp = useCallback(() => {
    if (timer.current) { window.clearInterval(timer.current); timer.current = null }
    if (ram.current) { cancelAnimationFrame(ram.current); ram.current = null }
    strom.current?.getTracks().forEach(t => t.stop())
    strom.current = null
    ljud.current?.close().catch(() => {})
    ljud.current = null
  }, [])

  // Lämnar man sidan mitt i en inspelning släpps mikrofonen.
  useEffect(() => () => {
    efterStopp.current = 'kasta'
    try { if (rec.current && rec.current.state !== 'inactive') rec.current.stop() } catch { /* redan stoppad */ }
    stadaUpp()
  }, [stadaUpp])

  const skickaKlipp = useCallback(async () => {
    const f = format.current
    const sek = Math.round(varaktighet.current)
    const blob = new Blob(bitar.current, { type: f?.typ })
    bitar.current = []
    if (!f || blob.size === 0) { setLage('av'); onFelRef.current('Inspelningen blev tom. Försök igen.'); return }
    if (sek < 1) { setLage('av'); onFelRef.current('För kort. Håll på i minst en sekund.'); return }
    setLage('skickar')
    try { await onKlippRef.current({ blob, sekunder: sek, format: f }) } finally { setLage('av') }
  }, [])

  const stoppa = useCallback((sedan: 'skicka' | 'kasta' | 'vanta') => {
    efterStopp.current = sedan
    varaktighet.current = Math.min((performance.now() - start.current) / 1000, ROST_MAX_SEKUNDER)
    const r = rec.current
    if (r && r.state !== 'inactive') {
      try { r.stop() } catch { /* redan stoppad */ }
    }
    stadaUpp()
  }, [stadaUpp])

  const starta = useCallback(async () => {
    if (lage !== 'av') return
    const f = rostFormat()
    if (!f) { onFelRef.current('Den här webbläsaren kan inte spela in ljud.'); return }
    setLage('startar')
    let s: MediaStream
    try {
      s = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } })
    } catch (e) {
      setLage('av')
      const namn = (e as { name?: string })?.name
      onFelRef.current(namn === 'NotAllowedError'
        ? 'Svalla får inte använda mikrofonen. Tillåt den i webbläsarens inställningar.'
        : 'Mikrofonen kunde inte startas.')
      return
    }
    strom.current = s
    format.current = f
    bitar.current = []
    let r: MediaRecorder
    try {
      r = new MediaRecorder(s, { mimeType: f.mime, audioBitsPerSecond: 64000 })
    } catch {
      stadaUpp(); setLage('av'); onFelRef.current('Inspelningen kunde inte starta.'); return
    }
    rec.current = r
    r.ondataavailable = e => { if (e.data && e.data.size > 0) bitar.current.push(e.data) }
    r.onstop = () => {
      rec.current = null
      if (efterStopp.current === 'skicka') void skickaKlipp()
      else if (efterStopp.current === 'kasta') { bitar.current = []; setLage('av') }
      else setLage('klar')
    }
    // Ljudnivån driver staplarna under inspelningen. Går det inte syns de bara stilla.
    try {
      const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (Ctx) {
        const ctx = new Ctx()
        const analys = ctx.createAnalyser()
        analys.fftSize = 512
        ctx.createMediaStreamSource(s).connect(analys)
        ljud.current = ctx
        ctx.resume?.().catch(() => {})
        const data = new Uint8Array(analys.fftSize)
        let senast = 0
        const steg = (t: number) => {
          ram.current = requestAnimationFrame(steg)
          if (t - senast < 90) return
          senast = t
          analys.getByteTimeDomainData(data)
          let summa = 0
          for (let i = 0; i < data.length; i++) { const v = ((data[i] ?? 128) - 128) / 128; summa += v * v }
          const niva = Math.min(1, Math.sqrt(summa / data.length) * 4)
          setNivaer(prev => [...prev.slice(1), niva])
        }
        ram.current = requestAnimationFrame(steg)
      }
    } catch { /* staplarna står still */ }
    r.start(250)
    start.current = performance.now()
    setSekunder(0)
    setNivaer(Array(STAPLAR).fill(0))
    setLage('spelar')
    timer.current = window.setInterval(() => {
      const sek = (performance.now() - start.current) / 1000
      setSekunder(Math.min(Math.floor(sek), ROST_MAX_SEKUNDER))
      // Vid två minuter stannar inspelningen. Klippet väntar på att skickas.
      if (sek >= ROST_MAX_SEKUNDER) stoppa('vanta')
    }, 200)
  }, [lage, skickaKlipp, stadaUpp, stoppa])

  const avbryt = useCallback(() => {
    if (lage === 'klar') { bitar.current = []; setLage('av'); return }
    if (lage === 'spelar' || lage === 'startar') stoppa('kasta')
  }, [lage, stoppa])

  const skicka = useCallback(() => {
    if (lage === 'spelar') stoppa('skicka')
    else if (lage === 'klar') void skickaKlipp()
  }, [lage, skickaKlipp, stoppa])

  return { kan, lage, sekunder, nivaer, starta: () => { void starta() }, avbryt, skicka }
}

/** 0:07, 1:42 */
export function rostTid(sek: number): string {
  const s = Math.max(0, Math.floor(sek))
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}
