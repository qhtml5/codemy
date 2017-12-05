import React from 'react'
import { observer, inject } from 'mobx-react'

import form from 'styles/form.sass'
import button from 'styles/button.sass'

import { Auth } from 'components/page'
import links from './links'

import { Passwords } from 'stores'

import t from './forgot.locale'

@inject('user', 'endpoints') @observer
class Forgot extends React.Component {
  constructor(props) {
    super(props)

    const { endpoints } = props

    this.passwords = new Passwords(endpoints.studio)
  }

  componentWillMount() {
    this.props.user.clearMessage()
  }

  submitForm = (e) => {
    e.preventDefault()
    const { user } = this.props

    if (this.email.value === '') {
      user.setMessage({
        body: t('fill_in_email'),
        type: 'error',
      })
    }

    this.passwords.create(null, {
      email: this.email.value
    }, {
      200: (response) => user.setMessage({ body: t('success'), type: 'success' })
    })

    this.email.value = null
  }

  render() {
    const { fill, animate, user } = this.props 
    const { message, clearMessage } = user
    const { isLoading } = this.passwords

    return (
      <Auth alert={{ message, clearMessage }} isLoading={isLoading} fill={fill} animate={animate}
                 extras={links(this.props.modal, ['login', 'dont_have_account'])}>
        <h3>{t('forgot_password')}</h3>
        <form className='pure-form pure-form-stacked' styleName='form.body' onSubmit={this.submitForm}>
          <fieldset>
            <label htmlFor='email'>{t('email')}</label>
            <input type='email'
                    ref={node => this.email = node}
                    placeholder={t('email')}
                    className='pure-input-1' />
          </fieldset>
          <button type='submit' className='pure-button pure-input-1' styleName='button.success'>
            {t('reset_my_password')}
          </button>
        </form>
      </Auth>
    )
  }
}

export default Forgot