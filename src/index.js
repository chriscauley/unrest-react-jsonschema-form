import React from 'react'
import RJSForm from 'react-jsonschema-form'
import classnames from 'classnames'
import css from '@unrest/css'

const noop = (formData) => formData
const uiSchema = {
  password: { 'ui:widget': 'password' },
}

export default class Form extends React.Component {
  state = {}
  onSubmit = ({ formData }) => {
    const { prepData = noop, onSubmit = noop, onSuccess = noop } = this.props
    this.catchError(() => {
      prepData(formData) // mutates formData or throws error
      Promise.resolve(onSubmit(formData)).then(onSuccess).catch(this.setError)
    })
  }

  catchError = (func) => {
    try {
      func()
    } catch (error) {
      this.setState({ error, loading: false })
    }
  }

  isValid = () => {
    if (this.props.error || this.state.error) {
      return false
    }
    const required = this.props.schema.required || []
    const formData = this.getFormData()
    return !required.find((fieldName) => !formData[fieldName])
  }

  getFormData = () => {
    // formData is dictated by props for controlled form or state (via rjsf) for non-controlled form
    return this.props.formData || this.state.formData || this.props.initial || {}
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
      initial,
      schema,
      submitText = 'Submit',
      success,
      title,
    } = this.props
    const error = this.state.error || this.props.error
    const loading = this.state.loading || this.props.loading
    return (
      <div
        className={classnames('rjsf', className, { 'loading-locked': loading })}
      >
        {title && <div className={css.h2()}>{title}</div>}
        <RJSForm
          formData={this.getFormData()}
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          schema={schema}
          uiSchema={{
            ...uiSchema,
            ...this.props.uiSchema,
          }}
        >
          {children}
          {error && <div className={css.alert.danger()}>{error}</div>}
          {success && <div className={css.alert.success()}>{success}</div>}
          {!customButton && (
            <div className="flex justify-end mb-8">
              {cancel && (
                <div className={css.button.danger()} onClick={cancel}>
                  {cancelText}
                </div>
              )}
              <button className={css.button({ disabled: !this.isValid() })}>
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
