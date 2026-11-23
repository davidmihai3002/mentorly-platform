import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { reviewSchema, type ReviewInput, type ReviewOutput } from '../schemas'

export function useReviewForm(onPublish: (values: ReviewOutput) => void) {
  const form = useForm<ReviewInput, unknown, ReviewOutput>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      overall: 0,
      clarity: 0,
      empathy: 0,
      structure: 0,
      usefulness: 0,
      comment: '',
      consent: false,
    },
  })

  return { form, submit: form.handleSubmit(onPublish) }
}
