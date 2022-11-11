import Course from './Course'
import Student from './Student'

type CourseStudent = {
  courseId: number
  studentId: string
  status: string
  assistances?: number

  student?: Student
  course?: Course
}

export default CourseStudent
