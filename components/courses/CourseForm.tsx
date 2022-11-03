import { Button, MenuItem } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { SnackbarContext } from 'context/SnackbarProvider'
import { useContext, useEffect, useState } from 'react'
import Input from 'components/core/Input'
import useCourses from 'hooks/useCourses'
import { SessionContext } from 'context/AuthProvider'
import Select from 'components/core/Select'
import { ApiResponse, fetchAPI } from 'services/Connection'
import Semester from 'hooks/types/Semester'
import Faculty from 'hooks/types/Faculty'
import Course from 'hooks/types/Course'

type FormValues = {
  name: string
  section: number
  semester: number
  faculty: number
}

const schema = yup.object().shape({
  name: yup.string().required('Es neceasrio ingresar un nombre'),
  section: yup.number().required('Es necesario ingresar una sección'),
  semester: yup.number().required('Es necesario ingresar un ciclo'),
  faculty: yup.number().required('Es necesario ingresar una facultad')
})

const CourseForm = () => {
  const [semesters, setSemesters] = useState<Semester[]>([])
  const [faculties, setFaculties] = useState<Faculty[]>([])

  const { openSnackbar } = useContext(SnackbarContext)
  const { session } = useContext(SessionContext)
  const { loading, createCourse } = useCourses()

  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    getFields()
  }, [])

  const getFields = async () => {
    const semesterData = await fetchAPI<Semester>('semester', 'GET')
    const facultyData = await fetchAPI<Semester>('faculty', 'GET')
    setSemesters(semesterData.data!)
    setFaculties(facultyData.data!)
  }

  const onSubmit = async (data: FormValues) => {
    console.log(data)
    if (session.uid) {
      const response: ApiResponse<Course> = await createCourse({
        faculty_id: data.faculty,
        professor_id: session.uid,
        semester_id: data.semester,
        name: data.name,
        section: data.section
      })
      if (response.status === 'success') {
        openSnackbar({
          message: response.message,
          severity: 'success'
        })
        router.push('/courses')
      } else {
        openSnackbar({
          message: response.message,
          severity: 'error'
        })
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        control={control}
        label="Nombre del curso"
        name="name"
        error={errors.name}
      />
      <Input
        control={control}
        type="number"
        label="Sección"
        name="section"
        error={errors.section}
      />
      <Select
        control={control}
        name="semester"
        label="Ciclo"
        error={errors.semester}
      >
        {semesters.map((semester, index) => (
          <MenuItem key={index} value={semester.id}>
            {semester.name}
          </MenuItem>
        ))}
      </Select>
      <Select
        control={control}
        name="faculty"
        label="Facultad"
        error={errors.faculty}
      >
        {faculties.map((faculty, index) => (
          <MenuItem key={index} value={faculty.id}>
            {faculty.name}
          </MenuItem>
        ))}
      </Select>
      <Button type="submit">{loading ? 'Cargando...' : 'Crear curso'}</Button>
    </form>
  )
}

export default CourseForm
