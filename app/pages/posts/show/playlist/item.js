import React from 'react'
import c from 'classnames'
import { Link } from 'react-router5'

import './item.sass'

class Item extends React.PureComponent {
  render() {
    return (
      <li className='pure-menu-item animated fadeIn' styleName='playlist_item'>
        <Link routeName='posts.show' routeParams={{ post: this.props.id }}
              className='pure-menu-link' activeClassName={styles.active}>
          <h5>{this.props.title}</h5>
        </Link>
      </li>
    )
  }
}

export default Item
