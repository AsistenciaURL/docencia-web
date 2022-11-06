import { useContext, useState } from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import Input from 'components/core/Input'
import useStudents from 'hooks/useStudents'
import { SnackbarContext } from 'context/SnackbarProvider'
import PrimaryButton from 'components/core/PrimaryButton'

type FormValues = {
  studentId: string
}

const schema = yup.object().shape({
  studentId: yup.string().required()
})

const AssistanceForm = ({ id, refetch }: { id: string; refetch: any }) => {
  const [showStudent, setShowStudent] = useState(false)
  const [wa, setwa] = useState('')

  const { openSnackbar } = useContext(SnackbarContext)
  const { getStudent, student } = useStudents()
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: FormValues) => {
    const response = await getStudent(data.studentId)
    setwa(JSON.stringify(response))
    if (response.status === 'success') {
      setShowStudent(true)
      refetch()
    } else {
      openSnackbar({
        message: 'El carnet de este estudiante no existe',
        severity: 'error'
      })
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input control={control} label="Carnet" name="studentId" />
        <PrimaryButton label="Confirmar estudiante" type="submit" />
        {wa}
        {showStudent && <h1>{student.name}</h1>}
      </form>
    </>
  )
}

export default AssistanceForm
