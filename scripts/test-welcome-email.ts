/**
 * test-welcome-email.ts
 *
 * Skickar ett välkomstmail till en angiven adress för att verifiera att:
 *   - RESEND_API_KEY är giltig
 *   - EMAIL_FROM-domänen är verifierad i Resend
 *   - Template-rendering fungerar (subject, body, substitutions)
 *
 * Används vid initial setup eller efter ändringar i mall/wrapper.
 *
 * Användning:
 *   node --env-file=.env.local --import tsx scripts/test-welcome-email.ts you@example.com
 *   node --env-file=.env.local --import tsx scripts/test-welcome-email.ts you@example.com "Tom"
 *
 * Den andra parametern är förnamn (default: "Tester").
 *
 * Krav:
 *   RESEND_API_KEY        — från resend.com/api-keys
 *   EMAIL_FROM            — t.ex. "Svalla <hello@svalla.se>"  (default fallback finns)
 */

import { sendEmail } from '../src/lib/email'

const to = process.argv[2]
const firstName = process.argv[3] ?? 'Tester'

if (!to || !to.includes('@')) {
  console.error('Användning: node --env-file=.env.local --import tsx scripts/test-welcome-email.ts <email> [firstName]')
  console.error('Exempel:    node --env-file=.env.local --import tsx scripts/test-welcome-email.ts tom@example.com Tom')
  process.exit(1)
}

if (!process.env.RESEND_API_KEY) {
  console.error('FEL: RESEND_API_KEY saknas i miljön.')
  console.error('  1. Skapa konto: https://resend.com')
  console.error('  2. Generera API-nyckel: https://resend.com/api-keys')
  console.error('  3. Lägg till i .env.local: RESEND_API_KEY=re_...')
  process.exit(1)
}

console.log('=== Test welcome-email ===')
console.log(`To:        ${to}`)
console.log(`firstName: ${firstName}`)
console.log(`From:      ${process.env.EMAIL_FROM || '(default) Svalla <hello@svalla.se>'}`)
console.log('')
console.log('Skickar…')

;(async () => {
  const result = await sendEmail({
    template: 'welcome',
    to,
    vars: { first_name: firstName },
  })

  if (result.ok) {
    console.log(`✓ Skickat. Resend ID: ${result.id}`)
    console.log(`  Spåra leverans: https://resend.com/emails/${result.id}`)
    console.log('')
    console.log('Nästa steg:')
    console.log('  1. Öppna inbox och verifiera att mailet ser bra ut')
    console.log('  2. Kontrollera spam-mapp om mailet inte syns inom 30 sek')
    console.log('  3. Om i spam: verifiera DKIM/SPF i Resend dashboard för EMAIL_FROM-domänen')
    process.exit(0)
  } else {
    console.error(`✗ Misslyckades: ${result.error}`)
    console.error('')
    console.error('Vanliga orsaker:')
    console.error('  - "API key is invalid"   → fel RESEND_API_KEY i .env.local')
    console.error('  - "Domain not verified"  → svalla.se inte DNS-verifierad i Resend')
    console.error('  - "From address invalid" → EMAIL_FROM matchar inte verifierad domän')
    process.exit(1)
  }
})().catch(err => {
  console.error('Oväntat fel:', err)
  process.exit(1)
})
