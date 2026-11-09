import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Alias-ul `@/` e citit din tsconfig. Atenție: e declarat în tsconfig.json ȘI în
    // tsconfig.app.json; cele două trebuie să rămână identice.
    tsconfigPaths: true,
  },
})
