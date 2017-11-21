import _            from 'lodash'
import { computed, action } from 'mobx'

import { Connect, mix }  from 'fronto-connect'
import scopes            from 'stores/scopes'

class Channels extends Connect { 
  namespace = 'v1'
  resource  = 'channels'

  utilityChannels = [
    { id: 0, name: 'All Posts', updated_at: null, slug: 'all', type: 'filter' },
  ]

  constructor(args) {
    super(args)
    this.collection = this.utilityChannels
  }

  @computed get byType() {
    return _.groupBy(this.collection, channel => channel.type)
  }

  @action setCollection = array => {
    this.collection = [].concat.apply(
      this.utilityChannels, array
    )
  }
}

mix(Channels, scopes.readable)

export default Channels
