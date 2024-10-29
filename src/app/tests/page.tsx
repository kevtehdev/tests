import { TEST_CATEGORIES, CategoryType } from './categories';
import { TestsCategoryGrid } from '@/components/TestsCategoryGrid';

// Define category groups with proper typing
const LEARNING_CATEGORIES: CategoryType[] = [
  TEST_CATEGORIES.FUNDAMENTALS,
  TEST_CATEGORIES.ROUTING,
  TEST_CATEGORIES.DATA_FETCHING,
  TEST_CATEGORIES.SERVER_COMPONENTS,
  TEST_CATEGORIES.OPTIMIZATION,
  TEST_CATEGORIES.DEPLOYMENT,
  TEST_CATEGORIES.AUTH
];

const EXAM_CATEGORIES: CategoryType[] = [
  TEST_CATEGORIES.CERTIFICATION,
  TEST_CATEGORIES.MIXED,
  TEST_CATEGORIES.MIXED_THEORY,
  TEST_CATEGORIES.EXAM_PREP,
  TEST_CATEGORIES.EXAM_PREP_CODE
];

interface CategoryGroup {
  title: string;
  description: string;
  categories: CategoryType[];
  theme: {
    gradient: string;
    badge: string;
  };
  type: 'learning' | 'exam';
}

const categoryGroups: CategoryGroup[] = [
  {
    title: "Learning Paths",
    description: "Step-by-step tutorials and tests to master Next.js 14 concepts and implementation patterns.",
    categories: LEARNING_CATEGORIES,
    type: 'learning',
    theme: {
      gradient: "from-blue-600 to-cyan-500",
      badge: "bg-blue-100 text-blue-800"
    }
  },
  {
    title: "Exam Preparation",
    description: "Comprehensive tests and practice exams to prepare for Next.js 14 certification.",
    categories: EXAM_CATEGORIES,
    type: 'exam',
    theme: {
      gradient: "from-violet-600 to-purple-500",
      badge: "bg-violet-100 text-violet-800"
    }
  }
];

export default function TestsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-16">
          {categoryGroups.map((group) => (
            <section key={group.title} className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${group.theme.badge}`}>
                    {group.title}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-gray-300" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {group.categories.length} tests
                  </span>
                </div>
                <h2 className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${group.theme.gradient}`}>
                  {group.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
                  {group.description}
                </p>
              </div>

              <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
                <TestsCategoryGrid 
                  categories={group.categories}
                  groupType={group.type}
                />
              </div>
            </section>
          ))}
        </div>
</div>

      {/* Footer Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="border-t border-neutral-200 dark:border-neutral-700 pt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>All tests are updated for Next.js 14 and follow the latest best practices and patterns.</p>
          <p>Last updated: October 2024</p>
        </div>
      </div>
    </div>
  );
}