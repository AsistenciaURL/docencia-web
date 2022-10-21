import { ReactNode, useEffect } from 'react'

import SignInForm from 'components/signIn/SignInForm'
import { signOut } from 'firebase/auth'
import Empty from 'layouts/Empty'
import { auth } from 'services/Firebase'

const SignIn = () => {
  useEffect(() => {
    signOut(auth)
  }, [])

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
