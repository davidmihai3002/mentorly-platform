import { MutationObserver } from '@tanstack/react-query'
import { describe, expect, it } from 'vitest'
import { ApiError } from './client'
import { createQueryClient, queryKeys, shouldRetry } from './query'

const apiError = (code: ApiError['code'], status = 0) => new ApiError(code, status)

describe('shouldRetry', () => {
  it.each(['NETWORK', 'TIMEOUT', 'SERVER', 'RATE_LIMITED'] as const)(
    'reîncearcă erorile trecătoare: %s',
    (code) => {
      expect(shouldRetry(apiError(code))).toBe(true)
    },
  )

  it.each(['BAD_REQUEST', 'UNAUTHORIZED', 'FORBIDDEN', 'NOT_FOUND', 'VALIDATION'] as const)(
    'nu reîncearcă erorile care nu se rezolvă singure: %s',
    (code) => {
      expect(shouldRetry(apiError(code))).toBe(false)
    },
  )

  it('nu reîncearcă erori necunoscute (bug-uri din cod)', () => {
    expect(shouldRetry(new Error('bug'))).toBe(false)
  })
})

describe('createQueryClient', () => {
  it('reîncearcă interogările de cel mult 2 ori și mutațiile niciodată', () => {
    const { queries, mutations } = createQueryClient().getDefaultOptions()
    const retry = queries?.retry as (count: number, error: unknown) => boolean

    expect(retry(0, apiError('NETWORK'))).toBe(true)
    expect(retry(1, apiError('NETWORK'))).toBe(true)
    expect(retry(2, apiError('NETWORK'))).toBe(false)
    expect(retry(0, apiError('NOT_FOUND'))).toBe(false)
    // O plată sau o aplicare nu se trimite de două ori automat.
    expect(mutations?.retry).toBe(false)
  })
})

describe('queryKeys', () => {
  it('au forma [domeniu, tip, parametri]', () => {
    expect(queryKeys.all('mentors')).toEqual(['mentors'])
    expect(queryKeys.list('mentors', { domeniu: 'IT' })).toEqual([
      'mentors',
      'list',
      { domeniu: 'IT' },
    ])
    expect(queryKeys.detail('mentors', 7)).toEqual(['mentors', 'detail', 7])
  })

  it('invalidarea pe domeniu atinge listele și detaliile lui, nu și alte domenii', async () => {
    const client = createQueryClient()
    client.setQueryData(queryKeys.list('mentors', {}), [1])
    client.setQueryData(queryKeys.detail('mentors', 1), { id: 1 })
    client.setQueryData(queryKeys.list('sessions', {}), [2])

    await client.invalidateQueries({ queryKey: queryKeys.all('mentors') })

    expect(client.getQueryState(queryKeys.list('mentors', {}))?.isInvalidated).toBe(true)
    expect(client.getQueryState(queryKeys.detail('mentors', 1))?.isInvalidated).toBe(true)
    expect(client.getQueryState(queryKeys.list('sessions', {}))?.isInvalidated).toBe(false)
  })
})

describe('invalidarea după mutații', () => {
  it('reîncarcă automat cheile din meta.invalidates după o mutație reușită', async () => {
    const client = createQueryClient()
    client.setQueryData(queryKeys.list('mentors', {}), [1])
    client.setQueryData(queryKeys.list('sessions', {}), [2])

    await new MutationObserver(client, {
      mutationFn: () => Promise.resolve('ok'),
      meta: { invalidates: [queryKeys.all('mentors')] },
    }).mutate()

    expect(client.getQueryState(queryKeys.list('mentors', {}))?.isInvalidated).toBe(true)
    expect(client.getQueryState(queryKeys.list('sessions', {}))?.isInvalidated).toBe(false)
  })

  it('nu invalidează nimic dacă mutația eșuează', async () => {
    const client = createQueryClient()
    client.setQueryData(queryKeys.list('mentors', {}), [1])

    await new MutationObserver(client, {
      mutationFn: () => Promise.reject(new Error('eșec')),
      meta: { invalidates: [queryKeys.all('mentors')] },
    })
      .mutate()
      .catch(() => undefined)

    expect(client.getQueryState(queryKeys.list('mentors', {}))?.isInvalidated).toBe(false)
  })
})
