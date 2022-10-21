export const _url = 'http://127.0.0.1:8000/api/v1'

export const postOptions = (body) => {
  return {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  }
}
