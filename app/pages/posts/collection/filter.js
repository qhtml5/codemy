import React from 'react'
import { observer, inject } from 'mobx-react'
import { extendObservable } from 'mobx'

import Loading from 'components/loading'

import heading from 'styles/heading.sass'

import { Channels } from 'stores'

import Channel from './channel.js'

@inject('endpoints') @observer
class Filter extends React.Component {
  constructor(props) {
    super(props)
    const { endpoints } = props

    extendObservable(this, { 
      channels: new Channels(endpoints.studio)
    })
  }

  componentDidMount() {
    this.channels.findAll({})
  }

  route = (channel) => { 
    const { channels } = this
    if (channel.slug === 'all') return '/posts'

    return channels.route({ 
      posts: true, search: true, id: channel.slug 
    })
  }

  render() {
    const { byType, isLoading } = this.channels

    if (isLoading) return (<Loading />)

    return (
      <div id='filter'>
        {Object.keys(byType).map(type =>
          <div className='pure-menu' key={type}>
            <span className='pure-menu-heading' styleName='heading.heading'>{type}</span>
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
