// for now this is copied from react-core. Might want to make that a dependency eventually

export default (errors = {}) => {
  const extraErrors = {}
  let has_error
  Object.entries(errors).forEach(([fieldname, error_list]) => {
    if (!Array.isArray(error_list)) {
      error_list = [error_list]
    }
    const results = error_list.map((error) => (error.message ? error.message : error))
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
