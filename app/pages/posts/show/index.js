import React from 'react'
import Scrollbars from 'react-custom-scrollbars'
import { observer, inject } from 'mobx-react'

import { Filterable } from 'components/page'
// import Modal from 'components/Modal'
import title from '@fronto/helpers/title'

import { Posts } from 'stores'

import Video from './video'
import Description from './description'
import Playlist from './playlist'

import './index.sass'

@inject('endpoints', 'setting') @observer
class Show extends React.Component {
  constructor(props) {
    super(props)

    const { endpoints } = props

    this.posts = new Posts(endpoints.studio)
  }

  componentDidMount() {
    const { params } = this.props
    this.posts.findBy({ id: params.post })
  }

  componentDidUpdate() {
    const { selected } = this.posts
    if (selected.title) { title(selected.title) }
  }

  componentWillReceiveProps(nextProps) {
    this.posts.findBy({ id: nextProps.params.post })
  }

  render() {
    const { selected, isLoading } = this.posts
    const { channel } = selected

    const { modal } = this.props.setting.layout

    return (
      <Filterable filter={<Playlist params={this.props.params} channel={channel} />} playback>
        <div styleName='video'>
          <Video modal={modal} posts={this.posts} params={this.props.params} />
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

export default Show
