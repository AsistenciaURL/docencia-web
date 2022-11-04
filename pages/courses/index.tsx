import { useContext, useEffect } from 'react'

import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import { SessionContext } from 'context/AuthProvider'
import useCourses from 'hooks/useCourses'
import useProfessors from 'hooks/useProfessors'

const CoursesList = () => {
  const { session } = useContext(SessionContext)
  const { professor, getProfessor } = useProfessors()
  const router = useRouter()

  useEffect(() => {
    getProfessor(session.uid!)
  }, [])

  useEffect(() => {
    console.log(professor)
  }, [professor])

  return (
    <div>
      <div>Lista de cursos</div>
      {professor?.courses?.map((course) => (
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
