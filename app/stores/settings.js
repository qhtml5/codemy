import { Connect, mix } from 'fronto-connect'
import scopes from './scopes'

class Settings extends Connect {
  namespace = 'v1'
  resource  = 'settings'
}

mix(Settings, scopes.readable)

export default Settings
