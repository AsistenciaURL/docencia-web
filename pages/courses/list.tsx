import { useEffect, useContext } from 'react'
import { SessionContext } from 'context/AuthProvider'
import { useRouter } from 'next/router'
import { isAdmin } from 'services/Functions'

import { Card, CardContent, Typography } from '@mui/material'

import useCourses from 'hooks/useCourses'
import CoursesTable from 'components/courses/CoursesTable'

const list = () => {
  const { session } = useContext(SessionContext)
  const { getCourses, courses } = useCourses()

  const router = useRouter()

  useEffect(() => {
    if (session.uid && !isAdmin(session.uid)) {
      router.push('/home')
    } else {
      getCourses()
    }
  }, [session])

  useEffect(() => {
    console.log(courses)
  }, [courses])

  return (
    <div>
      {session.uid && isAdmin(session.uid) && (
        <div>
          <div className="grid place-items-center w-screen">
            <div className="md:flex w-[80%] pt-12">
              <Card className="w-full mx-2">
                <CardContent>
                  <Typography variant="h4">
                    Administrando todos los cursos
                  </Typography>
                </CardContent>
              </Card>
            </div>
            <Card className="md:w-3/4 w-full mt-4">
              <CardContent>
                <CoursesTable courses={courses} />
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

export default list
