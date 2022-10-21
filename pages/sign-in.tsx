import SignInForm from 'components/signIn/SignInForm'
import Empty from 'layouts/Empty'
import Image from 'next/image'
import { ReactNode } from 'react'

const SignIn = () => {
  return (
    <div className="grid grid-cols-2">
      <div className="grid place-items-center h-screen bg-gradient-to-r from-[#2c79ff] via-[#0e46a7] to-[#082E71] ">
        <div className="p-10">
          <p className="text-5xl text-left text-[#F3F4F6] font-bold">
            Inicia sesión y administra tus asistencias
          </p>
        </div>
      </div>
      <div className="bg-[#F3F4F6]">
        <SignInForm />
      </div>
    </div>
  )
}

SignIn.layout = function layout(page: ReactNode) {
  return <Empty>{page}</Empty>
}

export default SignIn
