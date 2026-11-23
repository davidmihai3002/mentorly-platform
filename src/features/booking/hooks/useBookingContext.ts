import { useParams, useSearchParams } from 'react-router'
import { MENTOR_DIRECTORY } from '@/constants'
import { BOOKING_PARAM_KEYS } from '../constants'
import { resolveSelection } from '../utils'

export function useBookingContext() {
  const { mentorId } = useParams()
  const [params] = useSearchParams()
  const mentor = MENTOR_DIRECTORY.find((candidate) => candidate.id === mentorId)
  const selection = mentor
    ? resolveSelection(
        mentor,
        params.get(BOOKING_PARAM_KEYS.date),
        params.get(BOOKING_PARAM_KEYS.start),
      )
    : undefined
  const previous = mentor
    ? resolveSelection(
        mentor,
        params.get(BOOKING_PARAM_KEYS.previousDate),
        params.get(BOOKING_PARAM_KEYS.previousStart),
      )
    : undefined

  return { mentor, selection, previous }
}
