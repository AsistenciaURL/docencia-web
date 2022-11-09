import { useContext, useEffect } from 'react'

import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import { SessionContext } from 'context/AuthProvider'
import useCourses from 'hooks/useCourses'
import useProfessors from 'hooks/useProfessors'

const CoursesList = () => {
  const { session } = useContext(SessionContext)
  const { professor, getProfessor } = useProfessors()
  const router = useRouter()

  useEffect(() => {
    getProfessor(session.uid!)
  }, [])

  useEffect(() => {
    console.log(professor)
  }, [professor])

  return (
    <div className="grid place-items-center">
      <div className="h-[100px] w-[80%]  grid place-content-end ">
        <button
          className="text-white bg-[#082E71] hover:bg-white hover:text-[#082E71] font-medium rounded-lg text-base px-5 py-2.5 text-center m-2"
          onClick={() => router.push('/courses/new')}
        >
          Curso +
        </button>
      </div>
      <div className="bg-white w-[80%] rounded-t-[18px] ">
        <div className="bg-[#093073] rounded-t-[18px]">
          <p className="text-zinc-50 font-semibold pl-10">Cursos</p>
        </div>
        <div className="bg-[#8396B8] pl-10 ">
          <p className="text-gray-900 font-semibold">Ciclo</p>
        </div>
        {professor?.courses?.map((course) => (
          <div
            key={course.id}
            className="flex cursor-pointer h-[30px] border border-[#8396B8]"
          >
            <div onClick={() => router.push(`/courses/${course.id}`)}>
              <p className="pl-10 font-semibold text-zinc-900">{course.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CoursesList
