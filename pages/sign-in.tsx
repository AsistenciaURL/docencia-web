import SignInForm from 'components/signIn/SignInForm'
import Empty from 'layouts/Empty'
import { ReactNode } from 'react'

const SignIn = () => {
  return (
    <div>
      <div>
        <SignInForm />
      </div>
    </div>
  )
}

SignIn.layout = function layout(page: ReactNode) {
  return <Empty>{page}</Empty>
}

export default SignIn
