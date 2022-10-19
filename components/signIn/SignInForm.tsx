import { Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { HookResponse } from 'hooks/types'
import Checkbox from 'components/core/Checkbox'
import Input from 'components/core/Input'
import useAuth from 'hooks/useAuth'

type FormValues = {
  email: string
  password: string
  remember: boolean
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Debe ser un correo válido')
    .required('Ingrese correo electrónico'),
  password: yup.string().required('Ingrese una contraseña')
})

const SignInForm = () => {
  const { loading, login } = useAuth()
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    defaultValues: {
      remember: false
    }
  })

  const onSubmit = async (data: FormValues) => {
    const response: HookResponse = await login(
      data.email,
      data.password,
      data.remember
    )
    if (response.status === 'success') {
      router.push('/home')
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          control={control}
          label="Correo Electrónico"
          name="email"
          error={errors.email}
        />
        <Input
          control={control}
          label="Contraseña"
          name="password"
          type="password"
          error={errors.password}
        />
        <Checkbox control={control} name="remember" />
        <Button type="submit">{loading ? 'Cargando...' : 'Ingresar'}</Button>
      </form>
      <Button onClick={() => router.push('/sign-up')}>Crear usuario</Button>
    </>
  )
}

export default SignInForm
