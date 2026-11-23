import { cn } from 'cn'
import { useId } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'
import { APPLICATION_LIMITS } from '../constants'
import type { ApplicationQuestion } from '../types'

type ApplicationAnswerFieldProps = {
  question: ApplicationQuestion
  registration: UseFormRegisterReturn
  error?: string
  className?: string
}

export function ApplicationAnswerField({
  question,
  registration,
  error,
  className,
}: ApplicationAnswerFieldProps) {
  const fieldId = useId()
  const errorId = useId()

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={fieldId} className="text-[13px] font-semibold text-foreground">
        {question.label}
      </label>
      <textarea
        id={fieldId}
        rows={3}
        maxLength={APPLICATION_LIMITS.maxLength}
        placeholder={question.placeholder}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={error ? errorId : undefined}
        className="min-h-[72px] w-full resize-y rounded-[10px] border border-border bg-card px-3 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none aria-invalid:border-destructive"
        {...registration}
      />
      {error && (
        <p id={errorId} className="text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
