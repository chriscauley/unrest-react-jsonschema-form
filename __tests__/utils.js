const og_warn = console.warn
const og_error = console.error

export const supressError = (expected) => {
  console.error = jest.fn((actual) => expected && expect(actual).toBe(expected))
}

export const supressReactWarning = () => {
  beforeAll(() => {
    console.warn = (warning) => {
      if (!`${warning}`.includes('componentWillReceiveProps has been renamed')) {
        og_warn(warning)
      }
    }
  })

  afterAll(() => {
    console.error = og_error
    console.warn = og_warn
  })
}

export const getSchema = (schema) => ({
  type: 'object',
  properties: {
    name: { type: 'string' },
  },
  ...schema,
})

test('Shut up the warning', () => {})
