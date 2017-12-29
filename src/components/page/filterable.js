import React from 'react'
import c from 'classnames'
import './filterable.sass'

class Filterable extends React.PureComponent {
  render() { 
    return <div id='filterable'>
      <div styleName={c({ filter: true, playlist: this.props.playback })}>
        {this.props.filter}
      </div>
      <div styleName={c({ results: true, video: this.props.playback })}>
        {this.props.children}
      </div>
    </div>
  }
}

export default Filterable
