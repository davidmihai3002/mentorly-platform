import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { msw } from 'msw/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // msw(): servește service worker-ul mock-urilor; în build intră doar cu VITE_USE_MOCKS=true.
  plugins: [react(), tailwindcss(), msw()],
  resolve: {
    // Alias-ul `@/` e citit din tsconfig. Atenție: e declarat în tsconfig.json ȘI în
    // tsconfig.app.json; cele două trebuie să rămână identice.
    tsconfigPaths: true,
  },
  build: {
    rolldownOptions: {
      output: {
        // React și TanStack în fișiere separate: se schimbă rar, deci browserul le păstrează în
        // cache între deploy-uri. Fără grup „restul node_modules”: o bibliotecă folosită doar de
        // o pagină încărcată la cerere (grafice, editor) trebuie să rămână în fișierul paginii.
        codeSplitting: {
          groups: [
            {
              name: 'vendor-react',
              test: /node_modules[\\/](react|react-dom|react-router|scheduler)[\\/]/,
              priority: 20,
            },
            { name: 'vendor-query', test: /node_modules[\\/]@tanstack[\\/]/, priority: 10 },
          ],
        },
      },
    },
  },
})
