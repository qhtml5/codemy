import { Connect, mix } from 'fronto-connect'
import scopes from 'stores/scopes'

import t from './locale'

class Cards extends Connect { 
  namespace = 'v1/member'
  resource  = 'cards'
}

mix(Cards, scopes.readable)
mix(Cards, scopes.writable)

export default Cards
