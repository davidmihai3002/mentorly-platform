import { z } from 'zod'
import { MENTOR_APPLICATION_TEXT } from '../constants'
import { isLinkedInUrl } from '../utils'

const { errors } = MENTOR_APPLICATION_TEXT

export const mentorApplicationSchema = z.object({
  linkedinUrl: z
    .string()
    .trim()
    .min(1, errors.linkedinRequired)
    .refine(isLinkedInUrl, errors.linkedinInvalid),
  motivation: z.string().trim().min(1, errors.motivationRequired),
})
