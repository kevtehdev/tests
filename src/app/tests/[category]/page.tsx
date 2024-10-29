import { Test } from '../types';
import { fundamentalsTest } from '../fundamentals';
import { routingTest } from '../routing';
import { dataFetchingTest } from '../data-fetching';
import { optimizationTest } from '../optimization';
import { deploymentTest } from '../deployment';
import { authTest } from '../auth';
import { serverComponentsTest } from '../server-components';
import { certificationTest } from '../certification-test';
import { mixedTest } from '../mixed-concepts';
import { mixedConceptTest } from '../mixed-concepts-2';
import { TestRenderer } from './TestRenderer';
import { notFound } from 'next/navigation';
import { TEST_CATEGORIES, getCategoryDisplayName } from '../categories';

const tests: Record<string, Test> = {
  [TEST_CATEGORIES.FUNDAMENTALS]: fundamentalsTest,
  [TEST_CATEGORIES.ROUTING]: routingTest,
  [TEST_CATEGORIES.DATA_FETCHING]: dataFetchingTest,
  [TEST_CATEGORIES.OPTIMIZATION]: optimizationTest,
  [TEST_CATEGORIES.DEPLOYMENT]: deploymentTest,
  [TEST_CATEGORIES.SERVER_COMPONENTS]: serverComponentsTest,
  [TEST_CATEGORIES.AUTH]: authTest,
  [TEST_CATEGORIES.CERTIFICATION]: certificationTest,
  [TEST_CATEGORIES.MIXED]: mixedTest,
  [TEST_CATEGORIES.MIXED_THEORY]: mixedConceptTest
};

interface PageProps {
  params: Promise<{ category: string }> | { category: string }
}

async function getTest(params: PageProps['params']) {
  const resolvedParams = await params;
  return tests[resolvedParams.category];
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