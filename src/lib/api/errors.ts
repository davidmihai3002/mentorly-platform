/** Erorile API-ului, separate de client ca să nu tragă după ele Zod și fetch-ul. */

export type ApiErrorCode =
  | 'NETWORK'
  | 'TIMEOUT'
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'VALIDATION'
  | 'RATE_LIMITED'
  | 'SERVER'
  | 'INVALID_RESPONSE'
  | 'UNKNOWN'

const MESSAGES: Record<ApiErrorCode, string> = {
  NETWORK: 'Nu ne-am putut conecta la server. Verifică conexiunea la internet.',
  TIMEOUT: 'Serverul răspunde prea greu. Încearcă din nou.',
  BAD_REQUEST: 'Cererea nu este validă.',
  UNAUTHORIZED: 'Sesiunea a expirat. Intră din nou în cont.',
  FORBIDDEN: 'Nu ai acces la această acțiune.',
  NOT_FOUND: 'Nu am găsit ce căutai.',
  CONFLICT: 'Acțiunea intră în conflict cu datele existente.',
  VALIDATION: 'Unele date nu sunt valide. Verifică formularul.',
  RATE_LIMITED: 'Prea multe încercări. Așteaptă puțin și încearcă din nou.',
  SERVER: 'A apărut o problemă pe server. Încearcă din nou mai târziu.',
  INVALID_RESPONSE: 'Serverul a trimis un răspuns neașteptat.',
  UNKNOWN: 'A apărut o eroare neașteptată.',
}

const STATUS_CODES: Record<number, ApiErrorCode> = {
  400: 'BAD_REQUEST',
  408: 'TIMEOUT',
  401: 'UNAUTHORIZED',
  403: 'FORBIDDEN',
  404: 'NOT_FOUND',
  409: 'CONFLICT',
  422: 'VALIDATION',
  429: 'RATE_LIMITED',
}

/** Eroare de API cu mesaj pentru utilizator (în română) și detaliile serverului pentru cod. */
/**
 * Eroare de API. `message` e textul pentru utilizator (în română).
 * `details` e corpul răspunsului serverului: îl folosesc doar formularele (erori pe câmpuri).
 * Nu se afișează și nu se loghează (poate conține date personale sau detalii interne).
 */
export class ApiError extends Error {
  override readonly name = 'ApiError'
  readonly code: ApiErrorCode
  /** Statusul HTTP; 0 când nu a existat răspuns (rețea, timeout). */
  readonly status: number
  readonly details: unknown

  constructor(code: ApiErrorCode, status: number, details?: unknown, cause?: unknown) {
    super(MESSAGES[code], { cause })
    this.code = code
    this.status = status
    this.details = details
  }
}

export function codeForStatus(status: number): ApiErrorCode {
  return STATUS_CODES[status] ?? (status >= 500 ? 'SERVER' : 'UNKNOWN')
}
