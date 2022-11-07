import { Button, MenuItem } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { SnackbarContext } from 'context/SnackbarProvider'
import { useContext } from 'react'
import Input from 'components/core/Input'
import useCourses from 'hooks/useCourses'
import { SessionContext } from 'context/AuthProvider'
import Select from 'components/core/Select'
import semesters from './Semesters'
import faculties from './Faculties'

type FormValues = {
  name: string
  section: number
  semester: string
  faculty: string
}

const schema = yup.object().shape({
  name: yup.string().required('Es neceasrio ingresar un nombre'),
  section: yup.number().required('Es necesario ingresar una sección'),
  semester: yup.string().required('Es necesario ingresar un ciclo'),
  faculty: yup.string().required('Es necesario ingresar una facultad')
})

const CourseForm = () => {
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

  const onSubmit = async (data: FormValues) => {
    if (session.uid) {
      const response = await createCourse({
        faculty: data.faculty,
        professorId: session.uid,
        semester: data.semester,
        name: data.name,
        section: data.section
      })
      if (response.status === 'success') {
        openSnackbar({
          message: 'Curso creado correctamente',
          severity: 'success'
        })
        router.push('/courses')
      } else {
        console.log(response)
        openSnackbar({
          message: 'Error al crear el curso',
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
          <MenuItem key={index} value={semester.name}>
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
          <MenuItem key={index} value={faculty.name}>
            {faculty.name}
          </MenuItem>
        ))}
      </Select>
      <Button type="submit">{loading ? 'Cargando...' : 'Crear curso'}</Button>
    </form>
  )
}

export default CourseForm
