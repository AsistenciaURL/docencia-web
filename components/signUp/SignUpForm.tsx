import { Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { HookResponse } from 'hooks/types'
import Input from 'components/core/Input'
import useAuth from 'hooks/useAuth'
import { useContext } from 'react'
import { SnackbarContext } from 'context/SnackbarProvider'

type FormValues = {
  email: string
  name: string
  password: string
  passwordConfirm: string
}

const schema = yup.object().shape({
  email: yup.string().email('Debe ser un correo válido').required(''),
  password: yup
    .string()
    .min(6, 'La contraseña debe tener mínimo 6 carácteres')
    .required(''),
  name: yup.string().required('')
})

const SignUpForm = () => {
  const { openSnackbar } = useContext(SnackbarContext)
  const { loading, createUser } = useAuth()

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
    if (data.password === data.passwordConfirm) {
      const response: HookResponse = await createUser(
        data.email,
        data.password,
        data.name
      )
      if (response.status === 'success') {
        openSnackbar({
          message: 'Usuario creado correctamente',
          severity: 'success'
        })
        router.push('/sign-in')
      } else {
        openSnackbar({
          message: response.message,
          severity: 'error'
        })
      }
    } else {
      openSnackbar({
        message: 'Las contraseñas no coinciden',
        severity: 'error'
      })
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          control={control}
          label="Nombre"
          name="name"
          error={errors.name}
        />
        <Input
          control={control}
          label="Correo Electrónico"
          name="email"
          type="email"
          error={errors.email}
        />
        <Input
          control={control}
          label="Contraseña"
          name="password"
          type="password"
          error={errors.password}
        />
        <Input
          control={control}
          label="Repetir contraseña"
          name="passwordConfirm"
          type="password"
          error={errors.passwordConfirm}
        />
        <Button type="submit">
          {loading ? 'Cargando...' : 'Crear usuario'}
        </Button>
      </form>
    </>
  )
}

export default SignUpForm
