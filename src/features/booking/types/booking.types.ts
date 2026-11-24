export type TimeSlot = {
  readonly start: string
  readonly end: string
  readonly isBusy: boolean
}

export type BookingSelection = {
  readonly date: string
  readonly start: string
}

export type CalendarDay = {
  readonly iso: string
  readonly dayOfMonth: number
  readonly isAvailable: boolean
}

export type CheckoutState = {
  readonly firstName: string
  readonly email: string
  readonly cardLast4: string
}
