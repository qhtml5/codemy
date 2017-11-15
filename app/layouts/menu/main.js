import React from 'react';

import styles from './index.sass';
import logo   from 'assets/logo.svg';

const Main = () =>
  <div className={`${styles.menu} pure-menu`}>
    <span className={`${styles.heading} pure-menu-heading`}>
      <div><img src={logo} width='48' height='48' /></div>
      <div>CODEMY.NET</div>
    </span>

    <ul className='pure-menu-list'>
      <li className='pure-menu-item'>
        <Link to='/posts' className='pure-menu-link' activeClassName={styles.active}>
          <i className='material-icons'>video_library</i>
          <span>Videos</span>
        </Link>
      </li>
    </ul>
  </div>;

export default Main;
