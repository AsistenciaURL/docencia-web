import { SessionContext } from 'context/AuthProvider'
import { useContext, useState } from 'react'
import { postOptions, _url } from 'services/Connection'
import { HookResponse } from './types'

type CourseData = {
  name: string
  section: number
  date?: string
  total: number
  semester?: number
  faculty?: number
}

const useCourses = () => {
  const [loading, setLoading] = useState(false)
  const { session } = useContext(SessionContext)

  const createCourse = async ({
    date,
    faculty,
    name,
    section,
    semester,
    total
  }: CourseData): Promise<HookResponse> => {
    setLoading(true)
    console.log(session.uid)
    try {
      const response = await fetch(
        `${_url}/Curso/`,
        postOptions({
          Nombre: 'Ingeniería de Software 1',
          Seccion: 1,
          Anio: '2022-12-12',
          TotalClases: 40,
          Ciclo_idciclo: 1,
          Facultad_idFacultad: 1,
          Docente_Carnet: session.uid
        })
      )

      console.log(response)

      setLoading(false)
      if (response.ok) {
        return {
          status: 'success'
        }
      }
      return {
        message: 'Hubo un error al guardar el curso',
        status: 'error'
      }
    } catch (error: any) {
      return {
        message: error.message,
        status: 'error'
      }
    }
  }

  return {
    loading,
    createCourse
  }
}

export default useCourses
