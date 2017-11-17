import React from 'react'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router5'

import form from 'styles/form.sass'
import button from 'styles/button.sass'

import { Auth } from 'components/page'

import links from './links'

import t from './register.locale'

@inject('user') @observer
class Register extends React.Component { 
  componentDidMount() {
    this.props.user.clearMessage()
  }

  submitForm = (e) => {
    e.preventDefault()
    const { email, password, password_confirmation } = this.refs
    const { user } = this.props

    if (email.value === '' || password.value === '' || password_confirmation.value == '') {
      user.setMessage({
        body: t('fields_are_empty'),
        type: 'error',
      })

      return
    }

    if (password.value !== password_confirmation.value) {
      user.setMessage({
        body: t('password_dont_match'),
        type: 'error',
      })

      return
    }

    user.setEmail(email.value)
    user.create(
      email.value,
      password.value,
      password_confirmation.value,
    )
  }

  render() {
    const { user, fill, animate } = this.props
    const { message, clearMessage, isLoading } = user

    return (
      <Auth alert={{ message, clearMessage }} isLoading={isLoading} fill={fill} animate={animate}
                 extras={links(this.props.modal, ['login', 'forgot_password'])}>
        <h3>{t('create_account')}</h3>
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

            <input type='password'
                    ref='password_confirmation'
                    placeholder={t('password_confirmation')}
                    className='pure-input-1' />
          </fieldset>
          <button type='submit' className='pure-button pure-input-1' styleName='button.success'>
            {t('register')}
          </button>
        </form>
      </Auth>
    )
  }
}

export default Register
