import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import ReduxApp from './ReduxApp'
import rootReducer from './reducers'

import gql from "graphql-tag";
import { ApolloClient } from "apollo-client"
import { ApolloProvider } from "@apollo/react-hooks"
import { InMemoryCache } from "apollo-cache-inmemory"
import ApolloApp from './ApolloApp'

const store = createStore(rootReducer)

const typeDefs = gql`
  type Todo {
    id: Int!
    text: String!
    completed: Boolean!
  }
  type Todos {
    todos: [Todo] @client
  }
  type Query {
    todos: Todos!
  }
  type Mutation {
    addTodo(text: String!): Todos!
  }
`

let nextTodoId = 0
const todoStore = {
  'todos': [],
  '__typename': 'Todos',
}

const resolvers = {
  Query: {
    todos: () => {
      return todoStore.todos
    }
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
    }
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
      <ApolloApp />
    </ApolloProvider>
    <hr />
    <Provider store={store}>
      <h1>Redux</h1>
      <ReduxApp />
    </Provider>
  </div>,
  document.getElementById('root')
)
