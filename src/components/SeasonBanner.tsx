'use client'

/**
 * SeasonBanner — visar olika meddelanden beroende på datum.
 * - mars: säsongsstart-countdown
 * - april: "om X dagar"
 * - maj: "säsongen har öppnat"
 * - juni–aug: aktiv säsong (inget eller subtilt)
 * - sept: "säsongen avslutas"
 * - oktober–februari: vinterläge
 */

interface Props {
 variant?: 'hero' | 'subtle'
}

function getMessage(): { text: string; emoji: string; color: string } | null {
 const now = new Date()
 const month = now.getMonth() // 0 = jan
 const day = now.getDate()

 // Säsongsstart 1 maj (ungefär)
 const seasonStart = new Date(now.getFullYear(), 4, 1) // 1 maj
 const seasonEnd = new Date(now.getFullYear(), 8, 30) // 30 sept

 // Om vi är i mars eller april — visa nedräkning
 if (month >= 2 && month <= 3) {
 const days = Math.ceil((seasonStart.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
 if (days > 0) {
 return {
 text: days === 1 ? 'Skärgårdssäsongen öppnar imorgon' : `Skärgårdssäsongen öppnar om ${days} dagar`,
 emoji: '🌸',
 color: '#c96e2a',
 }
 }
 }

 // Maj — säsongsstart
 if (month === 4 && day <= 15) {
 return {
 text: 'Säsongen är igång — alla färjor och krogar öppnar nu',
 emoji: '',
 color: '#1e5c82',
 }
 }

 // September — slutspurt
 if (month === 8) {
 return {
 text: 'Sista säsongsmånaden — många öar stänger snart',
 emoji: '🍂',
 color: '#a8381e',
 }
 }

 // Oktober — säsong slut
 if (month === 9 && day <= 15) {
 return {
 text: `Säsongen är slut — vi ses igen ${seasonStart.toLocaleDateString('sv-SE', { month: 'long' })} ${seasonStart.getFullYear() + 1}`,
 emoji: '',
 color: '#1e5c82',
 }
 }

 return null
}

export default function SeasonBanner({ variant = 'hero' }: Props) {
 const msg = getMessage()
 if (!msg) return null

 if (variant === 'subtle') {
 return (
 <div style={{
 display: 'inline-flex', alignItems: 'center', gap: 6,
 padding: '4px 12px', borderRadius: 999,
 background: `${msg.color}1a`, color: msg.color,
 fontSize: 12, fontWeight: 700,
 }}>
 <span>{msg.emoji}</span>{msg.text}
 </div>
 )
 }

 return (
 <div style={{
 background: `linear-gradient(90deg, ${msg.color}1a 0%, ${msg.color}0a 100%)`,
 borderTop: `1px solid ${msg.color}33`,
 borderBottom: `1px solid ${msg.color}33`,
 padding: '14px 24px',
 textAlign: 'center',
 fontSize: 14, fontWeight: 600,
 color: msg.color,
 }}>
 <span style={{ marginRight: 8, fontSize: 16 }}>{msg.emoji}</span>
 {msg.text}
 </div>
 )
}
