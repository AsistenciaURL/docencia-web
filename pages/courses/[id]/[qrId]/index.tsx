import useAssistance from 'hooks/useAssistance'
import { useContext, useEffect, useState } from 'react'
import { Card, CardContent, TextField, Typography } from '@mui/material'
import { indigo } from '@mui/material/colors'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import ConfirmDialog from 'components/core/ConfirmDialog'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import EditIcon from '@mui/icons-material/Edit'
import { SnackbarContext } from 'context/SnackbarProvider'
import Assistance from 'hooks/types/Assistance'
import Assessment from '@mui/icons-material/Assessment'
import { useRouter } from 'next/router'

export async function getServerSideProps({
  query
}: {
  query: { id: string; qrId: string }
}) {
  const { id, qrId } = query
  return {
    props: { id, qrId }
  }
}

type Props = {
  qrId: string
  id: string
}

const assistanceColor = [
  '',
  'bg-green-200',
  'bg-red-200',
  'bg-yellow-200',
  'bg-orange-200'
]

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: indigo[900],
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const QrIndex = ({ qrId, id }: Props) => {
  const { getAssistanceWithQr, assistances, changeCategory, addObservations } =
    useAssistance()

  const [selected, setSelected] = useState('')
  const [observations, setObservations] = useState('')
  const { openSnackbar } = useContext(SnackbarContext)
  const router = useRouter()

  useEffect(() => {
    getAssistanceWithQr(qrId)
  }, [])

  const handleChange = (event: SelectChangeEvent) => {
    setSelected(event.target.value as string)
  }

  const confirmCategoryChange = async (assistance: Assistance) => {
    if (assistance.assistanceCategoryId !== Number(selected) && assistance.id) {
      const response = await changeCategory(assistance.id, selected)
      openSnackbar({
        severity: response.status,
        message: response.message
      })
      getAssistanceWithQr(qrId)
    }
  }

  const confirmObservation = async (assistance: Assistance) => {
    if (assistance.id) {
      const response = await addObservations(assistance.id, observations)
      openSnackbar({
        severity: response.status,
        message: response.message
      })
      getAssistanceWithQr(qrId)
    }
  }

  return (
    <div className="grid place-items-center w-screen">
      <div className="md:flex w-[80%] pt-12">
        <Card className="w-full mx-2">
          <CardContent>
            <Typography variant="h4">Clase: {}</Typography>
          </CardContent>
        </Card>
        <Card
          onClick={() => router.push(`/courses/${id}/${qrId}/report`)}
          className=" bg-white rounded-xl drop-shadow-sm grid place-content-center text-center hover:cursor-pointer
          hover:opacity-60 md:w-1/3 w-full"
        >
          <p>
            <Assessment color="action" sx={{ fontSize: 55 }} />
          </p>
          <p className="font-light text-gray-900">Generar reporte</p>
        </Card>
        <Card
          onClick={() => getAssistanceWithQr(qrId)}
          className=" bg-white rounded-xl drop-shadow-sm grid place-content-center text-center hover:cursor-pointer
          hover:opacity-60 md:w-1/3 w-full"
        >
          <p>
            <Assessment color="action" sx={{ fontSize: 55 }} />
          </p>
          <p className="font-light text-gray-900">Actualizar</p>
        </Card>
      </div>
      <Card className="md:w-3/4 w-full mt-4">
        <CardContent>
          <div className="h-[80%] bg-white rounded-2xl">
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>No.</StyledTableCell>
                    <StyledTableCell>Nombre</StyledTableCell>
                    <StyledTableCell>Carnet</StyledTableCell>
                    <StyledTableCell align="center">Estado</StyledTableCell>
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
                        {assistance.student?.name}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {assistance.studentId}
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        className={
                          assistanceColor[assistance.assistanceCategoryId]
                        }
                      >
                        <ConfirmDialog
                          confirm={() => confirmCategoryChange(assistance)}
                          onOpen={() =>
                            setSelected(
                              assistance.assistanceCategoryId.toString()
                            )
                          }
                          text={
                            <>
                              <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                  Estado
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  defaultValue={assistance.assistanceCategoryId.toString()}
                                  value={selected}
                                  label="Estado"
                                  onChange={handleChange}
                                >
                                  <MenuItem value="1">Presente</MenuItem>
                                  <MenuItem value="2">Ausente</MenuItem>
                                  <MenuItem value="3">Justificado</MenuItem>
                                  <MenuItem value="4">Tardío</MenuItem>
                                </Select>
                              </FormControl>
                            </>
                          }
                          title="Cambiar estado de asistencia"
                        >
                          <div className="hover:bg-gray-200 w-full h-6 cursor-pointer transition-colors flex items-center justify-around">
                            {assistance.assistanceCategory?.name} <EditIcon />
                          </div>
                        </ConfirmDialog>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <ConfirmDialog
                          confirm={() => confirmObservation(assistance)}
                          onOpen={() => console.log('')}
                          text={
                            <>
                              <TextField
                                fullWidth
                                label="Observación"
                                multiline
                                rows={8}
                                variant="outlined"
                                onChange={(e) =>
                                  setObservations(e.target.value)
                                }
                              />
                            </>
                          }
                          title="Agregar observación"
                        >
                          <div className="hover:bg-gray-200 w-96 h-6 cursor-pointer transition-colors flex items-center justify-around">
                            {assistance.observations === 'Ninguna'
                              ? ''
                              : assistance.observations}{' '}
                            <EditIcon />
                          </div>
                        </ConfirmDialog>
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
