import { ApiResponse, fetchAPI } from 'services/Connection'
import CourseStudent from './types/CouseStudent'
import Student from './types/Student'

type XslxStudent = {
  'No. Carnet': number
  'Nombre completo': string
  Carrera: string
  'Cuenta oficial URL': string
  'Correo alterno': string
}

const useStudents = () => {
  const createStudents = async (
    students: XslxStudent[],
    id: number
  ): Promise<ApiResponse> => {
    for (const student of students) {
      const response = await fetchAPI<Student>('student', 'POST', {
        id: student['No. Carnet'],
        name: student['Nombre completo'],
        email: student['Cuenta oficial URL'],
        faculty_id: 1
      })

      if (response.status === 'success') {
        const response = await fetchAPI<CourseStudent>(
          'course_student',
          'POST',
          {
            course_id: id,
            student_id: student['No. Carnet']
          }
        )
        if (response.status === 'error') {
          console.log('Error')
        }
      }
    }
    return {
      status: 'success',
      message: 'Estudiantes guardados correctamente'
    }
  }

  return {
    createStudents
  }
}

export default useStudents
