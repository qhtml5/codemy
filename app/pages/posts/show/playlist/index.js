import React from 'react'
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
  showPrevious = 1
  itemHeight = 42

  setCurrent = (node) => {
    if (node && node.props.slug === this.props.params.postId) {
      this.setState({ current: node })
    }
  }

  constructor(props) { 
    super(props)

    const { endpoints } = props

    this.store = new Store(endpoints.studio)
    this.state = {
      current: null,
      userInteracted: false,
      currentChannel: null
    }
  }

  getItems(channel) {
    const { currentChannel } = this.state

    if (channel && channel.slug !== currentChannel) {
      this.store.findAll({ search: true, playlist_id: channel.slug })
      this.setState({ currentChannel: channel.slug, userInteracted: true })
    }
  }

  componentDidMount() {
    this.getItems(this.props.channel)
  }

  componentWillReceiveProps(nextProps) {
    const { channel } = this.props

    if (!channel && nextProps.channel) this.getItems(nextProps.channel)
  }

  componentDidUpdate() {
    const { current, userInteracted } = this.state

    if (this.scrollbar && current && !userInteracted) {
      this.scrollbar.scrollTop((current.props.index - this.showPrevious) * this.itemHeight)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!this.props.channel && nextProps.channel) 
      return true

    return false
  }

  render() {
    const { channel } = this.props
    const { isLoading, collection } = this.store
    
    if (isLoading) { return (<Loading />) }
    if (!channel)  { return null }

    return (
      <div className='pure-menu'>
        <span className='pure-menu-heading' styleName='heading.heading'>
          {channel.name}
        </span>
        <Scrollbars autoHeight autoHeightMin={`calc(100vh - 30px)`} universal 
                    ref={node => this.scrollbar = node}>
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
