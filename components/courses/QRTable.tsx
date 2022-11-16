import { indigo } from '@mui/material/colors'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Course from 'hooks/types/Course'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: indigo[900],
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

type Props = {
  course: Course
}

const QRTable = ({ course }: Props) => {
  const router = useRouter()

  return (
    <div className="h-[80%] bg-black rounded-2xl">
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell>No.</StyledTableCell>
              <StyledTableCell>Fecha de creación</StyledTableCell>
              <StyledTableCell>Tiempo activo</StyledTableCell>
              <StyledTableCell align="center">Ver asistencias</StyledTableCell>
              <StyledTableCell align="center">Ver QR</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {course?.qrs?.map((qr, index) => (
              <TableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {dayjs(qr.initDate).format('YYYY-MM-DD [Hora: ]HH:mm:ss')}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {dayjs(qr.limitDate).diff(qr.initDate, 'minute')} minutos
                </StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() =>
                      router.push(`/courses/${course.id}/${qr.id}`)
                    }
                  >
                    <RemoveRedEyeOutlinedIcon fontSize="small" />
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() =>
                      router.push(`/courses/${course.id}/${qr.id}/new`)
                    }
                  >
                    <RemoveRedEyeOutlinedIcon fontSize="small" />
                  </IconButton>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default QRTable
