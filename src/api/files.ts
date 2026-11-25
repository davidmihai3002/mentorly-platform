import { ApiError } from './ApiError'
import { request } from './client'
import type { UploadMimeType, UploadUrlRequest, UploadUrlResponse } from './files.types'

export function createUploadUrl(body: UploadUrlRequest): Promise<UploadUrlResponse> {
  return request<UploadUrlResponse>('/files/upload-url', { method: 'POST', body })
}

export async function uploadToUrl(
  uploadUrl: string,
  file: Blob,
  mimeType: UploadMimeType,
): Promise<void> {
  const response = await fetch(uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': mimeType },
    credentials: 'omit',
    body: file,
  })
  if (!response.ok) throw new ApiError(response.status, [])
}
