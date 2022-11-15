import { TextField, Typography } from '@mui/material'
import ConfirmDialog from 'components/core/ConfirmDialog'
import PrimaryButton from 'components/core/PrimaryButton'
import { SnackbarContext } from 'context/SnackbarProvider'
import Course from 'hooks/types/Course'
import { useContext, useRef, useState } from 'react'
import { useDownloadExcel } from 'react-export-table-to-excel'

type Props = {
  course: Course
}

type Comments = {
  [key: string]: {
    observation?: string
    check1?: boolean
    check2?: boolean
    check3?: boolean
    check4?: boolean
  }
}

export default function ExcelTable({ course }: Props) {
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

  const addCheck = (studentId: string, check: number) => {
    switch (check) {
      case 1:
        setStudentData((prevState) => {
          return {
            ...prevState,
            [studentId]: {
              ...prevState[studentId],
              check1: !prevState[studentId]?.check1 ?? true
            }
          }
        })
        break
      case 2:
        setStudentData((prevState) => {
          return {
            ...prevState,
            [studentId]: {
              ...prevState[studentId],
              check2: !prevState[studentId]?.check2 ?? true
            }
          }
        })
        break
      case 3:
        setStudentData((prevState) => {
          return {
            ...prevState,
            [studentId]: {
              ...prevState[studentId],
              check3: !prevState[studentId]?.check3 ?? true
            }
          }
        })
        break
      case 4:
        setStudentData((prevState) => {
          return {
            ...prevState,
            [studentId]: {
              ...prevState[studentId],
              check4: !prevState[studentId]?.check4 ?? true
            }
          }
        })
        break
      default:
        break
    }
  }

  return (
    <div className="w-screen mt-3 flex justify-center items-center flex-col">
      <table ref={tableRef} className="w-4/5 mb-4">
        <thead>
          <tr>
            <th colSpan={14}>FORMATO</th>
          </tr>
          <tr>
            <th colSpan={14}>REPORTE DE ESTUDIANTES</th>
          </tr>
          <tr>
            <th colSpan={14}>
              CON IRREGULARIDADES EN SU ASISTENCIA O BAJO DESEMPEÑO EN CLASE
            </th>
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
            <td colSpan={3}>Elfego</td>
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
        </thead>
        <tbody>
          <tr>
            <th colSpan={1}>No. Carné</th>
            <th colSpan={4}>Nombre Completo</th>
            <th colSpan={2}>Carrera</th>
            <th colSpan={1}>
              Nunca se ha <br /> presentado
            </th>
            <th colSpan={1}>
              Dejó de <br /> presentarse
            </th>
            <th colSpan={1}>
              Su asistencia <br /> es muy <br /> irregular
            </th>
            <th colSpan={1}>
              Muy bajo <br /> desempeño en <br />
              clase
            </th>
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
                <td colSpan={2}>{student?.faculty}</td>
                <td
                  align="center"
                  className="hover:bg-gray-200 cursor-pointer transition-colors"
                  onClick={() => addCheck(student?.id!, 1)}
                  colSpan={1}
                >
                  {studentData[student?.id!]?.check1 ? 'x' : ''}
                </td>
                <td
                  align="center"
                  className="hover:bg-gray-200 cursor-pointer transition-colors"
                  onClick={() => addCheck(student?.id!, 2)}
                  colSpan={1}
                >
                  {studentData[student?.id!]?.check2 ? 'x' : ''}
                </td>
                <td
                  align="center"
                  className="hover:bg-gray-200 cursor-pointer transition-colors"
                  onClick={() => addCheck(student?.id!, 3)}
                  colSpan={1}
                >
                  {studentData[student?.id!]?.check3 ? 'x' : ''}
                </td>
                <td
                  align="center"
                  className="hover:bg-gray-200 cursor-pointer transition-colors"
                  onClick={() => addCheck(student?.id!, 4)}
                  colSpan={1}
                >
                  {studentData[student?.id!]?.check4 ? 'x' : ''}
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
                    <div className="h-20 hover:bg-gray-200 cursor-pointer transition-colors">
                      &nbsp; {studentData[student?.id ?? '']?.observation}
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
            <th align="left" colSpan={14}>
              &nbsp;
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
                <div className="h-8 hover:bg-gray-200 cursor-pointer transition-colors">
                  &nbsp;{' '}
                  {showFinalComment === '' ? editLabel2 : showFinalComment}
                </div>
              </ConfirmDialog>
            </td>
          </tr>
          <tr>
            <th align="left" colSpan={14}>
              &nbsp;
            </th>
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
