export const _url = 'http://127.0.0.1:8000/api/v1'

type Methods = 'GET' | 'POST'

type Tables =
  | 'student'
  | 'professor'
  | 'course'
  | 'qr'
  | 'device'
  | 'device'
  | 'assistance'
  | 'faculty'
  | 'course_student'
  | 'assistance_category'

export type ApiResponse<T = void> = {
  data?: T[] | T
  status: 'success' | 'error'
  message?: string
}

export const fetchAPI = async <T>(
  table: Tables,
  method: Methods = 'GET',
  body?: T,
  message: string = 'Datos guardados correctamente'
): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(`${_url}/${table}/`, {
      method,
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    })
    const data: T[] | T = await response.json()

    if (response.ok) {
      return {
        status: 'success',
        message,
        data
      }
    } else {
      console.log(response)
      const error = await response.json()
      console.log(error)
      return {
        status: 'error',
        message: 'Hubo un error desconocido'
      }
    }
  } catch (error) {
    console.log(error)
    return {
      status: 'error',
      message: 'Hubo un error al crear la petición'
    }
  }
}
