/**
 * FÖRHANDSVISNING 2026-11-19: EN källa för huvudmenyn.
 * Samma lista används av sidhuvudet på undersidorna (SidHuvud.tsx), av
 * startsidans meny och av mobilmenyn, så att etiketter och mål aldrig glider isär.
 *
 * Utseendet är svalla.se:s befintliga rullgardin: mörk panel, en kolumn,
 * orange rubriker i versaler och en tunn linje mellan grupperna.
 *
 * Regler:
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
      { rubrik: 'Regioner', lankar: [
        { href: '/stockholms-skargard', text: 'Stockholms skärgård' },
        { href: '/bohuslan', text: 'Bohuslän' },
        { href: '/gotland', text: 'Gotland' },
        { href: '/aland', text: 'Åland' },
        { href: '/oland', text: 'Öland' },
        { href: '/blekinge-skargard', text: 'Blekinge skärgård' },
        { href: '/vasterhav', text: 'Västerhavet' },
        { href: '/hoga-kusten', text: 'Höga Kusten' },
        { href: '/halland', text: 'Halland' },
        { href: '/goteborg-skargard', text: 'Göteborgs skärgård' },
        { href: '/malaren', text: 'Mälaren' },
      ] },
      { rubrik: 'Hitta', lankar: [
        { href: '/regioner', text: 'Alla regioner' },
        { href: '/oar', text: 'Alla öar' },
        { href: '/jamfor', text: 'Jämför öar' },
        { href: '/oar/barnvanliga', text: 'Barnvänliga öar' },
        { href: '/karta', text: 'Karta över Stockholms skärgård' },
      ] },
    ],
  },
  {
    href: '/aktiviteter', text: 'Se & göra',
    aktivFor: ['/aktiviteter', '/aktivitet', '/bastu-och-bad', '/vandring-och-natur', '/segelkurs', '/vinter', '/sommar', '/host', '/upplevelser'],
    grupper: [
      { rubrik: 'Aktiviteter', lankar: [
        { href: '/aktiviteter', text: 'Alla aktiviteter' },
        { href: '/aktiviteter?typ=Bad', text: 'Bad' },
        { href: '/aktiviteter?typ=Bastu', text: 'Bastu' },
        { href: '/aktiviteter?typ=Vandring', text: 'Vandring' },
        { href: '/aktiviteter?typ=Kajak%20och%20paddling', text: 'Kajak och paddling' },
        { href: '/aktiviteter?typ=Segling', text: 'Segling' },
        { href: '/aktiviteter?typ=Fiske', text: 'Fiske' },
        { href: '/aktiviteter?typ=Cykling', text: 'Cykling' },
      ] },
      { rubrik: 'Kurser och turer', lankar: [
        { href: '/segelkurs', text: 'Segelkurser' },
        { href: '/upplevelser?kategori=guidade', text: 'Guidade turer' },
      ] },
      { rubrik: 'Säsong', lankar: [
        { href: '/sommar', text: 'Skärgården på sommaren' },
        { href: '/host', text: 'Skärgården på hösten' },
        { href: '/vinter', text: 'Skärgården på vintern' },
      ] },
    ],
  },
  {
    href: '/krogar-och-mat', text: 'Mat & boende',
    aktivFor: ['/krogar-och-mat', '/boende', '/hamnar-och-bryggor'],
    grupper: [
      { rubrik: 'Mat och dryck', lankar: [{ href: '/krogar-och-mat', text: 'Krogar, caféer och bryggserveringar' }] },
      { rubrik: 'Sova', lankar: [{ href: '/boende', text: 'Boende' }] },
      { rubrik: 'Hamnar', lankar: [{ href: '/hamnar-och-bryggor', text: 'Gästhamnar och naturhamnar' }] },
    ],
  },
  {
    href: '/utflykt', text: 'Planera',
    aktivFor: ['/utflykt', '/resetips', '/planera', '/dag', '/farjor', '/guide'],
    grupper: [
      { rubrik: 'Utan konto', lankar: [
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
        { href: '/forum/hamnar-bryggor', text: 'Hamnar och bryggor' },
        { href: '/forum/vader-sakerhet', text: 'Väder och säkerhet' },
        { href: '/forum/fiske', text: 'Fiske' },
        { href: '/forum/teknik-underhall', text: 'Teknik och underhåll' },
        { href: '/forum/nyborjare', text: 'Nybörjare' },
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

/** Grupperna i en rullgardin, i startsidans befintliga markering. */
function grupperHtml(grupper: MenyGrupp[]): string {
  return grupper.map((g, i) => (i ? ' <div class="nav-dd-divider"></div>\n' : '') +
    (g.rubrik ? ` <div class="nav-dd-section">${esc(g.rubrik)}</div>\n` : '') +
    g.lankar.map(l => ` <a href="${l.href}" class="nav-dd-link">${esc(l.text)}</a>\n`).join('')).join('')
}

/** Startsidans meny är en HTML-sträng; den byggs ur samma lista. */
export function menyHtmlDator(): string {
  return MENY.map(m => ` <li class="nav-dropdown">\n <a href="${m.href}">${esc(m.text)}</a>\n <div class="nav-dd-panel"><div class="nav-dd-inner">\n` +
    grupperHtml(m.grupper) + ' </div></div>\n </li>\n').join('')
}

export function mittSvallaHtmlDator(): string {
  return grupperHtml(MITT_SVALLA)
}

/** Mobilmenyns dragspel på startsidan. */
export function menyHtmlMobil(): string {
  const acc = (titel: string, grupper: MenyGrupp[]) => ` <div class="mob-acc">\n <button class="mob-acc-head">${esc(titel)}<span class="mob-acc-chev">›</span></button>\n <div class="mob-acc-body">\n` +
    grupper.map(g => (g.rubrik ? ` <div class="mob-acc-section">${esc(g.rubrik)}</div>\n` : '') + g.lankar.map(l => ` <a href="${l.href}" class="mob-acc-link">${esc(l.text)}</a>\n`).join('')).join('') +
    ' </div>\n </div>\n'
  return MENY.map(m => acc(m.text, m.grupper)).join('') + acc('Mitt Svalla', MITT_SVALLA)
}
