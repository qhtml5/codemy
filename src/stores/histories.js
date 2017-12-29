import { Connect, mix }  from 'fronto-connect'
import scopes from 'stores/scopes'

class Histories extends Connect { 
  namespace = 'v1/member'
  resource  = 'histories'
}

mix(Histories, scopes.readable)

export default Histories
