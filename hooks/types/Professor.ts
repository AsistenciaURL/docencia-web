import Course from './Course'

type Professor = {
  id?: string
  carnet: string
  name: string
  email: string

  courses?: Course[]
}

export default Professor
