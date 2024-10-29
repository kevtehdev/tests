'use client'

interface QuizProps {
  content: string;
}

export function Quiz({ content }: QuizProps) {
  return (
    <div className="space-y-4">
      <div className="prose max-w-none">
        <h3>Quiz</h3>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
}
