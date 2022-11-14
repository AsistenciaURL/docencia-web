import { useContext, useState } from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Typography from '@mui/material/Typography'

import Input from 'components/core/Input'
import useStudents from 'hooks/useStudents'
import { SnackbarContext } from 'context/SnackbarProvider'
import PrimaryButton from 'components/core/PrimaryButton'
import StudentListItem from 'components/courses/StudentListItem'
import useDevices from 'hooks/useDevices'

type FormValues = {
  studentId: string
}

const schema = yup.object().shape({
  studentId: yup.string().required()
})

const AssistanceForm = ({
  deviceId,
  refetch
}: {
  deviceId: string
  refetch: any
}) => {
  const [showStudent, setShowStudent] = useState(false)

  const { openSnackbar } = useContext(SnackbarContext)
  const { getStudent, student } = useStudents()
  const { getStudentDevice, associateDevice } = useDevices()
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: FormValues) => {
    const responseDevice = await getStudentDevice(data.studentId)
    console.log(responseDevice)
    if (responseDevice.status !== 'success') {
      const responseStudent = await getStudent(data.studentId)
      if (responseStudent.status === 'success') {
        setShowStudent(true)
      } else {
        openSnackbar({
          message: 'El carnet de este estudiante no existe',
          severity: 'error'
        })
      }
    } else {
      openSnackbar({
        message: 'Este carnet ya esta registrado a otro dispositivo',
        severity: 'error'
      })
    }
  }

  const confirmStudent = async () => {
    console.log(student.id)
    if (student.id) {
      const response: any = await associateDevice(deviceId, student.id)
      console.log(response)
      if (response.status === 'success') {
        openSnackbar({
          message: 'Estudiante registrado correctamente',
          severity: 'success'
        })
        refetch()
      } else {
        openSnackbar({
          message: 'Hubo un error desconocido',
          severity: 'error'
        })
      }
    }
  }

  return (
    <>
      {!student.id ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input control={control} label="Carnet" name="studentId" />
          <PrimaryButton label="Confirmar carnet" type="submit" />
          {showStudent && <h1>{student.name}</h1>}
        </form>
      ) : (
        <>
          <StudentListItem
            email={student.email}
            name={student.name}
            id={student.id}
          />
          <PrimaryButton
            label="Confirmar estudiante"
            onClick={confirmStudent}
          />
          <div className="flex justify-center">
            <Typography variant="caption">
              Esta acción no se podrá deshacer, deberá hablar con un
              administrador.
            </Typography>
          </div>
        </>
      )}
    </>
  )
}

export default AssistanceForm
