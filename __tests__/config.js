import config from '../src/config'

const cookie = 'csrftoken=CSRF'

test('config.getCSRF', () => expect(config.getCSRF(cookie)).toBe('CSRF'))

test('config.getHeaders', () => {
  document.cookie = cookie
  expect(config.getHeaders()).toEqual({
    'content-type': 'application/json',
    'X-CSRFToken': 'CSRF',
  })
})

test('config.processServerErrors', () => {
  const errors = config.processServerErrors({
    __all__: { message: 'foo' },
    name: ['foo'],
    field_with_no_errors: [],
  })

  expect(errors).toEqual({
    __all__: { __errors: ['foo'] },
    name: { __errors: ['foo'] },
    __errors: ['foo'],
  })

  expect(config.processServerErrors({})).toBe(undefined)
})
