import { cn } from 'cn'
import type { FormEvent } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import { ROUNDED_BUTTON_CLASS, ROUNDED_OUTLINE_CLASS, ROUNDED_PRIMARY_CLASS } from '@/constants'
import { STUDENT_PROFILE_TEXT } from '../constants'
import type { StudentDetails } from '../types'
import { ProfileField } from './ProfileField'

type ProfileEditFormProps = {
  form: UseFormReturn<StudentDetails>
  onSave: (event?: FormEvent) => void
  onCancel: () => void
}

export function ProfileEditForm({ form, onSave, onCancel }: ProfileEditFormProps) {
  const { errors } = form.formState
  const { fields } = STUDENT_PROFILE_TEXT

  return (
    <form
      noValidate
      onSubmit={onSave}
      className="flex flex-col gap-4 rounded-[16px] border border-border bg-card p-5 sm:p-6"
    >
      <h2 id="edit-profile-title" className="text-lg font-bold text-foreground">
        {STUDENT_PROFILE_TEXT.edit}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <ProfileField
          label={fields.fullName}
          registration={form.register('fullName')}
          error={errors.fullName?.message}
        />
        <ProfileField
          label={fields.city}
          registration={form.register('city')}
          error={errors.city?.message}
        />
      </div>
      <ProfileField
        label={fields.careerGoal}
        registration={form.register('careerGoal')}
        error={errors.careerGoal?.message}
      />
      <ProfileField
        label={fields.about}
        registration={form.register('about')}
        error={errors.about?.message}
        isMultiline
      />
      <div className="flex flex-wrap gap-3">
        <button type="submit" className={cn(ROUNDED_BUTTON_CLASS, ROUNDED_PRIMARY_CLASS)}>
          {STUDENT_PROFILE_TEXT.save}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className={cn(ROUNDED_BUTTON_CLASS, ROUNDED_OUTLINE_CLASS, 'text-sm')}
        >
          {STUDENT_PROFILE_TEXT.cancelEdit}
        </button>
      </div>
    </form>
  )
}
