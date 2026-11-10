import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config.ts'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      // Tema (index.css) e citită de src/theme.test.ts ca să verifice contrastul culorilor.
      css: { include: [/src\/index\.css/] },
    },
  }),
)
