import { PROJECT_FILE, PROJECTS_TEXT } from '../constants'

export function validateProjectFile(file: File): string | undefined {
  const name = file.name.toLowerCase()
  const hasValidType =
    PROJECT_FILE.types.some((type) => type === file.type) ||
    PROJECT_FILE.extensions.some((extension) => name.endsWith(extension))
  if (!hasValidType) return PROJECTS_TEXT.fileType
  if (file.size > PROJECT_FILE.maxBytes) return PROJECTS_TEXT.fileSize
  return undefined
}
