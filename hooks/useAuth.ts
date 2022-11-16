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
import { ApiResponse } from 'services/Connection'
import useProfessors from './useProfessors'

const useAuth = () => {
  const { createProfessor } = useProfessors()

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
  ): Promise<ApiResponse> => {
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
        status: 'success',
        message: 'Bienvenido'
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
    name: string,
    carnet: string
  ) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      if (user.uid) {
        const response = await createProfessor({
          carnet,
          email,
          name,
          id: user.uid
        })
        return response
      } else {
        return {
          status: 'error',
          message: 'Hubo un error al crear el catedrático'
        }
      }
    } catch (error) {
      return {
        status: 'error',
        message: 'Este correo ya se encuentra en uso actualmente'
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
