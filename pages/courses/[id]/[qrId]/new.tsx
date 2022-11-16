import QRCode from 'react-qr-code'

export async function getServerSideProps({
  query
}: {
  query: { qrId: string }
}) {
  const { qrId } = query
  return {
    props: { qrId }
  }
}

type Props = {
  qrId: string
}

const NewQR = ({ qrId }: Props) => {
  return (
    <div className="w-screen h-screen -mt-12 flex justify-center items-center">
      <QRCode
        value={`qrcode/${qrId}`}
        size={256}
        style={{ height: 'auto', maxWidth: '40%', width: '40%' }}
        viewBox={`0 0 256 256`}
      />
    </div>
  )
}

export default NewQR
