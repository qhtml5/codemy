import React                from 'react'
import { computed }         from 'mobx'
import { inject, observer } from 'mobx-react'

import Loading              from 'components/loading'

import { Subscribe }        from 'components/subscription'
import { Login }            from 'components/auth'
import Omise                from 'components/omise'

import { Subscriptions }    from 'stores'
  
import t from './index.locale'

import './index.sass'

@inject('user', 'endpoints') @observer
class Upgrade extends React.Component {
  constructor(props) {
    super(props)

    const { endpoints } = props

    this.subscription = new Subscriptions(endpoints.studio)
  }

  @computed get subscriptionActiveAndValid() {
    const { subscription, user } = this.props
    return user.signedIn
           && subscription.isValid 
           && subscription.isActive
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
    const { cards } = this.props
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
    const { user, cards, subscription } = this.props
    return (user.isLoading 
            || cards.isLoading
            || subscription.isLoading)
  }

  render() {
    const { modal, subscription, user, cards } = this.props
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

    if (cards.collection.length === 0) { 
      return <Omise modal={modal} buttonName={t('subscribe')} /> 
    }

    return <Subscribe modal={modal} cards={cards.collection} onClose={this.complete} />
  }
}

export default Upgrade
