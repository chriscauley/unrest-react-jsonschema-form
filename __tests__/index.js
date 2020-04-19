import React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'

import Form from '../src'

const og_warn = console.warn
const og_error = console.error
const supressError = expected => {
  console.error = jest.fn(
    actual => expected && expect(actual).toBe(expected)
  )
}
beforeAll(() => {
  console.warn = (warning) => {
    if (typeof warning === 'string' && warning.includes("componentWillReceiveProps has been renamed")) {
      return
    }
    _warn(warning)
  }
})

afterAll(() => { console.error = og_error })

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
  const component = renderForm()
  fireEvent.click(component.getByText('Submit'))
  expect(component.queryByText(".name is a required property")).toBeFalsy()
  expect(component.queryByText("Cancel")).toBeFalsy()
})

test('Form.props.required displays an error when submitted', () => {
  const component2 = renderForm({schema: {required: ['name']}})
  supressError("Form validation failed")
  fireEvent.click(component2.getByText('Submit'))
  component2.getByText(".name is a required property")
})

test('Form.props.cancel attaches to cancel button', () => {
  const cancel = jest.fn()
  const component = renderForm({ cancel })
  fireEvent.click(component.getByText('Cancel'))
  expect(cancel).toBeCalled()
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
  supressError(e)
  fireEvent.click(component.getByText('Submit'))

  expect(component.getByText(e).className).toEqual('alert alert-danger')
})

test('Form.props renders cancelText, submitText, title, and success', () => {
  const title = "Foo"
  const success = "Saving form was successful"
  const cancelText = "Custom Cancel"
  const submitText = "Custom Submit"
  const component = renderForm({title, success, cancelText, submitText, cancel: () =>{}})

  expect(component.getByText(cancelText).className).toEqual('btn btn-danger')
  expect(component.getByText(submitText).className).toEqual('btn btn-primary')
  expect(component.getByText(title).className).toEqual('h2')
  expect(component.getByText(success).className).toEqual('alert alert-success')
})
