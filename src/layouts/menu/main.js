import React from 'react'
import c from 'classnames'
import { Link } from 'react-router5'

import styles from './index.sass'
import logo from 'assets/logo.svg'

const Main = (props) => {
  return (
    <div className='pure-menu' styleName='styles.menu'>
      <span className='pure-menu-heading' styleName='styles.heading'>
        <div><img src={logo} width='48' height='48' /></div>
        <div>CODEMY.NET</div>
      </span>

      <ul className='pure-menu-list'>
        <li className='pure-menu-item'>
          <Link routeName='posts' className='pure-menu-link'
                activeClassName={styles.active}>
            <i className='material-icons'>video_library</i>
            <span>Videos</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Main
