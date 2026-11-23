import { cn } from 'cn'
import { Upload, X } from 'lucide-react'
import { useId, useRef, useState, type DragEvent } from 'react'
import { ROUNDED_BUTTON_CLASS, ROUNDED_OUTLINE_CLASS } from '@/constants'
import { PROJECT_FILE, PROJECTS_TEXT } from '../constants'

type ProjectFileInputProps = {
  file: File | null
  error?: string
  onSelect: (file: File | null) => void
}

export function ProjectFileInput({ file, error, onSelect }: ProjectFileInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const hintId = useId()
  const errorId = useId()
  const [isDragging, setIsDragging] = useState(false)

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault()
    setIsDragging(false)
    onSelect(event.dataTransfer.files[0] ?? null)
  }

  return (
    <div className="flex flex-col gap-1.5">
      <div
        onDragOver={(event) => {
          event.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={cn(
          'flex flex-wrap items-center justify-between gap-3 rounded-[10px] border border-dashed border-transparent py-1 transition-colors',
          isDragging && 'border-primary bg-selected px-2',
        )}
      >
        <p id={hintId} className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Upload aria-hidden="true" className="size-3.5" />
          {file ? file.name : PROJECTS_TEXT.fileHint}
          {file && (
            <button
              type="button"
              aria-label={PROJECTS_TEXT.removeFile}
              onClick={() => onSelect(null)}
              className="rounded-sm text-muted-foreground hover:text-destructive focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
            >
              <X aria-hidden="true" className="size-3.5" />
            </button>
          )}
        </p>
        <input
          ref={inputRef}
          type="file"
          accept={PROJECT_FILE.accept}
          tabIndex={-1}
          aria-hidden="true"
          className="sr-only"
          onChange={(event) => {
            onSelect(event.target.files?.[0] ?? null)
            event.currentTarget.value = ''
          }}
        />
        <button
          type="button"
          aria-describedby={error ? `${hintId} ${errorId}` : hintId}
          onClick={() => inputRef.current?.click()}
          className={cn(ROUNDED_BUTTON_CLASS, ROUNDED_OUTLINE_CLASS, 'min-h-9 px-6 text-sm')}
        >
          {PROJECTS_TEXT.uploadFile}
        </button>
      </div>
      {error && (
        <p id={errorId} role="alert" className="text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
