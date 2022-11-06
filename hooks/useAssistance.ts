import { useState } from 'react'
import { fetchCustomAPI, fetchPostAPI } from 'services/Connection'
import Assistance from './types/Assistance'

const useAssistance = () => {
  const [loading, setLoading] = useState(false)

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

  return {
    createAssistance,
    loading
  }
}

export default useAssistance
