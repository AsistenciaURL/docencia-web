import useAssistance from 'hooks/useAssistance'
import { useEffect } from 'react'
import { Box, Card, CardContent, Tab, Tabs, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { indigo } from '@mui/material/colors'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import dayjs from 'dayjs'

export async function getServerSideProps({
  query
}: {
  query: { studentId: string; id: string }
}) {
  const { studentId, id } = query
  return {
    props: { studentId, courseId: id }
  }
}

type Props = {
  studentId: string
  courseId: string
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

const QrIndex = ({ studentId, courseId }: Props) => {
  const { getAssistanceWithStudentId, assistances } = useAssistance()

  useEffect(() => {
    getAssistanceWithStudentId(studentId, courseId)
  }, [])

  useEffect(() => {
    console.log(assistances)
  }, [assistances])

  return (
    <div className="grid place-items-center w-screen">
      <div className="md:flex w-[80%] pt-12">
        <Card className="w-full mx-2">
          <CardContent>
            {assistances.map((assistance) => (
              <div>
                <Typography variant="h4">Estudiante: {studentId}</Typography>
                <Typography variant="subtitle1">
                  {assistance.student?.name}
                </Typography>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      <Card className="md:w-3/4 w-full mt-4">
        <CardContent>
          <div className="overflow-y-scroll h-[80%] bg-white rounded-2xl">
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>No.</StyledTableCell>
                    <StyledTableCell>Fecha</StyledTableCell>
                    <StyledTableCell>Estado</StyledTableCell>
                    <StyledTableCell align="center">
                      Observaciones
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {assistances.map((assistance, index) => (
                    <TableRow key={(assistance.id, index)} className="flex">
                      <StyledTableCell component="th" scope="row">
                        {index + 1}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {dayjs(assistance.date).format(
                          'YYYY-MM-DD [Hora: ]HH:mm:ss'
                        )}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {assistance.assistanceCategory?.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {assistance.observations}
                      </StyledTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default QrIndex
