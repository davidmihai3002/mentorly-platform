import { PROJECT_FILE, PROJECTS_TEXT } from '../constants'

export function validateProjectFile(file: File): string | undefined {
  const name = file.name.toLowerCase()
  const hasValidExtension = PROJECT_FILE.extensions.some((extension) => name.endsWith(extension))
  const hasValidType = file.type === '' || PROJECT_FILE.types.some((type) => type === file.type)
  if (!hasValidExtension || !hasValidType) return PROJECTS_TEXT.fileType
  if (file.size === 0) return PROJECTS_TEXT.fileEmpty
  if (file.size > PROJECT_FILE.maxBytes) return PROJECTS_TEXT.fileSize
  return undefined
}
