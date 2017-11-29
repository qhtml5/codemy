import React from 'react'
import { observer, Provider } from 'mobx-react'
import { observable, action } from 'mobx'

import Modal from '@fronto/components/modal'

import Loading from 'components/loading'
import Pages from '../pages'
import * as Menu from './menu'

import './application.sass'

@observer
class Application extends React.Component {
  componentDidMount() {
    const { user } = this.props

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
        </div>
      </Provider>
    );
  }
}

export default Application
