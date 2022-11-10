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
    <div className="overflow-y-scroll h-[80%] bg-black rounded-2xl">
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell>No.</StyledTableCell>
              <StyledTableCell>Fecha de creación</StyledTableCell>
              <StyledTableCell>Tiempo activo</StyledTableCell>
              <StyledTableCell align="center">Ver asistencias</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {course?.qrs?.map((qr, index) => (
              <TableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {qr.initDate}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {qr.limitDate}
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default QRTable
