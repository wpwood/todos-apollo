import React from 'react'

import { useMutation } from '@apollo/react-hooks'
import { ADD_TODO_MUTATION } from '../queries/ADD_TODO_MUTATION'
import { TODO_LIST_QUERY } from '../queries/TODO_LIST_QUERY'

const AddTodo = () => {
  let input
  const [addTodo] = useMutation(
    ADD_TODO_MUTATION,
    {
      update(cache, { data: { addTodo } }) {
        cache.writeQuery({
          query: TODO_LIST_QUERY,
          data: { todos: addTodo }
        })
      }
    }
  )

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        addTodo({ variables: { text: input.value }})
        input.value = ''
      }}>
        <input ref={node => input = node} />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  )
}

export default AddTodo
