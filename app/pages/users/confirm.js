import React from 'react'
import { inject, observer } from 'mobx-react'

import { Auth } from 'components/page'
import { Confirmations } from 'stores'

import _ from 'lodash'

import t from './confirm.locale'

@inject('endpoints', 'user', 'layout') @observer
class Confirm extends React.Component {
  constructor(props) {
    super(props)

    const { endpoints } = props

    this.store = new Confirmations(endpoints.studio, 'auth')
  }

  onSuccess = (response) => {
    const { layout, router } = this.props

    layout.addNotification({
      message: t('success'), key: 'confirm_success', dismissAfter: 5000
    })
    layout.removeNotification({ key: 'confirm' })

    router.navigate('posts')
  }

  onUnprocessable = (response) => {
    const { layout, router } = this.props

    layout.addNotification({
      message: t('failed'), key: 'confirm_failed'
    })

    router.navigate('users.sign_in')
  }

  componentDidMount() {
    const { route, user, router } = this.props

    if (user.signedIn) {
      this.store.update({ id: route.params.token }, {}, {
        200: this.onSuccess,
        422: this.onUnprocessable
      })
    }
  }

  render() {
    const { isLoading } = this.store

    return (
      <Auth alert={{}} fill={true} isLoading={isLoading}>
        <h3>{t('confirm_account')}</h3>
      </Auth>
    )
  }
}


export default Confirm
