import { Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { HookResponse } from 'hooks/types'
import { SnackbarContext } from 'context/SnackbarProvider'
import { useContext } from 'react'
import Input from 'components/core/Input'
import useCourses from 'hooks/useCourses'

type FormValues = {
  name: string
  section: number
  total: number
}

const schema = yup.object().shape({
  name: yup.string().required('Es neceasrio ingresar un nombre'),
  section: yup.number().required('Es necesario ingresar una sección'),
  total: yup
    .string()
    .required('es necesario ingreasr el total de clases del curso')
})

const CourseForm = () => {
  const { openSnackbar } = useContext(SnackbarContext)
  const { loading, createCourse } = useCourses()

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
    const response: HookResponse = await createCourse({
      name: data.name,
      section: data.section,
      total: data.total
    })
    if (response.status === 'success') {
      openSnackbar({
        message: 'Curso creado correctamente',
        severity: 'success'
      })
      router.push('/courses')
    } else {
      openSnackbar({
        message: response.message,
        severity: 'error'
      })
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          control={control}
          label="Nombre del curso"
          name="name"
          error={errors.name}
        />
        <Input
          control={control}
          type="number"
          label="Sección"
          name="section"
          error={errors.section}
        />
        <Input
          control={control}
          type="number"
          label="Total de clases"
          name="total"
          error={errors.total}
        />
        <Button type="submit">{loading ? 'Cargando...' : 'Crear curso'}</Button>
      </form>
    </>
  )
}

export default CourseForm
