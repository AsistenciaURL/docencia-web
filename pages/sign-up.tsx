import { ReactNode } from 'react'
import Empty from 'layouts/Empty'
import SignUpForm from 'components/signUp/SignUpForm'

const SignUp = () => {
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
