import { observable, action } from 'mobx'
import _ from 'lodash'

const store = observable({
  modal: null,
  setModal: action(node =>
    store.modal = node
  ),
  notifications: [],
  addNotification: action(notification => {
    const existing = store.notifications
    store.notifications = _.uniq(existing.concat(notification))
  }),
  removeNotification: action(notification => {
    const existing = store.notifications
    store.notifications = _.uniq(existing.filter(n => n.key !== notification.key ))
  })
})

export default store
