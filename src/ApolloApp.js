import React from 'react'
import ApolloVisibleTodoList from './containers/ApolloVisibleTodoList'
import ApolloAddTodo from './containers/ApolloAddTodo'
import ApolloFooter from './components/ApolloFooter'

const ApolloApp = () => (
  <div>
    <ApolloAddTodo />
    <ApolloVisibleTodoList />
    <ApolloFooter />
  </div>
)

export default ApolloApp
