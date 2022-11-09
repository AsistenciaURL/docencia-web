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
    <div className="">
      <form>
        <input
          type="file"
          name="upload"
          id="upload"
          onChange={readUploadFile}
          className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4
           file:rounded-sm file:border-0 file:text-sm file:font-semibold 
           file:bg-[#8396B8] file:text-white hover:file:bg-violet-100 mt-2"
        />
      </form>
      <div>
        {students.map((student, index) => (
          <div key={student['No. Carnet']} className="flex justify-between">
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
        <button
          className="text-white bg-[#082E71] hover:bg-white hover:text-[#082E71] font-small rounded-lg text-base px-5 py-2.5 text-center m-2"
          onClick={() => confirmStudents()}
        >
          Confirmar estudiantes
        </button>
      </div>
    </div>
  )
}

export default UploadXsls
