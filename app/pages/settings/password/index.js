import React from 'react'
import { observer, inject } from 'mobx-react'
import classNames from 'classnames'

import { Setting } from 'components/page'
import Field from 'components/field'

import title from '@fronto/helpers/title'

import PasswordValidator from 'password-validator'

import button from 'styles/button.sass'
import form from 'styles/form.sass'

import { Passwords } from 'stores'

import t from './index.locale'

@inject('endpoints') @observer
class Edit extends React.Component {
  constructor(props) {
    super(props)

    const { endpoints } = props

    this.store = new Passwords(endpoints.studio, 'v1/member')
  }

  componentWillMount() {
    title(t('title'))
  }

  componentDidMount() {
    this.password.input.focus()
  }

  submitForm = (e) => {
    e.preventDefault()

    const validator = new PasswordValidator()
    validator.is().min(8).has().uppercase().lowercase()

    if (this.password.input.value === '' || !validator.validate(this.password.input.value)) {
      this.store.setMessage({
        body: t('password_invalid'),
        type: 'error',
      })

      return
    }

    if (this.password.input.value === this.confirm.input.value) {
      this.store.update(null, {
        password: { 
          password: this.password.input.value,
          confirm: this.confirm.input.value
        }
      }, { 
        200: (response) => { this.store.setMessage({ body: t('success'), type: 'success' }) },
        422: (response) => {}
      })
    } else {
      this.store.setMessage({
        body: t('password_not_match'),
        type: 'error',
      })
    }
  }

  render() {
    const { isLoading, message, clearMessage } = this.store

    const actionable =
      <div className='pure-g'>
        <div className='pure-u-md-5-6'></div>
        <div className='pure-u-md-1-6'>
          <a href='#' onClick={this.submitForm} 
             className={classNames('pure-button', 'pure-u-1', button.success, button.noRound)}>
             {t('save')}
          </a>
        </div>
      </div>

    return (
      <Setting title={t('title')} alert={{ message, dismiss: clearMessage }} 
               isLoading={isLoading} actionable={actionable}>
        <div styleName='form.body'>
          <form className='pure-form pure-g pure-form-stacked animated fadeIn'>
            <fieldset className='pure-u-1'>
              <Field type='password' name='password' ref={node => this.password = node} label={t('password')} />
              <Field type='password' name='password_confirmation'
                     ref={node => this.confirm = node} label={t('password_confirmation')} />
            </fieldset>
          </form>
        </div>
      </Setting>
    )
  }
}

export default Edit
