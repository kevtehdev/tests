import { TEST_CATEGORIES, CategoryType } from './categories';
import { TestsCategoryGrid } from '@/components/TestsCategoryGrid';
import { Book, GraduationCap } from 'lucide-react';

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
  TEST_CATEGORIES.EXAM_PREP_CODE,
  TEST_CATEGORIES.ESSENTIAL_CERT
];

interface CategoryGroup {
  title: string;
  description: string;
  categories: CategoryType[];
  icon: JSX.Element;
  theme: {
    gradient: string;
    badge: string;
  };
  type: 'learning' | 'exam';
}

const categoryGroups: CategoryGroup[] = [
  {
    title: "Learning Tests With Code",
    description: "Step-by-step tutorials and tests to master Next.js 14 concepts and implementation patterns.",
    categories: LEARNING_CATEGORIES,
    icon: <Book className="w-5 h-5" />,
    type: 'learning',
    theme: {
      gradient: "gradient-learning",
      badge: "badge-primary"
    }
  },
  {
    title: "Exam Preparation",
    description: "Comprehensive tests and practice exams to prepare for Next.js 14 certification.",
    categories: EXAM_CATEGORIES,
    icon: <GraduationCap className="w-5 h-5" />,
    type: 'exam',
    theme: {
      gradient: "gradient-exam",
      badge: "badge-secondary"
    }
  }
];

export default function TestsPage() {
  return (
    <div className="min-h-screen bg-background pattern-dots">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-16">
          {categoryGroups.map((group) => (
            <section key={group.title} className="space-y-8">
              {/* Section Header */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className={`${group.theme.gradient} p-2 rounded-xl text-white`}>
                    {group.icon}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`badge ${group.theme.badge}`}>
                      {group.title}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-primary/20" />
                    <span className="text-sm text-muted-foreground">
                      {group.categories.length} tests
                    </span>
                  </div>
                </div>
                <h2 className={`text-3xl font-bold heading-gradient ${group.theme.gradient}`}>
                  {group.title}
                </h2>
                <p className="text-muted-foreground max-w-3xl">
                  {group.description}
                </p>
              </div>

              {/* Test Grid */}
              <div className="card-gradient">
                <TestsCategoryGrid 
                  categories={group.categories}
                  groupType={group.type}
                />
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>All tests are updated for Next.js 14 and follow the latest best practices and patterns.</p>
          <p>Last updated: October 2024</p>
        </div>
      </div>
    </div>
  );
}