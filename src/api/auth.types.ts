export type UserRole = 'MENTEE' | 'MENTOR'

export type AuthUser = {
  id: string
  email: string
  role: UserRole
  firstName: string
  lastName: string
}

export type AuthResponse = {
  accessToken: string
  user: AuthUser
}

export type LoginRequest = {
  email: string
  password: string
}

export type RegisterRequest = {
  role: UserRole
  firstName: string
  lastName: string
  email: string
  password: string
  birthDate: string
  hasAcceptedTerms: true
}
