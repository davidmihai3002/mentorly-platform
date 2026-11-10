import { QueryClientProvider } from '@tanstack/react-query'
import { useState, type ReactNode } from 'react'
import { Toaster } from '@/components/ui/sonner'
import { createQueryClient } from '@/lib/api/query'

/** Toți providerii aplicației, într-un singur loc (folosit și în teste). */
export function AppProviders({ children }: { children: ReactNode }) {
  // useState: un singur client pe toată viața aplicației, nu unul nou la fiecare randare.
  const [queryClient] = useState(createQueryClient)
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster position="top-center" />
    </QueryClientProvider>
  )
}
