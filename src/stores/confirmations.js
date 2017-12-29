import { Connect, mix }  from 'fronto-connect'
import scopes from './scopes'

class Confirmations extends Connect {
  resource  = 'confirmations'
}

mix(Confirmations, scopes.writable)

export default Confirmations
