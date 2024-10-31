import { Test } from '../types';
import { TestRenderer } from './TestRenderer';
import { notFound } from 'next/navigation';
import { TEST_CATEGORIES, getCategoryDisplayName } from '../categories';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

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
import { nextjs14CoreExamTest } from '../essential-certification-test';  

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
  [TEST_CATEGORIES.EXAM_PREP_CODE]: advancedExamPrepTest,
  [TEST_CATEGORIES.ESSENTIAL_CERT]: nextjs14CoreExamTest  // Added new test
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
    <div className="min-h-screen bg-background pattern-dots">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Navigation */}
        <Link 
          href="/tests" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Tests
        </Link>

        {/* Test Header */}
        <div className="card-gradient mb-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold heading-gradient">
              {test.title}
            </h1>
            <p className="text-muted-foreground">
              {test.description}
            </p>
            {test.metadata && (
              <div className="flex flex-wrap gap-3 pt-4">
                {/* Difficulty */}
                <span className="badge badge-primary">
                  {test.metadata.difficulty}
                </span>

                {/* Duration */}
                <span className="badge badge-primary">
                  {test.metadata.duration} minutes
                </span>

                {/* Passing Score */}
                <span className="badge badge-primary">
                  Passing Score: {test.metadata.passingScore}%
                </span>

                {/* Prerequisites */}
                {test.metadata.prerequisites && (
                  <span className="badge badge-secondary">
                    Prerequisites: {test.metadata.prerequisites.join(', ')}
                  </span>
                )}

                {/* Question Count */}
                {test.metadata.totalQuestions && (
                  <span className="badge badge-secondary">
                    Questions: {test.metadata.totalQuestions}
                  </span>
                )}

                {/* Topics */}
                {test.metadata.topics && (
                  <span className="badge badge-secondary">
                    Topics: {test.metadata.topics.join(', ')}
                  </span>
                )}

                {/* Difficulty Breakdown */}
                {test.metadata.difficultyBreakdown && (
                  <span className="badge badge-secondary">
                    Difficulty: {Object.entries(test.metadata.difficultyBreakdown)
                      .map(([level, count]) => `${level}: ${count}`)
                      .join(', ')}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Test Content */}
        <div className="card-interactive">
          <TestRenderer test={test} />
        </div>
      </div>
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