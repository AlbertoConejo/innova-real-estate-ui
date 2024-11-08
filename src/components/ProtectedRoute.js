import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function ProtectedRoute({ children, requiredRole }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    // If not authenticated, redirect to login
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // If role doesn't match, redirect to unauthorized page or home
    return <Navigate to="/unauthorized" />;
  }

  return children;
}

export default ProtectedRoute;
