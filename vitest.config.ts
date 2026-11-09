import { defineConfig } from 'vitest/config'

// Configurare minimă pentru SCRUM-281. SCRUM-284 (FE-F14) o extinde cu
// Testing Library, MSW și jsdom.
export default defineConfig({
  test: {
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    // Rulăm testele pe UTC, ca să demonstrăm că utilitarele nu depind de fusul
    // orar al calculatorului (dezvoltatorii sunt pe Europe/Bucharest, CI pe UTC).
    env: { TZ: 'UTC' },
  },
})
