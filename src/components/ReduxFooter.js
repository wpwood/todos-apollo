import React from 'react'
import ReduxFilterLink from '../containers/ReduxFilterLink'
import { VisibilityFilters } from '../actions'

const Footer = () => (
  <div>
    <span>Show: </span>
    <ReduxFilterLink filter={VisibilityFilters.SHOW_ALL}>
      All
    </ReduxFilterLink>
    <ReduxFilterLink filter={VisibilityFilters.SHOW_ACTIVE}>
      Active
    </ReduxFilterLink>
    <ReduxFilterLink filter={VisibilityFilters.SHOW_COMPLETED}>
      Completed
    </ReduxFilterLink>
  </div>
)

export default Footer
