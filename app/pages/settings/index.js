import React, { createElement } from 'react'

import profile from './profile'
import subscription from './subscription'
import cards from './cards'

import Menu from './menu'

import { routeNode } from 'react-router5'
import { Filterable } from 'components/page'

const pages = {
  profile, subscription, cards
}

export default routeNode('settings')((props) => {
  const { route } = props
  const { params } = route

  const page = route.name.split('.')[1]

  return (
    <Filterable filter={<Menu />}>
      {createElement(pages[page])}
    </Filterable>
  )
})

