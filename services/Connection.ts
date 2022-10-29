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

export const fetchAPI = async <T>(
  table: Tables,
  method: Methods = 'GET',
  body?: T
) => {
  try {
    const response = await fetch(`${_url}/${table}/`, {
      method,
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    })
    const data: T = await response.json()

    return {
      ok: response.ok,
      data
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false
    }
  }
}
