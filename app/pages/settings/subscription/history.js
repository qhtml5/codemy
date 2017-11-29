import React from 'react'

import './history.sass'

const History = props =>
  <div className='pure-g animated fadeInUp' styleName='history'
       style={{ animationDelay: `${props.index / 25}s` }}>
    <div className='pure-u-1-3'>
      <span>{props.status}</span>
    </div>
    <div className='pure-u-1-3'>
      <span>{props.card.last_digits} - {props.card.expiration_month} / {props.card.expiration_year}</span>
    </div>
    <div className='pure-u-1-3'>
      <span>{props.inserted_at}</span>
    </div>
  </div>

export default History
