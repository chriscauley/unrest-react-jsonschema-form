/* istanbul ignore next */
const getCSRF = (cookie) => {
  cookie = cookie || document.cookie
  const match = cookie.match(/csrftoken=([^;]+)/)
  return match && match[1]
}

const config = {
  getHeaders: () => ({
    'content-type': 'application/json',
    'X-CSRFToken': config.getCSRF(),
  }),
  getCSRF,
  unknown_error: 'An unknown error has occurred. Please try again.',
}

export default config
