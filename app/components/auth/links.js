import React from 'react';
import { Link } from 'react-router';

import { Login, Register, Forgot } from 'front/components/Auth';

import t from './links.locale';

const components = {
  login: (modal) =>
    <Login modal={modal} animate='animated fadeIn' />,
  dont_have_account: (modal) =>
    <Register modal={modal} animate='animated fadeIn' />,
  forgot_password: (modal) => 
    <Forgot modal={modal} animate='animated fadeIn' />,
};

const links = {
  login: 
    <Link key='login' to='/users/sign_in'>{t('login')}</Link>,
  dont_have_account: 
    <Link key='dont_have_account' to='/users/registration'>{t('dont_have_account')}</Link>,
  forgot_password:
    <Link key='forgot_password' to='/users/forgot_password'>{t('forgot_password')}</Link>,
}

const callback = (e, modal, key) => {
  e.preventDefault();
  modal.setContent(components[key](modal));
}

export default (modal, keys = []) => {
  if (modal) {
    return keys.map(key =>
      <a key={key} href='#' onClick={(e) => callback(e, modal, key)}>{t(key)}</a>
    );
  }

  return keys.map(key => links[key]);
};
