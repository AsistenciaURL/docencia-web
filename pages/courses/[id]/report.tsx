import DeficientReport from 'components/xlsx/DeficientReport'
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

  return <div>{course.id && <DeficientReport course={course} />}</div>
}

export default CourseStats
