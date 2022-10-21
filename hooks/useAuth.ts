import { useEffect, useState } from 'react'

import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  User
} from 'firebase/auth'

import { auth } from 'services/Firebase'
import { HookResponse } from './types'

const useAuth = () => {
  const [loading, setLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined
  )

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })
  }, [])

  const login = async (
    email: string,
    password: string,
    remember: boolean
  ): Promise<HookResponse> => {
    setLoading(true)
    await setPersistence(
      auth,
      remember ? browserLocalPersistence : browserSessionPersistence
    )
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user
      console.log(user)
      setLoading(false)
      return {
        status: 'success'
      }
    } catch (error: any) {
      setLoading(false)
      return {
        message: error.message,
        status: 'error'
      }
    }
  }

  const createUser = async (
    email: string,
    password: string,
    name: string
  ): Promise<HookResponse> => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      return {
        status: 'success'
      }
    } catch (error: any) {
      return {
        message: error.message,
        status: 'error'
      }
    }
  }

  return {
    login,
    loading,
    currentUser,
    createUser
  }
}

export default useAuth
