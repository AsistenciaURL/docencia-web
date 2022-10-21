import { postOptions, _url } from 'services/Connection'
import { HookResponse } from './types'

type Student = {
  'No. Carnet': number
  'Nombre completo': string
  Carrera: string
  'Cuenta oficial URL': string
  'Correo alterno': string
}

const useStudents = () => {
  const createStudents = async (
    students: Student[],
    id: string
  ): Promise<HookResponse> => {
    for (const student of students) {
      try {
        await fetch(
          `${_url}/Estudiantes/`,
          postOptions({
            Carnet: student['No. Carnet'],
            Nombre: student['Nombre completo'],
            Correo: student['Cuenta oficial URL'],
            Facultad_idFacultad: 1
          })
        )
        await fetch(
          `${_url}/Curso_has_estudiante/`,
          postOptions({
            Curso_idCurso: id,
            Estudiante_carnet: student['No. Carnet']
          })
        )
      } catch (e) {
        console.log(e)
      }
    }
    return {
      status: 'success'
    }
  }

  return {
    createStudents
  }
}

export default useStudents
