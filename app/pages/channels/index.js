import React from 'react'
import { routeNode } from 'react-router5'

import Collection from '../posts/collection'

export default routeNode('channels')(props => <Collection />)
