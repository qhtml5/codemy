import React from 'react';
import { Link } from 'react-router5';

import { Login, Register, Forgot } from 'components/auth';

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
    <Link key='sign_in' 
          routeName='users.sign_in' 
          routeOptions={{reload: true}}>{t('login')}</Link>,
  dont_have_account: 
    <Link key='registration' 
          routeName='users.registration' 
          routeOptions={{reload: true}}>{t('dont_have_account')}</Link>,
  forgot_password:
    <Link key='forgot_password' 
          routeName='users.forgot_password' 
          routeOptions={{reload: true}}>{t('forgot_password')}</Link>,
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
