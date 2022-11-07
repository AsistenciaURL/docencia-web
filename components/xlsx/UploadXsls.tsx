import { Button } from '@mui/material'
import useStudents from 'hooks/useStudents'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { read, utils } from 'xlsx'

type Student = {
  'No. Carnet': number
  'Nombre completo': string
  Carrera: string
  'Cuenta oficial URL': string
  'Correo alterno': string
}

type Props = {
  id: number
  reload: () => void
}

const UploadXsls = ({ id, reload }: Props) => {
  const [students, setStudents] = useState<any[]>([])

  const { createStudents } = useStudents()

  const readUploadFile = (e: any) => {
    e.preventDefault()
    if (e.target.files) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const data = e.target!.result
        const workbook = read(data, { type: 'array' })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const json: Student[] = utils.sheet_to_json(worksheet)
        const formatedStudents: Student[] = json.map((student) => {
          return {
            ...student,
            'Nombre completo': student['Nombre completo']
              .replaceAll('&Aacute;', 'Á')
              .replaceAll('&Eacute;', 'É')
              .replaceAll('&Iacute;', 'Í')
              .replaceAll('&Oacute;', 'Ó')
              .replaceAll('&Uacute;', 'Ú')
          }
        })

        setStudents(formatedStudents)
      }
      reader.readAsArrayBuffer(e.target.files[0])
    }
  }

  const confirmStudents = async () => {
    await createStudents(students, id)
    reload()
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
        {students.map((student, index) => (
          <div key={student['No. Carnet']} className="flex">
            <div>{student['Nombre completo']}</div>
            <Button
              className="border-black border-2"
              onClick={() =>
                setStudents((oldArray) =>
                  oldArray.filter((stundent, i) => i !== index)
                )
              }
            >
              eliminar
            </Button>
          </div>
        ))}
        <Button onClick={() => confirmStudents()}>Confirmar estudiantes</Button>
      </div>
    </>
  )
}

export default UploadXsls
