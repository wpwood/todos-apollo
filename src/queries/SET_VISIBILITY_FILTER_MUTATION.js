import gql from 'graphql-tag'

export const SET_VISIBILITY_FILTER_MUTATION = gql`
  mutation SetVisibilityFilter($filter: String!) {
    setVisibilityFilter(filter: $filter) @client
  }
`
