import { cn } from 'cn'
import { useId } from 'react'
import { ROUNDED_BUTTON_CLASS, ROUNDED_PRIMARY_CLASS } from '@/constants'
import { MESSAGE_MAX_LENGTH, PROJECTS_TEXT } from '../constants'
import { useSubmissionForm } from '../hooks'
import { ProjectFileInput } from './ProjectFileInput'

const FIELD_CLASS =
  'w-full rounded-[10px] border border-border bg-card px-3 text-[13px] text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:outline-none aria-invalid:border-destructive'

export function SubmitVersionForm() {
  const { form, file, fileError, selectFile, submit, isSubmitted } = useSubmissionForm()
  const urlId = useId()
  const urlErrorId = useId()
  const messageId = useId()
  const { errors } = form.formState

  return (
    <form
      noValidate
      onSubmit={submit}
      aria-labelledby="submit-version"
      className="flex flex-col gap-3 rounded-[14px] border border-border bg-background/60 p-4 sm:p-5"
    >
      <h3 id="submit-version" className="text-base font-bold text-foreground">
        {PROJECTS_TEXT.submitTitle}
      </h3>
      <div className="flex flex-col gap-1.5">
        <label htmlFor={urlId} className="text-xs font-semibold text-foreground">
          {PROJECTS_TEXT.repoLabel}
        </label>
        <input
          id={urlId}
          type="url"
          inputMode="url"
          placeholder={PROJECTS_TEXT.repoPlaceholder}
          aria-invalid={Boolean(errors.repoUrl) || undefined}
          aria-describedby={errors.repoUrl ? urlErrorId : undefined}
          className={cn(FIELD_CLASS, 'h-10')}
          {...form.register('repoUrl')}
        />
        {errors.repoUrl && (
          <p id={urlErrorId} className="text-xs font-medium text-destructive">
            {errors.repoUrl.message}
          </p>
        )}
      </div>
      <ProjectFileInput file={file} error={fileError} onSelect={selectFile} />
      <div className="flex flex-col gap-1.5">
        <label htmlFor={messageId} className="text-xs font-semibold text-foreground">
          {PROJECTS_TEXT.messageLabel}
        </label>
        <textarea
          id={messageId}
          rows={2}
          maxLength={MESSAGE_MAX_LENGTH}
          placeholder={PROJECTS_TEXT.messagePlaceholder}
          className={cn(FIELD_CLASS, 'resize-y py-2')}
          {...form.register('message')}
        />
      </div>
      <button type="submit" className={cn(ROUNDED_BUTTON_CLASS, ROUNDED_PRIMARY_CLASS)}>
        {PROJECTS_TEXT.submit}
      </button>
      <p
        role="status"
        className={cn('text-[13px] font-medium text-success-foreground', !isSubmitted && 'sr-only')}
      >
        {isSubmitted ? PROJECTS_TEXT.submitted : ''}
      </p>
    </form>
  )
}
