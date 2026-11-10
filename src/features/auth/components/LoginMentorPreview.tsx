import { StarIcon } from 'lucide-react'
import { MENTOR_PREVIEW } from '../constants'

/** Cardul de mentor din moodboard: un exemplu ilustrativ de profil, pentru panoul de brand. */
export function LoginMentorPreview() {
  return (
    <figure className="max-w-sm space-y-4 rounded-3xl bg-card p-6 shadow-lg">
      <figcaption className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {MENTOR_PREVIEW.caption}
      </figcaption>
      <div className="flex items-center gap-4">
        <span
          aria-hidden
          className="grid size-12 shrink-0 place-items-center rounded-full bg-primary/10 font-heading font-bold text-primary"
        >
          {MENTOR_PREVIEW.initials}
        </span>
        <div className="min-w-0">
          <p className="font-heading font-bold">{MENTOR_PREVIEW.name}</p>
          <p className="text-sm text-muted-foreground">{MENTOR_PREVIEW.role}</p>
        </div>
      </div>
      <p className="flex items-center gap-1.5 text-sm">
        <StarIcon className="size-4 fill-rating text-rating" aria-hidden />
        {MENTOR_PREVIEW.rating}
      </p>
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-2 rounded-full bg-success px-3 py-1 text-sm font-medium text-success-foreground">
          <span aria-hidden className="size-2 rounded-full bg-chart-3" />
          {MENTOR_PREVIEW.availability}
        </span>
        {MENTOR_PREVIEW.skills.map((skill) => (
          <span key={skill} className="rounded-full bg-accent px-3 py-1 text-sm text-primary">
            {skill}
          </span>
        ))}
      </div>
    </figure>
  )
}
