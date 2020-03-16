import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'

import TodoList from '../components/TodoList'
import { VisibilityFilters } from '../actions'
import { TODO_LIST_QUERY } from '../queries/TODO_LIST_QUERY'
import { VISIBILITY_FILTER_QUERY } from '../queries/VISIBILITY_FILTER_QUERY'
import { TOGGLE_COMPLETED_MUTATION } from '../queries/TOGGLE_COMPLETED_MUTATION'

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
  const { loading: todoLoading, error: todoError, data: todoData } = useQuery(TODO_LIST_QUERY)
  const { loading: filterLoading, error: filterError, data: filterData } = useQuery(VISIBILITY_FILTER_QUERY)
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

  if (todoLoading || filterLoading) return <h2>Loading...</h2>
  if (todoError) return <div>{todoError}</div>
  if (filterError) return <div>{filterError}</div>

    const filteredTodos = getVisibleTodos(todoData.todos, filterData.visibilityFilter)

  return (
    <TodoList todos={filteredTodos} toggleTodo={id => toggleCompleted({ variables: { id } })}/>
  )
}

export default VisibleTodoList
