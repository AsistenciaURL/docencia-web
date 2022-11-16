import Device from './Device'
import Qr from './Qr'

type DeviceOnQr = {
  deviceId: string
  qrId: number
  token: string
  used: string

  qr?: Qr
  device?: Device
}

export default DeviceOnQr
