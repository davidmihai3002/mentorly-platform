import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import { defineConfig, globalIgnores } from 'eslint/config'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
  globalIgnores(['dist', 'coverage']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      // Reguli care folosesc informația de tip (prind promisiuni neașteptate, any-uri etc.)
      tseslint.configs.recommendedTypeChecked,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    // Componentele generate de shadcn exportă și variante (de ex. `buttonVariants`), pe care
    // alte componente shadcn le importă din același fișier. Regula afectează doar reîncărcarea
    // rapidă în dev, așa că o oprim DOAR aici, nu în tot proiectul.
    files: ['src/components/ui/**/*.tsx'],
    rules: { 'react-refresh/only-export-components': 'off' },
  },
  // Ultimul: dezactivează regulile de formatare, de care se ocupă Prettier.
  prettier,
])
