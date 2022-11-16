import { TextField, Typography } from '@mui/material'
import ConfirmDialog from 'components/core/ConfirmDialog'
import PrimaryButton from 'components/core/PrimaryButton'
import { SnackbarContext } from 'context/SnackbarProvider'
import dayjs from 'dayjs'
import Assistance from 'hooks/types/Assistance'
import Course from 'hooks/types/Course'
import Qr from 'hooks/types/Qr'
import { useContext, useRef, useState } from 'react'
import { useDownloadExcel } from 'react-export-table-to-excel'

type Props = {
  course: Course
  assistances: Assistance[]
  qr: Qr
}

type Comments = {
  [key: string]: {
    observation?: string
  }
}

export default function DailyReport({ course, assistances, qr }: Props) {
  const [editLabel, setEditLabel] = useState(
    '(Presione cada campo para editar)'
  )
  const [editLabel2, setEditLabel2] = useState(
    '(Presione el campo para editar)'
  )
  const [studentData, setStudentData] = useState<Comments>({})
  const [observation, setObservation] = useState('')
  const [finalComment, setFinalComment] = useState('')
  const [showFinalComment, setShowFinalComment] = useState('')
  const [subject, setSubject] = useState('')
  const [showSubject, setShowSubject] = useState('')
  const [points, setPoints] = useState('')
  const [showPoints, setShowPoints] = useState('')

  const tableRef = useRef(null)
  const { openSnackbar } = useContext(SnackbarContext)

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'Reporte de bajo rendimiento',
    sheet: 'Reporte'
  })

  const handleExport = () => {
    clearFields()
    onDownload()
    openSnackbar({
      message: 'Archivo de Excel generado correctamente.',
      severity: 'success'
    })
    setEditLabel('Presione cada campo para editar')
    if (showFinalComment === '') {
      setEditLabel2('(Presione el campo para editar)')
    }
  }

  const clearFields = () => {
    setEditLabel('')
    setEditLabel2('')
  }

  const confirmComment = (studentId: string) => {
    setStudentData((prevState) => {
      return {
        ...prevState,
        [studentId]: {
          ...prevState[studentId],
          observation
        }
      }
    })
    setObservation('')
  }

  return (
    <div className="w-screen mt-3 flex justify-center items-center flex-col">
      <table ref={tableRef} className="w-4/5 mb-4">
        <thead>
          <tr>
            <th colSpan={14}>REPORTE DE ASISTENCIA DIARIO</th>
          </tr>
          <tr>
            <td colSpan={1}>&nbsp;</td>
            <td colSpan={1}>&nbsp;</td>
            <td colSpan={1}>&nbsp;</td>
            <td colSpan={1}>&nbsp;</td>
            <td colSpan={1}>&nbsp;</td>
            <td colSpan={1}>&nbsp;</td>
            <td colSpan={1}>&nbsp;</td>
            <td colSpan={1}>&nbsp;</td>
            <td colSpan={1}>&nbsp;</td>
            <td colSpan={1}>&nbsp;</td>
            <td colSpan={1}>&nbsp;</td>
            <td colSpan={1}>&nbsp;</td>
            <td colSpan={1}>&nbsp;</td>
            <td colSpan={1}>&nbsp;</td>
          </tr>

          <tr>
            <th colSpan={1}>Asignatura</th>
            <td colSpan={4}>{course.name}</td>
            <td colSpan={2}>&nbsp;</td>
            <th colSpan={1}>Docente</th>
            <td colSpan={3}>{course.professor?.name}</td>
            <td colSpan={3}>&nbsp;</td>
          </tr>
          <tr>
            <th colSpan={1}>Ciclo</th>
            <td colSpan={4}>{course.semester}</td>
            <td colSpan={2}>&nbsp;</td>
            <th colSpan={1}>Fecha</th>
            <td colSpan={3}>{dayjs(qr.initDate).format('DD-MM-YYYY')}</td>
            <td colSpan={3}>&nbsp;</td>
          </tr>
          <tr>
            <th colSpan={1}>Jornada</th>
            <td colSpan={4}>Matutina</td>
            <td colSpan={2}>&nbsp;</td>
            <th colSpan={1}>Sección</th>
            <td colSpan={3}>{course.section}</td>
            <td colSpan={3}>&nbsp;</td>
          </tr>
          <tr>
            <th colSpan={14}>&nbsp;</th>
          </tr>
          <tr>
            <th colSpan={1}>Tema</th>
            <td colSpan={13}>
              <ConfirmDialog
                confirm={() => setShowSubject(subject)}
                onOpen={() => console.log('')}
                text={
                  <>
                    <TextField
                      fullWidth
                      label="Tema"
                      variant="outlined"
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </>
                }
                title="Agregar tema"
              >
                <div className="bg-yellow-50 hover:bg-gray-200 cursor-pointer transition-colors">
                  &nbsp; {showSubject === '' ? editLabel2 : showSubject}
                </div>
              </ConfirmDialog>
            </td>
          </tr>

          <tr>
            <th colSpan={1}>Punteo</th>
            <td colSpan={4}>
              <ConfirmDialog
                confirm={() => setShowPoints(points)}
                onOpen={() => console.log('')}
                text={
                  <>
                    <TextField
                      fullWidth
                      label="Punteo"
                      type="number"
                      variant="outlined"
                      onChange={(e) => setPoints(e.target.value)}
                    />
                  </>
                }
                title="Agregar punteo"
              >
                <div className="h-12 bg-yellow-50 hover:bg-gray-200 cursor-pointer transition-colors flex items-center">
                  &nbsp; {showPoints === '' ? editLabel2 : showPoints}
                </div>
              </ConfirmDialog>
            </td>
            <th colSpan={2}>&nbsp;</th>
            <th colSpan={1}>
              Porcentaje <br /> asistencia
            </th>
            <td colSpan={4}>
              {(assistances.filter(
                (assistance) => assistance.assistanceCategoryId === 1
              ).length /
                assistances.length) *
                100}
              %
            </td>
            <th colSpan={2}>&nbsp;</th>
          </tr>

          <tr>
            <th colSpan={1}>
              Estudiantes <br /> presentes
            </th>
            <td colSpan={4}>
              {
                assistances.filter(
                  (assistance) => assistance.assistanceCategoryId === 1
                ).length
              }
            </td>
            <th colSpan={2}>&nbsp;</th>
            <th colSpan={1}>
              Estudiantes <br /> ausentes
            </th>
            <td colSpan={4}>
              {
                assistances.filter(
                  (assistance) => assistance.assistanceCategoryId !== 1
                ).length
              }
            </td>
            <th colSpan={2}>&nbsp;</th>
          </tr>

          <tr>
            <th colSpan={14}>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th colSpan={1}>No. Carné</th>
            <th colSpan={4}>Nombre Completo</th>
            <th colSpan={4}>Carrera</th>
            <th colSpan={2}>Tipo de asistencia</th>
            <th colSpan={3}>
              Observaciones <br /> {editLabel}
            </th>
          </tr>
          {course.students
            ?.filter((assignment) => assignment.status === 'Asignado')
            .map(({ student }) => (
              <tr key={student?.id}>
                <td colSpan={1}>{student?.id}</td>
                <td colSpan={4}>{student?.name}</td>
                <td colSpan={4}>{student?.faculty}</td>
                <td colSpan={2} align="center">
                  {
                    assistances?.find((a) => a.studentId === student?.id)
                      ?.assistanceCategory?.name
                  }
                </td>
                <td colSpan={3}>
                  <ConfirmDialog
                    confirm={() => confirmComment(student?.id ?? '')}
                    onOpen={() => console.log('')}
                    text={
                      <>
                        <Typography variant="body1" gutterBottom>
                          Estudiante: {student?.name ?? ''}
                        </Typography>
                        <TextField
                          fullWidth
                          label="Observación"
                          multiline
                          rows={8}
                          variant="outlined"
                          onChange={(e) => setObservation(e.target.value)}
                        />
                      </>
                    }
                    title="Agregar observación"
                  >
                    <div className="h-20 bg-yellow-50 hover:bg-gray-200 cursor-pointer transition-colors">
                      &nbsp;{' '}
                      {studentData[student?.id ?? '']?.observation ??
                      assistances?.find((a) => a.studentId === student?.id)
                        ?.observations === 'Ninguna'
                        ? studentData[student?.id ?? '']?.observation
                        : assistances?.find((a) => a.studentId === student?.id)
                            ?.observations}
                    </div>
                  </ConfirmDialog>
                </td>
              </tr>
            ))}
          <tr>
            <th colSpan={14}>&nbsp;</th>
          </tr>
          <tr>
            <th align="left" colSpan={14}>
              Comentarios {editLabel}
            </th>
          </tr>

          <tr>
            <td colSpan={14}>
              <ConfirmDialog
                confirm={() => setShowFinalComment(finalComment)}
                onOpen={() => console.log('')}
                text={
                  <>
                    <TextField
                      fullWidth
                      label="Comentario final"
                      multiline
                      rows={8}
                      variant="outlined"
                      onChange={(e) => setFinalComment(e.target.value)}
                    />
                  </>
                }
                title="Agregar comentario final"
              >
                <div className="h-20 bg-yellow-50 hover:bg-gray-200 cursor-pointer transition-colors">
                  &nbsp;{' '}
                  {showFinalComment === '' ? editLabel2 : showFinalComment}
                </div>
              </ConfirmDialog>
            </td>
          </tr>
        </tbody>
      </table>
      <PrimaryButton
        onClick={handleExport}
        full={false}
        label="Generar reporte en excel"
      />
    </div>
  )
}
