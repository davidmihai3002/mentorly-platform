import type { AuthResponse, LoginRequest, RegisterRequest } from './auth.types'
import { refreshSession, request } from './client'

export function login(body: LoginRequest): Promise<AuthResponse> {
  return request<AuthResponse>('/auth/login', { method: 'POST', body })
}

export function register(body: RegisterRequest): Promise<AuthResponse> {
  return request<AuthResponse>('/auth/register', { method: 'POST', body })
}

export function refresh(): Promise<AuthResponse> {
  return refreshSession()
}

export function logout(): Promise<void> {
  return request<void>('/auth/logout', { method: 'POST' })
}
