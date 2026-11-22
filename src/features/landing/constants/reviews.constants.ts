import type { Review } from '../types'

export const REVIEWS_TEXT = {
  pageTitle: 'Recenzii – Mentorly',
  eyebrow: 'Rezultate reale',
  title: 'Povești de succes',
  subtitle: 'Iată ce spun cei care și-au atins obiectivele cu ajutorul platformei Mentorly.',
  withMentor: 'cu',
  ratingLabel: (rating: number, max: number) => `${rating} din ${max} stele`,
} as const

export const REVIEWS: readonly Review[] = [
  {
    id: 'andrei',
    rating: 5,
    quote:
      'În doar trei sesiuni am reușit să-mi refac portofoliul și să obțin primul interviu în domeniul dorit.',
    author: { name: 'Andrei M.', initials: 'AM', tone: 'sky' },
    role: 'Frontend Developer',
    mentorName: 'Elena Ionescu',
  },
  {
    id: 'diana',
    rating: 5,
    quote:
      'Am primit feedback concret, fără ocolișuri. Roadmap-ul făcut împreună mi-a dat exact claritatea de care aveam nevoie.',
    author: { name: 'Diana C.', initials: 'DC', tone: 'violet' },
    role: 'Product Designer',
    mentorName: 'Ana Marinescu',
  },
  {
    id: 'radu',
    rating: 5,
    quote:
      'Mihai m-a ajutat să trec de la executant la lider. Discuțiile noastre au avut impact imediat în munca mea.',
    author: { name: 'Radu S.', initials: 'RS', tone: 'indigo' },
    role: 'Team Lead',
    mentorName: 'Mihai Popescu',
  },
]
