import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Vanliga frågor – Svalla',
  description: 'Svar på de vanligaste frågorna om Svalla – appen för Stockholms skärgård. Hitta krogar, planera turer och logga dina äventyr.',
  keywords: ['svalla faq', 'stockholms skärgård app', 'skärgårdskarta', 'hitta krogar skärgård', 'logga båttur'],
  openGraph: {
    title: 'Vanliga frågor – Svalla',
    description: 'Allt du behöver veta om Svalla och Stockholms skärgård.',
    url: 'https://svalla.se/faq',
  },
}

const FAQS = [
  {
    q: 'Vad är Svalla?',
    a: 'Svalla är en webb-app för Stockholms skärgård. Här hittar du restauranger, caféer, gästhamnar, bränsleställen och sevärdigheter på öarna – oavsett om du tar dig dit med kajak, segelbåt, motorbåt eller färja. Du kan också logga dina turer och spara favoriter.',
  },
  {
    q: 'Kostar det något att använda Svalla?',
    a: 'Grundfunktionerna – kartan, platssökningen och ruttguiden – är helt gratis. Skapa ett konto för att logga turer, spara platser och följa andra användare.',
  },
  {
    q: 'Behöver jag ladda ner en app?',
    a: 'Nej. Svalla är en progressiv webbapp (PWA). Öppna svalla.se i din mobilwebbläsare och tryck "Lägg till på hemskärmen" – sedan fungerar den precis som en vanlig app, även offline.',
  },
  {
    q: 'Hur lägger jag till Svalla på hemskärmen?',
    a: 'iOS (Safari): tryck på dela-ikonen och välj "Lägg till på hemskärmen". Android (Chrome): tryck på ⋮-menyn och välj "Installera app" eller "Lägg till på startskärmen".',
  },
  {
    q: 'Vilka platser finns på kartan?',
    a: 'Vi täcker hela Stockholms skärgård – från Fjäderholmarna och Vaxholm i innerskärgården till Sandhamn, Möja, Utö och Landsort ute i ytterskärgården. Det finns restauranger, caféer, barer, bränslestation, vandrarhem och gästhamnar inlagda.',
  },
  {
    q: 'Hur stämmer öppettiderna?',
    a: 'Vi uppdaterar data inför varje säsong, men öppettider i skärgården kan ändras med kort varsel. Dubbelkolla alltid med platsen direkt under högsäsong.',
  },
  {
    q: 'Kan jag föreslå en plats som saknas?',
    a: 'Ja! Skicka ett mejl till hej@svalla.se med namn, ö och en kort beskrivning, så lägger vi in platsen.',
  },
  {
    q: 'Hur fungerar ruttguiden?',
    a: 'Under "Rutter" hittar du kuraterade rutter som passar olika båttyper och reslängder – från halvdagstur till flerdagarssegling. Varje rutt har rekommenderade stopp, insidertips och en interaktiv karta.',
  },
  {
    q: 'Kan jag logga mina egna turer?',
    a: 'Ja. Logga in, gå till "Logga tur" och registrera din tur med start, destination, båttyp och en kort text. Loggarna sparas i din profil och kan delas i community-feeden.',
  },
  {
    q: 'Fungerar GPS-funktionen även till sjöss?',
    a: 'Ja. GPS-läget visar din position på kartan och markerar platser inom 2 nautiska mil. Det fungerar i mobilwebbläsaren förutsatt att du gett Svalla åtkomst till din plats.',
  },
  {
    q: 'Hur raderar jag mitt konto?',
    a: 'Skicka en förfrågan till hej@svalla.se, så raderar vi ditt konto och all tillhörande data inom 5 arbetsdagar.',
  },
]

export default function FaqPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#f7fbfc', paddingBottom: 80 }}>
      <div style={{
        background: 'linear-gradient(160deg, #1e5c82 0%, #2d7d8a 100%)',
        padding: '60px 20px 32px',
      }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, textDecoration: 'none' }}>← Svalla</Link>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: '#fff', margin: '12px 0 6px' }}>Vanliga frågor</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, margin: 0 }}>Allt du behöver veta om Svalla och skärgården</p>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {FAQS.map((item, i) => (
            <details key={i} style={{
              background: '#fff',
              borderRadius: 14,
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              overflow: 'hidden',
            }}>
              <summary style={{
                padding: '18px 22px',
                fontWeight: 700,
                fontSize: 15,
                color: '#162d3a',
                cursor: 'pointer',
                listStyle: 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                userSelect: 'none',
              }}>
                {item.q}
                <span style={{ fontSize: 20, color: '#1e5c82', flexShrink: 0, marginLeft: 12 }}>+</span>
              </summary>
              <div style={{
                padding: '0 22px 18px',
                fontSize: 14,
                color: '#4a6a7a',
                lineHeight: 1.7,
                borderTop: '1px solid rgba(0,0,0,0.05)',
              }}>
                <p style={{ margin: '14px 0 0' }}>{item.a}</p>
              </div>
            </details>
          ))}
        </div>

        <div style={{
          marginTop: 40,
          background: '#1e5c82',
          borderRadius: 16,
          padding: '28px 28px',
          color: '#fff',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Hittade du inte svaret?</div>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', margin: '0 0 16px' }}>Vi svarar på mejl inom ett dygn.</p>
          <a href="mailto:hej@svalla.se" style={{
            display: 'inline-block',
            padding: '10px 24px',
            background: '#fff',
            color: '#1e5c82',
            borderRadius: 20,
            fontWeight: 700,
            fontSize: 14,
            textDecoration: 'none',
          }}>Kontakta oss</a>
        </div>
      </div>
    </div>
  )
}
