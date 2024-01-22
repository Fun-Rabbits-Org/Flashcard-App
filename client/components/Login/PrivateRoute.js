import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";


const PrivateRoute = ({children}) => {
  const isLogged = useSelector((state) => state.login.isLoggedIn);
  console.log('----is logged', isLogged)
  return isLogged ? children : <Navigate to="/login"/>
}

export default PrivateRoute