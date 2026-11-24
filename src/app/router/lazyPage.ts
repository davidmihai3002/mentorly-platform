import type { ComponentType } from 'react'

export function lazyPage<Module, Name extends keyof Module>(
  load: () => Promise<Module>,
  name: Name,
): () => Promise<{ Component: ComponentType }> {
  return async () => ({ Component: (await load())[name] as ComponentType })
}
