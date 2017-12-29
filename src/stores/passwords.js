import { Connect, mix }  from 'fronto-connect'
import scopes from 'stores/scopes'

class Passwords extends Connect { 
  resource  = 'passwords'
}

mix(Passwords, scopes.readable)
mix(Passwords, scopes.writable)

export default Passwords
