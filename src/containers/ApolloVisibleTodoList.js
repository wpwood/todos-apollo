import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'

import TodoList from '../components/TodoList'
import { TODO_LIST_QUERY } from '../queries/TODO_LIST_QUERY'
import { TOGGLE_COMPLETED_MUTATION } from '../queries/TOGGLE_COMPLETED_MUTATION'

const ApolloVisibleTodoList = () => {
  const { loading, error, data } = useQuery(TODO_LIST_QUERY)
  const [toggleCompleted] = useMutation(
    TOGGLE_COMPLETED_MUTATION,
    {
      update(cache, { data: { toggleCompleted } }) {
        cache.writeQuery({
          query: TODO_LIST_QUERY,
          data: { todos: toggleCompleted }
        })
      }
    }
  )


  if (loading) return <h2>Loading...</h2>
  if (error) return <div>{error}</div>

  return (
    <TodoList todos={data.todos} toggleTodo={id => toggleCompleted({ variables: { id } })}/>
  )
}

export default ApolloVisibleTodoList
