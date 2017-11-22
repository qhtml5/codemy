import React                from 'react'
import Scrollbars           from 'react-custom-scrollbars'
import { inject, observer } from 'mobx-react'
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
    const { channel } = nextProps.params

    this.posts.findAll({ search: true, channel_id: channel, page: 1 })
  }

  componentDidMount() {
    const { posts, params } = this.props
    const { channel } = params
    this.posts.findAll({ search: true, channel_id: channel, page: 1 })
  }

  paginate = _.debounce(() => { 
    const { currentPage } = this.posts

    const { channel } = this.props.params

    this.posts.findAll({ 
      search: true, channel_id: channel, page: currentPage + 1 
    }, { replace: false })
  }, 800)

  handleScroll = scroll => {
    if ((scroll.top * 100) >= 90) this.paginate()
  }

  render() {
    const { isLoading, collection } = this.posts

    return (
      <Filterable filter={<Filter />}>
        <Keyword posts={this.posts} channelId={this.props.channelId} />
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

export default Collection
