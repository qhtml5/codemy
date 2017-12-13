import t from './confirmation.locale'
import { Connect, mix } from 'fronto-connect'
import scopes from 'stores/scopes'

class Store extends Connect {
  namespace = 'v1/member'
  resource = 'confirmations'
}

mix(Store, scopes.readable)
mix(Store, scopes.writable)

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
          200: (response) => { layout.appendNotification({
            message: t('email_resent'),
            key: 'resend'
          })}
        })
      }
    },
    store: new Store(endpoints.studio),
    notify() {
      layout.appendNotification(this.notification)
      confirmation.notified = true
    }
  }

  return confirmation
}
