import { createBrowserRouter } from 'react-router'
import { ROUTES } from '@/constants'
import { AuthLayout } from '../layouts/AuthLayout'
import { PublicLayout } from '../layouts/PublicLayout'
import { RootLayout } from '../layouts/RootLayout'
import { RouteFallback } from '../pages/RouteFallback'
import { lazyPage } from './lazyPage'

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
            lazy: lazyPage(() => import('@/features/landing'), 'HomePage'),
          },
          {
            path: ROUTES.about,
            lazy: lazyPage(() => import('@/features/landing'), 'AboutPage'),
          },
          {
            path: ROUTES.community,
            lazy: lazyPage(() => import('@/features/landing'), 'CommunityPage'),
          },
          {
            path: ROUTES.reviews,
            lazy: lazyPage(() => import('@/features/landing'), 'ReviewsPage'),
          },
          {
            path: ROUTES.partners,
            lazy: lazyPage(() => import('@/features/landing'), 'PartnersPage'),
          },
          {
            path: ROUTES.mentorProfile,
            lazy: lazyPage(() => import('@/features/mentors'), 'MentorProfilePage'),
          },
          ...(import.meta.env.DEV
            ? [
                {
                  path: ROUTES.componentsPreview,
                  lazy: lazyPage(
                    () => import('../dev/ComponentsPreviewPage'),
                    'ComponentsPreviewPage',
                  ),
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
            lazy: lazyPage(() => import('@/features/auth'), 'LoginPage'),
          },
          {
            path: ROUTES.signup,
            lazy: lazyPage(() => import('@/features/auth'), 'SignupPage'),
          },
          {
            path: ROUTES.mentorSignup,
            lazy: lazyPage(() => import('@/features/auth'), 'MentorSignupPage'),
          },
          {
            path: ROUTES.forgotPassword,
            lazy: lazyPage(() => import('@/features/auth'), 'ForgotPasswordPage'),
          },
          {
            path: ROUTES.resetPassword,
            lazy: lazyPage(() => import('@/features/auth'), 'ResetPasswordPage'),
          },
          {
            path: '*',
            lazy: lazyPage(() => import('../pages/NotFoundPage'), 'NotFoundPage'),
          },
        ],
      },
      {
        lazy: lazyPage(() => import('../layouts/AccountLayout'), 'AccountLayout'),
        children: [
          {
            path: ROUTES.student,
            lazy: lazyPage(() => import('@/features/student'), 'StudentProfilePage'),
          },
          {
            path: ROUTES.quiz,
            lazy: lazyPage(() => import('@/features/quiz'), 'QuizPage'),
          },
          {
            path: ROUTES.quizResults,
            lazy: lazyPage(() => import('@/features/quiz'), 'QuizResultsPage'),
          },
          {
            path: ROUTES.topMentors,
            lazy: lazyPage(() => import('@/features/quiz'), 'TopMentorsPage'),
          },
          {
            path: ROUTES.mentors,
            lazy: lazyPage(() => import('@/features/mentors'), 'MentorSearchPage'),
          },
          {
            path: ROUTES.booking,
            lazy: lazyPage(() => import('@/features/booking'), 'BookingPage'),
          },
          {
            path: ROUTES.bookingSummary,
            lazy: lazyPage(() => import('@/features/booking'), 'SummaryPage'),
          },
          {
            path: ROUTES.bookingPayment,
            lazy: lazyPage(() => import('@/features/booking'), 'PaymentPage'),
          },
          {
            path: ROUTES.bookingConfirmed,
            lazy: lazyPage(() => import('@/features/booking'), 'ConfirmationPage'),
          },
          {
            path: ROUTES.reschedule,
            lazy: lazyPage(() => import('@/features/booking'), 'ReschedulePage'),
          },
          {
            path: ROUTES.rescheduleConfirmed,
            lazy: lazyPage(() => import('@/features/booking'), 'RescheduleConfirmedPage'),
          },
          {
            path: ROUTES.mentorReviews,
            lazy: lazyPage(() => import('@/features/reviews'), 'MentorReviewsPage'),
          },
          {
            path: ROUTES.writeReview,
            lazy: lazyPage(() => import('@/features/reviews'), 'WriteReviewPage'),
          },
          {
            path: ROUTES.projects,
            lazy: lazyPage(() => import('@/features/projects'), 'ProjectsPage'),
          },
          {
            path: ROUTES.mentor,
            lazy: lazyPage(() => import('@/features/mentor-dashboard'), 'MentorDashboardPage'),
          },
        ],
      },
    ],
  },
])
