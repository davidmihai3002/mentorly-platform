import { useMemo } from 'react'
import { useParams, useSearchParams } from 'react-router'
import { MENTOR_DIRECTORY } from '@/constants'
import { BOOKING_PARAM_KEYS } from '../constants'
import { parseSelection } from '../utils'

export function useBookingContext() {
  const { mentorId } = useParams()
  const [params] = useSearchParams()

  return useMemo(() => {
    const mentor = MENTOR_DIRECTORY.find((candidate) => candidate.id === mentorId)
    const read = (dateKey: string, startKey: string) =>
      mentor ? parseSelection(mentor, params.get(dateKey), params.get(startKey)) : undefined
    return {
      mentor,
      selection: read(BOOKING_PARAM_KEYS.date, BOOKING_PARAM_KEYS.start),
      previous: read(BOOKING_PARAM_KEYS.previousDate, BOOKING_PARAM_KEYS.previousStart),
    }
  }, [mentorId, params])
}
