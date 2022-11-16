import { indigo } from '@mui/material/colors'
import { SnackbarContext } from 'context/SnackbarProvider'
import { styled } from '@mui/material/styles'
import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import BarChartIcon from '@mui/icons-material/BarChart'
import ConfirmDialog from '../core/ConfirmDialog'
import Course from 'hooks/types/Course'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import SecondaryButton from '../core/SecondaryButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import useStudents from 'hooks/useStudents'
import RemoveRedEyeOutlined from '@mui/icons-material/RemoveRedEyeOutlined'

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
  courses: Course[]
}

const CoursesTable = ({ courses }: Props) => {
  const [selectedStudent, setSelectedStudent] = useState<string | undefined>(
    undefined
  )
  const { openSnackbar } = useContext(SnackbarContext)
  const router = useRouter()

  const { unassign } = useStudents()

  // const handleConfirm = async () => {
  //   const response = await unassign(course.id!, selectedStudent!)
  //   if (response.status === 'success') {
  //     openSnackbar({
  //       message: 'Estudiante desasignado correctamente.',
  //       severity: 'success'
  //     })
  //   } else {
  //     openSnackbar({
  //       message: 'Hubo un error al desasignar al estudiante',
  //       severity: 'error'
  //     })
  //   }
  // }

  const handleOpen = (id?: string) => {
    if (id) {
      setSelectedStudent(id)
    }
  }

  return (
    <div className="h-[80%] rounded-2xl">
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell>No.</StyledTableCell>
              <StyledTableCell>Estudiante</StyledTableCell>
              <StyledTableCell align="center">Clases totales</StyledTableCell>
              <StyledTableCell align="center">
                Estudiantes asignados
              </StyledTableCell>
              <StyledTableCell align="center">Detalles</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses?.map((course, index) => (
              <TableRow
                key={index}
                className={(status === 'Desasignado' && 'bg-red-200') || ''}
              >
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {course.name}
                </StyledTableCell>
                <StyledTableCell align="center" component="th" scope="row">
                  {course.classTotal}
                </StyledTableCell>
                <StyledTableCell align="center" component="th" scope="row">
                  {
                    course.students?.filter(
                      (student) => student.status === 'Asignado'
                    ).length
                  }
                </StyledTableCell>
                {/* <StyledTableCell align="center" component="th" scope="row">
                  {course?.classTotal! > 0
                    ? status === 'Asignado' &&
                      `${Math.round(
                        (assistances! / course.classTotal!) * 100
                      )}%`
                    : 'Sin asistencias'}
                </StyledTableCell> */}
                {/* <StyledTableCell align="center">
                    {status === 'Asignado' && (
                      <ConfirmDialog
                        confirm={handleConfirm}
                        onOpen={() => handleOpen(student!.id)}
                        text="Esta acción no se puede deshacer"
                        title="¿Esta seguro de desasignar a este estudiante?"
                      >
                        <IconButton color="secondary" size="small">
                          <RemoveCircleOutlineIcon fontSize="small" />
                        </IconButton>
                      </ConfirmDialog>
                    )}
                  </StyledTableCell> */}
                <StyledTableCell align="center">
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => router.push(`/courses/${course.id}/`)}
                  >
                    <RemoveRedEyeOutlined fontSize="small" />
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

export default CoursesTable
