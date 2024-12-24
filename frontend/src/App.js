import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Todos from "./components/Todos";
import CreateTodo from "./pages/CreateTodo";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import EditTodo from "./pages/EditTodo";
import ViewTodo from "./pages/ViewTodo";
import Logout from "./pages/Logout";
import { useContext, useEffect, useState } from "react";
import {AuthContext} from './AuthContext'

function App() {
  const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext)
  const navigate = useNavigate();
  const token= localStorage.getItem('token');
  const expiryDate= localStorage.getItem("expiryDate");

  const logout = ()=>{
    localStorage.clear();
    setIsAuthenticated(false);
    navigate("/login");
  }

  useEffect(()=>{
    if(token){

  const exp = new Date(expiryDate);
  const timeLeft = exp*1000 - Date.now();
  if(timeLeft > 0){

    setIsAuthenticated(true);
    const timeoutId = setTimeout(()=>{
      alert("Session expired, logging out");
      logout();
    },timeLeft)

   return ()=>  clearTimeout(timeoutId);
  }
  else{
    logout();
  }
    }

  },[])
  return (
    <>
        <Navbar />
        <Routes>
        { isAuthenticated ? (
          <>
            <Route path="/create-todo" element={<CreateTodo />} />
          <Route path="/edit-todo/:id" element={<EditTodo />} />
          <Route path="/:id" element={<ViewTodo />} />
            <Route path="/" element={<Todos />} />
            <Route path="*" element= {<Login/>}/>
          </>
        ) : (
          <>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login/>} />
          <Route path="*" element= {<Login/>}/>
          </>
        )

        }
        </Routes>
    </>
  );
}

export default App;
