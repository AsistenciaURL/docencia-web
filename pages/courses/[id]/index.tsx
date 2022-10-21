import { Button } from '@mui/material'
import UploadXsls from 'components/xlsx/UploadXsls'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { _url } from 'services/Connection'

export async function getServerSideProps({ query }: { query: { id: string } }) {
  const { id } = query
  return {
    props: { id }
  }
}

const Course = ({ id }: { id: string }) => {
  const [relations, setRelations] = useState([])
  const [students, setStudents] = useState([])
  const router = useRouter()

  useEffect(() => {
    fetch(`${_url}/Curso_has_estudiante/`)
      .then((response) => response.json())
      .then((data) => setRelations(data))
    fetch(`${_url}/Estudiantes/`)
      .then((response) => response.json())
      .then((data) => setStudents(data))
  }, [])

  useEffect(() => {
    console.log(students)
    console.log(relations)
  }, [students, relations])

  return (
    <div>
      <div>{id}</div>
      <div className="bg-yellow-200">
        <div>Importar Estudiantes</div>
        <UploadXsls id={id} />
      </div>
      <div className="bg-red-200">
        <div>Estudiantes asignados</div>
        <div>
          {relations.map((relation, index) => (
            <div key={index}>
              {
                students.find(
                  (student) => student.Carnet === relation.Estudiante_carnet
                )?.Nombre
              }
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
