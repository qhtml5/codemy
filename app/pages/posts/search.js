import React        from 'react'
import { Filterable } from 'components/page'

import Filter       from './filter'
import Keyword      from './keyword'
import Collection   from './collection'

import './search.sass'

const Search = props =>
  <Filterable filter={<Filter />}>
    <Keyword channelId={props.params.channelId} />
    <Collection channelId={props.params.channelId} />
  </Filterable>

export default Search
