import gql from 'graphql-tag'

import { TODO_LIST_QUERY } from './TODO_LIST_QUERY'

export const TOGGLE_COMPLETED_MUTATION = gql`
  mutation ToggleCompleted($id: Int!) {
    toggleCompleted(id: $id) @client {
      id @client
      text @client
      completed @client
    }
  }
`

export const updateLocalCache = (cache, toggleCompleted) => {
  cache.writeQuery({
    query: TODO_LIST_QUERY,
    data: { todos: toggleCompleted }
  })
}
