import config from './config'

export default (url, data) => {
  return fetch(url, {
    body: JSON.stringify(data),
    method: 'POST',
    headers: config.getHeaders(),
  }).then((response) => {
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      // all responses from the server should be an ajax
      // this is triggered when the server has hit a 500
      // server can also send back { error } to display a more specific error
      return { error: config.unknown_error }
    }
    return response.json().catch((error) => ({ error }))
  })
}
