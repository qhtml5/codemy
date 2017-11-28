import React from 'react'
import c from 'classnames'
import { Link, withRoute } from 'react-router5'

import heading from 'styles/heading.sass'
import filter from 'styles/filter.sass'

import t from './menu.locale'

const Item = withRoute(props => {
  const { isActive } = props.router

  return (
    <li className='pure-menu-item' styleName='filter.item'>
      <Link routeName={props.routeName}
            className='pure-menu-link'
            styleName={c({ 'filter.active': isActive(props.routeName) })}>
        <h5>{props.name}</h5>
        {props.text}
      </Link>
    </li>
  )
})

const helper = text =>
  <p><i>{text}</i></p>

const Menu = () =>
  <div className='pure-menu'>
    <span className='pure-menu-heading' styleName='heading.heading'>
      {t('settings')}
    </span>
    <ul className='pure-menu-list'>
      <Item routeName='settings.profile' name={t('profile')} text={helper(t('profile_helper'))} />
      <Item routeName='settings.subscription' name={t('subscription')}
            text={helper(t('subscription_helper'))} />
      <Item routeName='settings.cards' name={t('cards')} text={helper(t('cards_helper'))} />
      <Item routeName='settings.password' name={t('password')}
            text={helper(t('password_helper'))} />
    </ul>
  </div>

export default Menu
