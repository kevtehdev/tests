import { Test } from './types';
import { TEST_CATEGORIES } from './categories';

export const nextjs14CoreExamTest: Test = {
  id: 'nextjs-14-core-exam',
  category: TEST_CATEGORIES.ESSENTIAL_CERT,
  title: 'Next.js 14 Core Concepts Certification Test',
  description: 'Essential concepts and patterns required for Next.js 14 certification, focusing on the most important features and best practices',
  metadata: {
    difficulty: 'certification-ready',
    duration: 45,
    passingScore: 75,
    totalQuestions: 20,
  },
  questions: [
    {
      id: 'core-1',
      question: 'When deciding between Server and Client Components in Next.js 14, what is the primary factor to consider?',
      options: [
        'Server Components are always faster',
        'Client Components should be used for all interactive elements',
        'Server Components for non-interactive UI that needs backend resources, Client Components only when client-side interactivity is needed',
        'Server Components should only be used for data fetching'
      ],
      correctAnswer: 2,
      explanation: 'The key principle is to use Server Components by default for better performance and direct backend access, only switching to Client Components when you need client-side interactivity like event listeners or useState/useEffect.'
    },
    {
      id: 'core-2',
      question: 'What is the most efficient way to implement data mutations in Next.js 14?',
      options: [
        'Using API routes with fetch',
        'Client-side state management with SWR',
        'Server Actions with progressive enhancement and optimistic updates',
        'Direct database calls from components'
      ],
      correctAnswer: 2,
      explanation: 'Server Actions provide the most efficient pattern for data mutations as they combine progressive enhancement (working without JS), type safety, direct backend access, and support for optimistic updates.'
    },
    {
      id: 'core-3',
      question: 'How should you architect your Next.js 14 application for optimal performance?',
      options: [
        'Use Client Components everywhere for consistency',
        'Keep all components as Server Components and use APIs for data',
        'Start with Server Components, add Client Components at the leaves for interactivity, and use Suspense for streaming',
        'Convert all components to static pages'
      ],
      correctAnswer: 2,
      explanation: 'The recommended architecture is to keep components as Server Components by default for better performance, only adding Client Components at the leaf nodes where interactivity is needed, and using Suspense boundaries for progressive loading.'
    },
    {
      id: 'core-4',
      question: 'What is the correct implementation of route handlers in Next.js 14?',
      options: [
        'Creating API routes in the pages/api directory',
        'Using route.ts files in the app directory with proper HTTP methods and Response objects',
        'Always using getServerSideProps for data fetching',
        'Implementing middleware for all routes'
      ],
      correctAnswer: 1,
      explanation: 'Route handlers in Next.js 14 should be implemented using route.ts files in the app directory, leveraging the Web Request and Response APIs, and proper HTTP methods for RESTful endpoints.'
    },
    {
      id: 'core-5',
      question: 'How should you handle data fetching and caching in Next.js 14?',
      options: [
        'Always use SWR or React Query',
        'Use fetch with proper cache options in Server Components, revalidate with tags and paths',
        'Rely on browser caching only',
        'Always fetch data client-side'
      ],
      correctAnswer: 1,
      explanation: 'Next.js 14 provides powerful data fetching capabilities using fetch with cache options in Server Components, combined with granular revalidation using tags and paths for efficient cache management.'
    },
    {
      id: 'core-6',
      question: 'What is the most important consideration when implementing routing in Next.js 14?',
      options: [
        'Using pages directory for all routes',
        'Understanding parallel routes, intercepting routes, and route groups for complex UI patterns',
        'Avoiding dynamic routes',
        'Always using client-side routing'
      ],
      correctAnswer: 1,
      explanation: 'Understanding and properly implementing Next.js 14\'s routing patterns (parallel routes for simultaneous rendering, intercepting routes for modals, and route groups for organization) is crucial for building modern applications.'
    },
    {
      id: 'core-7',
      question: 'How should form submissions be handled in Next.js 14?',
      options: [
        'Always use controlled forms with useState',
        'Use Server Actions with progressive enhancement, supporting both JavaScript and non-JavaScript scenarios',
        'Submit all forms to API routes',
        'Use client-side validation only'
      ],
      correctAnswer: 1,
      explanation: 'Forms should be implemented using Server Actions with progressive enhancement, ensuring they work without JavaScript while adding optimistic updates and client-side enhancements when available.'
    },
    {
      id: 'core-8',
      question: 'What is the correct approach to loading UI and streaming in Next.js 14?',
      options: [
        'Show loading spinners for everything',
        'Load all data before rendering anything',
        'Use loading.tsx files with Suspense boundaries for instant loading states and progressive streaming',
        'Rely on client-side loading states'
      ],
      correctAnswer: 2,
      explanation: 'Next.js 14\'s loading.tsx files combined with Suspense boundaries provide instant loading states while enabling streaming content, improving perceived performance and user experience.'
    },
    {
      id: 'core-9',
      question: 'How should authentication be implemented in Next.js 14?',
      options: [
        'Using client-side authentication only',
        'Implementing JWT validation in API routes',
        'Using middleware for route protection with NextAuth.js, combining Server Components for session handling',
        'Storing credentials in localStorage'
      ],
      correctAnswer: 2,
      explanation: 'Authentication should be implemented using middleware for route protection, combined with NextAuth.js and Server Components for secure session handling and efficient server-side validation.'
    },
    {
      id: 'core-10',
      question: 'What is the best practice for handling errors in Next.js 14?',
      options: [
        'Using try-catch blocks everywhere',
        'Global error handler only',
        'Implementing error.tsx files strategically with proper error boundaries and recovery options',
        'Logging errors to console'
      ],
      correctAnswer: 2,
      explanation: 'Error handling should be implemented using error.tsx files at appropriate levels, creating error boundaries that can handle different types of errors and provide recovery options while maintaining good UX.'
    },
    {
        id: 'core-11',
        question: 'What is the significance of partial prerendering in Next.js 14?',
        options: [
          'It only renders the header and footer',
          'It combines static shell generation with dynamic content streaming',
          'It preloads all page assets',
          'It partially loads images'
        ],
        correctAnswer: 1,
        explanation: 'Partial prerendering is a key Next.js 14 feature that provides optimal performance by generating a static shell instantly while streaming in dynamic content, combining the benefits of static and dynamic rendering.'
      },
      {
        id: 'core-12',
        question: 'How should you handle metadata and SEO in Next.js 14?',
        options: [
          'Using traditional meta tags',
          'Client-side meta tag updates',
          'Using the Metadata API with generateMetadata for dynamic metadata',
          'Manually updating document head'
        ],
        correctAnswer: 2,
        explanation: 'Next.js 14\'s Metadata API with generateMetadata function provides the most powerful way to handle both static and dynamic metadata, ensuring good SEO practices and social sharing capabilities.'
      },
      {
        id: 'core-13',
        question: 'What is the correct approach to implementing client-side interactivity in Next.js 14?',
        options: [
          'Making all components Client Components',
          'Using "use client" directive only at the component level where interactivity is needed',
          'Avoiding client-side interactivity',
          'Using only Server Components'
        ],
        correctAnswer: 1,
        explanation: 'The "use client" directive should be used strategically only at the component level where client-side interactivity is needed, minimizing the client-side JavaScript bundle.'
      },
      {
        id: 'core-14',
        question: 'How should data revalidation be handled in Next.js 14?',
        options: [
          'Always using ISR with fixed revalidate times',
          'Client-side polling',
          'Using a combination of time-based, on-demand, and tag-based revalidation based on data requirements',
          'Manual cache clearing'
        ],
        correctAnswer: 2,
        explanation: 'Next.js 14 provides multiple revalidation strategies that should be used in combination based on data requirements: time-based for regular updates, on-demand for immediate updates, and tag-based for related data.'
      },
      {
        id: 'core-15',
        question: 'What is the importance of route groups in Next.js 14?',
        options: [
          'They improve SEO',
          'They enable code organization without affecting URL structure',
          'They speed up routing',
          'They are required for authentication'
        ],
        correctAnswer: 1,
        explanation: 'Route groups (using parentheses) are crucial for organizing code and layouts logically without affecting the URL structure, enabling better code organization and shared layouts.'
      },
      {
        id: 'core-16',
        question: 'How should you handle environment variables in Next.js 14?',
        options: [
          'Using process.env directly everywhere',
          'Storing all variables in public files',
          'Using NEXT_PUBLIC_ prefix for client-exposed variables and keeping server variables private',
          'Using environment variables only in API routes'
        ],
        correctAnswer: 2,
        explanation: 'Environment variables must be handled securely by using the NEXT_PUBLIC_ prefix only for variables that need client exposure, keeping sensitive variables restricted to server-side code.'
      },
      {
        id: 'core-17',
        question: 'What is the recommended way to implement search functionality in Next.js 14?',
        options: [
          'Using client-side filtering only',
          'Using searchParams with Server Components for URL-based search',
          'Always using external search services',
          'Implementing search in API routes only'
        ],
        correctAnswer: 1,
        explanation: 'Search functionality should be implemented using searchParams with Server Components, enabling URL-based search that is shareable, SEO-friendly, and efficient.'
      },
      {
        id: 'core-18',
        question: 'How should you optimize images in Next.js 14?',
        options: [
          'Using standard img tags',
          'Manually optimizing all images',
          'Using next/image component with proper sizing and formats',
          'Always serving WebP format'
        ],
        correctAnswer: 2,
        explanation: 'The next/image component should be used with proper sizing, formats, and loading strategies to optimize images automatically while preventing layout shift.'
      },
      {
        id: 'core-19',
        question: 'What is the best practice for handling data fetching errors in Next.js 14?',
        options: [
          'Using try-catch in components',
          'Global error handling',
          'Using error.tsx files with notFound() and proper error boundaries',
          'Showing generic error messages'
        ],
        correctAnswer: 2,
        explanation: 'Error handling should use error.tsx files strategically with notFound() when appropriate, creating proper error boundaries that can handle different types of errors gracefully.'
      },
      {
        id: 'core-20',
        question: 'How should you implement internationalization in Next.js 14?',
        options: [
          'Using client-side translation libraries only',
          'Implementing route handlers for each language',
          'Using App Router subdirectory routing with middleware for locale detection',
          'Manual language switching'
        ],
        correctAnswer: 2,
        explanation: 'Internationalization should be implemented using App Router\'s subdirectory routing pattern combined with middleware for locale detection and routing, providing a scalable and SEO-friendly solution.'
      },
  ]
}