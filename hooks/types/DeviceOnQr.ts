import Device from './Device'
import Qr from './Qr'

type DeviceOnQr = {
  deviceId: string
  qrId: string
  token: string
  used: string

  qr?: Qr
  device?: Device
}

export default DeviceOnQr
