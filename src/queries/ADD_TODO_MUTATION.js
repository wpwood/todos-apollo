import gql from 'graphql-tag'

export const ADD_TODO_MUTATION = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) @client {
      id @client
      text @client
      completed @client
    }
  }
`
