import React from 'react'
import { observer, inject } from 'mobx-react'

import Loading from 'components/loading'
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
      return (<Loading />)

    if (signedIn)
      return (<Menu.Member />)

    return (<Menu.Guest />)
  }

  render() {    
    return (
      <div id='Application'>
        <aside styleName='sidebar'>
          <Menu.Main />
          {this.memberOrGuest()}
        </aside>
        <main styleName='content'>
          <Pages />
        </main>
      </div>
    );
  }
}

export default Application
