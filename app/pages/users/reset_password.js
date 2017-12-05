import React from 'react'

import { Reset } from 'components/auth'

export default (props) => {
  const { router, route } = props
  const { token } = route.params

  const goToSignIn = () => router.navigate('users.sign_in')

  return <Reset fill token={token} 
                callback={goToSignIn} 
                animate='animated fadeIn' />
}