import { LOGIN_TEXT } from '../constants'

type AuthDividerProps = {
  text?: string
}

export function AuthDivider({ text = LOGIN_TEXT.divider }: AuthDividerProps) {
  return (
    <div className="flex items-center gap-3 text-[13px] font-medium text-foreground">
      <span className="h-px flex-1 bg-border" />
      <span>{text}</span>
      <span className="h-px flex-1 bg-border" />
    </div>
  )
}
