import React, { createContext, useState, useEffect } from 'react'
import uuid from 'uuid'  //this is just a function that geneates ID's

export const TaskListContext = createContext()

//pase and store all our tasks
const TaskListContextProvider = props => {
  const initialState = JSON.parse(localStorage.getItem('tasks')) || []

  const [tasks, setTasks] = useState(initialState)

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const [editItem, setEditItem] = useState(null)

  // Add a new task with generated ID 
  const addTask = title => {
    setTasks([...tasks, { title, id: uuid() }])
  }

  // filter through our tasks and find the specified one to remove it
  const removeTask = id => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  // removes all the tasks
  const clearList = () => {
    setTasks([])
  }

  // Find task in our array
  const findItem = id => {
    const item = tasks.find(task => task.id === id)

    setEditItem(item)
  }

  // Edit an existing task
  const editTask = (title, id) => {
    const newTasks = tasks.map(task => (task.id === id ? { title, id } : task))
    setTasks(newTasks)
    setEditItem(null)
  }

  return (
    <TaskListContext.Provider
      value={{
        tasks,
        addTask,
        removeTask,
        clearList,
        findItem,
        editTask,
        editItem
      }}
    >
      {props.children}
    </TaskListContext.Provider>
  )
}

export default TaskListContextProvider
