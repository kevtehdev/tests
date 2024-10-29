import { Test } from '../types';
import { TestRenderer } from './TestRenderer';
import { notFound } from 'next/navigation';
import { TEST_CATEGORIES, getCategoryDisplayName } from '../categories';

// Code Learning Tests
import { fundamentalsTest } from '../fundamentals';
import { routingTest } from '../routing';
import { dataFetchingTest } from '../data-fetching';
import { optimizationTest } from '../optimization';
import { deploymentTest } from '../deployment';
import { serverComponentsTest } from '../server-components';
import { authTest } from '../auth';

// Exam and Certification Tests
import { uniqueCertificationTest } from '../certification-test';
import { mixedTest } from '../mixed-concepts';
import { mixedConceptTest } from '../mixed-concepts-2';
import { nextjsExamPrepTest } from '../exam-prep-test';
import { advancedExamPrepTest } from '../exam-prep-test-with-code';

// Test Registry
const tests: Record<string, Test> = {
  // Code Learning and Implementation Tests
  [TEST_CATEGORIES.FUNDAMENTALS]: fundamentalsTest,
  [TEST_CATEGORIES.ROUTING]: routingTest,
  [TEST_CATEGORIES.DATA_FETCHING]: dataFetchingTest,
  [TEST_CATEGORIES.OPTIMIZATION]: optimizationTest,
  [TEST_CATEGORIES.DEPLOYMENT]: deploymentTest,
  [TEST_CATEGORIES.SERVER_COMPONENTS]: serverComponentsTest,
  [TEST_CATEGORIES.AUTH]: authTest,

  // Exam Preparation and Certification Tests
  [TEST_CATEGORIES.CERTIFICATION]: uniqueCertificationTest,
  [TEST_CATEGORIES.MIXED]: mixedTest,
  [TEST_CATEGORIES.MIXED_THEORY]: mixedConceptTest,
  [TEST_CATEGORIES.EXAM_PREP]: nextjsExamPrepTest,
  [TEST_CATEGORIES.EXAM_PREP_CODE]: advancedExamPrepTest
};

interface PageProps {
  params: Promise<{ category: string }> | { category: string }
}

export default async function TestPage({ params }: PageProps) {
  const resolvedParams = await params;
  const test = tests[resolvedParams.category];

  if (!test) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-blue-600">
          {test.title}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {test.description}
        </p>
        {test.metadata && (
          <div className="mt-4 flex flex-wrap gap-4">
            <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
              {test.metadata.difficulty}
            </div>
            <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
              {test.metadata.duration} minutes
            </div>
            <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
              Passing Score: {test.metadata.passingScore}%
            </div>
            {test.metadata.prerequisites && (
              <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                Prerequisites: {test.metadata.prerequisites.join(', ')}
              </div>
            )}
            {test.metadata.totalQuestions && (
              <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                Questions: {test.metadata.totalQuestions}
              </div>
            )}
            {test.metadata.topics && (
              <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                Topics: {test.metadata.topics.join(', ')}
              </div>
            )}
            {test.metadata.difficultyBreakdown && (
              <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                Difficulty: {Object.entries(test.metadata.difficultyBreakdown)
                  .map(([level, count]) => `${level}: ${count}`)
                  .join(', ')}
              </div>
            )}
          </div>
        )}
      </div>

      <TestRenderer test={test} />
    </div>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const test = tests[resolvedParams.category];

  if (!test) {
    return {
      title: 'Test Not Found',
      description: 'The requested test could not be found.'
    };
  }

  const categoryName = getCategoryDisplayName(test.category);

  return {
    title: `${test.title} - Next.js 14 Learning Platform`,
    description: test.description,
    openGraph: {
      title: `${test.title} - Next.js 14 Learning Platform`,
      description: test.description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${categoryName} Test - Next.js 14 Learning Platform`,
      description: test.description,
    }
  };
}

export async function generateStaticParams() {
  return Object.keys(tests).map((category) => ({
    category
  }));
}