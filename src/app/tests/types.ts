import { CategoryType, DifficultyLevel } from './categories';

export interface TestMetadata {
  difficulty: DifficultyLevel;
  duration: number; // in minutes
  passingScore: number; // percentage
  prerequisites?: string[];
  learningObjectives?: string[];
  totalQuestions?: number;
  difficultyBreakdown?: {
    beginner?: number;
    intermediate?: number;
    advanced?: number;
  };
  topics?: string[];
  version?: string;
}

export interface Reference {
  url: string;
  title: string;
}

export interface TestQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  code?: string;
  difficulty?: DifficultyLevel;
  topics?: string[];
  references?: Reference[];
  category?: string; // For categorizing questions within a test
  weight?: number; // For weighted scoring
}

export interface TestResult {
  questionId: string;
  selectedAnswer: number;
  isCorrect: boolean;
  timeSpent: number; // in seconds
  score?: number; // For weighted scoring
}

export interface TestProgress {
  currentQuestionIndex: number;
  answers: Map<string, number>;
  startTime: Date;
  lastActiveTime: Date;
  score?: number; // Running score
}

export interface Test {
  id: string;
  category: CategoryType;
  title: string;
  description: string;
  questions: TestQuestion[];
  metadata?: TestMetadata;
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

export interface ExamConfig {
  timeLimit: number;
  passingScore: number;
  allowReview: boolean;
  randomizeQuestions: boolean;
  showExplanations: boolean;
}

export interface ExamResult extends TestResult {
  examConfig: ExamConfig;
  finalScore: number;
  passStatus: boolean;
  detailedAnalysis: {
    byTopic: Record<string, { correct: number; total: number }>;
    byDifficulty: Record<DifficultyLevel, { correct: number; total: number }>;
  };
}

// Helper functions
export function calculateTestScore(results: TestResult[]): number {
  if (results.length === 0) return 0;
  const correctAnswers = results.filter(r => r.isCorrect).length;
  return (correctAnswers / results.length) * 100;
}

export function calculateWeightedScore(results: TestResult[]): number {
  if (results.length === 0) return 0;
  const totalWeight = results.reduce((sum, result) => sum + (result.score || 1), 0);
  const weightedCorrect = results
    .filter(r => r.isCorrect)
    .reduce((sum, result) => sum + (result.score || 1), 0);
  return (weightedCorrect / totalWeight) * 100;
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

export function getTopicStats(results: TestResult[], questions: TestQuestion[]): Record<string, { correct: number; total: number }> {
  const stats: Record<string, { correct: number; total: number }> = {};
  
  questions.forEach((question, index) => {
    const result = results[index];
    if (question.topics) {
      question.topics.forEach(topic => {
        if (!stats[topic]) {
          stats[topic] = { correct: 0, total: 0 };
        }
        stats[topic].total++;
        if (result && result.isCorrect) {
          stats[topic].correct++;
        }
      });
    }
  });
  
  return stats;
}

export function getDifficultyStats(results: TestResult[], questions: TestQuestion[]): Record<DifficultyLevel, { correct: number; total: number }> {
  const stats: Record<DifficultyLevel, { correct: number; total: number }> = {
    beginner: { correct: 0, total: 0 },
    intermediate: { correct: 0, total: 0 },
    advanced: { correct: 0, total: 0 },
    mixed: { correct: 0, total: 0 }
  };
  
  questions.forEach((question, index) => {
    const result = results[index];
    const difficulty = question.difficulty || 'intermediate';
    stats[difficulty].total++;
    if (result && result.isCorrect) {
      stats[difficulty].correct++;
    }
  });
  
  return stats;
}

export function calculateTimeRemaining(startTime: Date, timeLimit: number): number {
  const elapsed = (Date.now() - startTime.getTime()) / 1000;
  return Math.max(0, timeLimit * 60 - elapsed);
}