import React from 'react'
import c from 'classnames'
import { Link, withRoute } from 'react-router5'

import './index.sass'
import logo   from 'assets/logo.svg'

const Main = (props) => {
  const { router } = props;

  return (
    <div className='pure-menu' styleName='menu'>
      <span className='pure-menu-heading' styleName='heading'>
        <div><img src={logo} width='48' height='48' /></div>
        <div>CODEMY.NET</div>
      </span>

      <ul className='pure-menu-list'>
        <li className='pure-menu-item'>
          <Link routeName='posts' className='pure-menu-link'
                styleName={c({ active: router.isActive('posts') })}>
            <i className='material-icons'>video_library</i>
            <span>Videos</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default withRoute(Main);
