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
  carnet: string
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Debe ser un correo válido')
    .required('Es necesario ingresar un correo'),
  password: yup
    .string()
    .min(6, 'La contraseña debe tener mínimo 6 carácteres')
    .required('Es necesario ingresar una contraseña'),
  name: yup.string().required('Es necesario ingresar un nombre'),
  carnet: yup.string().required('Es necesario ingresar un carnet')
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
        data.name,
        data.carnet
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
    <div className="grid place-items-center h-screen ">
      <div className="block rounded-lg shadow-lg bg-white max-w-sm min-w-[50%] p-3 pt-7">
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className="text-lg font-bold text-[#082E71]">Nombre</p>
          <Input
            control={control}
            label="Nombre"
            name="name"
            error={errors.name}
          />
          <p className="text-lg font-bold text-[#082E71]">Email</p>
          <Input
            control={control}
            label="Correo Electrónico"
            name="email"
            type="email"
            error={errors.email}
          />
          <p className="text-lg font-bold text-[#082E71]">Contraseña</p>
          <Input
            control={control}
            label="Contraseña"
            name="password"
            type="password"
            error={errors.password}
          />
          <p className="text-lg font-bold text-[#082E71]">Repetir contraseña</p>
          <Input
            control={control}
            label="Repetir contraseña"
            name="passwordConfirm"
            type="password"
            error={errors.passwordConfirm}
          />
          <Button
            className="text-white bg-[#082E71] hover:bg-white hover:text-[#082E71] font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            type="submit"
          >
            {loading ? 'Cargando...' : 'Crear usuario'}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default SignUpForm
