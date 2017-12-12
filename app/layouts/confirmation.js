import t from './confirmation.locale'

export default (props = {user: null, layout: null}) => {
  const confirmation = {
    notified: false,
    notification: {
      message: t('confirm_account'),
      key: 'confirm',
      action: t('confirm_action'),
      dismissAfter: false,
      title: t('confirm_title'),
      onClick: (notification, dismiss) => { 
        confirmation.resend()
      }
    },
    resend() {
      console.log(props.user.current.email)
      console.log('resent!')
    },
    notify() {
      props.layout.appendNotification(this.notification)
      confirmation.notified = true
    }
  }

  return confirmation
}
