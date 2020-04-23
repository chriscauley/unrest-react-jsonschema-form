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
