import { PROFILE_TEXT } from '../constants'
import type { MentorProfile } from '../types'
import { ExternalLinkItem } from './ExternalLinkItem'
import { ProfileCard } from './ProfileCard'

type ExperienceCardProps = {
  experience: NonNullable<MentorProfile['experience']>
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <ProfileCard title={PROFILE_TEXT.experienceTitle} subtitle={PROFILE_TEXT.experienceSubtitle}>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-foreground">{PROFILE_TEXT.jobsTitle}</h3>
          <ul className="flex flex-col gap-3">
            {experience.jobs.map((job) => (
              <li key={job.title} className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold text-foreground">{job.title}</span>
                <span className="text-xs text-muted-foreground">{job.meta}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted-foreground">{PROFILE_TEXT.jobsNote}</p>
          <ul className="flex flex-col gap-1">
            {experience.links.map((link) => (
              <li key={link.label}>
                <ExternalLinkItem link={link} />
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-foreground">{PROFILE_TEXT.achievementTitle}</h3>
          <p className="text-sm leading-[1.55] text-foreground">{experience.achievement}</p>
          <h3 className="text-sm font-semibold text-foreground">
            {PROFILE_TEXT.certificationsTitle}
          </h3>
          <ul className="text-sm leading-[1.6] text-foreground">
            {experience.certifications.map((certification) => (
              <li key={certification}>{certification}</li>
            ))}
          </ul>
          <figure className="text-xs text-muted-foreground">
            <blockquote>{experience.recommendation.quote}</blockquote>
            <figcaption>{experience.recommendation.author}</figcaption>
          </figure>
        </div>
      </div>
    </ProfileCard>
  )
}
