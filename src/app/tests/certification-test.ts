import { Test } from './types';
import { TEST_CATEGORIES } from './categories';

export const uniqueCertificationTest: Test = {
  id: 'next-14-unique-cert',
  category: TEST_CATEGORIES.CERTIFICATION,
  title: 'Next.js 14 Unique Certification Exam',
  description: 'A comprehensive examination covering distinct aspects of Next.js 14 development',
  metadata: {
    difficulty: 'mixed',
    duration: 90,
    passingScore: 75,
    totalQuestions: 20
  },
  questions: [
    {
      id: 'unique-b1',
      question: 'What is the purpose of the not-found.tsx file in Next.js 14?',
      options: [
        'To handle server errors',
        'To customize the 404 page for a route segment',
        'To redirect users to the homepage',
        'To show a loading state'
      ],
      correctAnswer: 1,
      difficulty: 'beginner',
      explanation: 'not-found.tsx allows customization of the 404 page for specific route segments, providing better user experience for missing content.'
    },
    {
      id: 'unique-b2',
      question: 'How do you disable client-side navigation for a specific link in Next.js 14?',
      options: [
        'By using standard <a> tags',
        'By setting prefetch={false} on Link component',
        'By adding the data-no-client attribute',
        'By using the scroll={false} prop'
      ],
      correctAnswer: 0,
      difficulty: 'beginner',
      explanation: 'Using standard <a> tags instead of Next.js Link component disables client-side navigation for specific links.'
    },
    {
      id: 'unique-b3',
      question: 'What is the purpose of searching params in Next.js 14 App Router?',
      options: [
        'To handle form submissions only',
        'To implement search functionality',
        'To access and handle URL search parameters',
        'To configure search engines'
      ],
      correctAnswer: 2,
      difficulty: 'beginner',
      explanation: 'searchParams in Next.js 14 App Router allows access to URL search parameters both in Server and Client Components.'
    },
    {
      id: 'unique-m1',
      question: 'How should you implement data revalidation in Next.js 14?',
      options: [
        'Using client-side polling',
        'Using revalidatePath() and revalidateTag()',
        'Only through API routes',
        'Manual cache clearing only'
      ],
      correctAnswer: 1,
      difficulty: 'intermediate',
      explanation: 'Next.js 14 provides revalidatePath() and revalidateTag() for efficient and targeted data revalidation.'
    },
    {
      id: 'unique-m2',
      question: 'What is the recommended way to handle forms in Next.js 14?',
      options: [
        'Using traditional form submissions',
        'Client-side JavaScript only',
        'Using external form libraries',
        'Using Server Actions with progressive enhancement'
      ],
      correctAnswer: 3,
      difficulty: 'intermediate',
      explanation: 'Server Actions with progressive enhancement provide the most robust form handling solution in Next.js 14.'
    },
    {
      id: 'unique-a1',
      question: 'How do you implement parallel routes in Next.js 14?',
      options: [
        'Using multiple pages',
        'Using parallel processing',
        'Using @folder naming convention with slots',
        'Using async components'
      ],
      correctAnswer: 2,
      difficulty: 'advanced',
      explanation: '@folder naming convention defines parallel route slots that can be rendered simultaneously.'
    },
    {
      id: 'unique-m3',
      question: 'What is the purpose of the metadata API in Next.js 14?',
      options: [
        'To handle meta tags automatically',
        'To configure build metadata',
        'To create SEO-friendly URLs',
        'To generate dynamic and static metadata for improved SEO'
      ],
      correctAnswer: 3,
      difficulty: 'intermediate',
      explanation: 'The metadata API enables both static and dynamic metadata generation for improved SEO and social sharing.'
    },
    {
      id: 'unique-a2',
      question: 'How do you implement streaming with React Suspense in Next.js 14?',
      options: [
        'Using WebSocket connections',
        'Using Suspense boundaries with loading.tsx',
        'Through server-sent events',
        'Using streaming API routes'
      ],
      correctAnswer: 1,
      difficulty: 'advanced',
      explanation: 'Streaming is implemented using Suspense boundaries with loading.tsx for progressive content loading.'
    },
    {
      id: 'unique-m4',
      question: 'What is the purpose of intercepting routes in Next.js 14?',
      options: [
        'To block route access',
        'To modify route parameters',
        'To handle route errors',
        'To show modals while preserving URL context'
      ],
      correctAnswer: 3,
      difficulty: 'intermediate',
      explanation: 'Intercepting routes allow showing modal-like content while maintaining the underlying URL context.'
    },
    {
      id: 'unique-b4',
      question: 'How do you handle static assets in Next.js 14?',
      options: [
        'Using the public directory',
        'Through external CDNs only',
        'Using database storage',
        'Using API routes'
      ],
      correctAnswer: 0,
      difficulty: 'beginner',
      explanation: 'The public directory is used for serving static assets that don\'t require processing.'
    },
    {
      id: 'unique-a3',
      question: 'How do you implement optimistic updates with Server Actions?',
      options: [
        'Using SWR',
        'Using React Query',
        'Using useOptimistic hook',
        'Using setState'
      ],
      correctAnswer: 2,
      difficulty: 'advanced',
      explanation: 'useOptimistic hook provides a way to implement optimistic updates with proper rollback handling.'
    },
    {
      id: 'unique-m5',
      question: 'What is partial prerendering in Next.js 14?',
      options: [
        'Prerendering only some pages',
        'A hybrid approach combining static and dynamic content',
        'Partial page loading',
        'Server-side rendering'
      ],
      correctAnswer: 1,
      difficulty: 'intermediate',
      explanation: 'Partial prerendering combines static shell generation with streaming dynamic content.'
    },
    {
      id: 'unique-b5',
      question: 'How do you handle environment variables in Next.js 14?',
      options: [
        'Using process.env directly',
        'Through configuration files',
        'Using NEXT_PUBLIC_ prefix for client exposure',
        'Using global variables'
      ],
      correctAnswer: 2,
      difficulty: 'beginner',
      explanation: 'NEXT_PUBLIC_ prefix is used to expose environment variables to the client.'
    },
    {
      id: 'unique-a4',
      question: 'How do you implement route handlers with streaming?',
      options: [
        'Using Response.json()',
        'Using new ReadableStream',
        'Using WebSocket',
        'Using HTTP/2'
      ],
      correctAnswer: 1,
      difficulty: 'advanced',
      explanation: 'ReadableStream enables implementing streaming responses in route handlers.'
    },
    {
      id: 'unique-m6',
      question: 'What is the purpose of generateStaticParams?',
      options: [
        'To validate parameters',
        'To handle dynamic routes',
        'To generate static paths at build time',
        'To create API endpoints'
      ],
      correctAnswer: 2,
      difficulty: 'intermediate',
      explanation: 'generateStaticParams generates static paths for dynamic routes at build time.'
    },
    {
      id: 'unique-b6',
      question: 'How do you implement proper error handling in Next.js 14?',
      options: [
        'Using global try-catch',
        'Using error.tsx files',
        'Using middleware',
        'Using external error tracking'
      ],
      correctAnswer: 1,
      difficulty: 'beginner',
      explanation: 'error.tsx files provide granular error handling for route segments.'
    },
    {
      id: 'unique-a5',
      question: 'How do you implement cache sharing between routes?',
      options: [
        'Using cache tags',
        'Using global state',
        'Using localStorage',
        'Using cookies'
      ],
      correctAnswer: 0,
      difficulty: 'advanced',
      explanation: 'Cache tags enable efficient cache sharing and revalidation between routes.'
    },
    {
      id: 'unique-m7',
      question: 'What is the purpose of the unstable_noStore() function?',
      options: [
        'To manage unstable connections',
        'To clear cache',
        'To opt out of caching',
        'To handle storage errors'
      ],
      correctAnswer: 2,
      difficulty: 'intermediate',
      explanation: 'unstable_noStore() opts out of caching for specific data fetches.'
    },
    {
      id: 'unique-b7',
      question: 'How do you handle middleware execution in Next.js 14?',
      options: [
        'Using config matchers',
        'Through API routes',
        'Using global middleware',
        'Using route handlers'
      ],
      correctAnswer: 0,
      difficulty: 'beginner',
      explanation: 'Middleware execution is controlled using config matcher patterns.'
    }
  ]
};