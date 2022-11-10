import { indigo } from '@mui/material/colors'
import { styled } from '@mui/material/styles'
import BarChartIcon from '@mui/icons-material/BarChart'
import IconButton from '@mui/material/IconButton'
import ModeIcon from '@mui/icons-material/Mode'
import Paper from '@mui/material/Paper'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Course from 'hooks/types/Course'

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

const StudentTable = ({ course }: Props) => {
  return (
    <div className="overflow-y-scroll h-[80%] rounded-2xl">
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
  )
}

export default StudentTable
