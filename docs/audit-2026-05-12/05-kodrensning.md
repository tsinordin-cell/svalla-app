# Dimension 5 — Kodrensning

## [P1] macOS-duplikat: `LastBoatPanel 2.tsx`
**Fil:** `src/components/LastBoatPanel 2.tsx`
**Beskrivning:** macOS skapar automatiskt "Name 2.tsx" vid namnkollision. Filen är en kopia av `LastBoatPanel.tsx` och importeras aldrig — men finns i repot och kan förvirra bundlern om den innehåller avvikande kod.
**Åtgärd:** `git rm "src/components/LastBoatPanel 2.tsx"` och commit.

## [P1] macOS `.fuse_hidden*`-filer i repot
**Fil:** `src/app/rutter/[id]/.fuse_hidden0000000c00000002`
**Beskrivning:** Temporär macOS-artefakt (visas när en fil är öppen i ett annat program). Hamnade i git av misstag.
**Åtgärd:** `git rm "src/app/rutter/[id]/.fuse_hidden0000000c00000002"`. Lägg till `.fuse_hidden*` i `.gitignore`.

## [P2] 70 rå `console.log/warn` i klientkod
**Sökning:** `grep -rn "console\.log\|console\.warn" src/` → 70 träffar
**Beskrivning:** `console.log`/`warn` i produktionskod syns i användarens DevTools och kan läcka intern state. Bör ersättas med `logger.*` (som respekterar `LOG_LEVEL`-env) eller tas bort.
**Undantag:** En träff i API-lager (`forum/threads/[id]/save/route.ts:69`) är faktiskt `console.warn` — bör vara `logger.warn`.

## [P2] 49 `as any`-casts
**Sökning:** `grep -rn "as any" src/` → 49 träffar
**Beskrivning:** `as any` avaktiverar TypeScript-checken och kan dölja fel. Vanligaste mönstret: `data as any` efter Supabase-fråga. Bör ersättas med korrekta Row-typer från `database.types.ts`.

## [P2] 12 `TODO: wrap handlers with withSentrySimple`
**Sökning:** `grep -rn "TODO.*withSentry" src/app/api/` → 12 träffar
**Beskrivning:** API-routes som saknar Sentry-wrapping men har ett TODO-kommentar. Se Dimension 6 för full lista.

## [P3] `src/app/rutter/page.tsx.bak`
**Beskrivning:** Backup-fil som aldrig ska checkas in. Bör tas bort eller läggas i `.gitignore`.
**Åtgärd:** `git rm src/app/rutter/page.tsx.bak`
