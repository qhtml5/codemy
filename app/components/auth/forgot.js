import React from 'react'
import classNames from 'classnames'
import { observer, inject } from 'mobx-react'

import form from '~/app/styles/form.sass'
import button from '~/app/styles/button.sass'

import { Auth } from 'components/page'
import links from './links'

import t from './forgot.locale'

@inject('user') @observer
class Forgot extends React.Component {
  componentWillMount() {
    this.props.user.clearMessage()
  }

  submitForm = (e) => {
    e.preventDefault()
    const { email } = this.refs
    const { user } = this.props

    if (email.value === '') {
      user.setMessage({
        body: t('fill_in_email'),
        type: 'error',
      })
    }

    return
  }

  render() {
    const { fill, animate, user } = this.props 
    const { message, clearMessage, isLoading } = user

    return (
      <Auth alert={{ message, clearMessage }} isLoading={isLoading} fill={fill} animate={animate}
                 extras={links(this.props.modal, ['login', 'dont_have_account'])}>
        <h3>{t('forgot_password')}</h3>
        <form className='pure-form pure-form-stacked' styleName='form.body' onSubmit={this.submitForm}>
          <fieldset>
            <label htmlFor='email'>{t('email')}</label>
            <input type='email'
                    ref='email'
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