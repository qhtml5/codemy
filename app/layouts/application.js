import React from 'react'
import { observer, inject } from 'mobx-react'

import Modal from '@fronto/components/modal'

import Loading from 'components/loading'
import Pages from '../pages'
import * as Menu from './menu'


import './application.sass'

@inject('user', 'setting') @observer
class Application extends React.Component {
  componentDidMount() {
    const { user } = this.props
    user.signIn()
  }

  setModal = (node) => {
    const { setting } = this.props
    setting.layout.modal = node
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
        <Modal ref={this.setModal} />
      </div>
    );
  }
}

export default Application
