'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CategoryType } from '@/app/tests/categories';
import { Book, GitFork, Database, Code, Rocket, Cloud, Lock, GraduationCap, FileCode, Brain, Pencil } from 'lucide-react';

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
  groupType?: 'learning' | 'exam';
}

export function TestsCategoryGrid({ categories, groupType = 'learning' }: TestsCategoryGridProps) {
  const getCategoryIcon = (category: string) => {
    const iconProps = { className: "w-5 h-5" };
    switch(category) {
      case 'fundamentals': return <Book {...iconProps} />;
      case 'routing': return <GitFork {...iconProps} />;
      case 'data-fetching': return <Database {...iconProps} />;
      case 'server-components': return <Code {...iconProps} />;
      case 'optimization': return <Rocket {...iconProps} />;
      case 'deployment': return <Cloud {...iconProps} />;
      case 'auth': return <Lock {...iconProps} />;
      case 'certification': return <GraduationCap {...iconProps} />;
      case 'mixed': return <FileCode {...iconProps} />;
      case 'mixed-theory': return <Brain {...iconProps} />;
      case 'exam-prep': return <Pencil {...iconProps} />;
      default: return <Book {...iconProps} />;
    }
  };

  const getCategoryStyles = (category: string) => {
    const baseStyles = "badge p-3 rounded-xl";
    if (groupType === 'exam') {
      return `${baseStyles} badge-secondary`;
    }
    switch(category) {
      case 'fundamentals': return `${baseStyles} badge-fundamentals`;
      case 'routing': return `${baseStyles} badge-routing`;
      case 'data-fetching': return `${baseStyles} badge-data`;
      case 'server-components': return `${baseStyles} badge-components`;
      case 'optimization': return `${baseStyles} badge-optimization`;
      case 'deployment': return `${baseStyles} badge-deployment`;
      case 'auth': return `${baseStyles} badge-auth`;
      default: return `${baseStyles} badge-primary`;
    }
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
          <Link href={`/tests/${category}`}>
            <div className="card-interactive hover-lift group">
              <div className="flex items-center gap-4 mb-4">
                <div className={`${getCategoryStyles(category)} group-hover:scale-110 transition-transform duration-300`}>
                  {getCategoryIcon(category)}
                </div>
                <h2 className="text-xl font-semibold text-foreground capitalize">
                  {category.split('-').join(' ')}
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {groupType === 'exam' 
                  ? `Prepare for certification with our ${category.split('-').join(' ')} test. Practice with real exam-style questions and detailed explanations.`
                  : `Master ${category.split('-').join(' ')} in Next.js 14. Learn through practical examples and comprehensive testing.`
                }
              </p>
              <div className="mt-6 flex items-center font-medium text-primary">
                Start Test
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}