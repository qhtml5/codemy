import React from 'react'
import { observer, Provider } from 'mobx-react'
import { observable, action } from 'mobx'
import { NotificationStack } from 'react-notification'

import Modal from '@fronto/components/modal'

import Loading from 'components/loading'
import Pages from '../pages'
import * as Menu from './menu'

import './application.sass'

@observer
class Application extends React.Component {
  componentDidMount() {
    const { user, setting } = this.props

    setting.find()
    user.signIn()
  }

  memberOrGuest = () => {
    const { signedIn, isLoading } = this.props.user

    if (isLoading) return <Loading />
    if (signedIn) return <Menu.Member />

    return (<Menu.Guest />)
  }

  render() {
    const { layout } = this.props

    return (
      <Provider {...this.props}>
        <div id='Application'>
          <aside styleName='sidebar'>
            <Menu.Main />
            {this.memberOrGuest()}
          </aside>
          <main styleName='content'>
            <Pages />
          </main>
          <Modal ref={layout.setModal} />
          <NotificationStack 
            notifications={layout.notifications.slice()}
            onDismiss={notification => {}} />
        </div>
      </Provider>
    );
  }
}

export default Application
