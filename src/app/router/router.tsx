import { createBrowserRouter } from 'react-router'
import { ACCOUNT_PLACEHOLDER_TEXT, ROUTES } from '@/constants'
import { AuthLayout } from '../layouts/AuthLayout'
import { PublicLayout } from '../layouts/PublicLayout'
import { RootLayout } from '../layouts/RootLayout'
import { AccountPlaceholderPage } from '../pages/AccountPlaceholderPage'
import { RouteFallback } from '../pages/RouteFallback'

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    HydrateFallback: RouteFallback,
    children: [
      {
        Component: PublicLayout,
        children: [
          {
            index: true,
            lazy: async () => ({ Component: (await import('@/features/landing')).HomePage }),
          },
          {
            path: ROUTES.about,
            lazy: async () => ({ Component: (await import('@/features/landing')).AboutPage }),
          },
          {
            path: ROUTES.community,
            lazy: async () => ({ Component: (await import('@/features/landing')).CommunityPage }),
          },
          {
            path: ROUTES.reviews,
            lazy: async () => ({ Component: (await import('@/features/landing')).ReviewsPage }),
          },
          {
            path: ROUTES.partners,
            lazy: async () => ({ Component: (await import('@/features/landing')).PartnersPage }),
          },
          {
            path: ROUTES.mentorProfile,
            lazy: async () => ({
              Component: (await import('@/features/mentors')).MentorProfilePage,
            }),
          },
          ...(import.meta.env.DEV
            ? [
                {
                  path: ROUTES.componentsPreview,
                  lazy: async () => ({
                    Component: (await import('../dev/ComponentsPreviewPage')).ComponentsPreviewPage,
                  }),
                },
              ]
            : []),
        ],
      },
      {
        Component: AuthLayout,
        children: [
          {
            path: ROUTES.login,
            lazy: async () => ({ Component: (await import('@/features/auth')).LoginPage }),
          },
          {
            path: ROUTES.signup,
            lazy: async () => ({ Component: (await import('@/features/auth')).SignupPage }),
          },
          {
            path: ROUTES.mentorSignup,
            lazy: async () => ({
              Component: (await import('@/features/auth')).MentorSignupPage,
            }),
          },
          {
            path: ROUTES.forgotPassword,
            lazy: async () => ({
              Component: (await import('@/features/auth')).ForgotPasswordPage,
            }),
          },
          {
            path: ROUTES.resetPassword,
            lazy: async () => ({
              Component: (await import('@/features/auth')).ResetPasswordPage,
            }),
          },
          {
            path: '*',
            lazy: async () => ({ Component: (await import('../pages/NotFoundPage')).NotFoundPage }),
          },
        ],
      },
      {
        lazy: async () => ({
          Component: (await import('../layouts/AccountLayout')).AccountLayout,
        }),
        children: [
          {
            path: ROUTES.student,
            element: <AccountPlaceholderPage {...ACCOUNT_PLACEHOLDER_TEXT.student} />,
          },
          {
            path: ROUTES.quiz,
            lazy: async () => ({ Component: (await import('@/features/quiz')).QuizPage }),
          },
          {
            path: ROUTES.quizResults,
            lazy: async () => ({ Component: (await import('@/features/quiz')).QuizResultsPage }),
          },
          {
            path: ROUTES.topMentors,
            lazy: async () => ({ Component: (await import('@/features/quiz')).TopMentorsPage }),
          },
          {
            path: ROUTES.mentors,
            lazy: async () => ({
              Component: (await import('@/features/mentors')).MentorSearchPage,
            }),
          },
          {
            path: ROUTES.booking,
            lazy: async () => ({ Component: (await import('@/features/booking')).BookingPage }),
          },
          {
            path: ROUTES.bookingSummary,
            lazy: async () => ({ Component: (await import('@/features/booking')).SummaryPage }),
          },
          {
            path: ROUTES.bookingPayment,
            lazy: async () => ({ Component: (await import('@/features/booking')).PaymentPage }),
          },
          {
            path: ROUTES.bookingConfirmed,
            lazy: async () => ({
              Component: (await import('@/features/booking')).ConfirmationPage,
            }),
          },
          {
            path: ROUTES.reschedule,
            lazy: async () => ({ Component: (await import('@/features/booking')).ReschedulePage }),
          },
          {
            path: ROUTES.rescheduleConfirmed,
            lazy: async () => ({
              Component: (await import('@/features/booking')).RescheduleConfirmedPage,
            }),
          },
          {
            path: ROUTES.mentorReviews,
            lazy: async () => ({
              Component: (await import('@/features/reviews')).MentorReviewsPage,
            }),
          },
          {
            path: ROUTES.writeReview,
            lazy: async () => ({ Component: (await import('@/features/reviews')).WriteReviewPage }),
          },
          {
            path: ROUTES.mentor,
            element: <AccountPlaceholderPage {...ACCOUNT_PLACEHOLDER_TEXT.mentor} />,
          },
        ],
      },
    ],
  },
])
