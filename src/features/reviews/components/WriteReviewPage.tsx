import { cn } from 'cn'
import { useId } from 'react'
import { generatePath, useNavigate, useParams } from 'react-router'
import { AppLink } from '@/components'
import {
  MENTOR_DIRECTORY,
  ROUNDED_BUTTON_CLASS,
  ROUNDED_OUTLINE_CLASS,
  ROUNDED_PRIMARY_CLASS,
  ROUTES,
} from '@/constants'
import { CRITERIA, REVIEW_LIMITS, WRITE_REVIEW_TEXT } from '../constants'
import { useReviewForm } from '../hooks'
import { ReviewPageHeader } from './ReviewPageHeader'
import { ReviewsUnavailable } from './ReviewsUnavailable'
import { StarRatingInput } from './StarRatingInput'

export function WriteReviewPage() {
  const { mentorId } = useParams()
  const navigate = useNavigate()
  const commentId = useId()
  const commentHintId = useId()
  const commentErrorId = useId()
  const consentErrorId = useId()
  const mentor = MENTOR_DIRECTORY.find((candidate) => candidate.id === mentorId)
  const reviewsPath = mentor
    ? generatePath(ROUTES.mentorReviews, { mentorId: mentor.id })
    : ROUTES.mentors
  const { form, submit } = useReviewForm(() =>
    navigate(reviewsPath, { state: { published: true }, viewTransition: true }),
  )

  if (!mentor) return <ReviewsUnavailable />

  const { errors } = form.formState
  const overall = Number(form.watch('overall'))
  const commentDescription = errors.comment ? `${commentHintId} ${commentErrorId}` : commentHintId

  return (
    <div className="flex flex-col gap-5">
      <title>{WRITE_REVIEW_TEXT.pageTitle}</title>
      <ReviewPageHeader title={WRITE_REVIEW_TEXT.title} subtitle={WRITE_REVIEW_TEXT.subtitle} />
      <form
        noValidate
        onSubmit={submit}
        className="flex flex-col gap-5 rounded-[16px] border border-border bg-card p-5 sm:p-6"
      >
        <span className="w-fit rounded-[12px] bg-tag px-2.5 py-1 text-[10px] uppercase">
          {WRITE_REVIEW_TEXT.badge}
        </span>
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-bold text-foreground">
            {mentor.name} · Code review &amp; React
          </h2>
          <p className="text-xs text-muted-foreground">{WRITE_REVIEW_TEXT.session}</p>
        </div>
        <StarRatingInput
          legend={`${WRITE_REVIEW_TEXT.overallLegend} ${WRITE_REVIEW_TEXT.required}`}
          value={overall}
          size="lg"
          registration={form.register('overall')}
          error={errors.overall?.message}
          summary={
            overall
              ? WRITE_REVIEW_TEXT.ratingSummary(
                  overall,
                  WRITE_REVIEW_TEXT.ratingWords[overall] ?? '',
                )
              : undefined
          }
        />
        <fieldset className="flex flex-col gap-3">
          <legend className="mb-3 text-base font-bold text-foreground">
            {WRITE_REVIEW_TEXT.criteriaTitle} {WRITE_REVIEW_TEXT.required}
          </legend>
          {CRITERIA.map((criterion) => {
            const value = Number(form.watch(criterion.id))
            return (
              <div
                key={criterion.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-[12px] border border-border bg-background/60 px-4 py-3"
              >
                <span aria-hidden="true" className="text-[13px] text-foreground">
                  {criterion.label}
                </span>
                <div className="flex items-center gap-2">
                  <StarRatingInput
                    legend={criterion.label}
                    isLegendVisible={false}
                    value={value}
                    registration={form.register(criterion.id)}
                    error={errors[criterion.id]?.message}
                  />
                  {value > 0 && (
                    <span aria-hidden="true" className="text-sm text-primary">
                      {value}/{REVIEW_LIMITS.maxStars}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </fieldset>
        <div className="flex flex-col gap-2">
          <label htmlFor={commentId} className="text-[13px] font-semibold text-foreground">
            {WRITE_REVIEW_TEXT.commentLabel} {WRITE_REVIEW_TEXT.required}
          </label>
          <textarea
            id={commentId}
            rows={3}
            maxLength={REVIEW_LIMITS.maxComment}
            placeholder={WRITE_REVIEW_TEXT.commentPlaceholder}
            aria-invalid={Boolean(errors.comment) || undefined}
            aria-describedby={commentDescription}
            className="w-full resize-y rounded-[10px] border border-border bg-card px-3 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none aria-invalid:border-destructive"
            {...form.register('comment')}
          />
          <p id={commentHintId} className="text-[11px] text-muted-foreground">
            {WRITE_REVIEW_TEXT.commentHint}
          </p>
          {errors.comment && (
            <p id={commentErrorId} className="text-xs font-medium text-destructive">
              {errors.comment.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="flex items-start gap-2 text-xs text-foreground">
            <input
              type="checkbox"
              className="mt-0.5 size-4 accent-primary"
              aria-invalid={Boolean(errors.consent) || undefined}
              aria-describedby={errors.consent ? consentErrorId : undefined}
              {...form.register('consent')}
            />
            {WRITE_REVIEW_TEXT.consent}
          </label>
          {errors.consent && (
            <p id={consentErrorId} className="text-xs font-medium text-destructive">
              {errors.consent.message}
            </p>
          )}
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <AppLink
            to={reviewsPath}
            className={cn(ROUNDED_BUTTON_CLASS, ROUNDED_OUTLINE_CLASS, 'text-sm')}
          >
            {WRITE_REVIEW_TEXT.cancel}
          </AppLink>
          <button type="submit" className={cn(ROUNDED_BUTTON_CLASS, ROUNDED_PRIMARY_CLASS)}>
            {WRITE_REVIEW_TEXT.publish}
          </button>
        </div>
      </form>
    </div>
  )
}
