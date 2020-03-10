import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import TodoList from '../components/TodoList'
import { TODO_LIST_QUERY } from '../queries/TODO_LIST_QUERY'

const ApolloVisibleTodoList = () => {
  const { loading, error, data } = useQuery(TODO_LIST_QUERY)

  if (loading) return <h2>Loading...</h2>
  if (error) return <div>{error}}</div>

  return (
    <TodoList todos={data.todos} toggleTodo={() => {}}/>
  )
}

export default ApolloVisibleTodoList
