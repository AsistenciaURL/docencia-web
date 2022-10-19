import { createContext, ReactNode, useEffect, useState } from 'react'
import useAuth from 'hooks/useAuth'

type AppContextProps = {
  children: ReactNode
}

type UserSession = {
  uid: string | undefined | null
  email: string | undefined | null
  displayName: string | undefined | null
}

interface SessionContextInterface {
  session: UserSession
  signIn: (arg0: UserSession) => void
}

const defaultState: SessionContextInterface = {
  session: {
    uid: undefined,
    email: undefined,
    displayName: undefined
  },
  signIn: function (arg0: UserSession): void {
    throw new Error('Function not implemented.')
  }
}

export const SessionContext =
  createContext<SessionContextInterface>(defaultState)

const SessionProvider = ({ children }: AppContextProps) => {
  const [session, setSession] = useState(defaultState.session)
  const { currentUser } = useAuth()

  useEffect(() => {
    if (currentUser !== null && currentUser !== undefined) {
      setSession({
        uid: currentUser.uid,
        email: currentUser.email,
        displayName: currentUser.displayName
      })
    } else if (currentUser === null) {
      setSession({
        uid: null,
        email: null,
        displayName: null
      })
    }
  }, [currentUser])

  const signIn = (session: UserSession) => {
    setSession({
      uid: session.uid,
      email: session.email,
      displayName: session.displayName
    })
  }

  return (
    <SessionContext.Provider
      value={{
        session,
        signIn
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}

export default SessionProvider
