import CourseStudent from './CourseStudent'
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
  qrs?: Qr[]
}

export default Course
