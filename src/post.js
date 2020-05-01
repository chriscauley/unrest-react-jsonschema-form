import config from './config'

export const handleError = (error) => {
  // Analyzes many possible exeptions and return { error: "Something the user can read" }
  if (typeof error === 'string') {
    return { error }
  }

  if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
    return {
      error:
        'Unable to connect to server. Please check your internet connection and try again.',
    }
  }
  return { error: error.message }
}

export const afterFetch = (response) => {
  const contentType = response.headers.get('content-type')
  if (!contentType || !contentType.includes('application/json')) {
    // all responses from the server should be an ajax
    // this is triggered when the server has hit a 500
    // server can also send back { error } to display a more specific error
    return { error: config.unknown_error }
  }
  return response.json().catch(handleError)
}

export default (url, data) => {
  return fetch(url, {
    body: JSON.stringify(data),
    method: 'POST',
    headers: config.getHeaders(),
  }).then(afterFetch, handleError)
}
