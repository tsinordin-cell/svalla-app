/**
 * Färdiga sociala-medier-inlägg för Tom att kopiera & posta.
 * Skrivna i tre tonlägen: rakt (Reddit), berättande (FB-grupper), kort (IG).
 * Inga superlativ, inga fake-claims — håller sig till sanning.
 */

export type Channel = 'reddit' | 'facebook' | 'instagram'

export type ContentPost = {
  id: string
  channel: Channel
  audience: string                  // var inlägget passar bäst
  hook: string                      // rubrik / första rad
  body: string                      // hela texten
  link?: string                     // CTA-länk
  notes?: string                    // intern note till Tom (tonläge, timing)
}

const BASE = 'https://svalla.se'

export const CONTENT_POSTS: ContentPost[] = [
  // ─── REDDIT ────────────────────────────────────────────────
  {
    id: 'reddit-1',
    channel: 'reddit',
    audience: 'r/sweden',
    hook: 'Byggt en gratis guide till Stockholms skärgård — 84 öar, restauranger, hamnar och färjetider på en sida',
    body: `Hej r/sweden,

Byggt en sida för folk som vill till skärgården men inte vet vart. Allt är gratis och ingen registrering krävs.

Vad finns:
- 84 öar (Stockholm + Bohuslän) med restauranger, hamnar och boende per ö
- Karta över krogar, bryggor och bensin
- Färjetider direkt från Waxholmsbolaget
- Utflyktsplanerare där du väljer startpunkt och får packlista + restid
- Skärgårdsbingo (25 utmaningar) om man vill ha en sommarutmaning

Inga ads, ingen tracking utöver det Vercel/Supabase ger. Ingen e-post krävs. Bygger det här själv för att jag tycker den info som finns idag är spridd över för många sidor.

Skriv vad ni saknar — jag lägger till.

${BASE}`,
    link: BASE,
    notes: 'Posta måndag eller torsdag förmiddag. Inga emojis i Reddit-text. Var beredd att svara på kommentarer i 24 h.',
  },
  {
    id: 'reddit-2',
    channel: 'reddit',
    audience: 'r/sverige',
    hook: 'Vart är det värt att åka i sommar — har samlat 84 öar med restauranger och färjetider på ett ställe',
    body: `Tjena!

Har en sida som samlar all info om Stockholms och Bohusläns skärgård. Tanken är att man inte ska behöva googla 5 olika sidor för att planera en dagsutflykt.

Vad funkar:
- Sök ö, restaurang eller aktivitet
- Färjetider för Waxholmsbolaget i realtid
- Karta över krogar och hamnar längs hela kusten
- Utflyktsplanerare: välj startpunkt → få restid, packlista, krogtips

Är gratis, ingen reg krävs.

${BASE}/utflykt om man vill testa direkt.`,
    link: `${BASE}/utflykt`,
    notes: 'Inriktad på "vart ska jag åka". Bra på fredagar inför helg.',
  },
  {
    id: 'reddit-3',
    channel: 'reddit',
    audience: 'r/sailing',
    hook: 'Free Sweden archipelago app — guest harbors, fuel stops, weather and route planning for Stockholm + Bohuslän',
    body: `Hi r/sailing,

I built a Swedish archipelago app focused on what cruisers actually need: guest harbors, fuel, restaurants, ferry schedules and shelter info. 84 islands across Stockholm archipelago and Bohuslän.

What works:
- Guest harbor list per island with services (fuel, water, electricity)
- Map view with all marinas, restaurants and fuel stations
- Live Waxholmsbolaget ferry departures
- Route planning with weather overlay
- Trip logging if you want to share with crew or other sailors

Free, no signup required. Swedish UI but you can navigate visually.

${BASE}/upptack — interactive map`,
    link: `${BASE}/upptack`,
    notes: 'Engelsk text. Posta till r/sailing eller r/boating internationellt. Måndag/onsdag är bäst.',
  },

  // ─── FACEBOOK ──────────────────────────────────────────────
  {
    id: 'fb-1',
    channel: 'facebook',
    audience: 'Stockholms skärgård (FB-grupp)',
    hook: 'Byggt en gratis guide till skärgården',
    body: `Hej alla!

Har lagt ner det senaste året på att bygga en sida som samlar all info man behöver för en skärgårdsutflykt — restauranger, hamnar, färjetider och cykelvägar — på ett ställe.

Tanken kommer från att jag själv tröttnade på att leta runt på 5–6 olika sidor varje gång jag skulle planera en dagstur.

På sidan finns:
- 84 öar med egna guider (restauranger, hamnar, boende, transporttider)
- Interaktiv karta över alla krogar och bryggor
- Waxholmsbolagets färjetider
- En utflyktsplanerare som ger packlista + tips utifrån start och destination

Helt gratis, ingen reg krävs. Driver inget kommersiellt — bara byggt för att jag själv saknar det.

Säg gärna till om något saknas eller är fel — jag uppdaterar löpande.

${BASE}`,
    link: BASE,
    notes: 'För större skärgårdsgrupper. Lägg gärna till ett foto från en favoritö när du postar.',
  },
  {
    id: 'fb-2',
    channel: 'facebook',
    audience: 'Båtägargrupper',
    hook: 'Karta över alla gästhamnar med bränsle och service',
    body: `Hej båtfolk,

Har samlat alla gästhamnar i Stockholms och Bohusläns skärgård på en karta — med info om bränsle, el, vatten, tvätt och antal platser per hamn.

${BASE}/upptack

Lätt att se vilka hamnar som tar emot långa båtar, var det finns dieseln, och vilka som har dusch. Kan filtreras per kategori (krog, hamn, bensin, bastu).

Är på mobilen ute på sjön är det enklare än att bläddra i en pärm. Det är gratis och ingen reg krävs.

Säg till om jag missar någon hamn eller om ni vet om service ändrats — uppdaterar manuellt.`,
    link: `${BASE}/upptack`,
    notes: 'För båtgrupper, främst. Vissa grupper kräver att man frågar admin innan reklam — gör en privatchat först.',
  },
  {
    id: 'fb-3',
    channel: 'facebook',
    audience: 'Stuga & Sommarboende',
    hook: 'Skärgårdsbingo — 25 utmaningar att bocka av i sommar',
    body: `Inför sommaren — har lagt upp en skärgårdsbingo med 25 utmaningar. Mix av öar, klassiker och svårare grejer.

Några exempel:
- Cykla runt Utö
- Bada från en klippa
- Övernatta på en obebodd ö
- Spotta en säl
- Boka middag på en skärgårdskrog

Bocka av allt eftersom du gör dem. Sparas på din enhet, ingen reg krävs.

${BASE}/bingo

Hur många kan ni klara?`,
    link: `${BASE}/bingo`,
    notes: 'Funkar bäst tidig sommar (maj/juni) när folk planerar.',
  },

  // ─── INSTAGRAM ─────────────────────────────────────────────
  {
    id: 'ig-1',
    channel: 'instagram',
    audience: 'Egen IG eller skärgårds-konton',
    hook: 'En karta över alla krogar i skärgården',
    body: `Skärgårdens alla krogar och gästhamnar på en karta.

Filtrera per kategori, se öppettider och bokningslänkar.

Gratis, ingen reg.

Länk i bio → Svalla.se`,
    link: BASE,
    notes: 'Korta texter funkar bäst på IG. Lägg till foto från en favoritplats. Hashtags: #stockholmsskärgård #skärgården #båtliv #skargard #vaxholm #sandhamn',
  },
  {
    id: 'ig-2',
    channel: 'instagram',
    audience: 'Story',
    hook: 'Vart vill du åka?',
    body: `Snabb story:

📍 Sandhamn
📍 Grinda
📍 Utö
📍 Vaxholm
📍 Möja

(Polls eller "Tap to vote") — sedan länk till Svalla.se/o/[slug]

CTA: Svalla.se — guide + restauranger + färjetider`,
    notes: 'För Story. Använd polls eller swipe-up. Stayar 24h.',
  },
  {
    id: 'ig-3',
    channel: 'instagram',
    audience: 'Reels',
    hook: 'Skärgårdsbingo — 25 utmaningar',
    body: `Reels-text (3–5 sek per slide):

1. "Inför sommaren — skärgårdsbingo"
2. "25 utmaningar"
3. "Cykla runt Utö ✓"
4. "Bada från en klippa ✓"
5. "Övernatta på obebodd ö"
6. "Hur många klarar du?"

CTA: Länk i bio → Svalla.se/bingo`,
    link: `${BASE}/bingo`,
    notes: 'Reels med klipp från olika öar. Länk i bio kan inte vara klickbar i caption.',
  },
]

export function postsByChannel(channel: Channel): ContentPost[] {
  return CONTENT_POSTS.filter(p => p.channel === channel)
}
