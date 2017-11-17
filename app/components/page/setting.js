import React from 'react'
import classNames from 'classnames'

import Alert from 'components/alert'
import Loading from 'components/loading'

import styles from './setting.sass'

const content = (isLoading, children) => {
  if (isLoading) { return null }
  return children
}

const alert = (isLoading, data) => {
  if (isLoading || !data) { return null }
  return (<Alert message={data.message} dismiss={data.dismiss} />)
}

const actionBar = (isLoading, actionable) => {
  if (!actionable) { return null }

  let actionableContent = actionable
  if (isLoading) { actionableContent = null }

  return (
    <div className={classNames(styles.action, 'animated', 'fadeIn')}>
      {actionableContent}
    </div>
  )
}

const Page = props =>
  <div>
    <div className={classNames(styles.settingBar, 'pure-u-1')}>
      <div className='pure-g'>
        <div className='pure-u-7-8'>
          <h1>{props.title}</h1>
        </div>
        <div className={classNames(styles.spinner, 'pure-u-1-8')}>
          <Loading active={props.isLoading} />
        </div>
      </div>
      {actionBar(props.isLoading, props.actionable)}
    </div>
    {alert(props.isLoading, props.alert)}
    <div className={props.className}>
      {content(props.isLoading, props.children)}
    </div>
    {props.hidden}
  </div>

export default Page
