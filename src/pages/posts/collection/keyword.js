import React from 'react'
import { observer, inject } from 'mobx-react'

import './keyword.sass'

@observer
class Keyword extends React.Component {
  searchPosts = (e) => {
    e.preventDefault()

    const { router, route } = this.props
    const { params } = route
    const keyword = this.keyword.value

    if (params.channelId && keyword.length > 0)
      router.navigate('channels.show.search', {
        channelId: params.channelId, keyword
      })
    else if (params.channelId)
      router.navigate('channels.show', {
        channelId: params.channelId
      })
    else if (keyword.length > 0)
      router.navigate('posts.search', { keyword })
    else
      router.navigate('posts')
  }

  componentDidUpdate() {
    const { route } = this.props

    this.keyword.value = route.params.keyword || null
  }

  render() {
    const { keyword } = this.props.route.params

    return (
      <div className='pure-u-1' styleName='bar'>
        <div className='pure-u-3-24 pure-u-md-1-24 pure-u-sm-2-24' styleName='icon'>
          <i className='material-icons'>search</i>
        </div>
        <form className='pure-form pure-u-20-24 pure-u-md-11-24 pure-u-sm-3-4' onSubmit={this.searchPosts}>
          <fieldset>
            <input ref={node => this.keyword = node} type='text'
                   placeholder='Keyword Search'
                   defaultValue={keyword} />
          </fieldset>
        </form>
      </div>
    )
  }
}

export default Keyword
