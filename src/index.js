import React from 'react'
import { render } from 'react-dom'

import gql from "graphql-tag";
import { ApolloClient } from "apollo-client"
import { ApolloProvider } from "@apollo/react-hooks"
import { InMemoryCache } from "apollo-cache-inmemory"
import App from './App'

const typeDefs = gql`
  type Todo {
    id: Int!
    text: String!
    completed: Boolean!
  }
  type Todos {
    todos: [Todo] @client
    visibilityFilter: String @client
  }
  type Query {
    todos: Todos!
    visibilityFilter: String!
  }
  type Mutation {
    addTodo(text: String!): Todos!
    toggleCompleted(id: Int!): Todos!
    setVisibilityFilter(filter: String!): String!
  }
`

let nextTodoId = 0
const todoStore = {
  'todos': [],
  'visibilityFilter': 'SHOW_ALL',
}

const resolvers = {
  Query: {
    todos: () => todoStore.todos,
    visibilityFilter: () => todoStore.visibilityFilter,
  },
  Mutation: {
    addTodo: (_, { text }) => {
      const newTodo = {
        id: nextTodoId++,
        text,
        completed: false,
        '__typename': 'Todo',
      }

      todoStore.todos.push(newTodo)

      return todoStore.todos
    },
    toggleCompleted: (_, { id }) => {
      todoStore.todos = todoStore.todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed }
        }

        return todo
      })

      return todoStore.todos
    },
    setVisibilityFilter: (_, { filter }) => {
      todoStore.visibilityFilter = filter

      return todoStore.visibilityFilter
    },
  },
}

const client = new ApolloClient({
  cache: new InMemoryCache({
    freezeResults: true
  }),
  typeDefs,
  resolvers,
  assumeImmutableResults: true
});

render(
  <div>
    <ApolloProvider client={client}>
      <h1>Apollo Local State</h1>
      <App />
    </ApolloProvider>
  </div>,
  document.getElementById('root')
)
