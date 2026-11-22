import { cn } from 'cn'
import { AppLink } from '@/components'
import { LAYOUT_CONTAINER_CLASS, ROUNDED_BUTTON_CLASS } from '@/constants'
import { HOME_TEXT, LANDING_LINKS } from '../constants'
import { HeroIllustration } from './HeroIllustration'

export function HomePage() {
  return (
    <section
      aria-labelledby="home-title"
      className={cn(
        LAYOUT_CONTAINER_CLASS,
        'grid flex-1 items-center gap-10 py-10 lg:min-h-[494px] lg:grid-cols-[427px_1fr] lg:items-start lg:gap-6 lg:py-0',
      )}
    >
      <title>{HOME_TEXT.pageTitle}</title>
      <div className="lg:pt-[11px]">
        <h1
          id="home-title"
          className="max-w-[427px] text-[clamp(2.25rem,6vw,3rem)] leading-[0.99] font-bold tracking-[-1.3px] text-foreground"
        >
          {HOME_TEXT.titleStart} <span className="text-highlight">{HOME_TEXT.titleAccent}</span>
        </h1>
        <p className="mt-3 max-w-[392px] text-lg leading-[1.23] text-foreground">
          {HOME_TEXT.lead}
        </p>
        <div className="mt-[18px] flex flex-wrap gap-3">
          <AppLink
            to={LANDING_LINKS.findMentor}
            className={cn(
              ROUNDED_BUTTON_CLASS,
              'border-primary bg-primary text-primary-foreground hover:bg-primary/90',
            )}
          >
            {HOME_TEXT.findMentor}
          </AppLink>
          <AppLink
            to={LANDING_LINKS.becomeMentor}
            className={cn(
              ROUNDED_BUTTON_CLASS,
              'border-brand-navy-border bg-card text-foreground hover:bg-muted',
            )}
          >
            {HOME_TEXT.becomeMentor}
          </AppLink>
        </div>
      </div>
      <HeroIllustration className="mx-auto w-full max-w-[460px] lg:mt-6 lg:max-w-none" />
    </section>
  )
}
