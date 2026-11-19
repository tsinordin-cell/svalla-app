/**
 * FÖRHANDSVISNING 2026-11-19: EN källa för huvudmenyn.
 * Samma lista används av sidhuvudet på undersidorna (SidHuvud.tsx), av
 * startsidans meny och av mobilmenyn, så att etiketter och mål aldrig glider isär.
 *
 * Regler (navigationsreglerna 2026-11-18):
 * - Första länken i varje rullgardin är översikten ("Alla …").
 * - Etiketten säger vad som finns bakom. En sida som bara gäller Stockholm säger det.
 * - Det som kräver konto står under rubriken "Kräver gratis konto".
 */
export type MenyLank = { href: string; text: string }
export type MenyGrupp = { rubrik?: string; lankar: MenyLank[] }
export type MenyPunkt = { href: string; text: string; aktivFor: string[]; grupper: MenyGrupp[] }

export const MENY: MenyPunkt[] = [
  {
    href: '/regioner', text: 'Regioner',
    aktivFor: ['/regioner', '/resmal', '/stockholms-skargard', '/bohuslan', '/gotland', '/aland', '/oland', '/blekinge-skargard', '/vasterhav', '/hoga-kusten', '/halland', '/goteborg-skargard', '/malaren', '/karta', '/oar', '/o/', '/jamfor'],
    grupper: [
      { lankar: [{ href: '/regioner', text: 'Alla regioner' }] },
      { rubrik: 'Östersjön', lankar: [
        { href: '/stockholms-skargard', text: 'Stockholms skärgård' },
        { href: '/aland', text: 'Åland' },
        { href: '/gotland', text: 'Gotland' },
        { href: '/oland', text: 'Öland' },
        { href: '/blekinge-skargard', text: 'Blekinge skärgård' },
      ] },
      { rubrik: 'Västkusten', lankar: [
        { href: '/halland', text: 'Halland' },
        { href: '/goteborg-skargard', text: 'Göteborgs skärgård' },
        { href: '/bohuslan', text: 'Bohuslän' },
        { href: '/vasterhav', text: 'Västerhavet' },
      ] },
      { rubrik: 'Norrland och insjöar', lankar: [
        { href: '/hoga-kusten', text: 'Höga Kusten' },
        { href: '/malaren', text: 'Mälaren' },
      ] },
      { rubrik: 'Hitta', lankar: [
        { href: '/oar', text: 'Alla öar' },
        { href: '/jamfor', text: 'Jämför öar' },
        { href: '/karta', text: 'Karta över Stockholms skärgård' },
      ] },
    ],
  },
  {
    href: '/aktiviteter', text: 'Se & göra',
    aktivFor: ['/aktiviteter', '/aktivitet', '/bastu-och-bad', '/vandring-och-natur', '/segelkurs', '/vinter'],
    grupper: [
      { lankar: [{ href: '/aktiviteter', text: 'Alla aktiviteter' }] },
      { rubrik: 'Välj aktivitet', lankar: [
        { href: '/aktiviteter?typ=Bad', text: 'Bad' },
        { href: '/aktiviteter?typ=Bastu', text: 'Bastu' },
        { href: '/aktiviteter?typ=Vandring', text: 'Vandring' },
        { href: '/aktiviteter?typ=Kajak%20och%20paddling', text: 'Kajak och paddling' },
        { href: '/aktiviteter?typ=Segling', text: 'Segling' },
        { href: '/aktiviteter?typ=Fiske', text: 'Fiske' },
        { href: '/aktiviteter?typ=Cykling', text: 'Cykling' },
      ] },
      { rubrik: 'Mer', lankar: [
        { href: '/segelkurs', text: 'Kurser' },
        { href: '/vinter', text: 'Skärgården på vintern' },
      ] },
    ],
  },
  {
    href: '/krogar-och-mat', text: 'Mat & boende',
    aktivFor: ['/krogar-och-mat', '/boende', '/hamnar-och-bryggor'],
    grupper: [
      { lankar: [
        { href: '/krogar-och-mat', text: 'Restauranger, caféer och bryggserveringar' },
        { href: '/boende', text: 'Boende' },
        { href: '/hamnar-och-bryggor', text: 'Gästhamnar och naturhamnar' },
      ] },
    ],
  },
  {
    href: '/utflykt', text: 'Planera',
    aktivFor: ['/utflykt', '/resetips', '/planera', '/dag', '/farjor', '/guide'],
    grupper: [
      { lankar: [
        { href: '/utflykt', text: 'Dagsutflykt' },
        { href: '/resetips', text: 'Dagsplaner och resetips' },
        { href: '/farjor', text: 'Färjetider i Stockholms skärgård' },
      ] },
      { rubrik: 'Kräver gratis konto', lankar: [
        { href: '/guide', text: 'Fråga Thorkel, vår AI-guide' },
        { href: '/planera', text: 'Planera en båtrutt' },
      ] },
    ],
  },
  {
    href: '/guider', text: 'Guider',
    aktivFor: ['/guider', '/blogg', '/tips'],
    grupper: [
      { lankar: [{ href: '/guider', text: 'Alla guider' }] },
      { rubrik: 'Utvalda guider', lankar: [
        { href: '/guider/midsommar-skargarden', text: 'Midsommar i skärgården' },
        { href: '/guider/packlista-skargarden', text: 'Packlista för skärgården' },
        { href: '/guider/allemansratten-pa-sjon', text: 'Allemansrätten på sjön' },
      ] },
    ],
  },
  {
    href: '/forum', text: 'Forum',
    aktivFor: ['/forum'],
    grupper: [
      { lankar: [{ href: '/forum', text: 'Alla diskussioner' }] },
      { rubrik: 'Kategorier', lankar: [
        { href: '/forum/segling', text: 'Segling' },
        { href: '/forum/motorbat', text: 'Motorbåt' },
        { href: '/forum/nyborjare', text: 'Nybörjare' },
        { href: '/forum/hamnar-bryggor', text: 'Hamnar och bryggor' },
        { href: '/forum/loppis', text: 'Loppis' },
      ] },
    ],
  },
]

export const MITT_SVALLA: MenyGrupp[] = [
  { rubrik: 'Kräver gratis konto', lankar: [
    { href: '/feed', text: 'Flöde' },
    { href: '/sparade', text: 'Sparade öar' },
    { href: '/logga', text: 'Logga en tur' },
    { href: '/profil', text: 'Profil och mina turer' },
  ] },
  { rubrik: 'Konto', lankar: [
    { href: '/logga-in', text: 'Logga in' },
    { href: '/kom-igang', text: 'Skapa gratis konto' },
  ] },
]

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')

/** Översikten ("Alla …") är en egen rad överst bara när första gruppen är en enda länk utan rubrik. */
export const harOversikt = (m: MenyPunkt) => !m.grupper[0]?.rubrik && m.grupper[0]?.lankar.length === 1
/** Antal kolumner i rullgardinen: en per rubrikgrupp, högst fyra. */
export const antalKolumner = (m: MenyPunkt) => Math.min(4, m.grupper.filter(g => g.rubrik).length)

/**
 * Startsidans mörka rullgardiner, med en kolumn per rubrik när de är flera
 * (samma utseende i SidHuvud.tsx). Stilen följer med menyn så att
 * startsidan inte behöver egna regler.
 */
const STIL_STARTSIDA = `<li class="sv-meny-stil" aria-hidden="true" style="display:none"><style>
.lp-nav .nav-dd-panel:has(.flera){left:0;transform:translateY(-4px)}
.lp-nav .nav-dropdown:hover .nav-dd-panel:has(.flera),.lp-nav .nav-dropdown:focus-within .nav-dd-panel:has(.flera){transform:translateY(0)}
.lp-nav .nav-dd-inner.flera{display:grid;grid-template-columns:repeat(var(--kol,3),max-content);column-gap:6px;max-height:none;overflow:visible}
.lp-nav .nav-dd-inner .sv-oversikt{grid-column:1/-1;border-bottom:1px solid rgba(255,255,255,.08);padding-bottom:4px;margin-bottom:2px}
.lp-nav .nav-dd-inner .sv-oversikt .nav-dd-link{font-weight:700;color:#fff}
.lp-nav .nav-dd-inner .nav-dd-section{white-space:nowrap}
.lp-nav .nav-dd-inner:not(.flera)>div+div{border-top:1px solid rgba(255,255,255,.08);margin-top:6px}
</style></li>
`

/** Startsidans meny är en HTML-sträng; den byggs ur samma lista. */
export function menyHtmlDator(): string {
  return STIL_STARTSIDA + MENY.map(m => {
    const kol = antalKolumner(m)
    const ov = harOversikt(m)
    return ` <li class="nav-dropdown">\n <a href="${m.href}">${esc(m.text)}</a>\n <div class="nav-dd-panel"><div class="nav-dd-inner${kol > 1 ? ' flera' : ''}"${kol > 1 ? ` style="--kol:${kol}"` : ''}>\n` +
      m.grupper.map((g, i) => ` <div${i === 0 && ov ? ' class="sv-oversikt"' : ''}>\n` + (g.rubrik ? ` <div class="nav-dd-section">${esc(g.rubrik)}</div>\n` : '') +
        g.lankar.map(l => ` <a href="${l.href}" class="nav-dd-link">${esc(l.text)}</a>\n`).join('') + ' </div>\n').join('') +
      ' </div></div>\n </li>\n'
  }).join('')
}

export function mittSvallaHtmlDator(): string {
  return MITT_SVALLA.map((g, i) => (i ? ' <div class="nav-dd-divider"></div>\n' : '') + (g.rubrik ? ` <div class="nav-dd-section">${esc(g.rubrik)}</div>\n` : '') +
    g.lankar.map(l => ` <a href="${l.href}" class="nav-dd-link">${esc(l.text)}</a>\n`).join('')).join('')
}

/** Mobilmenyns dragspel på startsidan. */
export function menyHtmlMobil(): string {
  const acc = (titel: string, grupper: MenyGrupp[]) => ` <div class="mob-acc">\n <button class="mob-acc-head">${esc(titel)}<span class="mob-acc-chev">›</span></button>\n <div class="mob-acc-body">\n` +
    grupper.map(g => (g.rubrik ? ` <div class="mob-acc-section">${esc(g.rubrik)}</div>\n` : '') + g.lankar.map(l => ` <a href="${l.href}" class="mob-acc-link">${esc(l.text)}</a>\n`).join('')).join('') +
    ' </div>\n </div>\n'
  return MENY.map(m => acc(m.text, m.grupper)).join('') + acc('Mitt Svalla', MITT_SVALLA)
}
