import { Test } from './types';
import { TEST_CATEGORIES } from './categories';

export const mixedConceptTest: Test = {
  id: 'mixed-concepts-2',
  category: TEST_CATEGORIES.MIXED,
  title: 'Next.js 14 Mixed Concepts - Theory and Best Practices',
  description: 'A comprehensive examination of Next.js 14 core concepts, patterns, and best practices without code implementation',
  metadata: {
    difficulty: 'intermediate',
    duration: 45,
    passingScore: 70,
    prerequisites: ['Basic React knowledge', 'Understanding of web fundamentals'],
    learningObjectives: [
      'Understand Next.js 14 architecture',
      'Master routing and data patterns',
      'Learn optimization techniques',
      'Implement best practices'
    ]
  },
  questions: [
    {
      id: 'mixed-1',
      question: 'What is the primary advantage of using parallel routes in Next.js 14?',
      options: [
        'To handle multiple database connections',
        'To render multiple pages simultaneously in different slots of the same layout',
        'To improve page load performance',
        'To enable client-side routing'
      ],
      correctAnswer: 1,
      explanation: 'Parallel routes allow simultaneous rendering of multiple pages in different slots within the same layout, enabling complex UI patterns like modals and split views.'
    },
    {
      id: 'mixed-2',
      question: 'How does Next.js 14 optimize image loading by default?',
      options: [
        'By using browser native lazy loading',
        'By converting all images to WebP format',
        'Through automatic size optimization, lazy loading, and modern formats based on browser support',
        'By reducing image quality automatically'
      ],
      correctAnswer: 2,
      explanation: 'Next.js Image component automatically handles size optimization, lazy loading, and serves modern formats like WebP when supported, while maintaining quality and preventing layout shift.'
    },
    {
      id: 'mixed-3',
      question: 'What is the recommended way to handle form submissions in Next.js 14?',
      options: [
        'Using traditional form submissions',
        'Using client-side JavaScript only',
        'Using API routes exclusively',
        'Using Server Actions with progressive enhancement'
      ],
      correctAnswer: 3,
      explanation: 'Server Actions provide progressive enhancement, ensuring forms work without JavaScript while adding optimistic updates and validation when JavaScript is available.'
    },
    {
      id: 'mixed-4',
      question: 'How should you implement route protection in Next.js 14?',
      options: [
        'Using page-level checks in each component',
        'Using middleware for route protection before rendering starts',
        'Using client-side redirects',
        'Using API routes for authentication'
      ],
      correctAnswer: 1,
      explanation: 'Middleware-based protection is most efficient as it runs before rendering begins, preventing unauthorized access at the edge.'
    },
    {
      id: 'mixed-5',
      question: 'What is the best practice for handling loading states in Next.js 14?',
      options: [
        'Using client-side loading spinners',
        'Using setTimeout for delayed rendering',
        'Using loading.tsx files with Suspense boundaries',
        'Using global loading state'
      ],
      correctAnswer: 2,
      explanation: 'loading.tsx files combined with Suspense boundaries provide instant loading states and streaming content loading, improving perceived performance.'
    },
    {
      id: 'mixed-6',
      question: 'How should you implement error handling in Next.js 14?',
      options: [
        'Using try-catch blocks everywhere',
        'Using global error handlers',
        'Using error.tsx files for granular error boundaries',
        'Using client-side error states'
      ],
      correctAnswer: 2,
      explanation: 'error.tsx files provide granular error boundaries that can handle errors at different levels of the application while enabling recovery options.'
    },
    {
      id: 'mixed-7',
      question: 'What is the correct approach to data revalidation in Next.js 14?',
      options: [
        'Using client-side polling',
        'Using webhooks exclusively',
        'Using cache invalidation only',
        'Using a combination of time-based, on-demand, and tag-based revalidation'
      ],
      correctAnswer: 3,
      explanation: 'A combination of revalidation strategies (time-based, on-demand, and tag-based) provides the most flexible and efficient way to keep data fresh.'
    },
    {
      id: 'mixed-8',
      question: 'How should you handle state management in Next.js 14?',
      options: [
        'Always using global state management',
        'Using server state when possible, client state when necessary',
        'Using only client-side state',
        'Using only server-side state'
      ],
      correctAnswer: 1,
      explanation: 'Using server state by default and client state only when needed for interactivity provides the best balance of performance and functionality.'
    },
    {
      id: 'mixed-9',
      question: 'What is the best practice for handling dynamic routes in Next.js 14?',
      options: [
        'Using only static routes',
        'Using API routes for all dynamic content',
        'Using generateStaticParams with selective dynamic rendering',
        'Using client-side routing exclusively'
      ],
      correctAnswer: 2,
      explanation: 'Using generateStaticParams for known paths while allowing dynamic rendering for unknown paths provides the best balance of performance and flexibility.'
    },
    {
      id: 'mixed-10',
      question: 'How should you implement metadata in Next.js 14?',
      options: [
        'Using traditional meta tags',
        'Using third-party SEO libraries',
        'Using static exports only',
        'Using the Metadata API with dynamic and static options'
      ],
      correctAnswer: 3,
      explanation: 'The Metadata API provides the most flexible and type-safe way to handle both static and dynamic metadata, with proper template support.'
    },
    {
      id: 'mixed-11',
      question: 'What is the purpose of intercepting routes in Next.js 14?',
      options: [
        'To prevent route access',
        'To modify route parameters',
        'To display content in a modal while preserving URL context',
        'To handle 404 errors'
      ],
      correctAnswer: 2,
      explanation: 'Intercepting routes allow displaying content in different contexts (like modals) while maintaining the original URL and navigation state.'
    },
    {
      id: 'mixed-12',
      question: 'How does Next.js 14 handle partial prerendering?',
      options: [
        'By prerendering all pages',
        'Using static generation only',
        'Combining static shells with streaming dynamic content',
        'Through client-side rendering'
      ],
      correctAnswer: 2,
      explanation: 'Partial prerendering combines static shell generation with streaming dynamic content, providing optimal initial load performance and dynamic content delivery.'
    },
    {
      id: 'mixed-13',
      question: 'What is the recommended way to implement authentication in Next.js 14?',
      options: [
        'Using client-side auth only',
        'Through custom implementations',
        'Using NextAuth.js with middleware-based protection',
        'Using basic authentication'
      ],
      correctAnswer: 2,
      explanation: 'NextAuth.js with middleware-based protection provides a secure, flexible authentication solution with proper session handling and route protection.'
    },
    {
      id: 'mixed-14',
      question: 'How should you handle data fetching in Server Components?',
      options: [
        'Using SWR or React Query',
        'Using native fetch with proper caching strategies',
        'Through client-side fetching',
        'Using global state management'
      ],
      correctAnswer: 1,
      explanation: 'Server Components work best with native fetch and built-in caching strategies, providing optimal performance and data freshness.'
    },
    {
      id: 'mixed-15',
      question: 'What is the purpose of route groups in Next.js 14?',
      options: [
        'To improve SEO',
        'For code organization without affecting URL structure',
        'To handle authentication',
        'To manage API routes'
      ],
      correctAnswer: 1,
      explanation: 'Route groups (folders wrapped in parentheses) allow logical code organization and shared layouts without affecting the URL structure.'
    },
    {
      id: 'mixed-16',
      question: 'How should you implement streaming in Next.js 14?',
      options: [
        'Using WebSockets',
        'Through Suspense boundaries and loading.tsx files',
        'Using server-sent events',
        'With client-side streaming'
      ],
      correctAnswer: 1,
      explanation: 'Streaming in Next.js 14 is best implemented using Suspense boundaries and loading.tsx files for progressive content loading.'
    },
    {
      id: 'mixed-17',
      question: 'What is the best practice for handling environment variables in Next.js 14?',
      options: [
        'Storing them in public files',
        'Using process.env directly',
        'Using appropriate prefixes based on client/server usage',
        'Hardcoding values'
      ],
      correctAnswer: 2,
      explanation: 'Environment variables should use appropriate prefixes (NEXT_PUBLIC_ for client exposure) and be accessed according to their server/client context.'
    },
    {
      id: 'mixed-18',
      question: 'How should you implement data mutations in Next.js 14?',
      options: [
        'Using client-side mutations',
        'Through direct database calls',
        'Using Server Actions with optimistic updates',
        'With RESTful APIs only'
      ],
      correctAnswer: 2,
      explanation: 'Server Actions with optimistic updates provide the most efficient and secure way to handle data mutations while maintaining good UX.'
    },
    {
      id: 'mixed-19',
      question: 'What is the correct way to handle static assets in Next.js 14?',
      options: [
        'Storing them in any directory',
        'Using the public directory for unprocessed assets',
        'Always using external CDNs',
        'Through database storage'
      ],
      correctAnswer: 1,
      explanation: 'The public directory is designed for storing static assets that don\'t require processing and need a static URL.'
    },
    {
      id: 'mixed-20',
      question: 'How should you implement internationalization in Next.js 14?',
      options: [
        'Using client-side translation only',
        'Through manual implementations',
        'Using built-in routing and middleware support',
        'With external translation services'
      ],
      correctAnswer: 2,
      explanation: 'Next.js 14 provides built-in support for internationalization through routing patterns and middleware for locale detection.'
    }
  ]
};