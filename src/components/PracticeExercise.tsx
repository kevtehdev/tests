'use client'

import { motion } from 'framer-motion';
import { useState } from 'react';

interface PracticeExerciseProps {
  content: string;
}

export function PracticeExercise({ content }: PracticeExerciseProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulated submission delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <h3 className="text-2xl font-semibold text-foreground">Practice Exercise</h3>
        <div 
          className="mt-4 text-neutral-600 dark:text-neutral-400"
          dangerouslySetInnerHTML={{ __html: content }} 
        />
      </div>

      <div className="border-t border-neutral-200 dark:border-neutral-800 pt-6">
        <div className="flex justify-end gap-4">
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
          >
            Reset
          </button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Solution'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}