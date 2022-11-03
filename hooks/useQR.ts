import { useState } from 'react'
import { ApiResponse, fetchAPI } from 'services/Connection'
import Qr from './types/Qr'

const useQR = () => {
  const [loading, setLoading] = useState(false)
  const createQR = async (
    id: number,
    limitDate: string,
    latitude: number,
    longitude: number
  ): Promise<ApiResponse<Qr>> => {
    setLoading(true)
    const obj = {
      limit_date: limitDate,
      course_id: id,
      latitude,
      longitude
    }
    // const response = await fetchAPI<Qr>('qr', 'POST', {
    //   limit_date: '2023-12-12',
    //   course_id: id,
    //   latitude: 15.3175994,
    //   longitude: -91.4696517
    // })

    console.log(obj)
    setLoading(false)

    return {
      status: 'success',
      message: 'Mensaje'
    }
  }

  return {
    createQR
  }
}

export default useQR
