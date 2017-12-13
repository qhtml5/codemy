import { createElement } from 'react'
import { routeNode } from 'react-router5'

import sign_in from './sign_in'
import registration from './registration'
import forgot_password from './forgot_password'
import reset_password from './reset_password'
import confirm from './confirm'

const pages = { 
  sign_in, registration, 
  forgot_password, reset_password, 
  confirm }

export default routeNode('users')(props => {
  const { route } = props
  const page = route.name.split('.')[1]

  return createElement(pages[page], {...props})
})
