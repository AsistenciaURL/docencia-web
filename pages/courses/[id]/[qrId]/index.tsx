import useAssistance from 'hooks/useAssistance'
import { useEffect } from 'react'

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

const QrIndex = ({ qrId }: Props) => {
  const { getAssistanceWithQr, assistances } = useAssistance()

  useEffect(() => {
    getAssistanceWithQr(qrId)
  }, [])

  useEffect(() => {
    console.log(assistances)
  }, [assistances])

  return (
    <div>
      <div>{qrId}</div>
      <div>
        {assistances.map((assistance) => (
          <div key={assistance.id} className="flex">
            <div>{assistance.student?.name}</div>
            <div>{assistance.studentId}</div>
            <div>{assistance.assistanceCategory?.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default QrIndex
