export type UploadMimeType = 'application/pdf' | 'image/jpeg' | 'image/png'

export type UploadUrlRequest = {
  fileName: string
  mimeType: UploadMimeType
  sizeBytes: number
}

export type UploadUrlResponse = {
  fileId: string
  uploadUrl: string
}
