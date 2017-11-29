import { createElement } from 'react'
import { routeNode } from 'react-router5'

import collection from '../posts/collection'

export default routeNode('channels')((props) => {
  return createElement(collection)
})