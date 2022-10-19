import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { auth } from 'services/Firebase'

const useAuth = () => {
  const [loading, setLoading] = useState(false)

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user
      console.log(user)
    } catch (error: any) {
      const errorCode = error.code
      console.log(errorCode)
      const errorMessage = error.message
      console.log(errorMessage)
    }
    setLoading(false)
  }

  return {
    login,
    loading
  }
}

export default useAuth
