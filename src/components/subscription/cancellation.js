import React from 'react'
import { observer, inject } from 'mobx-react'

import modalStyles from 'styles/modal.sass'
import button from 'styles/button.sass'

import heartBreak from './heart-break.svg'

import t from './cancellation.locale'

@inject('subscription') @observer
class Cancellation extends React.PureComponent {
  cancel = (e) => {
    e.preventDefault()

    const { subscription, modal } = this.props
    subscription.save({
      event: 'downgrade'
    }, modal.close)
  }

  render() {
    return (
      <div styleName='modalStyles.content'>
        <h3>{t('are_you_sure_cancel')}</h3>
        <img src={heartBreak} width={200} height={200} />
        <div styleName='modalStyles.action'>
          <a href='#' onClick={(e) => props.modal.close(e)}
            className='pure-button' styleName='button.default'>
            {t('no_not_sure')}
          </a>
          <a href='#' onClick={this.cancel}
            className='pure-button' styleName='button.danger'>
            {t('yes_sure')}
          </a>
        </div>
      </div>
    )
  }
}

export default Cancellation
