import dayjs from 'dayjs'
import { useState } from 'react'
import { ApiResponsePost, fetchPostAPI } from 'services/Connection'
import Qr from './types/Qr'

const useQR = () => {
  const [loading, setLoading] = useState(false)
  const createQR = async (
    id: number,
    limitDate: string,
    latitude: number,
    longitude: number
  ): Promise<ApiResponsePost<Qr>> => {
    setLoading(true)
    const response = await fetchPostAPI<Qr>('qrs', {
      initDate: dayjs(new Date().toISOString()).format('YYYY-MM-DD HH:mm:ss'),
      limitDate,
      courseId: id,
      latitude,
      longitude
    })

    setLoading(false)

    if (response.status === 'success') {
      return {
        status: 'success',
        data: response.data
      }
    }
    return {
      status: 'error'
    }
  }

  return {
    createQR,
    loading
  }
}

export default useQR
