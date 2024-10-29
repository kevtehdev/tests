import { Test } from './types';
import { TEST_CATEGORIES } from './categories';

export const mixedTest: Test = {
  id: 'mixed-fundamentals',
  category: TEST_CATEGORIES.MIXED,
  title: 'Next.js 14 Mixed Concepts Test',
  description: 'A comprehensive test covering various aspects of Next.js 14, from basic concepts to advanced implementations',
  metadata: {
    difficulty: 'intermediate',
    duration: 45,
    passingScore: 70
  },
  questions: [
    {
      id: 'mix1',
      question: 'What is the primary difference between Server and Client Components in Next.js 14?',
      options: [
        'Server Components only work with API routes, while Client Components work with pages',
        'Server Components render on the server and reduce client-side JavaScript, while Client Components enable client-side interactivity',
        'Server Components are faster but cannot access the database, while Client Components can',
        'Server Components require special server configuration, while Client Components work out of the box'
      ],
      correctAnswer: 1,
      explanation: 'Server Components render on the server, reducing client-side JavaScript bundle size and enabling direct backend access, while Client Components are necessary for interactive features requiring client-side JavaScript.'
    },
    {
      id: 'mix2',
      question: 'When implementing parallel routes in Next.js 14, what does the @ symbol indicate in folder names?',
      options: [
        'It specifies a route that should be prerendered at build time',
        'It marks the folder as a private route not accessible to users',
        'It defines a parallel route slot that can be rendered simultaneously with its siblings',
        'It indicates an authentication-required route'
      ],
      correctAnswer: 2,
      explanation: 'The @ symbol in folder names indicates a parallel route slot, allowing multiple pages to be rendered simultaneously in the same layout.'
    },
    {
      id: 'mix3',
      question: 'What is the purpose of the app/template.tsx file in Next.js 14?',
      options: [
        'It configures the application\'s metadata',
        'It creates a new instance of its UI for each child route segment, preserving state on soft navigation',
        'It defines the global layout that wraps all pages',
        'It provides template strings for internationalization'
      ],
      correctAnswer: 1,
      explanation: 'template.tsx creates a new instance of the UI wrapper for each child route segment, unlike layout.tsx which reuses the same instance. This is useful for preserving state during navigation.'
    },
    {
      id: 'mix4',
      question: 'How does route caching work in Next.js 14\'s App Router?',
      options: [
        'It doesn\'t support caching for dynamic routes',
        'It requires manual cache configuration for each route',
        'It automatically caches route segments on the server and revalidates based on specified conditions',
        'It only caches static pages generated at build time'
      ],
      correctAnswer: 2,
      explanation: 'Next.js 14 automatically implements route caching on the server, storing rendered segments and revalidating them based on the specified cache configuration.'
    },
    {
      id: 'mix5',
      question: 'What is the purpose of intercepting routes in Next.js 14?',
      options: [
        'To handle 404 errors for undefined routes',
        'To load a route within the current layout while keeping the context of the current page',
        'To prevent unauthorized access to certain routes',
        'To redirect users based on authentication status'
      ],
      correctAnswer: 1,
      explanation: 'Intercepting routes allow you to load certain routes within the current layout while maintaining context, useful for modal patterns or overlays.'
    },
    {
      id: 'mix6',
      question: 'What is the role of the default.js file in Next.js 14 parallel routes?',
      options: [
        'It configures default error handling',
        'It sets default styling for the application',
        'It provides fallback content when a parallel route slot is not filled',
        'It defines default metadata for all routes'
      ],
      correctAnswer: 2,
      explanation: 'default.js serves as fallback content when a parallel route slot doesn\'t have matching content for the current route segment.'
    },
    {
      id: 'mix7',
      question: 'How does streaming work in Next.js 14?',
      options: [
        'It requires a special streaming server setup',
        'It progressively renders UI components using Suspense boundaries, showing immediate loading states',
        'It only streams video and audio content',
        'It only works with static content'
      ],
      correctAnswer: 1,
      explanation: 'Streaming in Next.js 14 allows progressive rendering of UI components using Suspense boundaries, improving perceived loading performance by showing immediate loading states.'
    },
    {
      id: 'mix8',
      question: 'What is the purpose of route groups in Next.js 14?',
      options: [
        'To create route aliases',
        'To combine multiple routes into a single page',
        'To organize routes without affecting the URL structure and share common layouts',
        'To group routes for authentication purposes only'
      ],
      correctAnswer: 2,
      explanation: 'Route groups, created using (folderName), allow organization of routes and sharing of common layouts without affecting the URL structure.'
    },
    {
      id: 'mix9',
      question: 'How does Next.js 14 handle static and dynamic rendering?',
      options: [
        'It requires manual configuration for each route',
        'All routes are dynamically rendered by default',
        'It automatically chooses between static and dynamic rendering based on the route\'s data requirements',
        'All routes are statically rendered by default'
      ],
      correctAnswer: 2,
      explanation: 'Next.js 14 automatically determines whether to use static or dynamic rendering based on the route\'s data requirements and configuration.'
    },
    {
      id: 'mix10',
      question: 'What is partial prerendering in Next.js 14?',
      options: [
        'Rendering only critical paths of the application',
        'A hybrid approach that combines static and dynamic rendering in the same route',
        'Prerendering only the header and footer of pages',
        'Prerendering based on user preferences'
      ],
      correctAnswer: 1,
      explanation: 'Partial prerendering is a hybrid rendering approach that combines statically pre-rendered shells with dynamic content, improving initial page load and dynamic content delivery.'
    }
  ]
};

export const mixedTestPart2: Test = {
  id: 'mixed-fundamentals-2',
  category: TEST_CATEGORIES.MIXED,
  title: 'Next.js 14 Mixed Concepts Test - Part 2',
  description: 'Advanced concepts and implementations in Next.js 14',
  questions: [
    {
      id: 'mix11',
      question: 'What is the significance of the "use client" directive in Next.js 14?',
      options: [
        'It prevents server-side rendering completely',
        'It marks the point where the component and its imports will be rendered on the client side',
        'It enables client-side routing only',
        'It makes the component accessible to client-side JavaScript'
      ],
      correctAnswer: 1,
      explanation: '"use client" marks a boundary where the code switches from server to client components, ensuring proper rendering and bundling of client-side code.'
    },
    {
      id: 'mix12',
      question: 'How does revalidation work with Server Actions in Next.js 14?',
      options: [
        'Revalidation requires client-side JavaScript',
        'Server Actions cannot revalidate cached data',
        'Server Actions can trigger revalidation of cached data using revalidatePath and revalidateTag',
        'Revalidation only works with API routes'
      ],
      correctAnswer: 2,
      explanation: 'Server Actions can trigger revalidation of cached data using revalidatePath and revalidateTag functions, allowing precise cache invalidation after mutations.'
    },
    {
      id: 'mix13',
      question: 'What is the purpose of generateMetadata in Next.js 14?',
      options: [
        'To compress metadata for better performance',
        'To validate metadata format',
        'To generate dynamic metadata based on route parameters and external data',
        'To create static metadata for all pages'
      ],
      correctAnswer: 2,
      explanation: 'generateMetadata allows dynamic generation of metadata based on route parameters and external data, improving SEO and social sharing capabilities.'
    },
    {
      id: 'mix14',
      question: 'How does error handling work in the Next.js 14 App Router?',
      options: [
        'Using middleware error handling',
        'Through global error handlers',
        'Using traditional try-catch blocks only',
        'Through error.js files that create error boundaries for route segments'
      ],
      correctAnswer: 3,
      explanation: 'error.js files create error boundaries for route segments, allowing granular error handling and recovery options.'
    },
    {
      id: 'mix15',
      question: 'What is the purpose of the middleware.ts file in Next.js 14?',
      options: [
        'To configure build settings',
        'To run code before requests are completed, enabling request modification and redirection',
        'To handle database connections',
        'To manage state between pages'
      ],
      correctAnswer: 1,
      explanation: 'middleware.ts runs before requests are completed, allowing request modification, redirection, and other request-time operations.'
    }
  ]
};