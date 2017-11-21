import React from 'react'
import { observer, inject } from 'mobx-react'

import _ from 'lodash'

import './keyword.sass'

@observer
class Keyword extends React.Component {
  searchPosts = _.debounce(() => {
    const { channelId } = this.props
    const keyword = this.refs.keyword.value

    this.props.posts.findAll({ 
      search: (keyword.length > 0), 
      channel_id: channelId,
      keyword
    })
  }, 600)

  render() {
    return (
      <div className='pure-u-1' styleName='bar'>
        <div className='pure-u-3-24 pure-u-md-1-24 pure-u-sm-2-24' styleName='icon'>
          <i className='material-icons'>search</i>
        </div>
        <form className='pure-form pure-u-20-24 pure-u-md-11-24 pure-u-sm-3-4'>
          <fieldset>
            <input ref='keyword' type='text'
                   placeholder='Keyword Search'
                   onKeyUp={this.searchPosts} />
          </fieldset>
        </form>
      </div>
    )
  }
}

export default Keyword
