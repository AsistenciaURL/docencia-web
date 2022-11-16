import { useContext, useEffect } from 'react'

import { isAdmin } from 'services/Functions'
import { SessionContext } from 'context/AuthProvider'
import { useRouter } from 'next/router'

const StudentsList = () => {
  const { session } = useContext(SessionContext)

  const router = useRouter()

  useEffect(() => {
    if (session.uid && !isAdmin(session.uid)) {
      router.push('/home')
    }
  }, [session])

  return <div>{session.uid && isAdmin(session.uid) && <div></div>}</div>
}

export default StudentsList
