import type { AuthDensity } from '../types'

type AuthDensityStyles = {
  card: string
  stack: string
  field: string
  input: string
  submit: string
  divider: string
}

export const AUTH_DENSITY_STYLES: Record<AuthDensity, AuthDensityStyles> = {
  compact: {
    card: 'max-w-[338px] px-6 pt-10 pb-6 shadow-card',
    stack: 'space-y-3',
    field: 'gap-0.5',
    input: 'h-10 px-2.5 sm:h-[30px]',
    submit: 'h-10 shadow-navy sm:h-[29px]',
    divider: 'text-[13px] font-medium text-foreground',
  },
  regular: {
    card: 'max-w-[456px] p-8 shadow-card-soft',
    stack: 'space-y-3.5',
    field: 'gap-1.5',
    input: 'h-10 px-3',
    submit: 'h-[42px] shadow-navy-soft',
    divider: 'text-xs text-muted-foreground',
  },
}

export const AUTH_INPUT_BASE_CLASS =
  'rounded-lg border-input bg-card text-sm placeholder:text-placeholder/75'

export const AUTH_SUBMIT_BASE_CLASS =
  'w-full rounded-lg border border-brand-navy-border bg-brand-navy text-sm font-semibold text-brand-navy-foreground hover:bg-brand-navy/90'

export const AUTH_LINK_CLASS = 'h-auto p-0 text-[13px] font-semibold text-link hover:text-primary'
