import { Button } from '@mui/material'
import UploadXsls from 'components/xlsx/UploadXsls'
import useCourses from 'hooks/useCourses'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { indigo } from '@mui/material/colors'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import ModeIcon from '@mui/icons-material/Mode'
import IconButton from '@mui/material/IconButton'
import QrCodeIcon from '@mui/icons-material/QrCode'
import BarChartIcon from '@mui/icons-material/BarChart'

export async function getServerSideProps({ query }: { query: { id: string } }) {
  const { id } = query
  return {
    props: { id }
  }
}

const Course = ({ id }: { id: number }) => {
  const { getCourse, course } = useCourses()
  const router = useRouter()

  useEffect(() => {
    getCourse(id)
  }, [])

  const reload = () => {
    getCourse(id)
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: indigo[900],
      color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14
    }
  }))

  return (
    <div className="grid place-items-center h-screen w-screen">
      <div className=" w-[75%] pt-12 ">
        <p className="text-2xl font-bold text-gray-700">
          Administrando: {course.name}
        </p>
      </div>
      <div className="md:w-[75%] sm:w-[60%] grid md:grid-cols-[80%,20%]">
        <div className=" bg-white border border-[#8396B8] p-4 rounded-2xl md:mr-2 mb-2 md:mb-0">
          <p className="text-[#093073]">Importar estudiantes: </p>
          <UploadXsls id={id} reload={reload} />
        </div>
        <div
          onClick={() => router.push(`/courses/${id}/generate-qr`)}
          className=" bg-white rounded-xl drop-shadow-sm grid place-content-center text-center hover:cursor-pointer
          hover:opacity-60"
        >
          <p>
            <QrCodeIcon color="action" sx={{ fontSize: 55 }} />
          </p>
          <p className="font-light text-gray-900">Generar QR</p>
        </div>
      </div>
      <div className="overflow-y-scroll h-[80%] w-[75%] rounded-2xl">
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <StyledTableCell>No.</StyledTableCell>
                <StyledTableCell>Estudiante</StyledTableCell>
                <StyledTableCell>Carnet</StyledTableCell>
                <StyledTableCell align="center">Desasignar</StyledTableCell>
                <StyledTableCell align="center">Modificar</StyledTableCell>
                <StyledTableCell align="center">Estadísticas</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {course?.students?.map(({ student }, index) => (
                <TableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {student?.name}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {student?.id}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <IconButton color="secondary" size="small">
                      <RemoveCircleOutlineIcon fontSize="small" />
                    </IconButton>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <IconButton color="primary" size="small">
                      <ModeIcon fontSize="small" />
                    </IconButton>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <IconButton color="success" size="small">
                      <BarChartIcon fontSize="small" />
                    </IconButton>
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}

export default Course
