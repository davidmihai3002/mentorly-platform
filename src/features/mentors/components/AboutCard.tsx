import { PROFILE_TAG_CLASS } from '../constants'
import type { MentorProfile } from '../types'
import { ProfileCard } from './ProfileCard'

type AboutCardProps = {
  about: MentorProfile['about']
}

export function AboutCard({ about }: AboutCardProps) {
  return (
    <ProfileCard title={about.title}>
      <p className="text-[15px] leading-[1.55] text-foreground">{about.text}</p>
      {about.tags.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {about.tags.map((tag) => (
            <li key={tag} className={PROFILE_TAG_CLASS}>
              {tag}
            </li>
          ))}
        </ul>
      )}
    </ProfileCard>
  )
}
