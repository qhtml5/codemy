import { Connect, mix } from 'fronto-connect'
import { extendObservable, action, computed } from 'mobx'
import scopes from '../scopes'

import t from './locale'

class Users extends Connect { 
  namespace = 'auth'
  resource  = 'identity/callback'

  constructor(api, namespace = null) {
    super(api, namespace)

    extendObservable(this, {
      signedIn: false
    })
  }

  @action setSignedIn(status) {
    this.signedIn = status
  }

  @computed get current() {
    return this.selected
  }

  @computed get confirmed() {
    return (this.selected.email && 
            this.selected.confirmed_at) || false
  }

  signIn(email = null, password = null) { 
    const token = localStorage.getItem('token')

    if (token) 
      this.signInFromStorage(token)
    else if (email && password)
      this.createSession(email, password)
  }

  createSession(email, password, callback) { 
    this.setIsLoading(true)
    this.clearMessage()

    this.call({ type: 'post', body: { email, password } }, {
      201: (body) => {
        const { user, token } = body.data
        localStorage.setItem('token', token)
        this.setCurrentUser(body, token)
        if (callback) callback()
      },
      401: (body) => {
        const { error } = body.data
        this.setMessage({
          body: t(error),
          type: 'error'
        })
      },
    })
  }

  signInFromStorage(token) { 
    this.setIsLoading(true)
    this.clearMessage()

    this.call({ type: 'get' }, { 
      200: (body) => this.setCurrentUser(body, token)
    }, {
      401: (body) => this.signOut()
    })
  }

  @action setCurrentUser(body, token) { 
    this.signedIn = true
    const { user } = body.data
    this.selected = {  
      email: user.email,
      confirmed_at: user.confirmed_at,
      token
    }
  }

  signOut(callback) { 
    this.setIsLoading(true)
    this.clearMessage()

    this.call({ type: 'delete' }, { 
      200: (body) => { 
        this.clearSelected()
        this.setSignedIn(false)
        localStorage.removeItem('token')
        if (callback) callback()
      }
    })
  }
}

mix(Users, scopes.writable)

export default Users
