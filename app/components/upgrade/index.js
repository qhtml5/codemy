import React                from 'react'
import { computed }         from 'mobx'
import { inject, observer } from 'mobx-react'

import Loading              from 'components/loading'

import { Subscribe }        from 'components/subscription'
import { Login }            from 'components/auth'
import OmiseCard            from 'components/omise_card'

import { Subscriptions, Cards }    from 'stores'
  
import t from './index.locale'

import './index.sass'

@inject('user', 'endpoints') @observer
class Upgrade extends React.Component {
  constructor(props) {
    super(props)

    const { endpoints } = props

    this.subscription = new Subscriptions(endpoints.studio)
    this.cards = new Cards(endpoints.studio)
  }

  @computed get subscriptionActiveAndValid() {
    const { user } = this.props
    return user.signedIn
           && this.subscription.isValid 
           && this.subscription.isActive
  }

  complete = () => {
    const { modal } = this.props
    // replace this with router5 equivalent
    // browserHistory.push(window.location.pathname)
    modal.close()
  }

  loadSubscription() {
    const { subscription } = this
    if (subscription.selected === {} && !subscription.isLoading) {
      subscription.find()
    }
  }

  loadCards() {
    const { cards } = this
    if (!cards.fetched && !cards.isLoading) {
      cards.findAll()
    }
  }

  componentDidMount() {
    const { user } = this.props 

    if (user.signedIn) {   
      this.loadSubscription()
      this.loadCards()
    }
  }
  
  componentWillReact() {
    const { user } = this.props 

    if (this.subscriptionActiveAndValid) { 
      this.complete() 
    }
    
    if (user.signedIn) {   
      this.loadSubscription()
      this.loadCards()
    }
  }

  @computed get loading() {
    const { user } = this.props
    return (user.isLoading 
            || this.cards.isLoading
            || this.subscription.isLoading)
  }

  render() {
    const { modal, user } = this.props
    const { components } = this

    if (this.subscriptionActiveAndValid) { 
      return (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      ) 
    }

    if (!user.signedIn) { 
      return <Login modal={modal} animate='animated fadeIn' /> 
    }

    if (this.cards.collection.length === 0) { 
      return <OmiseCard modal={modal} buttonName={t('subscribe')} /> 
    }

    return <Subscribe modal={modal} cards={this.cards.collection} onClose={this.complete} />
  }
}

export default Upgrade
