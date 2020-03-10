import React from 'react'
import Footer from './components/Footer'
import ReduxAddTodo from './containers/ReduxAddTodo'
import ReduxVisibleTodoList from './containers/ReduxVisibleTodoList'

const ReduxApp = () => (
  <div>
    <ReduxAddTodo />
    <ReduxVisibleTodoList />
    <Footer />
  </div>
)

export default ReduxApp
