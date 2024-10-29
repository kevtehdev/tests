import { Test } from './types';
import { TEST_CATEGORIES } from './categories';

export const nextjsExamPrepTest: Test = {
  id: 'nextjs-14-exam-prep',
  category: TEST_CATEGORIES.EXAM_PREP,
  title: 'Next.js 14 Examination Preparation',
  description: 'Comprehensive exam preparation with unique scenarios and practical implementations in Next.js 14',
  metadata: {
    difficulty: 'intermediate',
    duration: 60,
    passingScore: 70,
    totalQuestions: 20
  },
  questions: [
    {
      id: 'prep-1',
      question: 'When implementing a dashboard with real-time updates in Next.js 14, what is the most efficient approach?',
      options: [
        'Using WebSocket connections directly in Client Components',
        'Using Server-Sent Events with streaming Server Components',
        'Using polling with useEffect in Client Components',
        'Using SWR with automatic revalidation'
      ],
      correctAnswer: 1,
      explanation: 'Server-Sent Events with streaming Server Components provide efficient real-time updates while maintaining server-side benefits and reducing client-side JavaScript.'
    },
    {
      id: 'prep-2',
      question: 'How should you handle file uploads with progress tracking in Next.js 14?',
      options: [
        'Using Server Actions with custom FormData handling',
        'Using traditional multipart/form-data with API routes',
        'Using client-side upload libraries exclusively',
        'Using the built-in Upload component'
      ],
      correctAnswer: 0,
      explanation: 'Server Actions with FormData provide built-in support for file uploads, allowing for progress tracking and optimistic updates while maintaining progressive enhancement.'
    },
    {
      id: 'prep-3',
      question: 'What is the best practice for implementing infinite scrolling in Next.js 14?',
      options: [
        'Using client-side pagination with useEffect',
        'Using intersection observer with URL-based pagination',
        'Using the useInfiniteQuery hook from React Query',
        'Using Server Components with page segments and Suspense'
      ],
      correctAnswer: 3,
      explanation: 'Using Server Components with page segments and Suspense provides the best performance for infinite scrolling, maintaining SEO benefits and reducing client-side code.'
    },
    {
      id: 'prep-4',
      question: 'How should you implement dynamic OG images in Next.js 14?',
      options: [
        'Using external image generation services',
        'Using route handlers with Canvas API',
        'Using @vercel/og library in a route handler',
        'Using static image templates'
      ],
      correctAnswer: 2,
      explanation: 'The @vercel/og library in route handlers provides efficient, dynamic OG image generation with caching and edge runtime support.'
    },
    {
      id: 'prep-5',
      question: 'When implementing a shopping cart in Next.js 14, what is the recommended approach?',
      options: [
        'Using localStorage with client-state management',
        'Using Server Components with cookies for state',
        'Using Server Actions with optimistic updates and server-side storage',
        'Using session storage with React Context'
      ],
      correctAnswer: 2,
      explanation: 'Server Actions with optimistic updates provide the best user experience while maintaining data consistency and enabling server-side validation.'
    },
    {
      id: 'prep-6',
      question: 'How should you handle complex form validation in Next.js 14?',
      options: [
        'Using client-side validation libraries exclusively',
        'Using Server Actions with Zod and client hints',
        'Using API routes for validation',
        'Using form element validation attributes'
      ],
      correctAnswer: 1,
      explanation: 'Server Actions with Zod provide type-safe validation on both client and server, with proper error handling and progressive enhancement.'
    },
    {
      id: 'prep-7',
      question: 'What is the correct way to implement route-based code splitting in Next.js 14?',
      options: [
        'Using dynamic imports in page components',
        'Using the "use client" boundary strategically',
        'Creating separate bundles manually',
        'Using route groups with shared components'
      ],
      correctAnswer: 1,
      explanation: 'Strategic placement of "use client" boundaries helps optimize bundle splitting while maintaining proper hydration boundaries.'
    },
    {
      id: 'prep-8',
      question: 'How should you implement permission-based UI rendering in Next.js 14?',
      options: [
        'Using client-side permission checks',
        'Using Server Components with session data',
        'Using middleware for all permission checks',
        'Using HOCs for permission wrapping'
      ],
      correctAnswer: 1,
      explanation: 'Server Components can efficiently handle permission-based UI rendering using session data, preventing unauthorized content from even being sent to the client.'
    },
    {
      id: 'prep-9',
      question: 'What is the most efficient way to handle dynamic imports with TypeScript in Next.js 14?',
      options: [
        'Using require statements',
        'Using async components with suspense',
        'Using the dynamic function with proper types',
        'Using import statements directly'
      ],
      correctAnswer: 2,
      explanation: 'The dynamic function with proper TypeScript types provides the best balance of type safety and code splitting capabilities.'
    },
    {
      id: 'prep-10',
      question: 'How should you implement search functionality with filters in Next.js 14?',
      options: [
        'Using client-side filtering exclusively',
        'Using URL search params with Server Components',
        'Using local state management',
        'Using API routes for all searches'
      ],
      correctAnswer: 1,
      explanation: 'URL search params with Server Components provide shareable URLs, SEO benefits, and efficient server-side filtering.'
    },
    {
      id: 'prep-11',
      question: 'What is the best practice for handling form state persistence across navigations?',
      options: [
        'Using localStorage to save form state',
        'Using URL state with searchParams',
        'Using cookies for form data',
        'Using Server Actions with temporary storage'
      ],
      correctAnswer: 3,
      explanation: 'Server Actions with temporary storage provide the best balance of data persistence and security while maintaining form state across navigations.'
    },
    {
      id: 'prep-12',
      question: 'How should you implement rate limiting in Next.js 14?',
      options: [
        'Using third-party rate limiting services',
        'Using Redis with API routes',
        'Using Edge Middleware with distributed rate limiting',
        'Using local memory cache'
      ],
      correctAnswer: 2,
      explanation: 'Edge Middleware with distributed rate limiting provides the most efficient and scalable solution for request throttling.'
    },
    {
      id: 'prep-13',
      question: 'What is the recommended approach for handling PDF generation in Next.js 14?',
      options: [
        'Using client-side PDF libraries',
        'Using Puppeteer in API routes',
        'Using Edge Runtime with React PDF',
        'Using external PDF services'
      ],
      correctAnswer: 2,
      explanation: 'Edge Runtime with React PDF provides efficient, scalable PDF generation without the overhead of spinning up browser instances.'
    },
    {
      id: 'prep-14',
      question: 'How should you implement optimistic updates with error recovery?',
      options: [
        'Using try-catch blocks with state rollback',
        'Using useOptimistic with error boundary fallbacks',
        'Using SWR mutation hooks',
        'Using global error handling'
      ],
      correctAnswer: 1,
      explanation: 'useOptimistic with error boundary fallbacks provides the best user experience while ensuring proper error recovery and state management.'
    },
    {
      id: 'prep-15',
      question: 'What is the best practice for implementing a multi-step form in Next.js 14?',
      options: [
        'Using URL parameters for step tracking',
        'Using client state management',
        'Using Server Actions with step validation',
        'Using separate routes for each step'
      ],
      correctAnswer: 2,
      explanation: 'Server Actions with step validation provide proper validation, state management, and the ability to save progress server-side.'
    },
    {
      id: 'prep-16',
      question: 'How should you handle WebSocket connections in Next.js 14?',
      options: [
        'Using client-side WebSocket connections',
        'Using Edge Runtime with WebSocket handlers',
        'Using Socket.io with API routes',
        'Using Server-Sent Events instead'
      ],
      correctAnswer: 1,
      explanation: 'Edge Runtime with WebSocket handlers provides the most efficient real-time communication with proper connection management.'
    },
    {
      id: 'prep-17',
      question: 'What is the best approach for implementing a custom 404 page with data?',
      options: [
        'Using static not-found.tsx',
        'Using dynamic not-found.tsx with fetch',
        'Using error.tsx with 404 check',
        'Using middleware redirection'
      ],
      correctAnswer: 1,
      explanation: 'Dynamic not-found.tsx with fetch allows you to include dynamic data in your 404 pages while maintaining good SEO.'
    },
    {
      id: 'prep-18',
      question: 'How should you implement proper error tracking in Next.js 14?',
      options: [
        'Using console.error logging',
        'Using error.tsx with external service integration',
        'Using global error handlers',
        'Using middleware for all errors'
      ],
      correctAnswer: 1,
      explanation: 'error.tsx with external service integration provides granular error tracking while maintaining proper error boundaries and recovery options.'
    },
    {
      id: 'prep-19',
      question: 'What is the recommended way to handle dynamic sitemap generation?',
      options: [
        'Using static sitemap.xml',
        'Using API routes for sitemap',
        'Using route handlers with incremental generation',
        'Using external sitemap services'
      ],
      correctAnswer: 2,
      explanation: 'Route handlers with incremental generation provide efficient, dynamic sitemap generation with proper caching and updates.'
    },
    {
      id: 'prep-20',
      question: 'How should you implement proper cache warming in Next.js 14?',
      options: [
        'Using cron jobs with API routes',
        'Using ISR with short intervals',
        'Using route handlers with distributed cache warming',
        'Using client-side prefetching'
      ],
      correctAnswer: 2,
      explanation: 'Route handlers with distributed cache warming provide efficient cache population while maintaining performance and resource usage.'
    }
  ]
};