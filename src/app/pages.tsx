/**
 * Pagini temporare, încărcate la cerere. Fiecare e înlocuită de tichetul ei, care o mută
 * în `features/<nume>/` (de ex. căutarea în SCRUM-292, login-ul în SCRUM-297).
 */
function PlaceholderPage({
  title,
  description = 'Pagina este în lucru.',
}: {
  title: string
  description?: string
}) {
  return (
    <section className="space-y-2">
      <h1 className="font-heading text-3xl font-bold">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </section>
  )
}

/** SCRUM-290 */
export function HomePage() {
  return (
    <PlaceholderPage
      title="Găsește mentorul potrivit"
      description="Mentorly te conectează cu profesioniști care te ghidează în carieră."
    />
  )
}

/** SCRUM-292 */
export const MentorSearchPage = () => <PlaceholderPage title="Caută mentori" />
/** SCRUM-297 */
export const LoginPage = () => <PlaceholderPage title="Intră în cont" />
/** SCRUM-295 */
export const RegisterMenteePage = () => <PlaceholderPage title="Înregistrare ca mentorat" />
/** SCRUM-296 */
export const RegisterMentorPage = () => <PlaceholderPage title="Înregistrare ca mentor" />
/** SCRUM-316 */
export const MenteeDashboardPage = () => <PlaceholderPage title="Panoul cursantului" />
/** SCRUM-321 și următoarele tichete M */
export const MentorDashboardPage = () => <PlaceholderPage title="Panoul mentorului" />
