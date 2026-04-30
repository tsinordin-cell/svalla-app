'use client'
import { useState } from 'react'
import { toast } from '@/components/Toast'

interface Props {
 url: string
 title: string
 /** 'icon' = liten rund ikon (standard), 'pill' = knapp med text */
 variant?: 'icon' | 'pill'
}

export default function ShareButton({ url, title, variant = 'icon' }: Props) {
 const [copied, setCopied] = useState(false)

 async function handleShare() {
 if (typeof navigator !== 'undefined' && navigator.share) {
 try {
 await navigator.share({
 title: `${title} – Svalla`,
 text: `Kolla min tur på Svalla! `,
 url,
 })
 return
 } catch {
 return
 }
 }
 try {
 await navigator.clipboard.writeText(url)
 setCopied(true)
 toast('Länk kopierad! 📋')
 setTimeout(() => setCopied(false), 2500)
 } catch {
 toast('Kunde inte kopiera länken.', 'error')
 }
 }

 const shareIcon = copied ? (
 <svg viewBox="0 0 24 24" fill="none" stroke={variant === 'pill' ? '#fff' : '#0f9e64'} strokeWidth={2.5} style={{ width: 15, height: 15, flexShrink: 0 }}>
 <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
 </svg>
 ) : (
 <svg viewBox="0 0 24 24" fill="none" stroke={variant === 'pill' ? 'rgba(255,255,255,0.85)' : 'var(--sea)'} strokeWidth={2} style={{ width: 15, height: 15, flexShrink: 0 }}>
 <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
 </svg>
 )

 if (variant === 'pill') {
 return (
 <button
 onClick={handleShare}
 className="press-feedback"
 style={{
 display: 'flex', alignItems: 'center', gap: 6,
 padding: '7px 14px', borderRadius: 20, border: 'none', cursor: 'pointer',
 background: copied
 ? 'rgba(15,158,100,0.85)'
 : 'var(--grad-sea)',
 color: '#fff', fontSize: 12, fontWeight: 700,
 transition: 'all 0.2s',
 WebkitTapHighlightColor: 'transparent',
 flexShrink: 0,
 }}
 aria-label={copied ? 'Kopierat!' : 'Dela tur'}
 >
 {shareIcon}
 <span>{copied ? 'Kopierat!' : 'Dela'}</span>
 </button>
 )
 }

 return (
 <button
 onClick={handleShare}
 className="press-feedback"
 style={{
 width: 32, height: 32, borderRadius: '50%',
 background: copied ? 'rgba(15,158,100,0.12)' : 'rgba(10,123,140,0.08)',
 border: 'none', cursor: 'pointer',
 display: 'flex', alignItems: 'center', justifyContent: 'center',
 flexShrink: 0, transition: 'all 0.2s',
 WebkitTapHighlightColor: 'transparent',
 }}
 aria-label={copied ? 'Kopierat!' : 'Dela tur'}
 >
 {shareIcon}
 </button>
 )
}
