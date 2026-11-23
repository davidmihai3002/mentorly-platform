import { cn } from 'cn'
import { useParams } from 'react-router'
import { LAYOUT_CONTAINER_CLASS, MENTOR_SCHEDULES } from '@/constants'
import { getBookingPath } from '@/utils'
import { PROFILE_TEXT } from '../constants'
import { getMentorProfile } from '../utils'
import { AboutCard } from './AboutCard'
import { ApplicationForm } from './ApplicationForm'
import { AudienceCard } from './AudienceCard'
import { AvailabilityCard } from './AvailabilityCard'
import { CapacityCard } from './CapacityCard'
import { ExperienceCard } from './ExperienceCard'
import { PricingCard } from './PricingCard'
import { ProfileBreadcrumb } from './ProfileBreadcrumb'
import { ProfileHero } from './ProfileHero'
import { ProfileNotFound } from './ProfileNotFound'
import { ReviewsCard } from './ReviewsCard'
import { WorkStyleCard } from './WorkStyleCard'

const APPLY_ANCHOR = 'aplica'

export function MentorProfilePage() {
  const { mentorId } = useParams()
  const profile = getMentorProfile(mentorId)

  return (
    <div className={cn(LAYOUT_CONTAINER_CLASS, 'flex flex-col gap-6 py-8')}>
      {profile ? (
        <>
          <title>{PROFILE_TEXT.pageTitle(profile.mentor.name)}</title>
          <ProfileBreadcrumb category={profile.category} name={profile.mentor.name} />
          <ProfileHero profile={profile} />
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_292px]">
            <div className="flex flex-col gap-6">
              <AboutCard about={profile.about} />
              <AudienceCard audience={profile.audience} />
              <WorkStyleCard workStyle={profile.workStyle} />
            </div>
            <aside className="flex flex-col gap-6">
              <PricingCard
                sessionPrice={profile.mentor.pricePerSession}
                pricing={profile.pricing}
                applyAnchor={APPLY_ANCHOR}
              />
              <CapacityCard capacity={profile.capacity} />
              <AvailabilityCard
                availability={profile.availability}
                schedule={MENTOR_SCHEDULES[profile.mentor.availability]}
                bookingPath={getBookingPath(profile.mentor.id)}
              />
            </aside>
          </div>
          {profile.experience && <ExperienceCard experience={profile.experience} />}
          <ReviewsCard
            rating={profile.mentor.rating}
            reviewCount={profile.mentor.reputation?.reviewCount ?? 0}
            reviews={profile.reviews}
          />
          <ApplicationForm key={profile.mentor.id} profile={profile} anchorId={APPLY_ANCHOR} />
        </>
      ) : (
        <ProfileNotFound />
      )}
    </div>
  )
}
