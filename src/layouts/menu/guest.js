import React from 'react'
import c from 'classnames'
import { Link } from 'react-router5'

import styles from './index.sass'

const Guest = (props) =>
  <div className='pure-menu' styleName='styles.menu'>
    <span className='pure-menu-heading' styleName='styles.heading'>
      GUEST
    </span>

    <ul className='pure-menu-list'>
      <li className='pure-menu-list'>
        <Link routeName='users.sign_in' className='pure-menu-link' 
              activeClassName={styles.active}>
          <i className='material-icons'>account_box</i>
          <span>Sign In</span>
        </Link>
      </li>
      <li className='pure-menu-list'>
        <Link routeName='users.registration' className='pure-menu-link' 
              activeClassName={styles.active}>
          <i className='material-icons'>person_add</i>
          <span>Register</span>
        </Link>
      </li>
    </ul>
  </div>

export default Guest
