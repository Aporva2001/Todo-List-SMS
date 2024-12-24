import React, { useContext } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { AuthContext } from '../AuthContext';

const Navbar = () => {
  const navigate= useNavigate();
  const {setIsAuthenticated} = useContext(AuthContext)
  const token= localStorage.getItem("token");
  const logout = ()=>{
    localStorage.clear();
    setIsAuthenticated(false);
    navigate("/login");
  }
  return (
<nav className='flex justify-between bg-blue-700 text-white py-2'>
    <div className="logo">
        <span className='font-bold text-xl mx-9'>Todo List</span>
    </div>
    <ul className='flex gap-8 mx-9'>
      {token ? (
        <>
              <Link to='/'>Home</Link>
      <Link to='/create-todo'>Add Todo</Link>
      <Link to='/logout' onClick={()=> logout()}>Logout</Link>
        </>
      ) : (
        <>
              <Link to='/signup'>Sign Up</Link>
              <Link to='/login'>Login</Link>
        </>
      ) }

        {/* <li>All Tasks</li>
        <li>Add a Task</li>
        <li>Login</li>
        <li>Logout</li>
        <li>Signup</li> */}

    </ul>
</nav>
  )
}

export default Navbar