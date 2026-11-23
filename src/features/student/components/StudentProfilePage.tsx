import { cn } from 'cn'
import { MENTOR_DIRECTORY, ROUNDED_BUTTON_CLASS, ROUNDED_OUTLINE_CLASS } from '@/constants'
import { ACTIVE_MENTOR_ID, STUDENT_PROFILE_TEXT } from '../constants'
import { useStudentProfile } from '../hooks'
import { AboutCard } from './AboutCard'
import { GoalsCard } from './GoalsCard'
import { LinksCard } from './LinksCard'
import { MentorshipCard } from './MentorshipCard'
import { ProfileEditForm } from './ProfileEditForm'
import { SessionsCard } from './SessionsCard'
import { SkillsCard } from './SkillsCard'
import { StudentHero } from './StudentHero'

export function StudentProfilePage() {
  const profile = useStudentProfile()
  const mentor = MENTOR_DIRECTORY.find((candidate) => candidate.id === ACTIVE_MENTOR_ID)

  return (
    <div className="flex flex-col gap-5">
      <title>{STUDENT_PROFILE_TEXT.pageTitle}</title>
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-[clamp(1.5rem,4vw,1.8125rem)] leading-[1.2] font-bold tracking-[-0.02em] text-foreground">
          {STUDENT_PROFILE_TEXT.title}
        </h1>
        {!profile.isEditing && (
          <button
            type="button"
            onClick={profile.startEditing}
            className={cn(ROUNDED_BUTTON_CLASS, ROUNDED_OUTLINE_CLASS, 'min-h-9 text-sm')}
          >
            {STUDENT_PROFILE_TEXT.edit}
          </button>
        )}
      </header>
      <p
        role="status"
        className={cn(
          'rounded-[12px] bg-success px-4 py-2 text-sm font-medium text-success-foreground',
          !profile.isSaved && 'sr-only',
        )}
      >
        {profile.isSaved ? STUDENT_PROFILE_TEXT.saved : ''}
      </p>
      {profile.isEditing ? (
        <ProfileEditForm
          form={profile.form}
          onSave={profile.save}
          onCancel={profile.cancelEditing}
        />
      ) : (
        <StudentHero details={profile.details} />
      )}
      <div className="grid items-start gap-5 lg:grid-cols-[292px_minmax(0,1fr)]">
        <div className="flex flex-col gap-5">
          <AboutCard about={profile.details.about} />
          <SkillsCard />
          <LinksCard />
        </div>
        <div className="flex flex-col gap-5">
          {mentor && <MentorshipCard mentor={mentor} />}
          <GoalsCard />
          <SessionsCard mentorId={ACTIVE_MENTOR_ID} />
        </div>
      </div>
    </div>
  )
}
