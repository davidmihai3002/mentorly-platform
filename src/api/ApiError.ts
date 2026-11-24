export class ApiError extends Error {
  readonly status: number
  readonly messages: readonly string[]

  constructor(status: number, messages: readonly string[]) {
    super(messages.join(' ') || `Request failed with status ${status}`)
    this.name = 'ApiError'
    this.status = status
    this.messages = messages
  }
}
