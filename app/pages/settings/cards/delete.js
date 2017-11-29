import React from 'react'
import { observer, inject } from 'mobx-react'
import classNames from 'classnames'

import modalStyles from 'styles/modal.sass'
import button from 'styles/button.sass'

import removeIcon from './card-remove.svg'

import t from './delete.locale'

const destroy = (e, cards, id, callback) => {
  e.preventDefault()
  cards.destroy(id, callback)
}

const Delete = props =>
  <div styleName='modalStyles.content'>
    <h3>{t('are_you_sure')}</h3>
    <p styleName='modalStyles.info'>
      {t('ending_with')} {props.card.last_digits}
    </p>
    <img src={removeIcon} width={200} height={200} />
    <div styleName='modalStyles.action'>
      <a href='#' onClick={(e) => props.modal.close(e)}
         className='pure-button' styleName='button.default'>
        {t('cancel')}
      </a>
      <a href='#'
         onClick={(e) => destroy(e, props.cards, props.card.id, props.modal.close)}
         className='pure-button' styleName='button.danger'>
        {t('delete')}
      </a>
    </div>
  </div>

export default inject('cards')(observer(Delete))
