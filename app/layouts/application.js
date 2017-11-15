import React from 'react'
import { observer, inject } from 'mobx-react'

import Pages from '../pages'
import * as Menu from './menu'

import './application.sass'

@inject('user') @observer
class Application extends React.Component {
  render() {    
    return (
      <div id='Application'>
        <div styleName='sidebar'>
          Sidebar
        </div>
        <div className='content'>
          <Pages />
        </div>
      </div>
    );
  }
}

export default Application
