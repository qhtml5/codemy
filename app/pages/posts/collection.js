import React      from 'react'
import Scrollbars from 'react-custom-scrollbars'
import { extendObservable } from 'mobx'
import { inject, observer }  from 'mobx-react'
import _             from 'lodash'

import Loading       from 'components/loading'

import { Posts }     from 'stores'

// import Post          from './Post'
import './collection.sass'

@inject('endpoints') @observer
class Collection extends React.Component {
  constructor(props) {
    super(props)

    const { endpoints } = this.props
    const { studio } = endpoints

    extendObservable(this, {
      posts: new Posts(endpoints.studio)
    })
  }

  componentWillReceiveProps(nextProps) {
    this.posts.findAll({ search: true, channel_id: nextProps.channelId, page: 1 })
  }

  componentDidMount() {
    const { posts, channelId } = this.props
    this.posts.findAll({ search: true, channel_id: channelId, page: 1 })
  }

  paginate = _.debounce(() => { 
    const { currentPage } = this.posts

    this.posts.findAll({ 
      search: true, channel_id: this.props.channelId, page: currentPage + 1 
    }, { replace: false })
  }, 800)

  handleScroll = scroll => {
    if ((scroll.top * 100) >= 90) this.paginate()
  }

  render() {
    const { isLoading, collection } = this.posts

    return (
      <Scrollbars autoHeight autoHeightMin={`calc(100vh - 52px)`} 
                  onScrollFrame={this.handleScroll} universal ref={node => { this.scrollbar = node }}>
        <div styleName='collection'>
          {collection.map((post, index) =>
            <Post key={post.id} {...post} index={index % 24} pathname={posts.route({ id: post.slug })} />
          )}
          <Loading active={isLoading} />
        </div>
      </Scrollbars>
    )
  }
}

export default Collection
