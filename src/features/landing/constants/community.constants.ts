import type { CommunityQuestion } from '../types'

export const COMMUNITY_TEXT = {
  pageTitle: 'Comunitate Q&A – Mentorly',
  eyebrow: 'Învațăm împreună',
  title: 'Comunitate & întrebări frecvente',
  lead: 'Ai o nelămurire punctuală? Întreabă comunitatea și primește răspunsuri direct de la specialiști.',
  askQuestion: 'Adaugă o întrebare',
  answeredBy: 'Răspuns de la',
  verified: 'Mentor verificat',
  mentorTag: 'Mentor',
  stats: (answers: number, likes: number) => `${answers} răspunsuri · ${likes} aprecieri`,
} as const

export const COMMUNITY_QUESTIONS: readonly CommunityQuestion[] = [
  {
    id: 'interview-prep',
    category: 'Carieră',
    postedAt: 'acum 2 ore',
    title: 'Cum mă pregătesc pentru un interviu de angajare?',
    excerpt:
      'Am 3 ani experiență în frontend și vreau să fac tranziția spre un rol senior. Ce ar trebui să exersez înainte de interviu?',
    answeredBy: { name: 'Mihai Popescu', initials: 'MP', tone: 'sky' },
    answerCount: 12,
    likeCount: 34,
  },
  {
    id: 'ux-portfolio',
    category: 'Portofoliu',
    postedAt: 'ieri',
    title: 'Ce caută recruterii într-un portofoliu de UX?',
    excerpt: 'Lucrez la primul meu case study și nu știu cât de mult să detaliez procesul.',
    answeredBy: { name: 'Ana Marinescu', initials: 'AM', tone: 'violet' },
    answerCount: 8,
    likeCount: 27,
  },
]
