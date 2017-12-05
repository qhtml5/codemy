import React from 'react'
import { Login } from 'components/auth'
 
export default props => {
  const { router } = props

  const goToPosts = () => router.navigate('posts')

  return (
    <Login fill
           animate='animated fadeIn'
           callback={goToPosts} />
  )
}
