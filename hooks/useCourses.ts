import { useState } from 'react'
import { fetchPostAPI, fetchSingleAPI } from 'services/Connection'
import Course from './types/Course'

const useCourses = () => {
  const [loading, setLoading] = useState(false)
  const [course, setCourse] = useState<Course>({} as Course)
  const [courses, setCourses] = useState<Course[]>([])

  const getCourse = async (id: number) => {
    setLoading(true)
    const response = await fetchSingleAPI<Course>('courses', id)
    if (response.data) {
      setCourse(response.data)
    }
    setLoading(false)
  }

  const createCourse = async (course: Course) => {
    setLoading(true)
    const response = await fetchPostAPI<Course>('courses', course)
    setLoading(false)
    return response
  }

  return {
    loading,
    getCourse,
    course,
    courses,
    createCourse
  }
}

export default useCourses
