import { z } from 'zod'
import { PROFILE_LIMITS, STUDENT_PROFILE_TEXT } from '../constants'

const { errors } = STUDENT_PROFILE_TEXT

export const studentSchema = z.object({
  fullName: z.string().trim().min(2, errors.fullName).max(60, errors.fullName),
  careerGoal: z.string().trim().min(5, errors.careerGoal).max(120, errors.careerGoal),
  city: z.string().trim().min(2, errors.city).max(60, errors.city),
  about: z.string().trim().max(PROFILE_LIMITS.aboutMax, errors.about),
})
