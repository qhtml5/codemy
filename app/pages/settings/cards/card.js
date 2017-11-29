import React from 'react'
import c from 'classnames'

import button from 'styles/button.sass'

import styles from './card.sass'

import t from './card.locale'

import Delete from './delete'

const activateModal = (e, modal, content) => {
  modal.setContent(content)
  modal.open(e)
}

const deleteButton = (data, modal) => {
  if (data.default) { return null }

  return (
    <a href='#' className='pure-button pure-u-1' styleName='button.danger button.onlyBottomRound'
       onClick={(e) => activateModal(e, modal, <Delete card={data} modal={modal} />)}>
      {t('delete')}
    </a>
  )
}

const Card = props =>
  <div className='pure-u-1 pure-u-md-1 animated fadeInUp'
       styleName={c({ 'styles.default': props.data.default, 'styles.card': true })}
       style={{ animationDelay: `${props.index / 18}s` }}>
    <div className='pure-g'>
      <div className='pure-u-4-5 pure-u-md-4-5' styleName='styles.detail'>
        <div className='name'>{props.data.name}</div>
        <div className='digits'>{props.data.last_digits}</div>
        <div className='expiry'>
          <span className='month'>{props.data.expiration_month}</span>
          <span> / </span>
          <span className='year'>{props.data.expiration_year}</span>
        </div>
      </div>
      <div className='pure-u-1-5 pure-u-md-1-5'>
        <div styleName='styles.state'>{props.data.status}</div>
      </div>
    </div>
    <div className='pure-g' styleName='styles.actions'>
      <div className='pure-u-1-3'>
        {deleteButton(props.data, props.modal)}
      </div>
    </div>
  </div>


export default Card
