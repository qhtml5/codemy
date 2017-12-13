import React from 'react'
import { inject, observer } from 'mobx-react'
import { NotificationStack } from 'react-notification'

@inject('layout') @observer
class Notifications extends React.Component {
  dismiss = (notification) => {
    const { layout } = this.props
    layout.removeNotification(notification)
  }

  render() {
    const { layout } = this.props
    const { notifications } = layout

    return (
      <NotificationStack 
        notifications={notifications.slice()}
        onDismiss={this.dismiss} />
    )
  }
}

export default Notifications
