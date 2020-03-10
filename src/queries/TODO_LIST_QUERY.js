import gql from 'graphql-tag'

export const TODO_LIST_QUERY = gql`
  query GetTodos {
    todos @client {
      id @client
      text @client
      completed @client
    }
  }
`
