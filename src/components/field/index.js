import React from 'react'

import './index.sass'

class Field extends React.PureComponent {
  render() {
    const { name, data, type, label, disabled } = this.props

    return (
      <div className='pure-control-group pure-u-1' styleName='field'>
        <label htmlFor={name} className='pure-input-1'><span>{label}</span></label>
        <input id={`field_${name}`}
               type={type}
               className='pure-input-1'
               ref={(input) => { this.input = input }}
               defaultValue={data} disabled={disabled} />
      </div>
    )
  }
}

export default Field
