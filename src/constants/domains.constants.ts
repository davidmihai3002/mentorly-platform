import type { Domain } from '@/types'

export const DOMAINS: readonly Domain[] = [
  {
    id: 'it-frontend',
    label: 'IT · Frontend',
    icon: '</>',
    description: 'React, TypeScript · code review',
  },
  {
    id: 'management',
    label: 'Management',
    icon: '◈',
    description: 'Leadership · echipe și obiective',
  },
  { id: 'hr', label: 'HR', icon: '⚙', description: 'Recrutare · dezvoltarea oamenilor' },
  { id: 'business', label: 'Business', icon: '▥', description: 'Strategie · validarea ideilor' },
  {
    id: 'ux-product',
    label: 'UX / Product',
    icon: '◇',
    description: 'Research · portofoliu de produs',
  },
  {
    id: 'marketing',
    label: 'Marketing',
    icon: '▣',
    description: 'Poziționare · campanii și analiză',
  },
]
