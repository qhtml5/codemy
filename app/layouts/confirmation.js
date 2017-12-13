import t from './confirmation.locale'
import { Confirmations } from 'stores'

export default (props) => {
  const { layout, endpoints, user } = props

  const { email } = user.selected

  const confirmation = {
    notified: false,
    notification: {
      message: t('confirm_account'),
      key: 'confirm',
      dismissAfter: false,
      title: t('confirm_title'),
      action: t('confirm_action'),
      onClick: (notification, deactivate) => {
        deactivate()
        confirmation.store.create(null, {}, {
          200: (response) => { layout.addNotification({
            message: t('email_resent'),
            key: 'resend'
          })}
        })
      }
    },
    store: new Confirmations(endpoints.studio, 'v1/member'),
    notify() {
      layout.addNotification(this.notification)
      confirmation.notified = true
    }
  }

  return confirmation
}
