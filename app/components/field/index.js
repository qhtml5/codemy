import React from 'react'
import c from 'classnames'

import './index.sass'

class Field extends React.PureComponent {
  render() {
    const { name, data, type, label } = this.props

    return (
      <div className='pure-control-group pure-u-1' styleName='field'>
        <label htmlFor={name} className='pure-input-1'><span>{label}</span></label>
        <input id={`field_${name}`}
               type={type}
               className='pure-input-1'
               ref={(input) => { this.input = input }}
               defaultValue={data} />
      </div>
    )
  }
}

export default Field
