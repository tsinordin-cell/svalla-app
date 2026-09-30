/**
 * Sökordsnormalisering för snabbfiltret på /oar. Ligger i en egen modul utan
 * 'use client' så att både serverkomponenten (som bygger data-sok per kort)
 * och klientkomponenten (som filtrerar) kan använda samma funktion.
 */

/** Gemener utan åäö/é (så att "Moja" hittar Möja och "Vaxholm" hittar Vaxholm). */
export function normalisera(s: string): string {
  return s
    .toLowerCase()
    .replace(/ö/g, 'o').replace(/ä/g, 'a').replace(/å/g, 'a')
    .replace(/é/g, 'e')
    .trim()
}

export function sokNyckel(...delar: string[]): string {
  return normalisera(delar.join(' '))
}
