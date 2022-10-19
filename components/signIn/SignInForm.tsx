import { Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import Input from 'components/core/Input'
import useAuth from 'hooks/useAuth'

type FormValues = {
  email: string
  password: string
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

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: FormValues) => {
    login(data.email, data.password)
  }

  return (
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
      <Button type="submit">{loading ? 'Cargando...' : 'Ingresar'}</Button>
    </form>
  )
}

export default SignInForm
