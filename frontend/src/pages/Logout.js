import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Login from './Login';

const Logout = () => {
    localStorage.clear();
    useNavigate("/login")
}

export default Logout