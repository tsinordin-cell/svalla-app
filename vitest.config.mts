// Låter tester importera moduler som använder @/-aliaset, som Next gör.
// Lades till 2026-10-02 för ruttestet i src/lib/avregistrering.rutt.test.ts.
// Ändrar inget annat: standardinställningarna gäller som förut.
import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
})
