import React                from 'react'
import Scrollbars           from 'react-custom-scrollbars'
import { inject, observer } from 'mobx-react'
import { withRoute }        from 'react-router5'
import _                    from 'lodash'

import { Filterable }       from 'components/page'
import Loading              from 'components/loading'

import { Posts }            from 'stores'

import Post                 from './post'
import Filter               from './filter'
import Keyword              from './keyword'
import './index.sass'

@inject('endpoints') @observer
class Collection extends React.Component {
  constructor(props) {
    super(props)

    const { endpoints } = this.props
    const { studio } = endpoints

    this.posts = new Posts(endpoints.studio)
  }
  
  componentWillReceiveProps(nextProps) {
    const { channelId } = nextProps.route.params
    this.posts.findAll({ search: true, channel_id: channelId, page: 1 })
  }

  componentDidMount() {
    const { posts, route } = this.props
    const { channelId } = route.params
    this.posts.findAll({ search: true, channel_id: channelId, page: 1 })
  }

  paginate = _.debounce(() => { 
    const { currentPage } = this.posts

    const { channelId } = this.props.route.params

    this.posts.findAll({ 
      search: true, channel_id: channelId, page: currentPage + 1 
    }, { replace: false })
  }, 800)

  handleScroll = scroll => {
    if ((scroll.top * 100) >= 90) this.paginate()
  }

  render() {
    const { isLoading, collection } = this.posts
    const { channelId } = this.props.route.params

    return (
      <Filterable filter={<Filter />}>
        <Keyword posts={this.posts} channelId={channelId} />
        <Scrollbars autoHeight autoHeightMin={`calc(100vh - 52px)`} 
                    onScrollFrame={this.handleScroll} universal ref={node => { this.scrollbar = node }}>
          <div styleName='collection'>
            {collection.map((post, index) =>
              <Post key={post.id} {...post} index={index % 24} />
            )}
            <Loading active={isLoading} />
          </div>
        </Scrollbars>
      </Filterable>
    )
  }
}

export default withRoute(Collection)
