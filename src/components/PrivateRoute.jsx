import React from 'react'
import { Navigate, NavLink } from 'react-router-dom'

const PrivateRoute = ({children ,allowRoles=[]}) => {
    const token = localStorage.getItem('token')
    const role  =localStorage.getItem('role')
    if(!token) return  <Navigate to={'/login'}/>
  // return token ? children : <Navigate to={'/login'}/>
  console.log(allowRoles.includes(role));
  
  if (allowRoles.length===0 || allowRoles.includes(role)) {
    return children
  }
  return <Navigate to="/" />;
}

export default PrivateRoute