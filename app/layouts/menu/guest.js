import React from 'react'
import c from 'classnames'
import { Link, withRoute } from 'react-router5'

import './index.sass'

const Guest = (props) => {
  const { isActive } = props.router;

  return (
    <div className='pure-menu' styleName='menu'>
      <span className='pure-menu-heading' styleName='heading'>
        GUEST
      </span>

      <ul className='pure-menu-list'>
        <li className='pure-menu-list'>
          <Link routeName='users.sign_in' className='pure-menu-link' 
                styleName={c({ active: isActive('users.sign_in') })}>
            <i className='material-icons'>account_box</i>
            <span>Sign In</span>
          </Link>
        </li>
        <li className='pure-menu-list'>
          <Link routeName='users.registration' className='pure-menu-link' 
                styleName={c({ active: isActive('users.registration') })}>
            <i className='material-icons'>person_add</i>
            <span>Register</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default withRoute(Guest)
