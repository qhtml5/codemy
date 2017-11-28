import React from 'react'
import classNames from 'classnames'

import Alert from 'components/alert'
import Loading from 'components/loading'

import './setting.sass'

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
    <div className='animated fadeIn' styleName='action'>
      {actionableContent}
    </div>
  )
}

const Page = props =>
  <div>
    <div className='pure-u-1' styleName='bar'>
      <div className='pure-g'>
        <div className='pure-u-7-8'>
          <h1>{props.title}</h1>
        </div>
        <div className='pure-u-1-8' styleName='spinner'>
          <Loading active={props.isLoading} />
        </div>
      </div>
      {actionBar(props.isLoading, props.actionable)}
    </div>
    {alert(props.isLoading, props.alert)}
    {content(props.isLoading, props.children)}
    {props.hidden}
  </div>

export default Page
