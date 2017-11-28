import React from 'react'
import { Login } from 'components/auth'
import { withRoute } from 'react-router5'
 
export default withRoute(props => {
  const { router } = props

  const goToPosts = () => router.navigate('posts')

  return (
    <Login fill
           animate='animated fadeIn'
           callback={goToPosts} />
  )
})
