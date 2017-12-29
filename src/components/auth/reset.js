import React from 'react'
import { inject, observer } from 'mobx-react'

import form from 'styles/form.sass'
import button from 'styles/button.sass'

import { Auth } from 'components/page'
import links from './links'

import { Passwords } from 'stores'

import t from './reset.locale'

@inject('endpoints') @observer
class Reset extends React.Component {
  constructor(props) {
    super(props)

    const { endpoints } = props

    this.store = new Passwords(endpoints.studio, 'auth')
  }

  onUnprocessable = (response) => {
    this.store.setMessage({ 
      body: t('password_not_match'), type: 'error'
    })
  }

  submitForm = (e) => {
    e.preventDefault()

    const { token } = this.props

    const reset = {
      password: this.password.value,
      confirm: this.confirm.value
    }

    this.store.update({ id: token }, { reset }, {
      200: (response) => this.props.callback(),
      422: this.onUnprocessable
    })

    this.password.value = null
    this.confirm.value = null
  }

  render() {
    const { fill, animate } = this.props
    const { message, clearMessage, isLoading } = this.store

    return (
      <Auth alert={{ message, clearMessage }} isLoading={isLoading} fill={fill} animate={animate}
            extras={links(this.props.modal, ['login', 'forgot_password'])}>
        <h3>{t('reset_password')}</h3>
        <form className='pure-form pure-form-stacked' styleName='form.body' onSubmit={this.submitForm}>
          <fieldset>
            <label htmlFor='password'>{t('password')}</label>
            <input type='password'
                    ref={node => this.password = node}
                    placeholder={t('password')}
                    className='pure-input-1' />

            <input type='password'
                    ref={node => this.confirm = node}
                    placeholder={t('password_confirmation')}
                    className='pure-input-1' />
          </fieldset>
          <button type='submit' className='pure-button pure-input-1' styleName='button.success'>
            {t('change_password')}
          </button>
        </form>
      </Auth>
    )
  }
}

export default Reset

