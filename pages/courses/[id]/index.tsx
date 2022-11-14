import { Box, Card, CardContent, Tab, Tabs, Typography } from '@mui/material'
import UploadXsls from 'components/xlsx/UploadXsls'
import useCourses from 'hooks/useCourses'
import { useRouter } from 'next/router'
import { ReactNode, SyntheticEvent, useEffect, useState } from 'react'

import QrCodeIcon from '@mui/icons-material/QrCode'
import StudentTable from 'components/courses/StudentTable'
import QRTable from 'components/courses/QRTable'
import AssessmentIcon from '@mui/icons-material/Assessment'

export async function getServerSideProps({ query }: { query: { id: string } }) {
  const { id } = query
  return {
    props: { id }
  }
}

interface TabPanelProps {
  children?: ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      className="w-full"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

const Course = ({ id }: { id: number }) => {
  const { getCourse, course } = useCourses()
  const router = useRouter()
  const [value, setValue] = useState(0)

  useEffect(() => {
    getCourse(id)
  }, [])

  useEffect(() => {
    console.log(course)
  }, [course])

  const reload = () => {
    getCourse(id)
  }

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <div className="grid place-items-center w-screen">
      <div className="md:flex w-[80%] pt-12">
        <Card className="w-full mx-2">
          <CardContent>
            <Typography variant="h4">Administrando: {course.name}</Typography>
          </CardContent>
        </Card>
        <Card
          onClick={() => router.push(`/courses/${id}/stats`)}
          className=" bg-white rounded-xl drop-shadow-sm grid place-content-center text-center hover:cursor-pointer
          hover:opacity-60 md:w-1/3 w-full"
        >
          <p>
            <AssessmentIcon color="action" sx={{ fontSize: 55 }} />
          </p>
          <p className="font-light text-gray-900">Ver estadísticas</p>
        </Card>
        <Card
          onClick={() => router.push(`/courses/${id}/generate-qr`)}
          className=" bg-white rounded-xl drop-shadow-sm grid place-content-center text-center hover:cursor-pointer
          hover:opacity-60 md:w-1/3 w-full mx-2"
        >
          <p>
            <QrCodeIcon color="action" sx={{ fontSize: 55 }} />
          </p>
          <p className="font-light text-gray-900">Generar QR</p>
        </Card>
      </div>
      <Card className="md:w-3/4 w-full mt-4">
        <CardContent>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Ver estudiantes" {...a11yProps(0)} />
              <Tab label="Ver QRs creados" {...a11yProps(1)} />
              <Tab label="Importar estudiantes" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            {course && <StudentTable refetch={reload} course={course} />}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {course && <QRTable course={course} />}
          </TabPanel>
          <TabPanel value={value} index={2}>
            <div className=" bg-white border border-[#8396B8] p-4 rounded-2xl md:mr-2 mb-2 md:mb-0">
              <p className="text-[#093073]">
                Importar estudiantes desde archivo de Excel:{' '}
              </p>
              <UploadXsls id={id} reload={reload} />
            </div>
          </TabPanel>
        </CardContent>
      </Card>
    </div>
  )
}

export default Course
