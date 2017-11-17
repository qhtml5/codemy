import React from 'react'
import { observer, inject } from 'mobx-react'

import Spinner from '../components/spinner'
import Pages from '../pages'
import * as Menu from './menu'

import './application.sass'

@inject('user') @observer
class Application extends React.Component {
  componentDidMount() {
    const { user } = this.props
    user.signIn()
  }

  memberOrGuest = () => {
    const { signedIn, isLoading } = this.props.user

    if (isLoading)
      return (<Spinner />)

    if (signedIn)
      return (<Menu.Member />)

    return (<Menu.Guest />)
  }

  render() {    
    return (
      <div id='Application'>
        <div styleName='sidebar'>
          <Menu.Main />
          {this.memberOrGuest()}
        </div>
        <div className='content'>
          <Pages />
        </div>
      </div>
    );
  }
}

export default Application
