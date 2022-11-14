import { useState } from 'react'
import {
  fetchCustomAPI,
  fetchPostAPI,
  fetchSingleAPI
} from 'services/Connection'
import Assistance from './types/Assistance'

type Assist = {
  courseId: number
  studentId: string
  qrId: number
}

const useAssistance = () => {
  const [loading, setLoading] = useState(false)
  const [assistances, setAssistances] = useState<Assistance[]>([])

  const createAssistance = async (assistance: Assistance, token: string) => {
    setLoading(true)
    const response = await fetchPostAPI<Assistance>('assistances', assistance)
    if (response.status === 'success') {
      const res = await fetchCustomAPI(`assist/${token}`, 'POST')
      setLoading(false)
      return res
    }
    setLoading(false)
    return response
  }

  const assist = async (assist: Assist, token: string) => {
    setLoading(true)
    const response = await fetchCustomAPI(`assist/${token}`, 'POST', assist)
    setLoading(false)
    return response
  }

  const getAssistanceWithQr = async (qrId: string) => {
    setLoading(true)
    const response = await fetchSingleAPI<any>('assistances-with-qr', qrId)
    if (response.status === 'success' && response.data) {
      setAssistances(response.data)
    }
    setLoading(false)
    return response
  }

  const getAssistanceWithStudentId = async (
    studentId: string,
    courseId: string
  ) => {
    setLoading(true)
    const response = await fetchSingleAPI<any>(
      'assistances-with-studentId',
      `${studentId}/${courseId}`
    )
    if (response.status === 'success' && response.data) {
      setAssistances(response.data)
    }
    setLoading(false)
    return response
  }

  return {
    createAssistance,
    getAssistanceWithQr,
    getAssistanceWithStudentId,
    assist,
    loading,
    assistances
  }
}

export default useAssistance
