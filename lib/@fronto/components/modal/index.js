import React from 'react'
import c from 'classnames'

import { observable } from 'mobx'
import { observer } from 'mobx-react'

import './index.sass'

@observer 
class Modal extends React.Component {
  @observable isOpen = false
  @observable content = null
  @observable width = null

  open = e => {
    if (e) { e.preventDefault() }
    this.isOpen = true
  }

  close = e => {
    if (e) { e.preventDefault() }
    this.isOpen = false
    this.setContent(null)
    this.setWidth(null)
  }

  setContent(content) { this.content = content }
  setWidth(width) { this.width = width }

  render() {
    return (
      <div className='animated fadeIn' 
           styleName={c({ open: this.isOpen, overlay: true })}>
        <div className='animated fadeInRight' styleName='dismiss'>
          <a href='#' onClick={this.close}>
            <i className='material-icons'>clear</i>
          </a>
        </div>
        <div className='animated zoomIn' styleName='modal' style={{ width: this.width }}>
          {this.content || this.props.children}
        </div>
      </div>
    )
  }
}


export default Modal
