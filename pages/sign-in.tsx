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
    <div>
      <SignInForm />
    </div>
  )
}

SignIn.layout = function layout(page: ReactNode) {
  return <Empty>{page}</Empty>
}

export default SignIn
