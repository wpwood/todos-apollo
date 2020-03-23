import gql from 'graphql-tag'

import { TODO_LIST_QUERY } from './TODO_LIST_QUERY'

export const ADD_TODO_MUTATION = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) @client {
      id @client
      text @client
      completed @client
    }
  }
`

export const updateLocalCache = (cache, addTodo) => {
  cache.writeQuery({
    query: TODO_LIST_QUERY,
    data: { todos: addTodo }
  })
}
