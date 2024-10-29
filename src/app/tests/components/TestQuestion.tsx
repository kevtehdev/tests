'use client'

import { TestQuestion as TestQuestionType } from '../types';
import { CodeBlock } from './CodeBlock'
import { motion } from 'framer-motion';

interface TestQuestionProps {
  question: TestQuestionType;
  onAnswer: (questionId: string, answer: number) => void;
  showExplanation: boolean;
  selectedAnswer?: number;
  questionNumber: number;
}

export function TestQuestion({
  question,
  onAnswer,
  showExplanation,
  selectedAnswer,
  questionNumber
}: TestQuestionProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-neutral-200/50 dark:border-neutral-800 overflow-hidden backdrop-blur-xl"
    >
      {/* Question Header */}
      <div className="p-8 border-b border-neutral-200/50 dark:border-neutral-800 bg-gradient-to-r from-violet-50/50 to-blue-50/50 dark:from-violet-950/50 dark:to-blue-950/50">
        <div className="flex items-start gap-4">
          <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-violet-600 text-white text-sm font-medium shadow-lg shadow-violet-200 dark:shadow-violet-900/30">
            {questionNumber}
          </span>
          <h3 className="flex-1 text-xl font-semibold text-neutral-800 dark:text-neutral-100 leading-relaxed">
            {question.question}
          </h3>
        </div>
      </div>

      {/* Code Block */}
      {question.code && (
        <div className="p-6 bg-neutral-950">
          <CodeBlock code={question.code} language="typescript" />
        </div>
      )}

      {/* Options */}
      <div className="p-8 space-y-4">
        {question.options.map((option: string, index: number) => (
          <motion.button
            key={index}
            onClick={() => !showExplanation && onAnswer(question.id, index)}
            disabled={showExplanation}
            whileHover={!showExplanation ? { scale: 1.01 } : {}}
            whileTap={!showExplanation ? { scale: 0.99 } : {}}
            className={`w-full p-5 text-left rounded-xl transition-all duration-200 ${
              showExplanation
                ? index === question.correctAnswer
                  ? 'bg-green-50 dark:bg-green-950/50 border-green-500 shadow-green-100/50 dark:shadow-green-900/30'
                  : index === selectedAnswer
                  ? 'bg-red-50 dark:bg-red-950/50 border-red-500 shadow-red-100/50 dark:shadow-red-900/30'
                  : 'bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800'
                : selectedAnswer === index
                ? 'bg-violet-50 dark:bg-violet-950/50 border-violet-500 shadow-violet-100/50 dark:shadow-violet-900/30'
                : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
            } border-2 shadow-lg`}
          >
            <div className="flex items-center gap-4">
              <span className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium ${
                showExplanation
                  ? index === question.correctAnswer
                    ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                    : index === selectedAnswer
                    ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                  : selectedAnswer === index
                  ? 'bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
              }`}>
                {String.fromCharCode(65 + index)}
              </span>
              <span className={`flex-grow ${
                showExplanation && index === question.correctAnswer 
                  ? 'font-medium text-green-900 dark:text-green-100' 
                  : 'text-neutral-700 dark:text-neutral-300'
              }`}>
                {option}
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Explanation */}
      {showExplanation && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="p-8 bg-gradient-to-r from-violet-50/50 to-blue-50/50 dark:from-violet-950/50 dark:to-blue-950/50 border-t border-neutral-200/50 dark:border-neutral-800"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-violet-100 dark:bg-violet-900/50 rounded-xl shadow-lg shadow-violet-200/50 dark:shadow-violet-900/30">
              <svg className="w-5 h-5 text-violet-600 dark:text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-violet-900 dark:text-violet-100 mb-3">Explanation</h4>
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {question.explanation}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}