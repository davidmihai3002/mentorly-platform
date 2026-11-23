import { z } from 'zod'
import { REVIEW_LIMITS, WRITE_REVIEW_TEXT } from '../constants'

const starsSchema = z.coerce
  .number(WRITE_REVIEW_TEXT.ratingRequired)
  .int()
  .min(1, WRITE_REVIEW_TEXT.ratingRequired)
  .max(REVIEW_LIMITS.maxStars, WRITE_REVIEW_TEXT.ratingRequired)

export const reviewSchema = z.object({
  overall: starsSchema,
  clarity: starsSchema,
  empathy: starsSchema,
  structure: starsSchema,
  usefulness: starsSchema,
  comment: z
    .string()
    .trim()
    .min(REVIEW_LIMITS.minComment, WRITE_REVIEW_TEXT.commentTooShort)
    .max(REVIEW_LIMITS.maxComment, WRITE_REVIEW_TEXT.commentTooLong),
  consent: z.boolean().refine((value) => value, WRITE_REVIEW_TEXT.consentRequired),
})

export type ReviewInput = z.input<typeof reviewSchema>
export type ReviewOutput = z.output<typeof reviewSchema>
