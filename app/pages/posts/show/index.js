import React from 'react'
import Scrollbars from 'react-custom-scrollbars'
import { observer, inject } from 'mobx-react'
import { withRoute } from 'react-router5'

import { Filterable } from 'components/page'
// import Modal from 'components/Modal'
import title from '@fronto/helpers/title'

import { Posts } from 'stores'

import Video from './video'
import Description from './description'
import Playlist from './playlist'

import './index.sass'

@inject('endpoints', 'layout') @observer
class Show extends React.Component {
  constructor(props) {
    super(props)

    const { endpoints } = props

    this.posts = new Posts(endpoints.studio)
  }

  componentDidMount() {
    const { route } = this.props
    this.posts.findBy({ id: route.params.postId })
  }

  componentDidUpdate() {
    const { selected } = this.posts
    if (selected.title) { title(selected.title) }
  }

  componentWillReceiveProps(nextProps) {
    const { route } = nextProps
    this.posts.findBy({ id: route.params.postId })
  }

  render() {
    const { selected, isLoading } = this.posts
    const { channel } = selected

    const { route, layout } = this.props

    const { modal } = layout

    return (
      <Filterable filter={<Playlist params={route.params} channel={channel} />} playback>
        <div styleName='video'>
          <Video modal={modal} posts={this.posts} params={route.params} />
        </div>
        <div styleName='title_bar'>
          <h1>{selected.title}</h1>
        </div>
        <Scrollbars autoHeight autoHeightMin={`calc(100vh - 54vh)`} universal ref={node => this.scrollbar = node}>
          <Description description={selected.description} isLoading={isLoading} />
        </Scrollbars>
      </Filterable>
    )
  }
}

export default withRoute(Show)
