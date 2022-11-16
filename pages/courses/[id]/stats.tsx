import useCourses from 'hooks/useCourses'
import React, { useEffect } from 'react'

export async function getServerSideProps({ query }: { query: { id: string } }) {
  const { id } = query
  return {
    props: { id }
  }
}

const CourseStats = ({ id }: { id: string }) => {
  const { getCourse, course } = useCourses()

  useEffect(() => {
    getCourse(Number(id))
  }, [])

  useEffect(() => {
    console.log(course)
  }, [course])

  return (
    <div>
      <div>{course.name}</div>
      <div>
        {course.students?.map((student) => (
          <div key={student.studentId} className="flex bg-black">
            <div>{student.assistances}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CourseStats
