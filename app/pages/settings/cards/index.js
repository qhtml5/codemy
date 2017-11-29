import React from 'react'
import { observer, inject } from 'mobx-react'
import classNames from 'classnames'

import { Setting } from 'components/page'
import OmiseCard from 'components/omise_card'

import title from '@fronto/helpers/title'

import button from 'styles/button.sass'

import Card from './card'

import t from './index.locale'
import styles from './index.sass'

import { Cards } from 'stores'

@inject('endpoints', 'setting') @observer
class Collection extends React.Component {
  constructor(props) {
    super(props)

    const { endpoints } = props 

    this.cards = new Cards(endpoints.studio)
  }

  componentWillMount() {
    title(t('your_cards'))
  }

  componentDidMount() {
    this.cards.findAll()
  }

  newCard = (e) => {
    const { modal } = this.props.setting.layout

    modal.setContent(<OmiseCard modal={modal} />)
    modal.open(e)
  }

  render() {
    const { collection, isLoading, message, clearMessage } = this.cards
    const { modal } = this.props.setting.layout

    const actionable =
      <div className='pure-g'>
        <div className='pure-u-7-8'></div>
        <div className='pure-u-1-8'>
          <a href='#' onClick={this.newCard}
            className='pure-button pure-u-1' styleName='button.success button.noRound'>
            {t('add_new_card')}
          </a>
        </div>
      </div>

    return (
      <Setting title={t('your_cards')} alert={{ message, dismiss: clearMessage }}
            isLoading={isLoading} actionable={actionable}>
        <div styleName='styles.content'>
          {collection.map((card, index) =>
            <Card key={card.id} data={card} modal={modal} index={index} />
          )}
        </div>
      </Setting>
    )
  }
}

export default Collection
