import { createElement } from 'react'
import { routeNode } from 'react-router5'

import * as posts from './posts'
import * as users from './users'
import * as settings from './settings'

const pages = { 
  posts, 
  users,
  settings,
  channels: {}
}

pages.channels.show = pages.posts.collection
pages.posts.search  = pages.posts.collection

export default routeNode('')((props) => {
  const { route } = props
  const { params } = route

  const resource = route.name.split('.')[0]
  const page = route.name.split('.')[1] || 'collection'

  return createElement(pages[resource][page])
})