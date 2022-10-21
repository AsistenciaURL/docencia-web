import { ReactNode, useEffect } from 'react'

import { auth } from 'services/Firebase'
import { signOut } from 'firebase/auth'
import Empty from 'layouts/Empty'
import SignUpForm from 'components/signUp/SignUpForm'

const SignUp = () => {
  useEffect(() => {
    signOut(auth)
  }, [])

  return (
    <div>
      <SignUpForm />
    </div>
  )
}

SignUp.layout = function layout(page: ReactNode) {
  return <Empty>{page}</Empty>
}

export default SignUp
