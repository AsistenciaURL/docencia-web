import CourseStudent from './CourseStudent'

type Student = {
  id?: string
  name: string
  email: string
  faculty?: string

  courses?: CourseStudent[]
}

export default Student
