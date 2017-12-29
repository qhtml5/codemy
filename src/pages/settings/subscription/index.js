import React from 'react'
import { observer, inject } from 'mobx-react'
import { withRoute } from 'react-router5'
import c from 'classnames'

import { Setting } from 'components/page'
import Loading from 'components/loading'

import Menu from '../menu'

import title from '@fronto/helpers/title'

import button from 'styles/button.sass'

import History from './history'
import t from './index.locale'

import styles from './index.sass'

import states from './states'

import { Subscriptions, 
         Histories } from 'stores'

@inject('endpoints', 'layout', 'subscription') @observer
class Subscription extends React.Component {
  constructor(props) {
    super(props)

    const { endpoints } = props

    this.histories = new Histories(endpoints.studio)
  }

  componentDidMount() {
    title(t('title'))

    this.props.subscription.find()
    this.histories.findAll()
  }

  showModal = (e) => {
    e.preventDefault()

    const { status } = this.props.subscription
    const { modal } = this.props.layout

    modal.setContent(
      states[status].content(modal)
    )
    modal.open(e)
  }

  _renderHistories() {
    const { collection, isLoading } = this.histories

    if (isLoading) { 
      return <Loading />
    }

    return collection.map((history, index) =>
      <History key={history.id} {...history} index={index} />
    )
  }

  render() {
    const { selected, isLoading, status } = this.props.subscription

    const actionable =
      <div className='pure-g'>
        <div className='pure-u-md-5-6'></div>
        <div className='pure-u-md-1-6'>
          <a href='#' onClick={this.showModal}
            className='pure-button pure-u-1' 
            styleName={c('button.noRound', states[status].button)}>
            {states[status].action}
          </a>
        </div>
      </div>

    return (
      <Setting title={t('title')} isLoading={isLoading}
               actionable={actionable}>
        <div className='pure-g' styleName='styles.action'>
          <div className='pure-u-5-6' styleName='styles.metadata'>
            <div>
              <dl className='pure-g'>
                <dt className='pure-u-1-6'><span>{t('status')}</span></dt>
                <dd className='pure-u-5-6'>{selected.status}</dd>
                <dt className='pure-u-1-6'><span>{t('starts_at')}</span></dt>
                <dd className='pure-u-5-6'>{selected.starts_at}</dd>
                <dt className='pure-u-1-6'><span>{t('expires_at')}</span></dt>
                <dd className='pure-u-5-6'>{selected.expires_at}</dd>
              </dl>
            </div>
          </div>
        </div>
        <div styleName='styles.historyHeader'>
          <div>
            <span className='pure-u-1-3'>
              <span>{t('response')}</span>
            </span>
            <span className='pure-u-1-3'>
              <span>{t('card_detail')}</span>
            </span>
            <span className='pure-u-1-3'>
              <span>{t('charge_inserted_at')}</span>
            </span>
          </div>
        </div>
        <div styleName='styles.content'>
          {this._renderHistories()}
        </div>
      </Setting>
    )
  }
}

export default Subscription
