import DailyReport from 'components/xlsx/DailyReport'
import useAssistance from 'hooks/useAssistance'
import useCourses from 'hooks/useCourses'
import useQR from 'hooks/useQR'
import React, { useEffect } from 'react'

export async function getServerSideProps({
  query
}: {
  query: { id: string; qrId: string }
}) {
  const { id, qrId } = query
  return {
    props: { id, qrId }
  }
}

const CourseStats = ({ id, qrId }: { id: string; qrId: string }) => {
  const { getAssistanceWithQr, assistances } = useAssistance()
  const { course, getCourse } = useCourses()
  const { getQr, qr } = useQR()

  useEffect(() => {
    getAssistanceWithQr(qrId)
    getCourse(Number(id))
    getQr(qrId)
  }, [])

  return (
    <div>
      <div>
        {course.id && (
          <DailyReport course={course} qr={qr} assistances={assistances} />
        )}
      </div>
    </div>
  )
}

export default CourseStats
