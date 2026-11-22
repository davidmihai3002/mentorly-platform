import { MENTOR_SIGNUP_TEXT } from '../constants'

export function DocumentsTabs() {
  return (
    <div className="flex justify-center rounded-lg bg-track p-1">
      <span className="w-[100px] rounded-md bg-card py-1 text-center text-xs font-medium text-foreground shadow-xs">
        {MENTOR_SIGNUP_TEXT.documentsTab}
      </span>
    </div>
  )
}
