import React from 'react'
import { observer, inject } from 'mobx-react'

import Loading from 'components/loading'

import styles  from 'front/styles/heading.sass'

import Channel from './Channel.js'

@inject('channels') @observer
class Filter extends React.Component {
  componentDidMount() {
    const { channels } = this.props
    channels.findAll({})
  }

  route = (channel) => { 
    const { channels } = this.props
    if (channel.slug === 'all') return '/posts'

    return channels.route({ 
      posts: true, search: true, id: channel.slug 
    })
  }

  render() {
    const { channels } = this.props
    const { byType, isLoading } = channels

    if (isLoading) { return (<Spinner />) }

    return (
      <div id='filter'>
        {Object.keys(byType).map(type =>
          <div className='pure-menu' key={type}>
            <span className={`${styles.heading} pure-menu-heading`}>{type}</span>
            <ul className='pure-menu-list'>
              {byType[type].map(channel =>
                <Channel model={channel} key={channel.id} 
                         pathname={this.route(channel)} />
              )}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default Filter
