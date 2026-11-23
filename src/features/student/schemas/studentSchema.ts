import { z } from 'zod'
import { PROFILE_LIMITS as L, STUDENT_PROFILE_TEXT } from '../constants'

const { errors } = STUDENT_PROFILE_TEXT

export const studentSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(L.nameMin, errors.fullName(L.nameMin, L.nameMax))
    .max(L.nameMax, errors.fullName(L.nameMin, L.nameMax)),
  careerGoal: z
    .string()
    .trim()
    .min(L.goalMin, errors.careerGoal(L.goalMin, L.goalMax))
    .max(L.goalMax, errors.careerGoal(L.goalMin, L.goalMax)),
  city: z
    .string()
    .trim()
    .min(L.cityMin, errors.city(L.cityMin, L.cityMax))
    .max(L.cityMax, errors.city(L.cityMin, L.cityMax)),
  about: z.string().trim().max(L.aboutMax, errors.about(L.aboutMax)),
})
