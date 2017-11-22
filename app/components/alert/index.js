import React from 'react'
import c from 'classnames'
import './index.sass'

export default class extends React.Component {
  dismissMessage = (e) => {
    e.preventDefault()
    this.props.dismiss()
  }

  render() {
    const { message } = this.props

    if (!message) { return null }

    return (
      <div className='animated slideInDown' styleName={c('alert', message.type)}>
        <a onClick={this.dismissMessage} href='#alert'>{message.body}</a>
      </div>
    )
  }
}
