import { ReactNode, useEffect } from 'react'
import Empty from 'layouts/Empty'
import SignUpForm from 'components/signUp/SignUpForm'
import { signOut } from 'firebase/auth'

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
