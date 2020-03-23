import React from 'react'

import { useMutation } from '@apollo/react-hooks'
import { ADD_TODO_MUTATION, updateLocalCache } from '../queries/ADD_TODO_MUTATION'

const AddTodo = () => {
  let input
  const [addTodo] = useMutation(
    ADD_TODO_MUTATION,
    {
      update(cache, { data: { addTodo } }) {
        updateLocalCache(cache, addTodo)
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
