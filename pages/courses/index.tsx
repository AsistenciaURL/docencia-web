import { useContext, useEffect, useState } from 'react'

import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import { _url } from 'services/Connection'
import { SessionContext } from 'context/AuthProvider'

const CoursesList = () => {
  const [courses, setCourses] = useState([])
  const { session } = useContext(SessionContext)
  const router = useRouter()

  useEffect(() => {
    fetch(`${_url}/Curso/`)
      .then((response) => response.json())
      .then((data) =>
        setCourses(
          data.filter((course: any) => course.Docente_Carnet === session.uid)
        )
      )
  }, [])

  useEffect(() => {
    console.log(courses)
  }, [courses])

  return (
    <div>
      <div>Lista de cursos</div>
      {courses.map((course: any) => (
        <div key={course.idCurso} className="flex">
          <div>{course.Nombre}</div>
          <Button onClick={() => router.push(`/courses/${course.idCurso}`)}>
            Ver detalles
          </Button>
        </div>
      ))}

      <Button onClick={() => router.push('/courses/new')}>Nuevo curso</Button>
    </div>
  )
}

export default CoursesList
