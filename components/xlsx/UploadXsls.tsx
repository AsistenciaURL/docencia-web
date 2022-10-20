import { useState } from 'react'
import { read, utils } from 'xlsx'

type Student = {
  'No. Carnet': number
  'Nombre completo': string
  Carrera: string
  'Cuenta oficial URL': string
  'Correo alterno': string
}

const UploadXsls = () => {
  const [students, setStudents] = useState<Student[]>([])

  const readUploadFile = (e: any) => {
    e.preventDefault()
    if (e.target.files) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const data = e.target.result
        const workbook = read(data, { type: 'array' })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const json: Student[] = utils.sheet_to_json(worksheet)
        setStudents(json)
      }
      reader.readAsArrayBuffer(e.target.files[0])
    }
  }

  return (
    <>
      <form>
        <label htmlFor="upload">Upload File</label>
        <input
          type="file"
          name="upload"
          id="upload"
          onChange={readUploadFile}
        />
      </form>
      <div>
        {students.map((student) => (
          <div key={student['No. Carnet']}>{student.Carrera}</div>
        ))}
      </div>
    </>
  )
}

export default UploadXsls
