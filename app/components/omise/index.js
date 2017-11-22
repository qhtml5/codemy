/* global Omise */

import React from 'react'
import c from 'classnames'
import validator from 'card-validator'
import { observable, computed } from 'mobx'
import { observer, inject } from 'mobx-react'

import Loading from 'components/loading'

import modalStyles from 'styles/modal.sass'
import button from 'styles/button.sass'

import visa from './visa.svg'
import master from './master.svg'
import jcb from './jcb.svg'

import styles from './index.sass'

import t from './index.locale.js'

@inject('cards') @observer
class Omise extends React.Component {
  @observable cardNumber = {
    isValid: false,
  }
  @observable cardType = null
  @observable expirationDate = {
    isValid: false,
  }
  @observable cardCode = {
    isValid: false,
  }

  @observable isLoading = false

  @computed get cardValid() {
    return this.cardNumber.isValid &&
            this.expirationDate.isValid &&
            this.cardCode.isValid
  }
  
  componentDidMount() {
    Omise.setPublicKey(process.env.OMISE_PUBLIC_KEY)
  }

  validateCard = () => {
    const { number, security_code,
            expiration_month, expiration_year,
            name } = this.refs

    this.cardNumber = validator.number(number.value)
    this.expirationDate = validator.expirationDate({
      month: expiration_month.value,
      year: expiration_year.value,
    })
    this.cardCode = validator.cvv(security_code.value)
    this.cardType = null

    if (this.cardNumber.card && this.cardNumber.card.type) {
      this.cardType = this.cardNumber.card.type
    }
  }

  addCard = (response) => {
    const { cards } = this.props
    cards.create(response, this.props.callback)
  }

  createToken = (e) => {
    e.preventDefault()

    this.isLoading = true

    const { number, security_code,
            expiration_month, expiration_year,
            name } = this.refs

    const card = {
      name: name.value,
      number: number.value,
      expiration_month: expiration_month.value,
      expiration_year: expiration_year.value,
      security_code: security_code.value,
    }

    Omise.createToken('card', card, this.tokenCallback)
  }

  tokenCallback = (statusCode, response) => {
    this.isLoading = false
    const { onError } = this.props

    if (statusCode === 200) {
      this.addCard(response)
    } else { 
      // TODO: handle error
      onError(response)
    }
  }


  render() {
    return (
      <div styleName='modalStyles.content'>
        <h3>{t('add_new_card')}</h3>
        <div styleName='styles.spinner'>
          <Loading active={this.isLoading} />
        </div>
        <div styleName='styles.type'>
          <img src={visa} width={50}
               styleName={c({ [styles.active]: this.cardType === 'visa' })} />
          <img src={master} width={50}
               styleName={c({ [styles.active]: this.cardType === 'master-card' })} />
          <img src={jcb} width={50}
               styleName={c({ [styles.active]: this.cardType === 'jcb' })} />
        </div>
        <form className='pure-form pure-form-stacked' styleName='styles.form'
              onKeyUp={this.validateCard} onSubmit={this.createToken}>
          <div className='pure-g'>
            <div className='pure-u-md-15-24'>
              <label htmlFor='number'>{t('card_number')}</label>
              <input ref='number' name='number' type='text'
                     pattern="[0-9]{13,16}"
                     className='pure-input-1' 
                     styleName={c(styles.number, { [styles.valid]: this.cardNumber.isValid })} />
            </div>
            <div className='pure-u-md-7-24'>
              <label htmlFor='expiration_month'>{t('expiry_date')}</label>
              <div className='pure-u-md-1-3'>
                <input ref='expiration_month' type='text'
                       pattern="[0-9]{1,2}" name='expiration_month'
                       className='pure-input-1'
                       styleName={c({ [styles.valid]: this.expirationDate.isValid })} />
              </div>
              <div className='pure-u-md-1-2'>
                <input ref='expiration_year' type='text'
                       pattern="[0-9]{2,4}" name='expiration_year'
                       className='pure-input-1'
                       styleName={c({ [styles.valid]: this.expirationDate.isValid })} />
              </div>
            </div>
          </div>
          <div className='pure-g'>
            <div className='pure-u-md-15-24'>
              <label htmlFor='name'>{t('name_on_card')}</label>
              <input ref='name' name='name' className='pure-input-1' />
            </div>
            <div className='pure-u-md-7-24'>
              <label htmlFor='security_code'>{t('cvc')}</label>
              <input ref='security_code' name='security_code'
                     className='pure-input-1-2'
                     styleName={c({ [styles.valid]: this.cardCode.isValid })} />
            </div>
          </div>
          <div className={c(styles.action, cardStyles.action)}>
            <a href='#' onClick={(e) => this.props.modal.close(e)}
               className={c('pure-button', button.default)}>
              {t('cancel')}
            </a>
            <button type='submit' className={c('pure-button', button.success)}
                                  disabled={!this.cardValid}>
              {this.props.buttonName || t('save')}
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default Omise
