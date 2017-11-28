import React from 'react'
import c from 'classnames'
import { Link, withRoute } from 'react-router5'

import filter from 'styles/filter.sass'

import t from './channel.locale'

const updated = ago => {
  if (!ago) { return null }

  return (<p>{t('updated')} {ago}</p>)
}

const Channel = props => {
  const { name, updated_at_ago, slug, router } = props

  const activeClass = c({ 
    active: router.isActive('channels.show', { 
      channelId: slug 
    }) 
  })

  return (
    <li className='pure-menu-item' styleName='filter.item'>
      <Link routeName='channels.show'
            routeParams={{ channelId: slug }}
            className='pure-menu-link'
            styleName={activeClass}>
        <h5>{name}</h5>
        {updated(updated_at_ago)}
      </Link>
    </li>
  )
}

export default withRoute(Channel)
