import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";



const ViewTodo = () => {
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const todoId = location.pathname.substring(1);
  console.log(todoId)
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
        console.log(data)
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

  const getTodoInfo = async function (todoId) {
    const token= localStorage.getItem('token');
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URI}/${todoId}`,{
        headers: {
          Authorization: 'Bearer '+token
        }
      });
      console.log(response.data)
      return response.data.todo;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const handleBack = ()=>{
    navigate("/")
  }
  const formatDate = (inputDate) =>{
        // Create a new Date object from the input string
        const date = new Date(inputDate);
      
        // Get day, month, year, hours, and minutes
        const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if needed
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
      
        // Format the date and time
        return `${day}-${month}-${year} (${hours}:${minutes})`;
  }
  return (<>
    <div className="min-h-screen flex items-start p-5 justify-center bg-gray-100 ">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Todo #{todoId}</h1>
        <div className="space-y-4">
          {/* <div>
            <span className="block text-sm font-medium text-gray-600">Todo ID</span>
            <p className="text-lg font-semibold text-gray-900">{todoId}</p>
          </div> */}
          <div>
            <span className="block text-sm font-medium text-gray-600">Title</span>
            <p className="text-lg font-semibold text-gray-900">{data.title}</p>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-600">Description</span>
            <p className="text-lg text-gray-700">{data.description}</p>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-600">Due Date</span>
            <p className="text-lg text-gray-700">{formatDate(data.dueDate)}</p>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-600 ">Status</span>
            <span
              className={`px-3 py-1 inline-block rounded-full text-sm font-medium capitalize ${
                data.status === "completed"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {data.status}
            </span>
          </div>
        </div>
        <div>
          <button
            type="submit"
            onClick={handleBack}
            className="w-full mt-4 py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  
  </>
  );
};

export default ViewTodo;
