import { ACCOUNT_PLACEHOLDER_TEXT } from '@/constants'

type AccountPlaceholderPageProps = {
  pageTitle: string
  title: string
}

export function AccountPlaceholderPage({ pageTitle, title }: AccountPlaceholderPageProps) {
  return (
    <section className="space-y-2">
      <title>{pageTitle}</title>
      <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">{title}</h1>
      <p className="text-sm text-muted-foreground">{ACCOUNT_PLACEHOLDER_TEXT.comingSoon}</p>
    </section>
  )
}
