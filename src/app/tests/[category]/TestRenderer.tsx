'use client'

import { useState } from 'react';
import { Test, TestQuestion } from '../types';
import { TestQuestion as TestQuestionComponent } from '../components/TestQuestion';

interface TestRendererProps {
  test: Test;
}

export function TestRenderer({ test }: TestRendererProps) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showExplanations, setShowExplanations] = useState<Record<string, boolean>>({});

  const handleAnswer = (questionId: string, answer: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
    setShowExplanations(prev => ({
      ...prev,
      [questionId]: true
    }));
  };

  const calculateProgress = () => {
    const completed = Object.keys(answers).length;
    const total = test.questions.length;
    const correct = Object.entries(answers).filter(
      ([questionId, answer]) => 
        test.questions.find(q => q.id === questionId)?.correctAnswer === answer
    ).length;
    
    return {
      completed,
      total,
      correct,
      percentage: Math.round((completed / total) * 100),
      score: completed > 0 ? Math.round((correct / completed) * 100) : 0
    };
  };

  const progress = calculateProgress();

  return (
    <div className="space-y-8">
      {/* Progress Tracking */}
      <div className="p-6 bg-card rounded-xl border shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">Your Progress</h2>
            <p className="text-sm text-muted-foreground">
              {progress.completed} of {progress.total} questions completed
            </p>
          </div>
          {progress.completed > 0 && (
            <div className="text-right">
              <p className="text-sm font-medium">Current Score</p>
              <p className={`text-lg font-bold ${
                progress.score >= 70 ? 'text-green-600' : 'text-red-600'
              }`}>
                {progress.score}%
              </p>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progress.percentage}%` }}
          />
        </div>
      </div>
      
      {/* Questions */}
      <div className="space-y-8">
        {test.questions.map((question: TestQuestion, index: number) => (
          <TestQuestionComponent
            key={question.id}
            question={question}
            onAnswer={handleAnswer}
            showExplanation={!!showExplanations[question.id]}
            selectedAnswer={answers[question.id]}
            questionNumber={index + 1}
          />
        ))}
      </div>
      
      {/* Results Summary */}
      {progress.completed === progress.total && (
        <div className="mt-8 p-6 bg-card rounded-xl border shadow-sm">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Test Complete!</h2>
            <div className="mb-6">
              <p className="text-4xl font-bold mb-2 text-primary">
                {progress.score}%
              </p>
              <p className="text-muted-foreground">
                {progress.correct} correct out of {progress.total} questions
              </p>
            </div>
            
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setAnswers({});
                  setShowExplanations({});
                  window.scrollTo(0, 0);
                }}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
              >
                Try Again
              </button>
              <button
                onClick={() => window.scrollTo(0, 0)}
                className="px-6 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition"
              >
                Review Answers
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}