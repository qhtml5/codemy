import React        from 'react'
import { observer, inject } from 'mobx-react'
import c   from 'classnames'

import { Filterable, Setting } from 'components/page'
import Field from 'components/field'

import title from '@fronto/helpers/title'

import Menu from '../menu'

import button from 'styles/button.sass'
import form from 'styles/form.sass'

import { Profiles } from 'stores'

import t from './index.locale'

@inject('endpoints') @observer
class Profile extends React.Component {
  constructor(props) {
    super(props) 

    const { endpoints } = props

    this.store = new Profiles(endpoints.studio)
  }

  componentDidMount() {
    this.store.find()
    title(t('title'))
  }

  componentDidUpdate() {
    const { name } = this.refs
    if (name) { name.input.focus() }
  }

  submitForm = (e) => {
    e.preventDefault()

    const { name, email } = this.refs

    this.store.update(null, { 
      user: {
        name: name.input.value,
        email: email.input.value,
      }
    }, {
      200: this.onSuccess
    })
  }

  onSuccess = (response) => {
    this.store.setMessage({ body: t('success'), type: 'success' })
    this.store.setSelected(response.data)
  }

  render() {
    const { selected, isLoading, message, clearMessage } = this.store
    const user = selected.user || {}

    const actionable =
      <div className='pure-g'>
        <div className='pure-u-md-7-8'></div>
        <div className='pure-u-md-1-8'>
          <a href='#' className='pure-button pure-u-1' 
             styleName='button.success button.noRound'
             onClick={this.submitForm}>
            {t('save')}
          </a>
        </div>
      </div>
    
    return (
      <Setting title={t('title')}
               alert={{ message, dismiss: clearMessage }}
               isLoading={isLoading} actionable={actionable}>
        <div styleName='form.body'>
          <form className='pure-form pure-g pure-form-stacked animated fadeIn'
                onSubmit={this.submitForm}>
            <fieldset className='pure-u-1'>
              <Field type='text' name='name' data={user.name} ref='name' label={t('name')} />
              <Field type='email' name='email' data={user.email} ref='email' disabled label={t('email')} />
            </fieldset>
          </form>
        </div>
      </Setting>
    )
  }
}


export default Profile
