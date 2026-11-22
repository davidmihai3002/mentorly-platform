import { type ReactNode, type Ref, useId } from 'react'
import { Checkbox } from '@/components/ui'
import { AuthFieldError } from './AuthFieldError'

type AuthCheckboxFieldProps = {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  onBlur?: () => void
  inputRef?: Ref<HTMLInputElement>
  required?: boolean
  error?: string
  children: ReactNode
}

export function AuthCheckboxField({
  checked,
  onCheckedChange,
  onBlur,
  inputRef,
  required = true,
  error,
  children,
}: AuthCheckboxFieldProps) {
  const fieldId = useId()
  const labelId = `${fieldId}-label`
  const errorId = `${fieldId}-error`

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-start gap-2">
        <Checkbox
          id={fieldId}
          checked={checked}
          onCheckedChange={onCheckedChange}
          onBlur={onBlur}
          inputRef={inputRef}
          required={required}
          aria-labelledby={labelId}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className="mt-0.5"
        />
        <span
          id={labelId}
          onClick={() => onCheckedChange(!checked)}
          className="cursor-pointer text-[13px] leading-[1.4] font-normal text-foreground select-none"
        >
          {children}
        </span>
      </div>

      <AuthFieldError id={errorId} message={error} />
    </div>
  )
}
