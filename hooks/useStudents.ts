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

  const unassign = async (courseId: number, studentId: string) => {
    setLoading(true)
    const response = await fetchCustomAPI(`unassign/`, 'POST', {
      courseId,
      studentId
    })
    setLoading(false)
    return response
  }

  const getStudent = async (studentId: string) => {
    setLoading(true)
    const response = await fetchSingleAPI<Student>('students', studentId)
    if (response.status === 'success' && response.data) {
      setStudent(response.data)
    }
    setLoading(false)
    return response
  }

  return {
    loading,
    createStudents,
    student,
    getStudent,
    unassign
  }
}

export default useStudents
