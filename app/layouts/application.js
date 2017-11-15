import React, { createElement } from 'react'

import Page from './page'

import './application.sass'

class Application extends React.Component {
  render() {
    return (
      <div id='Application'>
        <div styleName='sidebar'>
          Sidebar
        </div>
        <div className='content'>
          <Page />
        </div>
      </div>
    );
  }
}

export default Application
