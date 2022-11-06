import { useState } from 'react'
import { fetchSingleAPI } from 'services/Connection'
import Course from './types/Course'

const useCourses = () => {
  const [loading, setLoading] = useState(false)
  const [course, setCourse] = useState<Course>({} as Course)
  const [courses, setCourses] = useState<Course[]>([])

  const getCourse = async (id: number) => {
    setLoading(true)
    const response = await fetchSingleAPI<Course>('courses', id)
    setCourse(response.data!)
    setLoading(false)
  }

  return {
    loading,
    getCourse,
    course,
    courses
  }
}

export default useCourses
