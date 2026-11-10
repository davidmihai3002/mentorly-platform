import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config.ts'

// Configurare minimă de test. SCRUM-284 (FE-F14) o extinde cu MSW și Playwright.
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      // Rulăm pe UTC, ca rezultatele să nu depindă de fusul orar al calculatorului.
      env: { TZ: 'UTC' },
    },
  }),
)
