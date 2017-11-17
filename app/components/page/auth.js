import React from 'react'
import c from 'classnames'
import { Link } from 'react-router5'

import Alert from 'components/alert'

import Loading from 'components/loading'
import logo from 'assets/logo-white.svg'

import './auth.sass'

import t from './auth.locale'

class Auth extends React.PureComponent {
  _renderBack() { 
    const { fill } = this.props

    if (fill) { 
      return (
        <div styleName='back'>
          <Link routeName='posts'>{t('back_to_app')}</Link>
        </div>
      )
    }
    return null
  }

  _renderContent() { 
    const { isLoading, children } = this.props

    if (isLoading) { 
      return (
        <div styleName='spinner'>
          <Loading />
        </div>
      ) 
    }

    return children
  }

  render() {
    const { fill, alert, children, extras, animate, isLoading } = this.props

    return (
      <div styleName={c({ wrapper: true, fill: fill })}>
        <Alert message={alert.message} dismiss={alert.clearMessage} />
        <div styleName={c({ body: true })} className={animate}>
          <img src={logo} width={64} styleName='logo' />
          {this._renderContent()}
          {this._renderBack()}
          <div styleName='extra'>
            {extras}
          </div>
        </div>
      </div>
    )
  }
} 

export default Auth
