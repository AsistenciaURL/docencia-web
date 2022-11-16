import { Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

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
    const response = await login(data.email, data.password, data.remember)
    if (response.status === 'success') {
      router.push('/home')
    }
  }

  return (
    <div className="grid place-items-center h-screen ">
      <div className="block rounded-lg shadow-lg bg-white max-w-sm min-w-[50%] p-3 pt-7">
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className="text-lg font-bold text-[#082E71]">Email</p>
          <Input
            control={control}
            label="Correo Electrónico"
            name="email"
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
          <div className="flex items-stretch">
            <Button
              className="text-white bg-[#082E71] hover:bg-white hover:text-[#082E71] font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              type="submit"
            >
              {loading ? 'Cargando...' : 'INICIAR SESIÓN'}
            </Button>
            <p className="text-xs text-center align-middle pt-4">
              Recordar mí cuenta
            </p>
            <Checkbox control={control} name="remember" />
          </div>
        </form>
        <button
          className="text-xs hover:opacity-50"
          onClick={() => router.push('/sign-up')}
        >
          ¿No tienes una cuenta? Registrate
        </button>
      </div>
    </div>
  )
}

export default SignInForm
