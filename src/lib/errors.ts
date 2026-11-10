// Mesajele cu care Chrome, Safari și Firefox raportează un fișier JS care nu mai există.
// Se întâmplă când utilizatorul are deschisă o versiune veche a aplicației după un deploy.
const STALE_CHUNK_ERROR =
  /Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module/i

/** True dacă eroarea vine dintr-un fișier JS care nu mai există (versiune nouă publicată). */
export function isStaleChunkError(error: unknown): boolean {
  return error instanceof Error && STALE_CHUNK_ERROR.test(error.message)
}
