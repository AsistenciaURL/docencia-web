import DeviceOnQr from './DeviceOnQr'

type Qr = {
  id?: number
  initDate: string
  limitDate: string
  courseId: number
  longitude: number
  latitude: number

  devices?: DeviceOnQr[]
}

export default Qr
