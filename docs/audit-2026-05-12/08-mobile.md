# Dimension 8 — Mobile / Capacitor

## Status: Hybrid-läge
Appen körs i Capacitor hybrid-läge — WebView pekar mot live-sajten `https://svalla.se` (se `capacitor.config.ts`). Det innebär att majoriteten av mobil-UX är identisk med web, men safe-area, native plugins och platform-detection påverkar upplevelsen.

## [P2] `Capacitor.isNativePlatform()` dynamisk import utan SSR-guard
**Fil:** `src/app/spara/page.tsx:152`, `src/lib/tracker.ts:29`
**Beskrivning:** `Capacitor.isNativePlatform()` anropas i klientkod. I `src/lib/tracker.ts:29` anropas det synkront vid top-level. Om detta bundlas SSR-side kraschar servern (`Capacitor is not defined`).
**Kod (tracker.ts:29):** `return Capacitor.isNativePlatform()`
**Åtgärd:** Wrappa med `typeof window !== 'undefined' && Capacitor?.isNativePlatform()` eller använd dynamisk import som redan görs i `spara/page.tsx`.

## [P2] `webDir: 'out'` i capacitor.config.ts matchar inte Next.js SSR
**Fil:** `capacitor.config.ts:5`
**Beskrivning:** `webDir: 'out'` pekar på statisk export-mapp, men `server.url: 'https://svalla.se'` åsidosätter detta i hybrid-läge. Vid en eventuell switch till fullständig native build (offline mode) skulle `out/` behöva genereras med `next export`, som inte stöds med App Router-features som API routes och server actions.
**Risk:** Ingen omedelbar — hybrid-läget fungerar. Men en planerad offline-transition kräver arkitekturöversyn.

## [P3] Safe-area korrekt implementerad
**Fil:** `src/app/globals.css`
**Beskrivning:** Verifierat OK. `env(safe-area-inset-top/bottom)` används konsekvent på nav och bottom-padding. Dubblet för dark/light mode (två separata CSS-block) är medveten för theme-support.

## [P3] StatusBar och PushNotifications konfigurerade
**Fil:** `capacitor.config.ts`
**Beskrivning:** `StatusBar.style: 'Dark'`, `PushNotifications.presentationOptions` och `Geolocation.permissions.location: 'always'` är konfigurerade. `location: 'always'` krävs för tracking i bakgrunden men utlöser App Store-granskning — säkerställ att privacy-beskrivningen i `Info.plist` matchar.

## [P3] Inget `App.addListener('backButton')` för Android
**Fil:** Saknas
**Beskrivning:** Capacitor på Android triggar `backButton`-event när hårdvaruknappen trycks. Utan en lyssnare stängs appen direkt. Svalla verkar primärt rikta iOS men om Android-build planeras bör detta adresseras.
