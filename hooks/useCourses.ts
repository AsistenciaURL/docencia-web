import { useState } from 'react'
import { ApiResponse, fetchAPI, fetchSingleAPI } from 'services/Connection'
import Course from './types/Course'

const useCourses = () => {
  const [loading, setLoading] = useState(false)
  const [courses, setCourses] = useState<Course[]>([])
  const [course, setCourse] = useState<Course>({} as Course)

  const createCourse = async (course: Course): Promise<ApiResponse<Course>> => {
    setLoading(true)
    const response = await fetchAPI<Course>(
      'course',
      'POST',
      course,
      'Curso creado correctamente'
    )
    setLoading(false)
    return response
  }

  const getCourses = async () => {
    setLoading(true)
    const response = await fetchAPI<Course>('course', 'GET')
    setCourses(response.data!)
    setLoading(false)
  }

  const getCourse = async (courseId: number) => {
    setLoading(true)
    const response = await fetchSingleAPI<Course>('course', courseId)
    setCourse(response.data!)
    setLoading(false)
  }

  return {
    loading,
    createCourse,
    getCourses,
    getCourse,
    courses,
    course
  }
}

export default useCourses
