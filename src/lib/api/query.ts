import { MutationCache, QueryClient, type QueryKey } from '@tanstack/react-query'
import { ApiError } from './errors'

const MAX_QUERY_RETRIES = 2
const STALE_TIME_MS = 30_000
const TRANSIENT_CODES = new Set<ApiError['code']>(['NETWORK', 'TIMEOUT', 'SERVER', 'RATE_LIMITED'])

/** Reîncercăm doar erorile care pot dispărea singure (rețea, server căzut temporar). */
export function shouldRetry(error: unknown): boolean {
  return error instanceof ApiError && TRANSIENT_CODES.has(error.code)
}

declare module '@tanstack/react-query' {
  interface Register {
    mutationMeta: {
      /** Cheile reîncărcate automat după o mutație reușită (vezi `queryKeys`). */
      invalidates?: readonly QueryKey[]
    }
  }
}

/**
 * Invalidarea după mutații se declară pe mutație, nu se scrie de mână în fiecare ecran:
 *   useMutation({ mutationFn, meta: { invalidates: [queryKeys.all('mentors')] } })
 */
export function createQueryClient(): QueryClient {
  const queryClient: QueryClient = new QueryClient({
    mutationCache: new MutationCache({
      onSuccess: async (_data, _variables, _onMutateResult, mutation) => {
        const keys = mutation.meta?.invalidates ?? []
        await Promise.all(keys.map((queryKey) => queryClient.invalidateQueries({ queryKey })))
      },
    }),
    defaultOptions: {
      queries: {
        staleTime: STALE_TIME_MS,
        retry: (failureCount, error) => failureCount < MAX_QUERY_RETRIES && shouldRetry(error),
      },
      // Implicit și în v5; explicit pentru că o plată sau o aplicare nu se trimite de două ori.
      mutations: { retry: false },
    },
  })
  return queryClient
}

/** Domeniile de date. O cheie nouă se adaugă aici, ca greșelile de scriere să nu compileze. */
export type QueryDomain =
  | 'auth'
  | 'mentors'
  | 'applications'
  | 'sessions'
  | 'payments'
  | 'progress'
  | 'notifications'
  | 'sponsors'

/**
 * Convenția de chei: [domeniu] ⊃ [domeniu, 'list', filtre] și [domeniu, 'detail', id].
 * `queryKeys.all('mentors')` în `meta.invalidates` reîncarcă toate listele și detaliile lui.
 */
export const queryKeys = {
  all: (domain: QueryDomain) => [domain] as const,
  list: (domain: QueryDomain, filters: object = {}) => [domain, 'list', filters] as const,
  detail: (domain: QueryDomain, id: string | number) => [domain, 'detail', id] as const,
}
