# Bug Hunt-logg — startade 2026-04-25

## ⏸ STOPPAD — väntar på Tom

Pass 1 (Build & TypeScript-fel) blockerades direkt av en miljö-bug
som inte ligger i Tom's källkod.

### Problemet

`next build` kraschar med:

```
Error: Cannot find module 'next/dist/compiled/string_decoder'
Require stack:
- node_modules/next/dist/build/webpack-config.js
```

Roten: `node_modules/next/dist/compiled/string_decoder/` saknar
`package.json` (har bara `LICENSE` och `string_decoder.js`). Andra
peer-mappar i samma katalog (`punycode`, `buffer`, m.fl.) HAR
package.json. Det är alltså inte en återinstallationsfix —
`npm install next@15.3.6` kör om utan att lägga tillbaka filen.

Sannolik orsak: **Node v25.8.1** kombinerat med **Next 15.3.6**.
Node 25 har strikt module-resolution som kräver `package.json`
eller `index.js` för directory-import. Tidigare Node-versioner
gissade `<dir>/<dir-name>.js`. Next 15.3.6 paketerade inte
package.json för string_decoder eftersom äldre Node hanterade det
på äldre vis.

### Verifiering

```bash
$ node --version
v25.8.1

$ ls node_modules/next/dist/compiled/string_decoder/
LICENSE
string_decoder.js          # ← ingen package.json

$ ls node_modules/next/dist/compiled/punycode/
package.json               # ← finns här (fungerar)
punycode.js

$ node -e "require.resolve('next/dist/compiled/string_decoder')"
Error: Cannot find module ...
```

### Möjliga lösningar (Tom väljer)

1. **Downgrade Node till 22 LTS eller 20 LTS** (säkrast, ingen kodändring)
2. **Uppgradera Next** till en patch-version som inkluderar package.json
   för string_decoder (15.3.7+ eller 15.4+)
3. **Patch via `patch-package`** för att lägga till
   `package.json` i `node_modules/next/dist/compiled/string_decoder`
   (snabbt men bräckligt — låser oss vid en patch)
4. **Skapa `.nvmrc`** med "22" så att alla i teamet använder rätt Node

### Vad jag har gjort

- Inget i Tom's kod
- Försökt `npm install next@15.3.6` (gjorde ingen skillnad)
- Killade en hängd build-process från tidigare session

### TS-status (separat verifierat)

`npx tsc --noEmit` → **0 errors**. Tom's kod är typsäker.

### Lint-status

`next lint` är inte konfigurerat alls (ingen `.eslintrc`, ingen
`eslint.config.*`). Skriptet finns i package.json men det finns
ingen config. Tom: vill du att vi konfigurerar Strict-läget?

### Fixar gjorda innan stopp

- `bug_hunt_log.md` skapad
- Inga commits

### Vad du kan göra när du är tillbaka

Snabbtest:

```bash
cd svalla-app
nvm use 22 && npm run build
```

Om det funkar — säg till så fortsätter jag med Pass 1–6 utan
omstart. Hela TS-checken är redan ren så jag misstänker att Pass 1
i praktiken är klar och vi kan hoppa direkt till Pass 2.
