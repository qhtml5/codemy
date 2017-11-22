import React from 'react'
import c from 'classnames'
import { Link, withRoute } from 'react-router5'

import './item.sass'

class Item extends React.PureComponent {
  render() {
    const { router, id } = this.props

    return (
      <li className='pure-menu-item animated fadeIn' styleName='playlist_item'>
        <Link routeName='posts.show' routeParams={{ post: id }}
              className='pure-menu-link' routeOptions={{ reload: true }}
              styleName={c({ active: router.isActive('posts.show', { post: id }) })}>
          <h5>{this.props.title}</h5>
        </Link>
      </li>
    )
  }
}

export default withRoute(Item)
