'use client'

import { TestQuestion as TestQuestionType } from '../types';
import { CodeBlock } from './CodeBlock'
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

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
  const getOptionStyles = (index: number) => {
    const baseStyles = "w-full p-5 text-left rounded-xl transition-all duration-200 border-2 shadow-lg hover:shadow-xl";
    
    if (showExplanation) {
      if (index === question.correctAnswer) {
        return `${baseStyles} bg-[hsl(var(--success)/0.1)] border-[hsl(var(--success))] shadow-[hsl(var(--success))/0.1]`;
      }
      if (index === selectedAnswer) {
        return `${baseStyles} bg-[hsl(var(--destructive)/0.1)] border-[hsl(var(--destructive))] shadow-[hsl(var(--destructive))/0.1]`;
      }
      return `${baseStyles} bg-muted border-border`;
    }
    
    if (selectedAnswer === index) {
      return `${baseStyles} bg-[hsl(var(--primary)/0.1)] border-primary shadow-[hsl(var(--primary))/0.1]`;
    }
    
    return `${baseStyles} bg-card border-border hover:bg-muted hover:border-primary/20`;
  };

  const getOptionBadgeStyles = (index: number) => {
    const baseStyles = "w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium";
    
    if (showExplanation) {
      if (index === question.correctAnswer) {
        return `${baseStyles} bg-[hsl(var(--success)/0.2)] text-[hsl(var(--success))]`;
      }
      if (index === selectedAnswer) {
        return `${baseStyles} bg-[hsl(var(--destructive)/0.2)] text-[hsl(var(--destructive))]`;
      }
      return `${baseStyles} bg-muted text-muted-foreground`;
    }
    
    if (selectedAnswer === index) {
      return `${baseStyles} bg-[hsl(var(--primary)/0.2)] text-primary`;
    }
    
    return `${baseStyles} bg-muted text-muted-foreground`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-interactive"
    >
      {/* Question Header */}
      <div className="p-8 border-b border-border bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="flex items-start gap-4">
          <span className="flex items-center justify-center w-10 h-10 rounded-xl gradient-learning text-white text-sm font-medium">
            {questionNumber}
          </span>
          <h3 className="flex-1 text-xl font-semibold text-foreground leading-relaxed">
            {question.question}
          </h3>
        </div>
      </div>

      {/* Code Block */}
      {question.code && (
        <div className="p-6 bg-card border-y border-border">
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
            className={getOptionStyles(index)}
          >
            <div className="flex items-center gap-4">
              <span className={getOptionBadgeStyles(index)}>
                {String.fromCharCode(65 + index)}
              </span>
              <span className={`flex-grow ${
                showExplanation && index === question.correctAnswer 
                  ? 'font-medium text-[hsl(var(--success))]' 
                  : 'text-foreground'
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
          className="p-8 bg-gradient-to-r from-primary/5 to-secondary/5 border-t border-border"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 glass rounded-xl">
              <Info className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground mb-3">Explanation</h4>
              <p className="text-muted-foreground leading-relaxed">
                {question.explanation}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}