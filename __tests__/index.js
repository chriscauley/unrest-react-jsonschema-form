import React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'

import Form from '../src'

const _warn = console.warn
console.warn = (warning) => {
  if (typeof warning === 'string' && warning.includes("componentWillReceiveProps has been renamed")) {
    return
  }
  _warn(warning)
}

const supressError = (func, expected) => {
  const og = console.error
  console.error = jest.fn(
    actual => expected && expect(actual).toBe(expected)
  )
  func()
  console.error = og
}

const getSchema = schema => ({
  type: 'object',
  properties: {
    name: { type: 'string' },
  },
  ...schema
})

const renderForm = (args={}) => {
  const { schema, ...props } = args
  return render(<Form schema={getSchema(schema)} {...props}/>)
}

test('Form noop', () => {
  const component = renderForm({title:'noop'})
  fireEvent.click(component.getByText('Submit'))
  expect(component.queryByText(".name is a required property")).toBeFalsy()
})

test('Form + required', () => {
  const component2 = renderForm({schema: {required: ['name']}})
  supressError(() => fireEvent.click(component2.getByText('Submit')))
  component2.getByText(".name is a required property")
})

test('form renders', () => {
  const component = render(<Form schema={getSchema()} />)
  component.getByText('name')
  component.getByText('Submit')
})

test('form has cancel property', () => {
  const cancel = jest.fn()
  const component = renderForm({ cancel })
  fireEvent.click(component.getByText('Cancel'))

  expect(cancel).toBeCalled()
})

test('form allows custom cancel and submit text', () => {
  const cancelText = "Custom Cancel"
  const submitText = "Custom Submit"
  const component = renderForm({ cancelText, submitText, cancel: () =>{}})
  component.getByText("Custom Cancel")
  component.getByText("Custom Submit")
})

test('form calls onSubmit, prepData, and onSuccess when submit button is clicked', done => {
  const onSubmit = jest.fn(formData => {
    expect(formData).toEqual({name: "Mr. Pig"})
    return 'foo'
  })
  const onSuccess = result => {
    expect(result).toBe('foo')
    done()
  }
  const prepData = jest.fn(formData => {
    formData.name = "Mr. "+formData.name
    return formData
  })
  const component = renderForm({ onSubmit, onSuccess, prepData, initial: {name: "Pig"} })
  fireEvent.click(component.getByText('Submit'))

  expect(onSubmit).toBeCalled()
  expect(prepData).toBeCalled()
})

test('Form.props.prepData throwing an error displays an error', () => {
  const e = "The system is down"
  const prepData = () => {throw e}
  const component = renderForm({ prepData })
  supressError(() => fireEvent.click(component.getByText('Submit')), e)

  component.getByText(e)
})

test('Form title', () => {
  const title = "Foo"
  const component = renderForm({title})
  component.getByText(title)
})

test('Form success', () => {
  const success = "Saving form was successful"
  const component = renderForm({success})
  component.getByText(success)
})

