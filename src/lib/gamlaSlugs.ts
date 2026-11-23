/**
 * Gamla ö-sluggar (2026-11-22). Egen liten fil så att klientkomponenter
 * (Spara ön, Jag har varit här, notisklockan) kan läsa den utan att dra in
 * hela island-data.ts. island-data.ts exporterar samma sak vidare.
 */
/** Gamla adresser som pekar på en sammanslagen post. Sparade och besökta öar i databasen kan bära den gamla sluggen. */
export const GAMLA_SLUGS: Record<string, string> = {
  bjorko: 'birka', // 2026-10-21: Björkö (Birka) och Birka var samma ö
  // 2026-11-22 (beslut 4): sluggar som inte följde namnet, bytta till rätt stavning
  adelsjo: 'adelso',
  smaadalaro: 'smadalaro',
  ormsko: 'ormskar',
  graskar: 'grasko',
  visingo: 'visingso',
}

/**
 * Alla sluggar som en ö kan ha i databasen: den nuvarande och de gamla som
 * pekar på den. Används där sparade, besökta och passerade öar slås upp per ö,
 * så att en rad sparad under gammal slug fortfarande räknas (ingen datamigrering).
 */
export function slugVarianter(slug: string): string[] {
  const nu = GAMLA_SLUGS[slug] ?? slug
  return [nu, ...Object.keys(GAMLA_SLUGS).filter(g => GAMLA_SLUGS[g] === nu)]
}
