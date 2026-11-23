import { RESCHEDULE_TEXT } from '../constants'

type CurrentBookingCardProps = {
  dateLabel: string
  time: string
}

export function CurrentBookingCard({ dateLabel, time }: CurrentBookingCardProps) {
  return (
    <section
      aria-labelledby="current-booking"
      className="flex flex-col gap-1.5 rounded-[14px] border border-border bg-selected/70 p-5"
    >
      <h2 id="current-booking" className="text-[13px] font-bold text-link">
        {RESCHEDULE_TEXT.currentTitle}
      </h2>
      <p className="text-[13px] leading-[1.6] text-foreground">
        {dateLabel} · {time}
        <br />
        {RESCHEDULE_TEXT.currentMeta}
      </p>
      <p className="text-[11px] text-muted-foreground">{RESCHEDULE_TEXT.currentNote}</p>
    </section>
  )
}
