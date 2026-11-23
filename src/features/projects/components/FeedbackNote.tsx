import type { MentorFeedback } from '../types'

type FeedbackNoteProps = {
  feedback: MentorFeedback
}

export function FeedbackNote({ feedback }: FeedbackNoteProps) {
  return (
    <section className="flex flex-col gap-2 rounded-[12px] border border-border-soft bg-selected/80 p-4">
      <h3 className="text-[13px] font-semibold text-link">{feedback.title}</h3>
      <p className="text-[13px] leading-[1.5] text-foreground">{feedback.text}</p>
      {feedback.nextStep && (
        <p className="text-xs font-semibold text-foreground">{feedback.nextStep}</p>
      )}
    </section>
  )
}
