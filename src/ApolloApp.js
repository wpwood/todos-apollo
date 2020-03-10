import React from 'react'
import ApolloVisibleTodoList from './containers/ApolloVisibleTodoList'
import ApolloAddTodo from './containers/ApolloAddTodo'

const ApolloApp = () => (
  <div>
    <ApolloAddTodo />
    <ApolloVisibleTodoList />
  </div>
)

export default ApolloApp
