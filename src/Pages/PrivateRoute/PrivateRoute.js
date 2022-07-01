import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    let isLoggedIn=localStorage.getItem("adminLoggedIn");
    let location = useLocation();
    if (!isLoggedIn) {
        return <Navigate to='/login' state={{ from: location }} replace />;
      }
    
      return children;
    };

export default PrivateRoute;