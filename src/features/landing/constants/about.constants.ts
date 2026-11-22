import { CreditCard, Layers, ShieldCheck } from 'lucide-react'
import { ROUTES } from '@/constants'
import type { Benefit } from '../types'

export const ABOUT_TEXT = {
  pageTitle: 'Ce este Mentorly – Mentorly',
  eyebrow: 'Mentorat care contează',
  title: 'De ce mentorat și nu meditații?',
  subtitle: 'Învățare practică orientată spre piața muncii reale.',
} as const

export const BENEFITS: readonly Benefit[] = [
  {
    id: 'no-rigid-curriculum',
    icon: Layers,
    title: 'Fără materie rigidă',
    text: 'Fără teorie inutilă. Focus pe provocări reale din industrie, portofolii solide și roadmap-uri personalizate.',
    link: { label: 'Află cum funcționează', to: ROUTES.signup },
  },
  {
    id: 'verified-mentors',
    icon: ShieldCheck,
    title: 'Mentori calificați & validați',
    text: 'Fiecare mentor este verificat riguros pentru a asigura expertiza reală și experiență practică.',
    link: { label: 'Procesul de verificare', to: ROUTES.mentorSignup },
  },
  {
    id: 'safe-payments',
    icon: CreditCard,
    title: 'Plăți sigure',
    text: 'Banii tăi sunt reținuți în siguranță și transferați mentorului doar după ce sesiunea a avut loc cu succes.',
    link: { label: 'Siguranța plăților' },
  },
]
