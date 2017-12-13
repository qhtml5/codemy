import t from './confirmation.locale'

export default (props = {user: null, layout: null}) => {
  const confirmation = {
    notified: false,
    notification: {
      message: t('confirm_account'),
      key: 'confirm',
      dismissAfter: false,
      title: t('confirm_title')
    },
    notify() {
      props.layout.appendNotification(this.notification)
      confirmation.notified = true
    }
  }

  return confirmation
}
