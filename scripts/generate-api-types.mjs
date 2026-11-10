// Generează tipurile TypeScript din contractul OpenAPI al backend-ului (mentorly-api).
// Folosire: npm run api:types                       (implicit http://localhost:3000/api-json)
//           OPENAPI_URL=<url sau fișier> npm run api:types
// openapi-typescript rulează prin npx, cu versiune fixată: încă nu suportă TypeScript 6,
// deci nu îl instalăm în proiect (ar intra în conflict cu dependențele).
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'

const source = process.env.OPENAPI_URL ?? 'http://localhost:3000/api-json'
const output = 'src/lib/api/schema.d.ts'

// Pe Windows, npx rulează printr-un shell: caracterele speciale ar putea porni alte comenzi.
const isUrl = /^https?:\/\//.test(source) && URL.canParse(source)
const isSafe = !source.startsWith('-') && !/[&|<>^"%!\r\n]/.test(source)
if (!isSafe || (!isUrl && !existsSync(source))) {
  console.error(
    `OPENAPI_URL invalid: „${source}”. Folosește un URL http(s) sau un fișier existent.`,
  )
  process.exit(1)
}

execFileSync('npx', ['--yes', 'openapi-typescript@7.13.0', source, '--output', output], {
  stdio: 'inherit',
  shell: process.platform === 'win32',
})
