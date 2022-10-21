import { ReactNode, useContext, useEffect, useState } from 'react'

import { Button } from '@mui/material'
import { signOut } from 'firebase/auth'
import { useRouter } from 'next/router'

import { auth } from 'services/Firebase'
import { SessionContext } from 'context/AuthProvider'

type Props = {
  children: ReactNode
}

const Default = ({ children }: Props) => {
  const router = useRouter()

  const { session } = useContext(SessionContext)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session.uid) {
      setLoading(false)
    } else if (session.uid === null) {
      router.push('/sign-in')
    }
  }, [session])

  const logOut = async () => {
    await signOut(auth)
    router.push('/sign-in')
  }

  return (
    <div>
      {!loading && (
        <div>
          <Button onClick={() => logOut()}>Salir</Button>
          <div>{children}</div>
        </div>
      )}
    </div>
  )
}

export default Default
