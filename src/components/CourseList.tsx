import { Course } from '@/types'
import { CourseCard } from './CourseCard'

interface CourseListProps {
  courses: Course[]
}

export default function CourseList({ courses }: CourseListProps) {
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Available Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}
