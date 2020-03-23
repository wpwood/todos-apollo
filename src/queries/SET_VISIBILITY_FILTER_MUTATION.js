import gql from 'graphql-tag'

import { VISIBILITY_FILTER_QUERY } from './VISIBILITY_FILTER_QUERY'

export const SET_VISIBILITY_FILTER_MUTATION = gql`
  mutation SetVisibilityFilter($filter: String!) {
    setVisibilityFilter(filter: $filter) @client
  }
`

export const updateLocalCache = (cache, setVisibilityFilter) => {
  cache.writeQuery({
    query: VISIBILITY_FILTER_QUERY,
    data: { visibilityFilter: setVisibilityFilter }
  })
}
