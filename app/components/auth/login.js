import React from 'react'
import { observer, inject } from 'mobx-react'

import { Auth } from 'components/page'
import links from './links'

import form from 'styles/form.sass'
import button from 'styles/button.sass'

import logo from 'assets/logo-white.svg'
import t from './login.locale'

@inject('user') @observer
class Login extends React.Component { 
  componentDidMount() {
    this.props.user.clearMessage()
  }

  submitForm = (e) => {
    e.preventDefault()

    const { email, password } = this.refs
    const { user, modal } = this.props

    if (email.value === '' || password.value === '') {
      user.setMessage({
        body: t('fill_in_email_password'),
        type: 'error',
      })

      return false
    }

    user.createSession(
      email.value, password.value, this.props.callback
    )
  }

  render() {
    const { fill, animate, user } = this.props 
    const { message, clearMessage, isLoading } = user

    return (
      <Auth alert={{ message, clearMessage }} isLoading={isLoading} fill={fill} animate={animate}
                 extras={links(this.props.modal, ['forgot_password', 'dont_have_account'])}>
        <h3>{t('sign_in')}</h3>
        <form className='pure-form pure-form-stacked' styleName='form.body' onSubmit={this.submitForm}>
          <fieldset>
            <label htmlFor='email'>{t('email')}</label>
            <input type='email'
                    ref='email'
                    placeholder={t('email')}
                    className='pure-input-1' />

            <label htmlFor='password'>{t('password')}</label>
            <input type='password'
                    ref='password'
                    placeholder={t('password')}
                    className='pure-input-1' />
          </fieldset>
          <button type='submit' className='pure-button pure-input-1' styleName='button.success'>
            {t('sign_in')}
          </button>
        </form>
      </Auth>
    )
  }
}

export default Login
