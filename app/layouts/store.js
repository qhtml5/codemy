import { observable, action } from 'mobx'
import _ from 'lodash'

const store = observable({
  modal: null,
  setModal: action(node =>
    store.modal = node
  ),
  notifications: [],
  appendNotification: action(notification => {
    const existing = store.notifications
    store.notifications = existing.concat(notification)
  }),
  removeNotification: action(notification => {
    const existing = store.notifications
    store.notifications = existing.filter(n => n.key !== notification.key )
  })
})

export default store
