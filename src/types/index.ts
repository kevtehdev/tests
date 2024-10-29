export type LessonType = 'THEORY' | 'PRACTICE' | 'QUIZ';

export interface Course {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  modules: Module[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
  courseId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  type: LessonType;
  order: number;
  moduleId: string;
  createdAt: Date;
  updatedAt: Date;
}
