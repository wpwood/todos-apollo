import gql from 'graphql-tag'

export const TOGGLE_COMPLETED_MUTATION = gql`
  mutation ToggleCompleted($id: Int!) {
    toggleCompleted(id: $id) @client {
      id @client
      text @client
      completed @client
    }
  }
`
