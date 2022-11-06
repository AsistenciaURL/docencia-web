import { useState } from 'react'
import {
  ApiResponsePost,
  fetchPostAPI,
  fetchSingleAPI
} from 'services/Connection'
import DeviceOnQr from './types/DeviceOnQr'
import Qr from './types/Qr'

const useQR = () => {
  const [loading, setLoading] = useState(false)
  const [deviceOnQr, setDeviceOnQr] = useState<DeviceOnQr>({} as DeviceOnQr)

  const createQR = async (
    id: string,
    limitDate: string,
    latitude: number,
    longitude: number
  ): Promise<ApiResponsePost<Qr>> => {
    setLoading(true)
    const response = await fetchPostAPI<Qr>('qrs', {
      initDate: new Date().toISOString(),
      limitDate,
      courseId: Number(id),
      latitude,
      longitude
    })

    setLoading(false)
    console.log(response)

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

  const getQrWithToken = async (token: string) => {
    setLoading(true)
    const response = await fetchSingleAPI<DeviceOnQr>('device-qr', token)
    if (response.status === 'success') {
      setDeviceOnQr(response.data!)
    }
    setLoading(false)
    return response
  }

  return {
    createQR,
    loading,
    getQrWithToken,
    deviceOnQr
  }
}

export default useQR
