import { postOptions, _url } from 'services/Connection'

const useAssistance = () => {
  const createAssistance = async (carnet: string, id: string) => {
    try {
      const qrResponse = await fetch(`${_url}/Qr/${id}/`)
      const qrData = await qrResponse.json()
      console.log(qrData)

      const response = await fetch(
        `${_url}/Asistencia/`,
        postOptions({
          Fecha: '2023-12-12',
          Observacion: 'Ninguna',
          Curso_idCurso: qrData.Curso_idCurso,
          Estudiante_Carnet: carnet,
          CategoriasAsistencia_idCategoria: 1
        })
      )

      const data = await response.json()
      console.log(data)

      if (response.ok) {
        return {
          status: 'success'
        }
      }
      return {
        message: 'Hubo un error al crear la asistencia',
        status: 'error'
      }
    } catch (error: any) {
      return {
        message: error.message,
        status: 'error'
      }
    }
  }

  return {
    createAssistance
  }
}

export default useAssistance
