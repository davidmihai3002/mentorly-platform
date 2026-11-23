import { z } from 'zod'
import { MESSAGE_MAX_LENGTH, PROJECTS_TEXT } from '../constants'

const HTTPS_URL = /^https:\/\/[^\s]+\.[^\s]+$/

export const submissionSchema = z
  .object({
    repoUrl: z
      .string()
      .trim()
      .refine((value) => value === '' || HTTPS_URL.test(value), PROJECTS_TEXT.invalidUrl),
    hasFile: z.boolean(),
    message: z.string().trim().max(MESSAGE_MAX_LENGTH, PROJECTS_TEXT.messageTooLong),
  })
  .refine((values) => values.repoUrl !== '' || values.hasFile, {
    message: PROJECTS_TEXT.needSource,
    path: ['repoUrl'],
  })

export type SubmissionValues = z.infer<typeof submissionSchema>
