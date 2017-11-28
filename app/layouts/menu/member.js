import React from 'react'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router5'

import styles from './index.sass'

@inject('user', 'subscription', 'cards') @observer
class Member extends React.Component {
  signOut = (e) => {
    e.preventDefault()
    const { user, subscription, cards } = this.props 

    user.signOut()
    subscription.clearSelected()
    cards.clearCollection()
  }

  render() {
    return (
      <div className={`${styles.menu} pure-menu`}>
        <span className={`${styles.heading} pure-menu-heading`}>
          MEMBER
        </span>

        <ul className='pure-menu-list'>
          <li className='pure-menu-list'>
            <Link routeName='settings' className='pure-menu-link'
                       activeClassName={styles.active}>
              <i className='material-icons'>settings</i>
              <span>Settings</span>
            </Link>
          </li>
          <li className='pure-menu-list'>
            <a onClick={this.signOut} href='#' className='pure-menu-link'>
              <i className='material-icons'>exit_to_app</i>
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </div>
    )
  }
}

export default Member
