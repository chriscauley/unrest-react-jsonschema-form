/* istanbul ignore next */
export const getCSRF = (cookie) => {
  cookie = cookie || document.cookie
  const match = cookie.match(/csrftoken=([^;]+)/)
  return match && match[1]
}

export const processServerErrors = (errors = {}) => {
  const extraErrors = {}
  let has_error
  Object.entries(errors).forEach(([fieldname, error_list]) => {
    if (!Array.isArray(error_list)) {
      error_list = [error_list]
    }
    const results = error_list.map((error) =>
      error.message ? error.message : error,
    )
    if (results.length) {
      has_error = true
      extraErrors[fieldname] = { __errors: results }
    }
  })
  if (extraErrors.__all__) {
    extraErrors.__errors = extraErrors.__all__.__errors
  }
  return has_error && extraErrors
}

const config = {
  getHeaders: () => ({
    'content-type': 'application/json',
    'X-CSRFToken': config.getCSRF(),
  }),
  getCSRF,
  processServerErrors,
  unknown_error: 'An unknown error has occurred. Please try again.',
}

export default config
