import React from 'react'
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'

import Scrollbars from 'react-custom-scrollbars'
import c from 'classnames'

import Loading  from 'components/loading'
import heading from 'styles/heading.sass'

import Item from './item'
import styles from './index.sass'

import Store from './store'

@inject('endpoints') @observer
class Playlist extends React.PureComponent {
  @observable current = null
  @observable userInteracted = false
  showPrevious = 1
  itemHeight = 42

  @action setCurrentSlug = (slug) => this.currentSlug = slug
  @action setUserInteracted() { this.userInteracted = true }
  @action setCurrent = (node) => {
    if (node && node.props.slug === this.props.params.postId) {
      this.current = node
    }
  }

  constructor(props) { 
    super(props)

    const { endpoints } = props

    this.store = new Store(endpoints.studio)
  }

  getItems(channel) {
    const { selected } = this.store

    if (channel && channel.slug !== selected.slug) {
      this.store.findAll({ search: true, playlist_id: channel.slug })
      this.store.setSelected({ slug: channel.slug })
    }
  }

  componentDidMount() {
    this.getItems(this.props.channel)
  }

  componentWillReceiveProps(nextProps) {
    const { channel } = this.props
    const { selected } = this.store

    if (!channel && nextProps.channel) this.getItems(nextProps.channel)
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { channel } = this.props
    const { selected } = this.store

    if (channel && selected.slug === channel.slug) {
      this.setUserInteracted()
      return false
    }
    return true
  }

  componentDidUpdate() {
    if (this.scrollbar && this.current && !this.userInteracted) {
      this.scrollbar.scrollTop((this.current.props.index - this.showPrevious) * this.itemHeight)
    }
  }

  render() {
    const { channel } = this.props
    const { isLoading, collection, selected } = this.store
    
    if (isLoading) { return (<Loading />) }
    if (!channel) { return null }

    return (
      <div className='pure-menu'>
        <span className='pure-menu-heading' styleName='heading.heading'>
          {channel.name}
        </span>
        <Scrollbars autoHeight autoHeightMin={`calc(100vh - 30px)`} universal 
                    ref={node => { this.scrollbar = node }}>
          <ul className='pure-menu-list' styleName='styles.playlist'>
            {collection.map((item, index) =>
              <Item key={item.id} {...item} ref={this.setCurrent} index={index} id={item.slug} />
            )}
          </ul>
        </Scrollbars>
      </div>
    )
  }
}

export default Playlist
