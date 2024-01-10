import React from 'react'
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const userDetails =useSelector(state=> state.employee.userDetails)
  return (
    userDetails?<Outlet/>:<Navigate to="/login" />
  )
}

export default PrivateRoute
