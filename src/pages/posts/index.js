import { createElement } from 'react'
import { routeNode } from 'react-router5'

import collection from './collection'
import show from './show'

const pages = {
  collection, show, search: collection
}

export default routeNode('posts')((props) => {
  const { route } = props

  const page = route.name.split('.')[1] || 'collection'

  if (page === 'collection') return createElement(pages[page])

  return createElement(pages[page], {...props})
})
