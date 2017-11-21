import React    from 'react'
import { Link } from 'react-router5'

import './post.sass'

const Post = props =>
  <div className='pure-u-xs-1 pure-u-sm-1-2 pure-u-md-1-3 animated fadeIn'
       styleName='post'
       style={{ animationDelay: `${props.index / 12}s` }}>
    <div>
      <Link routeName='posts.show' routeParams={{ post: props.slug }}>
        <div styleName='shell'>
          <img src={props.thumbnails.high} className='pure-img' />
        </div>
        <div styleName='title'>
          <h2>{props.title}</h2>
        </div>
      </Link>
    </div>
  </div>

export default Post
