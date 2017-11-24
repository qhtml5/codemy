import _            from 'lodash'
import { computed, action } from 'mobx'

import { Connect, mix }  from 'fronto-connect'
import scopes            from 'stores/scopes'

class Channels extends Connect { 
  namespace = 'v1'
  resource  = 'channels'

  @computed get byType() {
    return _.groupBy(this.collection, channel => channel.type)
  }
}

mix(Channels, scopes.readable)

export default Channels
