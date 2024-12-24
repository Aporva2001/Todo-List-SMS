import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function getCurrentDate() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

const CreateTodo = () => {
  const token = localStorage.getItem('token')
  const navigate= useNavigate()
  const [data, setData] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: ""
  });
//   const [title, setTitle] = useState("");

const handleData = (event) =>{
 const {name, value}= event.target;

 setData({...data, [name] : value})
 }

const handleSubmit = (event)=>{
  event.preventDefault();
  console.log("Clicked !!")
  // console.log(data);
  const newTodo= data;
  fetch(`${process.env.REACT_APP_BACKEND_URI}/add-todo`,{
    method: "POST",
    headers: {
      'Authorization': 'Bearer '+token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newTodo)
  }).then(result =>{
    // setData()
    console.log('Added the todo!')
    navigate("/")
    
  }).catch(err =>{
    console.log(err);
  })
}

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
<h2 className="text-2xl font-bold mb-6 text-gray-800">Create Task</h2>
<form className="space-y-4">
{/* Title Field */}
<div>
<label htmlFor="title" className="block text-sm font-medium text-gray-700">
  Title
</label>
<input
  type="text"
  id="title"
  name="title"
  value={data.title}
  onChange={handleData}
  placeholder="Enter the task title"
  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
  required
/>
</div>

{/* Description Field */}
<div>
<label htmlFor="description" className="block text-sm font-medium text-gray-700">
  Description
</label>
<textarea
  id="description"
  name="description"
  rows="4"
  value={data.description}
  onChange={handleData}
  placeholder="Enter the task description"
  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  required
></textarea>
</div>

{/* Due Date Field */}
<div>
<label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
  Due On
</label>
<input
  type="datetime-local"
  id="dueDate"
  name="dueDate"
  min={getCurrentDate()}
  value={data.dueDate}
  onChange={handleData}
  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
  required
/>
</div>

{/* Status Field */}
<div>
{/* <label htmlFor="status" className="block text-sm font-medium text-gray-700">
  Status
</label> */}
{/* <select
  id="status"
  name="status"
  value={data.status}
  onChange={handleData}
  defaultValue="pending"
  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
  required
>
  <option value="">--Select--</option>
  <option value="pending">Pending</option>
  <option value="progress">In Progress</option>
</select> */}
</div>

{/* Submit Button */}
<div>
<button
  type="submit"
  onClick={handleSubmit}
  className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
>
  Submit
</button>
</div>
</form>
</div>
  )
}

export default CreateTodo

