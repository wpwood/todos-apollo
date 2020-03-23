import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'

import TodoList from '../components/TodoList'
import { VisibilityFilters } from '../actions'
import { TODO_LIST_QUERY } from '../queries/TODO_LIST_QUERY'
import { TOGGLE_COMPLETED_MUTATION, updateLocalCache } from '../queries/TOGGLE_COMPLETED_MUTATION'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(t => t.completed)
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const VisibleTodoList = () => {
  const { loading, error, data } = useQuery(TODO_LIST_QUERY)
  const [toggleCompleted] = useMutation(
    TOGGLE_COMPLETED_MUTATION,
    {
      update(cache, { data: { toggleCompleted } }) {
        updateLocalCache(cache, toggleCompleted)
      }
    }
  )

  if (loading) return <h2>Loading...</h2>
  if (error) return <div>{error}</div>

  const filteredTodos = getVisibleTodos(data.todos, data.visibilityFilter)

  return (
    <TodoList todos={filteredTodos} toggleTodo={id => toggleCompleted({ variables: { id } })}/>
  )
}

export default VisibleTodoList
