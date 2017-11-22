import React from 'react'
import c from 'classnames'
import { Link, withRoute } from 'react-router5'

import './item.sass'

const Item = props => {
  const { isActive } = props.router

  const activeClass = c({ 
    active: isActive('channels.show', { 
      channel: props.id 
    }) 
  })

  return (
    <li className='pure-menu-item' styleName='item'>
      <Link routeName='channels.show' 
            routeOptions={{ reload: true }}
            routeParams={{ channel: props.id }}
            className='pure-menu-link'
            styleName={activeClass}>
        <h5>{props.name}</h5>
        {props.text}
      </Link>
    </li>
  )
}

export default withRoute(Item)
