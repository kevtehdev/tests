// categories.ts
export const TEST_CATEGORIES = {
  FUNDAMENTALS: 'fundamentals',
  ROUTING: 'routing',
  DATA_FETCHING: 'data-fetching',
  SERVER_COMPONENTS: 'server-components',
  OPTIMIZATION: 'optimization',
  DEPLOYMENT: 'deployment',
  AUTH: 'next-auth',
  CERTIFICATION: 'next-certification',
  MIXED: 'mixed-concepts',
  MIXED_THEORY: 'mixed-theory',
  EXAM_PREP: 'exam-preparation',
  EXAM_PREP_CODE: 'exam-preparation-with-code',
  ESSENTIAL_CERT: 'nextjs-14-core-exam',  // Added new category
  // New categories for Next.js 14 specific features
  SERVER_ACTIONS: 'server-actions',
  APP_ROUTER: 'app-router',
  PARTIAL_RENDERING: 'partial-rendering',
  STREAMING: 'streaming',
  DATA_MUTATIONS: 'data-mutations',
  CACHE_PATTERNS: 'cache-patterns',
  METADATA: 'metadata-api'
} as const;

export type CategoryType = typeof TEST_CATEGORIES[keyof typeof TEST_CATEGORIES];
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'mixed' | 'certification-ready';

export function getCategoryDisplayName(category: CategoryType): string {
  return category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getCategoryDescription(category: CategoryType): string {
  const descriptions: Record<CategoryType, string> = {
    'fundamentals': 'Core concepts and basics of Next.js 14',
    'routing': 'Understanding the App Router and routing patterns',
    'data-fetching': 'Data fetching strategies and patterns',
    'server-components': 'Server Components and server-side rendering',
    'optimization': 'Performance optimization and best practices',
    'deployment': 'Deployment strategies and configurations',
    'next-auth': 'Authentication and authorization patterns',
    'next-certification': 'Preparation for Next.js certification',
    'mixed-concepts': 'Comprehensive test covering various aspects of Next.js 14',
    'mixed-theory': 'Theoretical concepts and best practices without code implementation',
    'exam-preparation': 'Focused preparation for Next.js certification exam',
    'exam-preparation-with-code': 'Advanced exam preparation with practical code implementations',
    'nextjs-14-core-exam': 'Essential concepts and patterns required for Next.js 14 certification', // Updated description
    'server-actions': 'Next.js 14 Server Actions and form handling patterns',
    'app-router': 'Advanced App Router patterns and implementations',
    'partial-rendering': 'Partial Prerendering and streaming patterns',
    'streaming': 'Streaming with Suspense and loading states',
    'data-mutations': 'Data mutation patterns and optimistic updates',
    'cache-patterns': 'Advanced caching strategies and patterns',
    'metadata-api': 'Dynamic and static metadata implementation'
  };
  
  return descriptions[category];
}