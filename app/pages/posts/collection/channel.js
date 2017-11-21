import React from 'react'
import { Item } from 'components/menu'

import t from './channel.locale'

const updated = ago => {
  if (!ago) { return null }

  return (<p>{t('updated')} {ago}</p>)
}

const Channel = props => {
  const { name, updated_at_ago } = props.model

  return (
    <Item url={props.pathname} name={name} text={updated(updated_at_ago)} />
  )
}

export default Channel
