import { Layers, Orbit, Sprout } from 'lucide-react'
import type { Partner } from '../types'

export const PARTNERS_TEXT = {
  pageTitle: 'Parteneri – Mentorly',
  eyebrow: 'Creștem împreună',
  title: 'Parteneri pentru un viitor mai bun',
  subtitle: 'Conectăm experiența, educația și comunitatea pentru a face mentoratul mai accesibil.',
  benefitsTitle: 'Experiența voastră poate schimba un parcurs.',
  benefitsText:
    'Fii alături de oamenii care învață. Construim parteneriate cu sens, adaptate contribuției și valorilor fiecărei organizații.',
  ctaEyebrow: 'Hai să construim împreună',
  ctaTitle: 'Devino partener Mentorly',
  ctaText: 'Povestește-ne despre organizația ta și felul în care vrei să te implici.',
  ctaButton: 'Propune un parteneriat',
  email: 'parteneriate@mentorly.ro',
} as const

export const PARTNER_BENEFITS = [
  'Susține sesiuni de mentorat și accesul la orientare.',
  'Împărtășește resurse, experiență și provocări reale.',
  'Organizează ateliere alături de mentori și comunitate.',
] as const

export const PARTNERS: readonly Partner[] = [
  {
    id: 'x',
    icon: Orbit,
    name: 'X',
    type: 'Sponsor mentorat',
    text: 'Susține timpul dedicat de mentori comunității de tehnologie și întâlnirile de orientare în carieră.',
    meta: 'Mentor susținut: Mihai Popescu',
    link: { label: 'Descoperă profilul mentorului' },
  },
  {
    id: 'y',
    icon: Layers,
    name: 'Y',
    type: 'Partener educațional',
    text: 'Contribuie cu studii de caz, ateliere și feedback practic pentru portofoliile cursanților.',
    meta: 'Focus: ……….',
    link: { label: 'Vezi inițiativele educaționale' },
  },
  {
    id: 'z',
    icon: Sprout,
    name: 'Z',
    type: 'Partener comunitar',
    text: 'Ajută tinerii aflați la început de drum să descopere profesii și să își contureze primul plan de carieră.',
    meta: 'Focus: orientare și acces la învățare',
    link: { label: 'Cunoaște programul de sprijin' },
  },
]
