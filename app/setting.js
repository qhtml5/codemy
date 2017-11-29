import { observable, action } from 'mobx'

const layout = observable({
  modal: null,
  setModal: action(node =>
    layout.modal = node
  )
})

export { layout }
