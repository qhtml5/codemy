import React from 'react';
import classNames from 'classnames';
import { observer, inject } from 'mobx-react';

import Page from 'front/components/Page';
import links from './links';

import form from 'styles/form.sass';
import button from 'front/styles/buttons.sass';

import t from './forgot.locale';

@inject('user') @observer
class Forgot extends React.Component {
  componentWillMount() {
    this.props.user.clearMessage();
  }

  submitForm = (e) => {
    e.preventDefault();
    const { email } = this.refs;
    const { user } = this.props;

    if (email.value === '') {
      user.setMessage({
        body: t('fill_in_email'),
        type: 'error',
      });
    }

    return;
  }

  render() {
    const { fill, animate, user } = this.props; 
    const { message, clearMessage, isLoading } = user;

    return (
      <Page.Auth alert={{ message, clearMessage }} isLoading={isLoading} fill={fill} animate={animate}
                 extras={links(this.props.modal, ['login', 'dont_have_account'])}>
        <h3>{t('forgot_password')}</h3>
        <form className={classNames('pure-form', 'pure-form-stacked', form.body)} onSubmit={this.submitForm}>
          <fieldset>
            <label htmlFor='email'>{t('email')}</label>
            <input type='email'
                    ref='email'
                    placeholder={t('email')}
                    className='pure-input-1' />
          </fieldset>
          <button type='submit' className={classNames('pure-button', button.success, 'pure-input-1')}>
            {t('reset_my_password')}
          </button>
        </form>
      </Page.Auth>
    );
  }
}

export default Forgot;