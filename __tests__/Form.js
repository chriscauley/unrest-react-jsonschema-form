import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { supressError, supressReactWarning, getSchema } from './utils'
import Form from '../src'

supressReactWarning()

const renderForm = (args = {}) => {
  const { schema, ...props } = args
  return render(<Form schema={getSchema(schema)} {...props} />)
}

test('Form noop', () => {
  const component = renderForm()
  fireEvent.click(component.getByText('Submit'))
  expect(component.queryByText('is a required property')).toBeFalsy()
  expect(component.queryByText('Cancel')).toBeFalsy()
  fireEvent.change(component.getByLabelText('name'), {
    target: { value: 'james' },
  })
})

test('Form.props.required displays an error when submitted', () => {
  const component2 = renderForm({ schema: { required: ['name'] } })
  supressError('Form validation failed')
  fireEvent.click(component2.getByText('Submit'))
  component2.getByText('is a required property')
})

test('Form.props.cancel attaches to cancel button', () => {
  const cancel = jest.fn()
  const component = renderForm({ cancel })
  fireEvent.click(component.getByText('Cancel'))
  expect(cancel).toBeCalled()
})

test('form calls onSubmit, prepData, and onSuccess when submit button is clicked', (done) => {
  const onSubmit = jest.fn((formData) => {
    expect(formData).toEqual({ name: 'Mr. Pig' })
    return 'foo'
  })
  const onSuccess = (result) => {
    expect(result).toBe('foo')
    done()
  }
  const prepData = jest.fn((formData) => {
    formData.name = 'Mr. ' + formData.name
    return formData
  })
  const component = renderForm({
    onSubmit,
    onSuccess,
    prepData,
    initial: { name: 'Pig' },
  })
  fireEvent.click(component.getByText('Submit'))

  expect(onSubmit).toBeCalled()
  expect(prepData).toBeCalled()
})

test('Form.props.prepData throwing an error displays an error', () => {
  const e = 'The system is down'
  const prepData = () => {
    throw e
  }
  const component = renderForm({ prepData })
  supressError(e)
  fireEvent.click(component.getByText('Submit'))

  expect(component.getByText(e).className).toEqual('alert alert-danger')
})

test('Form.props renders cancelText, submitText, title, and success', () => {
  const title = 'Foo'
  const success = 'Saving form was successful'
  const cancelText = 'Custom Cancel'
  const submitText = 'Custom Submit'
  const component = renderForm({
    title,
    success,
    cancelText,
    submitText,
    cancel: () => {},
  })

  expect(component.getByText(cancelText).className).toEqual('btn btn-danger')
  expect(component.getByText(submitText).className).toEqual('btn btn-primary')
  expect(component.getByText(title).className).toEqual('h2')
  expect(component.getByText(success).className).toEqual('alert alert-success')
})

test('Form.state.loading blocks submit', (done) => {
  let submitCount = 0
  let finish
  const resolveCurrent = (expectedCount) => {
    expect(submitCount).toBe(expectedCount)
    finish()
  }
  const onSubmit = () => {
    submitCount++
    return new Promise((reslove) => (finish = reslove))
  }

  // first submit calls onSubmit and sets button state to loading
  const component = renderForm({ onSubmit })
  fireEvent.click(component.getByText('Submit'))
  expect(component.getByText('Submit').className).toBe('btn btn-primary loading')
  expect(submitCount).toBe(1)

  // need a new promise for every submit call
  Promise.resolve()
    .then(() => {
      // a second submit does nothing because state.loading is true
      fireEvent.click(component.getByText('Submit'))
      resolveCurrent(1)
    })
    .then(() => {})
    .then(() => {
      // since finish was called, we can submit again
      fireEvent.click(component.getByText('Submit'))
      resolveCurrent(2)
      done()
    })
})

test('Form.props.loading blocks submit', () => {
  const onSubmit = jest.fn()
  const component = renderForm({ onSubmit, loading: true })
  fireEvent.click(component.getByText('Submit'))
  expect(onSubmit).toHaveBeenCalledTimes(0)
})

test('Form.props.error makes form inValid', () => {
  const error = 'An unknown error has occurred.'
  const component = renderForm({ error })
  expect(component.getByText(error).className).toBe('alert alert-danger')
})

test('Form.props.onSubmit shows an error if one is thrown', (done) => {
  const error = 'An unknown error has occurred.'
  const onSubmit = () =>
    new Promise(() => {
      throw error
    })
  const component = renderForm({ onSubmit })
  supressError(error)
  fireEvent.click(component.getByText('Submit'))
  Promise.resolve()
    .then(() => {})
    .then(() => {
      expect(component.getByText(error).className).toBe('alert alert-danger')
    })
  done()
})
