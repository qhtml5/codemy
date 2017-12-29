import { Connect, mix } from 'fronto-connect'
import scopes from 'stores/scopes'

import { extendObservable, computed } from 'mobx'

import t from './locale'

class Subscriptions extends Connect { 
  namespace = 'v1/member'
  resource = 'subscription'

  constructor(api, namespace = null) {
    super(api, namespace)

    extendObservable(this, {
      status: 'inactive'
    })
  }

  @computed get isValid() {
    return this.selected.still_valid
  }

  @computed get isActive() {
    return this.status === 'active'
  }
}

mix(Subscriptions, scopes.readable)
mix(Subscriptions, scopes.writable)

export default Subscriptions
