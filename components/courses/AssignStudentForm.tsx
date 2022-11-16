import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { SnackbarContext } from 'context/SnackbarProvider'
import { useContext } from 'react'
import Input from 'components/core/Input'
import useStudents from 'hooks/useStudents'
import PrimaryButton from 'components/core/PrimaryButton'

type FormValues = {
  studentId: string
  email: string
  name: string
}

const schema = yup.object().shape({
  studentId: yup
    .string()
    .required('Es neceasrio ingresar el carnet del estudiante'),
  name: yup.string(),
  email: yup.string()
})

type AssignStudentFormProps = {
  courseId: string
}

const AssignStudentForm = ({ courseId }: AssignStudentFormProps) => {
  const { openSnackbar } = useContext(SnackbarContext)
  const { loading, assignExistingStudent } = useStudents()

  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: FormValues) => {
    if (!data.name) {
      const response = await assignExistingStudent(data.studentId, courseId)
      console.log(response)
      if (typeof response.message === 'string') {
        openSnackbar({
          message: response?.message,
          severity: response.status
        })
      }

      if (response.status === 'success') {
        router.push('/courses/' + courseId)
      }
    }
  }

  return (
    <div className="grid place-items-center ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="block rounded-lg shadow-lg self-start mt-6 bg-white max-w-sm min-w-[50%] p-3 pt-4 text-center "
      >
        <p className="text-xl font-semibold text-[#082E71] pb-3">
          Asignar estudiante
        </p>
        <Input
          control={control}
          label="Carnet del estudiante"
          name="studentId"
          error={errors.studentId}
        />
        <PrimaryButton
          type="submit"
          loading={false}
          label={loading ? 'Cargando...' : 'Crear curso'}
        />
      </form>
    </div>
  )
}

export default AssignStudentForm
