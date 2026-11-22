import { cn } from 'cn'
import { UploadIcon } from 'lucide-react'
import { useRef, useState, type DragEvent, type Ref } from 'react'
import { MENTOR_SIGNUP_TEXT } from '../constants'

type FileDropzoneProps = {
  accept: string
  fileName?: string
  describedById?: string
  buttonRef?: Ref<HTMLButtonElement>
  onFile: (file: File) => void
}

export function FileDropzone({
  accept,
  fileName,
  describedById,
  buttonRef,
  onFile,
}: FileDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'copy'
    setIsDragging(true)
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
    const [file] = event.dataTransfer.files
    if (file) onFile(file)
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={cn(
        'flex flex-col items-center gap-2 rounded-lg border border-dashed border-dropzone-border bg-background px-3 py-4 text-center transition-colors',
        isDragging && 'border-primary bg-selected',
      )}
    >
      <UploadIcon aria-hidden="true" className="size-5 text-foreground" />
      <p className="text-xs text-foreground">{fileName ?? MENTOR_SIGNUP_TEXT.dropzone}</p>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        tabIndex={-1}
        aria-hidden="true"
        className="sr-only"
        onChange={(event) => {
          const file = event.target.files?.[0]
          if (file) onFile(file)
          event.currentTarget.value = ''
        }}
      />
      <button
        ref={buttonRef}
        type="button"
        aria-describedby={describedById}
        onClick={() => inputRef.current?.click()}
        className="h-[25px] rounded-md bg-brand-navy px-2.5 text-[11px] font-medium text-brand-navy-foreground hover:bg-brand-navy/90 focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
      >
        {MENTOR_SIGNUP_TEXT.chooseFile}
      </button>
    </div>
  )
}
