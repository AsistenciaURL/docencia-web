import type { NextPage } from 'next'
import QRCode from 'react-qr-code'

const Index: NextPage = () => {
  return (
    <div className="w-full bg-red-400 p-4">
      <QRCode value="This is where the QR value should go" />
    </div>
  )
}

export default Index
