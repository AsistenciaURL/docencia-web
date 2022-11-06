import Student from './Student'

type Device = {
  id?: number
  name: string
  qrId?: number
  studentId?: string

  student?: Student
}

export default Device
