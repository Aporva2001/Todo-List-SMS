import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Todo from './Todo'
import { useNavigate } from 'react-router-dom';


const Todos = () => {
  const token= localStorage.getItem('token');
  const [post, setPost] = useState([]);
  const navigate= useNavigate();
  // const [status,setStatus] = useState('pending');
  const handleChecked = (id)=>{
    axios.put(`${process.env.REACT_APP_BACKEND_URI}/update-status/${id}`)
    .then(result =>{
      console.log("Task completed",id);
      // setStatus('completed');
    })
    return true
  }

  const deleteTodo = (id)=>{

    setPost((prevTodos) => {
      console.log(prevTodos)
      const updatedTodos = prevTodos.filter((todo) => todo._id !== id);

  console.log("Updated Todos:", updatedTodos); 
  return updatedTodos;
    })
    
    axios.delete(`${process.env.REACT_APP_BACKEND_URI}/delete/` + id,{
      headers:{
        Authorization: 'Bearer '+token
      }
    })
    .then(result =>{
      console.log("Todo deleted Successfully", id);

      // <Route path= "*" element={Todos} />
    })

  }

  const updateTodo = (id)=>{
console.log(id, "This is clicked")
navigate(`/edit-todo/${id}`)
  }
  const viewTodo = (id) =>{
    console.log("View clicked");
    console.log(process.env);
    navigate(`/${id}`);
  }
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_BACKEND_URI}`,{
      headers: {
        Authorization: 'Bearer '+token
      }
    })
    .then(todos =>{
      setPost(todos.data.todos);
    })
    .catch(err =>{
      console.log(err)
    })
  },[])
  
  // console.log(post);  
  return(
    <div>
      <h1 className='font-bold text-center text-blue-700 py-2 text-3xl my-3' >Todos</h1>
      <ul>
        {(post.length === 0) ? (<h2 className='font-bold text-center text-blue-700 py-2 text-xl my-3'>No Todos Added!</h2>): (
          post.map((todo) => (
          <li key={todo._id}>
            <Todo title={todo.title} status= {todo.status} key={todo._id} todoId= {todo._id} deleteTodo = {deleteTodo} updateTodo ={updateTodo} viewTodo= {viewTodo} isChecked={handleChecked}/>
            {/* <span>{todo.completed ? ' ✅' : ' ❌'}</span> */}
          </li>
        ))
         )}
      </ul>
    </div>
  )
  
}

export default Todos
