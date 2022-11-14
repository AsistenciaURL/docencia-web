import { Divider } from '@mui/material'
import PrimaryButton from 'components/core/PrimaryButton'
import SecondaryButton from 'components/core/SecondaryButton'
import StudentListItem from 'components/courses/StudentListItem'
import { SnackbarContext } from 'context/SnackbarProvider'
import useStudents from 'hooks/useStudents'
import { useContext, useState } from 'react'
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
  const [students, setStudents] = useState<Student[]>([])

  const { createStudents } = useStudents()
  const { openSnackbar } = useContext(SnackbarContext)

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
    setLoading(true)
    await createStudents(students, id)
    openSnackbar({
      message: 'Estudiantes agregados correctamente.',
      severity: 'success'
    })
    setLoading(false)
    setStudents([])
    reload()
  }

  return (
    <div>
      <div className="flex justify-between">
        <form>
          <input
            type="file"
            name="upload"
            id="upload"
            onChange={readUploadFile}
            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4
           file:rounded-sm file:border-0 file:text-sm file:font-semibold 
           file:bg-[#8396B8] file:text-white hover:file:bg-violet-100 mt-2 transition-all"
          />
        </form>
        {students.length > 0 && (
          <div className="md:w-1/4 h-10">
            
            <PrimaryButton
              label="Confirmar estudiantes"
              onClick={() => confirmStudents()}
            />
          </div>
        )}
      </div>
      <div>
        {students.map((student, index) => (
          <div key={student['No. Carnet']}>
            <div className="md:flex justify-between">
              <div className="w-full">
                <StudentListItem
                  email={student['Cuenta oficial URL']}
                  name={student['Nombre completo']}
                  id={student['No. Carnet'].toString()}
                />
              </div>
              <div className="">
                <SecondaryButton
                  label="Eliminar"
                  onClick={() =>
                    setStudents((oldArray) =>
                      oldArray.filter((stundent, i) => i !== index)
                    )
                  }
                />
              </div>
            </div>
            <Divider />
          </div>
        ))}
      </div>
    </div>
  )
}

export default UploadXsls
