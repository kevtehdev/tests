import { TEST_CATEGORIES } from './categories';
import { TestsCategoryGrid } from '@/components/TestsCategoryGrid';

export default function TestsPage() {
  const categories = Object.values(TEST_CATEGORIES);

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="mb-12 space-y-4">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-blue-600">
          Next.js 14 Tests
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl">
          Test your knowledge of Next.js 14 with our comprehensive suite of tests. Each category focuses on different aspects of the framework.
        </p>
      </div>
      
      <TestsCategoryGrid categories={categories} />
    </div>
  );
}
