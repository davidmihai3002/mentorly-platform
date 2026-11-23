import { MENTOR_DIRECTORY, MENTOR_SCHEDULES, WEEKDAY_NAMES } from '@/constants'
import type { DirectoryMentor } from '@/types'
import { findDomain } from '@/utils'
import { DEFAULT_APPLICATION_QUESTIONS, PROFILE_DETAILS } from '../constants'
import type { MentorProfile } from '../types'

const MONTHLY_SESSIONS = 4
const MONTHLY_DISCOUNT = 0.1
const DEFAULT_CAPACITY = { max: 4, current: 2 } as const

function buildDefaultProfile(mentor: DirectoryMentor): MentorProfile {
  const domain = findDomain(mentor.domainId)
  const fullPrice = mentor.pricePerSession * MONTHLY_SESSIONS
  const monthlyPrice = Math.round(fullPrice * (1 - MONTHLY_DISCOUNT))
  const schedule = MENTOR_SCHEDULES[mentor.availability]

  return {
    mentor,
    category: domain?.label ?? '',
    meta: [domain?.label, domain?.description, 'online'].filter(Boolean).join(' · '),
    badges: ['Mentor verificat'],
    links: [],
    about: { title: mentor.role, text: mentor.description, tags: domain ? [domain.label] : [] },
    audience: {
      requirements: 'Ai un obiectiv clar și vrei să lucrezi pe exemple reale din domeniul tău.',
      fit: 'Poți dedica timp practicii între sesiuni și ești deschis(ă) la feedback.',
    },
    workStyle: {
      paragraphs: [
        'Sesiuni online, 1-la-1, de 60 de minute. Stabilim obiective la început și revizuim progresul împreună.',
        'Reprogramarea se discută cu cel puțin 24 de ore înainte. Apelul introductiv gratuit durează 20 de minute.',
      ],
    },
    pricing: {
      monthlyPrice,
      monthlyMeta: `${MONTHLY_SESSIONS} sesiuni de 60 min / 30 zile, în loc de ${fullPrice} lei.`,
      discountNote: `Reducere de ${fullPrice - monthlyPrice} lei aleasă de mentor. Nu este impusă de Mentorly.`,
    },
    capacity: DEFAULT_CAPACITY,
    availability: {
      introSlots: schedule.map((slot) => `${WEEKDAY_NAMES[slot.weekday]}, ${slot.start}`),
    },
    reviews: {
      criteria: [
        { label: 'Claritatea explicațiilor', score: mentor.rating },
        { label: 'Expertiză practică', score: mentor.rating },
      ],
      items: [],
    },
    applicationQuestions: DEFAULT_APPLICATION_QUESTIONS,
  }
}

export function getMentorProfile(mentorId: string | undefined): MentorProfile | undefined {
  const mentor = MENTOR_DIRECTORY.find((candidate) => candidate.id === mentorId)
  if (!mentor) return undefined
  const details = PROFILE_DETAILS[mentor.id]
  return details ? { mentor, ...details } : buildDefaultProfile(mentor)
}
