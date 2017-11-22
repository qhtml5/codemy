import React from 'react'
import Prism from 'prismjs'

import Loading  from 'components/loading'
import './description.sass'

class Description extends React.Component {
  componentDidUpdate() {
    if (this.description) {
      const codeBlocks = [].slice.call(
        this.description.getElementsByTagName('code')
      )
      codeBlocks.forEach((element) => {
        Prism.highlightElement(element)
      })
    }
  }

  render() {
    const { description, isLoading } = this.props

    if (isLoading) { return (<Loading />) }

    return (
      <div className='animated fadeIn'>
        <div styleName='description'
             dangerouslySetInnerHTML={{ __html: description }} 
             ref={node => this.description = node}>
        </div>
      </div>
    )
  }
}

export default Description
