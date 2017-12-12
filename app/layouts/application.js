import React from 'react'
import { observer, Provider } from 'mobx-react'
import { observable, action } from 'mobx'
import { NotificationStack } from 'react-notification'

import Modal from '@fronto/components/modal'

import Loading from 'components/loading'
import Pages from '../pages'
import * as Menu from './menu'

import './application.sass'

import confirmation from './confirmation'

@observer
class Application extends React.Component {
  constructor(props) {
    super(props)

    const { user, layout } = props

    this.confirmation = confirmation({ user, layout })
  }

  componentDidMount() {
    const { user, setting, layout } = this.props

    setting.find()
    user.signIn()
  }

  componentDidUpdate() {
    const { user, layout } = this.props

    if (!user.confirmed && !this.confirmation.notified) {
      this.confirmation.notify()
    }
  }

  memberOrGuest = () => {
    const { signedIn, isLoading } = this.props.user

    if (isLoading) return <Loading />
    if (signedIn) return <Menu.Member />

    return (<Menu.Guest />)
  }

  render() {
    const { layout } = this.props
    const { notifications } = layout

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
            notifications={notifications.slice()}
            onDismiss={notification => {}} />
        </div>
      </Provider>
    );
  }
}

export default Application
