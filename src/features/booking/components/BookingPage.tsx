import { cn } from 'cn'
import { useNavigate } from 'react-router'
import { AppLink } from '@/components'
import {
  ROUNDED_BUTTON_CLASS,
  ROUNDED_OUTLINE_CLASS,
  ROUNDED_PRIMARY_CLASS,
  ROUTES,
} from '@/constants'
import { getMentorProfilePath } from '@/utils'
import { BOOKING_TEXT } from '../constants'
import { useBookingContext } from '../hooks'
import type { BookingSelection } from '../types'
import {
  buildBookingPath,
  findFirstBookable,
  getFirstFreeStart,
  getSessionTopic,
  isSelectionBookable,
} from '../utils'
import { BookingNotFound } from './BookingNotFound'
import { BookingPageHeader } from './BookingPageHeader'
import { MonthCalendar } from './MonthCalendar'
import { SlotPanel } from './SlotPanel'

export function BookingPage() {
  const { mentor, selection: requested } = useBookingContext()
  const selection =
    mentor && requested && isSelectionBookable(mentor, requested)
      ? requested
      : mentor && findFirstBookable(mentor)
  const navigate = useNavigate()

  if (!mentor || !selection) return <BookingNotFound />

  function select(next: BookingSelection) {
    if (!mentor) return
    navigate(buildBookingPath(ROUTES.booking, mentor.id, next), {
      replace: true,
      preventScrollReset: true,
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <title>{BOOKING_TEXT.pageTitle}</title>
      <BookingPageHeader
        title={BOOKING_TEXT.title}
        subtitle={BOOKING_TEXT.subtitle(mentor.name, getSessionTopic(mentor))}
      />
      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
        <MonthCalendar
          mentor={mentor}
          selectedDate={selection.date}
          onSelect={(iso) => select({ date: iso, start: getFirstFreeStart(mentor, iso) })}
        />
        <SlotPanel
          mentor={mentor}
          selection={selection}
          onSelectStart={(start) => select({ ...selection, start })}
        >
          <AppLink
            to={buildBookingPath(ROUTES.bookingSummary, mentor.id, selection)}
            className={cn(ROUNDED_BUTTON_CLASS, ROUNDED_PRIMARY_CLASS)}
          >
            {BOOKING_TEXT.continueToSummary}
          </AppLink>
          <AppLink
            to={getMentorProfilePath(mentor.id)}
            className={cn(ROUNDED_BUTTON_CLASS, ROUNDED_OUTLINE_CLASS, 'text-sm')}
          >
            {BOOKING_TEXT.backToMentor}
          </AppLink>
        </SlotPanel>
      </div>
    </div>
  )
}
