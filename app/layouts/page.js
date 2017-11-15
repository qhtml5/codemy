import { createElement } from 'react'
import { routeNode } from 'react-router5'

import * as pages from '../pages'

export default routeNode('')((props) => {
  const { route } = props;

  const resource = route.name.split('.')[0]
  const page = route.name.split('.')[-1] || 'collection'

  return createElement(pages[resource][page])
})