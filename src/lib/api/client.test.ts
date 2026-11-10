import { afterEach, beforeEach, describe, expect, expectTypeOf, it, vi, type Mock } from 'vitest'
import { z } from 'zod'
import { api, ApiError, configureAuth } from './client'

const BASE = 'https://api.test'
let fetchMock: Mock<typeof fetch>

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

/** O cerere care se termină doar când semnalul ei e anulat. */
const hangUntilAborted: typeof fetch = (_url, init) =>
  new Promise((_resolve, reject) => {
    init?.signal?.addEventListener('abort', () => reject(init.signal?.reason as Error))
  })

function lastRequest(index = -1): { url: string; init: RequestInit } {
  const call = fetchMock.mock.calls.at(index)
  if (!call) throw new Error('fetch nu a fost apelat')
  const [input, init] = call
  const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url
  return { url, init: init ?? {} }
}

beforeEach(() => {
  vi.stubEnv('VITE_API_URL', BASE)
  fetchMock = vi.fn<typeof fetch>()
  vi.stubGlobal('fetch', fetchMock)
  configureAuth({})
})

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('cereri reușite', () => {
  it('construiește URL-ul cu parametrii definiți și trimite cookie-urile', async () => {
    fetchMock.mockResolvedValue(json({ ok: true }))
    await api.get('/mentori', { query: { domeniu: 'IT', pagina: 2, gol: undefined } })

    const { url, init } = lastRequest()
    expect(url).toBe(`${BASE}/mentori?domeniu=IT&pagina=2`)
    expect(init.credentials).toBe('include')
    expect(new Headers(init.headers).get('Accept')).toBe('application/json')
  })

  it('validează răspunsul cu schema și îl tipizează; fără schemă e `unknown`', async () => {
    fetchMock.mockResolvedValue(json({ id: 7, name: 'Ana' }))
    const mentor = await api.get('/mentori/7', {
      schema: z.object({ id: z.number(), name: z.string() }),
    })
    expect(mentor).toEqual({ id: 7, name: 'Ana' })
    expectTypeOf(mentor).toEqualTypeOf<{ id: number; name: string }>()

    fetchMock.mockResolvedValue(json({}))
    expectTypeOf(await api.get('/x')).toBeUnknown()
  })

  it('trimite obiectele ca JSON și FormData/Blob/URLSearchParams ca atare', async () => {
    fetchMock.mockImplementation(() => Promise.resolve(new Response(null, { status: 204 })))
    await api.post('/aplicari', { body: { mesaj: 'salut' } })
    expect(lastRequest().init.body).toBe('{"mesaj":"salut"}')
    expect(new Headers(lastRequest().init.headers).get('Content-Type')).toBe('application/json')

    for (const raw of [new FormData(), new Blob(['%PDF']), new URLSearchParams('a=1')]) {
      await api.post('/fisiere', { body: raw })
      expect(lastRequest().init.body).toBe(raw)
      expect(new Headers(lastRequest().init.headers).has('Content-Type')).toBe(false)
    }
  })

  it('întoarce undefined la 204 și la un 200 fără conținut', async () => {
    fetchMock.mockResolvedValueOnce(new Response(null, { status: 204 }))
    await expect(api.delete('/favorite/3')).resolves.toBeUndefined()
    fetchMock.mockResolvedValueOnce(new Response('', { status: 200 }))
    await expect(api.get('/x')).resolves.toBeUndefined()
  })
})

describe('erori normalizate (cod + mesaj în română)', () => {
  it.each([
    [400, 'BAD_REQUEST'],
    [403, 'FORBIDDEN'],
    [404, 'NOT_FOUND'],
    [408, 'TIMEOUT'],
    [409, 'CONFLICT'],
    [422, 'VALIDATION'],
    [429, 'RATE_LIMITED'],
    [500, 'SERVER'],
    [503, 'SERVER'],
  ])('HTTP %i → %s, cu detaliile serverului păstrate', async (status, code) => {
    const body = { statusCode: status, message: 'server detail' }
    fetchMock.mockResolvedValue(json(body, status))
    const error = await api.get('/x').catch((e: unknown) => e)
    expect(error).toBeInstanceOf(ApiError)
    expect(error).toMatchObject({ status, code, details: body })
    expect((error as ApiError).message).not.toMatch(/server detail/)
  })

  it('păstrează începutul unui răspuns de eroare non-JSON (de ex. HTML de la proxy)', async () => {
    fetchMock.mockResolvedValue(new Response(`<html>${'x'.repeat(2000)}</html>`, { status: 502 }))
    const error = (await api.get('/x').catch((e: unknown) => e)) as ApiError
    expect(error.code).toBe('SERVER')
    expect(String(error.details)).toMatch(/^<html>/)
    expect(String(error.details).length).toBeLessThanOrEqual(500)
  })

  it.each([
    ['nu respectă schema', json({ id: 'nu-e-număr' })],
    [
      'JSON stricat',
      new Response('{nu', { status: 200, headers: { 'Content-Type': 'application/json' } }),
    ],
  ])('răspuns care %s → INVALID_RESPONSE', async (_label, response) => {
    fetchMock.mockResolvedValue(response)
    await expect(api.get('/x', { schema: z.object({ id: z.number() }) })).rejects.toMatchObject({
      code: 'INVALID_RESPONSE',
    })
  })

  it('fără internet → NETWORK, cu cauza originală păstrată', async () => {
    const cause = new TypeError('Failed to fetch')
    fetchMock.mockRejectedValue(cause)
    await expect(api.get('/x')).rejects.toMatchObject({ code: 'NETWORK', status: 0, cause })
  })

  it('server prea lent → TIMEOUT', async () => {
    fetchMock.mockImplementation(hangUntilAborted)
    await expect(api.get('/x', { timeoutMs: 10 })).rejects.toMatchObject({ code: 'TIMEOUT' })
  })

  it('anularea cerută de aplicație rămâne anulare, chiar cu motiv propriu', async () => {
    fetchMock.mockImplementation(hangUntilAborted)
    const controller = new AbortController()
    const request = api.get('/x', { signal: controller.signal })
    controller.abort('utilizatorul a schimbat pagina')
    await expect(request).rejects.toBe('utilizatorul a schimbat pagina')
  })

  it.each(['https://evil.example/x', '//evil.example/x', 'fara-slash'])(
    'refuză calea „%s” (doar căi relative la API)',
    async (path) => {
      await expect(api.get(path)).rejects.toThrow(/cale/)
      expect(fetchMock).not.toHaveBeenCalled()
    },
  )
})

describe('autentificare', () => {
  it('atașează tokenul doar dacă există', async () => {
    fetchMock.mockImplementation(() => Promise.resolve(json({})))
    configureAuth({ getAccessToken: () => 'abc' })
    await api.get('/eu')
    expect(new Headers(lastRequest().init.headers).get('Authorization')).toBe('Bearer abc')

    configureAuth({ getAccessToken: () => null })
    await api.get('/eu')
    expect(new Headers(lastRequest().init.headers).has('Authorization')).toBe(false)
  })

  it('la 401 reîmprospătează sesiunea o dată și repetă cererea', async () => {
    const refreshSession = vi.fn(() => Promise.resolve(true))
    configureAuth({ refreshSession })
    fetchMock.mockResolvedValueOnce(json({}, 401)).mockResolvedValueOnce(json({ id: 1 }))

    await expect(api.get('/eu')).resolves.toEqual({ id: 1 })
    expect(refreshSession).toHaveBeenCalledTimes(1)
  })

  it('o parolă greșită la login (401) nu reîmprospătează și nu scoate din cont', async () => {
    const refreshSession = vi.fn(() => Promise.resolve(true))
    const onUnauthenticated = vi.fn()
    configureAuth({ refreshSession, onUnauthenticated })
    fetchMock.mockResolvedValue(json({}, 401))

    await expect(
      api.post('/auth/login', { body: { email: 'a@b.ro' }, skipAuthRefresh: true }),
    ).rejects.toMatchObject({ code: 'UNAUTHORIZED' })
    expect(refreshSession).not.toHaveBeenCalled()
    expect(onUnauthenticated).not.toHaveBeenCalled()
  })

  it('un refresh făcut chiar cu `api`, care primește 401, nu blochează aplicația', async () => {
    const onUnauthenticated = vi.fn()
    configureAuth({
      refreshSession: () =>
        api.post('/auth/refresh', { skipAuthRefresh: true }).then(
          () => true,
          (error: unknown) => {
            if (error instanceof ApiError && error.code === 'UNAUTHORIZED') return false
            throw error
          },
        ),
      onUnauthenticated,
    })
    fetchMock.mockImplementation(() => Promise.resolve(json({}, 401)))

    await expect(api.get('/eu')).rejects.toMatchObject({ code: 'UNAUTHORIZED' })
    expect(onUnauthenticated).toHaveBeenCalledTimes(1)
  })

  it('trei cereri cu 401 simultan: o singură reîmprospătare', async () => {
    let finishRefresh: (ok: boolean) => void = () => {}
    const refreshSession = vi.fn(
      () =>
        new Promise<boolean>((resolve) => {
          finishRefresh = resolve
        }),
    )
    configureAuth({ refreshSession })
    let calls = 0
    fetchMock.mockImplementation(() =>
      Promise.resolve(calls++ < 3 ? json({}, 401) : json({ ok: 1 })),
    )

    const requests = [api.get('/a'), api.get('/b'), api.get('/c')]
    await vi.waitFor(() => {
      expect(refreshSession).toHaveBeenCalled()
    })
    finishRefresh(true)

    await expect(Promise.all(requests)).resolves.toHaveLength(3)
    expect(refreshSession).toHaveBeenCalledTimes(1)
  })

  it('refresh eșuat: ieșirea din cont e anunțată o singură dată, chiar pentru 3 cereri', async () => {
    const onUnauthenticated = vi.fn()
    configureAuth({ refreshSession: () => Promise.resolve(false), onUnauthenticated })
    fetchMock.mockImplementation(() => Promise.resolve(json({}, 401)))

    const results = await Promise.allSettled([api.get('/a'), api.get('/b'), api.get('/c')])
    expect(results.every((r) => r.status === 'rejected')).toBe(true)
    expect(onUnauthenticated).toHaveBeenCalledTimes(1)
  })

  it('o cădere de rețea în timpul refresh-ului NU scoate utilizatorul din cont', async () => {
    const onUnauthenticated = vi.fn()
    configureAuth({
      refreshSession: () => Promise.reject(new TypeError('Failed to fetch')),
      onUnauthenticated,
    })
    fetchMock.mockResolvedValue(json({}, 401))

    await expect(api.get('/eu')).rejects.toMatchObject({ code: 'NETWORK' })
    expect(onUnauthenticated).not.toHaveBeenCalled()
  })

  it('un 401 sosit după un refresh deja reușit doar repetă cererea', async () => {
    const refreshSession = vi.fn(() => Promise.resolve(true))
    configureAuth({ refreshSession })
    let releaseLate: (r: Response) => void = () => {}
    fetchMock
      .mockResolvedValueOnce(json({}, 401)) // A: 401 imediat → refresh
      .mockImplementationOnce(() => new Promise((resolve) => (releaseLate = resolve))) // B: întârziat
      .mockImplementation(() => Promise.resolve(json({ ok: true }))) // repetările

    const first = api.get('/a')
    const late = api.get('/b')
    await expect(first).resolves.toEqual({ ok: true })
    releaseLate(json({}, 401))

    await expect(late).resolves.toEqual({ ok: true })
    expect(refreshSession).toHaveBeenCalledTimes(1)
  })

  it('nu intră în buclă dacă cererea repetată primește tot 401', async () => {
    configureAuth({ refreshSession: () => Promise.resolve(true) })
    fetchMock.mockImplementation(() => Promise.resolve(json({}, 401)))

    await expect(api.get('/eu')).rejects.toMatchObject({ code: 'UNAUTHORIZED' })
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('configureAuth în timpul unui refresh: refresh-ul vechi nu-l anulează pe cel nou', async () => {
    let finishOld: (ok: boolean) => void = () => {}
    const oldRefresh = vi.fn(() => new Promise<boolean>((resolve) => (finishOld = resolve)))
    configureAuth({ refreshSession: oldRefresh })
    fetchMock.mockImplementation(() => Promise.resolve(json({}, 401)))
    const oldRequest = api.get('/a').catch(() => undefined)
    await vi.waitFor(() => {
      expect(oldRefresh).toHaveBeenCalledTimes(1)
    })

    const newRefresh = vi.fn(() => new Promise<boolean>(() => {}))
    configureAuth({ refreshSession: newRefresh })
    void api.get('/b').catch(() => undefined)
    await vi.waitFor(() => {
      expect(newRefresh).toHaveBeenCalledTimes(1)
    })

    finishOld(false)
    await oldRequest
    // A treia cerere primește 401 și așteaptă refresh-ul NOU, fără să pornească altul.
    void api.get('/c').catch(() => undefined)
    await vi.waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(3)
    })
    await new Promise((resolve) => setTimeout(resolve, 0)) // lasă cererea să ajungă la refresh
    expect(newRefresh).toHaveBeenCalledTimes(1)
  })
})
