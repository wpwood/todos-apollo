import React from 'react'
import ReduxFooter from './components/ReduxFooter'
import ReduxAddTodo from './containers/ReduxAddTodo'
import ReduxVisibleTodoList from './containers/ReduxVisibleTodoList'

const ReduxApp = () => (
  <div>
    <ReduxAddTodo />
    <ReduxVisibleTodoList />
    <ReduxFooter />
  </div>
)

export default ReduxApp
