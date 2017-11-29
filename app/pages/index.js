import { createElement } from 'react'
import { routeNode } from 'react-router5'

import posts from './posts'
import channels from './channels'
import * as users from './users'
import settings from './settings'

const app = { 
  posts, 
  users,
  settings,
  channels
}

export default routeNode('')((props) => {
  const { route } = props
  const { params } = route

  const layout = route.name.split('.')[0]

  return createElement(app[layout])
})