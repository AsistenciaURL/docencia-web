import { postOptions, _url } from 'services/Connection'

const useQR = () => {
  const createQR = async (id: string) => {
    try {
      const response = await fetch(
        `${_url}/Qr/`,
        postOptions({
          FechaLimite: '2023-12-12',
          Curso_idCurso: id
        })
      )
      const data = await response.json()
      console.log(data)

      if (response.ok) {
        return {
          message: data.idQr,
          status: 'success'
        }
      }
      return {
        message: 'Hubo un error al crear el QR',
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
    createQR
  }
}

export default useQR
