import post from '../src/post'

const og_fetch = global.fetch
afterAll(() => (global.fetch = og_fetch))

const mockFetch = (options) => {
  const {
    headers = {},
    json = () => Promise.resolve().then(() => JSON.parse(options.body)),
  } = options
  global.fetch = jest.fn(() =>
    Promise.resolve({
      headers: { get: (key) => headers[key] },
      json,
    }),
  )
}

test.only('post fails when header is not application/json', (done) => {
  mockFetch({})

  post().then((data) => {
    expect(data.error).toBe('An unknown error has occurred. Please try again.')
    done()
  })
})

test.only('post fails when header is not application/json', (done) => {
  mockFetch({ headers: { 'content-type': 'bees' } })

  post().then((data) => {
    expect(data.error).toBe('An unknown error has occurred. Please try again.')
    done()
  })
})

test.only('post succeeds', (done) => {
  const body = '{"yoo":"hoo"}'
  const headers = { 'content-type': 'application/json' }
  mockFetch({ body, headers })

  post().then((data) => {
    expect(data.yoo).toBe('hoo')
    done()
  })
})

test.only('post fails when response is unparseable', (done) => {
  const body = 'invalid json'
  const headers = { 'content-type': 'application/json' }
  mockFetch({ body, headers })

  post().then((data) => {
    expect(data.error.message).toBe('Unexpected token i in JSON at position 0')
    done()
  })
})
