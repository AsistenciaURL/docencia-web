import { useState } from 'react'
import { ApiResponse, fetchAPI } from 'services/Connection'
import Course from './types/Course'

const useCourses = () => {
  const [loading, setLoading] = useState(false)

  const createCourse = async (course: Course): Promise<ApiResponse<Course>> => {
    setLoading(true)
    const response = await fetchAPI<Course>('course', 'POST', course)
    setLoading(false)
    return response
  }

  return {
    loading,
    createCourse
  }
}

export default useCourses
