export const _url = process.env.NEXT_PUBLIC_API_URL

type Methods = 'GET' | 'POST'

type Tables =
  | 'students'
  | 'professors'
  | 'semesters'
  | 'courses'
  | 'qrs'
  | 'devices'
  | 'assistances'
  | 'courseStudents'
  | 'assistanceCategories'

export type ApiResponse<T = void> = {
  data?: T[]
  status: 'success' | 'error'
  message?: string
}

export type ApiResponsePost<T = void> = {
  data?: T
  status: 'success' | 'error'
  message?: string
}

export type ApiResponseSingle<T = void> = {
  data?: T
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
    const data: T[] = (await response.json()).data

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

export const fetchCustomAPI = async (
  query: string,
  method: Methods = 'GET',
  body?: any,
  message: string = 'Datos guardados correctamente'
): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${_url}/${query}`, {
      method,
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    })
    const data: ApiResponse = await response.json()
    return data
  } catch (error) {
    console.log(error)
    return {
      status: 'error',
      message: 'Hubo un error al crear la petición'
    }
  }
}

export const fetchPostAPI = async <T>(
  table: Tables,
  body?: T,
  message: string = 'Datos guardados correctamente'
): Promise<ApiResponsePost<T>> => {
  try {
    console.log(JSON.stringify(body))
    const response = await fetch(`${_url}/${table}/`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    })
    const data: ApiResponsePost<T> = await response.json()
    return data
  } catch (error) {
    console.log(error)
    return {
      status: 'error',
      message: 'Hubo un error al crear la petición'
    }
  }
}

export const fetchSingleAPI = async <T>(
  table: Tables,
  id: string | number,
  message: string = 'Datos guardados correctamente'
): Promise<ApiResponseSingle<T>> => {
  try {
    const response = await fetch(`${_url}/${table}/${id}`, {
      headers: { 'Content-Type': 'application/json' }
    })
    const data: ApiResponseSingle<T> = await response.json()
    return data
  } catch (error) {
    console.log(error)
    return {
      status: 'error',
      message: 'Hubo un error al crear la petición'
    }
  }
}
