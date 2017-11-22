import React from 'react'
import { observer, inject } from 'mobx-react'
import classNames from 'classnames'

import Loading from 'components/loading'
import Omise from 'components/omise'

import modalStyles from 'styles/modal.sass'
import button from 'styles/button.sass'
import styles from './subscribe.sass'

import grow from './grow.svg'

import t from './subscribe.locale'

@inject('subscription') @observer
class Subscribe extends React.Component {
  upgrade = (e) => {
    if (e) { e.preventDefault() }
    
    const { subscription } = this.props
    subscription.save(
      { event: 'upgrade', card_id: this.cardSelect.value }, 
      this.props.callback
    )
  }

  _renderCardSelect() {
    const { cards } = this.props

    return cards.map(card => 
      <option key={card.id} value={card.id}>
        {card.name} - {card.last_digits} - {card.expiration_month} / {card.expiration_year}
      </option>
    )
  }

  _renderMessage() {
    const { subscription } = this.props

    if (!subscription.isValid) { return null }

    return (
      <div styleName='styles.message'>
        <p>{t('message')[subscription.status]}</p>
      </div>
    )
  }

  render() {
    const { cards, subscription, modal } = this.props
  
    return (
      <div styleName='modalStyles.content'>
        <h3>{t('lets_grow_together')}</h3>
        {this._renderMessage()}
        <img src={grow} width={200} height={200} />
        <form className='pure-form pure-form-stacked'>
          <fieldset>
            <div>
              <label htmlFor='cards'>{t('select_card')}</label>
              <select id='cards' ref={node => { this.cardSelect = node }} className='pure-input-1-2'>
                {this._renderCardSelect()}
              </select>
            </div>
          </fieldset>
          <div styleName='modalStyles.action'>
            <a href='#' onClick={this.props.onClose}
              className='pure-button cancel' styleName='button.default'>
              {t('no')}
            </a>
            <a href='#' onClick={this.upgrade}
              className='pure-button subscribe' styleName='button.success'>
              {t('yes')}
            </a>
          </div>
        </form>
      </div>
    )
  }
}

export default Subscribe
