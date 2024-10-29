'use client'

import { Module, LessonType } from '@/types';
import Link from 'next/link';

interface ModuleListProps {
  modules: Module[];
}

export function ModuleList({ modules }: ModuleListProps) {
  const getLessonTypeStyle = (type: LessonType) => {
    const styles = {
      THEORY: 'bg-purple-100 text-purple-800',
      PRACTICE: 'bg-green-100 text-green-800',
      QUIZ: 'bg-orange-100 text-orange-800'
    };
    return styles[type] || '';
  };

  return (
    <div className="space-y-4">
      {modules.map((module) => (
        <div
          key={module.id}
          className="p-6 rounded-lg border border-gray-200 bg-white"
        >
          <h3 className="text-lg font-semibold mb-4">{module.title}</h3>
          <p className="text-gray-600 mb-4">{module.description}</p>
          <div className="space-y-2">
            {module.lessons.map((lesson, index) => (
              <Link
                key={lesson.id}
                href={`/lessons/${lesson.id}`}
                className="block p-3 rounded hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <span className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full text-sm text-gray-600 mr-3">
                    {index + 1}
                  </span>
                  <span className="flex-grow">{lesson.title}</span>
                  <span className={`text-sm px-2 py-1 rounded ${getLessonTypeStyle(lesson.type)}`}>
                    {lesson.type.toLowerCase()}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}