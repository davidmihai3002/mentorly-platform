import { cn } from 'cn'
import { LAYOUT_CONTAINER_CLASS } from '@/constants'
import { LANDING_SECTION_CLASS, REVIEWS, REVIEWS_TEXT } from '../constants'
import { CardGrid } from './CardGrid'
import { ReviewCard } from './ReviewCard'
import { SectionHeading } from './SectionHeading'

export function ReviewsPage() {
  return (
    <section
      aria-labelledby="reviews-title"
      className={cn(LAYOUT_CONTAINER_CLASS, LANDING_SECTION_CLASS)}
    >
      <title>{REVIEWS_TEXT.pageTitle}</title>
      <SectionHeading
        titleId="reviews-title"
        eyebrow={REVIEWS_TEXT.eyebrow}
        eyebrowStyle="pill"
        title={REVIEWS_TEXT.title}
        subtitle={REVIEWS_TEXT.subtitle}
        titleClassName="mt-[13px] text-secondary-foreground text-[clamp(2.25rem,5vw,2.8125rem)] leading-[1.25]"
        subtitleClassName="mt-1 leading-[1.5] text-slate"
      />
      <CardGrid
        items={REVIEWS}
        getKey={(review) => review.id}
        renderItem={(review, index) => <ReviewCard review={review} position={index + 1} />}
        className="mt-[35px]"
      />
    </section>
  )
}
