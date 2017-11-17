import React from 'react';
import './index.sass';

export default (graphics, width = 24, height = 24) => { 
  return props => {
    const content =
      <div className='pure-u-1'>
        <div styleName='spinner'>
          <img src={graphics} width={width} height={height} />
        </div>
      </div>;

    if ((Object.keys(props).length === 0) || props.active) { return content }
    return null;
  }
}
