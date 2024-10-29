import { CategoryType, DifficultyLevel } from './categories';

export interface TestQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  code?: string;
  difficulty?: DifficultyLevel;
  topics?: string[];
  references?: {
    url: string;
    title: string;
  }[];
}

export interface TestResult {
  questionId: string;
  selectedAnswer: number;
  isCorrect: boolean;
  timeSpent: number; // in seconds
}

export interface TestProgress {
  currentQuestionIndex: number;
  answers: Map<string, number>;
  startTime: Date;
  lastActiveTime: Date;
}

export interface Test {
  id: string;
  category: CategoryType;
  title: string;
  description: string;
  questions: TestQuestion[];
  metadata?: {
    difficulty: DifficultyLevel;
    duration: number; // in minutes
    passingScore: number; // percentage
    prerequisites?: string[];
    learningObjectives?: string[];
  };
  version?: string;
  lastUpdated?: string;
}

export interface TestStatistics {
  totalAttempts: number;
  averageScore: number;
  averageTimeSpent: number;
  passRate: number;
  questionStats: {
    questionId: string;
    correctRate: number;
    averageTimeSpent: number;
  }[];
}

export interface UserTestHistory {
  testId: string;
  category: CategoryType;
  attempts: {
    date: string;
    score: number;
    timeSpent: number;
    answers: TestResult[];
  }[];
}

export type TestCategory = CategoryType;

export interface TestMetrics {
  difficulty: DifficultyLevel;
  completionRate: number;
  averageScore: number;
  topicsCovered: string[];
}

export interface TestFilters {
  categories?: CategoryType[];
  difficulty?: DifficultyLevel;
  duration?: number;
  hasCode?: boolean;
}

// Helper functions
export function calculateTestScore(results: TestResult[]): number {
  if (results.length === 0) return 0;
  const correctAnswers = results.filter(r => r.isCorrect).length;
  return (correctAnswers / results.length) * 100;
}

export function hasPassedTest(score: number, passingScore: number): boolean {
  return score >= passingScore;
}

export function formatTimeSpent(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
}

export function getTestMetrics(test: Test): TestMetrics {
  return {
    difficulty: test.metadata?.difficulty || 'intermediate',
    completionRate: 0,
    averageScore: 0,
    topicsCovered: test.questions.reduce((topics: string[], q) => {
      if (q.topics) {
        topics.push(...q.topics);
      }
      return [...new Set(topics)]; // Remove duplicates
    }, [])
  };
}

export function filterTests(tests: Test[], filters: TestFilters): Test[] {
  return tests.filter(test => {
    if (filters.categories && !filters.categories.includes(test.category)) {
      return false;
    }
    if (filters.difficulty && test.metadata?.difficulty !== filters.difficulty) {
      return false;
    }
    if (filters.duration && test.metadata?.duration && test.metadata.duration > filters.duration) {
      return false;
    }
    if (filters.hasCode !== undefined) {
      const hasCode = test.questions.some(q => q.code);
      if (filters.hasCode !== hasCode) {
        return false;
      }
    }
    return true;
  });
}