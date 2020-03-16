import React from 'react'
import ApolloFilterLink from '../containers/ApolloFilterLink'
import { VisibilityFilters } from '../actions'

const ApolloFooter = () => (
  <div>
    <span>Show: </span>
    <ApolloFilterLink filter={VisibilityFilters.SHOW_ALL}>
      All
    </ApolloFilterLink>
    <ApolloFilterLink filter={VisibilityFilters.SHOW_ACTIVE}>
      Active
    </ApolloFilterLink>
    <ApolloFilterLink filter={VisibilityFilters.SHOW_COMPLETED}>
      Completed
    </ApolloFilterLink>
  </div>
)

export default ApolloFooter
