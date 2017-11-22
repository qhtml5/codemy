import React from 'react'
import c from 'classnames'

import './index.sass'

class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      content: null,
      width: null
    }
  }

  open = e => {
    if (e) { e.preventDefault() }
    this.setState({ isOpen: true })
  }

  close = e => {
    if (e) { e.preventDefault() }
    this.setState({
      isOpen: false,
      content: null,
      width: null
    })
  }

  setContent(content) { this.setState({ content }) }
  setWidth(width) { this.setState({ width }) }

  render() {    
    return (
      <div className='animated fadeIn' 
           styleName={c({ open: this.state.isOpen, overlay: true })}>
        <div className='animated fadeInRight' styleName='dismiss'>
          <a href='#' onClick={this.close}>&times;</a>
        </div>
        <div className='animated zoomIn' styleName='modal' style={{ width: this.state.width }}>
          {this.state.content || this.props.children}
        </div>
      </div>
    )
  }
}


export default Modal
