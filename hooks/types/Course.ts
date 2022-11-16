import CourseStudent from './CourseStudent'
import Professor from './Professor'
import Qr from './Qr'

type Course = {
  id?: number
  name: string
  section: number
  classTotal?: number
  faculty: string
  semester: string
  professorId: string

  students?: CourseStudent[]
  professor?: Professor
  qrs?: Qr[]
}

export default Course
