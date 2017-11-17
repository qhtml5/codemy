import React from 'react';
import { observer, inject } from 'mobx-react';
import { browserHistory } from 'react-router';
import classNames from 'classnames';

import Page from 'front/components/Page';
import links from './links';

import form from 'styles/form.sass';

import button from 'front/styles/buttons.sass';
import logo   from 'front/assets/logo-white.svg';
import t from './login.locale';

@inject('user') @observer
class Login extends React.PureComponent { 
  componentDidMount() {
    this.props.user.clearMessage();
  }

  submitForm = (e) => {
    e.preventDefault();

    const { email, password } = this.refs;
    const { user, modal } = this.props;

    if (email.value === '' || password.value === '') {
      user.setMessage({
        body: t('fill_in_email_password'),
        type: 'error',
      });

      return false;
    }

    user.createSession(
      email.value, password.value, this.props.callback
    );
  }

  render() {
    const { fill, animate, user } = this.props; 
    const { message, clearMessage, isLoading } = user;

    return (
      <Page.Auth alert={{ message, clearMessage }} isLoading={isLoading} fill={fill} animate={animate}
                 extras={links(this.props.modal, ['forgot_password', 'dont_have_account'])}>
        <h3>{t('sign_in')}</h3>
        <form className={classNames('pure-form', 'pure-form-stacked', form.body)} onSubmit={this.submitForm}>
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
          <button type='submit' className={classNames('pure-button', button.success, 'pure-input-1')}>
            {t('sign_in')}
          </button>
        </form>
      </Page.Auth>
    );
  }
}

export default Login;
