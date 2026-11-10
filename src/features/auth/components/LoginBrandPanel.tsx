import { CheckCircle2Icon } from 'lucide-react'
import { LOGIN_TEXT } from '../constants'
import { LoginMentorPreview } from './LoginMentorPreview'

/** Panoul de brand din stânga paginii de login (doar pe ecrane mari). */
export function LoginBrandPanel() {
  return (
    <aside className="hidden flex-col justify-between gap-10 bg-accent p-12 lg:flex">
      <p className="font-heading text-2xl font-extrabold tracking-tight text-primary">
        {LOGIN_TEXT.brand}
      </p>
      <div className="space-y-8">
        <div className="space-y-4">
          <p className="font-heading text-4xl leading-tight font-extrabold">
            {LOGIN_TEXT.panelTitle}
          </p>
          <p className="max-w-md text-lg text-muted-foreground">{LOGIN_TEXT.panelText}</p>
        </div>
        <LoginMentorPreview />
        <ul className="space-y-3">
          {LOGIN_TEXT.panelBenefits.map((benefit) => (
            <li key={benefit} className="flex items-center gap-3">
              <CheckCircle2Icon className="size-5 shrink-0 text-success-foreground" aria-hidden />
              {benefit}
            </li>
          ))}
        </ul>
      </div>
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} {LOGIN_TEXT.brand}
      </p>
    </aside>
  )
}
