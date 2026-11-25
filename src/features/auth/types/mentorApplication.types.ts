import type { z } from 'zod'
import type { mentorApplicationSchema } from '../schemas'

export type MentorApplicationInput = z.input<typeof mentorApplicationSchema>

export type MentorApplicationOutput = z.output<typeof mentorApplicationSchema>

export type MentorDocument = 'cv' | 'credentials'
