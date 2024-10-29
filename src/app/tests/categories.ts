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
  MIXED_THEORY: 'mixed-theory' // Added new category
} as const;

export type CategoryType = typeof TEST_CATEGORIES[keyof typeof TEST_CATEGORIES];
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

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
    'mixed-theory': 'Theoretical concepts and best practices without code implementation'
  };
  
  return descriptions[category];
}