import axios from 'axios'
import React, { useState } from 'react'
import { Route } from 'react-router-dom'
import Todos from './Todos'

const Todo = ({ title, onEdit, onView, status, todoId, deleteTodo,updateTodo,viewTodo,isChecked }) => {
  const [checkValue, setCheckValue] = useState(false);

  const sendToTodos = (id)=>{
    console.log()
    setCheckValue(isChecked(todoId))
  }
  return (
<div className="flex items-center justify-between bg-blue-700 shadow-md rounded-md p-4 mb-4 w-1/2 m-auto my-5">
  {/* Todo Details */}
  <div className="flex items-center space-x-4">
    {/* Checkbox */}
    <input
      type="checkbox"
      checked={status === 'completed' || checkValue}
      disabled={status === 'completed' || checkValue}
      onChange={() => sendToTodos(todoId)}
      className="w-5 h-5 rounded border-gray-300 focus:ring-2 focus:ring-blue-300"
    />
    <div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      {/* <p className="text-sm text-gray-600">{description}</p> */}
    </div>
  </div>

  {/* Action Buttons */}
  <div className="flex space-x-2">
    <button
      onClick={() => viewTodo(todoId)}
      className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
    >
      View
    </button>
    <button
      disabled={status === 'completed' || checkValue}
      onClick={() => updateTodo(todoId)}
      className={`px-3 py-1 text-white text-sm rounded-md focus:ring-2 focus:ring-yellow-300 ${
        status === 'completed' || checkValue
          ? 'bg-yellow-300 cursor-not-allowed'
          : 'bg-yellow-500 hover:bg-yellow-600'
      }`}
    >
      Edit
    </button>
    <button
      onClick={() => deleteTodo(todoId)}
      className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 focus:ring-2 focus:ring-red-300"
    >
      Delete
    </button>
  </div>
</div>

  )
}

export default Todo