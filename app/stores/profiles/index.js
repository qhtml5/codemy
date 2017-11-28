import { Connect, mix }  from 'fronto-connect'
import scopes from 'stores/scopes'

import t from './locale'

class Profiles extends Connect { 
  namespace = 'v1/member'
  resource  = 'profile'
}

mix(Profiles, scopes.readable)
mix(Profiles, scopes.writable)

export default Profiles
