import { useState } from 'react'
import { fetchCustomAPI, fetchSingleAPI } from 'services/Connection'
import Device from './types/Device'

const useDevices = () => {
  const [loading, setLoading] = useState(false)
  const [device, setDevice] = useState<Device>({} as Device)

  const associateDevice = async (deviceId: string, studentId: string) => {
    setLoading(true)
    const response = await fetchCustomAPI(
      `associate-device/${deviceId}`,
      'POST',
      {
        studentId
      }
    )
    setLoading(false)
    return response
  }

  const getDevice = async (deviceId: string) => {
    setLoading(true)
    const response = await fetchSingleAPI<Device>('devices', deviceId)
    setDevice(response.data!)
    setLoading(false)
    return response
  }

  return {
    associateDevice,
    getDevice,
    device,
    loading
  }
}

export default useDevices
