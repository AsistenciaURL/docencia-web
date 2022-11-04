import { useState } from 'react'
import {
  ApiResponse,
  fetchCustomAPI,
  fetchPostAPI,
  fetchSingleAPI
} from 'services/Connection'
import Student from './types/Student'

type XslxStudent = {
  'No. Carnet': number
  'Nombre completo': string
  Carrera: string
  'Cuenta oficial URL': string
  'Correo alterno': string
}

const useStudents = () => {
  const [loading, setLoading] = useState(false)
  const [student, setStudent] = useState<Student>({} as Student)
  const [students, setStudents] = useState<Student[]>([])

  const createStudents = async (
    students: XslxStudent[],
    courseId: number
  ): Promise<ApiResponse> => {
    setLoading(true)
    for (const student of students) {
      const studentExists = await fetchSingleAPI<Student>(
        'students',
        student['No. Carnet']
      )
      if (studentExists.status !== 'success') {
        await fetchPostAPI<Student>('students', {
          email: student['Cuenta oficial URL'],
          name: student['Nombre completo'],
          faculty: student.Carrera,
          id: student['No. Carnet'].toString()
        })
      }
      await fetchCustomAPI(`assign/${student['No. Carnet']}`, 'POST', {
        courseId: Number(courseId)
      })
    }
    setLoading(false)
    return {
      status: 'success',
      message: 'Estudiantes agregados correctamente'
    }
  }

  return {
    loading,
    createStudents,
    student,
    students
  }
}

export default useStudents
