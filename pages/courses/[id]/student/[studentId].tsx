import useAssistance from 'hooks/useAssistance'
import { useEffect } from 'react'

export async function getServerSideProps({
  query
}: {
  query: { studentId: string; id: string }
}) {
  const { studentId, id } = query
  return {
    props: { studentId, courseId: id }
  }
}

type Props = {
  studentId: string
  courseId: string
}

const QrIndex = ({ studentId, courseId }: Props) => {
  const { getAssistanceWithStudentId, assistances } = useAssistance()

  useEffect(() => {
    getAssistanceWithStudentId(studentId, courseId)
  }, [])

  useEffect(() => {
    console.log(assistances)
  }, [assistances])

  return (
    <div>
      <div className="bg-black ">{studentId}</div>
      <div>
        {assistances.map((assistance) => (
          <div key={assistance.id} className="flex">
            <div>{assistance.student?.name} </div>
            <div>{assistance.studentId}</div>
            <div>{assistance.assistanceCategory?.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default QrIndex
