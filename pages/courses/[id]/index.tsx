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
  // const [students, setStudents] = useState([])
  const router = useRouter()

  useEffect(() => {
    getCourse(id)
  }, [])

  useEffect(() => {
    console.log(course)
  }, [course])

  return (
    <div>
      <div>{id}</div>
      <div>{course.name}</div>
      <div className="bg-yellow-200">
        <div>Importar Estudiantes</div>
        <UploadXsls id={id} />
      </div>
      <div className="bg-red-200">
        <div>Estudiantes asignados</div>
        <div>
          {/* {relations.map((relation, index) => (
            <div key={index}>
              {
                students.find(
                  (student) => student.Carnet === relation.Estudiante_carnet
                )?.Nombre
              }
            </div>
          ))} */}
        </div>
      </div>
      <Button onClick={() => router.push(`/courses/${id}/generate-qr`)}>
        Generar QR
      </Button>
    </div>
  )
}

export default Course
