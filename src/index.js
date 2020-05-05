import React from 'react'
import RJSForm from 'react-jsonschema-form'
import classnames from 'classnames'
import css from '@unrest/css'
import processServerErrors from './processServerErrors'

const noop = (formData) => formData
const uiSchema = {
  password: { 'ui:widget': 'password' },
  src: { 'ui:widget': 'file' },
}

const extractUiSchema = (schema) => {
  const uiSchema = {}
  Object.entries(schema.properties).forEach(([key, value]) => {
    const { __widget } = value
    if (__widget === 'HiddenInput') {
      uiSchema[key] = { 'ui:widget': 'hidden' }
    }
    if (__widget === 'PasswordInput') {
      uiSchema[key] = { 'ui:widget': 'password' }
    }
  })
  return uiSchema
}

export default class Form extends React.Component {
  state = {}
  onSubmit = ({ formData }) => {
    if (this.isLoading()) {
      return
    }
    const { prepData = noop, onSubmit = noop, onSuccess = noop } = this.props
    this.catchError(() => {
      prepData(formData) // mutates formData or throws error
      this.setState({ loading: true, error: undefined, errors: undefined })
      Promise.resolve(onSubmit(formData))
        .catch((error) => ({ error }))
        .then((data = {}) => {
          const { error, errors } = data
          const extraErrors = processServerErrors(errors)
          this.setState({ loading: false, error, extraErrors })
          if (error || extraErrors) {
            console.error(error, extraErrors)
          } else {
            return onSuccess(data)
          }
        })
    })
  }

  catchError = (func) => {
    try {
      func()
    } catch (error) {
      this.setState({ error, loading: false })
      console.error(error)
    }
  }

  isValid = () => {
    if (this.props.error) {
      return false
    }
    const required = this.props.schema.required || []
    const formData = this.getFormData()
    const isEmpty = (value) => !(value || value === 0)
    return !required.find((fieldName) => isEmpty(formData[fieldName]))
  }

  isLoading = () => this.state.loading || this.props.loading

  getFormData = () => {
    // formData is dictated by props for controlled form or state (via rjsf) for non-controlled form
    return (
      this.props.formData || this.state.formData || this.props.initial || {}
    )
  }

  onChange = ({ formData }) => {
    const { onChange = noop } = this.props
    this.catchError(() => {
      onChange(formData) // mutates formData or throws error
      this.setState({ formData })
    })
  }

  render() {
    const {
      after,
      cancel,
      cancelText = 'Cancel',
      children,
      customButton,
      className,
      schema,
      submitText = 'Submit',
      success,
      title,
    } = this.props
    const error = this.state.error || this.props.error

    return (
      <div
        className={classnames('rjsf', className, { loading: this.isLoading() })}
      >
        {title && <div className={css.h2()}>{title}</div>}
        <RJSForm
          formData={this.getFormData()}
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          schema={schema}
          extraErrors={this.state.extraErrors}
          showErrorList={false}
          uiSchema={{
            ...uiSchema,
            ...extractUiSchema(schema),
            ...this.props.uiSchema,
          }}
        >
          {children}
          {error && (
            <div className={css.alert.danger()}>{error.message || error}</div>
          )}
          {success && <div className={css.alert.success()}>{success}</div>}
          {!customButton && (
            <div className="flex justify-end mb-8">
              {cancel && (
                <div className={css.button.danger()} onClick={cancel}>
                  {cancelText}
                </div>
              )}
              <button
                className={css.button({
                  disabled: !this.isValid(),
                  loading: this.isLoading(),
                })}
              >
                {submitText}
              </button>
            </div>
          )}
          {after}
        </RJSForm>
      </div>
    )
  }
}
