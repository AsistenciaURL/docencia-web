import AssistanceCategory from './AssistanceCategory'
import Student from './Student'

type Assistance = {
  id?: number
  date: string
  observations: string
  courseId: number
  assistanceCategoryId: number
  studentId: string
  qrId: number

  student?: Student
  assistanceCategory?: AssistanceCategory
}

export default Assistance
