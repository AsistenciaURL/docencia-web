import { useState } from 'react'
import { ApiResponse, fetchAPI } from 'services/Connection'
import Qr from './types/Qr'

const useQR = () => {
  const [loading, setLoading] = useState(false)
  const createQR = async (id: number): Promise<ApiResponse<Qr>> => {
    setLoading(true)
    const response = await fetchAPI<Qr>('qr', 'POST', {
      limit_date: '2023-12-12',
      course_id: id
    })
    setLoading(false)

    return response
  }

  return {
    createQR
  }
}

export default useQR
