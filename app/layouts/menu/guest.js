import React from 'react';
import { Link } from 'react-router5';

import './index.sass';

const Guest = () =>
  <div className='pure-menu' styleName='menu'>
    <span className='pure-menu-heading' styleName='heading'>
      GUEST
    </span>

    <ul className='pure-menu-list'>
      <li className='pure-menu-list'>
        <Link routeName='users.sign_in' className='pure-menu-link'>
          <i className='material-icons'>account_box</i>
          <span>Sign In</span>
        </Link>
      </li>
      <li className='pure-menu-list'>
        <Link routeName='users.registration' className='pure-menu-link'>
          <i className='material-icons'>person_add</i>
          <span>Register</span>
        </Link>
      </li>
    </ul>
  </div>;

export default Guest;
