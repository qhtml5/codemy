import React from 'react'
import ReactPlayer from 'react-player'
import { observer, inject } from 'mobx-react'

import Upgrade from 'components/upgrade'

import button from 'styles/button.sass'

import t from './video.locale'

import styles from './video.sass'

@observer
class Video extends React.Component {
  vimeo = (id) =>
    `https://vimeo.com/${id}`
  youtube = (id) =>
    `https://www.youtube.com/watch?v=${id}`


  showModal = (e) => {
    e.preventDefault()
    const { modal } = this.props

    modal.setContent(<Upgrade modal={modal} />)
    modal.open()
  }

  render() {
    const { isLoading, selected } = this.props.posts

    if (isLoading) { return null }
    
    const { medium } = selected

    if (!medium) { 
      return (
        <div styleName='styles.subscribe_button'>
          <a href='#' onClick={this.showModal} 
             className='pure-button' styleName='button.success'>
            {t('subscribe')}
          </a>
        </div>
      )
    }

    const url = this[medium.source_type](medium.source_id)
    return (
      <ReactPlayer url={url} controls={true} width='100%' height='50vh'/>
    )
  }
}

export default Video
