import { UploadIcon } from 'lucide-react'
import { useId, useRef, type DragEvent } from 'react'
import { MENTOR_SIGNUP_TEXT } from '../constants'

type FileDropzoneProps = {
  accept: string
  fileName?: string
  describedById?: string
  onFile: (file: File) => void
}

export function FileDropzone({ accept, fileName, describedById, onFile }: FileDropzoneProps) {
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const [file] = event.dataTransfer.files
    if (file) onFile(file)
  }

  return (
    <div
      onDragOver={(event) => event.preventDefault()}
      onDrop={handleDrop}
      className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-dropzone-border bg-background px-3 py-4 text-center"
    >
      <UploadIcon aria-hidden="true" className="size-5 text-foreground" />
      <p className="text-xs text-foreground">{fileName ?? MENTOR_SIGNUP_TEXT.dropzone}</p>
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={accept}
        aria-describedby={describedById}
        className="sr-only"
        onChange={(event) => {
          const file = event.target.files?.[0]
          if (file) onFile(file)
        }}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="h-[25px] rounded-md bg-brand-navy px-2.5 text-[11px] font-medium text-brand-navy-foreground hover:bg-brand-navy/90 focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
      >
        {MENTOR_SIGNUP_TEXT.chooseFile}
      </button>
    </div>
  )
}
