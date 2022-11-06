import CourseStudent from './CourseStudent'

type Course = {
  id?: number
  name: string
  section: number
  classTotal?: number
  faculty: string
  semester: string
  professorId: string

  students?: CourseStudent[]
}

export default Course
