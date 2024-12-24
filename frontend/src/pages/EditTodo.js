import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function getCurrentDate() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

const getTodoInfo = async function (todoId) {
  const token= localStorage.getItem("token");
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URI}/${todoId}`,{
      headers:{
        Authorization: 'Bearer '+token
      }
    });
    return response.data.todo;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const EditTodo = () => {
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const todoId = location.pathname.substring(11);
  const [data, setData] = useState({
    title: ``,
    description: ``,
    dueDate: ``,
    status: ``,
  });

  useEffect(() => {
    const fetchedData = async function () {
      try {
        const data = await getTodoInfo(todoId);
        setResult(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchedData();
  }, [todoId]);

  useEffect(() => {
    if (!loading && result) {
      setData({
        title: result.title,
        description: result.description,
        dueDate: result.dueDate,
        status: result.status,
      });
    }
  }, [loading, result]);

  const handleData = (event) => {
    const { name, value } = event.target;

    setData({ ...data, [name]: value });
  };

  const handleSubmit = (event)=>{
    const token= localStorage.getItem("token");
    
    event.preventDefault();
  
    const updatedData= data;
    // console.log(updatedData)
    axios.put(`${process.env.REACT_APP_BACKEND_URI}/update/${result._id}`,updatedData,{
      headers:{
        Authorization: 'Bearer '+token
      }
    })
    .then(()=>{
      console.log("Updated the todo");
      navigate("/");
    })
  }
  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounde  d-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Task</h2>
      <form className="space-y-4">
        {/* Title Field */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
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
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
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
          <label
            htmlFor="dueDate"
            className="block text-sm font-medium text-gray-700"
          >
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
              // onClick={(e) => handleSubmit(result._id)}
              onClick={(event) => handleSubmit(event, result)}
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTodo;
