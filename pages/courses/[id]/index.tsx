import { Button } from '@mui/material'
import UploadXsls from 'components/xlsx/UploadXsls'
import useCourses from 'hooks/useCourses'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export async function getServerSideProps({ query }: { query: { id: string } }) {
  const { id } = query
  return {
    props: { id }
  }
}

const Course = ({ id }: { id: number }) => {
  const { getCourse, course } = useCourses()
  const router = useRouter()

  useEffect(() => {
    getCourse(id)
  }, [])

  useEffect(() => {
    console.log(course)
  }, [course])

  const reload = () => {
    getCourse(id)
  }

  return (
    <div>
      <div>{id}</div>
      <div>{course.name}</div>
      <div className="bg-yellow-200">
        <div>Importar Estudiantes</div>
        <UploadXsls id={id} reload={reload} />
      </div>
      <div className="bg-red-200">
        <div>Estudiantes asignados</div>
        <div>
          {course?.students?.map(({ student }, index) => (
            <div key={index}>{student?.name}</div>
          ))}
        </div>
      </div>
      <div className="bg-green-200">
        <h1>QRs generados</h1>
        <div>
          {course?.qrs?.map((qr) => (
            <div key={qr.id} className="flex">
              <div>{qr.initDate}</div>
              <div
                className="cursor-pointer"
                onClick={() => router.push(`/courses/${id}/${qr.id}`)}
              >
                Ver asistencias
              </div>
            </div>
          ))}
        </div>
      </div>
      <Button onClick={() => router.push(`/courses/${id}/generate-qr`)}>
        Generar QR
      </Button>
    </div>
  )
}

export default Course
