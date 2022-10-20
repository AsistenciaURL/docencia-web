import { useState } from 'react'
import { HookResponse } from './types'

const useAssistance = () => {
  const [loading, setLoading] = useState(false)

  const assist = async (carnet: string, qr: string): Promise<HookResponse> => {
    setLoading(true)
    setLoading(false)
    return {
      status: 'success'
    }
  }

  return {
    loading,
    assist
  }
}

export default useAssistance