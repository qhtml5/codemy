import React from 'react'
import { Link } from 'react-router5'

import './item.sass'

const Item = props =>
  <li className='pure-menu-item' styleName='item'>
    <Link routeName='channels.show' routeParams={{ channel: props.id }}
          className='pure-menu-link'
          activeClassName='active'>
      <h5>{props.name}</h5>
      {props.text}
    </Link>
  </li>

export default Item
