import gql from 'graphql-tag'

export const VISIBILITY_FILTER_QUERY = gql`
  query GetVisibilityFilter {
    visibilityFilter @client
  }
`
