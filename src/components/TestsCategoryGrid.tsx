'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CategoryType } from '@/app/tests/categories'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

interface TestsCategoryGridProps {
  categories: CategoryType[];
  theme?: string;
  groupType?: 'learning' | 'exam';
}

export function TestsCategoryGrid({ categories, groupType = 'learning' }: TestsCategoryGridProps) {
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'fundamentals':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        );
      case 'routing':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
    }
  };

  const getThemeColors = () => {
    return groupType === 'exam' 
      ? 'bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 shadow-violet-200/50 dark:shadow-violet-900/30'
      : 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 shadow-blue-200/50 dark:shadow-blue-900/30';
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-6 md:grid-cols-2"
    >
      {categories.map((category) => (
        <motion.div key={category} variants={item}>
          <Link
            href={`/tests/${category}`}
            className="group block p-8 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/50 dark:border-neutral-800 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-3 rounded-xl shadow-lg ${getThemeColors()} group-hover:scale-110 transition-transform duration-300`}>
                {getCategoryIcon(category)}
              </div>
              <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100 capitalize">
                {category.split('-').join(' ')}
              </h2>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {groupType === 'exam' 
                ? `Prepare for certification with our ${category.split('-').join(' ')} test. Practice with real exam-style questions and detailed explanations.`
                : `Master ${category.split('-').join(' ')} in Next.js 14. Learn through practical examples and comprehensive testing.`
              }
            </p>
            <div className={`mt-6 flex items-center font-medium ${
              groupType === 'exam' ? 'text-violet-600 dark:text-violet-400' : 'text-blue-600 dark:text-blue-400'
            }`}>
              Start Test
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}