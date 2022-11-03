import { useContext, useEffect } from 'react'

import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import { SessionContext } from 'context/AuthProvider'
import useCourses from 'hooks/useCourses'

const CoursesList = () => {
  const { session } = useContext(SessionContext)
  const { courses, getCourses } = useCourses()
  const router = useRouter()

  useEffect(() => {
    getCourses()
  }, [])

  useEffect(() => {
    console.log(courses)
  }, [courses])

  return (
    <div>
      <div>Lista de cursos</div>
      {courses.map((course) => (
        <div key={course.id} className="flex">
          <div>{course.name}</div>
          <Button onClick={() => router.push(`/courses/${course.id}`)}>
            Ver detalles
          </Button>
        </div>
      ))}
      <Button onClick={() => router.push('/courses/new')}>Nuevo curso</Button>
    </div>
  )
}

export default CoursesList
