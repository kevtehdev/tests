'use client'

import Link from 'next/link'
import { Course } from '@/types'

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link 
      href={`/courses/${course.id}`}
      className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
          <p className="text-gray-600 mb-4">{course.description}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${
          course.level === 'beginner' 
            ? 'bg-green-100 text-green-800' 
            : course.level === 'intermediate'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {course.level}
        </span>
      </div>
      <div className="flex items-center justify-between mt-4">
        <span className="text-sm text-gray-500">
          {course.modules.length} modules
        </span>
        <span className="text-blue-600 text-sm font-medium">
          Start Learning →
        </span>
      </div>
    </Link>
  )
}