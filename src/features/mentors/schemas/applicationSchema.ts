import { z } from 'zod'
import { APPLICATION_LIMITS, PROFILE_TEXT } from '../constants'

const answerSchema = z
  .string()
  .trim()
  .min(APPLICATION_LIMITS.minLength, PROFILE_TEXT.answerRequired)
  .max(APPLICATION_LIMITS.maxLength, PROFILE_TEXT.answerTooLong)

export function buildApplicationSchema(questionIds: readonly string[]) {
  return z.object(Object.fromEntries(questionIds.map((id) => [id, answerSchema])))
}
